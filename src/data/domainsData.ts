export interface DomainItem {
  id: string;
  code: string;
  titleVi: string;
  titleEn: string;
  experienceVi: string;
  experienceEn: string;
  orientationVi: string;
  orientationEn: string;
  descVi: string;
  descEn: string;
  highlightsVi: string[];
  highlightsEn: string[];
  roleVi: string;
  roleEn: string;
  teamSizeVi: string;
  teamSizeEn: string;
  toolsVi: string;
  toolsEn: string;
  partnersVi: string;
  partnersEn: string;
  iconName: "Smartphone" | "ShoppingCart" | "ShieldCheck" | "Gamepad2" | "Wallet" | "Layers";
  colorTheme: {
    primary: string;
    text: string;
    border: string;
    bgGradient: string;
    iconBg: string;
    badgeBg: string;
    badgeText: string;
    glow: string;
  };
  logos: {
    name: string;
    src: string;
    alt: string;
  }[];
}

export const DOMAINS_DATA: DomainItem[] = [
  // 6.1. Viễn thông di động
  {
    id: "01",
    code: "6.1",
    titleVi: "Viễn thông di động",
    titleEn: "Mobile Telecom",
    experienceVi: "10+ Năm kinh nghiệm",
    experienceEn: "10+ Years Experience",
    orientationVi: "Nền tảng vận hành & Chăm sóc khách hàng quy mô lớn tiêu chuẩn tập đoàn",
    orientationEn: "Large-scale operation & corporate standard customer care platform",
    descVi: "Hơn 10 năm kinh nghiệm trong ngành viễn thông, từ mạng di động đến dịch vụ gọi quốc tế, xây dựng nền tảng vững chắc về vận hành và Chăm Sóc Khách Hàng quy mô lớn.",
    descEn: "Over 10 years of experience in telecom, from mobile networks to international voice services, building a solid foundation for large-scale operations and Customer Care.",
    highlightsVi: [
      "Quản lý & duy trì chỉ số SLA tổng đài luôn đạt trên 98%",
      "Chuẩn hóa 100% kịch bản tư vấn và xử lý khiếu nại cước dịch vụ",
      "Xây dựng đội ngũ tư vấn viên chuyên nghiệp có tỷ lệ nghỉ việc < 3%"
    ],
    highlightsEn: [
      "Maintained Call Center SLA index consistently above 98%",
      "Standardized 100% of consultation scripts & billing complaint workflows",
      "Built a professional agent team with attrition rate < 3%"
    ],
    roleVi: "Trưởng phòng CSKH / Quản lý Vận hành Tổng đài",
    roleEn: "Head of Customer Service / Call Center Operations Manager",
    teamSizeVi: "50 - 130+ Nhân sự",
    teamSizeEn: "50 - 130+ Staff",
    toolsVi: "Avaya CallCenter, AICC System, SOP Matrix, CRM Telecom",
    toolsEn: "Avaya CallCenter, AICC System, SOP Matrix, CRM Telecom",
    partnersVi: "MobiFone · V247 · LBC · HTVC",
    partnersEn: "MobiFone · V247 · LBC · HTVC",
    iconName: "Smartphone",
    colorTheme: {
      primary: "emerald",
      text: "text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-300/80 dark:border-emerald-500/30 hover:border-emerald-500/60",
      bgGradient: "bg-gradient-to-br from-emerald-50/80 via-white/70 to-teal-50/50 dark:from-emerald-950/40 dark:via-slate-900/80 dark:to-teal-950/30",
      iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      badgeBg: "bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/20",
      badgeText: "text-emerald-700 dark:text-emerald-300",
      glow: "rgba(16,185,129,0.25)"
    },
    logos: [
      { name: "MobiFone", src: "https://i.ibb.co/hxHm9TsZ/Mobifone.png", alt: "Mobifone" },
      { name: "V247", src: "https://i.ibb.co/QvtbdnfP/V247.png", alt: "V247" },
      { name: "LBC", src: "https://i.ibb.co/R4YXWyzF/LBC.png", alt: "LBC" },
      { name: "HTVC", src: "https://i.ibb.co/1fNw0hBq/HTVC.png", alt: "HTVC" }
    ]
  },
  // 6.2. Thương mại điện tử
  {
    id: "02",
    code: "6.2",
    titleVi: "Thương mại điện tử",
    titleEn: "E-Commerce",
    experienceVi: "6+ Năm kinh nghiệm",
    experienceEn: "6+ Years Experience",
    orientationVi: "Xử lý hàng triệu giao dịch & Chăm sóc khách hàng đa kênh tốc độ cao",
    orientationEn: "High-speed omnichannel customer care & processing millions of transactions",
    descVi: "Tham gia giai đoạn bùng nổ của thương mại điện tử và ví điện tử, xây dựng nền tảng vận hành, xử lý khiếu nại, kiểm soát gian lận và Chăm Sóc Khách Hàng đa kênh.",
    descEn: "Participated in the boom of e-commerce & e-wallets, establishing operational foundations, complaint resolution, fraud prevention, and omnichannel care.",
    highlightsVi: [
      "Tối ưu tỷ lệ phản hồi Chatbot & Live Chat giảm thời gian chờ xuống < 30 giây",
      "Xây dựng bộ quy trình kiểm soát gian lận đơn hàng & thanh toán trực tuyến",
      "Nâng chỉ số hài lòng khách hàng CSAT từ 88% lên 96.5%"
    ],
    highlightsEn: [
      "Optimized Chatbot & Live Chat response, reducing wait time to < 30s",
      "Established fraud control processes for online orders & payments",
      "Elevated CSAT customer satisfaction score from 88% to 96.5%"
    ],
    roleVi: "Customer Service Operations Manager",
    roleEn: "Customer Service Operations Manager",
    teamSizeVi: "100+ Nhân sự CSKH & Fraud",
    teamSizeEn: "100+ CS & Fraud Personnel",
    toolsVi: "Zendesk Omnichannel, Shopee Admin CRM, Live Chat Auto-router, Power BI",
    toolsEn: "Zendesk Omnichannel, Shopee Admin CRM, Live Chat Auto-router, Power BI",
    partnersVi: "Shopee · Finviet",
    partnersEn: "Shopee · Finviet",
    iconName: "ShoppingCart",
    colorTheme: {
      primary: "orange",
      text: "text-orange-600 dark:text-orange-400",
      border: "border-orange-300/80 dark:border-orange-500/30 hover:border-orange-500/60",
      bgGradient: "bg-gradient-to-br from-orange-50/80 via-white/70 to-amber-50/50 dark:from-orange-950/40 dark:via-slate-900/80 dark:to-amber-950/30",
      iconBg: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
      badgeBg: "bg-orange-500/10 dark:bg-orange-500/20 border-orange-500/20",
      badgeText: "text-orange-700 dark:text-orange-300",
      glow: "rgba(249,115,22,0.25)"
    },
    logos: [
      { name: "Shopee", src: "https://i.ibb.co/BSVS4xf/Shopee.png", alt: "Shopee" },
      { name: "Finviet", src: "https://i.ibb.co/7NtSSz4d/Finviet.png", alt: "Finviet" }
    ]
  },
  // 6.3. Bảo hiểm nhân thọ
  {
    id: "03",
    code: "6.3",
    titleVi: "Bảo hiểm nhân thọ",
    titleEn: "Life Insurance",
    experienceVi: "3+ Năm kinh nghiệm",
    experienceEn: "3+ Years Experience",
    orientationVi: "Xây dựng sự tin cậy tuyệt đối & Chuẩn hóa quy trình chăm sóc khách hàng cao cấp",
    orientationEn: "Building absolute trust & standardizing premium customer care",
    descVi: "Quản lý tổng đài, triển khai dự án tích hợp hệ thống Call Center, tối ưu quy trình vận hành, nâng cao chất lượng tư vấn, cải thiện trải nghiệm và hiệu quả khách hàng toàn diện.",
    descEn: "Call center management, Call Center system integration deployment, workflow optimization, elevating advice quality, and comprehensive customer experience.",
    highlightsVi: [
      "Kiến tạo trải nghiệm khách hàng tiêu chuẩn 5 sao ngành tài chính - bảo hiểm",
      "Giảm 45% thời gian xử lý yêu cầu thay đổi thông tin hợp đồng",
      "Đạt tỷ lệ giải quyết khiếu nại thành công ngay từ lần gọi đầu tiên (FCR) > 92%"
    ],
    highlightsEn: [
      "Created 5-star standard customer experience in financial insurance",
      "Reduced policy information change processing time by 45%",
      "Achieved First Call Resolution (FCR) > 92% for complaint handling"
    ],
    roleVi: "Call Center Project & Quality Manager",
    roleEn: "Call Center Project & Quality Manager",
    teamSizeVi: "40+ Chuyên viên tư vấn",
    teamSizeEn: "40+ Consultants",
    toolsVi: "Prudential Life CRM, AS400 System, Voice Recording Quality Checklist",
    toolsEn: "Prudential Life CRM, AS400 System, Voice Recording Quality Checklist",
    partnersVi: "Prudential",
    partnersEn: "Prudential",
    iconName: "ShieldCheck",
    colorTheme: {
      primary: "sky",
      text: "text-sky-600 dark:text-sky-400",
      border: "border-sky-300/80 dark:border-sky-500/30 hover:border-sky-500/60",
      bgGradient: "bg-gradient-to-br from-sky-50/80 via-white/70 to-blue-50/50 dark:from-sky-950/40 dark:via-slate-900/80 dark:to-blue-950/30",
      iconBg: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
      badgeBg: "bg-sky-500/10 dark:bg-sky-500/20 border-sky-500/20",
      badgeText: "text-sky-700 dark:text-sky-300",
      glow: "rgba(14,165,233,0.25)"
    },
    logos: [
      { name: "Prudential", src: "https://i.ibb.co/XfpQphWF/Prudential.png", alt: "Prudential" }
    ]
  },
  // 6.4. Thể thao điện tử
  {
    id: "04",
    code: "6.4",
    titleVi: "Thể thao điện tử",
    titleEn: "Esports & Gaming",
    experienceVi: "5+ Năm kinh nghiệm",
    experienceEn: "5+ Years Experience",
    orientationVi: "Hỗ trợ cộng đồng hàng triệu Gamers & Đồng hành cùng các giải đấu eSports đỉnh cao",
    orientationEn: "Supporting millions of gamers & accompanying premier eSports tournaments",
    descVi: "Xây dựng, quản lý bộ phận Chăm Sóc Khách Hàng cho nhà phát hành game, vận hành hệ thống hỗ trợ quy mô lớn và đồng hành cùng các sự kiện eSports chuyên nghiệp hiệu quả.",
    descEn: "Building and managing CS for game publishers, operating large-scale support infrastructure and accompanying top eSports events.",
    highlightsVi: [
      "Vận hành hệ thống Ticket hỗ trợ game thủ với lưu lượng xử lý 50,000+ yêu cầu/ngày",
      "Bảo mật tài khoản & hỗ trợ khôi phục vật phẩm game tức thì",
      "Phối hợp tổ chức trực tiếp các điểm hỗ trợ CSKH tại giải đấu eSports lớn"
    ],
    highlightsEn: [
      "Operated gamer support ticket system handling 50,000+ requests/day",
      "Account security & instant in-game item recovery support",
      "Coordinated direct CS booths at major professional eSports tournaments"
    ],
    roleVi: "Head of Game Customer Support",
    roleEn: "Head of Game Customer Support",
    teamSizeVi: "80+ Game Supporter",
    teamSizeEn: "80+ Game Supporters",
    toolsVi: "Garena Customer Desk, Gcafe Management Tool, AI Ticket Classifier",
    toolsEn: "Garena Customer Desk, Gcafe Management Tool, AI Ticket Classifier",
    partnersVi: "Garena · VED · GCafe",
    partnersEn: "Garena · VED · GCafe",
    iconName: "Gamepad2",
    colorTheme: {
      primary: "green",
      text: "text-green-600 dark:text-green-400",
      border: "border-green-300/80 dark:border-green-500/30 hover:border-green-500/60",
      bgGradient: "bg-gradient-to-br from-green-50/80 via-white/70 to-emerald-50/50 dark:from-green-950/40 dark:via-slate-900/80 dark:to-emerald-950/30",
      iconBg: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
      badgeBg: "bg-green-500/10 dark:bg-green-500/20 border-green-500/20",
      badgeText: "text-green-700 dark:text-green-300",
      glow: "rgba(34,197,94,0.25)"
    },
    logos: [
      { name: "Garena", src: "https://i.ibb.co/h1Md65yV/Garena.png", alt: "Garena" },
      { name: "VED", src: "https://i.ibb.co/fYPJLfbw/VED.png", alt: "VED" },
      { name: "GCafe", src: "https://i.ibb.co/FkWk3s4W/GCafe.png", alt: "GCafe" }
    ]
  },
  // 6.5. Ví điện tử
  {
    id: "05",
    code: "6.5",
    titleVi: "Ví điện tử",
    titleEn: "Digital Wallets",
    experienceVi: "5+ Năm kinh nghiệm",
    experienceEn: "5+ Years Experience",
    orientationVi: "An toàn giao dịch tài chính số & Chăm sóc người dùng FinTech 24/7",
    orientationEn: "Digital financial transaction security & 24/7 FinTech user care",
    descVi: "Am hiểu vận hành Chăm Sóc Khách Hàng trong lĩnh vực FinTech, từ xác minh người dùng, xử lý giao dịch đến kiểm soát rủi ro và hỗ trợ đối tác tài chính hiệu quả bền vững.",
    descEn: "In-depth FinTech CS operations, from KYC user verification and transaction handling to risk control and financial partner support.",
    highlightsVi: [
      "Hệ thống giám sát giao dịch trực tuyến & cảnh báo lừa đảo công nghệ cao",
      "Thiết lập quy trình xử lý tra soát khiếu nại tài chính trong vòng 2 giờ",
      "Đạt tỷ lệ đánh giá dịch vụ CSAT 98.2% trên các kênh hỗ trợ số"
    ],
    highlightsEn: [
      "Real-time transaction monitoring & high-tech fraud alert system",
      "Established financial complaint investigation process within 2 hours",
      "Achieved 98.2% CSAT service rating across digital support channels"
    ],
    roleVi: "FinTech Customer Care Operations Lead",
    roleEn: "FinTech Customer Care Operations Lead",
    teamSizeVi: "120+ Nhân sự FinTech CS",
    teamSizeEn: "120+ FinTech CS Personnel",
    toolsVi: "MoMo Admin CRM, ShopeePay Merchant Portal, FinTech Security Gateway",
    toolsEn: "MoMo Admin CRM, ShopeePay Merchant Portal, FinTech Security Gateway",
    partnersVi: "MoMo · ShopeePay",
    partnersEn: "MoMo · ShopeePay",
    iconName: "Wallet",
    colorTheme: {
      primary: "amber",
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-300/80 dark:border-amber-500/30 hover:border-amber-500/60",
      bgGradient: "bg-gradient-to-br from-amber-50/80 via-white/70 to-yellow-50/50 dark:from-amber-950/40 dark:via-slate-900/80 dark:to-yellow-950/30",
      iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      badgeBg: "bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/20",
      badgeText: "text-amber-700 dark:text-amber-300",
      glow: "rgba(245,158,11,0.25)"
    },
    logos: [
      { name: "MoMo", src: "https://i.ibb.co/k2QtrgTw/Momo.png", alt: "Momo" },
      { name: "ShopeePay", src: "https://i.ibb.co/LdYv3TJy/Shopee-Paye.png", alt: "ShopeePay" }
    ]
  },
  // 6.6. Xây dựng hệ thống
  {
    id: "06",
    code: "6.6",
    titleVi: "Xây dựng hệ thống",
    titleEn: "Systems Architecture",
    experienceVi: "22+ Năm kinh nghiệm",
    experienceEn: "22+ Years Experience",
    orientationVi: "Tư vấn giải pháp toàn diện từ con người, quy trình đến chuyển đổi số",
    orientationEn: "End-to-end solution consulting from people and processes to digital transformation",
    descVi: "Tư vấn xây dựng, tối ưu hệ thống Chăm Sóc Khách Hàng toàn diện, từ quy trình, nhân sự đến CRM và tự động hóa, nâng cao hiệu quả vận hành doanh nghiệp tổng thể thực tiễn.",
    descEn: "Consulting on building & optimizing end-to-end Customer Care systems, from SOPs and personnel to CRM and automation, elevating overall enterprise efficiency.",
    highlightsVi: [
      "Thiết kế trọn gói mô hình Contact Center từ 10 đến 100+ vị trí ngồi",
      "Đóng gói tài liệu SOP, kịch bản giao tiếp & KPI scorecard chuẩn hóa",
      "Đào tạo & chuyển giao công nghệ cho đội ngũ quản lý kế thừa"
    ],
    highlightsEn: [
      "Turnkey Contact Center design from 10 to 100+ agent seats",
      "Packaged SOP documents, interaction scripts & standardized KPI scorecards",
      "Training & tech transfer for successor management teams"
    ],
    roleVi: "CX & Service System Consultant",
    roleEn: "CX & Service System Consultant",
    teamSizeVi: "Tư vấn Doanh nghiệp",
    teamSizeEn: "Enterprise Consulting",
    toolsVi: "Zoho CRM, Salesforce, Notion SOP Matrix, Process Flowcharting",
    toolsEn: "Zoho CRM, Salesforce, Notion SOP Matrix, Process Flowcharting",
    partnersVi: "Power Service · Logo-VED",
    partnersEn: "Power Service · Logo-VED",
    iconName: "Layers",
    colorTheme: {
      primary: "indigo",
      text: "text-indigo-600 dark:text-indigo-400",
      border: "border-indigo-300/80 dark:border-indigo-500/30 hover:border-indigo-500/60",
      bgGradient: "bg-gradient-to-br from-indigo-50/80 via-white/70 to-purple-50/50 dark:from-indigo-950/40 dark:via-slate-900/80 dark:to-purple-950/30",
      iconBg: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
      badgeBg: "bg-indigo-500/10 dark:bg-indigo-500/20 border-indigo-500/20",
      badgeText: "text-indigo-700 dark:text-indigo-300",
      glow: "rgba(99,102,241,0.25)"
    },
    logos: [
      { name: "Power Service", src: "https://i.ibb.co/G4QnNzWb/Power-Service.png", alt: "Power Service" },
      { name: "VED", src: "https://i.ibb.co/BKHcWL5R/Logo-VED.gif", alt: "VED Group" }
    ]
  }
];
