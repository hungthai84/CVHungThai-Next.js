import React, { useState } from "react";
import { 
  MessageSquare, 
  PhoneCall, 
  Mail, 
  Bot, 
  Workflow, 
  Smartphone, 
  User, 
  Sparkles, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  Send,
  RefreshCw,
  Layers,
  FileText
} from "lucide-react";

export function CaseStudy3_3_Tools() {
  const [activeTab, setActiveTab] = useState<"inbox" | "workflow" | "chatbot">("inbox");

  // Tool 1: Omnichannel Unified Inbox State
  const [selectedChannel, setSelectedChannel] = useState<"all" | "voice" | "chat" | "zalo" | "email">("all");
  const [activeThreadId, setActiveThreadId] = useState<number>(1);

  const threads = [
    {
      id: 1,
      customer: "Hoàng Minh Tâm (VIP Diamond)",
      subject: "Yêu cầu hoàn phí giao dịch bảo hiểm kép #TRX-9821",
      lastChannel: "Zalo OA",
      status: "Đang xử lý",
      slaTime: "Còn 12 phút",
      messages: [
        { sender: "customer", channel: "Web Livechat (09:15)", text: "Chào bạn, hôm qua tôi bị trừ tiền 2 lần cho đơn bảo hiểm xe ô tô." },
        { sender: "bot", channel: "AI Bot (09:15)", text: "Dạ em đã nhận diện đơn hàng của anh. Mã giao dịch là #TRX-9821 đúng không ạ?" },
        { sender: "customer", channel: "Voice Hotline (09:30)", text: "[Cuộc gọi 03:45] Khách hàng gọi xác nhận đã gửi sao kê qua Zalo." },
        { sender: "agent", channel: "Zalo OA (09:42)", text: "Em Tâm CSKH đã nhận sao kê của anh qua Zalo. Em đang tạo lệnh Auto-Refund sang Kế toán, tiền sẽ hoàn về thẻ trong 15 phút ạ." }
      ]
    },
    {
      id: 2,
      customer: "Lê Thu Trang",
      subject: "Không nhận được mã kích hoạt tài khoản",
      lastChannel: "Email",
      status: "Chờ phản hồi",
      slaTime: "Còn 45 phút",
      messages: [
        { sender: "customer", channel: "Email (10:00)", text: "Tôi đăng ký từ sáng mà chưa nhận được mã OTP kích hoạt tài khoản qua SMS." },
        { sender: "agent", channel: "Email (10:04)", text: "Dạ hệ thống đã kiểm tra số điện thoại của chị và gửi lại mã OTP qua Voice Call tự động. Chị vui lòng bắt máy nhé ạ!" }
      ]
    }
  ];

  const currentThread = threads.find(t => t.id === activeThreadId) || threads[0];

  // Tool 2: Workflow Automation Simulator State
  const [ticketTopic, setTicketTopic] = useState<"billing" | "bug" | "vip_request">("billing");
  const [custTier, setCustTier] = useState<"standard" | "gold" | "diamond">("diamond");
  const [sentiment, setSentiment] = useState<"neutral" | "angry">("angry");

  const runWorkflowSimulation = () => {
    let assignedGroup = "CSKH Chung (L1)";
    let slaTarget = "4 giờ";
    let priority = "Trung Bình";
    let autoAction = "Gửi email xác nhận tiếp nhận tự động";

    if (custTier === "diamond") {
      assignedGroup = "VIP Concierge & Senior Lead (L3)";
      slaTarget = "15 phút";
      priority = "Khẩn Cấp (P1)";
      autoAction = "Kích hoạt CTI Pop-up ưu tiên hàng đầu + Gửi SMS thông báo trực tiếp";
    } else if (ticketTopic === "billing" && sentiment === "angry") {
      assignedGroup = "Đội Tài Chính Kế Toán Hoàn Tiền";
      slaTarget = "30 phút";
      priority = "Cao (P2)";
      autoAction = "Tự động trích xuất sao kê ngân hàng & gắn nhãn Escalation";
    }

    return { assignedGroup, slaTarget, priority, autoAction };
  };

  const simResult = runWorkflowSimulation();

  // Tool 3: AI Chatbot Simulator State
  const [botChatMessages, setBotChatMessages] = useState<Array<{ sender: "user" | "bot"; text: string; action?: string }>>([
    { sender: "bot", text: "Xin chào! Em là Trợ lý AI 24/7. Em có thể giúp gì cho anh/chị hôm nay? (Tra cứu đơn hàng, Đổi mật khẩu, Hướng dẫn kích hoạt...)" }
  ]);
  const [userBotInput, setUserBotInput] = useState("");

  const handleSendBot = (presetText?: string) => {
    const textToSend = presetText || userBotInput;
    if (!textToSend.trim()) return;

    const newMsgs = [...botChatMessages, { sender: "user" as const, text: textToSend }];
    setBotChatMessages(newMsgs);
    setUserBotInput("");

    setTimeout(() => {
      let botReply = "Em đã tiếp nhận yêu cầu của anh/chị. Đang kiểm tra hệ thống...";
      let actionTag = "Tự Phục Vụ 100%";

      if (textToSend.toLowerCase().includes("đơn hàng") || textToSend.toLowerCase().includes("tra cứu")) {
        botReply = "Đơn hàng #DH-88392 của anh đang trên xe vận chuyển tại Trạm Tân Bình. Dự kiến giao hôm nay trước 17:30!";
      } else if (textToSend.toLowerCase().includes("hoàn tiền") || textToSend.toLowerCase().includes("gặp nhân viên") || textToSend.toLowerCase().includes("khiếu nại")) {
        botReply = "Em nhận thấy đây là trường hợp cần kiểm tra chuyên sâu. Em đang chuyển trọn vẹn lịch sử này cho Chuyên viên Lê Minh (Ca trực VIP) hỗ trợ anh ngay lập tức!";
        actionTag = "Chuyển giao thông minh (Seamless Handoff)";
      } else {
        botReply = "Dạ thông tin hướng dẫn chi tiết đã được gửi vào ứng dụng của anh. Anh có cần em hỗ trợ thêm gì không ạ?";
      }

      setBotChatMessages([...newMsgs, { sender: "bot", text: botReply, action: actionTag }]);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Sub tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/80">
        <button
          onClick={() => setActiveTab("inbox")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "inbox"
              ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-md border border-slate-200/50 dark:border-slate-700"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          1. Hộp Thư Hợp Nhất Đa Kênh (Omnichannel Unified Inbox)
        </button>

        <button
          onClick={() => setActiveTab("workflow")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "workflow"
              ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-md border border-slate-200/50 dark:border-slate-700"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Workflow className="w-3.5 h-3.5" />
          2. Động Cơ Phân Luồng &amp; Tự Động Hóa (Smart Routing Engine)
        </button>

        <button
          onClick={() => setActiveTab("chatbot")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "chatbot"
              ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-md border border-slate-200/50 dark:border-slate-700"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Bot className="w-3.5 h-3.5" />
          3. AI Bot Tự Phục Vụ &amp; Seamless Handoff
        </button>
      </div>

      {/* Tab 1: Unified Inbox */}
      {activeTab === "inbox" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 bg-white/90 dark:bg-slate-900/90 p-5 rounded-3xl border border-emerald-200/80 dark:border-emerald-800/60 shadow-xl">
          {/* Thread list */}
          <div className="lg:col-span-5 space-y-3 border-r border-slate-100 dark:border-slate-800 pr-0 lg:pr-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Danh Sách Hội Thoại (Live Feed)</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                2 Đang chờ
              </span>
            </div>

            <div className="space-y-2">
              {threads.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setActiveThreadId(t.id)}
                  className={`p-3.5 rounded-2xl cursor-pointer border transition-all ${
                    activeThreadId === t.id
                      ? "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-600 shadow-sm"
                      : "bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{t.customer}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                      {t.lastChannel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1">{t.subject}</p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[10px] text-slate-500">
                    <span className="text-rose-600 font-semibold">{t.slaTime}</span>
                    <span className="text-emerald-600 font-bold">{t.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conversation history with cross-channel timeline */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <h4 className="text-h6 text-slate-900 dark:text-white">{currentThread.customer}</h4>
                  <p className="text-xs text-slate-500">{currentThread.subject}</p>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-xl">
                  Cross-channel Sync ✓
                </span>
              </div>

              {/* Message flow */}
              <div className="space-y-2.5 mt-3 max-h-72 overflow-y-auto pr-1">
                {currentThread.messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl text-xs space-y-1 ${
                      m.sender === "customer"
                        ? "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 ml-0 mr-8"
                        : m.sender === "bot"
                        ? "bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 ml-4 mr-4 border border-purple-200/50"
                        : "bg-emerald-600 text-white ml-8 mr-0"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] opacity-75 font-semibold">
                      <span>{m.channel}</span>
                      <span>{m.sender === "customer" ? "Khách hàng" : m.sender === "bot" ? "AI Assistant" : "Chuyên viên Tâm"}</span>
                    </div>
                    <p className="leading-relaxed">{m.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick reply bar */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              <input
                type="text"
                placeholder="Nhập câu trả lời hoặc chọn Macro 1-chạm..."
                className="flex-1 px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
              <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1">
                <Send className="w-3.5 h-3.5" /> Gửi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Workflow Automation Simulator */}
      {activeTab === "workflow" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white/90 dark:bg-slate-900/90 p-6 rounded-3xl border border-purple-200/80 dark:border-purple-800/60 shadow-xl">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <h3 className="text-h6 text-slate-900 dark:text-white mb-1">
                Bộ Điều Khiển Quy Trình Thông Minh
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Thay đổi các tham số đầu vào để quan sát cơ chế phân luồng tự động (Skill-based Routing) và cam kết SLA.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Hạng Khách Hàng (Tier):</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["standard", "gold", "diamond"] as const).map((tier) => (
                    <button
                      key={tier}
                      onClick={() => setCustTier(tier)}
                      className={`p-2 rounded-xl font-bold uppercase text-[11px] transition-all ${
                        custTier === tier
                          ? "bg-purple-600 text-white shadow-md"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Chủ Đề Yêu Cầu (Topic):</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setTicketTopic("billing")}
                    className={`p-2 rounded-xl font-bold text-[11px] transition-all ${
                      ticketTopic === "billing" ? "bg-purple-600 text-white shadow-md" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    Thanh Toán
                  </button>
                  <button
                    onClick={() => setTicketTopic("bug")}
                    className={`p-2 rounded-xl font-bold text-[11px] transition-all ${
                      ticketTopic === "bug" ? "bg-purple-600 text-white shadow-md" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    Lỗi App
                  </button>
                  <button
                    onClick={() => setTicketTopic("vip_request")}
                    className={`p-2 rounded-xl font-bold text-[11px] transition-all ${
                      ticketTopic === "vip_request" ? "bg-purple-600 text-white shadow-md" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    Tư Vấn VIP
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Mức Độ Cảm Xúc (Sentiment Analysis):</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSentiment("neutral")}
                    className={`p-2 rounded-xl font-bold text-[11px] transition-all ${
                      sentiment === "neutral" ? "bg-emerald-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    Bình thường 🙂
                  </button>
                  <button
                    onClick={() => setSentiment("angry")}
                    className={`p-2 rounded-xl font-bold text-[11px] transition-all ${
                      sentiment === "angry" ? "bg-rose-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    Bức xúc / Khẩn cấp 😡
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Workflow Outcome Display */}
          <div className="lg:col-span-7 bg-purple-50/50 dark:bg-purple-950/30 p-5 rounded-2xl border border-purple-200 dark:border-purple-800/60 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-bold text-purple-700 dark:text-purple-300 uppercase tracking-widest block mb-1">
                Kết Quả Thực Thi Trigger &amp; Action Tự Động
              </span>
              <h4 className="text-h6 text-slate-900 dark:text-white">
                Quyết Định Điều Phối Hệ Thống Trong 0.05 Giây
              </h4>

              <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-xl border border-purple-200/60">
                  <span className="text-slate-500 block text-[10px]">Độ Ưu Tiên (Priority):</span>
                  <strong className="text-h6 text-purple-700 dark:text-purple-300">{simResult.priority}</strong>
                </div>

                <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-xl border border-purple-200/60">
                  <span className="text-slate-500 block text-[10px]">Mục Tiêu SLA Giải Quyết:</span>
                  <strong className="text-h6 text-rose-600">{simResult.slaTarget}</strong>
                </div>

                <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-xl border border-purple-200/60 col-span-2">
                  <span className="text-slate-500 block text-[10px]">Nhóm Nhân Viên Được Gán Tự Động:</span>
                  <strong className="text-h6 text-slate-900 dark:text-white">{simResult.assignedGroup}</strong>
                </div>

                <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-xl border border-purple-200/60 col-span-2">
                  <span className="text-slate-500 block text-[10px]">Hành Động Tự Động Kích Hoạt (Macro &amp; Webhook):</span>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">{simResult.autoAction}</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-purple-200/60 text-xs text-slate-500">
              Giảm 100% thời gian phân phối vé thủ công của Trưởng nhóm.
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: AI Chatbot Simulator */}
      {activeTab === "chatbot" && (
        <div className="bg-white/90 dark:bg-slate-900/90 p-5 rounded-3xl border border-blue-200/80 dark:border-blue-800/60 shadow-xl max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-h6 text-slate-900 dark:text-white">AI Virtual Assistant Sandbox</h4>
                <p className="text-[11px] text-slate-500">Thử nghiệm giải quyết tự động 45% tác vụ &amp; Seamless Handoff</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Sẵn sàng 24/7
            </span>
          </div>

          {/* Chat area */}
          <div className="space-y-3 min-h-64 max-h-80 overflow-y-auto p-2">
            {botChatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`p-3.5 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200/60 dark:border-slate-700/60"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.action && (
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> {msg.action}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Quick preset chips */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            <button
              onClick={() => handleSendBot("Tra cứu đơn hàng #DH-88392")}
              className="px-3 py-1 rounded-full text-xs bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              📦 Tra cứu đơn hàng #DH-88392
            </button>
            <button
              onClick={() => handleSendBot("Tôi muốn khiếu nại hoàn tiền và gặp nhân viên")}
              className="px-3 py-1 rounded-full text-xs bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              ⚠️ Khiếu nại hoàn tiền &amp; Chuyển người thật
            </button>
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={userBotInput}
              onChange={(e) => setUserBotInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendBot()}
              placeholder="Nhập câu hỏi để thử nghiệm AI..."
              className="flex-1 px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={() => handleSendBot()}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
