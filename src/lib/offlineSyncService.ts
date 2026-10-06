import { TabError, OfflinePendingError, BugCategory, BugSeverity } from '../types/tabErrors';
import { saveTabErrorToFirestore, logTabAnalyticsEvent, logErrorCategoryReported, db } from './firebase';
import { collection, onSnapshot, query, orderBy, limit, doc, getDocs } from 'firebase/firestore';

const DB_NAME = 'tab_errors_offline_db_v1';
const PENDING_STORE = 'pending_errors';
const CACHE_STORE = 'cached_errors';

// Open IndexedDB instance safely
function openIndexedDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not supported in this environment'));
      return;
    }

    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const idb = (event.target as IDBOpenDBRequest).result;
      if (!idb.objectStoreNames.contains(PENDING_STORE)) {
        idb.createObjectStore(PENDING_STORE, { keyPath: 'id' });
      }
      if (!idb.objectStoreNames.contains(CACHE_STORE)) {
        idb.createObjectStore(CACHE_STORE, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Register Service Worker for Background Synchronization
 */
export async function initServiceWorkerSync(): Promise<boolean> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
    
    // Listen for background sync triggers from Service Worker
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data?.type === 'FIREBASE_SW_BACKGROUND_SYNC_TRIGGERED') {
        console.log('[SW Background Sync] Received sync trigger from Service Worker');
        syncPendingErrorsToFirestore();
      }
    });

    // Also auto-sync on browser online event
    window.addEventListener('online', () => {
      console.log('[Offline Sync] Connection restored, flushing offline queue...');
      syncPendingErrorsToFirestore();
      requestBackgroundSync();
    });

    return true;
  } catch (err) {
    console.warn('Service Worker registration note:', err);
    return false;
  }
}

/**
 * Request Background Sync through Service Worker API if supported
 */
export async function requestBackgroundSync(): Promise<boolean> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return false;

  try {
    const registration = await navigator.serviceWorker.ready;
    if ('sync' in registration) {
      // @ts-ignore
      await registration.sync.register('sync-tab-errors');
      console.log('[SW Background Sync] Registered sync-tab-errors with Service Worker');
      return true;
    }
  } catch (err) {
    console.warn('Could not register background sync on SW:', err);
  }
  return false;
}

/**
 * Add an error report to the offline IndexedDB queue
 */
export async function queueOfflineReport(report: TabError): Promise<void> {
  try {
    const idb = await openIndexedDb();
    const pendingItem: OfflinePendingError = {
      ...report,
      syncedOffline: true,
      queuedAt: new Date().toISOString(),
      retryCount: 0,
    };

    await new Promise<void>((resolve, reject) => {
      const tx = idb.transaction([PENDING_STORE, CACHE_STORE], 'readwrite');
      tx.objectStore(PENDING_STORE).put(pendingItem);
      tx.objectStore(CACHE_STORE).put(pendingItem);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });

    // Log analytics event that report was cached offline
    logTabAnalyticsEvent('tab_error_queued_offline', {
      error_id: report.id,
      category: report.category,
      tabId: report.tabId,
      severity: report.severity
    });

    // Request Service Worker to schedule sync
    requestBackgroundSync();

    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'QUEUE_TAB_ERROR_SYNC',
        errorId: report.id,
        timestamp: Date.now()
      });
    }

    // Broadcast queue update to UI
    notifyQueueStateChanged();
  } catch (err) {
    console.warn('Failed to save report to IndexedDB, fallback to localStorage:', err);
    try {
      const stored = JSON.parse(localStorage.getItem('pending_tab_errors') || '[]');
      stored.push({ ...report, syncedOffline: true });
      localStorage.setItem('pending_tab_errors', JSON.stringify(stored));
      notifyQueueStateChanged();
    } catch {}
  }
}

/**
 * Get all pending offline error reports
 */
