import React, { useState } from "react";
import { 
  Compass, PhoneCall, ShoppingBag, Landmark, HeartPulse, 
  Cpu, Bot, CheckCircle2, ArrowRight, Zap, Layers, 
  Sparkles, TrendingUp, ShieldCheck, Users, Search
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n";
import { PageCardHeader } from "./PageCardHeader";
import { IndustrialSubSection } from "./IndustrialStaggerContainer";

interface DomainItem {
  id: string;
  category: "telecom" | "ecommerce" | "finance" | "healthcare" | "tech" | "ai";
  titleVi: string;
  titleEn: string;
  subtitleVi: string;
  subtitleEn: string;
  icon: React.ElementType;
  gradient: string;
  badgeVi: string;
  badgeEn: string;
  years: string;
  agents: string;
  interactions: string;
  descVi: string;
  descEn: string;
  highlightsVi: string[];
  highlightsEn: string[];
  techs: string[];
}

export default function DomainsSection() {
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedDomain, setSelectedDomain] = useState<DomainItem | null>(null);

  const handleNavigate = (sectionId: string) => {
    window.dispatchEvent(new CustomEvent("app-navigate", { detail: sectionId }));
  };

  const DOMAINS: DomainItem[] = [
    {
      id: "telecom",
      category: "telecom",
      titleVi: "Viễn thông & Contact Center",
      titleEn: "Telecom & Contact Center Ops",
      subtitleVi: "Quản trị tổng đài VoIP & Hạ tầng CSKH đa kênh quy mô lớn",
      subtitleEn: "VoIP Contact Center & Large-scale Omnichannel Infrastructure",
      icon: PhoneCall,
      gradient: "from-blue-500 to-cyan-500",
      badgeVi: "Lĩnh vực cốt lõi",
      badgeEn: "Core Domain",
      years: "15+ Năm",
      agents: "500+ Nhân sự",
      interactions: "10M+/Năm",
      descVi: "Xây dựng và vận hành hệ thống tổng đài viễn thông đa kênh, chuẩn hóa quy trình phân luồng cuộc gọi tự động (IVR), tối ưu hóa chỉ số SLA và thời gian chờ (ASA).",
      descEn: "Built and operated enterprise telecom contact centers, standardized intelligent IVR call routing, optimized SLA metrics and average speed of answer (ASA).",
      highlightsVi: [
        "Thiết lập tổng đài IP-PBX/VoIP dự phòng kép 99.99% uptime",
        "Tối ưu hóa quy trình IVR thông minh giảm 35% thời gian chờ",
        "Quản trị đội ngũ tổng đài viên lớn với bộ tiêu chuẩn QA/QC"
      ],
      highlightsEn: [
        "Established dual-redundant IP-PBX/VoIP infrastructure with 99.99% uptime",
        "Optimized intelligent IVR routing cutting wait time by 35%",
        "Managed large agent forces with rigorous QA/QC compliance"
      ],
      techs: ["VoIP/SIP", "Asterisk", "Avaya", "Omnichannel", "IVR", "SLA Monitoring"]
    },
    {
      id: "ecommerce",
      category: "ecommerce",
      titleVi: "Thương mại Điện tử & Bán lẻ",
      titleEn: "E-Commerce & Retail CS",
      subtitleVi: "Xử lý đơn hàng, giải quyết khiếu nại & nâng cao tỷ lệ giữ chân",
      subtitleEn: "Order Fulfillment, Complaint Resolution & Customer Retention",
      icon: ShoppingBag,
      gradient: "from-amber-500 to-orange-500",
      badgeVi: "Bán lẻ số",
      badgeEn: "Digital Retail",
      years: "8+ Năm",
      agents: "200+ Nhân sự",
      interactions: "5M+/Năm",
      descVi: "Vận hành bộ phận CSKH cho các sàn thương mại điện tử và chuỗi bán lẻ. Đẩy mạnh tốc độ xử lý khiếu nại giao hàng, đổi trả và tích hợp LiveChat 24/7.",
      descEn: "Operated CSKH divisions for e-commerce platforms and retail chains. Accelerated complaint resolution for delivery, returns, and 24/7 LiveChat integration.",
      highlightsVi: [
        "Tích hợp Zalo OA, Facebook Messenger & LiveChat tập trung",
        "Rút ngắn thời gian xử lý khiếu nại hoàn tiền xuống dưới 24h",
        "Tăng 22% chỉ số hài lòng khách hàng CSAT ngành E-com"
      ],
      highlightsEn: [
        "Integrated Zalo OA, Facebook Messenger & LiveChat into 1 Inbox",
        "Reduced refund complaint resolution time to under 24 hours",
        "Boosted e-commerce CSAT customer satisfaction index by 22%"
      ],
      techs: ["Omni-Inbox", "Zalo OA", "Social Commerce", "CRM", "LiveChat", "Logistics CS"]
    },
    {
      id: "finance",
      category: "finance",
      titleVi: "Tài chính, Ngân hàng & Fintech",
      titleEn: "Banking, Finance & Fintech",
      subtitleVi: "Bảo mật thông tin, quy chuẩn tuân thủ & thẩm định khách hàng",
      subtitleEn: "Information Security, Regulatory Compliance & Customer Verification",
      icon: Landmark,
      gradient: "from-emerald-500 to-teal-500",
      badgeVi: "Bảo mật cao",
      badgeEn: "High Security",
      years: "10+ Năm",
      agents: "150+ Nhân sự",
      interactions: "3M+/Năm",
      descVi: "Điều hành trung tâm hỗ trợ khách hàng dịch vụ tài chính, yêu cầu khắt khe về tính bảo mật thông tin, tuân thủ pháp lý và quy trình eKYC.",
      descEn: "Steered financial customer support centers demanding stringent data security, strict regulatory compliance, and eKYC verification workflows.",
      highlightsVi: [
        "Tuân thủ tiêu chuẩn bảo mật dữ liệu khách hàng nghiêm ngặt",
        "Tự động hóa luồng xác thực tài khoản & tra cứu dư nợ",
        "Đào tạo kỹ năng xử lý sự cố giao dịch và tranh chấp tài chính"
      ],
      highlightsEn: [
        "Enforced strict financial data privacy and security standards",
        "Automated account verification & balance inquiry workflows",
        "Coached teams on transaction dispute resolution & escalation"
      ],
      techs: ["eKYC", "Fintech CRM", "Security Protocols", "Fraud Prevention", "Compliance QA"]
    },
    {
      id: "healthcare",
      category: "healthcare",
      titleVi: "Y tế, Chăm sóc Sức khỏe & Chuỗi",
      titleEn: "Healthcare & Service Chains",
      subtitleVi: "Tư vấn tận tâm, đặt lịch hẹn & chăm sóc khách hàng cá nhân hóa",
      subtitleEn: "Empathetic Consultation, Appointment Scheduling & Personalized Care",
      icon: HeartPulse,
      gradient: "from-rose-500 to-pink-500",
      badgeVi: "Chăm sóc tận tâm",
      badgeEn: "Empathetic Care",
      years: "6+ Năm",
      agents: "100+ Nhân sự",
      interactions: "2M+/Năm",
      descVi: "Quản trị trải nghiệm bệnh nhân và khách hàng cho chuỗi phòng khám, bệnh viện tư nhân và dịch vụ y tế cao cấp, chú trọng thái độ thấu cảm.",
      descEn: "Managed patient and customer experience for private clinics, hospitals, and premium healthcare chains with a deep focus on empathetic care.",
      highlightsVi: [
        "Xây dựng quy trình chăm sóc khách hàng sau điều trị (Post-care)",
        "Tối ưu hệ thống nhắc lịch khám tự động qua SMS/Zalo",
        "Đạt chỉ số giới thiệu khách hàng NPS trên 85%"
      ],
      highlightsEn: [
        "Designed structured post-treatment patient follow-up workflows",
        "Optimized automated appointment reminder SMS/Zalo systems",
        "Achieved Net Promoter Score (NPS) exceeding 85%"
      ],
      techs: ["HIS/EMR Sync", "Appointment Booking", "SMS Brandname", "VIP Care", "NPS Survey"]
    },
    {
      id: "tech",
      category: "tech",
      titleVi: "Công nghệ Doanh nghiệp & SaaS",
      titleEn: "Enterprise Tech & SaaS CS",
      subtitleVi: "Hỗ trợ kỹ thuật L1/L2, triển khai phần mềm & Customer Success",
      subtitleEn: "L1/L2 Technical Support, Software Onboarding & Customer Success",
      icon: Cpu,
      gradient: "from-purple-500 to-indigo-500",
      badgeVi: "Công nghệ cao",
      badgeEn: "Enterprise Tech",
      years: "7+ Năm",
      agents: "80+ Nhân sự",
      interactions: "1.5M+/Năm",
      descVi: "Xây dựng đội ngũ B2B Customer Success và Helpdesk kỹ thuật cho các doanh nghiệp cung cấp giải pháp phần mềm SaaS, ERP và CRM.",
      descEn: "Established B2B Customer Success and Technical Helpdesk teams for software providers delivering SaaS, ERP, and CRM solutions.",
      highlightsVi: [
        "Chuẩn hóa cấp độ hỗ trợ L1, L2, L3 và cam kết SLA xử lý lỗi",
        "Xây dựng cổng tri thức Knowledge Base tự phục vụ (Self-service)",
        "Giảm tỷ lệ rời bỏ dịch vụ Churn Rate xuống dưới 3%/năm"
      ],
      highlightsEn: [
        "Standardized L1, L2, L3 support tiers with binding SLA response times",
        "Built comprehensive self-service Knowledge Base portals",
        "Drove annual software customer Churn Rate down under 3%"
      ],
      techs: ["Zendesk", "Freshdesk", "Jira Service Desk", "SLA Engine", "Knowledge Base"]
    },
    {
      id: "ai",
      category: "ai",
      titleVi: "Chuyển đổi số CSKH & AI Automation",
      titleEn: "CS Digital Transformation & AI",
      subtitleVi: "Tích hợp AI Chatbot, Voicebot & Tự động hóa quy trình nghiệp vụ",
      subtitleEn: "AI Chatbot, Voicebot Integration & Process Automation",
      icon: Bot,
      gradient: "from-cyan-500 to-blue-600",
      badgeVi: "Đột phá AI",
      badgeEn: "AI Breakthrough",
      years: "5+ Năm",
      agents: "Mở rộng linh hoạt",
      interactions: "20M+/Năm",
      descVi: "Ứng dụng các công nghệ AI GenAI, LLM, Voicebot và Automation vào vận hành CSKH nhằm giải phóng sức lao động và phản hồi tức thì 24/7.",
      descEn: "Deployed GenAI, LLM, Voicebot, and Automation into CS operations to automate repetitive tasks and deliver instant 24/7 responses.",
      highlightsVi: [
        "Tự động hóa 60% câu hỏi thường gặp FAQ bằng AI Chatbot",
        "Tích hợp Voicebot nhận diện giọng nói hỗ trợ tổng đài 24/7",
        "Phân tích cảm xúc cuộc gọi (Sentiment Analysis) thời gian thực"
      ],
      highlightsEn: [
        "Automated 60% of routine FAQ inquiries via AI Chatbots",
        "Integrated speech-recognition Voicebots for 24/7 call overflow",
        "Deployed real-time Sentiment Analysis for call quality audits"
      ],
      techs: ["Gemini AI", "NLP / LLM", "Voicebot", "RPA", "Sentiment Analysis", "Power BI"]
    }
  ];

  const categories = [
    { id: "all", labelVi: "Tất cả lĩnh vực", labelEn: "All Domains" },
    { id: "telecom", labelVi: "Viễn thông", labelEn: "Telecom" },
    { id: "ecommerce", labelVi: "E-Commerce", labelEn: "E-Commerce" },
    { id: "finance", labelVi: "Fintech", labelEn: "Fintech" },
    { id: "healthcare", labelVi: "Y tế", labelEn: "Healthcare" },
    { id: "tech", labelVi: "Công nghệ", labelEn: "SaaS Tech" },
    { id: "ai", labelVi: "AI Automation", labelEn: "AI Automation" },
  ];

  const filteredDomains = activeCategory === "all" 
    ? DOMAINS 
    : DOMAINS.filter(d => d.category === activeCategory);

  return (
    <section 
      id="domains" 
      className="relative w-full min-h-full flex flex-col justify-start items-center p-3 xs:p-3.5 sm:p-4.5 md:p-6 lg:p-8 font-sans text-slate-800 dark:text-slate-100"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">

        {/* 1. TOP PAGE HEADER */}
        <IndustrialSubSection hasIndustrialAccent>
          <PageCardHeader pageId="domains">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-5 bg-teal-600 dark:bg-teal-400 rounded-full shrink-0" />
              <span className="text-caption font-semibold font-mono text-teal-700 dark:text-teal-300 bg-teal-500/15 px-2.5 py-0.5 rounded-full border border-teal-500/30 shadow-2xs">
                {isVi ? "6 Lĩnh vực Hoạt động Trọng điểm" : "6 Strategic Operational Domains"}
              </span>
            </div>
          </PageCardHeader>
        </IndustrialSubSection>

        {/* 2. CATEGORY FILTER TABS */}
        <IndustrialSubSection>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 w-full">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 border ${
                    isActive 
                      ? "bg-teal-600 text-white border-teal-500 shadow-md shadow-teal-500/20 scale-105" 
                      : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-teal-400/50"
                  }`}
                >
                  {cat.id === "all" && <Layers className="w-3.5 h-3.5" />}
                  <span>{isVi ? cat.labelVi : cat.labelEn}</span>
                </button>
              );
            })}
          </div>
        </IndustrialSubSection>

        {/* 3. DOMAIN CARDS GRID */}
        <IndustrialSubSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredDomains.map((domain) => {
                const Icon = domain.icon;
                return (
                  <motion.div
                    key={domain.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="p-5 sm:p-6 rounded-2xl md:rounded-3xl border border-white/60 dark:border-white/15 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex flex-col justify-between gap-4 group hover:border-teal-500/50 hover:shadow-[0_12px_40px_rgba(20,184,166,0.15)] transition-all duration-300"
                  >
                    {/* Header: Icon & Badges */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className={`p-3 rounded-2xl bg-gradient-to-br ${domain.gradient} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-3xs font-mono font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">
                          {isVi ? domain.badgeVi : domain.badgeEn}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1">
                        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                          {isVi ? domain.titleVi : domain.titleEn}
                        </h3>
                        <p className="text-xs text-teal-600 dark:text-teal-400 font-medium line-clamp-1">
                          {isVi ? domain.subtitleVi : domain.subtitleEn}
                        </p>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                        {isVi ? domain.descVi : domain.descEn}
                      </p>
                    </div>

                    {/* Stats Pill */}
                    <div className="grid grid-cols-3 gap-1.5 py-2 px-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-center font-mono">
                      <div className="flex flex-col">
                        <span className="text-3xs text-slate-400 uppercase">{isVi ? "Kinh nghiệm" : "Exp"}</span>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{domain.years}</span>
                      </div>
                      <div className="flex flex-col border-x border-slate-200 dark:border-slate-700">
                        <span className="text-3xs text-slate-400 uppercase">{isVi ? "Quy mô" : "Scale"}</span>
                        <span className="text-xs font-bold text-teal-600 dark:text-teal-400">{domain.agents}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-3xs text-slate-400 uppercase">{isVi ? "Tương tác" : "Volume"}</span>
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{domain.interactions}</span>
                      </div>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {domain.techs.slice(0, 4).map((tech, idx) => (
                        <span 
                          key={idx}
                          className="text-3xs font-mono font-medium px-2 py-0.5 rounded-md bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300/50 dark:border-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                      {domain.techs.length > 4 && (
                        <span className="text-3xs font-mono font-medium px-1.5 py-0.5 rounded-md bg-slate-200/70 dark:bg-slate-800 text-slate-500">
                          +{domain.techs.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => setSelectedDomain(domain)}
                      className="w-full mt-1 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-teal-600 hover:text-white dark:hover:bg-teal-600 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-300"
                    >
                      <span>{isVi ? "Xem chi tiết giải pháp" : "View Domain Solutions"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </IndustrialSubSection>

        {/* DOMAIN DETAILS MODAL */}
        <AnimatePresence>
          {selectedDomain && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="w-full max-w-2xl max-h-[85vh] overflow-y-auto no-scrollbar p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-teal-500/30 shadow-2xl flex flex-col gap-6 relative"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${selectedDomain.gradient} text-white shadow-lg`}>
                      <selectedDomain.icon className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-xl font-extrabold text-white">
                        {isVi ? selectedDomain.titleVi : selectedDomain.titleEn}
                      </h3>
                      <span className="text-xs text-teal-400 font-mono">
                        {isVi ? selectedDomain.subtitleVi : selectedDomain.subtitleEn}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedDomain(null)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="text-sm text-slate-300 leading-relaxed font-sans">
                  {isVi ? selectedDomain.descVi : selectedDomain.descEn}
                </div>

                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-mono uppercase font-bold text-teal-400 tracking-wider">
                    {isVi ? "Dấu ấn & Kết quả nổi bật:" : "Key Highlights & Results:"}
                  </h4>
                  <div className="flex flex-col gap-2">
                    {(isVi ? selectedDomain.highlightsVi : selectedDomain.highlightsEn).map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-200 leading-normal">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h4 className="text-xs font-mono uppercase font-bold text-slate-400 tracking-wider">
                    {isVi ? "Công nghệ & Công cụ triển khai:" : "Tech Stack & Deployment Tools:"}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDomain.techs.map((t, i) => (
                      <span key={i} className="text-xs font-mono px-3 py-1 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => {
                      setSelectedDomain(null);
                      handleNavigate("projects");
                    }}
                    className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-2 transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{isVi ? "Xem dự án liên quan" : "View Related Projects"}</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
