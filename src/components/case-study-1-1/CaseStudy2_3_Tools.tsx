import React, { useState } from "react";
import { 
  Calculator, 
  Bot, 
  Workflow, 
  Zap, 
  Send, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  UserCheck, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Sliders,
  MessageSquare
} from "lucide-react";
import { playUiSound } from "../../lib/sound";

export function CaseStudy2_3_Tools() {
  const [activeTab, setActiveTab] = useState<"chatbot" | "workflow" | "roi">("chatbot");

  // Tab 1: Chatbot Simulator State
  const [selectedPrompt, setSelectedPrompt] = useState<string>("wismo");

  // Tab 3: Automation ROI State
  const [monthlyVolume, setMonthlyVolume] = useState<number>(40000);
  const [containmentRate, setContainmentRate] = useState<number>(55); // 55% solved by bot
  const [costPerHumanContact, setCostPerHumanContact] = useState<number>(25000); // 25,000 VND
  const [costPerBotContact, setCostPerBotContact] = useState<number>(2500); // 2,500 VND

  // Calculations for Tab 3
  const botSolvedTickets = (monthlyVolume * containmentRate) / 100;
  const humanHandledTickets = monthlyVolume - botSolvedTickets;
  
  const costWithoutAutomation = monthlyVolume * costPerHumanContact;
  const costWithAutomation = (humanHandledTickets * costPerHumanContact) + (botSolvedTickets * costPerBotContact);
  const monthlySavings = costWithoutAutomation - costWithAutomation;
  const yearlySavings = monthlySavings * 12;
  const fteSaved = (botSolvedTickets * 6.5) / (60 * 176); // assuming 6.5 mins per ticket, 176h/month

  const botScenarios: Record<string, {
    userQuery: string;
    intent: string;
    confidence: string;
    botResponse: string;
    actionTaken: string;
    isHandover: boolean;
  }> = {
    wismo: {
      userQuery: "Đơn hàng #VN-88291 của mình giao tới đâu rồi bot ơi?",
      intent: "Tra cứu vận đơn (ORDER_TRACKING)",
      confidence: "98.7%",
      botResponse: "Dạ đơn hàng #VN-88291 của bạn đang được shipper Bùi Văn A giao tại khu vực Cầu Giấy, Hà Nội. Dự kiến bạn sẽ nhận được hàng trong khoảng 15h30 - 17h00 hôm nay ạ!",
      actionTaken: "Tự động gọi API cổng Logistics ViettelPost trong 0.8 giây",
      isHandover: false
    },
    refund: {
      userQuery: "Cho mình hỏi điều kiện và thời gian để được hoàn tiền?",
      intent: "Chính sách hoàn tiền (POLICY_REFUND)",
      confidence: "96.2%",
      botResponse: "Dạ theo chính sách của chúng em, các đơn hàng hoàn trả trong vòng 7 ngày kể từ khi nhận hàng sẽ được hoàn 100% qua tài khoản ngân hàng trong 24h làm việc. Bạn có muốn tạo yêu cầu hoàn tiền cho đơn nào không ạ?",
      actionTaken: "Trích xuất tri thức từ Knowledge Base & hiển thị nút chọn đơn",
      isHandover: false
    },
    complaint: {
      userQuery: "Hàng bị vỡ nát hết rồi, tôi rất bực mình muốn gặp trực tiếp quản lý!",
      intent: "Khiếu nại sản phẩm hỏng & Bức xúc (COMPLAINT_DAMAGED)",
      confidence: "99.1% (Sentiment: Negative/Urgent)",
      botResponse: "Dạ em vô cùng xin lỗi vì sự cố không mong muốn này! Em xin phép kết nối anh/chị với chuyên viên hỗ trợ cấp cao ngay bây giờ kèm toàn bộ hình ảnh đơn hàng ạ.",
      actionTaken: "Kích hoạt Seamless Handover → Chuyển ưu tiên P1 sang Trưởng ca",
      isHandover: true
    }
  };

  return (
    <div className="glass-inner p-6 sm:p-8 rounded-3xl space-y-6 border border-emerald-300/60 dark:border-emerald-700/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl">
      {/* Tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-100 dark:border-emerald-900/50 pb-4">
        <div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
            <Calculator className="w-4 h-4" /> Bộ Công Cụ Tự Động Hóa CSKH
          </span>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
            Trình Giả Lập AI Chatbot &amp; Máy Tính ROI Tự Động Hóa
          </h3>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-emerald-100/70 dark:bg-slate-800/80 rounded-2xl border border-emerald-200/60 dark:border-emerald-700/60 text-xs font-bold">
          <button
            onClick={() => { playUiSound("click"); setActiveTab("chatbot"); }}
            className={`px-3 py-1.5 rounded-xl transition-all ${activeTab === "chatbot" ? "bg-emerald-600 text-white shadow-md" : "text-slate-600 dark:text-slate-300 hover:text-emerald-600"}`}
          >
            1. Giả Lập AI Chatbot
          </button>
          <button
            onClick={() => { playUiSound("click"); setActiveTab("workflow"); }}
            className={`px-3 py-1.5 rounded-xl transition-all ${activeTab === "workflow" ? "bg-emerald-600 text-white shadow-md" : "text-slate-600 dark:text-slate-300 hover:text-emerald-600"}`}
          >
            2. Workflow Trigger Macro
          </button>
          <button
            onClick={() => { playUiSound("click"); setActiveTab("roi"); }}
            className={`px-3 py-1.5 rounded-xl transition-all ${activeTab === "roi" ? "bg-emerald-600 text-white shadow-md" : "text-slate-600 dark:text-slate-300 hover:text-emerald-600"}`}
          >
            3. Tính Toán ROI Tự Động Hóa
          </button>
        </div>
      </div>

      {/* TAB 1: AI CHATBOT SIMULATOR */}
      {activeTab === "chatbot" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 mr-2">Chọn câu hỏi tình huống:</span>
            {[
              { id: "wismo", label: "Tra cứu đơn hàng (WISMO)" },
              { id: "refund", label: "Hỏi chính sách hoàn tiền" },
              { id: "complaint", label: "Khiếu nại gấp (Handover sang người)" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { playUiSound("click"); setSelectedPrompt(tab.id); }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                  selectedPrompt === tab.id 
                    ? "bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-500/20 scale-[1.02]" 
                    : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-emerald-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chatbot Interface */}
            <div className="lg:col-span-2 p-5 rounded-3xl bg-slate-900 text-white border border-slate-700 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center font-bold text-white shadow-md shadow-emerald-500/30">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold">Smart AI Support Assistant</h4>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Online 24/7 • NLP Powered
                    </span>
                  </div>
                </div>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Phản hồi: 0.8s
                </span>
              </div>

              {/* Chat Messages */}
              <div className="space-y-3 min-h-[160px]">
                {/* User message */}
                <div className="flex justify-end">
                  <div className="p-3 rounded-2xl rounded-tr-sm bg-emerald-600 text-white text-xs max-w-md shadow-md">
                    {botScenarios[selectedPrompt].userQuery}
                  </div>
                </div>

                {/* Bot message */}
                <div className="flex justify-start items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="p-3.5 rounded-2xl rounded-tl-sm bg-slate-800 border border-slate-700 text-slate-100 text-xs max-w-md leading-relaxed space-y-2">
                    <p>{botScenarios[selectedPrompt].botResponse}</p>
                    {botScenarios[selectedPrompt].isHandover && (
                      <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-[11px] text-amber-200 flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5" /> Chuyên viên Nguyễn Hoàng Lan (Senior CS) đã tham gia hội thoại
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* AI Diagnostics Card */}
            <div className="p-5 rounded-3xl bg-white/80 dark:bg-slate-800/80 border border-emerald-200 dark:border-emerald-800 space-y-3 text-xs">
              <span className="font-extrabold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider block">
                Phân Tích Trí Tuệ Nhân Tạo (AI Analytics)
              </span>

              <div className="space-y-2 text-slate-700 dark:text-slate-200">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-medium">Ý Định Nhận Diện (Intent):</span>
                  <span className="font-bold text-slate-900 dark:text-white">{botScenarios[selectedPrompt].intent}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-medium">Độ Chính Xác (Confidence):</span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{botScenarios[selectedPrompt].confidence}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                  <span className="text-[10px] text-emerald-800 dark:text-emerald-300 block font-medium">Hành Động Tự Động (Backend Action):</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{botScenarios[selectedPrompt].actionTaken}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WORKFLOW TRIGGER & MACRO */}
      {activeTab === "workflow" && (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-5 rounded-3xl bg-gradient-to-r from-sky-500/10 via-emerald-500/10 to-indigo-500/10 border border-sky-200 dark:border-sky-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
              <div>
                <span className="text-xs font-bold text-sky-600 uppercase">Cơ Chế 1-Click Macro</span>
                <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Tự Động Hóa 5 Thao Tác Thủ Công Thành 1 Click Duy Nhất
                </h4>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-emerald-500 text-white font-bold">Tiết kiệm 90s/ticket</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs">
              <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="w-5 h-5 rounded-full bg-sky-500 text-white font-bold text-[10px] flex items-center justify-center mx-auto">1</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">Auto-Tagging</span>
                <p className="text-[10px] text-slate-500">Gán tag #HoanTien</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="w-5 h-5 rounded-full bg-indigo-500 text-white font-bold text-[10px] flex items-center justify-center mx-auto">2</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">Auto-Route</span>
                <p className="text-[10px] text-slate-500">Giao sang Kế toán</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="w-5 h-5 rounded-full bg-purple-500 text-white font-bold text-[10px] flex items-center justify-center mx-auto">3</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">SLA Timer</span>
                <p className="text-[10px] text-slate-500">Đặt đếm lùi 24h</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-white font-bold text-[10px] flex items-center justify-center mx-auto">4</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">Auto-Email</span>
                <p className="text-[10px] text-slate-500">Gửi mail xác nhận</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-white font-bold text-[10px] flex items-center justify-center mx-auto">5</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">CSAT Survey</span>
                <p className="text-[10px] text-slate-500">Kích hoạt khảo sát</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AUTOMATION ROI CALCULATOR */}
      {activeTab === "roi" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Tổng khối lượng yêu cầu / tháng:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{monthlyVolume.toLocaleString()} tickets</span>
                </div>
                <input
                  type="range"
                  min={5000}
                  max={150000}
                  step={5000}
                  value={monthlyVolume}
                  onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                  className="w-full h-2 bg-emerald-100 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Tỷ lệ AI Bot &amp; Tự động hóa giải quyết dứt điểm:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{containmentRate}% ({Math.round(botSolvedTickets).toLocaleString()} tickets)</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={80}
                  step={5}
                  value={containmentRate}
                  onChange={(e) => setContainmentRate(Number(e.target.value))}
                  className="w-full h-2 bg-emerald-100 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 block">Chi phí người thật xử lý:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">25.000 VNĐ / lượt</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 block">Chi phí AI Bot xử lý:</span>
                  <span className="font-bold text-emerald-600">2.500 VNĐ / lượt</span>
                </div>
              </div>
            </div>

            {/* Calculated Impact Card */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-sky-500/15 border border-emerald-300/70 dark:border-emerald-700/60 space-y-4">
              <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider block">
                Giá Trị Kinh Tế &amp; Giải Phóng Nhân Lực Hàng Năm
              </span>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-emerald-200 dark:border-emerald-800">
                  <span className="text-[10px] text-slate-500 block">Tiết kiệm ngân sách / tháng</span>
                  <span className="text-xl font-black text-emerald-600 dark:text-emerald-300">
                    {Math.round(monthlySavings / 1000000).toLocaleString()} Tr VNĐ
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-emerald-200 dark:border-emerald-800">
                  <span className="text-[10px] text-slate-500 block">Tương đương giải phóng nhân sự</span>
                  <span className="text-xl font-black text-sky-600 dark:text-sky-300">
                    ~{fteSaved.toFixed(1)} Full-time (FTE)
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-emerald-300 dark:border-emerald-700 col-span-2">
                  <span className="text-[10px] text-slate-500 block">Tổng ngân sách tiết kiệm được / năm</span>
                  <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                    {Math.round(yearlySavings / 1000000).toLocaleString()} Triệu VNĐ
                  </span>
                  <p className="text-[11px] text-slate-500 mt-0.5">Cắt giảm trực tiếp {Math.round((monthlySavings / costWithoutAutomation) * 100)}% tổng chi phí vận hành tiếp nhận hỗ trợ.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
