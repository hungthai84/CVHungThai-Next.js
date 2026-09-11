import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, ArrowLeft, Sparkles, User, Headphones, Cpu, Globe, Trophy, Compass, CheckCircle2, X, MessageSquarePlus } from 'lucide-react';

export interface QuestionCategoryNested {
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

export const NESTED_SAMPLE_CATEGORIES: QuestionCategoryNested[] = [
  {
    id: 'personal',
    num: '01',
    title: 'Giới thiệu cá nhân',
    titleEn: 'Personal Introduction',
    icon: User,
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-50/90 dark:bg-indigo-950/60',
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
    bgColor: 'bg-emerald-50/90 dark:bg-emerald-950/60',
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
    bgColor: 'bg-purple-50/90 dark:bg-purple-950/60',
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
    bgColor: 'bg-rose-50/90 dark:bg-rose-950/60',
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
    bgColor: 'bg-sky-50/90 dark:bg-sky-950/60',
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
    bgColor: 'bg-amber-50/90 dark:bg-amber-950/60',
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
    bgColor: 'bg-teal-50/90 dark:bg-teal-950/60',
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
    bgColor: 'bg-cyan-50/90 dark:bg-cyan-950/60',
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

interface AIMultiLevelDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectQuestion: (question: string) => void;
}

export const AIMultiLevelDropdown: React.FC<AIMultiLevelDropdownProps> = ({
  isOpen,
  onClose,
  onSelectQuestion,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Reset selected category when opened
  useEffect(() => {
    if (!isOpen) {
      setSelectedCategoryId(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const selectedCategory = NESTED_SAMPLE_CATEGORIES.find((c) => c.id === selectedCategoryId);

  const handleChooseQuestion = (q: string) => {
    onSelectQuestion(q);
    onClose();
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute bottom-full mb-2 left-2 right-2 max-h-[380px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-2xl border border-indigo-300/70 dark:border-indigo-700/70 shadow-2xl z-50 overflow-hidden flex flex-col animate-slide-up transition-all duration-200"
    >
      {/* HEADER BAR */}
      <div className="px-3.5 py-2.5 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          {selectedCategory ? (
            <button
              type="button"
              onClick={() => {
                setSelectedCategoryId(null);
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-white transition-colors cursor-pointer bg-white/10 px-2.5 py-1 rounded-lg border border-amber-300/30"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại</span>
            </button>
          ) : (
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          )}

          <h4 className="font-extrabold text-xs tracking-wide truncate max-w-[200px] sm:max-w-[280px]">
            {selectedCategory ? selectedCategory.title : 'Câu hỏi mẫu theo chủ đề'}
          </h4>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold">
            {selectedCategory ? `${selectedCategory.questions.length} câu` : `${NESTED_SAMPLE_CATEGORIES.reduce((acc, c) => acc + c.questions.length, 0)} câu`}
          </span>
          <button
            type="button"
            onClick={() => {
              onClose();
            }}
            className="p-1 rounded-lg hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Đóng menu câu hỏi mẫu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto max-h-[310px] p-2.5 scrollbar-thin">
        {!selectedCategory ? (
          /* 1-COLUMN CATEGORY LIST */
          <div>
            <div className="text-[10px] font-extrabold uppercase text-slate-500 dark:text-slate-400 px-1 mb-2 tracking-wider flex items-center justify-between">
              <span>Chọn danh mục chủ đề:</span>
              <span className="text-[9.5px] text-indigo-500 font-bold">Bấm mục để xem câu hỏi</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {NESTED_SAMPLE_CATEGORIES.map((cat) => {
                const IconComp = cat.icon;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategoryId(cat.id);
                    }}
                    className={`p-2.5 rounded-xl border ${cat.borderColor} ${cat.bgColor} hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 text-left cursor-pointer flex items-center justify-between shadow-2xs group`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
                      <div className={`p-1.5 rounded-lg bg-white dark:bg-slate-900 border ${cat.borderColor} shrink-0`}>
                        <IconComp className={`w-4 h-4 ${cat.color}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200 truncate">
                          {cat.num}. {cat.title}
                        </div>
                        <div className="text-[9.5px] text-slate-500 dark:text-slate-400 truncate">
                          {cat.titleEn}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-md bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-400/20">
                        {cat.questions.length} câu
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* QUESTION LIST FOR SELECTED CATEGORY */
          <div className="space-y-1.5 animate-fade-in">
            <div className="text-[10.5px] font-extrabold uppercase text-indigo-600 dark:text-indigo-400 px-1 pb-1 flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800">
              <span className="flex items-center gap-1.5">
                <selectedCategory.icon className="w-3.5 h-3.5" />
                <span>Danh sách câu hỏi:</span>
              </span>
              <span className="text-[9.5px] text-slate-400 font-normal">Click câu hỏi để tự động gửi</span>
            </div>

            {selectedCategory.questions.map((q, qIdx) => (
              <button
                key={qIdx}
                type="button"
                onClick={() => handleChooseQuestion(q)}
                className="w-full text-left p-2.5 rounded-xl text-[11px] font-semibold text-slate-800 dark:text-slate-200 bg-white/70 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-900 dark:hover:text-indigo-200 border border-slate-200/80 dark:border-slate-700/80 hover:border-indigo-400/50 shadow-2xs transition-all flex items-start gap-2 cursor-pointer group"
              >
                <span className="w-5 h-5 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  {qIdx + 1}
                </span>
                <span className="leading-snug flex-1">{q}</span>
                <MessageSquarePlus className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 shrink-0 mt-0.5 transition-colors" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

