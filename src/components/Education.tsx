import React, { useState, useMemo, useCallback } from "react";
import { 
  Code,
  PieChart,
  ShieldAlert,
  Kanban,
  Crown,
  Users,
  GraduationCap,
  Headset,
  Network,
  HardDrive,
  X,
  Bookmark,
  Sparkles,
  Check,
  Trophy,
  Wrench,
  ArrowUpRight,
  Presentation,
  UserCheck,
  UserPlus,
  BookOpen,
  Palette,
  ExternalLink,
  CheckCircle,
  Building2,
  Calendar,
  Layers,
  Search,
  CheckCircle2,
  FileCheck2,
  Maximize2,
  RotateCw,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { PageCardHeader } from "./PageCardHeader";
import { cn } from "../lib/utils";
import { EducationFlipBook } from "./EducationFlipBook";

// ==========================================
// DATA TYPES
// ==========================================
export interface CareerMilestoneItem {
  id: number;
  code: string;
  title: string;
  iconName: string;
  category: "tech" | "management" | "skills" | "network";
  year: string;
  org: string;
  format: string;
  focus: string;
  desc: string;
  modules: string[];
  practice?: string;
  techStack?: string;
  outcome: string;
  bannerImg: string;
  certImg: string;
  courseImg: string;
  bannerLink: string;
  theme: {
    color: string;
    gradient: string;
    glow: string;
    bgSoft: string;
    cardBgLight: string;
    border: string;
  };
}

// ==========================================
// 14 FULL COURSES AND CERTIFICATES DATA (100% PRESERVED)
// ==========================================
export const EDUCATION_BOOKS_DATA: CareerMilestoneItem[] = [
  {
    id: 1,
    code: "5.1",
    title: "Thiết kế Web",
    iconName: "Code",
    category: "tech",
    year: "2026",
    org: "Github",
    format: "Tự học",
    focus: "Kỹ thuật lập trình web, thiết kế giao diện UI/UX chuẩn Responsive và ứng dụng AI Agent Workflows trong tự động hóa vận hành.",
    desc: "Khóa học cập nhật và phát triển kỹ năng thiết kế, xây dựng website hiện đại cùng tích hợp quy trình làm việc tự động bằng AI Agent Workflows.",
    modules: [
      "HTML5, CSS3, JavaScript, PHP, C++",
      "Thiết kế giao diện Responsive và nguyên lý UI/UX",
      "Thiết lập AI Agent Workflows trong tự động hóa"
    ],
    practice: "Ứng dụng kiến trúc Component-driven, tối ưu hóa Core Web Vitals, xây dựng hệ thống tự động hóa phản hồi đa kênh và tích hợp AI Agent vào xử lý dữ liệu dịch vụ.",
    techStack: "HTML5 • CSS3 • Tailwind • JavaScript • PHP • AI Agent Automation",
    outcome: "Xây dựng hoàn chỉnh các hệ thống website, tối ưu giao diện trải nghiệm người dùng và ứng dụng thành thạo AI vào tự động hóa vận hành.",
    bannerImg: "https://i.ibb.co/ch0b9mfY/Thi-t-k-website.png",
    certImg: "https://i.ibb.co/Z6G0SmwN/Thi-t-k-Website.png",
    courseImg: "https://i.ibb.co/Z6G0SmwN/Thi-t-k-Website.png",
    bannerLink: "https://ibb.co/GQysDhYH",
    theme: {
      color: "#0284c7",
      gradient: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
      glow: "rgba(14, 165, 233, 0.35)",
      bgSoft: "rgba(14, 165, 233, 0.08)",
      cardBgLight: "linear-gradient(145deg, rgba(240, 249, 255, 0.92) 0%, rgba(224, 242, 254, 0.78) 100%)",
      border: "rgba(14, 165, 233, 0.4)"
    }
  },
  {
    id: 2,
    code: "5.2",
    title: "Phân tích dữ liệu",
    iconName: "PieChart",
    category: "tech",
    year: "2019",
    org: "Prudential Vietnam",
    format: "Đào tạo doanh nghiệp",
    focus: "Khai thác, xử lý và mô hình hóa dữ liệu lớn nhằm phục vụ công tác quản trị doanh nghiệp.",
    desc: "Chương trình đào tạo chuyên sâu về khai thác, xử lý và mô hình hóa dữ liệu lớn nhằm phục vụ công tác quản trị doanh nghiệp.",
    modules: [
      "Phân tích dữ liệu",
      "Trực quan hóa dữ liệu",
      "Thiết lập hệ thống báo cáo KPI tự động",
      "Xây dựng Dashboard điều hành"
    ],
    practice: "Chuẩn hóa dữ liệu nguồn phân tán, xây dựng hệ thống đo lường hiệu suất CSAT/NPS thời gian thực và tự động hóa cảnh báo chỉ số vận hành quan trọng.",
    techStack: "Power BI • SQL Data Mining • Realtime Dashboard • KPI Automation",
    outcome: "Làm chủ các công cụ phân tích dữ liệu lớn, tối ưu hóa quá trình ra quyết định dựa trên dữ liệu thời gian thực.",
    bannerImg: "https://i.ibb.co/tMsL6zYH/Ph-n-t-ch-d-li-u.png",
    certImg: "https://i.ibb.co/bj6CYy2L/Ph-n-t-ch-d-li-u.png",
    courseImg: "https://i.ibb.co/bj6CYy2L/Ph-n-t-ch-d-li-u.png",
    bannerLink: "https://ibb.co/N6jTqrWF",
    theme: {
      color: "#059669",
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      glow: "rgba(16, 185, 129, 0.35)",
      bgSoft: "rgba(16, 185, 129, 0.08)",
      cardBgLight: "linear-gradient(145deg, rgba(236, 253, 245, 0.92) 0%, rgba(209, 250, 229, 0.78) 100%)",
      border: "rgba(16, 185, 129, 0.4)"
    }
  },
  {
    id: 3,
    code: "5.3",
    title: "Quản trị rủi ro",
    iconName: "ShieldAlert",
    category: "management",
    year: "2017",
    org: "Prudential Vietnam",
    format: "Nâng cao năng lực vận hành",
    focus: "Nhận diện, đánh giá và kiểm soát rủi ro trong hoạt động vận hành và dịch vụ khách hàng.",
    desc: "Đào tạo nâng cao năng lực nhận diện, đánh giá và kiểm soát rủi ro trong hoạt động vận hành và dịch vụ khách hàng.",
    modules: [
      "Quy trình đánh giá rủi ro vận hành",
      "Kiểm soát điểm nghẽn hệ thống",
      "Xử lý khủng hoảng truyền thông",
      "Giải quyết khiếu nại cấp cao"
    ],
    practice: "Thiết lập ma trận rủi ro (Risk Heatmap), xây dựng quy trình BCP (Business Continuity Planning) và giải pháp phản ứng nhanh trước khủng hoảng dịch vụ.",
    techStack: "Risk Matrix • BCP Protocol • Crisis Mitigation • Incident Management",
    outcome: "Cấp chứng chỉ mã PRU-RM-2017-104; nâng cao năng lực phòng ngừa rủi ro và ứng phó hiệu quả trước các sự cố vận hành.",
    bannerImg: "https://i.ibb.co/zhGPcgVM/Quan-l-rui-ro.png",
    certImg: "https://i.ibb.co/nN5wcyDy/Qu-n-l-r-i-ro.png",
    courseImg: "https://i.ibb.co/nN5wcyDy/Qu-n-l-r-i-ro.png",
    bannerLink: "https://ibb.co/Y7pf9SBC",
    theme: {
      color: "#e11d48",
      gradient: "linear-gradient(135deg, #f43f5e 0%, #be123c 100%)",
      glow: "rgba(244, 63, 94, 0.35)",
      bgSoft: "rgba(244, 63, 94, 0.08)",
      cardBgLight: "linear-gradient(145deg, rgba(255, 241, 242, 0.92) 0%, rgba(255, 228, 230, 0.78) 100%)",
      border: "rgba(244, 63, 94, 0.4)"
    }
  },
  {
    id: 4,
    code: "5.4",
    title: "Quản lý dự án",
    iconName: "Kanban",
    category: "management",
    year: "2016",
    org: "Prudential Vietnam",
    format: "Phương pháp luận quốc tế",
    focus: "Kiểm soát toàn diện vòng đời dự án theo chuẩn quốc tế.",
    desc: "Khóa học quản trị dự án theo phương pháp luận chuẩn quốc tế, kiểm soát toàn diện vòng đời dự án.",
    modules: [
      "Lập kế hoạch dự án",
      "Phân bổ nguồn lực",
      "Quản lý tiến độ",
      "Kiểm soát ngân sách",
      "Đảm bảo chất lượng và đánh giá sau triển khai"
    ],
    practice: "Áp dụng phương pháp luận Agile/Scrum & Waterfall, xây dựng WBS (Work Breakdown Structure) và kiểm soát chất lượng bàn giao theo cam kết SLA.",
    techStack: "WBS Framework • Gantt Milestones • Budget Control • Quality Assurance",
    outcome: "Cấp chứng chỉ mã PRU-PM-2016-042; làm chủ kỹ năng quản lý các dự án cải tiến dịch vụ đúng tiến độ và tối ưu chi phí.",
    bannerImg: "https://i.ibb.co/nq6921Zf/Qu-n-l-d-n.png",
    certImg: "https://i.ibb.co/4ZBDkbHp/Qu-n-l-d-n.png",
    courseImg: "https://i.ibb.co/4ZBDkbHp/Qu-n-l-d-n.png",
    bannerLink: "https://ibb.co/Xfj1B5Np",
    theme: {
      color: "#7c3aed",
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
      glow: "rgba(139, 92, 246, 0.35)",
      bgSoft: "rgba(139, 92, 246, 0.08)",
      cardBgLight: "linear-gradient(145deg, rgba(245, 243, 255, 0.92) 0%, rgba(237, 233, 254, 0.78) 100%)",
      border: "rgba(139, 92, 246, 0.4)"
    }
  },
  {
    id: 5,
    code: "5.5",
    title: "Quản lý cấp cao",
    iconName: "Crown",
    category: "management",
    year: "2015",
    org: "Dale Carnegie & VED",
    format: "Lãnh đạo cấp cao",
    focus: "Phát triển năng lực điều hành và tư duy lãnh đạo chiến lược dành cho quản lý cấp cao.",
    desc: "Chương trình phát triển năng lực điều hành và tư duy lãnh đạo chiến lược dành cho quản lý cấp cao.",
    modules: [
      "Tư duy lãnh đạo chiến lược",
      "Quản trị sự thay đổi",
      "Xây dựng bộ máy tổ chức",
      "Truyền cảm hứng và điều hành doanh nghiệp"
    ],
    practice: "Định hình tầm nhìn văn hóa dịch vụ, kiến tạo cơ cấu tổ chức đa tầng vững chắc và điều phối các phòng ban thực thi mục tiêu tăng trưởng dài hạn.",
    techStack: "Strategic Leadership • Change Management • Organization Scaling",
    outcome: "Hoàn thành chương trình quản trị cấp cao, nâng cao năng lực định hướng chiến lược và phát triển bộ máy quy mô lớn.",
    bannerImg: "https://i.ibb.co/ymVcsfvC/Qu-n-l-c-p-cao.png",
    certImg: "https://i.ibb.co/ymVcsfvC/Qu-n-l-c-p-cao.png",
    courseImg: "https://i.ibb.co/ymVcsfvC/Qu-n-l-c-p-cao.png",
    bannerLink: "https://ibb.co/BHw5szWJ",
    theme: {
      color: "#d97706",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)",
      glow: "rgba(245, 158, 11, 0.35)",
      bgSoft: "rgba(245, 158, 11, 0.08)",
      cardBgLight: "linear-gradient(145deg, rgba(254, 243, 199, 0.92) 0%, rgba(253, 230, 138, 0.76) 100%)",
      border: "rgba(245, 158, 11, 0.4)"
    }
  },
  {
    id: 6,
    code: "5.6",
    title: "Quản lý cấp trung",
    iconName: "Users",
    category: "management",
    year: "2014",
    org: "Dale Carnegie & VED",
    format: "Quản lý thực chiến",
    focus: "Kỹ năng quản lý thực chiến và điều hành đội ngũ phòng ban hiệu quả.",
    desc: "Khóa đào tạo kỹ năng quản lý thực chiến và điều hành đội ngũ phòng ban hiệu quả.",
    modules: [
      "Kỹ năng quản trị nhân sự",
      "Giao việc và ủy quyền",
      "Giám sát hiệu suất",
      "Huấn luyện đội ngũ và hợp tác liên phòng ban"
    ],
    practice: "Chuẩn hóa công cụ phân rã mục tiêu (OKRs/KPIs), thiết lập quy trình ủy quyền hiệu quả và xây dựng tinh thần phối hợp đồng đội vượt mục tiêu.",
    techStack: "Performance Monitoring • Delegation Matrix • Team Coaching",
    outcome: "Tối ưu hóa năng lực quản lý đội nhóm, nâng cao chỉ số hoàn thành mục tiêu và duy trì sự gắn kết nhân sự.",
    bannerImg: "https://i.ibb.co/jkHkZ1pd/Qu-n-l-c-p-trung.png",
    certImg: "https://i.ibb.co/jkHkZ1pd/Qu-n-l-c-p-trung.png",
    courseImg: "https://i.ibb.co/jkHkZ1pd/Qu-n-l-c-p-trung.png",
    bannerLink: "https://ibb.co/xq3q8R4y",
    theme: {
      color: "#4f46e5",
      gradient: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
      glow: "rgba(99, 102, 241, 0.35)",
      bgSoft: "rgba(99, 102, 241, 0.08)",
      cardBgLight: "linear-gradient(145deg, rgba(238, 242, 255, 0.92) 0%, rgba(224, 231, 255, 0.78) 100%)",
      border: "rgba(99, 102, 241, 0.4)"
    }
  },
  {
    id: 7,
    code: "5.7",
    title: "Kỹ năng Đào tạo",
    iconName: "Teacher",
    category: "skills",
    year: "2013",
    org: "VietnamWorks",
    format: "Sư phạm doanh nghiệp",
    focus: "Phương pháp sư phạm doanh nghiệp, thiết kế bài giảng và nghệ thuật làm chủ sân khấu truyền cảm hứng.",
    desc: "Khóa học phương pháp sư phạm doanh nghiệp, thiết kế bài giảng và nghệ thuật làm chủ sân khấu truyền cảm hứng.",
    modules: [
      "Xây dựng giáo trình đào tạo nội bộ",
      "Phương pháp truyền đạt sư phạm",
      "Kỹ năng đứng lớp",
      "Nghệ thuật thuyết trình trước đám đông"
    ],
    practice: "Đóng gói bộ giáo trình chuẩn hóa Train-The-Trainer (TTT), nâng cao kỹ năng tương tác sinh động và đánh giá hiệu quả tiếp thu học viên.",
    techStack: "TTT Framework • Curriculum Design • Instructional Techniques",
    outcome: "Thành thạo việc chuẩn hóa và trực tiếp đứng lớp các chương trình đào tạo nhân sự nội bộ quy mô lớn.",
    bannerImg: "https://i.ibb.co/GQVw12Vb/o-t-o.png",
    certImg: "https://i.ibb.co/GQVw12Vb/o-t-o.png",
    courseImg: "https://i.ibb.co/GQVw12Vb/o-t-o.png",
    bannerLink: "https://ibb.co/SwKT1nK9",
    theme: {
      color: "#ea580c",
      gradient: "linear-gradient(135deg, #f97316 0%, #c2410c 100%)",
      glow: "rgba(249, 115, 22, 0.35)",
      bgSoft: "rgba(249, 115, 22, 0.08)",
      cardBgLight: "linear-gradient(145deg, rgba(255, 247, 237, 0.92) 0%, rgba(254, 215, 170, 0.76) 100%)",
      border: "rgba(249, 115, 22, 0.4)"
    }
  },
  {
    id: 8,
    code: "5.8",
    title: "Kỹ năng Thuyết trình",
    iconName: "Presentation",
    category: "skills",
    year: "2013",
    org: "VietnamWorks",
    format: "Truyền thông & Thuyết phục",
    focus: "Phương pháp sư phạm doanh nghiệp, thiết kế bài giảng và nghệ thuật làm chủ sân khấu truyền cảm hứng.",
    desc: "Khóa học phương pháp sư phạm doanh nghiệp, thiết kế bài giảng và nghệ thuật làm chủ sân khấu truyền cảm hứng.",
    modules: [
      "Xây dựng giáo trình đào tạo nội bộ",
      "Phương pháp truyền đạt sư phạm",
      "Kỹ năng đứng lớp",
      "Nghệ thuật thuyết trình trước đám đông"
    ],
    practice: "Kỹ thuật kiểm soát ngôn ngữ hình thể, điều hòa giọng nói chuyên nghiệp và cấu trúc bài thuyết trình tạo động lực mạnh mẽ cho người nghe.",
    techStack: "Stage Mastery • Non-verbal Delivery • Persuasive Storytelling",
    outcome: "Thành thạo việc chuẩn hóa và trực tiếp đứng lớp các chương trình đào tạo nhân sự nội bộ quy mô lớn.",
    bannerImg: "https://i.ibb.co/WvK6BvgL/Thuy-t-tr-nh.png",
    certImg: "https://i.ibb.co/WvK6BvgL/Thuy-t-tr-nh.png",
    courseImg: "https://i.ibb.co/WvK6BvgL/Thuy-t-tr-nh.png",
    bannerLink: "https://ibb.co/wh6RphMf",
    theme: {
      color: "#c026d3",
      gradient: "linear-gradient(135deg, #e879f9 0%, #a21caf 100%)",
      glow: "rgba(232, 121, 249, 0.35)",
      bgSoft: "rgba(232, 121, 249, 0.08)",
      cardBgLight: "linear-gradient(145deg, rgba(253, 244, 255, 0.92) 0%, rgba(250, 232, 255, 0.78) 100%)",
      border: "rgba(232, 121, 249, 0.4)"
    }
  },
  {
    id: 9,
    code: "5.9",
    title: "Kỹ năng Phỏng vấn",
    iconName: "UserCheck",
    category: "skills",
    year: "2013",
    org: "VietnamWorks",
    format: "Đánh giá nhân tài",
    focus: "Kỹ thuật phỏng vấn hành vi (BEI) và đánh giá chuẩn xác năng lực ứng viên.",
    desc: "Chương trình đào tạo kỹ thuật phỏng vấn và đánh giá tiềm năng nhân sự chuyên nghiệp.",
    modules: [
      "Kỹ thuật phỏng vấn hành vi (BEI)",
      "Đánh giá ứng viên theo khung ASK",
      "Kỹ năng giao tiếp trong phỏng vấn"
    ],
    practice: "Ứng dụng mô hình phỏng vấn tình huống STAR, bộ câu hỏi đào sâu hành vi và thang điểm đánh giá khách quan phù hợp văn hóa tổ chức.",
    techStack: "STAR Methodology • Competency Scoring • Behavioral Assessment",
    outcome: "Nâng cao khả năng đánh giá chính xác năng lực và sự phù hợp của ứng viên trong các buổi phỏng vấn.",
    bannerImg: "https://i.ibb.co/1JqvPrND/Ph-ng-v-n.png",
    certImg: "https://i.ibb.co/1JqvPrND/Ph-ng-v-n.png",
    courseImg: "https://i.ibb.co/1JqvPrND/Ph-ng-v-n.png",
    bannerLink: "https://ibb.co/Z18LFBrn",
    theme: {
      color: "#2563eb",
      gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      glow: "rgba(59, 130, 246, 0.35)",
      bgSoft: "rgba(59, 130, 246, 0.08)",
      cardBgLight: "linear-gradient(145deg, rgba(239, 246, 255, 0.92) 0%, rgba(219, 234, 254, 0.78) 100%)",
      border: "rgba(59, 130, 246, 0.4)"
    }
  },
  {
    id: 10,
    code: "5.10",
    title: "Kỹ năng Tuyển dụng",
    iconName: "UserPlus",
    category: "skills",
    year: "2013",
    org: "VietnamWorks",
    format: "Chiến lược nhân sự",
    focus: "Chiến lược tuyển dụng và xây dựng thương hiệu tuyển dụng.",
    desc: "Chương trình đào tạo chiến lược tuyển dụng và xây dựng thương hiệu tuyển dụng.",
    modules: [
      "Xây dựng tiêu chí tuyển dụng",
      "Quy trình thu hút nhân tài",
      "Lập kế hoạch tuyển dụng",
      "Tối ưu hóa chi phí tuyển dụng"
    ],
    practice: "Tối ưu hóa kênh nguồn ứng viên (Sourcing Channels), rút ngắn thời gian lấp đầy vị trí (Time-to-hire) và hạ thấp chi phí tuyển dụng (Cost-per-hire).",
    techStack: "Talent Acquisition • Sourcing Optimization • Employer Branding",
    outcome: "Chuẩn hóa quy trình tuyển dụng, gia tăng tỷ lệ thu hút và tuyển dụng nhân sự chất lượng cao.",
    bannerImg: "https://i.ibb.co/1JqvPrND/Ph-ng-v-n.png",
    certImg: "https://i.ibb.co/1JqvPrND/Ph-ng-v-n.png",
    courseImg: "https://i.ibb.co/1JqvPrND/Ph-ng-v-n.png",
    bannerLink: "https://ibb.co/Z18LFBrn",
    theme: {
      color: "#0d9488",
      gradient: "linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)",
      glow: "rgba(20, 184, 166, 0.35)",
      bgSoft: "rgba(20, 184, 166, 0.08)",
      cardBgLight: "linear-gradient(145deg, rgba(240, 253, 250, 0.92) 0%, rgba(204, 251, 241, 0.78) 100%)",
      border: "rgba(20, 184, 166, 0.4)"
    }
  },
  {
    id: 11,
    code: "5.11",
    title: "Chương trình Cử nhân CNTT",
    iconName: "GraduationCap",
    category: "tech",
    year: "2007",
    org: "Trường ĐH Công nghệ Sài Gòn (STU)",
    format: "Đại học chính quy",
    focus: "Khoa học máy tính, kỹ thuật phần mềm và kiến trúc hệ thống mạng thông tin.",
    desc: "Chương trình đào tạo đại học chính quy về khoa học máy tính, kỹ thuật phần mềm và hệ thống thông tin.",
    modules: [
      "Lập trình máy tính",
      "Cơ sở dữ liệu",
      "Mạng máy tính và viễn thông",
      "An toàn thông tin",
      "Phân tích thiết kế hệ thống phần mềm"
    ],
    practice: "Nghiên cứu cấu trúc dữ liệu giải thuật, thiết kế kiến trúc Client-Server, chuẩn hóa mô hình cơ sở dữ liệu quan hệ và an ninh thông tin đa lớp.",
    techStack: "Software Architecture • Relational DB • Network Protocols • Security",
    outcome: "Tốt nghiệp Cử nhân CNTT chính quy; tạo nền tảng công nghệ vững chắc hỗ trợ quản trị và chuyển đổi số.",
    bannerImg: "https://i.ibb.co/YBWVsjDs/C-nh-n-CNTT.png",
    certImg: "https://i.ibb.co/YBWVsjDs/C-nh-n-CNTT.png",
    courseImg: "https://i.ibb.co/YBWVsjDs/C-nh-n-CNTT.png",
    bannerLink: "https://ibb.co/1Gn4W2sW",
    theme: {
      color: "#dc2626",
      gradient: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)",
      glow: "rgba(239, 68, 68, 0.35)",
      bgSoft: "rgba(239, 68, 68, 0.08)",
      cardBgLight: "linear-gradient(145deg, rgba(254, 242, 242, 0.92) 0%, rgba(254, 226, 226, 0.78) 100%)",
      border: "rgba(239, 68, 68, 0.4)"
    }
  },
  {
    id: 12,
    code: "5.12",
    title: "Khóa đào tạo Chứng nhận Tổng đài viên chuyên nghiệp",
    iconName: "Headset",
    category: "skills",
    year: "2007",
    org: "MobiFone",
    format: "Chứng nhận chuyên nghiệp",
    focus: "Vận hành Contact Center và chăm sóc khách hàng viễn thông xuất sắc.",
    desc: "Chương trình đào tạo chuẩn hóa nghiệp vụ vận hành Contact Center và chăm sóc khách hàng viễn thông.",
    modules: [
      "Nghiệp vụ tổng đài viễn thông",
      "Quy trình tiếp nhận & xử lý yêu cầu",
      "Kỹ năng lắng nghe thấu cảm",
      "Giải quyết tình huống khó"
    ],
    practice: "Xử lý hàng trăm cuộc gọi thoại thực tế mỗi ngày, kiểm soát thời gian đàm thoại (AHT) và đạt tỷ lệ giải quyết cuộc gọi đầu tiên (FCR) vượt định mức.",
    techStack: "Telecom Billing • Call Flow SOP • Voice Tone • De-escalation",
    outcome: "Đạt chứng nhận Tổng đài viên xuất sắc, làm nền tảng phát triển sự nghiệp CSKH thực chiến.",
    bannerImg: "https://i.ibb.co/49h4XHh/T-ng-i-vi-n-Mobifone.png",
    certImg: "https://i.ibb.co/49h4XHh/T-ng-i-vi-n-Mobifone.png",
    courseImg: "https://i.ibb.co/49h4XHh/T-ng-i-vi-n-Mobifone.png",
    bannerLink: "https://ibb.co/MWFPtmF",
    theme: {
      color: "#65a30d",
      gradient: "linear-gradient(135deg, #84cc16 0%, #4d7c0f 100%)",
      glow: "rgba(132, 204, 22, 0.35)",
      bgSoft: "rgba(132, 204, 22, 0.08)",
      cardBgLight: "linear-gradient(145deg, rgba(247, 254, 231, 0.92) 0%, rgba(236, 252, 203, 0.78) 100%)",
      border: "rgba(132, 204, 22, 0.4)"
    }
  },
  {
    id: 13,
    code: "5.13",
    title: "Quản trị mạng CCNA",
    iconName: "Network",
    category: "network",
    year: "2006",
    org: "Trường Nghề Nhất Nghệ",
    format: "Chứng chỉ Cisco",
    focus: "Hạ tầng mạng Cisco tiêu chuẩn quốc tế, Routing & Switching.",
    desc: "Chương trình đào tạo quản trị hạ tầng mạng Cisco tiêu chuẩn quốc tế.",
    modules: [
      "Thiết kế mạng",
      "Kỹ thuật Routing và Switching",
      "Mô hình TCP/IP",
      "Cấu hình VLAN",
      "An toàn an ninh mạng"
    ],
    practice: "Cấu hình Router/Switch Cisco thực tế, phân chia subnet IP, thiết lập định tuyến OSPF/EIGRP, bảo mật cổng truy cập và cấu hình tường lửa.",
    techStack: "Cisco CLI • VLAN Trunking • OSPF/EIGRP • ACLs Security",
    outcome: "Hoàn thành chứng chỉ CCNA, làm chủ kỹ năng thiết kế và vận hành hệ thống hạ tầng mạng doanh nghiệp.",
    bannerImg: "https://i.ibb.co/chHTpBJL/CCNA.png",
    certImg: "https://i.ibb.co/chHTpBJL/CCNA.png",
    courseImg: "https://i.ibb.co/chHTpBJL/CCNA.png",
    bannerLink: "https://ibb.co/XxgJdQX8",
    theme: {
      color: "#0891b2",
      gradient: "linear-gradient(135deg, #06b6d4 0%, #0369a1 100%)",
      glow: "rgba(6, 182, 212, 0.35)",
      bgSoft: "rgba(6, 182, 212, 0.08)",
      cardBgLight: "linear-gradient(145deg, rgba(236, 254, 255, 0.92) 0%, rgba(207, 250, 254, 0.78) 100%)",
      border: "rgba(6, 182, 212, 0.4)"
    }
  },
  {
    id: 14,
    code: "5.14",
    title: "Quản trị hệ thống MCSA",
    iconName: "HardDrive",
    category: "network",
    year: "2005",
    org: "Trường Nghề Nhất Nghệ",
    format: "Chứng chỉ Microsoft",
    focus: "Hệ thống máy chủ Microsoft Windows Server và Active Directory.",
    desc: "Khóa đào tạo chuyên sâu về quản trị hạ tầng hệ thống máy chủ doanh nghiệp Microsoft Windows Server.",
    modules: [
      "Quản trị Windows Server",
      "Cấu hình Active Directory",
      "Dịch vụ DNS, DHCP",
      "Phân quyền bảo mật và quản lý tài nguyên máy chủ"
    ],
    practice: "Triển khai Group Policy Object (GPO), thiết lập phân quyền người dùng, quản trị máy chủ tệp tin (File Server) và giám sát backup hệ thống.",
    techStack: "Windows Server • Active Directory • DNS/DHCP • Group Policy",
    outcome: "Hoàn thành khóa học MCSA, thành thạo việc quản lý và triển khai hệ thống máy chủ mạng doanh nghiệp.",
    bannerImg: "https://i.ibb.co/Jwf4rb4G/MCSA.png",
    certImg: "https://i.ibb.co/Jwf4rb4G/MCSA.png",
    courseImg: "https://i.ibb.co/Jwf4rb4G/MCSA.png",
    bannerLink: "https://ibb.co/jPc23x2Q",
    theme: {
      color: "#3b82f6",
      gradient: "linear-gradient(135deg, #60a5fa 0%, #1e40af 100%)",
      glow: "rgba(96, 165, 250, 0.35)",
      bgSoft: "rgba(96, 165, 250, 0.08)",
      cardBgLight: "linear-gradient(145deg, rgba(239, 246, 255, 0.92) 0%, rgba(219, 234, 254, 0.78) 100%)",
      border: "rgba(96, 165, 250, 0.4)"
    }
  }
];

