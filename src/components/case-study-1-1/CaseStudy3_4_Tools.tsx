import React, { useState } from "react";
import { 
  BookOpen, 
  Search, 
  Cpu, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  ThumbsUp, 
  ThumbsDown, 
  AlertTriangle, 
  FileText, 
  Clock, 
  RefreshCw, 
  ShieldCheck, 
  ArrowRight,
  Database,
  Plus
} from "lucide-react";

export function CaseStudy3_4_Tools() {
  const [activeTab, setActiveTab] = useState<"kb" | "rag" | "gap">("kb");

  // Tool 1: KB Explorer State
  const [selectedCategory, setSelectedCategory] = useState<string>("policy");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeArticleId, setActiveArticleId] = useState<number>(1);
  const [feedbackState, setFeedbackState] = useState<Record<number, "up" | "down" | null>>({});

  const articles = [
    {
      id: 1,
      cat: "policy",
      title: "Chính sách hoàn tiền và đổi trả dịch vụ bảo hiểm (Cập nhật v3.2)",
      version: "v3.2 (Ban hành 15/08/2026)",
      author: "Nguyễn Lê Minh (QA Lead)",
      audience: "Internal & Public",
      content: `1. Điều kiện hoàn tiền: Khách hàng yêu cầu hủy hợp đồng trong vòng 21 ngày kể từ ngày ký (Free-look period) và chưa phát sinh quyền lợi bồi thường.
2. Hồ sơ yêu cầu: Đơn đề nghị hoàn phí theo mẫu 02-BH, Bản sao CCCD và Sao kê tài khoản ngân hàng thụ hưởng.
3. Thời hạn giải quyết: Tiền được chuyển hoàn tự động vào tài khoản khách hàng trong vòng 3-5 ngày làm việc.`
    },
    {
      id: 2,
      cat: "tech",
      title: "Quy trình xử lý sự cố lỗi thanh toán Gateway OTP bị trễ",
      version: "v2.0 (Ban hành 01/08/2026)",
      author: "Đội ngũ IT & Core DevOps",
      audience: "Internal Only (Agent L2/L3)",
      content: `Bước 1: Tra cứu mã giao dịch trên cổng Payment Admin Tool.
Bước 2: Nếu trạng thái 'PENDING' quá 15 phút, kích hoạt lệnh Re-query sang Ngân hàng đối tác.
Bước 3: Nếu ngân hàng đã trừ tiền nhưng cổng chưa ghi nhận: Gắn tag #Payment-Sync-Manual và gửi lệnh hoàn tiền 1-chạm.`
    },
    {
      id: 3,
      cat: "sop",
      title: "Kịch bản giao tiếp chuẩn khi xử lý khách hàng khiếu nại gay gắt (HEAT Model)",
      version: "v4.1 (Ban hành 10/06/2026)",
      author: "Đào tạo nghiệp vụ CSKH",
      audience: "Internal Only",
      content: `Mô hình H.E.A.T:
- H (Hear): Lắng nghe không ngắt lời trong ít nhất 45 giây đầu tiên.
- E (Empathize): Thể hiện sự đồng cảm sâu sắc với sự bất tiện của khách hàng.
- A (Apologize): Nhận trách nhiệm về phía doanh nghiệp một cách chân thành.
- T (Take Action): Đưa ra giải pháp cụ thể kèm mốc thời gian cam kết chính xác.`
    }
  ];

  const filteredArticles = articles.filter(a => 
    (selectedCategory === "all" || a.cat === selectedCategory) &&
    (a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const currentArticle = articles.find(a => a.id === activeArticleId) || articles[0];

  const handleFeedback = (id: number, type: "up" | "down") => {
    setFeedbackState(prev => ({ ...prev, [id]: type }));
  };

  // Tool 2: RAG Pipeline Simulator
  const [ragQuery, setRagQuery] = useState("Khách hủy gói sau 15 ngày có được hoàn 100% tiền không?");
  const [isProcessingRag, setIsProcessingRag] = useState(false);
  const [ragResult, setRagResult] = useState<{
    retrievedChunks: string[];
    groundedAnswer: string;
    confidenceScore: number;
    hallucinationCheck: string;
  } | null>({
    retrievedChunks: [
      "[Chunk #KB-01]: Khách hàng yêu cầu hủy hợp đồng trong vòng 21 ngày kể từ ngày ký (Free-look period) và chưa phát sinh quyền lợi bồi thường sẽ được hoàn 100% phí bảo hiểm.",
      "[Chunk #KB-03]: Thời gian xử lý hoàn tiền là 3-5 ngày làm việc qua tài khoản ngân hàng chính chủ."
    ],
    groundedAnswer: "Có, khách hàng được hoàn 100% số tiền phí đã đóng vì 15 ngày vẫn nằm trong thời hạn cân nhắc 21 ngày (Free-look period), với điều kiện chưa phát sinh yêu cầu bồi thường quyền lợi bảo hiểm.",
    confidenceScore: 98.6,
    hallucinationCheck: "Đã xác thực 100% khớp tài liệu nguồn (Grounded). Không có ảo giác."
  });

  const handleRunRag = (queryText: string) => {
    setRagQuery(queryText);
    setIsProcessingRag(true);
    setTimeout(() => {
      if (queryText.includes("15 ngày")) {
        setRagResult({
          retrievedChunks: [
            "[Chunk #KB-01]: Khách hàng yêu cầu hủy trong 21 ngày (Free-look period) được hoàn 100% phí bảo hiểm.",
            "[Chunk #KB-03]: Thời gian xử lý hoàn tiền 3-5 ngày làm việc."
          ],
          groundedAnswer: "Có, khách hàng được hoàn 100% tiền phí đã đóng vì thời gian 15 ngày nằm trong hạn 21 ngày cân nhắc (Free-look period), miễn là chưa phát sinh quyền lợi bồi thường.",
          confidenceScore: 98.6,
          hallucinationCheck: "Khớp 100% tài liệu nguồn (Grounded). Không phát hiện ảo giác."
        });
      } else if (queryText.includes("lỗi OTP")) {
        setRagResult({
          retrievedChunks: [
            "[Chunk #KB-02]: Nếu trạng thái PENDING quá 15 phút, kích hoạt lệnh Re-query sang Ngân hàng.",
            "[Chunk #KB-02]: Gắn tag #Payment-Sync-Manual nếu đã trừ tiền."
          ],
          groundedAnswer: "Đối với sự cố OTP thanh toán bị trễ, nhân viên cần tra cứu Payment Admin Tool. Nếu PENDING quá 15 phút, hãy gửi lệnh Re-query và gắn tag #Payment-Sync-Manual để đối soát tự động.",
          confidenceScore: 95.2,
          hallucinationCheck: "Khớp 100% tài liệu SOP kỹ thuật nội bộ."
        });
      } else {
        setRagResult({
          retrievedChunks: [
            "[Chunk #KB-03]: Áp dụng mô hình H.E.A.T: Hear -> Empathize -> Apologize -> Take Action."
          ],
          groundedAnswer: "Khi khách hàng khiếu nại gay gắt, hãy áp dụng quy tắc HEAT: Lắng nghe 45 giây không ngắt lời, thể hiện sự đồng cảm, xin lỗi chân thành và đưa ra phương án hành động có mốc giờ cụ thể.",
          confidenceScore: 96.8,
          hallucinationCheck: "Khớp 100% tài liệu đào tạo kỹ năng mềm CSKH."
        });
      }
      setIsProcessingRag(false);
    }, 450);
  };

  // Tool 3: Knowledge Gap Suggestions
  const gapItems = [
    { query: "Cách xuất hóa đơn đỏ điện tử trên app mới", searchCount: 342, zeroResultRate: "89%", status: "Đề xuất tạo bài mới", priority: "Khẩn cấp" },
    { query: "Chính sách tích điểm thành viên khi mua bảo hiểm ô tô", searchCount: 215, zeroResultRate: "76%", status: "Đang biên soạn", priority: "Cao" },
    { query: "Lỗi không quét được khuôn mặt FaceID trên iPhone 15", searchCount: 180, zeroResultRate: "68%", status: "Đề xuất tạo bài mới", priority: "Trung bình" }
  ];

  return (
    <div className="space-y-6">
      {/* Sub tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/80">
        <button
          onClick={() => setActiveTab("kb")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "kb"
              ? "bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-md border border-slate-200/50 dark:border-slate-700"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          1. Trình Quản Trị Cơ Sở Tri Thức (KB Portal &amp; Version Control)
        </button>

        <button
          onClick={() => setActiveTab("rag")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "rag"
              ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-md border border-slate-200/50 dark:border-slate-700"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          2. Mô Phỏng Đường Ống Huấn Luyện AI &amp; RAG Pipeline
        </button>

        <button
          onClick={() => setActiveTab("gap")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "gap"
              ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-md border border-slate-200/50 dark:border-slate-700"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          3. Phát Hiện Lỗ Hổng Tri Thức (Knowledge Gap Detector)
        </button>
      </div>

      {/* Tab 1: Knowledge Base Portal */}
      {activeTab === "kb" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 bg-white/90 dark:bg-slate-900/90 p-5 rounded-3xl border border-amber-200/80 dark:border-amber-800/60 shadow-xl">
          {/* Sidebar categories & articles */}
          <div className="lg:col-span-4 space-y-3 border-r border-slate-100 dark:border-slate-800 pr-0 lg:pr-4">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm tài liệu, chính sách, SOP..."
                className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex gap-1 overflow-x-auto pb-1">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 transition-colors ${
                  selectedCategory === "all" ? "bg-amber-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setSelectedCategory("policy")}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 transition-colors ${
                  selectedCategory === "policy" ? "bg-amber-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                Chính sách
              </button>
              <button
                onClick={() => setSelectedCategory("tech")}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 transition-colors ${
                  selectedCategory === "tech" ? "bg-amber-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                Sự cố kỹ thuật
              </button>
              <button
                onClick={() => setSelectedCategory("sop")}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 transition-colors ${
                  selectedCategory === "sop" ? "bg-amber-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                SOP Kịch bản
              </button>
            </div>

            <div className="space-y-2 mt-2 max-h-72 overflow-y-auto">
              {filteredArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => setActiveArticleId(art.id)}
                  className={`p-3 rounded-2xl cursor-pointer border transition-all ${
                    activeArticleId === art.id
                      ? "bg-amber-50 dark:bg-amber-950/40 border-amber-400 dark:border-amber-600 shadow-sm"
                      : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 block mb-0.5 uppercase">
                    {art.version}
                  </span>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">{art.title}</h5>
                  <span className="text-[10px] text-slate-400 block mt-1">{art.audience}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Article Detail Content */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                    {currentArticle.version}
                  </span>
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white mt-1">
                    {currentArticle.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Tác giả: {currentArticle.author} • Phân quyền: {currentArticle.audience}
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 shrink-0">
                  <ShieldCheck className="w-4 h-4" /> Đã Ký Duyệt QA
                </span>
              </div>

              {/* Body */}
              <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed font-sans">
                {currentArticle.content}
              </div>
            </div>

            {/* Thumbs Feedback & Retraining Trigger */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="text-slate-500 text-[11px]">Bài viết này có hữu ích không?</span>
                <button
                  onClick={() => handleFeedback(currentArticle.id, "up")}
                  className={`flex items-center gap-1 px-3 py-1 rounded-xl font-bold transition-all ${
                    feedbackState[currentArticle.id] === "up"
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-emerald-600"
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" /> Có (128)
                </button>
                <button
                  onClick={() => handleFeedback(currentArticle.id, "down")}
                  className={`flex items-center gap-1 px-3 py-1 rounded-xl font-bold transition-all ${
                    feedbackState[currentArticle.id] === "down"
                      ? "bg-rose-600 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-rose-600"
                  }`}
                >
                  <ThumbsDown className="w-3.5 h-3.5" /> Chưa rõ (2)
                </button>
              </div>

              <span className="text-[11px] text-amber-600 font-semibold flex items-center gap-1">
                <RefreshCw className="w-3.5 h-3.5" /> Vector DB đồng bộ tự động
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: RAG Pipeline Simulator */}
      {activeTab === "rag" && (
        <div className="bg-white/90 dark:bg-slate-900/90 p-6 rounded-3xl border border-purple-200/80 dark:border-purple-800/60 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Mô Phỏng Đường Ống RAG (Retrieval-Augmented Generation) &amp; Guardrails
              </h3>
              <p className="text-xs text-slate-500">
                Xem cách AI truy xuất dữ liệu từ KB để trả lời chính xác 100% không bị ảo giác.
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
              Độ chính xác: 94% • Ảo giác: &lt; 2%
            </span>
          </div>

          {/* Prompt options */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleRunRag("Khách hủy gói sau 15 ngày có được hoàn 100% tiền không?")}
              className="px-3 py-1.5 rounded-xl text-xs bg-purple-50 dark:bg-purple-950/50 hover:bg-purple-100 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 font-medium transition-colors"
            >
              ❓ Khách hủy sau 15 ngày được hoàn tiền không?
            </button>
            <button
              onClick={() => handleRunRag("Xử lý thế nào khi OTP thanh toán bị trễ?")}
              className="px-3 py-1.5 rounded-xl text-xs bg-purple-50 dark:bg-purple-950/50 hover:bg-purple-100 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 font-medium transition-colors"
            >
              ❓ Xử lý thế nào khi OTP thanh toán bị trễ?
            </button>
            <button
              onClick={() => handleRunRag("Kịch bản xử lý khi khách hàng khiếu nại gay gắt")}
              className="px-3 py-1.5 rounded-xl text-xs bg-purple-50 dark:bg-purple-950/50 hover:bg-purple-100 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 font-medium transition-colors"
            >
              ❓ Kịch bản xử lý khi khách hàng khiếu nại gay gắt
            </button>
          </div>

          {/* RAG Pipeline Breakdown */}
          {ragResult && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Retrieved Chunks */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-purple-500" /> Vector Database Retrival (Top Chunks):
                </span>
                <div className="space-y-2">
                  {ragResult.retrievedChunks.map((chunk, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-white dark:bg-slate-900 text-[11px] text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60 leading-relaxed font-mono">
                      {chunk}
                    </div>
                  ))}
                </div>
              </div>

              {/* Grounded Output */}
              <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-purple-900 dark:text-purple-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-purple-600" /> Câu Trả Lời Căn Cứ Thực Tế (Grounded AI):
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600">Độ tin cậy: {ragResult.confidenceScore}%</span>
                  </div>
                  <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed mt-2 p-3 bg-white dark:bg-slate-900 rounded-xl border border-purple-100 dark:border-purple-900/60 font-medium">
                    {ragResult.groundedAnswer}
                  </p>
                </div>

                <div className="pt-2 border-t border-purple-200/60 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {ragResult.hallucinationCheck}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Knowledge Gap Detector */}
      {activeTab === "gap" && (
        <div className="bg-white/90 dark:bg-slate-900/90 p-5 rounded-3xl border border-emerald-200/80 dark:border-emerald-800/60 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Phát Hiện Khoảng Trống Tri Thức &amp; Tự Động Đề Xuất Bài Viết
              </h3>
              <p className="text-xs text-slate-500">
                Hệ thống AI tự động phân tích các từ khóa tìm kiếm có tỷ lệ thất bại cao để đề xuất soạn thảo bổ sung.
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              Vòng Lặp Tự Hoàn Thiện
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold">
                <tr>
                  <th className="p-3.5">Từ Khóa / Nhu Cầu Chưa Có Bài Viết</th>
                  <th className="p-3.5 text-center">Lượt Tìm Kiếm / Tuần</th>
                  <th className="p-3.5 text-center">Tỷ Lệ Thất Bại</th>
                  <th className="p-3.5 text-center">Mức Ưu Tiên</th>
                  <th className="p-3.5">Hành Động Khắc Phục</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-300">
                {gapItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">{item.query}</td>
                    <td className="p-3.5 text-center font-mono font-bold text-slate-800 dark:text-slate-200">{item.searchCount}</td>
                    <td className="p-3.5 text-center font-bold text-rose-600 font-mono">{item.zeroResultRate}</td>
                    <td className="p-3.5 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        item.priority === "Khẩn cấp" ? "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300" :
                        item.priority === "Cao" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300" :
                        "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
                      }`}>
                        {item.priority}
                      </span>
                    </td>
                    <td className="p-3.5 font-semibold text-xs">
                      <button className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline font-bold">
                        <Plus className="w-3.5 h-3.5" /> Tạo &amp; Huấn Luyện Ngay
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
