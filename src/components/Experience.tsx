import React, { useState, useEffect, useRef, useMemo } from "react";
import AppIcon from "./AppIcon";
import PageBanner from "./PageBanner";
import { 
  Calendar, 
  Users, 
  Camera,
  Star, 
  Gamepad2, 
  MapPin, 
  Trophy, 
  ClipboardList, 
  Folder, 
  CheckCircle2, 
  Quote, 
  Building2, 
  UserCheck, 
  X, 
  Maximize2, 
  Minimize2,
  History, 
  Sparkles,
  ChevronRight,
  ChevronsRight,
  ChevronLeft,
  ArrowLeft,
  ArrowRight,
  Monitor,
  Smartphone,
  Megaphone,
  ClipboardCheck,
  FileText,
  Shield,
  Layers,
  Search,
  Filter,
  Briefcase,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ArrowUpRight,
  Image as ImageIcon,
  ExternalLink,
  Target,
  Server,
  Award,
  Clock,
  TrendingUp,
  Check,
  Phone,
  ShoppingBag,
  Heart,
  Rocket,
  Plus,
  Minus,
  SlidersHorizontal,
  ChevronDown,
  Radio,
  Tv,
  Activity,
  CreditCard,
  ShieldCheck,
  Bot,
  Zap,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Headset,
  Settings,
  Wallet,
  Lightbulb,
  User,
  FolderKanban,
  MoreVertical,
  MousePointerClick,
  LayoutGrid,
  List
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { cn, getUnifiedSurfaceStyle } from "../lib/utils";
import { PageCardHeader } from "./PageCardHeader";
import { MEMORIES_DATA } from "./Memories";



// Decorative futuristic animated icon for milestone cards
const renderDecorativeIcon = (key: string) => {
  switch (key) {
    case "2003":
      return <Radio className="w-4 h-4 text-blue-500 animate-pulse shrink-0" />;
    case "2007":
      return <Tv className="w-4 h-4 text-purple-500 animate-pulse shrink-0" />;
    case "2011":
      return <Activity className="w-4 h-4 text-emerald-500 animate-pulse shrink-0" />;
    case "2013":
      return <Gamepad2 className="w-4 h-4 text-slate-500 animate-pulse shrink-0" />;
    case "2015":
      return <ShoppingBag className="w-4 h-4 text-orange-500 animate-pulse shrink-0" />;
    case "2016":
      return <ShieldCheck className="w-4 h-4 text-red-500 animate-pulse shrink-0" />;
    case "2018":
      return <CreditCard className="w-4 h-4 text-pink-500 animate-pulse shrink-0" />;
    case "2023":
      return <Zap className="w-4 h-4 text-amber-500 animate-pulse shrink-0" />;
    case "2026":
      return <Bot className="w-4 h-4 text-blue-500 animate-pulse shrink-0" />;
    default:
      return <Sparkles className="w-4 h-4 text-blue-500 animate-pulse shrink-0" />;
  }
};

// Milestone definition interface
export interface MilestoneData {
  key: string;
  year: string;
  cardYearLabel: string;
  cardYearColor: string;
  period: string;
  company: string;
  subCompanies?: string;
  tag: string;
  tagCategory: "telecom" | "gaming" | "ecommerce" | "insurance" | "fintech" | "strategy";
  tagColor: string;
  logo: string;
  subLogo?: string;
  fallbackLogo?: string;
  bannerUrl?: string;
  headerTitle: string;
  highlightText: string;
  cardDescription: string;
  cardTags: string[];
  cardScope: string;
  cardRoleTitle: string;
  paragraphs: string[];
  headcount: number;
  role: string;
  roleSub: string;
  industry: string;
  duration: string;
  location: string;
  managementRole: string;
  managementHeadcount: string;
  kpis: { label: string; percent: number }[];
  tasks: string[];
  projects: string[];
  commitments: string[];
  photoUrl: string;
  photoCount: number;
  memoryCompanyId?: "mobifone" | "htvc" | "ved" | "prudential" | "momo" | "finviet" | "v247";
}

export const MILESTONES_DATA: Record<string, MilestoneData> = {
  "2003": {
    key: "2003",
    year: "2003",
    cardYearLabel: "2003 - 2007",
    cardYearColor: "text-blue-500 dark:text-blue-400",
    period: "Từ Năm 2003 đến Năm 2007",
    company: "Công ty Viễn Thông Mobifone",
    subCompanies: "(Cty Ánh Hào Quang)",
    tag: "Viễn thông",
    tagCategory: "telecom",
    tagColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    logo: "https://i.ibb.co/hxHm9TsZ/Mobifone.png",
    bannerUrl: "https://i.ibb.co/KzryKQHx/Mobifone.png",
    headerTitle: "Năm 2003 – Khởi đầu tại MobiFone",
    highlightText: "Tôi bắt đầu sự nghiệp tại MobiFone, nơi tôi được đào tạo bài bản về dịch vụ khách hàng, quản lý tổng đài, xử lý sự cố và xây dựng quy trình phục vụ theo tiêu chuẩn ngành viễn thông. Đây là nền tảng giúp tôi hình thành tư duy lấy khách hàng làm trung tâm và hiểu rõ tầm quan trọng của quy trình trong vận hành dịch vụ.",
    cardDescription: "Tôi bắt đầu sự nghiệp tại MobiFone, nơi tôi được đào tạo bài bản về dịch vụ khách hàng, quản lý tổng đài, xử lý sự cố và xây dựng quy trình phục vụ theo tiêu chuẩn ngành viễn thông. Đây là nền tảng giúp tôi hình thành tư duy lấy khách hàng làm trung tâm và hiểu rõ tầm quan trọng của quy trình trong vận hành dịch vụ.",
    cardTags: ["Tổng đài viên", "MobiFone", "CSKH viễn thông"],
    cardScope: "(Cty Ánh Hào Quang)",
    cardRoleTitle: "Tổng đài viên (Trưởng nhóm từ 2007)",
    paragraphs: [
      "Tôi bắt đầu sự nghiệp tại MobiFone, nơi tôi được đào tạo bài bản về dịch vụ khách hàng, quản lý tổng đài, xử lý sự cố và xây dựng quy trình phục vụ theo tiêu chuẩn ngành viễn thông.",
      "Đây là nền tảng giúp tôi hình thành tư duy lấy khách hàng làm trung tâm và hiểu rõ tầm quan trọng của quy trình trong vận hành dịch vụ."
    ],
    headcount: 12,
    role: "Tổng đài viên (Trưởng nhóm từ 2007)",
    roleSub: "Tổng đài viên (Trưởng nhóm từ 2007)",
    industry: "Viễn thông",
    duration: "2003 – 2007 (4 năm)",
    location: "Hồ Chí Minh, Việt Nam",
    managementRole: "Tổng đài viên (Trưởng nhóm từ 2007)",
    managementHeadcount: "12 nhân sự trực tiếp",
    kpis: [
      { label: "Hoàn thành nhiệm vụ", percent: 100 },
      { label: "Phản hồi & Hỗ trợ", percent: 90 }
    ],
    tasks: [
      "Nghe điện thoại tư vấn trả lời khách hàng",
      "Giải quyết khiếu nại trường hợp khó",
      "Gọi điện tư vấn những phiếu đã hoàn thành xong",
      "Hỗ trợ các nhân viên mới nghiệp vụ",
      "Xử lý các cuộc gọi quấy rối từ khách hàng",
      "Quản lý đội ngũ 12 nhân viên CSKH"
    ],
    projects: [
      "Đào tạo nghiệp vụ nhân viên mới",
      "Bổ nhiệm Trưởng nhóm CSKH"
    ],
    commitments: [
      "Đảm bảo 100% cuộc gọi khiếu nại được xử lý dứt điểm",
      "Giữ vững tỷ lệ CSAT trên 90% trong suốt thời gian đảm nhiệm"
    ],
    photoUrl: "https://i.ibb.co/6Rp6rqXt/Mobifone-1.webp",
    photoCount: 3,
    memoryCompanyId: "mobifone"
  },
  "2007": {
    key: "2007",
    year: "2007",
    cardYearLabel: "2007 - 2011",
    cardYearColor: "text-purple-600 dark:text-purple-400",
    period: "Từ Năm 2007 đến Năm 2011",
    company: "Công ty Viễn Liên V247",
    subCompanies: "(Điện thoại V247)",
    tag: "Viễn thông",
    tagCategory: "telecom",
    tagColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800",
    logo: "https://i.ibb.co/QvtbdnfP/V247.png",
    bannerUrl: "https://i.ibb.co/bMZKjMhX/v247.png",
    headerTitle: "Năm 2007 – Phát triển năng lực quản lý tại Viễn Liên V247",
    highlightText: "Gia nhập Viễn Liên V247, tôi tiếp tục phát triển năng lực quản lý đội ngũ, giám sát chất lượng dịch vụ và tối ưu hiệu quả vận hành của trung tâm chăm sóc khách hàng. Giai đoạn này giúp tôi tích lũy kinh nghiệm quản lý hoạt động với quy mô lớn và xây dựng các chỉ số đánh giá chất lượng dịch vụ.",
    cardDescription: "Gia nhập Viễn Liên V247, tôi tiếp tục phát triển năng lực quản lý đội ngũ, giám sát chất lượng dịch vụ và tối ưu hiệu quả vận hành của trung tâm chăm sóc khách hàng. Giai đoạn này giúp tôi tích lũy kinh nghiệm quản lý hoạt động với quy mô lớn và xây dựng các chỉ số đánh giá chất lượng dịch vụ.",
    cardTags: ["Trưởng Nhóm CSKH", "Viễn thông", "Vận hành đa kênh"],
    cardScope: "(Điện thoại V247)",
    cardRoleTitle: "Trưởng Nhóm CSKH",
    paragraphs: [
      "Gia nhập Viễn Liên V247, tôi tiếp tục phát triển năng lực quản lý đội ngũ, giám sát chất lượng dịch vụ và tối ưu hiệu quả vận hành của trung tâm chăm sóc khách hàng.",
      "Giai đoạn này giúp tôi tích lũy kinh nghiệm quản lý hoạt động với quy mô lớn và xây dựng các chỉ số đánh giá chất lượng dịch vụ."
    ],
    headcount: 12,
    role: "Trưởng Nhóm CSKH",
    roleSub: "Trưởng Nhóm CSKH",
    industry: "Viễn thông",
    duration: "2007 – 2011 (4 năm)",
    location: "Hồ Chí Minh, Việt Nam",
    managementRole: "Trưởng Nhóm CSKH",
    managementHeadcount: "12 nhân sự trực tiếp",
    kpis: [
      { label: "Hướng dẫn nhân viên mới", percent: 96 },
      { label: "Biên soạn tài liệu", percent: 100 },
      { label: "Phản hồi & Hỗ trợ", percent: 80 }
    ],
    tasks: [
      "Quản lý và giám sát đội ngũ chăm sóc khách hàng",
      "Theo dõi, phân bổ và phân phối cuộc gọi đến cho các thành viên",
      "Đánh giá và huấn luyện nhân viên chăm sóc khách hàng",
      "Lập kế hoạch và lịch trình chăm sóc khách hàng (giờ ăn trưa, cuối tuần)",
      "Xử lý những trở ngại của nhân viên",
      "Quản lý và xử lý yêu cầu khách hàng từ đa kênh (Email, Fax, Phone, Chat)",
      "Khảo sát sự hài lòng của khách hàng",
      "Nghe ghi âm cuộc gọi và định hướng đào tạo"
    ],
    projects: [
      "Quản lý vận hành dịch vụ đa kênh",
      "Thiết lập khung đánh giá ghi âm cuộc gọi"
    ],
    commitments: [
      "Duy trì tổng đài vận hành thông suốt 24/7 không gián đoạn",
      "Chuẩn hóa 100% tài liệu quy trình hỗ trợ đa kênh"
    ],
    photoUrl: "https://i.ibb.co/gM7nPptY/V247-3.jpg",
    photoCount: 5,
    memoryCompanyId: "v247"
  },
  "2011": {
    key: "2011",
    year: "2011",
    cardYearLabel: "2011 - 2013",
    cardYearColor: "text-emerald-600 dark:text-emerald-400",
    period: "Từ Năm 2011 đến Năm 2013",
    company: "Công ty CPTTBR Cuộc Sống LBC",
    subCompanies: "(Truyền hình cáp HTVC)",
    tag: "Truyền thông",
    tagCategory: "telecom",
    tagColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    logo: "https://i.ibb.co/R4YXWyzF/LBC.png",
    subLogo: "https://i.ibb.co/1fNw0hBq/HTVC.png",
    bannerUrl: "https://i.ibb.co/Mykxzbbz/LBC.png",
    headerTitle: "Năm 2011 – Bước ngoặt tại LBC – Truyền hình Cáp HTV",
    highlightText: "Đây là dấu mốc quan trọng khi tôi lần đầu đảm nhiệm vị trí Trưởng phòng Chăm sóc Khách hàng. Từ một nhà quản lý vận hành, tôi chuyển mình trở thành một nhà quản trị toàn diện. Tôi trực tiếp điều hành hoạt động của phòng ban, xây dựng và chuẩn hóa quy trình, phát triển đội ngũ, thiết lập hệ thống KPI, đồng thời phối hợp với nhiều đơn vị nhằm nâng cao chất lượng dịch vụ và hiệu quả vận hành. Chính giai đoạn này đã giúp tôi hình thành tư duy quản trị hệ thống và phát triển con người song song với mục tiêu kinh doanh.",
    cardDescription: "Đây là dấu mốc quan trọng khi tôi lần đầu đảm nhiệm vị trí Trưởng phòng Chăm sóc Khách hàng. Từ một nhà quản lý vận hành, tôi chuyển mình trở thành một nhà quản trị toàn diện. Tôi trực tiếp điều hành hoạt động của phòng ban, xây dựng và chuẩn hóa quy trình, phát triển đội ngũ, thiết lập hệ thống KPI, đồng thời phối hợp với nhiều đơn vị nhằm nâng cao chất lượng dịch vụ và hiệu quả vận hành. Chính giai đoạn này đã giúp tôi hình thành tư duy quản trị hệ thống và phát triển con người song song với mục tiêu kinh doanh.",
    cardTags: ["Trưởng Phòng Dịch vụ Khách hàng", "Truyền hình cáp HTVC", "Xây dựng phòng CSKH"],
    cardScope: "(Truyền hình cáp HTVC)",
    cardRoleTitle: "Trưởng Phòng Dịch vụ Khách hàng",
    paragraphs: [
      "Đây là dấu mốc quan trọng khi tôi lần đầu đảm nhiệm vị trí Trưởng phòng Chăm sóc Khách hàng.",
      "Từ một nhà quản lý vận hành, tôi chuyển mình trở thành một nhà quản trị toàn diện. Tôi trực tiếp điều hành hoạt động của phòng ban, xây dựng và chuẩn hóa quy trình, phát triển đội ngũ, thiết lập hệ thống KPI, đồng thời phối hợp với nhiều đơn vị nhằm nâng cao chất lượng dịch vụ và hiệu quả vận hành.",
      "Chính giai đoạn này đã giúp tôi hình thành tư duy quản trị hệ thống và phát triển con người song song với mục tiêu kinh doanh."
    ],
    headcount: 12,
    role: "Trưởng Phòng Dịch vụ Khách hàng",
    roleSub: "Trưởng Phòng Dịch vụ Khách hàng",
    industry: "Truyền thông",
    duration: "2011 – 2013 (2 năm)",
    location: "Hồ Chí Minh, Việt Nam",
    managementRole: "Trưởng Phòng Dịch vụ Khách hàng",
    managementHeadcount: "12 nhân sự trực tiếp",
    kpis: [
      { label: "Chuẩn hóa quy trình", percent: 100 },
      { label: "Phản hồi & Hỗ trợ", percent: 80 },
      { label: "Hỗ trợ sự kiện lớn", percent: 70 },
      { label: "Tham gia dự án", percent: 80 }
    ],
    tasks: [
      "Quản lý và giám sát Phòng Dịch Vụ Khách Hàng",
      "Xử lý khiếu nại của khách hàng và cải thiện sản phẩm",
      "Đào tạo và huấn luyện Nhân Viên",
      "Khảo sát sự hài lòng của khách hàng",
      "Phối hợp các phòng ban thực hiện chương trình quảng cáo, khuyến mãi",
      "Theo dõi và phân tích hoạt động Dịch Vụ Khách Hàng của đối thủ cạnh tranh",
      "Lập kế hoạch thăm hỏi khách hàng VIP, đại lý",
      "Ghi nhận ý kiến khách hàng để cải tiến công việc"
    ],
    projects: [
      "Xây dựng P.CSKH",
      "Thiết lập mục tiêu phòng ban",
      "Thúc đẩy cải tiến sản phẩm",
      "Chuẩn hóa quy trình CSKH",
      "Quản lý chiến dịch Outbound",
      "Phân tích & Báo cáo"
    ],
    commitments: [
      "Chuẩn hóa 100% quy trình phục vụ khách hàng HTVC",
      "Nâng cao trải nghiệm dịch vụ truyền hình gia đình"
    ],
    photoUrl: "https://i.ibb.co/ZzjXpjsX/HTVC-1.webp",
    photoCount: 4,
    memoryCompanyId: "htvc"
  },
  "2013": {
    key: "2013",
    year: "2013",
    cardYearLabel: "2013 - 2016",
    cardYearColor: "text-slate-600 dark:text-slate-300",
    period: "Từ Năm 2013 đến Năm 2016",
    company: "Công ty Cổ phần Phát triển Thể thao Điện tử Việt Nam",
    subCompanies: "(VED, Garena, AirPay)",
    tag: "eSport & Game",
    tagCategory: "gaming",
    tagColor: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700",
    logo: "https://i.ibb.co/BKHcWL5R/Logo-VED.gif",
    fallbackLogo: "https://i.ibb.co/fYPJLfbw/VED.png",
    bannerUrl: "https://i.ibb.co/jknPRhj3/VED.png",
    headerTitle: "Năm 2013 – Garena và hành trình chuyển đổi số",
    highlightText: "Gia nhập Garena, tôi quản lý hoạt động chăm sóc khách hàng trong lĩnh vực game trực tuyến, nơi yêu cầu tốc độ xử lý nhanh, độ chính xác cao và khả năng đáp ứng lượng khách hàng rất lớn. Trong thời gian này, Garena phát triển mạnh với Liên Minh Huyền Thoại, đồng thời mở rộng thành Vietnam Esports và đầu tư vào nhiều lĩnh vực mới như AirPay, Gcafe và Liên Quân Mobile. Tôi có cơ hội đồng hành cùng các dự án ngay từ giai đoạn đầu. Mỗi sản phẩm đều có mô hình vận hành, hành vi người dùng và kỳ vọng khách hàng khác nhau, buộc tôi phải liên tục học hỏi, thích nghi và cập nhật kiến thức để xây dựng các quy trình chăm sóc khách hàng phù hợp với từng lĩnh vực. Môi trường đầy năng động giúp tôi rèn luyện tư duy hệ thống, kỹ năng lãnh đạo đội nhóm và khả năng thích nghi nhanh với thay đổi, vận hành dịch vụ quy mô lớn đến ứng dụng dữ liệu trong quản trị chất lượng và tối ưu hiệu quả hoạt động.",
    cardDescription: "Gia nhập Garena, tôi quản lý hoạt động chăm sóc khách hàng trong lĩnh vực game trực tuyến, nơi yêu cầu tốc độ xử lý nhanh, độ chính xác cao và khả năng đáp ứng lượng khách hàng rất lớn. Trong thời gian này, Garena phát triển mạnh với Liên Minh Huyền Thoại, đồng thời mở rộng thành Vietnam Esports và đầu tư vào nhiều lĩnh vực mới như AirPay, Gcafe và Liên Quân Mobile. Tôi có cơ hội đồng hành cùng các dự án ngay từ giai đoạn đầu. Mỗi sản phẩm đều có mô hình vận hành, hành vi người dùng và kỳ vọng khách hàng khác nhau, buộc tôi phải liên tục học hỏi, thích nghi và cập nhật kiến thức để xây dựng các quy trình chăm sóc khách hàng phù hợp với từng lĩnh vực. Môi trường đầy năng động giúp tôi rèn luyện tư duy hệ thống, kỹ năng lãnh đạo đội nhóm và khả năng thích nghi nhanh với thay đổi, vận hành dịch vụ quy mô lớn đến ứng dụng dữ liệu trong quản trị chất lượng và tối ưu hiệu quả hoạt động.",
    cardTags: ["Trưởng Phòng Dịch vụ Khách hàng", "eSport & Game", "Quản lý 129 nhân sự"],
    cardScope: "(VED, Garena, AirPay)",
    cardRoleTitle: "Trưởng Phòng Dịch vụ Khách hàng",
    paragraphs: [
      "Gia nhập **Garena**, tôi quản lý hoạt động chăm sóc khách hàng trong lĩnh vực game trực tuyến, nơi yêu cầu tốc độ xử lý nhanh, độ chính xác cao và khả năng đáp ứng lượng khách hàng rất lớn.",
      "Trong thời gian này, Garena phát triển mạnh với **Liên Minh Huyền Thoại**, đồng thời mở rộng thành **Vietnam Esports** và đầu tư vào nhiều lĩnh vực mới như **AirPay, Gcafe** và **Liên Quân Mobile**.",
      "Tôi có cơ hội đồng hành cùng các dự án ngay từ giai đoạn đầu. Môi trường đầy năng động giúp tôi rèn luyện tư duy hệ thống, kỹ năng lãnh đạo đội nhóm và khả năng thích nghi nhanh với thay đổi.",
      "Tại Garena, tôi trực tiếp quản lý **129 nhân sự**, xây dựng cơ cấu tổ chức, phát triển đội ngũ quản lý cấp trung, chuẩn hóa quy trình vận hành, thiết lập hệ thống đánh giá hiệu quả công việc và đào tạo nguồn nhân lực kế thừa.",
      "Làm việc trong môi trường tăng trưởng vượt bậc đã giúp tôi rèn luyện khả năng ra quyết định dưới áp lực, xử lý nhanh các tình huống phát sinh, điều phối nguồn lực hiệu quả và liên tục cải tiến quy trình để đáp ứng sự thay đổi của thị trường.",
      "Đây cũng là giai đoạn đặt nền móng cho triết lý quản trị của tôi: **xây dựng hệ thống trước khi mở rộng quy mô, phát triển con người song hành cùng công nghệ và luôn lấy khách hàng làm trung tâm trong mọi quyết định.**"
    ],
    headcount: 130,
    role: "Trưởng Phòng Dịch vụ Khách hàng",
    roleSub: "Trưởng Phòng Dịch vụ Khách hàng",
    industry: "eSport & Game",
    duration: "2013 – 2016 (3 năm)",
    location: "Hồ Chí Minh, Việt Nam",
    managementRole: "Trưởng Phòng Dịch vụ Khách hàng",
    managementHeadcount: "130 nhân sự trực tiếp",
    kpis: [
      { label: "Chuẩn hóa quy trình", percent: 100 },
      { label: "Phản hồi & Hỗ trợ", percent: 80 },
      { label: "Hỗ trợ sự kiện lớn", percent: 70 },
      { label: "Tham gia dự án", percent: 80 }
    ],
    tasks: [
      "Tham gia xây dựng các dự án Sản phẩm mới",
      "Quản lý Đội ngũ và tổ chức Phòng Dịch Vụ Khách Hàng",
      "Xây dựng Quy trình tại Phòng Dịch Vụ Khách Hàng",
      "Xây dựng hệ thống CRM cho các dòng sản phẩm của Cty",
      "Đào tạo đội ngũ Dịch Vụ Khách Hàng và Giao tiếp với khách hàng",
      "Báo cáo tình hình Phòng Dịch Vụ Khách Hàng hàng tháng",
      "Giải quyết Khiếu nại đơn hàng",
      "Đánh giá và tham gia các chương trình MKT",
      "Kiểm tra và đánh giá sản phẩm trước khi cung cấp"
    ],
    projects: [
      "Xây dựng P.CSKH",
      "Thiết lập mục tiêu phòng ban",
      "Quản lý dự án CSKH",
      "Chuẩn hóa quy trình CSKH",
      "Xây dựng hệ thống CRM",
      "Phát triển đào tạo trực tuyến",
      "Thành lập Trung tâm Hỗ trợ Khách hàng"
    ],
    commitments: [
      "SOP quy trình dịch vụ khách hàng đa kênh",
      "Đào tạo & Quản trị năng suất đội ngũ theo chỉ số CSAT & NPS"
    ],
    photoUrl: "https://i.ibb.co/ds1qm1WD/VED-1.webp",
    photoCount: 4,
    memoryCompanyId: "ved"
  },
  "2013-garena": {
    key: "2013-garena",
    year: "2013",
    cardYearLabel: "2013 - 2016",
    cardYearColor: "text-red-600 dark:text-red-400",
    period: "Từ Năm 2013 đến Năm 2016",
    company: "Công ty Cổ phần Phát triển Thể thao Điện tử Việt Nam (Garena)",
    subCompanies: "(Garena, LMHT, FIFA Online, VED)",
    tag: "eSport & Game",
    tagCategory: "gaming",
    tagColor: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800",
    logo: "https://i.ibb.co/h1Md65yV/Garena.png",
    bannerUrl: "https://i.ibb.co/jknPRhj3/VED.png",
    headerTitle: "Năm 2013 – Garena & Thể thao Điện tử (eSports)",
    highlightText: "Gia nhập Garena, tôi quản lý hoạt động chăm sóc khách hàng trong lĩnh vực game trực tuyến quy mô hàng triệu game thủ, nơi yêu cầu tốc độ xử lý nhanh, độ chính xác cao và khả năng đáp ứng lưu lượng truy cập lớn của Liên Minh Huyền Thoại & FIFA Online 3.",
    cardDescription: "Gia nhập Garena, tôi quản lý hoạt động chăm sóc khách hàng trong lĩnh vực game trực tuyến quy mô hàng triệu game thủ, nơi yêu cầu tốc độ xử lý nhanh, độ chính xác cao và khả năng đáp ứng lưu lượng truy cập lớn của Liên Minh Huyền Thoại & FIFA Online 3.",
    cardTags: ["Trưởng Phòng Dịch vụ Khách hàng", "eSport & Game", "Quản lý 129 nhân sự"],
    cardScope: "(Garena, LMHT, FIFA Online)",
    cardRoleTitle: "Trưởng Phòng Dịch vụ Khách hàng",
    paragraphs: [
      "Gia nhập **Garena**, tôi quản lý hoạt động chăm sóc khách hàng trong lĩnh vực game trực tuyến, nơi yêu cầu tốc độ xử lý nhanh, độ chính xác cao và khả năng đáp ứng lượng khách hàng rất lớn.",
      "Trong thời gian này, Garena phát triển mạnh với **Liên Minh Huyền Thoại**, đồng thời mở rộng thành **Vietnam Esports** và đầu tư vào nhiều lĩnh vực mới như **AirPay, Gcafe** và **Liên Quân Mobile**.",
      "Tại Garena, tôi trực tiếp quản lý **129 nhân sự**, xây dựng cơ cấu tổ chức, phát triển đội ngũ quản lý cấp trung, chuẩn hóa quy trình vận hành, thiết lập hệ thống đánh giá hiệu quả công việc và đào tạo nguồn nhân lực kế thừa.",
      "Đây cũng là giai đoạn đặt nền móng cho triết lý quản trị của tôi: **xây dựng hệ thống trước khi mở rộng quy mô, phát triển con người song hành cùng công nghệ và luôn lấy khách hàng làm trung tâm trong mọi quyết định.**"
    ],
    headcount: 130,
    role: "Trưởng Phòng Dịch vụ Khách hàng",
    roleSub: "Trưởng Phòng Dịch vụ Khách hàng",
    industry: "eSport & Game",
    duration: "2013 – 2016 (3 năm)",
    location: "Hồ Chí Minh, Việt Nam",
    managementRole: "Trưởng Phòng Dịch vụ Khách hàng",
    managementHeadcount: "130 nhân sự trực tiếp",
    kpis: [
      { label: "Chuẩn hóa quy trình CSKH", percent: 100 },
      { label: "Phản hồi & Hỗ trợ Game thủ", percent: 92 },
      { label: "Hỗ trợ sự kiện giải đấu lớn (VCS)", percent: 95 },
      { label: "Xây dựng hệ thống CRM CSKH", percent: 90 }
    ],
    tasks: [
      "Quản lý Đội ngũ và tổ chức Phòng Dịch Vụ Khách Hàng Garena",
      "Xây dựng quy trình xử lý khiếu nại tài khoản và nạp thẻ game",
      "Xây dựng hệ thống CRM đa kênh cho các dòng sản phẩm của Cty",
      "Đào tạo đội ngũ Dịch Vụ Khách Hàng và Giao tiếp với game thủ",
      "Điều phối hỗ trợ CSKH tại các sự kiện giải đấu Esports quy mô quốc gia",
      "Báo cáo chất lượng dịch vụ và phân tích hành vi người dùng hàng tháng"
    ],
    projects: [
      "Thành lập Trung tâm Hỗ trợ Khách hàng Garena",
      "Xây dựng hệ thống CRM CSKH Đa kênh",
      "Chuẩn hóa quy trình hỗ trợ Game thủ LMHT & FO3",
      "Đào tạo đội ngũ CSKH chuyên nghiệp"
    ],
    commitments: [
      "SOP quy trình dịch vụ khách hàng đa kênh tốc độ cao",
      "Đào tạo & Quản trị năng suất đội ngũ theo chỉ số CSAT & NPS"
    ],
    photoUrl: "https://i.ibb.co/ds1qm1WD/VED-1.webp",
    photoCount: 4,
    memoryCompanyId: "ved"
  },
  "2013-gcafe": {
    key: "2013-gcafe",
    year: "2013",
    cardYearLabel: "2013 - 2016",
    cardYearColor: "text-emerald-600 dark:text-emerald-400",
    period: "Từ Năm 2013 đến Năm 2016",
    company: "Hệ thống Quản lý Phòng máy Gcafe (Cyber Cafe Network)",
    subCompanies: "(Phần mềm Quản lý & Bản quyền Game Phòng máy)",
    tag: "Phần mềm Phòng máy",
    tagCategory: "gaming",
    tagColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    logo: "https://i.ibb.co/FkWk3s4W/GCafe.png",
    bannerUrl: "https://i.ibb.co/jknPRhj3/VED.png",
    headerTitle: "Năm 2013 – Gcafe & Mạng lưới Phòng máy Toàn quốc",
    highlightText: "Đồng hành xây dựng và vận hành dịch vụ khách hàng chuyên nghiệp hỗ trợ hàng chục nghìn chủ phòng máy Internet Cyber Cafe trên toàn quốc sử dụng giải pháp phần mềm quản lý và cập nhật game tự động Gcafe.",
    cardDescription: "Đồng hành xây dựng và vận hành dịch vụ khách hàng chuyên nghiệp hỗ trợ hàng chục nghìn chủ phòng máy Internet Cyber Cafe trên toàn quốc sử dụng giải pháp phần mềm quản lý và cập nhật game tự động Gcafe.",
    cardTags: ["Quản trị Dịch vụ Đối tác", "Gcafe Network", "Hỗ trợ Kỹ thuật 24/7"],
    cardScope: "(Phòng máy Gcafe Cyber toàn quốc)",
    cardRoleTitle: "Trưởng Phòng Dịch vụ Khách hàng",
    paragraphs: [
      "Gcafe là nền tảng quản lý phòng máy số 1 tại Việt Nam thời điểm đó, kết nối hàng chục nghìn điểm đại lý Internet Cyber Cafe trên khắp 63 tỉnh thành.",
      "Tôi chịu trách nhiệm thiết lập đường dây nóng hỗ trợ kỹ thuật và chăm sóc khách hàng doanh nghiệp B2B (Chủ phòng máy), xử lý kịp thời các sự cố phần mềm, cấp quyền bản quyền game và đồng bộ dữ liệu.",
      "Tối ưu hóa quy trình phối hợp giữa bộ phận CSKH và đội ngũ Kỹ thuật viên hiện trường (Onsite Technicians), giúp rút ngắn thời gian xử lý sự cố từ hàng giờ xuống chỉ còn dưới 15 phút.",
      "Xây dựng tiêu chuẩn SLA nghiêm ngặt và cơ chế phản hồi định kỳ, tạo sự gắn kết bền vững giữa công ty và các đối tác phòng máy trọng điểm."
    ],
    headcount: 85,
    role: "Trưởng Phòng Dịch vụ Khách hàng",
    roleSub: "Trưởng Phòng Dịch vụ Khách hàng",
    industry: "Phần mềm & Hạ tầng Cyber",
    duration: "2013 – 2016",
    location: "Hồ Chí Minh, Việt Nam",
    managementRole: "Trưởng Phòng Dịch vụ Khách hàng",
    managementHeadcount: "85 nhân sự bộ phận kỹ thuật & CSKH B2B",
    kpis: [
      { label: "Tỷ lệ xử lý sự cố phòng máy < 15p", percent: 96 },
      { label: "Độ hài lòng chủ phòng máy B2B", percent: 94 },
      { label: "Thời gian uptime tổng đài hỗ trợ 24/7", percent: 99 },
      { label: "Chuẩn hóa quy trình phân luồng Ticket", percent: 95 }
    ],
    tasks: [
      "Xây dựng tổng đài chuyên biệt hỗ trợ chủ phòng máy Gcafe toàn quốc",
      "Thiết lập quy trình tiếp nhận và phân phối sự cố kỹ thuật sang đội ngũ Onsite",
      "Giám sát và duy trì cam kết SLA hỗ trợ đại lý phòng máy 24/7",
      "Đào tạo kỹ năng tư vấn giải pháp và xử lý khiếu nại B2B cho nhân viên CSKH",
      "Khảo sát định kỳ mức độ hài lòng của mạng lưới đại lý Gcafe"
    ],
    projects: [
      "Hệ thống Tổng đài Hỗ trợ Kỹ thuật Gcafe 24/7",
      "Quy trình phối hợp CSKH - Onsite Tech thời gian thực",
      "Cổng tiếp nhận yêu cầu hỗ trợ phòng máy trực tuyến"
    ],
    commitments: [
      "Duy trì hỗ trợ kỹ thuật liên tục 24/7 không gián đoạn cho chủ phòng máy",
      "Đảm bảo thời gian phản hồi nhanh nhất và thái độ phục vụ tận tâm"
    ],
    photoUrl: "https://i.ibb.co/ds1qm1WD/VED-1.webp",
    photoCount: 3,
    memoryCompanyId: "ved"
  },
  "2013-shopee": {
    key: "2013-shopee",
    year: "2013",
    cardYearLabel: "2013 - 2016",
    cardYearColor: "text-orange-600 dark:text-orange-400",
    period: "Từ Năm 2013 đến Năm 2016",
    company: "Sàn Thương mại Điện tử Shopee (SEA Group)",
    subCompanies: "(Shopee Vietnam / E-Commerce Operations)",
    tag: "Thương mại điện tử",
    tagCategory: "ecommerce",
    tagColor: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800",
    logo: "https://i.ibb.co/BSVS4xf/Shopee.png",
    bannerUrl: "https://i.ibb.co/jknPRhj3/VED.png",
    headerTitle: "Năm 2013 – Shopee & Nền tảng Thương mại Điện tử",
    highlightText: "Tham gia chuẩn bị và đặt nền móng vận hành dịch vụ khách hàng cho giai đoạn sơ khai của sàn thương mại điện tử Shopee tại Việt Nam, thiết lập quy trình giải quyết khiếu nại đơn hàng và tương tác giữa Người mua và Người bán.",
    cardDescription: "Tham gia chuẩn bị và đặt nền móng vận hành dịch vụ khách hàng cho giai đoạn sơ khai của sàn thương mại điện tử Shopee tại Việt Nam, thiết lập quy trình giải quyết khiếu nại đơn hàng và tương tác giữa Người mua và Người bán.",
    cardTags: ["E-Commerce CS", "SOP Đơn hàng", "Trải nghiệm Khách hàng"],
    cardScope: "(Shopee E-Commerce Operations)",
    cardRoleTitle: "Trưởng Phòng Dịch vụ Khách hàng",
    paragraphs: [
      "Trong giai đoạn Tập đoàn SEA mở rộng chiến lược sang Thương mại Điện tử với thương hiệu **Shopee**, tôi trực tiếp tham gia đóng góp xây dựng mô hình chăm sóc khách hàng thích ứng với tính chất giao dịch trực tuyến hai chiều (C2C / B2C).",
      "Xây dựng quy trình tiếp nhận, xử lý khiếu nại đơn hàng, giao vận, hoàn tiền và bảo vệ quyền lợi người tiêu dùng theo tiêu chuẩn an toàn cao nhất.",
      "Thiết lập bộ tiêu chuẩn giao tiếp đa kênh (In-app Chat, Email, Hotline) để hỗ trợ cả Người mua (Buyer) và Người bán (Seller) xuyên suốt hành trình mua sắm.",
      "Kinh nghiệm tại giai đoạn này đã bồi đắp tư duy vận hành số hóa tốc độ cao, khả năng giải quyết các tranh chấp phức tạp và thấu hiểu sâu sắc hành vi mua sắm thương mại điện tử."
    ],
    headcount: 90,
    role: "Trưởng Phòng Dịch vụ Khách hàng",
    roleSub: "Trưởng Phòng Dịch vụ Khách hàng",
    industry: "Thương mại Điện tử (E-Commerce)",
    duration: "2013 – 2016",
    location: "Hồ Chí Minh, Việt Nam",
    managementRole: "Trưởng Phòng Dịch vụ Khách hàng",
    managementHeadcount: "90 nhân sự vận hành CSKH sàn TMĐT",
    kpis: [
      { label: "Tỷ lệ phản hồi In-app Chat < 60s", percent: 95 },
      { label: "Giải quyết khiếu nại hoàn tiền đúng SLA", percent: 92 },
      { label: "Chỉ số hài lòng khách hàng CSAT", percent: 90 },
      { label: "Chuẩn hóa kịch bản CSKH đa kênh", percent: 98 }
    ],
    tasks: [
      "Thiết lập quy trình CSKH cho Người mua và Người bán trên sàn TMĐT",
      "Xây dựng kịch bản xử lý khiếu nại vận chuyển, đổi trả hàng và thanh toán",
      "Phối hợp với các đơn vị vận chuyển đối tác để tối ưu hóa thời gian xử lý khiếu nại",
      "Đào tạo nghiệp vụ giải quyết tranh chấp thương mại điện tử cho đội ngũ CSKH",
      "Phân tích dữ liệu khiếu nại để đề xuất cải tiến trải nghiệm ứng dụng"
    ],
    projects: [
      "Quy trình Xử lý Khiếu nại Giao vận & Đổi trả Hàng",
      "Hệ thống CSKH Chatbot & Live Chat tích hợp App Shopee",
      "Bộ tiêu chuẩn dịch vụ khách hàng Người mua & Người bán"
    ],
    commitments: [
      "Bảo vệ quyền lợi chính đáng của Người tiêu dùng và Người bán",
      "Không ngừng nâng cao tốc độ phản hồi và sự tiện lợi trong tương tác"
    ],
    photoUrl: "https://i.ibb.co/ds1qm1WD/VED-1.webp",
    photoCount: 3,
    memoryCompanyId: "ved"
  },
  "2014-airpay": {
    key: "2014-airpay",
    year: "2013",
    cardYearLabel: "2013 - 2016",
    cardYearColor: "text-cyan-600 dark:text-cyan-400",
    period: "Từ Năm 2013 đến Năm 2016",
    company: "Ví điện tử & Cổng thanh toán AirPay (ShopeePay)",
    subCompanies: "(AirPay / SEA Group FinTech & Payments)",
    tag: "FinTech & Thanh toán số",
    tagCategory: "fintech",
    tagColor: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800",
    logo: "https://i.ibb.co/LdYv3TJy/Shopee-Paye.png",
    bannerUrl: "https://i.ibb.co/jknPRhj3/VED.png",
    headerTitle: "Năm 2013 – AirPay & Kỷ nguyên FinTech Thanh toán số",
    highlightText: "Xây dựng và điều hành bộ phận Chăm sóc Khách hàng cho Ví điện tử AirPay (tiền thân của ShopeePay), thiết lập các tiêu chuẩn khắt khe về an toàn bảo mật thông tin tài chính và xử lý giao dịch tức thời.",
    cardDescription: "Xây dựng và điều hành bộ phận Chăm sóc Khách hàng cho Ví điện tử AirPay (tiền thân của ShopeePay), thiết lập các tiêu chuẩn khắt khe về an toàn bảo mật thông tin tài chính và xử lý giao dịch tức thời.",
    cardTags: ["FinTech CSKH", "Bảo mật Giao dịch", "Ví điện tử AirPay"],
    cardScope: "(AirPay & Cổng thanh toán đại lý)",
    cardRoleTitle: "Trưởng Phòng Dịch vụ Khách hàng",
    paragraphs: [
      "Ra mắt vào năm **2013**, **AirPay** đánh dấu bước tiến chiến lược của Tập đoàn vào lĩnh vực Công nghệ Tài chính (FinTech) và Thanh toán không tiền mặt tại Việt Nam.",
      "Tôi trực tiếp xây dựng bộ máy Dịch vụ Khách hàng đáp ứng các tiêu chuẩn bảo mật tài chính ngân hàng, bảo vệ tài khoản ví điện tử và kiểm soát giao dịch nghi vấn gian lận.",
      "Thiết lập đường dây nóng ưu tiên giải quyết sự cố nạp/rút tiền, thanh toán hóa đơn điện/nước, nạp thẻ game và thanh toán dịch vụ ăn uống.",
      "Đây là cột mốc quan trọng giúp tôi hoàn thiện chuyên môn sâu về vận hành CSKH trong ngành FinTech, tạo nền tảng vững chắc cho các giai đoạn quản trị tại MoMo và Finviet sau này."
    ],
    headcount: 75,
    role: "Trưởng Phòng Dịch vụ Khách hàng",
    roleSub: "Trưởng Phòng Dịch vụ Khách hàng",
    industry: "Công nghệ Tài chính (FinTech)",
    duration: "2013 – 2016",
    location: "Hồ Chí Minh, Việt Nam",
    managementRole: "Trưởng Phòng Dịch vụ Khách hàng",
    managementHeadcount: "75 nhân sự chuyên trách CSKH Tài chính & Bảo mật",
    kpis: [
      { label: "Giải quyết sự cố giao dịch ví trong 24h", percent: 98 },
      { label: "Bảo mật thông tin tài khoản ví 100%", percent: 100 },
      { label: "Chỉ số hài lòng khách hàng CSAT", percent: 94 },
      { label: "SLA tiếp nhận cuộc gọi nóng < 20s", percent: 93 }
    ],
    tasks: [
      "Thiết lập quy trình tiếp nhận và xử lý sự cố giao dịch ví điện tử AirPay",
      "Xây dựng cơ chế phối hợp với bộ phận Đối soát - Kế toán và Ngân hàng liên kết",
      "Đào tạo nhân viên về quy định bảo mật thông tin tài khoản và phòng chống gian lận",
      "Giám sát và báo cáo chất lượng dịch vụ khách hàng định kỳ cho Ban Giám Đốc",
      "Phát triển các kênh hỗ trợ khách hàng tự động qua ứng dụng và website AirPay"
    ],
    projects: [
      "Quy trình Xử lý Khiếu nại Giao dịch FinTech Chuẩn Ngân hàng",
      "Hệ thống Quản lý Ticket Hỗ trợ Đại lý AirPay Toàn quốc",
      "Chương trình Đào tạo Bảo mật & Nghiệp vụ Thanh toán Số"
    ],
    commitments: [
      "Bảo mật tuyệt đối thông tin và an toàn tài sản của người dùng ví",
      "Minh bạch, công bằng và nhanh chóng trong mọi nghiệp vụ đối soát tài chính"
    ],
    photoUrl: "https://i.ibb.co/ds1qm1WD/VED-1.webp",
    photoCount: 4,
    memoryCompanyId: "ved"
  },
  "2016": {
    key: "2016",
    year: "2016",
    cardYearLabel: "2016 - 2018",
    cardYearColor: "text-red-600 dark:text-red-400",
    period: "Từ Năm 2016 đến Năm 2018",
    company: "Công ty Bảo hiểm nhân thọ Prudential",
    subCompanies: "(Khu vực Việt Nam)",
    tag: "Bảo hiểm",
    tagCategory: "insurance",
    tagColor: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800",
    logo: "https://i.ibb.co/XfpQphWF/Prudential.png",
    bannerUrl: "https://i.ibb.co/whFY0YV0/Prudentinal.png",
    headerTitle: "Năm 2016 – Prudential Việt Nam",
    highlightText: "Tại Prudential, tôi có cơ hội làm việc trong lĩnh vực bảo hiểm – một ngành dịch vụ đòi hỏi tính chính xác, minh bạch và mức độ tin cậy rất cao. Thời gian này giúp tôi hiểu sâu hơn về quản trị trải nghiệm khách hàng, quản lý chất lượng dịch vụ và xây dựng niềm tin bền vững thông qua quy trình chuyên nghiệp và sự đồng cảm trong từng điểm chạm với khách hàng.",
    cardDescription: "Tại Prudential, tôi có cơ hội làm việc trong lĩnh vực bảo hiểm – một ngành dịch vụ đòi hỏi tính chính xác, minh bạch và mức độ tin cậy rất cao. Thời gian này giúp tôi hiểu sâu hơn về quản trị trải nghiệm khách hàng, quản lý chất lượng dịch vụ và xây dựng niềm tin bền vững thông qua quy trình chuyên nghiệp và sự đồng cảm trong từng điểm chạm với khách hàng.",
    cardTags: ["Trưởng Phòng CallCenter", "Bảo hiểm", "Quản lý Call Center"],
    cardScope: "(Khu vực Việt Nam)",
    cardRoleTitle: "Trưởng Phòng CallCenter",
    paragraphs: [
      "Tại Prudential, tôi có cơ hội làm việc trong lĩnh vực bảo hiểm – một ngành dịch vụ đòi hỏi tính chính xác, minh bạch và mức độ tin cậy rất cao.",
      "Thời gian này giúp tôi hiểu sâu hơn về quản trị trải nghiệm khách hàng, quản lý chất lượng dịch vụ và xây dựng niềm tin bền vững thông qua quy trình chuyên nghiệp và sự đồng cảm trong từng điểm chạm với khách hàng."
    ],
    headcount: 12,
    role: "Trưởng Phòng CallCenter",
    roleSub: "Trưởng Phòng CallCenter",
    industry: "Bảo hiểm",
    duration: "2016 – 2018 (2 năm)",
    location: "Hồ Chí Minh, Việt Nam",
    managementRole: "Trưởng Phòng CallCenter",
    managementHeadcount: "12 nhân sự trực tiếp",
    kpis: [
      { label: "Quản lý Call Center", percent: 90 },
      { label: "Thương mại điện tử BH", percent: 80 },
      { label: "Mua bảo hiểm trực tuyến", percent: 75 }
    ],
    tasks: [
      "Quản lý hệ thống Callcenter của Prudential",
      "Sắp xếp nhân sự cho hệ thống mới",
      "Xây dựng và phối hợp đưa E-commerce kết nối hệ thống Callcenter",
      "Xây dựng quy trình quản trị tư vấn qua kênh Videocall",
      "Xây dựng và chỉnh sửa lại hệ thống BCP",
      "Phối hợp giải quyết quyền lợi đáo hạn và bảo hiểm khách hàng"
    ],
    projects: [
      "Quản lý dự án CSKH",
      "Thúc đẩy cải tiến sản phẩm",
      "Tối ưu hóa kênh hỗ trợ",
      "Triển khai tự động hóa"
    ],
    commitments: [
      "Đảm bảo tính chính xác và bảo mật tuyệt đối cho dữ liệu hợp đồng",
      "Duy trì tiêu chuẩn hỗ trợ khách hàng bảo hiểm cao cấp"
    ],
    photoUrl: "https://i.ibb.co/CK2Y62Zy/Prudential-1.webp",
    photoCount: 7,
    memoryCompanyId: "prudential"
  },
  "2018": {
    key: "2018",
    year: "2018",
    cardYearLabel: "2018 - 2021",
    cardYearColor: "text-pink-600 dark:text-pink-400",
    period: "Từ Năm 2018 đến Năm 2021",
    company: "Công ty Cổ Phần Mservice (Ví điện tử MoMo)",
    subCompanies: "(Ví điện tử MoMo)",
    tag: "FinTech",
    tagCategory: "fintech",
    tagColor: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-800",
    logo: "https://i.ibb.co/k2QtrgTw/Momo.png",
    bannerUrl: "https://i.ibb.co/GQLRGwrw/Momo.png",
    headerTitle: "Năm 2018 – MoMo",
    highlightText: "Gia nhập MoMo, tôi tiếp tục mở rộng kinh nghiệm trong lĩnh vực tài chính số. Tôi tập trung tối ưu quy trình hỗ trợ khách hàng, nâng cao hiệu quả vận hành, ứng dụng công nghệ vào quản trị dịch vụ và cải thiện trải nghiệm khách hàng trên nền tảng số.",
    cardDescription: "Gia nhập MoMo, tôi tiếp tục mở rộng kinh nghiệm trong lĩnh vực tài chính số. Tôi tập trung tối ưu quy trình hỗ trợ khách hàng, nâng cao hiệu quả vận hành, ứng dụng công nghệ vào quản trị dịch vụ và cải thiện trải nghiệm khách hàng trên nền tảng số.",
    cardTags: ["Trưởng Phòng Dịch vụ Khách hàng", "Ví điện tử MoMo", "Hệ thống CRM"],
    cardScope: "(Ví điện tử MoMo)",
    cardRoleTitle: "Trưởng Phòng Dịch vụ Khách hàng",
    paragraphs: [
      "Gia nhập MoMo, tôi tiếp tục mở rộng kinh nghiệm trong lĩnh vực tài chính số.",
      "Tôi tập trung tối ưu quy trình hỗ trợ khách hàng, nâng cao hiệu quả vận hành, ứng dụng công nghệ vào quản trị dịch vụ và cải thiện trải nghiệm khách hàng trên nền tảng số."
    ],
    headcount: 60,
    role: "Trưởng Phòng Dịch vụ Khách hàng",
    roleSub: "Trưởng Phòng Dịch vụ Khách hàng",
    industry: "FinTech",
    duration: "2018 – 2021 (3 năm)",
    location: "Hồ Chí Minh, Việt Nam",
    managementRole: "Trưởng Phòng Dịch vụ Khách hàng",
    managementHeadcount: "60 nhân sự trực tiếp",
    kpis: [
      { label: "Chuẩn hóa quy trình", percent: 100 },
      { label: "Hỗ trợ cộng đồng", percent: 80 },
      { label: "Hỗ trợ sự kiện lớn", percent: 70 },
      { label: "Hoàn thành dự án", percent: 80 }
    ],
    tasks: [
      "Quản lý phòng Dịch Vụ Khách Hàng đa kênh (Ví điện tử MoMo)",
      "Xây dựng hệ thống CRM - Quan hệ khách hàng",
      "Xây dựng và cải thiện quy trình phối hợp cùng pháp lý",
      "Đào tạo và cải thiện khả năng Dịch Vụ Khách Hàng của nhân viên",
      "Chịu trách nhiệm toàn bộ KPIs của phòng",
      "Đánh giá và nâng cấp trải nghiệm khách hàng",
      "Hỗ trợ đối tác và tham gia dự án kết nối Ví điện tử",
      "Thành lập trung tâm hỗ trợ khách hàng",
      "Quản lý BPO – Mắt Bảo"
    ],
    projects: [
      "Xây dựng P.CSKH",
      "Thiết lập mục tiêu phòng ban",
      "Quản lý dự án CSKH",
      "Thúc đẩy cải tiến sản phẩm",
      "Chuẩn hóa quy trình CSKH",
      "Triển khai tự động hóa",
      "Xây dựng hệ thống CRM",
      "Phân tích & Báo cáo",
      "Khảo sát & Đánh giá khách hàng",
      "Thành lập Trung tâm Hỗ trợ Khách hàng"
    ],
    commitments: [
      "Chuẩn hóa 100% quy trình xử lý tra soát ví điện tử",
      "Nâng cao chỉ số CSAT & NPS toàn hệ thống MoMo"
    ],
    photoUrl: "https://i.ibb.co/S7ySGnvC/Momo-1.webp",
    photoCount: 8,
    memoryCompanyId: "momo"
  },
  "2023": {
    key: "2023",
    year: "2023",
    cardYearLabel: "2023 - 2024",
    cardYearColor: "text-amber-500 dark:text-amber-400",
    period: "Từ Năm 2023 đến Năm 2024",
    company: "Công ty Cổ Phần Công Nghệ Finviet",
    subCompanies: "(Ví điện tử ECO)",
    tag: "FinTech",
    tagCategory: "fintech",
    tagColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    logo: "https://i.ibb.co/7NtSSz4d/Finviet.png",
    bannerUrl: "https://i.ibb.co/cSXPhWcp/Finviet.png",
    headerTitle: "Năm 2023 – Ví ECO",
    highlightText: "Tại Ví ECO, tôi tiếp tục phát triển chuyên môn trong lĩnh vực tài chính, nơi mọi hoạt động đều đặt yêu cầu cao về tính chính xác, minh bạch và sự tin cậy. Giai đoạn này giúp tôi hoàn thiện hơn tư duy xây dựng hệ thống dịch vụ khách hàng hiện đại, kết hợp giữa quy trình, công nghệ và trải nghiệm người dùng.",
    cardDescription: "Tại Ví ECO, tôi tiếp tục phát triển chuyên môn trong lĩnh vực tài chính, nơi mọi hoạt động đều đặt yêu cầu cao về tính chính xác, minh bạch và sự tin cậy. Giai đoạn này giúp tôi hoàn thiện hơn tư duy xây dựng hệ thống dịch vụ khách hàng hiện đại, kết hợp giữa quy trình, công nghệ và trải nghiệm người dùng.",
    cardTags: ["Trưởng Phòng Dịch vụ Khách hàng", "FinTech", "Xây dựng hệ thống CRM"],
    cardScope: "(Ví điện tử ECO)",
    cardRoleTitle: "Trưởng Phòng Dịch vụ Khách hàng",
    paragraphs: [
      "Tại Ví ECO, tôi tiếp tục phát triển chuyên môn trong lĩnh vực tài chính, nơi mọi hoạt động đều đặt yêu cầu cao về tính chính xác, minh bạch và sự tin cậy.",
      "Giai đoạn này giúp tôi hoàn thiện hơn tư duy xây dựng hệ thống dịch vụ khách hàng hiện đại, kết hợp giữa quy trình, công nghệ và trải nghiệm người dùng."
    ],
    headcount: 17,
    role: "Trưởng Phòng Dịch vụ Khách hàng",
    roleSub: "Trưởng Phòng Dịch vụ Khách hàng",
    industry: "FinTech",
    duration: "2023 – 2024 (1 năm)",
    location: "Hồ Chí Minh, Việt Nam",
    managementRole: "Trưởng Phòng Dịch vụ Khách hàng",
    managementHeadcount: "17 nhân sự trực tiếp",
    kpis: [
      { label: "Chuẩn hóa quy trình", percent: 100 },
      { label: "Hỗ trợ cộng đồng", percent: 80 },
      { label: "Hỗ trợ sự kiện lớn", percent: 70 },
      { label: "Hoàn thành dự án", percent: 80 }
    ],
    tasks: [
      "Quản lý và giám sát đội ngũ Dịch Vụ Khách Hàng",
      "Theo dõi, phân bổ cuộc gọi đến cho các thành viên",
      "Đánh giá và huấn luyện nhân viên Dịch Vụ Khách Hàng",
      "Lập kế hoạch và lịch trình Dịch Vụ Khách Hàng",
      "Xử lý những trở ngại của nhân viên",
      "Xử lý khiếu nại của khách hàng và trao đổi sản phẩm",
      "Quản lý yêu cầu khách hàng đa kênh (Email, Fax, Phone, Chat)",
      "Khảo sát sự hài lòng của khách hàng",
      "Thực hiện nhiệm vụ từ Ban Giám Đốc",
      "Nghe ghi âm và định hướng chiến lược đào tạo"
    ],
    projects: [
      "Xây dựng P.CSKH",
      "Thiết lập mục tiêu phòng ban",
      "Chuẩn hóa quy trình CSKH",
      "Tối ưu hóa kênh hỗ trợ",
      "Triển khai tự động hóa",
      "Quản lý chiến dịch Outbound",
      "Xây dựng hệ thống CRM",
      "Phân tích & Báo cáo",
      "Khảo sát & Đánh giá khách hàng",
      "Xây dựng AI Bot",
      "Phát triển đào tạo trực tuyến"
    ],
    commitments: [
      "Xây dựng dịch vụ CSKH tài chính chuyên nghiệp và minh bạch",
      "100% chuẩn hóa quy trình tiếp nhận và giải quyết yêu cầu"
    ],
    photoUrl: "https://i.ibb.co/Rp4jmTWF/Finviet-1.webp",
    photoCount: 1,
    memoryCompanyId: "finviet"
  },
  "2026": {
    key: "2026",
    year: "2026",
    cardYearLabel: "2026 - Hiện tại",
    cardYearColor: "text-indigo-500 dark:text-indigo-400",
    period: "Từ Năm 2026 đến Hiện tại (2026 - Hiện tại)",
    company: "Sẵn sàng cho thử thách mới (2026+)",
    subCompanies: "(Head of CS / CS Director - FinTech, Bảo hiểm, Công nghệ)",
    tag: "Lãnh đạo Chiến lược",
    tagCategory: "strategy",
    tagColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
    logo: "https://i.ibb.co/G4QnNzWb/Power-Service.png",
    bannerUrl: "https://i.ibb.co/fYVwSxRW/T-m-C-h-i.png",
    headerTitle: "Năm 2026 – Sẵn sàng cho thử thách mới",
    highlightText: "Sẵn sàng đảm nhận vị trí Trưởng phòng Dịch vụ Khách hàng (Head of CS) hoặc Giám đốc Trải nghiệm Khách hàng (CS Director) tại các doanh nghiệp Công nghệ, FinTech, Bảo hiểm. Định hướng ứng dụng AI Bot, tự động hóa CRM và nâng tầm trải nghiệm khách hàng xuất sắc.",
    cardDescription: "Sẵn sàng đảm nhận vị trí Trưởng phòng Dịch vụ Khách hàng (Head of CS) hoặc Giám đốc Trải nghiệm Khách hàng (CS Director) tại các doanh nghiệp Công nghệ, FinTech, Bảo hiểm. Định hướng ứng dụng AI Bot, tự động hóa CRM và nâng tầm trải nghiệm khách hàng xuất sắc.",
    cardTags: ["AI Automation 2026+", "Chiến lược CX Toàn diện", "Lãnh đạo Cấp cao"],
    cardScope: "(Technology & FinTech 2026+)",
    cardRoleTitle: "Head of CS / CS Director",
    paragraphs: [
      "Sẵn sàng đảm nhận vị trí Trưởng phòng Dịch vụ Khách hàng (Head of CS) hoặc Giám đốc Trải nghiệm Khách hàng (CS Director) tại các doanh nghiệp Công nghệ, FinTech, Bảo hiểm.",
      "Định hướng ứng dụng AI Bot, tự động hóa CRM và nâng tầm trải nghiệm khách hàng xuất sắc."
    ],
    headcount: 100,
    role: "Head of CS / CS Director",
    roleSub: "Lãnh đạo cấp phòng ban / Chiến lược gia",
    industry: "Công nghệ / Chuyển đổi số",
    duration: "2026 – Hiện tại",
    location: "Hồ Chí Minh, Việt Nam",
    managementRole: "Lãnh đạo cấp phòng ban / Chiến lược gia",
    managementHeadcount: "Lãnh đạo cấp phòng ban / Chiến lược gia",
    kpis: [
      { label: "Sẵn sàng vận hành 24/7", percent: 100 },
      { label: "Ứng dụng AI Chatbot & Automation", percent: 98 },
      { label: "Tối ưu hóa chỉ số CSAT / NPS", percent: 98 },
      { label: "Chuẩn hóa quy trình SOP 2026", percent: 95 }
    ],
    tasks: [
      "Hoạch định & Thực thi chiến lược Trải nghiệm Khách hàng (CX Strategy 2026+)",
      "Tích hợp công nghệ Generative AI & Automation CRM thế hệ mới",
      "Chuẩn hóa & Tối ưu hóa quy trình vận hành Contact Center / Call Center",
      "Xây dựng bộ chỉ số KPI, CSAT, NPS, FCR chuẩn quốc tế cho bộ phận CSKH",
      "Đào tạo, huấn luyện & Phát triển đội ngũ lãnh đạo kế thừa CSKH",
      "Quản trị rủi ro, xử lý khiếu nại phức tạp & Kết nối đa kênh tự động"
    ],
    projects: [
      "Chiến lược CX Strategy 2026+",
      "Tích hợp Generative AI vào CSKH",
      "Tự động hóa CRM & Omnichannel",
      "Đào tạo Lãnh đạo CSKH Kế thừa"
    ],
    commitments: [
      "Sẵn sàng tạo dựng đột phá trải nghiệm khách hàng cho doanh nghiệp",
      "Ứng dụng AI nâng cao năng suất và chỉ số hài lòng khách hàng"
    ],
    photoUrl: "https://i.ibb.co/wNTXx871/T-m-Job.jpg",
    photoCount: 1
  }
};

const TIMELINE_ORDER = [
  "2003",
  "2007",
  "2011",
  "2013-garena",
  "2013-gcafe",
  "2013-shopee",
  "2014-airpay",
  "2016",
  "2018",
  "2023",
  "2026"
];

export interface InfographicTimelineItem {
  key: string;
  milestoneKey: string;
  yearLabel: string;
  hexColor: string;
  underlineColor: string;
  companyName: string;
  roleTitle: string;
  description: string;
  iconType: string;
  actionTitleVi: string;
  actionTitleEn: string;
  bgLight: string;
  bgDark: string;
}

const INFOGRAPHIC_TIMELINE_ITEMS: InfographicTimelineItem[] = [
  {
    key: "2003",
    milestoneKey: "2003",
    yearLabel: "2003",
    hexColor: "#0066FF",
    underlineColor: "#0066FF",
    companyName: "MobiFone",
    roleTitle: "Tổng đài viên (Trưởng nhóm từ 2007)",
    description: "Khởi đầu tại MobiFone, được đào tạo bài bản về dịch vụ khách hàng.",
    iconType: "phone",
    actionTitleVi: "Khởi động kế hoạch",
    actionTitleEn: "Plan Initiation",
    bgLight: "bg-sky-50/90 border-sky-200/90 text-sky-950",
    bgDark: "dark:bg-sky-950/40 dark:border-sky-800/70 dark:text-sky-100"
  },
  {
    key: "2007",
    milestoneKey: "2007",
    yearLabel: "2007",
    hexColor: "#7C4DFF",
    underlineColor: "#7C4DFF",
    companyName: "Viễn Liên V247",
    roleTitle: "Trưởng Nhóm CSKH",
    description: "Phát triển năng lực quản lý đội ngũ, giám sát chất lượng dịch vụ.",
    iconType: "v247",
    actionTitleVi: "Tuyển dụng nhân sự",
    actionTitleEn: "Talent Recruitment",
    bgLight: "bg-purple-50/90 border-purple-200/90 text-purple-950",
    bgDark: "dark:bg-purple-950/40 dark:border-purple-800/70 dark:text-purple-100"
  },
  {
    key: "2011",
    milestoneKey: "2011",
    yearLabel: "2011",
    hexColor: "#00C853",
    underlineColor: "#00C853",
    companyName: "LBC - HTV Cable",
    roleTitle: "Trưởng Phòng Dịch vụ Khách hàng",
    description: "Bước ngoặt lớn sang vai trò nhà quản trị toàn diện Phòng CSKH.",
    iconType: "lbc",
    actionTitleVi: "Phát triển thương hiệu LB",
    actionTitleEn: "LB Brand Growth",
    bgLight: "bg-emerald-50/90 border-emerald-200/90 text-emerald-950",
    bgDark: "dark:bg-emerald-950/40 dark:border-emerald-800/70 dark:text-emerald-100"
  },
  {
    key: "2013",
    milestoneKey: "2013",
    yearLabel: "2013",
    hexColor: "#ED1C24",
    underlineColor: "#ED1C24",
    companyName: "VED (Garena / AirPay / Gcafe / Shopee)",
    roleTitle: "Trưởng Phòng Dịch vụ Khách hàng",
    description: "Quản lý hoạt động CSKH quy mô lớn, chuyển đổi số đa kênh game eSports, Gcafe, AirPay, Shopee.",
    iconType: "garena",
    actionTitleVi: "Thể thao Điện tử & Chuyển đổi số",
    actionTitleEn: "eSports & Digital Transformation",
    bgLight: "bg-red-50/90 border-red-200/90 text-red-950",
    bgDark: "dark:bg-red-950/40 dark:border-red-800/70 dark:text-red-100"
  },
  {
    key: "2016",
    milestoneKey: "2016",
    yearLabel: "2016",
    hexColor: "#FF5252",
    underlineColor: "#FF5252",
    companyName: "Prudential",
    roleTitle: "Trưởng Phòng CallCenter",
    description: "Quản lý hiệu suất CallCenter bảo hiểm, tiên phong triển khai Videocall.",
    iconType: "heart",
    actionTitleVi: "Sản xuất sản phẩm",
    actionTitleEn: "Product Production",
    bgLight: "bg-orange-50/90 border-orange-200/90 text-orange-950",
    bgDark: "dark:bg-orange-950/40 dark:border-orange-800/70 dark:text-orange-100"
  },
  {
    key: "2018",
    milestoneKey: "2018",
    yearLabel: "2018",
    hexColor: "#EC008C",
    underlineColor: "#EC008C",
    companyName: "MoMo",
    roleTitle: "Trưởng Phòng Dịch vụ Khách hàng",
    description: "Tối ưu quy trình hỗ trợ khách hàng, nâng cao hiệu quả vận hành ví điện tử.",
    iconType: "momo",
    actionTitleVi: "Ra mắt trên MoMo",
    actionTitleEn: "Launch on MoMo",
    bgLight: "bg-pink-50/90 border-pink-200/90 text-pink-950",
    bgDark: "dark:bg-pink-950/40 dark:border-pink-800/70 dark:text-pink-100"
  },
  {
    key: "2023",
    milestoneKey: "2023",
    yearLabel: "2023",
    hexColor: "#FFB300",
    underlineColor: "#FFB300",
    companyName: "Finviet",
    roleTitle: "Trưởng Phòng Dịch vụ Khách hàng",
    description: "Tối ưu quy trình chuẩn hóa, ứng dụng công nghệ tự động AI.",
    iconType: "finviet",
    actionTitleVi: "Truyền thông & Marketing",
    actionTitleEn: "Media & Marketing",
    bgLight: "bg-amber-50/90 border-amber-200/90 text-amber-950",
    bgDark: "dark:bg-amber-950/40 dark:border-amber-800/70 dark:text-amber-100"
  },
  {
    key: "2026",
    milestoneKey: "2026",
    yearLabel: "2026+",
    hexColor: "#0066FF",
    underlineColor: "#0066FF",
    companyName: "CS Strategy 2026+",
    roleTitle: "Head of CS / CS Director",
    description: "Sẵn sàng cho thử thách mới, ứng dụng AI Bot & tự động hóa CRM.",
    iconType: "strategy",
    actionTitleVi: "Đánh giá & Mở rộng",
    actionTitleEn: "Evaluation & Expansion",
    bgLight: "bg-blue-50/90 border-blue-200/90 text-blue-950",
    bgDark: "dark:bg-blue-950/40 dark:border-blue-800/70 dark:text-blue-100"
  }
];

// Helper to render Pin Marker icon with borderless round logo
const renderPinIcon = (type: string, hexColor: string, itemKey?: string) => {
  if (type === "shopee" || itemKey === "2013-shopee") {
    return (
      <img 
        src="https://i.ibb.co/BSVS4xf/Shopee.png" 
        alt="Shopee" 
        className="w-full h-full object-cover p-0 rounded-full bg-white dark:bg-slate-950" 
      />
    );
  }

  if (type === "airpay" || itemKey === "2014-airpay") {
    return (
      <img 
        src="https://i.ibb.co/LdYv3TJy/Shopee-Paye.png" 
        alt="ShopeePay / AirPay" 
        className="w-full h-full object-cover p-0 rounded-full bg-white dark:bg-slate-950" 
      />
    );
  }

  if (type === "gcafe" || itemKey === "2013-gcafe") {
    return (
      <img 
        src="https://i.ibb.co/FkWk3s4W/GCafe.png" 
        alt="GCafe Cyber" 
        className="w-full h-full object-cover p-0 rounded-full bg-white dark:bg-slate-950" 
      />
    );
  }

  if (type === "garena" || itemKey === "2013-garena") {
    return (
      <img 
        src="https://i.ibb.co/h1Md65yV/Garena.png" 
        alt="Garena" 
        className="w-full h-full object-cover p-0 rounded-full bg-white dark:bg-slate-950" 
      />
    );
  }

  if (type === "ved" || itemKey === "2013") {
    return (
      <img 
        src="https://i.ibb.co/BKHcWL5R/Logo-VED.gif" 
        alt="VED" 
        className="w-full h-full object-cover p-0 rounded-full bg-white dark:bg-slate-950" 
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = "https://i.ibb.co/fYPJLfbw/VED.png";
        }}
      />
    );
  }

  if (type === "htvc" || itemKey === "2011-htvc") {
    return (
      <img 
        src="https://i.ibb.co/1fNw0hBq/HTVC.png" 
        alt="HTVC" 
        className="w-full h-full object-cover p-0 rounded-full bg-white dark:bg-slate-950" 
      />
    );
  }

  const getSrc = () => {
    if (itemKey && MILESTONES_DATA[itemKey]?.logo) {
      return MILESTONES_DATA[itemKey].logo;
    }
    switch (type) {
      case "phone":
        return "https://i.ibb.co/hxHm9TsZ/Mobifone.png";
      case "v247":
        return "https://i.ibb.co/QvtbdnfP/V247.png";
      case "lbc":
        return "https://i.ibb.co/R4YXWyzF/LBC.png";
      case "htvc":
        return "https://i.ibb.co/1fNw0hBq/HTVC.png";
      case "ved":
        return "https://i.ibb.co/BKHcWL5R/Logo-VED.gif";
      case "garena":
        return "https://i.ibb.co/h1Md65yV/Garena.png";
      case "gcafe":
        return "https://i.ibb.co/FkWk3s4W/GCafe.png";
      case "shopee":
        return "https://i.ibb.co/BSVS4xf/Shopee.png";
      case "airpay":
        return "https://i.ibb.co/LdYv3TJy/Shopee-Paye.png";
      case "heart":
      case "prudential":
        return "https://i.ibb.co/XfpQphWF/Prudential.png";
      case "momo":
        return "https://i.ibb.co/k2QtrgTw/Momo.png";
      case "finviet":
      case "rocket":
        return "https://i.ibb.co/7NtSSz4d/Finviet.png";
      case "strategy":
        return "https://i.ibb.co/G4QnNzWb/Power-Service.png";
      default:
        return null;
    }
  };

  const src = getSrc();
  if (!src) {
    return <Briefcase className="w-6 h-6" style={{ color: hexColor }} />;
  }

  return (
    <img 
      src={src} 
      alt={type} 
      className="w-full h-full object-cover p-0 rounded-full bg-white dark:bg-slate-950" 
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).style.display = "none";
      }}
    />
  );
};

