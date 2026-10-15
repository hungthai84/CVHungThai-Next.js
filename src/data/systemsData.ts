import {
  Monitor,
  Scale,
  Activity,
  Contact,
  GitFork,
  Target,
  Crown,
  BookOpen,
  Headphones,
  PieChart,
  Bot,
  Receipt,
  DoorOpen,
  Calculator,
  Users,
  Settings,
  Network,
  Gem,
  GraduationCap,
  Headset,
  TrendingUp,
  Sparkles,
  Store,
  LucideIcon
} from "lucide-react";

export interface PowerSystemItem {
  id: string;
  code: string;
  nameVi: string;
  nameEn: string;
  fullNameEn: string;
  category: "cskh" | "management" | "data-ai";
  badgeVi: string;
  badgeEn: string;
  badgeType?: "live" | "ready" | "pending" | "ai";
  url: string;
  gradient: string;
  icon: LucideIcon;
  watermarkIcon: LucideIcon;
  featuresVi: string[];
  featuresEn: string[];
  descVi: string;
  descEn: string;
  delay?: number;
}

export const POWER_SYSTEMS_12: PowerSystemItem[] = [
  {
    id: "sdp",
    code: "SDP",
    nameVi: "Cổng làm việc CSKH",
    nameEn: "CSKH Agent Workspace",
    fullNameEn: "Service Delivery Platform",
    category: "cskh",
    badgeVi: "24/7",
    badgeEn: "24/7 Live",
    badgeType: "live",
    url: "https://www.sdpplatfrom.powerservice.one",
    gradient: "from-[#6366f1] via-[#4f46e5] to-[#3730a3]",
    icon: Monitor,
    watermarkIcon: DoorOpen,
    descVi: "Nền tảng bàn làm việc tập trung cho tư vấn viên CSKH xử lý đa nhiệm, tích hợp VoIP và nghiệp vụ.",
    descEn: "Unified agent workspace platform for multi-task customer support, VoIP, and workflow handling.",
    featuresVi: [
      "Bàn làm việc tư vấn viên hợp nhất (Single Agent Workspace) xử lý đa nhiệm.",
      "Tích hợp tổng đài VoIP, tra cứu thông tin khách hàng và lịch sử tương tác tự động.",
      "Định tuyến cuộc gọi thông minh và tuân thủ chuẩn cam kết dịch vụ (SLA)."
    ],
    featuresEn: [
      "Single Agent Workspace empowering multi-channel customer inquiry handling.",
      "Integrated VoIP dialer, auto customer profile lookup, and ticket history.",
      "Intelligent skill-based routing and automated SLA enforcement."
    ],
    delay: 0
  },
  {
    id: "erp",
    code: "ERP",
    nameVi: "Tài chính kế toán",
    nameEn: "Finance & Accounting",
    fullNameEn: "Enterprise Resource Planning",
    category: "management",
    badgeVi: "Sẵn sàng",
    badgeEn: "Ready",
    badgeType: "ready",
    url: "https://www.erpplatfrom.powerservice.one",
    gradient: "from-[#059669] via-[#0d9488] to-[#115e59]",
    icon: Scale,
    watermarkIcon: Calculator,
    descVi: "Quản trị nguồn lực doanh nghiệp, dòng tiền, hóa đơn, công nợ và báo cáo tài chính chuẩn xác.",
    descEn: "Enterprise resource planning, cash flows, invoicing, receivables, and accurate financial reporting.",
    featuresVi: [
      "Quản lý hóa đơn điện tử, tự động đối soát dòng tiền và tài khoản ngân hàng.",
      "Kiểm soát ngân sách vận hành CSKH và dự báo chi phí theo thời gian thực.",
      "Tích hợp báo cáo kiểm toán tuân thủ chuẩn mực kế toán Việt Nam và quốc tế."
    ],
    featuresEn: [
      "E-invoice management, automated cash reconciliation, and banking integration.",
      "Real-time CSKH operational budget tracking and expense forecasting.",
      "Auditing compliance reports aligned with local and global standards."
    ],
    delay: 0.3
  },
  {
    id: "crm",
    code: "CRM",
    nameVi: "Quản lý Quan hệ Khách hàng",
    nameEn: "Customer Relationship Management",
    fullNameEn: "Customer Relationship Management",
    category: "cskh",
    badgeVi: "360° View",
    badgeEn: "360° View",
    badgeType: "live",
    url: "https://www.crmplatfrom.powerservice.one",
    gradient: "from-[#e11d48] via-[#be123c] to-[#881337]",
    icon: Activity,
    watermarkIcon: Users,
    descVi: "Quản lý toàn bộ hành trình, dữ liệu hồ sơ và lịch sử tương tác khách hàng 360 độ.",
    descEn: "Managing end-to-end customer journey, 360-degree identity profiles, and touchpoint history.",
    featuresVi: [
      "Hồ sơ khách hàng 360 độ tích hợp lịch sử mua sắm, khiếu nại và thẻ thành viên.",
      "Tự động phân khúc tệp khách hàng VIP, khách hàng tiềm năng và khách hàng nguy cơ rời bỏ.",
      "Tối ưu hóa chiến dịch chăm sóc chủ động qua đa kênh liên lạc."
    ],
    featuresEn: [
      "360-degree customer profile tracking purchases, tickets, and membership tier.",
      "Automated segmentation for VIPs, prospects, and churn-risk accounts.",
      "Omnichannel proactive engagement workflow optimization."
    ],
    delay: 0.6
  },
  {
    id: "hrm",
    code: "HRM",
    nameVi: "Quản lý Nguồn nhân lực",
    nameEn: "Human Resource Management",
    fullNameEn: "Human Resource Management",
    category: "management",
    badgeVi: "Hoạt động",
    badgeEn: "Active",
    badgeType: "ready",
    url: "https://www.hrmplatfrom.powerservice.one",
    gradient: "from-[#d97706] via-[#b45309] to-[#78350f]",
    icon: Contact,
    watermarkIcon: Settings,
    descVi: "Quản trị nhân sự, hồ sơ, ca kíp trực tổng đài, bảng lương và đánh giá năng lực.",
    descEn: "Human resource management, agent shifts, payroll, and competency matrix reviews.",
    featuresVi: [
      "Xếp ca trực tổng đài tự động (Workforce Management - WFM) theo lưu lượng cuộc gọi.",
      "Chấm công điện tử, quản lý phép năm và tính lương tự động theo KPI.",
      "Theo dõi lộ trình phát triển thăng tiến và năng lực của từng nhân sự."
    ],
    featuresEn: [
      "Automated shift scheduling (WFM) tuned to forecasted call arrival peaks.",
      "Electronic timekeeping, leave approval, and KPI-linked compensation.",
      "Talent development pathways and career progression tracking."
    ],
    delay: 0.9
  },
  {
    id: "bpm",
    code: "BPM",
    nameVi: "Quản lý Quy trình Nghiệp vụ",
    nameEn: "Business Process Management",
    fullNameEn: "Business Process Management",
    category: "management",
    badgeVi: "Tự động hóa",
    badgeEn: "Automated",
    badgeType: "ready",
    url: "https://www.bmpplatform.powerservice.one",
    gradient: "from-[#0284c7] via-[#0369a1] to-[#075985]",
    icon: GitFork,
    watermarkIcon: Network,
    descVi: "Số hóa, tự động hóa và tối ưu hóa luồng quy trình nghiệp vụ phối hợp liên phòng ban.",
    descEn: "Digitalizing, automating, and optimizing cross-departmental business workflows.",
    featuresVi: [
      "Thiết kế quy trình kéo-thả (No-Code/Low-Code Workflow Designer) chuẩn BPMN 2.0.",
      "Tự động chuyển tiếp yêu cầu xử lý khiếu nại liên phòng ban (Cross-department Escalation).",
      "Giám sát thời gian thực tiến độ xử lý ticket và cảnh báo nghẽn luồng vận hành."
    ],
    featuresEn: [
      "No-Code/Low-Code visual workflow designer compliant with BPMN 2.0.",
      "Automated cross-departmental ticket escalation and resolution routing.",
      "Real-time bottleneck identification and SLA breach prevention."
    ],
    delay: 1.2
  },
  {
    id: "okr",
    code: "OKR",
    nameVi: "Quản lý Mục tiêu & Kết quả",
    nameEn: "Objectives & Key Results",
    fullNameEn: "Objectives & Key Results",
    category: "management",
    badgeVi: "Hiệu suất",
    badgeEn: "Performance",
    badgeType: "ready",
    url: "https://www.okrplatfrom.powerservice.one",
    gradient: "from-[#7c3aed] via-[#6d28d9] to-[#4c1d95]",
    icon: Target,
    watermarkIcon: Target,
    descVi: "Thiết lập, liên kết và đo lường mục tiêu chiến lược cùng các kết quả then chốt.",
    descEn: "Setting, aligning, and tracking strategic objectives and key business metrics.",
    featuresVi: [
      "Liên kết mục tiêu cấp công ty xuống từng khối, đội ngũ và cá nhân nhân sự.",
      "Check-in định kỳ hàng tuần minh bạch, tự động tính tỷ lệ hoàn thành mục tiêu.",
      "Tích hợp biểu đồ tiến độ trực quan giúp ban lãnh đạo nắm bắt nhịp vận hành."
    ],
    featuresEn: [
      "Cascading company-wide targets into team and individual measurable key results.",
      "Weekly transparent check-ins with automatic progress scoring.",
      "Visual real-time executive dashboard for strategic alignment."
    ],
    delay: 1.5
  },
  {
    id: "clp",
    code: "CLP",
    nameVi: "Khách hàng Thân thiết (Loyalty)",
    nameEn: "Customer Loyalty Program",
    fullNameEn: "Customer Loyalty Program",
    category: "cskh",
    badgeVi: "Tích điểm",
    badgeEn: "Rewards",
    badgeType: "live",
    url: "https://www.clpplatform.powerservice.one",
    gradient: "from-[#ea580c] via-[#c2410c] to-[#9a3412]",
    icon: Crown,
    watermarkIcon: Gem,
    descVi: "Chương trình tích điểm, xếp hạng hội viên, đổi quà và ưu đãi cá nhân hóa khách hàng.",
    descEn: "Loyalty point accrual, tier upgrading, gift redemption, and personalized perks.",
    featuresVi: [
      "Cơ chế tích lũy và tiêu điểm thưởng linh hoạt theo giao dịch và tương tác dịch vụ.",
      "Hệ thống phân hạng thẻ hội viên: Đồng, Bạc, Vàng, Kim Cương với đặc quyền riêng.",
      "Tự động gửi voucher sinh nhật và ưu đãi đặc quyền qua SMS/Zalo/Email."
    ],
    featuresEn: [
      "Flexible rewards point accrual and redemption across channels.",
      "Tiered membership tiers (Bronze, Silver, Gold, Platinum) with unique benefits.",
      "Automated birthday voucher and exclusive event perks via omnichannel triggers."
    ],
    delay: 1.8
  },
  {
    id: "lms",
    code: "LMS",
    nameVi: "Quản lý Đào tạo (Learning)",
    nameEn: "Learning Management System",
    fullNameEn: "Learning Management System",
    category: "management",
    badgeVi: "E-Learning",
    badgeEn: "E-Learning",
    badgeType: "ready",
    url: "https://www.lmsplatfrom.powerservice.one",
    gradient: "from-[#0d9488] via-[#0f766e] to-[#134e4a]",
    icon: BookOpen,
    watermarkIcon: GraduationCap,
    descVi: "Hệ thống đào tạo trực tuyến, sát hạch kiến thức sản phẩm và quản lý chứng chỉ nhân viên.",
    descEn: "Online learning system, product knowledge testing, and staff certificate management.",
    featuresVi: [
      "Lộ trình đào tạo Onboarding chuẩn hóa cho tư vấn viên mới gia nhập đội ngũ.",
      "Ngân hàng đề thi trắc nghiệm, tự động chấm điểm và đánh giá lỗ hổng kỹ năng.",
      "Kho tài liệu video, kịch bản mẫu và hướng dẫn xử lý tình huống nghiệp vụ thực tế."
    ],
    featuresEn: [
      "Standardized onboarding training pathway for newly hired support agents.",
      "Automated quiz grading and instant agent competency gap analysis.",
      "Video tutorials, scenario scripts, and hands-on handling case studies."
    ],
    delay: 2.1
  },
  {
    id: "csc",
    code: "CSC",
    nameVi: "Trung tâm Chăm sóc Khách hàng",
    nameEn: "Customer Service Center",
    fullNameEn: "Customer Service Center",
    category: "cskh",
    badgeVi: "Omnichannel",
    badgeEn: "Omnichannel",
    badgeType: "live",
    url: "https://www.cscplatform.powerservice.one",
    gradient: "from-[#2563eb] via-[#1d4ed8] to-[#1e40af]",
    icon: Headphones,
    watermarkIcon: Headset,
    descVi: "Trung tâm tiếp nhận và xử lý đa kênh tập trung: Thoại, Chat, Email, Zalo, Mạng xã hội.",
    descEn: "Centralized omnichannel hub handling Voice, Live Chat, Email, Zalo, and Social tickets.",
    featuresVi: [
      "Hợp nhất luồng tiếp nhận từ Hotline, Zalo OA, Fanpage, Email và Web Chat về 1 giao diện.",
      "Phân phối yêu cầu thông minh theo độ ưu tiên khách hàng và năng lực tư vấn viên.",
      "Ghi âm cuộc gọi, đo lường chỉ số CSAT và đánh giá chất lượng tương tác 100% cuộc gọi."
    ],
    featuresEn: [
      "Consolidated multi-inbox unifying Hotline, Zalo OA, Facebook, and Email into one feed.",
      "Smart priority distribution based on customer tier and advisor availability.",
      "Call recording, CSAT rating triggers, and 100% QA interaction analytics."
    ],
    delay: 2.4
  },
  {
    id: "bi",
    code: "BI Dashboard",
    nameVi: "Báo cáo & Phân tích",
    nameEn: "Business Intelligence & Analytics",
    fullNameEn: "Business Intelligence",
    category: "data-ai",
    badgeVi: "Đang tích hợp",
    badgeEn: "Integrating",
    badgeType: "pending",
    url: "#",
    gradient: "from-[#334155] via-[#1e293b] to-[#0f172a]",
    icon: PieChart,
    watermarkIcon: TrendingUp,
    descVi: "Hệ thống báo cáo thông minh, phân tích dữ liệu chuyên sâu và dự báo xu hướng vận hành.",
    descEn: "Executive reporting dashboard, in-depth data intelligence, and operational forecasting.",
    featuresVi: [
      "Wallboard trực quan cập nhật thời gian thực các chỉ số CSAT, FCR, AHT và lưu lượng hàng đợi.",
      "Mô hình AI dự báo xu hướng cuộc gọi giúp bố trí nhân sự chính xác theo khung giờ cao điểm.",
      "Tự động xuất báo cáo quản trị tổng quan định kỳ phục vụ ra quyết định chiến lược."
    ],
    featuresEn: [
      "Real-time executive Wallboard plotting CSAT, FCR, AHT, and live queue status.",
      "AI predictive models forecasting call volume patterns for optimized shift staffing.",
      "Automated periodic executive management reporting for data-driven decisions."
    ],
    delay: 2.7
  },
  {
    id: "ai",
    code: "AI Assistant",
    nameVi: "Trợ lý Trí tuệ Nhân tạo",
    nameEn: "Artificial Intelligence Assistant",
    fullNameEn: "Artificial Intelligence",
    category: "data-ai",
    badgeVi: "AI Powered",
    badgeEn: "AI Powered",
    badgeType: "ai",
    url: "https://www.aiplatfrom.powerservice.one",
    gradient: "from-[#9333ea] via-[#7928ca] to-[#4c0519]",
    icon: Bot,
    watermarkIcon: Sparkles,
    descVi: "Trợ lý ảo AI thông minh, tự động trả lời 24/7 và hỗ trợ gợi ý giải pháp tức thì.",
    descEn: "24/7 GenAI Virtual Assistant resolving inquiries and suggesting real-time answers.",
    featuresVi: [
      "Phản hồi tự động thắc mắc khách hàng 24/7 bằng mô hình ngôn ngữ lớn (LLM) thông minh.",
      "Hỗ trợ tư vấn viên soạn câu trả lời mẫu, tóm tắt nội dung cuộc gọi sau khi kết thúc.",
      "Tự động phân loại cảm xúc khách hàng và phát hiện kịp thời các tình huống khiếu nại gay gắt."
    ],
    featuresEn: [
      "24/7 automated inquiry handling powered by state-of-the-art Generative AI models.",
      "Agent Copilot generating quick reply recommendations and auto post-call summaries.",
      "Real-time customer sentiment detection flagging high-risk escalated complaints."
    ],
    delay: 3.0
  },
  {
    id: "pos",
    code: "POS",
    nameVi: "Quản lý Bán hàng tại Quầy",
    nameEn: "Point of Sale System",
    fullNameEn: "Point of Sale",
    category: "management",
    badgeVi: "Realtime",
    badgeEn: "Realtime",
    badgeType: "ready",
    url: "https://www.posplatform.powerservice.one",
    gradient: "from-[#f97316] via-[#ea580c] to-[#c2410c]",
    icon: Receipt,
    watermarkIcon: Store,
    descVi: "Hệ thống thanh toán tại điểm bán, đồng bộ tồn kho, xuất hóa đơn và đối soát tức thì.",
    descEn: "Point of sale checkout system, real-time inventory sync, and instant transaction settlement.",
    featuresVi: [
      "Giao dịch thanh toán siêu tốc đa hình thức: Tiền mặt, Thẻ ngân hàng, QR Code, Ví điện tử.",
      "Đồng bộ tức thời dữ liệu kho hàng, doanh thu và thông tin tích điểm khách hàng thân thiết.",
      "Hỗ trợ chế độ Offline khi mất kết nối mạng và tự động đồng bộ khi có kết nối trở lại."
    ],
    featuresEn: [
      "Ultra-fast checkout supporting Cash, Cards, QR Code, and Digital Wallets.",
      "Real-time inventory deduction, revenue updates, and loyalty point integration.",
      "Offline-resilient transactions with auto-synchronization once reconnected."
    ],
    delay: 3.3
  }
];

export const SYSTEM_CATEGORIES = [
  { id: "all", vi: "Tất cả (12)", en: "All Systems (12)" },
  { id: "cskh", vi: "CSKH & Tương tác", en: "Customer Care & Touchpoints" },
  { id: "management", vi: "Quản trị & Nguồn lực", en: "Management & Resources" },
  { id: "data-ai", vi: "Dữ liệu & Trí tuệ AI", en: "Data & AI Intelligence" }
] as const;
