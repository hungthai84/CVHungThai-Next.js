export interface ZodiacSynergyItem {
  id: string;
  nameVi: string;
  animalVi: string;
  relationshipVi: string;
  icon: string;
  score: string;
  tier: "best" | "support" | "luc_hop" | "caution";
  tierLabelVi: string;
  years: string;
  workplaceFitVi: string;
  deskDirectionVi: string;
  workplaceAdviceVi: string;
}

export const TU_VI_PROFILE = {
  fullName: "Nguyễn Hùng Thái",
  birthDateSolar: "22/06/1984 (Dương lịch)",
  birthDateLunar: "24/05 Giáp Tý (Âm lịch)",
  birthHourLunar: "Giờ Quý Dậu (17h00 - 19h00)",
  elementNapAm: "Hải Trung Kim (Vàng trong biển)",
  menhQuai: "Đoài Kim (Tây Tứ Mệnh)",
  canChi: "Giáp Tý (Can Giáp Mộc - Chi Tý Thủy)",
  cuc: "Kim Tứ Cục",
  cungMenh: "Tý (Hải Trung Kim)",
  thanCu: "Quan Lộc (Thìn)",
  huongTot: "Tây Bắc (Sinh Khí), Tây Nam (Thiên Y), Đông Bắc (Diên Niên), Tây (Phục Vị)",
};

export const WORK_PERSONALITY_TRAITS = [
  {
    id: "trait-1",
    title: "Tư Duy Chiến Lược & Tổng Thể",
    subtitle: "Hoạch định cấu trúc & Kiến tạo hệ thống",
    tag: "Chiến Lược",
    description: "Khả năng nhìn nhận bức tranh tổng thể đa chiều từ vận hành Call Center đến chuyển đổi số CRM, dự báo sớm rủi ro và xây dựng giải pháp tối ưu nguồn lực bền vững.",
    highlights: ["Tư duy hệ thống SOP", "Phân tích dự báo rủi ro", "Tối ưu hóa tổng chi phí"]
  },
  {
    id: "trait-2",
    title: "Kỷ Luật, Chuẩn Hóa & Đo Lường",
    subtitle: "Quản trị bằng số liệu & Quy chuẩn SLA",
    tag: "Kỷ Luật",
    description: "Lấy dữ liệu thực tế (CSAT, NPS, FCR, AHT) làm cơ sở đưa ra quyết định. Thiết lập khung kiểm soát chất lượng QA chặt chẽ, đảm bảo tính nhất quán và cam kết chuẩn dịch vụ cao nhất.",
    highlights: ["Quản trị theo dữ liệu", "Chuẩn hóa SLA > 98%", "Kiểm soát chất lượng QA"]
  },
  {
    id: "trait-3",
    title: "Thấu Cảm & Lãnh Đạo Con Người",
    subtitle: "Tận tâm đồng hành & Phát triển đội ngũ",
    tag: "Nhân Văn",
    description: "Lắng nghe sâu sắc góc nhìn của khách hàng và nhân sự. Phong cách lãnh đạo truyền cảm hứng, kiên nhẫn đào tạo nâng tầm kỹ năng cho đội ngũ 50 - 150+ thành viên.",
    highlights: ["Lắng nghe thấu cảm", "Đào tạo & Cố vấn", "Gắn kết đội ngũ vững mạnh"]
  },
  {
    id: "trait-4",
    title: "Thích Ứng Nhanh & Đổi Mới AI",
    subtitle: "Chuyển đổi số & Ứng dụng công nghệ mới",
    tag: "Đổi Mới",
    description: "Chủ động nghiên cứu và tiên phong ứng dụng Generative AI, Chatbot, Voicebot và Automation CRM vào quy trình chăm sóc khách hàng nhằm nâng cao năng suất và trải nghiệm người dùng.",
    highlights: ["Ứng dụng AI Chatbot/Voicebot", "Tự động hóa Ticket CRM", "Tiên phong đổi mới sáng tạo"]
  }
];

