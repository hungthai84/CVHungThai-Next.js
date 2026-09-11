import React, { useState } from "react";
import { 
  HeartHandshake, 
  Smile, 
  Activity, 
  TrendingUp, 
  ShieldAlert, 
  CheckCircle, 
  Sparkles, 
  DollarSign, 
  UserCheck, 
  Zap, 
  Compass, 
  Sliders,
  MessageSquare,
  AlertTriangle,
  Award
} from "lucide-react";

export function CaseStudy1_3_Tools() {
  const [activeTab, setActiveTab] = useState<"cjm_radar" | "nps_churn" | "hear_test">("cjm_radar");

  // 1. Customer Journey Scorecard & Emotion Radar across 6 phases
  const [journeyScores, setJourneyScores] = useState({
    awareness: 85, // Nhận biết
    consideration: 80, // Cân nhắc
    purchase: 92, // Mua hàng
    onboarding: 88, // Sử dụng & Trải nghiệm ban đầu
    support: 95, // Hỗ trợ & Giải quyết sự cố
    advocacy: 90 // Trung thành & Giới thiệu
  });

  const avgJourneyScore = Math.round(
    (journeyScores.awareness +
      journeyScores.consideration +
      journeyScores.purchase +
      journeyScores.onboarding +
      journeyScores.support +
      journeyScores.advocacy) / 6
  );

  // 2. NPS & Churn Financial Risk Calculator
  const [npsInputs, setNpsInputs] = useState({
    totalCustomers: 50000,
    promoters: 31000, // 9-10
    passives: 14000, // 7-8
    detractors: 5000, // 0-6
    arpuMonthly: 350000, // 350K VND per month
    recoveryRate: 85 // 85% recovered
  });

  const totalRespondents = (npsInputs.promoters + npsInputs.passives + npsInputs.detractors) || 1;
  const promoterPct = (npsInputs.promoters / totalRespondents) * 100;
  const detractorPct = (npsInputs.detractors / totalRespondents) * 100;
  const netPromoterScore = Math.round(promoterPct - detractorPct);

  const potentialChurnLoss = npsInputs.detractors * npsInputs.arpuMonthly * 12; // Annual lost ARR
  const recoveredDetractors = Math.round((npsInputs.detractors * npsInputs.recoveryRate) / 100);
  const savedAnnualRevenue = recoveredDetractors * npsInputs.arpuMonthly * 12;

  // 3. HEAR Framework Assessment
  const [hearScores, setHearScores] = useState({
    hear: true, // Lắng nghe trọn vẹn, không ngắt lời
    empathize: true, // Đồng cảm với cảm xúc bức xúc
    apologize: true, // Xin lỗi chân thành đại diện công ty
    resolve: true, // Đưa giải pháp dứt điểm & bồi thường
    followup: true // Gọi lại kiểm tra sau 24h
  });

  const calcHearScore = () => {
    let s = 0;
    if (hearScores.hear) s += 20;
    if (hearScores.empathize) s += 25;
    if (hearScores.apologize) s += 20;
    if (hearScores.resolve) s += 25;
    if (hearScores.followup) s += 10;
    return s;
  };

  const hearTotal = calcHearScore();

  return (
    <div className="space-y-6 pt-4 border-t border-amber-200/60 dark:border-slate-700/60">
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={() => setActiveTab('cjm_radar')} 
          className={`px-4 py-2 rounded-xl font-extrabold text-xs transition shadow-md cursor-pointer flex items-center gap-1.5 ${activeTab === 'cjm_radar' ? 'bg-sky-600 text-white' : 'glass-pill text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
        >
          <Compass className="w-4 h-4" /> 1. Bản Đồ Điểm Chạm &amp; Radar Cảm Xúc 6 Giai Đoạn
        </button>
        <button 
          onClick={() => setActiveTab('nps_churn')} 
          className={`px-4 py-2 rounded-xl font-extrabold text-xs transition shadow-md cursor-pointer flex items-center gap-1.5 ${activeTab === 'nps_churn' ? 'bg-sky-600 text-white' : 'glass-pill text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
        >
          <TrendingUp className={`w-4 h-4 ${activeTab === 'nps_churn' ? 'text-white' : 'text-emerald-500'}`} /> 2. Phân Tích NPS &amp; Doanh Thu Cứu Vãn Khách Hàng
        </button>
        <button 
          onClick={() => setActiveTab('hear_test')} 
          className={`px-4 py-2 rounded-xl font-extrabold text-xs transition shadow-md cursor-pointer flex items-center gap-1.5 ${activeTab === 'hear_test' ? 'bg-sky-600 text-white' : 'glass-pill text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
        >
          <HeartHandshake className={`w-4 h-4 ${activeTab === 'hear_test' ? 'text-white' : 'text-rose-500'}`} /> 3. Khung Thẩm Định Thấu Cảm HEAR Framework
        </button>
      </div>

      {/* TAB 1: CJM Emotion Radar */}
      {activeTab === 'cjm_radar' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 1. Awareness */}
            <div className="p-4 rounded-2xl glass-inner space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase">1. Giai Đoạn Nhận Biết</span>
                <span className="text-xs font-black text-sky-700">{journeyScores.awareness}%</span>
              </div>
              <p className="text-[11px] text-slate-500">Ấn tượng quảng cáo, tính dễ hiểu của thông điệp dịch vụ.</p>
              <input 
                type="range" min="40" max="100" value={journeyScores.awareness} 
                onChange={(e) => setJourneyScores({...journeyScores, awareness: Number(e.target.value)})}
                className="w-full accent-sky-600 cursor-pointer"
              />
            </div>

            {/* 2. Consideration */}
            <div className="p-4 rounded-2xl glass-inner space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">2. Giai Đoạn Cân Nhắc</span>
                <span className="text-xs font-black text-indigo-700">{journeyScores.consideration}%</span>
              </div>
              <p className="text-[11px] text-slate-500">Tư vấn bán hàng, giải đáp thắc mắc trước mua, bảng giá minh bạch.</p>
              <input 
                type="range" min="40" max="100" value={journeyScores.consideration} 
                onChange={(e) => setJourneyScores({...journeyScores, consideration: Number(e.target.value)})}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            {/* 3. Purchase */}
            <div className="p-4 rounded-2xl glass-inner space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase">3. Giai Đoạn Mua Hàng</span>
                <span className="text-xs font-black text-purple-700">{journeyScores.purchase}%</span>
              </div>
              <p className="text-[11px] text-slate-500">Thanh toán mượt mà, xác nhận đơn hàng tức thì, không bị lỗi giỏ hàng.</p>
              <input 
                type="range" min="40" max="100" value={journeyScores.purchase} 
                onChange={(e) => setJourneyScores({...journeyScores, purchase: Number(e.target.value)})}
                className="w-full accent-purple-600 cursor-pointer"
              />
            </div>

            {/* 4. Onboarding */}
            <div className="p-4 rounded-2xl glass-inner space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">4. Sử Dụng &amp; Kích Hoạt</span>
                <span className="text-xs font-black text-emerald-700">{journeyScores.onboarding}%</span>
              </div>
              <p className="text-[11px] text-slate-500">Hướng dẫn onboarding, video tutorial, sự thân thiện của giao diện.</p>
              <input 
                type="range" min="40" max="100" value={journeyScores.onboarding} 
                onChange={(e) => setJourneyScores({...journeyScores, onboarding: Number(e.target.value)})}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* 5. Support */}
            <div className="p-4 rounded-2xl glass-inner space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase">5. Hỗ Trợ CSKH (MoT)</span>
                <span className="text-xs font-black text-rose-700">{journeyScores.support}%</span>
              </div>
              <p className="text-[11px] text-slate-500">Khoảnh khắc chân thực: Tốc độ phản hồi, thái độ thấu cảm, giải quyết dứt điểm.</p>
              <input 
                type="range" min="40" max="100" value={journeyScores.support} 
                onChange={(e) => setJourneyScores({...journeyScores, support: Number(e.target.value)})}
                className="w-full accent-rose-600 cursor-pointer"
              />
            </div>

            {/* 6. Advocacy */}
            <div className="p-4 rounded-2xl glass-inner space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase">6. Trung Thành &amp; Lan Tỏa</span>
                <span className="text-xs font-black text-amber-700">{journeyScores.advocacy}%</span>
              </div>
              <p className="text-[11px] text-slate-500">Ưu đãi VIP, chăm sóc ngày sinh nhật, sẵn sàng giới thiệu cho bạn bè.</p>
              <input 
                type="range" min="40" max="100" value={journeyScores.advocacy} 
                onChange={(e) => setJourneyScores({...journeyScores, advocacy: Number(e.target.value)})}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-600/90 via-indigo-600/90 to-purple-600/90 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div>
              <span className="text-xs uppercase font-bold text-sky-200 tracking-wider">Chỉ Số Trải Nghiệm Khách Hàng Toàn Trình (Customer Journey Index - CJI)</span>
              <h3 className="text-2xl sm:text-3xl font-black mt-0.5">{avgJourneyScore} / 100 Điểm</h3>
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Đánh giá: <strong>Hành Trình Liền Mạch &amp; Trải Nghiệm Thấu Cảm Xuất Sắc</strong></span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: NPS & Churn Financial Risk */}
      {activeTab === 'nps_churn' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 p-5 rounded-2xl glass-inner space-y-4">
              <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-xs flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-500" /> Dữ Liệu Khảo Sát NPS &amp; Doanh Thu ARPU
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <Smile className="w-3.5 h-3.5 text-emerald-500" /> Khách hàng ủng hộ (Promoters 9-10):
                  </label>
                  <input 
                    type="number" 
                    value={npsInputs.promoters} 
                    onChange={(e) => setNpsInputs({...npsInputs, promoters: Number(e.target.value)})} 
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 font-bold outline-none" 
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <Smile className="w-3.5 h-3.5 text-amber-500" /> Khách hàng trung lập (Passives 7-8):
                  </label>
                  <input 
                    type="number" 
                    value={npsInputs.passives} 
                    onChange={(e) => setNpsInputs({...npsInputs, passives: Number(e.target.value)})} 
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 font-bold outline-none" 
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-500" /> Khách bất mãn (Detractors 0-6):
                  </label>
                  <input 
                    type="number" 
                    value={npsInputs.detractors} 
                    onChange={(e) => setNpsInputs({...npsInputs, detractors: Number(e.target.value)})} 
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 font-bold outline-none" 
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-sky-500" /> Doanh thu TB tháng/khách (ARPU):
                  </label>
                  <input 
                    type="number" 
                    value={npsInputs.arpuMonthly} 
                    onChange={(e) => setNpsInputs({...npsInputs, arpuMonthly: Number(e.target.value)})} 
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 font-bold outline-none" 
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-5 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-sky-500/15 border border-emerald-300/70 dark:border-emerald-700/50 flex flex-col justify-between space-y-4 backdrop-blur-xl">
              <div>
                <h4 className="font-extrabold text-emerald-900 dark:text-emerald-200 uppercase tracking-wider text-xs flex items-center gap-2 border-b border-emerald-500/20 pb-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" /> Tác Động Kinh Doanh &amp; Điểm NPS
                </h4>
                <div className="mt-4 space-y-2.5 text-xs font-body">
                  <div className="flex justify-between items-center p-2.5 rounded-xl glass-inner">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Điểm Net Promoter Score (NPS):</span>
                    <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">+{netPromoterScore} NPS</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-xl bg-rose-500/15 text-rose-900 dark:text-rose-200 border border-rose-400/40">
                    <span className="font-bold">Nguy cơ tổn thất Churn hàng năm:</span>
                    <span className="font-black text-rose-700 dark:text-rose-300">{(potentialChurnLoss / 1000000).toLocaleString()} Triệu VNĐ</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-xl bg-emerald-500/20 text-emerald-900 dark:text-emerald-200 border border-emerald-400/40">
                    <span className="font-extrabold">Doanh thu cứu vãn nhờ CSKH (85%):</span>
                    <span className="font-black text-emerald-800 dark:text-emerald-300 text-sm">+{(savedAnnualRevenue / 1000000).toLocaleString()} Triệu VNĐ</span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 italic">
                * Quy trình phục hồi khách hàng bất mãn trong 15 phút giúp bảo vệ trực tiếp hàng tỷ đồng doanh thu gắn kết.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: HEAR Framework */}
      {activeTab === 'hear_test' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 p-5 rounded-2xl glass-inner space-y-3">
              <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-xs flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-rose-500" /> Bảng Thẩm Định Xử Lý Khiếu Nại Cảm Xúc Theo Khung HEAR
              </h4>
              <div className="space-y-2.5 text-xs font-body">
                <label className="flex items-center space-x-3 p-3 rounded-xl glass-base cursor-pointer hover:bg-white/90">
                  <input 
                    type="checkbox" 
                    checked={hearScores.hear} 
                    onChange={(e) => setHearScores({...hearScores, hear: e.target.checked})} 
                    className="w-4 h-4 text-sky-600 rounded" 
                  />
                  <div>
                    <span className="font-bold text-sky-700 dark:text-sky-300 block">H - HEAR (Lắng nghe chủ động):</span>
                    <span className="text-[11px] text-slate-500">Tuyệt đối không ngắt lời, ghi chú tường tận nguyên nhân gốc rễ và cảm xúc của khách hàng.</span>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-3 rounded-xl glass-base cursor-pointer hover:bg-white/90">
                  <input 
                    type="checkbox" 
                    checked={hearScores.empathize} 
                    onChange={(e) => setHearScores({...hearScores, empathize: e.target.checked})} 
                    className="w-4 h-4 text-purple-600 rounded" 
                  />
                  <div>
                    <span className="font-bold text-purple-700 dark:text-purple-300 block">E - EMPATHIZE (Đồng cảm chân thành):</span>
                    <span className="text-[11px] text-slate-500">Xác nhận sự bất tiện ("Em hoàn toàn thấu hiểu cảm giác gián đoạn công việc của anh/chị lúc này").</span>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-3 rounded-xl glass-base cursor-pointer hover:bg-white/90">
                  <input 
                    type="checkbox" 
                    checked={hearScores.apologize} 
                    onChange={(e) => setHearScores({...hearScores, apologize: e.target.checked})} 
                    className="w-4 h-4 text-amber-600 rounded" 
                  />
                  <div>
                    <span className="font-bold text-amber-700 dark:text-amber-300 block">A - APOLOGIZE (Xin lỗi trách nhiệm):</span>
                    <span className="text-[11px] text-slate-500">Đại diện cho tổ chức nhận trách nhiệm về trải nghiệm chưa trọn vẹn mà không đổ lỗi cho bên thứ ba.</span>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-3 rounded-xl glass-base cursor-pointer hover:bg-white/90">
                  <input 
                    type="checkbox" 
                    checked={hearScores.resolve} 
                    onChange={(e) => setHearScores({...hearScores, resolve: e.target.checked})} 
                    className="w-4 h-4 text-emerald-600 rounded" 
                  />
                  <div>
                    <span className="font-bold text-emerald-700 dark:text-emerald-300 block">R - RESOLVE (Giải quyết dứt điểm):</span>
                    <span className="text-[11px] text-slate-500">Đưa ra mốc thời gian xử lý rõ ràng, kích hoạt quỹ đền bù nhanh (Voucher/Special credit) nếu cần.</span>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-3 rounded-xl glass-base cursor-pointer hover:bg-white/90">
                  <input 
                    type="checkbox" 
                    checked={hearScores.followup} 
                    onChange={(e) => setHearScores({...hearScores, followup: e.target.checked})} 
                    className="w-4 h-4 text-indigo-600 rounded" 
                  />
                  <div>
                    <span className="font-bold text-indigo-700 dark:text-indigo-300 block">FOLLOW-UP (Chăm sóc hậu xử lý):</span>
                    <span className="text-[11px] text-slate-500">Gọi điện hoặc gửi thư xác nhận hài lòng sau 24 giờ kể từ khi sự cố được đóng.</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="lg:col-span-4 p-5 rounded-2xl bg-gradient-to-br from-rose-500/20 via-purple-500/15 to-indigo-500/15 border border-rose-300/70 dark:border-rose-700/50 flex flex-col justify-between space-y-4 backdrop-blur-xl">
              <div>
                <h4 className="font-extrabold text-rose-900 dark:text-rose-200 uppercase tracking-wider text-xs flex items-center gap-2 border-b border-rose-500/20 pb-2">
                  <Award className="w-4 h-4 text-rose-600" /> Điểm Chuẩn Thấu Cảm HEAR
                </h4>
                <div className="mt-6 text-center">
                  <span className="text-4xl sm:text-5xl font-black text-rose-700 dark:text-rose-300">{hearTotal}</span>
                  <span className="text-sm font-bold text-slate-500"> / 100 điểm</span>
                  <div className="mt-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${hearTotal >= 85 ? 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300' : 'bg-amber-500/20 text-amber-800'}`}>
                      {hearTotal >= 85 ? 'Đạt Tiêu Chuẩn Phục Hồi Cao Cấp' : 'Cần Huấn Luyện Thêm Về Thấu Cảm'}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed text-center">
                Khung HEAR chuyển hóa các tình huống xung đột thành cơ hội vàng gia tăng lòng trung thành thương hiệu.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
