import React, { useState } from 'react';
import {
  X,
  Search,
  BookOpen,
  ArrowLeft,
  User,
  Headphones,
  Cpu,
  Globe,
  Trophy,
  Compass,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  MessageSquarePlus,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface QuestionCategory {
  id: string;
  num: string;
  title: string;
  titleEn: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
  badgeBg: string;
  description: string;
  questions: string[];
}

export const SAMPLE_CATEGORIES: QuestionCategory[] = [
  {
    id: 'personal',
    num: '01',
    title: 'Giới thiệu cá nhân',
    titleEn: 'Personal Introduction',
    icon: User,
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-50/80 dark:bg-indigo-950/40',
    borderColor: 'border-indigo-200 dark:border-indigo-800',
    badgeBg: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300',
    description: 'Hành trình 22 năm, lý do gắn bó, thành tựu tự hào và hệ sinh thái hồ sơ',
    questions: [
      'Chào anh Nguyễn Hùng Thái, anh có thể giới thiệu ngắn gọn về bản thân cũng như hành trình 22 năm trong lĩnh vực chăm sóc khách hàng của mình không?',
      'Điều gì khiến anh gắn bó lâu dài với lĩnh vực chăm sóc khách hàng đến vậy?',
      'Thành tựu nào anh cảm thấy tự hào nhất trong sự nghiệp của mình?',
      'Các lĩnh vực ngành nghề anh từng tham gia và trải nghiệm đa dạng như thế nào?',
      'Nếu muốn tìm hiểu thêm về anh (CV/Hồ sơ năng lực), chúng tôi có thể xem ở đâu?',
    ],
  },
  {
    id: 'strategy',
    num: '02',
    title: 'Tầm nhìn & Chiến lược',
    titleEn: 'Vision & Strategy',
    icon: Compass,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-50/80 dark:bg-emerald-950/40',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    badgeBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300',
    description: 'Chiến lược thành công, vai trò vòng đời khách hàng, lộ trình xây dựng và chỉ số trọng yếu',
    questions: [
      'Anh hãy mô tả một chiến lược chăm sóc khách hàng thành công mà anh từng triển khai (bối cảnh – giải pháp – kết quả)?',
      'Theo anh, chăm sóc khách hàng đóng vai trò gì trong toàn bộ vòng đời khách hàng?',
      'Nếu được xây lại hệ thống chăm sóc khách hàng từ đầu, anh sẽ bắt đầu từ đâu: con người, quy trình, công nghệ, hay dữ liệu?',
      'Theo anh, yếu tố quan trọng nhất khi xây dựng phòng Chăm Sóc Khách Hàng là gì?',
      'Những chỉ số thành công nào (Chỉ số đo lường lòng trung thành, Mức độ hài lòng, Tỷ lệ nỗ lực của khách hàng…) anh đặc biệt quan tâm trong các chiến lược của mình?',
      'Anh hình dung thế nào về một “hệ sinh thái chăm sóc khách hàng lý tưởng” trong 3–5 năm tới?',
    ],
  },
  {
    id: 'management',
    num: '03',
    title: 'Quản lý & Đào tạo',
    titleEn: 'Management & Training',
    icon: Headphones,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50/80 dark:bg-purple-950/40',
    borderColor: 'border-purple-200 dark:border-purple-800',
    badgeBg: 'bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300',
    description: 'Quy mô quản lý, phong cách lãnh đạo, xử lý khiếu nại nhân sự và khung năng lực',
    questions: [
      'Anh từng quản lý đội ngũ bao nhiêu nhân sự, với những cấp độ nào?',
      'Phong cách lãnh đạo của anh trong vai trò trưởng phòng Chăm Sóc Khách Hàng là gì?',
      'Khi xây dựng đội nhóm, anh thường ưu tiên điều gì trước: kỹ năng, thái độ hay văn hóa dịch vụ?',
      'Anh xử lý ra sao khi nhân viên chăm sóc khách hàng bị khách hàng phàn nàn?',
      'Anh có kinh nghiệm thiết kế lộ trình thăng tiến hoặc khung năng lực cho phòng chăm sóc khách hàng không?',
      'Với vai trò lãnh đạo, anh thường truyền động lực cho đội ngũ bằng cách nào?',
    ],
  },
  {
    id: 'crisis',
    num: '04',
    title: 'Tình huống & Khủng hoảng',
    titleEn: 'Scenarios & Crisis Handling',
    icon: Trophy,
    color: 'text-rose-600 dark:text-rose-400',
    bgColor: 'bg-rose-50/80 dark:bg-rose-950/40',
    borderColor: 'border-rose-200 dark:border-rose-800',
    badgeBg: 'bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300',
    description: 'Mô hình STAR giải quyết sự cố diện rộng, xử lý khách VIP và nguyên tắc giải quyết mâu thuẫn',
    questions: [
      'Anh có thể chia sẻ một tình huống khủng hoảng dịch vụ mà anh từng xử lý theo mô hình Tình huống - Nhiệm vụ - Hành động - Kết quả?',
      'Tình huống áp lực nhất anh từng xử lý trong Chăm Sóc Khách Hàng là gì?',
      'Khi gặp khách hàng VIP tức giận và yêu cầu gặp cấp cao, anh thường giải quyết ra sao?',
      'Trong trường hợp hệ thống lỗi diện rộng, anh sẽ truyền thông và giữ uy tín thế nào với khách hàng?',
      'Nếu có mâu thuẫn gay gắt giữa chăm sóc khách hàng và khách hàng, đâu là nguyên tắc “đỏ” anh luôn tuân thủ?',
      'Bài học lớn nhất anh rút ra từ một sự cố khủng hoảng dịch vụ là gì?',
    ],
  },
  {
    id: 'tech',
    num: '05',
    title: 'Công nghệ & Quy trình',
    titleEn: 'Technology & Process',
    icon: Cpu,
    color: 'text-sky-600 dark:text-sky-400',
    bgColor: 'bg-sky-50/80 dark:bg-sky-950/40',
    borderColor: 'border-sky-200 dark:border-sky-800',
    badgeBg: 'bg-sky-100 text-sky-700 dark:bg-sky-900/60 dark:text-sky-300',
    description: 'Chuyển đổi số, hệ thống dữ liệu tập trung Single Source of Truth và ứng dụng AI Text Analytics',
    questions: [
      'Anh từng triển khai hoặc cải tiến hệ thống quản trị dữ liệu khách hàng/tiếp nhận yêu cầu nào?',
      'Quan điểm của anh về ứng dụng chuyển đổi số trong Chăm Sóc Khách Hàng?',
      'Với một hệ thống chăm sóc khách hàng, theo anh đâu là “mảnh ghép công nghệ” quan trọng nhất?',
      'Anh thường sử dụng các chỉ số hiệu suất nào để đánh giá hiệu quả dịch vụ?',
      'Khi mở rộng quy mô, làm sao để hệ thống chăm sóc khách hàng vẫn cá nhân hóa và ổn định?',
      'Anh có thể chia sẻ một ví dụ thực tế về việc dùng dữ liệu/Trí tuệ nhân tạo để nâng trải nghiệm khách hàng?',
    ],
  },
  {
    id: 'culture',
    num: '06',
    title: 'Văn hóa & Thấu cảm',
    titleEn: 'Culture & Empathy',
    icon: Sparkles,
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-50/80 dark:bg-amber-950/40',
    borderColor: 'border-amber-200 dark:border-amber-800',
    badgeBg: 'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300',
    description: 'Định nghĩa dịch vụ tuyệt hảo, đo lường cảm xúc qua VoC và giá trị cốt lõi Thấu Cảm',
    questions: [
      'Theo anh, thế nào là một “dịch vụ tuyệt hảo”?',
      'Làm sao để đo lường được cảm xúc khách hàng ngoài những con số khảo sát?',
      'Trong đội ngũ, anh nuôi dưỡng “tư duy dịch vụ” bằng cách nào?',
      'Anh có câu chuyện nào đáng nhớ về việc thấu cảm với khách hàng một cách ngoài mong đợi không?',
      'Nếu phải chọn một giá trị cốt lõi duy nhất cho văn hóa dịch vụ của phòng chăm sóc khách hàng, anh sẽ chọn gì?',
      'Kinh nghiệm nuôi dưỡng văn hóa thấu cảm và gắn kết đội ngũ tại môi trường vận hành 24/7 và đa văn hóa của anh Thái là gì?',
    ],
  },
  {
    id: 'org',
    num: '07',
    title: 'Tổ chức & Phối hợp',
    titleEn: 'Organization & Coordination',
    icon: Globe,
    color: 'text-teal-600 dark:text-teal-400',
    bgColor: 'bg-teal-50/80 dark:bg-teal-950/40',
    borderColor: 'border-teal-200 dark:border-teal-800',
    badgeBg: 'bg-teal-100 text-teal-700 dark:bg-teal-900/60 dark:text-teal-300',
    description: 'Cơ cấu 4 nhóm chức năng, vòng lặp phản hồi liên phòng ban và Realtime Dashboard cho lãnh đạo',
    questions: [
      'Nếu chia phòng chăm sóc khách hàng thành các nhóm nhỏ, anh sẽ tổ chức như thế nào?',
      'Chăm sóc khách hàng nên phối hợp thế nào với phòng Kinh doanh, Tiếp thị, Sản phẩm để tạo trải nghiệm liền mạch?',
      'Khi có mâu thuẫn giữa phòng chăm sóc khách hàng và các phòng ban khác, anh thường xử lý thế nào?',
      'Anh từng tham gia dự án liên phòng ban nào để cải thiện trải nghiệm khách hàng chưa?',
      'Theo anh, đâu là cơ chế báo cáo – phối hợp hiệu quả nhất giữa chăm sóc khách hàng và lãnh đạo cấp cao?',
      'Kinh nghiệm điều hành tổng đài phục vụ thị trường Mỹ / Quốc tế tại V247 mang lại bài học tổ chức gì cho anh Thái?',
    ],
  },
  {
    id: 'leadership',
    num: '08',
    title: 'Lãnh đạo & Tư duy khác biệt',
    titleEn: 'Leadership & Distinct Mindset',
    icon: CheckCircle2,
    color: 'text-cyan-600 dark:text-cyan-400',
    bgColor: 'bg-cyan-50/80 dark:bg-cyan-950/40',
    borderColor: 'border-cyan-200 dark:border-cyan-800',
    badgeBg: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/60 dark:text-cyan-300',
    description: 'Kế hoạch 90 ngày đầu, định vị trung tâm tạo ra giá trị và dấu ấn chuyển đổi số nhân văn',
    questions: [
      'Nếu nhận vai trò Trưởng phòng chăm sóc khách hàng, 90 ngày đầu tiên anh sẽ tập trung làm gì?',
      'Tư duy dịch vụ của anh khác gì so với thông thường?',
      'Anh nhìn nhận thế nào về vai trò lãnh đạo: kiểm soát – đồng hành – hay dẫn dắt?',
      'Theo anh, đâu là sự cân bằng giữa “chi tiết” và “tầm nhìn xa” trong lãnh đạo dịch vụ?',
      'Anh Hùng Thái giải quyết xung đột mục tiêu giữa CSKH và bộ phận Tăng trưởng (Growth) như thế nào?',
      'Làm thế nào anh Hùng Thái biến hàng triệu tương tác CSKH thành giá trị kinh doanh cụ thể cho công ty?',
    ],
  },
];

interface AISampleQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectQuestion: (question: string) => void;
}

