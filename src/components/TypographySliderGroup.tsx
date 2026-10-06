import React, { useState } from "react";
import { TypoCustomSizes } from "../context/ThemeContext";
import { Type, Sparkles, SlidersHorizontal, Eye, ChevronDown, Check, Layers, Sliders, Maximize2 } from "lucide-react";
import { cn } from "../lib/utils";

interface TypographySliderGroupProps {
  localTypoSizes: TypoCustomSizes;
  setLocalTypoSizes: React.Dispatch<React.SetStateAction<TypoCustomSizes>>;
  isVi: boolean;
  playClick: () => void;
}

export const TypographySliderGroup: React.FC<TypographySliderGroupProps> = ({
  localTypoSizes,
  setLocalTypoSizes,
  isVi,
  playClick,
}) => {
  const [selectedTokenKey, setSelectedTokenKey] = useState<string>("all");

  const TOKENS = [
    { 
      key: "hero-h1", 
      labelVi: "Hero H1 (Tiêu đề đại diện lớn)", 
      labelEn: "Hero H1 Size", 
      min: 20, 
      max: 80, 
      defaultVal: 48,
      varName: "--font-size-display",
      categoryVi: "Tiêu đề Banner & Hero",
      categoryEn: "Banner & Hero Heading",
      descVi: "Áp dụng cho tiêu đề chính tại trang chủ, tên thương hiệu cá nhân lớn nhất",
      descEn: "Applies to main hero titles and prominent personal brand headings",
      sampleVi: "Nguyễn Hùng Thái — Head of Customer Care",
      sampleEn: "Nguyen Hung Thai — Head of Customer Care"
    },
    { 
      key: "h1", 
      labelVi: "H1 (Tiêu đề chính)", 
      labelEn: "H1 Size", 
      min: 18, 
      max: 70, 
      defaultVal: 38,
      varName: "--font-size-h1",
      categoryVi: "Tiêu đề Trang & Khối",
      categoryEn: "Page & Block Title",
      descVi: "Tiêu đề chính đầu trang của mỗi trang mục (Giới thiệu, Kỹ năng, Dự án)",
      descEn: "Primary page headers across section intro banners",
      sampleVi: "Chiến Lược Vận Hành & Chăm Sóc Khách Hàng",
      sampleEn: "Operations & Customer Experience Strategy"
    },
    { 
      key: "h2", 
      labelVi: "H2 (Tiêu đề mục)", 
      labelEn: "H2 Size", 
      min: 16, 
      max: 60, 
      defaultVal: 28,
      varName: "--font-size-h2",
      categoryVi: "Tiêu đề Nhóm Chức Năng",
      categoryEn: "Functional Group Header",
      descVi: "Tiêu đề nhóm chức năng, bảng xếp hạng và các mốc dòng thời gian kinh nghiệm",
      descEn: "Timeline milestones, functional groupings and matrix headers",
      sampleVi: "Kinh Nghiệm & Thành Tựu Vận Hành 22+ Năm",
      sampleEn: "22+ Years of Leadership Experience & Impact"
    },
    { 
      key: "h3", 
      labelVi: "H3 (Tiêu đề phụ)", 
      labelEn: "H3 Size", 
      min: 14, 
      max: 50, 
      defaultVal: 22,
      varName: "--font-size-h3",
      categoryVi: "Phân Mục & Thẻ Con",
      categoryEn: "Subsection & Sub-card",
      descVi: "Tiêu đề phân cấp 3 cho các khối bento chi tiết, thẻ dự án nổi bật",
      descEn: "Level 3 headers for detailed bento tiles and project highlights",
      sampleVi: "Kiến trúc hệ thống CSKH chuẩn quốc tế",
      sampleEn: "International standard CSKH architecture"
    },
    { 
      key: "h4", 
      labelVi: "H4 (Tiêu đề nhỏ)", 
      labelEn: "H4 Size", 
      min: 12, 
      max: 40, 
      defaultVal: 18,
      varName: "--font-size-h4",
      categoryVi: "Nhãn Khối Nổi Bật",
      categoryEn: "Feature Block Header",
      descVi: "Tiêu đề card nhỏ, nhóm công cụ và tiêu đề pop-up modal",
      descEn: "Mini-card headers, tool clusters and modal sub-headings",
      sampleVi: "Trụ cột 01. Hiệu quả tối ưu & Kết quả đo lường",
      sampleEn: "Pillar 01. Optimal efficiency & measurable results"
    },
    { 
      key: "card-title-lg", 
      labelVi: "Card Title lớn (Thẻ lớn)", 
      labelEn: "Card Title Large", 
      min: 12, 
      max: 36, 
      defaultVal: 18,
      varName: "--font-size-h5",
      categoryVi: "Thẻ Bento Nổi Bật",
      categoryEn: "Prominent Bento Card",
      descVi: "Tiêu đề các thẻ bento lớn tại trang Học vấn, Dự án, Kỹ năng",
      descEn: "Main headers for large cards in Education, Projects, Skills",
      sampleVi: "Hệ thống Quản Trị Đa Kênh Tích Hợp AI",
      sampleEn: "AI-Powered Omnichannel Management System"
    },
    { 
      key: "card-title", 
      labelVi: "Card Title (Thẻ tiêu chuẩn)", 
      labelEn: "Card Title", 
      min: 10, 
      max: 32, 
      defaultVal: 16,
      varName: "--font-size-card-title",
      categoryVi: "Thẻ Tiêu Chuẩn",
      categoryEn: "Standard Card",
      descVi: "Cỡ chữ tiêu chuẩn cho tiêu đề tất cả thẻ nội dung lưới grid",
      descEn: "Default title size for all standard grid cards",
      sampleVi: "Giám Đốc Khối Chăm Sóc Khách Hàng",
      sampleEn: "Customer Care Director & Head of CX"
    },
    { 
      key: "card-subtitle", 
      labelVi: "Card Subtitle (Phụ đề thẻ)", 
      labelEn: "Card Subtitle", 
      min: 8, 
      max: 28, 
      defaultVal: 14,
      varName: "--font-size-h7",
      categoryVi: "Phụ Đề & Metadata",
      categoryEn: "Subtitle & Meta",
      descVi: "Dòng mô tả chức danh, công ty và địa điểm trong thẻ",
      descEn: "Position subtitle, company names and card metadata",
      sampleVi: "Tập Đoàn Công Nghệ & Thương Mại Điện Tử Quốc Tế",
      sampleEn: "International Technology & E-Commerce Enterprise"
    },
    { 
      key: "card-icon", 
      labelVi: "Card icon (Icon trong thẻ)", 
      labelEn: "Card icon size", 
      min: 12, 
      max: 48, 
      defaultVal: 20,
      varName: "--font-size-icon",
      categoryVi: "Biểu Tượng Đồ Họa",
      categoryEn: "Icon Sizing",
      descVi: "Kích thước các icon Lucide vector hiển thị bên trong thẻ và nút",
      descEn: "Lucide vector icon dimensions across all cards and interactive buttons",
      sampleVi: "⚡ 🚀 ✦ 🛡️ 💎 🎯",
      sampleEn: "⚡ 🚀 ✦ 🛡️ 💎 🎯"
    },
    { 
      key: "counter", 
      labelVi: "Counter (Bộ đếm số liệu)", 
      labelEn: "Counter", 
      min: 16, 
      max: 80, 
      defaultVal: 32,
      varName: "--font-size-stat",
      categoryVi: "Số Liệu & Thành Tựu",
      categoryEn: "Metrics & Numbers",
      descVi: "Con số thành tích nổi bật: 22+, 98%, 500K+, 100% SLA",
      descEn: "Prominent metric counter typography: 22+, 98%, 500K+",
      sampleVi: "22+ Năm Kinh Nghiệm | 98.6% CSAT",
      sampleEn: "22+ Years Leadership | 98.6% CSAT"
    },
    { 
      key: "body", 
      labelVi: "Body (Văn bản nội dung)", 
      labelEn: "Body Text", 
      min: 10, 
      max: 24, 
      defaultVal: 15,
      varName: "--font-size-body",
      categoryVi: "Nội Dung Chính",
      categoryEn: "Body Content",
      descVi: "Văn bản đọc chính: đoạn văn thư ngỏ, mô tả kinh nghiệm, case study",
      descEn: "Main reading paragraphs in letters, experience descriptions and case studies",
      sampleVi: "Định hướng phát triển bền vững lấy khách hàng làm trọng tâm, tối ưu hóa quy trình nghiệp vụ.",
      sampleEn: "Sustainable customer-centric growth, streamlining operational processes and workflows."
    },
    { 
      key: "body-sm", 
      labelVi: "Body Small (Văn bản nhỏ)", 
      labelEn: "Body Small", 
      min: 8, 
      max: 22, 
      defaultVal: 13,
      varName: "--font-size-body-sm",
      categoryVi: "Văn Bản Phụ",
      categoryEn: "Secondary Text",
      descVi: "Mô tả phụ, danh sách gạch đầu dòng chi tiết và ghi chú",
      descEn: "Secondary descriptions, bullet points and sub-notes",
      sampleVi: "Quản lý và vận hành đội ngũ 150+ nhân sự chuyên trách dịch vụ khách hàng toàn quốc.",
      sampleEn: "Managed 150+ nationwide customer service personnel team."
    },
    { 
      key: "caption", 
      labelVi: "Caption (Chú thích)", 
      labelEn: "Caption", 
      min: 8, 
      max: 20, 
      defaultVal: 12,
      varName: "--font-size-caption",
      categoryVi: "Ghi Chú & Thời Gian",
      categoryEn: "Caption & Dates",
      descVi: "Chú thích ảnh, năm công tác, thẻ hashtag và mã dự án",
      descEn: "Image captions, timeline date ranges, hashtags and project codes",
      sampleVi: "Niên khóa 2002 – 2006 • Đại học Văn Lang TP.HCM",
      sampleEn: "Academic Years 2002 – 2006 • Van Lang University"
    },
    { 
      key: "label", 
      labelVi: "Label (Nhãn mô tả)", 
      labelEn: "Label", 
      min: 8, 
      max: 22, 
      defaultVal: 12,
      varName: "--font-size-label",
      categoryVi: "Nhãn Trường Dữ Liệu",
      categoryEn: "Field Labels",
      descVi: "Nhãn thông tin cá nhân, tiêu đề cột bảng biểu và chỉ mục",
      descEn: "Demographic field labels, table column headers and indexes",
      sampleVi: "HỌ VÀ TÊN • EMAIL DOANH NGHIỆP • ĐIỆN THOẠI",
      sampleEn: "FULL NAME • WORK EMAIL • MOBILE PHONE"
    },
    { 
      key: "badge", 
      labelVi: "Badge (Huy hiệu nhãn)", 
      labelEn: "Badge", 
      min: 6, 
      max: 18, 
      defaultVal: 10,
      varName: "--font-size-3xs",
      categoryVi: "Huy Hiệu Pill",
      categoryEn: "Status Badges",
      descVi: "Các thẻ tag công nghệ, pill trạng thái 'Đang hoạt động', 'Online'",
      descEn: "Tech stack badges, status pills 'Active', 'Online', 'Pro'",
      sampleVi: "REACT • NEXT.JS • GSAP • CX MASTER",
      sampleEn: "REACT • NEXT.JS • GSAP • CX MASTER"
    },
    { 
      key: "navigation", 
      labelVi: "Navigation (Chữ thanh menu)", 
      labelEn: "Navigation font size", 
      min: 10, 
      max: 24, 
      defaultVal: 15,
      varName: "--font-size-nav",
      categoryVi: "Thanh Điều Hướng",
      categoryEn: "Navigation Bar",
      descVi: "Cỡ chữ các mục chuyển trang trên Header Liquid Glass và Footer Dock",
      descEn: "Font size for navigation items on top header and bottom dock",
      sampleVi: "Trang chủ • Giới thiệu • Học vấn • Kinh nghiệm • Dự án",
      sampleEn: "Home • About • Education • Experience • Projects"
    },
    { 
      key: "button", 
      labelVi: "Button (Kích thước chữ nút)", 
      labelEn: "Button size", 
      min: 10, 
      max: 24, 
      defaultVal: 14,
      varName: "--font-size-button",
      categoryVi: "Nút Bấm & Hành Động",
      categoryEn: "Buttons & CTAs",
      descVi: "Văn bản trên các nút bấm CTA chính, nút tải CV và nút gửi liên hệ",
      descEn: "Text size on primary CTA buttons, resume download and contact triggers",
      sampleVi: "KẾT NỐI VỚI TÔI • TẢI HỒ SƠ PDF",
      sampleEn: "CONNECT WITH ME • DOWNLOAD RESUME"
    },
    { 
      key: "input", 
      labelVi: "Input (Chữ ô nhập liệu)", 
      labelEn: "Input box size", 
      min: 10, 
      max: 24, 
      defaultVal: 14,
      varName: "--font-size-input",
      categoryVi: "Biểu Mẫu & Form",
      categoryEn: "Form Inputs",
      descVi: "Kích thước chữ nhập trong form liên hệ và thanh tìm kiếm",
      descEn: "Form input text dimensions for contact forms and search bars",
      sampleVi: "Nhập nội dung tin nhắn của bạn...",
      sampleEn: "Enter your message here..."
    },
    { 
      key: "tooltip", 
      labelVi: "Tooltip (Chữ ô gợi ý)", 
      labelEn: "Tooltip label size", 
      min: 8, 
      max: 18, 
      defaultVal: 12,
      varName: "--font-size-tooltip",
      categoryVi: "Gợi Ý Nổi (Tooltip)",
      categoryEn: "Floating Tooltips",
      descVi: "Chữ hiển thị trong các tooltip bay nổi khi rê chuột vào icon",
      descEn: "Hover tooltip popup typography over interactive elements",
      sampleVi: "Khám phá chi tiết hành trình sự nghiệp ✦",
      sampleEn: "Explore full career journey details ✦"
    },
    { 
      key: "header-height", 
      labelVi: "Header & Footer height (Chiều cao)", 
      labelEn: "Header & Footer Height", 
      min: 40, 
      max: 160, 
      defaultVal: 75,
      varName: "--header-height",
      categoryVi: "Khung Thanh Điều Khiển",
      categoryEn: "Bar Containers",
      descVi: "Chiều cao tổng thể của thanh Header trên cùng và Footer dưới cùng",
      descEn: "Overall fixed bar heights for top Header and bottom Footer",
      sampleVi: "Chiều cao thanh chuẩn: 75px (Tự co giãn an toàn)",
      sampleEn: "Standard bar height: 75px (Responsive auto-fit)"
    },
  ];

  const filteredTokens = selectedTokenKey === "all" 
    ? TOKENS 
    : TOKENS.filter((t) => t.key === selectedTokenKey);

  const selectedTokenObj = TOKENS.find(t => t.key === selectedTokenKey);

  return (
    <div className="space-y-4">
      {/* Dropdown Menu Selector (Gom gọn lại thành menu dropbox chọn cái nào sẽ hiển thị ra tùy chỉnh) */}
      <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-indigo-200/60 dark:border-cyan-500/20 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 dark:bg-cyan-500/10 text-indigo-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">
              {isVi ? "Chọn thành phần cần điều chỉnh:" : "Select component to customize:"}
            </div>
            <div className="text-3xs text-slate-500 dark:text-slate-400">
              {selectedTokenKey === "all" 
                ? (isVi ? "Đang hiển thị toàn bộ 20 thông số cỡ chữ & chiều cao" : "Showing all 20 typography & height parameters") 
                : (isVi ? `Đang tùy chỉnh riêng: ${selectedTokenObj?.labelVi}` : `Currently customizing: ${selectedTokenObj?.labelEn}`)}
            </div>
          </div>
        </div>

        {/* Dropbox select control */}
        <div className="relative w-full sm:w-auto min-w-[240px]">
          <select
            value={selectedTokenKey}
            onChange={(e) => {
              setSelectedTokenKey(e.target.value);
              playClick();
            }}
            className="w-full appearance-none px-3.5 py-2 pr-9 rounded-xl bg-slate-100/90 dark:bg-white/10 hover:bg-slate-200/80 dark:hover:bg-white/15 border border-slate-300/80 dark:border-white/15 text-xs font-bold text-slate-800 dark:text-white cursor-pointer transition-all outline-hidden focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-400"
          >
            <option value="all" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold">
              {isVi ? "✨ Hiển thị tất cả thành phần (20 mục)" : "✨ Show All Components (20 items)"}
            </option>
            <optgroup label={isVi ? "--- Tiêu đề & Phân cấp (Headings) ---" : "--- Headings & Titles ---"}>
              <option value="hero-h1" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                Hero H1 (Tiêu đề đại diện) — 48px
              </option>
              <option value="h1" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                H1 (Tiêu đề chính trang) — 38px
              </option>
              <option value="h2" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                H2 (Tiêu đề mục) — 28px
              </option>
              <option value="h3" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                H3 (Tiêu đề phụ) — 22px
              </option>
              <option value="h4" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                H4 (Tiêu đề nhỏ) — 18px
              </option>
            </optgroup>
            <optgroup label={isVi ? "--- Thẻ Bento & Thẻ nội dung (Cards) ---" : "--- Bento Cards & Content ---"}>
              <option value="card-title-lg" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                Card Title lớn (Thẻ lớn) — 18px
              </option>
              <option value="card-title" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                Card Title (Thẻ tiêu chuẩn) — 16px
              </option>
              <option value="card-subtitle" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                Card Subtitle (Phụ đề thẻ) — 14px
              </option>
              <option value="card-icon" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                Card Icon (Kích thước icon thẻ) — 20px
              </option>
              <option value="counter" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                Counter (Số liệu nổi bật) — 32px
              </option>
            </optgroup>
            <optgroup label={isVi ? "--- Nội dung đọc & Đoạn văn (Body & Text) ---" : "--- Reading & Body Text ---"}>
              <option value="body" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                Body (Văn bản nội dung chính) — 15px
              </option>
              <option value="body-sm" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                Body Small (Văn bản phụ) — 13px
              </option>
              <option value="caption" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                Caption (Chú thích) — 12px
              </option>
              <option value="label" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                Label (Nhãn dữ liệu) — 12px
              </option>
              <option value="badge" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                Badge (Huy hiệu nhãn tag) — 10px
              </option>
            </optgroup>
            <optgroup label={isVi ? "--- Điều hướng & Tương tác (UI & Frame) ---" : "--- UI Controls & Bars ---"}>
              <option value="navigation" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                Navigation (Chữ thanh menu) — 15px
              </option>
              <option value="button" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                Button (Kích thước chữ nút) — 14px
              </option>
              <option value="input" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                Input (Chữ ô nhập liệu) — 14px
              </option>
              <option value="tooltip" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                Tooltip (Chữ ô gợi ý nổi) — 12px
              </option>
              <option value="header-height" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                Header & Footer (Chiều cao thanh) — 75px
              </option>
            </optgroup>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Grid of Token Adjusters */}
      <div className={cn(
        "grid gap-4",
        filteredTokens.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
      )}>
        {filteredTokens.map((item) => {
          const currentVal = localTypoSizes[item.key as keyof TypoCustomSizes] || item.defaultVal || 16;

          const handleIncrement = (step = 1) => {
            const nextVal = Math.min(item.max, currentVal + step);
            setLocalTypoSizes((prev) => ({ ...prev, [item.key]: nextVal }));
            playClick();
          };

          const handleDecrement = (step = 1) => {
            const nextVal = Math.max(item.min, currentVal - step);
            setLocalTypoSizes((prev) => ({ ...prev, [item.key]: nextVal }));
            playClick();
          };

          const handleReset = () => {
            setLocalTypoSizes((prev) => ({ ...prev, [item.key]: item.defaultVal }));
            playClick();
          };

          const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const nextVal = parseInt(e.target.value);
            setLocalTypoSizes((prev) => ({ ...prev, [item.key]: nextVal }));
          };

          return (
            <div
              key={item.key}
              className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 hover:border-indigo-400 dark:hover:border-cyan-400 hover:shadow-md transition-all flex flex-col justify-between gap-3 text-left shadow-xs group"
            >
              {/* Header with Title, Category Badge & CSS Token */}
              <div className="space-y-1.5 pb-2 border-b border-slate-200/60 dark:border-white/10">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-lg bg-indigo-500/10 dark:bg-cyan-500/10 text-indigo-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                      <Type className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate">
                      {isVi ? item.labelVi : item.labelEn}
                    </span>
                  </div>
                  <span className="text-3xs font-mono font-bold text-indigo-600 dark:text-cyan-400 px-2 py-0.5 rounded-md bg-indigo-500/10 dark:bg-cyan-500/10 uppercase tracking-wider">
                    {item.varName}
                  </span>
                </div>

                {/* Category tag and scope */}
                <div className="flex items-center justify-between text-3xs text-slate-500 dark:text-slate-400 gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/5 font-semibold text-slate-600 dark:text-slate-300">
                    {isVi ? item.categoryVi : item.categoryEn}
                  </span>
                  <span className="font-mono">
                    {isVi ? `Phạm vi: ${item.min}px – ${item.max}px` : `Range: ${item.min}px – ${item.max}px`}
                  </span>
                </div>

                {/* Detailed Description */}
                <p className="text-2xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {isVi ? item.descVi : item.descEn}
                </p>
              </div>

              {/* Real-time Visual Typography Preview Box */}
              <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 overflow-hidden flex flex-col gap-1">
                <div className="flex items-center justify-between text-3xs text-slate-400 font-semibold mb-0.5">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3 text-indigo-500" />
                    <span>{isVi ? "Xem trước trực tiếp:" : "Live Preview:"}</span>
                  </span>
                  <span className="font-mono font-black text-slate-900 dark:text-white bg-indigo-500/15 dark:bg-cyan-500/15 text-indigo-700 dark:text-cyan-300 px-2 py-0.5 rounded">
                    {currentVal}px
                  </span>
                </div>
                
                <div 
                  className="font-play text-slate-900 dark:text-slate-100 font-bold truncate leading-tight py-1"
                  style={{ fontSize: `${Math.min(32, Math.max(11, currentVal))}px` }}
                >
                  {isVi ? item.sampleVi : item.sampleEn}
                </div>
              </div>

              {/* Controls: Quick Step Buttons & Slider */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDecrement(1)}
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200 cursor-pointer text-sm transition-colors shrink-0"
                    title={isVi ? "Giảm 1px" : "-1px"}
                  >
                    -1
                  </button>

                  <input
                    type="range"
                    min={item.min}
                    max={item.max}
                    value={currentVal}
                    onChange={handleSliderChange}
                    className="flex-grow accent-indigo-600 dark:accent-cyan-400 cursor-pointer h-2 rounded-full bg-slate-200 dark:bg-slate-700"
                  />

                  <button
                    type="button"
                    onClick={() => handleIncrement(1)}
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200 cursor-pointer text-sm transition-colors shrink-0"
                    title={isVi ? "Tăng 1px" : "+1px"}
                  >
                    +1
                  </button>
                </div>

                {/* Quick Actions Bar */}
                <div className="flex items-center justify-between text-3xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleDecrement(5)}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 font-semibold cursor-pointer"
                    >
                      -5px
                    </button>
                    <button
                      type="button"
                      onClick={() => handleIncrement(5)}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 font-semibold cursor-pointer"
                    >
                      +5px
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-indigo-600 dark:text-cyan-400 hover:underline font-semibold cursor-pointer"
                  >
                    {isVi ? `Chuẩn: ${item.defaultVal}px` : `Default: ${item.defaultVal}px`}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
