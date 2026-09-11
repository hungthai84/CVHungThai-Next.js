import React, { useState } from "react";
import { 
  Bot, 
  Cpu, 
  Workflow, 
  TrendingUp, 
  Zap, 
  DollarSign, 
  CheckCircle, 
  Sparkles, 
  Clock, 
  Activity, 
  Sliders, 
  FileText,
  AlertCircle,
  HelpCircle
} from "lucide-react";

export function CaseStudy1_4_Tools() {
  const [activeTab, setActiveTab] = useState<"deflection_roi" | "sop_matrix" | "routing_sim">("deflection_roi");

  // 1. Bot Deflection & Cost Saving ROI Calculator
  const [roiInputs, setRoiInputs] = useState({
    monthlyTickets: 120000, // 120k interactions/month
    costPerManualTicket: 22000, // 22,000 VND / ticket
    botDeflectionRate: 58, // 58% automated
    botCostPerTicket: 1200, // 1,200 VND / automated ticket
    agentCount: 45 // 45 agents
  });

  const deflectedTickets = Math.round((roiInputs.monthlyTickets * roiInputs.botDeflectionRate) / 100);
  const manualRemainingTickets = roiInputs.monthlyTickets - deflectedTickets;

  const costWithoutBot = roiInputs.monthlyTickets * roiInputs.costPerManualTicket;
  const costWithBot = (manualRemainingTickets * roiInputs.costPerManualTicket) + (deflectedTickets * roiInputs.botCostPerTicket);
  const monthlySavings = costWithoutBot - costWithBot;
  const annualSavings = monthlySavings * 12;
  const hoursSavedMonthly = Math.round((deflectedTickets * 6.5) / 60); // 6.5 mins average handling time saved

  // 2. SOP & Automation Readiness Matrix
  const [sopProcesses, setSopProcesses] = useState([
    { name: "Truy vấn số dư & Lịch sử giao dịch", volume: "Cao", auto: "100% Chatbot/API", status: "Hoàn tất" },
    { name: "Khóa thẻ / Đổi mật khẩu khẩn cấp", volume: "Trung bình", auto: "100% Tự phục vụ (IVR/App)", status: "Hoàn tất" },
    { name: "Hủy đơn & Yêu cầu hoàn tiền chuẩn", volume: "Cao", auto: "80% Tự động hóa qua Webhook", status: "Hoàn tất" },
    { name: "Cập nhật thông tin định danh (eKYC)", volume: "Trung bình", auto: "75% AI OCR + Agent Review", status: "Hoàn tất" },
    { name: "Khiếu nại phức tạp & Tranh chấp tiền", volume: "Thấp", auto: "Phân luồng thông minh đến Tier 2/3", status: "Tối ưu liên tục" }
  ]);

  // 3. Smart Skills-Based Routing Simulation
  const [customerTier, setCustomerTier] = useState<"VIP" | "Standard" | "Urgent">("VIP");
  const [selectedChannel, setSelectedChannel] = useState<"Voice" | "Chat" | "Email">("Voice");

  const getRoutingResult = () => {
    if (customerTier === "VIP") {
      return {
        priority: "Ưu tiên số 1 (Priority Queue 001)",
        waitTime: "< 15 giây",
        routingTo: "Senior Key Account Specialist (Tier 2/3)",
        channelAction: "Direct transfer with CRM Context pop-up",
        slaTarget: "99.9% tuân thủ"
      };
    } else if (customerTier === "Urgent") {
      return {
        priority: "Cảnh báo khẩn (Emergency Dispatch)",
        waitTime: "< 30 giây",
        routingTo: "Team Leader On-Duty & Incident Team",
        channelAction: "Simultaneous voice broadcast & Alert Push",
        slaTarget: "99.5% tuân thủ"
      };
    } else {
      return {
        priority: "Hàng đợi tiêu chuẩn (Standard Auto-Bot First)",
        waitTime: "Tức thì qua AI Bot (hoặc < 2 phút gặp Agent)",
        routingTo: "AI Conversational Agent -> Generalist Agent",
        channelAction: "Self-service resolution suggestions first",
        slaTarget: "98.5% tuân thủ"
      };
    }
  };

  const routingInfo = getRoutingResult();

  return (
    <div className="space-y-6 pt-4 border-t border-amber-200/60 dark:border-slate-700/60">
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={() => setActiveTab('deflection_roi')} 
          className={`px-4 py-2 rounded-xl font-extrabold text-xs transition shadow-md cursor-pointer flex items-center gap-1.5 ${activeTab === 'deflection_roi' ? 'bg-sky-600 text-white' : 'glass-pill text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
        >
          <Bot className="w-4 h-4" /> 1. Mô Phỏng Tự Động Hóa &amp; ROI Tiết Kiệm Chi Phí
        </button>
        <button 
          onClick={() => setActiveTab('sop_matrix')} 
          className={`px-4 py-2 rounded-xl font-extrabold text-xs transition shadow-md cursor-pointer flex items-center gap-1.5 ${activeTab === 'sop_matrix' ? 'bg-sky-600 text-white' : 'glass-pill text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
        >
          <Workflow className={`w-4 h-4 ${activeTab === 'sop_matrix' ? 'text-white' : 'text-purple-500'}`} /> 2. Ma Trận Quy Trình Chuẩn (SOP) &amp; Tự Động Hóa
        </button>
        <button 
          onClick={() => setActiveTab('routing_sim')} 
          className={`px-4 py-2 rounded-xl font-extrabold text-xs transition shadow-md cursor-pointer flex items-center gap-1.5 ${activeTab === 'routing_sim' ? 'bg-sky-600 text-white' : 'glass-pill text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
        >
          <Cpu className={`w-4 h-4 ${activeTab === 'routing_sim' ? 'text-white' : 'text-emerald-500'}`} /> 3. Giả Lập Định Tuyến Thông Minh (Skills-Based Routing)
        </button>
      </div>

      {/* TAB 1: Deflection ROI */}
      {activeTab === 'deflection_roi' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 p-5 rounded-2xl glass-inner space-y-4">
              <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-xs flex items-center gap-2">
                <Sliders className="w-4 h-4 text-sky-500" /> Tham Số Vận Hành &amp; Tỷ Lệ Giải Quyết Tự Động (Deflection)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-sky-500" /> Tổng lượt yêu cầu/tháng:
                  </label>
                  <input 
                    type="number" 
                    value={roiInputs.monthlyTickets} 
                    onChange={(e) => setRoiInputs({...roiInputs, monthlyTickets: Number(e.target.value)})} 
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 font-bold outline-none" 
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <Bot className="w-3.5 h-3.5 text-indigo-500" /> Tỷ lệ Bot xử lý tự động (%):
                  </label>
                  <input 
                    type="number" 
                    min="10" max="95"
                    value={roiInputs.botDeflectionRate} 
                    onChange={(e) => setRoiInputs({...roiInputs, botDeflectionRate: Number(e.target.value)})} 
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 font-bold outline-none" 
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-rose-500" /> Chi phí xử lý thủ công / ticket (VNĐ):
                  </label>
                  <input 
                    type="number" 
                    value={roiInputs.costPerManualTicket} 
                    onChange={(e) => setRoiInputs({...roiInputs, costPerManualTicket: Number(e.target.value)})} 
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 font-bold outline-none" 
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-500" /> Chi phí vận hành Bot / ticket (VNĐ):
                  </label>
                  <input 
                    type="number" 
                    value={roiInputs.botCostPerTicket} 
                    onChange={(e) => setRoiInputs({...roiInputs, botCostPerTicket: Number(e.target.value)})} 
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 font-bold outline-none" 
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-5 rounded-2xl bg-gradient-to-br from-blue-600/20 via-indigo-600/15 to-purple-600/15 border border-blue-400/60 dark:border-blue-700/50 flex flex-col justify-between space-y-4 backdrop-blur-xl">
              <div>
                <h4 className="font-extrabold text-blue-900 dark:text-blue-200 uppercase tracking-wider text-xs flex items-center gap-2 border-b border-blue-500/20 pb-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" /> Hiệu Quả Kinh Tế &amp; Thời Gian Tiết Kiệm
                </h4>
                <div className="mt-4 space-y-2.5 text-xs font-body">
                  <div className="flex justify-between items-center p-2.5 rounded-xl glass-inner">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Yêu cầu được Bot giải quyết:</span>
                    <span className="font-black text-sky-600 dark:text-sky-400 text-sm">{deflectedTickets.toLocaleString()} ca/tháng</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-xl bg-emerald-500/20 text-emerald-900 dark:text-emerald-200 border border-emerald-400/40">
                    <span className="font-extrabold">Chi phí tiết kiệm mỗi tháng:</span>
                    <span className="font-black text-emerald-800 dark:text-emerald-300 text-sm">{(monthlySavings / 1000000).toFixed(1)} Triệu VNĐ</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-xl bg-purple-500/20 text-purple-900 dark:text-purple-200 border border-purple-400/40">
                    <span className="font-extrabold">Tiết kiệm ngân sách hàng năm:</span>
                    <span className="font-black text-purple-800 dark:text-purple-300 text-base">{(annualSavings / 1000000000).toFixed(2)} Tỷ VNĐ/năm</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-xl glass-inner">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Thời gian lao động tiết kiệm:</span>
                    <span className="font-bold text-amber-600">{hoursSavedMonthly.toLocaleString()} Giờ/tháng</span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 italic">
                * Tự động hóa giải phóng chuyên viên khỏi các thao tác lặp lại để tập trung xử lý ca VIP và tư vấn gia tăng giá trị.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SOP & Automation Matrix */}
      {activeTab === 'sop_matrix' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-5 rounded-2xl glass-inner space-y-3">
            <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-xs flex items-center gap-2">
              <Workflow className="w-4 h-4 text-purple-500" /> Bảng Chuẩn Hóa SOP &amp; Cấp Độ Tự Động Hóa 5 Nghiệp Vụ Cốt Lõi
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 uppercase text-[10px]">
                    <th className="py-2.5 px-3">Tên Quy Trình / Nghiệp Vụ</th>
                    <th className="py-2.5 px-3">Tần Suất Phát Sinh</th>
                    <th className="py-2.5 px-3">Giải Pháp Tự Động Hóa</th>
                    <th className="py-2.5 px-3 text-right">Trạng Thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {sopProcesses.map((p, idx) => (
                    <tr key={idx} className="hover:bg-white/50 dark:hover:bg-slate-800/50">
                      <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-200">{p.name}</td>
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-400">{p.volume}</td>
                      <td className="py-3 px-3 font-semibold text-purple-600 dark:text-purple-400">{p.auto}</td>
                      <td className="py-3 px-3 text-right">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Smart Routing */}
      {activeTab === 'routing_sim' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-6 p-5 rounded-2xl glass-inner space-y-4">
              <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-xs flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-500" /> Chọn Hồ Sơ Khách Hàng &amp; Kênh Tương Tác
              </h4>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-2">Phân khúc khách hàng:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["VIP", "Standard", "Urgent"] as const).map((tier) => (
                      <button 
                        key={tier} 
                        onClick={() => setCustomerTier(tier)}
                        className={`p-2.5 rounded-xl font-bold transition cursor-pointer border ${customerTier === tier ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'glass-base border-slate-300 text-slate-700 dark:text-slate-300'}`}
                      >
                        {tier === "VIP" ? "👑 Khách VIP / Doanh Nghiệp" : tier === "Urgent" ? "🚨 Sự Cố Khẩn Cấp" : "👥 Khách Tiêu Chuẩn"}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-2">Kênh tiếp nhận:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["Voice", "Chat", "Email"] as const).map((channel) => (
                      <button 
                        key={channel} 
                        onClick={() => setSelectedChannel(channel)}
                        className={`p-2.5 rounded-xl font-bold transition cursor-pointer border ${selectedChannel === channel ? 'bg-sky-600 text-white border-sky-600 shadow-md' : 'glass-base border-slate-300 text-slate-700 dark:text-slate-300'}`}
                      >
                        {channel === "Voice" ? "📞 Tổng Đài Thoại" : channel === "Chat" ? "💬 Livechat / App" : "✉️ Email Support"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-6 p-5 rounded-2xl bg-gradient-to-br from-indigo-600/20 via-purple-600/15 to-emerald-600/15 border border-indigo-400/60 dark:border-indigo-700/50 flex flex-col justify-between space-y-4 backdrop-blur-xl">
              <div>
                <h4 className="font-extrabold text-indigo-900 dark:text-indigo-200 uppercase tracking-wider text-xs flex items-center gap-2 border-b border-indigo-500/20 pb-2">
                  <Zap className="w-4 h-4 text-amber-500" /> Kết Quả Định Tuyến Thông Minh (Realtime Routing Output)
                </h4>
                <div className="mt-4 space-y-2.5 text-xs font-body">
                  <div className="flex justify-between items-center p-2.5 rounded-xl glass-inner">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Thứ tự ưu tiên hàng đợi:</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-300">{routingInfo.priority}</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-xl glass-inner">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Thời gian chờ dự kiến:</span>
                    <span className="font-black text-emerald-600 dark:text-emerald-400">{routingInfo.waitTime}</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-xl glass-inner">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Điều phối đến nhân sự:</span>
                    <span className="font-bold text-purple-700 dark:text-purple-300">{routingInfo.routingTo}</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-900 dark:text-emerald-200">
                    <span className="font-extrabold">Cam kết SLA mục tiêu:</span>
                    <span className="font-black">{routingInfo.slaTarget}</span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 italic">
                * Hệ thống định tuyến kỹ năng (ACD) tự động bắt cặp vấn đề với chuyên viên có năng lực phù hợp nhất trong 0.5s.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
