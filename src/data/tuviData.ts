export interface TuViProfile {
  fullName: string;
  birthDateSolar: string;
  birthDateLunar: string;
  birthHourLunar: string;
  elementNapAm: string;
  menhQuai: string;
  menhCung: string;
  cucVan: string;
}

export interface WorkPersonalityTrait {
  id: string;
  title: string;
  tag: string;
  subtitle: string;
  description: string;
  highlights: string[];
}

export interface PalaceStar {
  name: string;
  main: boolean;
}

export interface PalaceItem {
  id: string;
  name: string;
  tag: string;
  description: string;
  stars: PalaceStar[];
  checkpoints: string[];
}

export interface FiveElementGovernance {
  element: string;
  subtitle: string;
  desc: string;
  bgColor: string;
  borderColor: string;
  iconBg: string;
  titleColor: string;
}

export interface ZodiacSynergyItem {
  id: string;
  nameVi: string;
  animalVi: string;
  icon: string;
  tier: "best" | "support" | "luc_hop" | "caution";
  tierLabelVi: string;
  score: string;
  relationshipVi: string;
  years: string;
  workplaceFitVi: string;
  deskDirectionVi: string;
  workplaceAdviceVi: string;
}

export interface ActionPhilosophyCard {
  id: string;
  title: string;
  description: string;
  iconType: "target" | "trending" | "heart" | "compass" | "award";
}

export const TU_VI_PROFILE: TuViProfile = {
  fullName: "Nguyễn Hùng Thái",
  birthDateSolar: "17/06/1984 (Dương lịch)",
  birthDateLunar: "18/05 Giáp Tý (Âm lịch)",
  birthHourLunar: "Giờ Quý Dậu (17h - 19h)",
  elementNapAm: "Hải Trung Kim (Vàng trong biển)",
  menhQuai: "Đoài Kim (Tây Tứ Mệnh)",
  menhCung: "Cung Tý • Thân cư Quan Lộc (Thìn)",
  cucVan: "Kim Tứ Cục (Khởi vận năm 4 tuổi)",
};

export const WORK_PERSONALITY_TRAITS: WorkPersonalityTrait[] = [
  {
    id: "trait-1",
    title: "Tư duy Chiến lược & Quản trị Hệ thống",
    tag: "Kiến tạo nền tảng",
    subtitle: "Lập trình quy trình chuẩn mực, tự động hóa dòng chảy công việc",
    description: "Khả năng nhìn thấu bức tranh tổng thể và chia nhỏ mục tiêu thành các chỉ số hành động rõ ràng (KPI/SLA). Luôn xây dựng nền móng vững chắc trước khi mở rộng quy mô (Scale-up).",
    highlights: ["Quy chuẩn SOP chuẩn quốc tế", "Dự báo WFM theo khoa học dữ liệu", "Thiết lập SLA đa kênh"],
  },
  {
    id: "trait-2",
    title: "Lãnh đạo Đồng cảm & Truyền cảm hứng",
    tag: "Tâm thế phụng sự",
    subtitle: "Thấu hiểu nhân tâm, khơi dậy tiềm năng từng cá nhân",
    description: "Lãnh đạo bằng sự chân thành, lắng nghe thấu đáo và trao quyền có kiểm soát. Xây dựng môi trường làm việc tích cực, nơi mọi thành viên cảm thấy được tôn trọng và ghi nhận xứng đáng.",
    highlights: ["Giảm tỷ lệ nghỉ việc 45%", "Đào tạo cố vấn 1-1 chuyên sâu", "Văn hóa phản hồi cởi mở"],
  },
  {
    id: "trait-3",
    title: "Hành động Quyết đoán & Thực thi Kỷ luật",
    tag: "Hiệu quả đo lường",
    subtitle: "Nói đi đôi với làm, hướng đến kết quả thực chất",
    description: "Kỷ luật thép trong tuân thủ cam kết chất lượng dịch vụ. Luôn có phương án dự phòng cho mọi rủi ro vận hành và quyết đoán ra quyết định trong thời khắc khủng hoảng.",
    highlights: ["Sẵn sàng ứng cứu sự cố 24/7", "Đo lường kết quả theo thời gian thực", "Kiểm soát chi phí chặt chẽ"],
  },
  {
    id: "trait-4",
    title: "Đổi mới Sáng tạo & Thích ứng Công nghệ",
    tag: "Tiên phong chuyển đổi",
    subtitle: "Không ngừng ứng dụng AI, Automation để bứt phá",
    description: "Nhạy bén với các xu hướng công nghệ mới nổi. Chủ động ứng dụng GenAI Chatbot, Speech Analytics và CRM thông minh để giải phóng sức lao động con người và tối ưu trải nghiệm khách hàng.",
    highlights: ["Ứng dụng AI Chatbot tự phục vụ", "Tối ưu hóa hành trình số Omni", "Liên tục học hỏi và thử nghiệm"],
  },
];

