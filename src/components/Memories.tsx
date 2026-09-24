import React, { useState } from "react";
import { 
  Camera, Award, Users, Calendar, MapPin, 
  Sparkles, Heart, Star, Layers, ChevronRight, 
  X, ZoomIn, MessageSquare, Share2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n";
import { PageCardHeader } from "./PageCardHeader";
import { IndustrialSubSection } from "./IndustrialStaggerContainer";

interface MemoryItem {
  id: string;
  category: "awards" | "team" | "projects" | "milestones";
  titleVi: string;
  titleEn: string;
  year: string;
  locationVi: string;
  locationEn: string;
  tagVi: string;
  tagEn: string;
  imageUrl: string;
  gradient: string;
  descVi: string;
  descEn: string;
  quoteVi?: string;
  quoteEn?: string;
  teamSize?: string;
}

export default function Memories() {
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeMemory, setActiveMemory] = useState<MemoryItem | null>(null);

  const MEMORIES: MemoryItem[] = [
    {
      id: "award-best-cs",
      category: "awards",
      titleVi: "Giải thưởng Lãnh đạo CSKH Xuất sắc năm 2024",
      titleEn: "Excellence in CS Leadership Award 2024",
      year: "2024",
      locationVi: "TP. Hồ Chí Minh",
      locationEn: "Ho Chi Minh City",
      tagVi: "Giải thưởng",
      tagEn: "Honors",
      imageUrl: "https://images.unsplash.com/photo-1531058240690-006c446962d8?auto=format&fit=crop&w=800&q=80",
      gradient: "from-amber-500 to-orange-600",
      descVi: "Vinh danh cá nhân xuất sắc có đóng góp vượt bậc trong việc tái cấu trúc quy trình CSKH, nâng chỉ số CSAT đạt 98% và triển khai thành công AI Voicebot 24/7.",
      descEn: "Honored as Top CS Leader for outstanding contributions in restructuring CSKH operations, raising CSAT to 98%, and successfully deploying 24/7 AI Voicebots.",
      quoteVi: "“Thành công của người lãnh đạo là nhìn thấy đội ngũ ngày càng tự tin và trưởng thành.”",
      quoteEn: "“A leader's true success is seeing team members grow in confidence and excellence.”",
      teamSize: "120+ Agents"
    },
    {
      id: "team-building-2023",
      category: "team",
      titleVi: "Hành trình Gắn kết Đội ngũ Contact Center 2023",
      titleEn: "Annual Contact Center Team Retreat 2023",
      year: "2023",
      locationVi: "Đà Nẵng & Hội An",
      locationEn: "Danang & Hoi An",
      tagVi: "Văn hóa Đội ngũ",
      tagEn: "Team Culture",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      gradient: "from-blue-500 to-indigo-600",
      descVi: "Chương trình huấn luyện kỹ năng mềm và team building gắn kết hơn 150 điện thoại viên & quản lý cấp trung. Xây dựng tinh thần 'One Team, One Mission'.",
      descEn: "Soft skills coaching and team building retreat uniting 150+ agents and supervisors under the 'One Team, One Mission' core values.",
      quoteVi: "“Gắn kết con người là chìa khóa vàng cho một hệ thống vận hành bền vững.”",
      quoteEn: "“Human connection is the ultimate golden key for resilient operational systems.”",
      teamSize: "150+ Members"
    },
    {
      id: "project-omnichannel",
      category: "projects",
      titleVi: "Lễ ra mắt Hệ thống Omnichannel Contact Center",
      titleEn: "Omnichannel Contact Center Go-Live Ceremony",
      year: "2022",
      locationVi: "Hà Nội",
      locationEn: "Hanoi",
      tagVi: "Dự án Trọng điểm",
      tagEn: "Key Project",
      imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
      gradient: "from-emerald-500 to-teal-600",
      descVi: "Dấu ấn chuyển đổi số tích hợp Hotline, Zalo, Facebook, Email về một nền tảng tập trung. Cột mốc giúp giảm 40% thời gian phản hồi yêu cầu khách hàng.",
      descEn: "Digital transformation milestone consolidating Hotline, Zalo, Facebook, and Email into a unified platform—slashing customer wait times by 40%.",
      quoteVi: "“Công nghệ chỉ thực sự có giá trị khi nó làm cho cuộc sống của khách hàng dễ dàng hơn.”",
      quoteEn: "“Technology truly yields value when it renders customer lives effortlessly simpler.”",
      teamSize: "Integrated Platform"
    },
    {
      id: "milestone-20years",
      category: "milestones",
      titleVi: "Cột mốc 20 năm Cống hiến Ngành Dịch vụ Khách hàng",
      titleEn: "20 Years Career Milestone in CS Industry",
      year: "2021",
      locationVi: "Toàn quốc",
      locationEn: "Nationwide",
      tagVi: "Cột mốc Sự nghiệp",
      tagEn: "Career Milestone",
      imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
      gradient: "from-purple-500 to-pink-600",
      descVi: "Nhìn lại chặng đường 20 năm liên tục học hỏi, từ vị trí điện thoại viên đầu tiên đến Trưởng phòng điều hành cấp cao. Một hành trình đầy tự hào.",
      descEn: "Reflecting on two decades of relentless dedication—from frontline agent to senior Head of CS. A journey defined by passion and growth.",
      quoteVi: "“Không bao giờ ngừng học hỏi và luôn giữ ngọn lửa nhiệt huyết với nghề.”",
      quoteEn: "“Never cease learning and always keep the flame of professional dedication burning bright.”",
      teamSize: "22+ Years Journey"
    },
    {
      id: "qa-workshop-2020",
      category: "team",
      titleVi: "Chuỗi Workshop Đào tạo Chuẩn mực QA/QC 2020",
      titleEn: "QA/QC Operational Excellence Workshop 2020",
      year: "2020",
      locationVi: "TP. Hồ Chí Minh",
      locationEn: "Ho Chi Minh City",
      tagVi: "Đào tạo & Coaching",
      tagEn: "Coaching",
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
      gradient: "from-cyan-500 to-blue-600",
      descVi: "Trực tiếp đứng lớp đào tạo bộ tiêu chuẩn chấm điểm cuộc gọi, kỹ năng lắng nghe thấu cảm và quy trình giải quyết khủng hoảng cho đội ngũ trưởng nhóm.",
      descEn: "Personally conducted intensive coaching on call quality evaluation, empathetic listening, and crisis resolution for team leads.",
      teamSize: "40+ Team Leads"
    },
    {
      id: "csr-charity-2019",
      category: "team",
      titleVi: "Chương trình Phụng sự Cộng đồng 'Trao Nụ Cười'",
      titleEn: "CSR Community Initiative 'Sharing Smiles'",
      year: "2019",
      locationVi: "Lâm Đồng",
      locationEn: "Lam Dong Province",
      tagVi: "Hoạt động CSR",
      tagEn: "CSR Activity",
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
      gradient: "from-rose-500 to-red-600",
      descVi: "Cùng đội ngũ nhân sự CSKH trao tặng quà Tết, học bổng và trang thiết bị học tập cho các em nhỏ vùng cao, lan tỏa tinh thần phụng sự vì cộng đồng.",
      descEn: "Led CS staff on a charity expedition providing scholarships, warm clothes, and school supplies to rural children, fostering social responsibility.",
      teamSize: "Volunteers Team"
    }
  ];

  const categories = [
    { id: "all", labelVi: "Tất cả kỷ niệm", labelEn: "All Memories" },
    { id: "awards", labelVi: "Giải thưởng & Vinh danh", labelEn: "Awards & Honors" },
    { id: "team", labelVi: "Văn hóa Đội ngũ", labelEn: "Team & Culture" },
    { id: "projects", labelVi: "Sự kiện & Dự án", labelEn: "Projects & Events" },
    { id: "milestones", labelVi: "Cột mốc Sự nghiệp", labelEn: "Milestones" },
  ];

  const filteredMemories = activeCategory === "all" 
    ? MEMORIES 
    : MEMORIES.filter(m => m.category === activeCategory);

  return (
    <section 
      id="memories" 
      className="relative w-full min-h-full flex flex-col justify-start items-center p-3 xs:p-3.5 sm:p-4.5 md:p-6 lg:p-8 font-sans text-slate-800 dark:text-slate-100"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">

        {/* 1. TOP PAGE HEADER */}
        <IndustrialSubSection hasIndustrialAccent>
          <PageCardHeader pageId="memories">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-5 bg-rose-600 dark:bg-rose-400 rounded-full shrink-0" />
              <span className="text-caption font-semibold font-mono text-rose-700 dark:text-rose-300 bg-rose-500/15 px-2.5 py-0.5 rounded-full border border-rose-500/30 shadow-2xs">
                {isVi ? "Khoảnh khắc & Cột mốc Sự nghiệp" : "Moments & Career Milestones"}
              </span>
            </div>
          </PageCardHeader>
        </IndustrialSubSection>

        {/* 2. CATEGORY TABS */}
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
                      ? "bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-500/20 scale-105" 
                      : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-rose-400/50"
                  }`}
                >
                  {cat.id === "all" && <Layers className="w-3.5 h-3.5" />}
                  <span>{isVi ? cat.labelVi : cat.labelEn}</span>
                </button>
              );
            })}
          </div>
        </IndustrialSubSection>

        {/* 3. MEMORIES MASONRY / GRID */}
        <IndustrialSubSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredMemories.map((memory) => (
                <motion.div
                  key={memory.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setActiveMemory(memory)}
                  className="rounded-2xl md:rounded-3xl border border-white/60 dark:border-white/15 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col group cursor-pointer hover:border-rose-500/50 hover:shadow-[0_12px_40px_rgba(244,63,94,0.15)] transition-all duration-300"
                >
                  {/* Photo Container */}
                  <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-slate-900">
                    <img 
                      src={memory.imageUrl} 
                      alt={isVi ? memory.titleVi : memory.titleEn}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-3xs font-mono font-bold uppercase tracking-wider text-white bg-slate-900/80 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/20">
                        {isVi ? memory.tagVi : memory.tagEn}
                      </span>
                      <span className="text-xs font-mono font-black text-rose-300 bg-rose-950/80 px-2.5 py-1 rounded-full backdrop-blur-md border border-rose-500/30">
                        {memory.year}
                      </span>
                    </div>

                    {/* Bottom overlay info */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white/80 text-2xs font-mono">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-rose-400" />
                        <span>{isVi ? memory.locationVi : memory.locationEn}</span>
                      </div>
                      {memory.teamSize && (
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{memory.teamSize}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Text Details */}
                  <div className="p-5 flex flex-col gap-3 flex-grow justify-between">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-2">
                        {isVi ? memory.titleVi : memory.titleEn}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                        {isVi ? memory.descVi : memory.descEn}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-rose-600 dark:text-rose-400 group-hover:translate-x-1 transition-transform">
                      <span>{isVi ? "Xem chi tiết khoảnh khắc" : "View Moment Details"}</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </IndustrialSubSection>

        {/* LIGHTBOX MODAL */}
        <AnimatePresence>
          {activeMemory && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full max-w-3xl max-h-[90vh] overflow-y-auto no-scrollbar rounded-3xl bg-slate-900 text-white border border-rose-500/30 shadow-2xl overflow-hidden flex flex-col relative"
              >
                {/* Image Header */}
                <div className="relative w-full h-64 sm:h-80 bg-slate-950">
                  <img 
                    src={activeMemory.imageUrl} 
                    alt={isVi ? activeMemory.titleVi : activeMemory.titleEn}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/40" />

                  <button
                    onClick={() => setActiveMemory(null)}
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white transition-colors border border-white/20"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-4 left-6 right-6 flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-300 bg-rose-950/80 px-3 py-1 rounded-full border border-rose-500/40">
                        {isVi ? activeMemory.tagVi : activeMemory.tagEn}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-300 bg-slate-800/80 px-3 py-1 rounded-full">
                        {activeMemory.year}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                      {isVi ? activeMemory.titleVi : activeMemory.titleEn}
                    </h2>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-8 flex flex-col gap-5">
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-rose-400" />
                      <span>{isVi ? activeMemory.locationVi : activeMemory.locationEn}</span>
                    </div>
                    {activeMemory.teamSize && (
                      <div className="flex items-center gap-1.5 border-l border-white/10 pl-4">
                        <Users className="w-4 h-4 text-cyan-400" />
                        <span>{activeMemory.teamSize}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
                    {isVi ? activeMemory.descVi : activeMemory.descEn}
                  </p>

                  {(activeMemory.quoteVi || activeMemory.quoteEn) && (
                    <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex flex-col gap-2">
                      <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
                        {isVi ? "Chia sẻ cảm hứng:" : "Leadership Insight:"}
                      </span>
                      <p className="text-xs sm:text-sm italic font-medium text-rose-100">
                        {isVi ? activeMemory.quoteVi : activeMemory.quoteEn}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => setActiveMemory(null)}
                      className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all"
                    >
                      {isVi ? "Đóng" : "Close"}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
