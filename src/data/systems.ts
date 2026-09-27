import React from "react";
import {
  Monitor,
  Scale,
  HeartPulse,
  UserCheck,
  Network,
  Target,
  Crown,
  BookOpen,
  Headphones,
  PieChart,
  Bot,
  Store,
  LogIn,
  Calculator,
  Eye,
  Settings,
  Layers,
  Gem,
  GraduationCap,
  TrendingUp,
  Sparkles,
  CreditCard,
  LucideIcon
} from "lucide-react";

export type SystemCategory = "all" | "cskh" | "management" | "data-ai";

export interface SystemCategoryMeta {
  id: SystemCategory;
  labelVi: string;
  labelEn: string;
  count: number;
  colorClass: string;
}

export interface SystemItem {
  id: string;
  category: "cskh" | "management" | "data-ai";
  code: string;
  nameVi: string;
  nameEn: string;
  descVi: string;
  descEn: string;
  url: string | null;
  gradientClass: string;
  icon: LucideIcon;
  watermarkIcon: LucideIcon;
}

export const SYSTEM_CATEGORIES: SystemCategoryMeta[] = [
  {
    id: "all",
    labelVi: "Tất cả hệ thống",
    labelEn: "All Systems",
    count: 12,
    colorClass: "from-blue-600 to-indigo-600"
  },
  {
    id: "cskh",
    labelVi: "Chăm sóc khách hàng",
    labelEn: "Customer Service",
    count: 4,
    colorClass: "from-indigo-600 to-rose-600"
  },
  {
    id: "management",
    labelVi: "Quản trị & Điều hành",
    labelEn: "Management & ERP",
    count: 5,
    colorClass: "from-emerald-600 to-amber-600"
  },
  {
    id: "data-ai",
    labelVi: "Dữ liệu & Trí tuệ nhân tạo",
    labelEn: "Data & AI Platform",
    count: 3,
    colorClass: "from-purple-600 to-cyan-600"
  }
];

