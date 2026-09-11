export interface ServiceDeliverable {
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
}

export interface ServicePackage {
  id: string;
  category: "contact_center" | "ai_automation" | "qa_training" | "bpo_cost" | "cx_strategy";
  badgeVi: string;
  badgeEn: string;
  titleVi: string;
  titleEn: string;
  shortDescVi: string;
  shortDescEn: string;
  fullDescVi: string;
  fullDescEn: string;
  iconName: string;
  colorGradient: string;
  accentColor: string;
  targetAudienceVi: string;
  targetAudienceEn: string;
  durationVi: string;
  durationEn: string;
  expectedKpisVi: string[];
  expectedKpisEn: string[];
  deliverables: ServiceDeliverable[];
  industriesVi: string[];
  industriesEn: string[];
  featured?: boolean;
}

export const SERVICES_CATEGORIES = [
  { id: "all", labelVi: "Tất cả dịch vụ", labelEn: "All Services" },
  { id: "contact_center", labelVi: "Tư vấn Contact Center", labelEn: "Contact Center Setup" },
  { id: "ai_automation", labelVi: "AI & Chuyển đổi số CX", labelEn: "AI & Digital CX" },
  { id: "qa_training", labelVi: "Đào tạo & Quản trị QA", labelEn: "QA & Corporate Training" },
  { id: "bpo_cost", labelVi: "Tối ưu chi phí & BPO", labelEn: "Cost & BPO Advisory" },
];

