import React, { useState } from "react";
import { 
  GraduationCap, 
  Users, 
  Award, 
  TrendingUp, 
  CheckCircle, 
  Sparkles, 
  Target, 
  BarChart3, 
  Activity, 
  Sliders, 
  BookOpen,
  UserCheck,
  ShieldCheck,
  Zap
} from "lucide-react";

export function CaseStudy1_5_Tools() {
  const [activeTab, setActiveTab] = useState<"kirkpatrick" | "qa_eval" | "ramp_up">("kirkpatrick");

  // 1. Kirkpatrick 4-Level Framework & Training Effectiveness
  const [kirkpatrickScores, setKirkpatrickScores] = useState({
    l1_reaction: 94, // Đánh giá độ hài lòng về khóa học (CSAT khóa học)
    l2_learning: 91, // Điểm kiểm tra kiến thức & nghiệp vụ sau đào tạo
    l3_behavior: 89, // Tỷ lệ áp dụng chuẩn ứng xử & quy trình vào thực tế
    l4_results: 95 // Tác động kinh doanh (CSAT tăng, FCR tăng, giảm lỗi)
  });

  const avgTrainingIndex = Math.round(
    (kirkpatrickScores.l1_reaction +
      kirkpatrickScores.l2_learning +
      kirkpatrickScores.l3_behavior +
      kirkpatrickScores.l4_results) / 4
  );

  // 2. Interactive QA Scoring Rubric (100 Points Scale)
  const [qaRubric, setQaRubric] = useState({
    greeting: 10, // Chào hỏi chuẩn mực & xác thực định danh (Max 10)
    listening: 25, // Lắng nghe chủ động & nắm bắt đúng nhu cầu (Max 25)
    knowledge: 30, // Kiến thức nghiệp vụ & giải pháp chính xác 100% (Max 30)
    empathy: 20, // Thái độ thấu cảm, lịch thiệp, tôn trọng (Max 20)
    closing: 15 // Tóm tắt giải pháp & câu chào kết chuẩn (Max 15)
  });

  const totalQaScore = qaRubric.greeting + qaRubric.listening + qaRubric.knowledge + qaRubric.empathy + qaRubric.closing;

  // 3. Newbie Ramp-up Time & Training Cost Simulator
  const [rampUpParams, setRampUpParams] = useState({
    newHiresPerYear: 36, // 36 nhân sự mới mỗi năm
    oldRampUpDays: 45, // Trước đây mất 45 ngày để tự tin đứng ca độc lập
    newRampUpDays: 14, // Sau cải tiến chỉ còn 14 ngày (Giảm 68.8%)
    dailySalary: 350000, // Chi phí lương/đào tạo 350k/ngày/nhân sự
    mentorHoursPerHire: 20 // Số giờ mentor kèm cặp
  });

  const daysSavedPerHire = rampUpParams.oldRampUpDays - rampUpParams.newRampUpDays;
  const annualDaysSaved = daysSavedPerHire * rampUpParams.newHiresPerYear;
  const annualSalarySaved = annualDaysSaved * rampUpParams.dailySalary;
  const productivityGainedHours = annualDaysSaved * 8; // 8 hours per day

  return (
    <div className="space-y-6 pt-4 border-t border-amber-200/60 dark:border-slate-700/60">
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={() => setActiveTab('kirkpatrick')} 
          className={`px-4 py-2 rounded-xl font-extrabold text-xs transition shadow-md cursor-pointer flex items-center gap-1.5 ${activeTab === 'kirkpatrick' ? 'bg-sky-600 text-white' : 'glass-pill text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
        >
          <GraduationCap className="w-4 h-4" /> 1. Khung Đánh Giá Đào Tạo 4 Cấp Độ Kirkpatrick
        </button>
        <button 
          onClick={() => setActiveTab('qa_eval')} 
          className={`px-4 py-2 rounded-xl font-extrabold text-xs transition shadow-md cursor-pointer flex items-center gap-1.5 ${activeTab === 'qa_eval' ? 'bg-sky-600 text-white' : 'glass-pill text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
        >
          <ShieldCheck className={`w-4 h-4 ${activeTab === 'qa_eval' ? 'text-white' : 'text-purple-500'}`} /> 2. Bộ Tiêu Chuẩn Thẩm Định Chất Lượng QA (100 Điểm)
        </button>
        <button 
          onClick={() => setActiveTab('ramp_up')} 
          className={`px-4 py-2 rounded-xl font-extrabold text-xs transition shadow-md cursor-pointer flex items-center gap-1.5 ${activeTab === 'ramp_up' ? 'bg-sky-600 text-white' : 'glass-pill text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
        >
          <Zap className={`w-4 h-4 ${activeTab === 'ramp_up' ? 'text-white' : 'text-emerald-500'}`} /> 3. Mô Phỏng Rút Ngắn Ramp-Up Time &amp; Tiết Kiệm Chi Phí
        </button>
      </div>

      {/* TAB 1: Kirkpatrick Framework */}
      {activeTab === 'kirkpatrick' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* L1: Reaction */}
            <div className="p-4 rounded-2xl glass-inner space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase">Cấp 1: Phản Ứng (Reaction)</span>
                <span className="text-xs font-black text-sky-700">{kirkpatrickScores.l1_reaction}%</span>
              </div>
              <p className="text-[11px] text-slate-500">Mức độ hào hứng, chất lượng giảng viên &amp; tính thực tiễn bài giảng.</p>
              <input 
                type="range" min="50" max="100" value={kirkpatrickScores.l1_reaction} 
                onChange={(e) => setKirkpatrickScores({...kirkpatrickScores, l1_reaction: Number(e.target.value)})}
                className="w-full accent-sky-600 cursor-pointer"
              />
            </div>

            {/* L2: Learning */}
            <div className="p-4 rounded-2xl glass-inner space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">Cấp 2: Học Tập (Learning)</span>
                <span className="text-xs font-black text-indigo-700">{kirkpatrickScores.l2_learning}%</span>
              </div>
              <p className="text-[11px] text-slate-500">Điểm số bài thi nghiệp vụ, tình huống giả lập &amp; bài test cuối khóa.</p>
              <input 
                type="range" min="50" max="100" value={kirkpatrickScores.l2_learning} 
                onChange={(e) => setKirkpatrickScores({...kirkpatrickScores, l2_learning: Number(e.target.value)})}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            {/* L3: Behavior */}
            <div className="p-4 rounded-2xl glass-inner space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase">Cấp 3: Hành Vi (Behavior)</span>
                <span className="text-xs font-black text-purple-700">{kirkpatrickScores.l3_behavior}%</span>
              </div>
              <p className="text-[11px] text-slate-500">Mức độ áp dụng kỹ năng vào thực tế cuộc gọi (được chấm bởi QA).</p>
              <input 
                type="range" min="50" max="100" value={kirkpatrickScores.l3_behavior} 
                onChange={(e) => setKirkpatrickScores({...kirkpatrickScores, l3_behavior: Number(e.target.value)})}
                className="w-full accent-purple-600 cursor-pointer"
              />
            </div>

            {/* L4: Results */}
            <div className="p-4 rounded-2xl glass-inner space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">Cấp 4: Kết Quả (Results)</span>
                <span className="text-xs font-black text-emerald-700">{kirkpatrickScores.l4_results}%</span>
              </div>
              <p className="text-[11px] text-slate-500">Tác động đến chỉ số kinh doanh thực tế (CSAT, FCR, giảm khiếu nại).</p>
              <input 
                type="range" min="50" max="100" value={kirkpatrickScores.l4_results} 
                onChange={(e) => setKirkpatrickScores({...kirkpatrickScores, l4_results: Number(e.target.value)})}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-600/90 via-indigo-600/90 to-purple-600/90 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div>
              <span className="text-xs uppercase font-bold text-sky-200 tracking-wider">Chỉ Số Hiệu Quả Đào Tạo Toàn Diện (Kirkpatrick Effectiveness Index)</span>
              <h3 className="text-2xl sm:text-3xl font-black mt-0.5">{avgTrainingIndex} / 100 Điểm</h3>
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Đánh giá: <strong>Hệ Thống Đào Tạo Đạt Chuẩn Xuất Sắc Quốc Tế</strong></span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: QA Rubric */}
      {activeTab === 'qa_eval' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 p-5 rounded-2xl glass-inner space-y-4">
              <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-500" /> 5 Trọng Số Đánh Giá Chất Lượng Cuộc Gọi / Phiên Chat (QA Scorecard)
              </h4>
              <div className="space-y-3 text-xs font-body">
                <div>
                  <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300 mb-1">
                    <span>1. Chào hỏi chuẩn mực &amp; Định danh khách hàng (Max: 10đ)</span>
                    <span className="font-black text-sky-600">{qaRubric.greeting} / 10đ</span>
                  </div>
                  <input 
                    type="range" min="0" max="10" value={qaRubric.greeting} 
                    onChange={(e) => setQaRubric({...qaRubric, greeting: Number(e.target.value)})}
                    className="w-full accent-sky-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300 mb-1">
                    <span>2. Lắng nghe chủ động &amp; Nắm bắt đúng nhu cầu cốt lõi (Max: 25đ)</span>
                    <span className="font-black text-indigo-600">{qaRubric.listening} / 25đ</span>
                  </div>
                  <input 
                    type="range" min="0" max="25" value={qaRubric.listening} 
                    onChange={(e) => setQaRubric({...qaRubric, listening: Number(e.target.value)})}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300 mb-1">
                    <span>3. Kiến thức nghiệp vụ &amp; Đưa giải pháp chính xác dứt điểm (Max: 30đ)</span>
                    <span className="font-black text-purple-600">{qaRubric.knowledge} / 30đ</span>
                  </div>
                  <input 
                    type="range" min="0" max="30" value={qaRubric.knowledge} 
                    onChange={(e) => setQaRubric({...qaRubric, knowledge: Number(e.target.value)})}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300 mb-1">
                    <span>4. Thái độ thấu cảm, lịch thiệp, giữ bình tĩnh (Max: 20đ)</span>
                    <span className="font-black text-emerald-600">{qaRubric.empathy} / 20đ</span>
                  </div>
                  <input 
                    type="range" min="0" max="20" value={qaRubric.empathy} 
                    onChange={(e) => setQaRubric({...qaRubric, empathy: Number(e.target.value)})}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300 mb-1">
                    <span>5. Tóm tắt giải pháp &amp; Lời chào kết chuyên nghiệp (Max: 15đ)</span>
                    <span className="font-black text-amber-600">{qaRubric.closing} / 15đ</span>
                  </div>
                  <input 
                    type="range" min="0" max="15" value={qaRubric.closing} 
                    onChange={(e) => setQaRubric({...qaRubric, closing: Number(e.target.value)})}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 p-5 rounded-2xl bg-gradient-to-br from-purple-600/20 via-indigo-600/15 to-sky-600/15 border border-purple-400/60 dark:border-purple-700/50 flex flex-col justify-between space-y-4 backdrop-blur-xl">
              <div>
                <h4 className="font-extrabold text-purple-900 dark:text-purple-200 uppercase tracking-wider text-xs flex items-center gap-2 border-b border-purple-500/20 pb-2">
                  <Award className="w-4 h-4 text-purple-600" /> Tổng Điểm Thẩm Định QA
                </h4>
                <div className="mt-6 text-center">
                  <span className="text-4xl sm:text-5xl font-black text-purple-700 dark:text-purple-300">{totalQaScore}</span>
                  <span className="text-h6 text-slate-500"> / 100 điểm</span>
                  <div className="mt-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${totalQaScore >= 90 ? 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300' : totalQaScore >= 80 ? 'bg-sky-500/20 text-sky-800' : 'bg-rose-500/20 text-rose-800'}`}>
                      {totalQaScore >= 90 ? 'Đạt Chuẩn Xuất Sắc (Vượt Chỉ Tiêu)' : totalQaScore >= 80 ? 'Đạt Yêu Cầu Vận Hành' : 'Cần Huấn Luyện Lại (Coaching 1-on-1)'}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed text-center">
                Quy trình QA Auditing tuần hoàn đảm bảo chất lượng phục vụ đồng đều trên 100% chuyên viên.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Ramp-up Simulator */}
      {activeTab === 'ramp_up' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 p-5 rounded-2xl glass-inner space-y-4">
              <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-xs flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-500" /> Tham Số Đào Tạo Nhân Sự Mới &amp; Ramp-Up Time
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-sky-500" /> Số lượng tuyển mới hàng năm:
                  </label>
                  <input 
                    type="number" 
                    value={rampUpParams.newHiresPerYear} 
                    onChange={(e) => setRampUpParams({...rampUpParams, newHiresPerYear: Number(e.target.value)})} 
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 font-bold outline-none" 
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-rose-500" /> Thời gian đào tạo cũ (Ngày):
                  </label>
                  <input 
                    type="number" 
                    value={rampUpParams.oldRampUpDays} 
                    onChange={(e) => setRampUpParams({...rampUpParams, oldRampUpDays: Number(e.target.value)})} 
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 font-bold outline-none" 
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-emerald-500" /> Thời gian đào tạo mới (Ngày):
                  </label>
                  <input 
                    type="number" 
                    value={rampUpParams.newRampUpDays} 
                    onChange={(e) => setRampUpParams({...rampUpParams, newRampUpDays: Number(e.target.value)})} 
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 font-bold outline-none" 
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <BarChart3 className="w-3.5 h-3.5 text-indigo-500" /> Chi phí lương đào tạo/ngày (VNĐ):
                  </label>
                  <input 
                    type="number" 
                    value={rampUpParams.dailySalary} 
                    onChange={(e) => setRampUpParams({...rampUpParams, dailySalary: Number(e.target.value)})} 
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 font-bold outline-none" 
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-5 rounded-2xl bg-gradient-to-br from-emerald-600/20 via-teal-600/15 to-sky-600/15 border border-emerald-400/60 dark:border-emerald-700/50 flex flex-col justify-between space-y-4 backdrop-blur-xl">
              <div>
                <h4 className="font-extrabold text-emerald-900 dark:text-emerald-200 uppercase tracking-wider text-xs flex items-center gap-2 border-b border-emerald-500/20 pb-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" /> Hiệu Quả Rút Ngắn Ramp-Up Time
                </h4>
                <div className="mt-4 space-y-2.5 text-xs font-body">
                  <div className="flex justify-between items-center p-2.5 rounded-xl glass-inner">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Rút ngắn thời gian đào tạo:</span>
                    <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">Từ {rampUpParams.oldRampUpDays} ngày xuống {rampUpParams.newRampUpDays} ngày (-{(((rampUpParams.oldRampUpDays - rampUpParams.newRampUpDays)/rampUpParams.oldRampUpDays)*100).toFixed(1)}%)</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-xl bg-emerald-500/20 text-emerald-900 dark:text-emerald-200 border border-emerald-400/40">
                    <span className="font-extrabold">Chi phí lương đào tạo tiết kiệm:</span>
                    <span className="font-black text-emerald-800 dark:text-emerald-300 text-sm">{(annualSalarySaved / 1000000).toFixed(1)} Triệu VNĐ/năm</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-xl bg-purple-500/20 text-purple-900 dark:text-purple-200 border border-purple-400/40">
                    <span className="font-extrabold">Tổng giờ lao động sớm có ích:</span>
                    <span className="font-black text-purple-800 dark:text-purple-300 text-base">+{productivityGainedHours.toLocaleString()} Giờ trực ca/năm</span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 italic">
                * Chương trình Onboarding số hóa kết hợp Microlearning &amp; Shadowing giúp nhân sự mới tự tin độc lập sau 2 tuần.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
