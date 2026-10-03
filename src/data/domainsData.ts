export interface DomainItem {
  id: string;
  code: string;
  titleVi: string;
  titleEn: string;
  experienceVi: string;
  experienceEn: string;
  experienceDetailVi: string;
  experienceDetailEn: string;
  scaleVi: string;
  scaleEn: string;
  challengesVi: string;
  challengesEn: string;
  financialEffectVi: string;
  financialEffectEn: string;
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
  // 6.1. Viễn thông & Quốc tế
  {
    id: "01",
    code: "6.1",
    titleVi: "Viễn thông & Quốc tế",
    titleEn: "Telecom & International Voice",
    experienceVi: "10+ Năm kinh nghiệm",
    experienceEn: "10+ Years Experience",
    experienceDetailVi: "10+ năm thâm niên thực chiến tiêu chuẩn tập đoàn viễn thông (MobiFone). Vận hành Contact Center viễn thông quốc tế 24/7 (Viễn Liên V247, LBC HTVC).",
    experienceDetailEn: "10+ years of frontline expertise adhering to telecom corporate standards (MobiFone). Operating 24/7 international voice Contact Centers (Vien Lien V247, LBC HTVC).",
    scaleVi: "Quản lý và điều hành trực tiếp 50 – 130+ nhân sự/ca, xử lý >100.000+ cuộc gọi & giao dịch/tháng. Bảo đảm hạ tầng dịch vụ và luồng kết nối thoại thông suốt 24/7/365 cho thị trường trong nước và kiều bào quốc tế.",
    scaleEn: "Directly managing 50 – 130+ agents/shift, processing >100,000+ calls & transactions/month. Ensuring seamless 24/7/365 voice infrastructure for domestic and overseas markets.",
    challengesVi: "Kiểm soát và điều phối lưu lượng thoại bùng nổ giờ cao điểm, xử lý triệt để tranh chấp cước viễn thông quốc tế phức tạp; Quản trị biến động nhân sự ca kíp 24/7 và duy trì chuẩn mực chất lượng thoại (QA Call Scoring) khắt khe.",
    challengesEn: "Managing peak-hour traffic spikes, thoroughly resolving complex international billing disputes, managing 24/7 shift turnover, and enforcing strict QA Call Scoring standards.",
    financialEffectVi: "Duy trì SLA tiếp nhận cuộc gọi > 98%, nâng điểm CSAT đạt 96.5%, giảm 20% chi phí xử lý khiếu nại cước dịch vụ. Duy trì tỷ lệ nghỉ việc < 3% nhờ xây dựng môi trường làm việc chuẩn hóa và lộ trình đào tạo bài bản.",
    financialEffectEn: "Maintained call intake SLA > 98%, achieved 96.5% CSAT score, reduced billing dispute handling costs by 20%. Kept agent turnover < 3% via standardized training roadmaps.",
    orientationVi: "Nền tảng vận hành & Chăm sóc khách hàng quy mô lớn tiêu chuẩn tập đoàn",
    orientationEn: "Large-scale operation & corporate standard customer care platform",
    descVi: "10+ năm thâm niên thực chiến tiêu chuẩn tập đoàn viễn thông (MobiFone). Vận hành Contact Center viễn thông quốc tế 24/7 (Viễn Liên V247, LBC HTVC), bảo đảm kết nối thông suốt 24/7/365.",
    descEn: "10+ years of telecom operational experience (MobiFone, V247, LBC HTVC), managing high-availability 24/7 Contact Centers.",
    highlightsVi: [
      "Duy trì SLA tiếp nhận cuộc gọi luôn đạt > 98% và điểm CSAT đạt 96.5%",
      "Xử lý > 100.000+ cuộc gọi & giao dịch/tháng, giảm 20% chi phí xử lý khiếu nại cước",
      "Quản lý 50 – 130+ nhân sự/ca với tỷ lệ nghỉ việc duy trì dưới mức 3%"
    ],
    highlightsEn: [
      "Consistently achieved Call Center SLA > 98% and CSAT score of 96.5%",
      "Processed > 100,000+ calls & transactions/month, reduced billing dispute cost by 20%",
      "Managed 50 – 130+ agents/shift with attrition rate kept below 3%"
    ],
    roleVi: "Trưởng phòng CSKH / Giám sát Vận hành Contact Center / Chuyên gia Dịch vụ Viễn thông",
    roleEn: "Head of Customer Service / Contact Center Operations Supervisor / Telecom Specialist",
    teamSizeVi: "50 – 130+ Nhân sự / ca",
    teamSizeEn: "50 – 130+ Agents / shift",
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

  // 6.2. Thương mại điện tử (E-Commerce)
  {
    id: "02",
    code: "6.2",
    titleVi: "Thương mại điện tử (E-Commerce)",
    titleEn: "E-Commerce Operations",
    experienceVi: "6+ Năm kinh nghiệm",
    experienceEn: "6+ Years Experience",
    experienceDetailVi: "6+ Năm quản trị vận hành tốc độ cao trong ngành Thương mại điện tử quy mô lớn.",
    experienceDetailEn: "6+ Years of high-velocity operational management in large-scale E-Commerce ecosystems.",
    scaleVi: "Quản lý 100+ nhân sự CSKH & Fraud, đáp ứng hàng triệu người dùng active và xử lý bùng nổ tương tác mùa Mega-Sale.",
    scaleEn: "Managed 100+ CS & Fraud personnel, serving millions of active users and handling massive interaction surges during Mega-Sale campaigns.",
    challengesVi: "Giải quyết tranh chấp 3 bên (Người mua - Người bán - Đơn vị vận chuyển), phòng chống gian lận khuyến mãi/đơn hàng ảo và tối ưu tốc độ phản hồi Chat.",
    challengesEn: "Tripartite dispute resolution (Buyer - Seller - Logistics 3PL), voucher & fake order fraud mitigation, and chat response optimization.",
    financialEffectVi: "Giảm thời gian chờ Chat xuống < 30 giây, tăng CSAT từ 88% lên 96.5%, giảm 30% tỷ lệ hủy đơn do chậm hỗ trợ và tiết kiệm 25% Cost-to-Serve.",
    financialEffectEn: "Cut Chat waiting time to < 30s, elevated CSAT from 88% to 96.5%, decreased order cancellation rate by 30%, and saved 25% Cost-to-Serve.",
    orientationVi: "Xử lý hàng triệu giao dịch & Chăm sóc khách hàng đa kênh tốc độ cao",
    orientationEn: "High-speed omnichannel customer care & processing millions of transactions",
    descVi: "Quản lý 100+ nhân sự CSKH & Fraud, giải quyết tranh chấp 3 bên, giảm thời gian chờ Chat < 30 giây và tiết kiệm 25% chi phí phục vụ (Cost-to-Serve).",
    descEn: "Led 100+ CS & Fraud personnel, optimized omnichannel workflows, reduced Chat wait time to < 30s and saved 25% Cost-to-Serve.",
    highlightsVi: [
      "Giảm thời gian chờ Chat xuống < 30 giây, nâng CSAT từ 88% lên 96.5%",
      "Giảm 30% tỷ lệ hủy đơn hàng do chậm hỗ trợ và tiết kiệm 25% Cost-to-Serve",
      "Xây dựng hệ thống phòng chống gian lận khuyến mãi & đơn hàng ảo"
    ],
    highlightsEn: [
      "Reduced Chat queue time to < 30s, elevated CSAT from 88% to 96.5%",
      "Lowered order cancellations by 30% and saved 25% Cost-to-Serve",
      "Engineered automated fraud prevention system for promotions & fake orders"
    ],
    roleVi: "Customer Service Operations Manager",
    roleEn: "Customer Service Operations Manager",
    teamSizeVi: "100+ Nhân sự CSKH & Fraud",
    teamSizeEn: "100+ CS & Fraud Specialists",
    toolsVi: "Zendesk Omnichannel, Shopee Admin CRM, Live Chat Auto-router, Chatbot phân loại tự động, Power BI Dashboard",
    toolsEn: "Zendesk Omnichannel, Shopee Admin CRM, Live Chat Auto-router, AI Chatbot Classifier, Power BI Dashboard",
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

  // 6.3. Bảo hiểm nhân thọ & Tài chính cao cấp
  {
    id: "03",
    code: "6.3",
    titleVi: "Bảo hiểm nhân thọ & Tài chính cao cấp",
    titleEn: "Life Insurance & Premium Finance",
    experienceVi: "3+ Năm kinh nghiệm",
    experienceEn: "3+ Years Experience",
    experienceDetailVi: "3+ Năm quản trị chất lượng & trải nghiệm 5 sao trong ngành Bảo hiểm nhân thọ và dịch vụ tài chính cao cấp.",
    experienceDetailEn: "3+ Years of 5-star quality and customer experience governance in Life Insurance & high-net-worth Financial Services.",
    scaleVi: "Quản lý 12 nhân sự trực tiếp + 40+ Chuyên viên tư vấn Call Center cao cấp, phục vụ hàng trăm nghìn hợp đồng bảo hiểm giá trị cao.",
    scaleEn: "Managed 12 direct reports + 40+ senior Call Center consultants, serving hundreds of thousands of high-value life insurance policies.",
    challengesVi: "Yêu cầu tính chính xác minh bạch tuyệt đối về pháp lý hợp đồng, xử lý nhạy cảm các ca chi trả quyền lợi bảo hiểm và đảm bảo liên tục kinh doanh (BCP).",
    challengesEn: "Demanding absolute contractual legal accuracy, sensitive handling of insurance claim benefits, and rigorous Business Continuity Planning (BCP).",
    financialEffectVi: "Giảm 45% thời gian xử lý yêu cầu hợp đồng, đạt tỷ lệ FCR > 92%, nâng tỷ lệ gia hạn hợp đồng (Retention) thêm 15% và đảm bảo SLA 95%.",
    financialEffectEn: "Reduced policy request processing time by 45%, achieved FCR > 92%, increased policy renewal retention by 15%, and guaranteed SLA 95%.",
    orientationVi: "Xây dựng sự tin cậy tuyệt đối & Chuẩn hóa quy trình chăm sóc khách hàng cao cấp",
    orientationEn: "Building absolute trust & standardizing premium customer care",
    descVi: "Quản lý 12 nhân sự trực tiếp + 40+ Chuyên viên tư vấn Call Center, giảm 45% thời gian xử lý hợp đồng, đạt FCR > 92% và nâng tỷ lệ gia hạn thêm 15%.",
    descEn: "Directed 12 direct leads + 40+ consultants, cut policy processing time by 45%, achieved FCR > 92% and boosted policy retention by 15%.",
    highlightsVi: [
      "Giảm 45% thời gian xử lý yêu cầu hợp đồng và đạt tỷ lệ giải quyết lần đầu FCR > 92%",
      "Nâng tỷ lệ gia hạn hợp đồng bảo hiểm (Retention) thêm 15%, đảm bảo SLA 95%",
      "Tiên phong tích hợp kênh tư vấn VideoCall và hệ thống kiểm soát QA Voice Recording"
    ],
    highlightsEn: [
      "Reduced policy processing time by 45% with First Contact Resolution (FCR) > 92%",
      "Boosted contract renewal retention by 15% while consistently hitting 95% SLA",
      "Pioneered VideoCall advisory channel and Voice Recording QA scoring framework"
    ],
    roleVi: "Call Center Project & Quality Manager",
    roleEn: "Call Center Project & Quality Manager",
    teamSizeVi: "12 Trực tiếp + 40+ Chuyên viên tư vấn",
    teamSizeEn: "12 Direct + 40+ Senior Consultants",
    toolsVi: "CRM Prudential Life trên AS400, VideoCall Consulting, QA Voice Recording, BCP Framework",
    toolsEn: "Prudential Life CRM on AS400, VideoCall Consulting, QA Voice Recording, BCP Framework",
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
      { name: "Prudential", src: "https://i.ibb.co/XfpQphWF/Prudential.png", alt: "Prudential Vietnam" }
    ]
  },

  // 6.4. Game, eSports & Giải trí số
  {
    id: "04",
    code: "6.4",
    titleVi: "Game, eSports & Giải trí số",
    titleEn: "Gaming, eSports & Digital Entertainment",
    experienceVi: "5+ Năm kinh nghiệm",
    experienceEn: "5+ Years Experience",
    experienceDetailVi: "5+ Năm điều hành quy mô siêu lớn trong lĩnh vực Nhà phát hành Game trực tuyến & Giải đấu Thể thao điện tử.",
    experienceDetailEn: "5+ Years of hyper-scale operational leadership for top Online Gaming Publishers & premier eSports Tournaments.",
    scaleVi: "Lãnh đạo 130 nhân sự trực tiếp (80+ Game Supporter, Fraud, CSKH), xử lý khủng > 50,000+ ticket/ngày cho hàng chục triệu game thủ.",
    scaleEn: "Led 130 direct staff (80+ Game Supporters, Fraud, CS agents), processing > 50,000+ tickets/day for tens of millions of gamers.",
    challengesVi: "Khôi phục sự cố tài khoản/vật phẩm tức thì, chịu tải siêu cao khi ra mắt Game/Sự kiện eSports và kiểm soát lừa đảo/hack tài khoản.",
    challengesEn: "Instant account and in-game item restoration, extreme traffic loads during game launches/eSports events, and anti-fraud/hack mitigation.",
    financialEffectVi: "Đạt tốc độ xử lý Ticket/Chat < 30 giây, duy trì CSAT 96%, bảo vệ tài sản ảo cho người dùng, đóng góp trực tiếp giữ chân Gamer tăng LTV.",
    financialEffectEn: "Achieved Ticket/Chat handling speed < 30s, maintained 96% CSAT, safeguarded virtual assets, and directly improved gamer retention & LTV.",
    orientationVi: "Hỗ trợ cộng đồng hàng triệu Gamers & Đồng hành cùng các giải đấu eSports đỉnh cao",
    orientationEn: "Supporting millions of gamers & accompanying premier eSports tournaments",
    descVi: "Lãnh đạo 130 nhân sự trực tiếp, xử lý > 50.000+ ticket/ngày, tốc độ phản hồi < 30 giây, duy trì CSAT 96% và đào tạo qua CS Academy LMS.",
    descEn: "Led 130 direct team members, handled > 50,000+ tickets/day, response time < 30s, maintained 96% CSAT, and built CS Academy LMS.",
    highlightsVi: [
      "Xử lý khối lượng ticket khổng lồ > 50.000+ ticket/ngày với tốc độ phản hồi < 30 giây",
      "Lãnh đạo 130 nhân sự trực tiếp (80+ Game Supporter, Fraud, CSKH) đạt CSAT 96%",
      "Thiết kế CRM Garena Customer Desk nội bộ, AI Ticket Classifier & CS Academy LMS"
    ],
    highlightsEn: [
      "Processed massive volume > 50,000+ tickets/day with response time < 30s",
      "Led 130 direct personnel (80+ Game Supporters, Fraud, CS) achieving 96% CSAT",
      "Architected proprietary Garena Customer Desk CRM, AI Classifier & CS Academy LMS"
    ],
    roleVi: "Head of Game Customer Support & Operations",
    roleEn: "Head of Game Customer Support & Operations",
    teamSizeVi: "130 Nhân sự (80+ Game Supporter)",
    teamSizeEn: "130 Personnel (80+ Game Supporters)",
    toolsVi: "CRM Garena Customer Desk, Gcafe Management Tool, AI Ticket Classifier, CS Academy LMS",
    toolsEn: "CRM Garena Customer Desk, Gcafe Management Tool, AI Ticket Classifier, CS Academy LMS",
    partnersVi: "Garena · VED · GCafe · Liên Quân Mobile · LMHT",
    partnersEn: "Garena · VED · GCafe · Arena of Valor · League of Legends",
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

  // 6.5. FinTech & Ví điện tử
  {
    id: "05",
    code: "6.5",
    titleVi: "FinTech & Ví điện tử",
    titleEn: "FinTech & Digital Wallets",
    experienceVi: "5+ Năm kinh nghiệm",
    experienceEn: "5+ Years Experience",
    experienceDetailVi: "5+ Năm kiến tạo và chuẩn hóa giải pháp chăm sóc khách hàng tài chính số (FinTech & Ví điện tử).",
    experienceDetailEn: "5+ Years of architecting and operating digital finance CS solutions (FinTech & E-Wallets).",
    scaleVi: "Điều hành 60–120+ nhân sự nội bộ & quản trị BPO Mắt Bảo 150+ vị trí, phục vụ > 30 triệu người dùng ví điện tử.",
    scaleEn: "Directed 60–120+ internal agents & managed Mat Bao BPO vendor with 150+ seats, serving > 30M active wallet users.",
    challengesVi: "Tra soát khiếu nại tài chính phức tạp, kiểm soát gian lận giao dịch tiền thật, xử lý sự cố lỗi kết nối Core Banking và khủng hoảng nghẽn lệnh.",
    challengesEn: "Complex financial dispute reconciliation, real-money fraud mitigation, Core Banking timeout errors, and transaction backlog crisis management.",
    financialEffectVi: "Rút ngắn thời gian hoàn tiền RPA từ 48h xuống 90s, nâng CSAT lên 98.2%, SLA BPO đạt 98.6% và giảm 35% sự cố vận hành.",
    financialEffectEn: "Reduced RPA refund turnaround time from 48h to 90s, boosted CSAT to 98.2%, achieved 98.6% BPO SLA, and cut operational incidents by 35%.",
    orientationVi: "An toàn giao dịch tài chính số & Chăm sóc người dùng FinTech 24/7",
    orientationEn: "Digital financial transaction security & 24/7 FinTech user care",
    descVi: "Điều hành 60–120+ nhân sự nội bộ & BPO 150+ vị trí, rút ngắn thời gian hoàn tiền RPA từ 48h xuống 90s, đạt CSAT 98.2% và SLA BPO 98.6%.",
    descEn: "Directed 60–120+ internal & 150+ BPO seats, slashed RPA refund time from 48h to 90s, achieved 98.2% CSAT and 98.6% BPO SLA.",
    highlightsVi: [
      "Rút ngắn thời gian hoàn tiền tự động qua Robot RPA từ 48 giờ xuống chỉ còn 90 giây",
      "Nâng điểm đánh giá dịch vụ CSAT lên 98.2%, duy trì SLA đối tác BPO đạt 98.6%",
      "Tích hợp MoMo Admin CRM / Finviet CRM với Core Banking, AI Bot RAG & War-Room Crisis"
    ],
    highlightsEn: [
      "Slashed automated RPA refund processing time from 48 hours to just 90 seconds",
      "Elevated CSAT satisfaction to 98.2% and maintained BPO vendor SLA at 98.6%",
      "Integrated Core Banking with MoMo/Finviet CRM, AI RAG Bot & War-Room protocol"
    ],
    roleVi: "Head of Customer Service / Operations Lead",
    roleEn: "Head of Customer Service / Operations Lead",
    teamSizeVi: "60–120+ Nội bộ & 150+ Vị trí BPO",
    teamSizeEn: "60–120+ Internal & 150+ BPO Seats",
    toolsVi: "MoMo Admin CRM, Finviet CRM, Core Banking Bridge, Robot RPA, AI Bot RAG, War-Room Crisis Management",
    toolsEn: "MoMo Admin CRM, Finviet CRM, Core Banking Bridge, Robot RPA, AI Bot RAG, War-Room Crisis Management",
    partnersVi: "MoMo · ShopeePay · Ví ECO (Finviet)",
    partnersEn: "MoMo · ShopeePay · ECO Wallet (Finviet)",
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
      { name: "MoMo", src: "https://i.ibb.co/k2QtrgTw/Momo.png", alt: "MoMo" },
      { name: "ShopeePay", src: "https://i.ibb.co/LdYv3TJy/Shopee-Paye.png", alt: "ShopeePay" },
      { name: "Finviet", src: "https://i.ibb.co/7NtSSz4d/Finviet.png", alt: "Ví ECO Finviet" }
    ]
  },

  // 6.6. Tư vấn & Xây dựng hệ thống CX/CS
  {
    id: "06",
    code: "6.6",
    titleVi: "Tư vấn & Xây dựng hệ thống CX/CS",
    titleEn: "CX/CS System Architecture & Consulting",
    experienceVi: "22+ Năm kinh nghiệm",
    experienceEn: "22+ Years Experience",
    experienceDetailVi: "22+ Năm đóng gói & chuyển giao giải pháp toàn diện từ con người, quy trình đến chuyển đổi số cho doanh nghiệp.",
    experienceDetailEn: "22+ Years of packaging & transferring comprehensive turnkey CX/CS systems and digital transformation frameworks.",
    scaleVi: "Tư vấn, thiết lập trọn gói mô hình Contact Center từ 10 đến 150+ vị trí ngồi cho nhiều doanh nghiệp đa ngành.",
    scaleEn: "Consulted and established turnkey Contact Center architectures from 10 to 150+ agent seats across multi-industry enterprises.",
    challengesVi: "Chuyển đổi CSKH từ Cost Center thành Value Center, tái cấu trúc phòng ban thiếu quy trình và số hóa trải nghiệm khách hàng.",
    challengesEn: "Transforming Customer Service from a Cost Center into a Value Center, restructuring unstandardized departments, and digitizing CX.",
    financialEffectVi: "Chuẩn hóa 100% tài liệu SOP/KPI, rút ngắn 65% thời gian Onboarding nhân sự, tăng 40% hiệu suất vận hành và tối ưu đáng kể chi phí điều hành.",
    financialEffectEn: "Standardized 100% SOP/KPI documentation, slashed agent onboarding time by 65%, boosted operational efficiency by 40%, and significantly optimized opex.",
    orientationVi: "Tư vấn giải pháp toàn diện từ con người, quy trình đến chuyển đổi số",
    orientationEn: "End-to-end solution consulting from people and processes to digital transformation",
    descVi: "Thiết lập trọn gói Contact Center 10 - 150+ chỗ ngồi, chuẩn hóa 100% SOP/KPI, rút ngắn 65% thời gian Onboarding và tăng 40% hiệu suất vận hành.",
    descEn: "Turnkey Contact Center deployment (10 - 150+ seats), 100% SOP/KPI standardization, 65% faster onboarding, and 40% efficiency gains.",
    highlightsVi: [
      "Chuẩn hóa 100% tài liệu SOP/KPI Matrix, rút ngắn 65% thời gian Onboarding nhân sự",
      "Tăng 40% hiệu suất vận hành và tối ưu đáng kể chi phí điều hành (Cost-to-Serve)",
      "Đóng gói quy trình Zoho/Salesforce CRM, hệ sinh thái AI Agent Copilot & Auto-QA"
    ],
    highlightsEn: [
      "Standardized 100% of SOP/KPI Matrix docs, reducing agent onboarding time by 65%",
      "Increased operational productivity by 40% and optimized Cost-to-Serve expenditure",
      "Packaged Zoho/Salesforce CRM workflows, AI Agent Copilot ecosystem & Auto-QA"
    ],
    roleVi: "CX & Service System Consultant / Head of CX Strategy",
    roleEn: "CX & Service System Consultant / Head of CX Strategy",
    teamSizeVi: "Thiết lập 10 – 150+ Vị trí ngồi",
    teamSizeEn: "Turnkey 10 – 150+ Agent Seats",
    toolsVi: "Zoho CRM, Salesforce, AI Agent Copilot, Speech-to-Text Auto-QA, Notion SOP Matrix",
    toolsEn: "Zoho CRM, Salesforce, AI Agent Copilot, Speech-to-Text Auto-QA, Notion SOP Matrix",
    partnersVi: "Power Service · Hệ sinh thái Doanh nghiệp Đối tác",
    partnersEn: "Power Service · Partner Enterprise Ecosystem",
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
