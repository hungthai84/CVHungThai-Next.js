import React, { useState } from "react";
import { 
  MailOpen, Send, Quote, Sparkles, CheckCircle2, 
  ArrowRight, Heart, ShieldCheck, TrendingUp, Award,
  Users, MessageSquare, FileText, PhoneCall
} from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../i18n";
import { PageCardHeader } from "./PageCardHeader";
import { IndustrialSubSection } from "./IndustrialStaggerContainer";

export default function OpenLetter() {
  const { lang } = useLanguage();
  const isVi = lang === "vi";
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("cskh.powerserviceone@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNavigate = (sectionId: string) => {
    window.dispatchEvent(new CustomEvent("app-navigate", { detail: sectionId }));
  };

  const pledges = [
    {
      icon: ShieldCheck,
      color: "from-blue-500 to-cyan-500",
      titleVi: "Chuẩn hóa & Tối ưu Vận hành",
      titleEn: "Standardization & Operational Excellence",
      descVi: "Xây dựng hệ thống quy trình CSKH bài bản, kiểm soát chất lượng QA/QC nghiêm ngặt và tối ưu hóa các chỉ số SLA, CSAT, FCR.",
      descEn: "Building structured CS workflow frameworks, rigorous QA/QC quality controls, and optimizing key SLA, CSAT, and FCR metrics."
    },
    {
      icon: Heart,
      color: "from-rose-500 to-amber-500",
      titleVi: "Lãnh đạo Phụng sự & Thấu cảm",
      titleEn: "Servant & Empathic Leadership",
      descVi: "Coi trọng yếu tố con người, tạo động lực thúc đẩy đội ngũ phát triển toàn diện, gắn kết bền vững và cống hiến hết mình.",
      descEn: "Valuing people as core assets, empowering team members for professional growth, high retention, and dedicated engagement."
    },
    {
      icon: TrendingUp,
      color: "from-emerald-500 to-teal-500",
      titleVi: "Chuyển đổi số & Tự động hóa",
      titleEn: "Digital Transformation & AI Automation",
      descVi: "Tích hợp AI Chatbot, Omni-channel Contact Center và phân tích dữ liệu thời gian thực để giảm chi phí và gia tăng trải nghiệm.",
      descEn: "Integrating AI Chatbots, Omnichannel Contact Centers, and real-time data analytics to trim costs while boosting experience."
    },
    {
      icon: Award,
      color: "from-purple-500 to-indigo-500",
      titleVi: "Cam kết Giá trị Thực chất",
      titleEn: "Commitment to Tangible Value",
      descVi: "Mọi giải pháp và sáng kiến quản trị đều hướng tới mục tiêu nâng cao tỷ lệ giữ chân khách hàng (Retention Rate) và ROI bền vững.",
      descEn: "Every operational initiative is strategically designed to improve customer retention rates and deliver sustainable ROI."
    }
  ];

  return (
    <section 
      id="letter" 
      className="relative w-full min-h-full flex flex-col justify-start items-center p-3 xs:p-3.5 sm:p-4.5 md:p-6 lg:p-8 font-sans text-slate-800 dark:text-slate-100"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">

        {/* 1. TOP PAGE HEADER */}
        <IndustrialSubSection hasIndustrialAccent>
          <PageCardHeader pageId="letter">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-5 bg-amber-600 dark:bg-amber-400 rounded-full shrink-0" />
              <span className="text-caption font-semibold font-mono text-amber-700 dark:text-amber-300 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30 shadow-2xs">
                {isVi ? "Thông điệp Tận tâm & Sứ mệnh" : "Dedicated Message & Vision"}
              </span>
            </div>
          </PageCardHeader>
        </IndustrialSubSection>

        {/* 2. MAIN LETTER CONTENT & SIDEBAR GRID */}
        <IndustrialSubSection>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            {/* MAIN LETTER BODY (8 cols) */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-8 flex flex-col gap-6 p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/60 dark:border-white/15 bg-white/75 dark:bg-slate-900/80 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] relative overflow-hidden"
            >
              {/* Decorative background watermark */}
              <Quote className="absolute -top-6 -right-6 w-48 h-48 text-amber-500/5 dark:text-amber-400/10 pointer-events-none select-none rotate-12" />

              {/* Salutation */}
              <div className="flex flex-col gap-2 border-b border-slate-200 dark:border-slate-800 pb-5">
                <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-2">
                  <MailOpen className="w-4 h-4" />
                  {isVi ? "Thư ngỏ từ Trưởng phòng CSKH" : "Open Letter from Head of CS"}
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  {isVi 
                    ? "Kính gửi Ban Lãnh đạo, Đối tác và Quý Đồng nghiệp!" 
                    : "Dear Executives, Partners, and Respected Colleagues!"}
                </h2>
              </div>

              {/* Letter Paragraphs */}
              <div className="flex flex-col gap-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                <p>
                  {isVi ? (
                    <>
                      Trải qua hơn <strong className="text-amber-600 dark:text-amber-400 font-bold">22 năm gắn bó và cống hiến</strong> trong lĩnh vực Quản trị Trải nghiệm Khách hàng (CX) & Vận hành Dịch vụ CSKH, tôi luôn tâm niệm rằng: <em>Dịch vụ xuất sắc không đơn thuần là giải quyết sự vụ, mà là nghệ thuật xây dựng niềm tin và sự gắn kết bền vững giữa khách hàng với doanh nghiệp.</em>
                    </>
                  ) : (
                    <>
                      With over <strong className="text-amber-600 dark:text-amber-400 font-bold">22 years of dedicated leadership</strong> in Customer Experience (CX) & Customer Support Operations, I firmly believe that: <em>Exceptional service is not merely resolving inquiries, but the art of cultivating enduring trust and brand loyalty.</em>
                    </>
                  )}
                </p>

                <p>
                  {isVi ? (
                    <>
                      Trong kỷ nguyên số hóa bùng nổ, kỳ vọng của khách hàng thay đổi từng ngày. Một hệ thống CSKH hiện đại không thể dừng lại ở mô hình truyền thống mà phải là sự kết hợp nhuần nhuyễn giữa <span className="font-semibold text-slate-900 dark:text-white">công nghệ tiên tiến (AI, Omnichannel, Automation)</span> và <span className="font-semibold text-slate-900 dark:text-white">sự thấu cảm sâu sắc của con người</span>.
                    </>
                  ) : (
                    <>
                      In today's fast-evolving digital era, customer expectations change daily. A modern CS system cannot stay traditional; it must seamlessly harmonize <span className="font-semibold text-slate-900 dark:text-white">cutting-edge technology (AI, Omnichannel, Automation)</span> with <span className="font-semibold text-slate-900 dark:text-white">deep human empathy</span>.
                    </>
                  )}
                </p>

                <p>
                  {isVi ? (
                    <>
                      Với tư cách là một người quản lý trực tiếp điều hành các trung tâm Contact Center quy mô lớn, tôi tự hào đã dẫn dắt nhiều đội ngũ vượt qua những thách thức vận hành phức tạp, chuyển đổi quy trình cồng kềnh thành những bộ máy linh hoạt, hiệu quả cao và đạt các chỉ số <strong className="text-slate-900 dark:text-white">CSAT &gt; 95%</strong>, <strong className="text-slate-900 dark:text-white">FCR &gt; 88%</strong>.
                    </>
                  ) : (
                    <>
                      As an operational leader directly steering enterprise Contact Centers, I take pride in guiding high-performing teams through complex challenges—transforming rigid workflows into agile, high-output engines achieving benchmark <strong className="text-slate-900 dark:text-white">CSAT &gt; 95%</strong> and <strong className="text-slate-900 dark:text-white">FCR &gt; 88%</strong>.
                    </>
                  )}
                </p>
              </div>

              {/* Four Pledges Cards */}
              <div className="flex flex-col gap-3 pt-3">
                <h3 className="text-xs font-mono uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                  {isVi ? "4 Trụ cột cam kết quản trị:" : "4 Core Governance Commitments:"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pledges.map((p, idx) => {
                    const Icon = p.icon;
                    return (
                      <div 
                        key={idx}
                        className="flex flex-col gap-2 p-3.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 hover:border-amber-500/40 transition-all duration-300"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${p.color} text-white shadow-xs`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                            {isVi ? p.titleVi : p.titleEn}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
                          {isVi ? p.descVi : p.descEn}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Closing & Signature */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-slate-800 mt-2">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {isVi ? "Trân trọng cảm ơn & Rất mong nhận được sự hợp tác!" : "Sincerely & Looking forward to fruitful collaboration!"}
                  </span>
                  <span className="text-lg font-black font-sans text-slate-900 dark:text-white tracking-wide mt-1">
                    NGUYỄN HÙNG THÁI
                  </span>
                  <span className="text-xs font-medium text-amber-600 dark:text-amber-400 font-mono">
                    {isVi ? "Trưởng phòng Chăm sóc Khách hàng (Head of CS)" : "Head of Customer Service Operations"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleNavigate("contact")}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-md shadow-amber-500/20 flex items-center gap-2 transition-all active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isVi ? "Liên hệ ngay" : "Get in Touch"}</span>
                  </button>
                  <button
                    onClick={handleCopyEmail}
                    className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    {copied ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <MailOpen className="w-3.5 h-3.5" />
                    )}
                    <span>{copied ? (isVi ? "Đã chép!" : "Copied!") : "Email"}</span>
                  </button>
                </div>
              </div>

            </motion.div>

            {/* SIDEBAR CARDS (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-4">

              {/* Quick Profile Summary Card */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="p-5 sm:p-6 rounded-2xl md:rounded-3xl border border-white/60 dark:border-white/15 bg-slate-900 text-white shadow-xl flex flex-col gap-4 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white font-black text-xl shadow-lg shrink-0">
                    NHT
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-base font-extrabold text-white">Nguyễn Hùng Thái</h3>
                    <span className="text-xs text-amber-300 font-mono font-medium">CX & CS Operations Leader</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-center font-mono">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col">
                    <span className="text-lg font-black text-amber-400">22+</span>
                    <span className="text-3xs uppercase tracking-wider text-slate-300">{isVi ? "Năm kinh nghiệm" : "Years Exp"}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col">
                    <span className="text-lg font-black text-emerald-400">98%</span>
                    <span className="text-3xs uppercase tracking-wider text-slate-300">{isVi ? "Hài lòng CSAT" : "CSAT Rating"}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col">
                    <span className="text-lg font-black text-cyan-400">150+</span>
                    <span className="text-3xs uppercase tracking-wider text-slate-300">{isVi ? "Nhân sự quản lý" : "Team Size"}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col">
                    <span className="text-lg font-black text-indigo-400">50+</span>
                    <span className="text-3xs uppercase tracking-wider text-slate-300">{isVi ? "Dự án lớn" : "Key Projects"}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={() => handleNavigate("about")}
                    className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all border border-white/15"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isVi ? "Xem Hồ sơ Chi tiết" : "View Full Profile"}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                  <button
                    onClick={() => handleNavigate("projects")}
                    className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all border border-white/15"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{isVi ? "Khám phá Dự án Trọng điểm" : "Explore Key Projects"}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>
              </motion.div>

              {/* Quote Card */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="p-5 rounded-2xl border border-amber-500/30 bg-amber-500/10 dark:bg-amber-500/5 backdrop-blur-xl flex flex-col gap-3 relative"
              >
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-mono font-bold text-xs">
                  <Quote className="w-4 h-4" />
                  <span>{isVi ? "Triết lý phục vụ" : "Service Motto"}</span>
                </div>
                <p className="text-xs sm:text-sm italic font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                  {isVi 
                    ? "“Khách hàng sẽ quên những gì bạn nói, quên những gì bạn làm, nhưng họ sẽ không bao giờ quên cảm xúc mà bạn mang lại cho họ.”"
                    : "“People will forget what you said, people will forget what you did, but people will never forget how you made them feel.”"}
                </p>
                <span className="text-2xs font-mono text-slate-500 dark:text-slate-400 font-bold tracking-wider text-right">
                  — Maya Angelou
                </span>
              </motion.div>

            </div>

          </div>
        </IndustrialSubSection>

      </div>
    </section>
  );
}