export async function getPendingOfflineReports(): Promise<OfflinePendingError[]> {
  try {
    const idb = await openIndexedDb();
    return new Promise((resolve, reject) => {
      const tx = idb.transaction(PENDING_STORE, 'readonly');
      const store = tx.objectStore(PENDING_STORE);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  } catch {
    try {
      const stored = JSON.parse(localStorage.getItem('pending_tab_errors') || '[]');
      return stored;
    } catch {
      return [];
    }
  }
}

/**
 * Remove a specific item from the pending offline queue
 */
export async function removePendingReport(id: string): Promise<void> {
  try {
    const idb = await openIndexedDb();
    await new Promise<void>((resolve, reject) => {
      const tx = idb.transaction(PENDING_STORE, 'readwrite');
      tx.objectStore(PENDING_STORE).delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    try {
      const stored: TabError[] = JSON.parse(localStorage.getItem('pending_tab_errors') || '[]');
      const filtered = stored.filter(it => it.id !== id);
      localStorage.setItem('pending_tab_errors', JSON.stringify(filtered));
    } catch {}
  }
}

/**
 * Synchronize all pending offline reports to Firestore
 */
export async function syncPendingErrorsToFirestore(): Promise<{ synced: number; failed: number }> {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    console.log('[Offline Sync] Currently offline, deferring synchronization.');
    return { synced: 0, failed: 0 };
  }

  const pending = await getPendingOfflineReports();
  if (pending.length === 0) return { synced: 0, failed: 0 };

  console.log(`[Offline Sync] Processing ${pending.length} pending error reports...`);
  let synced = 0;
  let failed = 0;

  for (const item of pending) {
    try {
      const success = await saveTabErrorToFirestore({
        ...item,
        syncedOffline: true,
      });

      if (success) {
        await removePendingReport(item.id);
        synced++;
        logTabAnalyticsEvent('tab_error_synced_from_offline', {
          error_id: item.id,
          category: item.category,
          tabId: item.tabId,
          queuedDurationMs: Date.now() - new Date(item.queuedAt || item.createdAt).getTime()
        });
      } else {
        failed++;
      }
    } catch (err) {
      console.warn(`Sync failed for item ${item.id}:`, err);
      failed++;
    }
  }

  notifyQueueStateChanged();

  if (synced > 0 && typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('tab_errors_synced', {
      detail: { count: synced }
    }));
  }

  return { synced, failed };
}

/**
 * Cache all live reports into IndexedDB for offline access
 */
export async function cacheLiveReports(reports: TabError[]): Promise<void> {
  try {
    const idb = await openIndexedDb();
    const tx = idb.transaction(CACHE_STORE, 'readwrite');
    const store = tx.objectStore(CACHE_STORE);
    for (const report of reports) {
      store.put(report);
    }
  } catch (err) {
    // Fallback to local storage if IndexedDB unavailable
    try {
      localStorage.setItem('cached_tab_errors', JSON.stringify(reports.slice(0, 30)));
    } catch {}
  }
}

/**
 * Read cached reports for offline fallback
 */
export async function getCachedReports(): Promise<TabError[]> {
  try {
    const idb = await openIndexedDb();
    return new Promise((resolve) => {
      const tx = idb.transaction(CACHE_STORE, 'readonly');
      const store = tx.objectStore(CACHE_STORE);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => resolve([]);
    });
  } catch {
    try {
      return JSON.parse(localStorage.getItem('cached_tab_errors') || '[]');
    } catch {
      return [];
    }
  }
}

function notifyQueueStateChanged() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('offline_error_queue_changed'));
  }
}

// Built-in initial sample data to demonstrate error frequency analytics immediately
export const INITIAL_SAMPLE_TAB_ERRORS: TabError[] = [
  {
    id: "err-init-1",
    tabId: "wallpapers",
    title: "Hiệu ứng Canvas Particle bị khựng trên thiết bị màn hình nhỏ",
    description: "Khi thu nhỏ cửa sổ trình duyệt xuống dưới 480px, mật độ hạt particles cần tự giảm để duy trì 60 FPS ổn định.",
    category: "Performance",
    severity: "medium",
    status: "fixed",
    deviceInfo: "Chrome 128 / iOS Safari 18 (Mobile)",
    reporterEmail: "tester@mritech.vn",
    reporterName: "QC Team",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    resolvedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    syncedOffline: false
  },
  {
    id: "err-init-2",
    tabId: "experience",
    title: "Thẻ Bento Grid bị lệch chiều cao khi chuyển ngôn ngữ Tiếng Anh",
    description: "Khi đổi sang ngôn ngữ Tiếng Anh, đoạn text mô tả chức danh dài làm một số thẻ bento bị tràn ra ngoài khung.",
    category: "UI/Layout",
    severity: "low",
    status: "fixed",
    deviceInfo: "Edge 129 / macOS Sequoia",
    reporterEmail: "qa@mritech.vn",
    reporterName: "An Nguyen",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(), // ~1 day ago
    resolvedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    syncedOffline: true
  },
  {
    id: "err-init-3",
    tabId: "customization",
    title: "Bảng màu Glass Tokens không đồng bộ khi đổi sang chế độ Neon Tối",
    description: "Màu viền và bóng đổ thẻ kính trong tab tùy chỉnh chưa áp dụng đúng biến CSS var(--theme-border-card).",
    category: "UI/Layout",
    severity: "high",
    status: "in_progress",
    deviceInfo: "Firefox 130 / Windows 11",
    reporterEmail: "designer@mritech.vn",
    reporterName: "Hoang Thai",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    syncedOffline: false
  },
  {
    id: "err-init-4",
    tabId: "systems",
    title: "Lỗi kết nối kiểm tra trạng thái 12 hệ thống API",
    description: "Trạng thái ping của hệ thống OmniChannel CRM phản hồi chậm trên 2000ms khi mạng bị suy hao.",
    category: "Data/Logic",
    severity: "medium",
    status: "pending",
    deviceInfo: "Chrome 128 / Ubuntu Linux",
    reporterEmail: "sysadmin@mritech.vn",
    reporterName: "DevOps",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    syncedOffline: false
  },
  {
    id: "err-init-5",
    tabId: "memories",
    title: "Âm thanh click UI bị trễ 1 nhịp khi người dùng tương tác liên tục",
    description: "Bộ đệm Web Audio API cần nạp trước (preload) để tránh hiện tượng trễ tiếng khi bấm xem album ảnh.",
    category: "Audio/Video",
    severity: "low",
    status: "pending",
    deviceInfo: "Safari 18 / iPadOS",
    reporterEmail: "auditor@mritech.vn",
    reporterName: "Sound QA",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
    syncedOffline: true
  },
  {
    id: "err-init-6",
    tabId: "domains",
    title: "Bộ lọc thẻ ngành nghề trên màn hình hẹp cần vuốt ngang mượt hơn",
    description: "Cần bổ sung thuộc tính no-scrollbar và scroll-snap để trải nghiệm cuộn bento card mượt mà hơn trên điện thoại.",
    category: "Responsive/Mobile",
    severity: "low",
    status: "in_progress",
    deviceInfo: "Samsung Internet / Galaxy S24",
    reporterEmail: "mobile@mritech.vn",
    reporterName: "Minh Tran",
    createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(), // 18 minutes ago
    syncedOffline: false
  }
];