export const SIX_CORE_PALACES: PalaceItem[] = [
  {
    id: "palace-menh",
    name: "Cung Mệnh (Tý)",
    tag: "Bản lĩnh nội tại",
    description: "Chủ về tính cách kiên định, trọng chữ tín, tư duy phân tích sắc bén và khả năng chịu áp lực cao trong môi trường nhiều biến động.",
    stars: [
      { name: "Thiên Đồng", main: true },
      { name: "Thái Âm", main: true },
      { name: "Hóa Khoa", main: false },
      { name: "Tả Phù", main: false },
    ],
    checkpoints: ["Tâm định như núi trước sóng gió", "Trí tuệ minh triết trong giải quyết tranh chấp", "Chính trực và liêm chính tuyệt đối"],
  },
  {
    id: "palace-quan",
    name: "Cung Quan Lộc (Thìn)",
    tag: "Thân cư Quan",
    description: "Thân cư Quan Lộc thể hiện sự tận tâm và cống hiến hết mình cho sự nghiệp quản trị. Nắm giữ vai trò trụ cột trong việc thiết lập và vận hành các bộ máy lớn.",
    stars: [
      { name: "Thiên Cơ", main: true },
      { name: "Thiên Lương", main: true },
      { name: "Hóa Quyền", main: false },
      { name: "Văn Khúc", main: false },
    ],
    checkpoints: ["Kiến trúc sư hệ thống dịch vụ", "Khả năng điều phối liên phòng ban vượt trội", "Kiên trì theo đuổi mục tiêu dài hạn"],
  },
  {
    id: "palace-tai",
    name: "Cung Tài Bạch (Thân)",
    tag: "Quản trị dòng tiền",
    description: "Chủ về khả năng quản lý ngân sách vận hành tối ưu, biến trung tâm chi phí thành trung tâm sinh lời và mang lại giá trị thặng dư bền vững.",
    stars: [
      { name: "Cự Môn", main: true },
      { name: "Thái Dương", main: true },
      { name: "Lộc Tồn", main: false },
      { name: "Hữu Bật", main: false },
    ],
    checkpoints: ["Tối ưu OPEX lên đến 35%", "Đo lường ROI cho từng dự án công nghệ", "Phát triển dòng doanh thu từ CSKH"],
  },
  {
    id: "palace-thien-di",
    name: "Cung Thiên Di (Ngọ)",
    tag: "Giao thiệp & Đối ngoại",
    description: "Khả năng thích ứng nhanh trong các môi trường đa văn hóa, xây dựng mối quan hệ đối tác tin cậy với các nhà cung cấp giải pháp hàng đầu thế giới.",
    stars: [
      { name: "Văn Xương", main: false },
      { name: "Thiên Khôi", main: false },
      { name: "Thiên Việt", main: false },
    ],
    checkpoints: ["Đàm phán hợp đồng cung cấp dịch vụ", "Giao tiếp đối ngoại chuẩn mực", "Mở rộng mạng lưới kết nối chiến lược"],
  },
  {
    id: "palace-no-boc",
    name: "Cung Nô Bộc (Tỵ)",
    tag: "Đồng đội & Nhân sự",
    description: "Hội tụ nhiều sao phò tá, thể hiện sự được lòng cấp dưới, thu hút nhân tài và đào tạo ra nhiều thế hệ quản lý kế cận xuất sắc.",
    stars: [
      { name: "Thiên Tướng", main: true },
      { name: "Thiên Hỷ", main: false },
      { name: "Đào Hoa", main: false },
    ],
    checkpoints: ["Xây dựng đội ngũ kế thừa vững mạnh", "Gắn kết đội nhóm trên 500 nhân sự", "Tôn trọng và nâng đỡ cộng sự"],
  },
  {
    id: "palace-phuc-duc",
    name: "Cung Phúc Đức (Dần)",
    tag: "Nền tảng tâm đức",
    description: "Cốt lõi lấy nhân tâm làm gốc rễ. Làm việc gì cũng đặt lợi ích khách hàng và giá trị nhân văn lên hàng đầu, tạo phước lành lâu dài.",
    stars: [
      { name: "Tử Vi", main: true },
      { name: "Thiên Phủ", main: true },
      { name: "Quang Quý", main: false },
    ],
    checkpoints: ["Lấy chữ Tâm dẫn đường chữ Tài", "Trách nhiệm xã hội và cộng đồng", "Lan tỏa năng lượng tích cực"],
  },
];

