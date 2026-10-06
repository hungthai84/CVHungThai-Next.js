import React from "react";
import { 
  Signal, 
  Headset, 
  Tv, 
  Gamepad2, 
  ShoppingBag, 
  ShieldCheck, 
  CreditCard, 
  Heart,
  Lightbulb,
  BarChart2,
  Users,
  Target,
  ShoppingCart,
  Sparkles
} from "lucide-react";

export interface CareerMilestoneItem {
  id: string;
  yearNumber: string;
  yearLabelVi: string;
  yearLabelEn: string;
  yearBadgeGradient: string;
  company: string;
  titleColor?: string;
  roleVi: string;
  roleEn: string;
  roleColor?: string;
  color: string;
  borderColor: string;
  logo: string;
  iconName: "Signal" | "Headset" | "Tv" | "Gamepad2" | "ShoppingBag" | "ShieldCheck" | "Heart" | "CreditCard";
  roleIconName: "Signal" | "Users" | "Briefcase" | "Gamepad2" | "ShoppingBag" | "ShieldCheck" | "Heart" | "CreditCard";
  descVi: string;
  descEn: string;
  highlightVi: string;
  highlightEn: string;
  highlightIconName?: "Lightbulb" | "BarChart2" | "Users" | "Target" | "ShoppingCart" | "Heart" | "Sparkles";
  showMoreLink?: boolean;
}

