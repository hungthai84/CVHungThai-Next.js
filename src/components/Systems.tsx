import React, { useState, useMemo } from "react";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "motion/react";
import { PageCardHeader } from "./PageCardHeader";
import { Search, X, Globe2, ExternalLink, Sun, Moon } from "lucide-react";
import { playUiSound } from "../lib/sound";

export interface SystemItemHTML {
  id: string;
  cls: string;
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  url: string;
  featuresVi: string[];
  featuresEn: string[];
  svg: string;
  bg: string;
  shadow: string;
}

const SYSTEMS_12_DATA: SystemItemHTML[] = [
  {
    id: "crm",
    cls: "c1",
    titleVi: "Hệ thống CRM",
    titleEn: "CRM System",
    descVi: "Quản lý toàn bộ hành trình và<br>dữ liệu khách hàng.",
    descEn: "Managing end-to-end customer<br>journey and data 360°.",
    url: "https://www.crmplatfrom.powerservice.one",
    featuresVi: [
      "Quản lý dữ liệu thông tin khách hàng 360 độ tập trung.",
      "Tối ưu hóa chiến dịch marketing, bán hàng và chăm sóc khách hàng tự động."
    ],
    featuresEn: [
      "360-degree centralized customer identity profile management.",
      "Optimized smart campaigns, visual pipeline tracking, and automated service workflows."
    ],
    svg: `<svg viewBox="0 0 120 80" fill="none" stroke="currentColor" stroke-width="5"><circle cx="61" cy="38" r="21"/><circle cx="61" cy="31" r="7"/><path d="M46 53c4-10 26-10 30 0"/><circle cx="61" cy="38" r="34" opacity=".55"/><path d="M27 14l8 6M92 15l-7 6M97 54l-9-3M25 57l8-4"/></svg>`,
    bg: "linear-gradient(105deg,#ffc335 0%,#ffd867 100%)",
    shadow: "rgba(255,190,30,.18)"
  },
  {
    id: "contact-center",
    cls: "c2",
    titleVi: "Contact Center",
    titleEn: "Contact Center",
    descVi: "Tổng đài đa kênh, cuộc gọi và<br>định tuyến CSKH.",
    descEn: "Omnichannel contact center, calls<br>and intelligent CSKH routing.",
    url: "https://www.sdpplatfrom.powerservice.one",
    featuresVi: [
      "Tổng đài VoIP đa kênh, hỗ trợ cuộc gọi inbound/outbound mượt mà.",
      "Tự động định tuyến thông minh theo kỹ năng tư vấn viên và quy tắc SLA."
    ],
    featuresEn: [
      "Omnichannel VoIP contact center supporting inbound/outbound calls.",
      "Intelligent skill-based routing and automated SLA enforcement."
    ],
    svg: `<svg viewBox="0 0 120 80" fill="none" stroke="currentColor" stroke-width="5"><path d="M32 41V29a28 28 0 0 1 56 0v12"/><rect x="24" y="38" width="14" height="24" rx="7"/><rect x="82" y="38" width="14" height="24" rx="7"/><path d="M89 62c0 8-8 11-17 11H60"/><path d="M101 30q11 8 0 16M108 24q19 14 0 28" opacity=".8"/></svg>`,
    bg: "linear-gradient(105deg,#3e79ec 0%,#75a2f7 100%)",
    shadow: "rgba(65,112,238,.18)"
  },
  {
    id: "omnichannel",
    cls: "c3",
    titleVi: "Omnichannel",
    titleEn: "Omnichannel Hub",
    descVi: "Kết nối Voice, Chat, Email, Zalo<br>và mạng xã hội.",
    descEn: "Connecting Voice, Chat, Email, Zalo<br>and social networks.",
    url: "https://www.cscplatform.powerservice.one",
    featuresVi: [
      "Hợp nhất kênh thoại, live chat, email, Zalo OA và Facebook Messenger.",
      "Bàn làm việc tư vấn viên hợp nhất (Single Agent Workspace) xử lý đa nhiệm."
    ],
    featuresEn: [
      "Unified voice, live chat, email, Zalo OA, and Facebook Messenger.",
      "Single Agent Workspace empowering multi-channel inquiry handling."
    ],
    svg: `<svg viewBox="0 0 120 80" fill="none" stroke="currentColor" stroke-width="4"><circle cx="60" cy="39" r="12"/><circle cx="24" cy="20" r="10"/><circle cx="95" cy="19" r="10"/><circle cx="27" cy="63" r="10"/><circle cx="96" cy="61" r="10"/><path d="M33 25l18 9M69 34l18-9M51 48L34 58M69 47l18 9"/><path d="M20 20h8M91 17l8 4M21 62h11M91 61h10" opacity=".75"/></svg>`,
    bg: "linear-gradient(105deg,#17aee9 0%,#42c7ee 100%)",
    shadow: "rgba(17,174,230,.18)"
  },
  {
    id: "kpi",
    cls: "c4",
    titleVi: "Quản trị KPI",
    titleEn: "KPI Management",
    descVi: "Theo dõi CSAT, FCR, AHT, SLA<br>và hiệu suất.",
    descEn: "Tracking CSAT, FCR, AHT, SLA<br>and operational performance.",
    url: "https://www.okrplatfrom.powerservice.one",
    featuresVi: [
      "Giám sát chỉ số CSAT (Hài lòng), FCR (Xử lý lần đầu), AHT (Thời gian xử lý) và tuân thủ SLA.",
      "Báo cáo hiệu suất thời gian thực theo tư vấn viên, ca trực và phòng ban."
    ],
    featuresEn: [
      "Real-time tracking of CSAT, FCR, AHT, and SLA compliance metrics.",
      "Agent and departmental performance scorecards with trend alerts."
    ],
    svg: `<svg viewBox="0 0 120 80" fill="none" stroke="currentColor" stroke-width="5"><path d="M18 64V47h17v17H18Zm25 0V34h17v30H43Zm25 0V20h17v44H68Z" fill="currentColor" opacity=".55" stroke="none"/><path d="M17 17l25 8 19-12 27 5"/><path d="M91 18l-2 12M91 18l-12 2"/><circle cx="98" cy="57" r="12"/><path d="M98 49v8l6 4"/></svg>`,
    bg: "linear-gradient(105deg,#f34b79 0%,#f78ca0 100%)",
    shadow: "rgba(242,73,115,.18)"
  },
  {
    id: "sop",
    cls: "c5",
    titleVi: "SOP & Quy trình",
    titleEn: "SOP & Workflows",
    descVi: "Chuẩn hóa quy trình dịch vụ<br>và xử lý nghiệp vụ.",
    descEn: "Standardizing service workflows<br>and business tasks.",
    url: "https://www.bmpplatform.powerservice.one",
    featuresVi: [
      "Số hóa bộ quy trình thao tác chuẩn (SOP) cho từng kịch bản nghiệp vụ CSKH.",
      "Hướng dẫn xử lý theo từng bước (Step-by-step guidance) giúp giảm sai sót."
    ],
    featuresEn: [
      "Digital standard operating procedures (SOP) for all CSKH service scenarios.",
      "Step-by-step guided task execution minimizing operational errors."
    ],
    svg: `<svg viewBox="0 0 120 80" fill="none" stroke="currentColor" stroke-width="5"><rect x="26" y="9" width="48" height="62" rx="4"/><path d="M40 24h24M40 38h14M40 52h18"/><path d="M31 23l4 4 7-8M31 37l4 4 7-8M31 51l4 4 7-8"/><circle cx="84" cy="55" r="12"/><path d="M84 47v16M76 55h16"/></svg>`,
    bg: "linear-gradient(105deg,#ff7b18 0%,#ffab63 100%)",
    shadow: "rgba(255,119,25,.18)"
  },
  {
    id: "voc",
    cls: "c6",
    titleVi: "Voice of Customer",
    titleEn: "Voice of Customer",
    descVi: "Thu thập, phân tích và chuyển hóa<br>tiếng nói khách hàng.",
    descEn: "Gathering, analyzing, and acting<br>on customer feedback.",
    url: "https://www.cscplatform.powerservice.one",
    featuresVi: [
      "Thu thập phản hồi khách hàng tự động sau mỗi cuộc gọi và tương tác chat.",
      "Phân tích cảm xúc (Sentiment Analysis) và phân loại ý kiến đóng góp khách hàng."
    ],
    featuresEn: [
      "Automated post-interaction survey triggers via SMS, Zalo, and Voice.",
      "AI-driven sentiment analysis and topic clustering for feedback insights."
    ],
    svg: `<svg viewBox="0 0 120 80" fill="none" stroke="currentColor" stroke-width="5"><path d="M17 17h55a10 10 0 0 1 10 10v24a10 10 0 0 1-10 10H45l-14 10v-10H17A10 10 0 0 1 7 51V27a10 10 0 0 1 10-10Z"/><circle cx="36" cy="35" r="7"/><path d="M23 49c4-9 22-9 26 0M58 33h13M58 43h18"/><path d="M93 30v25M100 35v15M107 39v7" opacity=".8"/></svg>`,
    bg: "linear-gradient(105deg,#5e79ec 0%,#8998f4 100%)",
    shadow: "rgba(91,112,235,.18)"
  },
  {
    id: "ai-chatbot",
    cls: "c7",
    titleVi: "AI Chatbot",
    titleEn: "AI Chatbot",
    descVi: "Tự động hóa tư vấn và hỗ trợ<br>khách hàng 24/7.",
    descEn: "24/7 automated support and<br>intelligent customer guidance.",
    url: "https://www.aiplatfrom.powerservice.one",
    featuresVi: [
      "Trả lời tự động 24/7 bằng trí tuệ nhân tạo thế hệ mới (Generative AI Chatbot).",
      "Chuyển giao mượt mà cho tư vấn viên (Human Handoff) khi gặp ca phức tạp."
    ],
    featuresEn: [
      "24/7 GenAI chatbot answering routine and complex inquiries naturally.",
      "Seamless human agent handoff with context preservation."
    ],
    svg: `<svg viewBox="0 0 120 80" fill="none" stroke="currentColor" stroke-width="5"><rect x="25" y="22" width="51" height="38" rx="12"/><circle cx="42" cy="40" r="3"/><circle cx="59" cy="40" r="3"/><path d="M42 50c6 5 13 5 19 0M50 22V13M46 13h8"/><path d="M84 32h20a8 8 0 0 1 8 8v11a8 8 0 0 1-8 8H94l-7 6v-6h-3"/><circle cx="92" cy="44" r="2"/><circle cx="99" cy="44" r="2"/></svg>`,
    bg: "linear-gradient(105deg,#20bfb9 0%,#52d8ce 100%)",
    shadow: "rgba(24,191,183,.18)"
  },
  {
    id: "rpa",
    cls: "c8",
    titleVi: "RPA & Workflow",
    titleEn: "RPA & Workflow",
    descVi: "Tự động hóa tác vụ, giảm thao tác<br>thủ công.",
    descEn: "Automating tasks and eliminating<br>manual repetitive steps.",
    url: "https://www.bmpplatform.powerservice.one",
    featuresVi: [
      "Robot tự động hóa quy trình (Robotic Process Automation) xử lý chứng từ và dữ liệu.",
      "Giảm 80% thao tác thủ công, tăng tốc độ phản hồi yêu cầu khách hàng."
    ],
    featuresEn: [
      "Robotic Process Automation (RPA) bots handling back-office data entries.",
      "Cuts 80% manual repetitive steps and accelerates resolution speeds."
    ],
    svg: `<svg viewBox="0 0 120 80" fill="none" stroke="currentColor" stroke-width="5"><circle cx="59" cy="40" r="22"/><circle cx="59" cy="40" r="8"/><path d="M59 11v10M59 59v10M30 40H20M98 40H88M38 19l7 7M80 54l7 7M38 61l7-7M80 26l7-7"/><path d="M23 28l-4 10 10-2M95 52l4-10-10 2"/></svg>`,
    bg: "linear-gradient(105deg,#8b45e8 0%,#ad76ef 100%)",
    shadow: "rgba(131,65,224,.20)"
  },
  {
    id: "knowledge-base",
    cls: "c9",
    titleVi: "Knowledge Base",
    titleEn: "Knowledge Base",
    descVi: "Kho tri thức tập trung cho nhân viên<br>và AI.",
    descEn: "Centralized knowledge repository<br>for agents and AI.",
    url: "https://www.sdpplatfrom.powerservice.one",
    featuresVi: [
      "Lưu trữ bài viết hướng dẫn, quy định nghiệp vụ và câu hỏi thường gặp (FAQ).",
      "Tìm kiếm ngữ nghĩa thông minh (Semantic Search) giúp tư vấn viên tra cứu siêu tốc."
    ],
    featuresEn: [
      "Structured repository for policy articles, FAQs, and product knowledge.",
      "Smart semantic search enabling instant information retrieval for agents."
    ],
    svg: `<svg viewBox="0 0 120 80" fill="none" stroke="currentColor" stroke-width="5"><path d="M18 23h32a9 9 0 0 1 9 9v37H27a9 9 0 0 0-9 9V23Z"/><path d="M102 23H70a9 9 0 0 0-9 9v37h32a9 9 0 0 1 9 9V23Z"/><path d="M61 20V8M52 13l9-7 9 7M82 43l7-7M82 43l-7-7M82 43v16"/><path d="M76 60h12"/></svg>`,
    bg: "linear-gradient(105deg,#219de8 0%,#4ab6f2 100%)",
    shadow: "rgba(31,156,230,.18)"
  },
  {
    id: "qa-quality",
    cls: "c10",
    titleVi: "QA & Quality",
    titleEn: "QA & Quality Control",
    descVi: "Kiểm soát chất lượng cuộc gọi<br>và tương tác dịch vụ.",
    descEn: "Quality control for call handling<br>and service interactions.",
    url: "https://www.cscplatform.powerservice.one",
    featuresVi: [
      "Chấm điểm chất lượng cuộc gọi và tin nhắn chat theo tiêu chuẩn khung QA.",
      "AI Speech Analytics tự động phân tích và cảnh báo vi phạm kịch bản tư vấn."
    ],
    featuresEn: [
      "Call scoring and chat interaction audits against standardized QA rubrics.",
      "AI Speech Analytics automatically spotting compliance gaps and script deviations."
    ],
    svg: `<svg viewBox="0 0 120 80" fill="none" stroke="currentColor" stroke-width="5"><path d="M60 8l31 12v22c0 18-13 29-31 34C42 71 29 60 29 42V20L60 8Z"/><path d="M45 41l10 10 21-23"/><path d="M18 40v13M102 40v13"/><path d="M18 53h10M92 53h10"/></svg>`,
    bg: "linear-gradient(105deg,#f35b72 0%,#fa8794 100%)",
    shadow: "rgba(240,83,108,.18)"
  },
  {
    id: "lms-training",
    cls: "c11",
    titleVi: "LMS & Đào tạo",
    titleEn: "LMS & Training",
    descVi: "Đào tạo, đánh giá và phát triển<br>đội ngũ CSKH.",
    descEn: "Training, assessment, and talent<br>development for CSKH.",
    url: "https://www.lmsplatfrom.powerservice.one",
    featuresVi: [
      "Xây dựng lộ trình đào tạo Onboarding cho nhân viên mới và kiểm tra sát hạch.",
      "Tự động chấm điểm bài thi và quản lý chứng chỉ năng lực tư vấn viên."
    ],
    featuresEn: [
      "Structured onboarding learning paths and periodic compliance quizzes.",
      "Automated exam grading, skill gap indexing, and certification records."
    ],
    svg: `<svg viewBox="0 0 120 80" fill="none" stroke="currentColor" stroke-width="5"><path d="M19 28l41-17 41 17-41 17-41-17Z"/><path d="M34 35v17c11 10 41 10 52 0V35"/><path d="M101 30v22"/><circle cx="73" cy="57" r="13" opacity=".55"/><path d="M69 50l9 7-9 7V50Z" fill="currentColor" stroke="none"/></svg>`,
    bg: "linear-gradient(105deg,#40bf7b 0%,#83dc8d 100%)",
    shadow: "rgba(53,188,116,.18)"
  },
  {
    id: "bi-reporting",
    cls: "c12",
    titleVi: "BI & Báo cáo",
    titleEn: "BI & Analytics",
    descVi: "Dashboard dữ liệu, cảnh báo<br>và ra quyết định.",
    descEn: "Data dashboard, real-time alerts,<br>and decision support.",
    url: "https://www.sdpplatfrom.powerservice.one",
    featuresVi: [
      "Bảng điều khiển Wallboard hiển thị tức thời các chỉ số vận hành CSKH.",
      "Báo cáo xu hướng, dự báo lưu lượng cuộc gọi và cảnh báo quá tải tự động."
    ],
    featuresEn: [
      "Real-time executive Wallboard plotting live contact center health metrics.",
      "Call volume forecasting models and automated queue overflow alerts."
    ],
    svg: `<svg viewBox="0 0 120 80" fill="none" stroke="currentColor" stroke-width="5"><rect x="16" y="11" width="88" height="61" rx="5"/><path d="M16 25h88"/><circle cx="26" cy="18" r="2" fill="currentColor" stroke="none"/><circle cx="33" cy="18" r="2" fill="currentColor" stroke="none"/><path d="M32 60V45h11v15H32Zm20 0V37h11v23H52Zm20 0V30h11v30H72Z" fill="currentColor" opacity=".55" stroke="none"/><path d="M28 54l15-9 12 3 21-17"/></svg>`,
    bg: "linear-gradient(105deg,#8748ed 0%,#a267ef 100%)",
    shadow: "rgba(123,67,228,.20)"
  }
];

