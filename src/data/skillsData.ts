export interface SkillItem {
  id: string;
  nameVi: string;
  nameEn: string;
  percentage: number;
  asciiBar: string;
  levelVi: string;
  levelEn: string;
  descriptionVi: string;
  descriptionEn: string;
  keyHighlightsVi: string[];
  keyHighlightsEn: string[];
  tools: string[];
  iconName: string;
  yearsOfExperience?: number;
  proficiencyTier?: string;
  breakdown?: {
    practical: number;
    architecture: number;
    optimization: number;
    automation: number;
  };
}

export interface SkillGroup {
  id: string;
  code: string;
  titleVi: string;
  titleEn: string;
  subtitleVi: string;
  subtitleEn: string;
  iconName: string;
  themeColor: {
    name: string;
    accent: string;
    accentHover: string;
    borderLight: string;
    borderDark: string;
    bgLight: string;
    bgDark: string;
    badgeLight: string;
    badgeDark: string;
    barGradient: string;
    textLight: string;
    textDark: string;
  };
  skills: SkillItem[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "crm-contact-center",
    code: "A",
    titleVi: "KỸ NĂNG CHUYÊN MÔN CRM & CONTACT CENTER",
    titleEn: "CRM & CONTACT CENTER SPECIALIZED SKILLS",
    subtitleVi: "Chuyên sâu về kiến trúc hệ thống dữ liệu khách hàng, luồng vận hành Contact Center & tự động hóa",
    subtitleEn: "In-depth CRM data architecture, Contact Center workflows, omnichannel routing & automation",
    iconName: "Headphones",
    themeColor: {
      name: "azure",
      accent: "#2563eb",
      accentHover: "#1d4ed8",
      borderLight: "border-blue-200/90",
      borderDark: "dark:border-blue-800/70",
      bgLight: "bg-blue-50/70",
      bgDark: "dark:bg-blue-950/40",
      badgeLight: "bg-blue-100/90 text-blue-700 border-blue-200",
      badgeDark: "dark:bg-blue-900/60 dark:text-blue-300 dark:border-blue-700/60",
      barGradient: "from-blue-600 via-sky-500 to-cyan-400",
      textLight: "text-blue-700",
      textDark: "dark:text-blue-400",
    },
    skills: [
      {
        id: "crm-admin",
        nameVi: "Quản trị CRM",
        nameEn: "CRM Administration & Architecture",
        percentage: 95,
        asciiBar: "██████████",
        levelVi: "Chuyên gia Cấp cao (Mastery)",
        levelEn: "Senior Expert / Mastery",
        descriptionVi: "Hoạch định, triển khai và quản trị toàn diện hệ thống CRM doanh nghiệp. Phân quyền dữ liệu, tích hợp đa kênh và tối ưu hóa vòng đời khách hàng.",
        descriptionEn: "Enterprise CRM planning, implementation, and administration. Role-based security, omnichannel integration, and lifecycle optimization.",
        keyHighlightsVi: [
          "Quản trị các nền tảng Salesforce, Zendesk Support/Sell, HubSpot, Zoho CRM",
          "Thiết kế cấu trúc dữ liệu 360 độ chân dung khách hàng (Single Customer View)",
          "Bảo mật thông tin, phân quyền đa tầng và sao lưu dự phòng chuẩn quốc tế"
        ],
        keyHighlightsEn: [
          "Administered Salesforce, Zendesk, HubSpot, Zoho CRM platforms",
          "Engineered 360-degree Single Customer View data architecture",
          "Multi-tier security, RBAC permission models & enterprise backups"
        ],
        tools: ["Salesforce", "Zendesk", "HubSpot", "Zoho CRM", "SQL Server"],
        iconName: "Database",
      },
      {
        id: "data-analytics",
        nameVi: "Phân tích Dữ liệu",
        nameEn: "Data Analytics & Business Intelligence",
        percentage: 90,
        asciiBar: "█████████░",
        levelVi: "Thành thạo Xuất sắc (Advanced)",
        levelEn: "Advanced Proficiency",
        descriptionVi: "Khai thác dữ liệu vận hành cuộc gọi, phân loại lý do liên hệ (Call Driver) và chuyển đổi số liệu thô thành quyết định chiến lược.",
        descriptionEn: "Deep mining of Contact Center operational logs, call driver identification, and converting raw metrics into actionable CX strategies.",
        keyHighlightsVi: [
          "Xây dựng Dashboard thời gian thực theo dõi SLA, AHT, FCR, Abandonment Rate",
          "Phân tích tương quan giữa thời gian chờ và điểm số hài lòng CSAT/NPS",
          "Dự báo tải lượng tương tác (Forecasting & Capacity Planning) chính xác >92%"
        ],
        keyHighlightsEn: [
          "Built real-time executive dashboards for SLA, AHT, FCR, and call abandonment",
          "Correlation analysis between queue wait times and CSAT/NPS ratings",
          "Workforce forecasting & capacity modeling with >92% accuracy"
        ],
        tools: ["PowerBI", "Google Looker Studio", "Excel Pivot & DAX", "Metabase", "Python/Pandas"],
        iconName: "BarChart3",
      },
      {
        id: "behavior-analysis",
        nameVi: "Phân tích Hành vi",
        nameEn: "Customer Behavior Analysis",
        percentage: 85,
        asciiBar: "█████████░",
        levelVi: "Vận dụng Nâng cao (Proficient)",
        levelEn: "Proficient & Strategic",
        descriptionVi: "Định vị các điểm chạm (Touchpoints) gây ma sát (Friction), phân tích thói quen chuyển kênh và xu hướng rời bỏ dịch vụ (Churn risk).",
        descriptionEn: "Mapping high-friction touchpoints, channel switching behaviors, and churn propensity to formulate proactive retention interventions.",
        keyHighlightsVi: [
          "Phân tích hành vi tương tác trên App, Web Portal, Hotline và Zalo OA",
          "Xác định nguyên nhân gốc rễ (Root Cause Analysis - RCA) các phản hồi tiêu cực",
          "Thiết lập mô hình cảnh báo sớm khách hàng có nguy cơ rời dịch vụ"
        ],
        keyHighlightsEn: [
          "Cross-channel interaction mapping across mobile app, web, hotline & messaging",
          "Root Cause Analysis (RCA) on negative feedback loops and escalations",
          "Early-warning retention alerts based on repetitive friction signals"
        ],
        tools: ["Mixpanel", "Google Analytics 4", "Hotjar", "Customer Journey Maps"],
        iconName: "Brain",
      },
      {
        id: "process-design",
        nameVi: "Thiết kế Quy trình",
        nameEn: "Process Architecture & SOP Design",
        percentage: 92,
        asciiBar: "█████████░",
        levelVi: "Chuyên gia Cấp cao (Expert)",
        levelEn: "Senior Expert",
        descriptionVi: "Chuẩn hóa quy trình vận hành tiêu chuẩn (SOP), kịch bản phản hồi tình huống đặc biệt và sơ đồ luồng phối hợp liên phòng ban.",
        descriptionEn: "Standardizing SOPs, crisis response frameworks, and cross-departmental SLA workflows for lightning-fast issue resolution.",
        keyHighlightsVi: [
          "Soạn thảo >200 bộ quy trình SOP chuẩn ISO cho Contact Center 150-500 nhân sự",
          "Thiết kế luồng phân loại và leo thang khiếu nại (Escalation Matrix) 3 cấp độ",
          "Tối ưu hóa thời gian xử lý khiếu nại liên phòng từ 48h xuống dưới 12h"
        ],
        keyHighlightsEn: [
          "Authored >200 ISO-aligned SOPs for 150-500 seat Contact Center ops",
          "Designed 3-tier incident triage & escalation matrix protocols",
          "Compressed cross-functional complaint cycle time from 48h to <12h"
        ],
        tools: ["Lucidchart", "Miro", "Visio", "BPMN 2.0", "Draw.io"],
        iconName: "Workflow",
      },
      {
        id: "process-automation",
        nameVi: "Tự động hóa Quy trình",
        nameEn: "Process Automation & RPA",
        percentage: 88,
        asciiBar: "█████████░",
        levelVi: "Thành thạo Xuất sắc (Advanced)",
        levelEn: "Advanced Specialist",
        descriptionVi: "Triển khai luồng tự động tạo phiếu hỗ trợ (Auto-ticketing), phân bổ thông minh (Skill-based Routing) và kích hoạt thông báo đa kênh.",
        descriptionEn: "Deploying automated ticketing, skill-based ACD routing, webhook integrations, and multichannel instant triggers.",
        keyHighlightsVi: [
          "Tự động hóa phân loại và giao việc cho đúng kỹ thuật viên theo chuyên môn",
          "Kích hoạt SMS/Email/Zalo ZNS tự động cập nhật tiến độ xử lý cho khách hàng",
          "Cắt giảm 65% thao tác thủ công sao chép dữ liệu giữa CRM và ERP nội bộ"
        ],
        keyHighlightsEn: [
          "Automated ticket routing & assignment based on technician skillsets",
          "Auto-triggered transactional SMS/Zalo/Email status notifications to clients",
          "Eliminated 65% of manual copy-paste overhead between CRM & ERP"
        ],
        tools: ["Zapier", "Make (Integromat)", "Zendesk Triggers", "n8n", "Webhook APIs"],
        iconName: "Zap",
      },
      {
        id: "app-development",
        nameVi: "Phát triển ứng dụng",
        nameEn: "App & Tooling Development",
        percentage: 75,
        asciiBar: "████████░░",
        levelVi: "Khả năng Thực tiễn (Practitioner)",
        levelEn: "Practical Builder",
        descriptionVi: "Tự xây dựng các công cụ nội bộ, ứng dụng tra cứu kiến thức (Knowledge Base) và tích hợp API kết nối tổng đài vào giao diện CRM.",
        descriptionEn: "Developing custom internal widgets, agent knowledge bases, and API integrations connecting VoIP softphones into CRM views.",
        keyHighlightsVi: [
          "Xây dựng công cụ tra cứu thông tin sản phẩm và tính cước nhanh cho điện thoại viên",
          "Tích hợp WebRTC Softphone trực tiếp vào giao diện làm việc (Single Screen)",
          "Viết script tự động hóa kiểm tra tính sẵn sàng của tổng đài và đường truyền"
        ],
        keyHighlightsEn: [
          "Built fast agent-assist product & tariff calculation widgets",
          "Integrated WebRTC click-to-call softphones directly inside CRM views",
          "Scripted automated health-checks for SIP trunks and queue readiness"
        ],
        tools: ["React / TypeScript", "REST APIs", "WebRTC", "Node.js", "Tailwind CSS"],
        iconName: "Code2",
      },
    ],
  },
  {
    id: "leadership-management",
    code: "B",
    titleVi: "LÃNH ĐẠO, QUẢN TRỊ ĐỘI NGŨ & DỰ ÁN",
    titleEn: "LEADERSHIP, TEAM MANAGEMENT & PROJECT GOVERNANCE",
    subtitleVi: "Nghệ thuật truyền lửa, dẫn dắt đội ngũ 150-500+ nhân sự và quản trị dự án theo phương pháp Agile/Scrum",
    subtitleEn: "Inspirational leadership, scaling 150-500+ agent operations, agile delivery & high-stakes conflict resolution",
    iconName: "Users2",
    themeColor: {
      name: "violet",
      accent: "#7c3aed",
      accentHover: "#6d28d9",
      borderLight: "border-purple-200/90",
      borderDark: "dark:border-purple-800/70",
      bgLight: "bg-purple-50/70",
      bgDark: "dark:bg-purple-950/40",
      badgeLight: "bg-purple-100/90 text-purple-700 border-purple-200",
      badgeDark: "dark:bg-purple-900/60 dark:text-purple-300 dark:border-purple-700/60",
      barGradient: "from-purple-600 via-fuchsia-500 to-pink-400",
      textLight: "text-purple-700",
      textDark: "dark:text-purple-400",
    },
    skills: [
      {
        id: "team-leadership",
        nameVi: "Lãnh đạo Đội ngũ",
        nameEn: "People Leadership & Culture",
        percentage: 92,
        asciiBar: "█████████░",
        levelVi: "Chuyên gia Cấp cao (Expert)",
        levelEn: "Senior Leader",
        descriptionVi: "Xây dựng văn hóa lấy khách hàng làm trung tâm, gắn kết nhân sự và duy trì tỷ lệ gắn bó (Retention Rate) của nhân viên CSKH >85%.",
        descriptionEn: "Fostering a genuine customer-first culture, driving employee engagement, and sustaining >85% staff retention in high-stress Contact Center environments.",
        keyHighlightsVi: [
          "Quản lý trực tiếp và gián tiếp đội ngũ 150 - 500+ nhân sự vận hành 24/7",
          "Xây dựng văn hóa thấu cảm, khích lệ sáng kiến và ghi nhận thành tích minh bạch",
          "Duy trì tỷ lệ nhân viên trung thành vượt trội so với mức trung bình ngành Call Center"
        ],
        keyHighlightsEn: [
          "Led 150-500+ seat 24/7 multi-site support organizations",
          "Built a culture of empathy, psychological safety, and transparent recognition",
          "Maintained industry-leading retention rates well above call center benchmarks"
        ],
        tools: ["1-on-1 Coaching", "OKRs / KPIs", "Townhall Reviews", "Culture Building"],
        iconName: "Users",
      },
      {
        id: "project-management",
        nameVi: "Quản lý Dự án",
        nameEn: "Project Management (Agile / Waterfall)",
        percentage: 88,
        asciiBar: "█████████░",
        levelVi: "Thành thạo Xuất sắc (Advanced)",
        levelEn: "Advanced Practitioner",
        descriptionVi: "Điều phối các dự án chuyển đổi hạ tầng tổng đài, số hóa quy trình và tích hợp công nghệ đúng hạn, đúng ngân sách và đạt mục tiêu ROI.",
        descriptionEn: "Delivering telephony overhaul, digital transformation, and CRM migration projects on-time, within budget, and meeting target ROI.",
        keyHighlightsVi: [
          "Lập kế hoạch WBS, quản lý rủi ro và điều phối tài nguyên liên chức năng",
          "Triển khai thành công 12+ dự án trọng điểm từ tiếp nhận đến nghiệm thu",
          "Áp dụng linh hoạt Scrum trong phát triển công cụ nội bộ và Waterfall trong đấu thầu hạ tầng"
        ],
        keyHighlightsEn: [
          "Structured WBS, risk mitigation matrix, and cross-functional resource planning",
          "Spearheaded 12+ high-impact enterprise projects from kickoff to sign-off",
          "Combined Agile/Scrum for tooling with structured Waterfall for infra procurement"
        ],
        tools: ["Jira", "Trello", "Asana", "MS Project", "Confluence"],
        iconName: "FolderKanban",
      },
      {
        id: "talent-training",
        nameVi: "Đào tạo Nhân sự",
        nameEn: "Talent Training & Instructional Design",
        percentage: 90,
        asciiBar: "█████████░",
        levelVi: "Thành thạo Xuất sắc (Advanced)",
        levelEn: "Master Trainer",
        descriptionVi: "Thiết kế giáo trình huấn luyện chuyên sâu về kỹ năng lắng nghe thấu cảm, xử lý khủng hoảng truyền thông và nghiệp vụ sản phẩm phức tạp.",
        descriptionEn: "Designing end-to-end curriculums covering active listening, de-escalation psychology, crisis management, and technical product workflows.",
        keyHighlightsVi: [
          "Đào tạo trực tiếp và cấp chứng chỉ cho hơn 1,200 điện thoại viên & QA",
          "Xây dựng hệ thống bài test mô phỏng tình huống thực tế (Role-play Simulation)",
          "Rút ngắn thời gian đào tạo tân tuyển (Nesting Period) từ 4 tuần xuống 2 tuần"
        ],
        keyHighlightsEn: [
          "Trained and certified over 1,200 agents, team leads, and QA specialists",
          "Developed interactive role-play crisis simulation test suites",
          "Halved onboarding nesting time from 4 weeks to 2 weeks with higher first-call readiness"
        ],
        tools: ["LMS Platforms", "Role-play Labs", "Micro-learning", "QA Rubrics"],
        iconName: "GraduationCap",
      },
      {
        id: "performance-management",
        nameVi: "Quản lý Hiệu suất",
        nameEn: "Performance Management & KPI Optimization",
        percentage: 95,
        asciiBar: "██████████",
        levelVi: "Chuyên gia Cấp cao (Mastery)",
        levelEn: "Senior Expert / Mastery",
        descriptionVi: "Thiết lập hệ thống KPI đa chiều cân bằng giữa năng suất (AHT, Occupancy) và chất lượng trải nghiệm (CSAT, QA Score, FCR).",
        descriptionEn: "Architecting balanced KPI scorecards aligning operational efficiency (AHT, Occupancy) with premier customer experience metrics (CSAT, QA, FCR).",
        keyHighlightsVi: [
          "Xây dựng bộ chỉ số KPI công bằng, minh bạch gắn liền với đãi ngộ & thăng tiến",
          "Giám sát hiệu suất theo thời gian thực (Intraday Management & Real-time Adherence)",
          "Nâng tỷ lệ đạt chuẩn SLA toàn bộ phận từ 86% lên 98.2% liên tục qua các quý"
        ],
        keyHighlightsEn: [
          "Engineered transparent performance scorecards tied to incentive tiers",
          "Intraday workforce management & schedule adherence tracking",
          "Elevated departmental SLA compliance from 86% to 98.2% sustainably"
        ],
        tools: ["Scorecard 360", "WFM Teleopti / NICE", "Excel Macro", "PowerBI"],
        iconName: "TrendingUp",
      },
      {
        id: "problem-solving",
        nameVi: "Giải quyết Vấn đề",
        nameEn: "Complex Problem Solving & RCA",
        percentage: 94,
        asciiBar: "█████████░",
        levelVi: "Chuyên gia Cấp cao (Expert)",
        levelEn: "Strategic Thinker",
        descriptionVi: "Tư duy phản biện sắc bén, phân tích nguyên nhân gốc rễ theo phương pháp 5 Whys, Fishbone Diagram và đưa ra giải pháp khắc phục triệt để.",
        descriptionEn: "Sharp critical thinking utilizing 5 Whys, Ishikawa Fishbone diagrams, and data triangulation to eradicate chronic operational bottlenecks.",
        keyHighlightsVi: [
          "Xử lý các sự cố diện rộng (System Outage) gây gián đoạn dịch vụ với tổn thất tối thiểu",
          "Loại bỏ các nguyên nhân gây cuộc gọi lặp lại (Repeat Call Driver) kéo dài nhiều năm",
          "Đưa ra giải pháp cân bằng giữa lợi ích khách hàng và chi phí bảo hành của công ty"
        ],
        keyHighlightsEn: [
          "Navigated major system outage crisis comms with minimal client churn",
          "Identified and permanently resolved persistent multi-year repeat call drivers",
          "Balanced customer goodwill reimbursements against operating unit economics"
        ],
        tools: ["5-Whys", "Ishikawa Fishbone", "Pareto 80/20", "Crisis Action Playbook"],
        iconName: "Target",
      },
      {
        id: "complaint-handling",
        nameVi: "Quản lý Khiếu nại",
        nameEn: "Escalated Complaint & Crisis Resolution",
        percentage: 92,
        asciiBar: "█████████░",
        levelVi: "Chuyên gia Cấp cao (Expert)",
        levelEn: "De-escalation Master",
        descriptionVi: "Trực tiếp đàm phán, xoa dịu và giải quyết các ca khiếu nại gay gắt cấp V.I.P, cơ quan báo chí hoặc chuyển tiếp từ Ban Giám đốc.",
        descriptionEn: "Directly negotiating, de-escalating, and resolving high-severity complaints from VIP clients, press inquiries, and board-level escalations.",
        keyHighlightsVi: [
          "Giải quyết thành công 98.5% ca khiếu nại đặc biệt phức tạp không để xảy ra khủng hoảng",
          "Xây dựng quy trình bồi thường thiện chí (Goodwill Gesture Framework) chuẩn hóa",
          "Chuyển hóa khách hàng bất mãn thành đại sứ thương hiệu trung thành (Customer Advocacy)"
        ],
        keyHighlightsEn: [
          "Successfully de-escalated 98.5% of critical cases without brand damage",
          "Established standardized goodwill compensation and settlement matrices",
          "Turned dissatisfied clients into long-term brand advocates"
        ],
        tools: ["Empathy Negotiation", "Conflict Resolution", "Executive Escalation Protocols"],
        iconName: "ShieldAlert",
      },
      {
        id: "persuasive-communication",
        nameVi: "Giao tiếp Thuyết phục",
        nameEn: "Persuasive & Stakeholder Communication",
        percentage: 90,
        asciiBar: "█████████░",
        levelVi: "Thành thạo Xuất sắc (Advanced)",
        levelEn: "High-Impact Influencer",
        descriptionVi: "Khả năng trình bày thuyết phục trước Ban Giám đốc, đối tác chiến lược và đàm phán ngân sách đầu tư nâng cấp công nghệ CSKH.",
        descriptionEn: "Compelling executive storytelling, board presentations, vendor negotiations, and defending operational technology budgets.",
        keyHighlightsVi: [
          "Báo cáo định kỳ và đề xuất chiến lược trực tiếp với CEO / COO",
          "Đàm phán thành công hợp đồng cung cấp dịch vụ viễn thông & phần mềm tiết kiệm 18% chi phí",
          "Truyền tải thông điệp truyền cảm hứng tới toàn thể nhân viên trong các buổi Kick-off"
        ],
        keyHighlightsEn: [
          "Regular strategic reviews and business case presentations to CEO/COO",
          "Negotiated telecom SIP trunking & SaaS vendor contracts saving 18% annually",
          "Delivered inspiring keynote addresses at annual operational kick-offs"
        ],
        tools: ["Executive Presentations", "Storytelling with Data", "Vendor Negotiation"],
        iconName: "MessagesSquare",
      },
    ],
  },
  {
    id: "cx-collaboration",
    code: "C",
    titleVi: "PHỐI HỢP LIÊN PHÒNG & TRẢI NGHIỆM KHÁCH HÀNG",
    titleEn: "CROSS-FUNCTIONAL SYNERGY & CUSTOMER EXPERIENCE (CX)",
    subtitleVi: "Đóng vai trò cầu nối chiến lược giữa CSKH với Khối Kỹ thuật, Kinh doanh, Marketing và Ban Lãnh đạo",
    subtitleEn: "Strategic bridge connecting customer support with Tech, Sales, Marketing, and C-Suite stakeholders",
    iconName: "HeartHandshake",
    themeColor: {
      name: "emerald",
      accent: "#059669",
      accentHover: "#047857",
      borderLight: "border-emerald-200/90",
      borderDark: "dark:border-emerald-800/70",
      bgLight: "bg-emerald-50/70",
      bgDark: "dark:bg-emerald-950/40",
      badgeLight: "bg-emerald-100/90 text-emerald-700 border-emerald-200",
      badgeDark: "dark:bg-emerald-900/60 dark:text-emerald-300 dark:border-emerald-700/60",
      barGradient: "from-emerald-600 via-teal-500 to-cyan-400",
      textLight: "text-emerald-700",
      textDark: "dark:text-emerald-400",
    },
    skills: [
      {
        id: "cross-functional-alignment",
        nameVi: "Phối hợp Liên phòng ban",
        nameEn: "Cross-functional SLA & Alignment",
        percentage: 92,
        asciiBar: "█████████░",
        levelVi: "Chuyên gia Cấp cao (Expert)",
        levelEn: "Strategic Coordinator",
        descriptionVi: "Ký kết cam kết chất lượng dịch vụ nội bộ (Internal OLA/SLA) giữa CSKH, IT, Kho vận và Pháp chế để bảo đảm tốc độ xử lý xuyên suốt.",
        descriptionEn: "Forging internal OLA/SLA agreements between Support, IT Ops, Logistics, and Legal to ensure frictionless end-to-end fulfillment.",
        keyHighlightsVi: [
          "Thiết lập kênh trao đổi ưu tiên (War-room) khi có sự cố lớn ảnh hưởng đến thanh toán hoặc dịch vụ",
          "Định kỳ tổ chức hội đồng cải tiến liên phòng dựa trên dữ liệu khiếu nại thực tế",
          "Giảm 45% thời gian chờ phê duyệt hoàn tiền hoặc đổi trả hàng cho khách"
        ],
        keyHighlightsEn: [
          "Established rapid-response War Room channels for critical payment/service issues",
          "Convened recurring cross-functional councils analyzing chronic complaint data",
          "Reduced refund & return authorization turnaround times by 45%"
        ],
        tools: ["Internal OLAs", "Slack / MS Teams War Rooms", "Cross-team Retrospectives"],
        iconName: "Network",
      },
      {
        id: "customer-experience",
        nameVi: "Trải nghiệm Khách hàng (CX)",
        nameEn: "Customer Experience (CX) Mastery",
        percentage: 96,
        asciiBar: "██████████",
        levelVi: "Chuyên gia Hàng đầu (Industry Leader)",
        levelEn: "Industry Leading CX Leader",
        descriptionVi: "Hơn 22 năm kiên định với triết lý kiến tạo trải nghiệm khách hàng vượt mong đợi, biến dịch vụ khách hàng thành lợi thế cạnh tranh cốt lõi.",
        descriptionEn: "Over 22 years pioneering WOW customer experiences, transforming service departments from cost centers into brand loyalty drivers.",
        keyHighlightsVi: [
          "Hoạch định chiến lược CX toàn diện từ nhận biết, mua hàng đến hậu mãi và tái ký",
          "Xây dựng các tiêu chuẩn dịch vụ 'Vượt trên mong đợi' (WOW Moments)",
          "Đưa tỷ lệ khách hàng hài lòng tổng thể đạt đỉnh cao 94.5% - 96%"
        ],
        keyHighlightsEn: [
          "Orchestrated full-lifecycle CX roadmap from awareness to renewal",
          "Engineered actionable guidelines for creating memorable WOW service moments",
          "Drove overall customer satisfaction to record highs of 94.5% - 96%"
        ],
        tools: ["CX Strategy Framework", "Touchpoint Auditing", "Service Design Standards"],
        iconName: "Award",
      },
      {
        id: "voice-of-customer",
        nameVi: "Tiếng nói Khách hàng (VoC)",
        nameEn: "Voice of the Customer (VoC) Programs",
        percentage: 90,
        asciiBar: "█████████░",
        levelVi: "Thành thạo Xuất sắc (Advanced)",
        levelEn: "Advanced Insights Lead",
        descriptionVi: "Thu thập, phân loại và chuyển tải phản hồi khách hàng thành danh mục tính năng (Product Backlog) giúp khối Sản phẩm nâng cấp chính xác.",
        descriptionEn: "Capturing, clustering, and translating customer sentiment into prioritized product backlog inputs for Product & Tech teams.",
        keyHighlightsVi: [
          "Triển khai khảo sát CSAT sau cuộc gọi đạt tỷ lệ phản hồi >35%",
          "Phân tích cảm xúc văn bản (Sentiment Analysis) từ hàng trăm nghìn bình luận và vé hỗ trợ",
          "Đóng góp hơn 40 cải tiến tính năng sản phẩm dựa trên nhu cầu thực tế của người dùng"
        ],
        keyHighlightsEn: [
          "Deployed post-call CSAT surveys achieving >35% completed response rates",
          "Text sentiment analysis across hundreds of thousands of tickets & app reviews",
          "Channeled 40+ high-value feature improvements directly into product roadmap"
        ],
        tools: ["Qualtrics", "SurveyMonkey", "Sentiment AI", "Feedback Aggregators"],
        iconName: "Sparkles",
      },
      {
        id: "journey-mapping",
        nameVi: "Bản đồ Hành trình (CJM)",
        nameEn: "Customer Journey Mapping (CJM)",
        percentage: 88,
        asciiBar: "█████████░",
        levelVi: "Thành thạo Xuất sắc (Advanced)",
        levelEn: "Journey Architect",
        descriptionVi: "Vẽ bản đồ toàn cảnh cảm xúc, suy nghĩ và hành động của khách hàng tại từng giai đoạn; loại bỏ các rào cản ngăn cản sự hài lòng.",
        descriptionEn: "Visualizing holistic emotional, cognitive, and behavioral pathways to systematically eliminate churn catalysts and onboarding friction.",
        keyHighlightsVi: [
          "Xây dựng chi tiết 6 Persona khách hàng đặc trưng và bản đồ hành trình tương ứng",
          "Rút ngắn các bước xác thực thông tin tài khoản mà vẫn bảo đảm an toàn dữ liệu",
          "Tối ưu hóa hành trình tự phục vụ (Self-service Journey) giúp khách tự giải quyết 40% vấn đề"
        ],
        keyHighlightsEn: [
          "Architected 6 detailed customer personas with mapped omnichannel touchpoints",
          "Streamlined account verification steps while maintaining bank-grade security",
          "Optimized self-service portal pathways enabling 40% autonomous resolution"
        ],
        tools: ["Miro CJM", "Figma", "Smaply", "Service Blueprints"],
        iconName: "Compass",
      },
      {
        id: "csat-nps-governance",
        nameVi: "Quản trị Chỉ số CSAT & NPS",
        nameEn: "CSAT, NPS & CES Metrics Governance",
        percentage: 95,
        asciiBar: "██████████",
        levelVi: "Chuyên gia Cấp cao (Mastery)",
        levelEn: "Metrics Guru",
        descriptionVi: "Vận hành vòng lặp phản hồi kín (Closed-loop Feedback), tự động liên hệ lại khách hàng cho điểm thấp (Detractor) trong vòng 1 giờ.",
        descriptionEn: "Operating high-velocity closed-loop feedback systems, triggering immediate callbacks to NPS Detractors within 60 minutes.",
        keyHighlightsVi: [
          "Duy trì điểm CSAT >92% và chỉ số NPS >65 trong suốt 5 năm liên tiếp",
          "Thiết lập quy trình phục hồi dịch vụ (Service Recovery) cứu vãn 78% khách hàng bất mãn",
          "Chuẩn hóa báo cáo phân tích tác động của CSAT lên giá trị vòng đời khách hàng (LTV)"
        ],
        keyHighlightsEn: [
          "Maintained CSAT >92% and NPS >65 consistently across 5 consecutive years",
          "Service Recovery playbook successfully rescuing 78% of initial detractors",
          "Published quantitative studies connecting CSAT lifts directly to higher LTV"
        ],
        tools: ["NPS Engines", "CSAT Micro-surveys", "CES Effort Index", "Closed-loop Ops"],
        iconName: "PieChart",
      },
      {
        id: "customer-retention",
        nameVi: "Chiến lược Giữ chân Khách hàng",
        nameEn: "Customer Retention & Loyalty Strategy",
        percentage: 91,
        asciiBar: "█████████░",
        levelVi: "Chuyên gia Cấp cao (Expert)",
        levelEn: "Retention Strategist",
        descriptionVi: "Chủ động nhận diện tín hiệu sụt giảm tương tác, xây dựng chính sách tri ân và các gói hỗ trợ đặc biệt nhằm giảm tỷ lệ hủy dịch vụ.",
        descriptionEn: "Proactively detecting engagement drop-offs, tailoring VIP rewards, and engineering customized win-back offers to curtail churn.",
        keyHighlightsVi: [
          "Giảm tỷ lệ rời bỏ dịch vụ hàng tháng từ 3.2% xuống còn 1.4%",
          "Thiết kế chương trình chăm sóc khách hàng VIP và câu lạc bộ khách hàng thân thiết",
          "Phối hợp với Sales triển khai chiến dịch giữ chân khách hàng vào chu kỳ tái ký hợp đồng"
        ],
        keyHighlightsEn: [
          "Slashed monthly churn rate from 3.2% down to 1.4% through proactive interventions",
          "Designed tiered VIP customer care privileges and loyalty club schemes",
          "Partnered with Sales on renewal win-back campaigns achieving 82% retention"
        ],
        tools: ["Churn Prediction Models", "Loyalty Programs", "Account Health Scoring"],
        iconName: "ShieldCheck",
      },
    ],
  },
  {
    id: "innovation-digital",
    code: "D",
    titleVi: "ĐỔI MỚI SÁNG TẠO & CHUYỂN ĐỔI SỐ",
    titleEn: "INNOVATION & DIGITAL TRANSFORMATION",
    subtitleVi: "Tiên phong ứng dụng Trí tuệ Nhân tạo (AI), hệ thống đa kênh tích hợp và công nghệ tổng đài đám mây thế hệ mới",
    subtitleEn: "Pioneering generative AI, cloud contact centers, conversational voicebots, and modern omnichannel architectures",
    iconName: "Cpu",
    themeColor: {
      name: "amber",
      accent: "#d97706",
      accentHover: "#b45309",
      borderLight: "border-amber-200/90",
      borderDark: "dark:border-amber-800/70",
      bgLight: "bg-amber-50/70",
      bgDark: "dark:bg-amber-950/40",
      badgeLight: "bg-amber-100/90 text-amber-700 border-amber-200",
      badgeDark: "dark:bg-amber-900/60 dark:text-amber-300 dark:border-amber-700/60",
      barGradient: "from-amber-500 via-orange-500 to-rose-500",
      textLight: "text-amber-700",
      textDark: "dark:text-amber-400",
    },
    skills: [
      {
        id: "contact-center-digitalization",
        nameVi: "Chuyển đổi Số Contact Center",
        nameEn: "Contact Center Digital Modernization",
        percentage: 92,
        asciiBar: "█████████░",
        levelVi: "Chuyên gia Cấp cao (Expert)",
        levelEn: "Digital Modernizer",
        descriptionVi: "Chuyển dịch thành công hạ tầng tổng đài Analog truyền thống lên nền tảng đám mây Cloud PBX, hỗ trợ làm việc từ xa (Work From Anywhere).",
        descriptionEn: "Migrating legacy on-premise PBX systems into elastic cloud Contact Centers enabling seamless hybrid and Work From Anywhere operations.",
        keyHighlightsVi: [
          "Chuyển đổi 200+ nhân sự sang mô hình làm việc từ xa an toàn trong vòng 72 giờ",
          "Cắt giảm 30% chi phí cước viễn thông thông qua định tuyến cuộc gọi tối ưu qua SIP Trunk",
          "Bảo đảm tính sẵn sàng của tổng đài đạt 99.95% High Availability"
        ],
        keyHighlightsEn: [
          "Transitioned 200+ agents to secure Work-From-Anywhere within 72 hours",
          "Slashed telecom trunk costs by 30% via intelligent SIP routing and least-cost trunking",
          "Guaranteed 99.95% telephony platform uptime with failover redundancy"
        ],
        tools: ["Genesys Cloud", "Avaya", "Cisco Webex", "Stringee", "Cloud PBX"],
        iconName: "Layers",
      },
      {
        id: "ai-chatbot-voicebot",
        nameVi: "Ứng dụng AI Chatbot & Voicebot",
        nameEn: "AI Chatbot & Voicebot Deployment",
        percentage: 88,
        asciiBar: "█████████░",
        levelVi: "Thành thạo Xuất sắc (Advanced)",
        levelEn: "AI Solution Specialist",
        descriptionVi: "Huấn luyện kịch bản hội thoại AI, tích hợp Trợ lý ảo phản hồi 24/7 giải phóng điện thoại viên khỏi 60% các câu hỏi thường gặp lặp lại.",
        descriptionEn: "Training conversational NLP flows, deploying 24/7 AI assistants, and deflecting 60% of repetitive tier-1 queries seamlessly.",
        keyHighlightsVi: [
          "Xây dựng kho kiến thức >1,000 ý định người dùng (Intents) cho Chatbot & Voicebot",
          "Tự động giải quyết thắc mắc về kiểm tra số dư, trạng thái đơn hàng và kích hoạt dịch vụ",
          "Tỷ lệ chuyển tiếp lên người thật (Human Handover) êm ái, giữ nguyên lịch sử trao đổi"
        ],
        keyHighlightsEn: [
          "Trained knowledge graph with 1,000+ intents for conversational bots",
          "Automated self-service balance inquiries, tracking lookups, and plan renewals",
          "Zero-friction human handover preserving full conversational context"
        ],
        tools: ["Gemini 2.5 Flash", "Dialogflow", "ChatGPT Enterprise", "FPT.AI", "Zalo Bot"],
        iconName: "Bot",
      },
      {
        id: "experience-innovation",
        nameVi: "Khảo sát & Đổi mới Trải nghiệm",
        nameEn: "CX Innovation & Experimentation",
        percentage: 85,
        asciiBar: "█████████░",
        levelVi: "Vận dụng Nâng cao (Proficient)",
        levelEn: "Creative Innovator",
        descriptionVi: "Áp dụng phương pháp Design Thinking, thử nghiệm A/B Testing các mẫu lời chào và cải tiến trải nghiệm thị giác trên các kênh số.",
        descriptionEn: "Applying Design Thinking, A/B testing greeting scripts, and creating innovative visual self-service IVR menus.",
        keyHighlightsVi: [
          "Thử nghiệm menu tự phục vụ Visual IVR trên điện thoại giảm thời gian giữ máy 40s",
          "Sáng kiến thẻ bảo hành điện tử quét mã QR thay thế giấy tờ truyền thống",
          "Áp dụng cơ chế Gamification khuyến khích điện thoại viên đạt chỉ số xuất sắc"
        ],
        keyHighlightsEn: [
          "Pioneered smartphone Visual IVR menus reducing call queue times by 40s",
          "Replaced paper warranty certificates with instant QR-coded mobile passes",
          "Introduced peer gamification leaderboards boosting agent motivation"
        ],
        tools: ["Design Thinking", "A/B Testing", "Visual IVR", "Gamification Mechanics"],
        iconName: "Sparkles",
      },
      {
        id: "omnichannel-integration",
        nameVi: "Tích hợp Omnichannel Platform",
        nameEn: "Omnichannel Platform Unification",
        percentage: 94,
        asciiBar: "█████████░",
        levelVi: "Chuyên gia Cấp cao (Expert)",
        levelEn: "Omnichannel Architect",
        descriptionVi: "Hợp nhất mọi điểm chạm Hotline, Email, LiveChat, Facebook Messenger, Zalo OA về một màn hình tương tác duy nhất (Unified Inbox).",
        descriptionEn: "Unifying all channels—Hotline, Email, Chat, Messenger, and Zalo OA—into a single collaborative inbox view with universal customer context.",
        keyHighlightsVi: [
          "Loại bỏ tình trạng phân mảnh thông tin khi khách hàng liên hệ trên nhiều kênh khác nhau",
          "Tăng tốc độ phản hồi tin nhắn đầu tiên (FRT) từ 15 phút xuống dưới 60 giây",
          "Đồng bộ hóa lịch sử hội thoại xuyên suốt giữa kênh thoại và kênh văn bản"
        ],
        keyHighlightsEn: [
          "Eliminated conversational siloing when users contact across multiple channels",
          "Accelerated First Response Time (FRT) on text channels from 15m to <60s",
          "Real-time omnichannel synchronization between voice calls and chat histories"
        ],
        tools: ["Zendesk Omnichannel", "Freshdesk", "Salesforce Omni", "Pancake / Haravan"],
        iconName: "LayoutGrid",
      },
      {
        id: "lean-agile-mindset",
        nameVi: "Tư duy Đổi mới & Tinh gọn (Lean/Agile)",
        nameEn: "Lean / Agile Mindset & Continuous Improvement",
        percentage: 88,
        asciiBar: "█████████░",
        levelVi: "Thành thạo Xuất sắc (Advanced)",
        levelEn: "Agile Practitioner",
        descriptionVi: "Loại bỏ lãng phí (Muda), cải tiến liên tục theo vòng lặp Kaizen và xây dựng văn hóa làm việc linh hoạt thích ứng nhanh với biến động.",
        descriptionEn: "Eliminating operational waste (Muda), implementing Kaizen iterative cycles, and instilling agility to pivot rapidly in dynamic markets.",
        keyHighlightsVi: [
          "Tổ chức các buổi Daily Standup 10 phút đầu ca giúp tháo gỡ điểm nghẽn tức thì",
          "Đo lường và cắt giảm các bước thừa trong quy trình nhập liệu của điện thoại viên",
          "Thúc đẩy văn hóa 'Thất bại nhanh - Học hỏi nhanh' để không ngừng nâng cao chất lượng"
        ],
        keyHighlightsEn: [
          "Instituted focused 10-minute daily shift standups unblocking real-time hurdles",
          "Streamlined agent wrap-up call wrap time (ACW) by stripping redundant data fields",
          "Cultivated a fail-fast, learn-faster culture driving relentless service improvement"
        ],
        tools: ["Kaizen 5S", "Kanban Boards", "Retrospective Reviews", "Value Stream Mapping"],
        iconName: "Rocket",
      },
    ],
  },
  {
    id: "language-proficiency",
    code: "E",
    titleVi: "NĂNG LỰC NGOẠI NGỮ",
    titleEn: "LANGUAGE PROFICIENCY & GLOBAL COMMUNICATION",
    subtitleVi: "Khả năng giao tiếp chuẩn xác, thấu cảm văn hóa và kết hợp công nghệ dịch thuật AI thời gian thực",
    subtitleEn: "Accurate multicultural communication, business fluency, and real-time AI assistive multilingual workflows",
    iconName: "Globe",
    themeColor: {
      name: "rose",
      accent: "#e11d48",
      accentHover: "#be123c",
      borderLight: "border-rose-200/90",
      borderDark: "dark:border-rose-800/70",
      bgLight: "bg-rose-50/70",
      bgDark: "dark:bg-rose-950/40",
      badgeLight: "bg-rose-100/90 text-rose-700 border-rose-200",
      badgeDark: "dark:bg-rose-900/60 dark:text-rose-300 dark:border-rose-700/60",
      barGradient: "from-rose-600 via-red-500 to-pink-500",
      textLight: "text-rose-700",
      textDark: "dark:text-rose-400",
    },
    skills: [
      {
        id: "vietnamese-native",
        nameVi: "Tiếng Việt",
        nameEn: "Vietnamese (Native Speaker)",
        percentage: 100,
        asciiBar: "██████████",
        levelVi: "Tiếng mẹ đẻ (Bản ngữ hoàn hảo)",
        levelEn: "Native Fluency (100%)",
        descriptionVi: "Diễn đạt lưu loát, chuẩn mực từ ngữ hành chính, văn bản thương mại và kỹ năng đàm phán thấu cảm theo từng vùng miền Bắc - Trung - Nam.",
        descriptionEn: "Mastery of Vietnamese business prose, executive formal correspondence, and regional cultural nuance sensitivity across North, Central, and South.",
        keyHighlightsVi: [
          "Soạn thảo văn bản pháp quy, hợp đồng dịch vụ và quy chế chăm sóc khách hàng",
          "Khả năng thích ứng ngữ điệu và phương ngữ vùng miền linh hoạt khi tiếp xúc khách hàng",
          "Kỹ năng thuyết trình và đào tạo tạo động lực mạnh mẽ bằng tiếng Việt"
        ],
        keyHighlightsEn: [
          "Authored regulatory disclosures, service contracts, and institutional CX policies",
          "Adept at tailoring regional tonal subtleties across diverse client demographics",
          "Charismatic orator and inspirational trainer in native Vietnamese"
        ],
        tools: ["Hành chính thương mại", "Biên soạn SOP", "Diễn thuyết trước công chúng"],
        iconName: "Languages",
      },
      {
        id: "english-professional",
        nameVi: "Tiếng Anh",
        nameEn: "English (Professional Working Proficiency)",
        percentage: 85,
        asciiBar: "█████████░",
        levelVi: "Giao tiếp Chuyên nghiệp & Kỹ thuật",
        levelEn: "Professional Working Proficiency",
        descriptionVi: "Đọc hiểu tài liệu kỹ thuật CRM quốc tế, trao đổi email thương mại, tham gia hội thảo chuyên ngành và điều phối với chuyên gia nước ngoài.",
        descriptionEn: "Proficient in technical CRM documentation, international vendor correspondences, CX conferences, and collaborative project delivery with global partners.",
        keyHighlightsVi: [
          "Làm việc trực tiếp với các hãng phần mềm quốc tế (Salesforce, Zendesk, Cisco)",
          "Soạn thảo email và báo cáo vận hành song ngữ Anh - Việt",
          "Tham gia các khóa đào tạo và hội thảo quản trị Contact Center quốc tế"
        ],
        keyHighlightsEn: [
          "Liaised directly with global enterprise SaaS vendors (Salesforce, Zendesk, Cisco)",
          "Drafted bilingual operational reports and cross-border vendor escalation tickets",
          "Completed international Contact Center management certification modules"
        ],
        tools: ["Business English", "Technical Documentation", "Cross-cultural Meetings"],
        iconName: "Globe",
      },
      {
        id: "ai-multilingual-support",
        nameVi: "Ứng dụng AI Hỗ trợ Đa ngôn ngữ",
        nameEn: "AI Multilingual Support & Translation",
        percentage: 90,
        asciiBar: "█████████░",
        levelVi: "Thành thạo Xuất sắc (Advanced)",
        levelEn: "AI Augmented Translation",
        descriptionVi: "Ứng dụng AI dịch thuật thời gian thực và kiểm tra ngữ cảnh văn hóa, mở rộng năng lực hỗ trợ khách hàng quốc tế (Hàn, Nhật, Trung, v.v.).",
        descriptionEn: "Leveraging generative AI real-time translation and cultural context checking to support multinational customers across English, Korean, Japanese, and Chinese.",
        keyHighlightsVi: [
          "Tích hợp công cụ dịch tự động hai chiều vào cửa sổ LiveChat của điện thoại viên",
          "Chuẩn hóa câu trả lời đa ngôn ngữ với độ chính xác cao nhờ kiểm duyệt của AI",
          "Hỗ trợ phục vụ du khách và chuyên gia nước ngoài không gặp rào cản ngôn ngữ"
        ],
        keyHighlightsEn: [
          "Integrated two-way AI live translation into agent chat console windows",
          "Standardized multilingual canned responses refined by contextual LLMs",
          "Delivered barrier-free support for expatriates and international tourists"
        ],
        tools: ["DeepL Pro API", "Gemini Multi-turn Translate", "Real-time LiveChat AI"],
        iconName: "Bot",
      },
    ],
  },
];