export const CAREER_MILESTONES_DATA: CareerMilestoneItem[] = [
  {
    id: "card-2002",
    yearNumber: "2002",
    yearLabelVi: "NĂM 2002",
    yearLabelEn: "YEAR 2002",
    yearBadgeGradient: "bg-gradient-to-r from-blue-600 to-sky-500",
    company: "MobiFone",
    titleColor: "#0284c7",
    roleVi: "Nhân viên Vận hành Viễn thông",
    roleEn: "Telecom Operations Specialist",
    roleColor: "#0284c7",
    color: "#0284c7",
    borderColor: "border-sky-300 dark:border-sky-700/80",
    logo: "https://i.ibb.co/hxHm9TsZ/Mobifone.png",
    iconName: "Signal",
    roleIconName: "Signal",
    descVi: "Tôi bắt đầu sự nghiệp tại **MobiFone** , nơi tôi được đào tạo bài bản về **dịch vụ khách hàng** , quản lý tổng đài, xử lý sự cố và xây dựng quy trình phục vụ theo **tiêu chuẩn ngành viễn thông** . Đây là nền tảng giúp tôi hình thành tư duy **lấy khách hàng làm trung tâm** và hiểu rõ tầm quan trọng của quy trình trong vận hành dịch vụ.",
    descEn: "Started career at **MobiFone**, systematically trained in **customer care**, incident handling, and telecom workflow standardization. Built a solid **customer-centric foundation** and rigorous appreciation for operational standards.",
    highlightVi: "Nền tảng hình thành tư duy lấy khách hàng làm trọng tâm.",
    highlightEn: "Foundation that shaped a customer-centric mindset.",
    highlightIconName: "Lightbulb"
  },
  {
    id: "card-2007",
    yearNumber: "2007",
    yearLabelVi: "NĂM 2007",
    yearLabelEn: "YEAR 2007",
    yearBadgeGradient: "bg-gradient-to-r from-purple-600 to-indigo-600",
    company: "Viễn Liên V247",
    titleColor: "#7c3aed",
    roleVi: "Giám sát CSKH & Vận hành",
    roleEn: "Customer Service & Operations Supervisor",
    roleColor: "#7c3aed",
    color: "#7c3aed",
    borderColor: "border-purple-300 dark:border-purple-700/80",
    logo: "https://i.ibb.co/QvtbdnfP/V247.png",
    iconName: "Headset",
    roleIconName: "Users",
    descVi: "Gia nhập **Viễn Liên V247** , tôi tiếp tục phát triển năng lực **quản lý đội ngũ** , giám sát chất lượng dịch vụ và tối ưu hiệu quả vận hành của trung tâm chăm sóc khách hàng. Giai đoạn này giúp tôi tích lũy kinh nghiệm quản lý hoạt động với **quy mô lớn** và xây dựng các **chỉ số đánh giá chất lượng** dịch vụ.",
    descEn: "At **Vien Lien V247**, developed team leadership, **quality supervision**, and operational efficiency for **large-scale contact centers**, establishing comprehensive **KPI frameworks**.",
    highlightVi: "Xây dựng các chỉ số đánh giá KPI vận hành quy mô lớn.",
    highlightEn: "Building comprehensive KPI evaluation frameworks.",
    highlightIconName: "BarChart2"
  },
  {
    id: "card-2011",
    yearNumber: "2011",
    yearLabelVi: "NĂM 2011",
    yearLabelEn: "YEAR 2011",
    yearBadgeGradient: "bg-gradient-to-r from-emerald-600 to-teal-500",
    company: "LBC – HTV",
    titleColor: "#059669",
    roleVi: "Trưởng phòng CSKH",
    roleEn: "Head of Customer Service",
    roleColor: "#059669",
    color: "#059669",
    borderColor: "border-emerald-300 dark:border-emerald-700/80",
    logo: "https://i.ibb.co/R4YXWyzF/LBC.png",
    iconName: "Tv",
    roleIconName: "Briefcase",
    descVi: "Đây là dấu mốc quan trọng khi tôi lần đầu đảm nhiệm vị trí **Trưởng phòng Chăm sóc Khách hàng** . Từ một nhà quản lý vận hành, tôi chuyển mình trở thành một **nhà quản trị toàn diện** . Tôi trực tiếp điều hành hoạt động của phòng ban, xây dựng và chuẩn hóa quy trình, phát triển đội ngũ, thiết lập **hệ thống KPI** , đồng thời phối hợp với nhiều đơn vị nhằm nâng cao chất lượng dịch vụ và hiệu quả vận hành. Chính giai đoạn này đã giúp tôi hình thành tư duy **quản trị hệ thống** và **phát triển con người** song song với mục tiêu kinh doanh.",
    descEn: "First assumed the role of **Head of Customer Service**, transitioning into a **comprehensive director**. Directly managed departmental operations, standardized workflows, fostered leadership pipelines, and established **KPI metrics** aligned with business targets.",
    highlightVi: "Tư duy quản trị hệ thống và phát triển con người.",
    highlightEn: "Systems governance and human talent development.",
    highlightIconName: "Users"
  },
  {
    id: "card-2013",
    yearNumber: "2013",
    yearLabelVi: "NĂM 2013",
    yearLabelEn: "YEAR 2013",
    yearBadgeGradient: "bg-gradient-to-r from-rose-600 to-red-500",
    company: "Garena",
    titleColor: "#e11d48",
    roleVi: "Trưởng phòng Vận hành CSKH",
    roleEn: "Customer Service Operations Manager",
    roleColor: "#e11d48",
    color: "#e11d48",
    borderColor: "border-rose-300 dark:border-rose-700/80",
    logo: "https://i.ibb.co/h1Md65yV/Garena.png",
    iconName: "Gamepad2",
    roleIconName: "Gamepad2",
    descVi: "Gia nhập **Garena** , tôi quản lý hoạt động chăm sóc khách hàng trong lĩnh vực **game trực tuyến** (Liên Minh Huyền Thoại, Liên Quân Mobile, AirPay, Gcafe). Trực tiếp quản lý **120 nhân sự** , xây dựng cơ cấu tổ chức, chuẩn hóa quy trình vận hành và đào tạo nguồn nhân lực kế thừa.",
    descEn: "Joined **Garena**, directing customer care for high-speed **online gaming** (League of Legends, Arena of Valor, AirPay, Gcafe). Led **120 personnel**, systematized operations, and trained successor teams.",
    highlightVi: "Triển khai: Xây dựng hệ thống vững chắc trước khi mở rộng.",
    highlightEn: "Execution: Build solid systems before scaling.",
    highlightIconName: "Target",
    showMoreLink: true
  },
  {
    id: "card-2013-shopee",
    yearNumber: "2013",
    yearLabelVi: "NĂM 2013",
    yearLabelEn: "YEAR 2013",
    yearBadgeGradient: "bg-gradient-to-r from-orange-500 to-amber-500",
    company: "Shopee",
    titleColor: "#ea580c",
    roleVi: "Quản lý Vận hành CSKH E-Commerce",
    roleEn: "E-Commerce Customer Service Operations Manager",
    roleColor: "#ea580c",
    color: "#ea580c",
    borderColor: "border-orange-300 dark:border-orange-700/80",
    logo: "https://i.ibb.co/BSVS4xf/Shopee.png",
    iconName: "ShoppingBag",
    roleIconName: "ShoppingBag",
    descVi: "Tham gia vào giai đoạn khởi tạo và phát triển ban đầu của **Shopee** , tiếp cận tư duy **quản trị thương mại điện tử hiện đại** , từ hành trình khách hàng, trải nghiệm đa kênh (Omnichannel), vận hành dịch vụ quy mô lớn đến ứng dụng dữ liệu trong quản trị chất lượng và tối ưu hiệu quả hoạt động.",
    descEn: "Participated in the initial formation and growth stages of **Shopee**, embracing modern **e-commerce omnichannel governance**, large-scale service operations, and data-driven quality control.",
    highlightVi: "Tư duy quản trị thương mại điện tử đa kênh hiện đại.",
    highlightEn: "Modern omnichannel e-commerce management mindset.",
    highlightIconName: "ShoppingCart"
  },
  {
    id: "card-2016",
    yearNumber: "2016",
    yearLabelVi: "NĂM 2016",
    yearLabelEn: "YEAR 2016",
    yearBadgeGradient: "bg-gradient-to-r from-pink-600 to-rose-500",
    company: "Prudential",
    titleColor: "#db2777",
    roleVi: "Trưởng phòng Trải nghiệm Khách hàng",
    roleEn: "Head of Customer Experience",
    roleColor: "#db2777",
    color: "#db2777",
    borderColor: "border-pink-300 dark:border-pink-700/80",
    logo: "https://i.ibb.co/XfpQphWF/Prudential.png",
    iconName: "ShieldCheck",
    roleIconName: "ShieldCheck",
    descVi: "Tại **Prudential** , tôi có cơ hội làm việc trong lĩnh vực **bảo hiểm** – một ngành dịch vụ đòi hỏi tính chính xác, minh bạch và mức độ tin cậy rất cao. Thời gian này giúp tôi hiểu sâu hơn về **quản trị trải nghiệm khách hàng (CX)** , quản lý chất lượng dịch vụ và xây dựng niềm tin bền vững thông qua quy trình chuyên nghiệp và sự **đồng cảm** trong từng điểm chạm với khách hàng.",
    descEn: "At **Prudential**, specialized in life **insurance CX**, requiring absolute precision, transparency, and deep empathy to build long-term sustainable **brand trust** across every customer touchpoint.",
    highlightVi: "Quản trị trải nghiệm khách hàng (CX) và xây dựng niềm tin.",
    highlightEn: "Customer experience (CX) governance & brand trust.",
    highlightIconName: "Heart"
  },
  {
    id: "card-2018",
    yearNumber: "2018",
    yearLabelVi: "NĂM 2018",
    yearLabelEn: "YEAR 2018",
    yearBadgeGradient: "bg-gradient-to-r from-pink-500 to-fuchsia-600",
    company: "MoMo FinTech",
    titleColor: "#db2777",
    roleVi: "Trưởng phòng Dịch vụ Khách hàng",
    roleEn: "Customer Service Manager",
    roleColor: "#db2777",
    color: "#db2777",
    borderColor: "border-pink-300 dark:border-pink-700/80",
    logo: "https://i.ibb.co/k2QtrgTw/Momo.png",
    iconName: "Heart",
    roleIconName: "Heart",
    descVi: "Gia nhập **MoMo** , tôi tiếp tục mở rộng kinh nghiệm trong lĩnh vực **tài chính số** . Với tập trung **tối ưu quy trình hỗ trợ** , nâng cao hiệu quả vận hành, ứng dụng công nghệ vào quản trị dịch vụ và cải thiện **trải nghiệm khách hàng** trên nền tảng số.",
    descEn: "At **MoMo**, expanded digital finance expertise with a focus on **support process optimization**, operational efficiency, and tech-enabled CX enhancement across digital ecosystems.",
    highlightVi: "Tối ưu quy trình vận hành và cải thiện trải nghiệm số.",
    highlightEn: "Optimizing operational workflows and digital experiences.",
    highlightIconName: "BarChart2"
  },
  {
    id: "card-2023",
    yearNumber: "2023",
    yearLabelVi: "NĂM 2023",
    yearLabelEn: "YEAR 2023",
    yearBadgeGradient: "bg-gradient-to-r from-amber-500 to-yellow-600",
    company: "Finviet",
    titleColor: "#059669",
    roleVi: "Trưởng phòng Dịch vụ Khách hàng",
    roleEn: "Customer Service Manager",
    roleColor: "#d97706",
    color: "#d97706",
    borderColor: "border-amber-300 dark:border-amber-700/80",
    logo: "https://i.ibb.co/7NtSSz4d/Finviet.png",
    iconName: "CreditCard",
    roleIconName: "CreditCard",
    descVi: "Tại **Finviet** , tôi tiếp tục phát triển chuyên môn trong lĩnh vực **tài chính** , mở rộng hoạt động dịch vụ và các quy trình hỗ trợ, nâng cao bạch và sự tin cậy. Giai đoạn này giúp tôi hoàn thiện hơn tư duy xây dựng **hệ thống dịch vụ khách hàng hiện đại** , kết hợp hài hòa giữa **Quy trình - Công nghệ - Trải nghiệm** người dùng.",
    descEn: "At **Finviet**, honed financial service operations, perfecting the holistic tripartite synergy between **Process - Technology - Customer Experience**.",
    highlightVi: "Kết hợp hài hòa giữa Quy trình, Công nghệ và Trải nghiệm.",
    highlightEn: "Seamless harmony between Process, Technology, and Experience.",
    highlightIconName: "Sparkles"
  }
];