export const SIX_CORE_PALACES = [
  {
    id: "palace-menh",
    name: "1. Cung Mệnh (Tý)",
    tag: "Bản Thể Cốt Lõi",
    description: "Tầm nhìn chiến lược sắc bén, bản lĩnh vững vàng trong quản trị khủng hoảng vận hành và giữ vững kỷ luật thép trong chuẩn mực chất lượng dịch vụ khách hàng.",
    stars: [
      { name: "Thiên Phủ", main: true },
      { name: "Hóa Khoa", main: true },
      { name: "Tả Phụ" },
      { name: "Hữu Bật" }
    ],
    checkpoints: [
      "Bản lĩnh xử lý sự cố & khủng hoảng vận hành",
      "Giữ vững kỷ luật và chuẩn mực SLA khắt khe",
      "Khả năng chịu áp lực cao trong môi trường đa nhiệm"
    ]
  },
  {
    id: "palace-quan",
    name: "2. Cung Quan Lộc (Thìn)",
    tag: "Sự Nghiệp & Vận Hành",
    description: "Thân cư Quan Lộc - chuyên gia điều hành hệ thống Contact Center và Chăm sóc khách hàng quy mô lớn, tối ưu các chỉ số cốt lõi (CSAT, NPS, FCR, AHT) và chuẩn hóa toàn bộ SOP.",
    stars: [
      { name: "Vũ Khúc", main: true },
      { name: "Thiên Tướng", main: true },
      { name: "Quốc Ấn" },
      { name: "Tam Thai" }
    ],
    checkpoints: [
      "Quản trị vận hành Contact Center 100+ - 500+ agents",
      "Tối ưu hóa các chỉ số hiệu suất SLA, CSAT, FCR",
      "Chuẩn hóa và số hóa toàn bộ hệ thống quy trình SOP"
    ]
  },
  {
    id: "palace-tai",
    name: "3. Cung Tài Bạch (Thân)",
    tag: "Hiệu Quả & Ngân Sách",
    description: "Tối ưu hóa chi phí vận hành (OPEX), phân bổ nguồn lực thông minh giữa con người và công nghệ AI Automation, định lượng rõ ràng ROI cho từng dự án chuyển đổi số.",
    stars: [
      { name: "Liêm Trinh", main: true },
      { name: "Thiên Khôi", main: true },
      { name: "Lộc Tồn" },
      { name: "Bát Tọa" }
    ],
    checkpoints: [
      "Tối ưu chi phí vận hành & phân bổ nguồn lực",
      "Định lượng chính xác ROI các dự án công nghệ",
      "Quản trị ngân sách tài chính minh bạch, hiệu quả"
    ]
  },
  {
    id: "palace-di",
    name: "4. Cung Thiên Di (Ngọ)",
    tag: "Ngoại Giao & Đối Tác",
    description: "Năng lực kết nối và đàm phán chiến lược với các đối tác cung cấp giải pháp công nghệ, BPO quốc tế và các khối chức năng nội bộ (IT, Sales, Marketing, C-Suite).",
    stars: [
      { name: "Thái Dương", main: true },
      { name: "Thiên Việt", main: true },
      { name: "Thiên Mã" }
    ],
    checkpoints: [
      "Đàm phán chiến lược với nhà cung cấp & đối tác lớn",
      "Kết nối liên phòng ban (IT - Sales - Marketing - CS)",
      "Mở rộng hệ sinh thái dịch vụ khách hàng đa kênh"
    ]
  },
  {
    id: "palace-no",
    name: "5. Cung Nô Bộc (Tỵ)",
    tag: "Quản Trị Nhân Sự",
    description: "Xây dựng và phát triển đội ngũ nhân sự gắn kết, đào tạo các thế hệ Leader kế cận tài năng, duy trì tỷ lệ gắn kết nhân sự (Retention Rate) cao và văn hóa hỗ trợ lẫn nhau.",
    stars: [
      { name: "Thiên Đồng", main: true },
      { name: "Ân Quang" },
      { name: "Thiên Quý" }
    ],
    checkpoints: [
      "Đào tạo và phát triển đội ngũ quản lý cấp trung",
      "Duy trì tỷ lệ giữ chân nhân sự (Retention) xuất sắc",
      "Xây dựng văn hóa đội ngũ chuyên nghiệp, thấu cảm"
    ]
  },
  {
    id: "palace-phuc",
    name: "6. Cung Phúc Đức (Dần)",
    tag: "Văn Hóa & Bền Vững",
    description: "Kiến tạo giá trị cốt lõi lấy khách hàng làm trọng tâm (Customer-Centric), đảm bảo sự phát triển bền vững, uy tín thương hiệu và chất lượng dịch vụ dài lâu cho tổ chức.",
    stars: [
      { name: "Tử Vi", main: true },
      { name: "Thiên Đức" },
      { name: "Phúc Đức" }
    ],
    checkpoints: [
      "Kiến tạo văn hóa doanh nghiệp lấy khách hàng làm gốc",
      "Xây dựng uy tín thương hiệu dịch vụ bền vững",
      "Cam kết giá trị dài hạn cho đối tác và tổ chức"
    ]
  }
];

