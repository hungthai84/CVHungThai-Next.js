import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { 
  Heart, 
  Sparkles, 
  Rocket, 
  Shield, 
  Layers, 
  Users, 
  Box, 
  Clock, 
  Target, 
  Mail, 
  BookCheck,
  Building2, 
  Phone, 
  Settings, 
  Network, 
  Bot, 
  LayoutDashboard, 
  Server,
  Star,
  Award,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Handshake,
  CheckCircle2,
  Quote,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Briefcase,
  Signal,
  Headset,
  Tv,
  Gamepad2,
  ShieldCheck,
  Wallet,
  CreditCard,
  Compass,
  ArrowRight,
  ArrowDown,
  ArrowLeft,
  Calendar,
  Send,
  MessageSquare,
  Check,
  Video,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2
} from "lucide-react";
import { useLanguage } from "../i18n";
import { playUiSound } from "../lib/sound";
import { HeroIntroButton } from "./HeroIntroButton";
import {
  DedicatedHeartIcon,
  TargetProfessionalIcon,
  InnovationBulbIcon,
  PartnershipHandshakeIcon,
  GrowthChart3DIcon
} from "./CoreValuesIcons";

const ABOUT_IDLE_VIDEO_URL = "https://cdn.scena.ai/project/10169/eae59f7007421658e611c298c206755ca060c878d07087694c06935208b9d8f9.mp4";
const ABOUT_INTRO_VIDEO_URL = "https://cdn.scena.ai/project/10169/0f6e39f01533134c70012f61be38d29126100c0300c9c0ea607adb305b5f7102.mp4";

// ==========================================
// 1. SVG GRAPHICS & CUSTOM ILLUSTRATIONS
// ==========================================

// Lớp nền nghệ thuật hình ảnh email trải rộng làm lớp dưới cùng của thẻ chính
const EmailMainCardBackdrop = () => {
  return (
    <div 
      className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden opacity-[0.14] dark:opacity-[0.10]"
      aria-hidden="true"
    >
      {/* Quầng sáng quang phổ màu chàm - xanh pastel hỗ trợ chiều sâu */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-br from-blue-400/20 via-indigo-400/10 to-transparent blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[350px] rounded-full bg-gradient-to-tr from-sky-400/15 via-blue-500/10 to-purple-500/10 blur-3xl" />
      <div className="absolute -bottom-28 -right-28 w-[550px] h-[550px] rounded-full bg-gradient-to-tl from-indigo-500/25 via-purple-500/15 to-transparent blur-3xl" />

      {/* Vector SVG Toàn Cảnh Hình Ảnh Email & Thư Tín Điện Tử Nghệ Thuật */}
      <svg 
        viewBox="0 0 1200 900" 
        className="w-full h-full object-cover overflow-visible"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="mainEmailPaperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#6366F1" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="mainEmailEnvGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id="mainEmailFlapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="mainStampGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#FB923C" stopOpacity="0.65" />
          </linearGradient>
          <linearGradient id="emailLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#6366F1" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* 1. Mạng lưới đường truyền sóng email bay qua các node kết nối */}
        <g stroke="url(#emailLineGrad)" strokeWidth="1.5" strokeDasharray="6 6">
          <path d="M 50 150 Q 300 80 600 220 T 1150 180" />
          <path d="M 100 450 Q 400 350 750 500 T 1180 420" />
          <path d="M 80 750 Q 450 620 850 780 T 1120 720" />
        </g>

        {/* 2. Các điểm node kết nối dữ liệu bưu chính số */}
        <g fill="#3B82F6" opacity="0.5">
          <circle cx="300" cy="115" r="4" />
          <circle cx="600" cy="220" r="5" />
          <circle cx="900" cy="190" r="4" />
          <circle cx="400" cy="380" r="4" />
          <circle cx="750" cy="500" r="6" />
          <circle cx="450" cy="650" r="5" />
          <circle cx="850" cy="780" r="6" />
        </g>

        {/* 3. Khối Phong Bì & Bức Thư Email Isometric Nghệ Thuật Lớn ở góc dưới phải */}
        <g transform="translate(760, 480) rotate(-4)">
          {/* Back Wall Flap */}
          <path d="M 40 100 L 380 100 L 210 20 Z" fill="url(#mainEmailFlapGrad)" stroke="#60A5FA" strokeWidth="2" strokeDasharray="6 4" />

          {/* Letter Document Emerging */}
          <rect x="65" y="35" width="290" height="220" rx="14" fill="url(#mainEmailPaperGrad)" stroke="#93C5FD" strokeWidth="2" />
          
          {/* Letter Content Lines */}
          <line x1="95" y1="70" x2="230" y2="70" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" />
          <line x1="95" y1="95" x2="315" y2="95" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
          <line x1="95" y1="118" x2="315" y2="118" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
          <line x1="95" y1="140" x2="315" y2="140" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
          <line x1="95" y1="162" x2="260" y2="162" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
          <line x1="95" y1="184" x2="200" y2="184" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" opacity="0.75" />

          {/* Postal Stamp Badge */}
          <g transform="translate(265, 45)">
            <rect x="0" y="0" width="55" height="62" rx="6" fill="none" stroke="url(#mainStampGrad)" strokeWidth="2" strokeDasharray="4 2.5" />
            <circle cx="27.5" cy="31" r="18" fill="none" stroke="#FB7185" strokeWidth="1.8" />
            <path d="M 20 34 L 27.5 24 L 35 34" stroke="#F43F5E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="27.5" cy="40" r="2" fill="#F43F5E" />
          </g>

          {/* Front Envelope Pocket */}
          <path d="M 30 100 L 390 100 L 390 290 L 30 290 Z" fill="url(#mainEmailEnvGrad)" stroke="#3B82F6" strokeWidth="2.5" />
          
          {/* Envelope Pocket Diagonal Folds */}
          <path d="M 30 100 L 210 225 L 390 100" stroke="#60A5FA" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 30 290 L 165 190" stroke="#60A5FA" strokeWidth="2" fill="none" />
          <path d="M 390 290 L 255 190" stroke="#60A5FA" strokeWidth="2" fill="none" />

          {/* Official Postal Seal Stamp */}
          <g transform="translate(120, 205) rotate(14)">
            <circle cx="0" cy="0" r="40" fill="none" stroke="#0284C7" strokeWidth="2" strokeDasharray="5 3" />
            <circle cx="0" cy="0" r="33" fill="none" stroke="#38BDF8" strokeWidth="1.2" />
            <text x="0" y="-14" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0284C7" letterSpacing="1.2">CSKH TẬN TÂM</text>
            <text x="0" y="2" textAnchor="middle" fontSize="12" fontWeight="900" fill="#0369A1">2002 - 2026</text>
            <text x="0" y="16" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#0284C7" letterSpacing="1">Thư ngỏ</text>
          </g>

          {/* Floating email send @ symbol */}
          <g transform="translate(350, 160)">
            <circle cx="0" cy="0" r="22" fill="#3B82F6" opacity="0.2" />
            <text x="0" y="7" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#2563EB">@</text>
          </g>
        </g>
      </svg>
    </div>
  );
};