export function Systems() {
  const { lang } = useLanguage();
  const { theme, setTheme } = useTheme();
  const isVi = lang === "vi";
  const isDark = theme === "glass-dark-neon" || (typeof theme === "string" && theme.includes("dark"));

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSystem, setSelectedSystem] = useState<SystemItemHTML | null>(null);

  const filteredSystems = useMemo(() => {
    if (!searchQuery.trim()) return SYSTEMS_12_DATA;
    const q = searchQuery.toLowerCase().trim();
    return SYSTEMS_12_DATA.filter((item) => {
      const matchVi = item.titleVi.toLowerCase().includes(q) || item.descVi.toLowerCase().includes(q);
      const matchEn = item.titleEn.toLowerCase().includes(q) || item.descEn.toLowerCase().includes(q);
      const matchId = item.id.toLowerCase().includes(q) || item.cls.toLowerCase().includes(q);
      return matchVi || matchEn || matchId;
    });
  }, [searchQuery]);

  const handleCardClick = (item: SystemItemHTML) => {
    try { playUiSound("click"); } catch {}
    setSelectedSystem(item);
  };

  return (
    <section
      id="systems"
      className="relative w-full h-auto overflow-y-auto flex flex-col justify-start items-stretch p-3.5 sm:p-5 font-sans text-slate-800 dark:text-slate-100 transition-colors duration-500 select-none bg-transparent"
    >
      {/* 100% Exact HTML System Cards CSS Rules */}
      <style dangerouslySetInnerHTML={{ __html: `
        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          width: 100%;
        }
        .system-list-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 10px 0 45px;
        }
        .system-list {
          width: min(630px, 100%);
          display: flex;
          flex-direction: column;
          gap: 19px;
          margin: 0 auto;
        }
        .system-card, .card {
          position: relative;
          min-height: 116px;
          height: auto !important;
          overflow: hidden;
          border-radius: 17px;
          padding: 16px 28px;
          isolation: isolate;
          box-shadow: 0 14px 28px var(--shadow);
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.4);
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease;
        }

        /* DARK MODE DEDICATED CARDS STYLING */
        .dark .system-card {
          border: 1px solid rgba(255, 255, 255, 0.22) !important;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.65), 0 0 20px var(--shadow) !important;
        }
        .dark .system-card:before {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%), var(--bg) !important;
          background-blend-mode: overlay, normal !important;
        }
        .dark .system-card:hover {
          border-color: rgba(255, 255, 255, 0.45) !important;
          box-shadow: 0 22px 48px rgba(0, 0, 0, 0.8), 0 0 28px var(--shadow) !important;
        }
        .dark .system-card h2 {
          color: #ffffff !important;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
        }
        .dark .system-card p {
          color: rgba(241, 245, 249, 0.95) !important;
          text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
        }
        .dark .system-card .icon {
          color: rgba(255, 255, 255, 0.65) !important;
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.25));
        }
        .system-card:hover {
          transform: translateY(-3px) scale(1.01);
          box-shadow: 0 20px 36px var(--shadow);
        }
        .system-card:before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -3;
          background: var(--bg);
        }
        .system-card:after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -2;
          background:
            radial-gradient(circle at 64% -20%,rgba(255,255,255,.23) 0 11%,transparent 11.5%),
            radial-gradient(circle at 84% 28%,rgba(255,255,255,.13) 0 8%,transparent 8.5%),
            radial-gradient(circle at 16% 105%,rgba(255,255,255,.12) 0 12%,transparent 12.5%);
          opacity: .9;
        }
        .system-card .wave {
          position: absolute;
          z-index: -1;
          left: -3%;
          right: -3%;
          bottom: -8px;
          height: 62px;
          border-top: 1px solid rgba(255,255,255,.28);
          border-radius: 50%;
          transform: rotate(-5deg);
          opacity: .8;
        }
        .system-card .wave:after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 18px;
          height: 50px;
          border-top: 1px solid rgba(255,255,255,.22);
          border-radius: 50%;
          transform: rotate(-3deg);
        }
        .system-card .content {
          position: relative;
          z-index: 2;
          width: 66%;
          text-align: left;
        }
        .system-card h2 {
          margin: 0 0 10px;
          font-size: 29px;
          line-height: 1.02;
          font-weight: 800;
          letter-spacing: -.6px;
          color: #ffffff !important;
          font-family: Arial, Helvetica, sans-serif;
        }
        .system-card p {
          margin: 0;
          font-size: 19px;
          line-height: 1.35;
          font-weight: 400;
          letter-spacing: .05px;
          color: #ffffff !important;
          font-family: Arial, Helvetica, sans-serif;
        }
        .system-card .icon {
          position: absolute;
          right: 31px;
          top: 18px;
          width: 118px;
          height: 80px;
          color: rgba(255,255,255,.47);
          z-index: 1;
        }
        .system-card .icon svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .c1{--bg:linear-gradient(105deg,#ffc335 0%,#ffd867 100%);--shadow:rgba(255,190,30,.18)}
        .c2{--bg:linear-gradient(105deg,#3e79ec 0%,#75a2f7 100%);--shadow:rgba(65,112,238,.18)}
        .c3{--bg:linear-gradient(105deg,#17aee9 0%,#42c7ee 100%);--shadow:rgba(17,174,230,.18)}
        .c4{--bg:linear-gradient(105deg,#f34b79 0%,#f78ca0 100%);--shadow:rgba(242,73,115,.18)}
        .c5{--bg:linear-gradient(105deg,#ff7b18 0%,#ffab63 100%);--shadow:rgba(255,119,25,.18)}
        .c6{--bg:linear-gradient(105deg,#5e79ec 0%,#8998f4 100%);--shadow:rgba(91,112,235,.18)}
        .c7{--bg:linear-gradient(105deg,#20bfb9 0%,#52d8ce 100%);--shadow:rgba(24,191,183,.18)}
        .c8{--bg:linear-gradient(105deg,#8b45e8 0%,#ad76ef 100%);--shadow:rgba(131,65,224,.20)}
        .c9{--bg:linear-gradient(105deg,#219de8 0%,#4ab6f2 100%);--shadow:rgba(31,156,230,.18)}
        .c10{--bg:linear-gradient(105deg,#f35b72 0%,#fa8794 100%);--shadow:rgba(240,83,108,.18)}
        .c11{--bg:linear-gradient(105deg,#40bf7b 0%,#83dc8d 100%);--shadow:rgba(53,188,116,.18)}
        .c12{--bg:linear-gradient(105deg,#8748ed 0%,#a267ef 100%);--shadow:rgba(123,67,228,.20)}

        @media(max-width:700px){
          .system-list-wrapper{padding:10px 0 30px}
          .system-list{width:100%;gap:14px}
          .system-card{height:116px;padding:16px 22px;border-radius:16px}
          .system-card h2{font-size:clamp(21px,6vw,29px)}
          .system-card p{font-size:clamp(14px,4vw,19px)}
          .system-card .content{width:72%}
          .system-card .icon{right:16px;width:88px;height:72px;opacity:.8}
        }
      `}} />

      <div className="w-full max-w-full h-full min-h-full flex-grow flex-1 flex flex-col gap-5 mx-auto justify-start relative z-10">
        
        {/* Page Card Header with Search */}
        <div className="relative w-full">
          <PageCardHeader pageId="systems">
            <div className="w-full flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-0.5 w-full">
              {/* Left Side: Badge */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="w-2 h-4 bg-indigo-600 dark:bg-indigo-400 rounded-full shrink-0" />
                <span className="text-caption font-semibold font-mono text-indigo-700 dark:text-indigo-300 bg-indigo-500/15 px-2.5 py-0.5 rounded-full border border-indigo-500/30 shadow-2xs">
                  {isVi ? "12 Hệ thống CSKH" : "12 CSKH System Cards"}
                </span>
              </div>

              {/* Right Side: Quick Search & Light/Dark Theme Switcher */}
              <div className="flex items-center gap-2 sm:gap-3 md:ml-auto w-full md:w-auto">
                {/* Theme Mode Toggle Button */}
                <button
                  type="button"
                  onClick={() => {
                    setTheme(isDark ? "glass-light-multicolor" : "glass-dark-neon");
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer border bg-white/70 dark:bg-slate-800/70 border-slate-200/80 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:scale-105 active:scale-95 shadow-2xs shrink-0"
                  title={isVi ? "Chuyển đổi Giao diện Sáng / Tối" : "Toggle Light / Dark Theme"}
                >
                  {isDark ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      <span className="hidden sm:inline-block">{isVi ? "Sáng" : "Light"}</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-indigo-500" />
                      <span className="hidden sm:inline-block">{isVi ? "Tối" : "Dark"}</span>
                    </>
                  )}
                </button>

                <div className="relative flex-1 sm:w-64 shrink-0">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isVi ? "Tìm mã, tên hệ thống..." : "Search system name..."}
                    className="w-full pl-8 pr-3 py-1.5 rounded-full text-xs bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-play"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </PageCardHeader>
        </div>

        {/* 100% HTML MATCHING 12 CARDS CONTAINER */}
        <div className="system-list-wrapper">
          {filteredSystems.length === 0 ? (
            <div className="w-full py-12 px-6 flex flex-col items-center justify-center text-center gap-3 border border-slate-200/60 dark:border-white/10 rounded-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
              <div className="w-12 h-12 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 font-play">
                {isVi ? "Không tìm thấy hệ thống phù hợp" : "No matching system found"}
              </h4>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition cursor-pointer"
              >
                {isVi ? "Xem tất cả 12 hệ thống" : "View all 12 systems"}
              </button>
            </div>
          ) : (
            <main className="grid-container w-full">
              {filteredSystems.map((item) => (
                <article
                  key={item.id}
                  className={`system-card card ${item.cls}`}
                  onClick={() => handleCardClick(item)}
                  title={isVi ? "Nhấp để xem chi tiết tính năng" : "Click to view features"}
                >
                  <div className="content">
                    <h2>{isVi ? item.titleVi : item.titleEn}</h2>
                    <p dangerouslySetInnerHTML={{ __html: isVi ? item.descVi : item.descEn }} />
                  </div>

                  <div
                    className="icon"
                    dangerouslySetInnerHTML={{ __html: item.svg }}
                  />

                  <div className="wave" />
                </article>
              ))}
            </main>
          )}
        </div>

      </div>

      {/* SYSTEM DETAIL MODAL */}
      <AnimatePresence>
        {selectedSystem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSystem(null)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-5"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col relative z-50 text-left"
            >
              {/* Modal Header Banner */}
              <div
                className="p-5 text-white flex items-center justify-between relative overflow-hidden"
                style={{ background: selectedSystem.bg }}
              >
                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-inner p-1">
                    <div className="w-8 h-8 text-white" dangerouslySetInnerHTML={{ __html: selectedSystem.svg }} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/20 border border-white/30">
                      {selectedSystem.id.toUpperCase()}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold font-play mt-1 text-white">
                      {isVi ? selectedSystem.titleVi : selectedSystem.titleEn}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedSystem(null)}
                  className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition cursor-pointer relative z-10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-6 flex flex-col gap-4 text-slate-700 dark:text-slate-200 font-play">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    {isVi ? "Mô tả chức năng & quy trình" : "Functional Description"}
                  </label>
                  <p
                    className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-1"
                    dangerouslySetInnerHTML={{ __html: isVi ? selectedSystem.descVi : selectedSystem.descEn }}
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    {isVi ? "Tính năng cốt lõi" : "Core Features"}
                  </label>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5">
                    {(isVi ? selectedSystem.featuresVi : selectedSystem.featuresEn).map((feat, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-2" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    {isVi ? "Cổng truy cập hệ thống" : "System Access Portal"}
                  </label>
                  <div className="mt-1.5 flex items-center gap-2 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono break-all text-slate-600 dark:text-slate-300">
                    <Globe2 className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span className="flex-1 truncate">
                      {selectedSystem.url || (isVi ? "Đang cấu hình liên kết nội bộ..." : "Internal API endpoint...")}
                    </span>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-850 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedSystem(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                  >
                    {isVi ? "Đóng" : "Close"}
                  </button>

                  {selectedSystem.url ? (
                    <a
                      href={selectedSystem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md hover:shadow-indigo-500/25 flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <span>{isVi ? "Truy cập cổng làm việc" : "Launch Portal"}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                    >
                      {isVi ? "Đang đồng bộ API" : "Syncing API"}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Systems;
