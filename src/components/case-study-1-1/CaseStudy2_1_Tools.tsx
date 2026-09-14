import React, { useState } from "react";
import { 
  Calculator, 
  Workflow, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Sliders, 
  ShieldCheck, 
  DollarSign, 
  Sparkles, 
  ArrowRight, 
  RotateCcw,
  BookOpen,
  FileCheck,
  Zap,
  Users
} from "lucide-react";
import { playUiSound } from "../../lib/sound";

export function CaseStudy2_1_Tools() {
  const [activeTab, setActiveTab] = useState<"navigator" | "sla" | "roi">("navigator");

  // Tab 1: SOP Decision Matrix State
  const [selectedIssue, setSelectedIssue] = useState<string>("refund");

  // Tab 2: SLA Simulator
  const [channel, setChannel] = useState<"call" | "email" | "chat">("call");
  const [complexity, setComplexity] = useState<"simple" | "medium" | "critical">("medium");

  // Tab 3: ROI & Ramp-up Calculator State
  const [agentCount, setAgentCount] = useState<number>(35);
  const [monthlyTickets, setMonthlyTickets] = useState<number>(25000);
  const [currentAHT, setCurrentAHT] = useState<number>(8.5); // minutes
  const [ahtReduction, setAhtReduction] = useState<number>(25); // 25% reduction
  const [hourlyWage, setHourlyWage] = useState<number>(65000); // 65,000 VND / hour

  // Calculations for Tab 3
  const currentTotalHours = (monthlyTickets * currentAHT) / 60;
  const optimizedAHT = currentAHT * (1 - ahtReduction / 100);
  const optimizedTotalHours = (monthlyTickets * optimizedAHT) / 60;
  const hoursSavedPerMonth = currentTotalHours - optimizedTotalHours;
  const moneySavedPerMonth = hoursSavedPerMonth * hourlyWage;
  const moneySavedPerYear = moneySavedPerMonth * 12;
  const rampupDaysBefore = 30;
  const rampupDaysAfter = 10;
  const rampupSavedPercent = Math.round(((rampupDaysBefore - rampupDaysAfter) / rampupDaysBefore) * 100);

  const issueData: Record<string, {
    title: string;
    tier: string;
    slaResponse: string;
    slaResolve: string;
    steps: string[];
    scriptSample: string;
    checklist: string[];
  }> = {
    refund: {
      title: "Quy Trình Xử Lý Yêu Cầu Hoàn Tiền (SOP-FIN-01)",
      tier: "Tier 1 tiếp nhận → Tier 2 phê duyệt",
      slaResponse: "≤ 15 phút",
      slaResolve: "≤ 24 giờ",
      steps: [
        "1. Tra cứu mã giao dịch và đối soát trạng thái đơn hàng trên hệ thống CRM/Billing.",
        "2. Kiểm tra điều kiện hoàn tiền theo Chính sách Hoàn hủy Điều 4.2.",
        "3. Lập Ticket phân loại #YeuCauHoanTien, đính kèm biên lai chuyển khoản của khách.",
        "4. Chuyển cấp Tier 2 (Kế toán) phê duyệt lệnh hoàn qua cổng thanh toán.",
        "5. Gửi email/SMS mã xác nhận hoàn tiền thành công cho khách hàng."
      ],
      scriptSample: `"Dạ em đã kiểm tra giao dịch #ORD-8821 của anh/chị đủ điều kiện hoàn tiền 100%. Em đã lập lệnh hoàn tự động sang ngân hàng thụ hưởng, tiền sẽ về tài khoản của anh/chị trong vòng 24h làm việc ạ!"`,
      checklist: ["Ảnh chụp bill/sao kê", "Mã đơn hàng", "Lý do hoàn", "Số tài khoản chính chủ"]
    },
    complaint: {
      title: "Quy Trình Xử Lý Khiếu Nại Thái Độ & Dịch Vụ (SOP-CS-04)",
      tier: "Tier 1 xoa dịu → Tier 3 (Trưởng phòng/QA) giải quyết",
      slaResponse: "Tức thì (≤ 2 phút)",
      slaResolve: "≤ 4 giờ",
      steps: [
        "1. Áp dụng nguyên tắc HEAR: Lắng nghe không ngắt lời, đồng cảm chân thành.",
        "2. Ghi nhận chi tiết điểm chạm gây bức xúc, không đôi co hay thanh minh.",
        "3. Chuyển cuộc gọi/ticket sang Trưởng ca (Team Leader) trong vòng 60 giây.",
        "4. Trưởng ca trích xuất ghi âm cuộc gọi, đối chiếu quy chuẩn QA và đề xuất giải pháp bồi hoàn.",
        "5. Gọi điện xin lỗi chính thức và gửi voucher tri ân trong ngày."
      ],
      scriptSample: `"Em thành thật xin lỗi vì trải nghiệm chưa trọn vẹn của anh/chị. Em xin phép ghi nhận toàn bộ phản ánh để báo cáo trực tiếp Trưởng phòng và cam kết có phương án xử lý thỏa đáng nhất cho anh/chị trước 16h00 hôm nay ạ!"`,
      checklist: ["File ghi âm", "Log ticket", "Đánh giá lỗi vi phạm", "Phương án bồi thường"]
    },
    tech_bug: {
      title: "Quy Trình Báo Cáo Sự Cố Kỹ Thuật Hệ Thống (SOP-TECH-02)",
      tier: "Tier 1 sàng lọc → Tier 2 (IT Support) / Tier 3 (Dev Team)",
      slaResponse: "≤ 5 phút",
      slaResolve: "P1 (Critical): ≤ 30 phút | P2: ≤ 2 giờ",
      steps: [
        "1. Thu thập thông tin: Thiết bị, hệ điều hành, ảnh chụp/video màn hình lỗi.",
        "2. Kiểm tra danh sách 'Known Issues' trên Knowledge Base xem có giải pháp tạm thời (Workaround).",
        "3. Nếu lỗi mới diện rộng: Kích hoạt cảnh báo Emergency Bug trên kênh Slack #CS-Tech-Alerts.",
        "4. Đội Dev tạo Hotfix, CS cập nhật trạng thái liên tục cho khách hàng bị ảnh hưởng.",
        "5. Đóng ticket sau khi khách hàng xác nhận đã sử dụng lại bình thường."
      ],
      scriptSample: `"Hệ thống đang ghi nhận gián đoạn cục bộ tại cổng thanh toán. Đội ngũ kỹ sư của chúng em đang khắc phục khẩn cấp trong 15-20 phút. Em sẽ gửi thông báo ngay khi hệ thống hoàn tất bảo trì ạ!"`,
      checklist: ["Screenshot lỗi", "User ID / IP", "Log Console", "Mức độ ưu tiên P1/P2/P3"]
    }
  };

  return (
    <div className="glass-inner p-6 sm:p-8 rounded-3xl space-y-6 border border-sky-300/60 dark:border-sky-700/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl">
      {/* Tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sky-100 dark:border-sky-900/50 pb-4">
        <div>
          <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest flex items-center gap-1.5">
            <Calculator className="w-4 h-4" /> Bộ Công Cụ Tương Tác Vận Hành
          </span>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
            Bộ Máy Mô Phỏng &amp; Đo Lường Hiệu Quả Chuẩn Hóa SOP
          </h3>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-sky-100/70 dark:bg-slate-800/80 rounded-2xl border border-sky-200/60 dark:border-sky-700/60 text-xs font-bold">
          <button
            onClick={() => { playUiSound("click"); setActiveTab("navigator"); }}
            className={`px-3 py-1.5 rounded-xl transition-all ${activeTab === "navigator" ? "bg-sky-600 text-white shadow-md" : "text-slate-600 dark:text-slate-300 hover:text-sky-600"}`}
          >
            1. Tra Cứu Luồng SOP
          </button>
          <button
            onClick={() => { playUiSound("click"); setActiveTab("sla"); }}
            className={`px-3 py-1.5 rounded-xl transition-all ${activeTab === "sla" ? "bg-sky-600 text-white shadow-md" : "text-slate-600 dark:text-slate-300 hover:text-sky-600"}`}
          >
            2. Ma Trận SLA Đa Kênh
          </button>
          <button
            onClick={() => { playUiSound("click"); setActiveTab("roi"); }}
            className={`px-3 py-1.5 rounded-xl transition-all ${activeTab === "roi" ? "bg-sky-600 text-white shadow-md" : "text-slate-600 dark:text-slate-300 hover:text-sky-600"}`}
          >
            3. Tính ROI &amp; Ramp-Up
          </button>
        </div>
      </div>

      {/* TAB 1: SOP NAVIGATOR */}
      {activeTab === "navigator" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 mr-2">Chọn tình huống nghiệp vụ:</span>
            {[
              { id: "refund", label: "Hoàn tiền dịch vụ (SOP-FIN-01)" },
              { id: "complaint", label: "Khiếu nại thái độ (SOP-CS-04)" },
              { id: "tech_bug", label: "Sự cố kỹ thuật (SOP-TECH-02)" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { playUiSound("click"); setSelectedIssue(tab.id); }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                  selectedIssue === tab.id 
                    ? "bg-sky-600 text-white border-sky-500 shadow-md shadow-sky-500/20 scale-[1.02]" 
                    : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-sky-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Steps & Escalation */}
            <div className="lg:col-span-2 space-y-4">
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-sky-200 dark:border-sky-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                  <h4 className="text-h6 text-sky-700 dark:text-sky-300 flex items-center gap-1.5">
                    <Workflow className="w-4 h-4 text-sky-500" />
                    {issueData[selectedIssue].title}
                  </h4>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-800">
                    {issueData[selectedIssue].tier}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Các bước thực thi tuần tự:</span>
                  <div className="space-y-1.5">
                    {issueData[selectedIssue].steps.map((st, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 text-xs font-medium text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-800 flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-sky-500 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">{idx + 1}</span>
                        <span>{st.replace(/^[0-9]\.\s*/, '')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Script Sample */}
              <div className="p-4 rounded-2xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-sky-700 dark:text-sky-300 uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-sky-500" /> Kịch Bản Phản Hồi Chuẩn (Standard Script)
                </div>
                <p className="text-xs italic leading-relaxed text-slate-800 dark:text-slate-200 font-serif bg-white/70 dark:bg-slate-900/70 p-3 rounded-xl border border-sky-100 dark:border-sky-900">
                  {issueData[selectedIssue].scriptSample}
                </p>
              </div>
            </div>

            {/* SLA & Checklists */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-500/10 to-indigo-500/10 border border-sky-200 dark:border-sky-800 space-y-3">
                <span className="text-xs font-bold text-sky-700 dark:text-sky-300 uppercase tracking-wider block">Cam Kết SLA</span>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-sky-200 dark:border-sky-800">
                    <span className="text-[10px] text-slate-400 block font-medium">Phản hồi đầu (FRT)</span>
                    <span className="text-h6 text-sky-600 dark:text-sky-300">{issueData[selectedIssue].slaResponse}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-sky-200 dark:border-sky-800">
                    <span className="text-[10px] text-slate-400 block font-medium">Giải quyết dứt điểm</span>
                    <span className="text-h6 text-emerald-600 dark:text-emerald-300">{issueData[selectedIssue].slaResolve}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider block flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-emerald-500" /> Checklist Hồ Sơ Bắt Buộc
                </span>
                <div className="space-y-1.5">
                  {issueData[selectedIssue].checklist.map((c, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SLA MATRIX */}
      {activeTab === "sla" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-sky-200 dark:border-sky-800 space-y-3">
              <span className="text-xs font-bold text-slate-500 block">Kênh Hỗ Trợ:</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "call", label: "Hotline (Tổng đài)" },
                  { id: "chat", label: "Live Chat / MXH" },
                  { id: "email", label: "Email / Ticket" }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => { playUiSound("click"); setChannel(item.id as any); }}
                    className={`p-2 rounded-xl text-xs font-bold transition-all border text-center ${
                      channel === item.id ? "bg-sky-600 text-white border-sky-500 shadow-sm" : "bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-indigo-200 dark:border-indigo-800 space-y-3">
              <span className="text-xs font-bold text-slate-500 block">Mức Độ Phức Tạp:</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "simple", label: "Đơn giản (Tier 1)" },
                  { id: "medium", label: "Trung bình (Tier 2)" },
                  { id: "critical", label: "Khẩn cấp (Tier 3)" }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => { playUiSound("click"); setComplexity(item.id as any); }}
                    className={`p-2 rounded-xl text-xs font-bold transition-all border text-center ${
                      complexity === item.id ? "bg-indigo-600 text-white border-indigo-500 shadow-sm" : "bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SLA Result Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-sky-600 via-indigo-600 to-blue-700 text-white shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/20 pb-3">
              <div>
                <span className="text-xs text-sky-200 font-bold uppercase tracking-wider">Tiêu Chuẩn Vận Hành Cam Kết</span>
                <h4 className="text-lg font-black">
                  SLA Matrix: Kênh {channel.toUpperCase()} • Độ Phức Tạp {complexity.toUpperCase()}
                </h4>
              </div>
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">Chuẩn ISO 9001:2015</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <Clock className="w-5 h-5 mx-auto mb-1 text-sky-200" />
                <span className="text-xl font-black">
                  {channel === "call" ? "≤ 20 giây" : channel === "chat" ? "≤ 30 giây" : "≤ 2 giờ"}
                </span>
                <p className="text-xs text-sky-100">Thời gian phản hồi ban đầu (FRT)</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <RotateCcw className="w-5 h-5 mx-auto mb-1 text-amber-200" />
                <span className="text-xl font-black">
                  {complexity === "simple" ? "≤ 15 phút" : complexity === "medium" ? "≤ 4 giờ" : "Mỗi 30 phút"}
                </span>
                <p className="text-xs text-amber-100">Tần suất cập nhật tiến độ cho KH</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <CheckCircle2 className="w-5 h-5 mx-auto mb-1 text-emerald-200" />
                <span className="text-xl font-black">
                  {complexity === "simple" ? "≤ 1 giờ" : complexity === "medium" ? "≤ 24 giờ" : "≤ 48 giờ"}
                </span>
                <p className="text-xs text-emerald-100">Thời gian giải quyết dứt điểm</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ROI & RAMP-UP CALCULATOR */}
      {activeTab === "roi" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Quy mô đội ngũ CSKH:</span>
                  <span className="text-sky-600 dark:text-sky-400 font-extrabold">{agentCount} nhân sự</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={200}
                  step={5}
                  value={agentCount}
                  onChange={(e) => setAgentCount(Number(e.target.value))}
                  className="w-full h-2 bg-sky-100 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Khối lượng ticket / tháng:</span>
                  <span className="text-sky-600 dark:text-sky-400 font-extrabold">{monthlyTickets.toLocaleString()} tickets</span>
                </div>
                <input
                  type="range"
                  min={2000}
                  max={100000}
                  step={1000}
                  value={monthlyTickets}
                  onChange={(e) => setMonthlyTickets(Number(e.target.value))}
                  className="w-full h-2 bg-sky-100 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Thời gian xử lý trung bình (AHT hiện tại):</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{currentAHT} phút/ticket</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={20}
                  step={0.5}
                  value={currentAHT}
                  onChange={(e) => setCurrentAHT(Number(e.target.value))}
                  className="w-full h-2 bg-indigo-100 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Mức cắt giảm AHT nhờ chuẩn hóa SOP:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{ahtReduction}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={45}
                  step={5}
                  value={ahtReduction}
                  onChange={(e) => setAhtReduction(Number(e.target.value))}
                  className="w-full h-2 bg-emerald-100 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>
            </div>

            {/* Calculated Impact Card */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-500/15 via-sky-500/10 to-indigo-500/15 border border-emerald-300/70 dark:border-emerald-700/60 space-y-4">
              <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider block">
                Giá Trị Kinh Tế &amp; Năng Suất Thu Được
              </span>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-emerald-200 dark:border-emerald-800">
                  <span className="text-[10px] text-slate-500 block">Số giờ công tiết kiệm / tháng</span>
                  <span className="text-xl font-black text-emerald-600 dark:text-emerald-300">
                    {Math.round(hoursSavedPerMonth).toLocaleString()} hrs
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-emerald-200 dark:border-emerald-800">
                  <span className="text-[10px] text-slate-500 block">Rút ngắn đào tạo nhân mới</span>
                  <span className="text-xl font-black text-sky-600 dark:text-sky-300">
                    -{rampupSavedPercent}% (30d → 10d)
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-emerald-200 dark:border-emerald-800 col-span-2">
                  <span className="text-[10px] text-slate-500 block">Giá trị tiết kiệm chi phí vận hành ước tính / năm</span>
                  <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                    {Math.round(moneySavedPerYear / 1000000).toLocaleString()} Triệu VNĐ
                  </span>
                  <p className="text-[11px] text-slate-500 mt-0.5">Tương đương giải phóng nguồn lực cho ~{((hoursSavedPerMonth / 176)).toFixed(1)} nhân sự toàn thời gian (FTE)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
