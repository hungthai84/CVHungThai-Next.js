export interface TuViProfileInfo {
  fullName: string;
  birthDateSolar: string;
  birthTimeSolar: string;
  birthDateLunar: string;
  birthHourLunar: string;
  zodiacSign: string;
  zodiacAnimal: string;
  elementNapAm: string;
  elementCore: string;
  cungPhi: string;
  cungMenh: string;
  menhQuai: string;
  luckyDirections: {
    name: string;
    meaning: string;
    tag: string;
  }[];
  unfavorableDirections: string[];
  luckyColors: {
    type: string;
    colors: string[];
    note: string;
  }[];
  tabooColors: string[];
  luckyNumbers: number[];
  overviewQuote: string;
  overviewSubQuote: string;
}

export const TU_VI_PROFILE: TuViProfileInfo = {
  fullName: "Nguyễn Hùng Thái",
  birthDateSolar: "22/06/1984",
  birthTimeSolar: "17:00 (Chiều)",
  birthDateLunar: "Ngày 24 tháng 5 năm Giáp Tý",
  birthHourLunar: "Giờ Quý Dậu (17h00 - 19h00)",
  zodiacSign: "Giáp Tý (1984)",
  zodiacAnimal: "Chuột (Ốc Thượng Chi Thử - Chuột trên nóc nhà)",
  elementNapAm: "Hải Trung Kim (Vàng trong biển)",
  elementCore: "Hành Kim (Đoài Kim)",
  cungPhi: "Cung Đoài (Kim) – Thuộc Tây Tứ Mệnh",
  cungMenh: "Cung Tý (Thủy dưỡng Mộc, Nạp âm Kim)",
  menhQuai: "Đoài (Tây Tứ Trạch)",
  luckyDirections: [
    { name: "Tây Bắc", meaning: "Sinh Khí", tag: "Thu hút tài lộc, thăng tiến sự nghiệp rực rỡ" },
    { name: "Tây Nam", meaning: "Thiên Y", tag: "Sức khỏe dồi dào, quý nhân nâng đỡ, tâm an trí sáng" },
    { name: "Đông Bắc", meaning: "Diên Niên", tag: "Củng cố quan hệ đối tác, đồng đội & gia đạo gắn kết" },
    { name: "Tây", meaning: "Phục Vị", tag: "Nâng cao năng lực tập trung, củng cố bản lĩnh nội tại" }
  ],
  unfavorableDirections: [
    "Đông (Tuyệt Mệnh)",
    "Nam (Ngũ Quỷ)",
    "Đông Nam (Họa Hại)",
    "Bắc (Lục Sát)"
  ],
  luckyColors: [
    { type: "Màu bản mệnh (Kim)", colors: ["Trắng", "Xám", "Ghi", "Bạc", "Ánh Kim"], note: "Tăng cường trường năng lượng tự thân và sự sắc sảo" },
    { type: "Màu tương sinh (Thổ sinh Kim)", colors: ["Vàng hoàng kim", "Vàng đất", "Nâu đất"], note: "Bồi đắp sinh khí, bệ đỡ tài lộc và sự vững vàng" }
  ],
  tabooColors: ["Đỏ", "Hồng", "Cam", "Tím đậm (Hỏa khắc Kim)"],
  luckyNumbers: [6, 7, 2, 8],
  overviewQuote: "“Giáp Tý 1984 – Hải Trung Kim: Vàng ròng lắng đọng trong lòng biển cả, nội lực thâm sâu, trọng chữ Tín, lấy Tâm làm gốc và kiên định kiến tạo giá trị dài lâu.”",
  overviewSubQuote: "“Tâm tĩnh như thủy – Trí sáng như kim – Dẫn dắt bằng dữ liệu – Thấu cảm bằng chân tình.”"
};

export interface ActionPhilosophyCard {
  id: string;
  title: string;
  description: string;
  iconType: "target" | "trending" | "heart" | "compass" | "zap" | "award";
}