export const FIVE_ELEMENTS_GOVERNANCE = [
  {
    element: "Kim",
    subtitle: "Kỷ Luật & Tiêu Chuẩn SLA",
    desc: "Quy chuẩn SOP rõ ràng, sắc bén, kiểm soát chất lượng QA minh bạch và chính xác tuyệt đối.",
    bgColor: "bg-amber-500/10 dark:bg-amber-950/30",
    borderColor: "border-amber-500/30 dark:border-amber-500/40",
    iconBg: "bg-amber-500/20 text-amber-800 dark:text-amber-300",
    titleColor: "text-amber-800 dark:text-amber-300"
  },
  {
    element: "Thủy",
    subtitle: "Linh Hoạt & Đa Kênh Omni",
    desc: "Thích ứng nhanh nhạy, luân chuyển luồng tương tác mượt mà giữa Hotline, Chat, Ticket và Social.",
    bgColor: "bg-blue-500/10 dark:bg-blue-950/30",
    borderColor: "border-blue-500/30 dark:border-blue-500/40",
    iconBg: "bg-blue-500/20 text-blue-800 dark:text-blue-300",
    titleColor: "text-blue-800 dark:text-blue-300"
  },
  {
    element: "Mộc",
    subtitle: "Phát Triển & Đào Tạo Con Người",
    desc: "Nuôi dưỡng nhân tài, xây dựng lộ trình thăng tiến rõ ràng cho từng chuyên viên chăm sóc khách hàng.",
    bgColor: "bg-emerald-500/10 dark:bg-emerald-950/30",
    borderColor: "border-emerald-500/30 dark:border-emerald-500/40",
    iconBg: "bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
    titleColor: "text-emerald-800 dark:text-emerald-300"
  },
  {
    element: "Hỏa",
    subtitle: "Nhiệt Huyết & Động Lực Đội Ngũ",
    desc: "Truyền cảm hứng, duy trì năng lượng tích cực và tạo môi trường làm việc năng động, thăng hoa.",
    bgColor: "bg-rose-500/10 dark:bg-rose-950/30",
    borderColor: "border-rose-500/30 dark:border-rose-500/40",
    iconBg: "bg-rose-500/20 text-rose-800 dark:text-rose-300",
    titleColor: "text-rose-800 dark:text-rose-300"
  },
  {
    element: "Thổ",
    subtitle: "Nền Tảng Cơ Sở & Hệ Thống CRM",
    desc: "Xây dựng hạ tầng dữ liệu vững chắc, bảo mật thông tin và tạo điểm tựa ổn định cho toàn bộ vận hành.",
    bgColor: "bg-amber-600/10 dark:bg-amber-900/30",
    borderColor: "border-amber-600/30 dark:border-amber-600/40",
    iconBg: "bg-amber-600/20 text-amber-900 dark:text-amber-200",
    titleColor: "text-amber-900 dark:text-amber-200"
  }
];

