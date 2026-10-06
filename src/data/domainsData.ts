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
  quyMoVi: string;
  quyMoEn: string;
  thachThucVi: string;
  thachThucEn: string;
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
  {
    id: "01",
    code: "6.1",
    titleVi: "Viễn thông & Quốc tế",
    titleEn: "Telecom & International",
    experienceVi: "10+ Năm thâm niên",
    experienceEn: "10+ Years Frontline",
    orientationVi: "Vận hành Contact Center viễn thông quốc tế 24/7",
    orientationEn: "24/7 International Telecom Contact Center Ops",
    descVi: "Bảo đảm hạ tầng dịch vụ và luồng kết nối thoại thông suốt 24/7/365 cho thị trường trong nước và kiều bào quốc tế.",
    descEn: "Ensuring seamless 24/7 service and voice connectivity for domestic and international markets.",
    quyMoVi: "Quản lý 50 – 130+ nhân sự/ca, xử lý >100.000+ cuộc gọi/tháng.",
    quyMoEn: "Manage 50-130+ staff/shift, handle >100,000+ calls/month.",
    thachThucVi: "Kiểm soát lưu lượng thoại giờ cao điểm, xử lý tranh chấp cước viễn thông phức tạp.",
    thachThucEn: "Peak traffic control and complex international billing dispute resolution.",
    highlightsVi: [
      "Duy trì SLA tiếp nhận cuộc gọi > 98%",
      "Nâng điểm CSAT đạt 96.5%",
      "Giảm 20% chi phí xử lý khiếu nại cước dịch vụ",
      "Duy trì tỷ lệ nghỉ việc < 3%"
    ],
    highlightsEn: [
      "Maintained call receiving SLA > 98%",
      "Elevated CSAT score to 96.5%",
      "Reduced billing complaint processing cost by 20%",
      "Maintained attrition rate < 3%"
    ],
    roleVi: "Trưởng phòng CSKH / Giám sát Vận hành Contact Center",
    roleEn: "Head of CS / Contact Center Operations Supervisor",
    teamSizeVi: "50 - 130+ nhân sự/ca",
    teamSizeEn: "50 - 130+ Staff/shift",
    toolsVi: "Avaya CallCenter, AICC System, Smart IVR, CRM Telecom, SOP Matrix",
    toolsEn: "Avaya CallCenter, AICC System, Smart IVR, CRM Telecom, SOP Matrix",
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
  {
    id: "02",
    code: "6.2",
    titleVi: "Thương mại điện tử",
    titleEn: "E-Commerce",
    experienceVi: "6+ Năm quản trị vận hành",
    experienceEn: "6+ Years Ops Management",
    orientationVi: "Quản trị vận hành tốc độ cao",
    orientationEn: "High-speed operational management",
    descVi: "Quản lý 100+ nhân sự CSKH & Fraud, đáp ứng hàng triệu người dùng active và xử lý bùng nổ tương tác mùa Mega-Sale.",
    descEn: "Managed 100+ CS & Fraud staff, serving millions during Mega-Sale interaction spikes.",
    quyMoVi: "Quản lý 100+ nhân sự CSKH & Fraud.",
    quyMoEn: "Manage 100+ CS & Fraud personnel.",
    thachThucVi: "Giải quyết tranh chấp 3 bên, phòng chống gian lận khuyến mãi/đơn hàng ảo.",
    thachThucEn: "Resolving 3-party disputes and fraud prevention for fake orders/promos.",
    highlightsVi: [
      "Giảm thời gian chờ Chat xuống < 30 giây",
      "Tăng CSAT từ 88% lên 96.5%",
      "Giảm 30% tỷ lệ hủy đơn do chậm hỗ trợ",
      "Tiết kiệm 25% Cost-to-Serve"
    ],
    highlightsEn: [
      "Reduced Chat wait time to < 30s",
      "Increased CSAT from 88% to 96.5%",
      "Reduced order cancellation rate by 30%",
      "Saved 25% Cost-to-Serve"
    ],
    roleVi: "Customer Service Operations Manager",
    roleEn: "Customer Service Operations Manager",
    teamSizeVi: "100+ nhân sự",
    teamSizeEn: "100+ personnel",
    toolsVi: "Zendesk Omnichannel, Shopee Admin CRM, Live Chat Auto-router, Chatbot phân loại tự động",
    toolsEn: "Zendesk Omnichannel, Shopee Admin CRM, Live Chat Auto-router, AI Ticket Classifier",
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
  {
    id: "03",
    code: "6.3",
    titleVi: "Bảo hiểm & Tài chính",
    titleEn: "Insurance & Finance",
    experienceVi: "3+ Năm quản trị trải nghiệm",
    experienceEn: "3+ Years Experience Management",
    orientationVi: "Quản trị chất lượng & trải nghiệm 5 sao",
    orientationEn: "5-star quality experience management",
    descVi: "Quản lý 12 nhân sự trực tiếp + 40+ TV Call Center cao cấp, phục vụ hàng trăm nghìn hợp đồng bảo hiểm giá trị cao.",
    descEn: "Managing 12 direct staff + 40 Call Center consultants for high-value insurance contracts.",
    quyMoVi: "Quản lý 12 nhân sự trực tiếp + 40+ Chuyên viên tư vấn.",
    quyMoEn: "Manage 12 direct staff + 40+ premium consultants.",
    thachThucVi: "Tính chính xác minh bạch tuyệt đối pháp lý hợp đồng, BCP.",
    thachThucEn: "Absolute contractual transparency and Business Continuity Planning (BCP).",
    highlightsVi: [
      "Giảm 45% thời gian xử lý yêu cầu hợp đồng",
      "Đạt tỷ lệ FCR > 92%",
      "Nâng tỷ lệ gia hạn hợp đồng (Retention) thêm 15%",
      "Đảm bảo SLA 95%"
    ],
    highlightsEn: [
      "Reduced contract request processing time by 45%",
      "Achieved FCR > 92%",
      "Increased contract retention rate by 15%",
      "Guaranteed 95% SLA"
    ],
    roleVi: "Call Center Project & Quality Manager",
    roleEn: "Call Center Project & Quality Manager",
    teamSizeVi: "12 nhân sự + 40+ Chuyên viên",
    teamSizeEn: "12 staff + 40+ consultants",
    toolsVi: "CRM Prudential Life (AS400), VideoCall tư vấn, QA Voice Recording",
    toolsEn: "Prudential Life CRM (AS400), VideoCall consulting, QA Voice Recording",
    partnersVi: "Prudential Vietnam",
    partnersEn: "Prudential Vietnam",
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
  {
    id: "04",
    code: "6.4",
    titleVi: "Game & eSports",
    titleEn: "Game & eSports",
    experienceVi: "5+ Năm điều hành quy mô siêu lớn",
    experienceEn: "5+ Years Massive Scale Ops",
    orientationVi: "Điều hành quy mô siêu lớn, hỗ trợ triệu người dùng",
    orientationEn: "Massive scale operations, supporting millions of users",
    descVi: "Lãnh đạo 130 nhân sự trực tiếp, xử lý khủng > 50,000+ ticket/ngày cho hàng chục triệu game thủ.",
    descEn: "Leading 130 staff, handling >50,000+ tickets/day for tens of millions of gamers.",
    quyMoVi: "Lãnh đạo 130 nhân sự trực tiếp.",
    quyMoEn: "Lead 130 direct personnel.",
    thachThucVi: "Khôi phục sự cố tài khoản/vật phẩm tức thì, chịu tải siêu cao khi ra mắt Game.",
    thachThucEn: "Instant account/item recovery and ultra-high load handling during launches.",
    highlightsVi: [
      "Tốc độ xử lý Ticket/Chat < 30 giây",
      "Duy trì CSAT 96%",
      "Bảo vệ tài sản ảo cho người dùng",
      "Đóng góp giữ chân Gamer tăng LTV"
    ],
    highlightsEn: [
      "Ticket/Chat processing speed < 30s",
      "Maintained CSAT 96%",
      "Protected user virtual assets",
      "Contributed to Gamer retention increasing LTV"
    ],
    roleVi: "Head of Game Customer Support & Operations",
    roleEn: "Head of Game Customer Support & Operations",
    teamSizeVi: "130 nhân sự trực tiếp",
    teamSizeEn: "130 direct personnel",
    toolsVi: "CRM Garena Customer Desk, Gcafe Tool, AI Ticket Classifier, CS Academy LMS",
    toolsEn: "CRM Garena Customer Desk, Gcafe Tool, AI Ticket Classifier, CS Academy LMS",
    partnersVi: "Garena · VED · GCafe · Liên Quân Mobile · LMHT",
    partnersEn: "Garena · VED · GCafe · Arena of Valor · LoL",
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
  {
    id: "05",
    code: "6.5",
    titleVi: "FinTech & Ví điện tử",
    titleEn: "FinTech & Wallets",
    experienceVi: "5+ Năm kiến tạo giải pháp",
    experienceEn: "5+ Years Solution Creation",
    orientationVi: "Kiến tạo giải pháp tài chính số",
    orientationEn: "Creating digital financial solutions",
    descVi: "Điều hành 60–120+ nhân sự nội bộ & quản trị BPO 150+ vị trí, phục vụ > 30 triệu người dùng ví điện tử.",
    descEn: "Operating 60-120+ internal staff & 150+ BPO positions for >30M e-wallet users.",
    quyMoVi: "Điều hành 60–120+ nhân sự nội bộ & BPO 150+ vị trí.",
    quyMoEn: "Operating 60-120+ internal staff & 150+ BPO seats.",
    thachThucVi: "Tra soát tài chính phức tạp, kiểm soát gian lận, xử lý lỗi Core Banking.",
    thachThucEn: "Complex financial auditing and fraud control for Core Banking incidents.",
    highlightsVi: [
      "Rút ngắn thời gian hoàn tiền RPA từ 48h xuống 90s",
      "Nâng CSAT lên 98.2%",
      "SLA BPO đạt 98.6%",
      "Giảm 35% sự cố vận hành"
    ],
    highlightsEn: [
      "Reduced RPA refund time from 48h to 90s",
      "Elevated CSAT to 98.2%",
      "BPO SLA reached 98.6%",
      "Reduced operational incidents by 35%"
    ],
    roleVi: "Head of Customer Service / Operations Lead",
    roleEn: "Head of Customer Service / Operations Lead",
    teamSizeVi: "60-120+ nhân sự + BPO",
    teamSizeEn: "60-120+ staff + BPO",
    toolsVi: "MoMo Admin CRM, Finviet CRM, Robot RPA, AI Bot RAG, War-Room Crisis Management",
    toolsEn: "MoMo Admin CRM, Finviet CRM, Robot RPA, AI Bot RAG, War-Room Crisis Management",
    partnersVi: "MoMo · ShopeePay · Ví ECO",
    partnersEn: "MoMo · ShopeePay · ECO Wallet",
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
  {
    id: "06",
    code: "6.6",
    titleVi: "Tư vấn CX/CS",
    titleEn: "CX/CS Consulting",
    experienceVi: "22+ Năm thực chiến",
    experienceEn: "22+ Years Track Record",
    orientationVi: "Đóng gói & chuyển giao giải pháp toàn diện",
    orientationEn: "Packaging & transferring comprehensive solutions",
    descVi: "Tư vấn, thiết lập trọn gói mô hình Contact Center cho nhiều doanh nghiệp đa ngành.",
    descEn: "Full-package Contact Center design and consulting for multi-industry enterprises.",
    quyMoVi: "Tư vấn trọn gói mô hình Contact Center từ 10 đến 150+ vị trí ngồi.",
    quyMoEn: "Full-package Contact Center design from 10 to 150+ agent seats.",
    thachThucVi: "Chuyển đổi từ Cost Center thành Value Center, tái cấu trúc thiếu quy trình.",
    thachThucEn: "Transform from Cost Center to Value Center and process restructuring.",
    highlightsVi: [
      "Chuẩn hóa 100% tài liệu SOP/KPI",
      "Rút ngắn 65% thời gian Onboarding nhân sự",
      "Tăng 40% hiệu suất vận hành",
      "Tối ưu đáng kể chi phí điều hành"
    ],
    highlightsEn: [
      "Standardized 100% SOP/KPI documents",
      "Reduced Onboarding time by 65%",
      "Increased operational efficiency by 40%",
      "Significant operational cost optimization"
    ],
    roleVi: "CX & Service System Consultant / Head of CX Strategy",
    roleEn: "CX & Service System Consultant / Head of CX Strategy",
    teamSizeVi: "Tư vấn doanh nghiệp đa ngành",
    teamSizeEn: "Multi-industry enterprise consulting",
    toolsVi: "Zoho/Salesforce CRM, AI Agent Copilot, Speech-to-Text Auto-QA, Notion SOP Matrix",
    toolsEn: "Zoho/Salesforce CRM, AI Agent Copilot, Speech-to-Text Auto-QA, Notion SOP Matrix",
    partnersVi: "Power Service · Hệ sinh thái đối tác",
    partnersEn: "Power Service · Partner Ecosystem",
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
