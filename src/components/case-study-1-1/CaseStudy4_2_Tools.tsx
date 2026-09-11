import React, { useState } from "react";
import { 
  Compass, 
  TrendingUp, 
  Users, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Briefcase, 
  GraduationCap, 
  Star, 
  ChevronRight, 
  BarChart3, 
  ShieldCheck, 
  Check, 
  Layers
} from "lucide-react";

interface CareerLevel {
  id: string;
  level: string;
  name: string;
  track: "all" | "specialist" | "management";
  experience: string;
  salaryRange: string;
  ask: {
    attitude: string[];
    skills: string[];
    knowledge: string[];
  };
  keyResponsibilities: string[];
  promotionCriteria: string;
}

const CAREER_LEVELS: CareerLevel[] = [
  {
    id: "l1",
    level: "Level 1",
    name: "Trainee / Probation Agent",
    track: "all",
    experience: "0 - 2 tháng",
    salaryRange: "7.5 - 9 Triệu VNĐ",
    ask: {
      attitude: ["Kỷ luật giờ giấc & ca trực", "Tinh thần cầu thị, chủ động học hỏi", "Thân thiện, tôn trọng khách hàng"],
      skills: ["Gõ phím & thao tác phần mềm CRM cơ bản", "Lắng nghe chủ động", "Kỹ năng kiểm soát cảm xúc cơ bản"],
      knowledge: ["Nắm vững 50 FAQ thường gặp nhất", "Hiểu cấu trúc luồng ticket cơ bản", "Quy định bảo mật thông tin"]
    },
    keyResponsibilities: ["Tiếp nhận các yêu cầu tra cứu đơn giản", "Ghi chép log tương tác đầy đủ", "Hoàn thành 100% bài thi E-Learning"],
    promotionCriteria: "Vượt qua kỳ sát hạch thử việc với điểm số > 85% và CSAT > 4.2/5"
  },
  {
    id: "l2",
    level: "Level 2",
    name: "Junior CS Agent",
    track: "all",
    experience: "3 - 12 tháng",
    salaryRange: "9 - 13 Triệu VNĐ + Thưởng KPI",
    ask: {
      attitude: ["Kiên nhẫn trước khách hàng khó tính", "Ý thức trách nhiệm với ca trực", "Hòa đồng, hỗ trợ đồng đội"],
      skills: ["Xử lý đa nhiệm (Chat 3-4 phiên cùng lúc)", "Kỹ năng thương lượng & xoa dịu xung đột", "Tra cứu tri thức nhanh trong 15s"],
      knowledge: ["Nắm vững 95% chính sách sản phẩm", "Quy trình chuyển giao Tuyến 2", "Tiêu chí chấm điểm QA Scorecard"]
    },
    keyResponsibilities: ["Xử lý độc lập 80-100 cuộc gọi/chat mỗi ngày", "Duy trì FCR > 75% và QA Score > 90%", "Báo cáo lỗi sản phẩm bất thường"],
    promotionCriteria: "Duy trì QA > 92% trong 3 tháng liên tiếp, CSAT > 4.6/5 và hoàn thành khóa đào tạo nâng cao"
  },
  {
    id: "l3",
    level: "Level 3",
    name: "Senior CS Specialist",
    track: "all",
    experience: "1 - 2 năm",
    salaryRange: "13 - 18 Triệu VNĐ + Thưởng dự án",
    ask: {
      attitude: ["Tư duy lấy khách hàng làm trung tâm", "Chủ động đề xuất cải tiến quy trình", "Sẵn sàng Mentor nhân sự mới"],
      skills: ["Xử lý khiếu nại cấp độ 2 (Escalation)", "Kỹ năng phân tích nguyên nhân gốc rễ", "Kỹ năng viết tài liệu hướng dẫn (SOP)"],
      knowledge: ["Hiểu sâu sắc luồng nghiệp vụ liên phòng ban", "Quy định pháp lý & bồi thường", "Hệ thống CTI & Logic tự động hóa"]
    },
    keyResponsibilities: ["Xử lý các ca khiếu nại gay gắt", "Kèm cặp 1-on-1 cho 2-3 nhân viên mới", "Tham gia ban kiểm thử tính năng mới"],
    promotionCriteria: "Hoàn thành bài thi đánh giá năng lực Lộ trình Kép (Specialist Track hoặc Management Track) đạt loại Giỏi"
  },
  {
    id: "l4_spec",
    level: "Level 4 (Nhánh Chuyên Gia)",
    name: "QA Specialist / CS Trainer / SME",
    track: "specialist",
    experience: "2 - 4 năm",
    salaryRange: "18 - 28 Triệu VNĐ",
    ask: {
      attitude: ["Công tâm, khách quan tuyệt đối", "Đam mê nghiên cứu chuyên môn sâu", "Tỉ mỉ, hướng tới sự hoàn hảo"],
      skills: ["Thiết kế bài giảng & đứng lớp đào tạo", "Phân tích dữ liệu giọng nói Speech Analytics", "Hiệu chuẩn và kiểm toán chất lượng COPC"],
      knowledge: ["Chuẩn mực quản trị chất lượng quốc tế", "Phương pháp sư phạm Micro-learning", "Quy trình thiết kế hành trình CJM"]
    },
    keyResponsibilities: ["Chấm điểm & phản hồi chất lượng cho 50+ nhân sự", "Biên soạn giáo trình đào tạo nội bộ", "Chủ trì các phiên hiệu chuẩn chất lượng tuần"],
    promotionCriteria: "Có chứng chỉ chuyên môn quốc tế (COPC/Six Sigma) và dẫn dắt thành công 2 dự án cải tiến CX lớn"
  },
  {
    id: "l4_mgmt",
    level: "Level 4 (Nhánh Quản Trị)",
    name: "Customer Service Team Lead",
    track: "management",
    experience: "2 - 4 năm",
    salaryRange: "18 - 28 Triệu VNĐ + Thưởng hiệu suất nhóm",
    ask: {
      attitude: ["Tư duy lãnh đạo phục vụ (Servant Leadership)", "Bản lĩnh chịu áp lực cao", "Khích lệ và truyền cảm hứng"],
      skills: ["Điều phối ca trực & quản trị WFM", "Huấn luyện 1-on-1 & giải quyết xung đột", "Phân tích số liệu Realtime Dashboard"],
      knowledge: ["Luật lao động & quản trị năng suất nhân sự", "Kỹ thuật giao việc và đánh giá OKR/KPI", "Quy trình ứng phó khủng hoảng War Room"]
    },
    keyResponsibilities: ["Quản lý trực tiếp nhóm 15 - 25 nhân sự", "Chịu trách nhiệm về SLA, CSAT và Tỷ lệ nghỉ việc của nhóm", "Tổ chức họp ca và động viên tinh thần hàng ngày"],
    promotionCriteria: "Duy trì nhóm đạt Top 1-2 hiệu suất toàn công ty trong 6 tháng, tỷ lệ nhân viên do mình đào tạo thăng chức > 30%"
  },
  {
    id: "l5",
    level: "Level 5",
    name: "Customer Service Manager / Head of CS",
    track: "management",
    experience: "4+ năm",
    salaryRange: "30 - 55+ Triệu VNĐ",
    ask: {
      attitude: ["Tầm nhìn chiến lược dài hạn", "Tư duy kinh doanh & cân bằng chi phí", "Văn hóa thấu cảm & vị nhân sinh"],
      skills: ["Hoạch định ngân sách & chiến lược công nghệ", "Quản trị đối tác BPO & nhà cung cấp", "Đàm phán và thuyết trình cấp C-Level"],
      knowledge: ["Toàn cảnh hệ sinh thái CX và công nghệ AI", "Quản trị biến động và rủi ro kinh doanh", "Chiến lược tối ưu giá trị trọn đời (LTV)"]
    },
    keyResponsibilities: ["Xây dựng chiến lược CSKH 3-5 năm", "Quản lý toàn bộ ngân sách và nhân sự khối CSKH (100-500+ người)", "Báo cáo trực tiếp cho CEO/COO"],
    promotionCriteria: "Vị trí lãnh đạo cấp cao phụ thuộc vào đóng góp chiến lược và sự tăng trưởng của doanh nghiệp"
  }
];

