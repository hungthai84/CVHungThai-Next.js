import React, { useState } from "react";
import { 
  User, 
  Mail, 
  Compass, 
  Phone, 
  MessageSquare, 
  Users, 
  Lock, 
  Send,
  Heart,
  Zap,
  ArrowRight
} from "lucide-react";
import { useLanguage } from "../i18n";
import { playUiSound } from "../lib/sound";

export function Contact() {
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [activeTopic, setActiveTopic] = useState("💬 General");
  const [formSuccess, setFormSuccess] = useState(false);

  // Topics list matching specification
  const topics = [
    { id: "general", label: "💬 General", labelVi: "💬 Chung" },
    { id: "design", label: "🎨 Design help", labelVi: "🎨 Thiết kế" },
    { id: "partnership", label: "🤝 Partnership", labelVi: "🤝 Hợp tác" },
    { id: "bug", label: "🐞 Bug report", labelVi: "🐞 Báo lỗi", isCoral: true }
  ];

  const handleTopicClick = (topicLabel: string) => {
    try { playUiSound("click"); } catch {}
    setActiveTopic(topicLabel);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try { playUiSound("success"); } catch {}

    const targetEmail = "hungthai84@gmail.com";
    const emailSubject = encodeURIComponent(`[Loop Contact - ${activeTopic}] Message from ${fullName || "User"}`);
    const emailBody = encodeURIComponent(
      `Hi Nguyễn Hùng Thái,\n\n` +
      `My Name: ${fullName}\n` +
      `My Email: ${email}\n` +
      `Topic: ${activeTopic}\n\n` +
      `Message:\n${message}\n\n` +
      `--\nSent from Loop Design Platform`
    );

    window.location.href = `mailto:${targetEmail}?subject=${emailSubject}&body=${emailBody}`;
    setFormSuccess(true);
  };

  return (
    <div className="w-full bg-[#f8fafc] text-[#082f49] font-sans antialiased overflow-x-hidden min-h-screen relative pb-12">
      {/* Scoped CSS animations for the interactive floating illustration */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes floatA {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(-14px); }
          50% { transform: translateY(0); }
        }
        @keyframes floatC {
          0%, 100% { transform: translateY(-6px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(4deg); }
        }
        .float-a { animation: floatA 6s ease-in-out infinite; }
        .float-b { animation: floatB 7s ease-in-out infinite; }
        .float-c { animation: floatC 8s ease-in-out infinite; }
        .grain {
          background-image: radial-gradient(rgba(14, 165, 233, 0.12) 1.5px, transparent 1.5px);
          background-size: 24px 24px;
        }
      `}} />

      {/* ========================================================================= */}
      {/* 1. STICKY BLURRED CLOUD NAV                                               */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 w-full bg-[#f8fafc]/80 backdrop-blur-md border-b border-sky-100/60 transition-all duration-300">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6 lg:px-8">
          {/* Logo link */}
          <a href="#home" className="flex items-center gap-2.5 group shrink-0 select-none">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-[#38bdf8] to-[#0369a1] text-white shadow-md transition-transform duration-300 group-hover:scale-105">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.4" 
                strokeLinecap="round" 
                className="w-5.5 h-5.5 transition-transform duration-500 ease-out group-hover:rotate-[366deg]"
              >
                <path d="M7 9C4.24 9 2 11.24 2 14c0 2.76 2.24 5 5 5c3.21 0 5.25-3.33 7-6c1.75-2.67 3.79-6 7-6c2.76 0 5 2.24 5 5c0 2.76-2.24 5-5 5c-3.21 0-5.25-3.33-7-6c-1.75-2.67-3.79-6-7-6Z" />
              </svg>
            </div>
            <span className="text-[22px] font-black tracking-tight text-[#082f49] font-play transition-colors duration-300 group-hover:text-[#0369a1]">
              Loop
            </span>
          </a>

          {/* Navigation links (hidden below md) */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-bold text-slate-500">
            <a href="#features" className="hover:text-[#0369a1] transition-colors">{isVi ? "Tính năng" : "Features"}</a>
            <a href="#templates" className="hover:text-[#0369a1] transition-colors">{isVi ? "Giao diện" : "Templates"}</a>
            <a href="#pricing" className="hover:text-[#0369a1] transition-colors">{isVi ? "Bảng giá" : "Pricing"}</a>
            <a href="#contact" className="text-[#082f49] font-extrabold">{isVi ? "Liên hệ" : "Contact"}</a>
          </nav>

          {/* Action buttons on right */}
          <div className="flex items-center gap-4">
            <a 
              href="#login" 
              className="hidden sm:inline-block text-[15px] font-extrabold text-[#082f49] hover:text-[#0369a1] transition-colors"
            >
              {isVi ? "Đăng nhập" : "Log in"}
            </a>
            <a 
              href="#start" 
              className="inline-flex items-center gap-1.5 rounded-full bg-[#082f49] px-5 py-2.5 text-[15px] font-extrabold text-white shadow-md ring-2 ring-rose-500/10 hover:bg-[#0369a1] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>{isVi ? "Thử miễn phí" : "Start free"}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. FULL-BLEED HERO BAND + ORBS                                            */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden grain pt-16 pb-20 text-center select-none bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9]">
        {/* Three blurred background decorative orbs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-sky-200/60 blur-3xl" />
        <div className="pointer-events-none absolute -top-10 right-0 h-72 w-72 rounded-full bg-rose-200/50 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 lg:px-8 flex flex-col items-center">
          {/* Status response pill */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[13px] font-extrabold text-[#082f49] shadow-sm ring-1 ring-sky-100">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
            <span>{isVi ? "Chúng tôi thường trả lời trong vài giờ" : "We usually reply within a few hours"}</span>
          </div>

          {/* Hero title */}
          <h1 className="mt-6 text-[40px] font-black leading-[1.08] tracking-tight text-[#082f49] sm:text-[52px] font-play max-w-3xl">
            {isVi ? (
              <>Hãy thảo luận về <span className="text-[#0369a1]">bất cứ điều gì</span> bạn đang <span className="text-rose-500">kiến tạo</span></>
            ) : (
              <>Let's chat about <span className="text-[#0369a1]">anything</span> you're <span className="text-rose-500">building</span></>
            )}
          </h1>

          {/* Subtitle */}
          <p className="mt-4 mx-auto max-w-xl text-[17px] font-semibold text-slate-500 leading-relaxed">
            {isVi ? "Câu hỏi, phản hồi, hay ý tưởng dở dang lúc 2 giờ sáng. Chúng tôi luôn lắng nghe." : "Questions, feedback, a half-baked idea at 2am. We're all ears."}
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE CONTACT CARD SECTION (Centerpiece)                                 */}
      {/* ========================================================================= */}
      <section id="contact" className="relative -mt-4 pb-20 select-none">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="relative rounded-[36px] sm:rounded-[48px] bg-white shadow-xl ring-1 ring-sky-100/70 overflow-hidden">
            {/* Top gradient seam bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-sky-400 via-cyan-300 to-rose-400" />

            {/* Card Body */}
            <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16">
              
              {/* LEFT COLUMN: Copy + Illustration panel */}
              <div className="flex flex-col text-left justify-between h-full gap-8">
                
                {/* Title & description */}
                <div className="space-y-4">
                  <h2 className="text-[34px] font-black leading-[1.08] tracking-tight text-[#082f49] sm:text-[42px] font-play">
                    {isVi ? (
                      <>Chào bạn,<br />chúng tôi rất thân thiện</>
                    ) : (
                      <>Say hello,<br />we don't bite</>
                    )}
                  </h2>
                  <p className="text-[17px] font-semibold leading-relaxed text-slate-500">
                    {isVi ? (
                      <>Gặp rắc rối về thiết kế? Có ý tưởng táo bạo? Hay muốn bàn về giao diện? Hãy gửi thư cho chúng tôi, hoặc <a href="mailto:hello@loop.design" className="font-extrabold underline decoration-rose-500 decoration-2 underline-offset-4 hover:text-rose-700 text-rose-500">gửi email trực tiếp</a>. Người thật việc thật, cam kết!</>
                    ) : (
                      <>Stuck on a design? Got a wild idea? Just want to nerd out about UI? Drop us a line, or <a href="mailto:hello@loop.design" className="font-extrabold underline decoration-rose-500 decoration-2 underline-offset-4 hover:text-rose-700 text-rose-500">say hi on email</a> instead. Real humans, promise.</>
                    )}
                  </p>
                </div>

                {/* Hand-built Illustration Panel using HTML + CSS + SVGs */}
                <div className="relative rounded-[32px] sm:rounded-[36px] bg-gradient-to-br from-slate-50 to-sky-100/40 ring-1 ring-sky-100/70 px-7 pt-12 pb-6 overflow-hidden min-h-[220px] flex flex-col justify-end lg:mt-auto">
                  {/* (a) Coral Sun */}
                  <div className="absolute top-5 right-6 h-14 w-14 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 opacity-90 float-a shadow-md" />

                  {/* (b) Clouds */}
                  <svg className="absolute top-8 left-6 w-12 h-8 text-white opacity-40 float-b" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.36 10.04a6 6 0 0 0-11.11-1.5 4.5 4.5 0 0 0-3.75 4.46c0 .17.02.34.05.51a3.5 3.5 0 0 0 1.95 6.5h13a4 4 0 0 0 .5-7.97Z"/>
                  </svg>
                  <svg className="absolute top-16 right-16 w-10 h-6 text-white opacity-30 float-c" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.36 10.04a6 6 0 0 0-11.11-1.5 4.5 4.5 0 0 0-3.75 4.46c0 .17.02.34.05.51a3.5 3.5 0 0 0 1.95 6.5h13a4 4 0 0 0 .5-7.97Z"/>
                  </svg>

                  {/* (c) Channel Bubbles */}
                  <div className="flex items-end justify-center gap-4 mb-4 select-none relative z-10">
                    {/* Compass Bubble */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-sky-500 text-white flex items-center justify-center float-c shadow-md shrink-0">
                      <Compass className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    {/* Direct Mail Bubble */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#082f49] text-white flex items-center justify-center ring-4 ring-white float-a shadow-lg shrink-0">
                      <Mail className="w-9 h-9 sm:w-11 sm:h-11 text-sky-300" />
                    </div>
                    {/* Phone Bubble */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-rose-500 text-white flex items-center justify-center float-b shadow-md shrink-0">
                      <Phone className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                  </div>

                  {/* (d) Grass blades */}
                  <div className="flex items-end justify-center gap-1.5 h-10 w-full mb-1 select-none">
                    <div className="w-1.5 h-6 rounded-full bg-sky-300 opacity-60" />
                    <div className="w-1.5 h-8 rounded-full bg-rose-300 opacity-70" />
                    <div className="w-1.5 h-5 rounded-full bg-sky-400 opacity-50" />
                    <div className="w-1.5 h-10 rounded-full bg-rose-400 opacity-80" />
                    <div className="w-1.5 h-7 rounded-full bg-sky-300 opacity-65" />
                    <div className="w-1.5 h-9 rounded-full bg-rose-300 opacity-75" />
                  </div>

                  {/* (e) Horizon bar */}
                  <div className="h-2 w-full rounded-full bg-white/70" />
                </div>

                {/* Trust chips */}
                <div className="flex flex-wrap gap-x-6 gap-y-3 text-[14px] font-extrabold text-[#082f49] mt-2">
                  <div className="inline-flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0" />
                    <span>{isVi ? "Được tin dùng bởi 57k nhà sáng tạo" : "Loved by 57k makers"}</span>
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#0369a1] fill-[#0369a1] shrink-0" />
                    <span>{isVi ? "Phản hồi nhanh chóng, thân thiện" : "Fast, friendly replies"}</span>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: Form Field Stack */}
              <div className="flex flex-col gap-6">
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
                  
                  {/* Name field */}
                  <div className="text-left">
                    <label className="block text-[13px] font-black uppercase tracking-[0.12em] text-slate-500 mb-2">
                      {isVi ? "Họ và tên của bạn" : "Full name"}
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-500">
                        <User className="w-5 h-5" />
                      </div>
                      <input 
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Sky Walker"
                        className="w-full rounded-2xl bg-[#f8fafc] border-2 border-sky-100/70 pl-12 pr-4 py-4 text-[16px] font-bold text-[#082f49] placeholder:text-slate-400 focus:outline-none focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-400/15 transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Email field */}
                  <div className="text-left">
                    <label className="block text-[13px] font-black uppercase tracking-[0.12em] text-slate-500 mb-2">
                      {isVi ? "Địa chỉ Email" : "Email address"}
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-500">
                        <Mail className="w-5 h-5" />
                      </div>
                      <input 
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="hello@you.com"
                        className="w-full rounded-2xl bg-[#f8fafc] border-2 border-sky-100/70 pl-12 pr-4 py-4 text-[16px] font-bold text-[#082f49] placeholder:text-slate-400 focus:outline-none focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-400/15 transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Message field */}
                  <div className="text-left">
                    <label className="block text-[13px] font-black uppercase tracking-[0.12em] text-slate-500 mb-2">
                      {isVi ? "Bạn đang suy nghĩ gì?" : "What's on your mind?"}
                    </label>
                    <textarea 
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={isVi ? "Hãy chia sẻ mọi thứ với chúng tôi..." : "Tell us everything. The weirder the idea, the better."}
                      className="w-full rounded-2xl bg-[#f8fafc] border-2 border-sky-100/70 px-4 py-4 text-[16px] font-bold text-[#082f49] placeholder:text-slate-400 focus:outline-none focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-400/15 transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Topic Select Chips */}
                  <div className="flex flex-wrap gap-2.5 -mt-1 select-none">
                    {topics.map((t) => {
                      const isSelected = activeTopic === t.label;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => handleTopicClick(t.label)}
                          className={`rounded-full px-4 py-2 text-[13px] font-extrabold cursor-pointer transition-all duration-200 ${
                            isSelected
                              ? t.isCoral 
                                ? "bg-rose-500 text-white shadow-sm"
                                : "bg-sky-500 text-white shadow-sm"
                              : t.isCoral
                                ? "bg-rose-100/60 text-rose-950 hover:bg-rose-500 hover:text-white"
                                : "bg-sky-100/60 text-sky-950 hover:bg-sky-500 hover:text-white"
                          }`}
                        >
                          {isVi ? t.labelVi : t.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    className="group mt-1 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#0369a1] to-[#082f49] px-6 py-4 text-[17px] font-black text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                  >
                    <span>{isVi ? "Gửi thông điệp" : "Send message"}</span>
                    <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  {/* Privacy line */}
                  <div className="text-center inline-flex items-center justify-center gap-1.5 text-[13px] font-bold text-slate-500 select-none">
                    <Lock className="w-4 h-4 text-sky-400" />
                    <span>{isVi ? "Không bao giờ spam. Chúng tôi cũng ghét nó." : "No spam, ever. We hate it too."}</span>
                  </div>

                </form>

                {/* Simple form success notification banner */}
                {formSuccess && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-left animate-pulse">
                    {isVi ? "Ứng dụng Email của bạn đã được mở để gửi thông điệp!" : "Successfully opened your email client to send the message!"}
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* ========================================================================= */}
          {/* 4. THREE ALT-CONTACT CARDS                                                */}
          {/* ========================================================================= */}
          <div className="mt-12 grid sm:grid-cols-3 items-stretch gap-5 select-none">
            
            {/* Card 1: Email */}
            <div className="flex h-full flex-col rounded-[32px] bg-white p-6 ring-1 ring-sky-100/70 shadow-md hover:-translate-y-1 transition-all duration-200 text-left">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-50 text-[#0369a1] shadow-inner">
                <Mail className="w-5.5 h-5.5" />
              </div>
              <h3 className="mt-4 text-[17px] font-black text-[#082f49]">{isVi ? "Email trực tiếp" : "Email us"}</h3>
              <span className="mt-1 text-[14px] font-semibold text-slate-500">hello@loop.design</span>
            </div>

            {/* Card 2: Live Chat */}
            <div className="flex h-full flex-col rounded-[32px] bg-white p-6 ring-1 ring-sky-100/70 shadow-md hover:-translate-y-1 transition-all duration-200 text-left">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-50 text-rose-500 shadow-inner">
                <MessageSquare className="w-5.5 h-5.5" />
              </div>
              <h3 className="mt-4 text-[17px] font-black text-[#082f49]">{isVi ? "Hỗ trợ trực tuyến" : "Live chat"}</h3>
              <span className="mt-1 text-[14px] font-semibold text-slate-500">Mon to Fri, 9 to 6</span>
            </div>

            {/* Card 3: Community */}
            <div className="flex h-full flex-col rounded-[32px] bg-white p-6 ring-1 ring-sky-100/70 shadow-md hover:-translate-y-1 transition-all duration-200 text-left">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-50 text-[#0369a1] shadow-inner">
                <Users className="w-5.5 h-5.5" />
              </div>
              <h3 className="mt-4 text-[17px] font-black text-[#082f49]">{isVi ? "Cộng đồng" : "Community"}</h3>
              <span className="mt-1 text-[14px] font-semibold text-slate-500">Join 12k makers on Discord</span>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FULL-BLEED SKY-INK FOOTER                                              */}
      {/* ========================================================================= */}
      <footer className="bg-[#082f49] text-sky-100/90 w-full mt-12 py-10 relative z-10 select-none">
        <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-6 px-6 lg:px-8 text-center sm:text-left">
          {/* Logo brand info */}
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className="w-4.5 h-4.5">
                <path d="M7 9C4.24 9 2 11.24 2 14c0 2.76 2.24 5 5 5c3.21 0 5.25-3.33 7-6c1.75-2.67 3.79-6 7-6c2.76 0 5 2.24 5 5c0 2.76-2.24 5-5 5c-3.21 0-5.25-3.33-7-6c-1.75-2.67-3.79-6-7-6Z" />
              </svg>
            </div>
            <span className="text-[18px] font-black text-white tracking-tight font-play">
              Loop
            </span>
          </div>

          {/* Copyright content */}
          <div className="text-[14px] font-semibold inline-flex items-center gap-1.5 text-sky-200">
            <span>© 2026 Loop Design. Made with</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>for makers.</span>
          </div>

          {/* Social connections */}
          <div className="flex items-center gap-3 text-white/80">
            {/* Twitter/X */}
            <a href="#twitter" className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 hover:bg-white/20 hover:text-white transition-all duration-300">
              <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 3.778 8.502 12.54H16.17l-5.214-6.817L4.99 18.5H1.68l7.73-8.235L1.254 2.25H8.08l4.713 6.231zm-1.161 14.275h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            {/* GitHub */}
            <a href="#github" className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 hover:bg-white/20 hover:text-white transition-all duration-300">
              <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.51 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </a>
            {/* Discord */}
            <a href="#discord" className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 hover:bg-white/20 hover:text-white transition-all duration-300">
              <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.03c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.074 0 00-.079-.03A19.736 19.736 0 003.677 4.37a.07.069 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.072 0 00.031.057 19.9 19.9 0 005.993 3.03.078.077 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.873-.894.077.076 0 01-.008-.128c.126-.093.252-.19.372-.287a.075.072 0 01.077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.072 0 01.078.009c.12.099.246.195.373.289a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.075 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.077 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.058 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Contact;