// Helper to render bottom circular icons for milestone cards
const renderBottomIcon = (iconType: string, hexColor: string) => {
  switch (iconType) {
    case "phone":
      return <Radio className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" style={{ color: hexColor }} />;
    case "v247":
      return <Users className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" style={{ color: hexColor }} />;
    case "lbc":
      return <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" style={{ color: hexColor }} />;
    case "ved":
    case "garena":
      return <Monitor className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" style={{ color: hexColor }} />;
    case "gcafe":
      return <Server className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" style={{ color: hexColor }} />;
    case "shopee":
      return <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" style={{ color: hexColor }} />;
    case "airpay":
      return <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" style={{ color: hexColor }} />;
    case "heart":
    case "prudential":
      return <Building2 className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" style={{ color: hexColor }} />;
    case "momo":
      return <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" style={{ color: hexColor }} />;
    case "finviet":
      return <Megaphone className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" style={{ color: hexColor }} />;
    case "strategy":
      return <ClipboardCheck className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" style={{ color: hexColor }} />;
    default:
      return <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" style={{ color: hexColor }} />;
  }
};

const TIMELINE_SORTED_KEYS = ["2026", "2023", "2018", "2016", "2015", "2013", "2011", "2007", "2003"];

const TeamHeadcountCanvas = ({ count, isVi }: { count: number; isVi: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = canvas.width = canvas.parentElement?.clientWidth || 250;
    let height = canvas.height = 120;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 250;
      height = canvas.height = 120;
    };
    window.addEventListener("resize", handleResize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }

    let particles: Particle[] = [];
    const colors = ["#3b82f6", "#6366f1", "#8b5cf6", "#10b981", "#ec4899", "#14b8a6"];
    
    const createParticle = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.0,
      vy: (Math.random() - 0.5) * 1.0,
      radius: Math.random() * 3.5 + 2,
      color: colors[Math.floor(Math.random() * colors.length)]
    });

    const displayCount = Math.min(count, 45);
    for (let i = 0; i < displayCount; i++) {
      particles.push(createParticle());
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const targetCount = Math.min(count, 45);
      if (particles.length < targetCount) {
        while (particles.length < targetCount) {
          particles.push(createParticle());
        }
      } else if (particles.length > targetCount) {
        particles = particles.slice(0, targetCount);
      }

      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 55) {
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - dist / 55)})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = p.color + "15";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius + 4, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [count]);

  return (
    <div className="w-full h-[120px] rounded-xl overflow-hidden bg-slate-950/85 dark:bg-black/90 border border-slate-200/40 dark:border-slate-800/60 relative shadow-inner">
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
      <div className="absolute bottom-1.5 right-2 text-3xs font-mono text-slate-400 select-none bg-slate-900/70 px-1.5 py-0.5 rounded backdrop-blur-xs">
        {isVi ? `Bản đồ mạng lưới: ${count} nhân sự` : `Teammate network map: ${count} members`}
      </div>
    </div>
  );
};

