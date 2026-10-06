import React, { useState, useEffect, useMemo } from "react";
import { 
  AlertTriangle, 
  Bug, 
  CheckCircle2, 
  Clock, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Plus, 
  Filter, 
  Search, 
  BarChart3, 
  PieChart as PieChartIcon, 
  Activity, 
  Layers, 
  Send, 
  CheckCheck, 
  Smartphone, 
  Zap, 
  Layout, 
  Database, 
  Volume2, 
  HelpCircle,
  Eye,
  Info,
  SlidersHorizontal,
  X,
  ArrowUpRight,
  ShieldAlert,
  AlertCircle
} from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell, 
  PieChart, 
  Pie, 
  Legend 
} from "recharts";
import { formatDistanceToNow, format, isValid } from "date-fns";
import { vi, enUS } from "date-fns/locale";
import { PageCardHeader } from "./PageCardHeader";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { playUiSound } from "../lib/sound";
import { 
  TabError, 
  BugCategory, 
  BugSeverity, 
  BugStatus, 
  BUG_CATEGORIES, 
  SEVERITY_CONFIG 
} from "../types/tabErrors";
import { 
  saveTabErrorToFirestore, 
  updateTabErrorStatusInFirestore, 
  logTabAnalyticsEvent, 
  logErrorCategoryReported,
  db 
} from "../lib/firebase";
import { 
  initServiceWorkerSync, 
  queueOfflineReport, 
  getPendingOfflineReports, 
  syncPendingErrorsToFirestore, 
  getCachedReports, 
  cacheLiveReports,
  INITIAL_SAMPLE_TAB_ERRORS,
  requestBackgroundSync
} from "../lib/offlineSyncService";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

/**
 * Normalizes any legacy status strings into 'pending' | 'in_progress' | 'fixed'
 */
export function normalizeBugStatus(status?: string): "pending" | "in_progress" | "fixed" {
  const s = (status || "").toLowerCase().trim();
  if (s === "fixed" || s === "resolved") return "fixed";
  if (s === "in_progress" || s === "investigating") return "in_progress";
  return "pending";
}

/**
 * Formats error creation date to relative time elapsed (e.g., '2 hours ago')
 * alongside exact timestamp using date-fns
 */
export function formatErrorTimestamp(dateInput: string | number | Date | undefined, isVi: boolean) {
  if (!dateInput) {
    return {
      relative: isVi ? "vừa xong" : "just now",
      exact: "--:--"
    };
  }
  try {
    const date = typeof dateInput === "string" ? new Date(dateInput) : new Date(dateInput);
    if (!isValid(date) || isNaN(date.getTime())) {
      return {
        relative: isVi ? "vừa xong" : "just now",
        exact: String(dateInput)
      };
    }
    const relative = formatDistanceToNow(date, {
      addSuffix: true,
      locale: isVi ? vi : enUS
    });
    const exact = format(date, isVi ? "HH:mm:ss dd/MM/yyyy" : "MMM d, yyyy, h:mm:ss a");
    return { relative, exact };
  } catch {
    return {
      relative: isVi ? "vừa xong" : "just now",
      exact: String(dateInput)
    };
  }
}

const PORTFOLIO_TABS = [
  { id: "home", label: "Trang chủ (Home)" },
  { id: "letter", label: "Thư ngỏ (Letter)" },
  { id: "about", label: "Giới thiệu (About)" },
  { id: "domains", label: "Lĩnh vực (Domains)" },
  { id: "skills", label: "Kỹ năng (Skills)" },
  { id: "education", label: "Học vấn (Education)" },
  { id: "experience", label: "Kinh nghiệm (Experience)" },
  { id: "projects", label: "Dự án (Projects)" },
  { id: "interview", label: "Phỏng vấn (Interview)" },
  { id: "tuvi", label: "Tử vi (TuVi)" },
  { id: "memories", label: "Kỷ niệm (Memories)" },
  { id: "systems", label: "Hệ thống (Systems)" },
  { id: "contact", label: "Liên hệ (Contact)" },
  { id: "wallpapers", label: "Hình nền (Wallpapers)" },
  { id: "customization", label: "Tùy chỉnh (Customization)" }
];

