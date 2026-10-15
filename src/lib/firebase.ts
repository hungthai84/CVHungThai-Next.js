// Firebase disabled as requested ("tắt FIREBASE_API_KEY")
import { TabError, BugStatus } from '../types/tabErrors';

export const db: any = null;
export const auth: any = {
  currentUser: null,
};
export const googleAuthProvider: any = null;

let isFirestoreServerDisabled = true;

export async function disableFirestoreNetwork(): Promise<boolean> {
  isFirestoreServerDisabled = true;
  return true;
}

export async function enableFirestoreNetwork(): Promise<boolean> {
  isFirestoreServerDisabled = true;
  return false;
}

export function isFirestoreNetworkDisabled(): boolean {
  return true;
}

export const getFirebaseAnalytics = () => null;

export function logTabAnalyticsEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window !== 'undefined') {
    try {
      window.dispatchEvent(new CustomEvent('firebase_analytics_event', {
        detail: { eventName, params: { ...params, timestamp: new Date().toISOString() } }
      }));
    } catch {}
  }
}

export function logErrorCategoryReported(category: string, tabId: string, severity: string, syncedOffline = false) {
  logTabAnalyticsEvent('tab_error_reported', {
    error_category: category,
    tab_id: tabId,
    severity: severity,
    synced_offline: syncedOffline,
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
    providerInfo?: any[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: { userId: null, email: null },
    operationType,
    path
  };
  console.warn('Firebase is disabled. Firestore Error skipped: ', JSON.stringify(errInfo));
}

export async function saveTabErrorToFirestore(errorItem: TabError): Promise<boolean> {
  logErrorCategoryReported(errorItem.category, errorItem.tabId, errorItem.severity, !!errorItem.syncedOffline);
  return true;
}

export async function updateTabErrorStatusInFirestore(errorId: string, status: BugStatus): Promise<boolean> {
  logTabAnalyticsEvent('tab_error_status_updated', { errorId, status });
  return true;
}

export async function testConnection(): Promise<boolean> {
  return false;
}
