import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDocFromServer,
  collection,
  setDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  limit,
  updateDoc,
  enableIndexedDbPersistence,
  enableMultiTabIndexedDbPersistence
} from 'firebase/firestore';
import { getAnalytics, isSupported, logEvent, Analytics } from 'firebase/analytics';
import firebaseConfig from '../../firebase-applet-config.json';
import { TabError, BugStatus } from '../types/tabErrors';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with specific database ID from config
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Enable Firestore Offline Persistence for seamless offline query & mutations
if (typeof window !== 'undefined') {
  enableMultiTabIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      // Fallback if multiple tabs fail multi-tab mode
      enableIndexedDbPersistence(db).catch(() => {});
    } else if (err.code === 'unimplemented') {
      console.warn('[Firestore Persistence] Browser does not support IndexedDB persistence');
    }
  });
}

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

// Initialize Firebase Analytics safely (with environment & browser capability check)
let analyticsInstance: Analytics | null = null;
let isAnalyticsReady = false;

if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported && firebaseConfig.measurementId) {
      try {
        analyticsInstance = getAnalytics(app);
        isAnalyticsReady = true;
      } catch (err) {
        console.warn('Firebase Analytics init note:', err);
      }
    }
  }).catch(() => {});
}

export const getFirebaseAnalytics = () => analyticsInstance;

/**
 * Log custom analytics event to Firebase Analytics & local analytics dispatcher
 */
export function logTabAnalyticsEvent(eventName: string, params: Record<string, any> = {}) {
  const enrichedParams = {
    ...params,
    timestamp: new Date().toISOString(),
    url: typeof window !== 'undefined' ? window.location.href : '',
    online: typeof navigator !== 'undefined' ? navigator.onLine : true,
  };

  if (analyticsInstance && isAnalyticsReady) {
    try {
      logEvent(analyticsInstance, eventName, enrichedParams);
    } catch (err) {
      console.warn('Firebase Analytics logEvent error:', err);
    }
  }

  // Also dispatch a custom browser event for live UI reaction
  if (typeof window !== 'undefined') {
    try {
      window.dispatchEvent(new CustomEvent('firebase_analytics_event', {
        detail: { eventName, params: enrichedParams }
      }));
    } catch {}
  }
}

/**
 * Track when a tab error report is submitted
 */
export function logErrorCategoryReported(category: string, tabId: string, severity: string, syncedOffline = false) {
  logTabAnalyticsEvent('tab_error_reported', {
    error_category: category,
    tab_id: tabId,
    severity: severity,
    synced_offline: syncedOffline,
  });

  logTabAnalyticsEvent(`bug_category_${category.toLowerCase().replace(/[^a-z0-9]/g, '_')}`, {
    tab_id: tabId,
    severity: severity,
  });
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Save tab error directly to Firestore
export async function saveTabErrorToFirestore(errorItem: TabError): Promise<boolean> {
  try {
    const errorRef = doc(db, 'tabErrors', errorItem.id);
    await setDoc(errorRef, {
      ...errorItem,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    logErrorCategoryReported(errorItem.category, errorItem.tabId, errorItem.severity, !!errorItem.syncedOffline);
    return true;
  } catch (err) {
    console.warn('Direct Firestore save failed, will queue for offline sync:', err);
    return false;
  }
}

// Update error status (e.g., investigating / resolved / pending / in_progress / fixed)
export async function updateTabErrorStatusInFirestore(errorId: string, status: BugStatus): Promise<boolean> {
  try {
    const errorRef = doc(db, 'tabErrors', errorId);
    await updateDoc(errorRef, {
      status,
      resolvedAt: status === 'resolved' ? new Date().toISOString() : null,
      updatedAt: new Date().toISOString()
    });
    logTabAnalyticsEvent('tab_error_status_updated', { errorId, status });
    return true;
  } catch (err) {
    console.warn('Update tab error status in Firestore failed:', err);
    return false;
  }
}

// Validate connection to Firestore on initialization
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error: any) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline. Check Firebase configuration.');
    }
    return false;
  }
}
