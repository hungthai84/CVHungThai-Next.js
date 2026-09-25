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
  Linkedin,
  MessageSquare,
  FileText,
  User,
  AtSign,
  AlertCircle
} from "lucide-react";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { playUiSound } from "../lib/sound";
import { cn } from "../lib/utils";
import { PageCardHeader } from "./PageCardHeader";
import { motion, AnimatePresence } from "motion/react";

export function Contact() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isVi = lang === "vi";

  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedZaloLink, setCopiedZaloLink] = useState(false);
  const [copiedWebsite, setCopiedWebsite] = useState(false);
  const [copiedLinkedIn, setCopiedLinkedIn] = useState(false);

  // Email Form State
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);
  const [copiedFormContent, setCopiedFormContent] = useState(false);

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
          setSubject(`Trao đổi về kỹ năng: ${storedSkill}`);
        }
      } catch {}
    };
    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const phoneNum = "0909097882";
  const formattedPhone = "0909 097 882";
  const zaloUrl = "https://zalo.me/0909097882";
  const emailAddr = "hungthai84@gmail.com";
  const websiteUrl = "https://nguyenhungthai.powerservice.one/";
  const linkedinUrl = "https://www.linkedin.com/in/hungthai84/";
  const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://zalo.me/0909097882";

  const quickTopics = [
    { id: "cs_management", labelVi: "Hợp tác & Vận hành CSKH", labelEn: "CS Management & Operations", subVi: "Trao đổi về Quản lý / Vận hành Trung tâm CSKH" },
    { id: "career", labelVi: "Cơ hội Nghề nghiệp / Tuyển dụng", labelEn: "Career / Recruitment", subVi: "Thư mời phỏng vấn & Cơ hội Hợp tác Nhân sự" },
    { id: "crm_consulting", labelVi: "Tư vấn CRM & Chuyển đổi số", labelEn: "CRM & Digital Transformation", subVi: "Tư vấn Triển khai Hệ thống CRM Omni & AI Chatbot" },
    { id: "networking", labelVi: "Kết nối Chuyên môn", labelEn: "Professional Networking", subVi: "Giao lưu & Chia sẻ Kinh nghiệm Ngành CX" }
  ];

  const handleSelectTopic = (topic: typeof quickTopics[0]) => {
    try { playUiSound("click"); } catch {}
    setSelectedTopic(topic.id);
    setSubject(isVi ? topic.subVi : topic.labelEn);
  };

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

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!senderName.trim()) {
      setFormError(isVi ? "Vui lòng nhập họ tên hoặc tên tổ chức của bạn." : "Please enter your name or company.");
      return;
    }
    if (!senderEmail.trim() || !senderEmail.includes("@")) {
      setFormError(isVi ? "Vui lòng nhập địa chỉ email hợp lệ." : "Please enter a valid email address.");
      return;
    }
    if (!message.trim()) {
      setFormError(isVi ? "Vui lòng nhập nội dung tin nhắn gửi đến tôi." : "Please enter your message content.");
      return;
    }

    try { playUiSound("click"); } catch {}

    const emailSubject = encodeURIComponent(subject.trim() || `Tin nhắn từ ${senderName} qua Portfolio`);
    const emailBody = encodeURIComponent(
      `Kính gửi anh Nguyễn Hùng Thái,\n\n` +
      `Tôi là: ${senderName}\n` +
      `Email liên hệ: ${senderEmail}\n` +
      (senderPhone ? `Số điện thoại / Zalo: ${senderPhone}\n` : "") +
      `\nNội dung tin nhắn:\n${message}\n\n` +
      `--\nThư được gửi từ cổng thông tin cá nhân: https://nguyenhungthai.powerservice.one/`
    );

    const mailtoUrl = `mailto:${emailAddr}?subject=${emailSubject}&body=${emailBody}`;
    window.location.href = mailtoUrl;

    setFormSuccess(true);
  };

  const handleCopyEmailContent = () => {
    const textContent = 
      `Kính gửi anh Nguyễn Hùng Thái,\n\n` +
      `Họ tên người gửi: ${senderName || "Người liên hệ"}\n` +
      `Email: ${senderEmail || "Chưa cung cấp"}\n` +
      (senderPhone ? `Số điện thoại: ${senderPhone}\n` : "") +
      `Tiêu đề: ${subject || "Liên hệ hợp tác"}\n\n` +
      `Nội dung:\n${message}\n\n` +
      `Gửi đến: ${emailAddr}`;

    navigator.clipboard.writeText(textContent);
    setCopiedFormContent(true);
    setTimeout(() => setCopiedFormContent(false), 3000);
  };

  const handleResetForm = () => {
    setSenderName("");
    setSenderEmail("");
    setSenderPhone("");
    setSubject("");
    setMessage("");
    setSelectedTopic("");
    setFormError(null);
    setFormSuccess(false);
  };

  return (
    <section 
      id="contact" 
      className="relative w-full min-h-full flex flex-col gap-5 p-3 xs:p-3.5 sm:p-4.5 md:p-6 lg:p-8 font-sans select-none"
    >
      <div 
        id="info-card-contact" 
        className="w-full max-w-7xl mx-auto flex-1 flex flex-col gap-5 relative z-10"
      >
        {selectedSkillTopic && (
          <div className="w-full py-2 px-3.5 rounded-xl bg-gradient-to-r from-purple-500/15 via-indigo-500/15 to-blue-500/15 border border-purple-500/30 flex items-center justify-between gap-2 text-xs font-bold text-purple-900 dark:text-purple-200 shadow-2xs shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="p-1.5 rounded-lg bg-purple-600 text-white shadow-xs shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              <span className="truncate">
                {isVi ? "Chuyển tiếp từ Kỹ năng:" : "Forwarded from Skill Matrix:"}{" "}
                <span className="font-black underline decoration-purple-500 decoration-1">{selectedSkillTopic}</span>
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem("contact_selected_skill_topic");
                setSelectedSkillTopic(null);
              }}
              className="px-2.5 py-1 rounded-md bg-purple-200/80 dark:bg-purple-900/60 hover:bg-purple-300 dark:hover:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0"
              title="Đóng"
            >
              <X className="w-3.5 h-3.5" />
              <span>{isVi ? "Đóng" : "Close"}</span>
            </button>
          </div>
        )}

        {/* Header Card Liên hệ */}
        <PageCardHeader pageId="contact">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-5 bg-emerald-600 dark:bg-emerald-400 rounded-full shrink-0" />
            <span className="text-caption font-semibold font-mono text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30 shadow-2xs inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>{isVi ? "Trực tuyến 24/7" : "Active 24/7"}</span>
            </span>
          </div>
        </PageCardHeader>

        {/* Main Grid: Bento Contact Channels + Interactive Direct Email Compose Form */}
        {/* [MẪU ÁP DỤNG 16: ĐỒNG BỘ CÙNG GIAO DIỆN ĐANG CHỌN] */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch w-full">
          
          {/* Cột 1: Thông tin kênh liên lạc trực tiếp & Zalo QR (5 Cột) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Card Profile CX: Outer r=28px, p=20px -> Inner r=8px */}
            <div 
              id="details-card-contact"
              style={{ borderRadius: "28px" }}
              className="glass-card backdrop-blur-2xl bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 p-5 shadow-md dark:shadow-[0_0_15px_rgba(16,185,129,0.15)] rounded-[28px] flex flex-col justify-between gap-3 text-left relative overflow-hidden transition-all duration-300"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {isVi ? "Kênh liên hệ chính thức" : "Official Direct Channels"}
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-[6px] text-[10px] font-black tracking-wider uppercase bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
                  CX Manager
                </span>
              </div>

              {/* Profile Overview: r_inner = 28 - 20 = 8px */}
              <div className="py-2.5 px-3.5 rounded-[8px] bg-slate-100/90 dark:bg-slate-800/70 border border-slate-200/90 dark:border-slate-700/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-[4px] bg-emerald-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
                    TH
                  </div>
                  <div className="min-w-0">
                    <span className="font-extrabold text-slate-900 dark:text-white text-sm block truncate">
                      Nguyễn Hùng Thái
                    </span>
                    <span className="text-2xs text-emerald-600 dark:text-emerald-400 font-bold block truncate">
                      Customer Service Manager (22+ Years)
                    </span>
                  </div>
                </div>
                <div className="hidden sm:flex flex-col items-end text-right shrink-0">
                  <div className="flex items-center gap-1 text-3xs font-bold text-slate-600 dark:text-slate-300">
                    <MapPin className="w-3 h-3 text-emerald-500" />
                    <span>TP.HCM & Tiền Giang</span>
                  </div>
                  <span className="text-3xs text-slate-400">Việt Nam</span>
                </div>
              </div>

              {/* 4 Contact Channels: r_inner = 8px */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {/* Phone / Zalo */}
                <div className="p-2.5 rounded-[8px] bg-emerald-50/90 dark:bg-emerald-950/30 border border-emerald-200/90 dark:border-emerald-800/60 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-[4px] bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-3xs font-bold text-emerald-800 dark:text-emerald-300 block leading-tight">
                        Hotline / Zalo
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

                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="p-1.5 rounded-[4px] bg-white dark:bg-slate-900 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-slate-700 dark:text-slate-200 border border-emerald-200 dark:border-emerald-800 transition-all cursor-pointer shadow-xs"
                    title={isVi ? "Sao chép số" : "Copy"}
                  >
                    {copiedPhone ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>

                {/* Email */}
                <div className="p-2.5 rounded-[8px] bg-blue-50/90 dark:bg-blue-950/30 border border-blue-200/90 dark:border-blue-800/60 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-[4px] bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-3xs font-bold text-blue-800 dark:text-blue-300 block leading-tight">
                        Email
                      </span>
                      <span className="font-extrabold text-slate-900 dark:text-white text-2xs block truncate">
                        {emailAddr}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-[4px] bg-white dark:bg-slate-900 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-slate-700 dark:text-slate-200 border border-blue-200 dark:border-blue-800 transition-all cursor-pointer shadow-xs"
                    title={isVi ? "Sao chép" : "Copy"}
                  >
                    {copiedEmail ? <Check className="w-3 h-3 text-blue-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>

                {/* Website */}
                <div className="p-2.5 rounded-[8px] bg-cyan-50/90 dark:bg-cyan-950/30 border border-cyan-200/90 dark:border-cyan-800/60 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-[4px] bg-cyan-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Globe className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-3xs font-bold text-cyan-800 dark:text-cyan-300 block leading-tight">
                        Website
                      </span>
                      <a 
                        href={websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-extrabold text-slate-900 dark:text-white text-2xs hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors block truncate"
                      >
                        powerservice.one
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyWebsite}
                    className="p-1.5 rounded-[4px] bg-white dark:bg-slate-900 hover:bg-cyan-100 dark:hover:bg-cyan-900/50 text-slate-700 dark:text-slate-200 border border-cyan-200 dark:border-cyan-800 transition-all cursor-pointer shadow-xs"
                    title={isVi ? "Sao chép" : "Copy"}
                  >
                    {copiedWebsite ? <Check className="w-3 h-3 text-cyan-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>

                {/* LinkedIn */}
                <div className="p-2.5 rounded-[8px] bg-sky-50/90 dark:bg-sky-950/30 border border-sky-200/90 dark:border-sky-800/60 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-[4px] bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Linkedin className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-3xs font-bold text-sky-800 dark:text-sky-300 block leading-tight">
                        LinkedIn
                      </span>
                      <a 
                        href={linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-extrabold text-slate-900 dark:text-white text-2xs hover:text-sky-600 dark:hover:text-sky-400 transition-colors block truncate"
                      >
                        in/hungthai84
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyLinkedIn}
                    className="p-1.5 rounded-[4px] bg-white dark:bg-slate-900 hover:bg-sky-100 dark:hover:bg-sky-900/50 text-slate-700 dark:text-slate-200 border border-sky-200 dark:border-sky-800 transition-all cursor-pointer shadow-xs"
                    title={isVi ? "Sao chép" : "Copy"}
                  >
                    {copiedLinkedIn ? <Check className="w-3 h-3 text-sky-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Zalo QR Code Card: Outer r=28px, p=20px -> Inner r=8px */}
            <div 
              id="zalo-qr-card-contact"
              style={{ borderRadius: "28px" }}
              className="glass-card backdrop-blur-2xl bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-teal-500/30 p-5 shadow-md dark:shadow-[0_0_15px_rgba(20,184,166,0.15)] rounded-[28px] flex flex-col justify-between gap-3 text-left transition-all duration-300"
            >
              <div className="flex items-center justify-between pb-2 border-b border-teal-200/60 dark:border-teal-800/60">
                <div className="flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <h3 className="text-xs sm:text-sm font-black text-teal-600 dark:text-teal-400 tracking-wide">
                    {isVi ? "Quét mã QR Zalo kết nối nhanh" : "Zalo QR Quick Connect"}
                  </h3>
                </div>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-[6px] bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200/60">
                  Official Zalo
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950/80 p-2.5 rounded-[8px] border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-center gap-3.5 shadow-inner">
                <div className="w-20 h-20 rounded-[4px] overflow-hidden border border-slate-200 dark:border-slate-700 bg-white p-1 shadow-xs shrink-0">
                  <img 
                    src={qrCodeUrl} 
                    alt="Zalo QR Code 0909097882" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="space-y-1 min-w-0 text-left">
                  <span className="text-xs font-black text-blue-600 dark:text-blue-400 block tracking-wide truncate">
                    Zalo: {formattedPhone}
                  </span>
                  <span className="text-3xs font-semibold text-slate-600 dark:text-slate-400 block leading-tight">
                    {isVi ? "Quét mã để nhắn tin & trao đổi công việc trực tiếp" : "Scan to chat directly on Zalo"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-0.5">
                <a
                  href={zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-3 rounded-[8px] bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat Zalo</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyZaloLink}
                  className="py-1.5 px-3 rounded-[8px] bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-extrabold text-xs border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                >
                  {copiedZaloLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">{isVi ? "Đã chép!" : "Copied!"}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isVi ? "Chép link" : "Copy Link"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Metric SLA: Outer r=20px, p=14px -> Inner r=6px */}
            <div className="grid grid-cols-2 gap-2">
              <div 
                style={{ borderRadius: "20px" }}
                className="p-3.5 rounded-[20px] bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-emerald-500/30 shadow-2xs dark:shadow-[0_0_12px_rgba(16,185,129,0.12)] flex flex-col justify-between"
              >
                <div className="flex items-center gap-1 text-3xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                  <Clock className="w-3 h-3" />
                  <span>{isVi ? "Phản hồi" : "SLA"}</span>
                </div>
                <div className="mt-1">
                  <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">&lt; 15 {isVi ? "Phút" : "Mins"}</span>
                  <p className="text-3xs text-slate-500 dark:text-slate-400 truncate">Hotline & Zalo 24/7</p>
                </div>
              </div>

              <div 
                style={{ borderRadius: "20px" }}
                className="p-3.5 rounded-[20px] bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-blue-500/30 shadow-2xs dark:shadow-[0_0_12px_rgba(59,130,246,0.12)] flex flex-col justify-between"
              >
                <div className="flex items-center gap-1 text-3xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{isVi ? "Bảo mật" : "Privacy"}</span>
                </div>
                <div className="mt-1">
                  <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">100% {isVi ? "Bảo mật" : "Secure"}</span>
                  <p className="text-3xs text-slate-500 dark:text-slate-400 truncate">{isVi ? "Trao đổi chuyên môn" : "Confidential Talks"}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Cột 2: Form Nhập & Gửi Email Đến Tôi (7 Cột) */}
          {/* Outer r=28px, p=20px -> Inner r=8px */}
          <div className="lg:col-span-7 flex flex-col">
            <div 
              id="email-send-form-card"
              style={{ borderRadius: "28px" }}
              className="glass-card backdrop-blur-2xl bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-blue-500/30 p-5 sm:p-6 shadow-md dark:shadow-[0_0_18px_rgba(59,130,246,0.15)] hover:shadow-xl transition-all duration-300 rounded-[28px] flex flex-col justify-between gap-4 text-left h-full"
            >
              {/* Header Form Gửi Email */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-[8px] bg-blue-600 text-white flex items-center justify-center shadow-xs">
                    <Send className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                      {isVi ? "Gửi email trực tiếp đến tôi" : "Send direct email to me"}
                    </h3>
                    <p className="text-2xs text-slate-500 dark:text-slate-400">
                      {isVi 
                        ? `Gửi đến: ${emailAddr} • Nhận phản hồi nhanh chóng`
                        : `Sending to: ${emailAddr} • Rapid feedback response`}
                    </p>
                  </div>
                </div>

                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-[8px] text-caption font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  <span>Direct Mail</span>
                </span>
              </div>

              {/* Quick Topic Selector Chips: r_inner = 8px */}
              <div className="space-y-1.5">
                <label className="text-caption font-bold text-slate-700 dark:text-slate-300 block">
                  {isVi ? "1. Chọn nhanh chủ đề quan tâm:" : "1. Quick topic select:"}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {quickTopics.map((topic) => {
                    const isSelected = selectedTopic === topic.id;
                    return (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => handleSelectTopic(topic)}
                        className={`p-2 rounded-[8px] text-2xs font-bold text-left transition-all border cursor-pointer flex flex-col justify-between gap-1 ${
                          isSelected
                            ? "bg-blue-600 text-white border-blue-600 shadow-xs scale-102"
                            : "bg-slate-100/90 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600"
                        }`}
                      >
                        <span className="line-clamp-2 leading-tight">
                          {isVi ? topic.labelVi : topic.labelEn}
                        </span>
                        {isSelected && (
                          <Check className="w-3 h-3 text-white self-end" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Fields: r_inner = 8px */}
              <form onSubmit={handleSendEmail} className="space-y-3 flex-1 flex flex-col justify-between">
                
                {/* Row 1: Sender Name & Sender Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1 text-left">
                    <label className="text-caption font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{isVi ? "Họ và tên của bạn *" : "Your full name *"}</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder={isVi ? "Nguyễn Văn A / Công ty ABC..." : "e.g. John Doe / ABC Corp"}
                      className="w-full px-3.5 py-2 text-xs bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-700 rounded-[8px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-caption font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <AtSign className="w-3.5 h-3.5 text-slate-400" />
                      <span>{isVi ? "Email liên hệ *" : "Your Email address *"}</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full px-3.5 py-2 text-xs bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-700 rounded-[8px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                  </div>
                </div>

                {/* Row 2: Sender Phone & Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-5 space-y-1 text-left">
                    <label className="text-caption font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{isVi ? "Số điện thoại / Zalo" : "Phone / Zalo (optional)"}</span>
                    </label>
                    <input
                      type="tel"
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      placeholder={isVi ? "09xx xxx xxx (tùy chọn)" : "Your phone number"}
                      className="w-full px-3.5 py-2 text-xs bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-700 rounded-[8px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                  </div>

                  <div className="sm:col-span-7 space-y-1 text-left">
                    <label className="text-caption font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      <span>{isVi ? "Tiêu đề email" : "Email Subject"}</span>
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder={isVi ? "Tiêu đề thư gửi đến anh Thái..." : "Subject of your message..."}
                      className="w-full px-3.5 py-2 text-xs bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-700 rounded-[8px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                  </div>
                </div>

                {/* Row 3: Message Textarea: r_inner = 8px */}
                <div className="space-y-1 text-left">
                  <label className="text-caption font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                    <span>{isVi ? "Nội dung tin nhắn *" : "Message content *"}</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={isVi 
                      ? "Xin chào anh Thái, tôi muốn trao đổi về..." 
                      : "Hello Mr. Thai, I would like to discuss..."}
                    className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-700 rounded-[8px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                  />
                </div>

                {/* Form Error Message */}
                {formError && (
                  <div className="p-2.5 rounded-[8px] bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Form Success Banner */}
                {formSuccess && (
                  <div className="p-3 rounded-[8px] bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{isVi ? "Đã mở trình gửi email thành công! Bạn cũng có thể sao chép nội dung bên dưới:" : "Email client opened! You can also copy content below:"}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={handleCopyEmailContent}
                        className="px-2.5 py-1 rounded-[8px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-2xs cursor-pointer shadow-xs"
                      >
                        {copiedFormContent ? (isVi ? "Đã chép!" : "Copied!") : (isVi ? "Chép nội dung" : "Copy Content")}
                      </button>
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="px-2.5 py-1 rounded-[8px] bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-2xs cursor-pointer"
                      >
                        {isVi ? "Soạn thư mới" : "New Message"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Buttons Row: r_inner = 8px */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-[8px] bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isVi ? "Gửi Email Ngay" : "Send Email Now"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCopyEmailContent}
                      className="px-3.5 py-2.5 rounded-[8px] bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      title="Sao chép nội dung thư"
                    >
                      {copiedFormContent ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedFormContent ? (isVi ? "Đã sao chép!" : "Copied!") : (isVi ? "Sao chép" : "Copy")}</span>
                    </button>
                  </div>

                  <span className="text-3xs text-slate-400 dark:text-slate-500 italic">
                    {isVi ? "* Mở ứng dụng email mặc định hoặc webmail để gửi" : "* Triggers default email application"}
                  </span>
                </div>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Contact;
