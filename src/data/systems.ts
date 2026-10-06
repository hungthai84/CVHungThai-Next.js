import React from "react";
import {
  Server,
  Headphones,
  Bot,
  BarChart3,
  Workflow,
  Users,
  ShieldCheck,
  FileCheck,
  Activity,
  Layers,
  Database,
  Radio,
  Cpu,
  Globe2,
  LucideIcon
} from "lucide-react";

export type SystemCategory = "all" | "ops" | "cx" | "tech" | "data" | "security";

export interface SystemItem {
  id: string;
  code: string;
  nameVi: string;
  nameEn: string;
  descVi: string;
  descEn: string;
  category: SystemCategory;
  icon: LucideIcon;
  gradientClass: string;
  url: string | null;
}

export interface SystemCategoryOption {
  id: SystemCategory;
  labelVi: string;
  labelEn: string;
}

export const SYSTEM_CATEGORIES: SystemCategoryOption[] = [
  { id: "all", labelVi: "Tất cả hệ thống", labelEn: "All Systems" },
  { id: "ops", labelVi: "Vận hành & Tổng đài", labelEn: "Ops & Contact Center" },
  { id: "cx", labelVi: "Trải nghiệm khách hàng (CX)", labelEn: "Customer Experience" },
  { id: "tech", labelVi: "Công nghệ & AI Bots", labelEn: "Tech & AI Automation" },
  { id: "data", labelVi: "Dữ liệu & Báo cáo BI", labelEn: "Data & BI Analytics" },
  { id: "security", labelVi: "Bảo mật & Kiểm toán QA", labelEn: "Security & QA Governance" },
];