export default function TabErrorsPage() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isVi = lang === "vi";

  // Connection & Offline sync states
  const [isOnline, setIsOnline] = useState<boolean>(() => typeof navigator !== "undefined" ? navigator.onLine : true);
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [simulatedOffline, setSimulatedOffline] = useState<boolean>(false);

  // Error reports data
  const [reports, setReports] = useState<TabError[]>(INITIAL_SAMPLE_TAB_ERRORS);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("all");
  const [activeSeverityFilter, setActiveSeverityFilter] = useState<string>("all");
  const [activeStatusFilter, setActiveStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Report Form Modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTabId, setSelectedTabId] = useState<string>("home");
  const [selectedCategory, setSelectedCategory] = useState<BugCategory>("UI/Layout");
  const [selectedSeverity, setSelectedSeverity] = useState<BugSeverity>("medium");
  const [titleInput, setTitleInput] = useState<string>("");
  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const [reporterNameInput, setReporterNameInput] = useState<string>("");
  const [reporterEmailInput, setReporterEmailInput] = useState<string>("");
  const [formError, setFormError] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string>("");

  // Inspect detail modal
  const [viewingDetailReport, setViewingDetailReport] = useState<TabError | null>(null);

  // Initialize Service Worker and Online/Offline Listeners
  useEffect(() => {
    initServiceWorkerSync();

    const handleOnline = () => {
      setIsOnline(true);
      showToast(isVi ? "Kết nối Internet đã phục hồi. Tự động đồng bộ lỗi nền..." : "Online restored. Auto-syncing background queue...");
      syncPendingErrorsToFirestore().then(({ synced }) => {
        if (synced > 0) {
          showToast(isVi ? `Đã đồng bộ ${synced} báo cáo lỗi lên Firebase!` : `Synced ${synced} error reports to Firebase!`);
        }
        updateQueueCount();
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      showToast(isVi ? "Chế độ Ngoại tuyến (Offline). Báo cáo lỗi sẽ được lưu vào Service Worker Sync Queue." : "Offline mode. Reports will be queued for Background Sync.");
    };

    const updateQueueCount = async () => {
      const pending = await getPendingOfflineReports();
      setPendingCount(pending.length);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("offline_error_queue_changed", updateQueueCount);
    window.addEventListener("tab_errors_synced", updateQueueCount);

    updateQueueCount();

    // Initial check cached reports
    getCachedReports().then(cached => {
      if (cached && cached.length > 0) {
        setReports(prev => {
          const map = new Map<string, TabError>();
          [...prev, ...cached].forEach(it => map.set(it.id, it));
          return Array.from(map.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        });
      }
    });

    // Firestore real-time listener for live sync
    try {
      const q = query(collection(db, "tabErrors"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const liveData = snapshot.docs.map(d => ({ ...d.data() } as TabError));
          setReports(liveData);
          cacheLiveReports(liveData);
        }
      }, (err) => {
        console.warn("Firestore tabErrors snapshot note (offline/fallback mode):", err);
      });

      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
        window.removeEventListener("offline_error_queue_changed", updateQueueCount);
        window.removeEventListener("tab_errors_synced", updateQueueCount);
        unsubscribe();
      };
    } catch (err) {
      console.warn("Firestore setup note:", err);
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("offline_error_queue_changed", updateQueueCount);
      window.removeEventListener("tab_errors_synced", updateQueueCount);
    };
  }, [isVi]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3800);
  };

  // Handle Manual Trigger Sync Now
  const handleManualSync = async () => {
    try {
      playUiSound("click");
    } catch {}
    setIsSyncing(true);
    const result = await syncPendingErrorsToFirestore();
    setIsSyncing(false);
    
    if (result.synced > 0) {
      showToast(isVi ? `Đồng bộ thành công ${result.synced} báo cáo lỗi!` : `Successfully synced ${result.synced} error reports!`);
    } else if (result.failed > 0) {
      showToast(isVi ? `Không thể đồng bộ ${result.failed} báo cáo, sẽ thử lại sau.` : `Failed to sync ${result.failed} reports, will retry.`);
    } else {
      showToast(isVi ? "Hàng đợi đang trống, tất cả báo cáo đã đồng bộ!" : "Queue is empty, all reports are synced!");
    }
    const pending = await getPendingOfflineReports();
    setPendingCount(pending.length);
  };

  // Handle Form Submission
  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!titleInput.trim()) {
      setFormError(isVi ? "Vui lòng nhập tiêu đề lỗi vắn tắt." : "Please enter an error title.");
      return;
    }
    if (!descriptionInput.trim()) {
      setFormError(isVi ? "Vui lòng mô tả chi tiết lỗi phát sinh." : "Please enter a detailed error description.");
      return;
    }

    const newErrorItem: TabError = {
      id: `err-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      tabId: selectedTabId,
      title: titleInput.trim(),
      description: descriptionInput.trim(),
      category: selectedCategory,
      severity: selectedSeverity,
      status: "open",
      deviceInfo: typeof navigator !== "undefined" ? `${navigator.userAgent.slice(0, 150)} | Res: ${window.innerWidth}x${window.innerHeight}` : "Unknown Device",
      reporterName: reporterNameInput.trim() || (isVi ? "Ẩn danh" : "Anonymous"),
      reporterEmail: reporterEmailInput.trim() || undefined,
      createdAt: new Date().toISOString(),
      syncedOffline: !isOnline || simulatedOffline
    };

    try {
      playUiSound("click");
    } catch {}

    const effectiveOnline = isOnline && !simulatedOffline;

    if (!effectiveOnline) {
      // Offline mode -> Queue into Service Worker / IndexedDB
      await queueOfflineReport(newErrorItem);
      setReports(prev => [newErrorItem, ...prev]);
      showToast(isVi 
        ? "Đã lưu vào bộ nhớ ngoại tuyến! Service Worker sẽ tự động đồng bộ khi có mạng." 
        : "Saved to offline store! Service Worker will background-sync when connection restores.");
    } else {
      // Online mode -> Direct Firestore write + Firebase Analytics log
      const ok = await saveTabErrorToFirestore(newErrorItem);
      if (ok) {
        setReports(prev => [newErrorItem, ...prev.filter(it => it.id !== newErrorItem.id)]);
        showToast(isVi ? "Báo cáo lỗi đã được ghi nhận lên Firebase Analytics & Firestore!" : "Error report tracked on Firebase Analytics & Firestore!");
      } else {
        // Fallback to offline queue
        await queueOfflineReport(newErrorItem);
        setReports(prev => [newErrorItem, ...prev]);
        showToast(isVi ? "Tạm lưu vào bộ nhớ đệm ngoại tuyến." : "Temporarily stored in offline queue.");
      }
    }

    // Reset Form
    setTitleInput("");
    setDescriptionInput("");
    setReporterEmailInput("");
    setIsModalOpen(false);
  };

  // Status toggle handler
  const handleUpdateStatus = async (item: TabError, newStatus: BugStatus) => {
    try {
      playUiSound("click");
    } catch {}

    const norm = normalizeBugStatus(newStatus);
    const isFixed = norm === "fixed";
    const updatedItem: TabError = {
      ...item,
      status: norm,
      resolvedAt: isFixed ? (item.resolvedAt || new Date().toISOString()) : undefined
    };

    setReports(prev => prev.map(r => r.id === item.id ? updatedItem : r));
    await updateTabErrorStatusInFirestore(item.id, norm);

    const statusLabel = 
      norm === "fixed" ? (isVi ? "Đã khắc phục (Fixed)" : "Fixed") :
      norm === "in_progress" ? (isVi ? "Đang xử lý (In Progress)" : "In Progress") :
      (isVi ? "Chờ xử lý (Pending)" : "Pending");

    showToast(isVi ? `Đã cập nhật trạng thái lỗi sang: ${statusLabel}` : `Updated status to: ${statusLabel}`);
  };

  // Analytics Computations
  const analyticsSummary = useMemo(() => {
    const total = reports.length;
    
    // Category Frequencies
    const categoryCounts: Record<BugCategory, number> = {
      "UI/Layout": 0,
      "Performance": 0,
      "Data/Logic": 0,
      "Crash/Freeze": 0,
      "Audio/Video": 0,
      "Responsive/Mobile": 0,
      "Other": 0
    };

    // Severity Counts
    const severityCounts: Record<BugSeverity, number> = {
      low: 0,
      medium: 0,
      high: 0,
      critical: 0
    };

    // Tab Breakdown
    const tabCounts: Record<string, number> = {};

    // Status Counts (pending, in_progress, fixed)
    const statusCounts = {
      pending: 0,
      in_progress: 0,
      fixed: 0
    };

    let resolvedCount = 0;

    reports.forEach(r => {
      if (categoryCounts[r.category] !== undefined) {
        categoryCounts[r.category]++;
      } else {
        categoryCounts["Other"] = (categoryCounts["Other"] || 0) + 1;
      }

      if (severityCounts[r.severity] !== undefined) {
        severityCounts[r.severity]++;
      }

      tabCounts[r.tabId] = (tabCounts[r.tabId] || 0) + 1;

      const st = (r.status || "open").toLowerCase();
      if (st === "pending" || st === "open") {
        statusCounts.pending++;
      } else if (st === "in_progress" || st === "investigating") {
        statusCounts.in_progress++;
      } else if (st === "fixed" || st === "resolved") {
        statusCounts.fixed++;
        resolvedCount++;
      } else {
        statusCounts.pending++;
      }
    });

    // Chart Data for Status Category Frequency Bar Chart (pending, in_progress, fixed)
    const statusChartData = [
      {
        statusKey: "pending",
        name: isVi ? "Chờ xử lý (Pending)" : "Pending",
        count: statusCounts.pending,
        percent: total > 0 ? Math.round((statusCounts.pending / total) * 100) : 0,
        fill: "#f59e0b"
      },
      {
        statusKey: "in_progress",
        name: isVi ? "Đang xử lý (In Progress)" : "In Progress",
        count: statusCounts.in_progress,
        percent: total > 0 ? Math.round((statusCounts.in_progress / total) * 100) : 0,
        fill: "#38bdf8"
      },
      {
        statusKey: "fixed",
        name: isVi ? "Đã khắc phục (Fixed)" : "Fixed",
        count: statusCounts.fixed,
        percent: total > 0 ? Math.round((statusCounts.fixed / total) * 100) : 0,
        fill: "#10b981"
      }
    ];

    // Find most frequent category
    let topCategory: BugCategory = "UI/Layout";
    let topCategoryMax = -1;
    (Object.keys(categoryCounts) as BugCategory[]).forEach(cat => {
      if (categoryCounts[cat] > topCategoryMax) {
        topCategoryMax = categoryCounts[cat];
        topCategory = cat;
      }
    });

    // Find most frequent tab
    let topTab = "home";
    let topTabMax = -1;
    Object.keys(tabCounts).forEach(tab => {
      if (tabCounts[tab] > topTabMax) {
        topTabMax = tabCounts[tab];
        topTab = tab;
      }
    });

    // Chart Data for Category Frequency Bar Chart
    const categoryChartData = BUG_CATEGORIES.map(cat => ({
      name: isVi ? cat.labelVi.split(" (")[0] : cat.labelEn,
      categoryKey: cat.id,
      count: categoryCounts[cat.id] || 0,
      fill: cat.color
    }));

    // Chart Data for Severity Donut
    const severityChartData = [
      { name: isVi ? "Khẩn cấp (Critical)" : "Critical", value: severityCounts.critical, color: "#f43f5e" },
      { name: isVi ? "Nghiêm trọng (High)" : "High", value: severityCounts.high, color: "#f97316" },
      { name: isVi ? "Trung bình (Medium)" : "Medium", value: severityCounts.medium, color: "#f59e0b" },
      { name: isVi ? "Nhẹ (Low)" : "Low", value: severityCounts.low, color: "#3b82f6" },
    ].filter(it => it.value > 0);

    const resolutionRate = total > 0 ? Math.round((resolvedCount / total) * 100) : 100;

    return {
      total,
      topCategory,
      topCategoryCount: topCategoryMax,
      topCategoryPercent: total > 0 ? Math.round((topCategoryMax / total) * 100) : 0,
      topTab,
      topTabCount: topTabMax,
      resolutionRate,
      resolvedCount,
      categoryCounts,
      severityCounts,
      statusCounts,
      categoryChartData,
      severityChartData,
      statusChartData,
      tabCounts
    };
  }, [reports, isVi]);

  // Filtered reports list
  const filteredReports = useMemo(() => {
    return reports.filter(r => {
      const matchCat = activeCategoryFilter === "all" || r.category === activeCategoryFilter;
      const matchSev = activeSeverityFilter === "all" || r.severity === activeSeverityFilter;
      const matchStat = activeStatusFilter === "all" || 
        r.status === activeStatusFilter ||
        (activeStatusFilter === "pending" && (r.status === "pending" || r.status === "open")) ||
        (activeStatusFilter === "in_progress" && (r.status === "in_progress" || r.status === "investigating")) ||
        (activeStatusFilter === "fixed" && (r.status === "fixed" || r.status === "resolved"));
      
      const queryStr = searchQuery.trim().toLowerCase();
      if (!queryStr) return matchCat && matchSev && matchStat;

      const matchSearch = 
        r.title.toLowerCase().includes(queryStr) ||
        r.description.toLowerCase().includes(queryStr) ||
        r.tabId.toLowerCase().includes(queryStr) ||
        r.category.toLowerCase().includes(queryStr) ||
        (r.reporterName || "").toLowerCase().includes(queryStr);

      return matchCat && matchSev && matchStat && matchSearch;
    });
  }, [reports, activeCategoryFilter, activeSeverityFilter, activeStatusFilter, searchQuery]);

  return (
    <div id="tab-errors" className="relative w-full h-full flex flex-col justify-start items-stretch p-[15px] font-play text-slate-800 dark:text-slate-100 transition-colors duration-300 bg-transparent overflow-y-auto no-scrollbar">
      
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-[15px]">
        
        {/* 1. Page Header with Real-Time Service Worker & Analytics Sync Badges */}
        <PageCardHeader pageId="errors">
          <div className="w-full flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-0.5">
            {/* Title & Live Connection Status */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-gradient-to-tr from-rose-500/20 to-amber-500/20 border border-rose-500/30 text-rose-500 dark:text-rose-400 shadow-inner">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase font-play flex items-center gap-2">
                    <span>{isVi ? "Báo cáo lỗi & Giám sát hệ thống" : "Tab Errors & Bug Analytics"}</span>
                    <span className="text-2xs px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-500 font-mono">
                      Firebase Analytics
                    </span>
                  </h1>
                  <p className="text-caption text-slate-500 dark:text-slate-400">
                    {isVi 
                      ? "Phân tích tần suất lỗi, danh mục bug phổ biến & Đồng bộ hóa chạy nền Service Worker" 
                      : "Frequency tracking, category breakdown & Service Worker background synchronization"}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Controls */}
            <div className="flex flex-wrap items-center gap-2 md:justify-end">
              {/* Online/Offline Status Indicator */}
              <div className={`px-2.5 py-1 rounded-xl text-3xs font-bold border flex items-center gap-1.5 shadow-xs transition-colors ${
                isOnline && !simulatedOffline
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                  : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 animate-pulse"
              }`}>
                {isOnline && !simulatedOffline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
                <span>{isOnline && !simulatedOffline ? (isVi ? "Trực tuyến (Online)" : "Online") : (isVi ? "Ngoại tuyến (Offline)" : "Offline Queue")}</span>
              </div>

              {/* Service Worker Background Sync Queue Indicator */}
              {pendingCount > 0 && (
                <button
                  type="button"
                  onClick={handleManualSync}
                  disabled={isSyncing}
                  className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-caption rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                  title={isVi ? "Đồng bộ hàng đợi offline" : "Sync offline queue"}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
                  <span>{isVi ? `Chờ đồng bộ (${pendingCount})` : `Pending Sync (${pendingCount})`}</span>
                </button>
              )}

              {/* Simulate Offline Toggle */}
              <button
                type="button"
                onClick={() => {
                  try { playUiSound("click"); } catch {}
                  setSimulatedOffline(!simulatedOffline);
                  showToast(simulatedOffline 
                    ? (isVi ? "Đã tắt giả lập ngoại tuyến" : "Disabled offline simulation") 
                    : (isVi ? "Đã bật giả lập ngoại tuyến để thử nghiệm Service Worker Background Sync" : "Simulating offline mode to test Service Worker Sync"));
                }}
                className={`px-2.5 py-1 rounded-xl text-3xs font-bold border transition-all cursor-pointer ${
                  simulatedOffline
                    ? "bg-purple-600 text-white border-purple-500 shadow-purple-500/25"
                    : "bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-purple-400"
                }`}
                title={isVi ? "Thử nghiệm báo cáo khi mất mạng" : "Test offline report submission"}
              >
                <span>{isVi ? "🧪 Thử nghiệm Offline" : "🧪 Test Offline"}</span>
              </button>

              {/* Report New Bug Button */}
              <button
                type="button"
                onClick={() => {
                  try { playUiSound("click"); } catch {}
                  setIsModalOpen(true);
                }}
                className="py-1.5 px-3.5 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 active:scale-95 text-white font-bold text-caption rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isVi ? "Gửi báo cáo lỗi mới" : "Report Bug"}</span>
              </button>
            </div>
          </div>
        </PageCardHeader>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="bg-slate-900/90 dark:bg-white/95 text-white dark:text-slate-950 border border-slate-700 dark:border-slate-300 px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xl animate-fadeIn backdrop-blur-md">
            <CheckCheck className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* 2. ANALYTICS FREQUENCY SUMMARY METRICS (Bento Row) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[15px]">
          
          {/* Card 1: Total Reports Tracked */}
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xs flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold">
              <span>{isVi ? "Tổng báo cáo lỗi" : "Total Tracked Errors"}</span>
              <Activity className="w-4 h-4 text-blue-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
                {analyticsSummary.total}
              </span>
              <span className="text-3xs text-emerald-500 font-bold">
                {analyticsSummary.resolvedCount} {isVi ? "đã khắc phục" : "resolved"}
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${analyticsSummary.resolutionRate}%` }}
              />
            </div>
          </div>

          {/* Card 2: Most Frequent Bug Category */}
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xs flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold">
              <span>{isVi ? "Danh mục phổ biến nhất" : "Top Bug Category"}</span>
              <Bug className="w-4 h-4 text-amber-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black text-amber-600 dark:text-amber-400 truncate">
                {analyticsSummary.topCategory}
              </span>
              <span className="text-2xs text-slate-500 font-bold">
                {analyticsSummary.topCategoryCount} {isVi ? "báo cáo" : "reports"} ({analyticsSummary.topCategoryPercent}% {isVi ? "tổng số" : "share"})
              </span>
            </div>
            <span className="text-3xs text-slate-400">
              {isVi ? "Tần suất cao nhất qua Firebase Analytics" : "Most frequent via Firebase Analytics"}
            </span>
          </div>

          {/* Card 3: Most Vulnerable Tab */}
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xs flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold">
              <span>{isVi ? "Tab ghi nhận nhiều nhất" : "Most Reported Tab"}</span>
              <Layers className="w-4 h-4 text-purple-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black text-purple-600 dark:text-purple-400 uppercase font-mono truncate">
                #{analyticsSummary.topTab}
              </span>
              <span className="text-2xs text-slate-500 font-bold">
                {analyticsSummary.topTabCount} {isVi ? "sự cố cần rà soát" : "reported issues"}
              </span>
            </div>
            <span className="text-3xs text-slate-400">
              {isVi ? "Được tự động tag qua event tracking" : "Auto-tagged via event telemetry"}
            </span>
          </div>

          {/* Card 4: Background Sync & Resolution Status */}
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xs flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold">
              <span>{isVi ? "Tỷ lệ xử lý & Đồng bộ" : "Resolution & SW Sync"}</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {analyticsSummary.resolutionRate}%
              </span>
              <span className="text-3xs text-slate-500 font-semibold">
                {pendingCount > 0 ? `${pendingCount} offline queued` : "All Synced"}
              </span>
            </div>
            <div className="flex items-center justify-between text-3xs text-slate-500">
              <span>SW Sync: Active</span>
              <span className="text-emerald-500 font-bold">Ready</span>
            </div>
          </div>

        </div>

        {/* 3. BUG STATUS RESOLUTION DASHBOARD (Recharts Frequency by 'status' Category: pending, in_progress, fixed) */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-white font-play flex items-center gap-2">
                  <span>{isVi ? "Tần suất lỗi theo Trạng thái (pending, in_progress, fixed)" : "Error Frequency by Status Category"}</span>
                  <span className="px-2 py-0.5 rounded-full text-3xs font-mono font-bold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                    Recharts Visualization
                  </span>
                </h3>
                <p className="text-3xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {isVi 
                    ? "Giám sát tiến độ giải quyết bug theo 3 trạng thái cốt lõi: Chờ xử lý (Pending), Đang điều tra (In Progress) & Đã sửa (Fixed)" 
                    : "Track bug resolution progress across core status categories: pending, in_progress, fixed"}
                </p>
              </div>
            </div>

            {/* Quick Filter Buttons */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setActiveStatusFilter("all")}
                className={`px-2.5 py-1 rounded-lg text-3xs font-bold border transition-all cursor-pointer ${
                  activeStatusFilter === "all"
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-slate-900 dark:border-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                }`}
              >
                {isVi ? "Tất cả" : "All Statuses"} ({analyticsSummary.total})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            {/* Recharts Status Frequency Bar Chart (8 cols) */}
            <div className="lg:col-span-8 w-full h-56 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsSummary.statusChartData} margin={{ top: 15, right: 15, left: -20, bottom: 5 }}>
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: (theme === 'glass-dark-neon' || theme === 'dark') ? '#cbd5e1' : '#475569', fontSize: 11, fontWeight: 700 }}
                  />
                  <YAxis 
                    allowDecimals={false}
                    tick={{ fill: (theme === 'glass-dark-neon' || theme === 'dark') ? '#94a3b8' : '#64748b', fontSize: 10 }}
                  />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-slate-950/95 text-white border border-slate-700/80 p-3 rounded-xl shadow-2xl text-xs space-y-1">
                            <div className="font-extrabold flex items-center gap-2" style={{ color: data.fill }}>
                              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.fill }} />
                              <span>{data.name}</span>
                            </div>
                            <div className="text-slate-300 font-mono">
                              {isVi ? "Tần suất:" : "Count:"} <span className="font-black text-white">{data.count}</span> {isVi ? "báo cáo" : "reports"} ({data.percent}%)
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                    cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                  />
                  <Bar dataKey="count" radius={[10, 10, 0, 0]} barSize={48}>
                    {analyticsSummary.statusChartData.map((entry, index) => (
                      <Cell 
                        key={`status-cell-${index}`} 
                        fill={entry.fill}
                        className="cursor-pointer transition-opacity hover:opacity-80"
                        onClick={() => setActiveStatusFilter(entry.statusKey)}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Status KPI Metric Cards (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-2.5 w-full">
              {analyticsSummary.statusChartData.map((st) => {
                const isActive = activeStatusFilter === st.statusKey;
                return (
                  <div
                    key={st.statusKey}
                    onClick={() => setActiveStatusFilter(st.statusKey)}
                    className={`p-3 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                      isActive
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-slate-900 dark:border-white shadow-md scale-[1.02]"
                        : "bg-slate-50/80 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800/80"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs" style={{ backgroundColor: st.fill }} />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold leading-tight">{st.name}</span>
                        <span className="text-3xs opacity-75 font-mono">Status: {st.statusKey}</span>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-1.5 font-mono">
                      <span className="text-lg font-black">{st.count}</span>
                      <span className="text-3xs font-semibold opacity-70">({st.percent}%)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4. INTERACTIVE ANALYTICS VISUALIZATIONS (2-Column Bento Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[15px]">
          
          {/* LEFT: Bug Category Frequency Bar Chart (lg:col-span-8) */}
          <div className="lg:col-span-8 p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-800/60">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-500" />
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-white font-play">
                  {isVi ? "Tần suất lỗi theo từng danh mục (Category Frequency)" : "Bug Category Frequency Breakdown"}
                </h3>
              </div>
              <span className="text-3xs font-mono text-slate-500">
                Firebase Analytics • real-time
              </span>
            </div>

            <div className="w-full h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsSummary.categoryChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: (theme === 'glass-dark-neon' || theme === 'dark') ? '#94a3b8' : '#64748b', fontSize: 10, fontWeight: 600 }}
                    interval={0}
                    angle={-25}
                    textAnchor="end"
                  />
                  <YAxis 
                    allowDecimals={false}
                    tick={{ fill: (theme === 'glass-dark-neon' || theme === 'dark') ? '#94a3b8' : '#64748b', fontSize: 10 }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.92)',
                      borderColor: 'rgba(255, 255, 255, 0.15)',
                      borderRadius: '12px',
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
                    }}
                    cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                  />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                    {analyticsSummary.categoryChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* RIGHT: Severity Distribution Donut Chart (lg:col-span-4) */}
          <div className="lg:col-span-4 p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-800/60">
              <div className="flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-rose-500" />
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-white font-play">
                  {isVi ? "Mức độ nghiêm trọng" : "Severity Distribution"}
                </h3>
              </div>
            </div>

            <div className="w-full h-56 sm:h-64 flex items-center justify-center">
              {analyticsSummary.severityChartData.length === 0 ? (
                <div className="text-center text-xs text-slate-400">
                  {isVi ? "Chưa có dữ liệu" : "No data available"}
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analyticsSummary.severityChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                    >
                      {analyticsSummary.severityChartData.map((entry, index) => (
                        <Cell key={`sev-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(15, 23, 42, 0.92)',
                        borderColor: 'rgba(255, 255, 255, 0.15)',
                        borderRadius: '12px',
                        color: '#ffffff',
                        fontSize: '11px',
                        fontWeight: 'bold'
                      }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

        </div>

        {/* 4. BUG REPORTS FEED & MANAGEMENT LIST */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-sm space-y-4">
          
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-white font-play">
                {isVi ? "Danh sách Báo cáo sự cố & Trạng thái xử lý" : "Reported Issues & Resolution Log"}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-3xs font-mono font-bold text-slate-600 dark:text-slate-300">
                {filteredReports.length} {isVi ? "kết quả" : "items"}
              </span>
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Search Bar */}
              <div className="relative flex-1 sm:w-48">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder={isVi ? "Tìm kiếm lỗi..." : "Search bugs..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 border border-slate-200 dark:border-slate-700"
                />
              </div>

              {/* Category Filter */}
              <select
                value={activeCategoryFilter}
                onChange={(e) => setActiveCategoryFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="all">{isVi ? "Tất cả danh mục" : "All Categories"}</option>
                {BUG_CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{isVi ? cat.labelVi : cat.labelEn}</option>
                ))}
              </select>

              {/* Severity Filter */}
              <select
                value={activeSeverityFilter}
                onChange={(e) => setActiveSeverityFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="all">{isVi ? "Tất cả mức độ" : "All Severities"}</option>
                <option value="critical">{isVi ? "Khẩn cấp" : "Critical"}</option>
                <option value="high">{isVi ? "Nghiêm trọng" : "High"}</option>
                <option value="medium">{isVi ? "Trung bình" : "Medium"}</option>
                <option value="low">{isVi ? "Nhẹ" : "Low"}</option>
              </select>

              {/* Status Filter Dropdown */}
              <div className="relative">
                <select
                  value={activeStatusFilter}
                  onChange={(e) => {
                    try { playUiSound("click"); } catch {}
                    setActiveStatusFilter(e.target.value);
                  }}
                  aria-label={isVi ? "Lọc theo trạng thái" : "Filter by status"}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-2xs"
                >
                  <option value="all">{isVi ? "Tất cả trạng thái (All Statuses)" : "All Statuses"} ({analyticsSummary.total})</option>
                  <option value="pending">{isVi ? "⏳ Chờ xử lý (Pending Only)" : "⏳ Pending Only"} ({analyticsSummary.statusCounts.pending})</option>
                  <option value="in_progress">{isVi ? "⚡ Đang xử lý (In Progress Only)" : "⚡ In Progress Only"} ({analyticsSummary.statusCounts.in_progress})</option>
                  <option value="fixed">{isVi ? "✅ Đã khắc phục (Fixed Only)" : "✅ Fixed Only"} ({analyticsSummary.statusCounts.fixed})</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Tabbed Status Filter System (Allows switching between all, pending, in_progress, fixed) */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 pb-1 border-b border-slate-200/50 dark:border-slate-800/50">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-3xs font-bold uppercase tracking-wider text-slate-400 mr-1 hidden sm:inline-block">
                {isVi ? "Bộ lọc trạng thái:" : "Status Filter:"}
              </span>
              {[
                { 
                  id: "all", 
                  labelVi: "Tất cả lỗi", 
                  labelEn: "All Errors", 
                  count: analyticsSummary.total,
                  icon: Layers,
                  activeClass: "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-slate-900 dark:border-white shadow-xs"
                },
                { 
                  id: "pending", 
                  labelVi: "Chờ xử lý", 
                  labelEn: "Pending", 
                  count: analyticsSummary.statusCounts.pending,
                  activeClass: "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/50 shadow-xs ring-1 ring-amber-500/30",
                  icon: Clock
                },
                { 
                  id: "in_progress", 
                  labelVi: "Đang xử lý", 
                  labelEn: "In Progress", 
                  count: analyticsSummary.statusCounts.in_progress,
                  activeClass: "bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-500/50 shadow-xs ring-1 ring-sky-500/30",
                  icon: AlertCircle
                },
                { 
                  id: "fixed", 
                  labelVi: "Đã khắc phục", 
                  labelEn: "Fixed", 
                  count: analyticsSummary.statusCounts.fixed,
                  activeClass: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/50 shadow-xs ring-1 ring-emerald-500/30",
                  icon: CheckCircle2
                },
              ].map(tab => {
                const isSelected = activeStatusFilter === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      try { playUiSound("click"); } catch {}
                      setActiveStatusFilter(tab.id);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer active:scale-95 ${
                      isSelected
                        ? tab.activeClass
                        : "bg-slate-100/80 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700/80 hover:bg-slate-200/70 dark:hover:bg-slate-800"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{isVi ? tab.labelVi : tab.labelEn}</span>
                    <span className={`text-3xs font-mono font-bold px-1.5 py-0.5 rounded-md ${
                      isSelected ? "bg-black/15 dark:bg-white/20 text-current" : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300"
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Clear Filter / Active Indicator */}
            {activeStatusFilter !== "all" && (
              <button
                type="button"
                onClick={() => {
                  try { playUiSound("click"); } catch {}
                  setActiveStatusFilter("all");
                }}
                className="text-3xs font-bold text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 cursor-pointer transition py-1 px-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20"
              >
                <span>{isVi ? "Xóa bộ lọc trạng thái (Hiện tất cả)" : "Reset filter (Show all)"}</span>
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* List Items */}
          <div className="space-y-2.5">
            {filteredReports.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-500 dark:text-slate-400 space-y-2 bg-slate-50/50 dark:bg-slate-800/20 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-6">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto opacity-60" />
                <p className="font-semibold text-slate-700 dark:text-slate-300">
                  {activeStatusFilter !== "all"
                    ? (isVi 
                        ? `Không tìm thấy lỗi nào ở trạng thái '${activeStatusFilter}'.`
                        : `No bug reports found with status '${activeStatusFilter}'.`)
                    : (isVi ? "Không tìm thấy báo cáo lỗi phù hợp với bộ lọc." : "No bug reports matched the filter.")}
                </p>
                {activeStatusFilter !== "all" && (
                  <button
                    type="button"
                    onClick={() => setActiveStatusFilter("all")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs cursor-pointer transition"
                  >
                    <span>{isVi ? "Xem tất cả trạng thái" : "View all statuses"}</span>
                  </button>
                )}
              </div>
            ) : (
              filteredReports.map((item) => {
                const categoryDef = BUG_CATEGORIES.find(c => c.id === item.category);
                const severityDef = SEVERITY_CONFIG[item.severity] || SEVERITY_CONFIG.medium;
                const normalizedStatus = normalizeBugStatus(item.status);
                
                // Format relative time elapsed (e.g., '2 hours ago') alongside exact timestamp
                const timeInfo = formatErrorTimestamp(item.createdAt, isVi);
                const resolvedTimeInfo = item.resolvedAt ? formatErrorTimestamp(item.resolvedAt, isVi) : null;

                return (
                  <div
                    key={item.id}
                    className="p-3.5 sm:p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/70 hover:border-blue-400/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                  >
                    {/* Left Info */}
                    <div className="flex-1 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Tab ID Badge */}
                        <span className="px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/25 text-purple-600 dark:text-purple-400 font-mono text-3xs font-bold uppercase">
                          #{item.tabId}
                        </span>

                        {/* Category Badge */}
                        <span 
                          className="px-2 py-0.5 rounded-md text-3xs font-bold border"
                          style={{
                            backgroundColor: categoryDef?.bg || "rgba(148,163,184,0.15)",
                            color: categoryDef?.color || "#94a3b8",
                            borderColor: `${categoryDef?.color || "#94a3b8"}40`
                          }}
                        >
                          {categoryDef ? (isVi ? categoryDef.labelVi.split(" (")[0] : categoryDef.labelEn) : item.category}
                        </span>

                        {/* Severity Badge */}
                        <span className={`px-2 py-0.5 rounded-md text-3xs font-bold border ${severityDef.badgeClass}`}>
                          {isVi ? severityDef.labelVi : severityDef.labelEn}
                        </span>

                        {/* Status Chip Badge */}
                        <span className={`px-2 py-0.5 rounded-md text-3xs font-bold border flex items-center gap-1 ${
                          normalizedStatus === "fixed"
                            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
                            : normalizedStatus === "in_progress"
                            ? "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30"
                            : "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30"
                        }`}>
                          {normalizedStatus === "fixed" ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          ) : normalizedStatus === "in_progress" ? (
                            <AlertCircle className="w-3 h-3 text-sky-500" />
                          ) : (
                            <Clock className="w-3 h-3 text-amber-500" />
                          )}
                          <span>
                            {normalizedStatus === "fixed"
                              ? (isVi ? "Đã khắc phục" : "Fixed")
                              : normalizedStatus === "in_progress"
                              ? (isVi ? "Đang xử lý" : "In Progress")
                              : (isVi ? "Chờ xử lý" : "Pending")}
                          </span>
                        </span>

                        {/* Offline Synced Badge */}
                        {item.syncedOffline && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-500 font-mono text-3xs font-bold flex items-center gap-1">
                            <WifiOff className="w-2.5 h-2.5" />
                            <span>{isVi ? "Đã lưu Offline & Đồng bộ" : "Offline Synced"}</span>
                          </span>
                        )}
                      </div>

                      {/* Title & Description */}
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-caption text-slate-600 dark:text-slate-400 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Timestamp Display with Relative Time Elapsed (e.g. '2 hours ago') alongside Exact Timestamp */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 text-3xs text-slate-500 dark:text-slate-400">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
                          <Clock className="w-3 h-3 text-blue-500 shrink-0" />
                          <span className="font-bold text-slate-900 dark:text-slate-100">
                            {timeInfo.relative}
                          </span>
                          <span className="text-slate-400 dark:text-slate-500 font-mono text-3xs">
                            • {timeInfo.exact}
                          </span>
                        </div>

                        {item.reporterName && (
                          <span className="flex items-center gap-1">
                            <span className="text-slate-400">{isVi ? "Người báo cáo:" : "Reporter:"}</span>
                            <strong className="text-slate-700 dark:text-slate-200">{item.reporterName}</strong>
                          </span>
                        )}

                        {resolvedTimeInfo && normalizedStatus === "fixed" && (
                          <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                            <CheckCheck className="w-3 h-3" />
                            <span>{isVi ? `Khắc phục: ${resolvedTimeInfo.relative}` : `Fixed: ${resolvedTimeInfo.relative}`}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right Actions & Status Selector (pending, in_progress, fixed) */}
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        type="button"
                        onClick={() => setViewingDetailReport(item)}
                        className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition cursor-pointer"
                        title={isVi ? "Xem chi tiết chẩn đoán" : "View Diagnostics"}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {/* Status Selector Dropdown for this item */}
                      <select
                        value={normalizedStatus}
                        onChange={(e) => handleUpdateStatus(item, e.target.value as BugStatus)}
                        aria-label={isVi ? "Thay đổi trạng thái lỗi" : "Change error status"}
                        className={`px-2.5 py-1 rounded-xl text-3xs font-bold border transition-colors cursor-pointer ${
                          normalizedStatus === "fixed"
                            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
                            : normalizedStatus === "in_progress"
                            ? "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30"
                            : "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30"
                        }`}
                      >
                        <option value="pending">{isVi ? "⏳ Chờ xử lý (Pending)" : "⏳ Pending"}</option>
                        <option value="in_progress">{isVi ? "⚡ Đang xử lý (In Progress)" : "⚡ In Progress"}</option>
                        <option value="fixed">{isVi ? "✅ Đã khắc phục (Fixed)" : "✅ Fixed"}</option>
                      </select>
                    </div>

                  </div>
                );
              })
            )}
          </div>

        </div>

      </div>

      {/* MODAL: REPORT NEW BUG (WITH OFFLINE-FIRST AND SERVICE WORKER SYNC) */}
      {isModalOpen && (
        <div 
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto no-scrollbar"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-rose-500/15 text-rose-500">
                  <Bug className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-play uppercase">
                    {isVi ? "Gửi Báo Cáo Lỗi Tab Mới" : "Submit New Tab Error Report"}
                  </h3>
                  <p className="text-3xs text-slate-500">
                    {isVi ? "Tự động phân tích Firebase & đồng bộ ngoại tuyến Service Worker" : "Firebase Analytics tracking & Service Worker Background Sync"}
                  </p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitReport} className="space-y-3 font-play">
              
              {/* Tab Selector & Category Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-2xs font-bold text-slate-700 dark:text-slate-300">
                    {isVi ? "Tab / Phân hệ gặp sự cố:" : "Affected Tab / Feature:"}
                  </label>
                  <select
                    value={selectedTabId}
                    onChange={(e) => setSelectedTabId(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {PORTFOLIO_TABS.map(tab => (
                      <option key={tab.id} value={tab.id}>{tab.label}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-2xs font-bold text-slate-700 dark:text-slate-300">
                    {isVi ? "Danh mục lỗi (Bug Category):" : "Bug Category:"}
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as BugCategory)}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {BUG_CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>{isVi ? cat.labelVi : cat.labelEn}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Severity Selector */}
              <div className="space-y-1">
                <label className="text-2xs font-bold text-slate-700 dark:text-slate-300">
                  {isVi ? "Mức độ ảnh hưởng (Severity):" : "Severity Level:"}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(["low", "medium", "high", "critical"] as BugSeverity[]).map(sev => {
                    const sevDef = SEVERITY_CONFIG[sev];
                    const isSelected = selectedSeverity === sev;
                    return (
                      <button
                        key={sev}
                        type="button"
                        onClick={() => setSelectedSeverity(sev)}
                        className={`py-2 px-1 rounded-xl text-3xs font-bold border transition-all text-center cursor-pointer ${
                          isSelected 
                            ? `${sevDef.badgeClass} ring-2 ring-blue-500/40 font-black` 
                            : "bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                        }`}
                      >
                        {isVi ? sevDef.labelVi.split(" (")[0] : sevDef.labelEn}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Title Input */}
              <div className="space-y-1">
                <label className="text-2xs font-bold text-slate-700 dark:text-slate-300">
                  {isVi ? "Tiêu đề lỗi vắn tắt:" : "Error Title:"}
                </label>
                <input
                  type="text"
                  placeholder={isVi ? "Ví dụ: Lỗi hiển thị nút bấm trên Safari iOS..." : "e.g. Broken button alignment on mobile..."}
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Description Input */}
              <div className="space-y-1">
                <label className="text-2xs font-bold text-slate-700 dark:text-slate-300">
                  {isVi ? "Mô tả chi tiết các bước tái hiện lỗi:" : "Detailed Description & Steps to Reproduce:"}
                </label>
                <textarea
                  rows={4}
                  placeholder={isVi ? "Mô tả chi tiết hiện tượng, hành vi mong muốn và thao tác xảy ra lỗi..." : "Describe the unexpected behavior..."}
                  value={descriptionInput}
                  onChange={(e) => setDescriptionInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Reporter Info Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-2xs font-bold text-slate-700 dark:text-slate-300">
                    {isVi ? "Tên người báo cáo (tùy chọn):" : "Reporter Name (optional):"}
                  </label>
                  <input
                    type="text"
                    placeholder={isVi ? "Nguyễn Văn A" : "John Doe"}
                    value={reporterNameInput}
                    onChange={(e) => setReporterNameInput(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-2xs font-bold text-slate-700 dark:text-slate-300">
                    {isVi ? "Email liên hệ (tùy chọn):" : "Email (optional):"}
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={reporterEmailInput}
                    onChange={(e) => setReporterEmailInput(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Auto Captured Environment Notice */}
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/60 text-3xs text-slate-500 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-blue-500" />
                  <span>{isVi ? "Tự động đính kèm thông tin trình duyệt & độ phân giải màn hình" : "Auto-attached device & browser telemetry"}</span>
                </span>
                <span className="font-mono text-emerald-500 font-bold">
                  {isOnline && !simulatedOffline ? "Direct Online" : "SW Offline Queue"}
                </span>
              </div>

              {formError && (
                <p className="text-xs text-rose-500 font-bold">{formError}</p>
              )}

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
                >
                  {isVi ? "Hủy bỏ" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isVi ? "Gửi & Ghi nhận Analytics" : "Submit & Log Event"}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* DETAIL DIAGNOSTICS MODAL */}
      {viewingDetailReport && (
        <div 
          onClick={() => setViewingDetailReport(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto no-scrollbar font-play"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase">
                  {isVi ? "Chi tiết chẩn đoán sự cố" : "Diagnostics & Telemetry Detail"}
                </h3>
              </div>
              <button 
                type="button" 
                onClick={() => setViewingDetailReport(null)}
                className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-3xs font-bold text-slate-400 block">{isVi ? "Tiêu đề:" : "Title:"}</span>
                <p className="font-bold text-slate-900 dark:text-white text-sm">{viewingDetailReport.title}</p>
              </div>

              <div>
                <span className="text-3xs font-bold text-slate-400 block">{isVi ? "Mô tả chi tiết:" : "Description:"}</span>
                <p className="text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/60 p-3 rounded-xl whitespace-pre-wrap leading-relaxed">
                  {viewingDetailReport.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-2xs">
                <div>
                  <span className="text-3xs font-bold text-slate-400 block">{isVi ? "Tab phát sinh:" : "Tab:"}</span>
                  <span className="font-mono font-bold text-purple-500">#{viewingDetailReport.tabId}</span>
                </div>
                <div>
                  <span className="text-3xs font-bold text-slate-400 block">{isVi ? "Danh mục:" : "Category:"}</span>
                  <span className="font-bold text-blue-500">{viewingDetailReport.category}</span>
                </div>
                <div>
                  <span className="text-3xs font-bold text-slate-400 block">{isVi ? "Mức độ:" : "Severity:"}</span>
                  <span className="font-bold text-rose-500 uppercase">{viewingDetailReport.severity}</span>
                </div>
                <div>
                  <span className="text-3xs font-bold text-slate-400 block">{isVi ? "Trạng thái:" : "Status:"}</span>
                  {(() => {
                    const norm = normalizeBugStatus(viewingDetailReport.status);
                    return (
                      <span className={`font-bold uppercase text-3xs px-2 py-0.5 rounded-md inline-block border ${
                        norm === "fixed"
                          ? "bg-emerald-500/15 text-emerald-600 border-emerald-500/30"
                          : norm === "in_progress"
                          ? "bg-sky-500/15 text-sky-600 border-sky-500/30"
                          : "bg-amber-500/15 text-amber-600 border-amber-500/30"
                      }`}>
                        {norm === "fixed" ? (isVi ? "Đã khắc phục" : "Fixed") :
                         norm === "in_progress" ? (isVi ? "Đang xử lý" : "In Progress") :
                         (isVi ? "Chờ xử lý" : "Pending")}
                      </span>
                    );
                  })()}
                </div>
              </div>

              {/* Timestamp & Relative Time Card */}
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                <div>
                  <span className="text-3xs font-bold text-slate-400 block mb-0.5">
                    {isVi ? "Thời gian phát sinh (Tương đối & Chính xác):" : "Reported Timestamp & Relative Elapsed:"}
                  </span>
                  {(() => {
                    const t = formatErrorTimestamp(viewingDetailReport.createdAt, isVi);
                    return (
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/30">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{t.relative}</span>
                        </span>
                        <span className="font-mono text-slate-600 dark:text-slate-300 text-3xs">
                          ({t.exact})
                        </span>
                      </div>
                    );
                  })()}
                </div>

                {viewingDetailReport.resolvedAt && (
                  <div className="pt-1.5 border-t border-slate-200 dark:border-slate-700/50">
                    <span className="text-3xs font-bold text-slate-400 block mb-0.5">
                      {isVi ? "Thời gian hoàn tất xử lý:" : "Resolved At:"}
                    </span>
                    {(() => {
                      const rt = formatErrorTimestamp(viewingDetailReport.resolvedAt, isVi);
                      return (
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30">
                            <CheckCheck className="w-3.5 h-3.5" />
                            <span>{rt.relative}</span>
                          </span>
                          <span className="font-mono text-slate-600 dark:text-slate-300 text-3xs">
                            ({rt.exact})
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {viewingDetailReport.reporterName && (
                  <div className="pt-1 border-t border-slate-200 dark:border-slate-700/50 text-3xs flex items-center justify-between text-slate-500">
                    <span>{isVi ? "Người báo cáo:" : "Reporter:"} <strong>{viewingDetailReport.reporterName}</strong></span>
                    {viewingDetailReport.reporterEmail && <span>{viewingDetailReport.reporterEmail}</span>}
                  </div>
                )}
              </div>

              <div>
                <span className="text-3xs font-bold text-slate-400 block">{isVi ? "Thông tin thiết bị & trình duyệt:" : "Device Telemetry:"}</span>
                <p className="font-mono text-3xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl break-all">
                  {viewingDetailReport.deviceInfo || "Standard browser environment"}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setViewingDetailReport(null)}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition cursor-pointer"
              >
                {isVi ? "Đóng" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
