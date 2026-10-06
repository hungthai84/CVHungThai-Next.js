export const INTERVIEW_VIDEO_1_URL =
  "https://cdn.scena.ai/project/9741/73e39b037268a364ed0bac9563119e5c5ea6d6294e8b4a50052653303b75c52f.mp4";

export const INTERVIEW_VIDEO_2_URL =
  "https://cdn.scena.ai/project/9306/95e20a75c4af34a76d83b97ffc7ddc0b099bd815eebaad65a9ceef3c73fa19dd.mp4";

export interface InterviewQuestionItem {
  stt: number;
  timestamp: string;
  startSec: number;
  endSec: number;
  categoryKey: "intro" | "management" | "tech" | "strategy" | "inquiry" | "closing";
  categoryVi: string;
  categoryEn: string;
  askerVi: string;
  askerEn: string;
  questionVi: string;
  questionEn: string;
  answererVi: string;
  answererEn: string;
  answerVi: string;
  answerEn: string;
  keyTakeawayVi?: string;
  keyTakeawayEn?: string;
}

export const INTERVIEW_QUESTIONS: InterviewQuestionItem[] = [
  {
    stt: 1,
    timestamp: "00:00 - 00:30",
    startSec: 0,
    endSec: 30,
    categoryKey: "intro",
    categoryVi: "Định vị & Năng lực",
    categoryEn: "Leadership & Profile",
    askerVi: "Hội Đồng Tuyển Dụng / Ban Giám Đốc",
    askerEn: "Executive Board / Hiring Panel",
    questionVi: "Xin chào anh Thái, anh có thể giới thiệu khái quát về hành trình 22 năm trong ngành CSKH & Quản trị vận hành của mình?",
    questionEn: "Could you briefly introduce your 22-year journey in Customer Service and Operations Leadership?",
    answererVi: "Nguyễn Hùng Thái (Head of CSKH)",
    answererEn: "Nguyen Hung Thai (Head of CSKH)",
    answerVi: "Tôi bắt đầu từ vai trò chuyên viên hỗ trợ cấp cơ sở, qua hơn 22 năm đã trực tiếp xây dựng và dẫn dắt các trung tâm CSKH quy mô lớn từ 50 đến 500+ nhân sự tại các tập đoàn viễn thông, thương mại điện tử và tài chính công nghệ. Điểm cốt lõi trong phong cách lãnh đạo của tôi là kết hợp hài hòa giữa 'Công nghệ tối ưu' và 'Trải nghiệm lấy con người làm trọng tâm'.",
    answerEn: "Over 22 years, I evolved from frontline support into leading large-scale Contact Centers of 50 to 500+ agents across Telecom, E-commerce, and Fintech. My core leadership philosophy unites cutting-edge automation with deep human-centric customer empathy.",
    keyTakeawayVi: "22+ năm kinh nghiệm thực chiến từ chuyên viên đến lãnh đạo quy mô lớn.",
    keyTakeawayEn: "22+ years of hands-on leadership scaling contact center operations.",
  },
  {
    stt: 2,
    timestamp: "00:30 - 01:15",
    startSec: 30,
    endSec: 75,
    categoryKey: "management",
    categoryVi: "Quản trị Vận hành",
    categoryEn: "Operations & Governance",
    askerVi: "Hội Đồng Tuyển Dụng",
    askerEn: "Executive Board",
    questionVi: "Khi tiếp nhận một trung tâm vận hành đang gặp quá tải và tỷ lệ rớt cuộc gọi (Abandonment Rate) cao, anh sẽ xử lý như thế nào?",
    questionEn: "How do you turn around an overwhelmed contact center suffering from high Abandonment Rates?",
    answererVi: "Nguyễn Hùng Thái (Head of CSKH)",
    answererEn: "Nguyen Hung Thai (Head of CSKH)",
    answerVi: "Tôi áp dụng quy trình 3 bước: 1) Phân tích dữ liệu cuộc gọi theo từng khung giờ và áp dụng công thức Erlang-C để tái phân bổ ca trực linh hoạt; 2) Triển khai IVR thông minh và chuyển hướng bớt 30% thắc mắc lặp lại sang chatbot/Zalo OA; 3) Tối ưu hóa quy trình tra cứu SOP để giảm AHT từ 300s xuống 180s.",
    answerEn: "I apply a 3-step turnaround: 1) Hourly arrival pattern analysis with Erlang-C workforce reallocation; 2) Intelligent IVR and automated deflection of repetitive inquiries to digital channels; 3) SOP knowledge optimization to reduce Average Handling Time (AHT) from 300s to 180s.",
    keyTakeawayVi: "Giảm áp lực tổng đài bằng dữ liệu WFM và chuyển đổi kênh số.",
    keyTakeawayEn: "Workforce optimization & digital channel deflection to restore SLA.",
  },
  {
    stt: 3,
    timestamp: "01:15 - 02:00",
    startSec: 75,
    endSec: 120,
    categoryKey: "tech",
    categoryVi: "Chuyển đổi số & AI",
    categoryEn: "Tech & AI Transformation",
    askerVi: "Giám Đốc Công Nghệ (CTO)",
    askerEn: "Chief Technology Officer (CTO)",
    questionVi: "Anh đã ứng dụng AI và Tự động hóa như thế nào để vừa cắt giảm chi phí vừa gia tăng mức độ hài lòng khách hàng?",
    questionEn: "How have you implemented AI and Automation to cut costs while improving customer satisfaction?",
    answererVi: "Nguyễn Hùng Thái (Head of CSKH)",
    answererEn: "Nguyen Hung Thai (Head of CSKH)",
    answerVi: "Chúng tôi xây dựng hệ thống AI Chatbot GenAI kết nối trực tiếp với API nghiệp vụ để tự động hoàn tiền, kiểm tra hành trình đơn hàng và giải đáp thắc mắc 24/7. Hệ thống này giải quyết 65% lượt yêu cầu không cần con người can thiệp (Zero-touch), giúp tiết kiệm hơn 35% chi phí vận hành hàng tháng.",
    answerEn: "We integrated GenAI Chatbots directly with backend transactional APIs for instant self-service refunds, order tracking, and 24/7 support. This achieves a 65% zero-touch resolution rate and cuts operational OPEX by over 35%.",
    keyTakeawayVi: "Tự động hóa 65% tương tác cấp độ 1 với AI Chatbot kết nối API.",
    keyTakeawayEn: "Automating 65% of Tier-1 requests with transaction-capable AI bots.",
  },
  {
    stt: 4,
    timestamp: "02:00 - 02:45",
    startSec: 120,
    endSec: 165,
    categoryKey: "strategy",
    categoryVi: "Chiến lược & CX",
    categoryEn: "CX Strategy & Retention",
    askerVi: "Giám Đốc Kinh Doanh (CCO)",
    askerEn: "Chief Commercial Officer (CCO)",
    questionVi: "CSKH thường bị coi là trung tâm phát sinh chi phí (Cost Center). Anh biến bộ phận này thành trung tâm tạo ra giá trị (Value Driver) như thế nào?",
    questionEn: "How do you transform Customer Service from a Cost Center into a Value Driver?",
    answererVi: "Nguyễn Hùng Thái (Head of CSKH)",
    answererEn: "Nguyen Hung Thai (Head of CSKH)",
    answerVi: "Bằng cách tận dụng dữ liệu Voice of Customer (VOC). Mọi khiếu nại được gắn nhãn nguyên nhân gốc rễ để phản hồi cho Product và Marketing cải tiến sản phẩm. Đồng thời, đào tạo nhân viên CSKH kỹ năng Upsell/Cross-sell tinh tế khi đã giải quyết xong vấn đề cho khách hàng, đem lại doanh thu bổ sung hàng tháng.",
    answerEn: "By turning VOC feedback into product improvements and training agents on empathetic upsell/cross-sell techniques once customer trust is restored, generating incremental revenue directly from the service desk.",
    keyTakeawayVi: "Biến phản hồi khiếu nại thành dữ liệu hoàn thiện sản phẩm và tăng doanh thu.",
    keyTakeawayEn: "Leveraging VOC insights and service-to-sales upselling.",
  },
  {
    stt: 5,
    timestamp: "02:45 - 03:30",
    startSec: 165,
    endSec: 210,
    categoryKey: "management",
    categoryVi: "Quản trị Con người",
    categoryEn: "People & Culture",
    askerVi: "Giám Đốc Nhân Sự (CHRO)",
    askerEn: "Chief Human Resources Officer (CHRO)",
    questionVi: "Tỷ lệ nghỉ việc (Turnover rate) trong ngành CSKH thường rất cao. Bí quyết của anh để duy trì đội ngũ gắn kết và tinh thần làm việc cao là gì?",
    questionEn: "How do you maintain high employee retention and morale in an industry known for burnout?",
    answererVi: "Nguyễn Hùng Thái (Head of CSKH)",
    answererEn: "Nguyen Hung Thai (Head of CSKH)",
    answerVi: "Tôi xây dựng lộ trình thăng tiến rõ ràng theo ma trận kỹ năng (Skill Matrix), kết hợp hệ thống Gamification khen thưởng tức thì. Quan trọng nhất là lãnh đạo bằng sự thấu hiểu, lắng nghe áp lực từ tuyến đầu và trang bị công cụ làm việc hiện đại giúp giảm tải thao tác thủ công cho nhân sự.",
    answerEn: "Transparent career progression matrix, instant recognition gamification, empathetic leadership, and automated tooling that eliminates tedious manual repetitive tasks for frontline agents.",
    keyTakeawayVi: "Giảm áp lực cho nhân viên bằng công cụ hiện đại và lộ trình phát triển minh bạch.",
    keyTakeawayEn: "Reducing frontline burnout with better tooling & clear career pathways.",
  },
  {
    stt: 6,
    timestamp: "03:30 - 04:15",
    startSec: 210,
    endSec: 255,
    categoryKey: "inquiry",
    categoryVi: "Xử lý Khủng hoảng",
    categoryEn: "Crisis Management",
    askerVi: "Hội Đồng Tuyển Dụng",
    askerEn: "Executive Board",
    questionVi: "Anh hãy kể lại một sự cố sập hệ thống hoặc khủng hoảng truyền thông lớn nhất mà anh đã trực tiếp điều hành xử lý?",
    questionEn: "Describe a major system outage or crisis you personally navigated.",
    answererVi: "Nguyễn Hùng Thái (Head of CSKH)",
    answererEn: "Nguyen Hung Thai (Head of CSKH)",
    answerVi: "Trong một đợt bảo trì nâng cấp cổng thanh toán gặp sự cố khiến 50.000 giao dịch bị treo, lượng cuộc gọi tăng gấp 10 lần. Tôi ngay lập tức kích hoạt quy trình ứng phó khẩn cấp: cập nhật thông báo tự động trên IVR và App, kích hoạt kịch bản đồng cảm, phối hợp IT hoàn tiền trong 2 giờ và gọi lại 100% khách hàng bị ảnh hưởng để xin lỗi.",
    answerEn: "During a payment gateway outage affecting 50k transactions, I activated our crisis playbook: IVR broadcast banners, proactive app messaging, 2-hour automated refund turnaround, and 100% callback apologies.",
    keyTakeawayVi: "Minh bạch thông tin, chủ động xử lý và phục hồi niềm tin khách hàng.",
    keyTakeawayEn: "Proactive communication, rapid compensation, and trust restoration.",
  },
  {
    stt: 7,
    timestamp: "04:15 - 05:00",
    startSec: 255,
    endSec: 300,
    categoryKey: "closing",
    categoryVi: "Tầm nhìn & Cam kết",
    categoryEn: "Vision & Commitment",
    askerVi: "Chủ Tịch Hội Đồng Quản Trị (CEO)",
    askerEn: "Chief Executive Officer (CEO)",
    questionVi: "Nếu gia nhập công ty, mục tiêu trong 90 ngày đầu tiên của anh sẽ là gì?",
    questionEn: "What will be your 90-day onboarding blueprint upon joining our organization?",
    answererVi: "Nguyễn Hùng Thái (Head of CSKH)",
    answererEn: "Nguyen Hung Thai (Head of CSKH)",
    answerVi: "30 ngày đầu: Đánh giá toàn diện hiện trạng quy trình, chỉ số SLA và lắng nghe đội ngũ; 60 ngày tiếp theo: Tái cấu trúc SOP, tối ưu hóa công cụ CRM và thiết lập Dashboard chỉ số Real-time; 90 ngày: Chuẩn hóa hệ thống tự động hóa AI và nâng chỉ số CSAT vượt mục tiêu 95%.",
    answerEn: "Day 1-30: Comprehensive operational audit and frontline listening; Day 31-60: SOP restructuring, CRM optimization, real-time BI dashboards; Day 61-90: Deploying AI automation to drive CSAT above 95%.",
    keyTakeawayVi: "Kế hoạch 30-60-90 ngày hành động thực tế và cam kết chỉ số đo lường rõ ràng.",
    keyTakeawayEn: "30-60-90 day structured execution plan with measurable milestones.",
  },
];
