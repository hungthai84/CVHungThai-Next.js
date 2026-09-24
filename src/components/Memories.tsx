import React, { useState, useMemo } from "react";
import { 
  Camera, 
  Sparkles, 
  Tag, 
  Calendar, 
  Building2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Search,
  Layers,
  Award,
  Heart
} from "lucide-react";
import { useLanguage } from "../i18n";
import { playUiSound } from "../lib/sound";
import { PageCardHeader } from "./PageCardHeader";
import { Masonry } from "./Masonry";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "motion/react";

interface Memory3DTiltCardProps {
  photo: MemoryPhoto;
  idx: number;
  isVi: boolean;
  onClick: () => void;
}

function Memory3DTiltCard({ photo, idx, isVi, onClick }: Memory3DTiltCardProps) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [10, -10]), { damping: 20, stiffness: 200 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-10, 10]), { damping: 20, stiffness: 200 });
  const scale = useSpring(1, { damping: 20, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width);
    y.set(mouseY / rect.height);
  };

  const handleMouseEnter = () => {
    scale.set(1.03);
    try { playUiSound("hover"); } catch {}
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
    scale.set(1);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: (idx % 8) * 0.04 }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        borderRadius: "var(--theme-radius-card, var(--theme-radius, 16px))",
        perspective: 1000,
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
      }}
      className="group relative cursor-pointer overflow-hidden glass-surface backdrop-blur-xl bg-white/95 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col"
    >
      {/* Embedded Photo Container */}
      <div className={`relative w-full ${photo.aspectRatio} overflow-hidden bg-slate-100 dark:bg-slate-950`}>
        <img 
          src={photo.src} 
          alt={photo.alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
        
        {/* Top Floating Badge: Year & Tag */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 pointer-events-none">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-xs border ${photo.tagColor}`}>
            {isVi ? photo.tagVi : photo.tagEn}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono text-white bg-slate-900/80 backdrop-blur-md border border-white/20 shadow-xs flex items-center gap-1">
            <Calendar className="w-2.5 h-2.5" />
            <span>{photo.year}</span>
          </span>
        </div>

        {/* Hover Click Hint Icon */}
        <div className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full bg-pink-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-md">
          <Maximize2 className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Card Information Body */}
      <div className="p-[25px] flex flex-col gap-2 text-left">
        <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-pink-600 dark:text-pink-400">
          <Building2 className="w-3 h-3 shrink-0" />
          <span className="truncate">{isVi ? photo.companyVi : photo.companyEn}</span>
        </div>

        <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug tracking-tight group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
          {isVi ? photo.titleVi : photo.titleEn}
        </h4>

        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
          {isVi ? photo.descVi : photo.descEn}
        </p>
      </div>
    </motion.article>
  );
}

export interface MemoryPhoto {
  id: string;
  src: string;
  alt: string;
  titleVi: string;
  titleEn: string;
  title?: string;
  companyVi: string;
  companyEn: string;
  company?: string;
  category: "all" | "mobifone" | "htvc" | "ved" | "prudential" | "momo" | "finviet" | "events";
  companyId?: "all" | "mobifone" | "htvc" | "ved" | "prudential" | "momo" | "finviet" | "v247" | "events";
  year: string;
  tagVi: string;
  tagEn: string;
  tag?: string;
  tagColor: string;
  aspectRatio: "aspect-4/3" | "aspect-3/4" | "aspect-1/1" | "aspect-16/10" | "aspect-9/12";
  descVi: string;
  descEn: string;
  description?: string;
}

