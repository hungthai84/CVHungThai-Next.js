export interface SectionExtraDetail {
  tagVi: string;
  tagEn: string;
  shortcut?: string;
  descriptionVi: string;
  descriptionEn: string;
  highlightsVi: string[];
  highlightsEn: string[];
}

export const SECTION_EXTRA_DETAILS: Record<string, SectionExtraDetail> = {
  home: {
    tagVi: "Tổng quan & Định vị cá nhân",
    tagEn: "Executive Profile & Overview",
    shortcut: "1",
    descriptionVi: "Không gian giới thiệu tổng quan về sự nghiệp, tầm nhìn chiến lược và phong cách quản trị CX chuyên sâu của Nguyễn Hùng Thái.",
    descriptionEn: "Comprehensive executive overview showcasing the strategic vision, career milestones, and CX leadership philosophy of Nguyen Hung Thai.",
    highlightsVi: [
      "Hơn 22 năm dẫn dắt dịch vụ khách hàng cao cấp",
      "Triết lý lãnh đạo lấy con người & công nghệ làm trọng tâm",
      "Hệ sinh thái công cụ số hóa vận hành thông minh",
    ],
    highlightsEn: [
      "22+ Years in Premium Customer Experience Management",
      "Human-Centric & Technology-Empowered Leadership",
      "Smart Operational Digital Ecosystem",
    ],
  },
  about: {
    tagVi: "Chân dung & Triết lý lãnh đạo",
    tagEn: "Bio & Core Philosophy",
    shortcut: "2",
    descriptionVi: "Hành trình phát triển cá nhân, các giá trị cốt lõi, tư duy phụng sự khách hàng và cam kết tạo tác động tích cực cho tổ chức.",
    descriptionEn: "Personal leadership journey, fundamental values, service-oriented mindset, and ongoing dedication to organizational excellence.",
    highlightsVi: [
      "Tư duy chiến lược kết hợp thấu cảm sâu sắc",
      "Khả năng thích ứng và dẫn dắt thay đổi liên tục",
      "Xây dựng văn hóa đội ngũ gắn kết và vượt kỳ vọng",
    ],
    highlightsEn: [
      "Strategic Mindset Blended with Deep Empathy",
      "Agility in Leading Continuous Organizational Change",
      "Fostering Cohesive Teams that Exceed Expectations",
    ],
  },
  skills: {
    tagVi: "Ma trận năng lực & Ngoại ngữ",
    tagEn: "Competency Matrix & Skills",
    shortcut: "3",
    descriptionVi: "Phân tích toàn diện năng lực lãnh đạo, bộ kỹ năng chuyên môn chuẩn quốc tế cùng hệ thống ngoại ngữ phục vụ quản trị đa văn hóa.",
    descriptionEn: "Comprehensive mapping of executive competencies, international professional skillsets, and multilingual business fluency.",
    highlightsVi: [
      "Quản trị trải nghiệm khách hàng đa kênh (Omnichannel CX)",
      "Tối ưu hóa quy trình vận hành và kiểm soát SLA/KPI",
      "Năng lực ngôn ngữ: Tiếng Việt, Tiếng Anh, Tiếng Trung",
    ],
    highlightsEn: [
      "Omnichannel Customer Experience (CX) Governance",
      "Operational Process Optimization & SLA/KPI Mastery",
      "Language Fluency: Vietnamese, English, Chinese",
    ],
  },
  education: {
    tagVi: "Học vấn & Chứng chỉ quốc tế",
    tagEn: "Academic Degrees & Certifications",
    shortcut: "4",
    descriptionVi: "Nền tảng học vấn vững chắc, các chứng chỉ chuyên ngành uy tín cùng tinh thần học tập suốt đời không ngừng cập nhật tri thức mới.",
    descriptionEn: "Strong academic background, prestigious professional certifications, and a lifelong commitment to continuous learning.",
    highlightsVi: [
      "Cử nhân chuyên ngành Quản trị Kinh doanh & Ngôn ngữ",
      "Chứng chỉ Chuyên gia Quản trị Trải nghiệm Khách hàng",
      "Các khóa đào tạo nâng cao về AI & Tự động hóa",
    ],
    highlightsEn: [
      "Degrees in Business Administration & Linguistics",
      "Certified Customer Experience & Operational Professional",
      "Advanced Credentials in Enterprise AI & Automation",
    ],
  },
  experience: {
    tagVi: "Dấu ấn sự nghiệp 22+ năm",
    tagEn: "22+ Years Career Journey",
    shortcut: "5",
    descriptionVi: "Dòng thời gian sự nghiệp thực chiến tại các tập đoàn lớn, các cột mốc thăng tiến vượt bậc và những dấu ấn dẫn dắt đội ngũ thành công.",
    descriptionEn: "Hands-on corporate leadership timeline, notable promotions, and key milestones in driving high-performing operational teams.",
    highlightsVi: [
      "22+ năm kinh nghiệm quản trị thực chiến",
      "Lãnh đạo đội ngũ vận hành quy mô lớn",
      "Chuyển giao và chuẩn hóa quy trình xuất sắc",
    ],
    highlightsEn: [
      "22+ Years Hands-on Leadership Experience",
      "Large-Scale Team Management & Coaching",
      "Operational Process Standardization",
    ],
  },
  projects: {
    tagVi: "Dự án chuyển đổi số",
    tagEn: "Key Digital Projects",
    shortcut: "6",
    descriptionVi: "Bộ sưu tập các dự án tiêu biểu về tối ưu luồng CSKH, tự động hóa tương tác đa kênh và các sáng kiến nâng cao chỉ số NPS/CSAT.",
    descriptionEn: "Showcase of breakthrough projects in CS workflow optimization, omnichannel automation, and measurable NPS/CSAT enhancements.",
    highlightsVi: [
      "Tự động hóa luồng tiếp nhận & Xử lý khiếu nại",
      "Tối ưu hóa hành trình khách hàng đa kênh (Omnichannel)",
      "Giải pháp đo lường ROI và chuyển đổi số thực chất",
    ],
    highlightsEn: [
      "Automated Inquiry & Escalation Routing",
      "Omnichannel Journey Streamlining",
      "Measurable ROI & Digital Innovation Metrics",
    ],
  },
  interview: {
    tagVi: "Phỏng vấn tình huống AI",
    tagEn: "AI Interactive Interview",
    shortcut: "7",
    descriptionVi: "Môi trường tương tác phỏng vấn đa chiều với trợ lý AI, giải đáp các câu hỏi thực chiến về tình huống quản trị và điều phối dự án khó.",
    descriptionEn: "Multidimensional interactive interview environment powered by AI, addressing executive operational scenarios and complex challenges.",
    highlightsVi: [
      "Tình huống xử lý khủng hoảng truyền thông CX",
      "Nghệ thuật xây dựng và truyền cảm hứng cho đội ngũ",
      "Góc nhìn chuyên sâu về quản trị vận hành",
    ],
    highlightsEn: [
      "CX Crisis Resolution Scenarios",
      "Team Motivation & Alignment Artistry",
      "In-depth Operational Perspectives",
    ],
  },
  tuvi: {
    tagVi: "Hồ sơ Tử vi & Chiêm tinh",
    tagEn: "Wisdom Profile & Astrology",
    shortcut: "8",
    descriptionVi: "Khám phá bản mệnh, thiên thời địa lợi và phong cách lãnh đạo tự nhiên thông qua góc nhìn minh triết phương Đông và chiêm tinh học.",
    descriptionEn: "Exploring personality traits, strategic timing, and authentic leadership style through Eastern astrology and ancient wisdom.",
    highlightsVi: [
      "Lá số Tử vi cá nhân & Định vị phong cách",
      "Nghệ thuật ứng biến nhân tâm trong quản trị",
      "Thuận theo thiên thời để tạo đột phá bền vững",
    ],
    highlightsEn: [
      "Personal Natal Chart & Leadership Style",
      "Human Understanding in Management",
      "Harmonizing Strategic Timing for Growth",
    ],
  },
  systems: {
    tagVi: "Hệ sinh thái công cụ số",
    tagEn: "Systems Hub & Tooling",
    shortcut: "9",
    descriptionVi: "Kho giải pháp phần mềm, công cụ quản lý nội bộ và các nền tảng số hóa do tác giả nghiên cứu, ứng dụng vào doanh nghiệp.",
    descriptionEn: "Curated ecosystem of software tools, internal systems, and digital platforms researched and deployed to power enterprise operations.",
    highlightsVi: [
      "Hệ thống giám sát KPI & Hiệu suất tức thời",
      "Nền tảng tri thức & Đào tạo nội bộ chuẩn hóa",
      "Giải pháp số hóa tương tác khách hàng thông minh",
    ],
    highlightsEn: [
      "Real-time KPI & SLA Monitoring Tools",
      "Standardized Internal Knowledge Base",
      "Intelligent Customer Interaction Systems",
    ],
  },
  contact: {
    tagVi: "Cổng kết nối hợp tác",
    tagEn: "Collaboration & Contact",
    shortcut: "0",
    descriptionVi: "Kênh liên lạc trực tiếp, gửi lời nhắn, đặt lịch hẹn trao đổi công việc và mở rộng mạng lưới đối tác chiến lược trong ngành.",
    descriptionEn: "Direct channels to connect, send messages, schedule executive discussions, and expand strategic partnerships in the industry.",
    highlightsVi: [
      "Thông tin liên lạc bảo mật & Nhanh chóng",
      "Biểu mẫu gửi tin nhắn trao đổi cơ hội hợp tác",
      "Kết nối qua mạng xã hội chuyên nghiệp LinkedIn",
    ],
    highlightsEn: [
      "Fast & Secure Direct Contacts",
      "Instant Collaboration Inquiry Form",
      "Professional Social & LinkedIn Networking",
    ],
  },
  wallpapers: {
    tagVi: "Không gian thị giác số",
    tagEn: "Visual Space & Media",
    shortcut: "W",
    descriptionVi: "Thư viện thị giác chọn lọc với hình nền độ phân giải cao và video nghệ thuật, mang đến không gian làm việc số đầy cảm hứng.",
    descriptionEn: "Curated visual gallery featuring high-resolution wallpapers and cinematic ambient videos, elevating the digital workspace.",
    highlightsVi: [
      "Bộ sưu tập hình nền 4K tinh tế",
      "Video ambient chuyển động mượt mà",
      "Tùy biến phong cách thị giác theo cảm xúc",
    ],
    highlightsEn: [
      "Curated 4K High-Res Wallpapers",
      "Smooth Ambient Motion Videos",
      "Customizable Visual Workspace Experience",
    ],
  },
};
