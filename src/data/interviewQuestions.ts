export interface InterviewQuestion {
  id: string;
  stt: number;
  timestamp: string;
  startSec: number;
  endSec: number;
  summaryVi: string;
  summaryEn: string;
  askerVi?: string;
  askerEn?: string;
  questionVi: string;
  questionEn: string;
  answererVi?: string;
  answererEn?: string;
  answerVi: string;
  answerEn: string;
}

export const INTERVIEW_VIDEO_1_URL = "https://cdn.scena.ai/project/9741/f7053626ae15c847304143dc6cf41f1fd2cf1611b27c30ff75ac9da6e47d005b.mp4";
export const INTERVIEW_VIDEO_2_URL = "https://cdn.scena.ai/project/9741/021c21b2f677c4341e06c62c9432d06d251e22c83716e55b927633e254a67730.mp4";

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: "q1",
    stt: 1,
    timestamp: "00:00 – 00:24",
    startSec: 0.654,
    endSec: 24.92,
    summaryVi: "Giới thiệu bản thân & Hành trình 22 năm",
    summaryEn: "Self Introduction & 22+ Years Journey",
    askerVi: "Nhà tuyển dụng",
    askerEn: "Interviewer",
    questionVi: "Chào anh Nguyễn Hùng Thái. Anh có thể giới thiệu ngắn gọn về bản thân cũng như hành trình hơn 22 năm trong lĩnh vực chăm sóc khách hàng không?",
    questionEn: "Hello Mr. Nguyen Hung Thai. Could you briefly introduce yourself and your 22+ year journey in customer care?",
    answererVi: "Ứng viên",
    answererEn: "Candidate",
    answerVi: "Tôi là Nguyễn Hùng Thái, có hơn 22 năm kinh nghiệm trong lĩnh vực chăm sóc khách hàng, từng xây dựng và vận hành hệ thống tại nhiều doanh nghiệp. Tôi tập trung vào con người, quy trình và công nghệ để nâng cao trải nghiệm khách hàng.",
    answerEn: "I am Nguyen Hung Thai, with over 22 years of experience in customer service, having built and operated systems across numerous enterprises. I focus on people, processes, and technology to elevate customer experience."
  },
  {
    id: "q2",
    stt: 2,
    timestamp: "00:24 – 00:34",
    startSec: 24.92,
    endSec: 34.719,
    summaryVi: "Động lực gắn bó lâu dài với nghề",
    summaryEn: "Long-term Dedication to the Profession",
    askerVi: "Nhà tuyển dụng",
    askerEn: "Interviewer",
    questionVi: "Có điều gì khiến anh gắn bó lâu dài với nghề?",
    questionEn: "What has kept you dedicated to this profession for so long?",
    answererVi: "Ứng viên",
    answererEn: "Candidate",
    answerVi: "Tôi tin rằng mỗi tương tác đều tạo nên giá trị. Chăm sóc khách hàng không chỉ là công việc mà còn là hành trình tạo dựng niềm tin.",
    answerEn: "I believe every interaction generates value. Customer care is not just a job, but an enduring journey of building trust."
  },
  {
    id: "q3",
    stt: 3,
    timestamp: "00:34 – 00:44",
    startSec: 34.719,
    endSec: 44.8,
    summaryVi: "Yếu tố cốt lõi khi xây dựng phòng CSKH",
    summaryEn: "Core Factor in Building CS Department",
    askerVi: "Nhà tuyển dụng",
    askerEn: "Interviewer",
    questionVi: "Theo anh, điều quan trọng nhất khi xây dựng phòng chăm sóc khách hàng là gì?",
    questionEn: "In your opinion, what is most crucial when building a customer care department?",
    answererVi: "Ứng viên",
    answererEn: "Candidate",
    answerVi: "Sự kết nối giữa quy trình, con người. Khi ba yếu tố này đồng bộ thì trải nghiệm khách hàng sẽ khác biệt.",
    answerEn: "The alignment between processes and people. When these elements are synchronized, customer experience becomes truly differentiated."
  },
  {
    id: "q4",
    stt: 4,
    timestamp: "00:44 – 00:54",
    startSec: 44.8,
    endSec: 54.92,
    summaryVi: "Thành tựu tự hào nhất tại MoMo",
    summaryEn: "Proudest Career Achievement",
    askerVi: "Nhà tuyển dụng",
    askerEn: "Interviewer",
    questionVi: "Đâu là thành tựu anh tự hào nhất?",
    questionEn: "What is the achievement you are most proud of?",
    answererVi: "Ứng viên",
    answererEn: "Candidate",
    answerVi: "Tôi tự hào khi xây dựng tâm hỗ trợ khách hàng Momo từ con số 0. Xử lý hơn 1 triệu yêu cầu mỗi tháng với mức hài lòng trên 82%.",
    answerEn: "I am proud of establishing MoMo's Customer Support Center from ground zero, handling over 1 million requests monthly with a satisfaction rate exceeding 82%."
  },
  {
    id: "q5",
    stt: 5,
    timestamp: "00:54 – 01:03",
    startSec: 54.92,
    endSec: 63.399,
    summaryVi: "Phong cách lãnh đạo quản lý",
    summaryEn: "Leadership Style in CS Management",
    askerVi: "Nhà tuyển dụng",
    askerEn: "Interviewer",
    questionVi: "Phong cách lãnh đạo của anh trong vai trò trưởng phòng chăm sóc khách hàng là gì?",
    questionEn: "What is your leadership style as a Customer Care Manager?",
    answererVi: "Ứng viên",
    answererEn: "Candidate",
    answerVi: "Tôi theo hướng trao quyền, đồng hành và phản hồi nhanh. Tôi muốn xây dựng đội ngũ chủ động.",
    answerEn: "I lead through empowerment, companionship, and rapid feedback. I aim to foster a proactive and agile team."
  },
  {
    id: "q6",
    stt: 6,
    timestamp: "01:03 – 01:15",
    startSec: 63.399,
    endSec: 75.4,
    summaryVi: "Quan điểm chuyển đổi số trong CSKH",
    summaryEn: "Digital Transformation Vision in CX",
    askerVi: "Nhà tuyển dụng",
    askerEn: "Interviewer",
    questionVi: "Quan điểm của anh về ứng dụng chuyển đổi số trong chăm sóc khách hàng.",
    questionEn: "What is your perspective on digital transformation in customer care?",
    answererVi: "Ứng viên",
    answererEn: "Candidate",
    answerVi: "Tôi tin vào việc ứng dụng Big Data, một trí tuệ nhân tạo, một tự động hóa để dịch chuyển từ mô hình phản ứng sang mô hình dự đoán nhu cầu khách hàng.",
    answerEn: "I believe in applying Big Data, Artificial Intelligence, and automation to transition from a reactive model to a predictive model that anticipates customer needs."
  },
  {
    id: "q7",
    stt: 7,
    timestamp: "01:15 – 01:27",
    startSec: 75.4,
    endSec: 87.92,
    summaryVi: "Ưu tiên khi xây dựng phòng CSKH từ đầu",
    summaryEn: "Ground-up CS Department Priorities",
    askerVi: "Nhà tuyển dụng",
    askerEn: "Interviewer",
    questionVi: "Với vị trí này, nếu phải xây dựng phòng chăm sóc khách hàng từ đầu, anh sẽ ưu tiên những việc gì?",
    questionEn: "In this position, if tasked with building a customer care department from scratch, what would you prioritize?",
    answererVi: "Ứng viên",
    answererEn: "Candidate",
    answerVi: "Tôi sẽ bắt đầu từ cấu trúc tổ chức xây dựng quy trình vận hành chuẩn hóa, tuyển chọn những nhân sự có tư duy dịch vụ và chọn giải pháp công nghệ phù hợp với định hướng phát triển 3 năm tới.",
    answerEn: "I would start with organizational structuring, building standardized SOPs, recruiting service-minded talent, and selecting technology solutions aligned with the 3-year growth strategy."
  },
  {
    id: "q8",
    stt: 8,
    timestamp: "01:27 – 01:39",
    startSec: 87.92,
    endSec: 99.68,
    summaryVi: "Mục tiêu 90 ngày đầu tiên",
    summaryEn: "First 90-Day Strategic Goals",
    askerVi: "Nhà tuyển dụng",
    askerEn: "Interviewer",
    questionVi: "Nếu chúng tuyển, mục tiêu 90 ngày đầu của anh tại đây sẽ là gì?",
    questionEn: "If hired, what would your 90-day objectives be?",
    answererVi: "Ứng viên",
    answererEn: "Candidate",
    answerVi: "Đánh giá thực trạng hệ thống, xử lý các điểm nghẽn nhanh, mang lại kết quả quick win, đồng thời xây dựng lộ trình 12 tháng để nâng cấp toàn diện hệ thống chăm sóc khách hàng.",
    answerEn: "Evaluate current system status, rapidly resolve key bottlenecks for quick wins, and develop a comprehensive 12-month roadmap to upgrade the entire customer care infrastructure."
  },
  {
    id: "q9",
    stt: 9,
    timestamp: "01:39 – 01:43",
    startSec: 99.68,
    endSec: 103.84,
    summaryVi: "Trao đổi & Đặt câu hỏi",
    summaryEn: "Open Discussion & Inquiries",
    askerVi: "Nhà tuyển dụng",
    askerEn: "Interviewer",
    questionVi: "Anh có mong muốn trao đổi điều gì thêm hoặc đặt câu hỏi cho chúng tôi không?",
    questionEn: "Do you have any further questions or topics you'd like to discuss with us?",
    answererVi: "Ứng viên",
    answererEn: "Candidate",
    answerVi: "Ứng viên chuẩn bị và bắt đầu đặt các câu hỏi trực tiếp cho đại diện doanh nghiệp về định hướng văn hóa dịch vụ và nền tảng công nghệ.",
    answerEn: "Candidate prepares and begins raising direct inquiries to company leadership regarding service culture and technology strategy."
  },
  {
    id: "q10",
    stt: 10,
    timestamp: "01:43 – 01:58",
    startSec: 103.84,
    endSec: 118.159,
    summaryVi: "Văn hóa dịch vụ: Trải nghiệm vs Quy trình",
    summaryEn: "Service Culture: CX vs Compliance",
    askerVi: "Ứng viên",
    askerEn: "Candidate",
    questionVi: "Cho em hỏi văn hóa dịch vụ của công ty mình ưu tiên lấy trải nghiệm khách hàng làm trọng tâm hay tập trung vào việc tuân thủ quy trình ạ?",
    questionEn: "May I ask whether our company's service culture prioritizes customer experience as the core focus or strictly adheres to procedural compliance?",
    answererVi: "Nhà tuyển dụng",
    answererEn: "Interviewer",
    answerVi: "Hiện tại chúng tôi đang chuẩn hóa vận hành theo quy trình. Trong ha năm tới mục tiêu là chuyển sang lấy trải nghiệm khách hàng làm trung tâm. Vì vậy chúng tôi cần những người như anh để dẫn dắt sự chuyển đổi đó.",
    answerEn: "Currently we are standardizing operations by procedure. Over the next two years, the goal is to shift toward customer experience-centricity. That is why we need leaders like you to spearhead this transformation."
  },
  {
    id: "q11",
    stt: 11,
    timestamp: "01:58 – 02:13",
    startSec: 118.159,
    endSec: 133.72,
    summaryVi: "Kỳ vọng thay đổi rõ rệt trong 6 tháng đầu",
    summaryEn: "6-Month Transformation Expectations",
    askerVi: "Ứng viên",
    askerEn: "Candidate",
    questionVi: "Trong 6 tháng đầu lãnh đạo mong đợi phòng chăm sóc khách hàng tạo ra thay đổi rõ rệt nhất ở điểm nào?",
    questionEn: "In the first 6 months, what most distinct transformation does leadership expect from the customer care department?",
    answererVi: "Nhà tuyển dụng",
    answererEn: "Interviewer",
    answerVi: "Thay đổi rõ nhất kỳ vọng sẽ là tối ưu hóa quy trình xử lý yêu cầu, rút ngắn thời gian phản hồi khách hàng, xây được KPI bài bản và cải thiện cảm nhận thương hiệu qua từng tương tác.",
    answerEn: "The most noticeable expected change is optimizing request resolution workflows, shortening response times, establishing structured KPIs, and elevating brand sentiment across every interaction."
  },
  {
    id: "q12",
    stt: 12,
    timestamp: "02:13 – 02:27",
    startSec: 133.72,
    endSec: 147.44,
    summaryVi: "Đầu tư CRM & AI Chatbot tự động",
    summaryEn: "CRM & AI Chatbot Investment",
    askerVi: "Ứng viên",
    askerEn: "Candidate",
    questionVi: "Công ty mình đã đầu tư hệ thống công nghệ chăm sóc khách hàng nào như CRM, Chatbot chưa?",
    questionEn: "Has our company invested in customer service technologies such as CRM or Chatbots?",
    answererVi: "Nhà tuyển dụng",
    answererEn: "Interviewer",
    answerVi: "Chúng tôi đang dùng CRM nội bộ và hệ thống tổng đài. Tuy nhiên chưa có Help Center hay Chatbot tự động. Phần này sẽ dành toàn quyền cho trưởng phòng chăm sóc khách hàng mới đề xuất và triển khai.",
    answerEn: "We currently use an internal CRM and telephony system. However, we do not have a Help Center or automated Chatbot yet. Full authority will be given to the new Customer Care Manager to propose and implement."
  },
  {
    id: "q13",
    stt: 13,
    timestamp: "02:27 – 02:41",
    startSec: 147.44,
    endSec: 161.0,
    summaryVi: "Cơ chế phối hợp liên phòng ban",
    summaryEn: "Cross-Department Collaboration",
    askerVi: "Ứng viên",
    askerEn: "Candidate",
    questionVi: "Cơ chế phối hợp giữa chăm sóc khách hàng với các phòng ban khác hiện được vận hành ra sao?",
    questionEn: "How is cross-department coordination between customer care and other teams currently operated?",
    answererVi: "Nhà tuyển dụng",
    answererEn: "Interviewer",
    answerVi: "Hiện các phòng phối hợp chủ yếu qua email và họp. Sắp tới công ty sẽ áp dụng cơ chế phản hồi qua hệ thống. Phần này chờ anh vào xây dựng.",
    answerEn: "Currently departments coordinate mainly via email and meetings. Soon the company will apply a system-based feedback mechanism. We look forward to you building this."
  },
  {
    id: "q14",
    stt: 14,
    timestamp: "02:41 – 03:00",
    startSec: 161.0,
    endSec: 180.0,
    summaryVi: "Lời kết & Lời cảm ơn phỏng vấn",
    summaryEn: "Concluding Remarks & Appreciation",
    askerVi: "Nhà tuyển dụng",
    askerEn: "Interviewer",
    questionVi: "Cảm ơn anh đã dành thời gian trao đổi và chia sẻ rất chi tiết về định hướng của công ty. Tôi rất đồng tình với mục tiêu xây dựng hệ thống tập trung vào việc nâng cao trải nghiệm khách hàng. Hy vọng anh sẽ sớm có cơ hội đồng hành cùng công ty.",
    questionEn: "Thank you for taking the time to discuss and sharing deeply about the company's direction. We strongly share the vision of building a customer-centric system. We hope to have the opportunity to work together soon.",
    answererVi: "Ứng viên",
    answererEn: "Candidate",
    answerVi: "Xin cảm ơn công ty đã dành thời gian trao đổi.",
    answerEn: "Thank you very much for your time and the meaningful conversation."
  }
];