export const ZODIAC_SYNERGY_LIST: ZodiacSynergyItem[] = [
  {
    id: "than",
    nameVi: "Thân",
    animalVi: "Khỉ",
    relationshipVi: "Tam Hợp (Thân - Tý - Thìn)",
    icon: "🐒",
    score: "98%",
    tier: "best",
    tierLabelVi: "Tam Hợp Đỉnh Cao",
    years: "1980, 1992, 2004, 2016",
    workplaceFitVi: "Phối hợp chiến lược, điều hành dự án lớn, phát triển kinh doanh và đột phá sáng tạo công nghệ.",
    deskDirectionVi: "Tây Nam hoặc Tây Bắc",
    workplaceAdviceVi: "Bộ đôi ăn ý vượt bậc: Tuổi Thân nhanh nhẹn, sáng tạo kết hợp cùng tuổi Tý thâm sâu, quyết đoán tạo nên sức mạnh vận hành vô song."
  },
  {
    id: "thin",
    nameVi: "Thìn",
    animalVi: "Rồng",
    relationshipVi: "Tam Hợp (Thân - Tý - Thìn)",
    icon: "🐲",
    score: "96%",
    tier: "best",
    tierLabelVi: "Tam Hợp Quyền Lực",
    years: "1976, 1988, 2000, 2012",
    workplaceFitVi: "Lãnh đạo cấp cao, hoạch định chiến lược vĩ mô, mở rộng thị trường và quản lý rủi ro quy mô lớn.",
    deskDirectionVi: "Đông Nam hoặc Đông Bắc",
    workplaceAdviceVi: "Tuổi Thìn mang uy thế và tầm nhìn rộng lớn kết hợp cùng sự cẩn trọng, kỷ luật của tuổi Tý giúp dự án luôn đạt thành tựu rực rỡ."
  },
  {
    id: "suu",
    nameVi: "Sửu",
    animalVi: "Trâu",
    relationshipVi: "Lục Hợp (Tý - Sửu)",
    icon: "🐮",
    score: "95%",
    tier: "luc_hop",
    tierLabelVi: "Lục Hợp Bền Vững",
    years: "1973, 1985, 1997, 2009",
    workplaceFitVi: "Vận hành chi tiết, kiểm soát chất lượng QA, tài chính kế toán và quản lý cơ sở dữ liệu.",
    deskDirectionVi: "Đông Bắc hoặc Bắc",
    workplaceAdviceVi: "Sự kiên nhẫn, bền bỉ của tuổi Sửu bổ trợ hoàn hảo cho tư duy chiến lược của tuổi Tý, xây dựng nền tảng vững chắc không thể lay chuyển."
  },
  {
    id: "hoi",
    nameVi: "Hợi",
    animalVi: "Heo",
    relationshipVi: "Tam Hội (Hợi - Tý - Sửu)",
    icon: "🐷",
    score: "90%",
    tier: "support",
    tierLabelVi: "Tam Hội Tương Trợ",
    years: "1971, 1983, 1995, 2007",
    workplaceFitVi: "Chăm sóc khách hàng, văn hóa doanh nghiệp, nhân sự và gắn kết cộng đồng nội bộ.",
    deskDirectionVi: "Tây Bắc hoặc Tây",
    workplaceAdviceVi: "Tuổi Hợi hòa nhã, nhân hậu giúp làm dịu áp lực, tăng cường sự thấu hiểu và tạo không khí làm việc tràn đầy năng lượng tích cực."
  },
  {
    id: "dau",
    nameVi: "Dậu",
    animalVi: "Gà",
    relationshipVi: "Tương Sinh Đồng Hành",
    icon: "🐔",
    score: "88%",
    tier: "support",
    tierLabelVi: "Tương Sinh Kim - Thủy",
    years: "1981, 1993, 2005, 2017",
    workplaceFitVi: "Đào tạo kỹ năng mềm, thuyết trình, truyền thông nội bộ và kiểm soát quy chuẩn SOP.",
    deskDirectionVi: "Chính Tây hoặc Tây Bắc",
    workplaceAdviceVi: "Tuổi Dậu sắc sảo, cẩn thận từng chi tiết giúp tinh chỉnh các quy trình dịch vụ đạt độ hoàn mỹ cao nhất."
  },
  {
    id: "tuat",
    nameVi: "Tuất",
    animalVi: "Chó",
    relationshipVi: "Bình Hòa Tương Hỗ",
    icon: "🐶",
    score: "85%",
    tier: "support",
    tierLabelVi: "Bình Hòa Tin Cậy",
    years: "1982, 1994, 2006, 2018",
    workplaceFitVi: "Bảo mật hệ thống, an ninh thông tin, giám sát tuân thủ chính sách và bảo vệ dữ liệu.",
    deskDirectionVi: "Tây Bắc hoặc Đông Bắc",
    workplaceAdviceVi: "Sự trung thành và tinh thần trách nhiệm cao của tuổi Tuất là điểm tựa đáng tin cậy trong các dự án đòi hỏi tính bảo mật."
  },
  {
    id: "ty",
    nameVi: "Tý",
    animalVi: "Chuột",
    relationshipVi: "Đồng Mệnh Tương Hợp",
    icon: "🐭",
    score: "86%",
    tier: "support",
    tierLabelVi: "Đồng Điệu Tư Duy",
    years: "1972, 1984, 1996, 2008",
    workplaceFitVi: "Nghiên cứu thị trường, phân tích dữ liệu chuyên sâu và hoạch định chỉ số KPI/SLA.",
    deskDirectionVi: "Chính Bắc hoặc Tây Bắc",
    workplaceAdviceVi: "Cùng tần số tư duy và nhạy bén thông tin; cần phân chia rõ vai trò để tránh trùng lặp thế mạnh."
  },
  {
    id: "ty_snake",
    nameVi: "Tỵ",
    animalVi: "Rắn",
    relationshipVi: "Tương Trợ Linh Hoạt",
    icon: "🐍",
    score: "82%",
    tier: "support",
    tierLabelVi: "Linh Hoạt Biến Hóa",
    years: "1977, 1989, 2001, 2013",
    workplaceFitVi: "Xử lý khiếu nại phức tạp, đàm phán hợp đồng khó và xử lý khủng hoảng truyền thông.",
    deskDirectionVi: "Đông Nam hoặc Tây Nam",
    workplaceAdviceVi: "Tuổi Tỵ khôn khéo và sâu sắc, phối hợp tốt trong các tình huống đòi hỏi nghệ thuật ứng biến tinh tế."
  },
  {
    id: "dan",
    nameVi: "Dần",
    animalVi: "Hổ",
    relationshipVi: "Bình Hòa Phát Triển",
    icon: "🐯",
    score: "80%",
    tier: "support",
    tierLabelVi: "Bình Hòa Năng Động",
    years: "1974, 1986, 1998, 2010",
    workplaceFitVi: "Tiên phong khai phá thị trường mới, phát động phong trào và triển khai chiến dịch ngắn hạn.",
    deskDirectionVi: "Đông Bắc hoặc Tây Bắc",
    workplaceAdviceVi: "Tuổi Dần xông xáo kết hợp cùng tuổi Tý cẩn trọng lập kế hoạch sẽ mang lại kết quả bứt phá."
  },
  {
    id: "mao",
    nameVi: "Mão",
    animalVi: "Mèo",
    relationshipVi: "Hình Khắc Nhẹ (Cần Thấu Hiểu)",
    icon: "🐱",
    score: "70%",
    tier: "caution",
    tierLabelVi: "Cần Phối Hợp Khéo",
    years: "1975, 1987, 1999, 2011",
    workplaceFitVi: "Thiết kế sáng tạo UI/UX, hỗ trợ văn phòng và truyền thông thị giác.",
    deskDirectionVi: "Chính Đông hoặc Tây Nam",
    workplaceAdviceVi: "Cần giao tiếp cởi mở và minh bạch trong phân công nhiệm vụ để phát huy tối đa sở trường mỗi bên."
  },
  {
    id: "mui",
    nameVi: "Mùi",
    animalVi: "Dê",
    relationshipVi: "Tương Hại Nhẹ (Cần Nhường Nhịn)",
    icon: "🐑",
    score: "68%",
    tier: "caution",
    tierLabelVi: "Cần Tôn Trọng Khác Biệt",
    years: "1979, 1991, 2003, 2015",
    workplaceFitVi: "Hậu cần sự kiện, chăm sóc đời sống nhân viên và hỗ trợ hành chính tổng vụ.",
    deskDirectionVi: "Tây Nam hoặc Tây",
    workplaceAdviceVi: "Tập trung vào thế mạnh chuyên môn của từng người và thống nhất mục tiêu chung ngay từ đầu."
  },
  {
    id: "ngo",
    nameVi: "Ngọ",
    animalVi: "Ngựa",
    relationshipVi: "Tứ Hành Xung (Tý - Ngọ)",
    icon: "🐴",
    score: "65%",
    tier: "caution",
    tierLabelVi: "Tứ Hành Xung - Bổ Khuyết",
    years: "1978, 1990, 2002, 2014",
    workplaceFitVi: "Công tác thị trường bên ngoài, tìm kiếm khách hàng mới, độc lập tác chiến.",
    deskDirectionVi: "Tây Nam hoặc Đông Bắc",
    workplaceAdviceVi: "Hai thái cực bổ trợ nếu biết lắng nghe: Tuổi Ngọ hướng ngoại tốc độ, tuổi Tý hướng nội chiều sâu - tạo thành cặp bài trùng nếu tôn trọng nguyên tắc hợp tác."
  }
];

