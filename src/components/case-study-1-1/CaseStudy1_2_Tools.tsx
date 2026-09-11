import React, { useState } from "react";
import { 
  Target, 
  Sliders, 
  BarChart3, 
  TrendingUp, 
  Award, 
  CheckCircle, 
  ShieldCheck, 
  Percent, 
  Clock, 
  PhoneCall, 
  DollarSign, 
  Sparkles,
  Zap,
  PieChart
} from "lucide-react";

export function CaseStudy1_2_Tools() {
  const [activeTab, setActiveTab] = useState<"kpi_sim" | "bsc_okr" | "incentive">("kpi_sim");

  // 1. KPI SLA / FCR / FRT Calculator
  const [kpiData, setKpiData] = useState({
    totalTickets: 25000,
    frtSeconds: 90, // Target < 120s
    fcrCount: 22000, // Target > 85%
    slaBreach: 250, // Max 2%
    csatScores: 4.8 // Max 5.0
  });

  const fcrPercent = Math.round((kpiData.fcrCount / (kpiData.totalTickets || 1)) * 1000) / 10;
  const slaCompliancePercent = Math.round(((kpiData.totalTickets - kpiData.slaBreach) / (kpiData.totalTickets || 1)) * 1000) / 10;
  const frtMinutes = (kpiData.frtSeconds / 60).toFixed(1);

  // 2. Balanced Scorecard & OKR Weighting
  const [bscWeights, setBscWeights] = useState({
    financial: 20, // Retention, Upsell lead
    customer: 35, // CSAT, NPS, CES
    internalOps: 30, // FCR, FRT, SLA, QA
    learningGrowth: 15 // Training hours, Skill cert
  });

  const [bscScores, setBscScores] = useState({
    financial: 95,
    customer: 98,
    internalOps: 92,
    learningGrowth: 100
  });

  const totalWeightedScore = Math.round(
    ((bscScores.financial * bscWeights.financial) +
    (bscScores.customer * bscWeights.customer) +
    (bscScores.internalOps * bscWeights.internalOps) +
    (bscScores.learningGrowth * bscWeights.learningGrowth)) / 100
  );

  // 3. Performance & Incentive Simulator
  const [incentiveData, setIncentiveData] = useState({
    baseSalary: 12000000, // 12M VND
    maxBonus: 4000000, // 4M VND
    agentFcr: 90,
    agentCsat: 4.9,
    agentQa: 94,
    ticketsHandled: 1200
  });

  const calcIncentiveBonus = () => {
    let multiplier = 0;
    if (incentiveData.agentFcr >= 88) multiplier += 0.3;
    else if (incentiveData.agentFcr >= 82) multiplier += 0.2;

    if (incentiveData.agentCsat >= 4.8) multiplier += 0.4;
    else if (incentiveData.agentCsat >= 4.5) multiplier += 0.25;

    if (incentiveData.agentQa >= 90) multiplier += 0.3;
    else if (incentiveData.agentQa >= 85) multiplier += 0.15;

    return Math.round(incentiveData.maxBonus * multiplier);
  };

  const currentBonus = calcIncentiveBonus();
  const totalPayout = incentiveData.baseSalary + currentBonus;

  return (
    <div className="space-y-6 pt-4 border-t border-amber-200/60 dark:border-slate-700/60">
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={() => setActiveTab('kpi_sim')} 
          className={`px-4 py-2 rounded-xl font-extrabold text-xs transition shadow-md cursor-pointer flex items-center gap-1.5 ${activeTab === 'kpi_sim' ? 'bg-sky-600 text-white' : 'glass-pill text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
        >
          <Target className="w-4 h-4" /> 1. Ma Trận KPI & Dự Báo SLA/FCR/FRT
        </button>
        <button 
          onClick={() => setActiveTab('bsc_okr')} 
          className={`px-4 py-2 rounded-xl font-extrabold text-xs transition shadow-md cursor-pointer flex items-center gap-1.5 ${activeTab === 'bsc_okr' ? 'bg-sky-600 text-white' : 'glass-pill text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
        >
          <PieChart className={`w-4 h-4 ${activeTab === 'bsc_okr' ? 'text-white' : 'text-purple-500'}`} /> 2. Thẻ Điểm Cân Bằng (Balanced Scorecard)
        </button>
        <button 
          onClick={() => setActiveTab('incentive')} 
          className={`px-4 py-2 rounded-xl font-extrabold text-xs transition shadow-md cursor-pointer flex items-center gap-1.5 ${activeTab === 'incentive' ? 'bg-sky-600 text-white' : 'glass-pill text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
        >
          <Award className={`w-4 h-4 ${activeTab === 'incentive' ? 'text-white' : 'text-amber-500'}`} /> 3. Mô Phỏng Đánh Giá & Thưởng Hiệu Suất
        </button>
      </div>

      {/* TAB 1: KPI Matrix */}
      {activeTab === 'kpi_sim' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 p-5 rounded-2xl glass-inner space-y-4">
              <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-xs flex items-center gap-2">
                <Sliders className="w-4 h-4 text-sky-500" /> Thông Số Đầu Vào Đo Lường KPI Vận Hành
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <PhoneCall className="w-3.5 h-3.5 text-sky-500" /> Tổng Số Ticket/Cuộc gọi tháng:
                  </label>
                  <input 
                    type="number" 
                    value={kpiData.totalTickets} 
                    onChange={(e) => setKpiData({...kpiData, totalTickets: Number(e.target.value)})} 
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 font-bold outline-none" 
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" /> Thời gian phản hồi đầu FRT (giây):
                  </label>
                  <input 
                    type="number" 
                    value={kpiData.frtSeconds} 
                    onChange={(e) => setKpiData({...kpiData, frtSeconds: Number(e.target.value)})} 
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 font-bold outline-none" 
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Số vụ giải quyết lần đầu (FCR):
                  </label>
                  <input 
                    type="number" 
                    value={kpiData.fcrCount} 
                    onChange={(e) => setKpiData({...kpiData, fcrCount: Number(e.target.value)})} 
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 font-bold outline-none" 
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <Percent className="w-3.5 h-3.5 text-rose-500" /> Số ticket vi phạm SLA:
                  </label>
                  <input 
                    type="number" 
                    value={kpiData.slaBreach} 
                    onChange={(e) => setKpiData({...kpiData, slaBreach: Number(e.target.value)})} 
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 font-bold outline-none" 
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-5 rounded-2xl bg-gradient-to-br from-sky-500/20 via-indigo-500/15 to-purple-500/15 border border-sky-300/70 dark:border-sky-700/50 flex flex-col justify-between space-y-4 backdrop-blur-xl">
              <div>
                <h4 className="font-extrabold text-sky-900 dark:text-sky-200 uppercase tracking-wider text-xs flex items-center gap-2 border-b border-sky-500/20 pb-2">
                  <BarChart3 className="w-4 h-4 text-sky-600" /> Kết Quả Đánh Giá Chỉ Số Vận Hành
                </h4>
                <div className="mt-4 space-y-2.5 text-xs font-body">
                  <div className="flex justify-between items-center p-2.5 rounded-xl glass-inner">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Tỷ lệ Giải quyết Lần đầu (FCR):</span>
                    <span className={`font-black ${fcrPercent >= 85 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'}`}>
                      {fcrPercent}% {fcrPercent >= 85 ? '✓ (Đạt chuẩn)' : '⚠ (Cần cải thiện)'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-xl glass-inner">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Tỷ lệ Tuân thủ SLA:</span>
                    <span className={`font-black ${slaCompliancePercent >= 98 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600'}`}>
                      {slaCompliancePercent}% (Chuẩn &gt;= 98.0%)
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-xl glass-inner">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Thời gian Phản hồi TB (FRT):</span>
                    <span className="font-black text-slate-900 dark:text-white">{frtMinutes} phút ({kpiData.frtSeconds}s)</span>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-400/40 text-[11px] text-emerald-800 dark:text-emerald-200 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Hệ thống đánh giá: <strong>Vận Hành Đạt Cấp Độ Xuất Sắc (Level 5)</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Balanced Scorecard */}
      {activeTab === 'bsc_okr' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Financial */}
            <div className="p-4 rounded-2xl glass-inner space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">Tài Chính & Doanh Thu</span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600">Trọng số {bscWeights.financial}%</span>
              </div>
              <p className="text-[11px] text-slate-500">Giữ chân khách hàng, giá trị LTV và tiết kiệm chi phí vận hành.</p>
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Điểm hoàn thành:</span>
                  <span className="text-blue-600">{bscScores.financial}%</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="120" 
                  value={bscScores.financial} 
                  onChange={(e) => setBscScores({...bscScores, financial: Number(e.target.value)})}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>

            {/* 2. Customer */}
            <div className="p-4 rounded-2xl glass-inner space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase">Khách Hàng & Trải Nghiệm</span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600">Trọng số {bscWeights.customer}%</span>
              </div>
              <p className="text-[11px] text-slate-500">CSAT &gt;= 92%, NPS &gt;= 50, CES &lt;= 1.8 và mức độ trung thành.</p>
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Điểm hoàn thành:</span>
                  <span className="text-purple-600">{bscScores.customer}%</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="120" 
                  value={bscScores.customer} 
                  onChange={(e) => setBscScores({...bscScores, customer: Number(e.target.value)})}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>
            </div>

            {/* 3. Internal Ops */}
            <div className="p-4 rounded-2xl glass-inner space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">Quy Trình Nội Bộ</span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600">Trọng số {bscWeights.internalOps}%</span>
              </div>
              <p className="text-[11px] text-slate-500">SLA 98.5%, FCR 88%, QA Score 92%, tỷ lệ giải quyết khiếu nại.</p>
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Điểm hoàn thành:</span>
                  <span className="text-emerald-600">{bscScores.internalOps}%</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="120" 
                  value={bscScores.internalOps} 
                  onChange={(e) => setBscScores({...bscScores, internalOps: Number(e.target.value)})}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
            </div>

            {/* 4. Learning & Growth */}
            <div className="p-4 rounded-2xl glass-inner space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase">Học Tập & Phát Triển</span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600">Trọng số {bscWeights.learningGrowth}%</span>
              </div>
              <p className="text-[11px] text-slate-500">Giờ đào tạo/nhân sự, tỷ lệ thi đạt chứng chỉ nghiệp vụ, tỷ lệ gắn kết.</p>
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Điểm hoàn thành:</span>
                  <span className="text-amber-600">{bscScores.learningGrowth}%</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="120" 
                  value={bscScores.learningGrowth} 
                  onChange={(e) => setBscScores({...bscScores, learningGrowth: Number(e.target.value)})}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-600/90 to-indigo-600/90 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div>
              <span className="text-xs uppercase font-bold text-purple-200 tracking-wider">Tổng Điểm Thẻ Điểm Cân Bằng Cả Phòng (Balanced Score)</span>
              <h3 className="text-2xl sm:text-3xl font-black mt-0.5">{totalWeightedScore}% / 100% Target</h3>
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Xếp loại: <strong>Hoàn Thành Xuất Sắc Mục Tiêu Chiến Lược</strong></span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Incentive Simulator */}
      {activeTab === 'incentive' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 p-5 rounded-2xl glass-inner space-y-4">
              <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-xs flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" /> Bảng Thành Tích Cá Nhân Của Chuyên Viên CSKH
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Tỷ lệ FCR cá nhân (%):</label>
                  <input 
                    type="number" 
                    step="0.5" 
                    value={incentiveData.agentFcr} 
                    onChange={(e) => setIncentiveData({...incentiveData, agentFcr: Number(e.target.value)})} 
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 font-bold outline-none" 
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Điểm CSAT cá nhân (sao):</label>
                  <input 
                    type="number" 
                    step="0.05" 
                    max="5.0" 
                    value={incentiveData.agentCsat} 
                    onChange={(e) => setIncentiveData({...incentiveData, agentCsat: Number(e.target.value)})} 
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 font-bold outline-none" 
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Điểm QA thẩm định (%):</label>
                  <input 
                    type="number" 
                    value={incentiveData.agentQa} 
                    onChange={(e) => setIncentiveData({...incentiveData, agentQa: Number(e.target.value)})} 
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 font-bold outline-none" 
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Số ticket hoàn tất trong tháng:</label>
                  <input 
                    type="number" 
                    value={incentiveData.ticketsHandled} 
                    onChange={(e) => setIncentiveData({...incentiveData, ticketsHandled: Number(e.target.value)})} 
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 font-bold outline-none" 
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-5 rounded-2xl bg-gradient-to-br from-amber-500/20 via-orange-500/15 to-emerald-500/15 border border-amber-300/70 dark:border-amber-700/50 flex flex-col justify-between space-y-4 backdrop-blur-xl">
              <div>
                <h4 className="font-extrabold text-amber-900 dark:text-amber-200 uppercase tracking-wider text-xs flex items-center gap-2 border-b border-amber-500/20 pb-2">
                  <DollarSign className="w-4 h-4 text-amber-600" /> Thu Nhập Khuyến Khích Động Lực (Incentive)
                </h4>
                <div className="mt-4 space-y-2.5 text-xs font-body">
                  <div className="flex justify-between items-center p-2.5 rounded-xl glass-inner">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Lương cơ bản cố định:</span>
                    <span className="font-black text-slate-900 dark:text-white">{incentiveData.baseSalary.toLocaleString()} đ</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-xl bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-400/40">
                    <span className="font-extrabold flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-amber-600" /> Thưởng KPI &amp; CSAT vượt trội:</span>
                    <span className="font-black text-amber-800 dark:text-amber-300">+{currentBonus.toLocaleString()} đ</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-xl bg-emerald-500/20 text-emerald-900 dark:text-emerald-200 border border-emerald-400/40">
                    <span className="font-extrabold">Tổng thu nhập tháng:</span>
                    <span className="font-black text-emerald-800 dark:text-emerald-300 text-sm">{totalPayout.toLocaleString()} đ</span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 italic">
                * Cơ chế thưởng động thúc đẩy nhân viên chủ động nâng cao chất lượng phục vụ và giải quyết triệt để vấn đề ngay lần đầu.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