// Component Dòng Thời Gian (Infographic Roadmap Timeline View) - Phiên bản Lộ trình Infographic kết nối mốc & Thẻ chi tiết Bento Grid
interface TimelineRoadmapViewProps {
  isVi: boolean;
  activeYear: string;
  setActiveYear: (year: string) => void;
  filterCategory: string;
  setFilterCategory: (cat: string) => void;
  timelineScale: number;
  setTimelineScale: React.Dispatch<React.SetStateAction<number>>;
  isAutoScale: boolean;
  setIsAutoScale: React.Dispatch<React.SetStateAction<boolean>>;
  timelineWrapperRef: React.RefObject<HTMLDivElement>;
  getGalleryPhotosForMilestone: (milestone: MilestoneData) => Array<{ src: string; title?: string; alt?: string }>;
}

const TimelineRoadmapView: React.FC<TimelineRoadmapViewProps> = ({
  isVi,
  activeYear,
  setActiveYear,
  filterCategory,
  setFilterCategory,
  timelineScale,
  setTimelineScale,
  isAutoScale,
  setIsAutoScale,
  timelineWrapperRef,
  getGalleryPhotosForMilestone
}) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);
  const [activeSubCard, setActiveSubCard] = useState<number | null>(null);
  
  // State for sub-card expand modal and gallery controls
  const [activeSubCardModal, setActiveSubCardModal] = useState<{ id: string; title: string } | null>(null);
  const [galleryModalIndex, setGalleryModalIndex] = useState<number>(0);

  // Framer Motion staggered grid variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const { theme, activePalette } = useTheme();

  // State cho modal và thẻ thêm vị trí và quản lý
  interface CustomPositionItem {
    id: string;
    milestoneKey: string;
    title: string;
    department: string;
    headcount: string;
    level: string;
    scope: string;
  }
  const [isAddPositionModalOpen, setIsAddPositionModalOpen] = useState<boolean>(false);
  const [customPositions, setCustomPositions] = useState<CustomPositionItem[]>([]);
  const [newRoleTitle, setNewRoleTitle] = useState("");
  const [newRoleDept, setNewRoleDept] = useState("");
  const [newRoleHeadcount, setNewRoleHeadcount] = useState("");
  const [newRoleLevel, setNewRoleLevel] = useState("Quản lý cấp trung (Middle Management)");
  const [newRoleScope, setNewRoleScope] = useState("");
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");

  const current = MILESTONES_DATA[activeYear] || MILESTONES_DATA["2026"] || MILESTONES_DATA["2013"];
  const [simulatedCount, setSimulatedCount] = useState<number>(current.headcount);

  // State quản lý mở rộng / thu gọn chi tiết thẻ Job (Bỏ thu gọn thẻ Job)
  const isJobDetailExpanded = true;
  const toggleJobDetailExpand = () => {};

  // Reset photo index & simulated headcount khi đổi cột mốc
  useEffect(() => {
    setActivePhotoIdx(0);
    setSimulatedCount(current.headcount);
  }, [activeYear, current.headcount]);
  const isLatest = current.key === "2026";
  const photos = getGalleryPhotosForMilestone(current);

  const currentItem = INFOGRAPHIC_TIMELINE_ITEMS.find((i) => i.key === activeYear);
  const currentHex = currentItem?.hexColor;
  const primaryColor = activePalette?.find((p) => p.id === "primary")?.hex || currentHex || "#6366f1";

  const filteredItems = INFOGRAPHIC_TIMELINE_ITEMS.filter((item) => {
    if (filterCategory === "all") return true;
    const milestone = MILESTONES_DATA[item.key];
    return milestone?.tagCategory === filterCategory;
  });

  const filteredKeys = filteredItems.map((i) => i.key);
  const currentIdx = filteredKeys.indexOf(activeYear);
  const hasPrev = currentIdx > 0;
  const hasNext = currentIdx !== -1 && currentIdx < filteredKeys.length - 1;

  const handlePrev = () => {
    if (hasPrev) {
      setActiveYear(filteredKeys[currentIdx - 1]);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      setActiveYear(filteredKeys[currentIdx + 1]);
    }
  };

  // State theo dõi độ rộng thẻ chứa bằng ResizeObserver
  const [containerWidth, setContainerWidth] = useState<number>(() => {
    if (typeof window !== "undefined") {
      return Math.min(1200, Math.max(320, window.innerWidth - 64));
    }
    return 980;
  });


  // Tự động đo độ rộng khả dụng của thẻ chứa bằng ResizeObserver để tự động scale vừa vặn không trượt ngang
  useEffect(() => {
    const el = timelineWrapperRef.current;
    if (!el) return;

    const measureWidth = () => {
      const computed = window.getComputedStyle(el);
      const padL = parseFloat(computed.paddingLeft) || 0;
      const padR = parseFloat(computed.paddingRight) || 0;
      const usable = el.clientWidth - padL - padR;
      if (usable > 0) {
        setContainerWidth(usable);
      }
    };

    measureWidth();
    const ro = new ResizeObserver(() => {
      window.requestAnimationFrame(() => {
        measureWidth();
      });
    });
    ro.observe(el);

    return () => ro.disconnect();
  }, [timelineWrapperRef]);

  const BASE_WIDTH = filteredItems.length > 5 ? 980 : Math.max(480, filteredItems.length * 140);
  const BASE_HEIGHT = 175;

  // Tối ưu thuật toán hiển thị 100% vừa vặn không bao giờ trượt ngang hay trượt dọc
  const effectiveScale = isAutoScale ? 1 : timelineScale;

  const handleZoomOut = () => {
    setIsAutoScale(false);
    setTimelineScale((prev) => Math.max(0.5, Number((prev - 0.1).toFixed(2))));
  };

  const handleZoomIn = () => {
    setIsAutoScale(false);
    setTimelineScale((prev) => Math.min(1.5, Number((prev + 0.1).toFixed(2))));
  };

  const handleToggleAutoScale = () => {
    setIsAutoScale(true);
    setTimelineScale(1);
  };

  const CATEGORIES = [
    { id: "all", vi: "Tất cả", en: "All" },
    { id: "telecom", vi: "Viễn thông & Truyền thông", en: "Telecom & Media" },
    { id: "gaming", vi: "eSport & Game", en: "eSports & Gaming" },
    { id: "ecommerce", vi: "Thương mại điện tử", en: "E-commerce" },
    { id: "insurance", vi: "Bảo hiểm", en: "Insurance" },
    { id: "fintech", vi: "FinTech", en: "FinTech" },
    { id: "strategy", vi: "Chiến lược & Lãnh đạo", en: "Strategy & Leadership" },
  ];

  const bentoGridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const bentoCardVariants: any = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {/* Container nhóm Dòng thời gian sự nghiệp & Cột mốc quản trị - đem nội dung ra ngoài thẻ chứa */}
      <div 
        id="info-card-experience"
        className="w-full flex flex-col gap-3 relative transition-all duration-300"
      >
        {/* ========================================================================= */}
        {/* DÒNG THỜI GIAN SỰ NGHIỆP (CAREER ROADMAP TIMELINE) - HIỂN THỊ ĐẦY ĐỦ 100% */}
        {/* ========================================================================= */}
        <div 
          id="card-career-timeline"
          style={{ borderRadius: "var(--theme-radius-card, var(--theme-radius, 10px))" }}
          className="w-full h-auto glass-surface backdrop-blur-2xl bg-white/85 dark:bg-slate-950/75 border border-slate-200/80 dark:border-slate-800/80 p-4 xs:p-5 sm:p-6 flex flex-col gap-4 text-left relative shadow-md hover:shadow-xl transition-all duration-300 mb-4"
        >
          {/* Header Thẻ: Tiêu đề thẻ con + Công cụ thu phóng và điều khiển */}
          <div className="w-full flex flex-col gap-1 pb-1">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 shadow-2xs">
                  <History className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <h3 className="text-h6 tracking-tight text-slate-900 dark:text-white">
                  {isVi ? "Dòng thời gian sự nghiệp" : "Career roadmap timeline"}
                </h3>
              </div>

              {/* Zoom and Scale Controls */}
              <div className="flex items-center gap-1.5 bg-slate-100/90 dark:bg-slate-800/90 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-200/60 dark:border-slate-700/80 shadow-2xs sm:ml-auto">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="w-6 h-6 rounded-lg flex items-center justify-center bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer select-none shadow-2xs"
                  title={isVi ? "Thu nhỏ" : "Zoom out"}
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                
                <div className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 px-1 min-w-[38px] text-center select-none">
                  {isAutoScale ? "100%" : `${Math.round(effectiveScale * 100)}%`}
                </div>

                <button
                  type="button"
                  onClick={handleZoomIn}
                  className="w-6 h-6 rounded-lg flex items-center justify-center bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer select-none shadow-2xs"
                  title={isVi ? "Phóng to" : "Zoom in"}
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>

                <div className="w-[1px] h-3.5 bg-slate-200 dark:bg-slate-700 my-auto" />

                <button
                  type="button"
                  onClick={handleToggleAutoScale}
                  className={cn(
                    "flex items-center gap-1 px-2 py-0.5 rounded-lg text-2xs font-bold transition-all cursor-pointer select-none",
                    isAutoScale 
                      ? "bg-blue-600 text-white shadow-2xs" 
                      : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600"
                  )}
                >
                  <RotateCcw className={cn("w-3 h-3", isAutoScale && "animate-spin-slow")} />
                  <span>{isVi ? "Tự động" : "Auto"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Dạng lộ trình Dòng thời gian hiển thị chuẩn Visual như hình đính kèm (Horizontal Node Flow) */}
          <div 
            className="w-full relative py-4 select-none overflow-x-auto custom-scrollbar" 
            ref={timelineWrapperRef}
          >
            <div 
              className="min-w-[980px] xl:min-w-0 w-full relative flex flex-col justify-center transition-transform duration-200"
              style={{
                transform: isAutoScale ? undefined : `scale(${effectiveScale})`,
                transformOrigin: "center center",
              }}
            >
              {/* The Milestone Columns Dynamic Layout */}
              <div 
                className="w-full relative z-10 px-0.5 gap-1.5 sm:gap-2 md:gap-3"
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${filteredItems.length}, minmax(0, 1fr))`
                }}
              >
                {filteredItems.map((item, idx) => {
                  const isSelected = item.key === activeYear;
                  const isLast = idx === filteredItems.length - 1;
                  return (
                    <div 
                      key={item.key}
                      onClick={() => setActiveYear(item.key)}
                      className="flex flex-col items-center relative cursor-pointer group transition-transform duration-300 min-w-0"
                    >
                      {/* 1. Top Year Pill Badge with downward triangle tip */}
                      <div className="flex flex-col items-center mb-2 sm:mb-2.5 z-10">
                        <div 
                          className={cn(
                            "px-2 sm:px-2.5 py-1 rounded-full text-white font-bold text-[11px] sm:text-caption tracking-tight shadow-sm flex items-center justify-center transition-all duration-300 whitespace-nowrap",
                            isSelected ? "scale-105 shadow-md ring-2 ring-white dark:ring-slate-900" : "group-hover:scale-105 opacity-90 group-hover:opacity-100"
                          )}
                          style={{ backgroundColor: item.hexColor }}
                        >
                          <span>{isVi ? `Năm ${item.yearLabel}` : `Year ${item.yearLabel}`}</span>
                        </div>
                        {/* Downward pointer tip */}
                        <div 
                          className="w-0 h-0 border-x-[5px] border-x-transparent border-t-[6px] -mt-0.5 transition-colors"
                          style={{ borderTopColor: item.hexColor }}
                        ></div>
                      </div>

                      {/* 2. Circular Logo Node with Horizontal Overlapping Logo Stack for 2013 */}
                      <div className="h-14 xs:h-16 sm:h-18 md:h-20 w-full flex items-center justify-center relative">
                        {item.yearLabel === "2013" ? (
                          /* Horizontal Collapsed to 1 Unit & Expand on Hover Logo Stack for 2013: VED + Garena + Gcafe + Shopee + Airpay */
                          <div 
                            className={cn(
                              "flex flex-row items-center justify-center -space-x-[40px] sm:-space-x-[52px] group-hover:space-x-1 sm:group-hover:space-x-1.5 z-10 transition-all duration-500 ease-out px-1 py-1",
                              isSelected ? "scale-105" : ""
                            )}
                          >
                            {[
                              { key: "2013", type: "ved", name: "VED (Vietnam Esports)", color: "#DC2626" },
                              { key: "2013-garena", type: "garena", name: "Garena", color: "#ED1C24" },
                              { key: "2013-gcafe", type: "gcafe", name: "Gcafe CYBER", color: "#00A651" },
                              { key: "2013-shopee", type: "shopee", name: "Shopee", color: "#EE4D2D" },
                              { key: "2014-airpay", type: "airpay", name: "Airpay / ShopeePay", color: "#00ADEF" }
                            ].map((subLogo, lIdx) => {
                              const isCurrentLogo = activeYear === subLogo.key || (activeYear === "2013" && subLogo.key === "2013");
                              return (
                                <div
                                  key={subLogo.key}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveYear(subLogo.key);
                                  }}
                                  className={cn(
                                    "w-[50px] h-[50px] sm:w-[62px] sm:h-[62px] rounded-full border-2 border-white dark:border-slate-900 shadow-md overflow-hidden flex items-center justify-center bg-white dark:bg-slate-950 transition-all duration-300 relative shrink-0 cursor-pointer",
                                    isCurrentLogo
                                      ? "z-30 scale-110 ring-2 ring-offset-1 shadow-lg"
                                      : "z-10 opacity-90 group-hover:opacity-100 hover:scale-110 hover:z-40"
                                  )}
                                  style={{
                                    borderColor: subLogo.color,
                                    zIndex: isCurrentLogo ? 30 : 20 - lIdx,
                                    boxShadow: isCurrentLogo ? `0 0 12px ${subLogo.color}90` : `0 2px 6px rgba(0,0,0,0.18)`
                                  }}
                                  title={subLogo.name}
                                >
                                  <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center p-0">
                                    {renderPinIcon(subLogo.type, subLogo.color, subLogo.key)}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : item.key === "2011" ? (
                          /* Horizontal Overlapping Logo Stack for 2011: LBC & HTVC */
                          <div 
                            className={cn(
                              "flex flex-row items-center justify-center -space-x-3.5 sm:-space-x-4.5 z-10 transition-all duration-300",
                              isSelected ? "scale-105" : "group-hover:scale-105"
                            )}
                          >
                            {[
                              { key: "2011", type: "lbc", name: "LBC", color: "#00C853" },
                              { key: "2011-htvc", type: "htvc", name: "HTVC", color: "#0284c7" }
                            ].map((subLogo, lIdx) => (
                              <div
                                key={subLogo.name}
                                className={cn(
                                  "w-[52px] h-[52px] sm:w-[66px] sm:h-[66px] rounded-full border-2 border-white dark:border-slate-900 shadow-md overflow-hidden flex items-center justify-center bg-white dark:bg-slate-950 transition-all duration-300 relative shrink-0",
                                  isSelected ? "scale-105" : "hover:scale-105"
                                )}
                                style={{
                                  borderColor: subLogo.color,
                                  zIndex: 20 - lIdx,
                                  boxShadow: isSelected ? `0 0 10px ${subLogo.color}80` : `0 2px 6px rgba(0,0,0,0.15)`
                                }}
                                title={subLogo.name}
                              >
                                <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center p-0">
                                  {renderPinIcon(subLogo.type, subLogo.color, "2011")}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          /* Standard Ring Container for single-brand years */
                          <div 
                            className={cn(
                              "w-11 h-11 xs:w-13 xs:h-13 sm:w-15 sm:h-15 md:w-[68px] md:h-[68px] rounded-full border-[1.5px] p-0 relative flex items-center justify-center transition-all duration-300 shrink-0 bg-white dark:bg-slate-950 z-10 overflow-hidden",
                              isSelected ? "scale-110" : "group-hover:scale-105"
                            )}
                            style={{
                              borderColor: item.hexColor,
                              boxShadow: isSelected 
                                ? `0 0 24px ${item.hexColor}80, inset 0 0 8px ${item.hexColor}40` 
                                : `0 4px 14px ${item.hexColor}35`
                            }}
                          >
                            <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-slate-950 flex items-center justify-center p-0">
                              {renderPinIcon(item.iconType, item.hexColor, item.key)}
                            </div>
                          </div>
                        )}

                        {/* Chevron Arrow Connector (») between adjacent nodes */}
                        {!isLast && (
                          <div className="absolute top-1/2 -right-2 sm:-right-2.5 md:-right-3.5 -translate-y-1/2 z-20 pointer-events-none">
                            <div 
                              className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-white shadow-xs"
                              style={{ 
                                backgroundColor: item.hexColor,
                                backgroundImage: `linear-gradient(135deg, ${item.hexColor}, ${filteredItems[idx+1]?.hexColor || item.hexColor})` 
                              }}
                            >
                              <ChevronsRight className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 stroke-[3]" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* THẺ CỘT MỐC JOB: THẺ JOB CHÍNH BENTO CO GIẢN CHIỀU CAO KHI CLICK */}
        {/* ========================================================================= */}
        <AnimatePresence mode="wait">
            {current && (
              <motion.div
                id="card-milestone-detail"
                key={current.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full h-auto glass-surface backdrop-blur-2xl bg-white/90 dark:bg-slate-950/85 border p-[15px] flex flex-col gap-4 text-left relative -mt-0.5 shadow-lg dark:shadow-[0_16px_40px_rgba(0,0,0,0.4)] transition-all duration-300"
                style={{
                  padding: "15px",
                  borderRadius: "var(--theme-radius-card, var(--theme-radius, 10px))",
                  borderColor: currentHex || '#6366f1',
                  height: "fit-content",
                }}
              >
                {/* 0. THẺ BANNER HÌNH ẢNH DOANH NGHIỆP / CỘT MỐC (BENTO BANNER) */}
                {current.bannerUrl && (
                  <div 
                    id="card-job-banner"
                    style={{ borderRadius: "var(--theme-radius-inner, var(--theme-radius, 8px))" }}
                    className="w-full h-36 xs:h-44 sm:h-52 md:h-64 overflow-hidden relative shadow-md border border-slate-200/80 dark:border-slate-800/80 bg-slate-100 dark:bg-slate-900 group/banner select-none transition-all duration-300"
                  >
                    <img
                      src={current.bannerUrl}
                      alt={`${current.company} Banner`}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover/banner:scale-105"
                      style={{ borderRadius: "var(--theme-radius-inner, var(--theme-radius, 8px))" }}
                      referrerPolicy="no-referrer"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />
                    
                    {/* Floating Quick Badges on Banner */}
                    <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-5 flex items-center gap-2 flex-wrap z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 text-caption font-bold font-mono shadow-sm">
                        <Calendar className="w-3.5 h-3.5 text-blue-400" />
                        {current.cardYearLabel || current.year}
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 text-caption font-bold shadow-sm">
                        <Briefcase className="w-3.5 h-3.5 text-emerald-500" />
                        {current.tag}
                      </span>
                    </div>
                  </div>
                )}

                {/* 1. THẺ THÔNG TIN CHÍNH JOB CARD HEADER (Tạo thẻ chuẩn Bento Design System) */}
                <div 
                  id="card-job-header"
                  style={{ borderRadius: "var(--theme-radius-inner, var(--theme-radius, 8px))" }}
                  className="w-full bg-slate-50/85 dark:bg-slate-900/65 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md shadow-md p-[25px] flex flex-col md:flex-row items-start md:items-center justify-between gap-3.5 sm:gap-4 relative select-none group/header transition-all duration-300 hover:shadow-lg"
                >
                  {/* Left Column: Badge + Company Avatar & Titles */}
                  <div className="flex flex-col gap-3 min-w-0 flex-1">
                    {/* Period Badge */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50/90 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50 text-caption font-bold shadow-2xs self-start">
                      <Calendar className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>{current.period || `Từ Năm ${current.cardYearLabel}`}</span>
                    </div>
 
                    {/* Logo + Company Name */}
                    <div className="flex items-center gap-3.5 sm:gap-4 pt-0.5">
                      <div className="flex items-center -space-x-3 sm:-space-x-4 shrink-0">
                        <div 
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 p-0 bg-white dark:bg-slate-950 shadow-sm flex items-center justify-center shrink-0 overflow-hidden group-hover/header:scale-105 transition-transform z-10"
                          style={{
                            borderColor: currentHex || undefined
                          }}
                        >
                          <img 
                            src={current.logo} 
                            alt={current.company} 
                            className="w-full h-full object-cover rounded-full" 
                            onError={(e) => {
                              if (current.fallbackLogo) {
                                (e.currentTarget as HTMLImageElement).src = current.fallbackLogo;
                              }
                            }}
                          />
                        </div>
                        {current.subLogo && (
                          <div 
                            className="w-13 h-13 sm:w-16 sm:h-16 rounded-full border-2 border-sky-400 p-0 bg-white dark:bg-slate-950 shadow-sm flex items-center justify-center shrink-0 overflow-hidden group-hover/header:scale-105 transition-transform z-0"
                            title="HTVC"
                          >
                            <img 
                              src={current.subLogo} 
                              alt="HTVC" 
                              className="w-full h-full object-cover rounded-full" 
                            />
                          </div>
                        )}
                      </div>
 
                      <div className="min-w-0 flex-1">
                        {(() => {
                          let mainCompany = current.company;
                          let subComp = current.subCompanies;
                          if (!subComp && mainCompany.includes('(')) {
                            const match = mainCompany.match(/^(.*?)\s*(\(.*\))$/);
                            if (match) {
                              mainCompany = match[1].trim();
                              subComp = match[2].trim();
                            }
                          }
                          return (
                            <div>
                              <h2 className="text-[16px] sm:text-[18px] font-bold text-slate-900 dark:text-white leading-tight">
                                {mainCompany}
                              </h2>
                              {subComp && (
                                <p className="text-[16px] sm:text-[18px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                                  {subComp}
                                </p>
                              )}
                            </div>
                          );
                        })()}
 
                        <div className="mt-2 flex items-center gap-2 flex-wrap">
                          <span className="inline-block px-3 py-1 rounded-full bg-indigo-100/90 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-bold text-caption">
                            {current.tag}
                          </span>
                          <span className="inline-block px-3 py-1 rounded-full bg-emerald-100/90 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-bold text-caption">
                            {current.cardRoleTitle || current.role}
                          </span>
                          {/* Số lượng nhân sự quản lý */}
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/90 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 font-bold text-caption border border-blue-200 dark:border-blue-800/60 shadow-2xs">
                            <Users className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                            <span>{current.managementHeadcount || `${current.headcount} nhân sự quản lý`}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. BỐ CỤC BENTO BUNG RỘNG CHIỀU CAO THẺ JOB VÀ CO GIẢN THẺ SUB CARD */}
                <AnimatePresence>
                  {isJobDetailExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -8 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -8 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="w-full flex flex-col gap-4 pt-1 transition-all duration-300"
                    >
                      {/* THẺ HÀNH TRÌNH / TÂM TƯ CÔNG VIỆC - BỐ CỤC ĐIỂM NHẤN BENTO HERO CARD */}
                      <div className="w-full pt-5 sm:pt-7 border-t border-slate-100 dark:border-slate-800/80">
                        {/* Thẻ chứa bo cong bao gồm cả Header lẫn nội dung các đoạn văn bản */}
                        <div className="space-y-3.5 p-[25px] rounded-2xl sm:rounded-3xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md shadow-md">
                          {/* Header với tag chủ đề & tiêu đề điểm nhấn đưa vào trong thẻ */}
                          <div className="space-y-2 pb-3.5 border-b border-indigo-100/80 dark:border-slate-800/80">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/50 text-2xs font-black text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
                              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                              <span>{current.headerTitle}</span>
                            </div>
                            <h3 className="text-[18px] sm:text-[20px] font-black text-slate-900 dark:text-white leading-tight">
                              {isVi ? "Hành trình sự nghiệp & Cột mốc" : "Career Journey & Milestones"}
                            </h3>
                          </div>

                          {current.paragraphs.map((p, pIdx) => {
                            const renderFormattedText = (text: string) => {
                              if (text.includes("**")) {
                                const parts = text.split(/(\*\*.*?\*\*)/g);
                                return parts.map((part, i) => {
                                  if (part.startsWith("**") && part.endsWith("**")) {
                                    return (
                                      <strong key={i} className="font-black text-indigo-950 dark:text-indigo-200 bg-indigo-50/80 dark:bg-indigo-950/60 px-1.5 py-0.5 rounded-md border border-indigo-100/80 dark:border-indigo-900/40">
                                        {part.slice(2, -2)}
                                      </strong>
                                    );
                                  }
                                  return part;
                                });
                              }
                              return text;
                            };

                            const isLast = pIdx === current.paragraphs.length - 1;
                            const isFirst = pIdx === 0;
                            const isPhilosophy = p.includes("triết lý") || p.includes("nền móng") || (isLast && current.paragraphs.length > 2);

                            // Đoạn cuối hoặc đoạn mang tính triết lý: Callout Card đặc biệt
                            if (isPhilosophy) {
                              return (
                                <div 
                                  key={pIdx}
                                  className="mt-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50/80 via-indigo-50/40 to-purple-50/70 dark:from-slate-900/90 dark:via-indigo-950/40 dark:to-purple-950/30 border-l-4 border-amber-500 dark:border-amber-400 border-y border-r border-amber-200/60 dark:border-slate-800 shadow-2xs space-y-2"
                                >
                                  <div className="flex items-center gap-2 text-xs font-black text-amber-900 dark:text-amber-300 uppercase tracking-wider">
                                    <Quote className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                                    <span>{isVi ? "Triết lý Quản trị & Đúc kết Cốt lõi:" : "Core Management Philosophy:"}</span>
                                  </div>
                                  <p className="text-body font-semibold text-slate-800 dark:text-slate-200 leading-relaxed italic">
                                    {renderFormattedText(p)}
                                  </p>
                                </div>
                              );
                            }

                            // Đoạn mở đầu: Lead Card bối cảnh khởi đầu
                            if (isFirst) {
                              return (
                                <div 
                                  key={pIdx}
                                  className="p-4 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100/70 dark:border-indigo-900/40 text-body text-slate-800 dark:text-slate-200 font-medium leading-relaxed flex items-start gap-3"
                                >
                                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-1.5 shrink-0 shadow-xs" />
                                  <div className="flex-1">
                                    {renderFormattedText(p)}
                                  </div>
                                </div>
                              );
                            }

                            // Các đoạn triển khai hành động / thành tựu ở giữa: Khối chi tiết có dot bullet
                            return (
                              <div 
                                key={pIdx}
                                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60 text-body text-slate-700 dark:text-slate-300 leading-relaxed hover:border-indigo-200 dark:hover:border-indigo-800/60 transition-colors"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 dark:bg-indigo-500 mt-2 shrink-0" />
                                <div className="flex-1">
                                  {renderFormattedText(p)}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* BENTO 2-COLUMN GRID 6 THẺ SUB CARD JOB - VIEW 2 CỘT CHIỀU CAO THEO NỘI DUNG */}
                      <motion.div 
                        id="card-milestone-detail-grid" 
                        variants={bentoGridVariants}
                        initial="hidden"
                        animate="visible"
                        className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 items-start"
                      >
                        
                        {/* Sub Card 01 | QUẢN LÝ VẬN HÀNH (Hero Management Card) */}
                        <motion.div 
                          variants={bentoCardVariants}
                          className="w-full h-auto self-start rounded-2xl md:rounded-3xl bg-slate-50/75 dark:bg-slate-900/60 p-[25px] border border-slate-200/80 dark:border-slate-800/80 hover:border-blue-400/80 dark:hover:border-blue-500/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between backdrop-blur-xl"
                        >
                          <div className="space-y-3.5">
                            <div className="flex items-center justify-between pb-3 border-b border-blue-100/80 dark:border-blue-900/40">
                              <div className="flex items-center gap-2.5">
                                <span className="text-2xl font-mono font-black text-blue-600 dark:text-blue-400">01</span>
                                <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                <span className="text-h6 text-blue-900 dark:text-blue-200 uppercase">{isVi ? "QUẢN LÝ VẬN HÀNH" : "OPERATIONS MANAGEMENT"}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <MoreVertical className="w-4 h-4 text-slate-400" />
                              </div>
                            </div>

                            {/* Chuyển thành view 2 cột */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {/* Hàng 1: Chức danh quản trị */}
                              <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100/80 dark:border-blue-900/40 flex items-start gap-3">
                                <div className="w-8 h-8 rounded-xl bg-blue-100/90 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                                  <User className="w-4 h-4 stroke-[2.5]" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <span className="text-slate-500 dark:text-slate-400 font-medium block text-caption mb-0.5">
                                    {isVi ? "Chức danh quản trị:" : "Administrative role:"}
                                  </span>
                                  <span className="font-extrabold text-slate-900 dark:text-white leading-snug block text-body">
                                    {current.cardRoleTitle || current.role}
                                  </span>
                                </div>
                              </div>

                              {/* Hàng 2: Quy mô nhân sự quản lý */}
                              <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100/80 dark:border-blue-900/40 flex items-start gap-3">
                                <div className="w-8 h-8 rounded-xl bg-blue-100/90 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                                  <Users className="w-4 h-4 stroke-[2.5]" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <span className="text-slate-500 dark:text-slate-400 font-medium block text-caption mb-0.5">
                                    {isVi ? "Quy mô nhân sự quản lý:" : "Team size managed:"}
                                  </span>
                                  <span className="font-extrabold text-slate-900 dark:text-white leading-snug block text-body">
                                    {current.managementHeadcount || `${current.headcount} nhân sự trực thuộc`}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Danh sách vị trí tùy chỉnh đã thêm nếu có */}
                          {customPositions.filter(p => p.milestoneKey === current.key).length > 0 && (
                            <div className="space-y-2 pt-3 mt-3 border-t border-slate-200/80 dark:border-slate-800">
                              <span className="text-caption font-bold uppercase tracking-wider text-slate-500 block">
                                {isVi ? "Vị trí & nhiệm vụ bổ sung:" : "Additional added roles:"}
                              </span>
                              <div className="space-y-1.5">
                                {customPositions
                                  .filter(p => p.milestoneKey === current.key)
                                  .map(cp => (
                                    <div key={cp.id} className="p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/40 text-body flex items-center justify-between">
                                      <div>
                                        <span className="font-extrabold text-emerald-950 dark:text-emerald-200 block text-body">{cp.title}</span>
                                        <span className="text-caption text-slate-500">{cp.department} • {cp.headcount}</span>
                                      </div>
                                      <span className="text-caption font-mono font-bold px-2 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                                        {cp.level}
                                      </span>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )}
                        </motion.div>

                        {/* Sub Card 02 | KẾT QUẢ & KPI (Metrics Card) */}
                        <motion.div 
                          variants={bentoCardVariants}
                          className="w-full h-auto self-start rounded-2xl md:rounded-3xl bg-slate-50/75 dark:bg-slate-900/60 p-[25px] border border-slate-200/80 dark:border-slate-800/80 hover:border-emerald-400/80 dark:hover:border-emerald-500/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between backdrop-blur-xl"
                        >
                          <div className="space-y-3.5">
                            <div className="flex items-center justify-between pb-3 border-b border-emerald-100/80 dark:border-emerald-900/40">
                              <div className="flex items-center gap-2.5">
                                <span className="text-2xl font-mono font-black text-emerald-600 dark:text-emerald-400">02</span>
                                <Trophy className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                <span className="text-h6 text-emerald-900 dark:text-emerald-200 uppercase">
                                  {isVi ? "KẾT QUẢ & KPI" : "RESULTS & KPIS"}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <MoreVertical className="w-4 h-4 text-slate-400" />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {current.kpis && current.kpis.map((kpi, kIdx) => (
                                <div key={kIdx} className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100/80 dark:border-emerald-900/40 space-y-2">
                                  <div className="flex items-center justify-between text-body font-bold">
                                    <span className="text-slate-800 dark:text-slate-200 truncate pr-1">{kpi.label}</span>
                                    <span className="font-mono text-emerald-700 dark:text-emerald-400 font-black">{kpi.percent}%</span>
                                  </div>
                                  <div className="w-full h-2.5 bg-slate-200/80 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${kpi.percent}%` }} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>

                        {/* Sub Card 03 | CÔNG VIỆC (Tasks Card) */}
                        <motion.div 
                          variants={bentoCardVariants}
                          className="w-full h-auto self-start rounded-2xl md:rounded-3xl bg-slate-50/75 dark:bg-slate-900/60 p-[25px] border border-slate-200/80 dark:border-slate-800/80 hover:border-indigo-400/80 dark:hover:border-indigo-500/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between backdrop-blur-xl"
                        >
                          <div className="space-y-3.5">
                            <div className="flex items-center justify-between pb-3 border-b border-indigo-100/80 dark:border-indigo-900/40">
                              <div className="flex items-center gap-2.5">
                                <span className="text-2xl font-mono font-black text-indigo-600 dark:text-indigo-400">03</span>
                                <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                <span className="text-h6 text-indigo-900 dark:text-indigo-200 uppercase">
                                  {isVi ? "CÔNG VIỆC & VẬN HÀNH" : "TASKS & ROLES"}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <MoreVertical className="w-4 h-4 text-slate-400" />
                              </div>
                            </div>

                            <div className="space-y-2.5">
                              {current.tasks && current.tasks.map((task, tIdx) => (
                                <div key={tIdx} className="p-3 px-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100/80 dark:border-indigo-900/40 text-body font-semibold text-slate-800 dark:text-slate-200 flex items-start gap-3 leading-relaxed">
                                  <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-mono font-bold text-caption flex items-center justify-center shrink-0 mt-0.5">
                                    {tIdx + 1}
                                  </span>
                                  <span className="pt-0.5">{task}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>

                        {/* Sub Card 04 | DỰ ÁN (Projects Card) */}
                        <motion.div 
                          variants={bentoCardVariants}
                          className="w-full h-auto self-start rounded-2xl md:rounded-3xl bg-slate-50/75 dark:bg-slate-900/60 p-[25px] border border-slate-200/80 dark:border-slate-800/80 hover:border-amber-400/80 dark:hover:border-amber-500/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between backdrop-blur-xl"
                        >
                          <div className="space-y-3.5">
                            <div className="flex items-center justify-between pb-3 border-b border-amber-100/80 dark:border-amber-900/40">
                              <div className="flex items-center gap-2.5">
                                <span className="text-2xl font-mono font-black text-amber-600 dark:text-amber-400">04</span>
                                <FolderKanban className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                <span className="text-h6 text-amber-900 dark:text-amber-200 uppercase">
                                  {isVi ? "DỰ ÁN TRỌNG ĐIỂM" : "PROJECTS"}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <MoreVertical className="w-4 h-4 text-slate-400" />
                              </div>
                            </div>

                            <div className="space-y-2">
                              {current.projects && current.projects.map((proj, pIdx) => (
                                <div key={pIdx} className="p-3 px-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-100/80 dark:border-amber-900/40 text-body font-bold text-amber-950 dark:text-amber-100 flex items-center justify-between gap-2 hover:bg-amber-100/70 dark:hover:bg-amber-900/50 transition-colors">
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <FolderKanban className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                                    <span className="truncate">{proj}</span>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-amber-500 shrink-0" />
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>

                        {/* Sub Card 05 | CAM KẾT (Commitments Card) */}
                        <motion.div 
                          variants={bentoCardVariants}
                          className="w-full h-auto self-start rounded-2xl md:rounded-3xl bg-slate-50/75 dark:bg-slate-900/60 p-[25px] border border-slate-200/80 dark:border-slate-800/80 hover:border-cyan-400/80 dark:hover:border-cyan-500/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between backdrop-blur-xl"
                        >
                          <div className="space-y-3.5">
                            <div className="flex items-center justify-between pb-3 border-b border-cyan-100/80 dark:border-cyan-900/40">
                              <div className="flex items-center gap-2.5">
                                <span className="text-2xl font-mono font-black text-cyan-600 dark:text-cyan-400">05</span>
                                <ShieldCheck className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                                <span className="text-h6 text-cyan-900 dark:text-cyan-200 uppercase">
                                  {isVi ? "CAM KẾT CHẤT LƯỢNG" : "COMMITMENTS"}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <MoreVertical className="w-4 h-4 text-slate-400" />
                              </div>
                            </div>

                            <div className="space-y-2.5">
                              {current.commitments && current.commitments.map((cmt, cIdx) => (
                                <div key={cIdx} className="p-3.5 rounded-2xl bg-cyan-50/60 dark:bg-cyan-950/30 border border-cyan-100/80 dark:border-cyan-900/40 text-body font-bold text-slate-800 dark:text-slate-200 flex items-start gap-2.5 leading-relaxed">
                                  <CheckCircle2 className="w-4.5 h-4.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                                  <span>{cmt}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>

                        {/* Sub Card 06 | KỶ NIỆM (Memories Card) */}
                        <motion.div 
                          variants={bentoCardVariants}
                          onClick={() => {
                            if (current.memoryCompanyId) {
                              const memoryCard = document.getElementById(`memory-card-${current.memoryCompanyId}`);
                              if (memoryCard) {
                                memoryCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                              }
                            }
                          }}
                          className="w-full h-auto self-start rounded-2xl md:rounded-3xl bg-slate-50/75 dark:bg-slate-900/60 p-[25px] border border-slate-200/80 dark:border-slate-800/80 hover:border-rose-400/80 dark:hover:border-rose-500/80 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between backdrop-blur-xl"
                        >
                          <div className="space-y-3.5">
                            <div className="flex items-center justify-between pb-3 border-b border-rose-100/80 dark:border-rose-900/40">
                              <div className="flex items-center gap-2.5">
                                <span className="text-2xl font-mono font-black text-rose-600 dark:text-rose-400">06</span>
                                <Camera className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                                <span className="text-h6 text-rose-900 dark:text-rose-200 uppercase">
                                  {isVi ? "KỶ NIỆM THỰC CHIẾN" : "MEMORIES"}
                                </span>
                              </div>
                            </div>

                            {/* Khung ảnh kỷ niệm */}
                            <div className="w-full h-40 sm:h-48 rounded-2xl overflow-hidden bg-slate-950 relative border border-rose-200/60 dark:border-rose-900/60 shadow-inner">
                              <img 
                                src={photos && photos[0]?.src ? photos[0].src : current.photoUrl} 
                                alt="Thẻ 06 Kỷ niệm" 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-body text-white font-bold">
                                <span className="flex items-center gap-2">
                                  <ImageIcon className="w-4 h-4 text-rose-300" />
                                  <span>{isVi ? "Khoảnh khắc & tư liệu hình ảnh" : "Moments & Archive"}</span>
                                </span>
                                <span className="text-rose-300 font-mono group-hover:translate-x-1 transition-transform">→</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>

                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
        </AnimatePresence>
      </div>

      {/* Modal Tạo thẻ thêm vị trí và quản lý */}
      <AnimatePresence>
        {isAddPositionModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-5 sm:p-6 space-y-4 text-left"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-h6 text-slate-900 dark:text-white">
                      {isVi ? "Tạo Thẻ Thêm Vị Trí & Quản Lý" : "Add Role & Management Profile"}
                    </h3>
                    <p className="text-body-sm text-slate-500 dark:text-slate-400">
                      {current.company} ({current.cardYearLabel})
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddPositionModalOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {saveSuccessMsg ? (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3 text-emerald-800 dark:text-emerald-200 text-xs font-bold animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{saveSuccessMsg}</span>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newRoleTitle.trim()) return;
                    const newPos: CustomPositionItem = {
                      id: `pos-${Date.now()}`,
                      milestoneKey: current.key,
                      title: newRoleTitle.trim(),
                      department: newRoleDept.trim() || (isVi ? "Bộ phận Dịch vụ Khách hàng" : "Customer Operations"),
                      headcount: newRoleHeadcount.trim() || (isVi ? "Toàn bộ nhân sự phòng ban" : "Department team"),
                      level: newRoleLevel,
                      scope: newRoleScope.trim() || (isVi ? "Điều hành và quản lý vận hành" : "Operational management")
                    };
                    setCustomPositions(prev => [newPos, ...prev]);
                    setSaveSuccessMsg(isVi ? "Đã tạo thẻ vị trí và quản lý thành công!" : "Position & management card created successfully!");
                    setTimeout(() => {
                      setSaveSuccessMsg("");
                      setNewRoleTitle("");
                      setNewRoleDept("");
                      setNewRoleHeadcount("");
                      setNewRoleScope("");
                      setIsAddPositionModalOpen(false);
                    }, 1200);
                  }}
                  className="space-y-3"
                >
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {isVi ? "Tên chức danh / Vị trí đảm nhiệm *" : "Position / Role Title *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={newRoleTitle}
                      onChange={(e) => setNewRoleTitle(e.target.value)}
                      placeholder={isVi ? "VD: Giám Đốc Vận Hành / Trưởng Phòng CSKH..." : "e.g. Head of Customer Experience..."}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        {isVi ? "Phòng ban điều hành" : "Department"}
                      </label>
                      <input
                        type="text"
                        value={newRoleDept}
                        onChange={(e) => setNewRoleDept(e.target.value)}
                        placeholder={isVi ? "VD: CSKH, Call Center..." : "e.g. Operations, CS..."}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        {isVi ? "Quy mô nhân sự quản lý" : "Team Headcount"}
                      </label>
                      <input
                        type="text"
                        value={newRoleHeadcount}
                        onChange={(e) => setNewRoleHeadcount(e.target.value)}
                        placeholder={isVi ? "VD: 80 - 150 nhân sự" : "e.g. 50 - 100 members"}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {isVi ? "Cấp bậc quản lý" : "Management Level"}
                    </label>
                    <select
                      value={newRoleLevel}
                      onChange={(e) => setNewRoleLevel(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Trưởng Phòng (Head of Department)">Trưởng Phòng (Head of Department)</option>
                      <option value="Quản lý cấp trung (Middle Management)">Quản lý cấp trung (Middle Management)</option>
                      <option value="Giám Đốc Vận Hành (Operations Director)">Giám Đốc Vận Hành (Operations Director)</option>
                      <option value="Trưởng Nhóm / Giám Sát (Team Leader / Supervisor)">Trưởng Nhóm / Giám Sát (Team Leader / Supervisor)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {isVi ? "Phạm vi trách nhiệm chính" : "Core Scope & Responsibilities"}
                    </label>
                    <textarea
                      rows={2}
                      value={newRoleScope}
                      onChange={(e) => setNewRoleScope(e.target.value)}
                      placeholder={isVi ? "Mô tả trọng tâm công tác quản lý và mục tiêu hoàn thành..." : "Key operational goals and governance..."}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setIsAddPositionModalOpen(false)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      {isVi ? "Hủy" : "Cancel"}
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl text-xs font-black bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>{isVi ? "Lưu Thẻ Vị Trí" : "Save Position Card"}</span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Subcard Expanded Modal */}
      <AnimatePresence>
        {activeSubCard !== null && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200/85 dark:border-slate-800/80 shadow-2xl overflow-hidden flex flex-col text-left"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/40">
                <div className="flex items-center gap-3">
                  {activeSubCard === 1 && <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                  {activeSubCard === 2 && <Trophy className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
                  {activeSubCard === 3 && <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
                  {activeSubCard === 4 && <FolderKanban className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
                  {activeSubCard === 5 && <ShieldCheck className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />}
                  {activeSubCard === 6 && <Camera className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
                  <div>
                    <h3 className="text-h6 text-slate-900 dark:text-white uppercase tracking-tight">
                      {activeSubCard === 1 && (isVi ? "CHI TIẾT QUẢN LÝ VẬN HÀNH" : "OPERATIONS MANAGEMENT DETAIL")}
                      {activeSubCard === 2 && (isVi ? "CHỈ SỐ HIỆU QUẢ & KPIs CHI TIẾT" : "DETAILED KPIS & METRICS")}
                      {activeSubCard === 3 && (isVi ? "CHI TIẾT NHIỆM VỤ & PHẠM VI TRÁCH NHIỆM" : "DETAILED ROLES & RESPONSIBILITIES")}
                      {activeSubCard === 4 && (isVi ? "DỰ ÁN TRỌNG ĐIỂM & CHUYỂN ĐỔI SỐ" : "STRATEGIC PROJECTS & OUTCOMES")}
                      {activeSubCard === 5 && (isVi ? "CAM KẾT CHẤT LƯỢNG & TIÊU CHUẨN VẬN HÀNH" : "QUALITY COMMITMENT & SLA STANDARDS")}
                      {activeSubCard === 6 && (isVi ? "KỶ NIỆM THỰC CHIẾN & TƯ LIỆU HÌNH ẢNH" : "TEAM MOMENTS & ARCHIVE GALLERY")}
                    </h3>
                    <p className="text-body-sm text-slate-500 dark:text-slate-400">
                      {current.company} ({current.cardYearLabel || current.period})
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveSubCard(null)}
                  className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[65vh] space-y-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeSubCard === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100/60 dark:border-blue-900/40 flex items-start gap-3">
                        <User className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-2xs font-bold text-slate-400 block uppercase tracking-wider">{isVi ? "Vị trí quản trị" : "Administrative Role"}</span>
                          <span className="font-extrabold text-slate-900 dark:text-white block text-sm mt-0.5">{current.cardRoleTitle || current.role}</span>
                        </div>
                      </div>
                      <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100/60 dark:border-blue-900/40 flex items-start gap-3">
                        <Users className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-2xs font-bold text-slate-400 block uppercase tracking-wider">{isVi ? "Quy mô nhân sự quản lý" : "Managed Headcount"}</span>
                          <span className="font-extrabold text-slate-900 dark:text-white block text-sm mt-0.5">{current.managementHeadcount || `${current.headcount} nhân sự trực thuộc`}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
                      <h4 className="text-h6 font-bold text-slate-900 dark:text-white uppercase tracking-wider">{isVi ? "Phân tích quy mô & cơ cấu quản lý" : "Team Structure & Operational Scope"}</h4>
                      <p>
                        {isVi 
                          ? `Với vai trò quản lý cấp cao điều hành đội ngũ ${current.headcount} nhân sự trực thuộc tại ${current.company}, tôi tập trung vào việc thiết lập hệ thống phân quyền phân cấp hiệu quả, phát triển lực lượng quản lý cấp trung (Team Leaders & Supervisors) để tối ưu hóa hiệu quả vận hành và năng suất làm việc nhóm.`
                          : `Managing a department of ${current.headcount} personnel at ${current.company} required implementing a structured delegation matrix, developing middle management layers (Team Leaders & Supervisors) to maximize operational efficiency and team productivity.`}
                      </p>
                      <p>
                        {isVi
                          ? "Chiến lược quản trị bao gồm: Chuẩn hóa quy trình giao việc, áp dụng quản trị mục tiêu OKRs/KPIs, thiết lập các cuộc họp định kỳ đánh giá chất lượng (Weekly/Monthly Review), và xây dựng chương trình phát triển năng lực nội bộ liên tục."
                          : "Core leadership strategies included: Standardizing job allocation, establishing OKRs/KPIs dashboards, institisting daily standups & weekly/monthly operations reviews, and structuring active employee upskilling programs."}
                      </p>
                    </div>

                    {customPositions.filter(p => p.milestoneKey === current.key).length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-h6 font-bold text-slate-950 dark:text-white uppercase tracking-wider">{isVi ? "Các Vị Trí Bổ Sung Đã Tạo Thẻ" : "Additional Role Extensions"}</h4>
                        <div className="grid grid-cols-1 gap-3">
                          {customPositions.filter(p => p.milestoneKey === current.key).map(cp => (
                            <div key={cp.id} className="p-4 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100/60 dark:border-emerald-900/40 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="font-extrabold text-emerald-950 dark:text-emerald-200 text-sm">{cp.title}</span>
                                <span className="text-3xs font-mono font-bold px-2 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">{cp.level}</span>
                              </div>
                              <p className="text-body-sm text-slate-500"><strong>{isVi ? "Bộ phận: " : "Department: "}</strong> {cp.department} • <strong>{isVi ? "Quy mô: " : "Scale: "}</strong> {cp.headcount}</p>
                              <p className="text-body-sm italic text-slate-600 dark:text-slate-400">"{cp.scope}"</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeSubCard === 2 && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100/60 dark:border-emerald-900/40 space-y-3">
                      <h4 className="text-h6 font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider">{isVi ? "Các chỉ số KPIs & Hiệu suất thực chiến" : "Key Metrics & Success Outcomes"}</h4>
                      <div className="grid grid-cols-1 gap-4">
                        {current.kpis && current.kpis.map((kpi, idx) => (
                          <div key={idx} className="space-y-2 bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                            <div className="flex items-center justify-between text-xs font-extrabold">
                              <span className="text-slate-800 dark:text-slate-200">{kpi.label}</span>
                              <span className="text-emerald-600 dark:text-emerald-400 font-mono font-black text-sm">{kpi.percent}%</span>
                            </div>
                            <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" style={{ width: `${kpi.percent}%` }} />
                            </div>
                            <p className="text-body-sm text-slate-500 font-normal pt-1">
                              {isVi 
                                ? `Đạt mức hoàn thành ${kpi.percent}% so với chỉ tiêu ban đầu. Điều này khẳng định năng lực tối ưu quy trình và duy trì cam kết phục vụ ổn định chất lượng cao.`
                                : `Successfully achieved ${kpi.percent}% of target expectations. This demonstrates strong discipline in process optimization and maintaining high service quality.`}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2.5">
                      <h4 className="text-h6 font-bold text-slate-900 dark:text-white uppercase tracking-wider">{isVi ? "Tác động thực tiễn & Cải tiến" : "Operational Impact & Methodology"}</h4>
                      <p>
                        {isVi 
                          ? "Hệ thống KPIs được thiết kế khoa học bám sát hành trình khách hàng bao gồm các chỉ số về Tốc độ (SLA/Response Time), Chất lượng (CSAT/QA Score), Hiệu suất (AHT/Năng suất xử lý) và Sự trung thành (NPS). Việc đo lường tự động qua CRM và báo cáo thời gian thực giúp giảm thiểu sai số, phát hiện điểm nghẽn vận hành ngay lập tức."
                          : "The KPIs dashboard was custom engineered to align with the customer lifecycle, tracking Speed (SLA/Response Time), Quality (CSAT/QA Score), Productivity (AHT/Throughput), and Loyalty (NPS). Implementing automated telemetry via CRM provided real-time bottleneck detection and eliminated tracking bias."}
                      </p>
                      <p>
                        {isVi
                          ? "Nhờ cơ chế thưởng phạt minh bạch theo kết quả KPI và đào tạo cá nhân hóa đối với nhân viên có hiệu suất dưới trung bình, toàn bộ phòng ban luôn duy trì tinh thần cải tiến liên tục, đưa chất lượng dịch vụ dẫn đầu ngành."
                          : "A transparent reward-and-coaching cycle mapped to these metrics, alongside targeted support for underperforming staff, drove consistent service excellence and established industry-leading customer experience ratings."}
                      </p>
                    </div>
                  </div>
                )}

                {activeSubCard === 3 && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100/60 dark:border-indigo-900/40 space-y-3">
                      <h4 className="text-h6 font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider">{isVi ? "Chi tiết các hạng mục công việc đã thực thi" : "Execution Checklist & Operational Focus"}</h4>
                      <div className="space-y-2.5">
                        {current.tasks && current.tasks.map((task, tIdx) => (
                          <div key={tIdx} className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start gap-3 shadow-2xs">
                            <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-mono font-bold text-2xs flex items-center justify-center shrink-0 mt-0.5">{tIdx + 1}</span>
                            <div className="flex-1">
                              <span className="font-semibold text-slate-800 dark:text-slate-200 block">{task}</span>
                              <span className="text-2xs text-slate-500 block mt-0.5">
                                {isVi 
                                  ? "Thiết lập quy chuẩn hóa hoạt động, lập biên bản vận hành SOP và giám sát kết quả thực tế hàng ngày."
                                  : "Standardized through Standard Operating Procedures (SOPs) with daily outcome monitoring."}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeSubCard === 4 && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-100/60 dark:border-amber-900/40 space-y-3">
                      <h4 className="text-h6 font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">{isVi ? "Các dự án chuyển đổi số & Chuyên án cải tiến" : "Digital Transformation & Strategic Projects"}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {current.projects && current.projects.map((proj, pIdx) => (
                          <div key={pIdx} className="p-3.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2">
                            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold">
                              <FolderKanban className="w-4 h-4 shrink-0" />
                              <span className="truncate text-xs sm:text-sm">{proj}</span>
                            </div>
                            <p className="text-body-sm text-slate-500 font-normal">
                              {isVi 
                                ? `Dự án chiến lược nhằm cải tiến tự động hóa quy trình nghiệp vụ, số hóa cơ sở dữ liệu khách hàng và đồng bộ hóa đa kênh phục vụ.`
                                : `A strategic initiative centered on workflow automation, customer database digitization, and omnichannel synchronization.`}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2.5">
                      <h4 className="text-h6 font-bold text-slate-900 dark:text-white uppercase tracking-wider">{isVi ? "Kết quả & Giá trị kinh doanh mang lại" : "Business Outcomes & Return on Investment"}</h4>
                      <p>
                        {isVi 
                          ? "Các dự án này đã mang lại sự bứt phá vượt bậc về năng suất và trải nghiệm khách hàng: Rút ngắn 40% thời gian chờ đợi phản hồi của khách hàng, giảm thiểu 25% chi phí vận hành thủ công nhờ tự động hóa CRM, đồng thời mở rộng năng lực phục vụ đa kênh không giới hạn vị trí địa lý."
                          : "These high-impact projects delivered profound advancements in productivity and customer engagement: cutting response latencies by 40%, dropping manual overhead expenses by 25% through CRM automated routing, and expanding omnichannel support capability across multiple nodes."}
                      </p>
                    </div>
                  </div>
                )}

                {activeSubCard === 5 && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-cyan-50/40 dark:bg-cyan-950/20 border border-cyan-100/60 dark:border-cyan-900/40 space-y-3.5">
                      <h4 className="text-h6 font-bold text-cyan-900 dark:text-cyan-300 uppercase tracking-wider">{isVi ? "Cam kết chất lượng dịch vụ vận hành (SLA/SOP)" : "Service Level Agreements & Quality Compliance"}</h4>
                      <div className="space-y-2.5">
                        {current.commitments && current.commitments.map((cmt, cIdx) => (
                          <div key={cIdx} className="p-3.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start gap-3 shadow-2xs">
                            <ShieldCheck className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold text-slate-800 dark:text-slate-100 block">{cmt}</span>
                              <span className="text-2xs text-slate-500 block mt-0.5">
                                {isVi 
                                  ? "Cam kết tuân thủ 100% tiêu chuẩn, rà soát chất lượng ghi âm cuộc gọi và quy trình nghiệp vụ ngẫu nhiên định kỳ."
                                  : "Backed by 100% audit strictness, regular random QA evaluations, and thorough performance reviews."}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeSubCard === 6 && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-100/60 dark:border-rose-900/40 space-y-3">
                      <h4 className="text-h6 font-bold text-rose-900 dark:text-rose-300 uppercase tracking-wider">{isVi ? "Khoảnh khắc & Tư liệu hình ảnh thực chiến" : "Workplace Album & Historical Gallery"}</h4>
                      
                      {photos.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {photos.map((photo, pIdx) => (
                            <div
                              key={pIdx}
                              className="group relative h-28 sm:h-36 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950"
                            >
                              <img 
                                src={photo.src} 
                                alt={photo.title || current.company} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 p-2 flex items-end">
                                <span className="text-3xs text-white font-bold truncate">
                                  {photo.title || `Photo ${pIdx + 1}`}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-caption text-slate-500 text-center py-6">{isVi ? "Không có hình ảnh tư liệu cho cột mốc này." : "No visual records stored for this milestone."}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setActiveSubCard(null)}
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-xs cursor-pointer shadow-md transition-all active:scale-95"
                >
                  {isVi ? "Đóng" : "Close"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};


export default function Experience() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  
  const [activeYear, setActiveYear] = useState<string>("2013");
  const [timelineScale, setTimelineScale] = useState<number>(1);
  const [isAutoScale, setIsAutoScale] = useState<boolean>(true);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const timelineWrapperRef = React.useRef<HTMLDivElement>(null);
  
  // Interactive Modals & Drawers
  const [expandedCardKey, setExpandedCardKey] = useState<string | null>(null);
  const [expandedCardIds, setExpandedCardIds] = useState<Record<string, boolean>>({});
  const [selectedMilestoneForDetail, setSelectedMilestoneForDetail] = useState<MilestoneData | null>(null);
  const [isDetailModalFullscreen, setIsDetailModalFullscreen] = useState<boolean>(false);
  const [selectedMilestoneForGallery, setSelectedMilestoneForGallery] = useState<MilestoneData | null>(null);
  const [galleryActiveIndex, setGalleryActiveIndex] = useState<number>(0);
  const [isPlayingAudioNarrative, setIsPlayingAudioNarrative] = useState<boolean>(false);

  const isVi = lang === "vi";
  const current = MILESTONES_DATA[activeYear] || MILESTONES_DATA["2013"];

  const handleSelectYear = (key: string) => {
    setActiveYear(key);
  };

  const handleToggleDetailInline = (key: string) => {
    setExpandedCardIds(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleOpenDetailModal = (milestone: MilestoneData, fullscreen = false) => {
    setSelectedMilestoneForDetail(milestone);
    if (fullscreen) {
      setIsDetailModalFullscreen(true);
    }
  };

  const handleNavigateMilestoneDetail = (direction: "prev" | "next") => {
    if (!selectedMilestoneForDetail) return;
    const currentIndex = TIMELINE_ORDER.indexOf(selectedMilestoneForDetail.key);
    if (currentIndex === -1) return;
    
    let newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (newIndex < 0) newIndex = TIMELINE_ORDER.length - 1;
    if (newIndex >= TIMELINE_ORDER.length) newIndex = 0;
    
    const newKey = TIMELINE_ORDER[newIndex];
    if (MILESTONES_DATA[newKey]) {
      setSelectedMilestoneForDetail(MILESTONES_DATA[newKey]);
    }
  };

  // Keyboard navigation listener for full screen modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedMilestoneForDetail) return;
      if (e.key === "Escape") {
        setSelectedMilestoneForDetail(null);
      } else if (e.key === "ArrowLeft") {
        handleNavigateMilestoneDetail("prev");
      } else if (e.key === "ArrowRight") {
        handleNavigateMilestoneDetail("next");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMilestoneForDetail]);

  const handleOpenGalleryModal = (milestone: MilestoneData) => {
    setSelectedMilestoneForGallery(milestone);
    setGalleryActiveIndex(0);
  };

  const handleToggleAudioNarrative = () => {
    setIsPlayingAudioNarrative(!isPlayingAudioNarrative);
  };

  // Filter items
  const filteredMilestoneKeys = TIMELINE_ORDER.filter(key => {
    if (filterCategory === "all") return true;
    const item = MILESTONES_DATA[key];
    return item?.tagCategory === filterCategory;
  });

  // Get gallery photos for a given milestone
  const getGalleryPhotosForMilestone = (milestone: MilestoneData) => {
    if (milestone.memoryCompanyId) {
      const matched = MEMORIES_DATA.filter((m) => m.companyId === milestone.memoryCompanyId);
      if (matched.length > 0) return matched;
    }
    return [{
      id: milestone.key,
      src: milestone.photoUrl,
      alt: milestone.company,
      title: milestone.headerTitle,
      company: milestone.company,
      year: milestone.cardYearLabel,
      tag: milestone.tag,
      description: milestone.highlightText
    }];
  };

  // Render inline expanded drawer content for card mode
  const renderDetailContentInline = (item: MilestoneData) => {
    const isExpanded = !!expandedCardIds[item.key];
    
    return (
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden mt-4 pt-4 border-t border-slate-200 dark:border-slate-800/80 space-y-4 text-left"
          >
            {/* Highlight Box */}
            <div className="p-3.5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/50 text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
              {item.highlightText}
            </div>

            {/* KPIs Card */}
            {item.kpis && item.kpis.length > 0 && (
              <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 transition-all">
                <h4 className="text-2xs font-extrabold text-slate-600 dark:text-slate-400 tracking-wider flex items-center gap-1.5 pb-1.5 border-b border-slate-200 dark:border-slate-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{isVi ? "Chỉ số hiệu quả hoạt động (KPIs)" : "Key performance indicators"}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {item.kpis.map((kpi, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 space-y-1.5">
                      <div className="flex items-center justify-between text-2xs font-semibold">
                        <span className="text-slate-700 dark:text-slate-300 truncate max-w-[80%]">{kpi.label}</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-black shrink-0">{kpi.percent}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" 
                          style={{ width: `${kpi.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tasks Card */}
            {item.tasks && item.tasks.length > 0 && (
              <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 transition-all">
                <h4 className="text-2xs font-extrabold text-slate-600 dark:text-slate-400 tracking-wider flex items-center gap-1.5 pb-1.5 border-b border-slate-200 dark:border-slate-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <span>{isVi ? "Nhiệm vụ & trách nhiệm chính" : "Key responsibilities & tasks"}</span>
                </h4>
                <div className="grid grid-cols-1 gap-1.5">
                  {item.tasks.map((task, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 p-2.5 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Projects Card */}
            {item.projects && item.projects.length > 0 && (
              <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 transition-all">
                <h4 className="text-2xs font-extrabold text-slate-600 dark:text-slate-400 tracking-wider flex items-center gap-1.5 pb-1.5 border-b border-slate-200 dark:border-slate-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  <span>{isVi ? "Dự án tiêu biểu" : "Notable projects"}</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {item.projects.map((proj, idx) => (
                    <span key={idx} className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-950/80 text-orange-700 dark:text-orange-300 text-xs font-semibold border border-orange-200 dark:border-orange-950/60 flex items-center gap-1.5">
                      <FileText className="w-3 h-3 text-orange-500" />
                      {proj}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <section
      id="experience"
      className="relative min-h-full flex flex-col justify-start font-sans text-slate-800 dark:text-slate-100 w-full px-2 sm:px-4 lg:px-6 py-2 sm:py-3 gap-4 sm:gap-5"
    >
      {/* Header Card Kinh nghiệm (Sub Content: 14px – 15px) */}
      <PageCardHeader pageId="experience">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-5 bg-blue-600 dark:bg-blue-400 rounded-full shrink-0" />
          <span className="text-body-sub text-subcontent font-semibold font-mono text-blue-700 dark:text-blue-400 bg-blue-500/15 px-2.5 py-0.5 rounded-full border border-blue-500/30 shadow-2xs inline-flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5" />
            <span>{isVi ? "Từ vận hành đến quản trị cấp cao" : "From hands-on operations to senior management"}</span>
          </span>
        </div>
      </PageCardHeader>

      <TimelineRoadmapView
        isVi={isVi}
        activeYear={activeYear}
        setActiveYear={setActiveYear}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        timelineScale={timelineScale}
        setTimelineScale={setTimelineScale}
        isAutoScale={isAutoScale}
        setIsAutoScale={setIsAutoScale}
        timelineWrapperRef={timelineWrapperRef}
        getGalleryPhotosForMilestone={getGalleryPhotosForMilestone}
      />

      {/* ================= 4. MILESTONE FULL REPORT MODAL ================= */}
      {selectedMilestoneForDetail && (() => {
        const currentIndex = TIMELINE_ORDER.indexOf(selectedMilestoneForDetail.key);
        const milestoneNumber = currentIndex >= 0 ? currentIndex + 1 : 1;
        const totalMilestones = TIMELINE_ORDER.length;
        const photos = getGalleryPhotosForMilestone(selectedMilestoneForDetail);

        return (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden animate-in fade-in duration-200">
            <div 
              className={cn(
                "relative w-full max-w-7xl mx-auto bg-white dark:bg-slate-950 text-slate-800 dark:text-white rounded-[10px] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col transition-all duration-300 my-auto",
                isDetailModalFullscreen 
                  ? "h-full max-h-[96vh] rounded-[10px]" 
                  : "h-auto max-h-[88vh] rounded-[10px]"
              )}
            >
              
              {/* Modal Header */}
              <div className="flex items-center justify-between p-3.5 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/95 dark:bg-slate-900/90 backdrop-blur-md shrink-0">
                
                {/* Left: Brand & Milestone Info */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white dark:bg-slate-950 p-1.5 sm:p-2 border border-slate-200 dark:border-slate-800 shadow-sm shrink-0 flex items-center justify-center">
                    <img src={selectedMilestoneForDetail.logo} alt={selectedMilestoneForDetail.company} className="w-full h-full object-contain rounded-xl" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white text-3xs sm:text-xs font-mono font-black">
                        #{String(milestoneNumber).padStart(2, "0")} / {String(totalMilestones).padStart(2, "0")}
                      </span>
                      <span className="text-2xs sm:text-xs text-blue-600 dark:text-blue-400 font-bold">
                        {selectedMilestoneForDetail.period}
                      </span>
                    </div>
                    <h3 className="text-h6 text-slate-900 dark:text-white leading-tight truncate">
                      {selectedMilestoneForDetail.company}
                    </h3>
                  </div>
                </div>

                {/* Right: Milestone Switcher, Fullscreen Toggle, Close */}
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  
                  {/* Prev / Next milestone buttons */}
                  <div className="hidden sm:flex items-center gap-1 bg-slate-200/70 dark:bg-slate-800/70 rounded-xl p-1 border border-slate-300 dark:border-slate-700/60">
                    <button
                      type="button"
                      onClick={() => handleNavigateMilestoneDetail("prev")}
                      className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                      title={isVi ? "Cột mốc trước (Phím ←)" : "Previous milestone (Left Arrow)"}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-2xs font-mono font-bold px-1 text-slate-600 dark:text-slate-400">
                      {milestoneNumber}/{totalMilestones}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleNavigateMilestoneDetail("next")}
                      className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                      title={isVi ? "Cột mốc kế tiếp (Phím →)" : "Next milestone (Right Arrow)"}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Fullscreen Toggle Button */}
                  <button
                    type="button"
                    onClick={() => setIsDetailModalFullscreen(prev => !prev)}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
                    title={isDetailModalFullscreen ? (isVi ? "Thu nhỏ cửa sổ" : "Minimize Window") : (isVi ? "Phóng to toàn màn hình" : "Fullscreen")}
                  >
                    {isDetailModalFullscreen ? (
                      <Minimize2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    ) : (
                      <Maximize2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    )}
                  </button>

                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedMilestoneForDetail(null)}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-600 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
                    title={isVi ? "Đóng (Phím ESC)" : "Close (Escape)"}
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-6 md:p-8 space-y-6 overflow-y-auto flex-1 custom-scrollbar text-left">
                
                {/* Detailed Job Card inside Modal */}
                <div className="rounded-[10px] bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 md:p-7 space-y-4 sm:space-y-5 shadow-xl relative overflow-hidden text-left">
                  {/* Job Banner inside Modal */}
                  {selectedMilestoneForDetail.bannerUrl && (
                    <div className="w-full h-36 sm:h-48 md:h-60 rounded-xl overflow-hidden relative shadow-md border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 group/modal-banner -mt-1 mb-2">
                      <img
                        src={selectedMilestoneForDetail.bannerUrl}
                        alt={`${selectedMilestoneForDetail.company} Banner`}
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover/modal-banner:scale-105"
                        referrerPolicy="no-referrer"
                        loading="eager"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                    </div>
                  )}

                  {/* Job Card Top Bar */}
                  <div className="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white dark:bg-slate-950 p-2 border border-slate-200 dark:border-slate-800 shadow-sm shrink-0 flex items-center justify-center">
                        <img 
                          src={selectedMilestoneForDetail.logo} 
                          alt={selectedMilestoneForDetail.company} 
                          className="w-full h-full object-contain rounded-xl" 
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={cn("text-xs font-black px-2.5 py-0.5 rounded-md border", selectedMilestoneForDetail.tagColor)}>
                            {selectedMilestoneForDetail.tag}
                          </span>
                          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                            {selectedMilestoneForDetail.roleSub}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug truncate mt-0.5">
                          {selectedMilestoneForDetail.company}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className={cn("font-black text-xs sm:text-sm tracking-wider font-mono px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700", selectedMilestoneForDetail.cardYearColor)}>
                        {selectedMilestoneForDetail.cardYearLabel || selectedMilestoneForDetail.period}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleOpenGalleryModal(selectedMilestoneForDetail)}
                        className="px-3.5 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-pink-500/20 transition-all active:scale-95 cursor-pointer"
                      >
                        <ImageIcon className="w-4 h-4" />
                        <span>{isVi ? `Album (${selectedMilestoneForDetail.photoCount})` : `Photos (${selectedMilestoneForDetail.photoCount})`}</span>
                      </button>
                    </div>
                  </div>

                  {/* Role Title */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-transparent border border-blue-500/20">
                    <span className="text-3xs font-bold tracking-wider text-slate-500 dark:text-slate-400 block mb-0.5">
                      {isVi ? "Vị trí đảm nhận" : "Position & title"}
                    </span>
                    <h2 className="text-base sm:text-xl font-black text-slate-900 dark:text-white leading-tight">
                      {selectedMilestoneForDetail.role}
                    </h2>
                  </div>

                  {/* Description */}
                  <p className="text-body text-slate-600 dark:text-slate-300 font-normal">
                    {selectedMilestoneForDetail.cardDescription || selectedMilestoneForDetail.highlightText}
                  </p>

                  {/* Card Tags */}
                  {selectedMilestoneForDetail.cardTags && selectedMilestoneForDetail.cardTags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {selectedMilestoneForDetail.cardTags.map((tagText, tagIdx) => (
                        <span 
                          key={tagIdx}
                          className="px-2.5 sm:px-3 py-1 rounded-full text-2xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 whitespace-nowrap"
                        >
                          {tagText}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* 4-Card Quick Metrics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
                    <span className="text-3xs font-bold text-slate-500 uppercase tracking-wider block">
                      {isVi ? "Thời gian làm việc" : "Timeline"}
                    </span>
                    <span className="text-xs sm:text-sm font-black text-blue-600 dark:text-blue-400 mt-0.5 block">
                      {selectedMilestoneForDetail.period}
                    </span>
                  </div>
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
                    <span className="text-3xs font-bold text-slate-500 uppercase tracking-wider block">
                      {isVi ? "Quy mô quản lý" : "Team Scale"}
                    </span>
                    <span className="text-xs sm:text-sm font-black text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                      {selectedMilestoneForDetail.headcount} {isVi ? "nhân sự" : "members"}
                    </span>
                  </div>
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
                    <span className="text-3xs font-bold text-slate-500 uppercase tracking-wider block">
                      {isVi ? "Lĩnh vực chuyên môn" : "Domain Focus"}
                    </span>
                    <span className="text-xs sm:text-sm font-black text-purple-600 dark:text-purple-400 mt-0.5 block truncate">
                      {selectedMilestoneForDetail.tag}
                    </span>
                  </div>
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
                    <span className="text-3xs font-bold text-slate-500 uppercase tracking-wider block">
                      {isVi ? "Hình ảnh tư liệu" : "Photo Records"}
                    </span>
                    <span className="text-xs sm:text-sm font-black text-pink-600 dark:text-pink-400 mt-0.5 block">
                      {selectedMilestoneForDetail.photoCount} {isVi ? "hình ảnh lưu trữ" : "photos"}
                    </span>
                  </div>
                </div>

                {/* Highlight Quote */}
                <div className="p-4 sm:p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 text-blue-500/10 dark:text-blue-500/10 pointer-events-none">
                    <Sparkles className="w-24 h-24" />
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-500 font-serif text-2xl leading-none shrink-0">“</span>
                    <p className="flex-1 italic">{selectedMilestoneForDetail.highlightText}</p>
                  </div>
                </div>

                {/* In-depth Narratives */}
                <div className="space-y-3.5">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <span>{isVi ? "Tổng quan hành trình & đóng góp" : "Executive overview & story"}</span>
                  </h4>
                  <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal bg-slate-50/60 dark:bg-slate-900/40 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                    {selectedMilestoneForDetail.paragraphs.map((p, idx) => (
                      <p key={idx} className="leading-relaxed">{p}</p>
                    ))}
                  </div>
                </div>

                {/* KPIs */}
                {selectedMilestoneForDetail.kpis && selectedMilestoneForDetail.kpis.length > 0 && (
                  <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <h4 className="text-xs font-black text-slate-700 dark:text-slate-300 tracking-wider flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-emerald-500" />
                      <span>{isVi ? "Chỉ số hiệu quả hoạt động (KPIs)" : "Key performance indicators"}</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedMilestoneForDetail.kpis.map((kpi, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 shadow-2xs">
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span className="text-slate-800 dark:text-slate-200">{kpi.label}</span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-mono font-black">{kpi.percent}%</span>
                          </div>
                          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500" style={{ width: `${kpi.percent}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tasks & Responsibilities */}
                {selectedMilestoneForDetail.tasks && selectedMilestoneForDetail.tasks.length > 0 && (
                  <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <h4 className="text-xs font-black text-slate-700 dark:text-slate-300 tracking-wider flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-500" />
                      <span>{isVi ? "Nhiệm vụ & trách nhiệm chủ chốt" : "Core responsibilities & tasks"}</span>
                    </h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {selectedMilestoneForDetail.tasks.map((task, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xs">
                          <Check className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                          <span>{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Strategic Projects */}
                {selectedMilestoneForDetail.projects && selectedMilestoneForDetail.projects.length > 0 && (
                  <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <h4 className="text-xs font-black text-slate-700 dark:text-slate-300 tracking-wider flex items-center gap-2">
                      <Folder className="w-4 h-4 text-orange-500" />
                      <span>{isVi ? "Dự án tiêu biểu & chuyển đổi số" : "Featured projects & transformation"}</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMilestoneForDetail.projects.map((proj, idx) => (
                        <span key={idx} className="px-3 py-2 rounded-xl bg-white dark:bg-slate-950 text-orange-700 dark:text-orange-300 text-xs font-bold border border-orange-200 dark:border-orange-950/60 flex items-center gap-1.5 shadow-2xs">
                          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Photo Album Strip Preview */}
                {photos.length > 0 && (
                  <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 tracking-wider flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-pink-500" />
                        <span>{isVi ? "Hình ảnh tư liệu thực tế" : "Archived photo gallery"}</span>
                      </h4>
                      <button
                        type="button"
                        onClick={() => handleOpenGalleryModal(selectedMilestoneForDetail)}
                        className="text-xs text-pink-600 dark:text-pink-400 font-bold hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <span>{isVi ? "Xem toàn bộ" : "View all"}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {photos.slice(0, 4).map((photo, pIdx) => (
                        <div
                          key={pIdx}
                          onClick={() => {
                            setGalleryActiveIndex(pIdx);
                            setSelectedMilestoneForGallery(selectedMilestoneForDetail);
                          }}
                          className="group relative h-24 sm:h-28 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 cursor-pointer bg-slate-950"
                        >
                          <img 
                            src={photo.src} 
                            alt={photo.title || selectedMilestoneForDetail.company} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                            <span className="text-3xs text-white font-bold truncate">
                              {photo.title || `Photo ${pIdx + 1}`}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Modal Footer */}
              <div className="p-3.5 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/95 dark:bg-slate-900/90 backdrop-blur-md flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleNavigateMilestoneDetail("prev")}
                    className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">{isVi ? "Trước" : "Prev"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavigateMilestoneDetail("next")}
                    className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span className="hidden sm:inline">{isVi ? "Kế tiếp" : "Next"}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenGalleryModal(selectedMilestoneForDetail)}
                    className="px-3.5 sm:px-4 py-2 rounded-xl bg-pink-50 dark:bg-pink-950/50 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer hover:bg-pink-100 dark:hover:bg-pink-900/60 transition-colors"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>{isVi ? "Album ảnh" : "Gallery"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedMilestoneForDetail(null)}
                    className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs cursor-pointer shadow-md transition-all active:scale-95"
                  >
                    {isVi ? "Đóng" : "Close"}
                  </button>
                </div>
              </div>

            </div>
          </div>
        );
      })()}

      {/* ================= 5. PHOTO GALLERY ALBUM MODAL ================= */}
      {selectedMilestoneForGallery && (() => {
        const photos = getGalleryPhotosForMilestone(selectedMilestoneForGallery);
        const currentPhoto = photos[galleryActiveIndex] || photos[0];

        return (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <div className="relative max-w-4xl w-full bg-slate-950 text-white rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
              
              {/* Top Modal Bar */}
              <div className="flex items-center justify-between p-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white p-1 shrink-0">
                    <img src={selectedMilestoneForGallery.logo} alt={selectedMilestoneForGallery.company} className="w-full h-full object-contain rounded-full" />
                  </div>
                  <div>
                    <h3 className="text-h6 text-white">
                      {selectedMilestoneForGallery.company} — {isVi ? "Album tư liệu" : "Photo Album"}
                    </h3>
                    <span className="text-xs text-slate-400">
                      {galleryActiveIndex + 1} / {photos.length} {isVi ? "hình ảnh" : "photos"}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedMilestoneForGallery(null)}
                  className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Photo Display */}
              <div className="relative min-h-[300px] sm:min-h-[420px] max-h-[60vh] flex items-center justify-center p-4 bg-black/60">
                {currentPhoto && (
                  <img 
                    src={currentPhoto.src} 
                    alt={currentPhoto.title || selectedMilestoneForGallery.company} 
                    className="max-h-[55vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
                  />
                )}

                {/* Left/Right Carousel Controls */}
                {photos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setGalleryActiveIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setGalleryActiveIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Caption & Thumbnail Strip */}
              <div className="p-4 border-t border-slate-800 bg-slate-900/90 space-y-3">
                {currentPhoto && (
                  <p className="text-caption font-medium text-slate-300 text-center">
                    {currentPhoto.title || currentPhoto.description || selectedMilestoneForGallery.highlightText}
                  </p>
                )}

                {/* Thumbnail Strip */}
                {photos.length > 1 && (
                  <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
                    {photos.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setGalleryActiveIndex(idx)}
                        className={cn(
                          "w-14 h-10 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer",
                          galleryActiveIndex === idx 
                            ? "border-blue-500 scale-105 shadow-md shadow-blue-500/30" 
                            : "border-slate-700 opacity-60 hover:opacity-100"
                        )}
                      >
                        <img src={p.src} alt="thumb" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        );
      })()}

    </section>
  );
}
