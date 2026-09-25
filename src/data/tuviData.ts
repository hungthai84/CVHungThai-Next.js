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
  overviewQuote: "“Giáp Tý 1984 - Hải Trung Kim: Vàng ròng lắng đọng trong lòng biển cả, nội lực thâm sâu, trọng chữ Tín, lấy Tâm làm gốc và kiên định kiến tạo giá trị dài lâu.”",
  overviewSubQuote: "Trí tuệ - Nhân tâm - Kỷ luật - Phát triển - Thành công bền vững"
};

export interface ActionPhilosophyCard {
  id: string;
  title: string;
  description: string;
  iconType: "target" | "trending" | "heart" | "compass" | "award";
}

export const ACTION_PHILOSOPHY_CARDS: ActionPhilosophyCard[] = [
  {
    id: "strategy",
    title: "Tư duy bằng chiến lược",
    description: "Xây dựng tầm nhìn dài hạn, định hình mô hình vận hành bền vững, nhìn nhận sâu sắc và dự báo chuẩn xác các xu thế chuyển dịch thị trường.",
    iconType: "target"
  },
  {
    id: "data",
    title: "Dẫn dắt bằng dữ liệu",
    description: "Mọi quyết sách, kế hoạch và điều phối đều dựa trên số liệu thực chứng minh bạch, khoa học, khách quan và chính xác.",
    iconType: "trending"
  },
  {
    id: "heart",
    title: "Thấu cảm bằng trái tim",
    description: "Đặt trải nghiệm khách hàng và con người làm trọng tâm, lắng nghe đa chiều và thấu hiểu sâu sắc từng điểm chạm dịch vụ.",
    iconType: "heart"
  },
  {
    id: "truth",
    title: "Lấy chân lý làm gốc",
    description: "Mọi quyết định đều dựa trên sự thật khách quan, chính trực, giữ trọn chữ Tín và gìn giữ giá trị đạo đức bền vững.",
    iconType: "compass"
  },
  {
    id: "result",
    title: "Lấy kết quả làm thước đo",
    description: "Đo lường thành công bằng sự hài lòng khách hàng (CSAT), hiệu quả chi phí (Cost-to-Serve) và sự trưởng thành của đội ngũ.",
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
    subtitle: "Bản chất Hải Trung Kim tĩnh lặng nhưng thâm trầm",
    tag: "Nội Lực Thâm Sâu",
    color: "blue",
    description: "Không nóng vội bộc lộ ra bên ngoài, người Giáp Tý 1984 luôn lắng nghe, phân tích đa chiều và nhìn nhận toàn cảnh trước khi đưa ra quyết định chiến lược. Phong thái vững vàng, điềm đạm và thấu suốt trong từng tình huống lớn.",
    highlights: ["Kiên định, phân tích sâu lắng", "Truyền cảm hứng điềm tĩnh", "Khí thần điềm đạm, kiên trì"]
  },
  {
    id: "trait-2",
    title: "Trọng chữ tín, kỷ luật & chuẩn mực cao",
    subtitle: "Chất Kim sắc bén của nhà quản trị chuẩn hóa",
    tag: "Chính Trực & Kỷ Luật",
    color: "purple",
    description: "Luôn đề cao chữ Tín, kỷ luật và tuân thủ các chuẩn mực đạo đức trong công việc. Luôn ưu tiên chất lượng, sự ổn định dài hạn và tạo dựng niềm tin bền chặt trong mọi mối quan hệ đối tác.",
    highlights: ["Cam kết và trách nhiệm 100%", "Chuẩn hóa quy trình vận hành", "Chính trực, công bằng, kỷ luật"]
  },
  {
    id: "trait-3",
    title: "Lãnh đạo thấu cảm & thu phục lòng người",
    subtitle: "Tư duy đồng hành, biết lắng nghe và truyền cảm hứng",
    tag: "Empathetic Leadership",
    color: "emerald",
    description: "Phong cách điều hành không áp đặt mà lấy sự thấu hiểu làm cầu nối. Dẫn dắt theo hướng đồng hành, nâng đỡ và phát triển năng lực đội ngũ; kiến tạo môi trường tin cậy và gắn kết lâu dài.",
    highlights: ["Lắng nghe & đồng hành", "Đào tạo phát triển đội ngũ", "Truyền cảm hứng, gắn kết nhân tài"]
  },
  {
    id: "trait-4",
    title: "Tư duy tối ưu & nhạy bén công nghệ",
    subtitle: "Sự kết hợp giữa kinh nghiệm thực chiến và chuyển đổi số",
    tag: "Tri Thức & Đổi Mới",
    color: "amber",
    description: "Nhạy bén nhận diện điểm nghẽn quy trình, linh hoạt ứng dụng công nghệ (CRM, AI Automation, Omnichannel) để tối ưu hóa chi phí vận hành (Cost-to-Serve) và nâng tầm trải nghiệm khách hàng.",
    highlights: ["Tối ưu Cost-to-Serve", "Ứng dụng AI & Tự động hóa", "Mạng lưới & Hệ sinh thái số"]
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
    tag: "Sao Mệnh: Thất Sát",
    colorTheme: "rose",
    stars: [
      { name: "Hải Trung Kim", main: true },
      { name: "Thất Sát", main: true },
      { name: "Thiên Phủ", main: false }
    ],
    description: "Chủ về trí tuệ, nội lực, tư duy nhạy bén và tính cách điềm tĩnh, trọng chữ Tín. Khí chất điềm đạm, dám nghĩ dám làm, tự cường và luôn hướng đến hành động thực tế.",
    checkpoints: [
      "Thực tế, quyết đoán",
      "Tư duy chiến lược",
      "Trí tuệ & chín chắn"
    ]
  },
  {
    id: "quan-loc",
    name: "Cung Quan Lộc (Thìn)",
    branch: "Thìn - Thổ",
    tag: "Sự nghiệp: Văn Khúc",
    colorTheme: "amber",
    stars: [
      { name: "Văn Khúc", main: true },
      { name: "Thái Âm", main: false },
      { name: "Thiên Khôi", main: false }
    ],
    description: "Sự nghiệp gắn liền với quản trị hệ thống, dịch vụ và kiến tạo giá trị mới. Càng đào sâu chuyên môn càng thăng tiến, phù hợp vai trò lãnh đạo, cố vấn và điều hành.",
    checkpoints: [
      "Hiệu quả Cost-to-Serve",
      "Tài chính & vận hành",
      "Phát triển con người"
    ]
  },
  {
    id: "tai-bach",
    name: "Cung Tài Bạch (Thân)",
    branch: "Thân - Kim",
    tag: "Tài Lộc Thực Kiến",
    colorTheme: "emerald",
    stars: [
      { name: "Thiên Đồng", main: true },
      { name: "Lộc Tồn", main: true },
      { name: "Hóa Lộc", main: false }
    ],
    description: "Tài lộc tăng trưởng bền vững từ năng lực điều hành thực chiến và tối ưu hóa vận hành (Cost-to-Serve), tạo ra giá trị thặng dư dài hạn cho doanh nghiệp.",
    checkpoints: [
      "Tài chính bền vững",
      "Đầu tư dài hạn",
      "Tăng trưởng ổn định"
    ]
  },
  {
    id: "thien-di",
    name: "Cung Thiên Di (Ngọ)",
    branch: "Ngọ - Hỏa",
    tag: "Ngoại giao: Quý Nhân",
    colorTheme: "blue",
    stars: [
      { name: "Thiên Mã", main: true },
      { name: "Quý Nhân", main: true },
      { name: "Hóa Quyền", main: false }
    ],
    description: "Ra ngoài có nhiều quý nhân tương trợ, thích ứng nhanh với môi trường đa văn hóa, tập đoàn đa quốc gia và thị trường công nghệ chuyển biến liên tục.",
    checkpoints: [
      "Hòa nhập quốc tế",
      "Kết nối đối tác chiến lược",
      "Mở rộng thị trường"
    ]
  },
  {
    id: "no-boc",
    name: "Cung Nô Bộc (Tỵ)",
    branch: "Tỵ - Hỏa",
    tag: "Đồng Đội: Tả Phù - Hữu Bật",
    colorTheme: "purple",
    stars: [
      { name: "Phá Quân", main: true },
      { name: "Tả Phù", main: true },
      { name: "Hữu Bật", main: false }
    ],
    description: "Đội ngũ gắn bó, đoàn kết, tương trợ lẫn nhau hiệu quả. Tinh thần cộng tác cao, cạnh tranh lành mạnh và cùng hướng tới mục tiêu chung.",
    checkpoints: [
      "Đồng đội vững mạnh",
      "Hợp tác chiến lược",
      "Phát triển bền vững"
    ]
  },
  {
    id: "phuc-duc",
    name: "Cung Phúc Đức (Dần)",
    branch: "Dần - Mộc",
    tag: "Phúc Khí: Thiên Phúc",
    colorTheme: "rose",
    stars: [
      { name: "Thiên Phúc", main: true },
      { name: "Hoa Tinh", main: false },
      { name: "Long Trì", main: false }
    ],
    description: "Gốc rễ phúc đức vững bền, tâm hồn an lạc, luôn hành thiện và giữ tâm sáng. Vận thế hanh thông, biến nguy thành an qua mọi giai đoạn thử thách.",
    checkpoints: [
      "Tâm an trí sáng",
      "Hướng thiện & nhân ái",
      "Phúc đức bền lâu"
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
    element: "Kim (Lãnh đạo)",
    role: "Lãnh đạo",
    subtitle: "Kim (Lãnh đạo)",
    bgColor: "bg-amber-50/70 dark:bg-amber-950/30",
    borderColor: "border-amber-200 dark:border-amber-700/50",
    iconBg: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    titleColor: "text-amber-800 dark:text-amber-300",
    desc: "Quy trình, tiêu chuẩn (SOP/KPI)"
  },
  {
    element: "Thủy (Công nghệ)",
    role: "Công nghệ",
    subtitle: "Thủy (Công nghệ)",
    bgColor: "bg-sky-50/70 dark:bg-sky-950/30",
    borderColor: "border-sky-200 dark:border-sky-700/50",
    iconBg: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
    titleColor: "text-sky-800 dark:text-sky-300",
    desc: "Dữ liệu & Công nghệ AI (Omnichannel)"
  },
  {
    element: "Mộc (Tăng trưởng)",
    role: "Tăng trưởng",
    subtitle: "Mộc (Tăng trưởng)",
    bgColor: "bg-emerald-50/70 dark:bg-emerald-950/30",
    borderColor: "border-emerald-200 dark:border-emerald-700/50",
    iconBg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    titleColor: "text-emerald-800 dark:text-emerald-300",
    desc: "Phát triển & mở rộng thị trường"
  },
  {
    element: "Hỏa (Nhiệt huyết)",
    role: "Nhiệt huyết",
    subtitle: "Hỏa (Nhiệt huyết)",
    bgColor: "bg-rose-50/70 dark:bg-rose-950/30",
    borderColor: "border-rose-200 dark:border-rose-700/50",
    iconBg: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
    titleColor: "text-rose-800 dark:text-rose-300",
    desc: "Truyền cảm hứng, Văn hóa (Đào tạo/Coach)"
  },
  {
    element: "Thổ (Vận hành)",
    role: "Vận hành",
    subtitle: "Thổ (Vận hành)",
    bgColor: "bg-yellow-50/70 dark:bg-yellow-950/30",
    borderColor: "border-yellow-200 dark:border-yellow-700/50",
    iconBg: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400",
    titleColor: "text-yellow-800 dark:text-yellow-300",
    desc: "Hệ thống & Cơ sở tầng (Chuỗi cung ứng)"
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
    tierLabelVi: "Tam Hợp Bình Cực",
    relationshipVi: "Tam Hợp (Thân - Tý - Thìn)",
    years: "1964, 1988, 1992, 2004, 2016",
    workplaceFitVi: "Định hướng - Hành Trình Automation",
    deskDirectionVi: "Hướng Tây Bắc (Sinh Khí)",
    workplaceAdviceVi: "Đây là các năm phù hợp, có lợi về quan hệ và phát triển. Nên hợp tác để tăng cường hiệu quả, xây dựng đội nhóm, tận dụng thế mạnh."
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
