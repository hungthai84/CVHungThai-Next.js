import { PROJECTS_LIST } from "../data/projectsData";
import { DEFAULT_EDUCATION_CARDS } from "../data/educationData";

export interface ValidationStep {
  id: number;
  title: string;
  detail: string;
  itemCount: string;
  status: "pending" | "checking" | "verified";
}

export const INITIAL_VALIDATION_STEPS: ValidationStep[] = [
  {
    id: 1,
    title: "Trang 01: Trang Chủ (Hero & Tổng quan Lãnh đạo)",
    detail: "Định danh Nguyễn Hùng Thái, Giáp Tý 1984, 22+ năm kinh nghiệm & Thông điệp điều hành",
    itemCount: "100% Khối dữ liệu",
    status: "pending"
  },
  {
    id: 2,
    title: "Trang 02: Thư Ngõ (Open Letter gửi Ban Lãnh đạo)",
    detail: "Toàn văn thông điệp ngỏ, cam kết đồng hành và sứ mệnh nâng tầm giá trị tổ chức",
    itemCount: "Toàn văn thư ngỏ",
    status: "pending"
  },
  {
    id: 3,
    title: "Trang 03: Giới Thiệu (Hồ sơ Năng lực & 4 Trụ cột Cốt lõi)",
    detail: "Thông tin định danh, 4 Trụ cột Tận tâm - Thấu cảm - Hiệu quả - Sáng tạo & Bộ 5 Chỉ số KPI kỷ lục",
    itemCount: "7 Thông tin & 5 KPI",
    status: "pending"
  },
  {
    id: 4,
    title: "Trang 04: Lĩnh Vực (6 Lĩnh vực Vận hành Chuyên sâu)",
    detail: "Viễn thông, Thương mại điện tử, Bảo hiểm tài chính, Thể thao điện tử, FinTech và Hệ thống BPO",
    itemCount: "6/6 Chuyên ngành",
    status: "pending"
  },
  {
    id: 5,
    title: "Trang 05: Kỹ Năng (Hệ sinh thái Kỹ năng & Năng lực Lãnh đạo)",
    detail: "Lãnh đạo vận hành CSKH, Hệ thống CRM/Tech tools, Quản trị chất lượng QA & Đào tạo chuyên sâu",
    itemCount: "3 Phân nhóm lớn",
    status: "pending"
  },
  {
    id: 6,
    title: "Trang 06: Học Vấn (Nền tảng Học vấn & Chứng chỉ Quốc tế)",
    detail: "Cử nhân CNTT STU, Dale Carnegie Executive, Cisco CCNA, MCSA, Big Data Analytics...",
    itemCount: `${DEFAULT_EDUCATION_CARDS.length}/${DEFAULT_EDUCATION_CARDS.length} Bằng cấp`,
    status: "pending"
  },
  {
    id: 7,
    title: "Trang 07: Kinh Nghiệm (Hành trình Sự nghiệp & 8 Cột mốc Lịch sử)",
    detail: "Dữ liệu niên biểu từ 2003 đến 2026+ (MobiFone, V247, HTVC, VED/Garena, Prudential, MoMo, Finviet...)",
    itemCount: "8/8 Cột mốc",
    status: "pending"
  },
  {
    id: 8,
    title: "Trang 08: Dự Án (Kho 21 Dự án Chuyển đổi Vận hành Thực chiến)",
    detail: "Bối cảnh, giải pháp STAR, hành động thực thi và kết quả KPI đo lường toàn bộ 21 Case Studies",
    itemCount: `${PROJECTS_LIST.length}/${PROJECTS_LIST.length} Dự án`,
    status: "pending"
  },
  {
    id: 9,
    title: "Trang 09: Phỏng Vấn (Tọa đàm Video & Kịch bản Khủng hoảng CSKH)",
    detail: "2 Video phỏng vấn chuyên đề thực chiến và bộ 3 kịch bản xử lý sự cố khẩn cấp",
    itemCount: "5 Mục nội dung",
    status: "pending"
  },
  {
    id: 10,
    title: "Trang 10: Tử Vi (Bản sắc Lãnh đạo & Triết lý Hành động Giáp Tý 1984)",
    detail: "Bản mệnh Hải Trung Kim, 3 Đặc tính năng lượng lãnh đạo và 4 Quy tắc chỉ dẫn kinh doanh",
    itemCount: "100% Dữ liệu Tử vi",
    status: "pending"
  },
  {
    id: 11,
    title: "Trang 11: Kỷ Niệm (Kho Lưu trữ Kỷ niệm & Hoạt động Doanh nghiệp)",
    detail: "Hình ảnh kỷ niệm ghi dấu hành trình cống hiến qua 7 thời kỳ lịch sử doanh nghiệp",
    itemCount: "7 Thời kỳ lịch sử",
    status: "pending"
  },
  {
    id: 12,
    title: "Trang 12: Hệ Thống (Hệ sinh thái Phần mềm Công nghệ Doanh nghiệp)",
    detail: "Kiến trúc 8 cổng công nghệ doanh nghiệp: SDP, ERP, CRM, HRM, LMS, BI, AI, POS",
    itemCount: "8 Cổng hệ thống",
    status: "pending"
  },
  {
    id: 13,
    title: "Trang 13: Liên Hệ (Kênh Kết nối Trực tiếp & Lịch công tác)",
    detail: "Kênh liên lạc đa kênh, địa chỉ thường trú/tạm trú và cam kết tiêu chuẩn phản hồi",
    itemCount: "Đầy đủ kênh liên hệ",
    status: "pending"
  },
  {
    id: 14,
    title: "Trang 14: Hình Nền (Thư viện Hình nền & Kho Tài nguyên Đa phương tiện)",
    detail: "Bộ sưu tập hình nền, 5 Video chính thức, 70+ Links Hình ảnh/Mindmap và 30+ Links Logo đối tác",
    itemCount: "130+ Đường dẫn URLs",
    status: "pending"
  }
];

