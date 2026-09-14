import React, { useState } from "react";
import { 
  GraduationCap, 
  PlayCircle, 
  CheckCircle2, 
  Award, 
  BookOpen, 
  Calculator, 
  Smartphone, 
  Laptop, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Sparkles, 
  Users, 
  FileText, 
  Video, 
  ChevronRight,
  Flame,
  Check,
  X
} from "lucide-react";
import { playUiSound } from "../../lib/sound";

export function CaseStudy4_1_Tools() {
  const [activeTab, setActiveTab] = useState<"lms" | "quiz" | "roi">("lms");

  // Tab 1: LMS Academy Simulator State
  const [selectedModule, setSelectedModule] = useState(0);
  const [completedModules, setCompletedModules] = useState<number[]>([0]);

  // Tab 2: Scenario Quiz State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // Tab 3: ROI Calculator State
  const [headcount, setHeadcount] = useState(60);
  const [classroomCostPerPerson, setClassroomCostPerPerson] = useState(4500000); // 4.5M VND per person
  const [onboardingDaysTraditional, setOnboardingDaysTraditional] = useState(28);

  const modules = [
    {
      id: 1,
      code: "MODULE 01",
      title: "Hòa Nhập & Văn Hóa Dịch Vụ Khách Hàng",
      level: "Cơ bản",
      duration: "45 phút • 4 bài học",
      type: "Video + Slide Tương Tác",
      desc: "Trang bị tư duy Customer-Centric, triết lý phục vụ bằng cả trái tim, lịch sử phát triển và tiêu chuẩn diện mạo/tác phong chuyên nghiệp.",
      lessons: [
        "Bài 1.1: Tầm nhìn & Sứ mệnh 'Khách hàng là trung tâm'",
        "Bài 1.2: Chân dung khách hàng mục tiêu và kỳ vọng cốt lõi",
        "Bài 1.3: Bộ quy chuẩn hành vi 5S trong giao tiếp",
        "Bài 1.4: Bài kiểm tra trắc nghiệm nhận thức văn hóa"
      ],
      skills: ["Tư duy phụng sự", "Quy chuẩn đạo đức nghề nghiệp", "Nhận diện văn hóa DN"]
    },
    {
      id: 2,
      code: "MODULE 02",
      title: "Quy Trình Xử Lý Khiếu Nại & Khủng Hoảng Cấp Độ 1-3",
      level: "Trung cấp",
      duration: "60 phút • 5 bài học",
      type: "Tình Huống Thực Tế + Role-play",
      desc: "Luyện tập mô hình L.A.S.T (Listen - Apologize - Solve - Thank), xử lý khách hàng nóng tính và leo thang khiếu nại đúng thẩm quyền.",
      lessons: [
        "Bài 2.1: Phân loại mức độ nghiêm trọng của khiếu nại (P1-P4)",
        "Bài 2.2: Kỹ thuật hạ hỏa cảm xúc tiêu cực bằng ngôn từ thấu cảm",
        "Bài 2.3: Quy trình phối hợp liên phòng ban gỡ nút thắt trong 2h",
        "Bài 2.4: Thao tác ghi nhận 'Closed-loop Ticket' trên hệ thống",
        "Bài 2.5: Đóng vai giả lập 3 ca khiếu nại thực chiến"
      ],
      skills: ["Xoa dịu bức xúc", "Điều phối liên phòng ban", "Tuân thủ SLA bồi thường"]
    },
    {
      id: 3,
      code: "MODULE 03",
      title: "Kỹ Năng Giao Tiếp & Giọng Nói Qua Tổng Đài (Voice Skill)",
      level: "Cơ bản - Nâng cao",
      duration: "50 phút • 4 bài học",
      type: "Audio Simulation + Luyện Giọng",
      desc: "Rèn luyện ngữ điệu, tốc độ nhả chữ, kỹ thuật lắng nghe chủ động và cách đặt câu hỏi mở để nắm bắt chính xác điểm đau của khách.",
      lessons: [
        "Bài 3.1: Kiểm soát cao độ giọng nói và kỹ thuật 'Cười qua điện thoại'",
        "Bài 3.2: Bộ câu hỏi gợi mở 5W1H truy tìm nguyên nhân gốc rễ",
        "Bài 3.3: Các câu cấm kỵ và giải pháp diễn đạt thay thế tích cực",
        "Bài 3.4: Thực hành gọi giả lập và AI phân tích giọng đọc"
      ],
      skills: ["Lắng nghe chủ động", "Điều chỉnh âm điệu ấm áp", "Diễn đạt tích cực"]
    },
    {
      id: 4,
      code: "MODULE 04",
      title: "Thành Thạo Hệ Thống CRM, CTI & Helpdesk Portal",
      level: "Kỹ thuật nghiệp vụ",
      duration: "75 phút • 6 bài học",
      type: "Mô Phỏng Thao Tác Hệ Thống",
      desc: "Hướng dẫn thực hành thao tác trên màn hình phần mềm: mở hồ sơ 360°, gắn thẻ Tag phân loại, tra cứu lịch sử và tạo vé chuyển tiếp.",
      lessons: [
        "Bài 4.1: Tổng quan giao diện Omni-CRM & Bàn làm việc Agent",
        "Bài 4.2: Thao tác nhận cuộc gọi Screen Pop-up và xem lịch sử",
        "Bài 4.3: Cách áp dụng Macro phản hồi và chèn bài viết Knowledge Base",
        "Bài 4.4: Quy chuẩn ghi chú tóm tắt (Wrap-up Code / Call Summary)",
        "Bài 4.5: Thi thực hành thao tác hệ thống tính giờ"
      ],
      skills: ["Thao tác CRM thành thạo", "Giảm thời gian After-Call Work", "Tra cứu KB nhanh"]
    },
    {
      id: 5,
      code: "MODULE 05",
      title: "Cập Nhật Sản Phẩm & Chính Sách Mới Nhất",
      level: "Liên tục hàng tháng",
      duration: "30 phút • 3 bài học",
      type: "Micro-learning Video 3 phút",
      desc: "Nắm vững các tính năng mới của ứng dụng, biểu phí giao dịch cập nhật, chính sách hoàn tiền và các chương trình ưu đãi định kỳ.",
      lessons: [
        "Bài 5.1: Video tóm tắt tính năng cập nhật phiên bản mới nhất",
        "Bài 5.2: Bảng so sánh điểm khác biệt giữa chính sách cũ và mới",
        "Bài 5.3: Quiz kiểm tra nhanh 10 câu hỏi để mở khóa quyền trực ca"
      ],
      skills: ["Cập nhật nghiệp vụ tức thì", "Tư vấn đúng biểu phí", "Tránh rủi ro tư vấn sai"]
    }
  ];

  const quizQuestions = [
    {
      scenario: "Khách hàng VIP gọi đến tổng đài bức xúc vì giao dịch chuyển tiền bị trừ tiền nhưng người nhận chưa có, đồng thời đe dọa sẽ hủy dịch vụ ngay lập tức. Là nhân viên CSKH, bạn nên phản hồi như thế nào đầu tiên?",
      options: [
        {
          text: "Giải thích ngay rằng lỗi này do phía ngân hàng liên kết bảo trì, công ty chúng tôi không chịu trách nhiệm và bảo khách tự gọi cho ngân hàng kia.",
          correct: false,
          explanation: "Sai lầm nghiêm trọng (Blame shifting): Khách hàng không quan tâm lỗi kỹ thuật nội bộ của ai, việc đùn đẩy trách nhiệm sẽ làm bùng nổ cơn giận dữ."
        },
        {
          text: "Chân thành đồng cảm với sự bất tiện của khách, lắng nghe trọn vẹn, xác nhận thông tin giao dịch và cam kết kiểm tra trực tiếp với bộ phận vận hành ngay trong 15 phút.",
          correct: true,
          explanation: "Chính xác! Áp dụng nguyên tắc L.A.S.T: Lắng nghe, thấu cảm, nhận trách nhiệm đồng hành và đưa ra khung thời gian cam kết cụ thể."
        },
        {
          text: "Ngắt lời khách hàng và yêu cầu khách bình tĩnh lại vì quy định của công ty phải chờ 24-48 giờ làm việc mới có kết quả.",
          correct: false,
          explanation: "Sai! Tuyệt đối không ngắt lời hoặc dùng câu 'Anh/Chị hãy bình tĩnh', điều này chỉ khiến khách hàng cảm thấy bị đối đầu và coi thường."
        }
      ]
    },
    {
      scenario: "Một nhân viên mới hoàn thành bài học về 'Thao tác CRM & Chèn Knowledge Base', khi gặp một câu hỏi về chính sách đổi trả hàng mà chưa nhớ rõ, hành động chuẩn theo SOP là gì?",
      options: [
        {
          text: "Ứớc chừng câu trả lời theo trí nhớ để trả lời ngay cho nhanh nhằm đạt chỉ tiêu thời gian đàm thoại ngắn (AHT).",
          correct: false,
          explanation: "Sai lầm chí mạng: Tư vấn sai chính sách sẽ gây khiếu nại dây chuyền và tổn hại uy tín thương hiệu."
        },
        {
          text: "Xin phép khách hàng giữ máy 30 giây để tra cứu nhanh bài viết chính sách chính thức trên Knowledge Base nội bộ hoặc gửi link Help Center chuẩn xác.",
          correct: true,
          explanation: "Chính xác! SOP luôn ưu tiên 'Tính chính xác (Accuracy)' lên trên 'Tốc độ ẩu', kết hợp tính năng chèn link KB 1-chạm để hỗ trợ khách hàng."
        },
        {
          text: "Nói với khách hàng là mình nhân viên mới không biết và chuyển ngay máy cho Trưởng nhóm.",
          correct: false,
          explanation: "Không đúng quy trình: Nhân viên cần chủ động tra cứu trước, chỉ chuyển tuyến khi vượt quá thẩm quyền cho phép."
        }
      ]
    }
  ];

  const handleAnswerClick = (index: number) => {
    if (isSubmitted) return;
    playUiSound("click");
    setSelectedAnswer(index);
  };

  const handleQuizSubmit = () => {
    if (selectedAnswer === null) return;
    setIsSubmitted(true);
    if (quizQuestions[currentQuestion].options[selectedAnswer].correct) {
      setQuizScore(prev => prev + 1);
      playUiSound("success");
    } else {
      playUiSound("toggle");
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
      playUiSound("special");
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setQuizScore(0);
    setQuizFinished(false);
  };

  // Calculations for ROI
  const elearningCostPerPerson = 650000; // 650k VND for platform & content per person
  const traditionalTotalCost = headcount * classroomCostPerPerson;
  const elearningTotalCost = headcount * elearningCostPerPerson + 15000000; // Platform fixed maintenance
  const totalCostSaved = traditionalTotalCost - elearningTotalCost;
  const percentageSaved = Math.round((totalCostSaved / traditionalTotalCost) * 100);
  const onboardingDaysElearning = 9; // Reduced to 9 days
  const hoursSavedPerPerson = (onboardingDaysTraditional - onboardingDaysElearning) * 8;

  return (
    <div className="glass-base p-6 sm:p-8 rounded-3xl space-y-6 border border-blue-200/80 dark:border-blue-800/60 bg-white/90 dark:bg-slate-900/90 shadow-xl backdrop-blur-xl">
      {/* Tool Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <GraduationCap className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Bộ Công Cụ Thực Nghiệm E-Learning
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
            Trải Nghiệm Học Viện CSKH & Đo Lường Hiệu Suất Đào Tạo
          </h3>
        </div>

        <div className="flex p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 self-stretch sm:self-auto">
          <button
            onClick={() => { setActiveTab("lms"); playUiSound("switch"); }}
            className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "lms"
                ? "bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Học Viện LMS
          </button>
          <button
            onClick={() => { setActiveTab("quiz"); playUiSound("switch"); }}
            className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "quiz"
                ? "bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" /> Thử Thách Tình Huống
          </button>
          <button
            onClick={() => { setActiveTab("roi"); playUiSound("switch"); }}
            className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "roi"
                ? "bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <Calculator className="w-3.5 h-3.5" /> Tính Toán ROI Đào Tạo
          </button>
        </div>
      </div>

      {/* TAB 1: LMS Academy Explorer */}
      {activeTab === "lms" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Module list */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Danh Sách 5 Module Học Tập</span>
                <span className="text-xs text-blue-600 font-bold">Hoàn thành {completedModules.length}/5</span>
              </div>
              <div className="space-y-2.5">
                {modules.map((m, idx) => {
                  const isSelected = selectedModule === idx;
                  const isDone = completedModules.includes(idx);
                  return (
                    <div
                      key={m.id}
                      onClick={() => {
                        setSelectedModule(idx);
                        if (!completedModules.includes(idx)) {
                          setCompletedModules([...completedModules, idx]);
                        }
                        playUiSound("click");
                      }}
                      className={`p-4 rounded-2xl cursor-pointer border transition-all duration-200 ${
                        isSelected 
                          ? "bg-blue-50/90 dark:bg-blue-950/50 border-blue-500 shadow-md ring-2 ring-blue-500/20"
                          : "bg-white/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-blue-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-extrabold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
                          {m.code}
                        </span>
                        {isDone ? (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
                            <Check className="w-3 h-3" /> Đã học
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-medium">{m.level}</span>
                        )}
                      </div>
                      <h4 className="text-h6 text-slate-900 dark:text-white leading-tight">
                        {m.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {m.duration.split("•")[0]}</span>
                        <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {m.duration.split("•")[1]}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Active Module Course Player */}
            <div className="lg:col-span-7 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-6 border border-blue-800/60 shadow-2xl flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between border-b border-blue-800/60 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-500/30 text-blue-300 text-xs font-bold uppercase border border-blue-400/30">
                      {modules[selectedModule].code}
                    </span>
                    <span className="text-xs text-slate-400">Định dạng: {modules[selectedModule].type}</span>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                    <Award className="w-3.5 h-3.5" /> +50 Điểm Tín Chỉ
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {modules[selectedModule].title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {modules[selectedModule].desc}
                </p>

                {/* Simulated Video Player / Interactive Frame */}
                <div className="relative rounded-xl overflow-hidden bg-black/60 border border-blue-700/50 aspect-video flex flex-col items-center justify-center p-6 text-center group cursor-pointer">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-black/80 pointer-events-none" />
                  <div className="w-14 h-14 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform mb-3 border border-white/40">
                    <PlayCircle className="w-8 h-8 fill-current" />
                  </div>
                  <div className="relative z-10">
                    <div className="text-xs font-bold text-white tracking-wide">Xem bài giảng SCORM tương tác 4K</div>
                    <div className="text-[10px] text-blue-200 mt-0.5">Tích hợp mô phỏng thao tác CRM và bài test phụ đề tiếng Việt</div>
                  </div>
                </div>

                {/* Lessons breakdown */}
                <div className="mt-4 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300">Nội dung bài học chi tiết:</span>
                  <div className="space-y-1.5">
                    {modules[selectedModule].lessons.map((lesson, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-200 hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                          <span>{lesson}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">Xem ngay</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-blue-800/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Năng lực rèn luyện:</span>
                  <div className="flex flex-wrap gap-1">
                    {modules[selectedModule].skills.map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-blue-900/60 text-blue-200 text-[10px] border border-blue-700/50">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Scenario Quiz Simulator */}
      {activeTab === "quiz" && (
        <div className="space-y-6 max-w-3xl mx-auto">
          {!quizFinished ? (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-xs">
                    Tình huống {currentQuestion + 1} / {quizQuestions.length}
                  </span>
                  <span className="text-xs text-slate-500">Mô phỏng sát hạch CSKH</span>
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  Điểm hiện tại: {quizScore} / {quizQuestions.length}
                </span>
              </div>

              {/* Scenario Description */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Đề bài tình huống thực tế:
                </span>
                <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                  {quizQuestions[currentQuestion].scenario}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {quizQuestions[currentQuestion].options.map((opt, idx) => {
                  const isSelected = selectedAnswer === idx;
                  let cardStyle = "border-slate-200 dark:border-slate-700 hover:border-blue-300 bg-white/70 dark:bg-slate-800/70";
                  
                  if (isSelected) {
                    cardStyle = "border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 ring-2 ring-blue-500/30";
                  }
                  if (isSubmitted) {
                    if (opt.correct) {
                      cardStyle = "border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/50 ring-2 ring-emerald-500/30";
                    } else if (isSelected && !opt.correct) {
                      cardStyle = "border-rose-500 bg-rose-50/80 dark:bg-rose-950/50 ring-2 ring-rose-500/30";
                    }
                  }

                  return (
                    <div
                      key={idx}
                      onClick={() => handleAnswerClick(idx)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-start gap-3 ${cardStyle}`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                        isSelected 
                          ? "bg-blue-600 text-white" 
                          : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <div className="flex-1 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-snug">
                        {opt.text}
                      </div>
                      {isSubmitted && opt.correct && (
                        <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      )}
                      {isSubmitted && isSelected && !opt.correct && (
                        <X className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Explanation upon submission */}
              {isSubmitted && (
                <div className={`p-4 rounded-xl border animate-fadeIn ${
                  quizQuestions[currentQuestion].options[selectedAnswer!].correct
                    ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 text-emerald-900 dark:text-emerald-200"
                    : "bg-rose-50 dark:bg-rose-950/40 border-rose-200 text-rose-900 dark:text-rose-200"
                }`}>
                  <div className="font-bold text-xs mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Đánh giá chuyên môn & Phân tích SOP:
                  </div>
                  <p className="text-xs leading-relaxed">
                    {quizQuestions[currentQuestion].options[selectedAnswer!].explanation}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                {!isSubmitted ? (
                  <button
                    disabled={selectedAnswer === null}
                    onClick={handleQuizSubmit}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                  >
                    Nộp Bài Đánh Giá
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                  >
                    <span>{currentQuestion < quizQuestions.length - 1 ? "Câu Tiếp Theo" : "Xem Kết Quả & Cấp Chứng Chỉ"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-blue-950 border border-blue-200 dark:border-blue-800 text-center space-y-6 shadow-xl">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 text-amber-900 flex items-center justify-center shadow-lg border-4 border-white">
                <Award className="w-10 h-10" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                  Học Viện Chăm Sóc Khách Hàng Chứng Nhận
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  Chúc Mừng Bạn Đã Đạt Chuẩn Năng Lực!
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-md mx-auto">
                  Bạn đã đạt điểm số <strong className="text-blue-600 font-black">{quizScore}/{quizQuestions.length}</strong> câu hỏi tình huống thực chiến chuẩn SOP.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Học viên:</span>
                  <span className="font-bold text-slate-900 dark:text-white">Chuyên viên CSKH Tuyến 1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Mã chứng chỉ:</span>
                  <span className="font-mono text-blue-600 font-bold">CERT-CS-ACADEMY-2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Quyền lợi:</span>
                  <span className="font-bold text-emerald-600">Đủ điều kiện trực ca & Xét bậc lương</span>
                </div>
              </div>

              <button
                onClick={handleResetQuiz}
                className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:opacity-90 transition-all inline-flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Luyện tập lại từ đầu
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ROI Calculator */}
      {activeTab === "roi" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-5">
            <h4 className="text-h6 text-slate-900 dark:text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-blue-600" /> Tham Số Quy Mô Đào Tạo
            </h4>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-slate-600 dark:text-slate-300">Quy mô nhân sự đào tạo hàng năm:</span>
                <span className="text-blue-600 font-bold">{headcount} nhân sự</span>
              </div>
              <input
                type="range"
                min="10"
                max="300"
                step="5"
                value={headcount}
                onChange={(e) => setHeadcount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-slate-600 dark:text-slate-300">Chi phí đào tạo truyền thống (Offline)/người:</span>
                <span className="text-blue-600 font-bold">{(classroomCostPerPerson / 1000000).toFixed(1)} Triệu VNĐ</span>
              </div>
              <input
                type="range"
                min="2000000"
                max="10000000"
                step="500000"
                value={classroomCostPerPerson}
                onChange={(e) => setClassroomCostPerPerson(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Bao gồm: Thuê giảng viên, in ấn tài liệu, phòng họp, chi phí gián đoạn ca trực.</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-slate-600 dark:text-slate-300">Thời gian Onboarding truyền thống:</span>
                <span className="text-blue-600 font-bold">{onboardingDaysTraditional} ngày</span>
              </div>
              <input
                type="range"
                min="15"
                max="45"
                step="1"
                value={onboardingDaysTraditional}
                onChange={(e) => setOnboardingDaysTraditional(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>

          {/* ROI Metric Outputs */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-200 dark:border-emerald-800/60 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 flex items-center justify-center mb-3">
                  <DollarSign className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tổng Ngân Sách Tiết Kiệm</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                  {(totalCostSaved / 1000000).toFixed(1)} Triệu VNĐ
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 pt-3 border-t border-emerald-100 dark:border-emerald-900/40">
                Tiết kiệm <strong>{percentageSaved}%</strong> chi phí so với tổ chức lớp học tập trung truyền thống.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-transparent border border-blue-200 dark:border-blue-800/60 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-600 flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rút Ngắn Thời Gian Onboarding</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                  {onboardingDaysTraditional} ➔ 9 Ngày
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 pt-3 border-t border-blue-100 dark:border-blue-900/40">
                Tiết kiệm <strong>{hoursSavedPerPerson * headcount} giờ</strong> lao động, nhân sự mới sẵn sàng trực ca sớm hơn 67%.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent border border-purple-200 dark:border-purple-800/60 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-600 flex items-center justify-center mb-3">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tỷ Lệ Hoàn Thành Khóa Học</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400 mt-1">
                  96.4%
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 pt-3 border-t border-purple-100 dark:border-purple-900/40">
                Nhờ định dạng Micro-learning 3-5 phút và thi đua Gamification bảng xếp hạng.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-200 dark:border-amber-800/60 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tỷ Lệ Giữ Chân Nhân Tài</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
                  +42%
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 pt-3 border-t border-amber-100 dark:border-amber-900/40">
                Nhân viên có lộ trình thăng tiến rõ ràng, giảm tỷ lệ tiêu hao nhân sự (Turnover).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