// Helper to map icon name to Lucide Component
function getCourseIcon(name: string) {
  switch (name) {
    case "Code": return Code;
    case "PieChart": return PieChart;
    case "ShieldAlert": return ShieldAlert;
    case "Kanban": return Kanban;
    case "Crown": return Crown;
    case "Users": return Users;
    case "Teacher": return Presentation;
    case "Presentation": return Presentation;
    case "UserCheck": return UserCheck;
    case "UserPlus": return UserPlus;
    case "GraduationCap": return GraduationCap;
    case "Headset": return Headset;
    case "Network": return Network;
    case "HardDrive": return HardDrive;
    default: return Bookmark;
  }
}

export function Education() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isVi = lang === "vi";

  // State Management
  const [viewMode, setViewMode] = useState<"flipbook" | "grid">("flipbook");
  const [selectedBookCourseId, setSelectedBookCourseId] = useState<number | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [certModalItem, setCertModalItem] = useState<CareerMilestoneItem | null>(null);
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleFlip = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Dynamic Glass Card style
  const getGlassCardClass = useCallback(() => {
    switch (theme as string) {
      case "glass-dark-neon":
        return "bg-[#0f1422]/90 dark:bg-[#0c101d]/95 border-cyan-400/25 dark:border-white/12 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.6)] hover:border-cyan-400/60 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)]";
      case "modern-light-glass":
        return "bg-white/85 dark:bg-slate-900/85 border-white/80 dark:border-white/15 backdrop-blur-2xl shadow-[0_10px_30px_0_rgba(100,110,140,0.08)] dark:shadow-[0_10px_30px_0_rgba(0,0,0,0.4)] hover:shadow-[0_16px_45px_0_rgba(100,110,140,0.16)]";
      case "glass-light-multicolor":
      default:
        return "bg-white/85 dark:bg-[#0e1322]/90 border-white/70 dark:border-white/12 backdrop-blur-2xl shadow-[0_10px_30px_0_rgba(31,38,135,0.08)] dark:shadow-[0_10px_30px_0_rgba(0,0,0,0.45)] hover:shadow-[0_16px_40px_0_rgba(31,38,135,0.15)]";
    }
  }, [theme]);

  // Categories definition
  const CATEGORIES = [
    { id: "all", labelVi: "Tất cả học vấn", labelEn: "All Courses", count: 14 },
    { id: "tech", labelVi: "Công nghệ & AI", labelEn: "Tech & AI", count: 3 },
    { id: "management", labelVi: "Quản trị & Lãnh đạo", labelEn: "Management", count: 4 },
    { id: "skills", labelVi: "Kỹ năng & Đào tạo", labelEn: "Skills & Training", count: 5 },
    { id: "network", labelVi: "Mạng & Hệ thống", labelEn: "Network & Systems", count: 2 },
  ];

  // Filtered courses
  const filteredCourses = useMemo(() => {
    return EDUCATION_BOOKS_DATA.filter((item) => {
      const matchCat = selectedCategory === "all" || item.category === selectedCategory;
      const q = searchKeyword.toLowerCase().trim();
      if (!q) return matchCat;
      const matchSearch = 
        item.title.toLowerCase().includes(q) ||
        item.org.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.year.includes(q) ||
        item.focus.toLowerCase().includes(q) ||
        (item.techStack && item.techStack.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchKeyword]);

  const toggleExpand = (id: number) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section 
      id="education" 
      className="page-section relative w-full h-full flex flex-col justify-start items-stretch p-3.5 sm:p-5 font-sans text-slate-800 dark:text-slate-100 transition-all duration-300 bg-transparent overflow-y-auto no-scrollbar"
    >
      {/* Background Ambient Glowing Orbs for Depth */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute top-[5%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/10 dark:bg-cyan-500/8 blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] w-[45vw] h-[45vw] rounded-full bg-purple-500/10 dark:bg-purple-600/8 blur-[120px]" />
        <div className="absolute bottom-[5%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-emerald-500/8 dark:bg-emerald-600/6 blur-[100px]" />
      </div>

      <div className="section-container relative z-10 w-full max-w-full h-full min-h-full flex-grow flex-1 flex flex-col gap-4 sm:gap-5 mx-auto justify-start">
        
        {/* 1. Page Card Header with Filters inside */}
        <header className="section-header">
          <PageCardHeader pageId="education">
            <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-3 pt-1">
              {/* Left: View Mode Toggle (FlipBook 3D vs Grid Cards) */}
              <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-200/70 dark:bg-white/10 border border-slate-300/80 dark:border-white/10 shadow-2xs shrink-0">
                <button
                  type="button"
                  onClick={() => setViewMode("flipbook")}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                    viewMode === "flipbook"
                      ? "bg-amber-500 text-stone-950 font-black shadow-sm"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{isVi ? "Sách Lật 3D (FlipBook)" : "3D FlipBook"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                    viewMode === "grid"
                      ? "bg-blue-600 text-white font-black shadow-sm"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{isVi ? "Lưới Thẻ (Grid)" : "Grid Cards"}</span>
                </button>
              </div>

              {/* Right: Category Filter Chips & Search Input (when in Grid mode) */}
              {viewMode === "grid" && (
                <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full lg:w-auto">
                  {/* Category Filter Chips */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
                    {CATEGORIES.map((cat) => {
                      const isActive = selectedCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setSelectedCategory(cat.id)}
                          className={cn(
                            "px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0 border",
                            isActive
                              ? "bg-blue-600 dark:bg-cyan-500 text-white dark:text-slate-950 border-blue-600 dark:border-cyan-400 shadow-md font-black"
                              : "bg-white/60 dark:bg-white/5 text-slate-600 dark:text-slate-300 border-slate-200/80 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10"
                          )}
                        >
                          <span>{isVi ? cat.labelVi : cat.labelEn}</span>
                          <span className={cn(
                            "px-1.5 py-0.2 text-[10px] rounded-md font-mono",
                            isActive ? "bg-white/25 dark:bg-slate-950/20 text-white dark:text-slate-950 font-black" : "bg-slate-200/80 dark:bg-white/10 text-slate-500 dark:text-slate-400"
                          )}>
                            {cat.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Search Input Filter */}
                  <div className="relative w-full sm:w-56 shrink-0">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" />
                    <input
                      type="text"
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      placeholder={isVi ? "Tìm khóa học..." : "Search course..."}
                      className="w-full pl-9 pr-8 py-1.5 text-xs rounded-xl bg-slate-100/80 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-sans"
                    />
                    {searchKeyword && (
                      <button
                        type="button"
                        onClick={() => setSearchKeyword("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white p-0.5 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </PageCardHeader>
        </header>

        {/* 2. Main Content: FlipBook 3D or Responsive Grid Cards */}
        {viewMode === "flipbook" ? (
          <div className="w-full flex flex-col items-center">
            <EducationFlipBook 
              onSelectCert={setCertModalItem} 
              initialCourseId={selectedBookCourseId} 
            />
          </div>
        ) : (
          <div className="content-grid w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 items-start">
          {filteredCourses.map((course, idx) => {
            const CourseIcon = getCourseIcon(course.iconName);
            const isFlipped = !!flippedCards[course.id];
            const themeStyle = course.theme;

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="w-full h-auto min-h-fit [perspective:1200px]"
              >
                <div 
                  className={cn(
                    "relative w-full h-auto min-h-fit transition-transform duration-700 [transform-style:preserve-3d]",
                    isFlipped && "[transform:rotateY(180deg)]"
                  )}
                >
                  {/* ========================================================= */}
                  {/* MẶT TRƯỚC (FRONT FACE): TỔNG QUAN, HÌNH ẢNH & THÔNG TIN    */}
                  {/* ========================================================= */}
                  <div
                    style={{ borderRadius: "var(--theme-radius-card, 24px)" }}
                    className={cn(
                      "w-full h-auto flex flex-col justify-between p-4 sm:p-5 relative border transition-all duration-300 overflow-hidden [backface-visibility:hidden] shadow-md hover:shadow-xl",
                      "rounded-2xl sm:rounded-3xl",
                      getGlassCardClass()
                    )}
                  >
                    {/* Ambient Light */}
                    <div 
                      className="absolute -top-10 -right-10 w-36 h-36 rounded-full blur-2xl opacity-20 pointer-events-none transition-opacity duration-300 group-hover:opacity-40"
                      style={{ background: themeStyle.color }}
                    />

                    {/* Top Section */}
                    <div className="relative z-10 w-full flex flex-col gap-2.5">
                      {/* Top Bar: Category badge & Year (Bỏ mã số 5.1) */}
                      <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-white/10">
                        <div className="flex items-center gap-1.5">
                          <span className="text-3xs font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 font-mono">
                            {course.category.toUpperCase()}
                          </span>
                        </div>

                        <span className="text-2xs font-mono font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {course.year}
                        </span>
                      </div>

                      {/* Course Title & Icon */}
                      <div className="flex items-start gap-2.5">
                        <div 
                          className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border shadow-sm transition-transform duration-300"
                          style={{
                            backgroundColor: `${themeStyle.color}18`,
                            borderColor: `${themeStyle.color}40`,
                            color: themeStyle.color
                          }}
                        >
                          <CourseIcon className="w-5 h-5 stroke-[2.2]" />
                        </div>
                        <div className="min-w-0 flex-1 text-left">
                          <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-snug tracking-tight font-play group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
                            {course.title}
                          </h3>
                          <div className="flex items-center gap-1 text-2xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium truncate">
                            <Building2 className="w-3 h-3 shrink-0 text-slate-400" />
                            <span className="font-bold text-slate-700 dark:text-slate-300 truncate">{course.org}</span>
                          </div>
                        </div>
                      </div>

                      {/* Banner Image Preview */}
                      <div className="w-full h-32 sm:h-34 rounded-xl overflow-hidden relative border border-slate-200/80 dark:border-white/10 shadow-2xs my-1 bg-slate-950/20 group/img">
                        <img 
                          src={course.bannerImg} 
                          alt={course.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-108"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                        
                        {/* Format badge on image */}
                        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-3xs font-mono font-bold text-white z-10">
                          <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/20">
                            {course.format}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCertModalItem(course);
                            }}
                            className="px-2 py-0.5 rounded-md bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white flex items-center gap-1 transition-all cursor-pointer"
                            title={isVi ? "Xem bằng cấp / chứng chỉ" : "View Certificate"}
                          >
                            <FileCheck2 className="w-3 h-3 text-cyan-300" />
                            <span>{isVi ? "Xem bằng" : "Cert"}</span>
                          </button>
                        </div>
                      </div>

                      {/* Focus summary */}
                      <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium text-left">
                        <p className="line-clamp-2">
                          <strong className="text-slate-800 dark:text-slate-100 font-bold">{isVi ? "Trọng tâm: " : "Focus: "}</strong>
                          {course.focus}
                        </p>
                      </div>

                      {/* Tech Stack */}
                      {course.techStack && (
                        <div className="text-3xs text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1 truncate text-left">
                          <Wrench className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{course.techStack}</span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Bar: Flip Card button + Cert Button + Open in FlipBook */}
                    <div className="relative z-10 w-full pt-2.5 mt-2 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between gap-1.5 flex-wrap">
                      <button
                        type="button"
                        onClick={(e) => toggleFlip(course.id, e)}
                        className="px-2 py-1.5 rounded-xl text-3xs font-bold bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 transition-all flex items-center gap-1 cursor-pointer border border-slate-200/80 dark:border-white/10 active:scale-95 shadow-2xs"
                        title={isVi ? "Lật thẻ xem chi tiết học phần & thực hành" : "Flip card to view modules & practice"}
                      >
                        <RotateCw className="w-3.5 h-3.5 text-indigo-500 dark:text-cyan-400" />
                        <span>{isVi ? "Chi tiết ↺" : "Details ↺"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedBookCourseId(course.id);
                          setViewMode("flipbook");
                        }}
                        className="px-2 py-1.5 rounded-xl text-3xs font-bold bg-amber-500/15 hover:bg-amber-500/25 text-amber-700 dark:text-amber-300 border border-amber-500/30 transition-all flex items-center gap-1 cursor-pointer active:scale-95"
                        title={isVi ? "Mở khóa học này trong Sách Lật 3D FlipBook" : "Open in 3D FlipBook"}
                      >
                        <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                        <span>{isVi ? "Lật Sách" : "Book"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCertModalItem(course);
                        }}
                        className="px-2.5 py-1.5 rounded-xl text-3xs font-bold text-white shadow-xs hover:shadow-md transition-all flex items-center gap-1 shrink-0 cursor-pointer active:scale-95 ml-auto"
                        style={{
                          background: themeStyle.gradient,
                          boxShadow: `0 4px 14px ${themeStyle.glow}`
                        }}
                      >
                        <Maximize2 className="w-3 h-3" />
                        <span>{isVi ? "Bằng cấp" : "Cert"}</span>
                      </button>
                    </div>
                  </div>

                  {/* ========================================================= */}
                  {/* MẶT SAU (BACK FACE): HỌC PHẦN, THỰC HÀNH & KẾT QUẢ        */}
                  {/* ========================================================= */}
                  <div
                    style={{ borderRadius: "var(--theme-radius-card, 24px)" }}
                    className={cn(
                      "w-full h-full flex flex-col justify-between p-4 sm:p-5 relative border transition-all duration-300 overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] absolute inset-0 shadow-lg text-left",
                      "rounded-2xl sm:rounded-3xl",
                      getGlassCardClass()
                    )}
                  >
                    {/* Top Header Face Back */}
                    <div className="relative z-10 w-full flex flex-col gap-2.5">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-white/10">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900 dark:text-white font-play truncate max-w-[200px]">
                            {course.title}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => toggleFlip(course.id, e)}
                          className="p-1 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                          title={isVi ? "Quay lại mặt trước" : "Flip back to front"}
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Key Modules */}
                      <div className="p-2.5 rounded-xl bg-slate-50/90 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 space-y-1.5 text-2xs">
                        <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block font-mono text-3xs flex items-center gap-1">
                          <BookOpen className="w-3 h-3 text-indigo-500 dark:text-cyan-400" />
                          <span>{isVi ? "Học phần chuyên sâu:" : "Core Modules:"}</span>
                        </span>
                        <ul className="space-y-1 max-h-[110px] overflow-y-auto custom-scrollbar pr-0.5">
                          {course.modules.map((mod, mIdx) => (
                            <li key={mIdx} className="flex items-start gap-1.5 text-slate-700 dark:text-slate-200 font-medium">
                              <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                              <span className="leading-tight">{mod}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Practice / Real-world Application */}
                      {course.practice && (
                        <div className="p-2.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/40 text-2xs space-y-1">
                          <span className="font-bold text-indigo-700 dark:text-cyan-300 uppercase tracking-wider block font-mono text-3xs flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-indigo-500 dark:text-cyan-400" />
                            <span>{isVi ? "Ứng dụng thực chiến:" : "Applied in Practice:"}</span>
                          </span>
                          <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-medium line-clamp-3">
                            {course.practice}
                          </p>
                        </div>
                      )}

                      {/* Outcome */}
                      <div className="p-2 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40 text-2xs space-y-0.5">
                        <span className="font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider block font-mono text-3xs flex items-center gap-1">
                          <Award className="w-3 h-3 text-emerald-500" />
                          <span>{isVi ? "Kết quả đạt được:" : "Key Outcome:"}</span>
                        </span>
                        <p className="text-slate-700 dark:text-slate-200 font-medium leading-snug line-clamp-2">
                          {course.outcome}
                        </p>
                      </div>
                    </div>

                    {/* Back Bottom Actions */}
                    <div className="relative z-10 w-full pt-2.5 mt-2 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={(e) => toggleFlip(course.id, e)}
                        className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-2xs"
                      >
                        <RotateCw className="w-3.5 h-3.5 text-indigo-500 dark:text-cyan-400" />
                        <span>{isVi ? "Mặt trước ↺" : "Front ↺"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCertModalItem(course);
                        }}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 shrink-0 cursor-pointer active:scale-95"
                        style={{
                          background: themeStyle.gradient,
                          boxShadow: `0 4px 14px ${themeStyle.glow}`
                        }}
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>{isVi ? "Bằng cấp" : "Cert"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      </div>

      {/* ========================================================================= */}
      {/* HIGH-RESOLUTION CERTIFICATE ZOOM MODAL                                    */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {certModalItem && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCertModalItem(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col text-left font-sans"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-3 bg-slate-50/70 dark:bg-white/5">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div 
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border shadow-xs"
                    style={{
                      backgroundColor: `${certModalItem.theme.color}20`,
                      borderColor: `${certModalItem.theme.color}40`,
                      color: certModalItem.theme.color
                    }}
                  >
                    <Trophy className="w-4.5 h-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-tight font-play truncate">
                      {certModalItem.title}
                    </h4>
                    <p className="text-2xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                      {certModalItem.org} • {certModalItem.format} • Năm {certModalItem.year}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCertModalItem(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Image Body */}
              <div className="p-4 sm:p-6 flex flex-col items-center justify-center bg-slate-950/10 dark:bg-black/40 overflow-hidden">
                <div className="max-w-full max-h-[60vh] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg bg-white dark:bg-slate-950 p-2">
                  <img 
                    src={certModalItem.certImg} 
                    alt={certModalItem.title} 
                    className="max-w-full max-h-[55vh] object-contain rounded-xl select-none"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 border-t border-slate-200/80 dark:border-white/10 bg-slate-50/70 dark:bg-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                  <strong className="text-slate-900 dark:text-white">Kết quả: </strong>
                  <span>{certModalItem.outcome}</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  {certModalItem.bannerLink && (
                    <a
                      href={certModalItem.bannerLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{isVi ? "Link gốc" : "Source Link"}</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setCertModalItem(null)}
                    className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 text-xs font-bold transition-all shadow-sm cursor-pointer"
                  >
                    {isVi ? "Đóng" : "Close"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Education;
