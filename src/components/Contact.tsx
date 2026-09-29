import React, { useState, useCallback } from "react";
import { 
  User, 
  Mail, 
  Compass, 
  Phone, 
  MessageSquare, 
  Send,
  Heart,
  Zap,
  Check,
  Copy,
  MapPin,
  Clock,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  ChevronDown,
  Briefcase,
  Building2,
  ExternalLink,
  CheckCircle2,
  Share2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { playUiSound } from "../lib/sound";
import { PageCardHeader } from "./PageCardHeader";
import { cn } from "../lib/utils";

export function Contact() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isVi = lang === "vi";

  // Dynamic theme-aware Glass Card classes
  const getGlassCardClass = useCallback(() => {
    switch (theme as string) {
      case "glass-dark-neon":
        return "bg-[#121218]/85 dark:bg-[#121218]/85 border-cyan-400/25 dark:border-white/15 backdrop-blur-[20px] backdrop-saturate-[180%] shadow-[0_0_20px_rgba(0,240,255,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.25)]";
      case "modern-light-glass":
        return "bg-white/70 dark:bg-slate-900/75 border-white/80 dark:border-white/15 backdrop-blur-[20px] backdrop-saturate-[180%] shadow-[0_10px_30px_0_rgba(100,110,140,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-[0_14px_40px_0_rgba(100,110,140,0.15)]";
      case "mritech-digital-growth":
      default:
        return "bg-white/75 dark:bg-[#121218]/80 border-white/70 dark:border-white/12 backdrop-blur-[18px] backdrop-saturate-[180%] shadow-[0_8px_32px_0_rgba(31,38,135,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.12)]";
    }
  }, [theme]);

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [activeTopic, setActiveTopic] = useState("💬 General");
  const [formSuccess, setFormSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Topics list matching specification
  const topics = [
    { id: "general", label: "💬 General", labelVi: "💬 Chung" },
    { id: "design", label: "🎨 CX & CS Advisory", labelVi: "🎨 Tư vấn CX & CS" },
    { id: "partnership", label: "🤝 Partnership", labelVi: "🤝 Hợp tác chiến lược" },
    { id: "bug", label: "🐞 Feedback & Bug", labelVi: "🐞 Góp ý & Báo lỗi" }
  ];

  // Quick message presets
  const presets = [
    {
      labelVi: "Cần tư vấn chiến lược Contact Center",
      labelEn: "Need Contact Center strategy consultation",
      textVi: "Tôi cần tư vấn tái cấu trúc và tối ưu hóa hệ thống Contact Center quy mô 100+ nhân sự.",
      textEn: "I need consultation on restructuring and optimizing a 100+ seat Contact Center."
    },
    {
      labelVi: "Hợp tác đào tạo đội ngũ CSKH",
      labelEn: "CS Team Training Partnership",
      textVi: "Tôi muốn tìm hiểu chương trình đào tạo kỹ năng thấu cảm và quy trình QA cho đội ngũ CSKH.",
      textEn: "I would like to explore empathy skills training and QA framework for our CS team."
    },
    {
      labelVi: "Tích hợp AI & Omni-channel CRM",
      labelEn: "AI & Omni-channel Integration",
      textVi: "Tôi cần tư vấn tích hợp AI Chatbot và Omni-channel Contact Center (Zendesk / Salesforce).",
      textEn: "I need advice on integrating AI Chatbot and Omni-channel Contact Center (Zendesk / Salesforce)."
    }
  ];

  // FAQ Data
  const faqs = [
    {
      qVi: "Thời gian phản hồi sau khi gửi yêu cầu liên hệ là bao lâu?",
      qEn: "How quickly do you respond to inquiry submissions?",
      aVi: "Tôi luôn ưu tiên phản hồi trong vòng 24 giờ làm việc. Với các đề xuất khẩn cấp hoặc dự án chiến lược, thời gian phản hồi thường trong vòng 2–4 giờ làm việc.",
      aEn: "I prioritize responding within 24 business hours. For urgent proposals or strategic advisory, response time is usually within 2–4 hours during office hours."
    },
    {
      qVi: "Anh Thái có nhận tư vấn dự án ngắn hạn hoặc đào tạo doanh nghiệp không?",
      qEn: "Do you offer short-term advisory or customized corporate training?",
      aVi: "Có. Tôi nhận tư vấn chiến lược CX/CSKH, thẩm định hệ thống Contact Center, xây dựng bộ tiêu chuẩn QA Scorecard và đào tạo nâng cao kỹ năng cho đội ngũ lãnh đạo & nhân sự CSKH.",
      aEn: "Yes. I offer CX/CS strategic advisory, Contact Center audits, QA Scorecard framework development, and specialized training for CS leaders and operational teams."
    },
    {
      qVi: "Thông tin dự án và ý tưởng trao đổi có được cam kết bảo mật không?",
      qEn: "Are project details and discussion ideas guaranteed to be confidential?",
      aVi: "Cam kết bảo mật 100%. Mọi dữ liệu trao đổi, số liệu vận hành và ý tưởng chiến lược của doanh nghiệp đều được bảo mật tuyệt đối. Sẵn sàng ký kết thỏa thuận NDA (Non-Disclosure Agreement) trước khi đi vào chi tiết.",
      aEn: "100% Confidentiality guaranteed. All business operational metrics, strategies, and project details remain strictly confidential with NDA agreements signed upon request."
    }
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleTopicClick = (topicLabel: string) => {
    try { playUiSound("click"); } catch {}
    setActiveTopic(topicLabel);
  };

  const handleCopyEmail = () => {
    try { playUiSound("click"); } catch {}
    navigator.clipboard.writeText("hungthai84@gmail.com");
    setCopiedEmail(true);
    showToast(isVi ? "Đã sao chép địa chỉ Email: hungthai84@gmail.com" : "Copied email: hungthai84@gmail.com");
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    try { playUiSound("click"); } catch {}
    navigator.clipboard.writeText("0908848xxx");
    setCopiedPhone(true);
    showToast(isVi ? "Đã sao chép số điện thoại liên hệ" : "Copied phone number");
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleApplyPreset = (presetText: string) => {
    try { playUiSound("click"); } catch {}
    setMessage(presetText);
    showToast(isVi ? "Đã chèn mẫu tin nhắn nhanh!" : "Quick message template applied!");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try { playUiSound("success"); } catch {}

    const targetEmail = "hungthai84@gmail.com";
    const emailSubject = encodeURIComponent(`[Loop Contact - ${activeTopic}] Message from ${fullName || "User"}`);
    const emailBody = encodeURIComponent(
      `Hi Nguyễn Hùng Thái,\n\n` +
      `Full Name: ${fullName}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone || "N/A"}\n` +
      `Company: ${company || "N/A"}\n` +
      `Topic: ${activeTopic}\n\n` +
      `Message:\n${message}\n\n` +
      `--\nSent from Executive Portfolio & Contact Hub`
    );

    window.location.href = `mailto:${targetEmail}?subject=${emailSubject}&body=${emailBody}`;
    setFormSuccess(true);
    showToast(isVi ? "Đã mở trình ứng dụng gửi Mail của bạn!" : "Opened your email client!");
  };

  return (
    <section 
      id="contact" 
      className="relative w-full h-full flex flex-col justify-start items-stretch p-[15px] font-sans text-slate-800 dark:text-slate-100 transition-all duration-300 bg-transparent overflow-y-auto no-scrollbar"
    >
      {/* Toast Floating Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="fixed bottom-20 right-6 z-50 bg-slate-900/95 dark:bg-sky-950/95 text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-sky-400/40 backdrop-blur-md flex items-center gap-2.5 text-xs font-bold"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scoped CSS animations for floating illustration */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes floatA {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(-12px); }
          50% { transform: translateY(0); }
        }
        @keyframes floatC {
          0%, 100% { transform: translateY(-6px) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(4deg); }
        }
        .float-a { animation: floatA 6s ease-in-out infinite; }
        .float-b { animation: floatB 7s ease-in-out infinite; }
        .float-c { animation: floatC 8s ease-in-out infinite; }
      `}} />

      <div className="w-full flex-grow flex flex-col gap-5 max-w-7xl mx-auto justify-start pb-12">
        
        {/* Header Bar */}
        <PageCardHeader pageId="contact">
          <div className="flex items-center gap-2">
            <span className="w-2 h-4 bg-emerald-500 rounded-full shrink-0" />
            <span className="text-caption font-semibold font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30 shadow-2xs">
              {isVi ? "Sẵn sàng kết nối & hợp tác chiến lược" : "Ready to connect and collaborate"}
            </span>
          </div>
        </PageCardHeader>

        {/* Two Separate Contact Cards Side-by-Side (or stacked on mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* CARD 1: Contact Hub, Direct Channels & Illustration (lg:col-span-5) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ borderRadius: "var(--theme-radius-card, 16px)" }}
            className={cn(
              "lg:col-span-5 relative overflow-hidden border transition-all duration-300 shadow-xl flex flex-col justify-between h-full p-5 sm:p-7 gap-6 text-left",
              "rounded-[var(--theme-radius-card,16px)]",
              getGlassCardClass()
            )}
          >
            {/* Ambient Background Glows */}
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-rose-400/10 dark:bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
            
            {/* Card Title & Introduction */}
            <div className="space-y-3 relative z-10">
              <div className="flex items-center gap-2.5">
                <motion.div
                  animate={{ y: [0, -3.5, 0], rotate: [0, 4, -4, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="flex items-center justify-center shrink-0 cursor-pointer select-none"
                >
                  <MessageSquare className="w-6 h-6 text-indigo-600 dark:text-cyan-400 stroke-[2.2] drop-shadow-sm" />
                </motion.div>
                <h6 className="text-h6 font-bold tracking-tight font-play">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 dark:from-indigo-400 dark:via-purple-300 dark:to-rose-300">
                    {isVi ? "Kết nối & Trò chuyện cùng chuyên gia" : "Let's Connect & Build Together"}
                  </span>
                </h6>
              </div>

              <p className="text-xs sm:text-sm font-semibold leading-relaxed text-slate-600 dark:text-slate-300">
                {isVi ? (
                  <>Bạn có câu hỏi, đề xuất hợp tác hoặc cần tư vấn chiến lược Contact Center & chuyển đổi số? Hãy gửi tin nhắn hoặc <a href="mailto:hungthai84@gmail.com" className="font-extrabold underline decoration-rose-500 decoration-2 underline-offset-4 hover:text-rose-600 text-rose-500 transition-colors">gửi email trực tiếp</a>.</>
                ) : (
                  <>Have questions, collaboration proposals, or need advisory on Contact Center and digital transformation? Drop a message or <a href="mailto:hungthai84@gmail.com" className="font-extrabold underline decoration-rose-500 decoration-2 underline-offset-4 hover:text-rose-600 text-rose-500 transition-colors">email directly</a>.</>
                )}
              </p>
            </div>

            {/* Direct Channels Cards */}
            <div className="space-y-3 relative z-10">
              {/* Email Direct Contact Card */}
              <div className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-3 group hover:border-sky-400/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block font-mono">Email Direct</span>
                    <a href="mailto:hungthai84@gmail.com" className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-white hover:text-sky-500 transition-colors">
                      hungthai84@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={handleCopyEmail}
                    title={isVi ? "Sao chép Email" : "Copy Email"}
                    className="p-2 rounded-xl bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-slate-600 transition-all cursor-pointer border border-slate-200 dark:border-slate-600"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <a
                    href="mailto:hungthai84@gmail.com"
                    title={isVi ? "Mở gửi email" : "Send mail"}
                    className="p-2 rounded-xl bg-sky-500 text-white hover:bg-sky-600 transition-all cursor-pointer shadow-xs"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Location & Working Hours Card */}
              <div className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block font-mono">{isVi ? "Trụ sở làm việc" : "Base Location"}</span>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-white">
                      TP. Hồ Chí Minh, Việt Nam
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Hybrid / Remote
                  </span>
                </div>
              </div>

              {/* Response SLA Card */}
              <div className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block font-mono">{isVi ? "Khung giờ hỗ trợ" : "Office Hours"}</span>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-white">
                      Thứ 2 – Thứ 6 (08:00 – 18:00 GMT+7)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hand-built Interactive Illustration Panel */}
            <div 
              style={{ borderRadius: "var(--theme-radius-inner, 14px)" }}
              className="relative rounded-[var(--theme-radius-inner,14px)] bg-gradient-to-br from-slate-100 via-sky-50 to-indigo-50 dark:from-slate-800/80 dark:via-slate-900/80 dark:to-indigo-950/40 border border-sky-100 dark:border-slate-800 px-6 pt-8 pb-5 overflow-hidden flex flex-col justify-end relative z-10"
            >
              {/* Sun accent */}
              <div className="absolute top-4 right-5 h-12 w-12 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 opacity-90 float-a shadow-md" />

              {/* Floating Channel Bubbles */}
              <div className="flex items-end justify-center gap-3 mb-3 select-none relative z-10">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-sky-500 text-white flex items-center justify-center float-c shadow-md shrink-0">
                  <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#082f49] dark:bg-cyan-950 text-white flex items-center justify-center ring-4 ring-white dark:ring-slate-800 float-a shadow-lg shrink-0">
                  <Mail className="w-8 h-8 sm:w-9 sm:h-9 text-sky-300" />
                </div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-rose-500 text-white flex items-center justify-center float-b shadow-md shrink-0">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>

              {/* Horizon bar */}
              <div className="h-2 w-full rounded-full bg-white/80 dark:bg-slate-700/80 mb-3" />

              {/* Trust chips */}
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-extrabold text-slate-700 dark:text-slate-200 z-10">
                <div className="inline-flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0" />
                  <span>{isVi ? "Cam kết bảo mật" : "Strict privacy"}</span>
                </div>
                <div className="inline-flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-sky-500 fill-sky-500 shrink-0" />
                  <span>{isVi ? "Phản hồi trong 24h" : "Replies within 24h"}</span>
                </div>
              </div>
            </div>

          </motion.div>

          {/* CARD 2: Form Field Stack & Message Inquiry (lg:col-span-7) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{ borderRadius: "var(--theme-radius-card, 16px)" }}
            className={cn(
              "lg:col-span-7 relative overflow-hidden border transition-all duration-300 shadow-xl flex flex-col p-5 sm:p-7 gap-5 text-left",
              "rounded-[var(--theme-radius-card,16px)]",
              getGlassCardClass()
            )}
          >
            {/* Ambient Background Glows */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-sky-400/10 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Form Section Header */}
            <div className="flex items-center justify-between relative z-10">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                {isVi ? "Gửi thông điệp trực tiếp" : "Send Direct Message"}
              </span>
              <span className="text-[11px] font-bold text-slate-400 font-mono">
                {isVi ? "Tùy chọn chủ đề & Mẫu nhanh" : "Topic & Preset Options"}
              </span>
            </div>

            {/* Quick Message Presets Grouped into Option Listbox */}
            <div className="space-y-1.5 relative z-10 text-left">
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                {isVi ? "Mẫu tin nhắn nhanh (Tùy chọn danh sách)" : "Quick Message Template (Option List)"}
              </label>
              <div className="relative">
                <select
                  defaultValue=""
                  onChange={(e) => {
                    if (e.target.value) {
                      handleApplyPreset(e.target.value);
                    }
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/90 dark:border-white/10 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 appearance-none cursor-pointer pr-10 shadow-xs"
                >
                  <option value="" disabled>
                    {isVi ? "⚡ Chọn mẫu tin nhắn soạn sẵn nhanh..." : "⚡ Select a quick message template..."}
                  </option>
                  {presets.map((p, idx) => (
                    <option key={idx} value={isVi ? p.textVi : p.textEn} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 py-1">
                      {isVi ? p.labelVi : p.labelEn}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Form Body */}
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 mt-1 relative z-10">
              
              {/* Inputs Row 1: Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Name field */}
                <div className="text-left">
                  <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 font-mono">
                    {isVi ? "Họ và tên của bạn *" : "Full Name *"}
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-500">
                      <User className="w-4 h-4" />
                    </div>
                    <input 
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className="w-full rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 pl-11 pr-4 py-2.5 text-xs sm:text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Email field */}
                <div className="text-left">
                  <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 font-mono">
                    {isVi ? "Địa chỉ Email *" : "Email Address *"}
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input 
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 pl-11 pr-4 py-2.5 text-xs sm:text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Inputs Row 2: Phone + Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Phone field */}
                <div className="text-left">
                  <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 font-mono">
                    {isVi ? "Số điện thoại (Không bắt buộc)" : "Phone Number (Optional)"}
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-500">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input 
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="090 123 4567"
                      className="w-full rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 pl-11 pr-4 py-2.5 text-xs sm:text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Company field */}
                <div className="text-left">
                  <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 font-mono">
                    {isVi ? "Tên công ty / Tổ chức" : "Company / Organization"}
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-500">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <input 
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Công ty ABC"
                      className="w-full rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 pl-11 pr-4 py-2.5 text-xs sm:text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Message field */}
              <div className="text-left">
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 font-mono">
                  {isVi ? "Nội dung trao đổi chi tiết *" : "Your Message Details *"}
                </label>
                <textarea 
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={isVi ? "Nhập nội dung tin nhắn, yêu cầu tư vấn hoặc dự án..." : "Share your inquiry, proposal or project requirements..."}
                  className="w-full rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 px-4 py-3 text-xs sm:text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all duration-200 resize-none"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full mt-1 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:brightness-105 active:scale-[0.99] text-white font-black text-xs sm:text-sm font-play flex items-center justify-center gap-2 shadow-lg hover:shadow-indigo-500/25 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isVi ? "Gửi thông điệp ngay" : "Send Message Now"}</span>
              </button>

              {formSuccess && (
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isVi ? "Đã soạn sẵn thư gửi qua Ứng dụng Email của bạn!" : "Message prepared in your email app!"}</span>
                </div>
              )}
            </form>

          </motion.div>

        </div>

        {/* FAQ Accordion Section */}
        <div className={cn("p-5 sm:p-7 rounded-3xl border space-y-4", getGlassCardClass())}>
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-500 dark:text-cyan-400" />
            <h3 className="text-base sm:text-lg font-bold font-play text-slate-800 dark:text-white">
              {isVi ? "Câu hỏi thường gặp khi liên hệ" : "Frequently Asked Questions"}
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => {
                      try { playUiSound("click"); } catch {}
                      setOpenFaqIndex(isOpen ? null : idx);
                    }}
                    className="w-full px-4 py-3.5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors"
                  >
                    <span>{isVi ? faq.qVi : faq.qEn}</span>
                    <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0", isOpen && "rotate-180 text-indigo-500")} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-4 pb-4 text-xs font-semibold leading-relaxed text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-700/50 pt-3"
                      >
                        {isVi ? faq.aVi : faq.aEn}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Contact;