export const SYSTEMS_DATA: SystemItem[] = [
  {
    id: "sdp",
    category: "cskh",
    code: "SDP",
    nameVi: "Cổng làm việc CSKH",
    nameEn: "Service Delivery Platform",
    descVi: "Cổng làm việc tập trung chính của Phòng CSKH, cổng truy cập trung tâm cho mọi quy trình nghiệp vụ.",
    descEn: "Service Delivery Platform: Centered portal for all Customer Service operations and integrations.",
    url: "https://www.sdpplatfrom.powerservice.one",
    gradientClass: "from-[#6366f1] via-[#4f46e5] to-[#3730a3]",
    icon: Monitor,
    watermarkIcon: LogIn
  },
  {
    id: "erp",
    category: "management",
    code: "ERP",
    nameVi: "Tài chính kế toán",
    nameEn: "Enterprise Resource Planning",
    descVi: "Quản lý nguồn lực doanh nghiệp, tài chính kế toán, kho và sản xuất tập trung.",
    descEn: "Enterprise Resource Planning: Central business finance, accounting, and resource planning.",
    url: "https://www.erpplatfrom.powerservice.one",
    gradientClass: "from-[#059669] via-[#0d9488] to-[#115e59]",
    icon: Scale,
    watermarkIcon: Calculator
  },
  {
    id: "crm",
    category: "cskh",
    code: "CRM",
    nameVi: "Quản lý Quan hệ Khách hàng",
    nameEn: "Customer Relationship Management",
    descVi: "Quản lý thông tin khách hàng 360 độ, tối ưu hóa tương tác đa kênh và hành trình trải nghiệm.",
    descEn: "Customer Relationship Management: 360-degree customer profiling, workflow and journey optimization.",
    url: "https://www.crmplatfrom.powerservice.one",
    gradientClass: "from-[#e11d48] via-[#be123c] to-[#881337]",
    icon: HeartPulse,
    watermarkIcon: Eye
  },
  {
    id: "hrm",
    category: "management",
    code: "HRM",
    nameVi: "Quản lý Nguồn nhân lực",
    nameEn: "Human Resource Management",
    descVi: "Quản lý vòng đời nhân sự, tuyển dụng, đào tạo phát triển và chấm công tự động.",
    descEn: "Human Resource Management: Seamless tracking of human assets, payroll, and recruitment workflows.",
    url: "https://www.hrmplatfrom.powerservice.one",
    gradientClass: "from-[#d97706] via-[#b45309] to-[#78350f]",
    icon: UserCheck,
    watermarkIcon: Settings
  },
  {
    id: "bpm",
    category: "management",
    code: "BPM",
    nameVi: "Quản lý Quy trình Nghiệp vụ",
    nameEn: "Business Process Management",
    descVi: "Số hóa và tự động hóa quy trình phối hợp liên phòng ban nhằm tăng cao hiệu suất.",
    descEn: "Business Process Management: Digitize operational procedures for frictionless departmental collaboration.",
    url: "https://www.bmpplatform.powerservice.one",
    gradientClass: "from-[#0284c7] via-[#0369a1] to-[#075985]",
    icon: Network,
    watermarkIcon: Layers
  },
  {
    id: "okr",
    category: "management",
    code: "OKR",
    nameVi: "Quản lý Mục tiêu & Kết quả",
    nameEn: "Objectives & Key Results",
    descVi: "Thiết lập mục tiêu chiến lược và theo dõi kết quả then chốt minh bạch.",
    descEn: "Objectives & Key Results: Set strategic targets and transparent progress measurement frameworks.",
    url: "https://www.okrplatfrom.powerservice.one",
    gradientClass: "from-[#7c3aed] via-[#6d28d9] to-[#4c1d95]",
    icon: Target,
    watermarkIcon: Target
  },
  {
    id: "clp",
    category: "cskh",
    code: "CLP",
    nameVi: "Khách hàng Thân thiết (Loyalty)",
    nameEn: "Customer Loyalty Program",
    descVi: "Xây dựng chương trình thành viên, tích lũy điểm thưởng và tối ưu ưu đãi voucher.",
    descEn: "Customer Loyalty Program: Member programs, rewarding actions, and tailored promotional retention.",
    url: "https://www.clpplatform.powerservice.one",
    gradientClass: "from-[#ea580c] via-[#c2410c] to-[#9a3412]",
    icon: Crown,
    watermarkIcon: Gem
  },
  {
    id: "lms",
    category: "management",
    code: "LMS",
    nameVi: "Quản lý Đào tạo (Learning)",
    nameEn: "Learning Management System",
    descVi: "Kho khóa học trực tuyến, tự động hóa kiểm tra đánh giá chất lượng nhân sự.",
    descEn: "Learning Management System: Automated training platform, online exams, and talent upskilling.",
    url: "https://www.lmsplatfrom.powerservice.one",
    gradientClass: "from-[#0d9488] via-[#0f766e] to-[#134e4a]",
    icon: BookOpen,
    watermarkIcon: GraduationCap
  },
  {
    id: "csc",
    category: "cskh",
    code: "CSC",
    nameVi: "Trung tâm Chăm sóc Khách hàng",
    nameEn: "Customer Service Center",
    descVi: "Hệ thống quản trị tương tác đa kênh, phân loại Ticket tự động và giám sát cam kết SLA.",
    descEn: "Customer Service Center: Centralized ticketing engine and customer helpdesk with strict SLA monitoring.",
    url: "https://www.cscplatform.powerservice.one",
    gradientClass: "from-[#2563eb] via-[#1d4ed8] to-[#1e40af]",
    icon: Headphones,
    watermarkIcon: Headphones
  },
  {
    id: "bi",
    category: "data-ai",
    code: "BI Dashboard",
    nameVi: "Báo cáo & Phân tích",
    nameEn: "Business Intelligence",
    descVi: "Trực quan hóa chỉ số dữ liệu theo thời gian thực (Real-time Wallboard) hỗ trợ quản trị.",
    descEn: "Business Intelligence: Real-time visual metrics dashboard to accelerate data-backed decisions.",
    url: null,
    gradientClass: "from-[#334155] via-[#1e293b] to-[#0f172a]",
    icon: PieChart,
    watermarkIcon: TrendingUp
  },
  {
    id: "ai",
    category: "data-ai",
    code: "AI Assistant",
    nameVi: "Trợ lý Trí tuệ Nhân tạo",
    nameEn: "Artificial Intelligence Platform",
    descVi: "Hỗ trợ nhân sự bằng AI thông minh trong tra cứu, tự động hóa phản hồi và xử lý tác vụ 24/7.",
    descEn: "Artificial Intelligence Platform: Automated intelligence, content lookup, and seamless 24/7 assistance.",
    url: "https://www.aiplatfrom.powerservice.one",
    gradientClass: "from-[#9333ea] via-[#7928ca] to-[#4c0519]",
    icon: Bot,
    watermarkIcon: Sparkles
  },
  {
    id: "pos",
    category: "management",
    code: "POS",
    nameVi: "Quản lý Bán hàng tại Quầy",
    nameEn: "Point of Sale",
    descVi: "Quản lý giao dịch, bán lẻ, thanh toán hóa đơn và đồng bộ hóa tồn kho thời gian thực.",
    descEn: "Point of Sale: Smooth billing, payment processes, and real-time inventory synchronization.",
    url: "https://www.posplatform.powerservice.one",
    gradientClass: "from-[#f97316] via-[#ea580c] to-[#c2410c]",
    icon: Store,
    watermarkIcon: CreditCard
  }
];