// Authentic Signature vector for Nguyễn Hùng Thái
const SignatureSvg = () => (
  <svg 
    className="w-36 h-12 text-blue-600 dark:text-cyan-400 opacity-95 relative select-none pointer-events-none my-0.5" 
    viewBox="0 0 220 80" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3.4" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M 30 60 C 45 45, 60 10, 72 32 C 80 52, 85 15, 98 32 C 108 45, 115 58, 128 22 C 135 12, 142 45, 185 28" />
    <path d="M 38 42 L 185 34" strokeWidth="2" />
    <path d="M 82 10 L 82 65" strokeWidth="2.8" />
  </svg>
);

// ==========================================
// 2. CAREER TIMELINE DATA
// ==========================================
interface CareerMilestoneItem {
  id: string;
  yearNumber: string;
  yearLabelVi: string;
  yearLabelEn: string;
  company: string;
  roleVi: string;
  roleEn: string;
  color: string;
  logo: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  arrowDesktop: "right" | "down" | "left" | "compass";
  arrowTablet: "right" | "down" | "compass";
  desktopGridClass: string;
  tabletGridClass: string;
  descVi: string;
  descEn: string;
  highlightVi: string;
  highlightEn: string;
  isCenterAlign?: boolean;
}

const CAREER_MILESTONES_ZICZAC: CareerMilestoneItem[] = [
  {
    id: "card-2002",
    yearNumber: "2002",
    yearLabelVi: "Năm 2002",
    yearLabelEn: "Year 2002",
    company: "MobiFone",
    roleVi: "Nhân viên Vận hành Viễn thông",
    roleEn: "Telecom Operations Specialist",
    color: "#0284c7",
    logo: "https://i.ibb.co/hxHm9TsZ/Mobifone.png",
    icon: Signal,
    arrowDesktop: "right",
    arrowTablet: "right",
    desktopGridClass: "lg:col-start-1 lg:row-start-1",
    tabletGridClass: "md:col-start-1 md:row-start-1",
    descVi: "Tôi bắt đầu sự nghiệp tại **MobiFone**, nơi tôi được đào tạo bài bản về **dịch vụ khách hàng**, quản lý tổng đài, xử lý sự cố và xây dựng quy trình phục vụ theo **tiêu chuẩn ngành viễn thông**. Đây là nền tảng giúp tôi hình thành tư duy **lấy khách hàng làm trung tâm** và hiểu rõ tầm quan trọng của quy trình trong vận hành dịch vụ.",
    descEn: "Started career at **MobiFone**, systematically trained in **customer care**, incident handling, and telecom workflow standardization.",
    highlightVi: "Nền tảng hình thành tư duy lấy khách hàng làm trọng tâm.",
    highlightEn: "Foundation that shaped a customer-centric mindset."
  },
  {
    id: "card-2007",
    yearNumber: "2007",
    yearLabelVi: "Năm 2007",
    yearLabelEn: "Year 2007",
    company: "Viễn Liên V247",
    roleVi: "Giám sát CSKH & Vận hành",
    roleEn: "Customer Service & Operations Supervisor",
    color: "#0891b2",
    logo: "https://i.ibb.co/QvtbdnfP/V247.png",
    icon: Headset,
    arrowDesktop: "right",
    arrowTablet: "down",
    desktopGridClass: "lg:col-start-2 lg:row-start-1",
    tabletGridClass: "md:col-start-2 md:row-start-1",
    descVi: "Gia nhập **Viễn Liên V247**, tôi tiếp tục phát triển năng lực **quản lý đội ngũ**, giám sát chất lượng dịch vụ và tối ưu hiệu quả vận hành của trung tâm chăm sóc khách hàng Giai đoạn này giúp tôi tích lũy kinh nghiệm quản lý hoạt động với **quy mô lớn** và xây dựng các **chỉ số đánh giá chất lượng** dịch vụ.",
    descEn: "Developed team management, **quality supervision**, and operational efficiency for **large-scale contact centers**.",
    highlightVi: "Xây dựng các chỉ số đánh giá KPI vận hành quy mô lớn.",
    highlightEn: "Building comprehensive KPI evaluation frameworks."
  },
  {
    id: "card-2011",
    yearNumber: "2011",
    yearLabelVi: "Năm 2011",
    yearLabelEn: "Year 2011",
    company: "LBC – HTV",
    roleVi: "Trưởng phòng CSKH",
    roleEn: "Head of Customer Service",
    color: "#d97706",
    logo: "https://i.ibb.co/R4YXWyzF/LBC.png",
    icon: Tv,
    arrowDesktop: "right",
    arrowTablet: "right",
    desktopGridClass: "lg:col-start-3 lg:row-start-1",
    tabletGridClass: "md:col-start-1 md:row-start-2",
    descVi: "Đây là dấu mốc quan trọng khi tôi lần đầu đảm nhiệm vị trí **Trưởng phòng Chăm sóc Khách hàng**. Từ một nhà quản lý vận hành, tôi chuyển mình trở thành một **nhà quản trị toàn diện**. Tôi trực tiếp điều hành hoạt động của phòng ban, xây dựng và chuẩn hóa quy trình, phát triển đội ngũ, thiết lập **hệ thống KPI**, đồng thời phối hợp với nhiều đơn vị nhằm nâng cao chất lượng dịch vụ và hiệu quả vận hành. Chính giai đoạn này đã giúp tôi hình thành tư duy **quản trị hệ thống** và **phát triển con người** song song với mục tiêu kinh doanh.",
    descEn: "Managed customer service department at **LBC - HTV Cable**, directly leading teams, **standardizing workflows**, and setting **KPIs**.",
    highlightVi: "Tư duy quản trị hệ thống và phát triển con người.",
    highlightEn: "Systems governance and human talent development."
  },
  {
    id: "card-2013",
    yearNumber: "2013",
    yearLabelVi: "Năm 2013",
    yearLabelEn: "Year 2013",
    company: "Garena",
    roleVi: "Trưởng phòng Vận hành CSKH",
    roleEn: "Customer Service Operations Manager",
    color: "#ea580c",
    logo: "https://i.ibb.co/fYPJLfbw/VED.png",
    icon: Gamepad2,
    arrowDesktop: "down",
    arrowTablet: "down",
    desktopGridClass: "lg:col-start-4 lg:row-start-1",
    tabletGridClass: "md:col-start-2 md:row-start-2",
    descVi: "Gia nhập **Garena**, tôi quản lý hoạt động chăm sóc khách hàng trong lĩnh vực **game trực tuyến**, nơi yêu cầu tốc độ xử lý nhanh, độ chính xác cao và khả năng đáp ứng lượng khách hàng rất lớn. Trong thời gian này, Garena phát triển mạnh với **Liên Minh Huyền Thoại**, đồng thời mở rộng thành **Vietnam eSport** và đầu tư vào nhiều lĩnh vực mới như **Shopee, AirPay, Gcafe và Liên Quân Mobile**. Tôi có cơ hội đồng hành cùng các dự án ngay từ giai đoạn đầu. Mỗi sản phẩm đều có mô hình vận hành, hành vi người dùng và kỳ vọng khách hàng khác nhau, buộc tôi phải liên tục học hỏi, thích nghi và cập nhật kiến thức để xây dựng các quy trình chăm sóc khách hàng phù hợp với từng lĩnh vực. Đặc biệt, việc tham gia vào giai đoạn phát triển ban đầu của **Shopee** giúp tôi tiếp cận tư duy **quản trị thương mại điện tử hiện đại**, từ hành trình khách hàng, trải nghiệm đa kênh, vận hành dịch vụ quy mô lớn đến ứng dụng dữ liệu trong quản trị chất lượng và tối ưu hiệu quả hoạt động. Tại Garena, tôi trực tiếp quản lý **129 nhân sự**, xây dựng cơ cấu tổ chức, phát triển đội ngũ quản lý cấp trung, chuẩn hóa quy trình vận hành, thiết lập hệ thống đánh giá hiệu quả công việc và đào tạo nguồn nhân lực kế thừa. Làm việc trong môi trường tăng trưởng với tốc độ rất cao giúp tôi rèn luyện khả năng ra quyết định dưới áp lực, xử lý nhanh các tình huống phát sinh, điều phối nguồn lực hiệu quả và liên tục cải tiến quy trình để đáp ứng sự thay đổi của thị trường. Đây cũng là giai đoạn đặt nền móng cho triết lý quản trị của tôi: **xây dựng hệ thống trước khi mở rộng quy mô**, phát triển con người song hành cùng công nghệ và luôn **lấy khách hàng làm trung tâm** trong mọi quyết định.",
    descEn: "Joined **Garena**, managing **129 CSKH personnel** for high-speed online gaming (**LoL, Shopee, AirPay, Gcafe, Arena of Valor**).",
    highlightVi: "Triết lý: Xây dựng hệ thống vững chắc trước khi mở rộng.",
    highlightEn: "Philosophy: Build solid systems before scaling up."
  },
  {
    id: "card-2016",
    yearNumber: "2016",
    yearLabelVi: "Năm 2016",
    yearLabelEn: "Year 2016",
    company: "Prudential",
    roleVi: "Trưởng phòng Trải nghiệm Khách hàng",
    roleEn: "Head of Customer Experience",
    color: "#e11d48",
    logo: "https://i.ibb.co/XfpQphWF/Prudential.png",
    icon: ShieldCheck,
    arrowDesktop: "left",
    arrowTablet: "right",
    desktopGridClass: "lg:col-start-4 lg:row-start-2",
    tabletGridClass: "md:col-start-1 md:row-start-3",
    descVi: "Tại **Prudential**, tôi có cơ hội làm việc trong lĩnh vực **bảo hiểm** – một ngành dịch vụ đòi hỏi tính chính xác, minh bạch và mức độ tin cậy rất cao. Thời gian này giúp tôi hiểu sâu hơn về **quản trị trải nghiệm khách hàng (CX)**, quản lý chất lượng dịch vụ và xây dựng niềm tin bền vững thông qua quy trình chuyên nghiệp và sự **đồng cảm** trong từng điểm chạm với khách hàng.",
    descEn: "Managed **CX in life insurance** – requiring high precision, transparency, and reinforcing long-term **brand trust**.",
    highlightVi: "Quản trị trải nghiệm khách hàng (CX) và xây dựng niềm tin.",
    highlightEn: "Customer experience (CX) governance & brand trust."
  },
  {
    id: "card-2018",
    yearNumber: "2018",
    yearLabelVi: "Năm 2018",
    yearLabelEn: "Year 2018",
    company: "MoMo FinTech",
    roleVi: "Trưởng phòng Dịch vụ Khách hàng",
    roleEn: "Customer Service Manager",
    color: "#9333ea",
    logo: "https://i.ibb.co/k2QtrgTw/Momo.png",
    icon: Wallet,
    arrowDesktop: "left",
    arrowTablet: "down",
    desktopGridClass: "lg:col-start-3 lg:row-start-2",
    tabletGridClass: "md:col-start-2 md:row-start-3",
    descVi: "Gia nhập **MoMo**, tôi tiếp tục mở rộng kinh nghiệm trong lĩnh vực **tài chính số**. Tôi tập trung **tối ưu quy trình hỗ trợ**, nâng cao hiệu quả vận hành, ứng dụng công nghệ vào quản trị dịch vụ và cải thiện **trải nghiệm khách hàng** trên nền tảng số.",
    descEn: "Broadened **digital finance** expertise at **MoMo**, optimizing support workflows, boosting operational efficiency, and elevating CX.",
    highlightVi: "Tối ưu quy trình vận hành và cải thiện trải nghiệm số.",
    highlightEn: "Optimizing operational workflows and digital experiences."
  },
  {
    id: "card-2023",
    yearNumber: "2023",
    yearLabelVi: "Năm 2023",
    yearLabelEn: "Year 2023",
    company: "Ví ECO",
    roleVi: "Trưởng phòng Dịch vụ Khách hàng",
    roleEn: "Customer Service Manager",
    color: "#059669",
    logo: "https://i.ibb.co/7NtSSz4d/Finviet.png",
    icon: CreditCard,
    arrowDesktop: "left",
    arrowTablet: "right",
    desktopGridClass: "lg:col-start-2 lg:row-start-2",
    tabletGridClass: "md:col-start-1 md:row-start-4",
    descVi: "Tại **Ví ECO**, tôi tiếp tục phát triển chuyên môn trong lĩnh vực **tài chính**, nơi mọi hoạt động đều đặt yêu cầu cao về tính chính xác, minh bạch và sự tin cậy. Giai đoạn này giúp tôi hoàn thiện hơn tư duy xây dựng **hệ thống dịch vụ khách hàng hiện đại**, kết hợp hài hòa giữa **Quy trình - Công nghệ - Trải nghiệm** người dùng.",
    descEn: "Advanced secure **digital finance** specialization, perfecting the harmony between **Process - Technology - Experience**.",
    highlightVi: "Kết hợp hài hòa giữa Quy trình, Công nghệ và Trải nghiệm.",
    highlightEn: "Seamless harmony between Process, Technology, and Experience."
  },
  {
    id: "card-2026",
    yearNumber: "2026",
    yearLabelVi: "Năm 2026",
    yearLabelEn: "Year 2026",
    company: "Khám Phá Mới",
    roleVi: "Chuyên gia / Quản lý CX cấp cao",
    roleEn: "Senior CX Expert & Leader",
    color: "#4f46e5",
    logo: "https://i.ibb.co/G4QnNzWb/Power-Service.png",
    icon: Compass,
    arrowDesktop: "compass",
    arrowTablet: "compass",
    desktopGridClass: "lg:col-start-1 lg:row-start-2",
    tabletGridClass: "md:col-start-2 md:row-start-4",
    descVi: "Sẵn sàng đón nhận thách thức, cơ hội công việc mới trong môi trường **chuyển đổi số toàn cầu** và ứng dụng **trí tuệ nhân tạo (AI)**.",
    descEn: "Ready to embrace fresh leadership challenges in **global digital transformation** and **AI-driven** environments.",
    highlightVi: "Mở ra chương mới với những tầm cao và giá trị vượt trội.",
    highlightEn: "Embarking on a new chapter reaching higher peaks and outstanding value."
  }
];

