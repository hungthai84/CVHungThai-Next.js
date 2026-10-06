export type BugCategory = 
  | "UI/Layout" 
  | "Performance" 
  | "Data/Logic" 
  | "Crash/Freeze" 
  | "Audio/Video" 
  | "Responsive/Mobile" 
  | "Other";

export type BugSeverity = "low" | "medium" | "high" | "critical";

export type BugStatus = "open" | "investigating" | "resolved" | "pending" | "in_progress" | "fixed";

export interface TabError {
  id: string;
  tabId: string;
  title: string;
  description: string;
  category: BugCategory;
  severity: BugSeverity;
  status: BugStatus;
  deviceInfo?: string;
  reporterEmail?: string;
  reporterName?: string;
  createdAt: string;
  syncedOffline?: boolean;
  resolvedAt?: string;
  syncAttempts?: number;
}

export interface OfflinePendingError extends TabError {
  queuedAt: string;
  retryCount: number;
}

export const BUG_CATEGORIES: { id: BugCategory; labelVi: string; labelEn: string; color: string; bg: string; iconName: string }[] = [
  { id: "UI/Layout", labelVi: "Giao diện & Bố cục (UI/Layout)", labelEn: "UI & Layout", color: "#38bdf8", bg: "rgba(56, 189, 248, 0.15)", iconName: "Layout" },
  { id: "Performance", labelVi: "Hiệu năng & Độ trễ (Performance)", labelEn: "Performance & Lag", color: "#fbbf24", bg: "rgba(251, 191, 36, 0.15)", iconName: "Zap" },
  { id: "Data/Logic", labelVi: "Dữ liệu & Logic (Data/Logic)", labelEn: "Data & Logic", color: "#a855f7", bg: "rgba(168, 85, 247, 0.15)", iconName: "Database" },
  { id: "Crash/Freeze", labelVi: "Đơ màn hình / Crash", labelEn: "Crash / Freeze", color: "#ef4444", bg: "rgba(239, 68, 68, 0.15)", iconName: "AlertTriangle" },
  { id: "Audio/Video", labelVi: "Âm thanh & Video (Media)", labelEn: "Audio / Video FX", color: "#ec4899", bg: "rgba(236, 72, 153, 0.15)", iconName: "Volume2" },
  { id: "Responsive/Mobile", labelVi: "Thiết bị di động (Responsive)", labelEn: "Mobile & Responsive", color: "#10b981", bg: "rgba(16, 185, 129, 0.15)", iconName: "Smartphone" },
  { id: "Other", labelVi: "Khác (Other)", labelEn: "Other Issues", color: "#94a3b8", bg: "rgba(148, 163, 184, 0.15)", iconName: "HelpCircle" },
];

export const SEVERITY_CONFIG: Record<BugSeverity, { labelVi: string; labelEn: string; badgeClass: string; color: string }> = {
  low: {
    labelVi: "Nhẹ (Low)",
    labelEn: "Low",
    badgeClass: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    color: "#3b82f6"
  },
  medium: {
    labelVi: "Trung bình (Medium)",
    labelEn: "Medium",
    badgeClass: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    color: "#f59e0b"
  },
  high: {
    labelVi: "Nghiêm trọng (High)",
    labelEn: "High",
    badgeClass: "bg-orange-500/15 text-orange-400 border-orange-500/30",
    color: "#f97316"
  },
  critical: {
    labelVi: "Khẩn cấp (Critical)",
    labelEn: "Critical",
    badgeClass: "bg-rose-500/15 text-rose-400 border-rose-500/30 animate-pulse",
    color: "#f43f5e"
  }
};