export const CORE_VALUES_DATA = [
  {
    number: "01",
    idName: "DEDICATION",
    titleVi: "Tận tâm",
    titleEn: "Dedication",
    descVi: "Đặt khách hàng làm trọng tâm mọi quyết định và hành động.",
    descEn: "Put customers at the center of every decision and action.",
    colorTheme: {
      primary: "#a855f7",
      bgGradient: "from-purple-50/75 to-purple-100/45 dark:from-[#1b152d]/40 dark:to-[#120e20]/30",
      border: "border-purple-200/80 dark:border-purple-900/50 hover:border-purple-400 dark:hover:border-purple-600",
      iconBg: "bg-purple-500/15 dark:bg-purple-500/20 border-purple-500/35 text-purple-600 dark:text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.25)]",
      titleText: "text-purple-600 dark:text-purple-400",
      numberText: "text-purple-500/15 dark:text-purple-400/10",
      tagText: "text-purple-500/60 dark:text-purple-400/50"
    }
  },
  {
    number: "02",
    idName: "PROFESSIONALISM",
    titleVi: "Chuyên nghiệp",
    titleEn: "Professionalism",
    descVi: "Đặt chuẩn mực làm nền tảng mọi quy trình và hoạt động.",
    descEn: "Set standards as the foundation for every process and operation.",
    colorTheme: {
      primary: "#3b82f6",
      bgGradient: "from-blue-50/75 to-blue-100/45 dark:from-[#131d35]/40 dark:to-[#0d1527]/30",
      border: "border-blue-200/80 dark:border-blue-900/50 hover:border-blue-400 dark:hover:border-blue-600",
      iconBg: "bg-blue-500/15 dark:bg-blue-500/20 border-blue-500/35 text-blue-600 dark:text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.25)]",
      titleText: "text-blue-600 dark:text-blue-400",
      numberText: "text-blue-500/15 dark:text-blue-400/10",
      tagText: "text-blue-500/60 dark:text-blue-400/50"
    }
  },
  {
    number: "03",
    idName: "INNOVATION",
    titleVi: "Đổi mới",
    titleEn: "Innovation",
    descVi: "Đặt công nghệ làm động lực mọi sáng tạo và cải tiến.",
    descEn: "Drive technology as the catalyst for all creativity and improvement.",
    colorTheme: {
      primary: "#f97316",
      bgGradient: "from-orange-50/75 to-orange-100/45 dark:from-[#2a1b14]/40 dark:to-[#1e120e]/30",
      border: "border-orange-200/80 dark:border-orange-900/50 hover:border-orange-400 dark:hover:border-orange-600",
      iconBg: "bg-orange-500/15 dark:bg-orange-500/20 border-orange-500/35 text-orange-600 dark:text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.25)]",
      titleText: "text-orange-600 dark:text-orange-400",
      numberText: "text-orange-500/15 dark:text-orange-400/10",
      tagText: "text-orange-500/60 dark:text-orange-400/50"
    }
  },
  {
    number: "04",
    idName: "PARTNERSHIP",
    titleVi: "Đồng hành",
    titleEn: "Partnership",
    descVi: "Đặt tin tưởng làm nền tảng mọi hợp tác và phát triển.",
    descEn: "Build trust as the foundation for all collaboration and growth.",
    colorTheme: {
      primary: "#10b981",
      bgGradient: "from-emerald-50/75 to-emerald-100/45 dark:from-[#0f2421]/40 dark:to-[#0a1816]/30",
      border: "border-emerald-200/80 dark:border-emerald-900/50 hover:border-emerald-400 dark:hover:border-emerald-600",
      iconBg: "bg-emerald-500/15 dark:bg-emerald-500/20 border-emerald-500/35 text-emerald-600 dark:text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]",
      titleText: "text-emerald-600 dark:text-emerald-400",
      numberText: "text-emerald-500/15 dark:text-emerald-400/10",
      tagText: "text-emerald-500/60 dark:text-emerald-400/50"
    }
  }
];

