export interface EducationBookTheme {
  color: string;
  gradient: string;
  glow: string;
  bgSoft: string;
  cardBgLight: string;
  cardBgDark: string;
  border: string;
  spine: string;
}

export interface EducationBook {
  id: number;
  code: string;
  title: string;
  category: "tech" | "management" | "skills" | "network";
  year: string;
  org: string;
  format: string;
  focus: string;
  desc: string;
  modules: string[];
  outcome: string;
  certCode: string;
  bannerImg: string;
  certImg: string;
  theme: EducationBookTheme;
}

export interface EducationCard {
  id: number;
  title: string;
  subtitle?: string;
  major?: string;
  year: string;
  type?: "tech" | "management" | "skills" | "network";
  image?: string;
  courseImg?: string;
  certImg?: string;
  speakerImg?: string;
  desc: string;
  learned?: string[];
  modules?: any[];
  results?: string[];
  hashtags?: string[];
  icon?: string;
}

export const EDUCATION_BOOKS_DATA: EducationBook[] = [
  {
    id: 1,
    code: "5.1",
    title: "Thiết kế Web",
    category: "tech",
    year: "2026",
    org: "Github",
    format: "Tự học",
    focus: "Kỹ thuật lập trình web, thiết kế giao diện UI/UX chuẩn Responsive và ứng dụng AI Agent Workflows trong tự động hóa vận hành.",
    desc: "Khóa học cập nhật và phát triển kỹ năng thiết kế, xây dựng website hiện đại cùng tích hợp quy trình làm việc tự động bằng AI Agent Workflows.",
    modules: [
      "HTML5, CSS3, JavaScript, PHP, C++",
      "Thiết kế giao diện Responsive & Nguyên lý UI/UX",
      "Thiết lập AI Agent Workflows trong tự động hóa"
    ],
    outcome: "Xây dựng hoàn chỉnh các hệ thống website, tối ưu giao diện trải nghiệm người dùng và ứng dụng thành thạo AI vào tự động hóa vận hành.",
    certCode: "WEB-DEV-AI-2026",
    bannerImg: "https://i.ibb.co/ch0b9mfY/Thi-t-k-website.png",
    certImg: "https://i.ibb.co/Z6G0SmwN/Thi-t-k-Website.png",
    theme: {
      color: "#0284c7",
      gradient: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
      glow: "rgba(14, 165, 233, 0.35)",
      bgSoft: "rgba(14, 165, 233, 0.08)",
      cardBgLight: "linear-gradient(145deg, rgba(240, 249, 255, 0.92) 0%, rgba(224, 242, 254, 0.78) 100%)",
      cardBgDark: "linear-gradient(145deg, rgba(8, 25, 45, 0.92) 0%, rgba(12, 38, 62, 0.82) 100%)",
      border: "rgba(14, 165, 233, 0.4)",
      spine: "linear-gradient(to bottom, #38bdf8, #0284c7, #0369a1)"
    }
  },
  {
    id: 2,
    code: "5.2",
    title: "Phân tích dữ liệu",
    category: "tech",
    year: "2019",
    org: "Prudential Vietnam",
    format: "Đào tạo doanh nghiệp",
    focus: "Khai thác, xử lý và mô hình hóa dữ liệu lớn nhằm phục vụ công tác quản trị doanh nghiệp.",
    desc: "Chương trình đào tạo chuyên sâu về khai thác, xử lý và mô hình hóa dữ liệu lớn nhằm phục vụ công tác quản trị doanh nghiệp.",
    modules: [
      "Phân tích dữ liệu lớn",
      "Trực quan hóa dữ liệu",
      "Hệ thống báo cáo KPI tự động",
      "Xây dựng Dashboard điều hành"
    ],
    outcome: "Làm chủ các công cụ phân tích dữ liệu lớn, tối ưu hóa quá trình ra quyết định dựa trên dữ liệu thời gian thực.",
    certCode: "PRU-DA-2019-088",
    bannerImg: "https://i.ibb.co/tMsL6zYH/Ph-n-t-ch-d-li-u.png",
    certImg: "https://i.ibb.co/bj6CYy2L/Ph-n-t-ch-d-li-u.png",
    theme: {
      color: "#059669",
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      glow: "rgba(16, 185, 129, 0.35)",
      bgSoft: "rgba(16, 185, 129, 0.08)",
      cardBgLight: "linear-gradient(145deg, rgba(236, 253, 245, 0.92) 0%, rgba(209, 250, 229, 0.78) 100%)",
      cardBgDark: "linear-gradient(145deg, rgba(6, 35, 25, 0.92) 0%, rgba(10, 48, 35, 0.82) 100%)",
      border: "rgba(16, 185, 129, 0.4)",
      spine: "linear-gradient(to bottom, #34d399, #059669, #047857)"
    }
  },
  {
    id: 3,
    code: "5.3",
    title: "Quản trị rủi ro",
    category: "management",
    year: "2017",
    org: "Prudential Vietnam",
    format: "Nâng cao năng lực vận hành",
    focus: "Nhận diện, đánh giá và kiểm soát rủi ro trong hoạt động vận hành và dịch vụ khách hàng.",
    desc: "Đào tạo nâng cao năng lực nhận diện, đánh giá và kiểm soát rủi ro trong hoạt động vận hành và dịch vụ khách hàng.",
    modules: [
      "Quy trình đánh giá rủi ro vận hành",
      "Kiểm soát điểm nghẽn hệ thống",
      "Xử lý khủng hoảng truyền thông",
      "Giải quyết khiếu nại cấp cao"
    ],
    outcome: "Cấp chứng chỉ mã PRU-RM-2017-104; nâng cao năng lực phòng ngừa rủi ro và ứng phó hiệu quả trước các sự cố vận hành.",
    certCode: "PRU-RM-2017-104",
    bannerImg: "https://i.ibb.co/zhGPcgVM/Quan-l-rui-ro.png",
    certImg: "https://i.ibb.co/nN5wcyDy/Qu-n-l-r-i-ro.png",
    theme: {
      color: "#e11d48",
      gradient: "linear-gradient(135deg, #f43f5e 0%, #be123c 100%)",
      glow: "rgba(244, 63, 94, 0.35)",
      bgSoft: "rgba(244, 63, 94, 0.08)",
      cardBgLight: "linear-gradient(145deg, rgba(255, 241, 242, 0.92) 0%, rgba(255, 228, 230, 0.78) 100%)",
      cardBgDark: "linear-gradient(145deg, rgba(45, 10, 20, 0.92) 0%, rgba(65, 14, 28, 0.82) 100%)",
      border: "rgba(244, 63, 94, 0.4)",
      spine: "linear-gradient(to bottom, #fb7185, #e11d48, #9f1239)"
    }
  },
  {
    id: 4,
    code: "5.4",
    title: "Quản lý dự án",
    category: "management",
    year: "2016",
    org: "Prudential Vietnam",
    format: "Phương pháp luận quốc tế",
    focus: "Kiểm soát toàn diện vòng đời dự án theo chuẩn quốc tế.",
    desc: "Khóa học quản trị dự án theo phương pháp luận chuẩn quốc tế, kiểm soát toàn diện vòng đời dự án.",
    modules: [
      "Lập kế hoạch dự án & Phân bổ nguồn lực",
      "Quản lý tiến độ & Kiểm soát ngân sách",
      "Đảm bảo chất lượng và đánh giá sau triển khai"
    ],
    outcome: "Cấp chứng chỉ mã PRU-PM-2016-042; làm chủ kỹ năng quản lý các dự án cải tiến dịch vụ đúng tiến độ và tối ưu chi phí.",
    certCode: "PRU-PM-2016-042",
    bannerImg: "https://i.ibb.co/nq6921Zf/Qu-n-l-d-n.png",
    certImg: "https://i.ibb.co/4ZBDkbHp/Qu-n-l-d-n.png",
    theme: {
      color: "#7c3aed",
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
      glow: "rgba(139, 92, 246, 0.35)",
      bgSoft: "rgba(139, 92, 246, 0.08)",
      cardBgLight: "linear-gradient(145deg, rgba(245, 243, 255, 0.92) 0%, rgba(237, 233, 254, 0.78) 100%)",
      cardBgDark: "linear-gradient(145deg, rgba(28, 12, 50, 0.92) 0%, rgba(42, 18, 72, 0.82) 100%)",
      border: "rgba(139, 92, 246, 0.4)",
      spine: "linear-gradient(to bottom, #a78bfa, #7c3aed, #5b21b6)"
    }
  },
  {
    id: 5,
    code: "5.5",
    title: "Quản lý cấp cao",
    category: "management",
    year: "2015",
    org: "Dale Carnegie & VED",
    format: "Lãnh đạo cấp cao",
    focus: "Phát triển năng lực điều hành và tư duy lãnh đạo chiến lược dành cho quản lý cấp cao.",
    desc: "Chương trình phát triển năng lực điều hành và tư duy lãnh đạo chiến lược dành cho quản lý cấp cao.",
    modules: [
      "Tư duy lãnh đạo chiến lược",
      "Quản trị sự thay đổi",
      "Xây dựng bộ máy tổ chức",
      "Truyền cảm hứng và điều hành doanh nghiệp"
    ],
    outcome: "Hoàn thành chương trình quản trị cấp cao, nâng cao năng lực định hướng chiến lược và phát triển bộ máy quy mô lớn.",
    certCode: "DC-VED-EXEC-2015",
    bannerImg: "https://i.ibb.co/ymVcsfvC/Qu-n-l-c-p-cao.png",
    certImg: "https://i.ibb.co/ymVcsfvC/Qu-n-l-c-p-cao.png",
    theme: {
      color: "#d97706",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)",
      glow: "rgba(245, 158, 11, 0.35)",
      bgSoft: "rgba(245, 158, 11, 0.08)",
      cardBgLight: "linear-gradient(145deg, rgba(254, 243, 199, 0.92) 0%, rgba(253, 230, 138, 0.76) 100%)",
      cardBgDark: "linear-gradient(145deg, rgba(42, 26, 8, 0.92) 0%, rgba(62, 38, 12, 0.82) 100%)",
      border: "rgba(245, 158, 11, 0.4)",
      spine: "linear-gradient(to bottom, #fbbf24, #d97706, #92400e)"
    }
  },
  {
    id: 6,
    code: "5.6",
    title: "Quản lý cấp trung",
    category: "management",
    year: "2014",
    org: "Dale Carnegie & VED",
    format: "Quản lý thực chiến",
    focus: "Kỹ năng quản lý thực chiến và điều hành đội ngũ phòng ban hiệu quả.",
    desc: "Khóa đào tạo kỹ năng quản lý thực chiến và điều hành đội ngũ phòng ban hiệu quả.",
    modules: [
      "Kỹ năng quản trị nhân sự",
      "Giao việc và ủy quyền",
      "Giám sát hiệu suất",
      "Huấn luyện đội ngũ & hợp tác liên phòng ban"
    ],
    outcome: "Tối ưu hóa năng lực quản lý đội nhóm, nâng cao chỉ số hoàn thành mục tiêu và duy trì sự gắn kết nhân sự.",
    certCode: "DC-VED-MM-2014",
    bannerImg: "https://i.ibb.co/jkHkZ1pd/Qu-n-l-c-p-trung.png",
    certImg: "https://i.ibb.co/jkHkZ1pd/Qu-n-l-c-p-trung.png",
    theme: {
      color: "#4f46e5",
      gradient: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
      glow: "rgba(99, 102, 241, 0.35)",
      bgSoft: "rgba(99, 102, 241, 0.08)",
      cardBgLight: "linear-gradient(145deg, rgba(238, 242, 255, 0.92) 0%, rgba(224, 231, 255, 0.78) 100%)",
      cardBgDark: "linear-gradient(145deg, rgba(18, 20, 50, 0.92) 0%, rgba(28, 30, 70, 0.82) 100%)",
      border: "rgba(99, 102, 241, 0.4)",
      spine: "linear-gradient(to bottom, #818cf8, #4f46e5, #3730a3)"
    }
  },
  {
    id: 7,
    code: "5.7",
    title: "Kỹ năng Đào tạo",
    category: "skills",
    year: "2013",
    org: "VietnamWorks",
    format: "Sư phạm doanh nghiệp",
    focus: "Phương pháp sư phạm doanh nghiệp, thiết kế bài giảng và nghệ thuật làm chủ sân khấu truyền cảm hứng.",
    desc: "Khóa học phương pháp sư phạm doanh nghiệp, thiết kế bài giảng và nghệ thuật làm chủ sân khấu truyền cảm hứng.",
    modules: [
      "Xây dựng giáo trình đào tạo nội bộ",
      "Phương pháp truyền đạt sư phạm",
      "Kỹ năng đứng lớp & Thuyết trình trước đám đông"
    ],
    outcome: "Thành thạo việc chuẩn hóa và trực tiếp đứng lớp các chương trình đào tạo nhân sự nội bộ quy mô lớn.",
    certCode: "VNW-TOT-2013",
    bannerImg: "https://i.ibb.co/GQVw12Vb/o-t-o.png",
    certImg: "https://i.ibb.co/GQVw12Vb/o-t-o.png",
    theme: {
      color: "#ea580c",
      gradient: "linear-gradient(135deg, #f97316 0%, #c2410c 100%)",
      glow: "rgba(249, 115, 22, 0.35)",
      bgSoft: "rgba(249, 115, 22, 0.08)",
      cardBgLight: "linear-gradient(145deg, rgba(255, 247, 237, 0.92) 0%, rgba(254, 215, 170, 0.76) 100%)",
      cardBgDark: "linear-gradient(145deg, rgba(45, 18, 8, 0.92) 0%, rgba(65, 26, 12, 0.82) 100%)",
      border: "rgba(249, 115, 22, 0.4)",
      spine: "linear-gradient(to bottom, #fb923c, #ea580c, #9a3412)"
    }
  },
  {
    id: 8,
    code: "5.8",
    title: "Kỹ năng Thuyết trình",
    category: "skills",
    year: "2013",
    org: "VietnamWorks",
    format: "Truyền thông & Thuyết phục",
    focus: "Phương pháp sư phạm doanh nghiệp, thiết kế bài giảng và nghệ thuật làm chủ sân khấu truyền cảm hứng.",
    desc: "Khóa học phương pháp sư phạm doanh nghiệp, thiết kế bài giảng và nghệ thuật làm chủ sân khấu truyền cảm hứng.",
    modules: [
      "Xây dựng giáo trình đào tạo nội bộ",
      "Phương pháp truyền đạt sư phạm",
      "Kỹ năng đứng lớp & Thuyết trình chuyên nghiệp"
    ],
    outcome: "Thành thạo việc chuẩn hóa và trực tiếp đứng lớp các chương trình đào tạo nhân sự nội bộ quy mô lớn.",
    certCode: "VNW-PRES-2013",
    bannerImg: "https://i.ibb.co/WvK6BvgL/Thuy-t-tr-nh.png",
    certImg: "https://i.ibb.co/WvK6BvgL/Thuy-t-tr-nh.png",
    theme: {
      color: "#c026d3",
      gradient: "linear-gradient(135deg, #e879f9 0%, #a21caf 100%)",
      glow: "rgba(232, 121, 249, 0.35)",
      bgSoft: "rgba(232, 121, 249, 0.08)",
      cardBgLight: "linear-gradient(145deg, rgba(253, 244, 255, 0.92) 0%, rgba(250, 232, 255, 0.78) 100%)",
      cardBgDark: "linear-gradient(145deg, rgba(40, 8, 45, 0.92) 0%, rgba(60, 12, 65, 0.82) 100%)",
      border: "rgba(232, 121, 249, 0.4)",
      spine: "linear-gradient(to bottom, #f0abfc, #c026d3, #86198f)"
    }
  },
  {
    id: 9,
    code: "5.9",
    title: "Kỹ năng Phỏng vấn",
    category: "skills",
    year: "2013",
    org: "VietnamWorks",
    format: "Đánh giá nhân tài",
    focus: "Kỹ thuật phỏng vấn hành vi (BEI) và đánh giá chuẩn xác năng lực ứng viên.",
    desc: "Chương trình đào tạo kỹ thuật phỏng vấn và đánh giá tiềm năng nhân sự chuyên nghiệp.",
    modules: [
      "Kỹ thuật phỏng vấn hành vi (BEI)",
      "Đánh giá ứng viên theo khung ASK",
      "Kỹ năng giao tiếp trong phỏng vấn"
    ],
    outcome: "Nâng cao khả năng đánh giá chính xác năng lực và sự phù hợp của ứng viên trong các buổi phỏng vấn.",
    certCode: "VNW-INT-2013",
    bannerImg: "https://i.ibb.co/1JqvPrND/Ph-ng-v-n.png",
    certImg: "https://i.ibb.co/1JqvPrND/Ph-ng-v-n.png",
    theme: {
      color: "#2563eb",
      gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      glow: "rgba(59, 130, 246, 0.35)",
      bgSoft: "rgba(59, 130, 246, 0.08)",
      cardBgLight: "linear-gradient(145deg, rgba(239, 246, 255, 0.92) 0%, rgba(219, 234, 254, 0.78) 100%)",
      cardBgDark: "linear-gradient(145deg, rgba(10, 22, 55, 0.92) 0%, rgba(15, 32, 75, 0.82) 100%)",
      border: "rgba(59, 130, 246, 0.4)",
      spine: "linear-gradient(to bottom, #60a5fa, #2563eb, #1e40af)"
    }
  },
  {
    id: 10,
    code: "5.10",
    title: "Kỹ năng Tuyển dụng",
    category: "skills",
    year: "2013",
    org: "VietnamWorks",
    format: "Chiến lược nhân sự",
    focus: "Chiến lược tuyển dụng và xây dựng thương hiệu tuyển dụng chuyên nghiệp.",
    desc: "Chương trình đào tạo chiến lược tuyển dụng và xây dựng thương hiệu tuyển dụng.",
    modules: [
      "Xây dựng tiêu chí tuyển dụng",
      "Quy trình thu hút nhân tài",
      "Lập kế hoạch & Tối ưu hóa chi phí tuyển dụng"
    ],
    outcome: "Chuẩn hóa quy trình tuyển dụng, gia tăng tỷ lệ thu hút và tuyển dụng nhân sự chất lượng cao.",
    certCode: "VNW-REC-2013",
    bannerImg: "https://i.ibb.co/1JqvPrND/Ph-ng-v-n.png",
    certImg: "https://i.ibb.co/1JqvPrND/Ph-ng-v-n.png",
    theme: {
      color: "#0d9488",
      gradient: "linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)",
      glow: "rgba(20, 184, 166, 0.35)",
      bgSoft: "rgba(20, 184, 166, 0.08)",
      cardBgLight: "linear-gradient(145deg, rgba(240, 253, 250, 0.92) 0%, rgba(204, 251, 241, 0.78) 100%)",
      cardBgDark: "linear-gradient(145deg, rgba(8, 35, 33, 0.92) 0%, rgba(12, 48, 45, 0.82) 100%)",
      border: "rgba(20, 184, 166, 0.4)",
      spine: "linear-gradient(to bottom, #2dd4bf, #0d9488, #115e59)"
    }
  },
  {
    id: 11,
    code: "5.11",
    title: "Cử nhân CNTT",
    category: "tech",
    year: "2007",
    org: "Trường ĐH Công nghệ Sài Gòn (STU)",
    format: "Đại học chính quy",
    focus: "Khoa học máy tính, kỹ thuật phần mềm và kiến trúc hệ thống mạng thông tin.",
    desc: "Chương trình đào tạo đại học chính quy về khoa học máy tính, kỹ thuật phần mềm và hệ thống thông tin.",
    modules: [
      "Lập trình máy tính & Cơ sở dữ liệu",
      "Mạng máy tính và viễn thông",
      "An toàn thông tin",
      "Phân tích thiết kế hệ thống phần mềm"
    ],
    outcome: "Tốt nghiệp Cử nhân CNTT chính quy; tạo nền tảng công nghệ vững chắc hỗ trợ quản trị và chuyển đổi số.",
    certCode: "STU-BS-IT-2007",
    bannerImg: "https://i.ibb.co/YBWVsjDs/C-nh-n-CNTT.png",
    certImg: "https://i.ibb.co/YBWVsjDs/C-nh-n-CNTT.png",
    theme: {
      color: "#dc2626",
      gradient: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)",
      glow: "rgba(239, 68, 68, 0.35)",
      bgSoft: "rgba(239, 68, 68, 0.08)",
      cardBgLight: "linear-gradient(145deg, rgba(254, 242, 242, 0.92) 0%, rgba(254, 226, 226, 0.78) 100%)",
      cardBgDark: "linear-gradient(145deg, rgba(45, 10, 10, 0.92) 0%, rgba(65, 15, 15, 0.82) 100%)",
      border: "rgba(239, 68, 68, 0.4)",
      spine: "linear-gradient(to bottom, #f87171, #dc2626, #991b1b)"
    }
  },
  {
    id: 12,
    code: "5.12",
    title: "Tổng đài viên",
    category: "skills",
    year: "2007",
    org: "MobiFone",
    format: "Chứng nhận chuyên nghiệp",
    focus: "Vận hành Contact Center và chăm sóc khách hàng viễn thông xuất sắc.",
    desc: "Chương trình đào tạo chuẩn hóa nghiệp vụ vận hành Contact Center và chăm sóc khách hàng viễn thông.",
    modules: [
      "Nghiệp vụ tổng đài viễn thông",
      "Quy trình tiếp nhận & xử lý yêu cầu",
      "Kỹ năng lắng nghe thấu cảm",
      "Giải quyết tình huống khó"
    ],
    outcome: "Đạt chứng nhận Tổng đài viên xuất sắc, làm nền tảng phát triển sự nghiệp CSKH thực chiến.",
    certCode: "MBF-CC-2007-99",
    bannerImg: "https://i.ibb.co/49h4XHh/T-ng-i-vi-n-Mobifone.png",
    certImg: "https://i.ibb.co/49h4XHh/T-ng-i-vi-n-Mobifone.png",
    theme: {
      color: "#65a30d",
      gradient: "linear-gradient(135deg, #84cc16 0%, #4d7c0f 100%)",
      glow: "rgba(132, 204, 22, 0.35)",
      bgSoft: "rgba(132, 204, 22, 0.08)",
      cardBgLight: "linear-gradient(145deg, rgba(247, 254, 231, 0.92) 0%, rgba(236, 252, 203, 0.78) 100%)",
      cardBgDark: "linear-gradient(145deg, rgba(22, 38, 8, 0.92) 0%, rgba(32, 52, 10, 0.82) 100%)",
      border: "rgba(132, 204, 22, 0.4)",
      spine: "linear-gradient(to bottom, #a3e635, #65a30d, #3f6212)"
    }
  },
  {
    id: 13,
    code: "5.13",
    title: "Quản trị CCNA",
    category: "network",
    year: "2006",
    org: "Trường Nghề Nhất Nghệ",
    format: "Chứng chỉ Cisco",
    focus: "Hạ tầng mạng Cisco tiêu chuẩn quốc tế, Routing & Switching.",
    desc: "Chương trình đào tạo quản trị hạ tầng mạng Cisco tiêu chuẩn quốc tế.",
    modules: [
      "Thiết kế mạng & Mô hình TCP/IP",
      "Kỹ thuật Routing và Switching",
      "Cấu hình VLAN & An toàn an ninh mạng"
    ],
    outcome: "Hoàn thành chứng chỉ CCNA, làm chủ kỹ năng thiết kế và vận hành hệ thống hạ tầng mạng doanh nghiệp.",
    certCode: "CISCO-CCNA-2006",
    bannerImg: "https://i.ibb.co/chHTpBJL/CCNA.png",
    certImg: "https://i.ibb.co/chHTpBJL/CCNA.png",
    theme: {
      color: "#0891b2",
      gradient: "linear-gradient(135deg, #06b6d4 0%, #0369a1 100%)",
      glow: "rgba(6, 182, 212, 0.35)",
      bgSoft: "rgba(6, 182, 212, 0.08)",
      cardBgLight: "linear-gradient(145deg, rgba(236, 254, 255, 0.92) 0%, rgba(207, 250, 254, 0.78) 100%)",
      cardBgDark: "linear-gradient(145deg, rgba(8, 32, 42, 0.92) 0%, rgba(12, 45, 58, 0.82) 100%)",
      border: "rgba(6, 182, 212, 0.4)",
      spine: "linear-gradient(to bottom, #38bdf8, #0891b2, #155e75)"
    }
  },
  {
    id: 14,
    code: "5.14",
    title: "Quản trị MCSA",
    category: "network",
    year: "2005",
    org: "Trường Nghề Nhất Nghệ",
    format: "Chứng chỉ Microsoft",
    focus: "Hệ thống máy chủ Microsoft Windows Server và Active Directory.",
    desc: "Khóa đào tạo chuyên sâu về quản trị hạ tầng hệ thống máy chủ doanh nghiệp Microsoft Windows Server.",
    modules: [
      "Quản trị Windows Server",
      "Cấu hình Active Directory",
      "Dịch vụ DNS, DHCP",
      "Phân quyền bảo mật & Quản lý tài nguyên"
    ],
    outcome: "Hoàn thành khóa học MCSA, thành thạo việc quản lý và triển khai hệ thống máy chủ mạng doanh nghiệp.",
    certCode: "MS-MCSA-2005",
    bannerImg: "https://i.ibb.co/Jwf4rb4G/MCSA.png",
    certImg: "https://i.ibb.co/Jwf4rb4G/MCSA.png",
    theme: {
      color: "#3b82f6",
      gradient: "linear-gradient(135deg, #60a5fa 0%, #1e40af 100%)",
      glow: "rgba(96, 165, 250, 0.35)",
      bgSoft: "rgba(96, 165, 250, 0.08)",
      cardBgLight: "linear-gradient(145deg, rgba(239, 246, 255, 0.92) 0%, rgba(219, 234, 254, 0.78) 100%)",
      cardBgDark: "linear-gradient(145deg, rgba(10, 24, 55, 0.92) 0%, rgba(16, 35, 78, 0.82) 100%)",
      border: "rgba(96, 165, 250, 0.4)",
      spine: "linear-gradient(to bottom, #93c5fd, #3b82f6, #1e3a8a)"
    }
  }
];

export const DEFAULT_EDUCATION_CARDS: EducationCard[] = EDUCATION_BOOKS_DATA.map(book => ({
  id: book.id,
  title: book.title,
  subtitle: book.org,
  major: book.focus,
  year: `Năm ${book.year}`,
  type: book.category,
  image: book.bannerImg,
  courseImg: book.bannerImg,
  certImg: book.certImg,
  speakerImg: book.bannerImg,
  desc: book.desc,
  learned: book.modules,
  modules: book.modules.map((m, idx) => ({ code: `MOD-0${idx + 1}`, title: m, focus: m, icon: "book" })),
  results: [book.outcome],
  hashtags: [`#${book.code}`, `#${book.title.replace(/\s+/g, '')}`, `#${book.org.replace(/\s+/g, '')}`],
  icon: "graduation-cap"
}));