export const ACTION_PHILOSOPHY_CARDS = [
  {
    id: "phil-1",
    iconType: "target",
    title: "Lấy Khách Hàng Làm Trọng Tâm",
    description: "Mọi quy trình, cải tiến công nghệ và quyết định vận hành đều bắt nguồn từ nhu cầu thực và sự hài lòng bền vững của khách hàng."
  },
  {
    id: "phil-2",
    iconType: "trending",
    title: "Quản Trị Bằng Dữ Liệu Thực Tế",
    description: "Đo lường chi tiết từng chỉ số CSAT, NPS, FCR, AHT và SLA để đưa ra quyết định tối ưu chuẩn xác, không cảm tính."
  },
  {
    id: "phil-3",
    iconType: "heart",
    title: "Lắng Nghe & Thấu Cảm Sâu Sắc",
    description: "Dịch vụ xuất sắc được tạo nên từ sự đồng cảm chân thành với nỗi đau của người dùng và sự thấu hiểu khó khăn của đội ngũ tuyến đầu."
  },
  {
    id: "phil-4",
    iconType: "compass",
    title: "Tiên Phong Đổi Mới Công Nghệ AI",
    description: "Không ngừng cập nhật xu hướng công nghệ mới, tự động hóa quy trình để nâng cao năng suất và giải phóng sức sáng tạo của nhân sự."
  },
  {
    id: "phil-5",
    iconType: "award",
    title: "Giữ Trọn Chữ Tín & Đạo Đức Nghề",
    description: "Cam kết đồng hành trách nhiệm, minh bạch thông tin và kiên định kiến tạo giá trị dài hạn cho tổ chức và đối tác."
  },
  {
    id: "phil-6",
    iconType: "bar-chart",
    title: "Lấy kết quả làm thước đo",
    description: "Đo lường thành công bằng sự hài lòng của khách hàng (CSAT), hiệu quả chi phí (Cost-to-Serve), sự trưởng thành của đội ngũ."
  }
];
