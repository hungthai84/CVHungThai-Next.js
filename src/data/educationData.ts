export interface ModuleItem {
  code: string;
  title: string;
  focus: string;
  icon: string;
}

export interface EducationCard {
  id: number;
  title: string;
  subtitle: string;
  major?: string;
  year: string;
  type: "tech" | "management";
  image: string;
  courseImg?: string;
  certImg?: string;
  certImg2?: string;
  speakerImg?: string;
  desc: string;
  learned?: string[];
  modules: ModuleItem[];
  results: string[];
  hashtags?: string[];
  gallery?: string[];
  icon: string;
  gradientBadge?: string;
  theme?: {
    text: string;
    badge: string;
    iconBg: string;
  };
}

export const DEFAULT_EDUCATION_CARDS: EducationCard[] = [
  {
    id: 1,
    title: "Thiết kế Webpages",
    subtitle: "Tự học & Phát triển Chuyên môn",
    major: "Lập trình Frontend & UI/UX",
    year: "Năm 2024",
    type: "tech",
    image: "https://i.ibb.co/ch0b9mfY/Thi-t-k-website.png",
    courseImg: "https://i.ibb.co/Z6G0SmwN/Thi-t-k-Website.png",
    certImg: "https://i.ibb.co/JRm9qQbC/Thi-t-k-Website.png",
    speakerImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    desc: "Được trang bị kiến thức về phát triển website hiện đại với HTML5, CSS3, JavaScript, PHP và C++, đồng thời nâng cao kỹ năng thiết kế giao diện Responsive, tối ưu trải nghiệm người dùng (UI/UX) và ứng dụng AI trong phát triển website.",
    learned: [
      "Kiến trúc HTML5, CSS3 và thiết kế chuẩn Responsive Design.",
      "Lập trình JavaScript ES6+, DOM manipulation và tương tác động.",
      "Tối ưu hóa trải nghiệm người dùng UI/UX và khả năng tiếp cận.",
      "Ứng dụng trí tuệ nhân tạo (AI) trong tự động hóa và phát triển web.",
      "Tích hợp REST API và số hóa dữ liệu hệ thống báo cáo.",
      "Tối ưu hiệu năng tốc độ tải trang và SEO On-page."
    ],
    modules: [
      { code: "MOD-01", title: "Kiến trúc HTML5, CSS3 & Responsive Design", focus: "Thiết kế chuẩn công thái học Mobile-First, Flexbox/Grid đa thiết bị.", icon: "code" },
      { code: "MOD-02", title: "Lập trình Động JavaScript ES6+ & DOM Events", focus: "Xử lý tương tác mượt mà, kết nối REST API và tối ưu luồng dữ liệu.", icon: "cpu" },
      { code: "MOD-03", title: "Nguyên lý UI/UX & Tối ưu Trải nghiệm", focus: "Wireframing, thiết kế bố cục chuẩn UX, tăng tốc độ tải trang.", icon: "workflow" },
      { code: "MOD-04", title: "Tích hợp AI & Số hóa Hệ thống Website", focus: "Tích hợp Gemini AI hỗ trợ lập trình, số hóa hệ thống báo cáo.", icon: "sparkles" }
    ],
    results: [
      "Làm chủ kỹ năng lập trình web frontend và tự tay xây dựng giao diện phức tạp.",
      "Tối ưu hóa giao diện người dùng đạt chuẩn Responsive, mượt mà trên mọi thiết bị.",
      "Ứng dụng AI và tự động hóa giúp tăng 50% tốc độ phát triển dự án website.",
      "Triển khai thành công hệ thống hồ sơ & báo cáo số hóa đa nền tảng cho tổ chức."
    ],
    hashtags: ["#WebDesign", "#Frontend", "#UIUX", "#TailwindCSS", "#TypeScript", "#Responsive", "#AIIntegration"],
    gallery: [
      "https://i.ibb.co/ch0b9mfY/Thi-t-k-website.png",
      "https://i.ibb.co/JRm9qQbC/Thi-t-k-Website.png",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80"
    ],
    icon: "code",
    gradientBadge: "from-blue-600 to-indigo-600 text-white",
    theme: { text: "text-blue-600 dark:text-blue-400", badge: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300", iconBg: "bg-blue-100/80 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400" }
  },
  {
    id: 2,
    title: "Phân tích Dữ liệu Big Data",
    subtitle: "Phát triển chuyên môn",
    major: "Phân tích Big Data & BI",
    year: "Năm 2019",
    type: "tech",
    image: "https://i.ibb.co/tMsL6zYH/Ph-n-t-ch-d-li-u.png",
    courseImg: "https://i.ibb.co/bj6CYy2L/Ph-n-t-ch-d-li-u.png",
    certImg: "https://i.ibb.co/cKyZRpCt/Ph-n-t-ch-d-li-u.png",
    speakerImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    desc: "Phát triển năng lực phân tích dữ liệu lớn, trực quan hóa dữ liệu và xây dựng hệ thống KPI/Dashboard nhằm hỗ trợ quản trị, nhận diện xu hướng khách hàng và ra quyết định dựa trên dữ liệu.",
    learned: [
      "Khái niệm và kiến trúc Big Data.",
      "Thu thập, tổ chức và xử lý dữ liệu với khối lượng lớn.",
      "Làm sạch và chuẩn hóa dữ liệu.",
      "Phân tích dữ liệu phục vụ quản trị.",
      "Phân tích xu hướng và hành vi khách hàng.",
      "Trực quan hóa dữ liệu.",
      "Xây dựng báo cáo quản trị.",
      "Xây dựng hệ thống KPI và Dashboard.",
      "Phân tích chỉ số hiệu suất hoạt động.",
      "Sử dụng dữ liệu để hỗ trợ dự báo và ra quyết định.",
      "Chuyển đổi dữ liệu thô thành thông tin hỗ trợ quản lý."
    ],
    modules: [
      { code: "MOD-01", title: "Kiến trúc Big Data & Tiền xử lý Dữ liệu", focus: "Thu thập, tổ chức, làm sạch và chuẩn hóa khối lượng dữ liệu lớn.", icon: "database" },
      { code: "MOD-02", title: "Phân tích Hành vi & Xu hướng Khách hàng", focus: "Phân tích dữ liệu đa chiều, nhận diện insight và nhu cầu người dùng.", icon: "trending-up" },
      { code: "MOD-03", title: "Trực quan hóa & Hệ thống KPI Dashboard", focus: "Xây dựng hệ thống Dashboard trực quan theo dõi chỉ số hiệu suất.", icon: "layout-grid" },
      { code: "MOD-04", title: "Dự báo & Ra Quyết định Dựa trên Dữ liệu", focus: "Chuyển hóa dữ liệu thô thành thông tin chiến lược hỗ trợ ban lãnh đạo.", icon: "award" }
    ],
    results: [
      "Hình thành tư duy quản trị dựa trên dữ liệu (Data-driven).",
      "Tối ưu hóa chỉ số vận hành và nâng cao trải nghiệm khách hàng.",
      "Nâng cao năng lực phân tích xu hướng và dự báo.",
      "Xây dựng hệ thống KPI và Dashboard trực quan phục vụ quản trị.",
      "Hỗ trợ ban lãnh đạo đưa ra quyết định nhanh chóng và chính xác."
    ],
    hashtags: ["#BigData", "#DataAnalytics", "#DataDriven", "#KPI", "#Dashboard", "#BusinessIntelligence", "#CustomerAnalytics", "#DataDrivenManagement"],
    gallery: [
      "https://i.ibb.co/tMsL6zYH/Ph-n-t-ch-d-li-u.png",
      "https://i.ibb.co/cKyZRpCt/Ph-n-t-ch-d-li-u.png",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"
    ],
    icon: "database",
    gradientBadge: "from-indigo-600 to-purple-600 text-white",
    theme: { text: "text-emerald-600 dark:text-emerald-400", badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300", iconBg: "bg-emerald-100/80 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400" }
  },
  {
    id: 3,
    title: "Quản lý Rủi ro",
    subtitle: "Prudential Việt Nam",
    major: "Quản trị Rủi ro Vận hành (BCP)",
    year: "Năm 2017",
    type: "management",
    image: "https://i.ibb.co/zhGPcgVM/Quan-l-rui-ro.png",
    courseImg: "https://i.ibb.co/d48JsC4S/Quan-l-rui-ro.png",
    certImg: "https://i.ibb.co/nN5wcyDy/Qu-n-l-r-i-ro.png",
    speakerImg: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    desc: "Phát triển năng lực nhận diện, đánh giá, kiểm soát và ứng phó với rủi ro trong hoạt động vận hành và dự án, hướng đến tư duy quản trị chủ động và phòng ngừa.",
    learned: [
      "Khái niệm và nguyên lý quản lý rủi ro.",
      "Nhận diện rủi ro trong quy trình vận hành và dự án.",
      "Phân loại rủi ro: vận hành, nhân sự, công nghệ, bảo mật.",
      "Đánh giá xác suất và mức độ tác động của rủi ro.",
      "Xây dựng ma trận rủi ro (Risk Matrix).",
      "Thiết lập biện pháp phòng ngừa và giảm thiểu rủi ro.",
      "Xây dựng kế hoạch ứng phó sự cố (Contingency Plan).",
      "Theo dõi và giám sát các chỉ số cảnh báo rủi ro.",
      "Đánh giá và cải tiến quy trình quản lý rủi ro sau sự cố."
    ],
    modules: [
      { code: "MOD-01", title: "Nguyên lý & Nhận diện Rủi ro Vận hành", focus: "Phân loại rủi ro quy trình, nhân sự, công nghệ và an toàn thông tin.", icon: "shield-alert" },
      { code: "MOD-02", title: "Định lượng & Thiết lập Ma trận Rủi ro (Risk Matrix)", focus: "Đánh giá xác suất, đo lường tác động và phân tầng rủi ro trọng yếu.", icon: "activity" },
      { code: "MOD-03", title: "Kế hoạch Phòng ngừa & Ứng phó Sự cố (Contingency Plan)", focus: "Thiết lập kịch bản dự phòng và biện pháp giảm thiểu gián đoạn.", icon: "workflow" },
      { code: "MOD-04", title: "Giám sát Chỉ số Cảnh báo & Cải tiến Liên tục", focus: "Theo dõi chỉ số cảnh báo sớm, đánh giá và hoàn thiện quy trình sau sự cố.", icon: "shield-check" }
    ],
    results: [
      "Nâng cao tư duy quản trị chủ động và phòng ngừa rủi ro.",
      "Giảm thiểu sự cố và gián đoạn trong hoạt động vận hành.",
      "Tăng cường khả năng ứng phó khi phát sinh tình huống bất ngờ.",
      "Bảo vệ uy tín dịch vụ và nâng cao chất lượng trải nghiệm khách hàng.",
      "Đảm bảo tính liên tục và ổn định của hệ thống vận hành."
    ],
    hashtags: ["#RiskManagement", "#RiskAssessment", "#RiskMatrix", "#RiskControl", "#RiskPrevention", "#BusinessRisk", "#OperationalRisk"],
    gallery: [
      "https://i.ibb.co/zhGPcgVM/Quan-l-rui-ro.png",
      "https://i.ibb.co/nN5wcyDy/Qu-n-l-r-i-ro.png",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80"
    ],
    icon: "shield-alert",
    gradientBadge: "from-rose-500 to-pink-600 text-white",
    theme: { text: "text-rose-600 dark:text-rose-400", badge: "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300", iconBg: "bg-rose-100/80 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400" }
  },
  {
    id: 4,
    title: "Quản lý Dự án",
    subtitle: "Prudential Việt Nam",
    major: "Phương pháp Quản lý Dự án",
    year: "Năm 2016",
    type: "management",
    image: "https://i.ibb.co/nq6921Zf/Qu-n-l-d-n.png",
    courseImg: "https://i.ibb.co/ZpBZTHjD/Qu-n-l-d-n.png",
    certImg: "https://i.ibb.co/4ZBDkbHp/Qu-n-l-d-n.png",
    speakerImg: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    desc: "Trang bị năng lực lập kế hoạch, điều phối nguồn lực, kiểm soát tiến độ, chi phí, chất lượng và rủi ro nhằm triển khai dự án hiệu quả trong môi trường đa phòng ban.",
    learned: [
      "Khái niệm và quy trình quản lý dự án chuẩn.",
      "Xác định mục tiêu, phạm vi và yêu cầu dự án.",
      "Lập kế hoạch dự án và phân rã công việc (WBS).",
      "Quản lý tiến độ và phân bổ nguồn lực.",
      "Quản lý chi phí và ngân sách dự án.",
      "Quản lý chất lượng dự án.",
      "Nhận diện và kiểm soát rủi ro dự án.",
      "Điều phối và làm việc với các bên liên quan (Stakeholders).",
      "Quản lý thay đổi trong quá trình triển khai dự án.",
      "Báo cáo tiến độ và đánh giá hiệu quả dự án.",
      "Đóng dự án và rút ra bài học kinh nghiệm (Lessons Learned)."
    ],
    modules: [
      { code: "MOD-01", title: "Khởi tạo & Phân rã Công việc (WBS)", focus: "Xác định phạm vi dự án, lập kế hoạch chi tiết theo chuẩn WBS.", icon: "briefcase" },
      { code: "MOD-02", title: "Hoạch định Tiến độ & Quản lý Chi phí", focus: "Điều phối nguồn lực, quản lý ngân sách và đường găng tiến độ.", icon: "calendar" },
      { code: "MOD-03", title: "Quản lý Chất lượng & Phối hợp Stakeholders", focus: "Kiểm soát QA/QC, quản lý thay đổi và gắn kết các bên liên quan.", icon: "users" },
      { code: "MOD-04", title: "Báo cáo Tiến độ, Đóng Dự án & Đúc kết Bài học", focus: "Đo lường KPI sau dự án, bàn giao hệ thống và lưu trữ Lessons Learned.", icon: "check-circle-2" }
    ],
    results: [
      "Nâng cao năng lực điều phối và triển khai dự án theo tiến độ.",
      "Tối ưu hóa việc sử dụng nguồn lực và chi phí thực hiện.",
      "Nâng cao khả năng phối hợp hiệu quả giữa các phòng ban.",
      "Giảm thiểu rủi ro phát sinh trong quá trình triển khai dự án.",
      "Ứng dụng hiệu quả vào các dự án chuyển đổi số, CRM và nâng cấp hệ thống."
    ],
    hashtags: ["#ProjectManagement", "#ProjectPlanning", "#PMO", "#ProjectCoordination", "#RiskManagement", "#StakeholderManagement", "#DigitalTransformation", "#CRM"],
    gallery: [
      "https://i.ibb.co/nq6921Zf/Qu-n-l-d-n.png",
      "https://i.ibb.co/DH9qKGJ2/Qu-n-l-d-n.png",
      "https://i.ibb.co/4ZBDkbHp/Qu-n-l-d-n.png",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80"
    ],
    icon: "briefcase",
    gradientBadge: "from-amber-500 to-orange-600 text-white",
    theme: { text: "text-amber-600 dark:text-amber-400", badge: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300", iconBg: "bg-amber-100/80 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400" }
  },
  {
    id: 5,
    title: "Quản lý Cấp cao",
    subtitle: "Dale Carnegie Training",
    major: "Lãnh đạo & Điều hành",
    year: "Năm 2015",
    type: "management",
    image: "https://i.ibb.co/ymVcsfvC/Qu-n-l-c-p-cao.png",
    courseImg: "https://i.ibb.co/LdvTgHdt/Qu-n-l-c-p-cao.png",
    certImg: "https://i.ibb.co/zT5MVFmt/Qu-n-l-c-p-cao.png",
    speakerImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    desc: "Phát triển năng lực lãnh đạo, quản trị chiến lược, xây dựng đội ngũ và ra quyết định, hướng tới khả năng điều hành các bộ phận và tổ chức có quy mô lớn.",
    learned: [
      "Tư duy lãnh đạo chiến lược và tầm nhìn tổ chức.",
      "Xây dựng và phát triển văn hóa doanh nghiệp.",
      "Lãnh đạo và truyền cảm hứng cho đội ngũ.",
      "Kỹ năng ra quyết định trong môi trường biến động.",
      "Quản trị sự thay đổi trong tổ chức (Change Management).",
      "Quản trị hiệu suất tổ chức và mục tiêu chiến lược.",
      "Phát triển đội ngũ kế thừa và đào tạo lãnh đạo.",
      "Kỹ năng thương lượng, đàm phán và thuyết phục cấp cao.",
      "Quản trị mối quan hệ với các bên liên quan trọng yếu.",
      "Xây dựng tinh thần trách nhiệm và cam kết trong tổ chức.",
      "Tự hoàn thiện và phát triển năng lực lãnh đạo bản thân."
    ],
    modules: [
      { code: "MOD-01", title: "Tư duy Lãnh đạo Chiến lược & Tầm nhìn", focus: "Định hình tầm nhìn dài hạn và xây dựng văn hóa doanh nghiệp vững mạnh.", icon: "compass" },
      { code: "MOD-02", title: "Lãnh đạo & Truyền Cảm Hứng Đội ngũ", focus: "Gắn kết nhân tài, xây dựng tinh thần trách nhiệm và cam kết cao.", icon: "flame" },
      { code: "MOD-03", title: "Quản trị Sự Thay đổi (Change Management)", focus: "Ra quyết định trong môi trường biến động và quản trị hiệu suất tổ chức.", icon: "trending-up" },
      { code: "MOD-04", title: "Phát triển Đội ngũ Kế thừa & Đàm phán Cấp cao", focus: "Đào tạo thế hệ lãnh đạo tiếp nối và tối ưu quan hệ đối tác trọng yếu.", icon: "award" }
    ],
    results: [
      "Nâng cao năng lực điều hành và lãnh đạo tổ chức quy mô lớn.",
      "Xây dựng đội ngũ gắn kết, có trách nhiệm và hiệu suất cao.",
      "Tăng cường khả năng thích ứng và dẫn dắt sự thay đổi.",
      "Tối ưu hóa mục tiêu chiến lược và kết quả hoạt động chung.",
      "Định hình phong cách lãnh đạo truyền cảm hứng và bền vững."
    ],
    hashtags: ["#Leadership", "#SeniorManagement", "#StrategicManagement", "#TeamLeadership", "#ChangeManagement", "#DecisionMaking", "#PeopleManagement"],
    gallery: [
      "https://i.ibb.co/ymVcsfvC/Qu-n-l-c-p-cao.png",
      "https://i.ibb.co/qYxHgVYs/Qu-n-l-c-p-cao.png",
      "https://i.ibb.co/zT5MVFmt/Qu-n-l-c-p-cao.png",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80"
    ],
    icon: "award",
    gradientBadge: "from-purple-500 to-indigo-600 text-white",
    theme: { text: "text-violet-600 dark:text-violet-400", badge: "bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300", iconBg: "bg-violet-100/80 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400" }
  },
  {
    id: 6,
    title: "Quản lý Cấp trung",
    subtitle: "Dale Carnegie Training",
    major: "Quản lý Nhân sự & Đội ngũ",
    year: "Năm 2014",
    type: "management",
    image: "https://i.ibb.co/jkHkZ1pd/Qu-n-l-c-p-trung.png",
    courseImg: "https://i.ibb.co/zh13J5nw/Qu-n-l-c-p-trung.png",
    certImg: "https://i.ibb.co/v6JvfyR4/Qu-n-l-c-p-trung.png",
    speakerImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    desc: "Phát triển kỹ năng quản lý đội nhóm, phân công công việc, giám sát hiệu suất, coaching và đào tạo nhân viên trong môi trường vận hành thực tế.",
    learned: [
      "Vai trò và trách nhiệm của người quản lý cấp trung.",
      "Kỹ năng lập kế hoạch và giao việc hiệu quả.",
      "Thiết lập mục tiêu và theo dõi chỉ số hiệu suất (KPI).",
      "Kỹ năng phản hồi và huấn luyện nhân viên (Coaching & Mentoring).",
      "Xử lý xung đột và giải quyết mâu thuẫn trong đội nhóm.",
      "Kỹ năng truyền đạt thông tin từ cấp lãnh đạo đến nhân viên.",
      "Tạo động lực và xây dựng tinh thần làm việc nhóm.",
      "Quản lý thời gian và ưu tiên công việc theo mức độ quan trọng.",
      "Kỹ năng đánh giá hiệu suất nhân viên công bằng và minh bạch.",
      "Xây dựng môi trường làm việc tích cực và chuyên nghiệp."
    ],
    modules: [
      { code: "MOD-01", title: "Lập Kế hoạch & Giao việc Hiệu quả", focus: "Thiết lập mục tiêu công việc rõ ràng và quản lý thời gian theo ưu tiên.", icon: "target" },
      { code: "MOD-02", title: "Huấn luyện & Kèm cặp (Coaching & Mentoring)", focus: "Kỹ năng phản hồi tích cực, kèm cặp và phát triển năng lực nhân viên.", icon: "user-plus" },
      { code: "MOD-03", title: "Giải quyết Xung đột & Gắn kết Đội nhóm", focus: "Xử lý mâu thuẫn nội bộ, truyền đạt thông suốt và tạo động lực làm việc.", icon: "message-square" },
      { code: "MOD-04", title: "Theo dõi KPI & Đánh giá Hiệu suất Minh bạch", focus: "Giám sát tiến độ chỉ tiêu, đánh giá công bằng và xây dựng văn hóa tích cực.", icon: "smile" }
    ],
    results: [
      "Nâng cao năng lực điều hành và giám sát đội nhóm trực tiếp.",
      "Cải thiện hiệu suất làm việc và chất lượng hoàn thành công việc của nhân sự.",
      "Phát triển kỹ năng kèm cặp và nâng cao năng lực cho nhân viên cấp dưới.",
      "Giảm thiểu mâu thuẫn nội bộ và tăng cường sự phối hợp nhóm.",
      "Đảm bảo thực thi hiệu quả các mục tiêu của tổ chức."
    ],
    hashtags: ["#MiddleManagement", "#TeamManagement", "#Coaching", "#Mentoring", "#KPI", "#Teamwork", "#PeopleDevelopment"],
    gallery: [
      "https://i.ibb.co/jkHkZ1pd/Qu-n-l-c-p-trung.png",
      "https://i.ibb.co/d0SNgcWy/Qu-n-l-c-p-trung.png",
      "https://i.ibb.co/v6JvfyR4/Qu-n-l-c-p-trung.png",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
    ],
    icon: "users",
    gradientBadge: "from-indigo-500 to-purple-600 text-white",
    theme: { text: "text-cyan-600 dark:text-cyan-400", badge: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300", iconBg: "bg-cyan-100/80 text-cyan-600 dark:bg-cyan-950/60 dark:text-cyan-400" }
  },
  {
    id: 7,
    title: "Đào tạo Thuyết trình",
    subtitle: "VietnamWorks",
    major: "Sư phạm & Thuyết trình",
    year: "Năm 2013",
    type: "management",
    image: "https://i.ibb.co/WvK6BvgL/Thuy-t-tr-nh.png",
    courseImg: "https://i.ibb.co/TDD9zdST/o-t-o-Thuy-t-tr-nh.png",
    certImg: "https://i.ibb.co/GQ3gFt3S/Thuy-t-tr-nh.png",
    certImg2: "https://i.ibb.co/p6J0BqTb/o-t-o.png",
    speakerImg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    desc: "Phát triển năng lực xây dựng chương trình đào tạo, thiết kế nội dung, thuyết trình và chuyển hóa kinh nghiệm thực tế thành kiến thức có thể đào tạo cho đội ngũ.",
    learned: [
      "Phân tích nhu cầu đào tạo của nhân sự (TNA).",
      "Thiết kế cấu trúc bài giảng logic và hấp dẫn.",
      "Kỹ thuật xây dựng nội dung đào tạo thực chiến.",
      "Kỹ năng thuyết trình trước đám đông chuyên nghiệp.",
      "Kỹ thuật sử dụng giọng nói, ngôn ngữ cơ thể và năng lượng.",
      "Kỹ thuật tương tác, kích thích sự tham gia của người học.",
      "Xử lý các tình huống khó và giải đáp thắc mắc trong buổi đào tạo.",
      "Đánh giá mức độ tiếp thu và hiệu quả của buổi đào tạo.",
      "Kỹ năng kèm cặp và hỗ trợ sau đào tạo."
    ],
    modules: [
      { code: "MOD-01", title: "Phân tích Nhu cầu (TNA) & Thiết kế Bài giảng", focus: "Khảo sát khoảng trống năng lực, thiết kế cấu trúc bài giảng thực chiến.", icon: "calculator" },
      { code: "MOD-02", title: "Thuyết trình Chuyên nghiệp & Ngôn ngữ Cơ thể", focus: "Làm chủ giọng nói, kiểm soát năng lượng sân khấu và tác phong sư phạm.", icon: "mic" },
      { code: "MOD-03", title: "Kỹ thuật Tương tác & Xử lý Tình huống Lớp học", focus: "Kích hoạt sự tham gia của học viên, giải đáp phản biện khéo léo.", icon: "users" },
      { code: "MOD-04", title: "Đánh giá Sau Đào tạo & Kèm cặp Ứng dụng", focus: "Đo lường mức độ tiếp thu, hỗ trợ nhân sự chuyển hóa tri thức vào thực tế.", icon: "target" }
    ],
    results: [
      "Tự tin đứng lớp và thuyết trình chuyên nghiệp trước tập thể.",
      "Khả năng chuyển hóa kinh nghiệm thực tế thành tài liệu đào tạo bài bản.",
      "Nâng cao hiệu quả tiếp thu và thực hành của nhân sự sau đào tạo.",
      "Xây dựng đội ngũ kế thừa và chuẩn hóa quy trình dịch vụ khách hàng."
    ],
    hashtags: ["#Training", "#Presentation", "#Trainer", "#PublicSpeaking", "#LearningDevelopment", "#CustomerServiceTraining"],
    gallery: [
      "https://i.ibb.co/WvK6BvgL/Thuy-t-tr-nh.png",
      "https://i.ibb.co/GQ3gFt3S/Thuy-t-tr-nh.png",
      "https://i.ibb.co/p6J0BqTb/o-t-o.png",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80"
    ],
    icon: "presentation",
    gradientBadge: "from-blue-600 to-indigo-600 text-white",
    theme: { text: "text-indigo-600 dark:text-indigo-400", badge: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300", iconBg: "bg-indigo-100/80 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400" }
  },
  {
    id: 8,
    title: "Kỹ năng Phỏng vấn",
    subtitle: "VietnamWorks",
    major: "Phỏng vấn & Đánh giá Năng lực",
    year: "Năm 2013",
    type: "management",
    image: "https://i.ibb.co/jkHkZ1pd/Ph-ng-v-n.png",
    courseImg: "https://i.ibb.co/q3Fk9RXh/Ph-ng-v-n.png",
    certImg: "https://i.ibb.co/0RhVggb5/Ph-ng-v-n.png",
    speakerImg: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    desc: "Phát triển năng lực tham gia tuyển dụng, xây dựng tiêu chí đánh giá và phỏng vấn nhằm lựa chọn nhân sự phù hợp với yêu cầu công việc và văn hóa đội ngũ.",
    learned: [
      "Hiểu rõ chân dung ứng viên phù hợp với từng vị trí.",
      "Kỹ thuật đọc và phân tích hồ sơ ứng viên (CV Screening).",
      "Xây dựng bộ câu hỏi phỏng vấn theo năng lực và hành vi.",
      "Kỹ thuật phỏng vấn hành vi (STAR Method).",
      "Kỹ năng đặt câu hỏi mở, câu hỏi đào sâu và lắng nghe chủ động.",
      "Nhận diện tín hiệu ngôn ngữ cơ thể và tính chân thực của ứng viên.",
      "Đánh giá độ phù hợp với văn hóa tổ chức và tinh thần dịch vụ.",
      "Tránh các định kiến và lỗi cảm tính khi phỏng vấn.",
      "Kỹ năng phản hồi và đưa ra quyết định tuyển dụng chính xác."
    ],
    modules: [
      { code: "MOD-01", title: "Xác định Chân dung & Phân tích Hồ sơ (CV Screening)", focus: "Xây dựng tiêu chuẩn năng lực ASK và sàng lọc hồ sơ ứng viên.", icon: "list-checks" },
      { code: "MOD-02", title: "Kỹ thuật Phỏng vấn Hành vi STAR", focus: "Khai thác tình huống Situation - Task - Action - Result và lắng nghe sâu.", icon: "help-circle" },
      { code: "MOD-03", title: "Đánh giá Văn hóa & Ngôn ngữ Cơ thể", focus: "Nhận diện độ chân thực, thấu cảm và mức độ tương thích văn hóa tổ chức.", icon: "user-check" },
      { code: "MOD-04", title: "Đánh giá Khách quan & Quyết định Tuyển dụng", focus: "Chuẩn hóa thang điểm đánh giá, loại bỏ thiên kiến và chốt ứng viên chuẩn.", icon: "handshake" }
    ],
    results: [
      "Nâng cao độ chính xác khi lựa chọn nhân sự mới.",
      "Giảm tỷ lệ biến động nhân sự và chi phí tuyển dụng lại.",
      "Xây dựng đội ngũ có năng lực, thái độ tốt và phù hợp văn hóa.",
      "Nâng cao chất lượng nguồn nhân lực phục vụ vận hành."
    ],
    hashtags: ["#Recruitment", "#InterviewSkills", "#TalentAcquisition", "#CandidateAssessment", "#PeopleManagement", "#Hiring"],
    gallery: [
      "https://i.ibb.co/jkHkZ1pd/Ph-ng-v-n.png",
      "https://i.ibb.co/W4pgFcq7/Ph-ng-v-n.png",
      "https://i.ibb.co/0RhVggb5/Ph-ng-v-n.png",
      "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?auto=format&fit=crop&w=600&q=80"
    ],
    icon: "user-check",
    gradientBadge: "from-teal-500 to-emerald-600 text-white",
    theme: { text: "text-fuchsia-600 dark:text-fuchsia-400", badge: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950/40 dark:text-fuchsia-300", iconBg: "bg-fuchsia-100/80 text-fuchsia-600 dark:bg-fuchsia-950/60 dark:text-fuchsia-400" }
  },
  {
    id: 9,
    title: "Cử nhân Công nghệ Thông tin",
    subtitle: "Trường Đại học Công nghệ Sài Gòn (STU)",
    major: "Khoa học Máy tính & Software",
    year: "Năm 2007",
    type: "tech",
    image: "https://i.ibb.co/YBWVsjDs/C-nh-n-CNTT.png",
    courseImg: "https://i.ibb.co/tpNF0Bqw/C-nh-n-CNTT.png",
    certImg: "https://i.ibb.co/m5YgnJ9r/C-nh-n-CNTT.png",
    speakerImg: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
    desc: "Nền tảng học thuật về Công nghệ Thông tin, giúp hình thành tư duy hệ thống, phân tích nghiệp vụ và khả năng kết nối giữa công nghệ với hoạt động quản trị doanh nghiệp.",
    learned: [
      "Cơ sở lập trình và cấu trúc dữ liệu.",
      "Cơ sở dữ liệu quan hệ (RDBMS) và truy vấn dữ liệu (SQL).",
      "Phân tích và thiết kế hệ thống thông tin.",
      "Mạng máy tính và truyền thông dữ liệu.",
      "Hệ điều hành và quản trị hệ thống.",
      "Phát triển phần mềm và công nghệ web.",
      "An toàn thông tin và bảo mật dữ liệu.",
      "Quản lý dự án công nghệ thông tin.",
      "Tư duy logic, giải thuật và tối ưu hóa hệ thống.",
      "Phương pháp nghiên cứu và giải quyết vấn đề kỹ thuật."
    ],
    modules: [
      { code: "MOD-01", title: "Cơ sở Lập trình, Cấu trúc Dữ liệu & Giải thuật", focus: "Tư duy thuật toán, cấu trúc dữ liệu và phát triển phần mềm hướng đối tượng.", icon: "code-2" },
      { code: "MOD-02", title: "Cơ sở Dữ liệu Quan hệ (RDBMS) & SQL", focus: "Thiết kế cơ sở dữ liệu, tối ưu hóa truy vấn và bảo toàn toàn vẹn dữ liệu.", icon: "database" },
      { code: "MOD-03", title: "Phân tích & Thiết kế Hệ thống Thông tin", focus: "Mô hình hóa quy trình nghiệp vụ, kiến trúc phần mềm và luồng dữ liệu.", icon: "network" },
      { code: "MOD-04", title: "Mạng Máy tính, Hệ điều hành & Bảo mật", focus: "Truyền thông dữ liệu, quản trị hệ điều hành và an toàn bảo mật thông tin.", icon: "laptop" }
    ],
    results: [
      "Hình thành tư duy hệ thống và phân tích dữ liệu chuyên sâu.",
      "Nền tảng vững chắc để ứng dụng công nghệ vào quản trị doanh nghiệp.",
      "Khả năng hiểu sâu về kiến trúc hệ thống và luồng dữ liệu nghiệp vụ.",
      "Cầu nối hiệu quả giữa khối kỹ thuật (IT) và khối vận hành kinh doanh.",
      "Nền tảng quan trọng cho các hoạt động chuyển đổi số sau này."
    ],
    hashtags: ["#InformationTechnology", "#IT", "#SoftwareDevelopment", "#Database", "#SystemAnalysis", "#SystemDesign", "#Technology", "#DigitalTransformation"],
    gallery: [
      "https://i.ibb.co/YBWVsjDs/C-nh-n-CNTT.png",
      "https://i.ibb.co/m5YgnJ9r/C-nh-n-CNTT.png",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80"
    ],
    icon: "graduation-cap",
    gradientBadge: "from-blue-500 to-indigo-700 text-white",
    theme: { text: "text-blue-600 dark:text-blue-400", badge: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300", iconBg: "bg-blue-100/80 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400" }
  },
  {
    id: 10,
    title: "Chứng nhận Tổng đài viên",
    subtitle: "MobiFone",
    major: "Contact Center & CSKH",
    year: "Năm 2007",
    type: "management",
    image: "https://i.ibb.co/49h4XHh/T-ng-i-vi-n-Mobifone.png",
    courseImg: "https://i.ibb.co/cX8KThxQ/T-ng-i-vi-n-Mobifone.png",
    certImg: "https://i.ibb.co/vCKQGYB2/T-ng-i-vi-n-Mobifone.png",
    speakerImg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    desc: "Nền tảng chuyên môn đầu tiên trong lĩnh vực Contact Center, trực tiếp hình thành kỹ năng giao tiếp, lắng nghe, xử lý vấn đề và chăm sóc khách hàng qua điện thoại.",
    learned: [
      "Nghiệp vụ và quy trình xử lý cuộc gọi Contact Center.",
      "Kỹ năng giao tiếp chuyên nghiệp qua điện thoại.",
      "Kỹ thuật lắng nghe chủ động và nhận diện nhu cầu khách hàng.",
      "Kỹ năng đặt câu hỏi để nắm bắt thông tin chính xác.",
      "Kỹ thuật điều tiết giọng nói, tốc độ và ngữ điệu phù hợp.",
      "Xử lý khiếu nại và xoa dịu khách hàng khó tính.",
      "Quản lý cảm xúc và giữ bình tĩnh trong các tình huống áp lực.",
      "Sử dụng hệ thống phần mềm Contact Center và tra cứu dữ liệu.",
      "Quy trình bảo mật thông tin khách hàng.",
      "Tuân thủ các tiêu chuẩn chất lượng dịch vụ (QA/QC).",
      "Phối hợp với các bộ phận liên quan để giải quyết vấn đề khách hàng."
    ],
    modules: [
      { code: "MOD-01", title: "Quy trình Vận hành Cuộc gọi & Hệ thống Contact Center", focus: "Nghiệp vụ tổng đài, phần mềm định tuyến ACD, CRM và tra cứu dữ liệu.", icon: "radio" },
      { code: "MOD-02", title: "Kỹ năng Giao tiếp & Điều tiết Giọng nói Chuyên nghiệp", focus: "Lắng nghe chủ động, đặt câu hỏi chính xác và làm chủ ngữ điệu giọng nói.", icon: "phone-call" },
      { code: "MOD-03", title: "Kỹ thuật Xử lý Khiếu nại & Quản lý Cảm xúc", focus: "Xoa dịu khách hàng bức xúc, giải quyết sự cố dưới áp lực cao.", icon: "alert-octagon" },
      { code: "MOD-04", title: "Tiêu chuẩn Chất lượng QA/QC & Bảo mật Dữ liệu", focus: "Tuân thủ chỉ số FCR/CSAT và bảo mật thông tin khách hàng tuyệt đối.", icon: "award" }
    ],
    results: [
      "Làm chủ kỹ năng giao tiếp và xử lý tình huống khách hàng thực tế.",
      "Hiểu rõ tâm lý khách hàng và cách tạo thiện cảm trong phục vụ.",
      "Hình thành tư duy dịch vụ tận tâm và lấy khách hàng làm trung tâm.",
      "Nền tảng thực tiễn quan trọng để sau này quản lý, giám sát và đào tạo đội ngũ Contact Center.",
      "Nâng cao tỷ lệ xử lý vấn đề ngay trong cuộc gọi đầu tiên (FCR)."
    ],
    hashtags: ["#ContactCenter", "#CallCenter", "#CustomerService", "#CustomerExperience", "#Telecom", "#CallCenterOperations", "#CustomerCare"],
    gallery: [
      "https://i.ibb.co/49h4XHh/T-ng-i-vi-n-Mobifone.png",
      "https://i.ibb.co/2YM0K35d/T-ng-i-vi-n-Mobifone.png",
      "https://i.ibb.co/vCKQGYB2/T-ng-i-vi-n-Mobifone.png",
      "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=600&q=80"
    ],
    icon: "phone-call",
    gradientBadge: "from-sky-500 to-blue-600 text-white",
    theme: { text: "text-red-600 dark:text-red-400", badge: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300", iconBg: "bg-red-100/80 text-red-600 dark:bg-red-950/60 dark:text-red-400" }
  },
  {
    id: 11,
    title: "Quản trị mạng CCNA",
    subtitle: "Trường Nghề Nhất Nghệ",
    major: "Hạ tầng Mạng Cisco (CCNA)",
    year: "Năm 2006",
    type: "tech",
    image: "https://i.ibb.co/chHTpBJL/CCNA.png",
    courseImg: "https://i.ibb.co/DPVsnrfj/CCNA.png",
    certImg: "https://i.ibb.co/jZr4051t/CCNA.png",
    speakerImg: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    desc: "Trang bị kiến thức nền tảng về mạng máy tính và hạ tầng Cisco, hỗ trợ khả năng hiểu, phân tích và phối hợp xử lý các vấn đề liên quan đến hạ tầng CNTT doanh nghiệp.",
    learned: [
      "Mô hình mạng OSI và bộ giao thức TCP/IP.",
      "Địa chỉ IP (IPv4, IPv6) và kỹ thuật chia mạng con (Subnetting).",
      "Cấu hình và quản lý thiết bị chuyển mạch (Cisco Switch).",
      "Kỹ thuật phân chia mạng ảo (VLAN) và định tuyến giữa các VLAN (Inter-VLAN Routing).",
      "Cấu hình định tuyến tĩnh và động (RIP, OSPF, EIGRP).",
      "Quản lý danh sách kiểm soát truy cập (Access Control List - ACL).",
      "Dịch vụ dịch địa chỉ mạng (Network Address Translation - NAT).",
      "Nguyên lý an toàn mạng và bảo mật thiết bị mạng.",
      "Kỹ thuật chẩn đoán và xử lý sự cố mạng (Troubleshooting).",
      "Thiết kế và quy hoạch hạ tầng mạng nội bộ (LAN)."
    ],
    modules: [
      { code: "MOD-01", title: "Mô hình OSI, TCP/IP & Chia Subnetting", focus: "Quy hoạch địa chỉ IPv4/IPv6 và thiết kế phân luồng mạng nội bộ (LAN).", icon: "layers" },
      { code: "MOD-02", title: "Cấu hình Cisco Switch & Phân chia VLAN", focus: "Triển khai VLAN, Trunking 802.1Q và định tuyến Inter-VLAN.", icon: "git-commit" },
      { code: "MOD-03", title: "Định tuyến Routing Protocols (OSPF / EIGRP)", focus: "Cấu hình giao thức định tuyến tĩnh và động, tối ưu hóa đường truyền.", icon: "navigation" },
      { code: "MOD-04", title: "Bảo mật ACLs, NAT & Chẩn đoán Sự cố Mạng", focus: "Phân quyền truy cập ACL, dịch địa chỉ NAT và xử lý sự cố kết nối 24/7.", icon: "shield" }
    ],
    results: [
      "Nắm vững kiến thức nền tảng về mạng máy tính và hạ tầng CNTT.",
      "Khả năng phân tích, phát hiện và phối hợp xử lý sự cố mạng cơ bản.",
      "Hỗ trợ tốt cho việc triển khai và vận hành hệ thống phần mềm và Contact Center.",
      "Tăng cường khả năng làm việc và trao đổi chuyên môn với đội ngũ IT hạ tầng."
    ],
    hashtags: ["#CCNA", "#Networking", "#Cisco", "#TCPIP", "#Routing", "#Switching", "#NetworkAdministration", "#ITInfrastructure"],
    gallery: [
      "https://i.ibb.co/chHTpBJL/CCNA.png",
      "https://i.ibb.co/FkxNtH4d/CCNA.png",
      "https://i.ibb.co/jZr4051t/CCNA.png",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80"
    ],
    icon: "network",
    gradientBadge: "from-orange-500 to-amber-600 text-white",
    theme: { text: "text-teal-600 dark:text-teal-400", badge: "bg-teal-100 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300", iconBg: "bg-teal-100/80 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400" }
  },
  {
    id: 12,
    title: "Quản trị hệ thống MCSA",
    subtitle: "Trường Nghề Nhất Nghệ",
    major: "Quản trị Máy chủ Windows (MCSA)",
    year: "Năm 2005",
    type: "tech",
    image: "https://i.ibb.co/Jwf4rb4G/MCSA.png",
    courseImg: "https://i.ibb.co/ZRp6cDRz/MCSA.png",
    certImg: "https://i.ibb.co/VYMs5kRq/MCSA.png",
    speakerImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    desc: "Trang bị kiến thức quản trị hệ thống Windows Server và hạ tầng CNTT doanh nghiệp, tạo nền tảng kỹ thuật để hiểu sâu hơn về hệ thống ứng dụng và Contact Center.",
    learned: [
      "Cài đặt và cấu hình hệ điều hành Windows Server.",
      "Quản trị dịch vụ thư mục Active Directory Domain Services (AD DS).",
      "Quản lý người dùng, nhóm người dùng và phân quyền truy cập.",
      "Triển khai và quản lý chính sách nhóm (Group Policy Object - GPO).",
      "Cấu hình dịch vụ mạng cơ bản: DNS, DHCP.",
      "Quản lý hệ thống tập tin và phân quyền bảo mật dữ liệu (NTFS Permission, Share Permission).",
      "Sao lưu (Backup) và phục hồi dữ liệu hệ thống (Disaster Recovery).",
      "Quản lý bảo mật hệ thống và cập nhật bản vá lỗi (WSUS).",
      "Giám sát hiệu năng và khắc phục sự cố hệ điều hành máy chủ.",
      "Quản lý truy cập từ xa (Remote Desktop, VPN).",
      "Nền tảng ảo hóa và quản trị tài nguyên máy chủ."
    ],
    modules: [
      { code: "MOD-01", title: "Cài đặt & Cấu hình Windows Server", focus: "Kiến trúc hệ điều hành máy chủ, phân bổ tài nguyên và ảo hóa phần cứng.", icon: "server" },
      { code: "MOD-02", title: "Active Directory (AD DS) & Quản trị Chính sách GPO", focus: "Quản lý tập trung người dùng, nhóm đối tượng và chính sách bảo mật mạng.", icon: "folder-tree" },
      { code: "MOD-03", title: "Dịch vụ Mạng Cốt lõi (DNS, DHCP & File Sharing)", focus: "Cấu hình phân giải tên miền, cấp phát IP động và phân quyền dữ liệu NTFS.", icon: "globe" },
      { code: "MOD-04", title: "Bảo mật Máy chủ, Sao lưu & Khắc phục Sự cố (Disaster Recovery)", focus: "Cập nhật bản vá bảo mật, sao lưu định kỳ và khôi phục hệ thống khi xảy ra sự cố.", icon: "hard-drive" }
    ],
    results: [
      "Nắm vững nguyên lý quản trị hệ thống máy chủ và dịch vụ mạng doanh nghiệp.",
      "Hiểu rõ cơ chế phân quyền, bảo mật và quản lý tài nguyên số trong tổ chức.",
      "Nền tảng kỹ thuật vững chắc để hiểu và vận hành các hệ sinh thái phần mềm doanh nghiệp và Contact Center.",
      "Khả năng phối hợp hiệu quả với đội ngũ kỹ thuật trong việc tích hợp hệ thống."
    ],
    hashtags: ["#MCSA", "#WindowsServer", "#SystemAdministration", "#ActiveDirectory", "#ITInfrastructure", "#ServerManagement", "#CyberSecurity"],
    gallery: [
      "https://i.ibb.co/Jwf4rb4G/MCSA.png",
      "https://i.ibb.co/DPHDw2Pf/MCSA.png",
      "https://i.ibb.co/VYMs5kRq/MCSA.png",
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80"
    ],
    icon: "server",
    gradientBadge: "from-violet-500 to-purple-700 text-white",
    theme: { text: "text-purple-600 dark:text-purple-400", badge: "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300", iconBg: "bg-purple-100/80 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400" }
  }
];