export const SERVICES_DATA: ServicePackage[] = [
  {
    id: "omnichannel-contact-center",
    category: "contact_center",
    badgeVi: "Dịch Vụ Trọng Điểm",
    badgeEn: "Flagship Service",
    titleVi: "Tư Vấn & Xây Dựng Hệ Thống Contact Center Đa Kênh",
    titleEn: "Omnichannel Contact Center Architecture & Setup",
    shortDescVi: "Hoạch định kiến trúc, quy trình vận hành và chuẩn hóa hệ thống Contact Center từ 10 đến 500+ bàn tổng đài viên.",
    shortDescEn: "Comprehensive architecture design, operational workflows, and standardization for 10 to 500+ seat Contact Centers.",
    fullDescVi: "Dịch vụ tư vấn tổng thể từ khâu khảo sát hạ tầng, lựa chọn giải pháp tổng đài VoIP/Cloud, xây dựng ma trận định tuyến thông minh (IVR/ACD), thiết lập quy trình xử lý đa kênh (Hotline, LiveChat, Facebook, Zalo, Email, Ticket) đến hoạch định khung chỉ số KPI chuẩn quốc tế (AHT, FCR, Abandoned Rate, Service Level).",
    fullDescEn: "End-to-end consulting spanning infrastructure audit, VoIP/Cloud PBX solution selection, intelligent routing design (IVR/ACD), omnichannel workflow mapping, and international KPI framework establishment (AHT, FCR, Service Level).",
    iconName: "Headphones",
    colorGradient: "from-blue-600 via-indigo-600 to-sky-500",
    accentColor: "blue",
    targetAudienceVi: "Doanh nghiệp đang mở rộng quy mô, cần chuẩn hóa dịch vụ khách hàng hoặc xây mới phòng CSKH chuyên nghiệp.",
    targetAudienceEn: "Enterprises scaling customer support, standardizing workflows, or establishing greenfield Contact Centers.",
    durationVi: "4 - 12 tuần (Tùy quy mô)",
    durationEn: "4 - 12 weeks (Based on scale)",
    expectedKpisVi: [
      "Tăng tỷ lệ giải quyết cuộc gọi đầu tiên (FCR) lên > 85%",
      "Giảm tỷ lệ cuộc gọi nhỡ (Abandoned Rate) xuống < 3%",
      "Tối ưu thời gian xử lý trung bình (AHT) từ 15% - 30%",
      "Nâng cao chỉ số hài lòng khách hàng CSAT > 92%"
    ],
    expectedKpisEn: [
      "Boost First Contact Resolution (FCR) to > 85%",
      "Reduce Abandoned Call Rate to < 3%",
      "Optimize Average Handling Time (AHT) by 15% - 30%",
      "Elevate Customer Satisfaction (CSAT) to > 92%"
    ],
    deliverables: [
      {
        titleVi: "Tài liệu Blueprint Kiến trúc Contact Center",
        titleEn: "Contact Center Architecture Blueprint",
        descVi: "Sơ đồ kiến trúc công nghệ, định tuyến IVR phân tầng và tích hợp CRM/ERP.",
        descEn: "Technology architecture map, tiered IVR routing, and CRM/ERP integration specs."
      },
      {
        titleVi: "Bộ Quy trình Vận hành Chuẩn (SOPs)",
        titleEn: "Standard Operating Procedures (SOPs)",
        descVi: "Quy trình xử lý sự cố, quy trình tiếp nhận đa kênh, ma trận leo thang khủng hoảng.",
        descEn: "Incident management, omnichannel intake workflows, and crisis escalation matrix."
      },
      {
        titleVi: "Khung Quản trị Chỉ số & Dashboard Real-time",
        titleEn: "KPI Framework & Real-time Dashboards",
        descVi: "Bộ công thức đo lường SLA/KPI và thiết kế Dashboard giám sát vận hành trực tiếp.",
        descEn: "SLA/KPI measurement formulas and real-time operational monitoring dashboard design."
      },
      {
        titleVi: "Kế hoạch Ứng phó Gián đoạn (BCP / DRP)",
        titleEn: "Business Continuity & Disaster Recovery Plan",
        descVi: "Kịch bản dự phòng hạ tầng viễn thông, mạng và nhân sự khi xảy ra sự cố khẩn cấp.",
        descEn: "Contingency protocols for telecom, network outages, and emergency staffing."
      }
    ],
    industriesVi: ["Thương mại điện tử", "Tài chính - Ngân hàng", "Bảo hiểm", "Bán lẻ chuỗi", "Viễn thông"],
    industriesEn: ["E-commerce", "Fintech & Banking", "Insurance", "Retail Chains", "Telecom"],
    featured: true
  },
  {
    id: "ai-cx-automation",
    category: "ai_automation",
    badgeVi: "Công Nghệ Tiên Phong",
    badgeEn: "AI & Innovation",
    titleVi: "Chuyển Đổi Số CX & Tự Động Hóa AI Customer Service",
    titleEn: "CX Digital Transformation & AI Automation",
    shortDescVi: "Tích hợp AI Chatbot, Voicebot thông minh 24/7 và hệ thống tự động hóa xử lý Ticket giúp giảm 50% khối lượng tác vụ lặp lại.",
    shortDescEn: "Integrate 24/7 intelligent Chatbots, Voicebots, and automated ticketing to offload 50% of repetitive inquiries.",
    fullDescVi: "Ứng dụng các giải pháp GenAI, NLP và RPA vào hành trình phục vụ khách hàng. Xây dựng trợ lý ảo trả lời tự động trên Website, Fanpage, Zalo OA; triển khai Voicebot gọi ra thông báo tự động (Outbound) và tiếp nhận cuộc gọi vào (Inbound); tích hợp tự động phân loại và giao việc qua CRM/Helpdesk.",
    fullDescEn: "Leveraging GenAI, NLP, and RPA across the customer journey. Deploying AI virtual assistants on Web/Social/Zalo, automated inbound/outbound voicebots, and automated ticket classification and routing.",
    iconName: "Bot",
    colorGradient: "from-purple-600 via-pink-600 to-rose-500",
    accentColor: "purple",
    targetAudienceVi: "Doanh nghiệp có lượng yêu cầu hỗ trợ lớn, tỷ lệ lặp lại cao, muốn cắt giảm chi phí nhân sự và phục vụ 24/7.",
    targetAudienceEn: "Companies with high query volumes, repetitive FAQs, aiming to cut labor costs and provide 24/7 responsiveness.",
    durationVi: "3 - 8 tuần",
    durationEn: "3 - 8 weeks",
    expectedKpisVi: [
      "Tự động hóa giải quyết 50% - 70% các câu hỏi thường gặp (FAQ)",
      "Phản hồi khách hàng ngay lập tức < 3 giây (Zero-wait time)",
      "Tiết kiệm 30% - 45% chi phí nhân sự trực ca đêm và ngày lễ",
      "Gia tăng tỷ lệ chốt đơn (Conversion Rate) từ tư vấn tự động"
    ],
    expectedKpisEn: [
      "Automate 50% - 70% of routine FAQ inquiries",
      "Instant response time < 3 seconds (Zero-wait time)",
      "Save 30% - 45% in night-shift and holiday staffing expenses",
      "Boost sales conversion rates via automated proactive chat"
    ],
    deliverables: [
      {
        titleVi: "Kịch bản AI Chatbot / Voicebot Đa ngữ cảnh",
        titleEn: "Multi-scenario Bot Conversational Scripts",
        descVi: "Thiết kế luồng hội thoại tự nhiên, xử lý ngữ cảnh phức tạp và nhận diện ý định (Intent).",
        descEn: "Natural dialog flows, complex context handling, and intent recognition engineering."
      },
      {
        titleVi: "Tích hợp API Tự động hóa CRM & Kho vận",
        titleEn: "CRM & Logistics API Integration",
        descVi: "Kết nối Bot tự động tra cứu mã vận đơn, số dư, lịch sử giao dịch và tạo ticket.",
        descEn: "API pipelines for automated order lookup, account balances, and automated ticket dispatch."
      },
      {
        titleVi: "Báo cáo Phân tích Cảm xúc (Sentiment Analytics)",
        titleEn: "Customer Sentiment & Voice Analysis",
        descVi: "Thiết lập hệ thống chấm điểm cảm xúc khách hàng và phát hiện điểm nóng khiếu nại.",
        descEn: "Customer mood scoring and real-time early warning for service bottlenecks."
      }
    ],
    industriesVi: ["E-commerce", "Fintech", "Logistics", "Dịch vụ trực tuyến", "F&B Chuỗi"],
    industriesEn: ["E-commerce", "Fintech", "Logistics", "Online Services", "F&B Chains"],
    featured: true
  },
  {
    id: "qa-qc-training-framework",
    category: "qa_training",
    badgeVi: "Chuẩn Hóa Đội Ngũ",
    badgeEn: "Quality Excellence",
    titleVi: "Xây Dựng Khung Quản Trị Chất Lượng QA/QC & Đào Tạo Đội Ngũ",
    titleEn: "QA/QC Quality Framework & Workforce Coaching",
    shortDescVi: "Thiết lập tiêu chí đánh giá cuộc gọi, đào tạo kỹ năng mềm, xử lý khiếu nại khủng hoảng và huấn luyện Supervisor.",
    shortDescEn: "Establish call scoring rubrics, soft skills training, crisis conflict resolution, and Supervisor 1-on-1 coaching.",
    fullDescVi: "Xây dựng tiêu chuẩn dịch vụ đồng nhất cho toàn bộ nhân sự tương tác với khách hàng. Cung cấp biểu mẫu chấm điểm cuộc gọi/chat/email, quy trình hiệu chuẩn định kỳ (Calibration), cùng chuỗi workshop đào tạo thực chiến: Giao tiếp thấu cảm, Nghệ thuật thuyết phục, Quản trị cảm xúc khi gặp khách hàng khó tính.",
    fullDescEn: "Standardize service excellence across all customer touchpoints. Delivering QA scoring scorecards, periodic calibration workflows, and practical masterclass workshops on Empathy, Negotiation, and De-escalation.",
    iconName: "Award",
    colorGradient: "from-amber-500 via-orange-600 to-red-500",
    accentColor: "amber",
    targetAudienceVi: "Đội ngũ CSKH chất lượng chưa đồng đều, tỷ lệ khiếu nại cao hoặc thiếu khung đánh giá năng lực minh bạch.",
    targetAudienceEn: "Teams facing inconsistent service quality, high escalation rates, or lacking structured QA audits.",
    durationVi: "2 - 6 tuần",
    durationEn: "2 - 6 weeks",
    expectedKpisVi: [
      "Điểm chất lượng nghiệp vụ (QA Score) toàn đội ngũ đạt > 90%",
      "Giảm 40% tỷ lệ khiếu nại leo thang lên cấp quản lý",
      "Tăng 25% chỉ số thiện cảm và giữ chân khách hàng (Retention Rate)",
      "Chuẩn hóa 100% tài liệu đào tạo nội bộ (Onboarding Playbook)"
    ],
    expectedKpisEn: [
      "Team-wide QA compliance score reaches > 90%",
      "Reduce escalations to upper management by 40%",
      "Increase customer retention and NPS advocacy by 25%",
      "100% standardized internal Onboarding Playbook"
    ],
    deliverables: [
      {
        titleVi: "Bộ Tiêu chí & Biểu mẫu Chấm điểm QA Đa kênh",
        titleEn: "Omnichannel QA Rubric & Scorecards",
        descVi: "Thang điểm chi tiết cho Voice, LiveChat, Email và quy trình Calibration định kỳ.",
        descEn: "Granular scoring criteria for Voice/Chat/Email and periodic calibration manuals."
      },
      {
        titleVi: "Chương trình Huấn luyện Kỹ năng Thực chiến",
        titleEn: "Interactive Soft-Skills Training Modules",
        descVi: "Giáo trình và bài tập tình huống: Xử lý khủng hoảng, thuyết phục và tư vấn bán thêm (Upsell).",
        descEn: "Curriculum & role-play cases: Crisis resolution, objection handling, and soft upselling."
      },
      {
        titleVi: "Khung Phát triển Năng lực Team Leader & Supervisor",
        titleEn: "Leadership Coaching for Supervisors",
        descVi: "Kỹ năng phân ca, giám sát thời gian thực, đánh giá nhân viên và truyền cảm hứng.",
        descEn: "Real-time floor management, workforce scheduling, and motivational coaching."
      }
    ],
    industriesVi: ["Bảo hiểm", "Dịch vụ khách hàng cao cấp", "Bán lẻ", "Y tế & Chăm sóc sức khỏe"],
    industriesEn: ["Insurance", "Luxury Customer Care", "Retail", "Healthcare & Medical"],
    featured: false
  },
  {
    id: "bpo-cost-optimization",
    category: "bpo_cost",
    badgeVi: "Tối Ưu Ngân Sách",
    badgeEn: "Cost Optimization",
    titleVi: "Tối Ưu Chi Phí Vận Hành & Tư Vấn Thuê Ngoài BPO",
    titleEn: "Operational Cost Optimization & BPO Advisory",
    shortDescVi: "Định biên nhân sự (WFM), tái cấu trúc chi phí vận hành và thẩm định, đàm phán hợp đồng thuê ngoài tổng đài BPO.",
    shortDescEn: "Workforce Management (WFM) sizing, cost restructuring, vendor due diligence, and BPO SLA negotiations.",
    fullDescVi: "Giúp doanh nghiệp đánh giá tính khả thi giữa mô hình In-house và Outsourcing (BPO). Hỗ trợ lựa chọn nhà cung cấp BPO uy tín, xây dựng hồ sơ mời thầu (RFP), đàm phán bảng giá và thiết lập điều khoản phạt cam kết SLA khắt khe. Ứng dụng mô hình Erlang C để định biên chính xác nhân sự theo từng khung giờ cao điểm.",
    fullDescEn: "Guiding enterprises on In-house vs. BPO feasibility. Vendor evaluation, RFP drafting, contract rate negotiations, and strict SLA governance setup. Applying Erlang C modeling for peak-hour staffing precision.",
    iconName: "TrendingDown",
    colorGradient: "from-emerald-600 via-teal-600 to-cyan-500",
    accentColor: "emerald",
    targetAudienceVi: "Doanh nghiệp có chi phí vận hành CSKH quá cao hoặc đang tìm kiếm đối tác thuê ngoài BPO chất lượng cao.",
    targetAudienceEn: "Organizations facing bloated CS operating expenses or seeking vetted high-performing BPO partners.",
    durationVi: "3 - 6 tuần",
    durationEn: "3 - 6 weeks",
    expectedKpisVi: [
      "Tiết kiệm 20% - 35% tổng chi phí vận hành CSKH hàng tháng (OPEX)",
      "Tối ưu tỷ lệ lãng phí thời gian chờ (Occupancy Rate) đạt 80% - 85%",
      "Kiểm soát 100% rủi ro cam kết dịch vụ với nhà thầu BPO",
      "Linh hoạt tăng/giảm quy mô nhân sự theo mùa vụ bán hàng"
    ],
    expectedKpisEn: [
      "Save 20% - 35% in monthly customer support OPEX",
      "Optimize agent occupancy rate to 80% - 85%",
      "100% risk mitigation in BPO vendor contract SLAs",
      "Seamless seasonal workforce scalability during sales peaks"
    ],
    deliverables: [
      {
        titleVi: "Báo cáo Đánh giá Hiện trạng Chi phí & Lãng phí",
        titleEn: "Cost & Inefficiency Diagnostic Report",
        descVi: "Phân tích cấu trúc chi phí (Cost-per-contact), tỷ lệ lãng phí và cơ hội cắt giảm.",
        descEn: "Cost-per-contact breakdown, idle time analysis, and OPEX reduction roadmap."
      },
      {
        titleVi: "Bộ Hồ sơ Mời thầu & Ma trận Đánh giá BPO",
        titleEn: "BPO RFP Kit & Vendor Evaluation Matrix",
        descVi: "Bộ tài liệu kỹ thuật mời thầu chuẩn và tiêu chí chấm điểm năng lực nhà thầu.",
        descEn: "Standard technical tender specs and vendor capability scoring scorecard."
      },
      {
        titleVi: "Mô hình Định biên Nhân sự Erlang C Tự động",
        titleEn: "Erlang C Dynamic Staffing Model",
        descVi: "File bảng tính dự báo số lượng Agent theo lưu lượng cuộc gọi/chat từng giờ.",
        descEn: "Dynamic spreadsheet calculating agent headcount requirements per hourly traffic."
      }
    ],
    industriesVi: ["Thương mại điện tử", "Giao vận Express", "Du lịch & Khách sạn", "Dịch vụ tài chính"],
    industriesEn: ["E-commerce", "Express Logistics", "Travel & Hospitality", "Financial Services"],
    featured: false
  },
  {
    id: "cx-audit-voice-of-customer",
    category: "cx_strategy",
    badgeVi: "Chiến Lược C-Level",
    badgeEn: "Executive Strategy",
    titleVi: "Khảo Sát Hiện Trạng CX 360° & Hệ Thống Đo Lường Voice of Customer",
    titleEn: "360° CX Audit & Voice-of-Customer (VoC) Engine",
    shortDescVi: "Đánh giá toàn diện hành trình khách hàng (Journey Map), thiết lập hệ thống thu thập CSAT/CES/NPS tự động đa điểm chạm.",
    shortDescEn: "Comprehensive customer journey mapping, automated CSAT/CES/NPS feedback loops across all touchpoints.",
    fullDescVi: "Chẩn đoán toàn diện sức khỏe trải nghiệm khách hàng từ điểm chạm đầu tiên đến sau bán hàng. Xác định chính xác các điểm đau (Pain points), điểm rơi khách hàng (Drop-off points) và thiết lập cơ chế phản hồi khép kín (Closed-loop feedback) để cải thiện sản phẩm và quy trình kinh doanh.",
    fullDescEn: "Diagnosing end-to-end customer experience health across pre-purchase, in-life, and post-service touchpoints. Pinpointing critical friction points and implementing closed-loop feedback systems.",
    iconName: "Compass",
    colorGradient: "from-cyan-600 via-blue-600 to-indigo-600",
    accentColor: "cyan",
    targetAudienceVi: "Ban điều hành, Giám đốc CX/Marketing muốn có dữ liệu thực tế về mức độ hài lòng và lòng trung thành của khách hàng.",
    targetAudienceEn: "C-Level executives & CX leaders needing factual telemetry on customer satisfaction and loyalty drivers.",
    durationVi: "3 - 6 tuần",
    durationEn: "3 - 6 weeks",
    expectedKpisVi: [
      "Tăng chỉ số Net Promoter Score (NPS) thêm +15 đến +25 điểm",
      "Giảm chỉ số nỗ lực khách hàng (Customer Effort Score - CES) 30%",
      "Tỷ lệ phản hồi khảo sát sau tương tác đạt > 25%",
      "Rút ngắn thời gian xử lý khiếu nại nghiêm trọng dưới 2 giờ"
    ],
    expectedKpisEn: [
      "Increase Net Promoter Score (NPS) by +15 to +25 points",
      "Decrease Customer Effort Score (CES) by 30%",
      "Survey response completion rate > 25%",
      "Critical dissatisfaction turnaround under 2 hours"
    ],
    deliverables: [
      {
        titleVi: "Bản đồ Hành trình Khách hàng Toàn diện (Customer Journey Map)",
        titleEn: "Comprehensive Customer Journey Map",
        descVi: "Nhận diện mọi điểm chạm, cảm xúc khách hàng và cơ hội nâng cấp trải nghiệm.",
        descEn: "Mapping all friction points, emotional highs/lows, and CX leapfrog opportunities."
      },
      {
        titleVi: "Hệ thống Khảo sát Đo lường Tự động (VoC Engine)",
        titleEn: "Automated VoC Feedback Engine",
        descVi: "Cơ chế gửi khảo sát tự động qua SMS/Zalo/Email/IVR kèm phân tích nguyên nhân gốc rễ.",
        descEn: "Automated post-interaction survey triggers with root-cause analytics."
      },
      {
        titleVi: "Lộ trình Chuyển đổi Trải nghiệm Khách hàng (CX Roadmap)",
        titleEn: "Strategic CX Transformation Roadmap",
        descVi: "Kế hoạch hành động ưu tiên theo mức độ tác động và nguồn lực doanh nghiệp.",
        descEn: "Prioritized transformation backlog based on business impact vs. implementation effort."
      }
    ],
    industriesVi: ["Tất cả các ngành nghề chú trọng giữ chân khách hàng (Subscription, Bán lẻ, Dịch vụ)"],
    industriesEn: ["All customer-centric industries (Subscription, Retail, SaaS, Services)"],
    featured: false
  }
];