export const ACTION_PHILOSOPHY_CARDS: ActionPhilosophyCard[] = [
  {
    id: "strategy",
    title: "Tư duy bằng chiến lược",
    description: "Xây dựng tầm nhìn dài hạn, định hình mô hình vận hành bền vững và dự báo chuẩn xác các xu thế chuyển dịch thị trường.",
    iconType: "target"
  },
  {
    id: "data",
    title: "Dẫn dắt bằng dữ liệu",
    description: "Mọi quyết định, cải tiến và tối ưu hóa quy trình đều dựa trên số liệu thực chứng minh bạch, khách quan và khoa học.",
    iconType: "trending"
  },
  {
    id: "heart",
    title: "Thấu cảm bằng trái tim",
    description: "Đặt trải nghiệm khách hàng và giá trị con người làm trọng tâm, lắng nghe đa chiều và thấu hiểu sâu sắc từng điểm chạm.",
    iconType: "heart"
  },
  {
    id: "truth",
    title: "Lấy chân lý làm gốc",
    description: "Mọi quyết sách đều dựa trên sự thật khách quan, dữ liệu minh bạch và giá trị đạo đức bền vững.",
    iconType: "compass"
  },
  {
    id: "action",
    title: "Lấy hành động làm đường",
    description: "Không dừng lại ở lý thuyết suông; kiên trì thực thi, tối ưu từng quy trình và từng điểm chạm mỗi ngày.",
    iconType: "zap"
  },
  {
    id: "result",
    title: "Lấy kết quả làm thước đo",
    description: "Đo lường thành công bằng sự hài lòng của khách hàng (CSAT), hiệu quả chi phí (Cost-to-Serve) và sự trưởng thành của đội ngũ.",
    iconType: "award"
  }
];

export interface WorkPersonalityTrait {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  color: string;
  description: string;
  highlights: string[];
}

export const WORK_PERSONALITY_TRAITS: WorkPersonalityTrait[] = [
  {
    id: "trait-1",
    title: "Điềm đạm, sâu sắc & quan sát toàn cục",
    subtitle: "Bản chất Hải Trung Kim tĩnh lặng nhưng thâm hậu",
    tag: "Nội Lực Thâm Sâu",
    color: "blue",
    description: "Không bộc lộ nóng vội ra bên ngoài, người Giáp Tý 1984 luôn lắng nghe, phân tích đa chiều và nhìn nhận toàn cảnh trước khi đưa ra quyết định chiến lược. Phong thái ung dung trước áp lực lớn giúp giữ vững tinh thần cho cả tập thể.",
    highlights: ["Bình tĩnh trước khủng hoảng", "Tư duy phản biện sắc sảo", "Kiên định với mục tiêu dài hạn"]
  },
  {
    id: "trait-2",
    title: "Trọng chữ tín, kỷ luật & chuẩn mực cao",
    subtitle: "Chất Kim sắc bén của nhà quản trị chuẩn hóa",
    tag: "Chính Trực & Tiêu Chuẩn",
    color: "purple",
    description: "Luôn đặt cam kết chất lượng và sự minh bạch lên hàng đầu. Trong công việc, anh đề cao tính kỷ luật, quy chuẩn hóa quy trình (SOP) và chỉ số đo lường hiệu suất (KPI/SLA) rõ ràng, tạo niềm tin tuyệt đối với lãnh đạo và đối tác.",
    highlights: ["Cam kết trách nhiệm 100%", "Chuẩn hóa quy trình vận hành", "Minh bạch số liệu & báo cáo"]
  },
  {
    id: "trait-3",
    title: "Lãnh đạo thấu cảm & thu phục lòng người",
    subtitle: "Chi Tý (Thủy) mang lại sự linh hoạt & lắng nghe",
    tag: "Empathetic Leadership",
    color: "emerald",
    description: "Dù kỷ luật nhưng không cứng nhắc, phong cách điều hành luôn hướng đến con người. Anh coi trọng việc huấn luyện (coaching), truyền cảm hứng, thấu hiểu khó khăn của nhân sự tuyến đầu và xây dựng văn hóa gắn kết bền chặt.",
    highlights: ["Lắng nghe & đồng cảm", "Đào tạo thế hệ kế thừa", "Tỷ lệ giữ chân nhân sự cao (Low Churn)"]
  },
  {
    id: "trait-4",
    title: "Tư duy tối ưu & nhạy bén công nghệ",
    subtitle: "Sự kết hợp giữa kinh nghiệm thực chiến và chuyển đổi số",
    tag: "Tối Ưu Hóa & Đổi Mới",
    color: "amber",
    description: "Khả năng nhạy bén phát hiện các điểm nghẽn (bottleneck) trong quy trình, từ đó ứng dụng công nghệ (CRM, AI Bot, Omnichannel) để tự động hóa, tối ưu chi phí vận hành (Cost-to-Serve) và nâng tầm trải nghiệm khách hàng.",
    highlights: ["Tối ưu Cost-to-Serve", "Ứng dụng AI & Tự động hóa", "Nâng tầm chỉ số CSAT/NPS"]
  }
];