// ==========================================
// 3. MAIN OPEN LETTER COMPONENT
// ==========================================
export default function OpenLetter() {
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  // Collapse/Expand state for career milestones
  const [expandedCard, setExpandedCard] = useState<Record<string, boolean>>({
    "card-2013": false
  });

  // Helper to format bold text split by ** for outstanding and professional highlights
  const renderFormattedText = (text: string) => {
    if (!text) return "";
    const tokens = text.split("**");
    return tokens.map((part, i) => {
      if (i % 2 === 1) {
        return (
          <strong key={i} className="font-extrabold text-slate-900 dark:text-white bg-slate-100/60 dark:bg-slate-800/60 px-1.5 py-0.5 rounded-md mx-0.5 shadow-3xs">
            {part}
          </strong>
        );
      }
      return part;
    });
  };

  // Video State & Controls matching About page
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlayingIntro, setIsPlayingIntro] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  const handlePlayIntro = () => {
    setIsPlayingIntro(true);
    setIsVideoMuted(false);
    if (videoRef.current) {
      videoRef.current.src = ABOUT_INTRO_VIDEO_URL;
      videoRef.current.muted = false;
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleCancelIntro = () => {
    setIsPlayingIntro(false);
    setIsVideoMuted(true);
    if (videoRef.current) {
      videoRef.current.src = ABOUT_IDLE_VIDEO_URL;
      videoRef.current.muted = true;
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleVideoEnded = () => {
    if (isPlayingIntro) {
      handleCancelIntro();
    }
  };

  const toggleVideoMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isVideoMuted;
    videoRef.current.muted = nextMuted;
    setIsVideoMuted(nextMuted);
  };

  // SVG Connector đường ziczac giữa các mũi tên thẻ
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const arrowRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [svgPath, setSvgPath] = useState<string>("");

  // Callback chuyển hướng cuộn mượt đến phần CTA
  const scrollToCta = useCallback(() => {
    try {
      playUiSound("click");
    } catch {
      // ignore error
    }
    const ctaElement = document.getElementById("card-open-letter-cta");
    if (ctaElement) {
      ctaElement.scrollIntoView({ behavior: "smooth", block: "center" });
      ctaElement.classList.add("ring-4", "ring-cyan-400/80", "ring-offset-4", "ring-offset-slate-900", "transition-all", "duration-500");
      setTimeout(() => {
        ctaElement.classList.remove("ring-4", "ring-cyan-400/80", "ring-offset-4", "ring-offset-slate-900");
      }, 2500);
    }
  }, []);

  const updateConnectors = useCallback(() => {
    const container = gridContainerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const years = ["2002", "2007", "2011", "2013", "2016", "2018", "2023", "2026"];

    let path = "";
    for (let i = 0; i < years.length - 1; i++) {
      const currentYear = years[i];
      const nextYear = years[i + 1];
      const currEl = arrowRefs.current[currentYear];
      const nextEl = arrowRefs.current[nextYear];
      if (!currEl || !nextEl) continue;

      const currRect = currEl.getBoundingClientRect();
      const nextRect = nextEl.getBoundingClientRect();

      const x1 = currRect.left + currRect.width / 2 - containerRect.left;
      const y1 = currRect.top + currRect.height / 2 - containerRect.top;
      const x2 = nextRect.left + nextRect.width / 2 - containerRect.left;
      const y2 = nextRect.top + nextRect.height / 2 - containerRect.top;

      if (i === 0) {
        path += `M ${x1} ${y1} `;
      }
      path += `L ${x2} ${y2} `;
    }
    setSvgPath(path);
  }, []);

  useEffect(() => {
    updateConnectors();
    const handleResize = () => {
      updateConnectors();
    };
    window.addEventListener("resize", handleResize);

    const timer = setTimeout(updateConnectors, 250);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, [updateConnectors]);

  return (
    <section 
      id="letter" 
      className="relative w-full min-h-full flex flex-col justify-start items-center p-3 xs:p-3.5 sm:p-4.5 md:p-6 lg:p-8 font-sans text-slate-800 dark:text-slate-100"
    >
      {/* Container Thư ngỏ chính */}
      <div 
        id="info-card-open-letter"
        className="w-full flex flex-col gap-6 relative z-10"
      >
        {/* Lớp nền nghệ thuật hình ảnh email làm lớp dưới cùng của thẻ chính */}
        <EmailMainCardBackdrop />

        {/* Header chuẩn hóa Card Section Header đồng bộ với About, Domains & Interview */}
        <div className="w-full flex flex-col gap-[6px] pb-3 border-b border-slate-200/70 dark:border-slate-800/70 mb-1">
          {/* Dòng 1 : Icon tiêu đề thẻ & Tiêu đề H2 cùng màu icon & Badge */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
              </div>
              <h2 className="text-lg sm:text-xl font-black tracking-tight text-emerald-600 dark:text-emerald-400">
                {isVi ? "Thư ngỏ phụng sự" : "Open letter service dedication"}
              </h2>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold border border-emerald-500/20 shadow-2xs">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>{isVi ? "Tôn chỉ phụng sự" : "Service philosophy"}</span>
            </div>
          </div>

          {/* Dòng 2 : Đường line gạch màu ngọc bích tinh tế */}
          <div className="h-[2px] w-full bg-emerald-500/30 dark:bg-emerald-500/20" />
        </div>

        {/* ========================================================================= */}
        {/* ROW 1: THẺ VIDEO TRẢI NGHIỆM & THẺ THÔNG ĐIỆP HỢP TÁC (NẰM CÙNG HÀNG - ĐÃ HOÁN ĐỔI VỊ TRÍ) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.5, ease: "easeOut" }} 
          className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full relative z-10"
        >
          {/* CỘT TRÁI: THẺ VIDEO GIỚI THIỆU & THÔNG ĐIỆP (5 CỘT TRÊN DESKTOP) */}
          <div
            id="card-open-letter-video"
            className="lg:col-span-5 w-full relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/60 dark:border-white/15 bg-slate-950/90 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.4)] min-h-[360px] sm:min-h-[420px] flex items-center justify-center group z-10"
          >
            {/* The Portrait Video with Mouse Avatar */}
            <video
              ref={videoRef}
              src={isPlayingIntro ? ABOUT_INTRO_VIDEO_URL : ABOUT_IDLE_VIDEO_URL}
              className="w-full h-full object-cover object-center absolute inset-0 brightness-105"
              autoPlay
              loop={!isPlayingIntro}
              muted={isVideoMuted}
              playsInline
              onEnded={handleVideoEnded}
            />

            {/* Subtle Gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35 pointer-events-none" />

            {/* Bottom Left Video Intro Controls */}
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 pointer-events-auto">
              <HeroIntroButton
                isPlayingIntro={isPlayingIntro}
                isAudioOn={!isVideoMuted}
                onToggleAudio={toggleVideoMute}
                onPlayIntro={handlePlayIntro}
                onCancelIntro={handleCancelIntro}
                lang={lang}
                className="shadow-[0_8px_30px_rgba(78,86,246,0.6)]"
              />
            </div>
          </div>

          {/* CỘT PHẢI: THẺ THÔNG ĐIỆP HỢP TÁC (7 CỘT TRÊN DESKTOP) */}
          <div
            id="card-main-letter-content"
            className="lg:col-span-7 w-full glass-surface backdrop-blur-2xl rounded-[20px] border border-slate-200/80 dark:border-slate-800/80 p-5 sm:p-6 md:p-7 shadow-md hover:shadow-xl hover:border-emerald-400/60 dark:hover:border-emerald-400/60 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group z-10"
          >
            {/* Lớp nền nghệ thuật hình ảnh email đặt trực tiếp làm nền cho thẻ chính thư ngỏ */}
            <EmailMainCardBackdrop />

            {/* Card Header formatted like Chi tiết phỏng vấn (Emerald theme, 4-word title) */}
            <div className="relative z-10 mb-3.5">
              <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-emerald-200/60 dark:border-emerald-800/60 mb-3">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <Mail className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <h3 className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400 tracking-wide">
                    {isVi ? "Thông điệp hợp tác" : "Partnership message"}
                  </h3>
                </div>
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 shrink-0">
                  {isVi ? "Thư ngỏ" : "Open letter"}
                </span>
              </div>

              {/* Greeting */}
              <p className="text-amber-700 dark:text-amber-300 font-bold text-xs sm:text-sm italic pl-1 leading-normal">
                {isVi ? "Kính gửi Quý đối tác, Quý khách hàng và toàn thể cộng sự," : "Dear Valued Partners, Customers, and Colleagues,"}
              </p>
            </div>

            {/* Body Content - Tối ưu bố cục chữ gọn gàng, trang nhã, tăng khả năng đọc */}
            <div className="relative z-10 flex flex-col w-full flex-1 justify-between space-y-4 my-2">
              <p className="tracking-normal text-slate-800 dark:text-slate-100 text-sm sm:text-[15px] md:text-base leading-[1.8] font-normal">
                {isVi ? (
                  <>
                    Tôi là <strong className="font-extrabold text-emerald-700 dark:text-emerald-400">Nguyễn Hùng Thái</strong>, Trưởng phòng Chăm sóc Khách hàng với hơn <strong className="font-extrabold text-emerald-700 dark:text-emerald-400">22 năm kinh nghiệm</strong> trong lĩnh vực xây dựng, vận hành và phát triển hệ thống dịch vụ khách hàng chuyên nghiệp.
                  </>
                ) : (
                  <>
                    I am <strong className="font-extrabold text-emerald-700 dark:text-emerald-400">Nguyen Hung Thai</strong>, Head of Customer Support with over <strong className="font-extrabold text-emerald-700 dark:text-emerald-400">22 years of experience</strong> in building, operating, and advancing professional customer service operations.
                  </>
                )}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* ROW 1.5: TRỤ CỘT CỐNG HIẾN (FULL-WIDTH BENTO CARD) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.5, ease: "easeOut" }} 
          className="w-full relative z-10"
        >
          {/* Card: TRỤ CỘT CỐNG HIẾN */}
          <div className="w-full glass-surface backdrop-blur-2xl rounded-[20px] border border-slate-200/80 dark:border-slate-800/80 p-5 sm:p-6 md:p-7 shadow-md hover:shadow-xl hover:border-indigo-400/60 dark:hover:border-indigo-400/60 transition-all duration-300 flex flex-col justify-between group/card">
            {/* Header formatted exactly like Thông điệp hợp tác (4-word title in Indigo theme) */}
            <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-indigo-200/60 dark:border-indigo-800/60 mb-3">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <h3 className="text-base sm:text-lg font-black text-indigo-600 dark:text-indigo-400 tracking-wide">
                  {isVi ? "Trụ cột cống hiến" : "Four dedication pillars"}
                </h3>
              </div>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 shrink-0">
                {isVi ? "4 Trụ cột" : "4 Pillars"}
              </span>
            </div>

            {/* 4 Pillars Cards với màu sắc riêng biệt, nổi bật */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {/* 1. Quy trình */}
              <div className="rounded-[20px] p-4 bg-gradient-to-b from-blue-600 via-indigo-600 to-sky-700 text-white flex flex-col items-center justify-center text-center shadow-md shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300 cursor-pointer border border-blue-300/40">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center mb-1.5 shadow-inner">
                  <Box className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs sm:text-[13px] font-black tracking-normal">{isVi ? "Quy trình" : "Process"}</span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-blue-100 mt-0.5 leading-tight">{isVi ? "Đơn giản" : "Simple"}</span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-blue-100 leading-tight">{isVi ? "Tận tâm" : "Dedicated"}</span>
              </div>

              {/* 2. Con người */}
              <div className="rounded-[20px] p-4 bg-gradient-to-b from-amber-500 via-orange-600 to-amber-700 text-white flex flex-col items-center justify-center text-center shadow-md shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 transform hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300 cursor-pointer border border-amber-300/40">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center mb-1.5 shadow-inner">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs sm:text-[13px] font-black tracking-normal">{isVi ? "Con người" : "People"}</span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-amber-100 mt-0.5 leading-tight">{isVi ? "Trao giá trị" : "Empower"}</span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-amber-100 leading-tight">{isVi ? "Phát triển" : "Growth"}</span>
              </div>

              {/* 3. Nhân văn */}
              <div className="rounded-[20px] p-4 bg-gradient-to-b from-fuchsia-600 via-rose-600 to-pink-700 text-white flex flex-col items-center justify-center text-center shadow-md shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/40 transform hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300 cursor-pointer border border-pink-300/40">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center mb-1.5 shadow-inner">
                  <Heart className="w-5 h-5 text-white fill-white/30" />
                </div>
                <span className="text-xs sm:text-[13px] font-black tracking-normal">{isVi ? "Nhân văn" : "Humanity"}</span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-pink-100 mt-0.5 leading-tight">{isVi ? "Thấu hiểu" : "Empathy"}</span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-pink-100 leading-tight">{isVi ? "& Đồng cảm" : "& Care"}</span>
              </div>

              {/* 4. Công nghệ */}
              <div className="rounded-[20px] p-4 bg-gradient-to-b from-emerald-500 via-teal-600 to-cyan-700 text-white flex flex-col items-center justify-center text-center shadow-md shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/40 transform hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300 cursor-pointer border border-teal-300/40">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center mb-1.5 shadow-inner">
                  <Network className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs sm:text-[13px] font-black tracking-normal">{isVi ? "Công nghệ" : "Tech"}</span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-teal-100 mt-0.5 leading-tight">{isVi ? "Cải tiến &" : "Innovate &"}</span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-teal-100 leading-tight">{isVi ? "Sáng tạo" : "Creative"}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* ROW 2: TIMELINE ZICZAC (HÀNH TRÌNH SỰ NGHIỆP VỚI TIMELINE ĐỨT KHÚC) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.5, ease: "easeOut" }} 
          className="w-full glass-surface backdrop-blur-3xl rounded-[20px] border border-slate-200/60 dark:border-slate-800/60 p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col relative overflow-hidden bg-white/20 dark:bg-slate-900/20 z-10"
        >
          <div className="relative z-10 w-full">
            {/* Title Header formatted exactly like Thông điệp hợp tác */}
            <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-indigo-200/60 dark:border-indigo-800/60 mb-3">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <Rocket className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <h3 className="text-base sm:text-lg font-black text-indigo-600 dark:text-indigo-400 tracking-wide">
                  {isVi ? "Hành trình sự nghiệp" : "Career journey milestones"}
                </h3>
              </div>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 shrink-0">
                {isVi ? "8 Cột mốc (2002 - 2026)" : "8 Milestones (2002 - 2026)"}
              </span>
            </div>

            {/* Grid Timeline Container */}
            <div className="relative w-full py-4 px-1 xs:px-2" ref={gridContainerRef}>
              {/* Real 2-column Grid with Equal-Height Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch relative z-10 w-full">
                {CAREER_MILESTONES_ZICZAC.map((item, idx) => {
                  const IconComp = item.icon;

                  return (
                    <div
                      key={item.id}
                      className="flex flex-col justify-between rounded-2xl p-4.5 relative transition-all duration-300 backdrop-blur-md shadow-2xs hover:shadow-lg hover:-translate-y-1 overflow-hidden group/mcard border min-h-[220px] w-full"
                      style={{
                        borderColor: `${item.color}50`,
                        boxShadow: `0 4px 16px -2px ${item.color}18, 0 2px 6px -2px rgba(0, 0, 0, 0.04)`
                      }}
                    >
                      {/* Background Tint Layer */}
                      <div 
                        className="absolute inset-0 pointer-events-none rounded-2xl opacity-20 dark:opacity-25"
                        style={{
                          background: `linear-gradient(145deg, ${item.color}30 0%, ${item.color}10 45%, transparent 80%)`
                        }}
                      />
                      <div className="absolute inset-0 bg-white/95 dark:bg-slate-900/95 -z-10 rounded-2xl" />

                      {/* Card Content Row */}
                      <div className={cn("w-full flex items-center justify-between gap-2 pb-2 mb-2 border-b border-dashed border-slate-200/80 dark:border-slate-800/80 relative z-10 shrink-0", idx % 2 === 1 && "flex-row-reverse")}>
                        {/* Arrow Button / Compass on the left */}
                        <div 
                          className="flex items-center justify-center text-xs font-bold shrink-0 px-2 py-1 rounded-md bg-white/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs relative transition-all duration-300 group-hover/mcard:scale-110 group-hover/mcard:shadow-md"
                          style={{ color: item.color }}
                        >
                          <span 
                            className="absolute -inset-0.5 rounded-md opacity-0 group-hover/mcard:opacity-70 blur-xs transition-opacity duration-300 -z-10 animate-pulse"
                            style={{ backgroundColor: item.color }}
                          />
                          {item.yearNumber === "2026" ? (
                            <Compass className="w-4 h-4 animate-spin-slow text-rose-500" />
                          ) : (
                            <ArrowRight className="w-3.5 h-3.5" />
                          )}
                        </div>

                        {/* Year Tag & Number on the right */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span 
                            className="text-[10px] font-black px-1.5 py-0.5 rounded-md"
                            style={{ color: item.color, backgroundColor: `${item.color}12` }}
                          >
                            #{String(idx + 1).padStart(2, '0')}
                          </span>
                          <span 
                            className="px-2.5 py-0.5 rounded-full text-white text-[11px] font-black shadow-2xs tracking-wide uppercase"
                            style={{ backgroundColor: item.color }}
                          >
                            {isVi ? item.yearLabelVi : item.yearLabelEn}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 mb-2 relative z-10 shrink-0">
                        <div 
                          className="w-9 h-9 rounded-full flex items-center justify-center border bg-white dark:bg-slate-950 p-1 shadow-2xs shrink-0 transition-transform duration-300 group-hover/mcard:scale-110"
                          style={{ borderColor: item.color }}
                        >
                          <img src={item.logo} alt={item.company} className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex flex-col flex-1 min-w-0 text-left">
                          <h4 className="text-sm sm:text-[14.5px] font-black text-slate-900 dark:text-white tracking-tight leading-snug line-clamp-1">
                            {item.company}
                          </h4>
                          <div 
                            className="text-[11px] font-extrabold tracking-wide mt-0.5 line-clamp-1"
                            style={{ color: item.color }}
                          >
                            {isVi ? `Vị trí: ${item.roleVi}` : `Position: ${item.roleEn}`}
                          </div>
                        </div>
                      </div>

                      <div className="card-body text-xs text-slate-600 dark:text-slate-300 leading-[1.65] flex-1 flex flex-col justify-between text-left relative z-10">
                        <div className={cn("relative overflow-hidden transition-all duration-300 mb-3", 
                          item.id === "card-2013" && !expandedCard[item.id] && "max-h-[140px] line-clamp-[6]"
                        )}>
                          <p className="font-normal text-[11.5px] leading-relaxed tracking-wide text-left">
                            {renderFormattedText(isVi ? item.descVi : item.descEn)}
                          </p>
                          {item.id === "card-2013" && !expandedCard[item.id] && (
                            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white/95 dark:from-slate-900/95 to-transparent pointer-events-none" />
                          )}
                        </div>

                        {item.id === "card-2013" && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              try { playUiSound("click"); } catch {}
                              setExpandedCard(prev => ({ ...prev, [item.id]: !prev[item.id] }));
                            }}
                            className="text-[11px] font-bold text-indigo-600 dark:text-cyan-400 hover:underline mb-3 self-start cursor-pointer inline-flex items-center gap-1"
                          >
                            {expandedCard[item.id] ? (
                              <>
                                <ChevronUp className="w-3.5 h-3.5" />
                                {isVi ? "Thu gọn" : "Show less"}
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-3.5 h-3.5" />
                                {isVi ? "Xem thêm" : "Read more"}
                              </>
                            )}
                          </button>
                        )}

                        <div 
                          className="highlight-box p-2 rounded-r-lg border-l-[3px] text-[11px] font-medium leading-[1.5] bg-slate-100/90 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 text-left mt-auto"
                          style={{ borderLeftColor: item.color }}
                        >
                          {isVi ? item.highlightVi : item.highlightEn}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* ROW 3: 2-COLUMN BENTO GRID (TECH SOLUTIONS & COOPERATION MESSAGE) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.5, ease: "easeOut" }} 
          className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full relative z-10"
        >
          {/* CARD 1: GIẢI PHÁP CÔNG NGHỆ */}
          <div className="glass-surface backdrop-blur-2xl rounded-[20px] border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-7 shadow-md hover:shadow-xl hover:border-blue-400/60 dark:hover:border-blue-400/60 transition-all duration-300 flex flex-col justify-between group/tech">
            <div>
              {/* Header formatted exactly like Thông điệp hợp tác */}
              <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-blue-200/60 dark:border-blue-800/60 mb-3">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <h3 className="text-base sm:text-lg font-black text-blue-600 dark:text-blue-400 tracking-wide">
                    {isVi ? "Giải pháp công nghệ" : "Technology solutions"}
                  </h3>
                </div>
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60 shrink-0">
                  AI & CRM 360°
                </span>
              </div>

              {/* Enhanced Description with Bold Highlighted Text */}
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-[1.75] font-normal text-left mb-4">
                {isVi ? (
                  <>
                    <strong className="font-extrabold text-slate-900 dark:text-white">Tối ưu hóa quy trình toàn diện</strong> từ đầu đến cuối, kết hợp <strong className="font-extrabold text-blue-600 dark:text-blue-400">Tri tuệ nhân tạo (AI)</strong> và hệ sinh thái <strong className="font-extrabold text-blue-600 dark:text-blue-400">CRM Omni–Channel 360°</strong> nhằm mang lại trải nghiệm khách hàng vượt trội, tự động hóa và nâng cao hiệu suất chăm sóc khách hàng bền vững.
                  </>
                ) : (
                  <>
                    <strong className="font-extrabold text-slate-900 dark:text-white">End-to-end workflow optimization</strong>, seamlessly combining <strong className="font-extrabold text-blue-600 dark:text-blue-400">Artificial Intelligence (AI)</strong> and <strong className="font-extrabold text-blue-600 dark:text-blue-400">Omni-Channel CRM 360°</strong> ecosystems to deliver superior customer experiences, smart automation, and sustainable service performance.
                  </>
                )}
              </p>

              {/* Tech Solution Pillars Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                <div className="p-3 rounded-2xl bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/70 flex items-center gap-3 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Layers className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h5 className="text-[12px] font-black text-slate-900 dark:text-slate-100">CRM Omni 360°</h5>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                      {isVi ? "Hợp nhất kênh tương tác" : "Unified touchpoints"}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/70 flex items-center gap-3 hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <LayoutDashboard className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h5 className="text-[12px] font-black text-slate-900 dark:text-slate-100">Dashboard BI</h5>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                      {isVi ? "Báo cáo thời gian thực" : "Real-time analytics"}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/70 flex items-center gap-3 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-700 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Bot className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h5 className="text-[12px] font-black text-slate-900 dark:text-slate-100">AI Chatbot</h5>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                      {isVi ? "Tự động hóa 24/7" : "24/7 Automation"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: TÂM THƯ TRI ÂN */}
          <div className="glass-surface backdrop-blur-2xl rounded-[20px] border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-7 shadow-md hover:shadow-xl hover:border-emerald-400/60 dark:hover:border-emerald-400/60 transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Header formatted exactly like Thông điệp hợp tác */}
              <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-emerald-200/60 dark:border-emerald-800/60 mb-3">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <h3 className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400 tracking-wide">
                    {isVi ? "Tâm thư tri ân" : "Gratitude statement"}
                  </h3>
                </div>
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 shrink-0">
                  {isVi ? "Tri ân" : "Gratitude"}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-[1.75] font-normal text-left mb-4">
                {isVi 
                  ? "Tôi mong muốn được đồng hành cùng Quý Doanh nghiệp để kiến tạo giá trị, lan tỏa sự hài lòng và cùng nhau phát triển bền vững. Với kinh nghiệm, nhiệt huyết và tinh thần thấu hiểu sâu sắc, tôi tin tưởng vào những thành công tốt đẹp sắp tới."
                  : "I look forward to partnering with your organization to create enduring value, promote customer satisfaction, and achieve sustainable growth together. With experience, passion, and deep empathy, I believe in our upcoming success."}
              </p>
            </div>

            {/* Bottom Section: Signature on Right */}
            <div className="flex items-center justify-end pt-2">
              {/* Right Signature Block */}
              <div className="flex flex-col items-center sm:items-end text-center sm:text-right shrink-0 min-w-[135px] pl-1">
                <SignatureSvg />
                <h4 className="text-xs sm:text-[13px] font-black text-slate-900 dark:text-slate-100 mt-0.5">
                  Nguyễn Hùng Thái
                </h4>
                <span className="text-[10.5px] font-bold text-slate-500 dark:text-slate-400">
                  {isVi ? "Trưởng phòng Chăm sóc Khách hàng" : "Head of Customer Support"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* ROW 4: GIÁ TRỊ CỐT LÕI CHÚNG TÔI THEO ĐUỔI (FULL WIDTH BENTO CARD) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.5, ease: "easeOut" }} 
          id="card-core-values-pursued"
          className="w-full glass-surface backdrop-blur-2xl rounded-[20px] border border-slate-200/80 dark:border-slate-800/80 p-5 sm:p-7 shadow-md hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-all duration-300 flex flex-col items-start w-full group/values z-10"
        >
          {/* Tiêu đề Khối formatted exactly like Thông điệp hợp tác */}
          <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-indigo-200/60 dark:border-indigo-800/60 mb-3">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <h3 className="text-base sm:text-lg font-black text-indigo-600 dark:text-indigo-400 tracking-wide">
                {isVi ? "Giá trị cốt lõi" : "Core values pursued"}
              </h3>
            </div>
            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 shrink-0">
              {isVi ? "4 Giá trị" : "4 Values"}
            </span>
          </div>

          {/* 4 Cột Giá Trị Cốt Lõi với đường vạch phân cách mờ ở giữa */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80 dark:divide-slate-800">
            {/* 1. Tận tâm */}
            <div className="flex flex-col items-center text-center px-3 sm:px-4 py-3 sm:py-0 group hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300 cursor-pointer">
              <div className="w-14 h-14 flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110">
                <DedicatedHeartIcon className="w-12 h-12" />
              </div>
              <h4 className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 tracking-normal mb-1">
                {isVi ? "Tận tâm" : "Dedication"}
              </h4>
              <p className="text-xs sm:text-[12.5px] text-slate-700 dark:text-slate-300 font-normal leading-[1.65] max-w-[30ch]">
                {isVi ? "Đặt khách hàng làm trọng tâm mọi quyết định và hành động." : "Put customers at the center of every decision and action."}
              </p>
            </div>

            {/* 2. Chuyên nghiệp */}
            <div className="flex flex-col items-center text-center px-3 sm:px-4 py-3 sm:py-0 group hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300 cursor-pointer">
              <div className="w-14 h-14 flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110">
                <TargetProfessionalIcon className="w-12 h-12" />
              </div>
              <h4 className="text-sm font-extrabold text-purple-600 dark:text-purple-400 tracking-normal mb-1">
                {isVi ? "Chuyên nghiệp" : "Professionalism"}
              </h4>
              <p className="text-xs sm:text-[12.5px] text-slate-700 dark:text-slate-300 font-normal leading-[1.65] max-w-[30ch]">
                {isVi ? "Đặt chuẩn mực làm nền tảng mọi quy trình và hoạt động." : "Set standards as the foundation for every process and operation."}
              </p>
            </div>

            {/* 3. Đổi mới */}
            <div className="flex flex-col items-center text-center px-3 sm:px-4 py-3 sm:py-0 group hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300 cursor-pointer">
              <div className="w-14 h-14 flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110">
                <InnovationBulbIcon className="w-12 h-12" />
              </div>
              <h4 className="text-sm font-extrabold text-amber-500 dark:text-amber-400 tracking-normal mb-1">
                {isVi ? "Đổi mới" : "Innovation"}
              </h4>
              <p className="text-xs sm:text-[12.5px] text-slate-700 dark:text-slate-300 font-normal leading-[1.65] max-w-[30ch]">
                {isVi ? "Đặt công nghệ làm động lực mọi sáng tạo và cải tiến." : "Drive technology as the catalyst for all creativity and improvement."}
              </p>
            </div>

            {/* 4. Đồng hành */}
            <div className="flex flex-col items-center text-center px-3 sm:px-4 py-3 sm:py-0 group hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300 cursor-pointer">
              <div className="w-14 h-14 flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110">
                <PartnershipHandshakeIcon className="w-12 h-12" />
              </div>
              <h4 className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 tracking-normal mb-1">
                {isVi ? "Đồng hành" : "Partnership"}
              </h4>
              <p className="text-xs sm:text-[12.5px] text-slate-700 dark:text-slate-300 font-normal leading-[1.65] max-w-[30ch]">
                {isVi ? "Đặt tin tưởng làm nền tảng mọi hợp tác và phát triển." : "Build trust as the foundation for all collaboration and growth."}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* ROW 4.5: BANNER CÂU NÓI ẤN TƯỢNG VÀ ĐẶC SẮC (HERO QUOTE BANNER) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="w-full relative group/banner overflow-hidden rounded-[20px] z-10"
        >
          {/* Lớp viền neon quang học phát sáng ngoài (Neon Glow Aura) */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 via-indigo-500/30 to-fuchsia-500/30 rounded-[20px] blur-xl opacity-60 group-hover/banner:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* Khối Banner Kính Mờ Glass UI Neon */}
          <div className="relative z-10 w-full rounded-[20px] bg-gradient-to-br from-slate-900/95 via-indigo-950/90 to-slate-950/95 dark:from-[#090D16]/95 dark:via-[#0B0F19]/90 dark:to-[#090D16]/95 text-white p-6 sm:p-8 md:p-9 border border-cyan-400/40 dark:border-cyan-400/50 shadow-[0_16px_48px_rgba(0,0,0,0.5),0_0_30px_rgba(0,245,255,0.18),inset_0_1.5px_2px_rgba(255,255,255,0.22)] backdrop-blur-2xl flex flex-col items-center justify-center text-center overflow-hidden">
            
            {/* Ambient Radial Lighting Blobs */}
            <div className="absolute -top-16 -left-16 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-44 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Subtle Top Specular Light Line */}
            <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

            {/* Header Badge */}
            <div className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-bold tracking-wide backdrop-blur-md mb-4 shadow-sm shadow-cyan-500/20">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
              <span>{isVi ? "Tôn chỉ phụng sự" : "Service Philosophy"}</span>
            </div>

            {/* Giant Glowing Quote Container */}
            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center px-2 sm:px-6">
              {/* Top Quote Icon */}
              <div className="mb-2 text-cyan-400/60 dark:text-cyan-400/70">
                <Quote className="w-9 h-9 sm:w-11 sm:h-11 transform scale-x-[-1] drop-shadow-[0_0_12px_rgba(0,245,255,0.4)]" />
              </div>

              {/* Main Vietnamese Quote with Shimmer Gradient */}
              <blockquote className="text-base sm:text-xl md:text-2xl lg:text-[26px] font-black tracking-tight leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-indigo-100 dark:from-white dark:via-cyan-200 dark:to-teal-100 drop-shadow-sm font-sans mb-6 select-none">
                “{isVi 
                  ? "Thành công không chỉ đến từ năng lực, mà từ sự chân thành và tinh thần phụng sự." 
                  : "Success comes not only from competence, but from sincerity and a spirit of service."}”
              </blockquote>

              {/* Bottom Author Attribution Badge */}
              <div className="flex items-center gap-3 pt-2 border-t border-cyan-500/20 w-full justify-center max-w-md">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1.5px] shadow-sm shadow-cyan-500/30">
                  <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-cyan-300 text-xs font-black">
                    TH
                  </div>
                </div>
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-black text-white tracking-wide">
                      Nguyễn Hùng Thái
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/20" />
                  </div>
                  <span className="text-[10.5px] font-medium text-slate-400 dark:text-slate-400">
                    {isVi ? "Trưởng phòng Chăm sóc Khách hàng • Lãnh đạo CX" : "Head of Customer Support • CX Leader"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
