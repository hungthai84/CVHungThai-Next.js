import React, { useState, useMemo, useEffect } from "react";
import { 
  Camera, Award, Users, Calendar, MapPin, 
  Sparkles, Heart, Star, Layers, ChevronRight, ChevronLeft,
  X, ZoomIn, MessageSquare, Share2, RefreshCw, Search,
  Filter, Grid, LayoutGrid, Check, Quote, ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n";
import { PageCardHeader } from "./PageCardHeader";
import { IndustrialSubSection } from "./IndustrialStaggerContainer";
import MasonryGallery, { MasonryItem } from "./MasonryGallery";
import { playUiSound } from "../lib/sound";
import { cn } from "../lib/utils";

export interface MemoryItem {
  id: string;
  companyId?: "mobifone" | "htvc" | "ved" | "prudential" | "momo" | "finviet" | "v247" | string;
  category: "awards" | "team" | "projects" | "milestones";
  titleVi: string;
  titleEn: string;
  title?: string;
  src: string;
  alt?: string;
  company?: string;
  year: string;
  locationVi: string;
  locationEn: string;
  tagVi: string;
  tagEn: string;
  imageUrl: string;
  gradient: string;
  descVi: string;
  descEn: string;
  description?: string;
  quoteVi?: string;
  quoteEn?: string;
  teamSize?: string;
}

export const MEMORIES_DATA: MemoryItem[] = [
  // --- FINVIET (2023 - 2024) ---
  {
    id: "finviet-1",
    companyId: "finviet",
    category: "awards",
    titleVi: "Finviet • Vinh danh Lãnh đạo Vận hành Xuất sắc",
    titleEn: "Finviet • Outstanding Operational Leadership Award",
    title: "Finviet • Vinh danh Lãnh đạo Vận hành Xuất sắc",
    year: "2024",
    locationVi: "TP. Hồ Chí Minh",
    locationEn: "Ho Chi Minh City",
    tagVi: "Giải thưởng",
    tagEn: "Honors",
    imageUrl: "https://i.ibb.co/Rp4jmTWF/Finviet-1.webp",
    src: "https://i.ibb.co/Rp4jmTWF/Finviet-1.webp",
    gradient: "from-amber-500 to-orange-600",
    descVi: "Ghi nhận đóng góp xuất sắc trong việc tái cấu trúc bộ phận CSKH, nâng cao hiệu quả vận hành và chỉ số CSAT đạt 98%.",
    descEn: "Honoring outstanding leadership in restructuring CS operations, optimizing team performance, and achieving 98% CSAT.",
    quoteVi: "“Chất lượng dịch vụ được định hình từ kỷ luật và lòng thấu cảm của từng nhân sự.”",
    quoteEn: "“Service excellence is built upon personal discipline and genuine empathy.”",
    teamSize: "120+ Agents"
  },

  // --- MOMO (2020 - 2023) ---
  {
    id: "momo-1",
    companyId: "momo",
    category: "team",
    titleVi: "MoMo • Gắn kết Đội ngũ Chăm Sóc Khách Hàng",
    titleEn: "MoMo • CS Team Bonding & Culture",
    title: "MoMo • Gắn kết Đội ngũ Chăm Sóc Khách Hàng",
    year: "2023",
    locationVi: "TP. Hồ Chí Minh",
    locationEn: "Ho Chi Minh City",
    tagVi: "Văn hóa Đội ngũ",
    tagEn: "Team Culture",
    imageUrl: "https://i.ibb.co/S7ySGnvC/Momo-1.webp",
    src: "https://i.ibb.co/S7ySGnvC/Momo-1.webp",
    gradient: "from-pink-500 to-rose-600",
    descVi: "Hoạt động giao lưu, nâng cao tinh thần đồng đội và văn hóa phục vụ người dùng trong hệ sinh thái siêu ứng dụng tài chính.",
    descEn: "Team engagement cultivating customer-centric culture across the financial super-app ecosystem.",
    teamSize: "150+ Members"
  },
  {
    id: "momo-2",
    companyId: "momo",
    category: "projects",
    titleVi: "MoMo • Triển khai Dự án Vận hành Đột phá",
    titleEn: "MoMo • Strategic Operations Deployment",
    title: "MoMo • Triển khai Dự án Vận hành Đột phá",
    year: "2022",
    locationVi: "TP. Hồ Chí Minh",
    locationEn: "Ho Chi Minh City",
    tagVi: "Dự án Trọng điểm",
    tagEn: "Key Project",
    imageUrl: "https://i.ibb.co/v6K5jLsQ/Momo-2.webp",
    src: "https://i.ibb.co/v6K5jLsQ/Momo-2.webp",
    gradient: "from-purple-500 to-pink-600",
    descVi: "Tối ưu hóa các quy trình hỗ trợ giao dịch số, thanh toán ví điện tử và giải quyết khiếu nại tự động hóa.",
    descEn: "Optimizing digital wallet dispute resolution and transaction support workflows.",
    teamSize: "Cross-Functional"
  },
  {
    id: "momo-3",
    companyId: "momo",
    category: "team",
    titleVi: "MoMo • Đào tạo Kỹ năng & Nâng cao Năng lực",
    titleEn: "MoMo • CS Upskilling & Leadership Coaching",
    title: "MoMo • Đào tạo Kỹ năng & Nâng cao Năng lực",
    year: "2022",
    locationVi: "TP. Hồ Chí Minh",
    locationEn: "Ho Chi Minh City",
    tagVi: "Đào tạo",
    tagEn: "Training",
    imageUrl: "https://i.ibb.co/DsvVt9C/Momo-3.webp",
    src: "https://i.ibb.co/DsvVt9C/Momo-3.webp",
    gradient: "from-rose-500 to-pink-600",
    descVi: "Chương trình huấn luyện nghiệp vụ chuyên sâu và kỹ năng mềm cho đội ngũ quản lý cấp trung.",
    descEn: "Specialized soft-skills and operations management coaching for team supervisors.",
    teamSize: "40+ Leads"
  },
  {
    id: "momo-4",
    companyId: "momo",
    category: "milestones",
    titleVi: "MoMo • Lễ Kỷ niệm Dấu ấn Tăng trưởng Dịch vụ",
    titleEn: "MoMo • Service Growth Celebration",
    title: "MoMo • Lễ Kỷ niệm Dấu ấn Tăng trưởng Dịch vụ",
    year: "2022",
    locationVi: "TP. Hồ Chí Minh",
    locationEn: "Ho Chi Minh City",
    tagVi: "Cột mốc",
    tagEn: "Milestones",
    imageUrl: "https://i.ibb.co/gLdK4ss8/Momo-4.webp",
    src: "https://i.ibb.co/gLdK4ss8/Momo-4.webp",
    gradient: "from-fuchsia-500 to-rose-600",
    descVi: "Ghi nhận những bước phát triển vượt bậc của trung tâm liên lạc trong giai đoạn chuyển đổi số thần tốc.",
    descEn: "Celebrating record milestones during hyper-growth digital transformation.",
    teamSize: "200+ Members"
  },
  {
    id: "momo-5",
    companyId: "momo",
    category: "team",
    titleVi: "MoMo • Hoạt động Văn hóa & Tinh thần Đồng đội",
    titleEn: "MoMo • Team Spirit & Community Activity",
    title: "MoMo • Hoạt động Văn hóa & Tinh thần Đồng đội",
    year: "2021",
    locationVi: "TP. Hồ Chí Minh",
    locationEn: "Ho Chi Minh City",
    tagVi: "Văn hóa Đội ngũ",
    tagEn: "Team Culture",
    imageUrl: "https://i.ibb.co/svYWnsHK/Momo-5.webp",
    src: "https://i.ibb.co/svYWnsHK/Momo-5.webp",
    gradient: "from-pink-600 to-rose-500",
    descVi: "Xây dựng môi trường làm việc tích cực, thấu hiểu và truyền cảm hứng cho nhân viên tuyến đầu.",
    descEn: "Building a supportive, inspirational workplace for frontline agents.",
    teamSize: "Full Team"
  },
  {
    id: "momo-6",
    companyId: "momo",
    category: "projects",
    titleVi: "MoMo • Tổng kết Chiến dịch Vận hành Cao điểm",
    titleEn: "MoMo • Peak Season Operations Wrap-Up",
    title: "MoMo • Tổng kết Chiến dịch Vận hành Cao điểm",
    year: "2021",
    locationVi: "TP. Hồ Chí Minh",
    locationEn: "Ho Chi Minh City",
    tagVi: "Sự kiện",
    tagEn: "Events",
    imageUrl: "https://i.ibb.co/BVH5GdtT/Momo-6.webp",
    src: "https://i.ibb.co/BVH5GdtT/Momo-6.webp",
    gradient: "from-rose-500 to-red-600",
    descVi: "Hoàn thành xuất sắc các chỉ số SLA trong các đợt bùng nổ khuyến mãi và mua sắm cuối năm.",
    descEn: "Successfully upholding strict SLAs during major e-commerce festive shopping sprees.",
    teamSize: "Operation Hub"
  },
  {
    id: "momo-7",
    companyId: "momo",
    category: "awards",
    titleVi: "MoMo • Tuyên dương Thành viên & Tập thể Xuất sắc",
    titleEn: "MoMo • Outstanding Members Recognition",
    title: "MoMo • Tuyên dương Thành viên & Tập thể Xuất sắc",
    year: "2021",
    locationVi: "TP. Hồ Chí Minh",
    locationEn: "Ho Chi Minh City",
    tagVi: "Vinh danh",
    tagEn: "Awards",
    imageUrl: "https://i.ibb.co/G3MgYJp3/Momo-7.webp",
    src: "https://i.ibb.co/G3MgYJp3/Momo-7.webp",
    gradient: "from-amber-500 to-pink-600",
    descVi: "Trao thưởng cho những cá nhân đạt điểm chất lượng nghiệp vụ và thái độ phục vụ cao nhất quý.",
    descEn: "Recognizing high performers with top-tier QA scores and exceptional service attitude.",
    teamSize: "Star Performers"
  },
  {
    id: "momo-8",
    companyId: "momo",
    category: "milestones",
    titleVi: "MoMo • Dấu ấn Kỷ niệm Chặng đường Đồng hành",
    titleEn: "MoMo • Team Journey Celebration",
    title: "MoMo • Dấu ấn Kỷ niệm Chặng đường Đồng hành",
    year: "2020",
    locationVi: "TP. Hồ Chí Minh",
    locationEn: "Ho Chi Minh City",
    tagVi: "Kỷ niệm",
    tagEn: "Milestones",
    imageUrl: "https://i.ibb.co/398WZf65/Momo-8.webp",
    src: "https://i.ibb.co/398WZf65/Momo-8.webp",
    gradient: "from-pink-500 to-purple-600",
    descVi: "Gắn bó cùng sự phát triển mạnh mẽ của thanh toán không tiền mặt tại Việt Nam.",
    descEn: "Commemorating years of contribution to cashless financial empowerment in Vietnam.",
    teamSize: "Company Wide"
  },

  // --- PRUDENTIAL (2014 - 2020) ---
  {
    id: "prudential-1",
    companyId: "prudential",
    category: "projects",
    titleVi: "Prudential • Vận hành Trung tâm Liên lạc Khách hàng",
    titleEn: "Prudential • Customer Contact Center Operations",
    title: "Prudential • Vận hành Trung tâm Liên lạc Khách hàng",
    year: "2020",
    locationVi: "TP. Hồ Chí Minh",
    locationEn: "Ho Chi Minh City",
    tagVi: "Vận hành",
    tagEn: "Operations",
    imageUrl: "https://i.ibb.co/CK2Y62Zy/Prudential-1.webp",
    src: "https://i.ibb.co/CK2Y62Zy/Prudential-1.webp",
    gradient: "from-red-600 to-rose-700",
    descVi: "Chuẩn hóa quy trình tiếp nhận và xử lý quyền lợi bảo hiểm, nâng cao trải nghiệm khách hàng tham gia bảo hiểm nhân thọ.",
    descEn: "Standardizing life insurance claim inquiries and customer support touchpoints.",
    teamSize: "80+ Agents"
  },
  {
    id: "prudential-2",
    companyId: "prudential",
    category: "team",
    titleVi: "Prudential • Đào tạo Chuẩn mực Dịch vụ Bảo hiểm",
    titleEn: "Prudential • Service Excellence Coaching",
    title: "Prudential • Đào tạo Chuẩn mực Dịch vụ Bảo hiểm",
    year: "2019",
    locationVi: "TP. Hồ Chí Minh",
    locationEn: "Ho Chi Minh City",
    tagVi: "Đào tạo",
    tagEn: "Coaching",
    imageUrl: "https://i.ibb.co/HD71024V/Prudential-2.webp",
    src: "https://i.ibb.co/HD71024V/Prudential-2.webp",
    gradient: "from-red-500 to-orange-600",
    descVi: "Tổ chức chuỗi workshop chuyên sâu về kỹ năng giải quyết khủng hoảng và thấu hiểu tâm lý khách hàng.",
    descEn: "Conducting intensive workshops on customer psychology and empathetic communication.",
    teamSize: "50+ Leads"
  },
  {
    id: "prudential-3",
    companyId: "prudential",
    category: "milestones",
    titleVi: "Prudential • Sự kiện Kỷ niệm & Tổng kết Chiến dịch",
    titleEn: "Prudential • Campaign Wrap-up & Gala",
    title: "Prudential • Sự kiện Kỷ niệm & Tổng kết Chiến dịch",
    year: "2018",
    locationVi: "TP. Hồ Chí Minh",
    locationEn: "Ho Chi Minh City",
    tagVi: "Sự kiện",
    tagEn: "Events",
    imageUrl: "https://i.ibb.co/TM32Dg85/Prudential-3.webp",
    src: "https://i.ibb.co/TM32Dg85/Prudential-3.webp",
    gradient: "from-rose-600 to-red-700",
    descVi: "Tôn vinh nỗ lực của tập thể CSKH trong việc duy trì tỷ lệ giải quyết cuộc gọi lần đầu (FCR) đạt trên 90%.",
    descEn: "Honoring team efforts for maintaining First Contact Resolution (FCR) above 90%.",
    teamSize: "Contact Center"
  },
  {
    id: "prudential-4",
    companyId: "prudential",
    category: "team",
    titleVi: "Prudential • Hoạt động Gắn kết & Hội thảo Chuyên môn",
    titleEn: "Prudential • Professional Seminar & Teambuilding",
    title: "Prudential • Hoạt động Gắn kết & Hội thảo Chuyên môn",
    year: "2017",
    locationVi: "TP. Hồ Chí Minh",
    locationEn: "Ho Chi Minh City",
    tagVi: "Văn hóa Đội ngũ",
    tagEn: "Team Culture",
    imageUrl: "https://i.ibb.co/sd8bZfsk/Prudential-4.webp",
    src: "https://i.ibb.co/sd8bZfsk/Prudential-4.webp",
    gradient: "from-red-600 to-pink-600",
    descVi: "Xây dựng môi trường làm việc đoàn kết, gắn bó và không ngừng hoàn thiện kỹ năng chuyên môn.",
    descEn: "Fostering collaboration, unity, and continuous professional growth.",
    teamSize: "100+ Members"
  },
  {
    id: "prudential-5",
    companyId: "prudential",
    category: "awards",
    titleVi: "Prudential • Vinh danh Lãnh đạo Đội ngũ Tiêu biểu",
    titleEn: "Prudential • Leadership Recognition Award",
    title: "Prudential • Vinh danh Lãnh đạo Đội ngũ Tiêu biểu",
    year: "2016",
    locationVi: "TP. Hồ Chí Minh",
    locationEn: "Ho Chi Minh City",
    tagVi: "Giải thưởng",
    tagEn: "Awards",
    imageUrl: "https://i.ibb.co/XZXnp2Dw/Prudential-5.webp",
    src: "https://i.ibb.co/XZXnp2Dw/Prudential-5.webp",
    gradient: "from-amber-500 to-red-600",
    descVi: "Trao thưởng cho quản lý xuất sắc trong cải tiến quy trình vận hành và huấn luyện nhân sự chất lượng cao.",
    descEn: "Recognizing outstanding operational improvement and high-performing staff coaching.",
    teamSize: "Leadership Team"
  },
  {
    id: "prudential-6",
    companyId: "prudential",
    category: "team",
    titleVi: "Prudential • Chương trình Team Building & Gắn kết",
    titleEn: "Prudential • Annual Team Retreat",
    title: "Prudential • Chương trình Team Building & Gắn kết",
    year: "2015",
    locationVi: "Vũng Tàu",
    locationEn: "Vung Tau",
    tagVi: "Team Building",
    tagEn: "Team Building",
    imageUrl: "https://i.ibb.co/1t8kkHGm/Prudential-6.webp",
    src: "https://i.ibb.co/1t8kkHGm/Prudential-6.webp",
    gradient: "from-red-500 to-rose-600",
    descVi: "Những kỷ niệm khó quên cùng đại gia đình CSKH Prudential trong kỳ nghỉ thường niên.",
    descEn: "Unforgettable memories and strong bonds created during annual CS retreat.",
    teamSize: "70+ Members"
  },
  {
    id: "prudential-7",
    companyId: "prudential",
    category: "milestones",
    titleVi: "Prudential • Khởi đầu Hành trình Bảo hiểm Nhân thọ",
    titleEn: "Prudential • Inception of Insurance CS Chapter",
    title: "Prudential • Khởi đầu Hành trình Bảo hiểm Nhân thọ",
    year: "2014",
    locationVi: "TP. Hồ Chí Minh",
    locationEn: "Ho Chi Minh City",
    tagVi: "Cột mốc",
    tagEn: "Milestones",
    imageUrl: "https://i.ibb.co/Mk5S8vYR/Prudential-7.webp",
    src: "https://i.ibb.co/Mk5S8vYR/Prudential-7.webp",
    gradient: "from-red-600 to-blue-700",
    descVi: "Đặt nền móng thiết lập hệ thống vận hành và tiêu chuẩn chất lượng cuộc gọi chuẩn quốc tế.",
    descEn: "Laying solid operational foundations adhering to global QA call standards.",
    teamSize: "Core Pioneers"
  },

  // --- VED / GARENA (2012 - 2014) ---
  {
    id: "ved-1",
    companyId: "ved",
    category: "projects",
    titleVi: "VED / Garena • Vận hành CSKH Thể thao Điện tử",
    titleEn: "VED / Garena • Esports & Gaming CS Operations",
    title: "VED / Garena • Vận hành CSKH Thể thao Điện tử",
    year: "2014",
    locationVi: "TP. Hồ Chí Minh",
    locationEn: "Ho Chi Minh City",
    tagVi: "Gaming & Esports",
    tagEn: "Gaming",
    imageUrl: "https://i.ibb.co/ds1qm1WD/VED-1.webp",
    src: "https://i.ibb.co/ds1qm1WD/VED-1.webp",
    gradient: "from-emerald-500 to-teal-600",
    descVi: "Quản lý hệ thống hỗ trợ game thủ và phòng máy GCafe trên toàn quốc, phục vụ hàng triệu người chơi.",
    descEn: "Managing national support infrastructure for gamers and GCafe internet hubs across Vietnam.",
    teamSize: "60+ Agents"
  },
  {
    id: "ved-2",
    companyId: "ved",
    category: "team",
    titleVi: "VED / Garena • Đào tạo Nhân sự Hỗ trợ Kỹ thuật",
    titleEn: "VED / Garena • Tech Support Training & Coaching",
    title: "VED / Garena • Đào tạo Nhân sự Hỗ trợ Kỹ thuật",
    year: "2013",
    locationVi: "TP. Hồ Chí Minh",
    locationEn: "Ho Chi Minh City",
    tagVi: "Đào tạo",
    tagEn: "Training",
    imageUrl: "https://i.ibb.co/7d9BFsS6/VED-2.webp",
    src: "https://i.ibb.co/7d9BFsS6/VED-2.webp",
    gradient: "from-teal-600 to-emerald-700",
    descVi: "Nâng cao năng lực xử lý lỗi game, bảo mật tài khoản và chăm sóc cộng đồng game thủ.",
    descEn: "Upskilling tech troubleshooting, account security, and player community engagement.",
    teamSize: "40+ Specialists"
  },
  {
    id: "ved-3",
    companyId: "ved",
    category: "milestones",
    titleVi: "VED / Garena • Hoạt động Sự kiện Esports Đỉnh cao",
    titleEn: "VED / Garena • Major Esports Tournaments Support",
    title: "VED / Garena • Hoạt động Sự kiện Esports Đỉnh cao",
    year: "2013",
    locationVi: "Hà Nội & TP. Hồ Chí Minh",
    locationEn: "Hanoi & HCMC",
    tagVi: "Sự kiện",
    tagEn: "Events",
    imageUrl: "https://i.ibb.co/1f4dHTyV/VED-3.webp",
    src: "https://i.ibb.co/1f4dHTyV/VED-3.webp",
    gradient: "from-emerald-600 to-green-700",
    descVi: "Đồng hành và hỗ trợ vận hành trực tiếp tại các giải đấu thể thao điện tử quy mô lớn.",
    descEn: "On-site operations support for major national esports tournament championships.",
    teamSize: "Esports Crew"
  },
  {
    id: "ved-4",
    companyId: "ved",
    category: "team",
    titleVi: "VED / Garena • Tinh thần Đồng đội & Gắn kết Văn hóa",
    titleEn: "VED / Garena • Team Unity & Culture Celebration",
    title: "VED / Garena • Tinh thần Đồng đội & Gắn kết Văn hóa",
    year: "2012",
    locationVi: "TP. Hồ Chí Minh",
    locationEn: "Ho Chi Minh City",
    tagVi: "Văn hóa Đội ngũ",
    tagEn: "Team Culture",
    imageUrl: "https://i.ibb.co/7xNbsP5j/VED-4.webp",
    src: "https://i.ibb.co/7xNbsP5j/VED-4.webp",
    gradient: "from-green-600 to-teal-700",
    descVi: "Xây dựng văn hóa làm việc trẻ trung, nhiệt huyết và hết mình vì trải nghiệm người dùng.",
    descEn: "Building an energetic, youthful team passionate about exceptional user experiences.",
    teamSize: "Garena Family"
  },

  // --- HTVC (2009 - 2012) ---
  {
    id: "htvc-1",
    companyId: "htvc",
    category: "projects",
    titleVi: "HTVC • Tổng đài Dịch vụ Truyền hình Cáp",
    titleEn: "HTVC • Cable TV Customer Service Center",
    title: "HTVC • Tổng đài Dịch vụ Truyền hình Cáp",
    year: "2012",
    locationVi: "TP. Hồ Chí Minh",
    locationEn: "Ho Chi Minh City",
    tagVi: "Truyền hình",
    tagEn: "Pay TV",
    imageUrl: "https://i.ibb.co/ZzjXpjsX/HTVC-1.webp",
    src: "https://i.ibb.co/ZzjXpjsX/HTVC-1.webp",
    gradient: "from-blue-600 to-indigo-700",
    descVi: "Quản lý ca trực tiếp nhận phản hồi và xử lý sự cố tín hiệu truyền hình cáp toàn đô thị.",
    descEn: "Managing city-wide broadcast signal support and customer hotline shifts.",
    teamSize: "50+ Agents"
  },
  {
    id: "htvc-2",
    companyId: "htvc",
    category: "team",
    titleVi: "HTVC • Đào tạo Nghiệp vụ & Kỹ thuật CSKH",
    titleEn: "HTVC • Technical & Customer Care Coaching",
    title: "HTVC • Đào tạo Nghiệp vụ & Kỹ thuật CSKH",
    year: "2011",
    locationVi: "TP. Hồ Chí Minh",
    locationEn: "Ho Chi Minh City",
    tagVi: "Đào tạo",
    tagEn: "Training",
    imageUrl: "https://i.ibb.co/BKjZQfY5/HTVC-2.webp",
    src: "https://i.ibb.co/BKjZQfY5/HTVC-2.webp",
    gradient: "from-indigo-600 to-blue-700",
    descVi: "Huấn luyện quy trình tiếp nhận và điều phối kỹ thuật viên hiện trường nhanh chóng, chính xác.",
    descEn: "Training fast dispatching workflows for on-site technical field engineers.",
    teamSize: "Support Leads"
  },
  {
    id: "htvc-3",
    companyId: "htvc",
    category: "milestones",
    titleVi: "HTVC • Sự kiện Kỷ niệm & Dấu ấn Phát triển",
    titleEn: "HTVC • Development Milestone Anniversary",
    title: "HTVC • Sự kiện Kỷ niệm & Dấu ấn Phát triển",
    year: "2010",
    locationVi: "TP. Hồ Chí Minh",
    locationEn: "Ho Chi Minh City",
    tagVi: "Kỷ niệm",
    tagEn: "Milestones",
    imageUrl: "https://i.ibb.co/357kHb63/HTVC-3.webp",
    src: "https://i.ibb.co/357kHb63/HTVC-3.webp",
    gradient: "from-sky-600 to-indigo-700",
    descVi: "Ghi dấu chặng đường đồng hành mở rộng mạng lưới thuê bao truyền hình số chất lượng cao.",
    descEn: "Marking milestones in expanding digital cable subscriber networks.",
    teamSize: "HTVC Team"
  },
  {
    id: "htvc-4",
    companyId: "htvc",
    category: "team",
    titleVi: "HTVC • Gắn kết Đội ngũ & Phong trào Nội bộ",
    titleEn: "HTVC • Internal Team Spirit & Connection",
    title: "HTVC • Gắn kết Đội ngũ & Phong trào Nội bộ",
    year: "2009",
    locationVi: "TP. Hồ Chí Minh",
    locationEn: "Ho Chi Minh City",
    tagVi: "Văn hóa Đội ngũ",
    tagEn: "Team Culture",
    imageUrl: "https://i.ibb.co/39Sjm7S0/HTVC-4.webp",
    src: "https://i.ibb.co/39Sjm7S0/HTVC-4.webp",
    gradient: "from-blue-500 to-cyan-600",
    descVi: "Hoạt động giao lưu nội bộ thắt chặt tình đoàn kết giữa các bộ phận trong đài truyền hình.",
    descEn: "Fostering inter-departmental collaboration and solidarity across television operations.",
    teamSize: "Entire Team"
  },

  // --- V247 TELECOM (2007 - 2009) ---
  {
    id: "v247-1",
    companyId: "v247",
    category: "projects",
    titleVi: "V247 • Call Center Viễn thông Quốc tế 24/7",
    titleEn: "V247 • 24/7 Global Telecom Call Center",
    title: "V247 • Call Center Viễn thông Quốc tế 24/7",
    year: "2009",
    locationVi: "TP. Hồ Chí Minh & Hoa Kỳ",
    locationEn: "HCMC & USA",
    tagVi: "Viễn thông",
    tagEn: "Telecom",
    imageUrl: "https://i.ibb.co/9HwPTKGg/V247-1.jpg",
    src: "https://i.ibb.co/9HwPTKGg/V247-1.jpg",
    gradient: "from-cyan-600 to-blue-700",
    descVi: "Điều hành ca trực tổng đài phục vụ cộng đồng người Việt tại Hoa Kỳ và quốc tế suốt 24/7.",
    descEn: "Managing around-the-clock call center shifts serving global overseas Vietnamese communities.",
    teamSize: "70+ Agents"
  },
  {
    id: "v247-2",
    companyId: "v247",
    category: "team",
    titleVi: "V247 • Đào tạo Chuẩn mực Giao tiếp Quốc tế",
    titleEn: "V247 • International Communication Standards",
    title: "V247 • Đào tạo Chuẩn mực Giao tiếp Quốc tế",
    year: "2008",
    locationVi: "TP. Hồ Chí Minh",
    locationEn: "Ho Chi Minh City",
    tagVi: "Đào tạo",
    tagEn: "Training",
    imageUrl: "https://i.ibb.co/vr4hB1m/V247-2.jpg",
    src: "https://i.ibb.co/vr4hB1m/V247-2.jpg",
    gradient: "from-blue-600 to-indigo-700",
    descVi: "Rèn luyện ngữ điệu, tác phong chuyên nghiệp và khả năng xử lý cuộc gọi đa múi giờ.",
    descEn: "Training cross-timezone telephony etiquette and empathetic communication excellence.",
    teamSize: "Shift Supervisors"
  },
  {
    id: "v247-3",
    companyId: "v247",
    category: "milestones",
    titleVi: "V247 • Dấu ấn Phát triển Mạng lưới Viễn thông",
    titleEn: "V247 • Telecom Network Expansion Milestone",
    title: "V247 • Dấu ấn Phát triển Mạng lưới Viễn thông",
    year: "2008",
    locationVi: "TP. Hồ Chí Minh",
    locationEn: "Ho Chi Minh City",
    tagVi: "Cột mốc",
    tagEn: "Milestones",
    imageUrl: "https://i.ibb.co/gM7nPptY/V247-3.jpg",
    src: "https://i.ibb.co/gM7nPptY/V247-3.jpg",
    gradient: "from-teal-600 to-blue-700",
    descVi: "Đạt mốc hàng triệu phút gọi kết nối kiều bào về quê hương Việt Nam.",
    descEn: "Connecting millions of calling minutes bridging overseas families back to Vietnam.",
    teamSize: "Operations Center"
  },
  {
    id: "v247-4",
    companyId: "v247",
    category: "team",
    titleVi: "V247 • Hoạt động Văn hóa & Tinh thần Trực thoại",
    titleEn: "V247 • Shift Spirit & Team Harmony",
    title: "V247 • Hoạt động Văn hóa & Tinh thần Trực thoại",
    year: "2007",
    locationVi: "TP. Hồ Chí Minh",
    locationEn: "Ho Chi Minh City",
    tagVi: "Văn hóa Đội ngũ",
    tagEn: "Team Culture",
    imageUrl: "https://i.ibb.co/s9gsmSHs/V247-4.jpg",
    src: "https://i.ibb.co/s9gsmSHs/V247-4.jpg",
    gradient: "from-blue-500 to-cyan-600",
    descVi: "Duy trì năng lượng tích cực và sự tập trung cao độ trong các ca trực đêm xuyên múi giờ.",
    descEn: "Maintaining vibrant energy and relentless focus throughout graveyard night shifts.",
    teamSize: "Night Shift Crew"
  },
  {
    id: "v247-5",
    companyId: "v247",
    category: "awards",
    titleVi: "V247 • Khen thưởng Tập thể Xuất sắc năm 2007",
    titleEn: "V247 • Team Excellence Recognition 2007",
    title: "V247 • Khen thưởng Tập thể Xuất sắc năm 2007",
    year: "2007",
    locationVi: "TP. Hồ Chí Minh",
    locationEn: "Ho Chi Minh City",
    tagVi: "Giải thưởng",
    tagEn: "Honors",
    imageUrl: "https://i.ibb.co/WNQkxzYQ/V247-5.jpg",
    src: "https://i.ibb.co/WNQkxzYQ/V247-5.jpg",
    gradient: "from-amber-500 to-blue-600",
    descVi: "Vinh danh những đóng góp quan trọng trong việc giữ vững chất lượng kết nối thông suốt.",
    descEn: "Recognizing key contributions in maintaining seamless global connectivity.",
    teamSize: "V247 Family"
  },

  // --- MOBIFONE (2003 - 2007) ---
  {
    id: "mobifone-1",
    companyId: "mobifone",
    category: "milestones",
    titleVi: "MobiFone • Nền tảng Đầu tiên tại Tổng đài 1080",
    titleEn: "MobiFone • Career Foundations at 1080 Hotline",
    title: "MobiFone • Nền tảng Đầu tiên tại Tổng đài 1080",
    year: "2005",
    locationVi: "TP. Hồ Chí Minh",
    locationEn: "Ho Chi Minh City",
    tagVi: "Khởi đầu",
    tagEn: "Foundations",
    imageUrl: "https://i.ibb.co/6Rp6rqXt/Mobifone-1.webp",
    src: "https://i.ibb.co/6Rp6rqXt/Mobifone-1.webp",
    gradient: "from-blue-600 to-indigo-700",
    descVi: "Rèn giũa kỹ năng trực thoại, tác phong chuẩn mực và sự kiên nhẫn phục vụ khách hàng di động.",
    descEn: "Mastering professional telephony discipline, patience, and customer-first mindset.",
    teamSize: "Frontline Agent"
  },
  {
    id: "mobifone-2",
    companyId: "mobifone",
    category: "team",
    titleVi: "MobiFone • Gắn kết Đội ngũ Điện thoại viên",
    titleEn: "MobiFone • Frontline Team Spirit & Bonding",
    title: "MobiFone • Gắn kết Đội ngũ Điện thoại viên",
    year: "2004",
    locationVi: "TP. Hồ Chí Minh",
    locationEn: "Ho Chi Minh City",
    tagVi: "Văn hóa Đội ngũ",
    tagEn: "Team Culture",
    imageUrl: "https://i.ibb.co/0HHrmyz/Mobifone-2.webp",
    src: "https://i.ibb.co/0HHrmyz/Mobifone-2.webp",
    gradient: "from-blue-500 to-cyan-600",
    descVi: "Tinh thần hỗ trợ lẫn nhau vượt qua áp lực hàng nghìn cuộc gọi mỗi ngày với nụ cười rạng rỡ.",
    descEn: "Peer support conquering high call volumes each day with unwavering positive smiles.",
    teamSize: "Team MobiFone"
  },
  {
    id: "mobifone-3",
    companyId: "mobifone",
    category: "awards",
    titleVi: "MobiFone • Kỷ niệm Dấu ấn Khởi đầu Sự nghiệp",
    titleEn: "MobiFone • Early Career Recognition Milestone",
    title: "MobiFone • Kỷ niệm Dấu ấn Khởi đầu Sự nghiệp",
    year: "2003",
    locationVi: "TP. Hồ Chí Minh",
    locationEn: "Ho Chi Minh City",
    tagVi: "Vinh danh",
    tagEn: "Honors",
    imageUrl: "https://i.ibb.co/TDgZqxG9/Mobifone-3.webp",
    src: "https://i.ibb.co/TDgZqxG9/Mobifone-3.webp",
    gradient: "from-amber-500 to-blue-600",
    descVi: "Bước chân đầu tiên định hình tình yêu và niềm đam mê cống hiến trọn đời cho ngành dịch vụ khách hàng.",
    descEn: "The formative first step igniting a lifelong passion for customer service excellence.",
    teamSize: "Pioneers 2003"
  }
];

export default function Memories() {
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  // State management
  const [selectedCompany, setSelectedCompany] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"masonry" | "grid">("masonry");
  const [activeMemoryIndex, setActiveMemoryIndex] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  // Close filter dropdown on outside interaction
  useEffect(() => {
    if (!isFilterDropdownOpen) return;
    const handleOutsideClick = (e: globalThis.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".relative")) {
        setIsFilterDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isFilterDropdownOpen]);

  const MEMORIES = MEMORIES_DATA;

  // Companies metadata
  const COMPANY_OPTIONS = [
    { id: "all", labelVi: "Tất cả công ty", labelEn: "All Companies", count: MEMORIES.length },
    { id: "finviet", labelVi: "Finviet (2023-2024)", labelEn: "Finviet", count: MEMORIES.filter(m => m.companyId === "finviet").length },
    { id: "momo", labelVi: "MoMo Wallet (2020-2023)", labelEn: "MoMo", count: MEMORIES.filter(m => m.companyId === "momo").length },
    { id: "prudential", labelVi: "Prudential (2014-2020)", labelEn: "Prudential", count: MEMORIES.filter(m => m.companyId === "prudential").length },
    { id: "ved", labelVi: "VED / Garena (2012-2014)", labelEn: "VED / Garena", count: MEMORIES.filter(m => m.companyId === "ved").length },
    { id: "htvc", labelVi: "HTVC (2009-2012)", labelEn: "HTVC", count: MEMORIES.filter(m => m.companyId === "htvc").length },
    { id: "v247", labelVi: "V247 Telecom (2007-2009)", labelEn: "V247", count: MEMORIES.filter(m => m.companyId === "v247").length },
    { id: "mobifone", labelVi: "MobiFone (2003-2007)", labelEn: "MobiFone", count: MEMORIES.filter(m => m.companyId === "mobifone").length },
  ];

  // Category options
  const CATEGORY_OPTIONS = [
    { id: "all", labelVi: "Tất cả thể loại", labelEn: "All Categories", icon: Sparkles },
    { id: "awards", labelVi: "Giải thưởng & Vinh danh", labelEn: "Awards & Honors", icon: Award },
    { id: "team", labelVi: "Văn hóa & Đội ngũ", labelEn: "Team & Culture", icon: Users },
    { id: "projects", labelVi: "Dự án Trọng điểm", labelEn: "Key Projects", icon: Layers },
    { id: "milestones", labelVi: "Cột mốc & Sự kiện", labelEn: "Milestones", icon: Calendar }
  ];

  // Filtered memory items
  const filteredMemories = useMemo(() => {
    return MEMORIES.filter((item) => {
      // Company match
      if (selectedCompany !== "all" && item.companyId !== selectedCompany) {
        return false;
      }
      // Category match
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const titleVi = (item.titleVi || "").toLowerCase();
        const titleEn = (item.titleEn || "").toLowerCase();
        const descVi = (item.descVi || "").toLowerCase();
        const descEn = (item.descEn || "").toLowerCase();
        const year = (item.year || "").toLowerCase();
        const locVi = (item.locationVi || "").toLowerCase();
        const tagVi = (item.tagVi || "").toLowerCase();

        return titleVi.includes(query) || titleEn.includes(query) ||
               descVi.includes(query) || descEn.includes(query) ||
               year.includes(query) || locVi.includes(query) || tagVi.includes(query);
      }
      return true;
    });
  }, [MEMORIES, selectedCompany, selectedCategory, searchQuery]);

  // Active memory object based on activeIndex
  const activeMemory = useMemo(() => {
    if (activeMemoryIndex === null || activeMemoryIndex < 0 || activeMemoryIndex >= filteredMemories.length) {
      return null;
    }
    return filteredMemories[activeMemoryIndex];
  }, [filteredMemories, activeMemoryIndex]);

  // Masonry gallery items map
  const masonryItems: MasonryItem[] = useMemo(() => {
    const heights = [400, 270, 520, 340, 440, 300, 480, 360, 420, 310];
    return filteredMemories.map((item, idx) => ({
      id: item.id,
      img: item.imageUrl || item.src,
      height: heights[idx % heights.length],
      title: isVi ? item.titleVi : item.titleEn,
      subtitle: isVi ? item.descVi : item.descEn,
      tag: isVi ? item.tagVi : item.tagEn,
      year: item.year
    }));
  }, [filteredMemories, isVi]);

  // Navigation functions for Modal Carousel
  const handlePrevMemory = () => {
    if (activeMemoryIndex === null) return;
    playUiSound("click");
    setActiveMemoryIndex((prev) => (prev === null || prev === 0 ? filteredMemories.length - 1 : prev - 1));
  };

  const handleNextMemory = () => {
    if (activeMemoryIndex === null) return;
    playUiSound("click");
    setActiveMemoryIndex((prev) => (prev === null || prev === filteredMemories.length - 1 ? 0 : prev + 1));
  };

  // Keyboard arrow keys for modal navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeMemoryIndex === null) return;
      if (e.key === "ArrowLeft") handlePrevMemory();
      if (e.key === "ArrowRight") handleNextMemory();
      if (e.key === "Escape") setActiveMemoryIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeMemoryIndex, filteredMemories]);

  // Handle link sharing
  const handleShareLink = (item: MemoryItem) => {
    playUiSound("click");
    if (navigator.clipboard) {
      navigator.clipboard.writeText(item.imageUrl || window.location.href);
      setToastMessage(isVi ? "Đã sao chép liên kết hình ảnh kỷ niệm!" : "Copied memory image link!");
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <section 
      id="memories" 
      className="relative w-full h-full flex flex-col justify-start items-stretch p-[15px] font-sans text-slate-800 dark:text-slate-100 transition-all duration-300 bg-transparent overflow-y-auto no-scrollbar"
    >
      <div className="w-full flex-grow flex flex-col gap-4 max-w-7xl mx-auto justify-start">

        {/* 1. TOP PAGE HEADER WITH CONSOLIDATED FILTERS */}
        <IndustrialSubSection hasIndustrialAccent>
          <PageCardHeader pageId="memories">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 w-full">
              {/* Left Side: Editorial subtitle */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="w-2 h-4 bg-rose-600 dark:bg-rose-400 rounded-full shrink-0" />
                <span className="text-caption font-semibold font-mono text-rose-700 dark:text-rose-300 bg-rose-500/15 px-2.5 py-0.5 rounded-full border border-rose-500/30 shadow-2xs">
                  {isVi ? "Khoảnh khắc & Cột mốc Sự nghiệp" : "Moments & Career Milestones"}
                </span>
              </div>

              {/* Right Side: Consolidated Controls */}
              <div className="flex flex-wrap items-center gap-2 md:ml-auto w-full md:w-auto justify-start sm:justify-end">
                {/* Compact Search Input */}
                <div className="relative w-full sm:w-[190px] shrink-0">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isVi ? "Tìm kiếm..." : "Search..."}
                    className="w-full pl-8 pr-7 py-1.5 rounded-xl text-[11px] font-sans bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 placeholder-slate-400 border border-slate-200 dark:border-slate-700/60 focus:outline-none focus:ring-1 focus:ring-rose-500/50 transition-all font-semibold"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Collapsed Company Filter */}
                <div className="relative shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      playUiSound("click");
                      setIsFilterDropdownOpen(!isFilterDropdownOpen);
                    }}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition-all border cursor-pointer",
                      selectedCompany !== "all"
                        ? "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30"
                        : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700"
                    )}
                    title={isVi ? "Lọc theo công ty" : "Filter by company"}
                  >
                    <Filter className="w-3.5 h-3.5" />
                    <span className="max-w-[120px] truncate">
                      {selectedCompany === "all"
                        ? (isVi ? "Tất cả công ty" : "All Companies")
                        : COMPANY_OPTIONS.find(c => c.id === selectedCompany)?.[isVi ? "labelVi" : "labelEn"]}
                    </span>
                    <ChevronDown className={cn("w-3 h-3 transition-transform duration-200", isFilterDropdownOpen ? "rotate-180" : "")} />
                  </button>

                  <AnimatePresence>
                    {isFilterDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        className="absolute right-0 mt-1.5 w-[200px] rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-white/10 shadow-lg backdrop-blur-xl z-50 p-1 py-1.5 max-h-[300px] overflow-y-auto no-scrollbar"
                      >
                        {COMPANY_OPTIONS.map((comp) => {
                          const isActive = selectedCompany === comp.id;
                          return (
                            <button
                              key={comp.id}
                              type="button"
                              onClick={() => {
                                playUiSound("click");
                                setSelectedCompany(comp.id);
                                setIsFilterDropdownOpen(false);
                              }}
                              className={cn(
                                "w-full text-left px-3 py-1.5 rounded-lg text-[11px] font-semibold flex items-center justify-between transition-colors",
                                isActive
                                  ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold"
                                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                              )}
                            >
                              <span className="truncate pr-2">{isVi ? comp.labelVi : comp.labelEn}</span>
                              <span className="text-[10px] font-mono opacity-60">({comp.count})</span>
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* View Mode Toggle Switcher */}
                <div className="flex items-center gap-0.5 bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700/60 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      playUiSound("click");
                      setViewMode("masonry");
                    }}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all",
                      viewMode === "masonry"
                        ? "bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-xs border border-rose-500/10"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                    )}
                    title={isVi ? "Dạng lưới nghệ thuật" : "Art Masonry Layout"}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playUiSound("click");
                      setViewMode("grid");
                    }}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all",
                      viewMode === "grid"
                        ? "bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-xs border border-rose-500/10"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                    )}
                    title={isVi ? "Dạng thẻ chi tiết" : "Grid Cards Layout"}
                  >
                    <Grid className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </PageCardHeader>
        </IndustrialSubSection>

        {/* Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-emerald-600 text-white font-semibold text-xs shadow-xl flex items-center gap-2 border border-emerald-400/30 backdrop-blur-md"
            >
              <Check className="w-4 h-4 text-emerald-200" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 4. GALLERY RENDER (MASONRY OR GRID CARDS) */}
        <IndustrialSubSection>
          {filteredMemories.length === 0 ? (
            <div className="w-full p-12 rounded-3xl bg-white/50 dark:bg-slate-900/50 border border-dashed border-slate-300 dark:border-slate-800 flex flex-col items-center justify-center text-center gap-3">
              <Camera className="w-10 h-10 text-slate-400 dark:text-slate-600 animate-pulse" />
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                {isVi ? "Không tìm thấy ảnh kỷ niệm phù hợp với bộ lọc." : "No memory photos found matching your criteria."}
              </p>
              <button
                onClick={() => {
                  playUiSound("click");
                  setSelectedCompany("all");
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="px-4 py-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold text-xs border border-rose-500/20 hover:bg-rose-500/20 transition-all flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{isVi ? "Đặt lại bộ lọc" : "Reset Filters"}</span>
              </button>
            </div>
          ) : viewMode === "masonry" ? (
            <div className="w-full min-h-[450px]">
              <MasonryGallery
                items={masonryItems}
                animateFrom="bottom"
                blurToFocus={true}
                stagger={0.05}
                scaleOnHover={true}
                hoverScale={0.97}
                colorShiftOnHover={true}
                onItemClick={(item) => {
                  const idx = filteredMemories.findIndex(m => m.id === item.id);
                  if (idx !== -1) {
                    playUiSound("click");
                    setActiveMemoryIndex(idx);
                  }
                }}
              />
            </div>
          ) : (
            /* DETAILED GRID CARDS VIEW */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {filteredMemories.map((item, idx) => {
                const title = isVi ? item.titleVi : item.titleEn;
                const desc = isVi ? item.descVi : item.descEn;
                const tag = isVi ? item.tagVi : item.tagEn;
                const location = isVi ? item.locationVi : item.locationEn;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: idx * 0.03 }}
                    onClick={() => {
                      playUiSound("click");
                      setActiveMemoryIndex(idx);
                    }}
                    className="group relative rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1"
                  >
                    {/* Card Image */}
                    <div className="relative w-full h-52 overflow-hidden bg-slate-950">
                      <img
                        src={item.imageUrl || item.src}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                      {/* Tag & Year Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white bg-rose-600/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 shadow-xs">
                          {tag}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-slate-200 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                          {item.year}
                        </span>
                      </div>

                      {/* Hover Zoom Icon */}
                      <div className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/60 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md border border-white/20">
                        <ZoomIn className="w-4 h-4" />
                      </div>

                      {/* Bottom title inside image */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-xs font-mono text-rose-300 font-semibold uppercase tracking-wide">
                          {item.companyId?.toUpperCase()}
                        </p>
                        <h3 className="text-sm font-bold text-white line-clamp-1 mt-0.5">
                          {title}
                        </h3>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 flex flex-col justify-between flex-1 gap-3">
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed font-sans">
                        {desc}
                      </p>

                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-2.5 mt-auto">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          <span className="truncate">{location}</span>
                        </div>
                        {item.teamSize && (
                          <div className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400 font-medium">
                            <Users className="w-3.5 h-3.5 shrink-0" />
                            <span>{item.teamSize}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </IndustrialSubSection>

        {/* 5. ENHANCED LIGHTBOX MODAL WITH CAROUSEL NAVIGATION */}
        <AnimatePresence>
          {activeMemory && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/90 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.93 }}
                className="w-full max-w-7xl max-h-[92vh] overflow-y-auto no-scrollbar rounded-3xl bg-slate-900 text-white border border-rose-500/30 shadow-2xl overflow-hidden flex flex-col relative"
              >
                {/* Modal Top Control Bar */}
                <div className="relative w-full h-72 sm:h-[450px] md:h-[500px] lg:h-[550px] bg-slate-950">
                  <img 
                    src={activeMemory.imageUrl || activeMemory.src} 
                    alt={isVi ? activeMemory.titleVi : activeMemory.titleEn}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/50" />

                  {/* Left & Right Carousel Arrows */}
                  <button
                    type="button"
                    onClick={handlePrevMemory}
                    title={isVi ? "Ảnh trước (Mũi tên trái)" : "Previous image (Left arrow)"}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/70 hover:bg-rose-600 text-white transition-all border border-white/20 shadow-lg hover:scale-110 active:scale-95"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNextMemory}
                    title={isVi ? "Ảnh kế tiếp (Mũi tên phải)" : "Next image (Right arrow)"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/70 hover:bg-rose-600 text-white transition-all border border-white/20 shadow-lg hover:scale-110 active:scale-95"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Action Buttons Top Right */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleShareLink(activeMemory)}
                      title={isVi ? "Chia sẻ liên kết ảnh" : "Share image link"}
                      className="p-2.5 rounded-full bg-slate-950/70 hover:bg-slate-800 text-white transition-colors border border-white/20"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveMemoryIndex(null)}
                      title={isVi ? "Đóng (Phím Esc)" : "Close (Esc key)"}
                      className="p-2.5 rounded-full bg-slate-950/70 hover:bg-rose-600 text-white transition-colors border border-white/20"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Counter Badge Top Left */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-xs font-mono text-slate-300 font-bold">
                    {(activeMemoryIndex ?? 0) + 1} / {filteredMemories.length}
                  </div>

                  {/* Title & Badges Bottom Overlay */}
                  <div className="absolute bottom-4 left-6 right-6 flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-300 bg-rose-950/90 px-3 py-1 rounded-full border border-rose-500/40">
                        {isVi ? activeMemory.tagVi : activeMemory.tagEn}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-200 bg-slate-800/90 px-3 py-1 rounded-full border border-white/10">
                        {activeMemory.year}
                      </span>
                      {activeMemory.companyId && (
                        <span className="text-xs font-mono font-bold uppercase text-amber-300 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-500/40">
                          {activeMemory.companyId}
                        </span>
                      )}
                    </div>
                    <h2 className="text-lg sm:text-2xl font-black text-white leading-snug mt-1">
                      {isVi ? activeMemory.titleVi : activeMemory.titleEn}
                    </h2>
                  </div>
                </div>

                {/* Modal Content Body */}
                <div className="p-6 sm:p-8 flex flex-col gap-5 bg-slate-900">
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400 border-b border-white/10 pb-4 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-rose-400" />
                      <span>{isVi ? activeMemory.locationVi : activeMemory.locationEn}</span>
                    </div>
                    {activeMemory.teamSize && (
                      <div className="flex items-center gap-1.5 border-l border-white/10 pl-4">
                        <Users className="w-4 h-4 text-cyan-400" />
                        <span>{activeMemory.teamSize}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
                    {isVi ? activeMemory.descVi : activeMemory.descEn}
                  </p>

                  {(activeMemory.quoteVi || activeMemory.quoteEn) && (
                    <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex flex-col gap-2 relative overflow-hidden">
                      <Quote className="w-12 h-12 text-rose-500/10 absolute right-2 bottom-2" />
                      <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                        {isVi ? "Chia sẻ cảm hứng:" : "Leadership Insight:"}
                      </span>
                      <p className="text-xs sm:text-sm italic font-medium text-rose-100 leading-relaxed">
                        {isVi ? activeMemory.quoteVi : activeMemory.quoteEn}
                      </p>
                    </div>
                  )}

                  {/* Modal Footer Controls */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePrevMemory}
                        className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-all flex items-center gap-1"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>{isVi ? "Ảnh trước" : "Previous"}</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleNextMemory}
                        className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-all flex items-center gap-1"
                      >
                        <span>{isVi ? "Ảnh tiếp" : "Next"}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveMemoryIndex(null)}
                      className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all shadow-md"
                    >
                      {isVi ? "Đóng" : "Close"}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