export interface CorePalaceInfo {
  id: string;
  name: string;
  branch: string;
  tag: string;
  colorTheme: "purple" | "emerald" | "teal" | "blue" | "amber" | "rose";
  stars: { name: string; main: boolean }[];
  description: string;
  checkpoints: string[];
}

export const SIX_CORE_PALACES: CorePalaceInfo[] = [
  {
    id: "menh",
    name: "Cung Mệnh (Tý)",
    branch: "Tý - Thủy",
    tag: "Bản Mệnh Chi Lực",
    colorTheme: "purple",
    stars: [
      { name: "Hải Trung Kim", main: true },
      { name: "Thiên Phủ", main: false },
      { name: "Hóa Khoa", main: false }
    ],
    description: "Chủ về trí tuệ mưu lược, tư duy nhạy bén và tính cách điềm tĩnh, trọng chữ Tín. Khí chất điềm đạm, có tài quy tụ lòng người và năng lực điều hành tổng thể.",
    checkpoints: [
      "Tư duy chiến lược dài hạn",
      "Chính trực & trọng danh dự",
      "Điềm đạm trước áp lực lớn"
    ]
  },
  {
    id: "quan-loc",
    name: "Cung Quan Lộc (Thìn)",
    branch: "Thìn - Thổ",
    tag: "Sự Nghiệp Vận Hành",
    colorTheme: "emerald",
    stars: [
      { name: "Thái Âm", main: true },
      { name: "Văn Xương", main: false },
      { name: "Thiên Khôi", main: false }
    ],
    description: "Sự nghiệp gắn liền với quản trị hệ thống, dịch vụ quy mô lớn, công nghệ và chuyển đổi số. Càng dấn thân phụng sự khách hàng càng tỏa sáng rực rỡ.",
    checkpoints: [
      "Vận hành Contact Center 150+",
      "Kiến trúc CRM & AI Bot",
      "22 năm cống hiến thực chiến"
    ]
  },
  {
    id: "tai-bach",
    name: "Cung Tài Bạch (Thân)",
    branch: "Thân - Kim",
    tag: "Tài Lộc Thực Chiến",
    colorTheme: "teal",
    stars: [
      { name: "Thiên Đồng", main: true },
      { name: "Lộc Tồn", main: false },
      { name: "Hóa Lộc", main: false }
    ],
    description: "Tài lộc cộng chắc từ năng lực điều hành thực chiến và tối ưu hóa chi phí vận hành (Cost-to-Serve), tạo ra giá trị thặng dư bền vững cho tổ chức.",
    checkpoints: [
      "Tối ưu chi phí vận hành",
      "Quản trị ngân sách minh bạch",
      "Đầu tư giá trị bền vững"
    ]
  },
  {
    id: "thien-di",
    name: "Cung Thiên Di (Ngọ)",
    branch: "Ngọ - Hỏa",
    tag: "Ngoại Giao & Mở Rộng",
    colorTheme: "blue",
    stars: [
      { name: "Thất Sát", main: true },
      { name: "Thiên Mã", main: false },
      { name: "Quý Nhân", main: false }
    ],
    description: "Ra ngoài có nhiều quý nhân tương trợ, thích ứng nhanh với môi trường đa văn hóa, tập đoàn đa quốc gia và các thị trường công nghệ chuyển biến liên tục.",
    checkpoints: [
      "Hòa nhập tập đoàn lớn",
      "Kết nối đối tác chiến lược",
      "Linh hoạt ứng biến thời cuộc"
    ]
  },
  {
    id: "no-boc",
    name: "Cung Nô Bộc (Tỵ)",
    branch: "Tỵ - Hỏa",
    tag: "Đội Ngũ Nhân Sự",
    colorTheme: "amber",
    stars: [
      { name: "Tả Phù", main: true },
      { name: "Hữu Bật", main: false },
      { name: "Thiên Đức", main: false }
    ],
    description: "Đội ngũ cấp dưới đoàn kết, tôn trọng kỷ luật và luôn được truyền cảm hứng qua phong cách lãnh đạo thấu cảm (Empathetic Leadership).",
    checkpoints: [
      "Lãnh đạo truyền cảm hứng",
      "Đào tạo đội ngũ kế thừa",
      "Giữ chân nhân tài (Low Churn)"
    ]
  },
  {
    id: "phuc-duc",
    name: "Cung Phúc Đức (Dần)",
    branch: "Dần - Mộc",
    tag: "Phúc Khí & Đạo Tâm",
    colorTheme: "rose",
    stars: [
      { name: "Thiên Phúc", main: true },
      { name: "Thiên Quan", main: false },
      { name: "Long Trì", main: false }
    ],
    description: "Gốc rễ phúc đức vững bền, tâm niệm luôn đặt đạo đức nghề nghiệp và lòng nhân ái lên hàng đầu. Biến nguy thành an qua mọi giai đoạn thử thách.",
    checkpoints: [
      "Tâm sáng – Vận thông",
      "Bình diện trước biến động",
      "Lan tỏa năng lượng tích cực"
    ]
  }
];