export const AISampleQuestionsModal: React.FC<AISampleQuestionsModalProps> = ({
  isOpen,
  onClose,
  onSelectQuestion,
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const activeCategory = SAMPLE_CATEGORIES.find((c) => c.id === activeCategoryId);

  // Filtered questions if user types in search box
  const searchResults = searchTerm.trim()
    ? SAMPLE_CATEGORIES.flatMap((cat) =>
        cat.questions
          .filter((q) => q.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((q) => ({ question: q, category: cat }))
      )
    : [];

  const handleChooseQuestion = (q: string) => {
    onSelectQuestion(q);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-slate-50/70 dark:bg-slate-950/70 backdrop-blur-md animate-fade-in">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl max-h-[90vh] glass-surface backdrop-blur-2xl rounded-3xl border border-slate-200/50 dark:border-slate-800/80 shadow-2xl overflow-hidden flex flex-col"
        >
          {/* TOP HEADER */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base tracking-wide text-white">
                    Danh sách câu hỏi mẫu
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold">
                    {SAMPLE_CATEGORIES.reduce((acc, c) => acc + c.questions.length, 0)} câu
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  {activeCategory
                    ? `Danh mục: ${activeCategory.title}`
                    : `${SAMPLE_CATEGORIES.length} danh mục chuyên sâu • 44 câu hỏi thực chiến`}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
              }}
              className="p-2 rounded-xl bg-white/10 hover:bg-rose-500 hover:text-white transition-colors text-slate-300"
              title="Đóng danh sách câu hỏi mẫu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* SEARCH BAR */}
          <div className="p-3 px-4 glass-surface border-b border-slate-200 dark:border-slate-800 shrink-0 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500 dark:text-slate-400" />
              <input
                type="text"
                placeholder="Tìm nhanh trong các câu hỏi mẫu (vd: MoMo, chiến lược, khủng hoảng, SLA, thấu cảm...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-xl glass-surface border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-500 dark:text-slate-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-2.5 text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-700 dark:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* MAIN CONTENT CONTAINER */}
          <div className="p-4 sm:p-5 overflow-y-auto flex-1 custom-scrollbar space-y-4">
            {/* SEARCH RESULTS MODE */}
            {searchTerm.trim() ? (
              <div>
                <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-500 dark:text-slate-400">
                  <span>Kết quả tìm kiếm ({searchResults.length} câu)</span>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Xóa tìm kiếm
                  </button>
                </div>

                {searchResults.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-500">
                    Không tìm thấy câu hỏi mẫu phù hợp với từ khóa "{searchTerm}".
                  </div>
                ) : (
                  <div className="space-y-2">
                    {searchResults.map(({ question, category }, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleChooseQuestion(question)}
                        className="w-full p-3 rounded-2xl glass-surface border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-md transition-all text-left flex items-start gap-3 group"
                      >
                        <div
                          className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${category.bgColor} ${category.color}`}
                        >
                          <HelpCircle className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-0.5">
                            {category.title}
                          </span>
                          <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {question}
                          </p>
                        </div>
                        <MessageSquarePlus className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-indigo-500 shrink-0 mt-1" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : activeCategory ? (
              /* CATEGORY DETAIL MODE (SHOWING 10 QUESTIONS) */
              <div className="animate-fade-in">
                {/* Back Button & Category Header */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <button
                    onClick={() => {
                      setActiveCategoryId(null);
                    }}
                    className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Quay lại {SAMPLE_CATEGORIES.length} danh mục</span>
                  </button>

                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {activeCategory.questions.length} câu hỏi mẫu
                  </span>
                </div>

                <div
                  className={`p-4 rounded-2xl ${activeCategory.bgColor} border ${activeCategory.borderColor} mb-4 flex items-start gap-3`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl glass-surface flex items-center justify-center shrink-0 shadow-xs ${activeCategory.color}`}
                  >
                    <activeCategory.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className={`text-base font-bold ${activeCategory.color}`}>
                      {activeCategory.title}
                    </h4>
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-0.5">
                      {activeCategory.description}
                    </p>
                  </div>
                </div>

                {/* 1 Column Question Cards */}
                <div className="grid grid-cols-1 gap-2.5">
                  {activeCategory.questions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChooseQuestion(q)}
                      className="w-full p-3.5 rounded-2xl glass-surface border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-md transition-all text-left flex items-start gap-3 group"
                    >
                      <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 font-mono">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex-1 leading-snug">
                        {q}
                      </p>
                      <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                        Gửi ngay ↵
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* CATEGORY SELECTION MODE (SHOWING 1 COLUMN CATEGORY CARDS) */
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {SAMPLE_CATEGORIES.length} danh mục câu hỏi (1 cột trực quan)
                  </span>
                  <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                    Bấm mục bất kỳ để xem danh sách câu hỏi
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {SAMPLE_CATEGORIES.map((cat, index) => {
                    const Icon = cat.icon;
                    const catNumber = index + 1;
                    return (
                      <div
                        key={cat.id}
                        onClick={() => {
                          setActiveCategoryId(cat.id);
                        }}
                        className={`group p-4 rounded-2xl border ${cat.borderColor} bg-white/70 dark:bg-slate-900/70 backdrop-blur-md hover:bg-white/90 dark:hover:bg-slate-900/90 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${cat.bgColor} ${cat.color} border ${cat.borderColor}`}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <h4
                                  className={`text-sm font-bold tracking-tight leading-tight ${cat.color}`}
                                >
                                  {catNumber}. {cat.title}
                                </h4>
                                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">
                                  {cat.titleEn}
                                </span>
                              </div>
                            </div>
                            <span
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ${cat.badgeBg}`}
                            >
                              {cat.questions.length} câu
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed mb-2.5">
                            {cat.description}
                          </p>
                        </div>

                        {/* Sample preview box */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate flex items-center gap-1.5 min-w-0 flex-1">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            <span className="truncate">"{cat.questions[0]}"</span>
                          </div>
                          <div className="flex items-center justify-end text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform shrink-0">
                            <span>Mở {cat.questions.length} câu hỏi →</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="p-3.5 px-5 glass-surface border-t border-slate-200 dark:border-slate-800 shrink-0 flex items-center justify-between text-xs text-slate-500">
            <span>Bấm vào câu hỏi bất kỳ để tự động gửi cho Trí Nhân AI</span>
            <button
              onClick={() => {
                onClose();
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-300"
            >
              Đóng
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