export const SERVICE_WORKFLOW_STEPS = [
  {
    step: "01",
    titleVi: "Khảo Sát & Đánh Giá Hiện Trạng",
    titleEn: "Discovery & Gap Audit",
    descVi: "Phỏng vấn các bên liên quan, phân tích dữ liệu lịch sử cuộc gọi/chat, đánh giá hạ tầng công nghệ và ma trận quy trình hiện hữu.",
    descEn: "Stakeholder interviews, historical contact data analytics, infrastructure assessment, and workflow gap evaluation.",
    durationVi: "Tuần 1 - 2",
    durationEn: "Week 1 - 2"
  },
  {
    step: "02",
    titleVi: "Thiết Kế Blueprint & Chiến Lược",
    titleEn: "Blueprint & Strategy Design",
    descVi: "Hoạch định kiến trúc mục tiêu, xây dựng tài liệu quy trình chuẩn (SOPs), định biên nhân sự và thiết lập bộ chỉ số SLA/KPI cam kết.",
    descEn: "Architecture blueprinting, SOP documentation, workforce sizing, and SLA/KPI target framework modeling.",
    durationVi: "Tuần 3 - 4",
    durationEn: "Week 3 - 4"
  },
  {
    step: "03",
    titleVi: "Triển Khai Thử Nghiệm & Tinh Chỉnh",
    titleEn: "Pilot & Fine-Tuning",
    descVi: "Chạy thử nghiệm trên nhóm nhỏ người dùng, cấu hình kịch bản Bot/IVR, kiểm thử quy trình và hiệu chỉnh theo phản hồi thực tế.",
    descEn: "Controlled pilot rollout, Bot/IVR tuning, operational stress testing, and real-world feedback adjustments.",
    durationVi: "Tuần 5 - 6",
    durationEn: "Week 5 - 6"
  },
  {
    step: "04",
    titleVi: "Đào Tạo Thực Chiến & Bàn Giao",
    titleEn: "Live Training & Handover",
    descVi: "Tổ chức các workshop đào tạo đội ngũ, chuyển giao 100% tài liệu, dashboard giám sát và đưa hệ thống vào vận hành chính thức.",
    descEn: "Hands-on team masterclasses, 100% documentation transfer, live monitoring dashboards, and official Go-Live.",
    durationVi: "Tuần 7 - 8",
    durationEn: "Week 7 - 8"
  },
  {
    step: "05",
    titleVi: "Đồng Hành & Tối Ưu Liên Tục",
    titleEn: "Continuous Optimization & Review",
    descVi: "Giám sát chỉ số SLA định kỳ, đánh giá chất lượng QA, cố vấn nâng cao hiệu suất và giải quyết các bài toán phát sinh.",
    descEn: "Ongoing SLA governance, monthly QA calibration, performance coaching, and continuous scaling advisory.",
    durationVi: "Đồng hành dài hạn",
    durationEn: "Ongoing Retainer"
  }
];

