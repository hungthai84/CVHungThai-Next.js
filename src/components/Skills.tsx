import React, { useState, useEffect, useMemo } from "react";
import { useLanguage } from "../i18n";
import { motion, AnimatePresence } from "motion/react";
import { 
  Brain,
  Target, 
  TrendingUp, 
  Zap, 
  ChevronsUpDown, 
  Gem, 
  Rocket, 
  Bot, 
  HeartHandshake, 
  BarChart3, 
  Monitor, 
  ShieldAlert, 
  Cpu, 
  Users, 
  BadgeDollarSign, 
  Award, 
  Globe,
  Database,
  Workflow,
  ShieldCheck,
  FolderKanban,
  MessageSquare,
  Languages,
  Sparkles,
  CheckCircle2,
  Maximize2,
  Search,
  X,
  Layers,
  Code2,
  GraduationCap,
  MessagesSquare,
  Network,
  Compass,
  PieChart,
  LayoutGrid,
  ChevronRight,
  Info
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";
import { cn } from "../lib/utils";
import { playUiSound } from "../lib/sound";
import { PageCardHeader } from "./PageCardHeader";
import { IndustrialSubSection } from "./IndustrialStaggerContainer";
import { SKILL_GROUPS, SkillItem, SkillGroup } from "../data/skillsData";
import { SkillHoverProgressChart } from "./SkillHoverProgressChart";
import {
  ExpandedCardStrengths,
  ExpandedCardOpportunities,
  ExpandedCardWeaknesses,
  ExpandedCardThreats,
  ExpandedCardLanguages
} from "./SkillCardExpandedViews";

type CardKey = "swot-s" | "swot-o" | "swot-w" | "swot-t";
type ViewTab = "all" | "swot" | "domains" | "languages";

// Icon mapping helper for domain group skills
const ICON_MAP: Record<string, React.ElementType> = {
  Database,
  BarChart3,
  Brain,
  Workflow,
  Zap,
  Code2,
  Users,
  FolderKanban,
  GraduationCap,
  TrendingUp,
  Target,
  ShieldAlert,
  MessagesSquare,
  Network,
  Award,
  Sparkles,
  Compass,
  PieChart,
  ShieldCheck,
  Layers,
  Bot,
  LayoutGrid,
  Rocket,
  Languages,
  Globe
};

const STRENGTHS_SKILLS = [
  { icon: HeartHandshake, label: "Customer-Centric & CX", percent: 98, descVi: "Xây dựng trải nghiệm khách hàng xuất sắc, thấu cảm hành vi và tối ưu hóa điểm chạm đa kênh.", descEn: "Delivering customer-centric excellence, empathetic journey mapping, and omnichannel CX optimization." },
  { icon: Database, label: "CRM & Contact Center", percent: 96, descVi: "Vận hành hệ thống tổng đài đa kênh Omnichannel, CRM đa nền tảng và dữ liệu khách hàng 360°.", descEn: "Managing enterprise omnichannel contact centers, multi-platform CRM, and 360° customer data." },
  { icon: BarChart3, label: "Quản trị Hiệu suất", percent: 96, descVi: "Thiết lập OKRs, KPIs, phân tích số liệu vận hành và giám sát chất lượng dịch vụ chuẩn quốc tế.", descEn: "Establishing operational KPIs/OKRs, performance analytics, and international QA frameworks." },
  { icon: Users, label: "Lãnh đạo & Đội ngũ", percent: 95, descVi: "Dẫn dắt, truyền cảm hứng, phát triển năng lực nhân sự và xây dựng văn hóa gắn kết phục vụ.", descEn: "Inspiring teams, talent development, and fostering an empathetic, high-retention service culture." },
  { icon: Workflow, label: "SOP & Chuẩn hóa", percent: 95, descVi: "Chuẩn hóa quy trình vận hành tiêu chuẩn, tài liệu hóa hướng dẫn và kiểm soát chất lượng đồng bộ.", descEn: "Standard operating procedure development, quality control documentation, and process audit." },
  { icon: ShieldCheck, label: "Xử lý Khủng hoảng", percent: 94, descVi: "Xử lý khiếu nại phức tạp, kiểm soát sự cố rủi ro và bảo vệ uy tín thương hiệu trong mọi tình huống.", descEn: "Critical incident management, VIP escalation resolution, and brand equity protection." },
];

const OPPORTUNITIES_SKILLS = [
  { icon: Bot, title: "AI & Tự động hóa", meter: 94, descVi: "Ứng dụng GenAI, Chatbot, Voicebot và Agentic AI nâng cao năng suất phục vụ khách hàng.", descEn: "Applying GenAI, Chatbots, Voicebots, and Agentic AI to supercharge customer service productivity." },
  { icon: Sparkles, title: "Cải tiến liên tục", meter: 94, descVi: "Áp dụng Kaizen, Lean Six Sigma để liên tục rà soát loại bỏ lãng phí và tinh gọn vận hành.", descEn: "Continuous improvement through Kaizen and Lean Six Sigma to eliminate waste and streamline operations." },
  { icon: BadgeDollarSign, title: "Tối ưu Chi phí", meter: 93, descVi: "Tối ưu hóa chi phí vận hành (Cost per Contact), định biên nhân sự và phân bổ ngân sách khoa học.", descEn: "Optimizing Cost per Contact, headcounts, and allocating operational budgets effectively." },
  { icon: Monitor, title: "Chuyển đổi Số", meter: 92, descVi: "Số hóa quy trình làm việc, chuyển đổi mô hình CSKH truyền thống sang kỷ nguyên số thông minh.", descEn: "Digitizing workflows, transitioning legacy contact centers into modern digital operations." },
  { icon: BarChart3, title: "Quản trị Dữ liệu", meter: 91, descVi: "Xây dựng dashboard BI, phân tích xu hướng tương tác và chuyển hóa dữ liệu thành quyết định chiến lược.", descEn: "Building BI dashboards, analyzing interaction trends, and turning data into actionable strategy." },
  { icon: Workflow, title: "Thiết kế Hệ thống", meter: 87, descVi: "Thiết kế kiến trúc hệ sinh thái chăm sóc khách hàng toàn diện, mở rộng linh hoạt theo quy mô.", descEn: "Designing comprehensive CX ecosystem architectures capable of scaling flexibly." },
];

const WEAKNESSES_SKILLS = [
  { icon: HeartHandshake, label: "Service Mindset", percent: 92, descVi: "Lan tỏa tư duy phụng sự từ tâm, lấy khách hàng làm trọng tâm cho toàn bộ tổ chức.", descEn: "Fostering an authentic servant leadership mindset with customer-centricity across all teams." },
  { icon: MessageSquare, label: "Giao tiếp & Đàm phán", percent: 90, descVi: "Kỹ năng lắng nghe sâu, đối thoại truyền cảm hứng và đàm phán giải quyết xung đột đa phương.", descEn: "Deep active listening, inspiring dialogue, and win-win multi-party conflict negotiation." },
  { icon: Target, label: "Tư duy Chiến lược", percent: 88, descVi: "Nhìn nhận bức tranh tổng thể, hoạch định chiến lược dài hạn và định hướng phát triển bền vững.", descEn: "Big-picture vision, long-term roadmapping, and driving sustainable service excellence." },
  { icon: FolderKanban, label: "Quản trị Dự án", percent: 88, descVi: "Quản trị tiến độ, điều phối nguồn lực liên phòng ban và đảm bảo bàn giao dự án đúng cam kết.", descEn: "Timeline management, cross-functional resource orchestration, and on-time project delivery." },
  { icon: Cpu, label: "Công nghệ & Đổi mới", percent: 86, descVi: "Tiếp thu nhanh các công nghệ mới nổi, thử nghiệm và tích hợp vào thực tiễn kinh doanh.", descEn: "Fast adoption of emerging tech stacks, pragmatic experimentation, and business integration." },
  { icon: Monitor, label: "Thiết kế & Lập trình", percent: 78, descVi: "Nắm bắt logic kỹ thuật, hiểu sâu kiến trúc phần mềm để làm việc hiệu quả với đội ngũ Tech.", descEn: "Grasping technical logic and software architecture to collaborate seamlessly with engineering teams." },
];

const THREATS_SKILLS = [
  { icon: BadgeDollarSign, title: "Tối ưu Chi phí", meter: 94, descVi: "Cân đối giữa áp lực cắt giảm ngân sách và yêu cầu giữ vững chất lượng dịch vụ cam kết.", descEn: "Balancing strict budget constraints while maintaining high SLAs and service quality." },
  { icon: Cpu, title: "AI & Thay đổi CSKH", meter: 92, descVi: "Thích ứng với làn sóng AI thay thế nhân sự truyền thống và định vị lại vai trò của con người.", descEn: "Adapting to the AI revolution in CX and repositioning high-touch human agent roles." },
  { icon: BarChart3, title: "Công nghệ Đổi mới", meter: 90, descVi: "Tốc độ thay đổi công nghệ chóng mặt đòi hỏi phải liên tục học hỏi và cập nhật kiến thức mới.", descEn: "Rapid pace of tech disruption requiring continuous learning and agile system upgrades." },
  { icon: ShieldAlert, title: "Quản trị Rủi ro", meter: 90, descVi: "Phòng ngừa và ứng phó kịp thời với các rủi ro bảo mật dữ liệu, an ninh thông tin và khủng hoảng truyền thông.", descEn: "Mitigating risks in customer data privacy, information security, and public relations escalations." },
  { icon: Users, title: "Cạnh tranh Nhân sự", meter: 88, descVi: "Giải bài toán giữ chân nhân tài và giảm tỷ lệ luân chuyển nhân sự (attrition rate) trong ngành CSKH.", descEn: "Tackling high attrition rates and retaining top customer service talent in a competitive market." },
  { icon: Workflow, title: "Phối hợp Liên phòng", meter: 86, descVi: "Vượt qua rào cản phòng ban (silo mentality) để đồng bộ hóa hành trình trải nghiệm khách hàng liền mạch.", descEn: "Breaking departmental silos to ensure a smooth, end-to-end customer journey." },
];

export function Skills() {
  const { theme } = useTheme();
  const { language, lang } = useLanguage();
  const isVi = (language || lang) === "vi";

  // Tab filter: Tất cả / Ma trận SWOT / Nhóm Chuyên môn (A-E) / Ngoại ngữ & AI
  const [selectedCategory, setSelectedCategory] = useState<ViewTab>("all");
  
  // Quick search query for filtering skills across all categories
  const [searchQuery, setSearchQuery] = useState("");

  // Manage individual card collapse states
  const [collapsedCards, setCollapsedCards] = useState<Record<CardKey, boolean>>({
    "swot-s": false,
    "swot-o": false,
    "swot-w": false,
    "swot-t": false,
  });

  // Modal deep-dive state for expanded SWOT / Language views
  const [activeModal, setActiveModal] = useState<CardKey | "languages" | null>(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeModal) {
        playUiSound("close");
        setActiveModal(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModal]);

  const toggleSingleCard = (cardKey: CardKey) => {
    playUiSound("toggle");
    setCollapsedCards((prev) => ({
      ...prev,
      [cardKey]: !prev[cardKey],
    }));
  };

  const areAllCollapsed = Object.values(collapsedCards).every(Boolean);

  const toggleAllCards = () => {
    playUiSound("toggle");
    const nextState = !areAllCollapsed;
    setCollapsedCards({
      "swot-s": nextState,
      "swot-o": nextState,
      "swot-w": nextState,
      "swot-t": nextState,
    });
  };

  const handleNavigateToContact = (topic?: string) => {
    playUiSound("click");
    if (topic) {
      sessionStorage.setItem("contact_selected_skill_topic", topic);
    }
    setActiveModal(null);
    window.dispatchEvent(new CustomEvent("app-navigate", { detail: "contact" }));
  };

  const openModal = (modalKey: CardKey | "languages") => {
    playUiSound("open");
    setActiveModal(modalKey);
  };

  const closeModal = () => {
    playUiSound("close");
    setActiveModal(null);
  };

  // Filter domain groups based on search query
  const filteredSkillGroups = useMemo(() => {
    if (!searchQuery.trim()) return SKILL_GROUPS;
    const query = searchQuery.toLowerCase().trim();

    return SKILL_GROUPS.map((group) => {
      const matchingSkills = group.skills.filter((skill) => {
        const name = (isVi ? skill.nameVi : skill.nameEn).toLowerCase();
        const desc = (isVi ? skill.descriptionVi : skill.descriptionEn).toLowerCase();
        const tools = skill.tools.some((t) => t.toLowerCase().includes(query));
        const highlights = (isVi ? skill.keyHighlightsVi : skill.keyHighlightsEn).some((h) =>
          h.toLowerCase().includes(query)
        );
        return name.includes(query) || desc.includes(query) || tools || highlights;
      });

      return {
        ...group,
        skills: matchingSkills,
      };
    }).filter((group) => group.skills.length > 0);
  }, [searchQuery, isVi]);

  return (
    <section
      id="skills"
      className="relative w-full min-h-full flex flex-col justify-start items-center p-2 sm:p-4 lg:p-6 font-sans text-slate-800 dark:text-slate-100 transition-all duration-300"
    >
      {/* Main Container */}
      <div className="w-full flex flex-col gap-4">
        {/* Component Specific Style Injector for Glassmorphism & High Fidelity Transitions */}
        <style>{`
          .skills-glass-panel {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid var(--theme-border, var(--glass-border, rgba(226, 232, 240, 0.8)));
            box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.08);
          }

          .dark .skills-glass-panel {
            background: rgba(15, 23, 42, 0.85);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid var(--theme-border, var(--glass-border, rgba(0, 240, 255, 0.35)));
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 240, 255, 0.18), inset 0 1.5px 2px rgba(255, 255, 255, 0.18);
          }

          .skills-glass-swot-blue {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 20px;
            box-shadow: 0 12px 32px -10px rgba(59, 130, 246, 0.1);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .skills-glass-swot-blue:hover {
            border-color: rgba(59, 130, 246, 0.6);
            box-shadow: 0 20px 40px -12px rgba(59, 130, 246, 0.18);
          }
          .dark .skills-glass-swot-blue {
            background: rgba(15, 23, 42, 0.85);
            border: 1px solid rgba(59, 130, 246, 0.35);
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.7), 0 0 20px rgba(59, 130, 246, 0.15);
          }
          .dark .skills-glass-swot-blue:hover {
            border-color: rgba(59, 130, 246, 0.7);
            box-shadow: 0 20px 48px rgba(0, 0, 0, 0.8), 0 0 30px rgba(59, 130, 246, 0.25);
          }

          .skills-glass-swot-purple {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(139, 92, 246, 0.3);
            border-radius: 20px;
            box-shadow: 0 12px 32px -10px rgba(139, 92, 246, 0.1);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .skills-glass-swot-purple:hover {
            border-color: rgba(139, 92, 246, 0.6);
            box-shadow: 0 20px 40px -12px rgba(139, 92, 246, 0.18);
          }
          .dark .skills-glass-swot-purple {
            background: rgba(15, 23, 42, 0.85);
            border: 1px solid rgba(139, 92, 246, 0.35);
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.7), 0 0 20px rgba(139, 92, 246, 0.15);
          }
          .dark .skills-glass-swot-purple:hover {
            border-color: rgba(139, 92, 246, 0.7);
            box-shadow: 0 20px 48px rgba(0, 0, 0, 0.8), 0 0 30px rgba(139, 92, 246, 0.25);
          }

          .skills-glass-swot-amber {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(245, 158, 11, 0.3);
            border-radius: 20px;
            box-shadow: 0 12px 32px -10px rgba(245, 158, 11, 0.1);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .skills-glass-swot-amber:hover {
            border-color: rgba(245, 158, 11, 0.6);
            box-shadow: 0 20px 40px -12px rgba(245, 158, 11, 0.18);
          }
          .dark .skills-glass-swot-amber {
            background: rgba(15, 23, 42, 0.85);
            border: 1px solid rgba(245, 158, 11, 0.35);
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.7), 0 0 20px rgba(245, 158, 11, 0.15);
          }
          .dark .skills-glass-swot-amber:hover {
            border-color: rgba(245, 158, 11, 0.7);
            box-shadow: 0 20px 48px rgba(0, 0, 0, 0.8), 0 0 30px rgba(245, 158, 11, 0.25);
          }

          .skills-glass-swot-rose {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(244, 63, 94, 0.3);
            border-radius: 20px;
            box-shadow: 0 12px 32px -10px rgba(244, 63, 94, 0.1);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .skills-glass-swot-rose:hover {
            border-color: rgba(244, 63, 94, 0.6);
            box-shadow: 0 20px 40px -12px rgba(244, 63, 94, 0.18);
          }
          .dark .skills-glass-swot-rose {
            background: rgba(15, 23, 42, 0.85);
            border: 1px solid rgba(244, 63, 94, 0.35);
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.7), 0 0 20px rgba(244, 63, 94, 0.15);
          }
          .dark .skills-glass-swot-rose:hover {
            border-color: rgba(244, 63, 94, 0.7);
            box-shadow: 0 20px 48px rgba(0, 0, 0, 0.8), 0 0 30px rgba(244, 63, 94, 0.25);
          }

          .skills-glass-card {
            background: rgba(255, 255, 255, 0.75);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(226, 232, 240, 0.8);
            border-radius: 14px;
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .skills-glass-card:hover {
            background: rgba(255, 255, 255, 0.95);
            box-shadow: 0 8px 20px -6px rgba(0, 0, 0, 0.06);
          }
          .dark .skills-glass-card {
            background: rgba(30, 41, 59, 0.65);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 14px;
          }
          .dark .skills-glass-card:hover {
            background: rgba(30, 41, 59, 0.9);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
          }

          .skills-hover-lift {
            transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
          }
          .skills-hover-lift:hover {
            transform: translateY(-2px);
          }

          .skills-swot-collapse-grid {
            display: grid;
            grid-template-rows: 1fr;
            transition: grid-template-rows 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease;
            opacity: 1;
          }
          .skills-swot-collapse-grid.is-collapsed {
            grid-template-rows: 0fr;
            opacity: 0;
            pointer-events: none;
          }
          .skills-swot-collapse-inner {
            overflow: hidden;
            min-height: 0;
          }
          .skills-swot-collapse-grid:not(.is-collapsed) .skills-swot-collapse-inner {
            overflow: visible;
          }

          @media print {
            .skills-glass-panel, .skills-glass-card, [class*="skills-glass-swot-"] { 
              background: #fff !important; 
              border: 1px solid #ddd !important; 
              box-shadow: none !important; 
            }
            button, input, .no-print { 
              display: none !important; 
            }
            .skills-swot-collapse-grid { 
              grid-template-rows: 1fr !important; 
              opacity: 1 !important; 
            }
          }
        `}</style>

        {/* Header with Title, Filter Tabs & Search */}
        <IndustrialSubSection hasIndustrialAccent>
          <PageCardHeader pageId="skills">
          {/* Left: Indicator & Search Bar */}
          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap w-full sm:w-auto">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2.5 h-5 bg-purple-600 dark:bg-purple-400 rounded-full shrink-0" aria-hidden="true" />
              <span className="text-caption font-semibold font-mono text-purple-700 dark:text-purple-300 bg-purple-500/15 px-2.5 py-0.5 rounded-full border border-purple-500/30 shadow-2xs">
                {isVi ? "4 Khối SWOT & 5 Nhóm Chuyên Môn" : "4 SWOT Quadrants & 5 Skill Domains"}
              </span>
            </div>

            {/* Quick Skill Search Input */}
            <div className="relative flex items-center min-w-[200px] max-w-xs w-full sm:w-auto">
              <Search className="w-3.5 h-3.5 absolute left-2.5 text-slate-400 pointer-events-none" aria-hidden="true" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isVi ? "Tìm kỹ năng, CRM, AI..." : "Search skills, CRM, AI..."}
                aria-label={isVi ? "Tìm kiếm nhanh kỹ năng" : "Quick skill search"}
                className="w-full pl-8 pr-7 py-1.5 text-xs rounded-xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label={isVi ? "Xóa nội dung tìm kiếm" : "Clear search query"}
                  className="absolute right-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded focus:outline-none focus-visible:ring-1 focus-visible:ring-purple-500"
                  title={isVi ? "Xóa tìm kiếm" : "Clear"}
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          {/* Right: Category Tabs & Expand All */}
          <div className="flex items-center gap-2 ml-auto flex-wrap">
            {/* View Filter Tabs */}
            <div 
              role="tablist" 
              aria-label={isVi ? "Bộ lọc phân loại kỹ năng" : "Skill category filters"}
              className="flex bg-slate-100/90 dark:bg-slate-900/90 p-1 rounded-xl border border-slate-200/60 dark:border-slate-800/80 shadow-2xs"
            >
              {[
                { id: "all", labelVi: "Tất cả", labelEn: "All" },
                { id: "swot", labelVi: "Ma trận SWOT", labelEn: "SWOT Matrix" },
                { id: "domains", labelVi: "Chuyên môn A-E", labelEn: "Domains A-E" },
                { id: "languages", labelVi: "Ngoại ngữ & AI", labelEn: "Languages & AI" },
              ].map((tab) => {
                const isActive = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    id={`skill-tab-${tab.id}`}
                    aria-selected={isActive}
                    aria-controls={`skill-panel-${tab.id}`}
                    type="button"
                    onClick={() => {
                      playUiSound("click");
                      setSelectedCategory(tab.id as ViewTab);
                    }}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-caption font-bold transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500",
                      isActive
                        ? "bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    )}
                  >
                    {isVi ? tab.labelVi : tab.labelEn}
                  </button>
                );
              })}
            </div>

            {/* Global Collapse / Expand Toggle Button */}
            {(selectedCategory === "all" || selectedCategory === "swot") && (
              <button
                type="button"
                onClick={toggleAllCards}
                aria-label={areAllCollapsed ? (isVi ? "Mở rộng toàn bộ 4 khối SWOT" : "Expand all 4 SWOT cards") : (isVi ? "Thu gọn toàn bộ 4 khối SWOT" : "Collapse all 4 SWOT cards")}
                className="px-3 py-1 rounded-xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/60 dark:border-slate-800/80 text-caption font-bold text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all cursor-pointer shadow-2xs flex items-center gap-1.5 active:scale-95 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              >
                <ChevronsUpDown className="w-3.5 h-3.5 text-purple-500" aria-hidden="true" />
                <span>
                  {areAllCollapsed
                    ? (isVi ? "Mở rộng" : "Expand all")
                    : (isVi ? "Thu gọn" : "Collapse all")}
                </span>
              </button>
            )}
          </div>
        </PageCardHeader>
        </IndustrialSubSection>

        {/* 1. SWOT QUADRANTS SECTION */}
        {(selectedCategory === "all" || selectedCategory === "swot") && (
          <IndustrialSubSection>
            <div className="w-full space-y-4 font-['Play',sans-serif]">
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 md:gap-5 auto-rows-fr items-stretch w-full">
              
              {/* S: ĐIỂM MẠNH (STRENGTHS) */}
              <section
                id="swot-s"
                className={`skills-glass-swot-blue rounded-[20px] p-4 sm:p-5 flex flex-col justify-between skills-hover-lift relative group transition-all duration-300 w-full ${
                  collapsedCards["swot-s"] ? "h-auto min-h-[85px]" : "h-full min-h-0"
                }`}
              >
                {/* Quadrant Badge S */}
                <div
                  className="absolute bottom-0 right-0 w-11 h-11 sm:w-13 sm:h-13 rounded-tl-full rounded-br-[20px] bg-gradient-to-br from-blue-500/30 via-blue-500/50 to-blue-600/70 dark:from-blue-500/35 dark:to-blue-600/70 border-t border-l border-blue-400/70 backdrop-blur-md flex items-center justify-center pl-2 pt-2 text-blue-900 dark:text-blue-100 font-black text-sm select-none z-10"
                  title="S - Strengths"
                >
                  <span>S</span>
                </div>

                <div className="h-full flex flex-col justify-between">
                  {/* Header S with Interactive Action Buttons */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-blue-200/70 dark:border-blue-800/70 mb-3 w-full select-none">
                    <div className="flex items-center gap-2 text-card-title font-bold">
                      <Gem className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 transform transition-transform group-hover:scale-110 duration-300" />
                      <h3 className="text-card-title font-bold text-blue-600 dark:text-blue-400 tracking-wide">
                        {isVi ? "Điểm Mạnh" : "Strengths"}
                      </h3>
                      <span className="text-caption font-mono text-slate-500 dark:text-slate-400 font-normal">
                        · 96% TB
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 z-20">
                      {/* Deep Dive Button */}
                      <button
                        type="button"
                        onClick={() => openModal("swot-s")}
                        className="p-1 sm:px-2 sm:py-0.5 rounded-lg bg-blue-100/90 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 hover:bg-blue-600 hover:text-white transition-all text-caption font-bold flex items-center gap-1 cursor-pointer active:scale-95 shadow-2xs"
                        title={isVi ? "Xem chi tiết & KPI" : "Deep dive & KPIs"}
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{isVi ? "Chi tiết" : "Deep Dive"}</span>
                      </button>
                      
                      {/* Toggle Collapse Button */}
                      <button
                        type="button"
                        onClick={() => toggleSingleCard("swot-s")}
                        className="p-1 rounded-lg bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                        title={collapsedCards["swot-s"] ? (isVi ? "Mở rộng" : "Expand") : (isVi ? "Thu gọn" : "Collapse")}
                      >
                        <ChevronsUpDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* S Content */}
                  <div className={`skills-swot-collapse-grid flex-1 flex flex-col justify-between ${collapsedCards["swot-s"] ? "is-collapsed" : "h-full"}`}>
                    <div className="skills-swot-collapse-inner flex-1 flex flex-col justify-start h-full">
                      <p className="text-body text-slate-700 dark:text-slate-300 mb-2.5 leading-relaxed line-clamp-2">
                        {isVi
                          ? "Nền tảng vận hành & lãnh đạo — Năng lực cốt lõi đã chứng minh qua thực tiễn quản lý và phát triển hệ thống Dịch vụ Khách hàng."
                          : "Operational foundations & leadership — Core competencies proven through hands-on customer experience management."}
                      </p>

                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-body font-medium">
                        {STRENGTHS_SKILLS.map((skill, idx) => {
                          const IconComp = skill.icon;
                          return (
                            <li 
                              key={idx} 
                              className="group/subcard relative p-2.5 rounded-xl skills-glass-card border-blue-200/60 dark:border-blue-500/30 space-y-1.5 transition-all hover:bg-white/95 dark:hover:bg-slate-800/95 shadow-2xs"
                            >
                              <div className="flex items-center justify-between text-body">
                                <span className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-bold min-w-0">
                                  <IconComp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                                  <span className="truncate text-body text-blue-700 dark:text-blue-300 font-bold">{skill.label}</span>
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                                {isVi ? skill.descVi : skill.descEn}
                              </p>
                              {/* Hover Progress Chart Visualizer */}
                              <SkillHoverProgressChart
                                skill={{
                                  id: `swot-s-${idx}`,
                                  nameVi: skill.label,
                                  nameEn: skill.label,
                                  percentage: skill.percent,
                                  levelVi: "Thế mạnh Nòng cốt (Mastery)",
                                  levelEn: "Core Strength (Mastery)",
                                  yearsOfExperience: 8 + (idx % 3),
                                  breakdown: {
                                    practical: skill.percent,
                                    architecture: Math.max(88, skill.percent - 4),
                                    optimization: Math.max(90, skill.percent - 2),
                                    automation: Math.max(82, skill.percent - 8),
                                  },
                                }}
                                barGradient="from-blue-500 via-indigo-500 to-cyan-400"
                                accentColor="#3b82f6"
                              />
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* O: CƠ HỘI & PHÁT TRIỂN (OPPORTUNITIES) */}
              <section
                id="swot-o"
                className={`skills-glass-swot-purple rounded-[20px] p-4 sm:p-5 flex flex-col justify-between skills-hover-lift relative group transition-all duration-300 w-full ${
                  collapsedCards["swot-o"] ? "h-auto min-h-[85px]" : "h-full min-h-0"
                }`}
              >
                {/* Quadrant Badge O */}
                <div
                  className="absolute bottom-0 left-0 w-11 h-11 sm:w-13 sm:h-13 rounded-tr-full rounded-bl-[20px] bg-gradient-to-bl from-purple-500/30 via-purple-500/50 to-purple-600/70 dark:from-purple-500/35 dark:to-purple-600/70 border-t border-r border-purple-400/70 backdrop-blur-md flex items-center justify-center pr-2 pt-2 text-purple-900 dark:text-purple-100 font-black text-sm select-none z-10"
                  title="O - Opportunities"
                >
                  <span>O</span>
                </div>

                <div className="h-full flex flex-col justify-between">
                  {/* Header O */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-purple-200/70 dark:border-purple-800/70 mb-3 w-full select-none">
                    <div className="flex items-center gap-2 text-card-title font-bold">
                      <Rocket className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 transform transition-transform group-hover:scale-110 duration-300" />
                      <h3 className="text-card-title font-bold text-purple-600 dark:text-purple-400 tracking-wide">
                        {isVi ? "Phát Triển" : "Opportunities"}
                      </h3>
                      <span className="text-caption font-mono text-slate-500 dark:text-slate-400 font-normal">
                        · 92% TB
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 z-20">
                      <button
                        type="button"
                        onClick={() => openModal("swot-o")}
                        className="p-1 sm:px-2 sm:py-0.5 rounded-lg bg-purple-100/90 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 hover:bg-purple-600 hover:text-white transition-all text-caption font-bold flex items-center gap-1 cursor-pointer active:scale-95 shadow-2xs"
                        title={isVi ? "Xem chi tiết & Lộ trình" : "Deep dive & Roadmap"}
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{isVi ? "Chi tiết" : "Deep Dive"}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleSingleCard("swot-o")}
                        className="p-1 rounded-lg bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
                        title={collapsedCards["swot-o"] ? (isVi ? "Mở rộng" : "Expand") : (isVi ? "Thu gọn" : "Collapse")}
                      >
                        <ChevronsUpDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* O Content */}
                  <div className={`skills-swot-collapse-grid flex-1 flex flex-col justify-between ${collapsedCards["swot-o"] ? "is-collapsed" : "h-full"}`}>
                    <div className="skills-swot-collapse-inner flex-1 flex flex-col justify-start h-full">
                      <p className="text-body text-slate-700 dark:text-slate-300 mb-2.5 leading-relaxed line-clamp-2">
                        {isVi
                          ? "Công nghệ & chuyển đổi dịch vụ — Tạo đòn bẩy nâng cao hiệu quả vận hành, tối ưu nguồn lực và chuyển đổi số thông minh."
                          : "Tech & service transformation — Capabilities leveraging AI, automation and lean models to elevate modern CX operations."}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-body font-medium">
                        {OPPORTUNITIES_SKILLS.map((opp, idx) => {
                          const IconComp = opp.icon;
                          return (
                            <div 
                              key={idx} 
                              className="group/subcard relative p-2.5 rounded-xl skills-glass-card border-purple-200/60 dark:border-purple-500/20 space-y-1.5 transition-all hover:bg-white/95 dark:hover:bg-slate-800/95 shadow-2xs"
                            >
                              <div className="flex items-center justify-between text-body">
                                <span className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-bold min-w-0">
                                  <IconComp className="w-3.5 h-3.5 text-purple-700 dark:text-purple-400 shrink-0" />
                                  <span className="truncate text-body text-purple-700 dark:text-purple-300 font-bold">{opp.title}</span>
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                                {isVi ? opp.descVi : opp.descEn}
                              </p>
                              {/* Hover Progress Chart Visualizer */}
                              <SkillHoverProgressChart
                                skill={{
                                  id: `swot-o-${idx}`,
                                  nameVi: opp.title,
                                  nameEn: opp.title,
                                  percentage: opp.meter,
                                  levelVi: "Đột phá Công nghệ & AI",
                                  levelEn: "AI & Digital Breakthrough",
                                  yearsOfExperience: 6 + (idx % 4),
                                  breakdown: {
                                    practical: opp.meter,
                                    architecture: Math.max(82, opp.meter - 4),
                                    optimization: Math.max(85, opp.meter - 2),
                                    automation: Math.min(99, opp.meter + 3),
                                  },
                                }}
                                barGradient="from-purple-500 via-fuchsia-500 to-indigo-500"
                                accentColor="#a855f7"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* W: ĐIỂM CẦN HOÀN THIỆN (WEAKNESSES / GROWTH) */}
              <section
                id="swot-w"
                className={`skills-glass-swot-amber rounded-[20px] p-4 sm:p-5 flex flex-col justify-between skills-hover-lift relative group transition-all duration-300 w-full ${
                  collapsedCards["swot-w"] ? "h-auto min-h-[85px]" : "h-full min-h-0"
                }`}
              >
                {/* Quadrant Badge W */}
                <div
                  className="absolute top-0 right-0 w-11 h-11 sm:w-13 sm:h-13 rounded-bl-full rounded-tr-[20px] bg-gradient-to-tr from-amber-500/30 via-amber-500/50 to-amber-600/70 dark:from-amber-500/35 dark:to-amber-600/70 border-b border-l border-amber-400/70 backdrop-blur-md flex items-center justify-center pl-2 pb-2 text-amber-900 dark:text-amber-100 font-black text-sm select-none z-10"
                  title="W - Growth Areas"
                >
                  <span>W</span>
                </div>

                <div className="h-full flex flex-col justify-between">
                  {/* Header W */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-amber-200/70 dark:border-amber-800/70 mb-3 w-full select-none pr-12">
                    <div className="flex items-center gap-2 text-card-title font-bold">
                      <Target className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 transform transition-transform group-hover:scale-110 duration-300" />
                      <h3 className="text-card-title font-bold text-amber-600 dark:text-amber-400 tracking-wide">
                        {isVi ? "Hoàn Thiện" : "Growth Areas"}
                      </h3>
                      <span className="text-caption font-mono text-slate-500 dark:text-slate-400 font-normal">
                        · 87% TB
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 z-20">
                      <button
                        type="button"
                        onClick={() => openModal("swot-w")}
                        className="p-1 sm:px-2 sm:py-0.5 rounded-lg bg-amber-100/90 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 hover:bg-amber-600 hover:text-white transition-all text-caption font-bold flex items-center gap-1 cursor-pointer active:scale-95 shadow-2xs"
                        title={isVi ? "Xem kế hoạch nâng cấp" : "View upskilling plan"}
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{isVi ? "Chi tiết" : "Deep Dive"}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleSingleCard("swot-w")}
                        className="p-1 rounded-lg bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
                        title={collapsedCards["swot-w"] ? (isVi ? "Mở rộng" : "Expand") : (isVi ? "Thu gọn" : "Collapse")}
                      >
                        <ChevronsUpDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* W Content */}
                  <div className={`skills-swot-collapse-grid flex-1 flex flex-col justify-between ${collapsedCards["swot-w"] ? "is-collapsed" : "h-full"}`}>
                    <div className="skills-swot-collapse-inner flex-1 flex flex-col justify-start h-full">
                      <p className="text-body text-slate-700 dark:text-slate-300 mb-2.5 leading-relaxed line-clamp-2 font-medium">
                        {isVi
                          ? "Nâng cao năng lực quản trị — Hoàn thiện để nâng tầm vai trò từ vận hành hiệu quả sang quản trị chiến lược và chuyển đổi số."
                          : "Strategic upskilling — Target competencies for transitioning from operational execution to strategic enterprise CX leadership."}
                      </p>

                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-body font-medium">
                        {WEAKNESSES_SKILLS.map((skill, idx) => {
                          const IconComp = skill.icon;
                          return (
                            <li 
                              key={idx} 
                              className="group/subcard relative p-2.5 rounded-xl skills-glass-card border-amber-200/60 dark:border-amber-500/30 space-y-1.5 transition-all hover:bg-white/95 dark:hover:bg-slate-800/95 shadow-2xs"
                            >
                              <div className="flex items-center justify-between text-body">
                                <span className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-bold min-w-0">
                                  <IconComp className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                                  <span className="truncate text-body text-amber-700 dark:text-amber-300 font-bold">{skill.label}</span>
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                                {isVi ? skill.descVi : skill.descEn}
                              </p>
                              {/* Hover Progress Chart Visualizer */}
                              <SkillHoverProgressChart
                                skill={{
                                  id: `swot-w-${idx}`,
                                  nameVi: skill.label,
                                  nameEn: skill.label,
                                  percentage: skill.percent,
                                  levelVi: "Nâng cao & Chiến lược",
                                  levelEn: "Upskilling & Strategy",
                                  yearsOfExperience: 5 + (idx % 3),
                                  breakdown: {
                                    practical: skill.percent,
                                    architecture: Math.max(80, skill.percent - 5),
                                    optimization: Math.max(82, skill.percent - 3),
                                    automation: Math.max(75, skill.percent - 8),
                                  },
                                }}
                                barGradient="from-amber-500 via-orange-500 to-yellow-400"
                                accentColor="#f59e0b"
                              />
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* T: THÁCH THỨC & RỦI RO (THREATS) */}
              <section
                id="swot-t"
                className={`skills-glass-swot-rose rounded-[20px] p-4 sm:p-5 flex flex-col justify-between skills-hover-lift relative group transition-all duration-300 w-full ${
                  collapsedCards["swot-t"] ? "h-auto min-h-[85px]" : "h-full min-h-0"
                }`}
              >
                {/* Quadrant Badge T */}
                <div
                  className="absolute top-0 left-0 w-11 h-11 sm:w-13 sm:h-13 rounded-br-full rounded-tl-[20px] bg-gradient-to-tl from-rose-500/30 via-rose-500/50 to-rose-600/70 dark:from-rose-500/35 dark:to-rose-600/70 border-b border-r border-rose-400/70 backdrop-blur-md flex items-center justify-center pr-2 pb-2 text-rose-900 dark:text-rose-100 font-black text-sm select-none z-10"
                  title="T - Threats & Risks"
                >
                  <span>T</span>
                </div>

                <div className="h-full flex flex-col justify-between">
                  {/* Header T */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-rose-200/70 dark:border-rose-800/70 mb-3 w-full select-none pl-12">
                    <div className="flex items-center gap-2 text-card-title font-bold">
                      <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 transform transition-transform group-hover:scale-110 duration-300" />
                      <h3 className="text-card-title font-bold text-rose-600 dark:text-rose-400 tracking-wide">
                        {isVi ? "Thách Thức" : "Challenges"}
                      </h3>
                      <span className="text-caption font-mono text-slate-500 dark:text-slate-400 font-normal">
                        · 90% Tác động
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 z-20">
                      <button
                        type="button"
                        onClick={() => openModal("swot-t")}
                        className="p-1 sm:px-2 sm:py-0.5 rounded-lg bg-rose-100/90 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 hover:bg-rose-600 hover:text-white transition-all text-caption font-bold flex items-center gap-1 cursor-pointer active:scale-95 shadow-2xs"
                        title={isVi ? "Xem quản trị rủi ro & giải pháp" : "Risk mitigation & solutions"}
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{isVi ? "Chi tiết" : "Deep Dive"}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleSingleCard("swot-t")}
                        className="p-1 rounded-lg bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
                        title={collapsedCards["swot-t"] ? (isVi ? "Mở rộng" : "Expand") : (isVi ? "Thu gọn" : "Collapse")}
                      >
                        <ChevronsUpDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* T Content */}
                  <div className={`skills-swot-collapse-grid flex-1 flex flex-col justify-between ${collapsedCards["swot-t"] ? "is-collapsed" : "h-full"}`}>
                    <div className="skills-swot-collapse-inner flex-1 flex flex-col justify-start h-full">
                      <p className="text-body text-slate-700 dark:text-slate-300 mb-2.5 leading-relaxed line-clamp-2">
                        {isVi
                          ? "Thích ứng & quản trị rủi ro — Những yếu tố bên ngoài tác động trực tiếp đến chất lượng dịch vụ, nhân sự và hiệu quả vận hành."
                          : "Adaptability & risk management — External factors impacting service quality, retention, and operations requiring agile responses."}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-body font-medium">
                        {THREATS_SKILLS.map((threat, idx) => {
                          const IconComp = threat.icon;
                          return (
                            <div 
                              key={idx} 
                              className="group/subcard relative p-2.5 rounded-xl skills-glass-card border-rose-200/60 dark:border-rose-500/20 space-y-1.5 transition-all hover:bg-white/95 dark:hover:bg-slate-800/95 shadow-2xs"
                            >
                              <div className="flex items-center justify-between text-body">
                                <span className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-bold min-w-0">
                                  <IconComp className="w-3.5 h-3.5 text-rose-700 dark:text-rose-400 shrink-0" />
                                  <span className="truncate text-body text-rose-700 dark:text-rose-300 font-bold">{threat.title}</span>
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                                {isVi ? threat.descVi : threat.descEn}
                              </p>
                              {/* Hover Progress Chart Visualizer */}
                              <SkillHoverProgressChart
                                skill={{
                                  id: `swot-t-${idx}`,
                                  nameVi: threat.title,
                                  nameEn: threat.title,
                                  percentage: threat.meter,
                                  levelVi: "Quản trị Rủi ro & Khủng hoảng",
                                  levelEn: "Crisis & Risk Management",
                                  yearsOfExperience: 7 + (idx % 3),
                                  breakdown: {
                                    practical: threat.meter,
                                    architecture: Math.max(84, threat.meter - 4),
                                    optimization: Math.max(88, threat.meter - 2),
                                    automation: Math.max(80, threat.meter - 6),
                                  },
                                }}
                                barGradient="from-rose-500 via-pink-500 to-red-500"
                                accentColor="#f43f5e"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
          </IndustrialSubSection>
        )}

        {/* 2. SPECIALIZED DOMAINS SECTION (A - E) */}
        {(selectedCategory === "all" || selectedCategory === "domains") && (
          <IndustrialSubSection>
            <div className="w-full pt-4 space-y-4 font-['Play',sans-serif]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-800/60">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-card-title font-bold text-slate-900 dark:text-white">
                  {isVi ? "5 Nhóm Năng Lực Chuyên Sâu" : "5 Specialized Competency Domains"}
                </h3>
              </div>
              <span className="text-caption font-mono text-slate-500 dark:text-slate-400">
                {filteredSkillGroups.length} {isVi ? "nhóm năng lực" : "domains"}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredSkillGroups.map((group) => {
                return (
                  <div
                    key={group.id}
                    className="p-4 sm:p-5 rounded-2xl skills-glass-card border border-slate-200/90 dark:border-slate-800/90 space-y-3.5 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    {/* Domain Card Header */}
                    <div className="flex items-start justify-between gap-3 pb-2.5 border-b border-slate-200/70 dark:border-slate-800/70">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span 
                            style={{ 
                              color: group.themeColor.accent,
                              backgroundColor: `${group.themeColor.accent}18`,
                              borderColor: `${group.themeColor.accent}35`
                            }}
                            className="px-2.5 py-0.5 rounded-lg font-mono text-xs font-black border shadow-2xs"
                          >
                            NHÓM {group.code}
                          </span>
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">
                            {isVi ? group.titleVi : group.titleEn}
                          </h4>
                        </div>
                        <p className="text-caption text-slate-600 dark:text-slate-400 line-clamp-2 mt-0.5">
                          {isVi ? group.subtitleVi : group.subtitleEn}
                        </p>
                      </div>
                    </div>

                    {/* Skill Items in Group */}
                    <div className="space-y-3">
                      {group.skills.map((skill) => {
                        const IconComponent = ICON_MAP[skill.iconName] || Brain;
                        return (
                          <div
                            key={skill.id}
                            className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 space-y-2 hover:bg-white/95 dark:hover:bg-slate-800/90 transition-all shadow-2xs hover:shadow-sm"
                          >
                            <div className="flex items-center justify-between text-body">
                              <span className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 min-w-0">
                                <div 
                                  style={{ 
                                    color: group.themeColor.accent,
                                    backgroundColor: `${group.themeColor.accent}15`
                                  }}
                                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border border-current/20"
                                >
                                  <IconComponent className="w-4 h-4 shrink-0" aria-hidden="true" />
                                </div>
                                <span className="truncate text-xs sm:text-sm font-bold">
                                  {isVi ? skill.nameVi : skill.nameEn}
                                </span>
                              </span>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="text-caption text-slate-500 dark:text-slate-400 hidden sm:inline">
                                  {isVi ? skill.levelVi : skill.levelEn}
                                </span>
                                <span 
                                  style={{
                                    color: group.themeColor.accent,
                                    backgroundColor: `${group.themeColor.accent}18`
                                  }}
                                  className="px-2 py-0.5 rounded-md font-mono font-bold text-xs tabular-nums border border-current/25"
                                >
                                  {skill.percentage}%
                                </span>
                              </div>
                            </div>

                            <p className="text-caption text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                              {isVi ? skill.descriptionVi : skill.descriptionEn}
                            </p>

                            {/* Tech / Tools */}
                            {skill.tools && skill.tools.length > 0 && (
                              <div className="flex items-center flex-wrap gap-1 pt-0.5">
                                {skill.tools.map((tool, tIdx) => (
                                  <span
                                    key={tIdx}
                                    className="px-1.5 py-0.5 rounded text-3xs font-semibold bg-slate-200/70 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border border-slate-300/40 dark:border-slate-700/50"
                                  >
                                    {tool}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Hover Progress Chart Visualization */}
                            <SkillHoverProgressChart
                              skill={{
                                id: skill.id,
                                nameVi: skill.nameVi,
                                nameEn: skill.nameEn,
                                percentage: skill.percentage,
                                levelVi: skill.levelVi,
                                levelEn: skill.levelEn,
                                yearsOfExperience: skill.yearsOfExperience,
                                breakdown: skill.breakdown,
                                tools: skill.tools,
                              }}
                              barGradient={group.themeColor.barGradient || "from-purple-500 via-indigo-500 to-cyan-400"}
                              accentColor={group.themeColor.accent}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          </IndustrialSubSection>
        )}

        {/* 3. LANGUAGES & GLOBAL COMMUNICATION SECTION */}
        {(selectedCategory === "all" || selectedCategory === "languages") && (
          <IndustrialSubSection>
            <div className="w-full py-2.5 pb-6 space-y-4 pt-4 border-t border-slate-200/50 dark:border-slate-800/50 font-['Play',sans-serif]">
            <div
              id="swot-languages-overview"
              className="!bg-transparent !border-none !shadow-none rounded-2xl p-2 sm:p-3 flex flex-col gap-3 group transition-all duration-300 relative"
            >
              <div className="w-full flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-emerald-200/60 dark:border-emerald-800/60 mb-1">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <h3 className="text-card-title font-bold text-emerald-600 dark:text-emerald-400 tracking-wide">
                    {isVi ? "Năng lực ngôn ngữ & Giao tiếp quốc tế" : "International Language & AI Proficiency"}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => openModal("languages")}
                  className="px-2.5 py-1 rounded-lg bg-emerald-100/90 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-600 hover:text-white transition-all text-caption font-bold flex items-center gap-1 cursor-pointer active:scale-95 shadow-2xs"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>{isVi ? "Xem chi tiết" : "Deep Dive"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Tiếng Việt */}
                <div className="group/subcard relative skills-glass-card rounded-xl p-3.5 flex flex-col justify-between gap-2.5 skills-hover-lift shadow-sm cursor-help">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
                      <Languages className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                      <h4 className="font-bold text-body text-rose-700 dark:text-rose-300">Tiếng Việt</h4>
                      <span className="text-body-sm text-slate-600 dark:text-slate-400">(Bản xứ / Native)</span>
                    </div>
                    <div className="relative w-11 h-11 flex-shrink-0 flex items-center justify-center font-bold text-sm text-rose-600 dark:text-rose-400">
                      <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-slate-200 dark:text-slate-800 stroke-current"
                          strokeWidth="3.5"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-rose-600 dark:text-rose-500 stroke-current"
                          strokeWidth="3.5"
                          strokeDasharray="95, 100"
                          strokeLinecap="round"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <span className="absolute text-2xs font-bold text-rose-600 dark:text-rose-400 tabular-nums">95%</span>
                    </div>
                  </div>
                  <p className="text-caption text-slate-600 dark:text-slate-300 line-clamp-2">
                    {isVi
                      ? "Ngôn ngữ bản xứ, khả năng diễn đạt lưu loát, viết báo cáo chuyên sâu và thuyết trình truyền cảm hứng."
                      : "Native Vietnamese speaker with persuasive communication and executive report drafting."}
                  </p>
                  <div className="pt-2 border-t border-rose-100/70 dark:border-rose-900/40 flex items-center justify-between">
                    <span className="text-body-sm text-rose-700 dark:text-rose-400 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      {isVi ? "Thành thạo chuyên sâu" : "Native fluency"}
                    </span>
                  </div>
                </div>

                {/* Tiếng Anh */}
                <div className="group/subcard relative skills-glass-card rounded-xl p-3.5 flex flex-col justify-between gap-2.5 skills-hover-lift shadow-sm cursor-help">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
                      <Globe className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                      <h4 className="font-bold text-body text-sky-700 dark:text-sky-300">Tiếng Anh</h4>
                      <span className="text-body-sm text-slate-600 dark:text-slate-400">(Chuyên nghiệp)</span>
                    </div>
                    <div className="relative w-11 h-11 flex-shrink-0 flex items-center justify-center font-bold text-sm text-sky-600 dark:text-sky-400">
                      <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-slate-200 dark:text-slate-800 stroke-current"
                          strokeWidth="3.5"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-sky-600 dark:text-sky-500 stroke-current"
                          strokeWidth="3.5"
                          strokeDasharray="65, 100"
                          strokeLinecap="round"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <span className="absolute text-2xs font-bold text-sky-600 dark:text-sky-400 tabular-nums">65%</span>
                    </div>
                  </div>
                  <p className="text-caption text-slate-600 dark:text-slate-300 line-clamp-2">
                    {isVi
                      ? "Giao tiếp làm việc tự tin, đọc hiểu tài liệu kỹ thuật, trao đổi nghiệp vụ với đối tác quốc tế."
                      : "Professional working proficiency in English, technical documentation literacy, and international stakeholder collaboration."}
                  </p>
                  <div className="pt-2 border-t border-sky-100/70 dark:border-sky-900/40 flex items-center justify-between">
                    <span className="text-body-sm text-sky-700 dark:text-sky-400 font-semibold flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 shrink-0" />
                      {isVi ? "Làm việc môi trường quốc tế" : "Professional working level"}
                    </span>
                  </div>
                </div>

                {/* Ứng dụng AI Đa Ngôn Ngữ */}
                <div className="group/subcard relative skills-glass-card rounded-xl p-3.5 flex flex-col justify-between gap-2.5 skills-hover-lift shadow-sm cursor-help">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
                      <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <h4 className="font-bold text-body text-emerald-600 dark:text-emerald-400 leading-tight">
                        Ứng dụng AI
                      </h4>
                      <span className="text-body-sm text-slate-600 dark:text-slate-400">(Họp &amp; Dịch thuật)</span>
                    </div>
                    <div className="relative w-11 h-11 flex-shrink-0 flex items-center justify-center font-bold text-sm text-emerald-700 dark:text-emerald-400">
                      <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-slate-200 dark:text-slate-800 stroke-current"
                          strokeWidth="3.5"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-emerald-600 stroke-current"
                          strokeWidth="3.5"
                          strokeDasharray="88, 100"
                          strokeLinecap="round"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <span className="absolute text-2xs font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">88%</span>
                    </div>
                  </div>
                  <p className="text-caption text-slate-600 dark:text-slate-300 line-clamp-2">
                    {isVi
                      ? "Sử dụng công cụ AI phiên dịch, biên soạn tài liệu song ngữ và trợ lý hỗ trợ hội họp đa quốc gia thời gian thực."
                      : "Leveraging generative AI for real-time translation, bilingual document drafting, and cross-border meeting assistance."}
                  </p>
                  <div className="pt-2 border-t border-emerald-100/70 dark:border-emerald-900/40 flex items-center justify-between">
                    <span className="text-body-sm text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      {isVi ? "Dịch thuật & Trợ lý thời gian thực" : "Real-time AI translation & assistant"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </IndustrialSubSection>
        )}
      </div>

      {/* 4. MODAL DEEP DIVE OVERLAY */}
      <AnimatePresence>
        {activeModal && (
          <div 
            role="dialog"
            aria-modal="true"
            aria-label={isVi ? "Cửa sổ chi tiết phân tích năng lực" : "Competency deep dive modal"}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Content Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10 my-auto rounded-2xl shadow-2xl"
            >
              {activeModal === "swot-s" && (
                <ExpandedCardStrengths
                  isVi={isVi}
                  onClose={closeModal}
                  onContact={() => handleNavigateToContact("Strengths - Năng lực cốt lõi")}
                />
              )}
              {activeModal === "swot-o" && (
                <ExpandedCardOpportunities
                  isVi={isVi}
                  onClose={closeModal}
                  onContact={() => handleNavigateToContact("Opportunities - Công nghệ & AI")}
                />
              )}
              {activeModal === "swot-w" && (
                <ExpandedCardWeaknesses
                  isVi={isVi}
                  onClose={closeModal}
                  onContact={() => handleNavigateToContact("Growth - Kế hoạch nâng cấp")}
                />
              )}
              {activeModal === "swot-t" && (
                <ExpandedCardThreats
                  isVi={isVi}
                  onClose={closeModal}
                  onContact={() => handleNavigateToContact("Risk Governance - Quản trị rủi ro")}
                />
              )}
              {activeModal === "languages" && (
                <ExpandedCardLanguages
                  isVi={isVi}
                  onClose={closeModal}
                  onContact={() => handleNavigateToContact("Languages - Giao tiếp quốc tế")}
                />
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Skills;