export function generateWebsiteTextContent(): string {
  const currentDate = new Date().toISOString().split("T")[0];
  const pageDivider = "════════════════════════════════════════════════════════════════════════════════════════════════════";
  const sectionDivider = "----------------------------------------------------------------------------------------------------";
  const subDivider = "....................................................................................................";

  return `${pageDivider}
          TỆP DỮ LIỆU TOÀN BỘ NỘI DUNG WEBSITE NGUYỄN HÙNG THÁI
                EXECUTIVE PORTFOLIO & CAREER DIGITAL SYSTEM
                    Ngày xuất file: ${currentDate}
${pageDivider}

[THÔNG TIN TỔNG QUAN TỆP DỮ LIỆU]
• Chủ sở hữu: NGUYỄN HÙNG THÁI (Giáp Tý 1984)
• Chức danh: Senior Customer Experience & Operational BPO Director / AI Integrator
• Mục đích: Lưu trữ, tra cứu, thẩm định và đối soát toàn bộ nội dung hồ sơ năng lực thực chiến
• Cấu trúc: Bố cục dữ liệu phân theo 14 trang hoàn chỉnh, đáp ứng đầy đủ yêu cầu trích xuất
• Tiêu chuẩn: Plain Text File (.txt) - Hỗ trợ UTF-8 chuẩn xác, không lỗi font

${pageDivider}
1. TRANG CHỦ (HERO & TỔNG QUAN HỒ SƠ LÃNH ĐẠO)
${pageDivider}

1.1. NỘI DUNG VIDEO MÀN HÌNH 1 & MÀN HÌNH 2:
  • Nội dung Video Màn hình 1 (Phát biểu Sứ mệnh Điều hành & Chân dung Lãnh đạo):
    "Xin chào Quý Lãnh đạo và Quý Đối tác. Tôi là Nguyễn Hùng Thái - 22+ năm kinh nghiệm trong lĩnh vực Chăm sóc Khách hàng, Quản trị Vận hành BPO và Tiên phong Tích hợp AI. Với tôn chỉ lấy sự hài lòng của khách hàng và hiệu quả doanh nghiệp làm thước đo cao nhất, tôi định hướng chuyển hóa các trung tâm CSKH từ bộ phận chi phí thành trung tâm gia tăng giá trị thương hiệu và doanh thu bền vững."

  • Nội dung Video Màn hình 2 (Hành trình cống hiến & Tổng quan 22+ năm sự nghiệp):
    "Hành trình 22+ năm cống hiến qua 8 cột mốc lịch sử tại các tập đoàn viễn thông (MobiFone, V247), truyền hình (HTVC), e-Sports (Garena), tài chính bảo hiểm (Prudential), ví điện tử (MoMo) và công nghệ BPO (Finviet). Tôi cam kết mang lại giải pháp tối ưu hóa vận hành, quản trị rủi ro BCP và tiên phong chuyển đổi số bằng Generative AI."

1.2. HỆ THỐNG LINK VIDEO TRANG CHỦ:
  • Link màn hình chờ (Idle Poster Video): https://cdn.scena.ai/project/8606/e48a67884f3a52e8a68cf06b97979f3b22835ec92bf466a058c0d78da97c83b0.mp4
  • Link màn hình chuyển tiếp (Transition Video Overlay): https://cdn.scena.ai/project/8606/e48a67884f3a52e8a68cf06b97979f3b22835ec92bf466a058c0d78da97c83b0.mp4
  • Link màn hình phát video (Active Presentation Video): https://cdn.scena.ai/project/8606/5f84521bf5c51ff234fb0f4029fb9fba29e7e386f13912a56bc7ee25aebcbc10.mp4

1.3. NỘI DUNG CARD TEXT TRANG CHỦ (HỒ SƠ & CHỈ SỐ NHANH):
  • Thẻ Tên & Chức danh: NGUYỄN HÙNG THÁI (Giáp Tý 1984) - Executive Director / Operation & BPO Head / CX Leader / AI Integrator
  • Thẻ Thâm niên: 22+ năm kinh nghiệm kiến tạo trải nghiệm khách hàng xuất sắc & tối ưu hóa vận hành số
  • Thẻ Quy mô Lãnh đạo: Quản trị trực tiếp 1,200+ nhân sự tổng đài viên & chuyên viên BPO đa kênh
  • Thẻ Tầm nhìn Chiến lược: "Chuyển hóa trung tâm dịch vụ khách hàng từ bộ phận chi phí (Cost Center) thành động lực tạo ra giá trị doanh thu và lòng trung thành thương hiệu (Value Center)."
  • Thẻ Chỉ số Kỷ lục (Quick Stats Cards):
    + CSAT: 98%+ (Chỉ số hài lòng khách hàng vượt chuẩn)
    + FCR: >85% (Tỷ lệ giải quyết sự cố ngay lần đầu liên hệ)
    + SLA: 95%+ (Tuân thủ nghiêm ngặt thời hạn cam kết dịch vụ)
    + OPEX: -25% (Tiết kiệm chi phí vận hành nhờ tự động hóa AI & CRM)

${pageDivider}
2. THƯ NGỎ (OPEN LETTER GỬI BAN LÃNH ĐẠO & QUÝ ĐỐI TÁC)
${pageDivider}

2.1. LỜI MỞ ĐẦU THƯ NGỎ:
  • Kính gửi: Hội đồng Quản trị, Ban Tổng Giám đốc, Quý Đối tác & Quý Khách hàng
  • Tiêu đề: Thư ngỏ phụng sự & Thông điệp hợp tác chiến lược từ Trưởng phòng CSKH
  • Tôn chỉ: "Lấy sự hài lòng của khách hàng và hiệu quả của doanh nghiệp làm thước đo cao nhất"

2.2. TOÀN VĂN BỨC THƯ NGỎ:
  "Kính gửi Quý đối tác, Quý khách hàng và toàn thể cộng sự,

  Tôi là Nguyễn Hùng Thái, Trưởng phòng Chăm sóc Khách hàng với hơn 22 năm kinh nghiệm trong lĩnh vực xây dựng, vận hành và phát triển hệ thống dịch vụ khách hàng chuyên nghiệp.

  Trong suốt hành trình hơn hai thập kỷ qua, tôi luôn tâm niệm rằng: Chăm sóc khách hàng không đơn thuần là giải quyết các thắc mắc hay xử lý sự cố, mà đó là nghệ thuật xây dựng lòng tin, sự thấu cảm và kiến tạo mối quan hệ bền vững giữa doanh nghiệp với khách hàng.

  Một dịch vụ xuất sắc bắt đầu từ sự chuẩn hóa trong từng quy trình, sự đầu tư bài bản cho con người và sự ứng dụng thông minh của công nghệ hiện đại. Tôi cam kết mang đến những giải pháp dịch vụ tận tâm, đột phá và hiệu quả nhất, góp phần nâng tầm trải nghiệm khách hàng và thúc đẩy sự tăng trưởng bền vững của tổ chức."

2.3. TRÍCH XUẤT TOÀN BỘ NỘI DUNG TỪNG THẺ TRONG THƯ NGỎ:
  • Thẻ Trụ cột 1: QUY TRÌNH - Đơn giản & Tận tâm
    + Chi tiết nội dung: Tối ưu hóa các điểm chạm trong hành trình khách hàng, giảm thiểu tối đa ma sát vận hành, chuẩn hóa quy trình SOP/OLA, giúp rút ngắn 50% thời gian xử lý khiếu nại và cá nhân hóa trải nghiệm người dùng.

  • Thẻ Trụ cột 2: CON NGƯỜI - Trao giá trị & Phát triển
    + Chi tiết nội dung: Đào tạo đội ngũ tổng đài viên tinh nhuệ, trang bị kỹ năng lắng nghe thấu cảm, khả năng làm chủ tình huống và trao quyền chủ động giải quyết vấn đề ngay tại điểm chạm đầu tiên.

  • Thẻ Trụ cột 3: NHÂN VĂN - Thấu hiểu & Đồng cảm
    + Chi tiết nội dung: Xem khách hàng như người thân trong gia đình, đặt sự chân thành và đồng cảm lên hàng đầu. Biến mỗi cuộc gọi phàn nàn thành cơ hội thắt chặt tình cảm và tạo dựng sự trung thành bền vững.

  • Thẻ Trụ cột 4: CÔNG NGHỆ - Cải tiến & Sáng tạo
    + Chi tiết nội dung: Tiên phong ứng dụng AI, RAG Knowledge Base, CRM Omnichannel và tự động hóa Ticket Routing để nâng cao hiệu suất làm việc của đội ngũ, giảm 25% chi phí OPEX.

${pageDivider}
3. GIỚI THIỆU (ABOUT - HỒ SƠ CHUYÊN MÔN & THÔNG TIN ĐỊNH DANH)
${pageDivider}

3.1. VIDEO GIỚI THIỆU:
  • Link màn hình chờ (Idle Poster): https://cdn.scena.ai/project/8606/e48a67884f3a52e8a68cf06b97979f3b22835ec92bf466a058c0d78da97c83b0.mp4
  • Link màn hình phát video: https://cdn.scena.ai/project/8606/5f84521bf5c51ff234fb0f4029fb9fba29e7e386f13912a56bc7ee25aebcbc10.mp4

3.2. NỘI DUNG GIỚI THIỆU:
  Hồ sơ năng lực Nguyễn Hùng Thái đại diện cho hơn 22 năm cống hiến không ngừng nghỉ trong ngành Chăm sóc Khách hàng và Vận hành BPO tại Việt Nam. Xuyên suốt từ giai đoạn viễn thông tổng đài truyền thống đến kỷ nguyên số hóa với FinTech, e-Commerce và AI, ông luôn tiên phong thiết lập những tiêu chuẩn dịch vụ mới, kết hợp hài hòa giữa tư duy quản trị Data-Driven và tinh thần phụng sự thấu cảm.

3.3. THÔNG TIN CÁ NHÂN:
  • Họ và tên: NGUYỄN HÙNG THÁI
  • Năm sinh: 22/06/1984 (Tuổi Giáp Tý - Nam giới)
  • Bản mệnh ngũ hành: Hải Trung Kim (Vàng trong lòng biển cả)
  • Nơi làm việc chính / Tạm trú: Quận 7, Thành phố Hồ Chí Minh
  • Nơi sinh / Thường trú: Thành phố Mỹ Tho, Tỉnh Tiền Giang
  • Điện thoại / Zalo trực tiếp: 0909097882
  • Email làm việc chính thức: hungthai84@gmail.com
  • Trang cá nhân LinkedIn: https://www.linkedin.com/in/hungthai84/
  • Trang mã nguồn GitHub: https://github.com/hungthai84
  • Website danh thiếp số: https://nguyenhungthai.powerservice.one/

3.4. CÂU NÓI HAY & TRIẾT LÝ HÀNH ĐỘNG:
  • Triết lý điều hành: "Chăm sóc khách hàng không chỉ là giải quyết sự cố, mà là nghệ thuật xây dựng lòng tin bền vững và chuyển đổi bộ phận CSKH từ trung tâm chi phí thành trung tâm gia tăng giá trị thương hiệu."
  • Phương châm phụng sự: "Lắng nghe chân thành - Xử lý thấu đáo - Trao trọn niềm tin - Tối ưu hiệu quả."

${pageDivider}
4. LĨNH VỰC CHUYÊN MÔN (DOMAINS - 6 LĨNH VỰC VẬN HÀNH CHUYÊN SÂU)
${pageDivider}

I. PHÂN LOẠI CHI TIẾT 6 LĨNH VỰC VẬN HÀNH CHUYÊN NGÀNH
${sectionDivider}

1. VIỄN THÔNG & TỔNG ĐÀI (Telecommunications & Call Center Operations)
   • Bối cảnh & Kinh nghiệm: Xây dựng và quản trị hệ thống Contact Center hàng trăm tổng đài viên cho MobiFone, Viễn Liên V247.
   • Năng lực lõi: Thiết lập hệ thống định tuyến cuộc gọi thông minh ACD/IVR, quản trị lưu lượng cao điểm giờ vàng.
   • Link ảnh chuyên ngành: https://i.ibb.co/BVbDG6yQ/2-2-T-i-u-h-a-k-nh-h-tr.png

2. THƯƠNG MẠI ĐIỆN TỬ (E-Commerce Operations & Multi-channel Support)
   • Bối cảnh & Kinh nghiệm: Chuẩn hóa luồng tiếp nhận đơn hàng, xử lý khiếu nại giao nhận logistics và hoàn tiền tự động.
   • Năng lực lõi: Kết nối dữ liệu đa kênh (Website, App, Facebook, Zalo, Sàn TMĐT), rút ngắn thời gian xử lý khiếu nại dưới 24 giờ.
   • Link ảnh chuyên ngành: https://i.ibb.co/SDRxyVYm/2-1-Chu-n-h-a-quy-tr-nh-chăm sóc khách hàng.png

3. BẢO HIỂM & DỊCH VỤ TÀI CHÍNH (Insurance & Financial Services CX)
   • Bối cảnh & Kinh nghiệm: Đảm nhiệm vai trò Quản lý Vận hành & Quản trị Rủi ro BCP tại Tập đoàn Bảo hiểm Prudential Việt Nam.
   • Năng lực lõi: Xây dựng quy trình thẩm định quyền lợi bảo hiểm, giải quyết bồi thường thấu cảm, duy trì CSAT trên 95%.
   • Link ảnh chuyên ngành: https://i.ibb.co/zhGPcgVM/Quan-l-rui-ro.png

4. THỂ THAO ĐIỆN TỬ & GIẢI TRÍ SỐ (Esports & Gaming Operations)
   • Bối cảnh & Kinh nghiệm: Điều hành khối hỗ trợ game thủ cho Vietnam eSports / Garena Vietnam (Liên Minh Huyền Thoại, FIFA Online 3).
   • Năng lực lõi: Quản lý cộng đồng game thủ triệu người dùng, kiểm soát khủng hoảng nạp thẻ và bảo mật tài khoản game.
   • Link ảnh chuyên ngành: https://i.ibb.co/0RtGZR9b/1-4-Qu-n-l-d-n-chăm sóc khách hàng.png

5. CÔNG NGHỆ TÀI CHÍNH & VÍ ĐIỆN TỬ (FinTech & Digital Payment Solutions)
   • Bối cảnh & Kinh nghiệm: Tích hợp hệ thống hỗ trợ giao dịch tài chính cho Ví MoMo, Finviet, Ví ECO và AirPay.
   • Năng lực lõi: Xử lý giao dịch nghẽn tiền, đối soát liên ngân hàng, phòng chống gian lận và tuân thủ bảo mật tài chính PCI-DSS.
   • Link ảnh chuyên ngành: https://i.ibb.co/xt535vdy/3-1-X-y-d-ng-h-th-ng-CRM.png

6. HỆ THỐNG GIA CÔNG QUY TRÌNH DOANH NGHIỆP (Business Process Outsourcing Architecture)
   • Bối cảnh & Kinh nghiệm: Giám đốc điều hành khối BPO cung ứng giải pháp nhân sự và vận hành trọn gói cho doanh nghiệp đa ngành.
   • Năng lực lõi: Hoạch định ngân sách dự toán, tuyển dụng và đào tạo quy mô lớn, chuyển giao mô hình BPO tinh gọn.
   • Link ảnh chuyên ngành: https://i.ibb.co/RTzjNW01/2-5-Qu-n-l-i-t-c-thu-ngo-i-ch-m-s-c-kh-ch-h-ng.png

${pageDivider}
5. KỸ NĂNG CHUYÊN MÔN (SKILLS - MA TRẬN NĂNG LỰC & CÔNG NGHỆ)
${pageDivider}

I. NHÓM KỸ NĂNG 1: LÃNH ĐẠO & VẬN HÀNH DỊCH VỤ KHÁCH HÀNG
${sectionDivider}
  • Hoạch định & Thiết lập Contact Center quy mô linh hoạt từ 50 đến 1,200+ nhân sự
  • Thiết kế và tối ưu hóa Hành trình Trải nghiệm Khách hàng (Customer Journey Mapping)
  • Quản trị ma trận chỉ số chất lượng: CSAT (>95%), NPS (>65), FCR (>85%), AHT (<180s), SLA (98%)
  • Xây dựng và chuẩn hóa hệ thống Quy trình Thao tác Chuẩn (SOP) và Thỏa thuận Mức Dịch vụ Nội bộ (OLA)
  • Hoạch định nguồn nhân lực (WFM - Workforce Management) và dự báo lưu lượng tiếp nhận (Forecasting)

II. NHÓM KỸ NĂNG 2: CÔNG NGHỆ CRM, HẠ TẦNG SỐ & AI TỰ ĐỘNG HÓA
${sectionDivider}
  • Nền tảng CRM Enterprise: Salesforce CRM Service Cloud, Zendesk Suite, Freshdesk, HubSpot, Zoho CRM
  • Hạ tầng Tổng đài VoIP/Omnichannel: Genesys Cloud, Avaya Aura, Cisco Contact Center, FreePBX, Stringee API
  • Công nghệ AI & Tự động hóa: Generative AI, Chatbot NLP, Voicebot AI, Auto Routing Ticket, RPA UiPath
  • Phân tích dữ liệu vận hành: Xây dựng Dashboard báo cáo thời gian thực trên Microsoft Power BI, Looker Studio

III. NHÓM KỸ NĂNG 3: QUẢN TRỊ CHẤT LƯỢNG (QA), ĐÀO TẠO & RỦI RO BCP
${sectionDivider}
  • Xây dựng Khung tiêu chuẩn đánh giá chất lượng cuộc gọi và tương tác đa kênh (QA Scorecard & Rubric)
  • Thiết kế và trực tiếp đứng lớp các khóa đào tạo chuyên sâu Train-the-Trainer cho đội ngũ quản lý tiền tuyến
  • Quản trị rủi ro gián đoạn hoạt động kinh doanh (Business Continuity Planning - BCP) và phục hồi sau thảm họa
  • Kỹ năng điều đình, thương lượng và xử lý khiếu nại leo thang của khách hàng VIP, ngăn chặn khủng hoảng truyền thông

${pageDivider}
6. HỒ SƠ HỌC VẤN (EDUCATION & CHỨNG CHỈ QUỐC TẾ)
${pageDivider}

I. TỔNG QUAN HỌC VẤN & BẰNG CẤP CHUYÊN NGÀNH
${sectionDivider}
${DEFAULT_EDUCATION_CARDS.map((edu, idx) => `
${idx + 1}. BẰNG CẤP / CHỨNG CHỈ: ${edu.title} - ${edu.subtitle}
${subDivider}
  • Đơn vị cấp / Đào tạo: ${edu.subtitle}
  • Chuyên ngành: ${edu.major || "Quản trị Vận hành & Công nghệ"}
  • Năm tốt nghiệp / Hoàn thành: ${edu.year}
  • Tóm tắt nội dung: ${edu.desc}
  • Đường dẫn ảnh chứng nhận chính: ${edu.certImg || edu.image}
  ${edu.courseImg ? `• Đường dẫn ảnh giáo trình khóa học: ${edu.courseImg}` : ""}
  ${edu.speakerImg ? `• Đường dẫn ảnh giảng viên / chuyên gia: ${edu.speakerImg}` : ""}

  [KIẾN THỨC VÀ NĂNG LỰC ĐÃ TIẾP THU]
  ${(edu.learned || []).map((item) => `  + ${item}`).join("\n")}

  [CÁC MODULE HỌC PHẦN TRỌNG TÂM]
  ${edu.modules.map((m) => `  * [Mã: ${m.code}] ${m.title}: ${m.focus}`).join("\n")}

  [KẾT QUẢ VÀ GIÁ TRỊ VẬN DỤNG THỰC TIỄN]
  ${edu.results.map((r) => `  ✔ ${r}`).join("\n")}
`).join("\n")}

${pageDivider}
7. HỒ SƠ KINH NGHIỆM (EXPERIENCE - 8 CỘT MỐC SỰ NGHIỆP 2003 - 2026+)
${pageDivider}

I. DÒNG THỜI GIAN CHI TIẾT 8 CỘT MỐC LỊCH SỬ SỰ NGHIỆP
${sectionDivider}

[CỘT MỐC 1: NĂM 2003 - 2007]
• Đơn vị: Trung tâm Tổng đài Chăm sóc Khách hàng MobiFone & Đại học Công nghệ Sài Gòn (STU)
• Chức danh: Tổng đài viên chuyên nghiệp & Sinh viên ngành Công nghệ Thông tin STU
• Trách nhiệm chính: Tiếp nhận và xử lý hàng ngàn cuộc gọi giải đáp cước viễn thông, khiếu nại dịch vụ di động.
• Thành tựu đạt được: Hoàn thành bằng Cử nhân CNTT, đạt chứng chỉ quốc tế Cisco CCNA & Microsoft MCSA; nhận danh hiệu Điện thoại viên MobiFone xuất sắc 2 năm liên tiếp.
• Link Logo đơn vị: https://i.ibb.co/vCKQGYB2/T-ng-i-vi-n-Mobifone.png

[CỘT MỐC 2: NĂM 2007 - 2011]
• Đơn vị: Công ty Cổ phần Viễn Liên V247 (Telecommunications & Call Center)
• Chức danh: Trưởng nhóm Kỹ thuật & Quản trị Hạ tầng Call Center
• Trách nhiệm chính: Vận hành và giám sát hệ thống máy chủ VoIP SIP Trunk phục vụ dịch vụ cuộc gọi quốc tế Việt - Mỹ.
• Thành tựu đạt được: Tối ưu đường truyền kết nối, giảm 40% tỷ lệ rớt cuộc gọi (Call Drop Rate), mở rộng năng lực tổng đài lên gấp 3 lần mà không phát sinh thêm chi phí phần cứng.
• Link Logo đơn vị: https://i.ibb.co/v247-logo-official.png

[CỘT MỐC 3: NĂM 2011 - 2013]
• Đơn vị: Công ty LBC - Đơn vị đối tác Truyền hình Cáp HTVC
• Chức danh: Trưởng phòng Dịch vụ Khách hàng (Head of Customer Service)
• Trách nhiệm chính: Tái cơ cấu toàn bộ bộ máy CSKH, xây dựng quy trình phân luồng tiếp nhận sự cố kỹ thuật truyền hình cáp.
• Thành tựu đạt được: Nâng tỷ lệ FCR từ 68% lên 88%, rút ngắn thời gian điều phối kỹ thuật viên hiện trường từ 8 giờ xuống dưới 2 giờ.
• Link Logo đơn vị: https://i.ibb.co/htvc-lbc-logo.png

[CỘT MỐC 4: NĂM 2013 - 2016]
• Đơn vị: Vietnam eSports (VED / Garena Vietnam)
• Chức danh: Head of Customer Service & QA Training Lead
• Trách nhiệm chính: Quản lý trực tiếp 200+ nhân sự hỗ trợ các tựa game thể thao điện tử hàng đầu (Liên Minh Huyền Thoại, FIFA Online 3).
• Thành tựu đạt được: Đào tạo hơn 1,200+ nhân viên theo chuẩn nghiệp vụ CSKH game; xây dựng hệ thống tự động khóa tài khoản vi phạm, giải quyết 10,000+ ticket/ngày.
• Link Logo đơn vị: https://i.ibb.co/garena-ved-logo.png

[CỘT MỐC 5: NĂM 2016 - 2018]
• Đơn vị: Tập đoàn Bảo hiểm Nhân thọ Prudential Việt Nam
• Chức danh: Operations Manager & BCP Risk Manager
• Trách nhiệm chính: Quản lý vận hành dịch vụ khách hàng bảo hiểm, thiết lập kịch bản dự phòng kinh doanh (BCP) khi có biến cố.
• Thành tựu đạt được: Duy trì chỉ số thỏa mãn khách hàng CSAT trên 95% liên tục 24 tháng; diễn tập thành công 100% kịch bản BCP không gián đoạn giao dịch bảo hiểm.
• Link Logo đơn vị: https://i.ibb.co/prudential-logo.png

[CỘT MỐC 6: NĂM 2018 - 2021]
• Đơn vị: Ví Điện tử MoMo (FinTech M-Service)
• Chức danh: Senior Customer Service Operations Manager
• Trách nhiệm chính: Chỉ huy đội ngũ vận hành CSKH trong giai đoạn tăng trưởng thần tốc từ 10 triệu lên 25 triệu người dùng.
• Thành tựu đạt được: Triển khai thành công hệ thống CRM Omni-channel tích hợp AI Chatbot, giảm 35% lượng ticket lặp lại, giữ vững SLA trên 96% trong các đợt sale siêu khủng.
• Link Logo đơn vị: https://i.ibb.co/momo-logo.png

[CỘT MỐC 7: NĂM 2021 - 2024]
• Đơn vị: Finviet Technology & Power Service Enterprise
• Chức danh: Executive Director (COO) / Head of BPO Services
• Trách nhiệm chính: Điều hành toàn diện các hợp đồng BPO Contact Center quy mô 1,000+ nhân sự cho các tập đoàn đối tác lớn.
• Thành tựu đạt được: Tối ưu 25% chi phí vận hành (OPEX), mở rộng quy mô kinh doanh sang nhiều ngành hàng mới, nâng doanh thu mảng BPO tăng trưởng 45% hàng năm.
• Link Logo đơn vị: https://i.ibb.co/finviet-power-logo.png

[CỘT MỐC 8: NĂM 2024 - 2026+]
• Đơn vị: AI Digital System & Future Executive Leadership
• Chức danh: Executive AI Integrator & Senior CX Advisor
• Trách nhiệm chính: Tiên phong chuyển đổi số toàn diện các hệ thống vận hành bằng Generative AI, RAG và mô hình hóa dữ liệu tự động.
• Thành tựu đạt được: Xây dựng nền tảng Executive Portfolio số hóa, tích hợp trợ lý AI thông minh hỗ trợ tuyển dụng và đánh giá năng lực lãnh đạo theo thời gian thực.
• Link Logo đơn vị: https://i.ibb.co/ai-future-logo.png

${pageDivider}
8. DỰ ÁN (PROJECTS - TOÀN BỘ 21/21 CASE STUDIES DỰ ÁN THỰC CHIẾN)
${pageDivider}

8.1. PHÂN BỔ 21 DỰ ÁN QUA 4 GIAI ĐOẠN CHIẾN LƯỢC:
  • Giai đoạn 1 (Phase 1): Xây dựng Nền tảng & Hạ tầng Contact Center Vững chắc (Dự án 01 - 05)
  • Giai đoạn 2 (Phase 2): Tối ưu hóa Quy trình & Chuẩn hóa Chất lượng Dịch vụ (Dự án 06 - 10)
  • Giai đoạn 3 (Phase 3): Ứng dụng Công nghệ Số & Tích hợp CRM Omni-channel (Dự án 11 - 15)
  • Giai đoạn 4 (Phase 4): Chuyển đổi số Toàn diện với AI & Mở rộng Quy mô BPO (Dự án 16 - 21)

8.2. XUẤT ĐẦY ĐỦ NỘI DUNG NỘI DUNG THẺ & BÀI VIẾT CHI TIẾT TẤT CẢ 21 DỰ ÁN:
${PROJECTS_LIST.map((proj, idx) => `
${sectionDivider}
[DỰ ÁN ${idx + 1}/21] MÃ DỰ ÁN: ${proj.phaseCode} · TÊN DỰ ÁN: ${proj.branchTitle}
${sectionDivider}
A. NỘI DUNG THẺ DỰ ÁN:
  • Mã nhóm & Phân loại: ${proj.groupTitle} (${proj.groupHashtag})
  • Tên dự án đầy đủ: ${proj.branchTitle}
  • Vai trò thực thi: ${proj.role}
  • Thời gian triển khai: ${proj.timeframe}
  • Mô tả thẻ tóm tắt: ${proj.description}
  • Thẻ kỹ năng (Tags): ${proj.tags.join(", ")}
  • Link hình ảnh thẻ dự án: ${proj.image}
  ${proj.mindmapImage ? `• Link sơ đồ kiến trúc Mindmap: ${proj.mindmapImage}` : "• Link sơ đồ kiến trúc Mindmap: Chưa cập nhật"}

B. BÀI VIẾT CHI TIẾT CASE STUDY (XUẤT ĐẦY ĐỦ TOÀN BỘ THẺ DỮ LIỆU):
  1. BỐI CẢNH THỰC TẾ & THÁCH THỨC ĐẶT RA (CONTEXT & CHALLENGE):
     ${proj.caseStudy.context}

  2. TỔNG QUAN CHIẾN LƯỢC GIẢI PHÁP ĐỀ XUẤT (SOLUTION SUMMARY):
     ${proj.caseStudy.solutionSummary}

  3. CÁC HÀNH ĐỘNG THỰC THI THEN CHỐT (KEY ACTIONS):
${proj.caseStudy.actions.map((act) => `     + [Hành động] ${act.title}: ${act.desc}\n       -> Giá trị trọng yếu tạo ra: ${act.value}`).join("\n")}

  4. KẾT QUẢ ĐO LƯỜNG KPI VÀ GIÁ TRỊ TẠO RA (MEASURABLE RESULTS):
${proj.caseStudy.results.map((res) => `     ✔ ${res}`).join("\n")}
`).join("\n")}

${pageDivider}
9. PHỎNG VẤN (INTERVIEW - TỌA ĐÀM VIDEO & BỘ KỊCH BẢN XỬ LÝ KHỦNG HOẢNG)
${pageDivider}

9.1. HỆ THỐNG LINK VIDEO PHỎNG VẤN:
  • Video Phỏng vấn Chuyên đề 1: "Nghệ thuật xử lý khủng hoảng dịch vụ CSKH đa kênh trong thời đại mạng xã hội"
    + Link màn hình chờ (Idle Poster Video): https://cdn.scena.ai/project/8606/e48a67884f3a52e8a68cf06b97979f3b22835ec92bf466a058c0d78da97c83b0.mp4
    + Link màn hình phát video: https://cdn.scena.ai/project/9741/f7053626ae15c847304143dc6cf41f1fd2cf1611b27c30ff75ac9da6e47d005b.mp4

  • Video Phỏng vấn Chuyên đề 2: "Tái cấu trúc vận hành tổng đài và cam kết chỉ số SLA trong các chiến dịch Mega Sale"
    + Link màn hình chờ (Idle Poster Video): https://cdn.scena.ai/project/8606/e48a67884f3a52e8a68cf06b97979f3b22835ec92bf466a058c0d78da97c83b0.mp4
    + Link màn hình phát video: https://cdn.scena.ai/project/9741/021c21b2f677c4341e06c62c9432d06d251e22c83716e55b927633e254a67730.mp4

9.2. CHI TIẾT PHỎNG VẤN & BỘ KỊCH BẢN Q&A XỬ LÝ KHỦNG HOẢNG THỰC CHIẾN:
  • TÌNH HUỐNG 1: Sự cố sập hệ thống thanh toán hoặc app giao dịch diện rộng vào giờ cao điểm
    + Kịch bản ứng phó: Kích hoạt ngay kịch bản IVR Overflow trên tổng đài, phát thông báo tự động thấu cảm kèm thời gian dự kiến khắc phục. Gán nhãn sự cố trên CRM để tự động gom và phản hồi hàng loạt ticket cùng loại, giảm 60% áp lực gọi đến. Cập nhật trạng thái 15 phút/lần.

  • TÌNH HUỐNG 2: Khách hàng V.I.P khiếu nại gay gắt về việc gián đoạn dịch vụ làm thiệt hại hợp đồng lớn
    + Kịch bản ứng phó: Chuyển ngay hồ sơ cho Trưởng phòng/Giám đốc CSKH trực tiếp gọi điện lắng nghe trong vòng tối đa 5 phút. Áp dụng chính sách đền bù thấu cảm (Service Recovery Policy), cung cấp gói hỗ trợ đặc quyền. Tỷ lệ chuyển biến thực tế: 85% khách hàng bức xúc chuyển thành trung thành.

  • TÌNH HUỐNG 3: Lưu lượng tương tác tăng đột biến 300% trong dịp lễ tết hoặc chiến dịch khuyến mãi
    + Kịch bản ứng phó: Kích hoạt mô hình Hybrid giữa In-house và BPO Outsourcing dự phòng. Bật AI Chatbot tự động cho 100% câu hỏi thường gặp FAQ, giải tỏa 40% khối lượng. Áp dụng thưởng khích lệ thời gian thực (Realtime Incentive) cho ca làm việc xuất sắc.

${pageDivider}
10. TỬ VI (TU VI - BẢN SẮC & TRIẾT LÝ HÀNH ĐỘNG GIÁP TÝ 1984)
${pageDivider}

10.1. DỮ LIỆU TỪ THẺ TỬ VI:
  • Âm lịch bản mệnh: Giáp Tý 1984 (Tuổi Chuột)
  • Ngũ hành: Hải Trung Kim (Vàng trong lòng biển sâu)
  • 3 Đặc tính năng lượng lãnh đạo:
    1. Điềm tĩnh trong khủng hoảng: Giữ cái đầu lạnh để phân tích nguyên nhân gốc rễ (Root Cause) và đưa ra quyết định sáng suốt khi biến cố xảy ra.
    2. Tích lũy tri thức & Kinh nghiệm: Hơn 22 năm liên tục học hỏi, đúc kết kinh nghiệm từ tổng đài truyền thống đến kỷ nguyên AI.
    3. Tinh thần trách nhiệm cao nhất: Luôn là chỗ dựa vững chãi cho đội ngũ nhân sự và giữ trọn cam kết với đối tác kinh doanh.
  • 4 Quy tắc chỉ dẫn kinh doanh & điều hành:
    + LẤY TÂM LÀM GỐC (Phục vụ khách hàng & ứng xử nhân sự bằng sự chân thành)
    + LẤY TRÍ ĐIỀU HÀNH (Quyết định chiến lược dựa trên dữ liệu định lượng)
    + LẤY TÍN DỰNG NGHIỆP (Cam kết SLA và uy tín danh dự là tài sản vô giá)
    + LẤY NĂNG TẠO GIÁ TRỊ (Nỗ lực không ngừng nghỉ vì sự tăng trưởng tổ chức)

10.2. MỤC LINK ĐỒ HÌNH TỬ VI:
  • Link ảnh đồ hình lá số tử vi âm dương: https://i.ibb.co/tuvi-giap-ty-1984.jpg

${pageDivider}
11. KỶ NIỆM (MEMORIES - DANH SÁCH LINK HÌNH KỶ NIỆM THỜI KỲ CÔNG TÁC)
${pageDivider}

11.1. DANH SÁCH LINK HÌNH KỶ NIỆM THEO 7 THỜI KỲ LỊCH SỬ:
  1. Thời kỳ MobiFone (2003 - 2007):
     - Mô tả: Vinh danh Điện thoại viên Xuất sắc tại Hội nghị Tri ân MobiFone.
     - Link hình: https://i.ibb.co/vCKQGYB2/T-ng-i-vi-n-Mobifone.png

  2. Thời kỳ Viễn Liên V247 (2007 - 2011):
     - Mô tả: Khai trương trung tâm máy chủ Call Center quốc tế phục vụ kiều bào Việt - Mỹ.
     - Link hình: https://i.ibb.co/v247-logo-official.png

  3. Thời kỳ LBC - HTVC (2011 - 2013):
     - Mô tả: Lễ tổng kết chiến dịch chuẩn hóa dịch vụ hỗ trợ khách hàng truyền hình cáp.
     - Link hình: https://i.ibb.co/htvc-lbc-logo.png

  4. Thời kỳ Vietnam eSports / Garena (2013 - 2016):
     - Mô tả: Điều phối tổng đài giải đấu Thể thao Điện tử toàn quốc quy mô 10,000 khán giả.
     - Link hình: https://i.ibb.co/garena-ved-logo.png

  5. Thời kỳ Prudential Việt Nam (2016 - 2018):
     - Mô tả: Diễn tập kịch bản ứng phó rủi ro BCP và trao giải CSAT vượt chuẩn xuất sắc.
     - Link hình: https://i.ibb.co/prudential-logo.png

  6. Thời kỳ Ví Điện tử MoMo (2018 - 2021):
     - Mô tả: Đêm hội Kick-off Mega Sale và vinh danh biệt đội trực chiến phòng chống gian lận.
     - Link hình: https://i.ibb.co/momo-logo.png

  7. Thời kỳ Finviet Technology & Hiện tại (2021 - nay):
     - Mô tả: Ký kết hợp đồng cung cấp dịch vụ BPO Contact Center cho đối tác tài chính lớn.
     - Link hình: https://i.ibb.co/finviet-power-logo.png

${pageDivider}
12. HỆ THỐNG (SYSTEMS - HỆ SINH THÁI CỔNG VẬN HÀNH DOANH NGHIỆP)
${pageDivider}

12.1. XUẤT VIDEO POPUP HỆ THỐNG:
  • Link màn hình chờ (Idle Poster Video): https://cdn.scena.ai/project/8606/e48a67884f3a52e8a68cf06b97979f3b22835ec92bf466a058c0d78da97c83b0.mp4
  • Link video phát demo hạ tầng kỹ thuật: https://cdn.scena.ai/project/8606/ac120a105730c378447fd67f5e8b6aeb9557b5e4e8854ac2e21148d5316f780b.mp4

12.2. XUẤT DANH SÁCH THẺ CÓ ĐẦY ĐỦ NỘI DUNG TRONG THẺ KHI BUNG RỘNG:
  1. Thẻ SDP (Main Service Delivery Portal):
     - Chức năng chính: Cổng giao tiếp trung tâm đa kênh tiếp nhận toàn bộ tương tác khách hàng.
     - Nội dung khi bung rộng: Tích hợp Omni-channel (Voice, Chat, Email, Social, Zalo OA), định tuyến tự động ACD, chấm điểm trải nghiệm người dùng theo thời gian thực.

  2. Thẻ ERP (Enterprise Resource Planning):
     - Chức năng chính: Hệ thống quản trị tài nguyên, dự toán ngân sách và mua sắm thiết bị Contact Center.
     - Nội dung khi bung rộng: Tự động phân bổ ngân sách OPEX/CAPEX, kiểm soát chi phí cước viễn thông, khấu hao hạ tầng phần cứng và đối soát hợp đồng nhà cung cấp.

  3. Thẻ CRM (Customer Relationship Management):
     - Chức năng chính: Nền tảng quản lý hồ sơ 360 độ khách hàng và lịch sử tương tác đa kênh.
     - Nội dung khi bung rộng: Đồng bộ dữ liệu giao dịch, gán nhãn phân loại khách hàng VIP, tự động nhắc lịch chăm sóc và tích hợp RAG AI gợi ý câu trả lời.

  4. Thẻ HRM (Human Resource Management):
     - Chức năng chính: Quản trị nhân sự, xếp ca làm việc WFM và theo dõi KPI tổng đài viên.
     - Nội dung khi bung rộng: Tự động tính công ca kíp, tính tiền thưởng hiệu suất theo thời gian thực (Realtime Incentive), theo dõi tỷ lệ nghỉ việc (Attrition Rate) và xếp lịch đào tạo.

  5. Thẻ LMS (Learning Management System):
     - Chức năng chính: Cổng đào tạo nghiệp vụ và kiểm tra chất lượng kiến thức nhân viên.
     - Nội dung khi bung rộng: Số hóa 100% giáo trình SOP, tổ chức thi trắc nghiệm trực tuyến, cấp chứng chỉ nghiệp vụ nội bộ và theo dõi tiến độ đào tạo nhân sự mới.

  6. Thẻ BI (Business Intelligence Analytics):
     - Chức năng chính: Bảng chỉ huy trực quan hóa dữ liệu vận hành thời gian thực.
     - Nội dung khi bung rộng: Báo cáo dashboard đa chiều chỉ số CSAT, FCR, SLA, AHT, Service Level, dự báo lưu lượng tiếp nhận và phân tích xu hướng khiếu nại.

  7. Thẻ AI (AI Assistant & Copilot Engine):
     - Chức năng chính: Hệ thống trợ lý AI hỗ trợ tổng đài viên và tự động hóa Ticket Routing.
     - Nội dung khi bung rộng: Tóm tắt cuộc gọi tự động (Auto Call Summary), phân tích thái độ cảm xúc (Sentiment Analysis), tự động gợi ý giải pháp xử lý sự cố khẩn cấp.

  8. Thẻ POS (Point of Sale Integration):
     - Chức năng chính: Cổng đồng bộ dữ liệu điểm bán hàng và xử lý sự cố giao dịch.
     - Nội dung khi bung rộng: Kết nối API dữ liệu cửa hàng, đối soát mã đơn hàng, hỗ trợ đổi trả hàng hóa và xử lý khiếu nại thanh toán tại chỗ.

${pageDivider}
13. LIÊN HỆ (CONTACT - THÔNG TIN KẾT NỐI TRỰC TIẾP)
${pageDivider}

13.1. XUẤT THÔNG TIN LIÊN HỆ ĐẦY ĐỦ:
  • Họ và tên: NGUYỄN HÙNG THÁI
  • Chức danh: Executive Director / Operation & BPO Head / CX Leader / AI Integrator
  • Số điện thoại / Zalo trực tiếp: 0909097882
  • Hộp thư điện tử (Email làm việc): hungthai84@gmail.com
  • Địa chỉ văn phòng / Nơi làm việc chính (Tạm trú): Quận 7, Thành phố Hồ Chí Minh
  • Địa chỉ quê quán / Thường trú: Thành phố Mỹ Tho, Tỉnh Tiền Giang
  • Trang cá nhân LinkedIn: https://www.linkedin.com/in/hungthai84/
  • Trang mã nguồn mở GitHub: https://github.com/hungthai84
  • Website danh thiếp số hóa: https://nguyenhungthai.powerservice.one/

13.2. TIÊU CHUẨN PHẢN HỒI:
  • Thời gian tiếp nhận: 08:00 - 20:00 (Thứ Hai đến Thứ Bảy hàng tuần)
  • Cam kết thời gian phản hồi: Trong vòng tối đa 02 giờ làm việc cho mọi yêu cầu tư vấn & hợp tác.

${pageDivider}
14. HÌNH NỀN & TÀI NGUYÊN ĐA PHƯƠNG TIỆN (WALLPAPERS & MULTIMEDIA)
${pageDivider}

14.1. XUẤT TOÀN BỘ LINK HÌNH NỀN THEO NHÓM:
  [Nhóm 1: Hệ thống Visual Backgrounds & Wallpapers Art]
  • Hình nền Abstract Glass Dynamic: https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80
  • Hình nền Cyber Network BPO: https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&q=80
  • Hình nền AI Executive Technology: https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1920&q=80

  [Nhóm 2: Ảnh Chân dung & Brand Identity]
  • Ảnh chân dung chính thức: https://i.ibb.co/3ykG8Lp/Nguyen-Hung-Thai-Portrait.jpg
  • Brand GIF Motion: https://i.ibb.co/yQ6X0Nq/Nguyen-Hung-Thai-Brand.gif

  [Nhóm 3: Link 21 Ảnh Thẻ Đại diện Dự án]
  ${PROJECTS_LIST.map((p, i) => `• [Dự án ${i + 1}] ${p.branchTitle}: ${p.image}`).join("\n  ")}

  [Nhóm 4: Link 21 Sơ đồ Mindmap Kiến trúc Dự án]
  ${PROJECTS_LIST.filter((p) => p.mindmapImage).map((p, i) => `• [Mindmap ${i + 1}] ${p.branchTitle}: ${p.mindmapImage}`).join("\n  ")}

  [Nhóm 5: Link 6 Ảnh Bìa Lĩnh vực Vận hành]
  • Viễn thông & Call Center: https://i.ibb.co/BVbDG6yQ/2-2-T-i-u-h-a-k-nh-h-tr.png
  • Thương mại Điện tử: https://i.ibb.co/SDRxyVYm/2-1-Chu-n-h-a-quy-tr-nh-chăm sóc khách hàng.png
  • Bảo hiểm & Tài chính: https://i.ibb.co/zhGPcgVM/Quan-l-rui-ro.png
  • Thể thao Điện tử: https://i.ibb.co/0RtGZR9b/1-4-Qu-n-l-d-n-chăm sóc khách hàng.png
  • FinTech & Ví Việt: https://i.ibb.co/xt535vdy/3-1-X-y-d-ng-h-th-ng-CRM.png
  • Hệ thống BPO: https://i.ibb.co/RTzjNW01/2-5-Qu-n-l-i-t-c-thu-ngo-i-ch-m-s-c-kh-ch-h-ng.png

  [Nhóm 6: Link Bằng cấp & Chứng chỉ Quốc tế]
  ${DEFAULT_EDUCATION_CARDS.map((e, i) => `• [Chứng chỉ ${i + 1}] ${e.title} (${e.year}): ${e.certImg || e.image}`).join("\n  ")}

  [Nhóm 7: Link Đồ hình Tử vi Lá số]
  • Đồ hình Tử vi Giáp Tý 1984: https://i.ibb.co/tuvi-giap-ty-1984.jpg

  [Nhóm 8: Link 5 Video Hệ thống Chính thức]
  • Video 01 (Thuyết trình năng lực): https://cdn.scena.ai/project/8606/5f84521bf5c51ff234fb0f4029fb9fba29e7e386f13912a56bc7ee25aebcbc10.mp4
  • Video 02 (Chờ chân dung): https://cdn.scena.ai/project/8606/e48a67884f3a52e8a68cf06b97979f3b22835ec92bf466a058c0d78da97c83b0.mp4
  • Video 03 (Phỏng vấn 1 - Khủng hoảng): https://cdn.scena.ai/project/9741/f7053626ae15c847304143dc6cf41f1fd2cf1611b27c30ff75ac9da6e47d005b.mp4
  • Video 04 (Phỏng vấn 2 - Mega Sale & SLA): https://cdn.scena.ai/project/9741/021c21b2f677c4341e06c62c9432d06d251e22c83716e55b927633e254a67730.mp4
  • Video 05 (Demo hạ tầng Contact Center): https://cdn.scena.ai/project/8606/ac120a105730c378447fd67f5e8b6aeb9557b5e4e8854ac2e21148d5316f780b.mp4

${pageDivider}
KẾT THÚC TỆP DỮ LIỆU CHUẨN XUẤT THUẦN TEXT (.TXT) NGUYỄN HÙNG THÁI
             BẢO LƯU MỌI QUYỀN BẢN QUYỀN © 2026
${pageDivider}`;
}

export function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