export const SERVICE_FAQS = [
  {
    questionVi: "Thời gian triển khai một dự án tư vấn Contact Center trung bình là bao lâu?",
    questionEn: "How long does a standard Contact Center consulting engagement take?",
    answerVi: "Tùy thuộc vào quy mô và mức độ phức tạp, một dự án chuẩn hóa hoặc xây mới thường kéo dài từ 4 đến 12 tuần. Với các gói đào tạo chuyên biệt hoặc đánh giá hiện trạng nhanh (Quick Audit), thời gian có thể chỉ từ 1 đến 3 tuần.",
    answerEn: "Depending on scale and complexity, a greenfield or revamp project typically spans 4 to 12 weeks. Quick audits or specialized training modules can be delivered in 1 to 3 weeks."
  },
  {
    questionVi: "Doanh nghiệp tôi đã có tổng đài cũ, việc tích hợp AI hoặc chuyển đổi có gây gián đoạn không?",
    questionEn: "We already have a legacy PBX system. Will AI integration cause downtime?",
    answerVi: "Hoàn toàn không. Quy trình của chúng tôi luôn áp dụng mô hình chuyển đổi song song (Parallel Rollout) và kiểm thử độc lập, đảm bảo 100% thời gian phục vụ khách hàng liên tục mà không bị gián đoạn dù chỉ 1 phút.",
    answerEn: "Not at all. We employ parallel deployment and rigorous sandbox testing, guaranteeing 100% continuous uptime for your customer service operations."
  },
  {
    questionVi: "Cam kết bảo mật thông tin (NDA) và dữ liệu khách hàng được thực hiện như thế nào?",
    questionEn: "How are Non-Disclosure Agreements (NDA) and customer data privacy enforced?",
    answerVi: "Bảo mật là nguyên tắc tiên quyết số một. Chúng tôi ký kết thỏa thuận NDA pháp lý chặt chẽ trước khi tiếp cận bất kỳ dữ liệu nào, tuân thủ nghiêm ngặt các tiêu chuẩn an toàn thông tin ISO/IEC 27001 và GDPR.",
    answerEn: "Confidentiality is our utmost priority. We execute legally binding NDAs prior to any project access, strictly adhering to ISO/IEC 27001 and GDPR data governance standards."
  },
  {
    questionVi: "Sau khi bàn giao dự án, chuyên gia có tiếp tục hỗ trợ bảo hành hoặc cố vấn không?",
    questionEn: "Is post-handover support or ongoing retainer advisory available?",
    answerVi: "Có. Mọi gói dự án đều bao gồm tối thiểu 30-60 ngày bảo hành và đồng hành hỗ trợ sau bàn giao. Ngoài ra, doanh nghiệp có thể đăng ký gói Cố vấn Chiến lược Định kỳ (Retainer Advisory) để được cố vấn 1-on-1 hàng tháng.",
    answerEn: "Yes. Every engagement includes 30 to 60 days of post-handover warranty support. Organizations can also opt for monthly Retainer Advisory for continuous high-level guidance."
  }
];