export const SYSTEMS_DATA: SystemItem[] = [
  {
    id: "crm-omni",
    code: "CRM",
    nameVi: "Hệ thống Quản lý Quan hệ Khách hàng Đa kênh",
    nameEn: "Omnichannel Customer Relationship Management",
    descVi: "Quản lý dữ liệu tập trung 360 độ chân dung khách hàng, đồng bộ lịch sử tương tác qua Voice, Chat, Email, Social.",
    descEn: "Unified 360-degree customer identity and interaction timeline across Voice, Chat, Email, and Social media channels.",
    category: "cx",
    icon: Users,
    gradientClass: "from-blue-600 via-indigo-600 to-cyan-500",
    url: "https://crm.powerservice.internal",
  },
  {
    id: "cc-cloud",
    code: "PBX",
    nameVi: "Tổng đài Cloud Contact Center & Định tuyến Thông minh",
    nameEn: "Cloud Contact Center & Intelligent ACD Routing",
    descVi: "Hệ thống phân phối cuộc gọi tự động (ACD), định tuyến theo kỹ năng nhân sự (Skill-based) và giám sát Real-time Dashboard.",
    descEn: "Elastic cloud PBX with intelligent skill-based routing, interactive IVR workflows, and real-time supervisor console.",
    category: "ops",
    icon: Headphones,
    gradientClass: "from-indigo-600 via-purple-600 to-pink-500",
    url: "https://contactcenter.powerservice.internal",
  },
  {
    id: "wfm-workforce",
    code: "WFM",
    nameVi: "Quản trị Lực lượng Lao động & Dự báo Tải cuộc gọi",
    nameEn: "Workforce Management & Load Forecasting",
    descVi: "Thuật toán Erlang-C tự động dự báo lưu lượng tiếp nhận, xếp ca làm việc thông minh và đo lường độ tuân thủ (Adherence).",
    descEn: "Erlang-C AI forecasting algorithms, automated shift scheduling, and real-time agent adherence monitoring.",
    category: "ops",
    icon: Workflow,
    gradientClass: "from-emerald-600 via-teal-600 to-cyan-600",
    url: "https://wfm.powerservice.internal",
  },
  {
    id: "ai-chatbot",
    code: "BOT",
    nameVi: "Hệ thống AI Chatbot & Trợ lý Ảo Tự phục vụ",
    nameEn: "Generative AI Chatbot & Virtual Assistants",
    descVi: "Trợ lý ảo NLP/LLM giải quyết tự động đến 65% thắc mắc thường gặp (FCR), tích hợp tra cứu hóa đơn và xử lý đơn hàng tức thì.",
    descEn: "LLM-driven conversational bots resolving up to 65% tier-1 inquiries automatically with real-time transactional integrations.",
    category: "tech",
    icon: Bot,
    gradientClass: "from-cyan-600 via-blue-600 to-indigo-600",
    url: "https://aibot.powerservice.internal",
  },
  {
    id: "bi-analytics",
    code: "BI",
    nameVi: "Nền tảng Phân tích Dữ liệu BI & Giám sát SLA Thời gian thực",
    nameEn: "Executive BI Analytics & Real-time SLA Dashboard",
    descVi: "Bảng điều khiển trực quan hóa chỉ số CSAT, NPS, FCR, AHT, Service Level và phát hiện bất thường tự động theo thời gian thực.",
    descEn: "Enterprise executive dashboards monitoring CSAT, NPS, FCR, AHT, and SL metrics with automated anomaly alerts.",
    category: "data",
    icon: BarChart3,
    gradientClass: "from-violet-600 via-purple-600 to-indigo-600",
    url: "https://analytics.powerservice.internal",
  },
  {
    id: "qa-audit",
    code: "QA",
    nameVi: "Hệ thống Kiểm soát Chất lượng & Đánh giá Cuộc gọi",
    nameEn: "Quality Assurance & Speech Analytics Auditing",
    descVi: "Chấm điểm chất lượng tương tác đa kênh, phân tích sắc thái giọng nói (Speech-to-Text sentiment) và cảnh báo vi phạm quy trình.",
    descEn: "AI speech-to-text sentiment auditing, automated scoring rubrics, and procedural compliance tracking.",
    category: "security",
    icon: ShieldCheck,
    gradientClass: "from-amber-600 via-orange-600 to-rose-600",
    url: "https://qa.powerservice.internal",
  },
  {
    id: "km-portal",
    code: "KM",
    nameVi: "Cổng Quản trị Tri thức & Thư viện Quy trình SOP",
    nameEn: "Knowledge Management & SOP Process Repository",
    descVi: "Cơ sở dữ liệu tri thức nội bộ với tìm kiếm AI Semantic, phân quyền văn bản và cập nhật quy trình nghiệp vụ tức thì.",
    descEn: "Semantic search knowledge base providing instant procedure guidance, policy updates, and training scripts.",
    category: "cx",
    icon: FileCheck,
    gradientClass: "from-emerald-500 via-green-600 to-teal-600",
    url: "https://wiki.powerservice.internal",
  },
  {
    id: "rpa-automation",
    code: "RPA",
    nameVi: "Hệ sinh thái Tự động hoá Quy trình Robot (RPA)",
    nameEn: "Robotic Process Automation & Bot Orchestration",
    descVi: "Tự động hóa tác vụ back-office lặp lại như đối soát dữ liệu, hoàn tiền, cấp lại tài khoản với độ chính xác 99.99%.",
    descEn: "End-to-end automation of back-office reconciliation, refunds, and account provisioning with 99.99% accuracy.",
    category: "tech",
    icon: Cpu,
    gradientClass: "from-fuchsia-600 via-pink-600 to-rose-600",
    url: "https://rpa.powerservice.internal",
  },
  {
    id: "nps-feedback",
    code: "NPS",
    nameVi: "Hệ thống Khảo sát Đo lường Phản hồi Khách hàng",
    nameEn: "Real-time Customer VOC & NPS Closed-Loop System",
    descVi: "Thu thập khảo sát tức thì sau mỗi giao dịch (CSAT/CES/NPS) và kích hoạt quy trình gọi lại xử lý khiếu nại trong 60 phút.",
    descEn: "Post-interaction survey collection and automated closed-loop escalations triggering callback to detractors within 60 mins.",
    category: "cx",
    icon: Activity,
    gradientClass: "from-rose-500 via-red-600 to-orange-500",
    url: "https://voc.powerservice.internal",
  },
  {
    id: "soc-security",
    code: "SOC",
    nameVi: "Giám sát Tuân thủ An toàn Thông tin & Quyền Riêng tư",
    nameEn: "Security Operations & PII Data Protection",
    descVi: "Mã hóa dữ liệu nhạy cảm của khách hàng, che mặt số thanh toán (PCI-DSS/GDPR) và quản lý phân quyền vai trò bảo mật nghiêm ngặt.",
    descEn: "PCI-DSS compliance masking, automated PII redaction on voice recordings, and role-based access audit logs.",
    category: "security",
    icon: Server,
    gradientClass: "from-slate-700 via-indigo-900 to-slate-900",
    url: "https://security.powerservice.internal",
  },
  {
    id: "lms-training",
    code: "LMS",
    nameVi: "Hệ thống Đào tạo Trực tuyến & Quản lý Năng lực",
    nameEn: "Learning Management System & Skill Matrix",
    descVi: "Khung đào tạo hội nhập nhân viên mới (Onboarding), kiểm tra trắc nghiệm định kỳ và lộ trình thăng tiến cá nhân hóa.",
    descEn: "Interactive onboarding workflows, skill certification exams, and individualized professional growth roadmaps.",
    category: "ops",
    icon: Database,
    gradientClass: "from-blue-700 via-teal-700 to-indigo-800",
    url: "https://lms.powerservice.internal",
  },
  {
    id: "omni-gateway",
    code: "API",
    nameVi: "Cổng Tích hợp Dịch vụ Mở & Webhooks Gateway",
    nameEn: "Enterprise API Gateway & Event Bus Stream",
    descVi: "Cổng kết nối API đồng bộ dữ liệu hai chiều với hệ thống Core ERP, Cổng thanh toán và các đối tác thương mại điện tử.",
    descEn: "High-throughput API gateway facilitating two-way transactional webhooks between Core ERP, Payment Gateways, and 3P services.",
    category: "tech",
    icon: Globe2,
    gradientClass: "from-indigo-600 via-sky-600 to-blue-700",
    url: "https://api.powerservice.internal",
  },
];