export const OPERATIONAL_PRINCIPLES_DATA = [
  {
    id: "process",
    titleVi: "Quy trình tạo nền tảng.",
    titleEn: "Process builds the foundation.",
    descVi: "Định hình chuẩn mực, tối ưu hóa hiệu suất vận hành.",
    descEn: "Defining standards, optimizing operational efficiency.",
    color: "#2563eb",
    bgClass: "bg-blue-100 dark:bg-blue-900/50 text-[#2563eb] dark:text-cyan-400",
    borderClass: "border-blue-100/80 dark:border-blue-950/40"
  },
  {
    id: "people",
    titleVi: "Con người tạo giá trị.",
    titleEn: "People create value.",
    descVi: "Đào tạo đội ngũ lắng nghe, thấu cảm sâu sắc.",
    descEn: "Training teams to listen and deeply empathize.",
    color: "#9333ea",
    bgClass: "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400",
    borderClass: "border-purple-100/80 dark:border-purple-950/40"
  },
  {
    id: "tech",
    titleVi: "Công nghệ tạo đòn bẩy.",
    titleEn: "Technology provides leverage.",
    descVi: "Tích hợp AI và tự động hóa bức phá năng suất.",
    descEn: "Integrating AI and automation for peak productivity.",
    color: "#059669",
    bgClass: "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400",
    borderClass: "border-emerald-100/80 dark:border-emerald-950/40"
  }
];