export interface FiveElementGovernance {
  element: string;
  role: string;
  subtitle: string;
  bgColor: string;
  borderColor: string;
  iconBg: string;
  titleColor: string;
  desc: string;
}

export const FIVE_ELEMENTS_GOVERNANCE: FiveElementGovernance[] = [
  {
    element: "Kim (Bản mệnh)",
    role: "Quy chuẩn & Kỷ luật",
    subtitle: "Quy trình & Tiêu chuẩn (SOP/KPI)",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    borderColor: "border-amber-200/80 dark:border-amber-700/50",
    iconBg: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    titleColor: "text-amber-800 dark:text-amber-300",
    desc: "Nền tảng cho kỷ luật, tính chuẩn mực, hệ thống quy trình SOP sắc bén và chỉ số đo lường KPI/SLA rõ ràng, minh bạch."
  },
  {
    element: "Thủy (Tương sinh)",
    role: "Dòng chảy & Kết nối",
    subtitle: "Dữ liệu & Công nghệ AI Omnichannel",
    bgColor: "bg-sky-50 dark:bg-sky-950/30",
    borderColor: "border-sky-200/80 dark:border-sky-700/50",
    iconBg: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
    titleColor: "text-sky-800 dark:text-sky-300",
    desc: "Thủy biểu trưng cho dòng chảy dữ liệu CRM, hệ thống AI Chatbot tự động và khả năng giao tiếp lắng nghe khách hàng linh hoạt, mềm mại."
  },
  {
    element: "Mộc (Sinh sôi)",
    role: "Phát triển Con người",
    subtitle: "Đào tạo & Nuôi dưỡng Nhân tài",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    borderColor: "border-emerald-200/80 dark:border-emerald-700/50",
    iconBg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    titleColor: "text-emerald-800 dark:text-emerald-300",
    desc: "Mộc nuôi dưỡng sự trưởng thành các đội ngũ nhân sự, kiến tạo văn hóa học tập suốt đời và bồi dưỡng các thế hệ quản lý kế thừa."
  },
  {
    element: "Hỏa (Nhiệt huyết)",
    role: "Trải nghiệm & Khát vọng",
    subtitle: "Trải nghiệm Khách hàng Vượt trội (CX)",
    bgColor: "bg-rose-50 dark:bg-rose-950/30",
    borderColor: "border-rose-200/80 dark:border-rose-700/50",
    iconBg: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
    titleColor: "text-rose-800 dark:text-rose-300",
    desc: "Hỏa truyền lửa tận tâm, sự ấm áp chân thành trong từng điểm chạm dịch vụ và khát vọng phụng sự nâng tầm thương hiệu."
  },
  {
    element: "Thổ (Nền móng)",
    role: "Hạ tầng & An toàn",
    subtitle: "Hạ tầng & Giá trị Bền vững",
    bgColor: "bg-amber-50/60 dark:bg-amber-950/20",
    borderColor: "border-amber-300/60 dark:border-amber-800/40",
    iconBg: "bg-amber-600/15 text-amber-700 dark:text-amber-300",
    titleColor: "text-amber-900 dark:text-amber-200",
    desc: "Thổ là bệ đỡ hạ tầng vững chắc, cơ sở dữ liệu an toàn bảo mật và nền móng vận hành doanh nghiệp không lay chuyển."
  }
];

