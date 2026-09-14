import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Play, Pause, ChevronLeft, ChevronRight, Monitor, Sparkles, Clock, Layers } from "lucide-react";
import { useLanguage } from "../i18n";

interface PresentationModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

const PRESENTATION_SLIDES = [
  {
    id: "home",
    titleVi: "01. Tổng quan Hồ sơ Điều hành",
    titleEn: "01. Executive Overview",
    descVi: "Chân dung Lãnh đạo Vận hành 20+ năm kinh nghiệm trong BPO, Contact Center & Chuyển đổi số AI.",
    descEn: "Profile of Executive Director with 20+ years experience in BPO, Contact Center & AI Transformation.",
    highlightVi: "Lãnh đạo 1,200+ nhân sự • CSAT 98%+ • Omni-Channel AI CRM",
    highlightEn: "1,200+ Team Leader • 98%+ CSAT • Omni-Channel AI CRM",
    gradient: "from-blue-600 via-indigo-600 to-purple-600",
  },
  {
    id: "letter",
    titleVi: "02. Thư ngỏ & Tầm nhìn Hợp tác",
    titleEn: "02. Open Letter & Partnership Vision",
    descVi: "Thông điệp tâm huyết gửi tới đối tác và nhà tuyển dụng về các giá trị cốt lõi & cam kết phụng sự.",
    descEn: "Strategic letter to partners and employers regarding core pillars and service commitment.",
    highlightVi: "Tối ưu quy trình • Tăng tốc tăng trưởng • Bền vững tổ chức",
    highlightEn: "Process Optimization • Acceleration • Resilience",
    gradient: "from-cyan-600 via-blue-600 to-indigo-600",
  },
  {
    id: "about",
    titleVi: "03. Giới thiệu Bản thân & Năng lực Core",
    titleEn: "03. About & Core Capabilities",
    descVi: "Tổng hợp các trụ cột năng lực cốt lõi: Quản trị Vận hành, Quản trị Rủi ro (BCP), và Ứng dụng AI.",
    descEn: "Core capabilities: Operational Management, Risk Control (BCP), and AI Implementation.",
    highlightVi: "Chuyên môn sâu • Tư duy Chiến lược • Thực thi Kỷ luật",
    highlightEn: "Deep Expertise • Strategic Thinking • Disciplined Execution",
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
  },
  {
    id: "education",
    titleVi: "04. Học vấn & Bằng cấp Chuyên môn",
    titleEn: "04. Education & Certificates",
    descVi: "Nền tảng tri thức vững chắc: Cử nhân CNTT, Quản trị Cấp cao Dale Carnegie, Big Data BI, CCNA, MCSA.",
    descEn: "Solid academic foundation: IT Bachelor, Dale Carnegie Executive Leadership, Big Data BI, CCNA, MCSA.",
    highlightVi: "Chất lượng Chuẩn hóa • Học tập Suốt đời • Đa Năng lực",
    highlightEn: "Standardized Quality • Lifelong Learning • Multi-competency",
    gradient: "from-amber-600 via-orange-600 to-red-600",
  },
  {
    id: "experience",
    titleVi: "06. Cột mốc Kinh nghiệm Làm việc",
    titleEn: "06. Career Experience Timeline",
    descVi: "Hành trình 9 cột mốc ấn tượng từ năm 2003 đến 2026+ qua các tập đoàn tài chính, viễn thông hàng đầu.",
    descEn: "Journey of 9 major career milestones from 2003 to 2026+ across top finance & telecom firms.",
    highlightVi: "STU • Nhất Nghệ • MobiFone • VietnamWorks • Dale Carnegie • Prudential • BPO Enterprise",
    highlightEn: "STU • Nhat Nghe • MobiFone • VietnamWorks • Dale Carnegie • Prudential • BPO Enterprise",
    gradient: "from-indigo-600 via-purple-600 to-pink-600",
  },
  {
    id: "skills",
    titleVi: "07. Ma trận Kỹ năng & Năng lực",
    titleEn: "07. Skills & Competency Matrix",
    descVi: "Đánh giá toàn diện các kỹ năng Cứng, Mềm và Tư duy Lãnh đạo qua các mô hình SWOT.",
    descEn: "Comprehensive evaluation of Hard, Soft, and Leadership skills via SWOT models.",
    highlightVi: "Lãnh đạo • Giao tiếp • Giải quyết Vấn đề • Trí tuệ Nhân tạo",
    highlightEn: "Leadership • Communication • Problem Solving • Artificial Intelligence",
    gradient: "from-teal-600 via-emerald-600 to-cyan-600",
  },
  {
    id: "projects",
    titleVi: "08. Dự án Thực tiễn Tiêu biểu",
    titleEn: "08. Featured Practical Projects",
    descVi: "Các dự án tối ưu hóa, chuyển đổi số và nâng cao trải nghiệm khách hàng mang lại hiệu quả thực tế cao.",
    descEn: "Optimization, digital transformation, and CX improvement projects delivering real-world impact.",
    highlightVi: "Omni-channel CRM • Voicebot AI • Gamification • Chuyển đổi số",
    highlightEn: "Omni-channel CRM • Voicebot AI • Gamification • Digital Transformation",
    gradient: "from-fuchsia-600 via-pink-600 to-rose-600",
  },
  {
    id: "interview",
    titleVi: "09. Phỏng vấn AI & Trả lời Trực tiếp",
    titleEn: "09. AI Interview & Direct Responses",
    descVi: "Hệ thống hỏi đáp chiến lược giải quyết các câu hỏi hóc húa của Hội đồng Quản trị & Nhà đầu tư.",
    descEn: "Strategic Q&A addressing key executive & investor questions.",
    highlightVi: "Tư duy Sắc bén • Trả lời Thực tế • Định hướng Rõ ràng",
    highlightEn: "Sharp Thinking • Practical Answers • Clear Direction",
    gradient: "from-purple-600 via-indigo-600 to-blue-600",
  },
  {
    id: "tuvi",
    titleVi: "10. Phong thủy & Tử vi Phương Đông",
    titleEn: "10. Eastern Feng Shui & Astrology",
    descVi: "Góc nhìn văn hóa Á Đông về Mệnh, Hướng và Các Yếu Tố Tương Sinh Tương Khắc.",
    descEn: "Eastern cultural perspective on Destiny, Directions, and Elemental Affinities.",
    highlightVi: "Mệnh Kim • Hướng Tây Tứ Trạch • Tương Sinh Thủy/Thổ",
    highlightEn: "Metal Element • West Group Directions • Water/Earth Affinity",
    gradient: "from-yellow-600 via-amber-600 to-orange-600",
  },
  {
    id: "memories",
    titleVi: "11. Kỷ niệm & Hành trình Đáng nhớ",
    titleEn: "11. Memories & Memorable Journey",
    descVi: "Lưu giữ những khoảnh khắc quý giá cùng Đội ngũ, Đối tác và những cột mốc vinh danh.",
    descEn: "Preserving precious moments with Teams, Partners, and honoring milestones.",
    highlightVi: "Kết nối • Tự hào • Trân trọng • Chia sẻ",
    highlightEn: "Connection • Pride • Appreciation • Sharing",
    gradient: "from-pink-600 via-rose-600 to-red-600",
  },
  {
    id: "contact",
    titleVi: "12. Thông tin Liên hệ & Kết nối",
    titleEn: "13. Contact & Connection",
    descVi: "Kênh giao tiếp đa phương tiện, lịch rảnh hẹn gặp và địa chỉ liên lạc trực tiếp.",
    descEn: "Multimedia communication channels, availability calendar, and direct contact details.",
    highlightVi: "Sẵn sàng Hợp tác • Phản hồi Nhanh • Kết nối Đa chiều",
    highlightEn: "Ready for Partnership • Fast Response • Multi-dimensional Connection",
    gradient: "from-slate-600 via-gray-600 to-zinc-600",
  },
];