export const FIVE_ELEMENTS_GOVERNANCE: FiveElementGovernance[] = [
  {
    element: "Kim (Tài Chính & Kỷ Luật)",
    subtitle: "Chính xác & Rõ ràng",
    desc: "Quy chuẩn hóa toàn bộ chỉ số KPI, ngân sách, hợp đồng và chính sách minh bạch.",
    bgColor: "bg-amber-500/10 dark:bg-amber-950/20",
    borderColor: "border-amber-500/30",
    iconBg: "bg-amber-500/20 text-amber-700 dark:text-amber-300",
    titleColor: "text-amber-800 dark:text-amber-300",
  },
  {
    element: "Mộc (Phát Triển Nhân Sự)",
    subtitle: "Nuôi dưỡng & Nảy mầm",
    desc: "Đào tạo liên tục, xây dựng lộ trình thăng tiến và chăm sóc sức khỏe tinh thần cho đội ngũ.",
    bgColor: "bg-emerald-500/10 dark:bg-emerald-950/20",
    borderColor: "border-emerald-500/30",
    iconBg: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    titleColor: "text-emerald-800 dark:text-emerald-300",
  },
  {
    element: "Thủy (Dòng Chảy Quy Trình)",
    subtitle: "Linh hoạt & Uyển chuyển",
    desc: "Tối ưu hóa quy trình liên phòng ban không điểm nghẽn, thích ứng nhanh với khủng hoảng.",
    bgColor: "bg-cyan-500/10 dark:bg-cyan-950/20",
    borderColor: "border-cyan-500/30",
    iconBg: "bg-cyan-500/20 text-cyan-700 dark:text-cyan-300",
    titleColor: "text-cyan-800 dark:text-cyan-300",
  },
  {
    element: "Hỏa (Nhiệt Huyết & Đổi Mới)",
    subtitle: "Đột phá & Tiên phong",
    desc: "Ứng dụng công nghệ mới AI, truyền lửa đam mê phục vụ khách hàng từ trái tim.",
    bgColor: "bg-rose-500/10 dark:bg-rose-950/20",
    borderColor: "border-rose-500/30",
    iconBg: "bg-rose-500/20 text-rose-700 dark:text-rose-300",
    titleColor: "text-rose-800 dark:text-rose-300",
  },
  {
    element: "Thổ (Văn Hóa Vững Bền)",
    subtitle: "Điểm tựa & Niềm tin",
    desc: "Gìn giữ giá trị cốt lõi, uy tín thương hiệu và lòng trung thành của khách hàng lâu năm.",
    bgColor: "bg-amber-700/10 dark:bg-amber-950/30",
    borderColor: "border-amber-700/30",
    iconBg: "bg-amber-700/20 text-amber-800 dark:text-amber-200",
    titleColor: "text-amber-900 dark:text-amber-200",
  },
];