export interface ZodiacSynergyItem {
  id: string;
  nameVi: string;
  animalVi: string;
  icon: string;
  score: string;
  tier: "best" | "support" | "caution";
  tierLabelVi: string;
  relationshipVi: string;
  years: string;
  workplaceFitVi: string;
  deskDirectionVi: string;
  workplaceAdviceVi: string;
}

export const ZODIAC_SYNERGY_LIST: ZodiacSynergyItem[] = [
  {
    id: "ty",
    nameVi: "Tý",
    animalVi: "Chuột",
    icon: "🐭",
    score: "45% - 55%",
    tier: "caution",
    tierLabelVi: "Phân Định Rõ Quyền Hạn",
    relationshipVi: "Đồng Chi / Tự Hình",
    years: "1972, 1984, 1996, 2008, 2020",
    workplaceFitVi: "Tập đoàn / Phòng CSKH Độc lập Phân ban",
    deskDirectionVi: "Hướng Đông Nam (Sinh Khí)",
    workplaceAdviceVi: "Có cùng tư duy sắc bén nhưng dễ chồng chéo vai trò nếu cùng quản lý một mảng. Cần phân định ranh giới trách nhiệm và KPI hoàn toàn độc lập."
  },
  {
    id: "suu",
    nameVi: "Sửu",
    animalVi: "Trâu",
    icon: "🐂",
    score: "85% - 90%",
    tier: "best",
    tierLabelVi: "Lục Hợp Bền Vững",
    relationshipVi: "Lục Hợp (Tý - Sửu)",
    years: "1973, 1985, 1997, 2009, 2021",
    workplaceFitVi: "FinTech / Quản trị Vận hành BPO & Kiểm soát Chất lượng",
    deskDirectionVi: "Hướng Đông Bắc (Thiên Y)",
    workplaceAdviceVi: "Lục Hợp mang lại sự tin cậy tuyệt đối. Sửu cần mẫn, trung thực, là điểm tựa vận hành kiên định khi Giáp Tý đưa ra định hướng chiến lược."
  },
  {
    id: "dan",
    nameVi: "Dần",
    animalVi: "Hổ",
    icon: "🐯",
    score: "70% - 80%",
    tier: "support",
    tierLabelVi: "Tiên Phong Bứt Phá",
    relationshipVi: "Tương Sinh Bình Hòa",
    years: "1974, 1986, 1998, 2010, 2022",
    workplaceFitVi: "Môi trường Dự án Tăng trưởng Nhanh (Rapid Growth)",
    deskDirectionVi: "Hướng Đông (Thiên Y)",
    workplaceAdviceVi: "Dám nghĩ dám làm, quyết đoán. Rất hợp triển khai các chiến dịch Go-to-market hoặc mở rộng chi nhánh mới."
  },
  {
    id: "mao",
    nameVi: "Mão",
    animalVi: "Mèo",
    icon: "🐱",
    score: "45% - 55%",
    tier: "caution",
    tierLabelVi: "Chuẩn Hóa Văn Bản SOP",
    relationshipVi: "Tương Hình (Tý - Mão)",
    years: "1975, 1987, 1999, 2011, 2023",
    workplaceFitVi: "Phòng Thiết kế CX / Sáng tạo Độc lập",
    deskDirectionVi: "Hướng Tây (Tây Bắc)",
    workplaceAdviceVi: "Giao tiếp tinh tế nhưng cần làm việc qua tài liệu và quy trình văn bản (SOP) rõ ràng để tránh hiểu lầm trong phối hợp vận hành."
  },
  {
    id: "thin",
    nameVi: "Thìn",
    animalVi: "Rồng",
    icon: "🐲",
    score: "88% - 92%",
    tier: "best",
    tierLabelVi: "Tam Hợp Chiến Lược",
    relationshipVi: "Tam Hợp (Thân - Tý - Thìn)",
    years: "1976, 1988, 2000, 2012, 2024",
    workplaceFitVi: "Trụ sở Tập đoàn / Ban Điều hành CX Chiến lược",
    deskDirectionVi: "Hướng Tây Nam (Diên Niên)",
    workplaceAdviceVi: "Tam Hợp kinh điển! Thìn mang lại tầm nhìn quy hoạch vĩ mô, Tý chuẩn hóa thực thi tinh gọn. Sự kết hợp hoàn hảo cho các dự án quy mô lớn và chuyển đổi số."
  },
  {
    id: "ty_snake",
    nameVi: "Tỵ",
    animalVi: "Rắn",
    icon: "🐍",
    score: "75% - 85%",
    tier: "support",
    tierLabelVi: "Tương Trợ Mưu Lược",
    relationshipVi: "Tương Trợ Thực Thi & Phân Tích",
    years: "1977, 1989, 2001, 2013",
    workplaceFitVi: "Quản trị Dữ liệu Data Analytics & Kiểm soát Rủi ro",
    deskDirectionVi: "Hướng Nam (Sinh Khí)",
    workplaceAdviceVi: "Tư duy mưu lược, phân tích dữ liệu sắc bén. Rất thích hợp đảm nhận vị trí Trưởng nhóm QA/QC hoặc phân tích hành vi khách hàng."
  },
  {
    id: "ngo",
    nameVi: "Ngọ",
    animalVi: "Ngựa",
    icon: "🐴",
    score: "45% - 55%",
    tier: "caution",
    tierLabelVi: "Phân Quyền Độc Lập",
    relationshipVi: "Lục Xung (Tý - Ngọ)",
    years: "1978, 1990, 2002, 2014",
    workplaceFitVi: "Mô hình Chi nhánh / Đơn vị Kinh doanh Độc lập",
    deskDirectionVi: "Hướng Tây (Phúc Đức)",
    workplaceAdviceVi: "Tý chu toàn tỉ mỉ, Ngọ nhanh nhẹn bộc phát. Nên giao quyền độc lập theo từng dự án riêng biệt để cả hai cùng phát huy thế mạnh tối đa."
  },
  {
    id: "mui",
    nameVi: "Mùi",
    animalVi: "Dê",
    icon: "🐐",
    score: "70% - 80%",
    tier: "support",
    tierLabelVi: "Hòa Nhã Văn Hóa",
    relationshipVi: "Bình Hòa Trợ Lực",
    years: "1979, 1991, 2003, 2015",
    workplaceFitVi: "Văn hóa Doanh nghiệp & Đào tạo Huấn luyện Nhân sự",
    deskDirectionVi: "Hướng Đông Bắc (Thiên Y)",
    workplaceAdviceVi: "Khéo léo, lắng nghe tốt. Thích hợp trong vai trò Quản lý văn hóa nội bộ, Đào tạo & Chăm sóc đời sống nhân viên."
  },
  {
    id: "than",
    nameVi: "Thân",
    animalVi: "Khỉ",
    icon: "🐵",
    score: "92% - 96%",
    tier: "best",
    tierLabelVi: "Tam Hợp Đỉnh Cao",
    relationshipVi: "Tam Hợp (Thân - Tý - Thìn)",
    years: "1968, 1980, 1992, 2004, 2016",
    workplaceFitVi: "Trung tâm Omnichannel & Công nghệ AI Automation",
    deskDirectionVi: "Hướng Tây Bắc (Sinh Khí)",
    workplaceAdviceVi: "Đỉnh cao hợp tác công sở! Thân linh hoạt, nhạy bén công nghệ kết hợp với Tý sâu sắc, mưu lược tạo nên bộ đôi vận hành và bứt phá doanh số lý tưởng nhất."
  },
  {
    id: "dau",
    nameVi: "Dậu",
    animalVi: "Gà",
    icon: "🐔",
    score: "88% - 93%",
    tier: "best",
    tierLabelVi: "Tương Sinh Chuẩn Mực",
    relationshipVi: "Tương Sinh Kim - Thủy & Giờ sinh Quý Dậu",
    years: "1981, 1993, 2005, 2017",
    workplaceFitVi: "Khối Quản trị Chuẩn hóa SOP & Kiểm toán Dịch vụ CSKH",
    deskDirectionVi: "Hướng Tây (Phục Vị)",
    workplaceAdviceVi: "Kỷ luật thép, chỉn chu từng chi tiết nhỏ. Đồng điệu trong tư duy quản trị chất lượng, rất ăn ý trong việc xây dựng hệ thống báo cáo và chuẩn hóa quy trình."
  },
  {
    id: "tuat",
    nameVi: "Tuất",
    animalVi: "Chó",
    icon: "🐶",
    score: "75% - 82%",
    tier: "support",
    tierLabelVi: "Trung Thành Trụ Cột",
    relationshipVi: "Đồng Đội Tận Tụy",
    years: "1982, 1994, 2006, 2018",
    workplaceFitVi: "Khối Vận hành CSKH Call Center 24/7 & Quản lý Ca",
    deskDirectionVi: "Hướng Tây Nam (Sinh Khí)",
    workplaceAdviceVi: "Trung thành, trách nhiệm cao và bảo vệ thương hiệu tới cùng. Nhân tố trụ cột vững chắc cho các vị trí quản lý vận hành trực tiếp."
  },
  {
    id: "hoi",
    nameVi: "Hợi",
    animalVi: "Lợn",
    icon: "🐷",
    score: "72% - 80%",
    tier: "support",
    tierLabelVi: "Hòa Đồng Tích Cực",
    relationshipVi: "Đồng Hành Trợ Lực",
    years: "1983, 1995, 2007, 2019",
    workplaceFitVi: "Chăm sóc Khách hàng VIP & Hậu cần Sự kiện",
    deskDirectionVi: "Hướng Đông Nam (Phục Vị)",
    workplaceAdviceVi: "Hòa nhã, mang lại không khí tích cực cho tập thể. Cần giao mục tiêu KPI cụ thể để tối đa hóa hiệu suất làm việc."
  }
];

