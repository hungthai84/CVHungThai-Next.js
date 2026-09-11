import React, { useState } from "react";
import { 
  LineChart, 
  BarChart3, 
  PieChart, 
  Activity, 
  Clock, 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  Filter, 
  Sliders, 
  RefreshCw, 
  Award, 
  ArrowUpRight, 
  ArrowDownRight,
  Sparkles,
  Zap,
  Eye,
  Check
} from "lucide-react";

export function CaseStudy3_2_Tools() {
  const [activeView, setActiveView] = useState<"wallboard" | "agentkpi" | "cxanalytics">("wallboard");

  // Wallboard State
  const [queueTraffic, setQueueTraffic] = useState<"normal" | "surge" | "peak">("normal");
  const [onlineAgents, setOnlineAgents] = useState(85);

  const getMetrics = () => {
    if (queueTraffic === "normal") {
      return {
        waitingTickets: 1248,
        avgWaitTime: "02:35",
        slaCompliance: 96.2,
        slaBreaches: 12,
        statusColor: "text-emerald-600 dark:text-emerald-400"
      };
    } else if (queueTraffic === "surge") {
      return {
        waitingTickets: 2450,
        avgWaitTime: "05:12",
        slaCompliance: 88.5,
        slaBreaches: 48,
        statusColor: "text-amber-600 dark:text-amber-400"
      };
    } else {
      return {
        waitingTickets: 4120,
        avgWaitTime: "08:45",
        slaCompliance: 74.0,
        slaBreaches: 135,
        statusColor: "text-rose-600 dark:text-rose-400"
      };
    }
  };

  const currentWallboard = getMetrics();

  // Agent Weekly Performance State
  const agents = [
    { id: 1, name: "Nguyễn Lê Minh", resolved: 178, avgHandleTime: "07:15", csat: 4.9, qaScore: 96, growth: "+18%", badge: "Top Performer ⭐" },
    { id: 2, name: "Trần Bảo Ngọc", resolved: 165, avgHandleTime: "08:10", csat: 4.8, qaScore: 94, growth: "+14%", badge: "Quality Master 🛡️" },
    { id: 3, name: "Phạm Quốc Hùng", resolved: 156, avgHandleTime: "08:42", csat: 4.6, qaScore: 92, growth: "+15%", badge: "High Output 🚀" },
    { id: 4, name: "Đặng Thị Thảo", resolved: 142, avgHandleTime: "09:05", csat: 4.5, qaScore: 90, growth: "+8%", badge: "Consistent 👍" },
    { id: 5, name: "Vũ Tuấn Anh", resolved: 118, avgHandleTime: "11:20", csat: 4.1, qaScore: 82, growth: "-4%", badge: "Coaching Needed ⚠️" }
  ];

  // CX Analytics Driver
  const [selectedDriver, setSelectedDriver] = useState<string>("auth");
  const driverDetails: Record<string, { name: string; pct: number; rootCause: string; correctiveAction: string; owner: string }> = {
    auth: {
      name: "Lỗi đăng nhập & Quên mật khẩu",
      pct: 28,
      rootCause: "Cổng OTP tin nhắn SMS từ nhà mạng bị trễ trong giờ cao điểm 19:00 - 21:00.",
      correctiveAction: "Bổ sung phương thức xác thực Voice OTP & Zalo ZNS OTP dự phòng; thêm nút tự khôi phục mật khẩu 1-chạm.",
      owner: "Đội ngũ Kỹ thuật Sản phẩm & IT"
    },
    payment: {
      name: "Thanh toán & Hoàn tiền (Refund)",
      pct: 20,
      rootCause: "Quy trình phê duyệt hoàn tiền thủ công qua 3 cấp kế toán kéo dài 3 – 5 ngày làm việc.",
      correctiveAction: "Thiết lập cơ chế Auto-Refund cho các khoản dưới 500,000 đ; rút ngắn thời gian xử lý xuống < 30 phút.",
      owner: "Phòng Tài chính - Kế toán & Vận hành"
    },
    shipping: {
      name: "Giao hàng & Logistics",
      pct: 16,
      rootCause: "Đối tác 3PL không cập nhật trạng thái đơn hàng thời gian thực khi giao hàng tuyến tỉnh.",
      correctiveAction: "Bắt buộc đối tác 3PL truyền Webhook trạng thái theo giờ; tự động gửi SMS cập nhật hành trình cho khách.",
      owner: "Phòng Chuỗi Cung Ứng & Vận hành"
    },
    app: {
      name: "Trải nghiệm ứng dụng (App Crash/Bug)",
      pct: 12,
      rootCause: "Bản cập nhật v4.2 phát sinh lỗi tương thích trên một số dòng máy Android đời cũ.",
      correctiveAction: "Phát hành bản Hotfix v4.2.1 trong 24 giờ; cải thiện khâu kiểm thử hồi quy (Regression Testing).",
      owner: "Đội ngũ Mobile App Developers"
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/80">
        <button
          onClick={() => setActiveView("wallboard")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeView === "wallboard"
              ? "bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-md border border-slate-200/50 dark:border-slate-700"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          1. Wallboard Vận Hành Thời Gian Thực (Command Center)
        </button>

        <button
          onClick={() => setActiveView("agentkpi")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeView === "agentkpi"
              ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-md border border-slate-200/50 dark:border-slate-700"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          2. Bảng Xếp Hạng &amp; Đánh Giá Hiệu Suất Nhân Viên
        </button>

        <button
          onClick={() => setActiveView("cxanalytics")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeView === "cxanalytics"
              ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-md border border-slate-200/50 dark:border-slate-700"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <PieChart className="w-3.5 h-3.5" />
          3. Phân Tích Nguyên Nhân Gốc Rễ CX (Root Cause Matrix)
        </button>
      </div>

      {/* View 1: Real-time Wallboard */}
      {activeView === "wallboard" && (
        <div className="space-y-4 bg-slate-950 p-6 rounded-3xl border border-sky-800/80 shadow-2xl text-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <h3 className="text-lg font-black text-white tracking-wide">LIVE OPERATIONS COMMAND CENTER</h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Dữ liệu cập nhật thời gian thực mỗi 2 giây • SLA Mục tiêu: &ge; 95%</p>
            </div>

            {/* Traffic simulation toggles */}
            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setQueueTraffic("normal")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  queueTraffic === "normal" ? "bg-emerald-600 text-white shadow" : "text-slate-400 hover:text-white"
                }`}
              >
                Bình Thường
              </button>
              <button
                onClick={() => setQueueTraffic("surge")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  queueTraffic === "surge" ? "bg-amber-600 text-white shadow" : "text-slate-400 hover:text-white"
                }`}
              >
                Tăng Đột Biến (+100%)
              </button>
              <button
                onClick={() => setQueueTraffic("peak")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  queueTraffic === "peak" ? "bg-rose-600 text-white shadow" : "text-slate-400 hover:text-white"
                }`}
              >
                Cao Điểm Sự Cố (+300%)
              </button>
            </div>
          </div>

          {/* Wallboard Big Metric Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Ticket Đang Chờ</span>
              <span className="text-2xl sm:text-3xl font-black text-sky-400 mt-1 block font-mono">
                {currentWallboard.waitingTickets.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-500 mt-1 block">Tất cả các kênh</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Thời Gian Chờ TB</span>
              <span className="text-2xl sm:text-3xl font-black text-amber-400 mt-1 block font-mono">
                {currentWallboard.avgWaitTime}
              </span>
              <span className="text-[10px] text-slate-500 mt-1 block">Mục tiêu: &lt; 03:00</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Nhân Viên Online</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1 block font-mono">
                {onlineAgents}
              </span>
              <span className="text-[10px] text-slate-500 mt-1 block">78 Đang bận • 7 Sẵn sàng</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Tỷ Lệ Đạt SLA</span>
              <span className={`text-2xl sm:text-3xl font-black mt-1 block font-mono ${currentWallboard.statusColor}`}>
                {currentWallboard.slaCompliance}%
              </span>
              <span className="text-[10px] text-slate-500 mt-1 block">Chuẩn: 95%</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center col-span-2 sm:col-span-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">SLA Bị Vi Phạm</span>
              <span className="text-2xl sm:text-3xl font-black text-rose-500 mt-1 block font-mono">
                {currentWallboard.slaBreaches}
              </span>
              <span className="text-[10px] text-rose-400 font-semibold mt-1 block">Cảnh báo tức thời</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="text-slate-300 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <strong>Khuyến nghị điều phối AI:</strong> Tự động kích hoạt 15 nhân viên ca hỗ trợ từ xa sang hàng đợi Voice &amp; Chat để hạ AHT xuống dưới 03:00.
            </span>
            <button className="px-4 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shrink-0 transition-colors">
              Chấp Nhận Điều Phối
            </button>
          </div>
        </div>
      )}

      {/* View 2: Agent Performance Report */}
      {activeView === "agentkpi" && (
        <div className="space-y-4 bg-white/90 dark:bg-slate-900/90 p-5 rounded-3xl border border-purple-200/80 dark:border-purple-800/60 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Bảng Đánh Giá Hiệu Suất Nhân Viên Định Kỳ (Weekly Performance Matrix)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Đánh giá đa chiều: Sản lượng (Volume) • Tốc độ (AHT) • Sự hài lòng (CSAT) • Chất lượng (QA Score)
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
              Kỳ Báo Cáo: Tuần 34 / 2026
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold">
                <tr>
                  <th className="p-3.5">Họ &amp; Tên Nhân Viên</th>
                  <th className="p-3.5 text-center">Ticket Đã Xử Lý</th>
                  <th className="p-3.5 text-center">Thời Gian TB / Ticket</th>
                  <th className="p-3.5 text-center">Điểm CSAT</th>
                  <th className="p-3.5 text-center">Điểm QA</th>
                  <th className="p-3.5 text-center">Tăng Trưởng</th>
                  <th className="p-3.5">Đánh Giá &amp; Khen Thưởng</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-300">
                {agents.map((agent) => (
                  <tr key={agent.id} className="hover:bg-purple-50/40 dark:hover:bg-purple-950/20 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold text-xs">
                        {agent.name.charAt(0)}
                      </div>
                      {agent.name}
                    </td>
                    <td className="p-3.5 text-center font-mono font-bold text-slate-800 dark:text-slate-200">{agent.resolved}</td>
                    <td className="p-3.5 text-center font-mono text-slate-600 dark:text-slate-400">{agent.avgHandleTime}</td>
                    <td className="p-3.5 text-center font-bold text-amber-600 dark:text-amber-400 font-mono">⭐ {agent.csat} / 5.0</td>
                    <td className="p-3.5 text-center font-bold text-emerald-600 dark:text-emerald-400 font-mono">{agent.qaScore}%</td>
                    <td className="p-3.5 text-center font-bold font-mono">
                      <span className={`inline-flex items-center ${agent.growth.startsWith("+") ? "text-emerald-600" : "text-rose-600"}`}>
                        {agent.growth.startsWith("+") ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                        {agent.growth}
                      </span>
                    </td>
                    <td className="p-3.5 font-semibold text-xs text-slate-800 dark:text-slate-200">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        agent.badge.includes("Top") ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300" :
                        agent.badge.includes("Quality") ? "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300" :
                        agent.badge.includes("High") ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300" :
                        agent.badge.includes("Coaching") ? "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300" :
                        "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"
                      }`}>
                        {agent.badge}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View 3: CX Root Cause Analytics */}
      {activeView === "cxanalytics" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white/90 dark:bg-slate-900/90 p-6 rounded-3xl border border-emerald-200/80 dark:border-emerald-800/60 shadow-xl">
          <div className="lg:col-span-5 space-y-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                Phân Bố Chủ Đề Khiếu Nại (Pareto Driver Analysis)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Click vào từng chủ đề phản hồi để phân tích nguyên nhân gốc rễ và kế hoạch khắc phục.
              </p>
            </div>

            <div className="space-y-2">
              {Object.entries(driverDetails).map(([key, item]) => (
                <div
                  key={key}
                  onClick={() => setSelectedDriver(key)}
                  className={`p-3.5 rounded-2xl cursor-pointer border transition-all ${
                    selectedDriver === key
                      ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-400 dark:border-emerald-600 shadow-md"
                      : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{item.name}</span>
                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">{item.pct}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${item.pct * 3.2}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 bg-emerald-50/50 dark:bg-emerald-950/30 p-5 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between border-b border-emerald-200/60 dark:border-emerald-800/60 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-widest">
                    Chi Tiết Phân Tích Chuyên Sâu
                  </span>
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {driverDetails[selectedDriver].name}
                  </h4>
                </div>
                <span className="text-sm font-black px-3 py-1 rounded-xl bg-emerald-600 text-white">
                  Chiếm {driverDetails[selectedDriver].pct}% Tổng Volume
                </span>
              </div>

              <div className="space-y-3 mt-4 text-xs">
                <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-xl border border-emerald-200/50 dark:border-emerald-800/40">
                  <strong className="text-rose-600 dark:text-rose-400 block mb-1">🔍 Nguyên Nhân Gốc Rễ (Root Cause):</strong>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {driverDetails[selectedDriver].rootCause}
                  </p>
                </div>

                <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-xl border border-emerald-200/50 dark:border-emerald-800/40">
                  <strong className="text-emerald-600 dark:text-emerald-400 block mb-1">🛠️ Kế Hoạch Khắc Phục (Corrective Action):</strong>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {driverDetails[selectedDriver].correctiveAction}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-emerald-200/60 dark:border-emerald-800/60 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span>Đơn vị chịu trách nhiệm: <strong>{driverDetails[selectedDriver].owner}</strong></span>
              <span className="text-emerald-600 font-bold">Trạng thái: Đang khắc phục ✓</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