export const ZODIAC_SYNERGY_LIST: ZodiacSynergyItem[] = [
  {
    id: "than",
    nameVi: "Thân (Khỉ)",
    animalVi: "Thân",
    icon: "🐒",
    tier: "best",
    tierLabelVi: "Tam Hợp (Thân - Tý - Thìn)",
    score: "98%",
    relationshipVi: "Đồng chí hướng & Tương trợ hoàn hảo",
    years: "1968, 1980, 1992, 2004, 2016",
    workplaceFitVi: "Đổi mới công nghệ, Chiến lược sản phẩm, Xử lý tình huống linh hoạt",
    deskDirectionVi: "Hướng Tây Nam hoặc Tây",
    workplaceAdviceVi: "Người tuổi Thân nhanh nhẹn, sáng tạo, phối hợp ăn ý với tính cẩn trọng và chiến lược của Giáp Tý, tạo nên bộ đôi bứt phá ngoạn mục.",
  },
  {
    id: "thin",
    nameVi: "Thìn (Rồng)",
    animalVi: "Thìn",
    icon: "🐉",
    tier: "best",
    tierLabelVi: "Tam Hợp (Thân - Tý - Thìn)",
    score: "96%",
    relationshipVi: "Thủ lĩnh tiên phong & Cánh tay đắc lực",
    years: "1964, 1976, 1988, 2000, 2012",
    workplaceFitVi: "Lãnh đạo cấp cao, Mở rộng quy mô, Phát triển thị trường lớn",
    deskDirectionVi: "Hướng Đông Nam",
    workplaceAdviceVi: "Người tuổi Thìn mang tầm nhìn vĩ mô và uy quyền, kết hợp với tài năng quản trị chi tiết của Giáp Tý sẽ tạo ra nền móng doanh nghiệp vững mạnh.",
  },
  {
    id: "suu",
    nameVi: "Sửu (Trâu)",
    animalVi: "Sửu",
    icon: "🐂",
    tier: "luc_hop",
    tierLabelVi: "Lục Hợp (Tý - Sửu)",
    score: "95%",
    relationshipVi: "Tri kỷ tri âm & Hậu phương vững chắc",
    years: "1961, 1973, 1985, 1997, 2009",
    workplaceFitVi: "Kiểm soát chất lượng, Quản lý tài chính, Giám sát vận hành",
    deskDirectionVi: "Hướng Đông Bắc",
    workplaceAdviceVi: "Tuổi Sửu kiên nhẫn, trung thành và tỉ mỉ, là người đồng hành đáng tin cậy nhất trong các dự án đòi hỏi tính chính xác cao độ.",
  },
  {
    id: "hoi",
    nameVi: "Hợi (Heo)",
    animalVi: "Hợi",
    icon: "🐖",
    tier: "support",
    tierLabelVi: "Tương Trợ (Cùng hành Thủy)",
    score: "88%",
    relationshipVi: "Hòa đồng & Đồng cảm sâu sắc",
    years: "1971, 1983, 1995, 2007, 2019",
    workplaceFitVi: "Chăm sóc khách hàng, Trải nghiệm nhân viên, Nhân sự văn hóa",
    deskDirectionVi: "Hướng Tây Bắc",
    workplaceAdviceVi: "Người tuổi Hợi hòa nhã, nhân hậu, giúp duy trì năng lượng tích cực và sự ấm áp trong môi trường làm việc nhiều áp lực.",
  },
  {
    id: "tuat",
    nameVi: "Tuất (Chó)",
    animalVi: "Tuất",
    icon: "🐕",
    tier: "support",
    tierLabelVi: "Tương Trợ Đồng Lòng",
    score: "85%",
    relationshipVi: "Chính trực & Tận tụy cống hiến",
    years: "1970, 1982, 1994, 2006, 2018",
    workplaceFitVi: "Bảo mật thông tin, Tuân thủ pháp chế, Kiểm toán nội bộ",
    deskDirectionVi: "Hướng Tây Bắc",
    workplaceAdviceVi: "Tuổi Tuất thẳng thắn, công bằng và hết lòng vì tập thể, là người gác cổng bảo vệ an toàn cho hệ thống vận hành.",
  },
  {
    id: "dau",
    nameVi: "Dậu (Gà)",
    animalVi: "Dậu",
    icon: "🐓",
    tier: "support",
    tierLabelVi: "Tương Trợ Kim Sinh Thủy",
    score: "84%",
    relationshipVi: "Chỉn chu & Ngăn nắp chuẩn mực",
    years: "1969, 1981, 1993, 2005, 2017",
    workplaceFitVi: "Phân tích dữ liệu, Biên soạn tài liệu SOP, Đào tạo",
    deskDirectionVi: "Hướng Chính Tây",
    workplaceAdviceVi: "Người tuổi Dậu chú ý từng chi tiết nhỏ, hỗ trợ đắc lực trong việc hoàn thiện các quy trình nghiệp vụ phức tạp.",
  },
  {
    id: "ty",
    nameVi: "Tý (Chuột)",
    animalVi: "Tý",
    icon: "🐀",
    tier: "support",
    tierLabelVi: "Đồng Tuế Tương Hợp",
    score: "82%",
    relationshipVi: "Đồng cảm tư duy & Hiểu ý nhanh",
    years: "1960, 1972, 1984, 1996, 2008",
    workplaceFitVi: "Nghiên cứu thị trường, Tối ưu công cụ, Sáng tạo giải pháp",
    deskDirectionVi: "Hướng Chính Bắc",
    workplaceAdviceVi: "Cùng tuổi nên dễ thấu hiểu suy nghĩ của nhau, cần phân chia rõ ràng phạm vi trách nhiệm để phát huy tối đa thế mạnh.",
  },
  {
    id: "mui",
    nameVi: "Mùi (Dê)",
    animalVi: "Mùi",
    icon: "🐐",
    tier: "caution",
    tierLabelVi: "Hòa Hợp Khi Biết Nhường Nhịn",
    score: "70%",
    relationshipVi: "Cần lắng nghe & Bổ trợ điểm khuyết",
    years: "1967, 1979, 1991, 2003, 2015",
    workplaceFitVi: "Thiết kế giao diện, Viết nội dung sáng tạo, Tổ chức sự kiện",
    deskDirectionVi: "Hướng Tây Nam",
    workplaceAdviceVi: "Nên trao đổi thẳng thắn trên tinh thần xây dựng, tôn trọng cá tính riêng để cùng hướng đến mục tiêu chung.",
  },
  {
    id: "dan",
    nameVi: "Dần (Hổ)",
    animalVi: "Dần",
    icon: "🐅",
    tier: "support",
    tierLabelVi: "Tương Trợ Bổ Khuyết",
    score: "78%",
    relationshipVi: "Khí chất dũng mãnh & Quyết đoán",
    years: "1962, 1974, 1986, 1998, 2010",
    workplaceFitVi: "Dẫn dắt dự án mới, Đàm phán khó, Xử lý tình huống khẩn",
    deskDirectionVi: "Hướng Đông Bắc",
    workplaceAdviceVi: "Người tuổi Dần giàu nhiệt huyết và tính tiên phong, kết hợp với sự điềm đạm của Giáp Tý sẽ tạo nên sự cân bằng hoàn hảo.",
  },
  {
    id: "mao",
    nameVi: "Mão (Mèo)",
    animalVi: "Mão",
    icon: "🐈",
    tier: "caution",
    tierLabelVi: "Khéo Léo Phối Hợp",
    score: "72%",
    relationshipVi: "Mềm mỏng & Tinh tế nghệ thuật",
    years: "1963, 1975, 1987, 1999, 2011",
    workplaceFitVi: "Quan hệ công chúng, Truyền thông nội bộ, Chăm sóc VIP",
    deskDirectionVi: "Hướng Chính Đông",
    workplaceAdviceVi: "Tuổi Mão tinh tế, giao tiếp khéo léo, hỗ trợ làm dịu các cuộc tranh luận căng thẳng trong nội bộ.",
  },
  {
    id: "ty_snake",
    nameVi: "Tỵ (Rắn)",
    animalVi: "Tỵ",
    icon: "🐍",
    tier: "support",
    tierLabelVi: "Sâu Sắc & Cơ Biến",
    score: "80%",
    relationshipVi: "Chiến thuật tinh tế & Kín đáo",
    years: "1965, 1977, 1989, 2001, 2013",
    workplaceFitVi: "Nghiên cứu đối thủ, Quản trị rủi ro, Hoạch định chính sách",
    deskDirectionVi: "Hướng Đông Nam",
    workplaceAdviceVi: "Người tuổi Tỵ có trực giác sắc bén và suy nghĩ thấu đáo, đưa ra các lời khuyên chiến lược giá trị cao.",
  },
  {
    id: "ngo",
    nameVi: "Ngọ (Ngựa)",
    animalVi: "Ngọ",
    icon: "🐎",
    tier: "caution",
    tierLabelVi: "Tương Xung Cần Cân Bằng",
    score: "65%",
    relationshipVi: "Tốc độ bứt phá & Cần kiềm chế nóng vội",
    years: "1966, 1978, 1990, 2002, 2014",
    workplaceFitVi: "Bán hàng trực tiếp, Mở thị trường thần tốc, Đội ngũ lưu động",
    deskDirectionVi: "Hướng Chính Nam",
    workplaceAdviceVi: "Tuổi Ngọ hành động nhanh, cần Giáp Tý giữ nhịp và điều hướng chiến lược để tránh rủi ro nóng vội.",
  },
];