export const MEMORIES_32_DATA: MemoryPhoto[] = [
  {
    id: "mem-01",
    src: "https://i.ibb.co/6Rp6rqXt/Mobifone-1.webp",
    alt: "MobiFone CSKH 9090",
    titleVi: "Khởi đầu sự nghiệp CSKH tại MobiFone",
    titleEn: "Career Kickoff at MobiFone Customer Care",
    companyVi: "MobiFone (VNPT)",
    companyEn: "MobiFone Corporation",
    category: "mobifone",
    year: "2002 - 2007",
    tagVi: "Tổng đài 9090",
    tagEn: "Call Center 9090",
    tagColor: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30",
    aspectRatio: "aspect-4/3",
    descVi: "Những năm tháng đầu tiên rèn luyện bản lĩnh, xử lý hàng nghìn cuộc gọi mỗi ca trực với tinh thần phụng sự tận tâm.",
    descEn: "First years of shaping customer service dedication, handling thousands of inquiries with utmost excellence."
  },
  {
    id: "mem-02",
    src: "https://i.ibb.co/0HHrmyz/Mobifone-2.webp",
    alt: "V247 Call Center",
    titleVi: "Vận hành Tổng đài Viễn thông Quốc tế V247",
    titleEn: "Operating V247 International Telecom Helpdesk",
    companyVi: "V247 Telecom",
    companyEn: "V247 Telecom Corp",
    category: "mobifone",
    year: "2007 - 2008",
    tagVi: "Viễn thông Quốc tế",
    tagEn: "Global Telecom",
    tagColor: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/30",
    aspectRatio: "aspect-3/4",
    descVi: "Xây dựng ca trực 24/7 kết nối kiều bào và hỗ trợ cước viễn thông xuyên quốc gia chuẩn xác và nhanh chóng.",
    descEn: "Building round-the-clock 24/7 cross-border telecommunications support for global communities."
  },
  {
    id: "mem-03",
    src: "https://i.ibb.co/ZzjXpjsX/HTVC-1.webp",
    alt: "HTVC Truyền hình Cáp",
    titleVi: "Chuẩn hóa Quy trình Dịch vụ Khách hàng HTVC",
    titleEn: "Standardizing HTVC Customer Care Procedures",
    companyVi: "HTVC - TH Cáp TP.HCM",
    companyEn: "HTVC Cable Television",
    category: "htvc",
    year: "2009 - 2011",
    tagVi: "Truyền hình Cáp",
    tagEn: "Pay TV Network",
    tagColor: "bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30",
    aspectRatio: "aspect-1/1",
    descVi: "Triển khai quy trình tiếp nhận và xử lý sự cố kỹ thuật tận nhà cho hơn 500.000 thuê bao truyền hình trả tiền.",
    descEn: "Deploying rapid response and technical dispatch workflows for over 500,000 pay TV subscribers."
  },
  {
    id: "mem-04",
    src: "https://i.ibb.co/BKjZQfY5/HTVC-2.webp",
    alt: "Kỷ niệm HTVC 2",
    titleVi: "Hoạt động Vận hành & Sự kiện HTVC",
    titleEn: "HTVC Operational & Customer Event",
    companyVi: "HTVC - TH Cáp TP.HCM",
    companyEn: "HTVC Cable Television",
    category: "htvc",
    year: "2010",
    tagVi: "Dịch vụ Khách hàng",
    tagEn: "Customer Care",
    tagColor: "bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30",
    aspectRatio: "aspect-16/10",
    descVi: "Hoạt động giao lưu, nâng cao chất lượng dịch vụ khách hàng truyền hình cáp HTVC.",
    descEn: "Connecting and enhancing service quality for HTVC cable TV subscribers."
  },
  {
    id: "mem-05",
    src: "https://i.ibb.co/357kHb63/HTVC-3.webp",
    alt: "Kỷ niệm HTVC 3",
    titleVi: "Đội ngũ Kỹ thuật & Chăm sóc Khách hàng HTVC",
    titleEn: "HTVC Technical & Customer Support Team",
    companyVi: "HTVC - TH Cáp TP.HCM",
    companyEn: "HTVC Cable Television",
    category: "htvc",
    year: "2011",
    tagVi: "Kỹ thuật Dịch vụ",
    tagEn: "Technical Care",
    tagColor: "bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30",
    aspectRatio: "aspect-4/3",
    descVi: "Xây dựng đội ngũ phản ứng nhanh xử lý khiếu nại và sự cố kỹ thuật tín hiệu truyền hình.",
    descEn: "Rapid response technical support team handling customer inquiries and broadcast signals."
  },
  {
    id: "mem-06",
    src: "https://i.ibb.co/39Sjm7S0/HTVC-4.webp",
    alt: "Kỷ niệm HTVC 4",
    titleVi: "Sự kiện Vinh danh & Tổng kết HTVC",
    titleEn: "HTVC Annual Excellence & Recognition",
    companyVi: "HTVC - TH Cáp TP.HCM",
    companyEn: "HTVC Cable Television",
    category: "htvc",
    year: "2011",
    tagVi: "Tổng kết Dịch vụ",
    tagEn: "Annual Review",
    tagColor: "bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30",
    aspectRatio: "aspect-3/4",
    descVi: "Lễ tổng kết vinh danh cán bộ quản lý đạt thành tích xuất sắc trong công tác dịch vụ khách hàng.",
    descEn: "Annual celebration honoring top managers for outstanding customer care achievements."
  },
  {
    id: "mem-07",
    src: "https://i.ibb.co/ds1qm1WD/VED-1.webp",
    alt: "Garena VED Esports",
    titleVi: "Xây dựng Trung tâm Hỗ trợ Khách hàng Garena VED",
    titleEn: "Founding Garena VED Esports & Gaming Support Center",
    companyVi: "Garena / VED",
    companyEn: "Garena / Vietnam Esports",
    category: "ved",
    year: "2012 - 2015",
    tagVi: "Esports & Gaming",
    tagEn: "Esports & Gaming",
    tagColor: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
    aspectRatio: "aspect-16/10",
    descVi: "Xây dựng và dẫn dắt đội ngũ 120+ nhân sự phục vụ hàng triệu game thủ Liên Minh Huyền Thoại và FIFA Online.",
    descEn: "Built and led a 120+ customer care team supporting millions of League of Legends and FIFA Online gamers."
  },
  {
    id: "mem-08",
    src: "https://i.ibb.co/TDgZqxG9/Mobifone-3.webp",
    alt: "MobiFone CSKH",
    titleVi: "Hoạt động CSKH MobiFone Chuyên nghiệp",
    titleEn: "Professional MobiFone Customer Operations",
    companyVi: "MobiFone (VNPT)",
    companyEn: "MobiFone Corporation",
    category: "mobifone",
    year: "2006",
    tagVi: "Vận hành Tổng đài",
    tagEn: "Call Center Ops",
    tagColor: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30",
    aspectRatio: "aspect-4/3",
    descVi: "Quá trình đào tạo và giám sát chất lượng thoại trực tiếp cho các tổng đài viên tiêu biểu.",
    descEn: "Supervising live call quality and training top performing call center agents."
  },
  {
    id: "mem-09",
    src: "https://i.ibb.co/7d9BFsS6/VED-2.webp",
    alt: "VED Esports 2",
    titleVi: "Đồng hành cùng Giải đấu Quốc gia VED",
    titleEn: "National Esports Tournament Operations",
    companyVi: "Vietnam Esports (VED)",
    companyEn: "Vietnam Esports (VED)",
    category: "ved",
    year: "2013",
    tagVi: "Sự kiện VED",
    tagEn: "VED Tournament",
    tagColor: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
    aspectRatio: "aspect-3/4",
    descVi: "Công tác trực chiến vận hành và giải quyết khiếu nại tài khoản game thủ tại các giải đấu trực tiếp.",
    descEn: "On-site live player dispute resolution and support during national esports finals."
  },
  {
    id: "mem-10",
    src: "https://i.ibb.co/1f4dHTyV/VED-3.webp",
    alt: "VED Esports 3",
    titleVi: "Đào tạo Nghiệp vụ & Văn hóa Đội ngũ VED",
    titleEn: "VED Staff Training & Team Culture Workshop",
    companyVi: "VED / Garena Academy",
    companyEn: "VED Academy",
    category: "ved",
    year: "2014",
    tagVi: "Đào tạo VED",
    tagEn: "VED Training",
    tagColor: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
    aspectRatio: "aspect-4/3",
    descVi: "Chương trình huấn luyện kỹ năng giao tiếp và xử lý khủng hoảng truyền thông cho nhân sự CSKH.",
    descEn: "Communications and crisis resolution training workshops for customer support representatives."
  },
  {
    id: "mem-11",
    src: "https://i.ibb.co/7xNbsP5j/VED-4.webp",
    alt: "VED Esports 4",
    titleVi: "Hợp nhất Hệ thống Hỗ trợ Đa Kênh Garena & Shopee",
    titleEn: "Garena & Shopee Omnichannel CS Integration",
    companyVi: "Sea Group (Garena / Shopee)",
    companyEn: "Sea Group",
    category: "ved",
    year: "2015",
    tagVi: "Chuyển đổi Đa kênh",
    tagEn: "Omnichannel CS",
    tagColor: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
    aspectRatio: "aspect-9/12",
    descVi: "Đồng bộ hóa trải nghiệm hỗ trợ game thủ và người mua sắm thương mại điện tử trên cùng một nền tảng.",
    descEn: "Unified player and e-commerce shopper support experiences across Sea Group's platform."
  },
  {
    id: "mem-12",
    src: "https://i.ibb.co/CK2Y62Zy/Prudential-1.webp",
    alt: "Prudential 1",
    titleVi: "Chuyển đổi số Call Center Bảo hiểm Prudential",
    titleEn: "Digital Transformation of Prudential Call Center",
    companyVi: "Prudential Vietnam",
    companyEn: "Prudential Life Insurance",
    category: "prudential",
    year: "2016 - 2017",
    tagVi: "Bảo hiểm Nhân thọ",
    tagEn: "Life Insurance",
    tagColor: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    aspectRatio: "aspect-16/10",
    descVi: "Hiện đại hóa quy trình thẩm định quyền lợi bảo hiểm, rút ngắn thời gian giải quyết yêu cầu chi trả bồi thường.",
    descEn: "Modernized claim assessment workflows and expedited policyholder inquiry response times."
  },
  {
    id: "mem-13",
    src: "https://i.ibb.co/HD71024V/Prudential-2.webp",
    alt: "Prudential 2",
    titleVi: "Đội ngũ Quản lý & Giám sát CSKH Prudential",
    titleEn: "Prudential CS Supervisory & Management Team",
    companyVi: "Prudential Vietnam",
    companyEn: "Prudential Vietnam",
    category: "prudential",
    year: "2016",
    tagVi: "Quản trị Bảo hiểm",
    tagEn: "Insurance Ops",
    tagColor: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    aspectRatio: "aspect-4/3",
    descVi: "Xây dựng quy chuẩn dịch vụ khách hàng bảo hiểm nhân thọ chuyên nghiệp và tận tâm.",
    descEn: "Establishing professional life insurance customer care standards and leadership."
  },
  {
    id: "mem-14",
    src: "https://i.ibb.co/TM32Dg85/Prudential-3.webp",
    alt: "Prudential 3",
    titleVi: "Lễ Vinh danh Sáng kiến Xuất sắc Prudential",
    titleEn: "Prudential Operational Innovation Award",
    companyVi: "Prudential Vietnam",
    companyEn: "Prudential Vietnam",
    category: "prudential",
    year: "2017",
    tagVi: "Sáng kiến CSKH",
    tagEn: "CS Innovation",
    tagColor: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    aspectRatio: "aspect-3/4",
    descVi: "Tôn vinh đề án định tuyến thông minh theo phân khúc hợp đồng bảo hiểm của khách hàng.",
    descEn: "Honored for smart routing algorithms tailored to policyholder risk and tier profiles."
  },
  {
    id: "mem-15",
    src: "https://i.ibb.co/sd8bZfsk/Prudential-4.webp",
    alt: "Prudential 4",
    titleVi: "Chương trình Đào tạo Chuyên sâu Khách hàng VIP",
    titleEn: "Prudential VIP Customer Care Masterclass",
    companyVi: "Prudential Vietnam",
    companyEn: "Prudential Vietnam",
    category: "prudential",
    year: "2017",
    tagVi: "Dịch vụ VIP",
    tagEn: "VIP Services",
    tagColor: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    aspectRatio: "aspect-1/1",
    descVi: "Nâng cao kỹ năng tư vấn và chăm sóc khách hàng VIP bảo hiểm nhân thọ.",
    descEn: "Elevating advisory skills and personalized care for high-net-worth policyholders."
  },
  {
    id: "mem-16",
    src: "https://i.ibb.co/XZXnp2Dw/Prudential-5.webp",
    alt: "Prudential 5",
    titleVi: "Hội thảo Tối ưu Trải nghiệm Khách hàng Bảo hiểm",
    titleEn: "Insurance Customer Experience Optimization Workshop",
    companyVi: "Prudential Vietnam",
    companyEn: "Prudential Vietnam",
    category: "prudential",
    year: "2017",
    tagVi: "Tối ưu CX",
    tagEn: "CX Optimization",
    tagColor: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    aspectRatio: "aspect-16/10",
    descVi: "Thảo luận chiến lược cải thiện chỉ số hài lòng khách hàng CSAT và điểm đo lường NPS.",
    descEn: "Strategic workshops targeting CSAT improvement and Net Promoter Score elevation."
  },
  {
    id: "mem-17",
    src: "https://i.ibb.co/1t8kkHGm/Prudential-6.webp",
    alt: "Prudential 6",
    titleVi: "Chương trình Vinh danh & Khen thưởng Prudential",
    titleEn: "Prudential Recognition & Rewards Gala",
    companyVi: "Prudential Vietnam",
    companyEn: "Prudential Team",
    category: "prudential",
    year: "2017",
    tagVi: "Gala Tri Ân",
    tagEn: "Gala Dinner",
    tagColor: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30",
    aspectRatio: "aspect-1/1",
    descVi: "Vinh danh các cá nhân đạt chỉ số CSAT & NPS xuất sắc nhất năm tại Prudential.",
    descEn: "Honoring top CSAT & NPS performers of the year in celebration of dedication."
  },
  {
    id: "mem-18",
    src: "https://i.ibb.co/Mk5S8vYR/Prudential-7.webp",
    alt: "Prudential 7",
    titleVi: "Hội thảo Văn hóa Dịch vụ Prudential",
    titleEn: "Prudential Service Culture Workshop",
    companyVi: "Prudential Vietnam",
    companyEn: "Prudential Vietnam",
    category: "prudential",
    year: "2017",
    tagVi: "Văn hóa Dịch vụ",
    tagEn: "Service Culture",
    tagColor: "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30",
    aspectRatio: "aspect-9/12",
    descVi: "Chủ trì workshop chia sẻ nghệ thuật thấu cảm và lắng nghe trong ngành bảo hiểm.",
    descEn: "Leading empathy and active listening workshops across service departments."
  },
  {
    id: "mem-19",
    src: "https://i.ibb.co/S7ySGnvC/Momo-1.webp",
    alt: "Ví MoMo 1",
    titleVi: "Xây dựng Trung tâm CSKH Ví Điện tử MoMo",
    titleEn: "Building MoMo E-Wallet Customer Care Ecosystem",
    companyVi: "Ví Điện tử MoMo (M-Service)",
    companyEn: "MoMo E-Wallet",
    category: "momo",
    year: "2018 - 2020",
    tagVi: "Fintech & E-Wallet",
    tagEn: "Fintech Platform",
    tagColor: "bg-pink-500/15 text-pink-700 dark:text-pink-300 border-pink-500/30",
    aspectRatio: "aspect-4/3",
    descVi: "Thiết lập trung tâm CSKH tài chính công nghệ phục vụ 20+ triệu người dùng MoMo.",
    descEn: "Architected modern fintech customer care serving 20M+ active users."
  },
  {
    id: "mem-20",
    src: "https://i.ibb.co/v6K5jLsQ/Momo-2.webp",
    alt: "Ví MoMo 2",
    titleVi: "Chiến dịch MoMo Mega Day Peak Season",
    titleEn: "MoMo Mega Day Campaign Operations",
    companyVi: "Ví MoMo",
    companyEn: "MoMo E-Wallet",
    category: "momo",
    year: "2019",
    tagVi: "Chiến dịch Cao điểm",
    tagEn: "Peak Season",
    tagColor: "bg-fuchsia-500/15 text-fuchsia-700 dark:text-fuchsia-300 border-fuchsia-500/30",
    aspectRatio: "aspect-9/12",
    descVi: "Vận hành hệ thống tiếp nhận đa kênh chịu tải kỷ lục, duy trì SLA trên 96%.",
    descEn: "Coordinated high-volume traffic under extreme load preserving SLA over 96%."
  },
  {
    id: "mem-21",
    src: "https://i.ibb.co/DsvVt9C/Momo-3.webp",
    alt: "Ví MoMo 3",
    titleVi: "Ứng dụng AI Chatbot Tự động hóa MoMo",
    titleEn: "AI Chatbot Customer Care Automation MoMo",
    companyVi: "Ví MoMo",
    companyEn: "MoMo E-Wallet",
    category: "momo",
    year: "2019",
    tagVi: "AI & Tự động hóa",
    tagEn: "AI Automation",
    tagColor: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30",
    aspectRatio: "aspect-1/1",
    descVi: "Tự động hóa 65% các câu hỏi thường gặp về giao dịch tài khoản 24/7.",
    descEn: "Automated 65% of repetitive transactions and verifications seamlessly 24/7."
  },
  {
    id: "mem-22",
    src: "https://i.ibb.co/gLdK4ss8/Momo-4.webp",
    alt: "Ví MoMo 4",
    titleVi: "Sự kiện Vận hành & Teambuilding MoMo CSKH",
    titleEn: "MoMo CS Operations & Team Building Event",
    companyVi: "Ví MoMo",
    companyEn: "MoMo E-Wallet",
    category: "momo",
    year: "2019",
    tagVi: "Đoàn kết Đội ngũ",
    tagEn: "Team Bonding",
    tagColor: "bg-pink-500/15 text-pink-700 dark:text-pink-300 border-pink-500/30",
    aspectRatio: "aspect-16/10",
    descVi: "Hoạt động gắn kết tinh thần đồng đội của tập thể trung tâm CSKH Ví MoMo.",
    descEn: "Fostering team spirit across MoMo customer support operations."
  },
  {
    id: "mem-23",
    src: "https://i.ibb.co/svYWnsHK/Momo-5.webp",
    alt: "Ví MoMo 5",
    titleVi: "Đào tạo Nghiệp vụ Bảo mật Thanh toán MoMo",
    titleEn: "MoMo Payment Security & Compliance Training",
    companyVi: "Ví MoMo",
    companyEn: "MoMo E-Wallet",
    category: "momo",
    year: "2020",
    tagVi: "Bảo mật PCI-DSS",
    tagEn: "Security Standard",
    tagColor: "bg-pink-500/15 text-pink-700 dark:text-pink-300 border-pink-500/30",
    aspectRatio: "aspect-3/4",
    descVi: "Huấn luyện chuẩn quy trình bảo mật PCI-DSS cho chuyên viên hỗ trợ giao dịch.",
    descEn: "PCI-DSS compliance training for transaction support specialist team."
  },
  {
    id: "mem-24",
    src: "https://i.ibb.co/BVH5GdtT/Momo-6.webp",
    alt: "Ví MoMo 6",
    titleVi: "Lễ Ký kết Đối tác Ngân hàng & Ví MoMo",
    titleEn: "MoMo Strategic Banking Partner Signing",
    companyVi: "Ví MoMo",
    companyEn: "MoMo E-Wallet",
    category: "momo",
    year: "2020",
    tagVi: "Hợp tác Ngân hàng",
    tagEn: "Bank Partnership",
    tagColor: "bg-pink-500/15 text-pink-700 dark:text-pink-300 border-pink-500/30",
    aspectRatio: "aspect-1/1",
    descVi: "Hợp tác chiến lược nâng cao tốc độ xử lý tra soát giao dịch liên ngân hàng.",
    descEn: "Strategic banking agreement streamlining interbank resolution desks."
  },
  {
    id: "mem-25",
    src: "https://i.ibb.co/G3MgYJp3/Momo-7.webp",
    alt: "Ví MoMo 7",
    titleVi: "Giải thưởng Sáng kiến Công nghệ CSKH MoMo",
    titleEn: "MoMo CS Tech Innovation Award",
    companyVi: "Ví MoMo",
    companyEn: "MoMo E-Wallet",
    category: "momo",
    year: "2020",
    tagVi: "Sáng kiến Công nghệ",
    tagEn: "Tech Innovation",
    tagColor: "bg-pink-500/15 text-pink-700 dark:text-pink-300 border-pink-500/30",
    aspectRatio: "aspect-4/3",
    descVi: "Vinh danh giải pháp tự động hóa ticket bằng AI trong nội bộ Ví MoMo.",
    descEn: "Recognized for AI automated ticket routing solution within MoMo."
  },
  {
    id: "mem-26",
    src: "https://i.ibb.co/398WZf65/Momo-8.webp",
    alt: "Ví MoMo 8",
    titleVi: "Họp Tổng kết & Hoạch định Chiến lược MoMo CS",
    titleEn: "MoMo CS Strategy & Performance Review",
    companyVi: "Ví MoMo",
    companyEn: "MoMo E-Wallet",
    category: "momo",
    year: "2020",
    tagVi: "Hoạch định Chiến lược",
    tagEn: "Strategy Review",
    tagColor: "bg-pink-500/15 text-pink-700 dark:text-pink-300 border-pink-500/30",
    aspectRatio: "aspect-9/12",
    descVi: "Tổng kết chặng đường phát triển và mở rộng quy mô trung tâm CSKH MoMo.",
    descEn: "Reviewing milestones and scaling operations for MoMo customer support."
  },
  {
    id: "mem-27",
    src: "https://i.ibb.co/Rp4jmTWF/Finviet-1.webp",
    alt: "Finviet 1",
    titleVi: "Phát triển Hệ thống CSKH B2B Retail Finviet ECO",
    titleEn: "Developing Finviet ECO B2B Retail Support System",
    companyVi: "Finviet Group",
    companyEn: "Finviet Group",
    category: "finviet",
    year: "2020 - 2022",
    tagVi: "B2B Retail Supply",
    tagEn: "B2B Retail Supply",
    tagColor: "bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-500/30",
    aspectRatio: "aspect-16/10",
    descVi: "Phục vụ mạng lưới 10.000+ điểm bán lẻ tạp hóa truyền thống chuyển đổi số.",
    descEn: "Empowering 10,000+ traditional retailers with digital restocking support."
  },
  {
    id: "mem-28",
    src: "https://i.ibb.co/gM7nPptY/V247-3.jpg",
    alt: "V247 Telecom 3",
    titleVi: "Vận hành Hệ thống Viễn thông Quốc tế V247",
    titleEn: "V247 International Telecom Operations",
    companyVi: "V247 Telecom",
    companyEn: "V247 Telecom Corp",
    category: "mobifone",
    year: "2007 - 2008",
    tagVi: "Viễn thông Quốc tế",
    tagEn: "Global Telecom",
    tagColor: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/30",
    aspectRatio: "aspect-3/4",
    descVi: "Xây dựng ca trực 24/7 phục vụ kiều bào và viễn thông xuyên quốc gia.",
    descEn: "Round-the-clock 24/7 telecom support connecting overseas communities."
  },
  {
    id: "mem-29",
    src: "https://i.ibb.co/vr4hB1m/V247-2.jpg",
    alt: "V247 Telecom 2",
    titleVi: "Đội ngũ Kỹ thuật & Hạ tầng Cuộc gọi V247",
    titleEn: "V247 Telecom Infrastructure & Tech Support",
    companyVi: "V247 Telecom",
    companyEn: "V247 Telecom Corp",
    category: "mobifone",
    year: "2007",
    tagVi: "Hạ tầng Viễn thông",
    tagEn: "Telecom Infra",
    tagColor: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/30",
    aspectRatio: "aspect-4/3",
    descVi: "Đảm bảo đường truyền cước thoại quốc tế ổn định và chính xác.",
    descEn: "Ensuring high-stability international voice calling routing."
  },
  {
    id: "mem-30",
    src: "https://i.ibb.co/s9gsmSHs/V247-4.jpg",
    alt: "V247 Telecom 4",
    titleVi: "Đào tạo Nghiệp vụ Tổng đài Viên V247",
    titleEn: "V247 Call Center Agent Training",
    companyVi: "V247 Telecom",
    companyEn: "V247 Telecom Corp",
    category: "mobifone",
    year: "2008",
    tagVi: "Đào tạo Tổng đài",
    tagEn: "Agent Training",
    tagColor: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/30",
    aspectRatio: "aspect-1/1",
    descVi: "Đào tạo kỹ năng hỗ trợ khách hàng qua điện thoại đạt tiêu chuẩn quốc tế.",
    descEn: "International standard telephone customer care training."
  },
  {
    id: "mem-31",
    src: "https://i.ibb.co/WNQkxzYQ/V247-5.jpg",
    alt: "V247 Telecom 5",
    titleVi: "Sự kiện Tổng kết Vận hành V247 Telecom",
    titleEn: "V247 Telecom Annual Operations Review",
    companyVi: "V247 Telecom",
    companyEn: "V247 Telecom Corp",
    category: "mobifone",
    year: "2008",
    tagVi: "Tổng kết Vận hành",
    tagEn: "Annual Review",
    tagColor: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/30",
    aspectRatio: "aspect-16/10",
    descVi: "Vinh danh các tổng đài viên đạt chỉ số xử lý cuộc gọi nhanh chóng và chính xác.",
    descEn: "Recognizing top performing international telecommunication agents."
  },
  {
    id: "mem-32",
    src: "https://i.ibb.co/9HwPTKGg/V247-1.jpg",
    alt: "V247 Telecom 1",
    titleVi: "Cột mốc Phát triển Tổng đài Viễn thông V247",
    titleEn: "V247 Telecom Milestone & Expansion",
    companyVi: "V247 Telecom",
    companyEn: "V247 Telecom Corp",
    category: "mobifone",
    year: "2008",
    tagVi: "Cột mốc V247",
    tagEn: "V247 Milestone",
    tagColor: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/30",
    aspectRatio: "aspect-3/4",
    descVi: "Đánh dấu cột mốc phát triển kênh hỗ trợ cước viễn thông cho cộng đồng.",
    descEn: "Marking milestones in expanding telecommunications care services."
  }
];