export function CaseStudy4_2_Tools() {
  const [selectedLevelId, setSelectedLevelId] = useState<string>("l3");
  const [trackFilter, setTrackFilter] = useState<"all" | "specialist" | "management">("all");

  // Interactive Self-Assessment State
  const [agentSkills, setAgentSkills] = useState<{ [key: string]: boolean }>({
    s1: true,
    s2: true,
    s3: false,
    s4: false,
    s5: true,
    s6: false
  });

  const selectedLevel = CAREER_LEVELS.find(l => l.id === selectedLevelId) || CAREER_LEVELS[2];

  const filteredLevels = CAREER_LEVELS.filter(l => {
    if (trackFilter === "all") return true;
    return l.track === "all" || l.track === trackFilter;
  });

  return (
    <div className="glass-base p-6 sm:p-8 rounded-3xl space-y-8 border border-purple-200 dark:border-purple-800/60 bg-white/80 dark:bg-slate-900/80 shadow-xl backdrop-blur-xl">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Tool
          </span>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
            Bộ Tra Cứu Khung Năng Lực ASK & Mô Phỏng Lộ Trình Thăng Tiến Kép
          </h3>
        </div>
        
        {/* Track Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto text-xs">
          <button 
            onClick={() => setTrackFilter("all")}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              trackFilter === "all" 
                ? "bg-purple-600 text-white shadow-md" 
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            Tất Cả Cấp Bậc
          </button>
          <button 
            onClick={() => setTrackFilter("specialist")}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              trackFilter === "specialist" 
                ? "bg-indigo-600 text-white shadow-md" 
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            Nhánh Chuyên Gia (SME/QA)
          </button>
          <button 
            onClick={() => setTrackFilter("management")}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              trackFilter === "management" 
                ? "bg-emerald-600 text-white shadow-md" 
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            Nhánh Quản Trị (Lead/Manager)
          </button>
        </div>
      </div>

      {/* Main Grid: Left = Level Selector, Right = ASK Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Career Ladder List (5 cols) */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Chọn Cấp Bậc Để Xem Từ Điển ASK
          </div>
          {filteredLevels.map((lvl) => {
            const isSelected = lvl.id === selectedLevelId;
            return (
              <div
                key={lvl.id}
                onClick={() => setSelectedLevelId(lvl.id)}
                className={`p-4 rounded-2xl cursor-pointer border transition-all duration-200 flex items-center justify-between ${
                  isSelected 
                    ? "bg-purple-50 dark:bg-purple-950/50 border-purple-500 shadow-md ring-2 ring-purple-500/20" 
                    : "bg-white/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                      lvl.track === "specialist" 
                        ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300"
                        : lvl.track === "management"
                        ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300"
                        : "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300"
                    }`}>
                      {lvl.level}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">({lvl.experience})</span>
                  </div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    {lvl.name}
                  </div>
                  <div className="text-xs text-purple-600 dark:text-purple-400 font-semibold">
                    {lvl.salaryRange}
                  </div>
                </div>
                <ChevronRight className={`w-5 h-5 transition-transform ${isSelected ? "text-purple-600 transform translate-x-1" : "text-slate-300 dark:text-slate-600"}`} />
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Level Full Profile (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Header Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                {selectedLevel.level} • {selectedLevel.track === "specialist" ? "Specialist Track" : selectedLevel.track === "management" ? "Management Track" : "Core Progression"}
              </span>
              <span className="text-xs text-purple-200 font-medium">Thâm niên yêu cầu: {selectedLevel.experience}</span>
            </div>
            <h4 className="text-xl font-extrabold">{selectedLevel.name}</h4>
            <div className="flex items-center gap-4 text-xs text-purple-100 pt-1 border-t border-white/10">
              <div>
                <span className="text-purple-300 block text-[10px]">Mức Thu Nhập:</span>
                <span className="font-bold text-white text-sm">{selectedLevel.salaryRange}</span>
              </div>
              <div className="border-l border-white/20 pl-4">
                <span className="text-purple-300 block text-[10px]">Đánh Giá Hiệu Suất:</span>
                <span className="font-bold text-white text-sm">Hàng Quý (Quarterly)</span>
              </div>
            </div>
          </div>

          {/* ASK 3-Pillars Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Attitude */}
            <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200/70 dark:border-rose-900/40 space-y-2">
              <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-bold text-xs">
                <Star className="w-3.5 h-3.5" />
                <span>A - Attitude (Thái độ)</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {selectedLevel.ask.attitude.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/40 space-y-2">
              <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold text-xs">
                <Briefcase className="w-3.5 h-3.5" />
                <span>S - Skills (Kỹ năng)</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {selectedLevel.ask.skills.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Knowledge */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-900/40 space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>K - Knowledge (Kiến thức)</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {selectedLevel.ask.knowledge.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Promotion Criteria Box */}
          <div className="p-4 rounded-2xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 space-y-1.5">
            <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-purple-600" /> Tiêu Chí Sát Hạch Để Thăng Cấp:
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-200 font-medium">
              {selectedLevel.promotionCriteria}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
