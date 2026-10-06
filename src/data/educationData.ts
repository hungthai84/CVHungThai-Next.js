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
    title: "Thiết kế Web",
    subtitle: "Khóa học trực tuyến - 2026",
    major: "Github",
    year: "Năm 2026",
    type: "tech",
    image: "https://i.ibb.co/ch0b9mfY/Thi-t-k-website.png",
    courseImg: "https://i.ibb.co/Z6G0SmwN/Thi-t-k-Website.png",
    certImg: "https://i.ibb.co/Z6G0SmwN/Thi-t-k-Website.png",
    desc: "Kỹ thuật lập trình web, thiết kế giao diện UI/UX chuẩn Responsive và ứng dụng AI Agent Workflows trong tự động hóa vận hành.",
    learned: [
      "Khóa học cập nhật và phát triển kỹ năng thiết kế, xây dựng website hiện đại cùng tích hợp quy trình làm việc tự động bằng AI Agent Workflows."
    ],
    modules: [
      { code: "MOD-01", title: "HTML5, CSS3, JavaScript, PHP, C++", focus: "Kỹ thuật lập trình web đa nền tảng.", icon: "code" },
      { code: "MOD-02", title: "Thiết kế giao diện Responsive và nguyên lý UI/UX", focus: "Tối ưu hóa trải nghiệm người dùng trên mọi thiết bị.", icon: "layout" },
      { code: "MOD-03", title: "Thiết lập AI Agent Workflows trong tự động hóa", focus: "Ứng dụng AI vào quy trình vận hành tự động.", icon: "sparkles" }
    ],
    results: [
      "Xây dựng hoàn chỉnh các hệ thống website, tối ưu giao diện trải nghiệm người dùng và ứng dụng thành thạo AI vào tự động hóa vận hành."
    ],
    hashtags: ["#WebDesign", "#Github", "#UIUX", "#AIWorkflows", "#Responsive"],
    icon: "code",
    theme: { text: "text-blue-600 dark:text-blue-400", badge: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300", iconBg: "bg-blue-100/80 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400" }
  },
  {
    id: 2,
    title: "Phân tích dữ liệu",
    subtitle: "Khóa học trực tuyến - 2019",
    major: "Prudential Vietnam",
    year: "Năm 2019",
    type: "tech",
    image: "https://i.ibb.co/tMsL6zYH/Ph-n-t-ch-d-li-u.png",
    courseImg: "https://i.ibb.co/bj6CYy2L/Ph-n-t-ch-d-li-u.png",
    certImg: "https://i.ibb.co/bj6CYy2L/Ph-n-t-ch-d-li-u.png",
    desc: "Chương trình đào tạo chuyên sâu về khai thác, xử lý và mô hình hóa dữ liệu lớn nhằm phục vụ công tác quản trị doanh nghiệp.",
    learned: [
      "Làm chủ các công cụ phân tích dữ liệu lớn, tối ưu hóa quá trình ra quyết định dựa trên dữ liệu thời gian thực."
    ],
    modules: [
      { code: "MOD-01", title: "Phân tích dữ liệu", focus: "Khai thác và xử lý dữ liệu thô.", icon: "database" },
      { code: "MOD-02", title: "Trực quan hóa dữ liệu", focus: "Biểu diễn dữ liệu qua biểu đồ.", icon: "bar-chart" },
      { code: "MOD-03", title: "Thiết lập hệ thống báo cáo KPI tự động", focus: "Tự động hóa luồng báo cáo.", icon: "settings" },
      { code: "MOD-04", title: "Xây dựng Dashboard điều hành", focus: "Quản trị qua dữ liệu thời gian thực.", icon: "monitor" }
    ],
    results: [
      "Làm chủ các công cụ phân tích dữ liệu"
    ],
    hashtags: ["#DataAnalytics", "#Prudential", "#BigData", "#KPI", "#Dashboard"],
    icon: "bar-chart",
    theme: { text: "text-emerald-600 dark:text-emerald-400", badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300", iconBg: "bg-emerald-100/80 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400" }
  },
  {
    id: 3,
    title: "Quản trị rủi ro",
    subtitle: "Khóa học trực tuyến - 2017",
    major: "Prudential Vietnam",
    year: "Năm 2017",
    type: "management",
    image: "https://i.ibb.co/zhGPcgVM/Quan-l-rui-ro.png",
    courseImg: "https://i.ibb.co/nN5wcyDy/Qu-n-l-r-i-ro.png",
    certImg: "https://i.ibb.co/nN5wcyDy/Qu-n-l-r-i-ro.png",
    desc: "Đào tạo nâng cao năng lực nhận diện, đánh giá và kiểm soát rủi ro trong hoạt động vận hành và dịch vụ khách hàng.",
    modules: [
      { code: "MOD-01", title: "Quy trình đánh giá rủi ro vận hành", focus: "Nhận diện rủi ro tiềm ẩn.", icon: "shield" },
      { code: "MOD-02", title: "Kiểm soát điểm nghẽn hệ thống", focus: "Tối ưu hóa luồng vận hành.", icon: "activity" },
      { code: "MOD-03", title: "Xử lý khủng hoảng truyền thông", focus: "Quản trị uy tín thương hiệu.", icon: "megaphone" },
      { code: "MOD-04", title: "Giải quyết khiếu nại cấp cao", focus: "Xử lý các tình huống phức tạp.", icon: "users" }
    ],
    results: [
      "Cấp chứng chỉ mã PRU-RM-2017-104; nâng cao năng lực phòng ngừa rủi ro và ứng phó hiệu quả trước các sự cố vận hành."
    ],
    hashtags: ["#RiskManagement", "#Prudential", "#OperationalRisk", "#CrisisManagement"],
    icon: "shield",
    theme: { text: "text-rose-600 dark:text-rose-400", badge: "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300", iconBg: "bg-rose-100/80 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400" }
  },
  {
    id: 4,
    title: "Quản lý dự án",
    subtitle: "Khóa học trực tuyến - 2016",
    major: "Prudential Vietnam",
    year: "Năm 2016",
    type: "management",
    image: "https://i.ibb.co/nq6921Zf/Qu-n-l-d-n.png",
    courseImg: "https://i.ibb.co/4ZBDkbHp/Qu-n-l-d-n.png",
    certImg: "https://i.ibb.co/4ZBDkbHp/Qu-n-l-d-n.png",
    desc: "Khóa học quản trị dự án theo phương pháp luận chuẩn quốc tế, kiểm soát toàn diện vòng đời dự án.",
    modules: [
      { code: "MOD-01", title: "Lập kế hoạch dự án", focus: "Định hình mục tiêu và phạm vi.", icon: "calendar" },
      { code: "MOD-02", title: "Phân bổ nguồn lực", focus: "Tối ưu hóa nhân sự và tài chính.", icon: "users" },
      { code: "MOD-03", title: "Quản lý tiến độ & ngân sách", focus: "Kiểm soát thực thi và chi phí.", icon: "clock" },
      { code: "MOD-04", title: "Đảm bảo chất lượng & đánh giá", focus: "Kiểm soát QA/QC sau triển khai.", icon: "check-circle" }
    ],
    results: [
      "Cấp chứng chỉ mã PRU-PM-2016-042; làm chủ kỹ năng quản lý các dự án cải tiến dịch vụ đúng tiến độ và tối ưu chi phí."
    ],
    hashtags: ["#ProjectManagement", "#Prudential", "#PMP", "#ServiceImprovement"],
    icon: "briefcase",
    theme: { text: "text-amber-600 dark:text-amber-400", badge: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300", iconBg: "bg-amber-100/80 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400" }
  },
  {
    id: 5,
    title: "Quản lý cấp cao",
    subtitle: "Phát triển lãnh đạo - 2015",
    major: "Dale Carnegie & VED",
    year: "Năm 2015",
    type: "management",
    image: "https://i.ibb.co/ymVcsfvC/Qu-n-l-c-p-cao.png",
    courseImg: "https://i.ibb.co/ymVcsfvC/Qu-n-l-c-p-cao.png",
    certImg: "https://i.ibb.co/ymVcsfvC/Qu-n-l-c-p-cao.png",
    desc: "Chương trình phát triển năng lực điều hành và tư duy lãnh đạo chiến lược dành cho quản lý cấp cao.",
    modules: [
      { code: "MOD-01", title: "Tư duy lãnh đạo chiến lược", focus: "Định hướng tầm nhìn dài hạn.", icon: "compass" },
      { code: "MOD-02", title: "Quản trị sự thay đổi", focus: "Dẫn dắt tổ chức qua biến động.", icon: "refresh" },
      { code: "MOD-03", title: "Xây dựng bộ máy tổ chức", focus: "Thiết lập cấu trúc vận hành.", icon: "layers" },
      { code: "MOD-04", title: "Truyền cảm hứng và điều hành", focus: "Lãnh đạo và quản trị hiệu suất.", icon: "zap" }
    ],
    results: [
      "Hoàn thành chương trình quản trị cấp cao, nâng cao năng lực định hướng chiến lược và phát triển bộ máy quy mô lớn."
    ],
    hashtags: ["#SeniorManagement", "#DaleCarnegie", "#Leadership", "#Strategy"],
    icon: "award",
    theme: { text: "text-violet-600 dark:text-violet-400", badge: "bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300", iconBg: "bg-violet-100/80 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400" }
  },
  {
    id: 6,
    title: "Quản lý cấp trung",
    subtitle: "Kỹ năng điều hành - 2014",
    major: "Dale Carnegie & VED",
    year: "Năm 2014",
    type: "management",
    image: "https://i.ibb.co/jkHkZ1pd/Qu-n-l-c-p-trung.png",
    courseImg: "https://i.ibb.co/jkHkZ1pd/Qu-n-l-c-p-trung.png",
    certImg: "https://i.ibb.co/jkHkZ1pd/Qu-n-l-c-p-trung.png",
    desc: "Khóa đào tạo kỹ năng quản lý thực chiến và điều hành đội ngũ phòng ban hiệu quả.",
    modules: [
      { code: "MOD-01", title: "Kỹ năng quản trị nhân sự", focus: "Quản lý và phát triển con người.", icon: "users" },
      { code: "MOD-02", title: "Giao việc và ủy quyền", focus: "Tối ưu hóa hiệu suất đội ngũ.", icon: "check-square" },
      { code: "MOD-03", title: "Giám sát hiệu suất", focus: "Theo dõi và đánh giá KPI.", icon: "activity" },
      { code: "MOD-04", title: "Huấn luyện đội ngũ", focus: "Coaching và hợp tác liên phòng ban.", icon: "user-plus" }
    ],
    results: [
      "Tối ưu hóa năng lực quản lý đội nhóm, nâng cao chỉ số hoàn thành mục tiêu và duy trì sự gắn kết nhân sự."
    ],
    hashtags: ["#MiddleManagement", "#DaleCarnegie", "#TeamManagement", "#Coaching"],
    icon: "users",
    theme: { text: "text-cyan-600 dark:text-cyan-400", badge: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300", iconBg: "bg-cyan-100/80 text-cyan-600 dark:bg-cyan-950/60 dark:text-cyan-400" }
  },
  {
    id: 7,
    title: "Kỹ năng Đào tạo",
    subtitle: "Sư phạm doanh nghiệp - 2013",
    major: "VietnamWorks",
    year: "Năm 2013",
    type: "management",
    image: "https://i.ibb.co/GQVw12Vb/o-t-o.png",
    courseImg: "https://i.ibb.co/GQVw12Vb/o-t-o.png",
    certImg: "https://i.ibb.co/GQVw12Vb/o-t-o.png",
    desc: "Khóa học phương pháp sư phạm doanh nghiệp, thiết kế bài giảng và nghệ thuật làm chủ sân khấu truyền cảm hứng.",
    modules: [
      { code: "MOD-01", title: "Xây dựng giáo trình đào tạo nội bộ", focus: "Thiết kế nội dung chuẩn học thuật.", icon: "book" },
      { code: "MOD-02", title: "Phương pháp truyền đạt sư phạm", focus: "Kỹ thuật giảng dạy hiện đại.", icon: "message-circle" },
      { code: "MOD-03", title: "Kỹ năng đứng lớp", focus: "Quản trị năng lượng và tương tác.", icon: "user" },
      { code: "MOD-04", title: "Nghệ thuật thuyết trình", focus: "Làm chủ sân khấu trước đám đông.", icon: "mic" }
    ],
    results: [
      "Thành thạo việc chuẩn hóa và trực tiếp đứng lớp các chương trình đào tạo nhân sự nội bộ quy mô lớn."
    ],
    hashtags: ["#TrainingSkills", "#VietnamWorks", "#L&D", "#Trainer"],
    icon: "presentation",
    theme: { text: "text-indigo-600 dark:text-indigo-400", badge: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300", iconBg: "bg-indigo-100/80 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400" }
  },
  {
    id: 8,
    title: "Kỹ năng Thuyết trình",
    subtitle: "VietnamWorks - 2013",
    major: "VietnamWorks",
    year: "Năm 2013",
    type: "management",
    image: "https://i.ibb.co/WvK6BvgL/Thuy-t-tr-nh.png",
    courseImg: "https://i.ibb.co/WvK6BvgL/Thuy-t-tr-nh.png",
    certImg: "https://i.ibb.co/WvK6BvgL/Thuy-t-tr-nh.png",
    desc: "Khóa học phương pháp sư phạm doanh nghiệp, thiết kế bài giảng và nghệ thuật làm chủ sân khấu truyền cảm hứng.",
    modules: [
      { code: "MOD-01", title: "Xây dựng giáo trình đào tạo nội bộ", focus: "Thiết kế nội dung bài thuyết trình.", icon: "file-text" },
      { code: "MOD-02", title: "Phương pháp truyền đạt sư phạm", focus: "Giao tiếp thuyết phục.", icon: "message-square" },
      { code: "MOD-03", title: "Kỹ năng đứng lớp", focus: "Tác phong chuyên nghiệp.", icon: "user" },
      { code: "MOD-04", title: "Nghệ thuật thuyết trình trước đám đông", focus: "Truyền cảm hứng và thuyết phục.", icon: "mic" }
    ],
    results: [
      "Thành thạo việc chuẩn hóa và trực tiếp đứng lớp các chương trình đào tạo nhân sự nội bộ quy mô lớn."
    ],
    hashtags: ["#Presentation", "#PublicSpeaking", "#VietnamWorks", "#Communication"],
    icon: "mic",
    theme: { text: "text-blue-600 dark:text-blue-400", badge: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300", iconBg: "bg-blue-100/80 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400" }
  },
  {
    id: 9,
    title: "Kỹ năng Phỏng vấn",
    subtitle: "VietnamWorks - 2013",
    major: "VietnamWorks",
    year: "Năm 2013",
    type: "management",
    image: "https://i.ibb.co/1JqvPrND/Ph-ng-v-n.png",
    courseImg: "https://i.ibb.co/1JqvPrND/Ph-ng-v-n.png",
    certImg: "https://i.ibb.co/1JqvPrND/Ph-ng-v-n.png",
    desc: "Chương trình đào tạo kỹ thuật phỏng vấn và đánh giá tiềm năng nhân sự chuyên nghiệp.",
    modules: [
      { code: "MOD-01", title: "Kỹ thuật phỏng vấn hành vi (BEI)", focus: "Khai thác kinh nghiệm thực tế.", icon: "help-circle" },
      { code: "MOD-02", title: "Đánh giá ứng viên theo khung ASK", focus: "Attitude, Skill, Knowledge.", icon: "check-circle" },
      { code: "MOD-03", title: "Kỹ năng giao tiếp trong phỏng vấn", focus: "Tương tác và kết nối ứng viên.", icon: "users" }
    ],
    results: [
      "Nâng cao khả năng đánh giá chính xác năng lực và sự phù hợp của ứng viên trong các buổi phỏng vấn."
    ],
    hashtags: ["#InterviewSkills", "#Recruitment", "#VietnamWorks", "#HR"],
    icon: "user-check",
    theme: { text: "text-purple-600 dark:text-purple-400", badge: "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300", iconBg: "bg-purple-100/80 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400" }
  },
  {
    id: 10,
    title: "Kỹ năng Tuyển dụng",
    subtitle: "VietnamWorks - 2013",
    major: "VietnamWorks",
    year: "Năm 2013",
    type: "management",
    image: "https://i.ibb.co/1JqvPrND/Ph-ng-v-n.png",
    courseImg: "https://i.ibb.co/1JqvPrND/Ph-ng-v-n.png",
    certImg: "https://i.ibb.co/1JqvPrND/Ph-ng-v-n.png",
    desc: "Chương trình đào tạo chiến lược tuyển dụng và xây dựng thương hiệu tuyển dụng.",
    modules: [
      { code: "MOD-01", title: "Xây dựng tiêu chí tuyển dụng", focus: "Định hình chân dung ứng viên.", icon: "list" },
      { code: "MOD-02", title: "Quy trình thu hút nhân tài", focus: "Xây dựng phễu tuyển dụng.", icon: "target" },
      { code: "MOD-03", title: "Lập kế hoạch tuyển dụng", focus: "Quản trị tiến độ và nguồn lực.", icon: "calendar" },
      { code: "MOD-04", title: "Tối ưu hóa chi phí tuyển dụng", focus: "Hiệu quả ngân sách nhân sự.", icon: "dollar-sign" }
    ],
    results: [
      "Chuẩn hóa quy trình tuyển dụng, gia tăng tỷ lệ thu hút và tuyển dụng nhân sự chất lượng cao."
    ],
    hashtags: ["#Recruitment", "#TalentAcquisition", "#VietnamWorks", "#EmployerBranding"],
    icon: "search",
    theme: { text: "text-cyan-600 dark:text-cyan-400", badge: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300", iconBg: "bg-cyan-100/80 text-cyan-600 dark:bg-cyan-950/60 dark:text-cyan-400" }
  },
  {
    id: 11,
    title: "Cử nhân CNTT",
    subtitle: "Đại học Công nghệ Sài Gòn (STU) - 2007",
    major: "Trường ĐH Công nghệ Sài Gòn (STU)",
    year: "Năm 2007",
    type: "tech",
    image: "https://i.ibb.co/YBWVsjDs/C-nh-n-CNTT.png",
    courseImg: "https://i.ibb.co/YBWVsjDs/C-nh-n-CNTT.png",
    certImg: "https://i.ibb.co/YBWVsjDs/C-nh-n-CNTT.png",
    desc: "Chương trình đào tạo đại học chính quy về khoa học máy tính, kỹ thuật phần mềm và hệ thống thông tin.",
    modules: [
      { code: "MOD-01", title: "Lập trình máy tính & Cơ sở dữ liệu", focus: "Nền tảng phát triển phần mềm.", icon: "database" },
      { code: "MOD-02", title: "Mạng máy tính và viễn thông", focus: "Kiến trúc hạ tầng mạng.", icon: "network" },
      { code: "MOD-03", title: "An toàn thông tin", focus: "Bảo mật dữ liệu hệ thống.", icon: "lock" },
      { code: "MOD-04", title: "Phân tích thiết kế hệ thống", focus: "Xây dựng giải pháp phần mềm.", icon: "layers" }
    ],
    results: [
      "Tốt nghiệp Cử nhân CNTT chính quy; tạo nền tảng công nghệ vững chắc hỗ trợ quản trị và chuyển đổi số."
    ],
    hashtags: ["#IT", "#STU", "#SoftwareEngineering", "#ComputerScience"],
    icon: "graduation-cap",
    theme: { text: "text-blue-600 dark:text-blue-400", badge: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300", iconBg: "bg-blue-100/80 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400" }
  },
  {
    id: 12,
    title: "Tổng đài viên",
    subtitle: "MobiFone - 2007",
    major: "MobiFone",
    year: "Năm 2007",
    type: "management",
    image: "https://i.ibb.co/49h4XHh/T-ng-i-vi-n-Mobifone.png",
    courseImg: "https://i.ibb.co/49h4XHh/T-ng-i-vi-n-Mobifone.png",
    certImg: "https://i.ibb.co/49h4XHh/T-ng-i-vi-n-Mobifone.png",
    desc: "Chương trình đào tạo chuẩn hóa nghiệp vụ vận hành Contact Center và chăm sóc khách hàng viễn thông.",
    modules: [
      { code: "MOD-01", title: "Nghiệp vụ tổng đài viễn thông", focus: "Quy trình xử lý cuộc gọi.", icon: "phone" },
      { code: "MOD-02", title: "Kỹ năng lắng nghe thấu cảm", focus: "Chăm sóc khách hàng tận tâm.", icon: "heart" },
      { code: "MOD-03", title: "Giải quyết tình huống khó", focus: "Xử lý khiếu nại phức tạp.", icon: "alert-triangle" }
    ],
    results: [
      "Đạt chứng nhận Tổng đài viên xuất sắc, làm nền tảng phát triển sự nghiệp CSKH thực chiến."
    ],
    hashtags: ["#ContactCenter", "#MobiFone", "#CustomerService", "#Telecom"],
    icon: "phone-call",
    theme: { text: "text-red-600 dark:text-red-400", badge: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-blue-300", iconBg: "bg-red-100/80 text-red-600 dark:bg-red-950/60 dark:text-red-400" }
  },
  {
    id: 13,
    title: "Quản trị CCNA",
    subtitle: "Nhất Nghệ - 2006",
    major: "Trường Nghề Nhất Nghệ",
    year: "Năm 2006",
    type: "tech",
    image: "https://i.ibb.co/chHTpBJL/CCNA.png",
    courseImg: "https://i.ibb.co/chHTpBJL/CCNA.png",
    certImg: "https://i.ibb.co/chHTpBJL/CCNA.png",
    desc: "Chương trình đào tạo quản trị hạ tầng mạng Cisco tiêu chuẩn quốc tế.",
    modules: [
      { code: "MOD-01", title: "Thiết kế mạng & TCP/IP", focus: "Cấu trúc hạ tầng mạng doanh nghiệp.", icon: "globe" },
      { code: "MOD-02", title: "Routing và Switching", focus: "Kỹ thuật định tuyến Cisco.", icon: "navigation" },
      { code: "MOD-03", title: "An toàn an ninh mạng", focus: "Bảo mật hệ thống mạng LAN/WAN.", icon: "shield" }
    ],
    results: [
      "Hoàn thành chứng chỉ CCNA, làm chủ kỹ năng thiết kế và vận hành hệ thống hạ tầng mạng doanh nghiệp."
    ],
    hashtags: ["#CCNA", "#Cisco", "#Networking", "#NhatNghe"],
    icon: "network",
    theme: { text: "text-teal-600 dark:text-teal-400", badge: "bg-teal-100 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300", iconBg: "bg-teal-100/80 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400" }
  },
  {
    id: 14,
    title: "Quản trị MCSA",
    subtitle: "Nhất Nghệ - 2005",
    major: "Trường Nghề Nhất Nghệ",
    year: "Năm 2005",
    type: "tech",
    image: "https://i.ibb.co/Jwf4rb4G/MCSA.png",
    courseImg: "https://i.ibb.co/Jwf4rb4G/MCSA.png",
    certImg: "https://i.ibb.co/Jwf4rb4G/MCSA.png",
    desc: "Khóa đào tạo chuyên sâu về quản trị hạ tầng hệ thống máy chủ doanh nghiệp Microsoft Windows Server.",
    modules: [
      { code: "MOD-01", title: "Quản trị Windows Server", focus: "Cài đặt và cấu hình máy chủ.", icon: "server" },
      { code: "MOD-02", title: "Cấu hình Active Directory", focus: "Quản trị người dùng và chính sách.", icon: "users" },
      { code: "MOD-03", title: "Dịch vụ DNS, DHCP", focus: "Quản trị hạ tầng mạng lõi.", icon: "globe" }
    ],
    results: [
      "Hoàn thành khóa học MCSA, thành thạo việc quản lý và triển khai hệ thống máy chủ mạng doanh nghiệp."
    ],
    hashtags: ["#MCSA", "#Microsoft", "#SystemAdmin", "#Server"],
    icon: "server",
    theme: { text: "text-purple-600 dark:text-purple-400", badge: "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300", iconBg: "bg-purple-100/80 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400" }
  }
];