export default function PresentationModeModal({ isOpen, onClose, onNavigate }: PresentationModeModalProps) {
  const { lang } = useLanguage();
  const isVi = lang === "vi";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [intervalTime, setIntervalTime] = useState(8); // 8 seconds per slide
  const currentSlide = PRESENTATION_SLIDES[currentIndex];

  useEffect(() => {
    if (!isOpen) return;

    if (isPlaying) {
      const timer = setTimeout(() => {
        const next = (currentIndex + 1) % PRESENTATION_SLIDES.length;
        setCurrentIndex(next);
        onNavigate(PRESENTATION_SLIDES[next].id);
      }, intervalTime * 1000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, isPlaying, intervalTime, currentIndex, onNavigate]);

  if (!isOpen) return null;

  const handleNext = () => {
    const next = (currentIndex + 1) % PRESENTATION_SLIDES.length;
    setCurrentIndex(next);
    onNavigate(PRESENTATION_SLIDES[next].id);
  };

  const handlePrev = () => {
    const prev = (currentIndex - 1 + PRESENTATION_SLIDES.length) % PRESENTATION_SLIDES.length;
    setCurrentIndex(prev);
    onNavigate(PRESENTATION_SLIDES[prev].id);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex flex-col justify-between bg-slate-950/90 backdrop-blur-xl text-white p-4 sm:p-8 select-none pointer-events-auto">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between w-full max-w-6xl mx-auto z-20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30">
              <Monitor className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black tracking-tight uppercase flex items-center gap-2">
                <span>{isVi ? "Chế độ Trình chiếu Điều hành" : "Executive Presentation Mode"}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </h3>
              <p className="text-body-sm text-slate-400">
                {isVi ? "Tự động trình chiếu thông tin tổng quan phục vụ xem báo cáo" : "Auto-advancing presentation view"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Speed Selector */}
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
              <Clock className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
              {[5, 8, 12].map((sec) => (
                <button
                  key={sec}
                  onClick={() => setIntervalTime(sec)}
                  className={`px-2 py-1 rounded-lg font-mono font-bold cursor-pointer transition ${
                    intervalTime === sec ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {sec}s
                </button>
              ))}
            </div>

            {/* Exit Button */}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-slate-700"
            >
              <X className="w-4 h-4" />
              <span>{isVi ? "Thoát" : "Exit"}</span>
            </button>
          </div>
        </div>

        {/* Center Presentation Card Overlay */}
        <div className="w-full max-w-4xl mx-auto my-auto z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-indigo-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(99,102,241,0.25)] text-center relative overflow-hidden backdrop-blur-2xl"
            >
              {/* Background Glow */}
              <div
                className={`absolute -top-24 -left-24 w-72 h-72 rounded-full bg-gradient-to-br ${currentSlide.gradient} blur-3xl opacity-20 pointer-events-none`}
              />

              <div className="relative z-10 space-y-4">
                <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono text-xs font-bold">
                  SLIDE {currentIndex + 1} / {PRESENTATION_SLIDES.length}
                </span>

                <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
                  {isVi ? currentSlide.titleVi : currentSlide.titleEn}
                </h2>

                <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                  {isVi ? currentSlide.descVi : currentSlide.descEn}
                </p>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-900/60 to-purple-900/60 border border-indigo-500/40 text-indigo-200 text-xs font-bold shadow-md">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>{isVi ? currentSlide.highlightVi : currentSlide.highlightEn}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Playback & Progress Bar */}
        <div className="w-full max-w-4xl mx-auto z-20 space-y-3">
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              key={currentIndex + "-" + isPlaying}
              initial={{ width: "0%" }}
              animate={{ width: isPlaying ? "100%" : `${((currentIndex + 1) / PRESENTATION_SLIDES.length) * 100}%` }}
              transition={{ duration: isPlaying ? intervalTime : 0.3, ease: "linear" }}
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/50"
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white transition cursor-pointer"
                title="Slide trước"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-black shadow-lg shadow-indigo-500/40 flex items-center gap-2 cursor-pointer transition"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-white" />
                    <span>{isVi ? "Tạm dừng" : "Pause"}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>{isVi ? "Tự động phát" : "Auto Play"}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleNext}
                className="p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white transition cursor-pointer"
                title="Slide tiếp theo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Slide Dots */}
            <div className="flex items-center gap-1.5">
              {PRESENTATION_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    onNavigate(slide.id);
                  }}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? "w-6 bg-indigo-500" : "w-2 bg-slate-700 hover:bg-slate-500"
                  }`}
                  title={isVi ? slide.titleVi : slide.titleEn}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