export const MEMORIES_DATA: MemoryPhoto[] = MEMORIES_32_DATA.map((item) => ({
  ...item,
  title: item.titleVi,
  company: item.companyVi,
  companyId: item.category,
  tag: item.tagVi,
  description: item.descVi
}));

export default function Memories() {
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);

  const categories = [
    { id: "all", labelVi: "Tất cả (32)", labelEn: "All (32)" },
    { id: "mobifone", labelVi: "MobiFone & V247", labelEn: "MobiFone & V247" },
    { id: "htvc", labelVi: "HTVC", labelEn: "HTVC" },
    { id: "ved", labelVi: "VED / Garena", labelEn: "VED / Garena" },
    { id: "prudential", labelVi: "Prudential", labelEn: "Prudential" },
    { id: "momo", labelVi: "Ví MoMo", labelEn: "MoMo E-Wallet" },
    { id: "finviet", labelVi: "Finviet Group", labelEn: "Finviet Group" },
    { id: "events", labelVi: "Sự kiện & Vinh danh", labelEn: "Events & Awards" }
  ];

  const filteredMemories = useMemo(() => {
    return MEMORIES_32_DATA.filter(item => {
      const matchCategory = activeCategory === "all" || item.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchCategory;

      const title = (isVi ? item.titleVi : item.titleEn).toLowerCase();
      const company = (isVi ? item.companyVi : item.companyEn).toLowerCase();
      const desc = (isVi ? item.descVi : item.descEn).toLowerCase();
      const tag = (isVi ? item.tagVi : item.tagEn).toLowerCase();
      const year = item.year.toLowerCase();

      return matchCategory && (
        title.includes(query) ||
        company.includes(query) ||
        desc.includes(query) ||
        tag.includes(query) ||
        year.includes(query)
      );
    });
  }, [activeCategory, searchQuery, isVi]);

  const handleOpenPhoto = (photo: MemoryPhoto) => {
    try { playUiSound("click"); } catch {}
    setSelectedPhoto(photo);
  };

  const handleClosePhoto = () => {
    try { playUiSound("click"); } catch {}
    setSelectedPhoto(null);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    try { playUiSound("click"); } catch {}
    if (!selectedPhoto) return;
    const currentIndex = filteredMemories.findIndex(p => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + filteredMemories.length) % filteredMemories.length;
    setSelectedPhoto(filteredMemories[prevIndex]);
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    try { playUiSound("click"); } catch {}
    if (!selectedPhoto) return;
    const currentIndex = filteredMemories.findIndex(p => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % filteredMemories.length;
    setSelectedPhoto(filteredMemories[nextIndex]);
  };

  return (
    <section 
      id="memories" 
      className="relative w-full min-h-full flex flex-col justify-start items-center p-3 xs:p-3.5 sm:p-4.5 md:p-6 lg:p-8 font-sans text-slate-800 dark:text-slate-100 select-none"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-5 relative z-10">
        
        {/* Header Card Kỷ niệm */}
        <PageCardHeader pageId="memories">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-5 bg-pink-600 dark:bg-pink-400 rounded-full shrink-0" />
            <span className="text-caption font-mono font-black text-pink-700 dark:text-pink-400 bg-pink-500/15 px-2.5 py-0.5 rounded-full border border-pink-500/30 shadow-2xs">
              {isVi ? `Bộ sưu tập 32 Khoảnh khắc sự nghiệp` : `Collection of 32 Career Moments`}
            </span>
          </div>
        </PageCardHeader>

        {/* Controls Bar: Categories & Live Search */}
        <div 
          id="memories-controls"
          style={{ borderRadius: "var(--theme-radius-card, var(--theme-radius, 16px))" }}
          className="w-full glass-surface backdrop-blur-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 p-3 sm:p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3"
        >
          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    try { playUiSound("click"); } catch {}
                    setActiveCategory(cat.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-caption font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 border ${
                    isActive 
                      ? "bg-pink-600 text-white border-pink-600 shadow-xs scale-105" 
                      : "bg-slate-100/80 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/60 dark:border-slate-700/60 hover:bg-pink-50 dark:hover:bg-pink-950/30 hover:text-pink-600"
                  }`}
                >
                  {isVi ? cat.labelVi : cat.labelEn}
                </button>
              );
            })}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isVi ? "Tìm theo sự kiện, năm, công ty..." : "Search moment, year, org..."}
              className="w-full pl-9 pr-3 py-1.5 text-caption bg-white/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-pink-500/50 transition-all"
            />
            {searchQuery && (
              <button 
                type="button" 
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Pinterest Staggered Masonry Layout with 32 Cards */}
        {filteredMemories.length > 0 ? (
          <div className="w-full">
            <Masonry
              items={filteredMemories}
              gap={16}
              columns={{ 0: 1, 540: 2, 860: 3, 1200: 4 }}
              keyExtractor={(item) => item.id}
              renderItem={(photo, idx) => (
                <Memory3DTiltCard
                  key={photo.id}
                  photo={photo}
                  idx={idx}
                  isVi={isVi}
                  onClick={() => handleOpenPhoto(photo)}
                />
              )}
            />
          </div>
        ) : (
          <div 
            style={{ borderRadius: "var(--theme-radius-card, var(--theme-radius, 16px))" }}
            className="py-16 px-6 text-center glass-surface bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 p-8 space-y-3 shadow-sm flex flex-col items-center justify-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-600 flex items-center justify-center">
              <Camera className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
              {isVi ? "Không tìm thấy khoảnh khắc phù hợp với từ khóa" : "No moments found matching search query"}
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="px-4 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              {isVi ? "Xem tất cả 32 khoảnh khắc" : "View all 32 moments"}
            </button>
          </div>
        )}

      </div>

      {/* Lightbox Preview Modal for Memories */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClosePhoto}
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-55 flex items-center justify-center p-3 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{ borderRadius: "var(--theme-radius-card, var(--theme-radius, 20px))" }}
              className="glass-surface bg-slate-900/95 border border-slate-700 max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row relative z-50 text-left"
            >
              {/* Close Button Top Right */}
              <button
                type="button"
                onClick={handleClosePhoto}
                className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-slate-800/90 hover:bg-rose-600 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                title="Đóng"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Photo View Box with Nav Controls */}
              <div className="relative md:w-3/5 bg-black flex items-center justify-center min-h-[300px] max-h-[500px]">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  className="w-full h-full object-contain max-h-[500px]"
                />
                
                {/* Previous Button */}
                <button
                  type="button"
                  onClick={handlePrevPhoto}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-pink-600 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                  title="Ảnh trước"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={handleNextPhoto}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-pink-600 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                  title="Ảnh kế tiếp"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Detailed Description Panel */}
              <div className="md:w-2/5 p-5 sm:p-6 flex flex-col justify-between gap-4 text-white">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${selectedPhoto.tagColor}`}>
                      {isVi ? selectedPhoto.tagVi : selectedPhoto.tagEn}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {selectedPhoto.year}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-pink-400">
                      <Building2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{isVi ? selectedPhoto.companyVi : selectedPhoto.companyEn}</span>
                    </div>
                    <h3 className="text-lg font-black text-white leading-snug">
                      {isVi ? selectedPhoto.titleVi : selectedPhoto.titleEn}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
                    {isVi ? selectedPhoto.descVi : selectedPhoto.descEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-2xs text-slate-400">
                  <span className="flex items-center gap-1 font-mono">
                    <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
                    <span>22+ Years Journey Archive</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleClosePhoto}
                    className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-caption transition cursor-pointer"
                  >
                    {isVi ? "Đóng" : "Close"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