export const ACTION_PHILOSOPHY_CARDS: ActionPhilosophyCard[] = [
  {
    id: "phil-1",
    title: "Lấy Khách Hàng Làm Trọng Tâm (Customer Centricity)",
    description: "Mọi quyết định cải tiến quy trình và công nghệ đều bắt đầu từ việc thấu hiểu nỗi đau và mong đợi thực tế của khách hàng.",
    iconType: "target",
  },
  {
    id: "phil-2",
    title: "Quản Trị Bằng Dữ Liệu Thời Gian Thực (Data-Driven)",
    description: "Không dựa vào cảm tính; đo lường, giám sát và ra quyết định chính xác dựa trên dữ liệu định lượng và phân tích xu hướng.",
    iconType: "trending",
  },
  {
    id: "phil-3",
    title: "Tâm Thế Phụng Sự & Đồng Cảm (Empathetic Leadership)",
    description: "Lắng nghe nhân viên tuyến đầu, chăm sóc sức khỏe tinh thần đội ngũ để họ mang lại trải nghiệm ấm áp nhất đến khách hàng.",
    iconType: "heart",
  },
  {
    id: "phil-4",
    title: "Chính Trực & Trọng Chữ Tín (Integrity First)",
    description: "Cam kết đúng hạn, minh bạch thông tin và bảo vệ uy tín thương hiệu như tài sản quý giá nhất của tổ chức.",
    iconType: "compass",
  },
  {
    id: "phil-5",
    title: "Không Ngừng Cải Tiến & Đổi Mới (Continuous Kaizen)",
    description: "Mỗi ngày tối ưu hóa một điểm chạm nhỏ, ứng dụng AI và công nghệ mới để nâng tầm dịch vụ vượt kỳ vọng.",
    iconType: "award",
  },
];
