import React, { useState, useEffect } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Check, 
  Copy, 
  ExternalLink, 
  Clock, 
  ShieldCheck, 
  Send,
  UserCheck,
  QrCode,
  Sparkles,
  X,
  Globe,
  Linkedin
} from "lucide-react";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { cn } from "../lib/utils";

export function Contact() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isVi = lang === "vi";

  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedZaloLink, setCopiedZaloLink] = useState(false);
  const [copiedWebsite, setCopiedWebsite] = useState(false);
  const [copiedLinkedIn, setCopiedLinkedIn] = useState(false);

  const [selectedSkillTopic, setSelectedSkillTopic] = useState<string | null>(() => {
    try {
      return typeof window !== "undefined" && window.sessionStorage
        ? window.sessionStorage.getItem("contact_selected_skill_topic") || null
        : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const storedSkill = typeof window !== "undefined" && window.sessionStorage
          ? window.sessionStorage.getItem("contact_selected_skill_topic")
          : null;
        if (storedSkill) {
          setSelectedSkillTopic(storedSkill);
        }
      } catch {}
    };
    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const [randomColor] = useState(() => {
    const colors = [
      {
        text: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-600 dark:bg-emerald-400",
        badgeBg: "bg-emerald-50 dark:bg-emerald-950/60",
        badgeText: "text-emerald-700 dark:text-emerald-300",
        badgeBorder: "border-emerald-200/60 dark:border-emerald-800/60",
        accent: "emerald"
      },
      {
        text: "text-indigo-600 dark:text-indigo-400",
        bg: "bg-indigo-600 dark:bg-indigo-400",
        badgeBg: "bg-indigo-50 dark:bg-indigo-950/60",
        badgeText: "text-indigo-700 dark:text-indigo-300",
        badgeBorder: "border-indigo-200/60 dark:border-indigo-800/60",
        accent: "indigo"
      },
      {
        text: "text-cyan-600 dark:text-cyan-400",
        bg: "bg-cyan-600 dark:bg-cyan-400",
        badgeBg: "bg-cyan-50 dark:bg-cyan-950/60",
        badgeText: "text-cyan-700 dark:text-cyan-300",
        badgeBorder: "border-cyan-200/60 dark:border-cyan-800/60",
        accent: "cyan"
      },
      {
        text: "text-blue-600 dark:text-blue-400",
        bg: "bg-blue-600 dark:bg-blue-400",
        badgeBg: "bg-blue-50 dark:bg-blue-950/60",
        badgeText: "text-blue-700 dark:text-blue-300",
        badgeBorder: "border-blue-200/60 dark:border-blue-800/60",
        accent: "blue"
      }
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  });

  const phoneNum = "0909097882";
  const formattedPhone = "0909 097 882";
  const zaloUrl = "https://zalo.me/0909097882";
  const emailAddr = "hungthai84@gmail.com";
  const websiteUrl = "https://nguyenhungthai.powerservice.one/";
  const linkedinUrl = "https://www.linkedin.com/in/hungthai84/";
  const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://zalo.me/0909097882";

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNum);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddr);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyZaloLink = () => {
    navigator.clipboard.writeText(zaloUrl);
    setCopiedZaloLink(true);
    setTimeout(() => setCopiedZaloLink(false), 2500);
  };

  const handleCopyWebsite = () => {
    navigator.clipboard.writeText(websiteUrl);
    setCopiedWebsite(true);
    setTimeout(() => setCopiedWebsite(false), 2500);
  };

  const handleCopyLinkedIn = () => {
    navigator.clipboard.writeText(linkedinUrl);
    setCopiedLinkedIn(true);
    setTimeout(() => setCopiedLinkedIn(false), 2500);
  };

  return (
    <section 
      id="contact" 
      className="relative w-full min-h-full flex flex-col gap-5 p-2.5 sm:p-3.5 md:p-4 select-none"
    >
      {/* Container nhóm các kênh liên hệ & đặt lịch */}
      <div 
        id="info-card-contact" 
        className="w-full flex-1 flex flex-col justify-between gap-2 sm:gap-2.5 relative z-10 min-h-0"
      >
        {selectedSkillTopic && (
          <div className="w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-purple-500/15 via-indigo-500/15 to-blue-500/15 border border-purple-500/30 flex items-center justify-between gap-2 text-[11px] font-bold text-purple-900 dark:text-purple-200 shadow-2xs shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="p-1 rounded-lg bg-purple-600 text-white shadow-xs shrink-0">
                <Sparkles className="w-3 h-3" />
              </span>
              <span className="truncate">
                {isVi ? "Chuyển tiếp từ Kỹ năng:" : "From Skill Matrix:"}{" "}
                <span className="font-black underline decoration-purple-500 decoration-1">{selectedSkillTopic}</span>
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem("contact_selected_skill_topic");
                setSelectedSkillTopic(null);
              }}
              className="px-2 py-0.5 rounded-md bg-purple-200/80 dark:bg-purple-900/60 hover:bg-purple-300 dark:hover:bg-purple-800 text-purple-800 dark:text-purple-200 text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0"
              title="Đóng"
            >
              <X className="w-3 h-3" />
              <span>{isVi ? "Đóng" : "Close"}</span>
            </button>
          </div>
        )}

        {/* Header Card Liên hệ - Tối ưu gọn gàng theo chuẩn Bento */}
        <div className="w-full flex flex-col gap-1 sm:gap-1.5 pb-2 border-b border-slate-200/60 dark:border-slate-800/60 shrink-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-emerald-600 dark:text-emerald-400">
                {isVi ? "Thông tin liên hệ" : "Contact hub communication portal"}
              </h2>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-[11px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>{isVi ? "Trực tuyến 24/7" : "Active 24/7"}</span>
              </span>
              <span className="hidden sm:inline-flex text-[11px] font-mono font-black text-emerald-700 dark:text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                {isVi ? "Đặt lịch trực tiếp" : "Direct Scheduling"}
              </span>
            </div>
          </div>

          <div className="h-[1.5px] w-full bg-emerald-500/30 dark:bg-emerald-500/20" />
        </div>

        {/* Lưới Bento Grid Bất Đối Xứng Hiện Đại - Tối ưu Fit To Screen */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-3 items-stretch w-full flex-1 min-h-0 overflow-hidden">
          
          {/* Thẻ Bento 1: Direct CX Contact Profile (7 Cột) */}
          <div 
            id="details-card-contact"
            className="md:col-span-7 bg-white/95 dark:bg-slate-900/80 border border-slate-200/80 dark:border-cyan-400/35 rounded-2xl p-3 sm:p-3.5 shadow-xs dark:shadow-[0_15px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(0,240,255,0.15)] hover:dark:border-cyan-400/60 transition-all duration-300 backdrop-blur-2xl relative overflow-hidden flex flex-col justify-between gap-2"
          >
            {/* Lớp nền ánh sáng gradient ngẫu nhiên */}
            <div className={cn("absolute -top-10 -right-10 w-36 h-36 rounded-full blur-2xl pointer-events-none -z-10 opacity-10 bg-current", randomColor.text)} />

            {/* Header Subcard Info */}
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/80 dark:border-slate-800/80 shrink-0">
              <div className="flex items-center gap-2">
                <UserCheck className={cn("w-4 h-4 shrink-0", randomColor.text)} />
                <h3 className={cn("text-xs sm:text-sm font-black tracking-wide", randomColor.text)}>
                  {isVi ? "Kênh liên hệ chính" : "Direct CX contact details"}
                </h3>
              </div>

              <span className={cn("px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-wide uppercase shrink-0 border", randomColor.badgeBg, randomColor.badgeText, randomColor.badgeBorder)}>
                CX Profile
              </span>
            </div>

            {/* Profile Summary Box */}
            <div className="py-2 px-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 flex items-center justify-between gap-2.5 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 font-black text-xs border border-blue-500/20 shadow-2xs">
                  CX
                </div>
                <div className="min-w-0">
                  <span className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm block truncate">
                    Nguyễn Hùng Thái
                  </span>
                  <span className="text-[11px] text-blue-600 dark:text-cyan-400 font-bold block truncate">
                    Trưởng phòng CSKH (Customer Service Manager)
                  </span>
                </div>
              </div>
              <div className="hidden sm:flex flex-col items-end text-right shrink-0">
                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-600 dark:text-slate-300">
                  <MapPin className="w-3 h-3 text-indigo-500" />
                  <span>TP.HCM & Tiền Giang</span>
                </div>
                <span className="text-[9px] text-slate-400 dark:text-slate-500">Việt Nam</span>
              </div>
            </div>

            {/* 4 Contact Channels Grid (2x2 Grid trên desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1 min-h-0">
              {/* Phone / Zalo */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/50 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 block leading-tight">
                      {isVi ? "Hotline / Zalo" : "Hotline / Zalo"}
                    </span>
                    <a 
                      href={zaloUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-black text-slate-900 dark:text-white text-xs hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors block tracking-wide truncate"
                    >
                      {formattedPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="p-1.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-slate-700 dark:text-slate-200 border border-emerald-200 dark:border-emerald-800 transition-all cursor-pointer shadow-xs active:scale-95"
                    title={isVi ? "Sao chép số" : "Copy"}
                  >
                    {copiedPhone ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                  <a
                    href={`tel:${phoneNum}`}
                    className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-xs active:scale-95"
                    title={isVi ? "Gọi điện" : "Call"}
                  >
                    <Send className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800/50 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-blue-800 dark:text-blue-300 block leading-tight">
                      Email
                    </span>
                    <a 
                      href={`mailto:${emailAddr}`}
                      className="font-extrabold text-slate-900 dark:text-white text-[11px] hover:text-blue-600 dark:hover:text-blue-400 transition-colors block truncate"
                    >
                      hungthai84@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-slate-700 dark:text-slate-200 border border-blue-200 dark:border-blue-800 transition-all cursor-pointer shadow-xs active:scale-95"
                    title={isVi ? "Sao chép" : "Copy"}
                  >
                    {copiedEmail ? <Check className="w-3 h-3 text-blue-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                  <a
                    href={`mailto:${emailAddr}`}
                    className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-xs active:scale-95"
                    title={isVi ? "Gửi mail" : "Send mail"}
                  >
                    <Send className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Website */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-cyan-50/80 dark:bg-cyan-950/30 border border-cyan-200/80 dark:border-cyan-800/50 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-cyan-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Globe className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-cyan-800 dark:text-cyan-300 block leading-tight">
                      Website
                    </span>
                    <a 
                      href={websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-extrabold text-slate-900 dark:text-white text-[11px] hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors block truncate"
                    >
                      powerservice.one
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyWebsite}
                    className="p-1.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-cyan-100 dark:hover:bg-cyan-900/50 text-slate-700 dark:text-slate-200 border border-cyan-200 dark:border-cyan-800 transition-all cursor-pointer shadow-xs active:scale-95"
                    title={isVi ? "Sao chép" : "Copy"}
                  >
                    {copiedWebsite ? <Check className="w-3 h-3 text-cyan-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                  <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white transition-all shadow-xs active:scale-95"
                    title={isVi ? "Mở web" : "Open"}
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-sky-50/80 dark:bg-sky-950/30 border border-sky-200/80 dark:border-sky-800/50 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Linkedin className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-sky-800 dark:text-sky-300 block leading-tight">
                      LinkedIn
                    </span>
                    <a 
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-extrabold text-slate-900 dark:text-white text-[11px] hover:text-sky-600 dark:hover:text-sky-400 transition-colors block truncate"
                    >
                      in/hungthai84
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyLinkedIn}
                    className="p-1.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-sky-100 dark:hover:bg-sky-900/50 text-slate-700 dark:text-slate-200 border border-sky-200 dark:border-sky-800 transition-all cursor-pointer shadow-xs active:scale-95"
                    title={isVi ? "Sao chép" : "Copy"}
                  >
                    {copiedLinkedIn ? <Check className="w-3 h-3 text-sky-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-xs active:scale-95"
                    title={isVi ? "Mở LinkedIn" : "Open"}
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Cột Phụ: Cụm Thẻ Zalo QR & Cam kết SLA (5 Cột) */}
          <div className="md:col-span-5 flex flex-col gap-2 sm:gap-2.5 justify-between">
            
            {/* Thẻ Bento 2: Standalone Zalo Quick Connect & QR Code Card */}
            <div 
              id="zalo-qr-card-contact"
              className="bg-white/95 dark:bg-slate-900/80 border border-slate-200/80 dark:border-teal-400/35 rounded-2xl p-3 sm:p-3.5 shadow-xs dark:shadow-[0_15px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(20,184,166,0.2)] hover:dark:border-teal-400/60 transition-all duration-300 backdrop-blur-2xl flex flex-col justify-between gap-2 flex-1 min-h-0"
            >
              {/* Header Card QR Zalo */}
              <div className="w-full flex items-center justify-between gap-2 pb-1.5 border-b border-teal-200/60 dark:border-teal-800/60 shrink-0">
                <div className="flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                  <h3 className="text-xs sm:text-sm font-black text-teal-600 dark:text-teal-400 tracking-wide">
                    {isVi ? "Mã QR Zalo kết nối nhanh" : "Zalo quick connect QR code"}
                  </h3>
                </div>

                <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/60 shrink-0">
                  Official Zalo
                </span>
              </div>

              {/* Body: Hiển thị QR Code trung tâm */}
              <div className="bg-slate-50 dark:bg-slate-950/80 p-2 rounded-xl border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-center gap-3 shadow-inner shrink-0">
                <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white p-1 shadow-xs shrink-0">
                  <img 
                    src={qrCodeUrl} 
                    alt="Zalo QR Code 0909097882" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="space-y-0.5 min-w-0 text-left">
                  <span className="text-xs font-black text-blue-600 dark:text-blue-400 block tracking-wide truncate">
                    Zalo: {formattedPhone}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-400 block leading-tight">
                    {isVi ? "Quét mã để nhắn tin & trao đổi trực tiếp" : "Scan to chat directly"}
                  </span>
                </div>
              </div>

              {/* Hàng Nút Hành Động */}
              <div className="grid grid-cols-2 gap-2 pt-0.5 shrink-0">
                <a
                  href={zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-[11px] flex items-center justify-center gap-1 shadow-xs transition-all active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span className="truncate">{isVi ? "Chat Zalo" : "Chat Zalo"}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyZaloLink}
                  className="py-1.5 px-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-extrabold text-[11px] border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer shadow-2xs"
                >
                  {copiedZaloLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span className="text-emerald-600 dark:text-emerald-400 truncate">{isVi ? "Đã chép!" : "Copied!"}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{isVi ? "Chép link" : "Copy link"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Thẻ Bento 3: Quick Metric SLA & Professional Commitment Box */}
            <div className="grid grid-cols-2 gap-2 shrink-0">
              <div className="p-2 sm:p-2.5 rounded-xl bg-white/90 dark:bg-slate-900/80 border border-slate-200/80 dark:border-emerald-400/30 shadow-2xs flex flex-col justify-between backdrop-blur-xl">
                <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  <Clock className="w-3 h-3 shrink-0" />
                  <span className="truncate">{isVi ? "Phản hồi" : "SLA"}</span>
                </div>
                <div className="mt-0.5">
                  <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">&lt; 15 {isVi ? "Phút" : "Mins"}</span>
                  <p className="text-[9px] text-slate-500 dark:text-slate-400 truncate leading-tight">{isVi ? "Hotline & Zalo" : "Hotline & Zalo"}</p>
                </div>
              </div>

              <div className="p-2 sm:p-2.5 rounded-xl bg-white/90 dark:bg-slate-900/80 border border-slate-200/80 dark:border-blue-400/30 shadow-2xs flex flex-col justify-between backdrop-blur-xl">
                <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  <ShieldCheck className="w-3 h-3 shrink-0" />
                  <span className="truncate">{isVi ? "Bảo mật" : "Privacy"}</span>
                </div>
                <div className="mt-0.5">
                  <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">100% {isVi ? "Bảo mật" : "Confidential"}</span>
                  <p className="text-[9px] text-slate-500 dark:text-slate-400 truncate leading-tight">{isVi ? "Trao đổi chuyên môn" : "Interviews & Talks"}</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact;
