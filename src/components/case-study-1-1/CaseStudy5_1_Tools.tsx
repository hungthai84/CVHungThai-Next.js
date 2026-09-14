import React, { useState } from "react";
import { 
  HelpCircle, 
  Search, 
  BookOpen, 
  Send, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  ThumbsUp, 
  ThumbsDown, 
  Calculator, 
  Sparkles, 
  Paperclip, 
  ShieldCheck 
} from "lucide-react";
import { playUiSound } from "../../lib/sound";

export function CaseStudy5_1_Tools() {
  const [activeTab, setActiveTab] = useState<"search" | "portal" | "roi">("search");

  // Tab 1: Knowledge Base Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  const [helpfulFeedback, setHelpfulFeedback] = useState<Record<number, boolean>>({});

  // Tab 2: Ticket Portal State
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketCategory, setTicketCategory] = useState("Tài khoản & Đăng nhập");
  const [ticketDetail, setTicketDetail] = useState("");
  const [submittedTicket, setSubmittedTicket] = useState<{
    id: string;
    subject: string;
    category: string;
    status: "Đang tiếp nhận" | "Đang xử lý" | "Đã giải quyết";
    agent: string;
    createdAt: string;
    slaRemaining: string;
  } | null>(null);

  // Tab 3: Deflection ROI State
  const [monthlyVolume, setMonthlyVolume] = useState(40000);
  const [costPerLiveAgent, setCostPerLiveAgent] = useState(38000); // 38k VND per live contact
  const [deflectionRate, setDeflectionRate] = useState(35); // 35% deflection

  const kbArticles = [
    {
      id: 1,
      title: "Hướng dẫn lấy lại mật khẩu và mở khóa tài khoản tự động",
      category: "Tài khoản & Bảo mật",
      views: 18450,
      helpfulRate: 97,
      content: `Bước 1: Tại màn hình đăng nhập, chọn 'Quên mật khẩu'.
Bước 2: Nhập số điện thoại đã đăng ký và nhấn 'Tiếp tục'.
Bước 3: Nhập mã xác thực OTP được gửi về tin nhắn SMS (hiệu lực trong 60 giây).
Bước 4: Thiết lập mật khẩu mới có ít nhất 8 ký tự bao gồm chữ hoa, chữ thường và số.
Lưu ý: Nếu tài khoản bị khóa do nhập sai quá 5 lần, hệ thống sẽ tự động gửi email xác thực sinh trắc học để mở khóa trong 3 phút.`,
      tags: ["mật khẩu", "quên pass", "khóa tài khoản", "otp", "login"]
    },
    {
      id: 2,
      title: "Quy trình đối soát và hoàn tiền giao dịch thẻ bị trừ tiền lỗi",
      category: "Thanh toán & Hóa đơn",
      views: 14200,
      helpfulRate: 95,
      content: `Trường hợp tài khoản ngân hàng đã bị trừ tiền nhưng giao dịch trên ứng dụng báo thất bại:
1. Hệ thống ngân hàng liên kết sẽ tự động hoàn tiền trong vòng 15 - 30 phút (đối với thẻ nội địa NAPAS).
2. Đối với thẻ quốc tế (Visa/Mastercard), thời gian hoàn tiền theo quy định ngân hàng phát hành từ 3 - 7 ngày làm việc.
3. Quý khách có thể kiểm tra trạng thái lệnh hoàn tiền ngay tại mục 'Lịch sử giao dịch' > 'Tra soát hoàn tiền'.`,
      tags: ["hoàn tiền", "trừ tiền", "lỗi giao dịch", "napas", "visa", "thanh toán"]
    },
    {
      id: 3,
      title: "Biểu phí dịch vụ và hạn mức giao dịch cập nhật năm 2024",
      category: "Chính sách & Điều khoản",
      views: 22800,
      helpfulRate: 98,
      content: `• Chuyển tiền nội bộ & liên ngân hàng 24/7: Hoàn toàn MIỄN PHÍ.
• Hạn mức giao dịch tiêu chuẩn: 100.000.000 VNĐ/ngày (xác thực eKYC cấp 1).
• Hạn mức giao dịch nâng cao: 500.000.000 VNĐ/ngày (xác thực sinh trắc học NFC CCCD gắn chip).
• Phí duy trì tài khoản: 0 VNĐ.`,
      tags: ["biểu phí", "hạn mức", "chính sách", "phí giao dịch", "miễn phí"]
    },
    {
      id: 4,
      title: "Xử lý sự cố không nhận được mã xác thực OTP qua SMS",
      category: "Kỹ thuật & Lỗi",
      views: 9800,
      helpfulRate: 92,
      content: `Nếu bạn không nhận được mã OTP:
1. Kiểm tra lại sóng di động hoặc tắt chế độ Máy bay (Airplane Mode) rồi bật lại.
2. Kiểm tra bộ nhớ tin nhắn SMS trên điện thoại có bị đầy không.
3. Chọn 'Gửi lại OTP qua Zalo' hoặc 'Nhận cuộc gọi đọc mã tự động' sau 60 giây chờ.
4. Đảm bảo số điện thoại không bị chặn nhận tin nhắn từ Brandname dịch vụ.`,
      tags: ["otp", "không nhận được tin nhắn", "sms", "mã xác nhận", "lỗi mạng"]
    }
  ];

  const filteredArticles = kbArticles.filter(art => {
    const matchCategory = selectedCategory === "all" || art.category === selectedCategory;
    const matchQuery = searchQuery === "" || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      art.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchQuery;
  });

  const handleArticleClick = (id: number) => {
    playUiSound("click");
    setSelectedArticle(id);
  };

  const handleFeedback = (id: number, helpful: boolean) => {
    playUiSound("success");
    setHelpfulFeedback(prev => ({ ...prev, [id]: helpful }));
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketDetail) return;
    playUiSound("success");
    const randomId = `#TK-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedTicket({
      id: randomId,
      subject: ticketSubject,
      category: ticketCategory,
      status: "Đang tiếp nhận",
      agent: "Nguyễn Văn Hùng (Chuyên viên CSKH Tuyến 1)",
      createdAt: "Vừa xong",
      slaRemaining: "01 giờ 45 phút"
    });
  };

  // ROI calculations
  const deflectedTickets = Math.round(monthlyVolume * (deflectionRate / 100));
  const monthlyCostSaved = deflectedTickets * costPerLiveAgent;
  const yearlyCostSaved = monthlyCostSaved * 12;
  const hoursSaved = Math.round((deflectedTickets * 8) / 60); // Assuming 8 mins per contact

  return (
    <div className="glass-base p-6 sm:p-8 rounded-3xl space-y-6 border border-teal-200/80 dark:border-teal-800/60 bg-white/90 dark:bg-slate-900/90 shadow-xl backdrop-blur-xl">
      {/* Tool Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <HelpCircle className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Bộ Công Cụ Thực Nghiệm Help Center
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
            Trải Nghiệm Cổng Tự Phục Vụ 24/7 & Cổng Theo Dõi Ticket
          </h3>
        </div>

        <div className="flex p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 self-stretch sm:self-auto">
          <button
            onClick={() => { setActiveTab("search"); playUiSound("switch"); }}
            className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "search"
                ? "bg-white dark:bg-teal-600 text-teal-600 dark:text-white shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <Search className="w-3.5 h-3.5" /> Tra Cứu Tự Phục Vụ
          </button>
          <button
            onClick={() => { setActiveTab("portal"); playUiSound("switch"); }}
            className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "portal"
                ? "bg-white dark:bg-teal-600 text-teal-600 dark:text-white shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <Send className="w-3.5 h-3.5" /> Cổng Ticket Minh Bạch
          </button>
          <button
            onClick={() => { setActiveTab("roi"); playUiSound("switch"); }}
            className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "roi"
                ? "bg-white dark:bg-teal-600 text-teal-600 dark:text-white shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <Calculator className="w-3.5 h-3.5" /> Hiệu Quả Deflection
          </button>
        </div>
      </div>

      {/* TAB 1: Smart Search & Knowledge Base */}
      {activeTab === "search" && (
        <div className="space-y-6">
          {/* Search bar & Category filters */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-5 h-5 text-teal-600 dark:text-teal-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm câu trả lời: Nhập từ khóa (vd: quên mật khẩu, hoàn tiền, mã OTP, biểu phí)..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-teal-200 dark:border-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs sm:text-sm font-medium shadow-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Xóa
                </button>
              )}
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {["all", "Tài khoản & Bảo mật", "Thanh toán & Hóa đơn", "Kỹ thuật & Lỗi", "Chính sách & Điều khoản"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); playUiSound("click"); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? "bg-teal-600 text-white shadow-md shadow-teal-500/20"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                  }`}
                >
                  {cat === "all" ? "Tất cả chủ đề" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles list & reader */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-3">
              <div className="flex justify-between items-center text-xs text-slate-500 px-1 font-bold">
                <span>Tìm thấy {filteredArticles.length} bài viết liên quan</span>
                <span>Tự phục vụ 24/7</span>
              </div>
              <div className="space-y-2.5">
                {filteredArticles.map((art) => {
                  const isSelected = selectedArticle === art.id;
                  return (
                    <div
                      key={art.id}
                      onClick={() => handleArticleClick(art.id)}
                      className={`p-4 rounded-2xl cursor-pointer border transition-all duration-200 ${
                        isSelected
                          ? "bg-teal-50/90 dark:bg-teal-950/50 border-teal-500 shadow-md ring-2 ring-teal-500/20"
                          : "bg-white/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-teal-300"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase mb-1">
                        <span>{art.category}</span>
                        <span className="text-slate-400 font-normal">{art.views.toLocaleString()} lượt đọc</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                        {art.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full font-semibold">
                          {art.helpfulRate}% Hữu ích
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Article Detail View */}
            <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 shadow-xl flex flex-col justify-between space-y-6">
              {selectedArticle !== null ? (
                (() => {
                  const art = kbArticles.find(a => a.id === selectedArticle)!;
                  const isHelpfulSubmitted = helpfulFeedback[art.id] !== undefined;
                  return (
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3 mb-4">
                        <span className="px-2.5 py-0.5 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase">
                          {art.category}
                        </span>
                        <span className="text-xs text-slate-400">Mã bài viết: #KB-0{art.id}84</span>
                      </div>

                      <h3 className="text-h6 text-slate-900 dark:text-white mb-3">
                        {art.title}
                      </h3>

                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-200 whitespace-pre-line leading-relaxed font-sans">
                        {art.content}
                      </div>

                      {/* Helpful Feedback Box */}
                      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <span className="text-xs text-slate-600 dark:text-slate-300 font-semibold">
                          Bài viết này có giúp bạn giải quyết được vấn đề không?
                        </span>
                        {!isHelpfulSubmitted ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleFeedback(art.id, true)}
                              className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-200 hover:bg-emerald-100 flex items-center gap-1"
                            >
                              <ThumbsUp className="w-3.5 h-3.5" /> Có, rất hữu ích
                            </button>
                            <button
                              onClick={() => handleFeedback(art.id, false)}
                              className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-bold border border-rose-200 hover:bg-rose-100 flex items-center gap-1"
                            >
                              <ThumbsDown className="w-3.5 h-3.5" /> Chưa giải quyết được
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-lg">
                            <CheckCircle2 className="w-4 h-4" /> Cảm ơn bạn đã phản hồi!
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400 space-y-3">
                  <BookOpen className="w-12 h-12 text-teal-400/60" />
                  <p className="text-xs font-semibold">
                    Chọn một bài viết bên trái hoặc gõ từ khóa để xem hướng dẫn chi tiết từng bước.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Ticket Portal Submission & Live Tracking */}
      {activeTab === "portal" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Submit form */}
          <div className="lg:col-span-6 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4 shadow-md">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
              <Send className="w-4 h-4 text-teal-600" />
              <h4 className="text-h6 text-slate-900 dark:text-white">Gửi Yêu Cầu Hỗ Trợ 24/7 (Submit Ticket)</h4>
            </div>

            <form onSubmit={handleTicketSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Chủ đề yêu cầu *</label>
                <select
                  value={ticketCategory}
                  onChange={(e) => setTicketCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  <option>Tài khoản & Đăng nhập</option>
                  <option>Thanh toán & Nạp/Rút tiền</option>
                  <option>Kỹ thuật ứng dụng & Lỗi màn hình</option>
                  <option>Chính sách ưu đãi & Khiếu nại</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Tiêu đề vắn tắt *</label>
                <input
                  type="text"
                  required
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="Ví dụ: Giao dịch chuyển tiền 500k bị trừ nhưng chưa nhận..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Mô tả chi tiết sự cố *</label>
                <textarea
                  rows={4}
                  required
                  value={ticketDetail}
                  onChange={(e) => setTicketDetail(e.target.value)}
                  placeholder="Mô tả cụ thể thời gian xảy ra, mã giao dịch (nếu có) và mong muốn xử lý..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div className="p-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between text-slate-500">
                <span className="flex items-center gap-1.5"><Paperclip className="w-3.5 h-3.5" /> Đính kèm ảnh chụp màn hình</span>
                <span className="text-[10px] bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">Tối đa 10MB</span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" /> Gửi Yêu Cầu Đến Tổng Đài
              </button>
            </form>
          </div>

          {/* Right: Live Ticket Tracker */}
          <div className="lg:col-span-6 p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white border border-teal-800 shadow-xl space-y-5 flex flex-col justify-between">
            {submittedTicket ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-teal-800/80 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider">Mã Tra Cứu Ticket</span>
                    <div className="text-lg font-black text-white">{submittedTicket.id}</div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {submittedTicket.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="text-slate-300">Tiêu đề: <strong className="text-white">{submittedTicket.subject}</strong></div>
                  <div className="text-slate-300">Danh mục: <span className="text-teal-300">{submittedTicket.category}</span></div>
                  <div className="text-slate-300">Chuyên viên tiếp nhận: <span className="text-white">{submittedTicket.agent}</span></div>
                  <div className="text-slate-300">Hạn chót giải quyết (SLA): <strong className="text-amber-400">{submittedTicket.slaRemaining}</strong></div>
                </div>

                {/* Progress Steps */}
                <div className="pt-3 border-t border-teal-800/80 space-y-3">
                  <span className="text-[11px] font-bold text-teal-300 uppercase tracking-wider block">Tiến trình xử lý minh bạch:</span>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>1. Yêu cầu đã được tạo và ghi nhận trên hệ thống CRM (Vừa xong)</span>
                    </div>
                    <div className="flex items-center gap-2 text-teal-300">
                      <Clock className="w-4 h-4 shrink-0 animate-pulse" />
                      <span>2. Chuyên viên đang tra soát log giao dịch với ngân hàng</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0" />
                      <span>3. Hoàn tất xử lý & thông báo kết quả qua SMS/Email</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400 space-y-3">
                <Send className="w-12 h-12 text-teal-500/40" />
                <p className="text-xs font-semibold">
                  Điền biểu mẫu bên trái và gửi ticket để trải nghiệm luồng theo dõi tiến độ SLA minh bạch thời gian thực.
                </p>
              </div>
            )}

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-slate-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Cam kết bảo mật thông tin & giám sát SLA tự động theo tiêu chuẩn ISO/COPC.</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Deflection ROI Calculator */}
      {activeTab === "roi" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-5">
            <h4 className="text-h6 text-slate-900 dark:text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-teal-600" /> Tham Số Vận Hành Tự Phục Vụ
            </h4>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-slate-600 dark:text-slate-300">Tổng lượng yêu cầu hàng tháng:</span>
                <span className="text-teal-600 font-bold">{monthlyVolume.toLocaleString()} yêu cầu</span>
              </div>
              <input
                type="range"
                min="10000"
                max="200000"
                step="5000"
                value={monthlyVolume}
                onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-slate-600 dark:text-slate-300">Chi phí xử lý trung bình/Cuộc gọi thoại:</span>
                <span className="text-teal-600 font-bold">{costPerLiveAgent.toLocaleString()} VNĐ</span>
              </div>
              <input
                type="range"
                min="20000"
                max="80000"
                step="2000"
                value={costPerLiveAgent}
                onChange={(e) => setCostPerLiveAgent(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-slate-600 dark:text-slate-300">Tỷ lệ khách tự giải quyết qua Help Center (Deflection):</span>
                <span className="text-teal-600 font-bold">{deflectionRate}%</span>
              </div>
              <input
                type="range"
                min="15"
                max="60"
                step="1"
                value={deflectionRate}
                onChange={(e) => setDeflectionRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-500/10 via-emerald-500/5 to-transparent border border-teal-200 dark:border-teal-800/60 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-600 flex items-center justify-center mb-3">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Lượng Ticket Giảm Tải / Tháng</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-teal-600 dark:text-teal-400 mt-1">
                  {deflectedTickets.toLocaleString()} Vé
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 pt-3 border-t border-teal-100 dark:border-teal-900/40">
                Khách hàng tự giải quyết thành công qua Help Center mà không cần gọi tổng đài.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-200 dark:border-emerald-800/60 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 flex items-center justify-center mb-3">
                  <DollarSign className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tiết Kiệm Chi Phí / Năm</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                  {(yearlyCostSaved / 1000000000).toFixed(2)} Tỷ VNĐ
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 pt-3 border-t border-emerald-100 dark:border-emerald-900/40">
                Tiết kiệm khoảng <strong>{(monthlyCostSaved / 1000000).toFixed(1)} Triệu VNĐ</strong> mỗi tháng.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-transparent border border-blue-200 dark:border-blue-800/60 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-600 flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Thời Gian Giải Phóng Nhân Lực</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                  {hoursSaved.toLocaleString()} Giờ/Tháng
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 pt-3 border-t border-blue-100 dark:border-blue-900/40">
                Đội ngũ Agent tập trung xử lý các ca khiếu nại phức tạp và chăm sóc khách hàng VIP.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-200 dark:border-amber-800/60 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Thời Gian Phản Hồi Tức Thì</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
                  0 Giây Chờ Đợi
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 pt-3 border-t border-amber-100 dark:border-amber-900/40">
                Hỗ trợ tức thời 24/7/365 ngay cả trong dịp Lễ, Tết và ngoài giờ hành chính.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
