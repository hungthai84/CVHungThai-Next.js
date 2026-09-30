import React, { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PageCardHeader } from "./PageCardHeader";
import {
  Sun,
  Moon,
  Search,
  ExternalLink,
  Plus,
  CheckCircle2,
  Circle,
  Clock,
  TrendingUp,
  TrendingDown,
  Sparkles,
  CreditCard,
  Send,
  User,
  ShieldCheck,
  Zap,
  Flame,
  Eye,
  Check,
  Copy,
  Layers,
  Activity,
  ArrowUpRight,
  Filter,
  CheckSquare,
  Square,
  AlertCircle,
  HelpCircle,
  Trash2,
  X,
  Lock,
  Unlock,
  ChevronRight,
  SlidersHorizontal,
  RefreshCw,
  LayoutGrid
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../i18n";
import { playUiSound } from "../lib/sound";
import { cn } from "../lib/utils";
import IntroductionCard from "./IntroductionCard";

/* ==========================================================================
   INTERFACES & MOCK DATA
   ========================================================================== */
interface TaskLink {
  id: string;
  code: string;
  title: string;
  tool: string;
  url: string;
  category: "cskh" | "tech" | "design" | "ops";
  status: "urgent" | "in_progress" | "review" | "done";
  priority: "high" | "medium" | "low";
  assignee: string;
  dueTime: string;
}

interface ChecklistItem {
  id: string;
  text: string;
  category: string;
  completed: boolean;
  priority: "high" | "normal";
}

interface TransactionItem {
  id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  recipient: string;
}

const INITIAL_TASK_LINKS: TaskLink[] = [
  {
    id: "task-1",
    code: "JIRA-402",
    title: "Xử lý sự cố Escalation SLA Khách Hàng VIP Enterprise",
    tool: "Jira Service Desk",
    url: "https://www.atlassian.com/software/jira",
    category: "cskh",
    status: "urgent",
    priority: "high",
    assignee: "Nguyễn Hùng Thái",
    dueTime: "Hôm nay, 17:00"
  },
  {
    id: "task-2",
    code: "PR-108",
    title: "Review Pull Request: Tối ưu hoá luồng xử lý ticket Zendesk",
    tool: "GitHub Enterprise",
    url: "https://github.com",
    category: "tech",
    status: "review",
    priority: "high",
    assignee: "Tech Lead Team",
    dueTime: "Hôm nay, 18:30"
  },
  {
    id: "task-3",
    code: "FIGMA-24",
    title: "Phê duyệt giao diện Glassmorphism Design System 2.0",
    tool: "Figma UI Kit",
    url: "https://www.figma.com",
    category: "design",
    status: "in_progress",
    priority: "high",
    assignee: "Design Lead",
    dueTime: "Ngày mai, 11:00"
  },
  {
    id: "task-4",
    code: "OPS-91",
    title: "Cập nhật Playbook Phản Ứng Khủng Hoảng CSKH Q4",
    tool: "Notion Wiki",
    url: "https://www.notion.so",
    category: "ops",
    status: "in_progress",
    priority: "medium",
    assignee: "QA Manager",
    dueTime: "28/09/2026"
  },
  {
    id: "task-5",
    code: "CRM-331",
    title: "Đồng bộ hoá chỉ số CSAT & NPS khách hàng quý 3",
    tool: "Zendesk CRM",
    url: "https://www.zendesk.com",
    category: "cskh",
    status: "done",
    priority: "medium",
    assignee: "Nguyễn Hùng Thái",
    dueTime: "Đã hoàn tất"
  },
  {
    id: "task-6",
    code: "AWS-77",
    title: "Giám sát tài nguyên máy chủ Voicebot tổng đài IP",
    tool: "AWS CloudWatch",
    url: "https://aws.amazon.com",
    category: "tech",
    status: "urgent",
    priority: "high",
    assignee: "DevOps Engineer",
    dueTime: "Hôm nay, 21:00"
  }
];

const INITIAL_CHECKLIST: ChecklistItem[] = [
  { id: "chk-1", text: "Kiểm tra báo cáo CSAT tuần đạt chỉ tiêu 99.2%", category: "CSKH", completed: true, priority: "high" },
  { id: "chk-2", text: "Họp giao ban định kỳ với ban điều hành Contact Center", category: "Quản trị", completed: true, priority: "high" },
  { id: "chk-3", text: "Audit bảo mật dữ liệu khách hàng theo ISO 27001", category: "Security", completed: false, priority: "high" },
  { id: "chk-4", text: "Review bảng phân luồng AI Chatbot trả lời tự động", category: "Tech", completed: false, priority: "normal" },
  { id: "chk-5", text: "Khen thưởng nhân sự CSKH xuất sắc tháng 9", category: "Nhân sự", completed: true, priority: "normal" },
  { id: "chk-6", text: "Cập nhật tài liệu đào tạo kịch bản xử lý phàn nàn", category: "Đào tạo", completed: false, priority: "normal" }
];

export default function TemplatePage() {
  const { themeMode, setThemeMode, resolvedTheme } = useTheme();
  const { lang } = useLanguage();
  const isVi = lang === "vi";
  const isDark = resolvedTheme === "dark";

  // Task Hub States
  const [taskLinks, setTaskLinks] = useState<TaskLink[]>(INITIAL_TASK_LINKS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [newTaskCode, setNewTaskCode] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskTool, setNewTaskTool] = useState("Jira");
  const [newTaskUrl, setNewTaskUrl] = useState("https://jira.atlassian.com");
  const [newTaskCategory, setNewTaskCategory] = useState<"cskh" | "tech" | "design" | "ops">("cskh");
  const [newTaskPriority, setNewTaskPriority] = useState<"high" | "medium" | "low">("high");

  // Analytics Sparkline States
  const [analyticsPeriod, setAnalyticsPeriod] = useState<"7d" | "30d" | "90d">("7d");
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);

  // Digital Asset States
  const [currency, setCurrency] = useState<"USD" | "VND">("USD");
  const [balanceUSD, setBalanceUSD] = useState(48250.0);
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [transferAmount, setTransferAmount] = useState("");
  const [transferRecipient, setTransferRecipient] = useState("");
  const [transferNote, setTransferNote] = useState("");
  const [transferError, setTransferError] = useState<string | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<TransactionItem[]>([
    { id: "tx-1", title: "Thanh toán License Jira Enterprise", amount: 1200, type: "expense", date: "24/09", recipient: "Atlassian Inc" },
    { id: "tx-2", title: "Thưởng KPI CSKH Quý 3", amount: 5500, type: "income", date: "22/09", recipient: "Tập Đoàn MRI" },
    { id: "tx-3", title: "Gia hạn gói Cloud Server AWS", amount: 840, type: "expense", date: "20/09", recipient: "Amazon Web Services" }
  ]);

  // Profile Status States
  const [profileStatus, setProfileStatus] = useState<"online" | "busy" | "focus" | "dnd">("online");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Checklist States
  const [checklist, setChecklist] = useState<ChecklistItem[]>(INITIAL_CHECKLIST);
  const [newChecklistText, setNewChecklistText] = useState("");
  const [checklistFilter, setChecklistFilter] = useState<"all" | "active" | "completed">("all");

  // Layout View Mode: 1 Cột 1 Hàng (Single-row stream) as default requested
  const [viewLayout, setViewLayout] = useState<"single-row" | "bento">("single-row");
  const [activeSubTab, setActiveSubTab] = useState<"all" | "work" | "analytics" | "profile">("all");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  /* ==========================================================================
     TASK LINKS FILTER & HANDLERS
     ========================================================================== */
  const filteredTaskLinks = useMemo(() => {
    return taskLinks.filter((task) => {
      const matchQuery =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tool.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === "all" || task.category === selectedCategory;
      return matchQuery && matchCategory;
    });
  }, [taskLinks, searchQuery, selectedCategory]);

  const handleOpenPriorityTasks = () => {
    playUiSound("success");
    const priorityTasks = taskLinks.filter((t) => t.priority === "high" && t.status !== "done");
    if (priorityTasks.length === 0) {
      showToast(isVi ? "Tất cả các task ưu tiên đã được xử lý xong!" : "All high priority tasks completed!");
      return;
    }

    priorityTasks.forEach((task) => {
      window.open(task.url, "_blank", "noopener,noreferrer");
    });
    showToast(
      isVi
        ? `Đã mở an toàn ${priorityTasks.length} tác vụ ưu tiên cao trong tab mới!`
        : `Safely opened ${priorityTasks.length} priority tasks in new tabs!`
    );
  };

  const handleAddNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !newTaskCode.trim()) return;

    playUiSound("click");
    const created: TaskLink = {
      id: `task-${Date.now()}`,
      code: newTaskCode.trim().toUpperCase(),
      title: newTaskTitle.trim(),
      tool: newTaskTool,
      url: newTaskUrl.trim() || "https://google.com",
      category: newTaskCategory,
      status: "in_progress",
      priority: newTaskPriority,
      assignee: "Nguyễn Hùng Thái",
      dueTime: "Hôm nay, 23:59"
    };

    setTaskLinks([created, ...taskLinks]);
    setNewTaskCode("");
    setNewTaskTitle("");
    setIsAddTaskModalOpen(false);
    showToast(isVi ? `Đã thêm tác vụ [${created.code}] vào cổng điều hành!` : `Added task [${created.code}] to Workspace!`);
  };

  /* ==========================================================================
     ANALYTICS SPARKLINE DATA
     ========================================================================== */
  const sparklineData = useMemo(() => {
    if (analyticsPeriod === "7d") {
      return [
        { label: "T2", value: 88, csat: 98.4, tickets: 240 },
        { label: "T3", value: 92, csat: 98.9, tickets: 275 },
        { label: "T4", value: 90, csat: 99.1, tickets: 310 },
        { label: "T5", value: 96, csat: 99.3, tickets: 290 },
        { label: "T6", value: 94, csat: 99.0, tickets: 260 },
        { label: "T7", value: 98, csat: 99.4, tickets: 180 },
        { label: "CN", value: 99, csat: 99.6, tickets: 140 }
      ];
    }
    if (analyticsPeriod === "30d") {
      return [
        { label: "Tuần 1", value: 85, csat: 97.8, tickets: 1200 },
        { label: "Tuần 2", value: 91, csat: 98.5, tickets: 1420 },
        { label: "Tuần 3", value: 94, csat: 99.0, tickets: 1380 },
        { label: "Tuần 4", value: 99, csat: 99.4, tickets: 1510 }
      ];
    }
    return [
      { label: "Tháng 7", value: 82, csat: 97.0, tickets: 5400 },
      { label: "Tháng 8", value: 91, csat: 98.4, tickets: 5900 },
      { label: "Tháng 9", value: 99, csat: 99.4, tickets: 6200 }
    ];
  }, [analyticsPeriod]);

  // SVG Math for Sparkline Curve
  const svgWidth = 400;
  const svgHeight = 120;
  const minVal = Math.min(...sparklineData.map((d) => d.value)) - 5;
  const maxVal = Math.max(...sparklineData.map((d) => d.value)) + 5;

  const points = sparklineData.map((d, index) => {
    const x = (index / (sparklineData.length - 1)) * (svgWidth - 40) + 20;
    const y = svgHeight - 20 - ((d.value - minVal) / (maxVal - minVal)) * (svgHeight - 40);
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, curr, idx) => {
    if (idx === 0) return `M ${curr.x},${curr.y}`;
    const prev = points[idx - 1];
    const cp1x = prev.x + (curr.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (curr.x - prev.x) / 2;
    const cp2y = curr.y;
    return `${acc} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${curr.x},${curr.y}`;
  }, "");

  const areaD = `${pathD} L ${points[points.length - 1].x},${svgHeight} L ${points[0].x},${svgHeight} Z`;

  /* ==========================================================================
     DIGITAL WALLET TRANSFER HANDLER
     ========================================================================== */
  const handleExecuteTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    setTransferError(null);
    const amountNum = parseFloat(transferAmount);

    if (isNaN(amountNum) || amountNum <= 0) {
      setTransferError(isVi ? "Vui lòng nhập số tiền hợp lệ lớn hơn 0" : "Please enter a valid amount");
      return;
    }
    if (amountNum > balanceUSD) {
      setTransferError(isVi ? "Số dư khả dụng không đủ để thực hiện giao dịch" : "Insufficient funds available");
      return;
    }
    if (!transferRecipient.trim()) {
      setTransferError(isVi ? "Vui lòng nhập thông tin người thụ hưởng" : "Please enter beneficiary info");
      return;
    }

    playUiSound("success");
    setBalanceUSD((prev) => prev - amountNum);
    const newTx: TransactionItem = {
      id: `tx-${Date.now()}`,
      title: transferNote.trim() || (isVi ? "Chuyển khoản thanh toán" : "Direct Transfer"),
      amount: amountNum,
      type: "expense",
      date: "Hôm nay",
      recipient: transferRecipient.trim()
    };
    setRecentTransactions([newTx, ...recentTransactions]);
    setIsTransferModalOpen(false);
    setTransferAmount("");
    setTransferRecipient("");
    setTransferNote("");
    showToast(
      isVi
        ? `Giao dịch thành công! Đã chuyển $${amountNum.toLocaleString()} đến ${newTx.recipient}`
        : `Transfer successful! Sent $${amountNum.toLocaleString()} to ${newTx.recipient}`
    );
  };

  /* ==========================================================================
     CHECKLIST HANDLERS
     ========================================================================== */
  const toggleChecklistItem = (id: string) => {
    playUiSound("click");
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const handleAddChecklistItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChecklistText.trim()) return;
    playUiSound("click");
    const newItem: ChecklistItem = {
      id: `chk-${Date.now()}`,
      text: newChecklistText.trim(),
      category: "Nhiệm vụ",
      completed: false,
      priority: "normal"
    };
    setChecklist([...checklist, newItem]);
    setNewChecklistText("");
  };

  const filteredChecklist = useMemo(() => {
    return checklist.filter((item) => {
      if (checklistFilter === "active") return !item.completed;
      if (checklistFilter === "completed") return item.completed;
      return true;
    });
  }, [checklist, checklistFilter]);

  const completedCount = checklist.filter((c) => c.completed).length;
  const progressPercent = Math.round((completedCount / (checklist.length || 1)) * 100);

  return (
    <div id="template" className="relative w-full h-full flex flex-col justify-start items-stretch p-[15px] font-play text-slate-800 dark:text-slate-100 transition-colors duration-300 bg-transparent overflow-y-auto no-scrollbar">
      {/* =======================================================================
          2. AMBIENT MESH GRADIENT BLOBS (Khối màu chuyển động tuần hoàn khúc xạ kính)
          ======================================================================= */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {/* Blob 1: Cyan / Light Blue */}
        <div className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-tr from-cyan-400/30 to-blue-600/30 dark:from-cyan-500/20 dark:to-blue-700/20 blur-[100px] animate-pulse transition-transform duration-1000" />
        
        {/* Blob 2: Electric Purple / Magenta */}
        <div className="absolute top-[35%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-bl from-purple-500/30 to-fuchsia-600/30 dark:from-purple-600/20 dark:to-pink-700/20 blur-[110px] animate-pulse" style={{ animationDuration: "7s" }} />
        
        {/* Blob 3: Amber / Indigo Accent */}
        <div className="absolute -bottom-[10%] left-[20%] w-[60vw] h-[45vw] rounded-full bg-gradient-to-tr from-indigo-500/25 to-amber-400/20 dark:from-indigo-700/15 dark:to-amber-500/15 blur-[120px]" style={{ animationDuration: "9s" }} />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full flex-grow flex flex-col gap-[15px] max-w-7xl mx-auto justify-start">
        {/* Header Card Trang mẫu */}
        <PageCardHeader pageId="template" />

        {/* =======================================================================
            1. HEADER BAR (Logo, Glass Nav, 3-State Theme Switcher, Avatar)
            ======================================================================= */}
        <header style={{ borderRadius: "var(--theme-radius-card, 10px)" }} className="w-full rounded-[10px] p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 glass-panel border border-white/60 dark:border-white/10 shadow-lg backdrop-blur-xl bg-white/65 dark:bg-slate-900/65 transition-all">
          {/* Brand Logo & System Status */}
          <div className="flex items-center gap-3.5">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-[10px] bg-gradient-to-tr from-indigo-600 via-cyan-500 to-blue-500 text-white font-bold shadow-md shadow-indigo-500/25 border border-white/40">
              <span className="text-base font-black tracking-wider">HT</span>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                  Nguyễn Hùng Thái
                </h1>
                <span className="px-2 py-0.5 rounded-full text-3xs font-mono font-bold uppercase bg-indigo-500/15 text-indigo-700 dark:text-cyan-300 border border-indigo-500/25">
                  Glass OS v2.4
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {isVi ? "Giám Đốc Chăm Sóc Khách Hàng · Trực Tuyến" : "Customer Experience Director · Online"}
              </p>
            </div>
          </div>

          {/* Controls: 3-State Theme Switcher & User Profile */}
          <div className="flex items-center gap-3">
            {/* 3-State Theme Switcher */}
            <div className="flex items-center p-1 rounded-[10px] bg-slate-200/60 dark:bg-slate-800/70 border border-slate-300/60 dark:border-white/10 shadow-inner">
              <button
                type="button"
                onClick={() => {
                  playUiSound("click");
                  setThemeMode("light");
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-bold transition-all cursor-pointer ${
                  themeMode === "light"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                title={isVi ? "Chế độ Sáng" : "Light Mode"}
              >
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">{isVi ? "Sáng" : "Light"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playUiSound("click");
                  setThemeMode("dark");
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-bold transition-all cursor-pointer ${
                  themeMode === "dark"
                    ? "bg-slate-950 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                title={isVi ? "Chế độ Tối Neon" : "Dark Mode"}
              >
                <Moon className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">{isVi ? "Tối" : "Dark"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playUiSound("click");
                  setThemeMode("system");
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-bold transition-all cursor-pointer ${
                  themeMode === "system"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                title={isVi ? "Tự động theo hệ điều hành" : "System Mode"}
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">{isVi ? "Hệ thống" : "System"}</span>
              </button>
            </div>

            {/* Layout View Switcher: 1 Cột 1 Hàng vs Bento Grid */}
            <div className="flex items-center p-1 rounded-[10px] bg-slate-200/60 dark:bg-slate-800/70 border border-slate-300/60 dark:border-white/10 shadow-inner">
              <button
                type="button"
                onClick={() => {
                  playUiSound("click");
                  setViewLayout("single-row");
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-bold transition-all cursor-pointer ${
                  viewLayout === "single-row"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                title={isVi ? "Xem từng phần theo 1 cột 1 hàng" : "1 Column 1 Row View"}
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isVi ? "1 Cột 1 Hàng" : "1 Column Row"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playUiSound("click");
                  setViewLayout("bento");
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-bold transition-all cursor-pointer ${
                  viewLayout === "bento"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                title={isVi ? "Xem dạng lưới Bento Grid" : "Bento Grid View"}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isVi ? "Lưới Bento" : "Bento Grid"}</span>
              </button>
            </div>

            {/* Quick Priority Action */}
            <button
              type="button"
              onClick={handleOpenPriorityTasks}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-[10px] bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-indigo-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>{isVi ? "Mở task ưu tiên" : "Open Priority"}</span>
            </button>
          </div>
        </header>

        {/* =======================================================================
            TAB NAVIGATION FOR DASHBOARD (Thêm Tab vào trang)
            ======================================================================= */}
        <div className="sticky top-[64px] sm:top-[72px] z-30 w-full mb-6 py-2 overflow-x-auto no-scrollbar transition-all duration-300 bg-transparent">
          <div className="flex items-center gap-1.5 p-1.5 min-w-max bg-slate-100/80 dark:bg-slate-950/60 rounded-2xl border border-slate-200/40 dark:border-white/5 shrink-0 select-none shadow-sm">
            {[
              { id: "all", labelVi: "Tổng Quan", labelEn: "Overview", Icon: LayoutGrid },
              { id: "work", labelVi: "Tác Vụ & Checklist", labelEn: "Tasks & Checklist", Icon: CheckSquare },
              { id: "analytics", labelVi: "Chỉ Số Hiệu Suất", labelEn: "Performance KPIs", Icon: TrendingUp },
              { id: "profile", labelVi: "Hồ Sơ & Tài Chính", labelEn: "Profile & Finance", Icon: User }
            ].map((subTab) => {
              const isSubActive = activeSubTab === subTab.id;
              const Icon = subTab.Icon;
              return (
                <button
                  key={subTab.id}
                  type="button"
                  onClick={() => {
                    playUiSound("click");
                    setActiveSubTab(subTab.id as any);
                  }}
                  className={cn(
                    "flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0",
                    isSubActive
                      ? "bg-indigo-600 dark:bg-cyan-500 text-white shadow-md shadow-indigo-600/20 dark:shadow-cyan-500/10"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800/40"
                  )}
                >
                  <Icon className={cn("w-4 h-4 shrink-0 transition-transform", isSubActive ? "text-white scale-110" : "text-slate-400 dark:text-slate-400")} />
                  <span>{isVi ? subTab.labelVi : subTab.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =======================================================================
            DASHBOARD MAIN LAYOUT (1 Cột 1 Hàng mặc định hoặc Bento Grid)
            ======================================================================= */}
        <main className={viewLayout === "single-row" ? "flex flex-col gap-[15px] w-full" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px]"}>
          {/* ===================================================================
              THÈ GIỚI THIỆU BẢN THÂN (Introduction Showcase Card)
              Tái tạo tinh tế, chuẩn xác từ hình ảnh đính kèm
              =================================================================== */}
          {(activeSubTab === "all" || activeSubTab === "profile") && (
            <IntroductionCard viewLayout={viewLayout} />
          )}

          {/* ===================================================================
              CARD 1: CỔNG ĐIỀU HÀNH TÁC VỤ HỆ THỐNG
              =================================================================== */}
          {(activeSubTab === "all" || activeSubTab === "work") && (
            <section 
              style={{ borderRadius: "var(--theme-radius-card, 10px)" }}
              className={`w-full p-[15px] sm:p-6 border border-white/60 dark:border-white/10 shadow-xl backdrop-blur-2xl bg-white/75 dark:bg-slate-900/75 flex flex-col justify-between transition-all ${
                viewLayout === "bento" ? "col-span-1 md:col-span-2 lg:col-span-2" : "col-span-1"
              }`}
            >
            <div className="space-y-4">
              {/* Header của Task Hub */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/60 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[10px] bg-indigo-500/15 text-indigo-600 dark:text-cyan-400 flex items-center justify-center font-bold border border-indigo-500/20">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>{isVi ? "Cổng Điều Hành Tác Vụ Hệ Thống" : "Workspace Task Links Hub"}</span>
                      <span className="px-2 py-0.5 rounded-full text-3xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                        {filteredTaskLinks.length} Tasks
                      </span>
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {isVi ? "Truy cập trực tiếp liên kết công cụ, điều phối & xử lý tác vụ đa nền tảng" : "Direct tool dispatch hub & high-priority task orchestration"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddTaskModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{isVi ? "Thêm link tác vụ" : "Add Link"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenPriorityTasks}
                    className="flex sm:hidden items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-bold"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>{isVi ? "Mở gấp" : "Open Urgent"}</span>
                  </button>
                </div>
              </div>

              {/* Thanh tìm kiếm & Bộ lọc Category */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                {/* Search Bar */}
                <div className="relative w-full sm:flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isVi ? "Tìm theo tên task, mã ticket (VD: JIRA-402, PR-108)..." : "Search by task name or ticket ID..."}
                    className="w-full pl-9 pr-4 py-2 rounded-[10px] bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                  {[
                    { id: "all", labelVi: "Tất cả", labelEn: "All" },
                    { id: "cskh", labelVi: "CSKH & CRM", labelEn: "CX/CRM" },
                    { id: "tech", labelVi: "Kỹ thuật", labelEn: "Tech" },
                    { id: "design", labelVi: "Thiết kế", labelEn: "Design" },
                    { id: "ops", labelVi: "Vận hành", labelEn: "Ops" }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        playUiSound("click");
                        setSelectedCategory(cat.id);
                      }}
                      className={`px-3 py-1.5 rounded-[10px] text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        selectedCategory === cat.id
                          ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs"
                          : "bg-slate-100/70 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200/70 dark:hover:bg-slate-800"
                      }`}
                    >
                      {isVi ? cat.labelVi : cat.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Danh sách Task Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                <AnimatePresence mode="popLayout">
                  {filteredTaskLinks.map((task) => {
                    const isUrgent = task.status === "urgent";
                    const isDone = task.status === "done";
                    const isReview = task.status === "review";

                    return (
                      <motion.a
                        key={task.id}
                        href={task.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="group relative p-3.5 rounded-[10px] bg-white/60 dark:bg-slate-800/50 hover:bg-white/95 dark:hover:bg-slate-800/90 border border-slate-200/80 dark:border-white/10 hover:border-indigo-400 dark:hover:border-cyan-400 shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
                      >
                        <div className="space-y-1.5">
                          {/* Top Row: Ticket Code & Status Badges */}
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-xs font-black text-indigo-600 dark:text-cyan-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800/50">
                              {task.code}
                            </span>
                            
                            {/* Status Tag */}
                            <span
                              className={`px-2 py-0.5 rounded-md text-3xs font-bold flex items-center gap-1 ${
                                isUrgent
                                  ? "bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                                  : isDone
                                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                                  : isReview
                                  ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                                  : "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30"
                              }`}
                            >
                              {isUrgent && <Flame className="w-3 h-3 animate-pulse" />}
                              {isDone && <CheckCircle2 className="w-3 h-3" />}
                              {isReview && <Eye className="w-3 h-3" />}
                              <span>
                                {task.status === "urgent"
                                  ? (isVi ? "Gấp" : "Urgent")
                                  : task.status === "in_progress"
                                  ? (isVi ? "Đang làm" : "In Progress")
                                  : task.status === "review"
                                  ? (isVi ? "Cần Review" : "Review")
                                  : (isVi ? "Hoàn tất" : "Done")}
                              </span>
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-cyan-300 transition-colors line-clamp-2 leading-relaxed">
                            {task.title}
                          </h3>
                        </div>

                        {/* Bottom Row: Tool Name & Due Info */}
                        <div className="pt-2.5 mt-2 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between text-3xs text-slate-500 dark:text-slate-400 font-medium">
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                            {task.tool}
                          </span>
                          <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300 font-semibold group-hover:translate-x-0.5 transition-transform">
                            {task.dueTime}
                            <ArrowUpRight className="w-3 h-3 opacity-70 group-hover:opacity-100" />
                          </span>
                        </div>
                      </motion.a>
                    );
                  })}
                </AnimatePresence>

                {filteredTaskLinks.length === 0 && (
                  <div className="col-span-2 p-8 text-center text-slate-400 space-y-2">
                    <AlertCircle className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
                    <p className="text-xs font-semibold">{isVi ? "Không tìm thấy tác vụ nào phù hợp" : "No matching tasks found"}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Hub Footer Action */}
            <div className="pt-4 mt-3 border-t border-slate-200/50 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                {isVi ? "Mã hoá & liên kết xác thực an toàn chuẩn Enterprise" : "Enterprise SSO & Verified Endpoints Active"}
              </span>
              <button
                type="button"
                onClick={handleOpenPriorityTasks}
                className="text-xs font-bold text-indigo-600 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>{isVi ? "Mở tất cả task ưu tiên" : "Open all priority tasks"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>
          )}

          {/* ===================================================================
              CARD 2: HỒ SƠ NHÂN SỰ & TRẠNG THÁI (Profile Status Card)
              =================================================================== */}
          {(activeSubTab === "all" || activeSubTab === "profile") && (
            <section 
              style={{ borderRadius: "var(--theme-radius-card, 10px)" }}
              className="w-full p-[15px] sm:p-6 border border-white/60 dark:border-white/10 shadow-xl backdrop-blur-2xl bg-white/75 dark:bg-slate-900/75 flex flex-col justify-between space-y-4 transition-all"
            >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {isVi ? "Hồ Sơ & Trạng Thái Trực Tuyến" : "Profile & Live Status"}
                  </span>
                </div>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-3xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-indigo-400 cursor-pointer"
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        profileStatus === "online"
                          ? "bg-emerald-500 animate-pulse"
                          : profileStatus === "busy"
                          ? "bg-amber-500"
                          : profileStatus === "focus"
                          ? "bg-purple-500"
                          : "bg-rose-500"
                      }`}
                    />
                    <span>
                      {profileStatus === "online"
                        ? (isVi ? "Trực tuyến" : "Online")
                        : profileStatus === "busy"
                        ? (isVi ? "Đang họp" : "In Meeting")
                        : profileStatus === "focus"
                        ? (isVi ? "Tập trung" : "Focus Mode")
                        : (isVi ? "Không làm phiền" : "DND")}
                    </span>
                  </button>

                  {/* Status Dropdown Popover */}
                  <AnimatePresence>
                    {isStatusDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 5 }}
                        className="absolute right-0 top-full mt-1.5 w-44 rounded-[10px] bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-white/15 p-2 shadow-xl z-30 backdrop-blur-xl space-y-1"
                      >
                        {[
                          { id: "online", label: isVi ? "🟢 Đang trực tuyến" : "🟢 Available Online" },
                          { id: "busy", label: isVi ? "🟡 Đang bận họp" : "🟡 In a Meeting" },
                          { id: "focus", label: isVi ? "🟣 Tập trung CSKH" : "🟣 CX Focus Time" },
                          { id: "dnd", label: isVi ? "🔴 Đừng làm phiền" : "🔴 Do Not Disturb" }
                        ].map((st) => (
                          <button
                            key={st.id}
                            type="button"
                            onClick={() => {
                              playUiSound("click");
                              setProfileStatus(st.id as any);
                              setIsStatusDropdownOpen(false);
                              showToast(isVi ? `Đã đổi trạng thái: ${st.label}` : `Status updated: ${st.label}`);
                            }}
                            className="w-full text-left px-3 py-1.5 rounded-[10px] text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          >
                            {st.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Profile Main Visual */}
              <div className="pt-4 flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-[10px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20">
                  <div className="w-full h-full rounded-[8px] bg-slate-900 flex items-center justify-center text-white font-black text-xl">
                    HT
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    Nguyễn Hùng Thái
                  </h3>
                  <p className="text-xs text-indigo-600 dark:text-cyan-400 font-semibold">
                    Customer Care & CX Director
                  </p>
                  <p className="text-3xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                    22+ Năm Kinh Nghiệm Vận Hành
                  </p>
                </div>
              </div>

              {/* Core Skill Badges */}
              <div className="pt-4 space-y-2">
                <span className="text-3xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                  {isVi ? "Kỹ năng nòng cốt:" : "Core Competencies:"}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["CSAT & NPS 99%", "Agile Leadership", "Omnichannel CRM", "Escalation SLA", "Glass Systems"].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-[10px] text-3xs font-bold bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Contact Action */}
            <div className="pt-3 border-t border-slate-200/50 dark:border-white/10 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  playUiSound("click");
                  navigator.clipboard.writeText("hungthai84@gmail.com");
                  showToast(isVi ? "Đã sao chép email: hungthai84@gmail.com" : "Copied email: hungthai84@gmail.com");
                }}
                className="flex-1 py-2 px-3 rounded-[10px] bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{isVi ? "Sao chép Email" : "Copy Email"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playUiSound("click");
                  window.location.href = "mailto:hungthai84@gmail.com";
                }}
                className="py-2 px-3 rounded-[10px] bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isVi ? "Gửi thư" : "Email"}</span>
              </button>
            </div>
          </section>
          )}

          {/* ===================================================================
              CARD 3: CHỈ SỐ & BIỂU ĐỒ PHÂN TÍCH (Analytics Sparkline Card)
              =================================================================== */}
          {(activeSubTab === "all" || activeSubTab === "analytics") && (
            <section 
              style={{ borderRadius: "var(--theme-radius-card, 10px)" }}
              className="w-full p-[15px] sm:p-6 border border-white/60 dark:border-white/10 shadow-xl backdrop-blur-2xl bg-white/75 dark:bg-slate-900/75 flex flex-col justify-between space-y-4 transition-all"
            >
            <div className="space-y-3">
              {/* Header & Period Switcher */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {isVi ? "Chỉ Số Hiệu Suất CSKH" : "CX Performance KPIs"}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                    {isVi ? "Chỉ số CSAT & SLA Tuần" : "CSAT & SLA Trend"}
                  </h3>
                </div>

                <div className="flex items-center p-1 rounded-[10px] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-3xs font-bold">
                  {(["7d", "30d", "90d"] as const).map((period) => (
                    <button
                      key={period}
                      type="button"
                      onClick={() => {
                        playUiSound("click");
                        setAnalyticsPeriod(period);
                      }}
                      className={`px-2 py-0.5 rounded-[10px] transition-all cursor-pointer ${
                        analyticsPeriod === period
                          ? "bg-white text-slate-900 dark:bg-slate-950 dark:text-white shadow-xs"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {period.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* KPI Highlights */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-[10px] bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-3xs font-semibold text-emerald-700 dark:text-emerald-300 block">
                    CSAT Score
                  </span>
                  <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mt-0.5">
                    <span>99.4%</span>
                    <span className="text-3xs font-mono font-bold bg-emerald-500/20 px-1 rounded text-emerald-700 dark:text-emerald-300">
                      +2.4%
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-[10px] bg-indigo-500/10 border border-indigo-500/20">
                  <span className="text-3xs font-semibold text-indigo-700 dark:text-indigo-300 block">
                    FCR (Xử lý lần đầu)
                  </span>
                  <div className="text-lg font-black text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 mt-0.5">
                    <span>94.2%</span>
                    <span className="text-3xs font-mono font-bold bg-indigo-500/20 px-1 rounded text-indigo-700 dark:text-indigo-300">
                      +5.1%
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive Vector Sparkline */}
              <div className="relative pt-2">
                <div className="flex items-center justify-between text-3xs font-mono text-slate-400 mb-1">
                  <span>Biểu đồ tỉ lệ đạt CSAT</span>
                  <span className="text-emerald-500 font-bold">Max 99.6%</span>
                </div>

                <div className="relative w-full h-[120px]">
                  <svg
                    viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                    className="w-full h-full overflow-visible"
                  >
                    <defs>
                      <linearGradient id="sparklineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Gradient Area */}
                    <path d={areaD} fill="url(#sparklineGrad)" />

                    {/* Main Curve Line */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke="var(--color-primary, #2563eb)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="transition-all duration-300"
                    />

                    {/* Data Points */}
                    {points.map((p, idx) => (
                      <g key={idx} className="cursor-pointer">
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={hoveredPointIndex === idx ? 6 : 4}
                          fill={hoveredPointIndex === idx ? "#00f5ff" : "#2563eb"}
                          stroke="#ffffff"
                          strokeWidth="2"
                          onMouseEnter={() => setHoveredPointIndex(idx)}
                          onMouseLeave={() => setHoveredPointIndex(null)}
                          className="transition-all"
                        />
                      </g>
                    ))}
                  </svg>

                  {/* Dynamic Tooltip on Hover */}
                  {hoveredPointIndex !== null && points[hoveredPointIndex] && (
                    <div
                      className="absolute -top-7 transform -translate-x-1/2 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-3xs font-bold shadow-xl border border-white/20 pointer-events-none z-20 flex items-center gap-1.5"
                      style={{
                        left: `${(points[hoveredPointIndex].x / svgWidth) * 100}%`
                      }}
                    >
                      <span>{points[hoveredPointIndex].label}:</span>
                      <span className="text-cyan-400 font-mono">{points[hoveredPointIndex].csat}% CSAT</span>
                      <span className="text-slate-400">({points[hoveredPointIndex].tickets} tickets)</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sparkline Footer */}
            <div className="pt-3 border-t border-slate-200/50 dark:border-white/10 flex items-center justify-between text-3xs text-slate-500 dark:text-slate-400 font-medium">
              <span>{isVi ? "Thời gian phản hồi TB:" : "Avg Response Time:"} <strong className="text-slate-800 dark:text-slate-200">42 Giây</strong></span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{isVi ? "Vượt 18% cam kết SLA" : "18% Better than SLA"}</span>
            </div>
          </section>
          )}

          {/* ===================================================================
              CARD 4: THẺ VÍ SỐ / TÀI CHÍNH (Digital Asset Card)
              =================================================================== */}
          {(activeSubTab === "all" || activeSubTab === "profile") && (
            <section 
              style={{ borderRadius: "var(--theme-radius-card, 10px)" }}
              className="w-full p-[15px] sm:p-6 border border-white/60 dark:border-white/10 shadow-xl backdrop-blur-2xl bg-white/75 dark:bg-slate-900/75 flex flex-col justify-between space-y-4 transition-all"
            >
            <div className="space-y-4">
              {/* Header & Currency Switcher */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-purple-500" />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {isVi ? "Ví Kỹ Thuật Số & Chi Phí CSKH" : "Digital Asset & Budget"}
                  </span>
                </div>

                <div className="flex items-center p-1 rounded-[10px] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-3xs font-bold">
                  <button
                    type="button"
                    onClick={() => {
                      playUiSound("click");
                      setCurrency("USD");
                    }}
                    className={`px-2 py-0.5 rounded-[10px] transition-all cursor-pointer ${
                      currency === "USD"
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    USD ($)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playUiSound("click");
                      setCurrency("VND");
                    }}
                    className={`px-2 py-0.5 rounded-[10px] transition-all cursor-pointer ${
                      currency === "VND"
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    VND (₫)
                  </button>
                </div>
              </div>

              {/* Layered Glass Virtual Card */}
              <div className="relative w-full rounded-[10px] p-4 sm:p-5 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white shadow-xl shadow-indigo-600/25 border border-white/30 overflow-hidden">
                {/* Chip and Hologram Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {/* Simulated EMV Chip */}
                    <div className="w-8 h-6 rounded-[6px] bg-amber-300/80 border border-amber-400/90 shadow-inner flex items-center justify-center">
                      <span className="w-4 h-3 border border-amber-500/50 rounded-xs opacity-70" />
                    </div>
                    <span className="text-3xs font-mono tracking-widest text-indigo-200 uppercase">
                      Contactless
                    </span>
                  </div>
                  <span className="font-mono text-xs font-black tracking-wider text-cyan-300">
                    VISA PLATINUM
                  </span>
                </div>

                {/* Balance Display */}
                <div>
                  <span className="text-3xs text-indigo-200 font-medium block">
                    {isVi ? "Số dư khả dụng (Available Balance):" : "Available Balance:"}
                  </span>
                  <div className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">
                    {currency === "USD"
                      ? `$${balanceUSD.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
                      : `${(balanceUSD * 25300).toLocaleString("vi-VN")} ₫`}
                  </div>
                </div>

                {/* Card Number & Holder */}
                <div className="pt-4 mt-2 flex items-center justify-between text-3xs font-mono">
                  <div>
                    <span className="text-indigo-300 block text-4xs uppercase">Chủ thẻ</span>
                    <span className="font-bold tracking-wider">NGUYEN HUNG THAI</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span>{showCardNumber ? "4829 •••• •••• 9924" : "•••• •••• •••• 9924"}</span>
                    <button
                      type="button"
                      onClick={() => setShowCardNumber(!showCardNumber)}
                      className="text-indigo-200 hover:text-white"
                    >
                      {showCardNumber ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Transfer CTA Button */}
              <button
                type="button"
                onClick={() => {
                  playUiSound("click");
                  setIsTransferModalOpen(true);
                }}
                className="w-full py-2.5 rounded-[10px] bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-indigo-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isVi ? "Chuyển tiền & Thanh toán nhanh" : "Quick Transfer Funds"}</span>
              </button>
            </div>

            {/* Recent Mini Transactions */}
            <div className="space-y-1.5 pt-2 border-t border-slate-200/50 dark:border-white/10">
              <span className="text-3xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                {isVi ? "Giao dịch gần nhất:" : "Recent Transactions:"}
              </span>
              <div className="space-y-1">
                {recentTransactions.slice(0, 2).map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between text-3xs p-1.5 rounded-[10px] bg-slate-100/60 dark:bg-slate-800/40"
                  >
                    <span className="truncate max-w-[170px] text-slate-700 dark:text-slate-300 font-medium">
                      {tx.title}
                    </span>
                    <span className="font-mono font-bold text-rose-500 dark:text-rose-400">
                      -${tx.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
          )}

          {/* ===================================================================
              CARD 5: CHECKLIST CÔNG VIỆC TƯƠNG TÁC (Interactive Checklist Card)
              =================================================================== */}
          {(activeSubTab === "all" || activeSubTab === "work") && (
            <section 
              style={{ borderRadius: "var(--theme-radius-card, 10px)" }}
              className={`w-full p-[15px] sm:p-6 border border-white/60 dark:border-white/10 shadow-xl backdrop-blur-2xl bg-white/75 dark:bg-slate-900/75 flex flex-col justify-between space-y-4 transition-all ${
                viewLayout === "bento" ? "md:col-span-2 lg:col-span-1" : "col-span-1"
              }`}
            >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {isVi ? "Checklist Công Việc Trong Ngày" : "Interactive Daily Checklist"}
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  {progressPercent}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-3xs font-semibold text-slate-500 dark:text-slate-400">
                  <span>{completedCount}/{checklist.length} {isVi ? "nhiệm vụ hoàn thành" : "tasks completed"}</span>
                  <span className="font-mono font-bold text-indigo-600 dark:text-cyan-400">{progressPercent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 p-1 rounded-[10px] bg-slate-100 dark:bg-slate-800 text-3xs font-bold">
                {[
                  { id: "all", labelVi: "Tất cả", labelEn: "All" },
                  { id: "active", labelVi: "Chưa xong", labelEn: "Active" },
                  { id: "completed", labelVi: "Đã xong", labelEn: "Done" }
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      playUiSound("click");
                      setChecklistFilter(f.id as any);
                    }}
                    className={`flex-1 py-1 rounded-[10px] transition-all cursor-pointer ${
                      checklistFilter === f.id
                        ? "bg-white text-slate-900 dark:bg-slate-950 dark:text-white shadow-xs"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {isVi ? f.labelVi : f.labelEn}
                  </button>
                ))}
              </div>

              {/* Checklist Items */}
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {filteredChecklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklistItem(item.id)}
                    className={`p-2.5 rounded-[10px] border transition-all flex items-start gap-2.5 cursor-pointer select-none ${
                      item.completed
                        ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/50 dark:border-emerald-800/40 text-slate-500 dark:text-slate-400"
                        : "bg-white/80 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/80 hover:border-indigo-400 text-slate-800 dark:text-slate-100"
                    }`}
                  >
                    <button type="button" className="mt-0.5 shrink-0 text-indigo-600 dark:text-cyan-400">
                      {item.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-xs font-semibold leading-snug transition-all ${
                          item.completed ? "line-through opacity-70" : ""
                        }`}
                      >
                        {item.text}
                      </p>
                      <span className="text-4xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-0.5 block">
                        #{item.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Checklist Inline Form */}
              <form onSubmit={handleAddChecklistItem} className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  value={newChecklistText}
                  onChange={(e) => setNewChecklistText(e.target.value)}
                  placeholder={isVi ? "Thêm công việc mới..." : "Add a new task..."}
                  className="flex-1 px-3 py-1.5 rounded-[10px] bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={!newChecklistText.trim()}
                  className="px-3 py-1.5 rounded-[10px] bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            {/* Checklist Footer */}
            <div className="pt-3 border-t border-slate-200/50 dark:border-white/10 flex items-center justify-between text-3xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                {isVi ? "Tự động đồng bộ với lịch trình CSKH" : "Auto-synced with daily schedule"}
              </span>
              <button
                type="button"
                onClick={() => {
                  playUiSound("click");
                  setChecklist(checklist.map((c) => ({ ...c, completed: false })));
                  showToast(isVi ? "Đã đặt lại toàn bộ checklist" : "Reset all checklist items");
                }}
                className="hover:underline text-slate-600 dark:text-slate-300 font-semibold cursor-pointer"
              >
                {isVi ? "Đặt lại" : "Reset"}
              </button>
            </div>
          </section>
          )}
        </main>
      </div>

      {/* =======================================================================
          MODAL 1: ADD TASK LINK MODAL
          ======================================================================= */}
      <AnimatePresence>
        {isAddTaskModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md rounded-[10px] p-6 bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-white/15 shadow-2xl space-y-4 backdrop-blur-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {isVi ? "Thêm Liên Kết Tác Vụ Cổng Điều Hành" : "Add Workspace Task Link"}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddTaskModalOpen(false)}
                  className="p-1 rounded-[10px] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddNewTask} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Mã Ticket (Code)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="VD: JIRA-501"
                      value={newTaskCode}
                      onChange={(e) => setNewTaskCode(e.target.value)}
                      className="w-full px-3 py-2 rounded-[10px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-100 uppercase"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Công cụ (Tool)
                    </label>
                    <select
                      value={newTaskTool}
                      onChange={(e) => setNewTaskTool(e.target.value)}
                      className="w-full px-3 py-2 rounded-[10px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-100"
                    >
                      <option value="Jira Core">Jira Core</option>
                      <option value="GitHub">GitHub</option>
                      <option value="Figma">Figma</option>
                      <option value="Zendesk">Zendesk CRM</option>
                      <option value="Notion">Notion Wiki</option>
                      <option value="Slack">Slack</option>
                      <option value="AWS">AWS Console</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Tiêu đề tác vụ (Task Title)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Kiểm tra chỉ số Escalation CSKH..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-[10px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Đường dẫn URL
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://jira.company.com/..."
                    value={newTaskUrl}
                    onChange={(e) => setNewTaskUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-[10px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Nhóm phân loại
                    </label>
                    <select
                      value={newTaskCategory}
                      onChange={(e) => setNewTaskCategory(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-[10px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-100"
                    >
                      <option value="cskh">CSKH & CRM</option>
                      <option value="tech">Kỹ thuật / Tech</option>
                      <option value="design">Thiết kế UI/UX</option>
                      <option value="ops">Vận hành Playbook</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Mức độ ưu tiên
                    </label>
                    <select
                      value={newTaskPriority}
                      onChange={(e) => setNewTaskPriority(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-[10px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-100"
                    >
                      <option value="high">Ưu tiên cao (High)</option>
                      <option value="medium">Trung bình (Medium)</option>
                      <option value="low">Thấp (Low)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsAddTaskModalOpen(false)}
                    className="px-4 py-2 rounded-[10px] text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-[10px] bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md cursor-pointer"
                  >
                    Tạo Link Tác Vụ
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =======================================================================
          MODAL 2: QUICK TRANSFER MODAL
          ======================================================================= */}
      <AnimatePresence>
        {isTransferModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md rounded-[10px] p-6 bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-white/15 shadow-2xl space-y-4 backdrop-blur-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Send className="w-5 h-5 text-indigo-500" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {isVi ? "Chuyển Tiền & Thanh Toán Chi Phí CSKH" : "Direct Budget Transfer"}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsTransferModalOpen(false)}
                  className="p-1 rounded-[10px] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-3 rounded-[10px] bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-between">
                <span className="text-xs font-semibold text-indigo-700 dark:text-cyan-300">
                  Số dư khả dụng:
                </span>
                <span className="font-mono text-sm font-black text-indigo-600 dark:text-cyan-400">
                  ${balanceUSD.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
                </span>
              </div>

              {transferError && (
                <div className="p-2.5 rounded-[10px] bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{transferError}</span>
                </div>
              )}

              <form onSubmit={handleExecuteTransfer} className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Số tiền cần chuyển ($ USD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="VD: 1500"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-[10px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-800 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Người / Đơn vị thụ hưởng
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Atlassian / AWS / Zendesk"
                    value={transferRecipient}
                    onChange={(e) => setTransferRecipient(e.target.value)}
                    className="w-full px-3 py-2 rounded-[10px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Nội dung giao dịch
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Gia hạn gói Cloud CSKH Q4..."
                    value={transferNote}
                    onChange={(e) => setTransferNote(e.target.value)}
                    className="w-full px-3 py-2 rounded-[10px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsTransferModalOpen(false)}
                    className="px-4 py-2 rounded-[10px] text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-[10px] bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-md cursor-pointer"
                  >
                    Xác Nhận Chuyển Tiền
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =======================================================================
          TOAST FEEDBACK NOTIFICATION
          ======================================================================= */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-[10px] bg-slate-900/95 text-white dark:bg-white/95 dark:text-slate-950 font-bold text-xs shadow-2xl border border-white/20 backdrop-blur-xl flex items-center gap-2.5 max-w-sm"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
            <span className="flex-1">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { TemplatePage as GlassmorphismDashboard, TemplatePage as TrangMau };