export const FINAL_PHILOSOPHY = {
  signatureTitle: "Câu nói cuối cùng về tuổi Giáp Tý 1984",
  coreCreed: "“Hải Trung Kim – Vàng ròng lắng đọng trong lòng biển cả: Không phô trương nhưng tích tụ tinh hoa, lấy chữ Tín làm gốc, lấy chữ Tâm làm kim chỉ nam, kiên định vượt qua mọi sóng gió để kiến tạo giá trị phụng sự trường tồn.”",
  actionPrinciple: "“Tư duy bằng chiến lược, dẫn dắt bằng dữ liệu, thấu cảm bằng trái tim – Lấy chân lý làm gốc, lấy hành động làm đường, lấy kết quả làm thước đo.”",
  actionGuidelines: [
    { title: "Tư duy bằng chiến lược", desc: "Xây dựng tầm nhìn dài hạn, định hình mô hình vận hành bền vững và dự báo chuẩn xác các xu thế chuyển dịch thị trường." },
    { title: "Dẫn dắt bằng dữ liệu", desc: "Mọi quyết định, cải tiến và tối ưu hóa quy trình đều dựa trên số liệu thực chứng minh bạch, khách quan và khoa học." },
    { title: "Thấu cảm bằng trái tim", desc: "Đặt trải nghiệm khách hàng và giá trị con người làm trọng tâm, lắng nghe đa chiều và thấu hiểu sâu sắc từng điểm chạm." },
    { title: "Lấy chân lý làm gốc", desc: "Mọi quyết sách đều dựa trên sự thật khách quan, dữ liệu minh bạch và giá trị đạo đức bền vững." },
    { title: "Lấy hành động làm đường", desc: "Không dừng lại ở lý thuyết suông; kiên trì thực thi, tối ưu từng quy trình và từng điểm chạm mỗi ngày." },
    { title: "Lấy kết quả làm thước đo", desc: "Đo lường thành công bằng sự hài lòng của khách hàng (CSAT), hiệu quả chi phí (Cost-to-Serve) và sự trưởng thành của đội ngũ." }
  ]
};
