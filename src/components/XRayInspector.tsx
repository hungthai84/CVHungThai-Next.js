import React, { useState, useEffect, useRef } from "react";
import { 
  Scan, 
  X, 
  Copy, 
  Check, 
  Sparkles, 
  Layers, 
  Crosshair, 
  Terminal, 
  FolderTree,
  ChevronDown,
  ChevronRight,
  Edit3,
  Trash2,
  PlusCircle,
  MoveRight,
  ArrowRightLeft,
  ExternalLink,
  Globe,
  Tag,
  Target,
  Zap,
  RefreshCw,
  Sun,
  Moon,
  Info,
  CheckCircle2,
  ListPlus,
  AlertCircle,
  FileCode,
  RotateCw,
  Filter,
  Layout,
  Code2,
  Image,
  Boxes,
  Wrench,
  ShieldCheck,
  Activity,
  Play,
  Sliders,
  Gauge,
  Palette,
  CheckCheck,
  TrendingUp,
  Maximize2,
  BookOpen,
  Save,
  ListTodo,
  Bot,
  Clock,
  User,
  Plus,
  Monitor,
  MailOpen,
  UserCheck,
  Compass,
  GraduationCap,
  Briefcase,
  Brain,
  ClipboardList,
  Video,
  Images,
  LayoutGrid,
  MessagesSquare,
  Film,
  Navigation,
  Search,
  Eye,
  Grid,
  List,
  Type,
  Baseline,
  SlidersHorizontal,
  Columns,
  AlignLeft,
  Heading
} from "lucide-react";
import { playUiSound } from "../lib/sound";
import { cn } from "../lib/utils";

export interface TypographyTokenDef {
  id: string;
  level: string;
  variable: string;
  cssClass: string;
  labelVi: string;
  labelEn: string;
  targetElements: string;
  rangePx: string;
  clampValue: string;
  defaultWeight: string;
  defaultLineHeight: string;
  defaultLetterSpacing: string;
  desc: string;
}

export const GLOBAL_TYPOGRAPHY_TOKENS: TypographyTokenDef[] = [
  {
    id: "display",
    level: "Display",
    variable: "--font-size-display",
    cssClass: ".text-display",
    labelVi: "Tiêu đề Lớn (Hero Display)",
    labelEn: "Display Title",
    targetElements: "Tên chính Hero, Số lớn mở màn",
    rangePx: "40–52px",
    clampValue: "clamp(1.875rem, 3.5vw + 0.875rem, 3.25rem)",
    defaultWeight: "700",
    defaultLineHeight: "1.15",
    defaultLetterSpacing: "-0.01em",
    desc: "Mobile 30-36px, Tablet 36-44px, Desktop 40-52px. Dành riêng cho Tên Nguyễn Hùng Thái và số ấn tượng."
  },
  {
    id: "h1",
    level: "H1",
    variable: "--font-size-h1",
    cssClass: ".text-h1",
    labelVi: "Tiêu đề Cấp 1 (Section Title)",
    labelEn: "Heading 1",
    targetElements: "<h1>, Tiêu đề chính các Section",
    rangePx: "36–42px",
    clampValue: "clamp(1.75rem, 2.5vw + 0.75rem, 2.625rem)",
    defaultWeight: "700",
    defaultLineHeight: "1.2",
    defaultLetterSpacing: "-0.01em",
    desc: "Mobile 28-32px, Tablet 32-38px, Desktop 36-42px. Tiêu đề các trang Thư Ngỏ, Học Vấn, Kinh Nghiệm..."
  },
  {
    id: "h2",
    level: "H2",
    variable: "--font-size-h2",
    cssClass: ".text-h2",
    labelVi: "Tiêu đề Cấp 2 (Group / Sub-header)",
    labelEn: "Heading 2",
    targetElements: "<h2>, Tiêu đề nhóm, Sub-headers",
    rangePx: "28–34px",
    clampValue: "clamp(1.5rem, 1.8vw + 0.75rem, 2.125rem)",
    defaultWeight: "700",
    defaultLineHeight: "1.2",
    defaultLetterSpacing: "0",
    desc: "Mobile 24-28px, Tablet 26-30px, Desktop 28-34px. Nhóm nội dung và các phần phân loại."
  },
  {
    id: "h3",
    level: "H3",
    variable: "--font-size-h3",
    cssClass: ".text-h3",
    labelVi: "Tiêu đề Cấp 3 (Sub-section / Bento)",
    labelEn: "Heading 3",
    targetElements: "<h3>, Tiêu đề phụ, Tiêu đề Modal lớn",
    rangePx: "20–24px",
    clampValue: "clamp(1.125rem, 1vw + 0.75rem, 1.5rem)",
    defaultWeight: "700",
    defaultLineHeight: "1.25",
    defaultLetterSpacing: "0",
    desc: "Mobile 18-20px, Tablet 19-22px, Desktop 20-24px. Dùng cho tiêu đề phụ trong các khối bento."
  },
  {
    id: "h4",
    level: "H4",
    variable: "--font-size-h4",
    cssClass: ".text-h4",
    labelVi: "Tiêu đề Cấp 4 (Sub-heading / Micro Header)",
    labelEn: "Heading 4",
    targetElements: "<h4>, Tiêu đề mục nhỏ, Thẻ chi tiết",
    rangePx: "18–20px",
    clampValue: "clamp(1.0625rem, 0.4vw + 0.9rem, 1.25rem)",
    defaultWeight: "700",
    defaultLineHeight: "1.3",
    defaultLetterSpacing: "0",
    desc: "Mobile 17-18px, Desktop 18-20px. Dành cho các tiểu mục, phân đoạn chi tiết trong Bento card và modal."
  },
  {
    id: "h5",
    level: "H5",
    variable: "--font-size-h5",
    cssClass: ".text-h5",
    labelVi: "Tiêu đề Cấp 5 (Section Sub-header / Small Title)",
    labelEn: "Heading 5",
    targetElements: "<h5>, Tiêu đề phụ cấp 5, Thẻ bổ trợ",
    rangePx: "16–18px",
    clampValue: "clamp(1rem, 0.25vw + 0.9375rem, 1.125rem)",
    defaultWeight: "700",
    defaultLineHeight: "1.3",
    defaultLetterSpacing: "0",
    desc: "Mobile 16px, Tablet 17px, Desktop 18px. Tiêu đề cấp 5 cho các phân đoạn nội dung nhỏ."
  },
  {
    id: "h6",
    level: "H6",
    variable: "--font-size-h6",
    cssClass: ".text-h6",
    labelVi: "Tiêu đề Cấp 6 (Micro Header / Inline Title)",
    labelEn: "Heading 6",
    targetElements: "<h6>, Tiêu đề vi mô, Tiêu đề nội dòng",
    rangePx: "15–16px",
    clampValue: "clamp(0.9375rem, 0.2vw + 0.875rem, 1rem)",
    defaultWeight: "700",
    defaultLineHeight: "1.3",
    defaultLetterSpacing: "0",
    desc: "Mobile 15px, Desktop 16px. Tiêu đề cấp 6 cho nhãn thông số và tiêu đề nội dòng."
  },
  {
    id: "card-title",
    level: "Card Title",
    variable: "--font-size-card-title",
    cssClass: ".text-card-title",
    labelVi: "Tiêu đề Thẻ (Card / Bento Header)",
    labelEn: "Card Title",
    targetElements: "Bento Box Title, Project Card, Timeline Job Title",
    rangePx: "18–20px",
    clampValue: "clamp(1.0625rem, 0.4vw + 0.9rem, 1.25rem)",
    defaultWeight: "700",
    defaultLineHeight: "1.3",
    defaultLetterSpacing: "0",
    desc: "Mobile 17-18px, Desktop 18-20px. Tiêu đề các khối card dự án, kinh nghiệm, học vấn."
  },
  {
    id: "body-bold",
    level: "Body Bold",
    variable: "--font-size-body",
    cssClass: ".text-body-bold",
    labelVi: "Tiêu đề Văn bản Chính (in đậm chữ)",
    labelEn: "Main Body Title (Bold)",
    targetElements: "<p> bold, Tiêu đề đoạn văn chính, Điểm nhấn nội dung",
    rangePx: "15–16px",
    clampValue: "clamp(0.9375rem, 0.25vw + 0.875rem, 1rem)",
    defaultWeight: "700",
    defaultLineHeight: "1.55",
    defaultLetterSpacing: "0",
    desc: "Mobile 15px, Desktop 16px. Font-weight 700. Dành cho tiêu đề các đoạn văn chính và điểm nhấn in đậm nội dung."
  },
  {
    id: "body",
    level: "Body",
    variable: "--font-size-body",
    cssClass: ".text-body",
    labelVi: "Văn bản Chính (Body Paragraph)",
    labelEn: "Body Text",
    targetElements: "<p>, Đoạn văn câu chuyện, Lời giới thiệu",
    rangePx: "15–16px",
    clampValue: "clamp(0.9375rem, 0.25vw + 0.875rem, 1rem)",
    defaultWeight: "400",
    defaultLineHeight: "1.6",
    defaultLetterSpacing: "0",
    desc: "Mobile 15px, Desktop 16px. Chiều cao dòng 1.6 đảm bảo trải nghiệm đọc tối ưu, không mỏi mắt."
  },
  {
    id: "body-sub",
    level: "Sub Content",
    variable: "--font-size-body-sm",
    cssClass: ".text-body-sub, .text-subcontent",
    labelVi: "Nội dung Văn bản Phụ (Sub-content / Secondary Text)",
    labelEn: "Sub-content Text",
    targetElements: "Đoạn văn phụ, Nội dung bổ trợ, Ghi chú chi tiết card",
    rangePx: "14–15px",
    clampValue: "clamp(0.875rem, 0.2vw + 0.825rem, 0.9375rem)",
    defaultWeight: "400",
    defaultLineHeight: "1.5",
    defaultLetterSpacing: "0",
    desc: "Mobile 14px, Desktop 15px. Dành cho nội dung văn bản phụ, giải thích chi tiết bổ trợ dưới các tiêu đề."
  },
  {
    id: "body-sm",
    level: "Body Small",
    variable: "--font-size-body-sm",
    cssClass: ".text-body-sm",
    labelVi: "Văn bản Phụ / Tagline (Subtitle / Note)",
    labelEn: "Body Small",
    targetElements: "Subtitle, Tagline, Mô tả ngắn card, KPI detail",
    rangePx: "14–15px",
    clampValue: "clamp(0.875rem, 0.2vw + 0.825rem, 0.9375rem)",
    defaultWeight: "400",
    defaultLineHeight: "1.55",
    defaultLetterSpacing: "0",
    desc: "Mobile 14px, Desktop 15px. Dùng cho các mô tả bổ trợ, ghi chú kinh nghiệm, phụ đề section."
  },
  {
    id: "caption",
    level: "Caption / Label",
    variable: "--font-size-caption",
    cssClass: ".text-caption, .text-label",
    labelVi: "Chú thích & Nhãn (Caption / Label / Tag)",
    labelEn: "Caption / Label",
    targetElements: "Tags, Chips, Eyebrows, Form Labels, Timestamps",
    rangePx: "12–13px",
    clampValue: "0.8125rem",
    defaultWeight: "600",
    defaultLineHeight: "1.4",
    defaultLetterSpacing: "0.02em",
    desc: "Nhãn phân loại, tag kỹ năng, nhãn công ty, ngày tháng, mã metadata."
  },
  {
    id: "button",
    level: "Button",
    variable: "--font-size-button",
    cssClass: ".text-button",
    labelVi: "Nút Bấm & Thao tác (Button / Action)",
    labelEn: "Button Text",
    targetElements: "<button>, CTA links, Action pills",
    rangePx: "15–16px",
    clampValue: "clamp(0.9375rem, 0.25vw + 0.875rem, 1rem)",
    defaultWeight: "600",
    defaultLineHeight: "1.2",
    defaultLetterSpacing: "0.01em",
    desc: "Mobile 15px, Desktop 16px (15-16px). Nút bấm tương tác, chiều cao tối thiểu 44px, padding 2x vertical padding."
  },
  {
    id: "stat",
    level: "Statistic",
    variable: "--font-size-stat",
    cssClass: ".text-stat",
    labelVi: "Chỉ số / Số liệu (Metric & Statistic)",
    labelEn: "Statistic Number",
    targetElements: "Numbers (22+, 100+, 98%), Big KPI metrics",
    rangePx: "28–40px",
    clampValue: "clamp(1.75rem, 2.5vw + 1rem, 2.5rem)",
    defaultWeight: "700",
    defaultLineHeight: "1.1",
    defaultLetterSpacing: "-0.01em",
    desc: "Số liệu thành tích, metric quan trọng, tự động căn chỉnh tabular-nums."
  },
  {
    id: "nav",
    level: "Navigation",
    variable: "--font-size-nav",
    cssClass: ".text-nav",
    labelVi: "Menu Điều Hướng (Navigation Items)",
    labelEn: "Navigation",
    targetElements: "Header Nav, Floating Dock items",
    rangePx: "14–16px",
    clampValue: "clamp(0.875rem, 0.2vw + 0.825rem, 1rem)",
    defaultWeight: "500",
    defaultLineHeight: "1.2",
    defaultLetterSpacing: "0",
    desc: "Các mục menu điều hướng chính, không đổi font-size khi active."
  }
];

export interface ElementComputedTypography {
  fontSize: string;
  fontSizePx: number;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: string;
  fontFamily: string;
  color: string;
  matchedToken?: TypographyTokenDef;
}

export const getElementTypography = (el?: HTMLElement | null): ElementComputedTypography | null => {
  if (!el || typeof window === "undefined") return null;
  try {
    const style = window.getComputedStyle(el);
    const fontSize = style.fontSize || "16px";
    const fontSizePx = parseFloat(fontSize) || 16;
    
    // Find closest matching token by pixel size
    let closestToken: TypographyTokenDef | undefined;
    let minDiff = Infinity;
    
    GLOBAL_TYPOGRAPHY_TOKENS.forEach(tok => {
      // Estimate approximate pixel reference for matching
      const refPx = 
        tok.id === "display" ? 44 :
        tok.id === "h1" ? 38 :
        tok.id === "h2" ? 30 :
        tok.id === "h3" ? 22 :
        tok.id === "h4" ? 19 :
        tok.id === "h5" ? 17 :
        tok.id === "h6" ? 15.5 :
        tok.id === "card-title" ? 19 :
        tok.id === "body-bold" ? 16 :
        tok.id === "body" ? 16 :
        tok.id === "body-sub" ? 14.5 :
        tok.id === "body-sm" ? 14.5 :
        tok.id === "caption" ? 13 :
        tok.id === "button" ? 15.5 :
        tok.id === "stat" ? 32 :
        tok.id === "nav" ? 15 : 16;

      const diff = Math.abs(fontSizePx - refPx);
      if (diff < minDiff) {
        minDiff = diff;
        closestToken = tok;
      }
    });

    return {
      fontSize,
      fontSizePx,
      fontWeight: style.fontWeight || "400",
      lineHeight: style.lineHeight || "normal",
      letterSpacing: style.letterSpacing || "normal",
      fontFamily: style.fontFamily || "'Play', sans-serif",
      color: style.color || "",
      matchedToken: closestToken
    };
  } catch {
    return null;
  }
};

interface ElementInfo {
  tag: string;
  id?: string;
  className?: string;
  rect: DOMRect;
  textSnippet: string;
  sectionName: string;
  sectionId: string;
  componentType: string;
  element: HTMLElement;
  fullSelector: string;
}

type InspectorMode = "site_structure" | "element" | "tree" | "full_website" | "typography";

export interface SiteStructureNode {
  id: string;
  tagName: string;
  idAttr: string;
  className: string;
  selector: string;
  depth: number;
  category: "section" | "card" | "button" | "text" | "media" | "container";
  textSnippet: string;
  rect: { width: number; height: number };
  childrenCount: number;
  children: SiteStructureNode[];
  element?: HTMLElement;
}

interface TreeItem {
  id: string;
  sectionId: string;
  sectionName: string;
  title: string;
  tag: string;
  type: string;
  selector: string;
  children?: TreeItem[];
  element?: HTMLElement | null;
}

interface TreeAction {
  id: string;
  type: "edit" | "delete" | "add" | "move" | "clone_format";
  targetTitle: string;
  targetSelector: string;
  sectionName: string;
  sectionId: string;
  description: string;
  targetDestination?: string;
  styleSource?: string;
}

export interface SavedPromptItem {
  id: string;
  title: string;
  prompt: string;
  time: string;
  presetName?: string;
}

interface PresetTemplate {
  id: string;
  label: string;
  titleVi: string;
  shortDesc: string;
  icon: React.ElementType;
  badgeColor: string;
  promptSnippet: string;
}

// 5 Mẫu Áp Dụng Chuyên Dụng
const PRESET_TEMPLATES: PresetTemplate[] = [
  {
    id: "tsx",
    label: "1. Code từ file TSX",
    titleVi: "Code từ file TSX",
    shortDesc: "Tái tạo & nhúng mã nguồn React TSX",
    icon: FileCode,
    badgeColor: "border-blue-500/40 text-blue-600 dark:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20",
    promptSnippet: `[MẪU ÁP DỤNG 1: CHUYỂN ĐỔI & TÍCH HỢP TỪ FILE TSX]
• Yêu cầu chuyên sâu: Phân tích toàn bộ mã nguồn file TSX được cung cấp, trích xuất 100% logic, state, props, TypeScript interfaces, Tailwind CSS utilities và tất cả các hiệu ứng tương tác (animations, hover/active states, sound effects, dark mode).
• Quy chuẩn thực thi: Chuyển đổi và nhúng trực tiếp vào component mục tiêu. Đảm bảo mã nguồn chạy được ngay lập tức, trích xuất đầy đủ tính năng và hiệu ứng mà không bỏ sót bất kỳ dòng code hay chi tiết giao diện nào.`
  },
  {
    id: "layout_image",
    label: "2. Hình để lấy bố cục",
    titleVi: "Hình để lấy bố cục",
    shortDesc: "Trích xuất khung sườn Flex/Grid Layout",
    icon: Layout,
    badgeColor: "border-amber-500/40 text-amber-600 dark:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20",
    promptSnippet: `[MẪU ÁP DỤNG 2: TRÍCH XUẤT BỐ CỤC TỪ HÌNH ẢNH MẪU]
• Yêu cầu chuyên sâu: Dựa trên hình ảnh giao diện tham chiếu, trích xuất chính xác cấu trúc khung sườn (Layout Structure), hệ thống lưới Flexbox/Grid, tỷ lệ phân chia cột/dòng, khoảng cách padding/margin giữa các container.
• Quy chuẩn thực thi: Tái dựng lại khung bố cục hoàn chỉnh, chuẩn hóa tỷ lệ hiển thị responsive trên cả Mobile và Desktop, đảm bảo trích xuất trọn vẹn vị trí và bố cục không bỏ sót.`
  },
  {
    id: "html",
    label: "3. Code từ HTML",
    titleVi: "Code từ HTML",
    shortDesc: "Chuyển đổi HTML/CSS thuần sang React TSX",
    icon: Code2,
    badgeColor: "border-emerald-500/40 text-emerald-600 dark:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20",
    promptSnippet: `[MẪU ÁP DỤNG 3: CHUYỂN ĐỔI CODE TỪ HTML SANG REACT TSX]
• Yêu cầu chuyên sâu: Chuyển đổi toàn bộ đoạn code HTML/CSS/JS thuần sang chuẩn React TSX và Tailwind CSS v4. Đổi class -> className, inline styles -> Tailwind utilities, chuyển đổi các sự kiện DOM thuần (addEventListener) thành React Hooks (useState, useEffect, useRef).
• Quy chuẩn thực thi: Đảm bảo mã nguồn React TSX có thể chạy được ngay lập tức, bảo toàn 100% hiệu ứng CSS transition, animation và cấu trúc phần tử không bỏ sót bất kỳ hiệu ứng hay tính năng nào.`
  },
  {
    id: "exact_image",
    label: "4. Hình xác như hình",
    titleVi: "Hình xác như hình",
    shortDesc: "Tái lập Pixel-Exact 1:1 từ Screenshot",
    icon: Image,
    badgeColor: "border-pink-500/40 text-pink-600 dark:text-pink-300 bg-pink-500/10 hover:bg-pink-500/20",
    promptSnippet: `[MẪU ÁP DỤNG 4: TÁI LẬP PIXEL-EXACT 1:1 TỪ HÌNH ẢNH THỰC TẾ]
• Yêu cầu chuyên sâu: Tái tạo chính xác 100% giao diện thực tế từ hình ảnh minh họa (Pixel-Perfect Reconstruction).
• Quy chuẩn thực thi: Trích xuất chính xác bảng màu mã Hex, bộ font chữ & kích thước, khoảng cách bo góc (border-radius), hiệu ứng bóng đổ (box-shadow/glow), gradient, biểu tượng Lucide-React tương ứng và các trạng thái Hover/Active/Focus. Đảm bảo giao diện tái dựng hoàn chỉnh, chạy được ngay và trích xuất đầy đủ tính năng hiệu ứng không bỏ sót.`
  },
  {
    id: "codepen",
    label: "5. Codepen",
    titleVi: "CodePen",
    shortDesc: "Tích hợp Snippet HTML/CSS/JS từ CodePen",
    icon: Boxes,
    badgeColor: "border-purple-500/40 text-purple-600 dark:text-purple-300 bg-purple-500/10 hover:bg-purple-500/20",
    promptSnippet: `[MẪU ÁP DỤNG 5: TÍCH HỢP DỰ ÁN / SNIPPET TỪ CODEPEN]
• Yêu cầu chuyên sâu: Tích hợp đoạn code từ CodePen (bao gồm HTML markup, CSS/SCSS styling, và JavaScript/GSAP/Canvas logic) vào component React TSX hiện tại.
• Quy chuẩn thực thi: Đóng gói gọn gàng trong React useEffect / useRef, chuyển đổi CSS sang Tailwind hoặc scoped CSS. Đảm bảo mọi hiệu ứng chuyển động, canvas particle, hoặc animation chạy mượt mà 60fps, chạy được ngay lập tức và không bỏ sót bất kỳ hiệu ứng hay tính năng nào.`
  },
  {
    id: "bento_layout",
    label: "6. Bố cục Bento Grid",
    titleVi: "Bố cục Bento Grid Tối ưu",
    shortDesc: "Phân bổ dạng lưới bento bất đối xứng, sang trọng",
    icon: Layout,
    badgeColor: "border-indigo-500/40 text-indigo-600 dark:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20",
    promptSnippet: `[MẪU ÁP DỤNG 6: TỐI ƯU HÓA BỐ CỤC BENTO GRID]
• Yêu cầu chuyên sâu: Tái cấu trúc vùng hiển thị thành thiết kế dạng lưới Bento (Bento Grid) không đối xứng hiện đại, phân bổ diện tích dựa trên tầm quan trọng của thông tin. Sử dụng các thẻ con có col-span và row-span linh hoạt trên thiết bị lớn.
• Quy chuẩn thực thi: Căn lề padding từ 16px - 24px, bo góc tinh tế (border-radius: 1.5rem hoặc 2rem), áp dụng các đường viền siêu mỏng mảnh 1px (hairline border) và đổ bóng mờ mịn (soft shadow). Trích xuất 100% tính năng và hiệu ứng gốc.`
  },
  {
    id: "minimal_luxury",
    label: "7. Bố cục Tối giản Sang trọng",
    titleVi: "Bố cục Tối giản Sang trọng",
    shortDesc: "Giao diện thoáng đãng, nhấn mạnh typographic",
    icon: Palette,
    badgeColor: "border-sky-500/40 text-sky-600 dark:text-sky-300 bg-sky-500/10 hover:bg-sky-500/20",
    promptSnippet: `[MẪU ÁP DỤNG 7: BỐ CỤC TỐI GIẢN SANG TRỌNG (MINIMAL LUXURY)]
• Yêu cầu chuyên sâu: Tối ưu không gian bằng cách tăng cường khoảng trống âm (Negative Space), loại bỏ hoàn toàn các viền bao lặp không cần thiết. Tập trung vào phân cấp typographic tinh tế, kết hợp độ tương phản cao và độ mờ kính mượt mà.
• Quy chuẩn thực thi: Giới hạn độ dài chữ (line-width) từ 65-75 ký tự, sử dụng màu chữ trung tính cao cấp và hiệu ứng hover nhẹ nhàng tăng trải nghiệm người dùng, đảm bảo mã nguồn chạy được ngay lập tức.`
  },
  {
    id: "fluid_responsive",
    label: "8. Bố cục Responsive thích ứng",
    titleVi: "Bố cục Responsive thích ứng",
    shortDesc: "Đảm bảo hiển thị hoàn mỹ trên mọi độ phân giải",
    icon: Sliders,
    badgeColor: "border-teal-500/40 text-teal-600 dark:text-teal-300 bg-teal-500/10 hover:bg-teal-500/20",
    promptSnippet: `[MẪU ÁP DỤNG 8: TỐI ƯU HÓA RESPONSIVE VÀ FLUID LAYOUT]
• Yêu cầu chuyên sâu: Thiết kế co giãn linh hoạt (Fluid Layout) với w-full max-w-7xl mx-auto để chống kéo dãn quá đà trên màn hình siêu rộng, đồng thời chuyển đổi mượt mà sang cấu trúc một cột dọc có đích chạm rộng rãi (khoảng cách chạm tối thiểu 44px) trên di động.
• Quy chuẩn thực thi: Đồng bộ hóa toàn bộ kích thước hình ảnh, padding, margin thích ứng linh hoạt theo break-point di động (sm, md, lg, xl).`
  },
  {
    id: "optimal_grid_cards",
    label: "9. Bố cục Thẻ Lưới Tối ưu",
    titleVi: "Bố cục Thẻ Lưới Tối ưu",
    shortDesc: "Hệ thống thẻ lưới responsive cân đối, đẹp mắt",
    icon: Layout,
    badgeColor: "border-indigo-500/40 text-indigo-600 dark:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20",
    promptSnippet: `[MẪU ÁP DỤNG 9: BỐ CỤC THẺ LƯỚI TỐI ƯU (OPTIMAL GRID CARDS)]
• Yêu cầu chuyên sâu: Xây dựng cấu trúc thẻ lưới (Grid Cards) với hệ thống cột tự động thích ứng (grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6), căn lề padding tối ưu, hiệu ứng hover nổi khối 3D nhẹ nhàng (hover:-translate-y-1 hover:shadow-lg), bo góc mượt mà và đường viền hairline tinh tế.
• Quy chuẩn thực thi: Đảm bảo bố cục hiển thị đồng đều, cân xứng, chạy được ngay lập tức và giữ trọn vẹn toàn bộ tính năng.`
  },
  {
    id: "masonry_layout",
    label: "10. Bố cục Masonry Linh hoạt",
    titleVi: "Bố cục Masonry Linh hoạt",
    shortDesc: "Bố cục lưới đa chiều không đồng đều tự nhiên",
    icon: Boxes,
    badgeColor: "border-cyan-500/40 text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20",
    promptSnippet: `[MẪU ÁP DỤNG 10: BỐ CỤC MASONRY LINH HOẠT (OPTIMIZED MASONRY LAYOUT)]
• Yêu cầu chuyên sâu: Tổ chức các khối hiển thị theo bố cục Masonry nhiều cột không đồng đều chiều cao (columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5 break-inside-avoid), tạo cảm giác nghệ thuật, tự nhiên và tận dụng tối đa không gian cho nội dung đa dạng kích thước.
• Quy chuẩn thực thi: Đảm bảo phân bổ khoảng cách đồng đều, chống tràn nội dung, hiển thị hoàn hảo trên mọi thiết bị.`
  },
  {
    id: "ui_ux_optimizer",
    label: "11. Tối Ưu Hóa UI / UX Toàn Diện",
    titleVi: "Tối Ưu Hóa UI / UX Toàn Diện",
    shortDesc: "Rà soát Typography, Spacing, WCAG AA & Vi tương tác",
    icon: Sparkles,
    badgeColor: "border-purple-500/40 text-purple-600 dark:text-purple-300 bg-purple-500/10 hover:bg-purple-500/20",
    promptSnippet: `[MẪU ÁP DỤNG 11: TỐI ƯU HÓA UI / UX TOÀN DIỆN]
• Yêu cầu chuyên sâu: Tự động rà soát thang đo Typography, lưới đệm Spacing, chuẩn tương phản màu sắc WCAG AA, bo góc lồng nhau & hiệu ứng vi tương tác cho các trang được chọn.
• Quy chuẩn thực thi: Đảm bảo giao diện trực quan, mượt mà, dễ đọc, chạy được ngay lập tức và giữ trọn vẹn toàn bộ tính năng.`
  },
  {
    id: "theme_repair",
    label: "12. Sửa Giao Diện Sáng & Đen",
    titleVi: "Sửa Giao Diện Sáng & Đen",
    shortDesc: "Tự động nạp lớp màu nền, viền và độ tương phản sáng/tối",
    icon: Wrench,
    badgeColor: "border-amber-500/40 text-amber-600 dark:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20",
    promptSnippet: `[MẪU ÁP DỤNG 12: SỬA GIAO DIỆN SÁNG & ĐEN]
• Yêu cầu chuyên sâu: Tự động rà soát và nạp các lớp màu nền, viền, shadow, độ tương phản chuẩn xác cho cả chế độ Sáng (Light) và Đen (Dark) trên các trang đã chọn.
• Quy chuẩn thực thi: Xử lý triệt để các lỗi hiển thị tối/sáng, đảm bảo chuyển đổi theme mượt mà, không sót chi tiết.`
  },
  {
    id: "main_card_projects",
    label: "13. Thẻ Main card dự án",
    titleVi: "Thẻ Main card dự án",
    shortDesc: "Định dạng giống Thẻ Main card dự án (Flat design, bo cong 20px, tiêu đề chữ thường viết hoa đầu)",
    icon: Layout,
    badgeColor: "border-emerald-500/40 text-emerald-600 dark:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20",
    promptSnippet: `[MẪU ÁP DỤNG 13: ĐỊNH DẠNG GIỐNG THẺ MAIN CARD DỰ ÁN]
• Yêu cầu chuyên sâu: Định dạng giao diện đối tượng giống chuẩn thiết kế Thẻ Main Card Dự Án.
• Quy chuẩn thực thi:
  1. Sử dụng hiệu ứng phẳng (Flat design), bỏ hoàn toàn các hiệu ứng 3D, bóng đổ glow/neon phức tạp.
  2. Bo góc chính xác 20px (rounded-[20px]).
  3. Tiêu đề hiển thị dạng chữ thường, chỉ viết hoa chữ cái đầu tiên (Sentence-case typography).
  4. Màu sắc phẳng tối giản (bg-slate-100/90 dark:bg-slate-900/90 border-slate-200/90 dark:border-slate-800/90 text-slate-900 dark:text-slate-100 backdrop-blur-md).
  5. Đệm khoảng cách padding và viền mỏng phẳng đồng bộ.`
  },
  {
    id: "fluid_grid_minmax",
    label: "14. Tự động co giãn theo ngưỡng độ rộng tối thiểu (Fluid Grid)",
    titleVi: "Tự động co giãn theo ngưỡng độ rộng tối thiểu (Fluid Grid)",
    shortDesc: "Co giãn linh hoạt bằng grid repeat(auto-fit, minmax(260px, 1fr)) và aspect-ratio",
    icon: Sliders,
    badgeColor: "border-blue-500/40 text-blue-600 dark:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20",
    promptSnippet: `[MẪU ÁP DỤNG 14: TỰ ĐỘNG CO GIÃN THEO NGƯỠNG ĐỘ RỘNG TỐI THIỂU (FLUID GRID)]
• Yêu cầu chuyên sâu: Xây dựng hệ thống lưới tự động co giãn theo ngưỡng độ rộng tối thiểu cho danh sách thẻ (Card Grid) không phụ thuộc cứng vào breakpoint.
• Mã CSS tham chiếu:
.card-grid {
  display: grid;
  /* Đặt độ rộng tối thiểu của mỗi card (ví dụ: 260px). Nếu màn hình nhỏ hơn, tự giảm số cột mà vẫn giữ tỉ lệ */
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

/* Khóa tỉ lệ để card không bị méo ảnh/nội dung */
.card-item {
  display: flex;
  flex-direction: column;
}

.card-item img {
  width: 100%;
  aspect-ratio: 16 / 9; /* Hoặc 4/3, 1/1 tùy thiết kế */
  object-fit: cover;    /* Tránh biến dạng ảnh bên trong */
}
• Quy chuẩn thực thi: Áp dụng cấu trúc lưới repeat(auto-fit, minmax(260px, 1fr)) kết hợp gap 1.5rem, tự động căn chỉnh số cột tối ưu theo kích thước viewport. Khóa tỉ lệ hình ảnh bằng aspect-ratio 16/9 và object-fit cover để tránh làm méo hình hay lệch khung nội dung.`
  },
  {
    id: "restructure_content",
    label: "15. Bố cục lại nội dung bên trong",
    titleVi: "Bố cục lại nội dung bên trong",
    shortDesc: "Tái cấu trúc luồng thông tin, căn lề và phân cấp nhóm nội dung",
    icon: Layout,
    badgeColor: "border-indigo-500/40 text-indigo-600 dark:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20",
    promptSnippet: `[MẪU ÁP DỤNG 15: TÁI BỐ CỤC NỘI DUNG BÊN TRONG ĐỐI TƯỢNG]
• Yêu cầu chuyên sâu: Tái sắp xếp cấu trúc thông tin và phân cấp thị giác (visual hierarchy) bên trong đối tượng được chọn. Gom nhóm các nhóm thông tin liên quan, chia tách rõ ràng giữa tiêu đề (heading), đoạn văn mô tả (body text) và các nút hành động (actions).
• Quy chuẩn thực thi:
  1. Sử dụng Flexbox hoặc Grid linh hoạt để tổ chức các phần tử con theo luồng đọc tự nhiên (từ trên xuống dưới, từ trái sang phải).
  2. Áp dụng khoảng đệm (padding) đồng nhất cho container bên ngoài lớn hơn hoặc bằng khoảng cách giữa các phần tử con bên trong.
  3. Phân bổ các nhóm thông tin mật thiết bằng khoảng cách hẹp (gap-1.5 hoặc gap-2) và các khối thông tin lớn bằng khoảng cách thoáng đãng (gap-5 hoặc gap-6).
  4. Đảm bảo 100% nội dung nguyên bản và các tính năng tương tác được giữ lại trọn vẹn, không bị mất mát hay bỏ sót.`
  },
  {
    id: "sync_current_theme",
    label: "16. Đồng bộ cùng giao diện đang chọn",
    titleVi: "Đồng bộ cùng giao diện đang chọn",
    shortDesc: "Đồng nhất màu nền, viền, hiệu ứng & kiểu chữ theo theme đang active",
    icon: Palette,
    badgeColor: "border-sky-500/40 text-sky-600 dark:text-sky-300 bg-sky-500/10 hover:bg-sky-500/20",
    promptSnippet: `[MẪU ÁP DỤNG 16: ĐỒNG BỘ CÙNG GIAO DIỆN ĐANG CHỌN]
• Yêu cầu chuyên sâu: Thiết lập phong cách thiết kế của đối tượng được chọn sao cho đồng nhất 100% với giao diện/chế độ hiện hành mà người dùng đang kích hoạt (ví dụ: Flat Light, Flat Dark, Glassmorphism, Neon Dark, v.v.).
• Quy chuẩn thực thi:
  1. Nếu là giao diện phẳng (Flat Light/Dark): Sử dụng nền phẳng thuần sắc không hiệu ứng gradient, bỏ hiệu ứng đổ bóng mờ ảo, dùng viền phân mảnh tinh tế (1px border-slate-200 hoặc border-slate-800) với độ tương phản cao đạt chuẩn WCAG AA.
  2. Nếu là giao diện Kính mờ (Glassmorphism): Áp dụng nền kính mờ (backdrop-blur-md kết hợp bg-white/10 hoặc black/20), viền mờ ảo mỏng nhẹ (border-white/20), và bóng đổ mềm mịn sâu thẳm.
  3. Nếu là giao diện Neon/Cyberpunk: Kích hoạt các đường viền phát sáng mờ ảo (shadow-[0_0_15px_rgba(6,182,212,0.4)]), màu sắc rực rỡ mang hơi hướng tương lai.
  4. Đảm bảo cấu trúc bo góc lồng nhau được tính toán chính xác: Bán kính bo góc thẻ con bên trong = Bán kính bo góc thẻ mẹ bên ngoài - Khoảng cách đệm (Padding).`
  },
  {
    id: "fix_layout_bugs",
    label: "17. Sửa lỗi bố cục hiển thị",
    titleVi: "Sửa lỗi bố cục hiển thị",
    shortDesc: "Xử lý triệt độ lỗi tràn khung, lệch dòng, lệch cột và khoảng cách đệm",
    icon: Wrench,
    badgeColor: "border-pink-500/40 text-pink-600 dark:text-pink-300 bg-pink-500/10 hover:bg-pink-500/20",
    promptSnippet: `[MẪU ÁP DỤNG 17: SỬA LỖI BỐ CỤC HIỂN THỊ]
• Yêu cầu chuyên sâu: Khắc phục triệt để các lỗi sai lệch bố cục như: chữ bị tràn khung (overflow), lệch hàng lệch cột khi co giãn màn hình, lỗi chồng chéo phần tử, lỗi bo góc không tương thích hoặc các vùng tương tác chạm (touch targets) bị quá hẹp.
• Quy chuẩn thực thi:
  1. Thay thế các kích thước rộng/cao cố định (như w-[350px], h-[200px]) thành co giãn linh hoạt (w-full, max-w-..., h-auto) kết hợp flex-1 hoặc grid-span.
  2. Thêm thuộc tính chống tràn chữ (truncate, break-words, hoặc line-clamp) cho các khối văn bản dài dễ gây phá vỡ giao diện.
  3. Khóa cứng thuộc tính white-space: nowrap cho các nhãn chữ ngắn nằm trên nút hoặc thẻ (badge) để tránh xuống dòng đột ngột.
  4. Đảm bảo kích thước vùng chạm cho tất cả các nút, tab, liên kết tương tác tối thiểu đạt 44px trên thiết bị cảm ứng.`
  }
];

// 5 Mẫu Làm Sạch & Rà Soát Mã Nguồn
export interface CleanCodeTemplate {
  id: string;
  title: string;
  category: "dead_code" | "syntax_error" | "performance" | "style";
  desc: string;
  badgeColor: string;
  snippet: string;
  promptText: string;
}

export const CLEAN_CODE_TEMPLATES: CleanCodeTemplate[] = [
  {
    id: "clean_dead_code",
    title: "1. Làm sạch imports & mã nguồn dư thừa",
    category: "dead_code",
    desc: "Loại bỏ imports không dùng, biến thừa, hàm rác (dead code) và comment cũ.",
    badgeColor: "border-blue-500/40 text-blue-600 dark:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20",
    snippet: `// Dọn dẹp imports và biến không sử dụng
- Loại bỏ toàn bộ import dư thừa không dùng đến từ 'lucide-react' và các thư viện khác.
- Xóa các biến, state và hàm khai báo nhưng không còn được gọi trong component.
- Loại bỏ console.log, debugger và các đoạn comment giải thích lỗi thời.`,
    promptText: `• Làm sạch tệp tin: Tiến hành rà soát toàn bộ tệp tin component tương ứng. Loại bỏ triệt để các package import dư thừa, các biến và state chưa từng được sử dụng (dead code), các hàm tính toán kiểu dáng cũ không còn gọi. Tinh gọn mã nguồn nhưng bảo toàn 100% logic đang hoạt động.`
  },
  {
    id: "audit_fix_errors",
    title: "2. Rà soát code lỗi & xử lý triệt để",
    category: "syntax_error",
    desc: "Kiểm tra toàn diện lỗi TypeScript, null pointer, syntax JSX và error handling.",
    badgeColor: "border-rose-500/40 text-rose-600 dark:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20",
    snippet: `// Kiểm tra cú pháp, lỗi kiểu TypeScript & Exception Handling
- Rà soát và sửa triệt để các lỗi TypeScript (TS6133, TS2304, TS2322, TS2339).
- Bổ sung kiểm tra an toàn null/undefined bằng optional chaining (?.) và nullish coalescing (??).
- Đảm bảo các hàm callback, async/await được bao bọc trong try/catch xử lý lỗi mượt mà.`,
    promptText: `• Rà soát code lỗi & xử lý: Thực hiện kiểm tra toàn diện lỗi biên dịch TypeScript và cú pháp React. Khắc phục tất cả các cảnh báo missing props, sai type, null/undefined reference. Đảm bảo mã nguồn sau khi sửa chạy trơn tru, không có runtime error trên console.`
  },
  {
    id: "optimize_hooks_memory",
    title: "3. Tối ưu React Hooks & chống rò rỉ bộ nhớ",
    category: "performance",
    desc: "Chuẩn hóa useEffect dependencies, dọn dẹp event listeners/timers, chống re-render vô tận.",
    badgeColor: "border-amber-500/40 text-amber-600 dark:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20",
    snippet: `// Tối ưu hóa vòng đời React & bộ nhớ
- Bổ sung hàm dọn dẹp (cleanup function) trong useEffect (removeEventListener, clearTimeout, clearInterval).
- Chuẩn hóa dependency array trong useEffect (tránh truyền object/array mới gây infinite re-renders).
- Áp dụng useMemo và useCallback cho các tính toán nặng hoặc callback truyền qua nhiều cấp component.`,
    promptText: `• Tối ưu vòng đời & bộ nhớ: Rà soát tất cả các useEffect trong component. Đảm bảo mọi event listener, timer hoặc subscription đều có cleanup function dọn dẹp khi unmount. Ngăn chặn triệt để tình trạng infinite re-render hoặc rò rỉ bộ nhớ (memory leak).`
  },
  {
    id: "standardize_tailwind_theme",
    title: "4. Chuẩn hóa Tailwind CSS & Theme Sáng/Tối",
    category: "style",
    desc: "Dọn dẹp class CSS trùng lặp, tối ưu contrast WCAG AA, bo góc và chuẩn Sentence case.",
    badgeColor: "border-emerald-500/40 text-emerald-600 dark:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20",
    snippet: `// Chuẩn hóa giao diện & CSS Tailwind
- Loại bỏ các class Tailwind xung đột hoặc ghi đè lãng phí.
- Đảm bảo độ tương phản màu chữ và nền đạt chuẩn WCAG AA cho cả 2 theme Sáng và Tối.
- Đồng bộ bo góc (rounded-xl, rounded-2xl), padding đệm chuẩn nhịp điệu và áp dụng Sentence case cho tiêu đề.`,
    promptText: `• Chuẩn hóa giao diện & Tailwind: Rà soát và làm sạch các utility classes Tailwind bị trùng lặp hoặc mâu thuẫn. Đảm bảo hiển thị hoàn hảo, không bị vỡ màu hoặc chìm chữ trên cả 2 chế độ Sáng và Tối (Light & Dark mode). Tuân thủ quy tắc Sentence case cho toàn bộ tiêu đề và nhãn nút.`
  },
  {
    id: "clean_all_comprehensive",
    title: "5. Làm sạch & tối ưu hóa toàn diện (All-in-one)",
    category: "dead_code",
    desc: "Kết hợp toàn bộ: Dọn dẹp code rác, sửa lỗi TS, tối ưu Hooks và chuẩn hóa giao diện.",
    badgeColor: "border-purple-500/40 text-purple-600 dark:text-purple-300 bg-purple-500/10 hover:bg-purple-500/20",
    snippet: `// Gói tối ưu hóa & làm sạch toàn diện
1. Dọn dẹp imports thừa, biến không dùng (Dead Code Cleanup).
2. Rà soát & sửa toàn bộ lỗi TypeScript, syntax JSX và null pointer.
3. Tối ưu useEffect cleanup, chống rò rỉ bộ nhớ và re-render.
4. Chuẩn hóa Tailwind CSS, đồng bộ theme Sáng/Tối và kiểm tra responsive.`,
    promptText: `• Làm sạch & tối ưu hóa toàn diện: Thực hiện tổng thể các bước: (1) Quét dọn code thừa, imports rác và biến không dùng; (2) Sửa dứt điểm tất cả lỗi TypeScript và tiềm ẩn crash; (3) Thêm cleanup cho các hook useEffect/event listeners; (4) Chuẩn hóa giao diện Sáng/Tối và responsive trên mọi thiết bị.`
  }
];

// Comprehensive Structure of Website Pages & Sub-components
const DEFAULT_PAGE_STRUCTURE: TreeItem[] = [
  {
    id: "sec-home",
    sectionId: "home",
    sectionName: "Trang chủ (Home / Hero)",
    title: "Trang chủ & Giới thiệu nhanh",
    tag: "section",
    type: "Section",
    selector: "#home",
    children: [
      { id: "h-badge", sectionId: "home", sectionName: "Trang chủ", title: "Huy hiệu Trạng thái (Open for Roles)", tag: "div", type: "Badge", selector: "#home .status-badge" },
      { id: "h-title", sectionId: "home", sectionName: "Trang chủ", title: "Tiêu đề Chính & Tên chức danh (CX/CS Leader)", tag: "h1", type: "Heading", selector: "#home h1" },
      { id: "h-desc", sectionId: "home", sectionName: "Trang chủ", title: "Mô tả Tầm nhìn & Tóm lược Năng lực", tag: "p", type: "Text", selector: "#home p" },
      { id: "h-cta", sectionId: "home", sectionName: "Trang chủ", title: "Nhóm nút Kêu gọi hành động (Liên hệ & Tải CV)", tag: "div", type: "Button Group", selector: "#home .hero-cta" },
      { id: "h-stats", sectionId: "home", sectionName: "Trang chủ", title: "4 Thẻ Thống kê Thành tựu (CSAT, SLA, NPS, Teams)", tag: "div", type: "Metrics Card", selector: "#home .metrics-grid" }
    ]
  },
  {
    id: "sec-letter",
    sectionId: "letter",
    sectionName: "Thư ngỏ (Open Letter)",
    title: "Thư ngỏ & Triết lý Quản trị",
    tag: "section",
    type: "Section",
    selector: "#letter",
    children: [
      { id: "l-header", sectionId: "letter", sectionName: "Thư ngỏ", title: "Tiêu đề Thư ngỏ & Lời tựa", tag: "h2", type: "Heading", selector: "#letter h2" },
      { id: "l-body", sectionId: "letter", sectionName: "Thư ngỏ", title: "Nội dung bức thư chia sẻ tâm huyết CX/CS", tag: "div", type: "Article", selector: "#letter .letter-body" },
      { id: "l-sign", sectionId: "letter", sectionName: "Thư ngỏ", title: "Khối chữ ký số & Cam kết chất lượng", tag: "div", type: "Signature", selector: "#letter .letter-sign" }
    ]
  },
  {
    id: "sec-about",
    sectionId: "about",
    sectionName: "Giới thiệu (About)",
    title: "Tiểu sử & Chân dung Lãnh đạo",
    tag: "section",
    type: "Section",
    selector: "#about",
    children: [
      { id: "a-profile", sectionId: "about", sectionName: "Giới thiệu", title: "Thẻ Chân dung & Thông tin cá nhân", tag: "div", type: "Profile Card", selector: "#about .profile-card" },
      { id: "a-values", sectionId: "about", sectionName: "Giới thiệu", title: "Khối 4 Giá trị cốt lõi (Tận tâm, Thấu cảm, Hiệu quả, Sáng tạo)", tag: "div", type: "Grid", selector: "#about .values-grid" },
      { id: "a-bio", sectionId: "about", sectionName: "Giới thiệu", title: "Đoạn văn tóm tắt quá trình phát triển sự nghiệp", tag: "p", type: "Text", selector: "#about .bio-text" }
    ]
  },
  {
    id: "sec-education",
    sectionId: "education",
    sectionName: "Học vấn (Education)",
    title: "Học vấn, Bằng cấp & Chứng chỉ",
    tag: "section",
    type: "Section",
    selector: "#education",
    children: [
      { id: "e-degrees", sectionId: "education", sectionName: "Học vấn", title: "Thẻ Bằng Cử nhân & Bằng cấp chính quy", tag: "div", type: "Timeline", selector: "#education .degree-card" },
      { id: "e-certs", sectionId: "education", sectionName: "Học vấn", title: "Danh sách Chứng chỉ Quốc tế & Đào tạo chuyên sâu", tag: "div", type: "Cert List", selector: "#education .cert-grid" },
      { id: "e-scores", sectionId: "education", sectionName: "Học vấn", title: "Bảng điểm & Thành tích học tập nổi bật", tag: "div", type: "Stats Box", selector: "#education .score-box" }
    ]
  },
  {
    id: "sec-experience",
    sectionId: "experience",
    sectionName: "Kinh nghiệm (Experience)",
    title: "Kinh nghiệm Chuyên môn & Lãnh đạo",
    tag: "section",
    type: "Section",
    selector: "#experience",
    children: [
      { id: "exp-timeline", sectionId: "experience", sectionName: "Kinh nghiệm", title: "Dòng thời gian sự nghiệp các vị trí CS/CX Manager", tag: "div", type: "Timeline", selector: "#experience .timeline" },
      { id: "exp-kpi", sectionId: "experience", sectionName: "Kinh nghiệm", title: "Bảng Chỉ số Thành tích & Đóng góp tăng trưởng", tag: "div", type: "KPI Cards", selector: "#experience .kpi-cards" },
      { id: "exp-responsibilities", sectionId: "experience", sectionName: "Kinh nghiệm", title: "Danh sách nhiệm vụ điều hành & Quản lý đội ngũ", tag: "ul", type: "List", selector: "#experience .resp-list" }
    ]
  },
  {
    id: "sec-skills",
    sectionId: "skills",
    sectionName: "Kỹ năng (Skills)",
    title: "Bản đồ Kỹ năng & Năng lực Chuyên sâu",
    tag: "section",
    type: "Section",
    selector: "#skills",
    children: [
      { id: "sk-soft", sectionId: "skills", sectionName: "Kỹ năng", title: "Nhóm Kỹ năng Lãnh đạo & Quản trị con người", tag: "div", type: "Skill Group", selector: "#skills .soft-skills" },
      { id: "sk-hard", sectionId: "skills", sectionName: "Kỹ năng", title: "Nhóm Kỹ năng Vận hành hệ thống & Quy trình CS", tag: "div", type: "Skill Group", selector: "#skills .hard-skills" },
      { id: "sk-tech", sectionId: "skills", sectionName: "Kỹ năng", title: "Kỹ năng Công nghệ, AI Prompting & CRM", tag: "div", type: "Tech Badges", selector: "#skills .tech-badges" }
    ]
  },
  {
    id: "sec-projects",
    sectionId: "projects",
    sectionName: "Dự án (Projects)",
    title: "Dự án Tiêu biểu & Chuyển đổi số CS",
    tag: "section",
    type: "Section",
    selector: "#projects",
    children: [
      { id: "p-grid", sectionId: "projects", sectionName: "Dự án", title: "Bộ lọc & Danh mục Dự án thực chiến", tag: "div", type: "Filter Tabs", selector: "#projects .project-filter" },
      { id: "p-cards", sectionId: "projects", sectionName: "Dự án", title: "Các Thẻ Dự án chi tiết (CSAT Boost, AI Chatbot, Omni-channel)", tag: "div", type: "Cards Grid", selector: "#projects .project-cards" }
    ]
  },
  {
    id: "sec-systems",
    sectionId: "systems",
    sectionName: "Hệ thống (Systems)",
    title: "Hệ thống Vận hành & Kiến trúc CS",
    tag: "section",
    type: "Section",
    selector: "#systems",
    children: [
      { id: "sys-arch", sectionId: "systems", sectionName: "Hệ thống", title: "Sơ đồ Kiến trúc Vận hành Đa kênh Omni-channel", tag: "div", type: "Diagram", selector: "#systems .arch-box" },
      { id: "sys-flow", sectionId: "systems", sectionName: "Hệ thống", title: "Quy trình Xử lý Sự cố & Phản hồi Khách hàng", tag: "div", type: "Flowchart", selector: "#systems .flow-chart" }
    ]
  },
  {
    id: "sec-wallpapers",
    sectionId: "wallpapers",
    sectionName: "Hình nền (Wallpapers)",
    title: "Kho Hình nền & Video Động 4K",
    tag: "section",
    type: "Section",
    selector: "#wallpapers",
    children: [
      { id: "wp-grid", sectionId: "wallpapers", sectionName: "Hình nền", title: "Lưới 25+ Hình nền & Video 4K phong cách nghệ thuật", tag: "div", type: "Gallery", selector: "#wallpapers .wp-grid" },
      { id: "wp-custom", sectionId: "wallpapers", sectionName: "Hình nền", title: "Form Thêm link hình/video nền cá nhân hóa", tag: "div", type: "Input Box", selector: "#wallpapers .custom-url-box" },
      { id: "wp-controls", sectionId: "wallpapers", sectionName: "Hình nền", title: "Thanh trượt Độ mờ (Opacity) & Độ nhòe (Blur)", tag: "div", type: "Sliders", selector: "#wallpapers .controls-box" }
    ]
  },
  {
    id: "sec-memories",
    sectionId: "memories",
    sectionName: "Kỷ niệm (Memories)",
    title: "Kỷ niệm, Dấu ấn & Hoạt động Đội ngũ",
    tag: "section",
    type: "Section",
    selector: "#memories",
    children: [
      { id: "mem-gallery", sectionId: "memories", sectionName: "Kỷ niệm", title: "Bộ sưu tập Khoảnh khắc Đào tạo & Team Building", tag: "div", type: "Photo Grid", selector: "#memories .photo-gallery" },
      { id: "mem-filter", sectionId: "memories", sectionName: "Kỷ niệm", title: "Thanh phân loại Album sự kiện", tag: "div", type: "Filter", selector: "#memories .album-filter" }
    ]
  },
  {
    id: "sec-interview",
    sectionId: "interview",
    sectionName: "Phỏng vấn (Interview)",
    title: "Video Phỏng vấn Chiến lược CX/CS",
    tag: "section",
    type: "Section",
    selector: "#interview",
    children: [
      { id: "int-video", sectionId: "interview", sectionName: "Phỏng vấn", title: "Trình phát Video tương tác & Nút Phóng to 1.1x", tag: "video", type: "Video Player", selector: "#interview video" },
      { id: "int-q-btn", sectionId: "interview", sectionName: "Phỏng vấn", title: "Nút Tròn Xem 13 Câu hỏi Chiến lược", tag: "button", type: "Button", selector: "#interview .question-trigger" },
      { id: "int-spotlight", sectionId: "interview", sectionName: "Phỏng vấn", title: "Thẻ Chi tiết Câu hỏi & Câu trả lời Mẫu", tag: "div", type: "Spotlight Card", selector: "#interview .qa-spotlight" }
    ]
  },
  {
    id: "sec-tuvi",
    sectionId: "tuvi",
    sectionName: "Tử vi (TuVi)",
    title: "Tử vi, Bản mệnh & Phong thủy",
    tag: "section",
    type: "Section",
    selector: "#tuvi",
    children: [
      { id: "tv-info", sectionId: "tuvi", sectionName: "Tử vi", title: "Bảng Thông tin Can Chi, Bản Mệnh Thổ, Cung Phi", tag: "div", type: "Card", selector: "#tuvi .destiny-box" },
      { id: "tv-guide", sectionId: "tuvi", sectionName: "Tử vi", title: "Luận giải Phong thủy hướng làm việc & Quẻ cát tường", tag: "div", type: "Analysis", selector: "#tuvi .analysis-box" }
    ]
  },
  {
    id: "sec-contact",
    sectionId: "contact",
    sectionName: "Liên hệ (Contact)",
    title: "Kênh Liên hệ & Kết nối Trực tiếp",
    tag: "section",
    type: "Section",
    selector: "#contact",
    children: [
      { id: "c-info", sectionId: "contact", sectionName: "Liên hệ", title: "Thẻ Thông tin Kết nối & Trực tuyến 24/7", tag: "div", type: "Contact Card", selector: "#contact .contact-card" },
      { id: "c-form", sectionId: "contact", sectionName: "Liên hệ", title: "Biểu mẫu Gửi thông điệp & Đặt lịch hẹn", tag: "form", type: "Form", selector: "#contact form" },
      { id: "c-socials", sectionId: "contact", sectionName: "Liên hệ", title: "Danh sách Mạng xã hội (LinkedIn, Zalo, Telegram)", tag: "div", type: "Social Links", selector: "#contact .social-links" }
    ]
  },
  {
    id: "sec-header",
    sectionId: "header",
    sectionName: "Thanh Điều hướng (Header)",
    title: "Header Đa hướng Dọc / Ngang",
    tag: "header",
    type: "Navigation",
    selector: "header",
    children: [
      { id: "h-logo", sectionId: "header", sectionName: "Header", title: "Logo Thương hiệu cá nhân (Hung Thai)", tag: "a", type: "Brand Logo", selector: "header .brand-logo" },
      { id: "h-nav", sectionId: "header", sectionName: "Header", title: "Thanh Menu điều hướng 14 phân mục", tag: "nav", type: "Nav Links", selector: "header nav" },
      { id: "h-orient", sectionId: "header", sectionName: "Header", title: "Nút Đổi hướng Dọc / Ngang (Columns3 / Rows3)", tag: "button", type: "Layout Switcher", selector: "header .layout-switch" },
      { id: "h-lang", sectionId: "header", sectionName: "Header", title: "Nút Ngôn ngữ (Tiếng Việt / English)", tag: "button", type: "Language Switcher", selector: "header .lang-btn" },
      { id: "h-theme", sectionId: "header", sectionName: "Header", title: "Nút Giao diện (Bản Sáng / Bản Tối)", tag: "button", type: "Theme Switcher", selector: "header .theme-btn" },
      { id: "h-sound", sectionId: "header", sectionName: "Header", title: "Nút Bật / Tắt Âm thanh tương tác", tag: "button", type: "Sound Toggle", selector: "header .sound-btn" }
    ]
  },
  {
    id: "sec-footer",
    sectionId: "footer",
    sectionName: "Chân trang (Footer)",
    title: "Chân trang & Tiện ích Thời tiết",
    tag: "footer",
    type: "Footer",
    selector: "footer",
    children: [
      { id: "f-weather", sectionId: "footer", sectionName: "Footer", title: "Widget Dự báo thời tiết trực tiếp", tag: "div", type: "Weather Widget", selector: "footer .weather-box" },
      { id: "f-links", sectionId: "footer", sectionName: "Footer", title: "Danh mục liên kết nhanh & Bản quyền tác giả", tag: "div", type: "Footer Links", selector: "footer .footer-links" }
    ]
  }
];

export interface WebsitePageInfo {
  id: string;
  sectionId: string;
  sectionName: string;
  title: string;
  tag: string;
  selector: string;
  category: "main" | "specialty" | "media" | "systems" | "frame";
  categoryVi: string;
  categoryColor: string;
  icon: React.ElementType;
  descriptionVi: string;
  childCount: number;
  isRenderedInDom?: boolean;
  isActive?: boolean;
  elementHeight?: number;
}

export const WEBSITE_PAGES_META: WebsitePageInfo[] = [
  {
    id: "sec-home",
    sectionId: "home",
    sectionName: "Trang chủ",
    title: "Trang chủ & Giới thiệu nhanh",
    tag: "section",
    selector: "#home",
    category: "main",
    categoryVi: "Trang chính",
    categoryColor: "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/30",
    icon: Monitor,
    descriptionVi: "Khu vực đón tiếp, chức danh CX/CS Leader, các chỉ số thành tựu cốt lõi và nút kêu gọi hành động.",
    childCount: 5
  },
  {
    id: "sec-letter",
    sectionId: "letter",
    sectionName: "Thư ngỏ",
    title: "Thư ngỏ & Triết lý Quản trị",
    tag: "section",
    selector: "#letter",
    category: "main",
    categoryVi: "Trang chính",
    categoryColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    icon: MailOpen,
    descriptionVi: "Bức thư tâm huyết, chia sẻ cam kết và tầm nhìn phát triển dịch vụ khách hàng bền vững.",
    childCount: 3
  },
  {
    id: "sec-about",
    sectionId: "about",
    sectionName: "Giới thiệu",
    title: "Tiểu sử & Chân dung Lãnh đạo",
    tag: "section",
    selector: "#about",
    category: "main",
    categoryVi: "Trang chính",
    categoryColor: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
    icon: User,
    descriptionVi: "Hồ sơ cá nhân, 4 giá trị cốt lõi và hành trình hơn 22 năm cống hiến ngành dịch vụ.",
    childCount: 3
  },
  {
    id: "sec-education",
    sectionId: "education",
    sectionName: "Học vấn",
    title: "Học vấn, Bằng cấp & Chứng chỉ",
    tag: "section",
    selector: "#education",
    category: "specialty",
    categoryVi: "Chuyên môn",
    categoryColor: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/30",
    icon: GraduationCap,
    descriptionVi: "Hệ thống bằng cấp cử nhân, chứng chỉ chuyên sâu quốc tế và thành tích học tập nổi bật.",
    childCount: 3
  },
  {
    id: "sec-experience",
    sectionId: "experience",
    sectionName: "Kinh nghiệm",
    title: "Kinh nghiệm Chuyên môn & Lãnh đạo",
    tag: "section",
    selector: "#experience",
    category: "specialty",
    categoryVi: "Chuyên môn",
    categoryColor: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/30",
    icon: Briefcase,
    descriptionVi: "Dòng thời gian sự nghiệp, vị trí quản trị cấp cao tại MoMo, Prudential, VED, MobiFone.",
    childCount: 3
  },
  {
    id: "sec-skills",
    sectionId: "skills",
    sectionName: "Kỹ năng",
    title: "Bản đồ Kỹ năng & Năng lực Chuyên sâu",
    tag: "section",
    selector: "#skills",
    category: "specialty",
    categoryVi: "Chuyên môn",
    categoryColor: "text-violet-600 dark:text-violet-400 bg-violet-500/10 border-violet-500/30",
    icon: Brain,
    descriptionVi: "Kỹ năng lãnh đạo, quản trị con người, thiết kế quy trình và công nghệ AI/CRM.",
    childCount: 3
  },
  {
    id: "sec-projects",
    sectionId: "projects",
    sectionName: "Dự án",
    title: "Dự án Tiêu biểu & Chuyển đổi số CS",
    tag: "section",
    selector: "#projects",
    category: "specialty",
    categoryVi: "Chuyên môn",
    categoryColor: "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/30",
    icon: ClipboardList,
    descriptionVi: "Danh mục các dự án nâng cao CSAT, triển khai AI Assistant và hệ thống vận hành đa kênh.",
    childCount: 2
  },
  {
    id: "sec-interview",
    sectionId: "interview",
    sectionName: "Phỏng vấn",
    title: "Video Phỏng vấn Chiến lược CX/CS",
    tag: "section",
    selector: "#interview",
    category: "media",
    categoryVi: "Đa phương tiện",
    categoryColor: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
    icon: Video,
    descriptionVi: "Trình phát video trực tiếp, 13 câu hỏi phỏng vấn quản trị cùng câu trả lời phân tích chuyên sâu.",
    childCount: 3
  },
  {
    id: "sec-tuvi",
    sectionId: "tuvi",
    sectionName: "Tử vi",
    title: "Tử vi, Bản mệnh & Phong thủy",
    tag: "section",
    selector: "#tuvi",
    category: "media",
    categoryVi: "Phong thủy",
    categoryColor: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/30",
    icon: Sparkles,
    descriptionVi: "Luận giải Can Chi Giáp Tý 1984, ma trận tương hợp 12 con giáp và hướng làm việc cát lợi.",
    childCount: 2
  },
  {
    id: "sec-memories",
    sectionId: "memories",
    sectionName: "Kỷ niệm",
    title: "Kỷ niệm, Dấu ấn & Hoạt động Đội ngũ",
    tag: "section",
    selector: "#memories",
    category: "media",
    categoryVi: "Hình ảnh",
    categoryColor: "text-pink-600 dark:text-pink-400 bg-pink-500/10 border-pink-500/30",
    icon: Images,
    descriptionVi: "Bộ sưu tập hơn 32 khoảnh khắc gắn bó cùng đồng đội, sự kiện và cột mốc đáng nhớ.",
    childCount: 2
  },
  {
    id: "sec-systems",
    sectionId: "systems",
    sectionName: "Hệ thống",
    title: "Hệ thống Vận hành & Kiến trúc CS",
    tag: "section",
    selector: "#systems",
    category: "systems",
    categoryVi: "Hệ thống",
    categoryColor: "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/30",
    icon: LayoutGrid,
    descriptionVi: "12 Nền tảng quản trị công nghệ, kiến trúc đa kênh và quy trình xử lý sự cố chuẩn hóa.",
    childCount: 2
  },
  {
    id: "sec-contact",
    sectionId: "contact",
    sectionName: "Liên hệ",
    title: "Kênh Liên hệ & Kết nối Trực tiếp",
    tag: "section",
    selector: "#contact",
    category: "main",
    categoryVi: "Liên hệ",
    categoryColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    icon: MessagesSquare,
    descriptionVi: "Kênh kết nối chính thức, số điện thoại, email, biểu mẫu liên hệ và mạng xã hội.",
    childCount: 3
  },
  {
    id: "sec-wallpapers",
    sectionId: "wallpapers",
    sectionName: "Hình nền",
    title: "Kho Hình nền & Video Động 4K",
    tag: "section",
    selector: "#wallpapers",
    category: "media",
    categoryVi: "Tùy biến",
    categoryColor: "text-sky-600 dark:text-sky-400 bg-sky-500/10 border-sky-500/30",
    icon: Film,
    descriptionVi: "Kho giao diện hình nền, video nghệ thuật 4K và tùy chỉnh độ mờ nền thời gian thực.",
    childCount: 3
  },
  {
    id: "sec-header",
    sectionId: "header",
    sectionName: "Thanh Điều hướng",
    title: "Header Đa hướng Dọc / Ngang",
    tag: "header",
    selector: "header",
    category: "frame",
    categoryVi: "Khung điều hướng",
    categoryColor: "text-slate-600 dark:text-slate-400 bg-slate-500/10 border-slate-500/30",
    icon: Navigation,
    descriptionVi: "Thanh Menu điều hướng 14 phân mục, chuyển hướng Dọc/Ngang, chọn Ngôn ngữ và Giao diện.",
    childCount: 6
  },
  {
    id: "sec-footer",
    sectionId: "footer",
    sectionName: "Chân trang",
    title: "Chân trang & Tiện ích Thời tiết",
    tag: "footer",
    selector: "footer",
    category: "frame",
    categoryVi: "Khung chân trang",
    categoryColor: "text-slate-600 dark:text-slate-400 bg-slate-500/10 border-slate-500/30",
    icon: Layers,
    descriptionVi: "Widget dự báo thời tiết trực tiếp, liên kết nhanh, bản quyền và cài đặt chân trang.",
    childCount: 2
  }
];

export interface AgentTask {
  id: string;
  title: string;
  description?: string;
  status: "pending" | "in_progress" | "completed";
  assignedTo: "agent_ai_studio" | "user";
  createdAt: number;
  completedAt?: number;
  progress?: number;
  currentStepLog?: string;
  logs?: string[];
}

const DEFAULT_INITIAL_TASKS: AgentTask[] = [
  {
    id: "task-101",
    title: "Căn chỉnh Responsive và chuẩn hóa khoảng cách bố cục",
    description: "Đánh giá khoảng cách margin/padding, tối ưu tương thích hiển thị trên thiết bị di động và máy tính.",
    status: "pending",
    assignedTo: "agent_ai_studio",
    createdAt: Date.now() - 3600000,
    progress: 0,
    logs: ["Tác vụ vừa được tạo và phân công cho Agent AI Studio"]
  },
  {
    id: "task-102",
    title: "Cập nhật màu sắc giao diện chế độ Tối (Dark Mode) và độ tương phản WCAG",
    description: "Tăng cường hiệu ứng phát sáng mờ Glassmorphism và cải thiện độ phân giải tương phản.",
    status: "pending",
    assignedTo: "agent_ai_studio",
    createdAt: Date.now() - 1800000,
    progress: 0,
    logs: ["Đang chờ trong hàng đợi phân công"]
  },
  {
    id: "task-103",
    title: "Chuẩn hóa tiêu đề viết hoa chữ đầu & bổ sung icon sinh động",
    description: "Rà soát tiêu đề giao diện và cập nhật biểu tượng Icon từ thư viện.",
    status: "completed",
    assignedTo: "agent_ai_studio",
    createdAt: Date.now() - 7200000,
    completedAt: Date.now() - 3600000,
    progress: 100,
    logs: ["Đã khởi tạo tác vụ", "Agent AI Studio đã thực hiện thành công", "Đã di chuyển vào danh sách Hoàn Thành"]
  }
];

export default function XRayInspector() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [hoveredElement, setHoveredElement] = useState<ElementInfo | null>(null);
  const [selectedElement, setSelectedElement] = useState<ElementInfo | null>(null);
  
  // X-Ray Visual Identification Mode: "view" (Live side-panel) vs "popup" (Floating detailed interactive overlay card)
  const [xrayViewType, setXrayViewType] = useState<"view" | "popup">("popup");
  const [floatingPopupElement, setFloatingPopupElement] = useState<ElementInfo | null>(null);

  const mapElementToTreeItem = (el: ElementInfo): TreeItem => {
    return {
      id: el.id || `el-${Date.now()}`,
      sectionId: el.sectionId,
      sectionName: el.sectionName,
      title: el.textSnippet || el.id || el.fullSelector,
      tag: el.tag,
      type: el.componentType,
      selector: el.fullSelector,
      element: el.element
    };
  };

  const [mode, setMode] = useState<InspectorMode>("element");
  const [elementAppScope, setElementAppScope] = useState<"single" | "similar_page" | "similar_all">("single");
  const [elementActionMode, setElementActionMode] = useState<"edit" | "delete" | "clone_format" | "add" | "clean_code">("edit");
  const [selectedCleanTemplate, setSelectedCleanTemplate] = useState<string>("clean_dead_code");
  const [userInstruction, setUserInstruction] = useState<string>("");
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [inspectorOpen, setInspectorOpen] = useState<boolean>(false);

  // Typography Tab States
  const [typographyScope, setTypographyScope] = useState<"single_element" | "global_layout">("single_element");
  const [typographyScaleArchetype, setTypographyScaleArchetype] = useState<"major_second" | "major_third" | "perfect_fourth">("major_third");
  const [typographyBaseSize, setTypographyBaseSize] = useState<number>(16);
  const [typographyHeadingWeight, setTypographyHeadingWeight] = useState<string>("700");
  const [typographyBodyLineHeight, setTypographyBodyLineHeight] = useState<string>("1.6");
  const [typographySelectedToken, setTypographySelectedToken] = useState<string>("body");

  // Site Structure Hierarchy Tab States
  const [siteNodes, setSiteNodes] = useState<SiteStructureNode[]>([]);
  const [expandedSiteNodes, setExpandedSiteNodes] = useState<Record<string, boolean>>({});
  const [siteCategoryFilter, setSiteCategoryFilter] = useState<string>("all");
  const [siteSearchQuery, setSiteSearchQuery] = useState<string>("");
  const [selectedSiteNode, setSelectedSiteNode] = useState<SiteStructureNode | null>(null);
  const [copiedNodeId, setCopiedNodeId] = useState<string | null>(null);
  
  // Custom states for website sections check box & preset code input analyzer
  const [selectedSections, setSelectedSections] = useState<string[]>(DEFAULT_PAGE_STRUCTURE.map(s => s.sectionId));
  const [presetCodeInput, setPresetCodeInput] = useState<string>("");
  const [isScanningFullWebsite, setIsScanningFullWebsite] = useState<boolean>(false);
  const [websiteViewMode, setWebsiteViewMode] = useState<"bento" | "compact">("bento");
  const [websiteCategoryFilter, setWebsiteCategoryFilter] = useState<string>("all");
  const [websiteSearchQuery, setWebsiteSearchQuery] = useState<string>("");
  const [discoveredPagesList, setDiscoveredPagesList] = useState<WebsitePageInfo[]>(WEBSITE_PAGES_META);
  const [lastScannedPagesTime, setLastScannedPagesTime] = useState<string | null>(null);

  // Scan & update all pages currently in DOM
  const handleRefreshAllPages = () => {
    setIsScanningFullWebsite(true);
    playUiSound("scan");

    setTimeout(() => {
      if (typeof document !== "undefined") {
        const updatedPages = WEBSITE_PAGES_META.map(page => {
          const el = document.querySelector(page.selector) as HTMLElement | null;
          const isRendered = !!el;
          let elementHeight = 0;
          let childCount = page.childCount;
          let isActive = false;

          if (el) {
            const rect = el.getBoundingClientRect();
            elementHeight = Math.round(rect.height);
            const children = el.querySelectorAll("h1, h2, h3, button, a, form, img, video, [id]");
            childCount = Math.max(page.childCount, children.length);
            isActive = rect.top <= 200 && rect.bottom >= 100;
          }

          return {
            ...page,
            isRenderedInDom: isRendered,
            isActive,
            elementHeight,
            childCount
          };
        });

        setDiscoveredPagesList(updatedPages);
        setSelectedSections(updatedPages.map(p => p.sectionId));
        setLastScannedPagesTime(new Date().toLocaleTimeString("vi-VN"));
      }

      setIsScanningFullWebsite(false);
      playUiSound("success");
      showToast(`Đã quét & cập nhật thành công toàn bộ ${WEBSITE_PAGES_META.length} trang có trong website!`);
    }, 320);
  };

  // Jump / navigate to specific section
  const handleNavigateToPage = (sectionId: string, pageName: string) => {
    playUiSound("click");
    window.dispatchEvent(new CustomEvent("app-navigate", { detail: sectionId }));
    const targetEl = document.getElementById(sectionId) || document.querySelector(`[id="${sectionId}"]`) || document.querySelector(sectionId.startsWith("#") ? sectionId : `#${sectionId}`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    showToast(`Đã chuyển hướng đến trang: ${pageName}`);
  };

  // Light/Dark Theme inside Popup - Dynamically synchronized with DOM / system theme
  const [popupTheme, setPopupTheme] = useState<"light" | "dark">(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("dark") ? "dark" : "light";
    }
    return "dark";
  });

  // Automatically keep popupTheme in sync when the main application theme changes
  useEffect(() => {
    if (typeof document === "undefined") return;
    const syncWithDomTheme = () => {
      const isDocDark = document.documentElement.classList.contains("dark");
      setPopupTheme(isDocDark ? "dark" : "light");
    };

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === "class" || m.attributeName === "data-theme") {
          syncWithDomTheme();
          break;
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
    return () => observer.disconnect();
  }, []);

  // Tree View State
  const [treeStructure, setTreeStructure] = useState<TreeItem[]>(DEFAULT_PAGE_STRUCTURE);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "sec-home": true,
    "sec-interview": true
  });
  const [selectedTreeItem, setSelectedTreeItem] = useState<TreeItem | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Action Queue (Chỉnh / Xóa / Thêm / Chuyển / Định dạng giống)
  const [actionQueue, setActionQueue] = useState<TreeAction[]>([]);
  const [modalActionType, setModalActionType] = useState<"edit" | "delete" | "add" | "move" | "clone_format" | null>(null);
  const [actionDescription, setActionDescription] = useState<string>("");
  const [actionDestination, setActionDestination] = useState<string>("home");

  // New Item & Clone Format States
  const [newItemTitle, setNewItemTitle] = useState<string>("Thẻ thành phần mới");
  const [newItemTag, setNewItemTag] = useState<string>("div");
  const [newItemType, setNewItemType] = useState<string>("Thẻ chứa (Card / Box)");
  const [styleSource, setStyleSource] = useState<string>("Card 3D Glassmorphism (#education)");

  // New dropdown preset & delete mode states
  const [editPreset, setEditPreset] = useState<string>("");
  const [addPreset, setAddPreset] = useState<string>("");
  const [deleteMode, setDeleteMode] = useState<"wrapper_only" | "full">("wrapper_only");


  const [savedPrompts, setSavedPrompts] = useState<Array<{ id: string; title: string; prompt: string; time: string; presetName?: string }>>(() => {
    try {
      const saved = localStorage.getItem("xray_saved_prompts");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sample Prompts Templates State
  const DEFAULT_SAMPLE_PROMPTS = [
    { id: "sample-1", title: "Tối ưu UI/UX Responsive", content: "Tối ưu hóa giao diện chuẩn Responsive cho mọi màn hình, cân chỉnh khoảng cách padding/margin và đồng bộ phong cách thiết kế.", isCustom: false },
    { id: "sample-2", title: "Hiệu ứng Glassmorphism", content: "Làm nổi bật các thẻ thông tin (card) với hiệu ứng kính mờ Glassmorphism, viền neon mỏng và bóng đổ hiện đại.", isCustom: false },
    { id: "sample-3", title: "Cân bằng Tương phản WCAG AA", content: "Kiểm tra và cân bằng độ tương phản màu sắc đạt chuẩn WCAG AA cho cả 2 chế độ Sáng (Light) và Tối (Dark Neon).", isCustom: false },
    { id: "sample-4", title: "Hoạt ảnh Chuyển động Mượt", content: "Bổ sung hiệu ứng chuyển động mượt mà (smooth animations/hover states) khi tương tác với các nút và thẻ.", isCustom: false },
    { id: "sample-5", title: "Đồng bộ Bố cục Thẻ Grid", content: "Sắp xếp lại bố cục dạng lưới thẻ (grid) cân đối, đồng bộ chiều cao và khoảng cách giữa các phần tử.", isCustom: false }
  ];

  const [samplePromptTemplates, setSamplePromptTemplates] = useState<Array<{ id: string; title: string; content: string; isCustom?: boolean }>>(() => {
    try {
      const saved = localStorage.getItem("xray_sample_prompts");
      const customList = saved ? JSON.parse(saved) : [];
      return [...customList, ...DEFAULT_SAMPLE_PROMPTS];
    } catch {
      return DEFAULT_SAMPLE_PROMPTS;
    }
  });
  const [showSamplePromptsList, setShowSamplePromptsList] = useState<boolean>(false);

  // Chat History State
  const [chatHistory, setChatHistory] = useState<Array<{
    id: string;
    time: string;
    itemCount: number;
    uniqueTasksCount: number;
    content: string;
    groupedTasks: Array<{ title: string; time: string; promptCount: number }>;
  }>>(() => {
    try {
      const hist = localStorage.getItem("xray_chat_history");
      return hist ? JSON.parse(hist) : [];
    } catch {
      return [];
    }
  });
  const [savedModalTab, setSavedModalTab] = useState<"saved" | "history">("saved");

  const [showSavedListModal, setShowSavedListModal] = useState<boolean>(false);
  const [confirmClearAll, setConfirmClearAll] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleSaveSamplePrompt = () => {
    if (!userInstruction.trim()) return;
    playUiSound("success");
    const newTmpl = {
      id: `custom-sample-${Date.now()}`,
      title: userInstruction.trim().length > 30 ? `${userInstruction.trim().slice(0, 30)}...` : userInstruction.trim(),
      content: userInstruction.trim(),
      isCustom: true
    };
    const updated = [newTmpl, ...samplePromptTemplates];
    setSamplePromptTemplates(updated);
    try {
      const customOnly = updated.filter(item => item.isCustom);
      localStorage.setItem("xray_sample_prompts", JSON.stringify(customOnly));
    } catch {}
    showToast("Đã lưu câu prompt mẫu mới thành công!");
  };

  const handleSelectSamplePrompt = (content: string) => {
    playUiSound("click");
    setUserInstruction(content);
    setShowSamplePromptsList(false);
    showToast("Đã nhập nội dung câu prompt mẫu vào khung yêu cầu!");
  };

  const handleDeleteSamplePrompt = (id: string) => {
    playUiSound("click");
    const updated = samplePromptTemplates.filter(t => t.id !== id);
    setSamplePromptTemplates(updated);
    try {
      const customOnly = updated.filter(item => item.isCustom);
      localStorage.setItem("xray_sample_prompts", JSON.stringify(customOnly));
    } catch {}
    showToast("Đã xóa câu prompt mẫu khỏi danh sách!");
  };

  const handleCloseAllXRay = () => {
    playUiSound("click");
    setInspectorOpen(false);
    setIsActive(false);
    setHoveredElement(null);
    setSelectedElement(null);
    setGeneratedPrompt("");
  };

  const handleSavePromptToList = () => {
    if (!generatedPrompt) return;
    playUiSound("success");
    const activePresetObj = PRESET_TEMPLATES.find(p => p.id === selectedPreset);
    const title = activePresetObj ? activePresetObj.titleVi : (selectedElement ? `Phần tử ${selectedElement.componentType}` : "Lệnh X-Ray Tùy Chỉnh");
    
    // Lưu trữ toàn bộ không lọc trùng
    const newItem = {
      id: `prompt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title,
      prompt: generatedPrompt,
      time: new Date().toLocaleString(),
      presetName: activePresetObj?.titleVi
    };
    const updated = [newItem, ...savedPrompts];
    setSavedPrompts(updated);
    try {
      localStorage.setItem("xray_saved_prompts", JSON.stringify(updated));
    } catch {}
    showToast("Đã lưu prompt vào danh sách thành công!");
  };

  const handleCopyAllSavedPrompts = () => {
    if (savedPrompts.length === 0) return;
    playUiSound("success");

    const totalCount = savedPrompts.length;
    // Sao chép toàn bộ danh sách prompt nguyên vẹn, không lọc trùng
    const formattedText = savedPrompts.map(item => item.prompt).join("\n\n");

    navigator.clipboard.writeText(formattedText);

    // Save into Chat History in localStorage
    try {
      const existingHistory = JSON.parse(localStorage.getItem("xray_chat_history") || "[]");
      const historyEntry = {
        id: `chat-hist-${Date.now()}`,
        time: new Date().toLocaleString('vi-VN'),
        itemCount: totalCount,
        uniqueTasksCount: totalCount,
        content: formattedText,
        groupedTasks: savedPrompts.map(item => ({ title: item.title, time: item.time, promptCount: 1 }))
      };
      const updatedHist = [historyEntry, ...existingHistory];
      localStorage.setItem("xray_chat_history", JSON.stringify(updatedHist));
      setChatHistory(updatedHist);
    } catch (e) {}

    // Auto clear saved list after copy as requested
    setSavedPrompts([]);
    try {
      localStorage.removeItem("xray_saved_prompts");
    } catch {}

    showToast(`Đã sao chép toàn bộ ${totalCount} prompt (lưu trữ đầy đủ, không lọc trùng)! Đã lưu vào Lịch sử Chat.`);
  };

  const handleClearAllSavedPrompts = () => {
    if (savedPrompts.length === 0) return;
    playUiSound("click");
    setConfirmClearAll(true);
  };

  const handleExecuteClearAll = () => {
    playUiSound("click");
    setSavedPrompts([]);
    try {
      localStorage.removeItem("xray_saved_prompts");
    } catch {}
    setConfirmClearAll(false);
    showToast("Đã xóa tất cả prompt đã lưu thành công!");
  };

  const handleDeleteSavedPrompt = (id: string) => {
    playUiSound("click");
    const updated = savedPrompts.filter(p => p.id !== id);
    setSavedPrompts(updated);
    try {
      localStorage.setItem("xray_saved_prompts", JSON.stringify(updated));
    } catch {}
    showToast("Đã xóa prompt khỏi danh sách!");
  };

  // Clean snippet helper
  const cleanSnippet = (text: string, maxLength: number = 50): string => {
    if (!text) return "";
    const condensed = text.replace(/\s+/g, " ").trim();
    if (condensed.length <= maxLength) return condensed;
    return condensed.slice(0, maxLength) + "...";
  };

  // Extract section info
  const getSectionInfo = (el: HTMLElement): { name: string; id: string } => {
    const sectionEl = el.closest("section") || el.closest("header") || el.closest("footer") || el.closest("[id]");
    if (sectionEl) {
      const id = sectionEl.getAttribute("id") || sectionEl.tagName.toLowerCase();
      const matched = DEFAULT_PAGE_STRUCTURE.find(s => s.sectionId === id);
      return {
        id: id,
        name: matched ? matched.sectionName : `Phần #${id}`
      };
    }
    return { name: "Giao diện chính", id: "app" };
  };

  const getComponentType = (el: HTMLElement): string => {
    const tag = el.tagName.toLowerCase();
    if (tag === "button" || el.getAttribute("role") === "button" || el.onclick) return "Nút bấm (Button)";
    if (tag === "h1" || tag === "h2" || tag === "h3" || tag === "h4") return "Tiêu đề (Heading)";
    if (tag === "p" || tag === "span") return "Đoạn văn bản (Text)";
    if (tag === "img" || tag === "svg") return "Hình ảnh / Biểu tượng (Media)";
    if (tag === "input" || tag === "textarea" || tag === "select") return "Trường nhập liệu (Input)";
    if (tag === "a") return "Đường liên kết (Link)";
    if (tag === "video") return "Trình phát Video (Video)";
    if (el.classList.contains("rounded-2xl") || el.classList.contains("border")) return "Thẻ chứa (Card / Box)";
    return "Phần tử giao diện (Component)";
  };

  const getCssPath = (el: HTMLElement): string => {
    if (el.id) return `#${el.id}`;
    let path = el.tagName.toLowerCase();
    if (el.className && typeof el.className === "string") {
      const classes = el.className
        .split(" ")
        .filter(c => c && !c.includes(":") && !c.includes("[") && !c.includes("/") && !c.includes("hover") && !c.includes("active") && !c.includes("dark"))
        .slice(0, 2);
      if (classes.length) path += `.${classes.join(".")}`;
    }
    return path;
  };

  // Toggle X-Ray on keypress or custom event
  useEffect(() => {
    const handleToggleEvent = () => {
      setIsActive(prev => {
        const nextState = !prev;
        if (!nextState) {
          setHoveredElement(null);
          setSelectedElement(null);
          setInspectorOpen(false);
        } else {
          playUiSound("special");
        }
        return nextState;
      });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === "x" || e.key === "X") {
        e.preventDefault();
        handleToggleEvent();
      }

      if (e.key === "Escape" && (isActive || inspectorOpen)) {
        handleCloseAllXRay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("toggle-xray", handleToggleEvent);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("toggle-xray", handleToggleEvent);
    };
  }, [isActive, inspectorOpen]);

  // Inspect hovering elements when active
  useEffect(() => {
    if (!isActive || inspectorOpen) return;

    const handleMouseMove = (e: MouseEvent) => {
      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      if (!target || target.closest("#xray-inspector-ui")) return;

      const rect = target.getBoundingClientRect();
      const secInfo = getSectionInfo(target);
      const rawText = target.innerText || target.getAttribute("alt") || target.getAttribute("title") || "";
      const text = cleanSnippet(rawText, 50);

      setHoveredElement({
        tag: target.tagName.toLowerCase(),
        id: target.id,
        className: typeof target.className === "string" ? target.className : "",
        rect,
        textSnippet: text,
        sectionName: secInfo.name,
        sectionId: secInfo.id,
        componentType: getComponentType(target),
        element: target,
        fullSelector: getCssPath(target)
      });
    };

    const handleClick = (e: MouseEvent) => {
      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      if (!target || target.closest("#xray-inspector-ui")) return;

      e.preventDefault();
      e.stopPropagation();

      playUiSound("click");
      const rect = target.getBoundingClientRect();
      const secInfo = getSectionInfo(target);
      const rawText = target.innerText || target.getAttribute("alt") || target.getAttribute("title") || "";
      const text = cleanSnippet(rawText, 50);

      const info: ElementInfo = {
        tag: target.tagName.toLowerCase(),
        id: target.id,
        className: typeof target.className === "string" ? target.className : "",
        rect,
        textSnippet: text,
        sectionName: secInfo.name,
        sectionId: secInfo.id,
        componentType: getComponentType(target),
        element: target,
        fullSelector: getCssPath(target)
      };

      setSelectedElement(info);
      setMode("element");
      setInspectorOpen(true);
      setFloatingPopupElement(null);
      setHoveredElement(null);
      setGeneratedPrompt("");
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick, { capture: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick, { capture: true });
    };
  }, [isActive, inspectorOpen, xrayViewType]);

  const toggleSectionExpand = (sectionKey: string) => {
    playUiSound("click");
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  // Scan DOM Site Structure Tree for "Cấu trúc 1 Site" Tab
  const scanFullSiteStructureTree = () => {
    if (typeof document === "undefined") return;

    const buildNode = (el: HTMLElement, depth: number, parentId: string, idx: number): SiteStructureNode | null => {
      if (!el || el.closest("#xray-inspector-ui")) return null;
      const tag = el.tagName.toLowerCase();
      if (tag === "script" || tag === "style" || tag === "noscript") return null;

      const idAttr = el.id || "";
      const className = typeof el.className === "string" ? el.className : "";

      let category: SiteStructureNode["category"] = "container";
      if (
        ["section", "header", "footer", "nav", "main"].includes(tag) ||
        idAttr.startsWith("sec") ||
        ["home", "about", "skills", "contact", "projects", "education"].includes(idAttr)
      ) {
        category = "section";
      } else if (["button", "a", "input", "select", "textarea"].includes(tag) || el.getAttribute("role") === "button") {
        category = "button";
      } else if (tag.startsWith("h") || ["p", "span", "strong", "b", "em", "label"].includes(tag)) {
        category = "text";
      } else if (["img", "video", "canvas", "svg", "iframe", "picture"].includes(tag)) {
        category = "media";
      } else if (
        className.includes("card") ||
        className.includes("glass") ||
        className.includes("bento") ||
        className.includes("rounded-2xl") ||
        className.includes("rounded-3xl")
      ) {
        category = "card";
      }

      const rawText = el.innerText || el.getAttribute("alt") || el.getAttribute("title") || el.getAttribute("aria-label") || "";
      const textSnippet = cleanSnippet(rawText, 45);
      const clientRect = el.getBoundingClientRect();
      const rect = {
        width: Math.round(clientRect.width),
        height: Math.round(clientRect.height)
      };

      const selector = getCssPath(el);
      const nodeId = `sn-${parentId}-${depth}-${idx}`;

      const childrenNodes: SiteStructureNode[] = [];
      if (depth < 5 && el.children && el.children.length > 0) {
        Array.from(el.children).forEach((childEl, cIdx) => {
          if (childEl instanceof HTMLElement) {
            const childNode = buildNode(childEl, depth + 1, nodeId, cIdx);
            if (childNode) {
              childrenNodes.push(childNode);
            }
          }
        });
      }

      return {
        id: nodeId,
        tagName: tag,
        idAttr,
        className,
        selector,
        depth,
        category,
        textSnippet,
        rect,
        childrenCount: childrenNodes.length,
        children: childrenNodes,
        element: el
      };
    };

    const topElements = Array.from(
      document.querySelectorAll("header, nav, main, section[id], footer, #app > div, body > div:not(#xray-inspector-ui)")
    ) as HTMLElement[];

    const uniqueRoots: HTMLElement[] = [];
    topElements.forEach(el => {
      if (el.closest("#xray-inspector-ui")) return;
      if (!uniqueRoots.some(existing => existing.contains(el))) {
        uniqueRoots.push(el);
      }
    });

    const roots: SiteStructureNode[] = [];
    const initialExpanded: Record<string, boolean> = {};

    uniqueRoots.forEach((rootEl, rIdx) => {
      const node = buildNode(rootEl, 1, "root", rIdx);
      if (node) {
        roots.push(node);
        initialExpanded[node.id] = true;
        if (node.children) {
          node.children.forEach(c => {
            initialExpanded[c.id] = true;
          });
        }
      }
    });

    setSiteNodes(roots);
    setExpandedSiteNodes(initialExpanded);
  };

  useEffect(() => {
    if (inspectorOpen && mode === "site_structure" && siteNodes.length === 0) {
      scanFullSiteStructureTree();
    }
  }, [inspectorOpen, mode]);

  const isSiteNodeMatching = (node: SiteStructureNode): boolean => {
    let categoryMatch = true;
    if (siteCategoryFilter !== "all") {
      categoryMatch = node.category === siteCategoryFilter;
    }

    let searchMatch = true;
    if (siteSearchQuery.trim()) {
      const q = siteSearchQuery.toLowerCase().trim();
      searchMatch =
        node.tagName.toLowerCase().includes(q) ||
        node.idAttr.toLowerCase().includes(q) ||
        node.className.toLowerCase().includes(q) ||
        node.textSnippet.toLowerCase().includes(q) ||
        node.selector.toLowerCase().includes(q);
    }

    const hasMatchingChild = node.children ? node.children.some(c => isSiteNodeMatching(c)) : false;
    return (categoryMatch && searchMatch) || hasMatchingChild;
  };

  const renderSiteNodeRecursive = (node: SiteStructureNode): React.ReactNode => {
    if (!isSiteNodeMatching(node)) return null;

    const isExpanded = !!expandedSiteNodes[node.id];
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = selectedSiteNode?.id === node.id;

    const getCategoryIcon = (cat: SiteStructureNode["category"]) => {
      switch (cat) {
        case "section": return <Globe className="w-3.5 h-3.5 text-sky-500 shrink-0" />;
        case "card": return <Boxes className="w-3.5 h-3.5 text-purple-500 shrink-0" />;
        case "button": return <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />;
        case "text": return <FileCode className="w-3.5 h-3.5 text-emerald-500 shrink-0" />;
        case "media": return <Image className="w-3.5 h-3.5 text-rose-500 shrink-0" />;
        default: return <Layout className="w-3.5 h-3.5 text-slate-400 shrink-0" />;
      }
    };

    return (
      <div key={node.id} className="space-y-1">
        <div
          style={{ paddingLeft: `${Math.max(0, (node.depth - 1) * 14)}px` }}
          onMouseEnter={() => {
            if (node.element) {
              const rect = node.element.getBoundingClientRect();
              const secInfo = getSectionInfo(node.element);
              setHoveredElement({
                tag: node.tagName,
                id: node.idAttr,
                className: node.className,
                rect,
                textSnippet: node.textSnippet,
                sectionName: secInfo.name,
                sectionId: secInfo.id,
                componentType: getComponentType(node.element),
                element: node.element,
                fullSelector: node.selector
              });
            }
          }}
          onMouseLeave={() => {
            setHoveredElement(null);
          }}
          className={cn(
            "group/sitenode flex items-center justify-between gap-2 p-2 rounded-xl text-xs border transition-all relative",
            isSelected
              ? "bg-purple-100 dark:bg-purple-950/70 border-purple-500 ring-2 ring-purple-500/30 font-bold"
              : isLight
                ? "bg-white hover:bg-purple-50/80 border-slate-200/90 hover:border-purple-300"
                : "bg-slate-900/90 hover:bg-purple-950/40 border-slate-800 hover:border-purple-800/80"
          )}
        >
          {node.depth > 1 && (
            <div
              className="absolute top-0 bottom-0 border-l-2 border-purple-400/30 pointer-events-none"
              style={{ left: `${(node.depth - 1) * 14 - 6}px` }}
            />
          )}

          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            {hasChildren ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playUiSound("click");
                  setExpandedSiteNodes(prev => ({ ...prev, [node.id]: !prev[node.id] }));
                }}
                className="p-1 rounded-md hover:bg-purple-200 dark:hover:bg-purple-900/60 text-slate-500 hover:text-purple-600 cursor-pointer shrink-0"
              >
                {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            ) : (
              <div className="w-5 shrink-0" />
            )}

            {getCategoryIcon(node.category)}

            <span className={cn(
              "px-1.5 py-0.2 rounded text-3xs font-black shrink-0 font-mono",
              node.depth === 1
                ? "bg-sky-500 text-white"
                : node.depth === 2
                  ? "bg-purple-500 text-white"
                  : node.depth === 3
                    ? "bg-indigo-500 text-white"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            )}>
              Cấp {node.depth}
            </span>

            <span className="font-mono font-bold text-purple-700 dark:text-purple-300 text-xs shrink-0">
              &lt;{node.tagName}&gt;
            </span>

            {node.idAttr && (
              <span className="px-1.5 py-0.2 rounded text-3xs font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 shrink-0 font-mono">
                #{node.idAttr}
              </span>
            )}

            {node.rect.width > 0 && (
              <span className="text-3xs font-mono text-slate-400 shrink-0 hidden sm:inline">
                {node.rect.width}×{node.rect.height}px
              </span>
            )}

            {node.textSnippet && (
              <span className="text-slate-600 dark:text-slate-300 truncate text-2xs font-medium max-w-[160px] sm:max-w-[240px]">
                "{node.textSnippet}"
              </span>
            )}

            {node.childrenCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-3xs font-bold bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 shrink-0">
                {node.childrenCount} thẻ con
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 shrink-0 opacity-90 group-hover/sitenode:opacity-100">
            <button
              onClick={() => {
                playUiSound("click");
                setSelectedSiteNode(node);
                if (node.element) {
                  const secInfo = getSectionInfo(node.element);
                  setSelectedElement({
                    tag: node.tagName,
                    id: node.idAttr,
                    className: node.className,
                    rect: node.element.getBoundingClientRect(),
                    textSnippet: node.textSnippet,
                    sectionName: secInfo.name,
                    sectionId: secInfo.id,
                    componentType: getComponentType(node.element),
                    element: node.element,
                    fullSelector: node.selector
                  });
                  setMode("element");
                  setGeneratedPrompt("");
                }
              }}
              className="px-2 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 dark:bg-emerald-950/80 dark:hover:bg-emerald-900 dark:text-emerald-300 text-3xs font-bold transition-all flex items-center gap-1 cursor-pointer"
              title="Soi và phân tích chi tiết phần tử này"
            >
              <Crosshair className="w-3 h-3" />
              <span>Soi thẻ</span>
            </button>

            <button
              onClick={() => {
                playUiSound("click");
                navigator.clipboard.writeText(node.selector);
                setCopiedNodeId(node.id);
                showToast("Đã chép Selector vào bộ nhớ tạm!");
                setTimeout(() => setCopiedNodeId(null), 2000);
              }}
              className="p-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 text-3xs font-bold transition-all cursor-pointer"
              title="Chép Selector CSS"
            >
              {copiedNodeId === node.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="space-y-1">
            {node.children.map(childNode => renderSiteNodeRecursive(childNode))}
          </div>
        )}
      </div>
    );
  };

  // Scan & Update live page structure from real DOM
  const scanLivePageStructure = () => {
    playUiSound("special");
    const sections = Array.from(document.querySelectorAll("section[id], header, footer, main > div[id]")) as HTMLElement[];
    if (sections.length === 0) {
      showToast("Không tìm thấy section ID nào trên DOM!");
      return;
    }

    const newTree: TreeItem[] = sections.map((secEl, idx) => {
      const secId = secEl.getAttribute("id") || secEl.tagName.toLowerCase();
      const secHeading = secEl.querySelector("h1, h2, h3")?.textContent?.trim();
      const matchedDefault = DEFAULT_PAGE_STRUCTURE.find(s => s.sectionId === secId);
      
      const sectionTitle = secHeading 
        ? `Trang #${secId}: ${secHeading.slice(0, 35)}` 
        : (matchedDefault ? matchedDefault.title : `Phân mục #${secId}`);

      const sectionName = matchedDefault ? matchedDefault.sectionName : `Phần ${secId}`;

      // Query interactive children
      const childEls = Array.from(secEl.querySelectorAll("h1, h2, h3, button, a[role='button'], form, img, video, canvas, div.rounded-2xl, div.rounded-3xl, [id]")) as HTMLElement[];
      
      const uniqueChildren: HTMLElement[] = [];
      childEls.forEach(el => {
        if (el === secEl) return;
        if (el.closest("#xray-inspector-ui")) return;
        if (!uniqueChildren.some(existing => existing.contains(el))) {
          uniqueChildren.push(el);
        }
      });

      const childrenItems: TreeItem[] = uniqueChildren.slice(0, 12).map((child, cIdx) => {
        const tag = child.tagName.toLowerCase();
        const textSnippet = child.innerText?.trim().slice(0, 30) || child.getAttribute("alt") || child.getAttribute("title") || "";
        const childType = tag === "button" ? "Nút bấm" : tag.startsWith("h") ? "Tiêu đề" : tag === "img" ? "Hình ảnh" : tag === "form" ? "Form" : "Thẻ chứa";
        const childSelector = `#${secId} ${tag}${child.id ? `#${child.id}` : child.className ? `.${child.className.split(" ")[0]}` : ""}`;

        return {
          id: `scanned-${secId}-${cIdx}-${Date.now()}`,
          sectionId: secId,
          sectionName,
          title: textSnippet ? `${childType}: "${textSnippet}"` : `${childType} <${tag}>`,
          tag,
          type: childType,
          selector: childSelector,
          element: child
        };
      });

      return {
        id: `scanned-sec-${secId}-${idx}`,
        sectionId: secId,
        sectionName,
        title: sectionTitle,
        tag: secEl.tagName.toLowerCase(),
        type: "Section",
        selector: `#${secId}`,
        children: childrenItems,
        element: secEl
      };
    });

    setTreeStructure(newTree);
    const expanded: Record<string, boolean> = {};
    newTree.forEach(s => { expanded[s.id] = true; });
    setExpandedSections(expanded);

    showToast(`Đã cập nhật cấu trúc trang trực tiếp từ DOM (${newTree.length} trang) thành công!`);
  };

  // Add Action from Tree or Inspector
  const handleOpenActionModal = (item: TreeItem, type: "edit" | "delete" | "add" | "move" | "clone_format") => {
    playUiSound("click");
    setSelectedTreeItem(item);
    setModalActionType(type);
    setEditPreset("");
    setAddPreset("");
    setDeleteMode("wrapper_only");

    if (type === "edit") {
      setActionDescription(`Chỉnh sửa giao diện và nội dung của [${item.title}]: `);
    } else if (type === "delete") {
      setActionDescription(`Xóa bỏ đối tượng [${item.title}] (Selector: ${item.selector}).`);
    } else if (type === "add") {
      setNewItemTitle("Thẻ thành phần mới");
      setNewItemTag("div");
      setNewItemType("Thẻ chứa (Card / Box)");
      setActionDescription(`Bổ sung thêm thành phần mới vào bên trong/cùng cấp với [${item.title}].`);
    } else if (type === "move") {
      setActionDescription(`Di chuyển đối tượng [${item.title}] sang vị trí mới.`);
    } else if (type === "clone_format") {
      setStyleSource("Thẻ Main card dự án");
      setActionDescription(`Định dạng giao diện [${item.title}] giống chuẩn với Thẻ Main card dự án (Hiệu ứng phẳng flat design, bo cong 20px, tiêu đề viết thường chữ đầu viết hoa, viền mỏng tối giản).`);
    }
  };

  const handleConfirmAction = () => {
    if (!selectedTreeItem || !modalActionType) return;
    playUiSound("success");

    let actionDesc = actionDescription.trim();
    if (modalActionType === "add") {
      actionDesc = `Thêm đối tượng mới [${newItemTitle}] (<${newItemTag}> - ${newItemType}) vào [${selectedTreeItem.title}]. ${actionDesc}`;
    } else if (modalActionType === "clone_format") {
      actionDesc = `Định dạng giao diện [${selectedTreeItem.title}] giống chuẩn mẫu tham chiếu [${styleSource}]. ${actionDesc}`;
    } else if (modalActionType === "delete") {
      if (deleteMode === "wrapper_only") {
        actionDesc = `Xóa bỏ khung bọc ngoài [${selectedTreeItem.title}] (Selector: \`${selectedTreeItem.selector}\`), giữ nguyên tất cả đối tượng và nội dung bên trong, tìm và xóa file code liên quan. ${actionDesc}`;
      } else {
        actionDesc = `Xóa toàn bộ đối tượng [${selectedTreeItem.title}] (Selector: \`${selectedTreeItem.selector}\`) cùng tất cả các phần tử con bên trong, tìm và xóa file code liên quan. ${actionDesc}`;
      }
    } else if (modalActionType === "edit") {
      if (editPreset) {
        const tmpl = PRESET_TEMPLATES.find(p => p.id === editPreset);
        if (tmpl) {
          actionDesc = `[MẪU ${tmpl.label.toUpperCase()}]: Chỉnh sửa [${selectedTreeItem.title}] (${selectedTreeItem.sectionName}): ${tmpl.promptSnippet}. ${actionDesc}`;
        }
      }
    } else if (!actionDesc) {
      actionDesc = "Thực hiện theo yêu cầu thiết kế chuẩn.";
    }

    const newAction: TreeAction = {
      id: `act-${Date.now()}`,
      type: modalActionType,
      targetTitle: selectedTreeItem.title,
      targetSelector: selectedTreeItem.selector,
      sectionName: selectedTreeItem.sectionName,
      sectionId: selectedTreeItem.sectionId,
      description: actionDesc,
      targetDestination: modalActionType === "move" ? actionDestination : undefined,
      styleSource: modalActionType === "clone_format" ? styleSource : undefined
    };

    // Live update treeStructure state for Add & Delete actions in Tree View
    if (modalActionType === "delete") {
      if (deleteMode === "full") {
        setTreeStructure(prev => prev.map(sec => {
          if (sec.id === selectedTreeItem.id) {
            return null;
          }
          if (sec.children) {
            return {
              ...sec,
              children: sec.children.filter(c => c.id !== selectedTreeItem.id)
            };
          }
          return sec;
        }).filter(Boolean) as TreeItem[]);
      }
    } else if (modalActionType === "add") {
      const createdChildItem: TreeItem = {
        id: `child-new-${Date.now()}`,
        sectionId: selectedTreeItem.sectionId,
        sectionName: selectedTreeItem.sectionName,
        title: newItemTitle,
        tag: newItemTag,
        type: newItemType,
        selector: `${selectedTreeItem.selector} .${newItemTag}-new`
      };

      setTreeStructure(prev => prev.map(sec => {
        if (sec.id === selectedTreeItem.id || sec.sectionId === selectedTreeItem.sectionId) {
          return {
            ...sec,
            children: [...(sec.children || []), createdChildItem]
          };
        }
        return sec;
      }));
    }

    setActionQueue(prev => [newAction, ...prev]);

    // Automatically push action into Saved Prompts storage!
    const actionTypeName = 
      modalActionType === "edit" ? "Chỉnh Sửa Đối Tượng" :
      modalActionType === "delete" ? (deleteMode === "wrapper_only" ? "Xóa Khung Bọc (Giữ Nội Dung)" : "Xóa Toàn Bộ Đối Tượng") :
      modalActionType === "add" ? "Thêm Đối Tượng Mới" :
      modalActionType === "clone_format" ? "Áp Dụng Định Dạng Mẫu" : "Chuyển Vị Trí";

    const newSavedPrompt: SavedPromptItem = {
      id: `saved-${Date.now()}`,
      title: `${actionTypeName}: ${selectedTreeItem.title}`,
      prompt: `[THAO TÁC ${actionTypeName.toUpperCase()}]
• Vị trí: ${selectedTreeItem.sectionName} (#${selectedTreeItem.sectionId})
• Đối tượng: ${selectedTreeItem.title} (\`${selectedTreeItem.selector}\`)
• Lệnh thực thi: ${actionDesc}`,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      presetName: editPreset ? PRESET_TEMPLATES.find(p => p.id === editPreset)?.label : undefined
    };

    setSavedPrompts(prev => {
      const updated = [newSavedPrompt, ...prev];
      try {
        localStorage.setItem("xray_saved_prompts", JSON.stringify(updated));
      } catch (err) {}
      return updated;
    });

    showToast(`Đã thêm thao tác và tự động lưu vào prompt lưu trữ!`);

    setModalActionType(null);
    setActionDescription("");
    setEditPreset("");
    setAddPreset("");
  };

  const handleRemoveAction = (actionId: string) => {
    playUiSound("click");
    setActionQueue(prev => prev.filter(a => a.id !== actionId));
  };

  // Jump/Navigate to section on live page
  const handleNavigateToSection = (sectionId: string) => {
    playUiSound("click");
    const targetEl = document.getElementById(sectionId) || document.querySelector(sectionId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };


  // Generate Prompt
  const handleGeneratePrompt = () => {
    playUiSound("special");

    const activePresetObj = PRESET_TEMPLATES.find(p => p.id === selectedPreset);
    const presetText = activePresetObj 
      ? `\n📌 ${activePresetObj.promptSnippet}\n`
      : "";

    let codeAnalysisBlock = "";
    if (presetCodeInput.trim()) {
      const linesCount = presetCodeInput.trim().split("\n").length;
      const containsReact = presetCodeInput.includes("useState") || presetCodeInput.includes("useEffect") || presetCodeInput.includes("react");
      const containsTailwind = presetCodeInput.includes("className=") || presetCodeInput.includes("flex ") || presetCodeInput.includes("grid ");
      const containsLucide = presetCodeInput.includes("lucide-react") || presetCodeInput.includes("lucide");
      const containsFramerMotion = presetCodeInput.includes("motion") || presetCodeInput.includes("framer-motion");
      
      codeAnalysisBlock = `
🔍 [PHÂN TÍCH CHUYÊN SÂU MÃ NGUỒN CUNG CẤP]:
- Độ dài mã nguồn: ${linesCount} dòng.
- Đặc trưng kỹ thuật phát hiện: ${[
        containsReact ? "React hooks & State" : "",
        containsTailwind ? "Tailwind CSS v4 classes" : "",
        containsLucide ? "Biểu tượng Lucide-React" : "",
        containsFramerMotion ? "Chuyển động Framer Motion" : ""
      ].filter(Boolean).join(", ") || "Mã nguồn/HTML thuần"}.
- Yêu cầu chuyển đổi cấu trúc: Phân tích toàn bộ yêu cầu kỹ thuật và trích xuất 100% logic, styles, các hàm xử lý sự kiện, và giao diện từ đoạn mã nguồn dưới đây để tích hợp trực tiếp, đồng bộ vào website:
\`\`\`tsx
${presetCodeInput.trim()}
\`\`\`
`;
    }

    let finalPrompt = "";
    let promptTitle = "";

    if (mode === "site_structure") {
      let selectedNodeText = "";
      if (selectedSiteNode) {
        selectedNodeText = `\n🎯 PHẦN TỬ CẤU TRÚC ĐÃ CHỌN:\n- Tên thành phần: <${selectedSiteNode.tagName}> (Cấp ${selectedSiteNode.depth})\n- Selector: \`${selectedSiteNode.selector}\`\n- Vị trí kích thước: ${selectedSiteNode.rect.width}x${selectedSiteNode.rect.height}px\n- Lớp CSS: \`${selectedSiteNode.className.slice(0, 80)}\`${selectedSiteNode.textSnippet ? `\n- Nội dung nhận dạng: "${selectedSiteNode.textSnippet}"` : ""}`;
      }

      finalPrompt = `Hãy thực hiện điều chỉnh cấu trúc phân cấp cho Website:
- 🌐 Phạm vi: Cấu trúc Site (Page Component Hierarchy Structure)
- 📊 Tổng số thành phần đã quét: ${siteNodes.length} nhóm root components
${selectedNodeText}
${presetText}
${codeAnalysisBlock}
- ⚡ YÊU CẦU CẤU TRÚC CHI TIẾT: ${userInstruction.trim() || "Cân chỉnh phân cấp layout, chuẩn hóa khoảng cách responsive và tối ưu hiệu ứng hiển thị."}

Vui lòng cập nhật trực tiếp vào mã nguồn của các component tương ứng, đảm bảo mã nguồn chạy được ngay và trích xuất đầy đủ tính năng hiệu ứng không bỏ sót.`;
      promptTitle = selectedSiteNode ? `Cấu trúc Component <${selectedSiteNode.tagName}>` : "Chỉ thị Cấu trúc Site";
    } else if (mode === "tree") {
      if (actionQueue.length === 0 && !userInstruction.trim() && !selectedPreset && !presetCodeInput.trim()) {
        finalPrompt = `Hãy thực hiện tối ưu hóa cấu trúc cây đối tượng trên Website:
- 📌 Cấu trúc phân cấp: Toàn bộ 14 Sections và các thẻ con đã được rà soát trong X-Ray Tree View.
- ⚡ YÊU CẦU THỰC HIỆN: Chuẩn hóa lại bố cục, phân cấp thẻ card và hiệu ứng tương tác cho các trang chính.

Vui lòng cập nhật trực tiếp vào mã nguồn của các component liên quan, đảm bảo trích xuất đầy đủ tính năng và hiệu ứng không bỏ sót.`;
        promptTitle = "Tối ưu Cấu trúc Cây Đối tượng";
      } else {
        let actionsText = "";
        if (actionQueue.length > 0) {
          actionsText = `\n📋 DANH SÁCH CÁC THAO TÁC CẦN THỰC HIỆN (${actionQueue.length} yêu cầu):\n` +
            actionQueue.map((act, idx) => {
              const typeLabel = 
                act.type === "edit" ? "✏️ [CHỈNH SỬA]" : 
                act.type === "delete" ? "🗑️ [XÓA BỎ]" : 
                act.type === "add" ? "➕ [THÊM MỚI]" : 
                act.type === "clone_format" ? "🎨 [ĐỊNH DẠNG GIỐNG]" :
                "🔄 [CHUYỂN TRANG]";

              return `${idx + 1}. ${typeLabel} Đối tượng: ${act.targetTitle} (Vị trí: ${act.sectionName} - Selector: \`${act.targetSelector}\`)\n   👉 Chi tiết thực thi: ${act.description}${act.styleSource ? `\n   🎯 Mẫu tham chiếu: ${act.styleSource}` : ''}${act.targetDestination ? `\n   📍 Đích chuyển đến: #${act.targetDestination}` : ''}`;
            }).join("\n\n");
        }

        finalPrompt = `Hãy thực hiện các chỉ thị quản lý cấu trúc cây giao diện cho Website:
- 🌐 Phạm vi: Hệ thống Cây Đối tượng Trang web (Tree Structure Management)
${actionsText}
${presetText}
${codeAnalysisBlock}
${userInstruction.trim() ? `\n⚡ GHI CHÚ BỔ SUNG TỔNG THỂ: ${userInstruction.trim()}\n` : ''}
Vui lòng thực thi chính xác vào từng component.`;
        promptTitle = activePresetObj ? activePresetObj.titleVi : "Chỉ thị Quản lý Cây Đối tượng";
      }
    } else if (mode === "element") {
      if (!selectedElement) return;
      const condensedSnippet = cleanSnippet(selectedElement.textSnippet, 40);

      const scopeText = 
        elementAppScope === "similar_page"
          ? "Cùng loại trong trang"
          : elementAppScope === "similar_all"
            ? "Toàn bộ website"
            : "Riêng đối tượng này";

      let actionDetailText = "";
      if (elementActionMode === "delete") {
        const extraNote = userInstruction.trim() ? ` - Yêu cầu bổ sung: ${userInstruction.trim()}` : "";
        actionDetailText = deleteMode === "wrapper_only"
          ? `Xóa đối tượng đem nội dung bên trong ra ngoài (giữ lại các phần tử con), tìm và xóa file code liên quan${extraNote}`
          : `Xóa toàn bộ đối tượng cùng tất cả phần tử con bên trong, tìm và xóa file code liên quan${extraNote}`;
      } else if (elementActionMode === "clone_format") {
        actionDetailText = `Định dạng giống mẫu: Áp dụng phong cách thiết kế, màu sắc, typography tương tự mẫu [${styleSource}]`;
      } else if (elementActionMode === "add") {
        actionDetailText = `Thêm đối tượng mới [${newItemTitle}] (<${newItemTag}> - ${newItemType})`;
      } else if (elementActionMode === "clean_code") {
        const activeCleanObj = CLEAN_CODE_TEMPLATES.find(c => c.id === selectedCleanTemplate);
        actionDetailText = `Làm sạch mã nguồn: ${activeCleanObj?.title || "Tối ưu hóa"}${userInstruction.trim() ? ` - ${userInstruction.trim()}` : ''}`;
      } else {
        actionDetailText = userInstruction.trim() || "Chỉnh sửa nội dung và kiểu dáng theo yêu cầu";
      }

      const isEditMode = elementActionMode === "edit";
      const extraPresetContent = isEditMode && (presetText || codeAnalysisBlock) 
        ? ` [${(presetText + (codeAnalysisBlock ? ' ' + codeAnalysisBlock : '')).trim().replace(/\n+/g, ' ')}]` 
        : "";

      const elementTargetDesc = `${selectedElement.componentType} (<${selectedElement.tag}>${selectedElement.fullSelector ? ` - Selector: \`${selectedElement.fullSelector}\`` : ''}${condensedSnippet ? ` - Nội dung: "${condensedSnippet}"` : ''})`;

      // Định dạng 1 dòng ngắn gọn theo cấu trúc X-ray:
      // - Tại trang: (tên trang) - Phần tử chỉnh sửa: (tên đối tượng được chọn) - Thực hiện: (yêu cầu chi tiết) - Phạm vi áp dụng: (lựa chọn)
      finalPrompt = `- Tại trang: ${selectedElement.sectionName || "Hiện tại"} - Phần tử chỉnh sửa: ${elementTargetDesc} - Thực hiện: ${actionDetailText}${extraPresetContent} - Phạm vi áp dụng: ${scopeText}`;
      promptTitle = elementActionMode === "clean_code"
        ? `Làm sạch (${selectedElement.componentType} - ${selectedElement.sectionName})`
        : activePresetObj && isEditMode
          ? `${activePresetObj.titleVi} (${selectedElement.componentType})`
          : `Phần tử ${selectedElement.componentType} (${selectedElement.sectionName})`;
    } else if (mode === "typography") {
      const isGlobal = typographyScope === "global_layout";
      const selectedTokenObj = GLOBAL_TYPOGRAPHY_TOKENS.find(t => t.id === typographySelectedToken);
      
      if (isGlobal) {
        const scaleRatioName = 
          typographyScaleArchetype === "major_second" ? "Major Second (1.125 - Ứng dụng & Dense UI)" :
          typographyScaleArchetype === "perfect_fourth" ? "Perfect Fourth (1.333 - Tương phản cao Executive / Editorial)" :
          "Major Third (1.25 - Cân bằng Portfolio & Brand)";

        finalPrompt = `[CHỈ THỊ CẬP NHẬT TYPOGRAPHY & ĐỒNG BỘ BỐ CỤC CHUNG TOÀN WEBSITE]
🌐 Phạm vi: Toàn bộ hệ thống giao diện website (Global Layout & Typography Architecture)
${selectedElement ? `🎯 Đối tượng tham chiếu: ${selectedElement.componentType} (<${selectedElement.tag}> - ${selectedElement.sectionName})\n` : ""}
📐 THÔNG SỐ HỆ THỐNG PHÂN CẤP TYPOGRAPHY CẤU HÌNH:
- Font Family độc quyền: 'Play', sans-serif !important (áp dụng toàn bộ website, không sử dụng font khác).
- Tỷ lệ bước nhảy (Step Ratio): ${scaleRatioName}.
- Base Font Size: ${typographyBaseSize}px (${typographyBaseSize === 15 ? 'Gọn / Compact' : typographyBaseSize === 17 ? 'Thoáng / Spacious' : 'Chuẩn / Standard Golden'}).
- Line-height: Tiêu đề Headings 1.15–1.20 | Văn bản Body ${typographyBodyLineHeight} | Chú thích Caption 1.40–1.50.
- Letter-spacing: Headings -0.01em | Label 0.02em–0.04em | Body 0.
- Weight Matrix: Headings ${typographyHeadingWeight} | Buttons/Labels 600 | Body 400 | Navigation 500.
${presetText}
${codeAnalysisBlock}
📋 BẢNG THIẾT LẬP TOKENS KÍCH THƯỚC CHUẨN TOÀN BỘ BỐ CỤC:
• Display (Hero): 40–52px (clamp(1.875rem, 3.5vw + 0.875rem, 3.25rem)) - 700 - Line-height: 1.15
• H1 (Section Title): 36–42px (clamp(1.75rem, 2.5vw + 0.75rem, 2.625rem)) - 700 - Line-height: 1.20
• H2 (Group Header): 28–34px (clamp(1.5rem, 1.8vw + 0.75rem, 2.125rem)) - 700 - Line-height: 1.20
• H3 (Sub-section): 20–24px (clamp(1.125rem, 1vw + 0.75rem, 1.5rem)) - 700 - Line-height: 1.25
• H4 (Sub-heading): 18–20px (clamp(1.0625rem, 0.4vw + 0.9rem, 1.25rem)) - 700 - Line-height: 1.30
• H5 (Section Sub-header): 16–18px (clamp(1rem, 0.25vw + 0.9375rem, 1.125rem)) - 700 - Line-height: 1.30
• H6 (Micro Header): 15–16px (clamp(0.9375rem, 0.2vw + 0.875rem, 1rem)) - 700 - Line-height: 1.30
• Card Title: 18–20px (clamp(1.0625rem, 0.4vw + 0.9rem, 1.25rem)) - 700 - Line-height: 1.30
• Body Bold (Tiêu đề văn bản chính): 15–16px (clamp(0.9375rem, 0.25vw + 0.875rem, 1rem)) - 700 - Line-height: 1.55
• Body (Văn bản chính): 15–16px (clamp(0.9375rem, 0.25vw + 0.875rem, 1rem)) - 400 - Line-height: ${typographyBodyLineHeight}
• Sub Content (Nội dung văn bản phụ): 14–15px (clamp(0.875rem, 0.2vw + 0.825rem, 0.9375rem)) - 400 - Line-height: 1.50
• Body Small: 14–15px (clamp(0.875rem, 0.2vw + 0.825rem, 0.9375rem)) - 400/500 - Line-height: 1.55
• Caption / Label: 12–13px (0.8125rem) - 600 - Line-height: 1.40 - Spacing: 0.02em
• Button (Nút bấm): 15–16px (clamp(0.9375rem, 0.25vw + 0.875rem, 1rem)) - 600 - Line-height: 1.20
• Statistic / Number: 28–40px (clamp(1.75rem, 2.5vw + 1rem, 2.5rem)) - 700 - Line-height: 1.10
• Navigation: 14–16px - 500 - Line-height: 1.20

⚡ HƯỚNG DẪN CẬP NHẬT BỐ CỤC CHUNG:
1. Đồng bộ lại các biến CSS :root trong file styles/typography toàn cục (src/index.css) theo đúng bảng tokens và tỷ lệ trên.
2. Cập nhật các class tiện ích .text-display, .text-h1, .text-h2, .text-h3, .text-h4, .text-h5, .text-h6, .text-card-title, .text-body-bold, .text-body, .text-body-sub, .text-body-sm, .text-caption, .text-label, .text-button, .text-stat.
3. Rà soát xóa bỏ triệt để các class hardcoded (text-xs, text-2xs, text-[..px], style={{fontSize:...}}) trên toàn bộ 14 trang.
4. Đảm bảo nhịp điệu khoảng cách (Vertical Rhythm) và cấu trúc responsive trên Desktop (≥1200px), Tablet (768–1199px), Mobile (<768px).
5. Đảm bảo 100% hiển thị hoàn hảo dấu tiếng Việt, không bị cắt dấu, không lỗi font fallback, đạt chuẩn tương phản WCAG AA.
${userInstruction.trim() ? `\n📌 YÊU CẦU BỔ SUNG CHI TIẾT TỪ NGƯỜI DÙNG: ${userInstruction.trim()}\n` : ""}`;

        promptTitle = "Đồng bộ Typography & Bố cục chung toàn website";
      } else {
        if (selectedElement) {
          const condensedSnippet = cleanSnippet(selectedElement.textSnippet, 40);
          const tokenDesc = selectedTokenObj 
            ? `Gán cấp bậc font [${selectedTokenObj.level} - ${selectedTokenObj.labelVi}] (${selectedTokenObj.cssClass}, range: ${selectedTokenObj.rangePx}, clamp: ${selectedTokenObj.clampValue}, weight: ${selectedTokenObj.defaultWeight})`
            : `Chuẩn hóa kích thước font chữ theo hệ thống cấu hình chung`;

          finalPrompt = `- Tại trang: ${selectedElement.sectionName || "Hiện tại"} - Phần tử chỉnh sửa: ${selectedElement.componentType} (<${selectedElement.tag}> - Selector: \`${selectedElement.fullSelector}\`${condensedSnippet ? ` - Nội dung: "${condensedSnippet}"` : ''}) - Thực hiện: ${tokenDesc}${userInstruction.trim() ? ` - ${userInstruction.trim()}` : ''} - Phạm vi áp dụng: Riêng đối tượng này`;
          promptTitle = `Chỉnh font ${selectedElement.componentType} (${selectedElement.sectionName})`;
        } else {
          finalPrompt = `[CHỈ THỊ CẬP NHẬT TYPOGRAPHY CHO PHẦN TỬ]
⚡ Yêu cầu: Chuẩn hóa font chữ theo Token [${selectedTokenObj?.level || "Body"}] của hệ thống Design System.
${userInstruction.trim() ? `Ghi chú: ${userInstruction.trim()}` : ''}`;
          promptTitle = "Chỉnh sửa Font phần tử";
        }
      }
    } else {
      // Full Website Mode with selected checkboxes
      const selectedNames = DEFAULT_PAGE_STRUCTURE
        .filter(s => selectedSections.includes(s.sectionId))
        .map(s => `#${s.sectionId} (${s.sectionName})`)
        .join(", ");

      finalPrompt = `Hãy thực hiện thay đổi cho TOÀN BỘ WEBSITE:
- 🌐 Phạm vi: Toàn bộ dự án Portfolio & Hệ thống giao diện (Full Website Scope)
- 📑 Các phân mục đã chọn áp dụng (${selectedSections.length}/${DEFAULT_PAGE_STRUCTURE.length} phân mục): [${selectedNames || "Chưa chọn phân mục nào - Vui lòng áp dụng toàn website"}]
${presetText}
${codeAnalysisBlock}
- ⚡ LỆNH YÊU CẦU THỰC HIỆN: ${userInstruction.trim() || "Tối ưu hóa tổng thể trải nghiệm người dùng, bảng màu sắc và hiệu ứng chuyển cảnh trên các trang đã chọn."}

Vui lòng áp dụng các thay đổi tổng thể, đồng bộ trên toàn bộ website và các phân mục đã chọn.`;
      promptTitle = activePresetObj ? `${activePresetObj.titleVi} (Toàn bộ Website)` : "Chỉ thị Toàn bộ Website";
    }

    setGeneratedPrompt(finalPrompt);

    // Auto save to prompt list (lưu trữ toàn bộ, không lọc trùng)
    const newItem = {
      id: `prompt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: promptTitle,
      prompt: finalPrompt,
      time: new Date().toLocaleString(),
      presetName: activePresetObj?.titleVi
    };
    const updated = [newItem, ...savedPrompts];
    setSavedPrompts(updated);
    try {
      localStorage.setItem("xray_saved_prompts", JSON.stringify(updated));
    } catch {}
  };

  const handleCopyPrompt = () => {
    if (!generatedPrompt) return;
    playUiSound("success");
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const filteredTree = treeStructure.filter(section => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      section.sectionName.toLowerCase().includes(q) ||
      section.title.toLowerCase().includes(q) ||
      (section.children && section.children.some(c => c.title.toLowerCase().includes(q) || c.type.toLowerCase().includes(q)))
    );
  });

  const isLight = popupTheme === "light";

  return (
    <div id="xray-inspector-ui">
      {/* 2. ACTIVE HUD STATUS BAR */}
      {isActive && !inspectorOpen && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9998] px-3.5 sm:px-4.5 py-2.5 rounded-full bg-slate-50/95 dark:bg-slate-950/95 text-slate-900 dark:text-white border border-emerald-500/60 shadow-2xl shadow-emerald-500/25 backdrop-blur-md flex items-center gap-2.5 sm:gap-3.5 animate-in fade-in slide-in-from-bottom-4 max-w-[95vw] transition-all duration-300">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <span className="text-xs font-black tracking-wide flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 shrink-0">
            <Scan className="w-3.5 h-3.5" />
            <span>X-Ray Active</span>
          </span>

          <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 shrink-0" />

          {/* Toàn bộ Website Button */}
          <button
            onClick={() => {
              playUiSound("click");
              setMode("full_website");
              setInspectorOpen(true);
            }}
            onMouseEnter={() => playUiSound("hover")}
            className="px-3 py-1.5 rounded-full bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-300 border border-sky-500/30 text-2xs font-bold flex items-center gap-1 shrink-0 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 hover:shadow-md hover:shadow-sky-500/10"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Toàn Bộ Website</span>
          </button>


          {/* Close Button with instant sound feedbacks and smooth hover hover scale */}
          <button
            onClick={handleCloseAllXRay}
            onMouseEnter={() => playUiSound("hover")}
            className="p-1.5 rounded-full hover:bg-rose-500/20 text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 shrink-0 cursor-pointer transition-all duration-200 hover:scale-110 active:scale-90"
            title="Đóng X-Ray"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}



      {/* 2.6 X-RAY INTERACTIVE FLOATING POPUP DIALOG (DẠNG POPUP) */}
      {isActive && !inspectorOpen && xrayViewType === "popup" && floatingPopupElement && (
        <div
          className={cn(
            "fixed z-[9995] rounded-2xl shadow-2xl border flex flex-col backdrop-blur-md transition-all duration-300 animate-in zoom-in-95 p-4 space-y-3.5",
            isLight
              ? "bg-white/95 border-slate-200 text-slate-900 shadow-slate-300/50"
              : "bg-slate-950/95 border-slate-800 text-white shadow-black/80"
          )}
          style={{
            top: `${Math.min(window.innerHeight - 420, Math.max(90, floatingPopupElement.rect.bottom + 12))}px`,
            left: `${Math.min(window.innerWidth - 340, Math.max(16, floatingPopupElement.rect.left))}px`,
            width: "320px"
          }}
        >
          {/* Inner Interactive Glow background per AGENTS.md Special Components! */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-10 pointer-events-none" />

          {/* Popup Header */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2.5 relative z-10">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
              <h4 className="text-xs font-bold tracking-tight">
                Thông tin phần tử
              </h4>
            </div>
            <button
              onClick={() => { playUiSound("click"); setFloatingPopupElement(null); }}
              className="p-1 rounded-lg hover:bg-rose-500/20 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Popup Body */}
          <div className="space-y-3.5 relative z-10 text-xs">
            {/* Tag/Section Row */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 font-bold text-3xs">
                {floatingPopupElement.componentType}
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-300 font-mono text-3xs">
                &lt;{floatingPopupElement.tag}&gt;
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 text-3xs font-bold">
                {floatingPopupElement.sectionName}
              </span>
            </div>

            {/* Element properties inside simplified columns */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-2xs pb-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Kích thước</span>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                  {Math.round(floatingPopupElement.rect.width)} × {Math.round(floatingPopupElement.rect.height)} px
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-3xs font-bold text-slate-400">Bộ chọn CSS Selector</span>
                <p className="font-mono text-3xs bg-slate-100 dark:bg-slate-900/60 p-2 rounded-xl break-all select-all text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                  {floatingPopupElement.fullSelector}
                </p>
              </div>
            </div>

            {floatingPopupElement.textSnippet && (
              <div className="text-2xs p-2.5 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-150 dark:border-slate-800 italic text-slate-500 dark:text-slate-400 leading-relaxed">
                "{floatingPopupElement.textSnippet}"
              </div>
            )}

            {/* Action buttons inside Popup */}
            <div className="space-y-2 pt-1">
              <span className="text-3xs font-bold text-slate-400 uppercase tracking-wide">Thao tác nhanh</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    playUiSound("click");
                    const item = mapElementToTreeItem(floatingPopupElement);
                    setSelectedTreeItem(item);
                    setModalActionType("edit");
                  }}
                  className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-amber-500/10"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Sửa đổi</span>
                </button>

                <button
                  onClick={() => {
                    playUiSound("click");
                    const item = mapElementToTreeItem(floatingPopupElement);
                    setSelectedTreeItem(item);
                    setModalActionType("delete");
                  }}
                  className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-rose-500/10"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Xóa thẻ</span>
                </button>

                <button
                  onClick={() => {
                    playUiSound("click");
                    const item = mapElementToTreeItem(floatingPopupElement);
                    setSelectedTreeItem(item);
                    setModalActionType("add");
                  }}
                  className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer col-span-2 border border-emerald-500/10"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Thêm phần tử con</span>
                </button>
              </div>
            </div>

            {/* Main console launcher */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => {
                  playUiSound("click");
                  setMode("element");
                  setSelectedElement(floatingPopupElement);
                  setInspectorOpen(true);
                  setFloatingPopupElement(null);
                }}
                className="w-full p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shadow-purple-600/10"
              >
                <Terminal className="w-3.5 h-3.5 text-purple-200" />
                <span>Mở bảng lệnh lớn</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. HOVER BOUNDING BOX & ELEMENT INFO BADGE */}
      {isActive && hoveredElement && !inspectorOpen && (
        <div
          className="fixed pointer-events-none z-[9990] transition-all duration-75"
          style={{
            top: `${hoveredElement.rect.top}px`,
            left: `${hoveredElement.rect.left}px`,
            width: `${hoveredElement.rect.width}px`,
            height: `${hoveredElement.rect.height}px`,
          }}
        >
          {/* Glowing box outline */}
          <div className="w-full h-full border-2 border-emerald-400 bg-emerald-400/10 rounded-sm shadow-[0_0_15px_rgba(52,211,153,0.5)] relative">
            <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-emerald-300" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-emerald-300" />
            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-emerald-300" />
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-emerald-300" />

            <div 
              className="absolute -top-10 left-0 bg-slate-50/95 dark:bg-slate-950/95 text-slate-900 dark:text-white border border-emerald-400/80 px-2.5 py-1 rounded-lg text-2xs font-mono shadow-2xl flex items-center gap-2 whitespace-nowrap z-50 backdrop-blur-md"
              style={{
                top: hoveredElement.rect.top < 45 ? "100%" : "-36px"
              }}
            >
              <span className="font-bold text-emerald-400">{hoveredElement.sectionName}</span>
              <span className="text-slate-500">•</span>
              <span className="text-amber-300 font-semibold">{hoveredElement.componentType}</span>
              <span className="text-slate-500">•</span>
              <span className="text-sky-300">&lt;{hoveredElement.tag}&gt;</span>
              <span className="text-slate-500 dark:text-slate-400 text-3xs">
                {Math.round(hoveredElement.rect.width)}x{Math.round(hoveredElement.rect.height)}px
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 4. MAIN X-RAY INSPECTOR POPUP MODAL (WITH LIGHT & DARK THEME SUPPORT) */}
      {inspectorOpen && (
        <div className="fixed inset-0 z-[10000] bg-white/70 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
          <div 
            className={cn(
              "w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-colors duration-300 max-h-[92vh] border",
              isLight
                ? "bg-white text-slate-900 border-slate-200 shadow-[0_25px_70px_rgba(0,0,0,0.2)]"
                : "bg-slate-900 text-slate-100 border-emerald-500/40 shadow-[0_25px_70px_rgba(0,0,0,0.8)]"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Theme Switcher & Close */}
            <div className={cn(
              "p-3.5 sm:p-4 px-4 sm:px-6 border-b flex items-center justify-between transition-colors",
              isLight ? "bg-slate-50/95 border-slate-200" : "bg-slate-950 border-slate-800"
            )}>
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-xl border flex items-center justify-center shadow-xs",
                  mode === "tree"
                    ? "bg-indigo-500/20 text-indigo-500 border-indigo-500/30"
                    : mode === "full_website"
                      ? "bg-sky-500/20 text-sky-500 border-sky-500/30"
                      : mode === "typography"
                        ? "bg-amber-500/20 text-amber-500 border-amber-500/30"
                        : "bg-emerald-500/20 text-emerald-500 border-emerald-500/30"
                )}>
                  {mode === "tree" ? <FolderTree className="w-5 h-5" /> : mode === "full_website" ? <Globe className="w-5 h-5" /> : mode === "typography" ? <Type className="w-5 h-5" /> : <Scan className="w-5 h-5" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black tracking-tight">
                      X-Ray Inspector • Trình Quản Lý & Xuất Lệnh AI
                    </h3>
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-3xs font-bold border",
                      isLight ? "bg-indigo-50 text-indigo-700 border-indigo-200" : "bg-indigo-950/60 text-indigo-300 border-indigo-500/30"
                    )}>
                      v3.0 Pro
                    </span>
                  </div>
                  <p className={cn("text-xs", isLight ? "text-slate-500" : "text-slate-400")}>
                    {mode === "tree"
                      ? "Cấu trúc cây đối tượng: Xem danh sách, Chỉnh / Xóa / Thêm / Chuyển và Xuất Prompt"
                      : mode === "full_website"
                        ? "Tạo chỉ thị và prompt tổng thể áp dụng cho toàn bộ cấu trúc website"
                        : mode === "typography"
                          ? "Quản lý và chỉnh sửa kích thước font chữ, chuẩn hóa typography và đồng bộ bố cục chung"
                          : "Định danh chính xác phần tử và tạo prompt thay đổi riêng biệt"}
                  </p>
                </div>
              </div>

              {/* Header Right Actions (Popup Theme Toggle & Close) */}
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-end">

                {/* Popup Theme Switch Button: Sáng / Tối */}
                <button
                  onClick={() => {
                    playUiSound("switch");
                    setPopupTheme(isLight ? "dark" : "light");
                  }}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer",
                    isLight 
                      ? "bg-slate-200/80 hover:bg-slate-300 text-slate-800 border-slate-300" 
                      : "bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700"
                  )}
                  title={isLight ? "Chuyển sang Giao diện Tối cho popup" : "Chuyển sang Giao diện Sáng cho popup"}
                >
                  {isLight ? <Moon className="w-3.5 h-3.5 text-indigo-600" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
                  <span className="hidden sm:inline">{isLight ? "Bản Sáng" : "Bản Tối"}</span>
                </button>

                <button
                  onClick={handleCloseAllXRay}
                  className={cn(
                    "p-2 rounded-xl transition-colors cursor-pointer",
                    isLight ? "text-slate-400 hover:text-slate-900 hover:bg-slate-200" : "text-slate-400 hover:text-white hover:bg-slate-800"
                  )}
                  title="Đóng X-Ray"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scope Selection Tabs: Phần tử đã chọn & Chỉnh sửa Font & Toàn bộ Website */}
            <div className={cn(
              "flex items-center border-b p-1.5 sm:p-2 gap-2 transition-colors",
              isLight ? "bg-slate-100/90 border-slate-200" : "bg-slate-950/70 border-slate-800"
            )}>
              <button
                onClick={() => {
                  playUiSound("click");
                  setMode("element");
                  setGeneratedPrompt("");
                }}
                className={cn(
                  "flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs",
                  mode === "element"
                    ? isLight
                      ? "bg-white text-emerald-700 border border-emerald-300 ring-2 ring-emerald-500/20"
                      : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 ring-2 ring-emerald-500/30"
                    : isLight
                      ? "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                )}
              >
                <Crosshair className="w-4 h-4 text-emerald-500" />
                <span>Phần tử đã chọn</span>
                {selectedElement && (
                  <span className={cn(
                    "text-3xs px-2 py-0.5 rounded font-mono font-bold",
                    isLight ? "bg-emerald-100 text-emerald-800" : "bg-emerald-500/30 text-emerald-300"
                  )}>
                    &lt;{selectedElement.tag}&gt;
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  playUiSound("click");
                  setMode("typography");
                  setGeneratedPrompt("");
                }}
                className={cn(
                  "flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs",
                  mode === "typography"
                    ? isLight
                      ? "bg-white text-amber-700 border border-amber-300 ring-2 ring-amber-500/20"
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/40 ring-2 ring-amber-500/30"
                    : isLight
                      ? "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                )}
              >
                <Type className="w-4 h-4 text-amber-500" />
                <span>Chỉnh sửa Font</span>
                {typographyScope === "global_layout" && (
                  <span className="text-3xs px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold">
                    Toàn bố cục
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  playUiSound("click");
                  setMode("full_website");
                  setGeneratedPrompt("");
                }}
                className={cn(
                  "flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs",
                  mode === "full_website"
                    ? isLight
                      ? "bg-white text-sky-700 border border-sky-300 ring-2 ring-sky-500/20"
                      : "bg-sky-500/20 text-sky-300 border border-sky-500/40 ring-2 ring-sky-500/30"
                    : isLight
                      ? "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                )}
              >
                <Globe className="w-4 h-4 text-sky-500" />
                <span>Toàn bộ Website</span>
              </button>
            </div>

            {/* Modal Body Container */}
            <div className="p-4 sm:p-5 space-y-4 overflow-y-auto max-h-[68vh] custom-scrollbar">

              {/* ================= TAB 0: SITE STRUCTURE (CẤU TRÚC SITE THEO CẤP) ================= */}
              {mode === "site_structure" && (
                <div className="space-y-4">
                  {/* Top Bar: Search, Category Filters, Rescan */}
                  <div className="p-3.5 rounded-2xl border bg-purple-50/50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800/40 space-y-3">
                    <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-xl bg-purple-500 text-white shadow-xs">
                          <Layers className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-black tracking-tight text-purple-900 dark:text-purple-200">
                            Cấu Trúc Site Phân Cấp Dữ Liệu Thực Tế
                          </h4>
                          <p className="text-2xs text-purple-700/80 dark:text-purple-300/70">
                            Quét và hiển thị đầy đủ các thẻ HTML theo thứ tự cha - con từ cấp cao nhất đến các thẻ nút, văn bản, media
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            playUiSound("special");
                            scanFullSiteStructureTree();
                            showToast("Đã quét lại cấu trúc phân cấp website!");
                          }}
                          className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                          <span>Quét lại Site</span>
                        </button>

                        <button
                          onClick={() => {
                            playUiSound("click");
                            const allExpanded: Record<string, boolean> = {};
                            const collectAllIds = (nodes: SiteStructureNode[]) => {
                              nodes.forEach(n => {
                                allExpanded[n.id] = true;
                                if (n.children) collectAllIds(n.children);
                              });
                            };
                            collectAllIds(siteNodes);
                            setExpandedSiteNodes(allExpanded);
                          }}
                          className="px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-purple-100 dark:hover:bg-purple-900/50"
                        >
                          Mở tất cả
                        </button>

                        <button
                          onClick={() => {
                            playUiSound("click");
                            setExpandedSiteNodes({});
                          }}
                          className="px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-purple-100 dark:hover:bg-purple-900/50"
                        >
                          Thu gọn
                        </button>
                      </div>
                    </div>

                    {/* Filter & Search bar */}
                    <div className="flex flex-col sm:flex-row gap-2 items-center justify-between pt-1 border-t border-purple-200/60 dark:border-purple-800/40">
                      {/* Search box */}
                      <div className="w-full sm:w-72 relative">
                        <input
                          type="text"
                          value={siteSearchQuery}
                          onChange={(e) => setSiteSearchQuery(e.target.value)}
                          placeholder="Tìm thẻ, ID (#sec), class, nội dung..."
                          className={cn(
                            "w-full pl-8 pr-3 py-1.5 rounded-xl text-xs border transition-all focus:outline-none focus:ring-2",
                            isLight
                              ? "bg-white border-slate-300 text-slate-800 focus:ring-purple-500/30"
                              : "bg-slate-900 border-slate-700 text-slate-100 focus:ring-purple-500/40"
                          )}
                        />
                        <Filter className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                        {siteSearchQuery && (
                          <button
                            onClick={() => setSiteSearchQuery("")}
                            className="absolute right-2 top-2 text-slate-400 hover:text-slate-600"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Filter badges */}
                      <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 custom-scrollbar">
                        {[
                          { id: "all", label: "Tất cả thẻ" },
                          { id: "section", label: "Giao diện chính (Section)" },
                          { id: "card", label: "Khung chứa (Card)" },
                          { id: "button", label: "Nút bấm (Button)" },
                          { id: "text", label: "Văn bản (Text)" },
                          { id: "media", label: "Hình ảnh (Media)" }
                        ].map(f => (
                          <button
                            key={f.id}
                            onClick={() => {
                              playUiSound("click");
                              setSiteCategoryFilter(f.id);
                            }}
                            className={cn(
                              "px-2.5 py-1 rounded-lg text-2xs font-bold whitespace-nowrap transition-all cursor-pointer border",
                              siteCategoryFilter === f.id
                                ? "bg-purple-600 text-white border-purple-500 shadow-xs"
                                : isLight
                                  ? "bg-white text-slate-700 border-slate-200 hover:bg-purple-50"
                                  : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-purple-950/60"
                            )}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Main Hierarchy Tree View List */}
                  <div className={cn(
                    "p-3 rounded-2xl border space-y-1.5 max-h-[42vh] overflow-y-auto custom-scrollbar",
                    isLight ? "bg-slate-50/50 border-slate-200" : "bg-slate-950/50 border-slate-800"
                  )}>
                    {siteNodes.length === 0 ? (
                      <div className="py-12 text-center space-y-3">
                        <Layers className="w-8 h-8 text-purple-400 animate-pulse mx-auto shrink-0" />
                        <p className="text-xs text-slate-500 font-medium">Đang quét cấu trúc HTML của trang web...</p>
                        <button
                          onClick={scanFullSiteStructureTree}
                          className="px-3 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-bold cursor-pointer"
                        >
                          Tải lại cấu trúc
                        </button>
                      </div>
                    ) : (
                      siteNodes.map(node => renderSiteNodeRecursive(node))
                    )}
                  </div>
                </div>
              )}

              {/* ================= TAB 1: TREE VIEW (CẤU TRÚC CÂY) ================= */}
              {mode === "tree" && (
                <div className="space-y-4">
                  {/* Top Tree Search & Actions Bar */}
                  <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
                    <div className="w-full sm:w-80 relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Tìm kiếm trang hoặc đối tượng..."
                        className={cn(
                          "w-full px-3.5 py-2 rounded-xl text-xs border transition-all focus:outline-none focus:ring-2",
                          isLight
                            ? "bg-slate-50 border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-200"
                            : "bg-slate-950 border-slate-700 text-white focus:border-indigo-500 focus:ring-indigo-900/40"
                        )}
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-600"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap">
                      <button
                        onClick={scanLivePageStructure}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-xs font-bold border flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-xs",
                          isLight ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300" : "bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 border-emerald-500/40"
                        )}
                        title="Quét & cập nhật trực tiếp cấu trúc cây từ giao diện trang web thực tế"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Update Cấu Trúc Trang</span>
                      </button>

                      <button
                        onClick={() => {
                          playUiSound("click");
                          // Expand all
                          const allKeys: Record<string, boolean> = {};
                          treeStructure.forEach(s => { allKeys[s.id] = true; });
                          setExpandedSections(allKeys);
                        }}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer",
                          isLight ? "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300" : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
                        )}
                      >
                        Mở rộng tất cả
                      </button>

                      <button
                        onClick={() => {
                          playUiSound("click");
                          setExpandedSections({});
                        }}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer",
                          isLight ? "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300" : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
                        )}
                      >
                        Thu gọn
                      </button>
                    </div>
                  </div>


                  {/* ACTION QUEUE BADGES (IF ANY PENDING ACTIONS) */}
                  {actionQueue.length > 0 && (
                    <div className={cn(
                      "p-3.5 rounded-xl border space-y-2 animate-in fade-in",
                      isLight ? "bg-indigo-50/70 border-indigo-200" : "bg-indigo-950/40 border-indigo-500/40"
                    )}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black flex items-center gap-1.5 text-indigo-600 dark:text-indigo-300">
                          <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                          Danh sách ({actionQueue.length}) thao tác đã đánh dấu:
                        </span>
                        <button
                          onClick={() => {
                            playUiSound("click");
                            setActionQueue([]);
                          }}
                          className="text-2xs font-bold text-rose-500 hover:underline"
                        >
                          Xóa tất cả thao tác
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {actionQueue.map((act) => (
                          <div
                            key={act.id}
                            className={cn(
                              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border shadow-xs",
                              isLight ? "bg-white border-slate-200 text-slate-800" : "bg-slate-900 border-slate-700 text-slate-200"
                            )}
                          >
                            <span className={cn(
                              "px-1.5 py-0.2 rounded text-3xs font-bold uppercase",
                              act.type === "edit" ? "bg-amber-500/20 text-amber-600 dark:text-amber-300" :
                              act.type === "delete" ? "bg-rose-500/20 text-rose-600 dark:text-rose-300" :
                              act.type === "add" ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300" :
                              "bg-sky-500/20 text-sky-600 dark:text-sky-300"
                            )}>
                              {act.type === "edit" ? "Chỉnh" : act.type === "delete" ? "Xóa" : act.type === "add" ? "Thêm" : "Chuyển"}
                            </span>
                            <span className="font-semibold">{act.targetTitle}</span>
                            <span className="text-slate-500 dark:text-slate-400 text-2xs">({act.sectionName})</span>
                            <button
                              onClick={() => handleRemoveAction(act.id)}
                              className="text-slate-500 dark:text-slate-400 hover:text-rose-500 p-0.5"
                              title="Xóa thao tác này"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TREE LIST CONTAINER */}
                  <div className={cn(
                    "border rounded-2xl p-2 space-y-1.5 max-h-[320px] overflow-y-auto custom-scrollbar",
                    isLight ? "bg-slate-50/50 border-slate-200" : "bg-slate-950/60 border-slate-800"
                  )}>
                    {filteredTree.map((section) => {
                      const isExpanded = !!expandedSections[section.id];
                      return (
                        <div
                          key={section.id}
                          className={cn(
                            "rounded-xl border transition-all overflow-hidden",
                            isLight ? "bg-white border-slate-200/90 shadow-2xs" : "bg-slate-900/80 border-slate-800/90 shadow-xs"
                          )}
                        >
                          {/* Section Header Row */}
                          <div className={cn(
                            "p-2.5 px-3 flex items-center justify-between gap-2 transition-colors",
                            isLight ? "hover:bg-slate-100/70" : "hover:bg-slate-800/60"
                          )}>
                            <div
                              onClick={() => toggleSectionExpand(section.id)}
                              className="flex items-center gap-2 flex-1 cursor-pointer select-none"
                            >
                              {isExpanded ? (
                                <ChevronDown className="w-4 h-4 text-indigo-500 shrink-0" />
                              ) : (
                                <ChevronRight className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                              )}
                              <span className="font-bold text-xs sm:text-sm">
                                {section.sectionName}
                              </span>
                              <span className={cn(
                                "text-3xs px-1.5 py-0.2 rounded font-mono hidden sm:inline",
                                isLight ? "bg-slate-100 text-slate-600 border border-slate-200" : "bg-slate-800 text-slate-400 border border-slate-700"
                              )}>
                                #{section.sectionId}
                              </span>
                              <span className="text-2xs text-slate-500 dark:text-slate-400 font-normal">
                                ({section.children?.length || 0} đối tượng)
                              </span>
                            </div>

                             {/* Section Action Buttons: [Chỉnh] [Xóa] [Thêm] [Định dạng giống] [Xem] */}
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                onClick={() => handleOpenActionModal(section, "edit")}
                                title="Chỉnh sửa toàn bộ trang này"
                                className="p-1.5 px-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30 text-2xs font-bold flex items-center gap-1 transition-colors"
                              >
                                <Edit3 className="w-3 h-3" />
                                <span className="hidden sm:inline">Chỉnh</span>
                              </button>

                              <button
                                onClick={() => handleOpenActionModal(section, "delete")}
                                title="Xóa toàn bộ trang này"
                                className="p-1.5 px-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/30 text-2xs font-bold flex items-center gap-1 transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span className="hidden sm:inline">Xóa</span>
                              </button>

                              <button
                                onClick={() => handleOpenActionModal(section, "add")}
                                title="Thêm đối tượng mới vào trang này"
                                className="p-1.5 px-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 text-2xs font-bold flex items-center gap-1 transition-colors"
                              >
                                <PlusCircle className="w-3 h-3" />
                                <span className="hidden sm:inline">Thêm</span>
                              </button>

                              <button
                                onClick={() => handleOpenActionModal(section, "clone_format")}
                                title="Định dạng giống trang/mẫu tham chiếu"
                                className="p-1.5 px-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30 text-2xs font-bold flex items-center gap-1 transition-colors"
                              >
                                <Palette className="w-3 h-3" />
                                <span className="hidden sm:inline">Giống mẫu</span>
                              </button>

                              <button
                                onClick={() => handleNavigateToSection(section.sectionId)}
                                title="Nhảy tới xem trang này"
                                className="p-1.5 px-2 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-300 border border-sky-500/30 text-2xs font-bold flex items-center gap-1 transition-colors"
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span className="hidden sm:inline">Xem</span>
                              </button>
                            </div>
                          </div>

                          {/* Sub-children Tree Items */}
                          {isExpanded && section.children && (
                            <div className={cn(
                              "p-2 pt-0 space-y-1.5 border-t",
                              isLight ? "bg-slate-50/50 border-slate-100" : "bg-slate-950/40 border-slate-800/60"
                            )}>
                              {section.children.map((child) => (
                                <div
                                  key={child.id}
                                  className={cn(
                                    "p-2 px-3 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-all",
                                    isLight ? "bg-white border-slate-200 hover:border-indigo-300" : "bg-slate-900/90 border-slate-800 hover:border-indigo-500/50"
                                  )}
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                                    <div className="min-w-0">
                                      <p className="text-xs font-semibold truncate text-slate-800 dark:text-slate-200">
                                        {child.title}
                                      </p>
                                      <p className="text-3xs text-slate-500 dark:text-slate-400 font-mono truncate">
                                        &lt;{child.tag}&gt; {child.selector} • <span className="text-indigo-500 font-medium">{child.type}</span>
                                      </p>
                                    </div>
                                  </div>

                                  {/* 5 Action Buttons for Child Item: [Chỉnh] [Xóa] [Thêm] [Chuyển] [Định dạng giống] */}
                                  <div className="flex items-center gap-1 self-end sm:self-center shrink-0">
                                    <button
                                      onClick={() => handleOpenActionModal(child, "edit")}
                                      className="p-1 px-2 rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30 text-3xs font-bold flex items-center gap-1"
                                      title="Chỉnh sửa nội dung / kiểu dáng của đối tượng này"
                                    >
                                      <Edit3 className="w-3 h-3" />
                                      <span>Chỉnh</span>
                                    </button>

                                    <button
                                      onClick={() => handleOpenActionModal(child, "delete")}
                                      className="p-1 px-2 rounded-md bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/30 text-3xs font-bold flex items-center gap-1"
                                      title="Xóa đối tượng này"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                      <span>Xóa</span>
                                    </button>

                                    <button
                                      onClick={() => handleOpenActionModal(child, "add")}
                                      className="p-1 px-2 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 text-3xs font-bold flex items-center gap-1"
                                      title="Thêm đối tượng con bên trong"
                                    >
                                      <PlusCircle className="w-3 h-3" />
                                      <span>Thêm</span>
                                    </button>

                                    <button
                                      onClick={() => handleOpenActionModal(child, "move")}
                                      className="p-1 px-2 rounded-md bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30 text-3xs font-bold flex items-center gap-1"
                                      title="Chuyển qua trang khác hoặc đổi vị trí"
                                    >
                                      <ArrowRightLeft className="w-3 h-3" />
                                      <span>Chuyển</span>
                                    </button>

                                    <button
                                      onClick={() => handleOpenActionModal(child, "clone_format")}
                                      className="p-1 px-2 rounded-md bg-pink-500/10 hover:bg-pink-500/20 text-pink-600 dark:text-pink-300 border border-pink-500/30 text-3xs font-bold flex items-center gap-1"
                                      title="Định dạng giống mẫu chuẩn"
                                    >
                                      <Palette className="w-3 h-3" />
                                      <span>Giống mẫu</span>
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ================= TAB 2: ELEMENT MODE (PHẦN TỬ ĐÃ CHỌN) ================= */}
              {mode === "element" && (
                <div className="space-y-4">
                  {!selectedElement ? (
                    <div className={cn(
                      "p-8 rounded-2xl border text-center space-y-3",
                      isLight ? "bg-slate-50 border-slate-200 text-slate-700" : "bg-slate-950/80 border-slate-800 text-slate-300"
                    )}>
                      <Crosshair className="w-10 h-10 text-emerald-500 animate-pulse mx-auto" />
                      <div>
                        <h4 className="font-black text-sm text-slate-900 dark:text-white">Chưa chọn phần tử nào</h4>
                        <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                          Vui lòng bật X-Ray trên màn hình và nhấp trực tiếp vào bất kỳ phần tử nào trên website để kiểm tra và tùy chỉnh, hoặc chuyển qua tab "Toàn bộ Website".
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          playUiSound("click");
                          setMode("full_website");
                        }}
                        className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                      >
                        Chuyển sang Tab Toàn Bộ Website
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      {/* 1. TÊN ĐỐI TƯỢNG (SELECTED ELEMENT HEADER INFO) */}
                      <div className={cn(
                        "p-3.5 rounded-2xl border space-y-2.5",
                        isLight ? "bg-slate-50 border-slate-200" : "bg-slate-950/80 border-slate-800"
                      )}>
                        <label className="text-xs font-black text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                          <Layers className="w-4 h-4 text-purple-500" />
                          <span>1. Tên đối tượng:</span>
                        </label>

                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <span className="px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-700 dark:text-blue-300 font-bold border border-blue-500/30 flex items-center gap-1.5">
                              <Layers className="w-3.5 h-3.5" />
                              {selectedElement.sectionName}
                            </span>
                            <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold border border-amber-500/30 flex items-center gap-1.5">
                              <Tag className="w-3.5 h-3.5" />
                              {selectedElement.componentType}
                            </span>
                            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-mono text-xs border border-emerald-500/30 font-bold">
                              &lt;{selectedElement.tag}&gt; {selectedElement.fullSelector}
                            </span>
                          </div>

                          <div className="text-2xs font-mono text-slate-500">
                            Kích thước: {Math.round(selectedElement.rect.width)}x{Math.round(selectedElement.rect.height)} px
                          </div>
                        </div>

                        {selectedElement.textSnippet && (
                          <div className="text-xs pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
                            <span className="text-slate-500 font-semibold shrink-0">Đối tượng:</span>
                            <span className="italic text-emerald-700 dark:text-emerald-300 font-mono bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-lg border border-emerald-500/20 truncate max-w-xl font-medium">
                              "{cleanSnippet(selectedElement.textSnippet, 60)}"
                            </span>
                          </div>
                        )}

                        {/* CẤU HÌNH TYPOGRAPHY & FONT ĐO ĐƯỢC CỦA ĐỐI TƯỢNG */}
                        {(() => {
                          const typo = getElementTypography(selectedElement.element);
                          if (!typo) return null;
                          return (
                            <div className={cn(
                              "mt-2 p-2.5 rounded-xl border flex flex-wrap items-center justify-between gap-2 text-xs",
                              isLight ? "bg-amber-50/70 border-amber-200 text-amber-950" : "bg-amber-950/30 border-amber-500/30 text-amber-200"
                            )}>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-bold flex items-center gap-1 text-amber-700 dark:text-amber-400">
                                  <Type className="w-3.5 h-3.5" />
                                  Font hiện tại:
                                </span>
                                <span className="font-mono px-2 py-0.5 rounded bg-white/80 dark:bg-slate-900 border border-amber-300/50 dark:border-amber-700/50 font-bold text-amber-800 dark:text-amber-300">
                                  {typo.fontSize} (Weight: {typo.fontWeight})
                                </span>
                                {typo.matchedToken && (
                                  <span className="px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-400/30 flex items-center gap-1">
                                    <Tag className="w-3 h-3" />
                                    Khớp Token: {typo.matchedToken.level} ({typo.matchedToken.rangePx})
                                  </span>
                                )}
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  playUiSound("click");
                                  if (typo.matchedToken) {
                                    setTypographySelectedToken(typo.matchedToken.id);
                                  }
                                  setMode("typography");
                                }}
                                className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-3xs flex items-center gap-1 shadow-xs transition-all cursor-pointer active:scale-95"
                                title="Mở tab chuyên sâu Chỉnh sửa Font cho đối tượng này"
                              >
                                <SlidersHorizontal className="w-3 h-3" />
                                <span>Tùy chỉnh Font này</span>
                              </button>
                            </div>
                          );
                        })()}
                      </div>

                      {/* 2. ÁP DỤNG CHO (SCOPE SELECTION - NGẮN GỌN) */}
                      <div className={cn(
                        "p-3 rounded-2xl border space-y-2",
                        isLight ? "bg-white border-purple-200" : "bg-slate-900 border-purple-500/30"
                      )}>
                        <label className="text-xs font-black text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                          <Target className="w-4 h-4 text-purple-500" />
                          <span>2. Áp dụng cho:</span>
                        </label>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {[
                            {
                              id: "single",
                              label: "Riêng đối tượng này",
                              desc: "Chỉ cập nhật phần tử đang chọn",
                              icon: "🎯"
                            },
                            {
                              id: "similar_page",
                              label: "Cùng loại trong trang",
                              desc: "Áp dụng cho các phần tử cùng loại trên trang này",
                              icon: "📄"
                            },
                            {
                              id: "similar_all",
                              label: "Toàn bộ website",
                              desc: "Đồng bộ tất cả phần tử tương tự trên toàn trang",
                              icon: "🌐"
                            }
                          ].map((sc) => (
                            <button
                              key={sc.id}
                              type="button"
                              onClick={() => {
                                playUiSound("click");
                                setElementAppScope(sc.id as any);
                              }}
                              className={cn(
                                "p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1",
                                elementAppScope === sc.id
                                  ? "bg-purple-600 text-white border-purple-500 shadow-md ring-2 ring-purple-400/50"
                                  : isLight
                                    ? "bg-slate-50 hover:bg-purple-50 text-slate-800 border-slate-200"
                                    : "bg-slate-950 hover:bg-purple-950/60 text-slate-200 border-slate-800"
                              )}
                            >
                              <div className="flex items-center gap-1.5 text-xs font-bold">
                                <span>{sc.icon}</span>
                                <span>{sc.label}</span>
                              </div>
                              <p className={cn(
                                "text-3xs leading-tight",
                                elementAppScope === sc.id ? "text-purple-100" : "text-slate-500 dark:text-slate-400"
                              )}>
                                {sc.desc}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 3. THỰC HIỆN (CHỌN CHỨC NĂNG: CHỈNH SỬA / XÓA / ĐỊNH DẠNG / THÊM / LÀM SẠCH) */}
                      <div className="space-y-3">
                        <label className="text-xs font-black text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                          <Wrench className="w-4 h-4 text-purple-500" />
                          <span>3. Thực hiện:</span>
                        </label>

                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                          <button
                            type="button"
                            onClick={() => { playUiSound("click"); setElementActionMode("edit"); }}
                            className={cn(
                              "px-2.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0 w-full",
                              elementActionMode === "edit"
                                ? "bg-amber-500 text-white shadow-md"
                                : isLight ? "bg-slate-100 text-slate-700 hover:bg-slate-200" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                            )}
                          >
                            <Edit3 className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">1. Chỉnh sửa</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => { playUiSound("click"); setElementActionMode("delete"); }}
                            className={cn(
                              "px-2.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0 w-full",
                              elementActionMode === "delete"
                                ? "bg-rose-500 text-white shadow-md"
                                : isLight ? "bg-slate-100 text-slate-700 hover:bg-slate-200" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                            )}
                          >
                            <Trash2 className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">2. Xóa</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => { playUiSound("click"); setElementActionMode("clone_format"); }}
                            className={cn(
                              "px-2.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0 w-full",
                              elementActionMode === "clone_format"
                                ? "bg-purple-600 text-white shadow-md"
                                : isLight ? "bg-slate-100 text-slate-700 hover:bg-slate-200" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                            )}
                          >
                            <Palette className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">3. Định dạng</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => { playUiSound("click"); setElementActionMode("add"); }}
                            className={cn(
                              "px-2.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0 w-full",
                              elementActionMode === "add"
                                ? "bg-emerald-600 text-white shadow-md"
                                : isLight ? "bg-slate-100 text-slate-700 hover:bg-slate-200" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                            )}
                          >
                            <PlusCircle className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">4. Thêm mới</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => { playUiSound("click"); setElementActionMode("clean_code"); }}
                            className={cn(
                              "px-2.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0 w-full col-span-2 sm:col-span-4 lg:col-span-1",
                              elementActionMode === "clean_code"
                                ? "bg-cyan-600 text-white shadow-md"
                                : isLight ? "bg-slate-100 text-slate-700 hover:bg-slate-200" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                            )}
                          >
                            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">5. Làm sạch</span>
                          </button>
                        </div>

                        {/* TAB 1: CHỈNH SỬA NỘI DUNG -> MẪU ÁP DỤNG CHUYÊN DỤNG (PROMPT PRESET) */}
                        {elementActionMode === "edit" && (
                          <div className={cn(
                            "p-3.5 rounded-2xl border space-y-3 animate-in fade-in duration-150",
                            isLight ? "bg-amber-50/40 border-amber-200" : "bg-amber-950/20 border-amber-500/30"
                          )}>
                            <div className="flex items-center justify-between">
                              <label className="text-xs font-bold flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                                <Sparkles className="w-4 h-4 text-amber-500" />
                                <span>Chọn mẫu áp dụng chuyên dụng (Prompt preset):</span>
                              </label>
                              {selectedPreset && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    playUiSound("click");
                                    setSelectedPreset(null);
                                  }}
                                  className="text-2xs font-bold text-rose-500 hover:underline cursor-pointer flex items-center gap-1"
                                >
                                  <X className="w-3 h-3" />
                                  <span>Bỏ chọn mẫu</span>
                                </button>
                              )}
                            </div>

                            {/* Option Dropdown List */}
                            <div className="relative">
                              <select
                                value={selectedPreset || ""}
                                onChange={(e) => {
                                  playUiSound("click");
                                  const val = e.target.value;
                                  setSelectedPreset(val || null);
                                }}
                                className={cn(
                                  "w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold appearance-none cursor-pointer transition-all shadow-xs focus:outline-none focus:ring-2",
                                  isLight
                                    ? "bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-200"
                                    : "bg-slate-950 border-slate-700 text-slate-100 focus:border-indigo-500 focus:ring-indigo-900/40"
                                )}
                              >
                                <option value="">-- Chọn mẫu áp dụng (Prompt preset) --</option>
                                {PRESET_TEMPLATES.map((tmpl) => (
                                  <option key={tmpl.id} value={tmpl.id} className={isLight ? "bg-white text-slate-900" : "bg-slate-900 text-slate-100"}>
                                    {tmpl.label} ({tmpl.shortDesc})
                                  </option>
                                ))}
                              </select>
                              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <ChevronDown className="w-4 h-4" />
                              </div>
                            </div>

                            {/* Active preset details snippet preview */}
                            {selectedPreset && (
                              <div className="space-y-3 animate-in fade-in slide-in-from-top-1">
                                <div className={cn(
                                  "p-3 rounded-xl border text-xs leading-relaxed space-y-1.5",
                                  isLight ? "bg-indigo-50/80 border-indigo-200 text-indigo-950" : "bg-indigo-950/40 border-indigo-500/30 text-indigo-200"
                                )}>
                                  <div className="flex items-center justify-between font-bold text-indigo-600 dark:text-indigo-400">
                                    <div className="flex items-center gap-1.5">
                                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                                      <span>Đang áp dụng: {PRESET_TEMPLATES.find(p => p.id === selectedPreset)?.label}</span>
                                    </div>
                                    <span className="text-3xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-mono">
                                      Preset #{selectedPreset}
                                    </span>
                                  </div>
                                  <p className="text-2xs font-mono text-slate-600 dark:text-slate-300 whitespace-pre-line bg-white/50 dark:bg-black/30 p-2.5 rounded-lg border border-indigo-200/50 dark:border-indigo-800/40">
                                    {PRESET_TEMPLATES.find(p => p.id === selectedPreset)?.promptSnippet}
                                  </p>
                                </div>

                                {/* Specialized code input area */}
                                <div className="space-y-1.5">
                                  <label className="text-xs font-bold flex items-center justify-between text-slate-800 dark:text-slate-200">
                                    <span className="flex items-center gap-1.5">
                                      <Code2 className="w-4 h-4 text-indigo-500" />
                                      <span>Khu vực nhập code (Phân tích và áp dụng vào phần tử):</span>
                                    </span>
                                    <span className="text-3xs bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 px-2 py-0.5 rounded-full font-bold">
                                      Phân tích mã nguồn
                                    </span>
                                  </label>
                                  <textarea
                                    value={presetCodeInput}
                                    onChange={(e) => setPresetCodeInput(e.target.value)}
                                    placeholder="Dán hoặc viết đoạn code (React TSX, HTML/CSS, Tailwind, CodePen...) tại đây để hệ thống phân tích và tạo prompt tích hợp..."
                                    rows={4}
                                    className={cn(
                                      "w-full border rounded-xl p-3 font-mono text-2xs placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all resize-y min-h-[90px]",
                                      isLight
                                        ? "bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-200"
                                        : "bg-slate-950 border-slate-700 text-slate-100 focus:border-indigo-500 focus:ring-indigo-900/40"
                                    )}
                                  />
                                  {presetCodeInput.trim() && (
                                    <p className="text-3xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                                      <span>Hệ thống đã nhận diện được {presetCodeInput.trim().split("\n").length} dòng code và sẽ tự động tạo prompt tích hợp.</span>
                                    </p>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* TAB 2: XÓA ĐỐI TƯỢNG (DELETE OPTIONS) */}
                        {elementActionMode === "delete" && (
                          <div className={cn(
                            "p-3.5 rounded-2xl border space-y-3 animate-in fade-in duration-150",
                            isLight ? "bg-rose-50/50 border-rose-200" : "bg-rose-950/20 border-rose-500/30"
                          )}>
                            <label className="text-xs font-black text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                              <Trash2 className="w-4 h-4 text-rose-500" />
                              <span>Tùy Chọn Thao Tác Xóa Đối Tượng:</span>
                            </label>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              <button
                                type="button"
                                onClick={() => {
                                  playUiSound("click");
                                  setDeleteMode("wrapper_only");
                                }}
                                className={cn(
                                  "p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1.5",
                                  deleteMode === "wrapper_only"
                                    ? "bg-rose-600 text-white border-rose-500 shadow-md ring-2 ring-rose-400/50"
                                    : isLight ? "bg-white border-slate-200 text-slate-800 hover:bg-rose-50" : "bg-slate-950 border-slate-800 text-slate-200 hover:bg-rose-950/40"
                                )}
                              >
                                <div className="flex items-center gap-2 font-black text-xs">
                                  <span className={cn("w-2.5 h-2.5 rounded-full shrink-0", deleteMode === "wrapper_only" ? "bg-white" : "bg-rose-500")} />
                                  <span>Xóa đối tượng đem nội dung bên trong ra ngoài</span>
                                </div>
                                <p className={cn(
                                  "text-3xs leading-relaxed",
                                  deleteMode === "wrapper_only" ? "text-rose-100" : "text-slate-500 dark:text-slate-400"
                                )}>
                                  Bỏ thẻ khung bọc ngoài ({selectedElement.tag}), bảo toàn nguyên vẹn toàn bộ các phần tử con và nội dung văn bản bên trong.
                                </p>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  playUiSound("click");
                                  setDeleteMode("full");
                                }}
                                className={cn(
                                  "p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1.5",
                                  deleteMode === "full"
                                    ? "bg-rose-700 text-white border-rose-600 shadow-md ring-2 ring-rose-400/50"
                                    : isLight ? "bg-white border-slate-200 text-slate-800 hover:bg-rose-50" : "bg-slate-950 border-slate-800 text-slate-200 hover:bg-rose-950/40"
                                )}
                              >
                                <div className="flex items-center gap-2 font-black text-xs">
                                  <span className={cn("w-2.5 h-2.5 rounded-full shrink-0", deleteMode === "full" ? "bg-white" : "bg-rose-500")} />
                                  <span>Xóa đối tượng toàn bộ nội dung bên trong</span>
                                </div>
                                <p className={cn(
                                  "text-3xs leading-relaxed",
                                  deleteMode === "full" ? "text-rose-100" : "text-slate-500 dark:text-slate-400"
                                )}>
                                  Xóa sạch triệt để thẻ này cùng toàn bộ tất cả nội dung và phần tử con nằm bên trong.
                                </p>
                              </button>
                            </div>
                          </div>
                        )}

                        {/* TAB 3: ĐỊNH DẠNG GIỐNG (CLONE FORMAT FROM OTHER PAGES) */}
                        {elementActionMode === "clone_format" && (
                          <div className={cn(
                            "p-3.5 rounded-2xl border space-y-3 animate-in fade-in duration-150",
                            isLight ? "bg-purple-50/50 border-purple-200" : "bg-purple-950/20 border-purple-500/30"
                          )}>
                            <div className="space-y-1.5">
                              <label className="text-xs font-black text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                                <Palette className="w-4 h-4 text-purple-500" />
                                <span>Định Dạng Giống - Chọn Thành Phần/Trang Khác Làm Mẫu:</span>
                              </label>

                              <select
                                value={styleSource}
                                onChange={(e) => setStyleSource(e.target.value)}
                                className={cn(
                                  "w-full px-3 py-2.5 rounded-xl border text-xs font-bold focus:outline-none focus:ring-2 cursor-pointer shadow-xs",
                                  isLight ? "bg-white border-slate-300 text-slate-900" : "bg-slate-900 border-slate-700 text-white"
                                )}
                              >
                                <optgroup label="Thành Phần Mẫu Từ Các Trang Khác">
                                  <option value="Trang Thư Ngỏ (#open-letter-container) - Thẻ Thư Ngỏ Hợp Tác Glassmorphism">
                                    Trang Thư Ngỏ: Thẻ Thư Ngỏ Hợp Tác (Glassmorphism mờ, viền phát sáng, bo góc 2xl)
                                  </option>
                                  <option value="Trang Học Vấn (#education) - Card 3D Glassmorphism Học Vấn">
                                    Trang Học Vấn: Card 3D Glassmorphism (Bo góc 2xl, Nền mờ Kính, Shadow đồng bộ)
                                  </option>
                                  <option value="Trang Dự Án (#projects) - Thẻ Main Card Dự Án Tối Giản">
                                    Trang Dự Án: Thẻ Main Card Dự Án (Flat design, bo cong 20px, typography sang trọng)
                                  </option>
                                  <option value="Trang Kinh Nghiệm (#experience) - Bento Grid Kinh Nghiệm Lưới">
                                    Trang Kinh Nghiệm: Bento Grid Kinh Nghiệm (Lưới bento hiện đại, tương phản cao)
                                  </option>
                                  <option value="Trang Giới Thiệu (#about) - Profile Card Giới Thiệu">
                                    Trang Giới Thiệu: Profile Card Giới Thiệu (Tối giản, đệm thoáng, màu nền cao cấp)
                                  </option>
                                  <option value="Trang Hệ Thống (#systems) - Neumorphism Soft Glow">
                                    Trang Hệ Thống: Neumorphism Soft Glow (Bóng chìm nổi tinh tế, nổi khối)
                                  </option>
                                  <option value="Trang Trang Chủ (#home) - Button Gradient Cyberpunk">
                                    Trang Trang Chủ: Button Gradient Cyberpunk (Hover hiệu ứng Neon, active scale 95)
                                  </option>
                                </optgroup>
                                <optgroup label="Tất Cả Các Trang Khác Trên Website">
                                  {DEFAULT_PAGE_STRUCTURE.map(page => (
                                    <option key={page.sectionId} value={`Phong cách tổng thể trang ${page.sectionName} (#${page.sectionId})`}>
                                      Phong cách giao diện trang: {page.sectionName} (#{page.sectionId})
                                    </option>
                                  ))}
                                </optgroup>
                              </select>
                            </div>

                            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-700 dark:text-purple-300">
                              🎯 <strong>Mẫu tham chiếu đã chọn:</strong> {styleSource}
                            </div>
                          </div>
                        )}

                        {/* TAB 4: THÊM ĐỐI TƯỢNG (ADD ELEMENT: THẺ / TIÊU ĐỀ THẺ) */}
                        {elementActionMode === "add" && (
                          <div className={cn(
                            "p-3.5 rounded-2xl border space-y-3 animate-in fade-in duration-150",
                            isLight ? "bg-emerald-50/50 border-emerald-200" : "bg-emerald-950/20 border-emerald-500/30"
                          )}>
                            <label className="text-xs font-black text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                              <PlusCircle className="w-4 h-4 text-emerald-500" />
                              <span>Thêm Đối Tượng Mới Vô Màn Hình:</span>
                            </label>

                            <div className="grid grid-cols-2 gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  playUiSound("click");
                                  setNewItemType("Thẻ chứa (Card / Box)");
                                  setNewItemTag("div");
                                  setNewItemTitle("Thẻ chứa / Khung Card mới");
                                }}
                                className={cn(
                                  "p-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer",
                                  newItemType.includes("Card") || newItemTag === "div"
                                    ? "bg-emerald-600 text-white border-emerald-500 shadow-md ring-2 ring-emerald-400/50"
                                    : isLight ? "bg-white text-slate-700 border-slate-200" : "bg-slate-900 text-slate-300 border-slate-800"
                                )}
                              >
                                <Layers className="w-4 h-4" />
                                <span>1. Thẻ (Card / Box / Div)</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  playUiSound("click");
                                  setNewItemType("Tiêu đề (Heading)");
                                  setNewItemTag("h3");
                                  setNewItemTitle("Tiêu đề thẻ mới");
                                }}
                                className={cn(
                                  "p-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer",
                                  newItemType.includes("Heading") || newItemTag.startsWith("h")
                                    ? "bg-emerald-600 text-white border-emerald-500 shadow-md ring-2 ring-emerald-400/50"
                                    : isLight ? "bg-white text-slate-700 border-slate-200" : "bg-slate-900 text-slate-300 border-slate-800"
                                )}
                              >
                                <Tag className="w-4 h-4" />
                                <span>2. Tiêu đề thẻ (Heading)</span>
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              <div className="space-y-1">
                                <label className="text-2xs font-bold text-slate-700 dark:text-slate-300">
                                  Tên/Tiêu đề của đối tượng mới:
                                </label>
                                <input
                                  type="text"
                                  value={newItemTitle}
                                  onChange={(e) => setNewItemTitle(e.target.value)}
                                  placeholder="Ví dụ: Thẻ chỉ số kpi, Tiêu đề dự án..."
                                  className={cn(
                                    "w-full px-3 py-2 rounded-xl text-xs font-semibold border focus:outline-none focus:ring-2",
                                    isLight ? "bg-white border-slate-300 text-slate-900" : "bg-slate-900 border-slate-700 text-white"
                                  )}
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-2xs font-bold text-slate-700 dark:text-slate-300">
                                  Thẻ HTML (&lt;tag&gt;):
                                </label>
                                <select
                                  value={newItemTag}
                                  onChange={(e) => setNewItemTag(e.target.value)}
                                  className={cn(
                                    "w-full px-3 py-2 rounded-xl border text-xs font-mono font-bold focus:outline-none cursor-pointer",
                                    isLight ? "bg-white border-slate-300 text-slate-900" : "bg-slate-900 border-slate-700 text-white"
                                  )}
                                >
                                  <option value="div">&lt;div&gt; - Khối chứa (Box/Card)</option>
                                  <option value="h3">&lt;h3&gt; - Tiêu đề (Heading H3)</option>
                                  <option value="h2">&lt;h2&gt; - Tiêu đề lớn (Heading H2)</option>
                                  <option value="h1">&lt;h1&gt; - Tiêu đề chính (Heading H1)</option>
                                  <option value="h4">&lt;h4&gt; - Tiêu đề phụ (Heading H4)</option>
                                  <option value="button">&lt;button&gt; - Nút bấm (Button)</option>
                                  <option value="p">&lt;p&gt; - Đoạn văn (Paragraph)</option>
                                  <option value="section">&lt;section&gt; - Phân mục (Section)</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* TAB 5: LÀM SẠCH MÃ NGUỒN & RÀ SOÁT LỖI */}
                        {elementActionMode === "clean_code" && (
                          <div className={cn(
                            "p-3.5 rounded-2xl border space-y-3 animate-in fade-in duration-150",
                            isLight ? "bg-cyan-50/50 border-cyan-200" : "bg-cyan-950/20 border-cyan-500/30"
                          )}>
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <label className="text-xs font-black text-cyan-800 dark:text-cyan-300 flex items-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                                <span>5 Mẫu làm sạch & rà soát mã nguồn chuyên dụng:</span>
                              </label>
                              <span className="text-3xs font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-700 dark:text-cyan-300">
                                Chuẩn hóa mã nguồn
                              </span>
                            </div>

                            {/* Lưới các mẫu làm sạch */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                              {CLEAN_CODE_TEMPLATES.map((tmpl) => {
                                const isSelected = selectedCleanTemplate === tmpl.id;
                                return (
                                  <button
                                    key={tmpl.id}
                                    type="button"
                                    onClick={() => {
                                      playUiSound("click");
                                      setSelectedCleanTemplate(tmpl.id);
                                    }}
                                    className={cn(
                                      "p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5",
                                      isSelected
                                        ? "bg-cyan-600 text-white border-cyan-500 shadow-md ring-2 ring-cyan-400/50"
                                        : isLight
                                          ? "bg-white hover:bg-cyan-50 text-slate-800 border-slate-200"
                                          : "bg-slate-950 hover:bg-cyan-950/40 text-slate-200 border-slate-800"
                                    )}
                                  >
                                    <div className="flex items-center gap-1.5 text-xs font-bold">
                                      <span className={cn(
                                        "w-2 h-2 rounded-full shrink-0",
                                        isSelected ? "bg-white" : "bg-cyan-500"
                                      )} />
                                      <span className="truncate">{tmpl.title}</span>
                                    </div>
                                    <p className={cn(
                                      "text-3xs leading-tight line-clamp-2",
                                      isSelected ? "text-cyan-100" : "text-slate-500 dark:text-slate-400"
                                    )}>
                                      {tmpl.desc}
                                    </p>
                                  </button>
                                );
                              })}
                            </div>

                            {/* Chi tiết mẫu làm sạch đang chọn & snippet */}
                            {(() => {
                              const activeClean = CLEAN_CODE_TEMPLATES.find(c => c.id === selectedCleanTemplate);
                              if (!activeClean) return null;
                              return (
                                <div className={cn(
                                  "p-3 rounded-xl border space-y-2 text-xs",
                                  isLight ? "bg-white border-cyan-200 text-slate-800" : "bg-slate-950 border-cyan-800/40 text-slate-200"
                                )}>
                                  <div className="flex items-center justify-between font-bold text-cyan-700 dark:text-cyan-300">
                                    <div className="flex items-center gap-1.5">
                                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" />
                                      <span>Mẫu đang chọn: {activeClean.title}</span>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        playUiSound("click");
                                        setUserInstruction(prev => prev ? `${prev}\n\n${activeClean.promptText}` : activeClean.promptText);
                                      }}
                                      className="px-2 py-0.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-700 dark:text-cyan-300 text-3xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                                      title="Chèn nội dung mẫu này vào ô yêu cầu"
                                    >
                                      <PlusCircle className="w-3 h-3" />
                                      <span>Chèn vào ô yêu cầu</span>
                                    </button>
                                  </div>

                                  <pre className="text-2xs font-mono whitespace-pre-wrap p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed overflow-x-auto">
                                    {activeClean.snippet}
                                  </pre>

                                  <p className="text-3xs text-slate-500 dark:text-slate-400 italic">
                                    💡 {activeClean.promptText}
                                  </p>
                                </div>
                              );
                            })()}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ================= TAB: TYPOGRAPHY (CHỈNH SỬA FONT & BỐ CỤC CHUNG) ================= */}
              {mode === "typography" && (
                <div className={cn(
                  "p-4 rounded-2xl border space-y-4 animate-in fade-in duration-200 shadow-sm",
                  isLight ? "bg-amber-50/40 border-amber-200" : "bg-slate-950/90 border-amber-500/30"
                )}>
                  {/* 1. Header & Giới thiệu hệ thống Font Play */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-amber-200/80 dark:border-amber-800/60 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 shadow-xs">
                        <Type className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                          <span>Hệ Thống Phân Cấp Typography & Chuẩn Hóa Bố Cục</span>
                          <span className="px-2 py-0.5 rounded-full text-3xs font-bold bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-400/40">
                            Font 'Play' Độc Quyền
                          </span>
                        </h4>
                        <p className="text-2xs text-slate-500 dark:text-slate-400">
                          Toàn bộ website sử dụng duy nhất font 'Play', không dùng xen kẽ font khác. Quản lý 11 token kích thước, clamp() responsive và đồng bộ bố cục chung.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-3xs font-mono px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                        100% Tiếng Việt • Chuẩn WCAG AA
                      </span>
                    </div>
                  </div>

                  {/* 2. Thông tin phần tử đang chọn vs Cấu hình chung hệ thống */}
                  {selectedElement ? (
                    <div className={cn(
                      "p-3.5 rounded-2xl border space-y-2.5",
                      isLight ? "bg-white border-amber-200 shadow-xs" : "bg-slate-900/90 border-amber-500/30"
                    )}>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-lg bg-purple-500/15 text-purple-700 dark:text-purple-300 font-bold text-xs flex items-center gap-1">
                            <Crosshair className="w-3.5 h-3.5" />
                            Đối tượng đang chọn:
                          </span>
                          <span className="font-bold text-xs text-slate-900 dark:text-white">
                            {selectedElement.componentType}
                          </span>
                          <span className="font-mono text-2xs text-slate-500">
                            &lt;{selectedElement.tag}&gt;
                          </span>
                          <span className="text-2xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                            {selectedElement.sectionName}
                          </span>
                        </div>

                        <div className="text-3xs text-slate-500 italic">
                          Selector: {selectedElement.fullSelector}
                        </div>
                      </div>

                      {/* Đo lường Typography thực tế */}
                      {(() => {
                        const typo = getElementTypography(selectedElement.element);
                        if (!typo) return null;
                        const matched = typo.matchedToken;
                        return (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1">
                            <div className={cn(
                              "p-2.5 rounded-xl border flex flex-col justify-between",
                              isLight ? "bg-amber-50/60 border-amber-200/80" : "bg-slate-950 border-slate-800"
                            )}>
                              <span className="text-3xs font-semibold text-slate-500 dark:text-slate-400">Kích thước đo được:</span>
                              <div className="flex items-baseline gap-1 mt-1">
                                <span className="text-base font-black text-amber-700 dark:text-amber-400 font-mono">
                                  {typo.fontSize}
                                </span>
                                <span className="text-3xs text-slate-500">({typo.fontSizePx}px)</span>
                              </div>
                              <span className="text-3xs text-slate-500 mt-1">Weight: {typo.fontWeight}</span>
                            </div>

                            <div className={cn(
                              "p-2.5 rounded-xl border flex flex-col justify-between",
                              isLight ? "bg-emerald-50/60 border-emerald-200/80" : "bg-slate-950 border-slate-800"
                            )}>
                              <span className="text-3xs font-semibold text-slate-500 dark:text-slate-400">Cấu hình chung khớp nhất:</span>
                              <div className="flex items-baseline gap-1 mt-1">
                                <span className="text-sm font-black text-emerald-700 dark:text-emerald-400">
                                  {matched?.level || "Custom"}
                                </span>
                                <span className="text-3xs text-slate-500">({matched?.rangePx || "N/A"})</span>
                              </div>
                              <span className="text-3xs font-mono text-emerald-600 dark:text-emerald-400 truncate mt-1">
                                {matched?.cssClass || "--"}
                              </span>
                            </div>

                            <div className={cn(
                              "p-2.5 rounded-xl border flex flex-col justify-between",
                              isLight ? "bg-indigo-50/60 border-indigo-200/80" : "bg-slate-950 border-slate-800"
                            )}>
                              <span className="text-3xs font-semibold text-slate-500 dark:text-slate-400">Line Height / Spacing:</span>
                              <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 mt-1 font-mono">
                                LH: {typo.lineHeight}
                              </span>
                              <span className="text-3xs text-slate-500 mt-1 font-mono">LS: {typo.letterSpacing}</span>
                            </div>

                            <div className={cn(
                              "p-2.5 rounded-xl border flex flex-col justify-between",
                              isLight ? "bg-purple-50/60 border-purple-200/80" : "bg-slate-950 border-slate-800"
                            )}>
                              <span className="text-3xs font-semibold text-slate-500 dark:text-slate-400">Font Family đang render:</span>
                              <span className="text-xs font-bold text-purple-700 dark:text-purple-400 mt-1 truncate" title={typo.fontFamily}>
                                {typo.fontFamily.includes("Play") ? "✓ Play (Chuẩn Master)" : typo.fontFamily}
                              </span>
                              <span className="text-3xs text-slate-500 mt-1">Fallback: sans-serif</span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  ) : (
                    <div className={cn(
                      "p-3 rounded-xl border flex items-center justify-between gap-3 text-xs",
                      isLight ? "bg-white border-slate-200 text-slate-700" : "bg-slate-900 border-slate-800 text-slate-300"
                    )}>
                      <div className="flex items-center gap-2">
                        <Baseline className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>Chưa chọn đối tượng cụ thể. Bạn có thể chọn trực tiếp token bên dưới để xuất prompt chuẩn hóa hoặc chuyển sang chế độ Toàn bố cục.</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          playUiSound("click");
                          setTypographyScope("global_layout");
                        }}
                        className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-3xs shrink-0 cursor-pointer shadow-xs"
                      >
                        Bật Toàn Bố Cục
                      </button>
                    </div>
                  )}

                  {/* 3. PHẠM VI ÁP DỤNG (SCOPE SELECTION) */}
                  <div className={cn(
                    "p-3 rounded-2xl border space-y-2",
                    isLight ? "bg-white border-amber-200" : "bg-slate-900 border-amber-500/30"
                  )}>
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-black text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                        <Target className="w-4 h-4 text-amber-500" />
                        <span>Phạm vi áp dụng chỉnh sửa Typography:</span>
                      </label>
                      <span className="text-3xs font-bold text-slate-500">
                        {typographyScope === "global_layout" ? "Đang mở rộng Cột Bố Cục Toàn Cục" : "Áp dụng riêng lẻ"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          playUiSound("click");
                          setTypographyScope("single_element");
                        }}
                        className={cn(
                          "p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5",
                          typographyScope === "single_element"
                            ? "bg-amber-600 text-white border-amber-500 shadow-md ring-2 ring-amber-400/50"
                            : isLight
                              ? "bg-slate-50 hover:bg-amber-50 text-slate-800 border-slate-200"
                              : "bg-slate-950 hover:bg-amber-950/60 text-slate-200 border-slate-800"
                        )}
                      >
                        <Crosshair className={cn("w-4 h-4 shrink-0", typographyScope === "single_element" ? "text-white" : "text-amber-500")} />
                        <div>
                          <div className="text-xs font-bold">🎯 Riêng đối tượng này</div>
                          <div className={cn("text-3xs", typographyScope === "single_element" ? "text-amber-100" : "text-slate-500")}>
                            Gán một Token kích thước cụ thể cho phần tử đang chọn
                          </div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          playUiSound("click");
                          setTypographyScope("global_layout");
                        }}
                        className={cn(
                          "p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5",
                          typographyScope === "global_layout"
                            ? "bg-indigo-600 text-white border-indigo-500 shadow-md ring-2 ring-indigo-400/50"
                            : isLight
                              ? "bg-slate-50 hover:bg-indigo-50 text-slate-800 border-slate-200"
                              : "bg-slate-950 hover:bg-indigo-950/60 text-slate-200 border-slate-800"
                        )}
                      >
                        <Columns className={cn("w-4 h-4 shrink-0", typographyScope === "global_layout" ? "text-white" : "text-indigo-500")} />
                        <div>
                          <div className="text-xs font-bold flex items-center gap-1.5">
                            <span>🌐 Áp dụng cho toàn bố cục</span>
                            <span className="text-3xs px-1.5 py-0.2 rounded bg-indigo-400/30 text-indigo-100 font-bold">
                              + Mở thêm Cột Cấu Hình
                            </span>
                          </div>
                          <div className={cn("text-3xs", typographyScope === "global_layout" ? "text-indigo-100" : "text-slate-500")}>
                            Hiển thị cột thiết lập hệ thống tỷ lệ, kích thước cơ sở và xuất hướng dẫn đồng bộ toàn website
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* 4. MAIN WORKSPACE: NẾU BẬT TOÀN BỐ CỤC SẼ XUẤT HIỆN 2 CỘT SONG SONG! */}
                  <div className={cn(
                    "grid gap-3.5",
                    typographyScope === "global_layout" ? "grid-cols-1 lg:grid-cols-12" : "grid-cols-1"
                  )}>
                    {/* CỘT TRÁI: DANH SÁCH 11 TYPOGRAPHY TOKENS (6 hoặc 12 CỘT TÙY SCOPE) */}
                    <div className={cn(
                      "space-y-2.5",
                      typographyScope === "global_layout" ? "lg:col-span-7" : "w-full"
                    )}>
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-black text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                          <Heading className="w-4 h-4 text-amber-500" />
                          <span>Bảng {GLOBAL_TYPOGRAPHY_TOKENS.length} Cấp Bậc Typography Tokens Chuẩn:</span>
                        </label>
                        <span className="text-3xs text-slate-500">Nhấp chọn token để xem hoặc gán</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
                        {GLOBAL_TYPOGRAPHY_TOKENS.map((token) => {
                          const isSelected = typographySelectedToken === token.id;
                          return (
                            <button
                              key={token.id}
                              type="button"
                              onClick={() => {
                                playUiSound("click");
                                setTypographySelectedToken(token.id);
                              }}
                              className={cn(
                                "p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 relative group",
                                isSelected
                                  ? "bg-amber-500/15 border-amber-500 text-amber-950 dark:text-amber-100 shadow-sm ring-2 ring-amber-400/40"
                                  : isLight
                                    ? "bg-white hover:bg-amber-50/50 border-slate-200 text-slate-800"
                                    : "bg-slate-900 hover:bg-slate-800/80 border-slate-800 text-slate-200"
                              )}
                            >
                              <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-1.5">
                                  <span className={cn(
                                    "px-1.5 py-0.5 rounded text-3xs font-black uppercase font-mono",
                                    isSelected 
                                      ? "bg-amber-500 text-white" 
                                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                                  )}>
                                    {token.level}
                                  </span>
                                  <span className="text-xs font-bold truncate max-w-[120px]">
                                    {token.labelVi.split("(")[0]}
                                  </span>
                                </div>

                                <span className="font-mono text-xs font-black text-amber-600 dark:text-amber-400">
                                  {token.rangePx}
                                </span>
                              </div>

                              {/* Sample Live Typography Rendering */}
                              <div className="py-1 px-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/60 overflow-hidden">
                                <div 
                                  className="font-play truncate leading-tight"
                                  style={{
                                    fontSize: token.id === "display" ? "20px" : token.id === "h1" ? "18px" : token.id === "h2" ? "16px" : token.id === "h3" ? "15px" : token.id === "h4" ? "14px" : token.id === "h5" ? "13.5px" : token.id === "h6" ? "13px" : "13px",
                                    fontWeight: token.defaultWeight,
                                    letterSpacing: token.defaultLetterSpacing
                                  }}
                                >
                                  Nguyễn Hùng Thái — {token.level}
                                </div>
                              </div>

                              <div className="flex items-center justify-between text-3xs text-slate-500 dark:text-slate-400 pt-0.5 border-t border-slate-100 dark:border-slate-800">
                                <span className="font-mono truncate max-w-[130px]">{token.cssClass}</span>
                                <span>LH: {token.defaultLineHeight} • W: {token.defaultWeight}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* CỘT PHẢI (CỘT XUẤT HIỆN KHI CHỌN "ÁP DỤNG CHO TOÀN BỐ CỤC") */}
                    {typographyScope === "global_layout" && (
                      <div className="lg:col-span-5 space-y-3 p-3.5 rounded-2xl border bg-indigo-50/40 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800/50 animate-in fade-in slide-in-from-right-4 duration-200">
                        <div className="flex items-center justify-between border-b border-indigo-200 dark:border-indigo-800 pb-2">
                          <label className="text-xs font-black text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
                            <SlidersHorizontal className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            <span>Cột Cấu Hình Bố Cục Toàn Cục</span>
                          </label>
                          <span className="text-3xs font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-700 dark:text-indigo-300">
                            Global Layout Matrix
                          </span>
                        </div>

                        {/* 1. Tỷ lệ bước nhảy (Step Scale Ratio) */}
                        <div className="space-y-1.5">
                          <span className="text-2xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                            <span>1. Tỷ lệ bước nhảy (Step Ratio):</span>
                            <span className="font-mono text-3xs text-indigo-600 dark:text-indigo-400 font-bold">
                              {typographyScaleArchetype === "major_second" ? "1.125 (Dense UI)" : typographyScaleArchetype === "perfect_fourth" ? "1.333 (High Contrast)" : "1.25 (Standard)"}
                            </span>
                          </span>
                          <div className="grid grid-cols-3 gap-1.5">
                            {[
                              { id: "major_second", label: "Major 2nd", ratio: "1.125", desc: "Ứng dụng" },
                              { id: "major_third", label: "Major 3rd", ratio: "1.250", desc: "Portfolio" },
                              { id: "perfect_fourth", label: "Perf 4th", ratio: "1.333", desc: "Executive" }
                            ].map((scale) => (
                              <button
                                key={scale.id}
                                type="button"
                                onClick={() => {
                                  playUiSound("click");
                                  setTypographyScaleArchetype(scale.id as any);
                                }}
                                className={cn(
                                  "p-1.5 rounded-xl border text-center transition-all cursor-pointer",
                                  typographyScaleArchetype === scale.id
                                    ? "bg-indigo-600 text-white border-indigo-500 shadow-xs font-bold"
                                    : isLight
                                      ? "bg-white hover:bg-indigo-50 text-slate-700 border-slate-200 text-xs"
                                      : "bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800 text-xs"
                                )}
                              >
                                <div className="text-2xs font-bold">{scale.label}</div>
                                <div className="text-3xs opacity-80">{scale.ratio}</div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* 2. Kích thước cơ sở (Base Font Size) */}
                        <div className="space-y-1.5">
                          <span className="text-2xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                            <span>2. Kích thước cơ sở (Base Size):</span>
                            <span className="font-mono text-3xs text-indigo-600 dark:text-indigo-400 font-bold">
                              {typographyBaseSize}px
                            </span>
                          </span>
                          <div className="grid grid-cols-3 gap-1.5">
                            {[
                              { size: 15, label: "15px", desc: "Gọn gàng" },
                              { size: 16, label: "16px", desc: "Chuẩn Golden" },
                              { size: 17, label: "17px", desc: "Thoáng mắt" }
                            ].map((b) => (
                              <button
                                key={b.size}
                                type="button"
                                onClick={() => {
                                  playUiSound("click");
                                  setTypographyBaseSize(b.size);
                                }}
                                className={cn(
                                  "p-1.5 rounded-xl border text-center transition-all cursor-pointer",
                                  typographyBaseSize === b.size
                                    ? "bg-indigo-600 text-white border-indigo-500 shadow-xs font-bold"
                                    : isLight
                                      ? "bg-white hover:bg-indigo-50 text-slate-700 border-slate-200 text-xs"
                                      : "bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800 text-xs"
                                )}
                              >
                                <div className="text-2xs font-bold">{b.label}</div>
                                <div className="text-3xs opacity-80">{b.desc}</div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* 3. Chiều cao dòng văn bản (Body Line-height) */}
                        <div className="space-y-1.5">
                          <span className="text-2xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                            <span>3. Chiều cao dòng Body (Line-height):</span>
                            <span className="font-mono text-3xs text-indigo-600 dark:text-indigo-400 font-bold">
                              {typographyBodyLineHeight}
                            </span>
                          </span>
                          <div className="grid grid-cols-3 gap-1.5">
                            {[
                              { lh: "1.55", label: "1.55", desc: "Đặc vừa" },
                              { lh: "1.6", label: "1.60", desc: "Chuẩn Master" },
                              { lh: "1.65", label: "1.65", desc: "Rộng thoáng" }
                            ].map((l) => (
                              <button
                                key={l.lh}
                                type="button"
                                onClick={() => {
                                  playUiSound("click");
                                  setTypographyBodyLineHeight(l.lh);
                                }}
                                className={cn(
                                  "p-1.5 rounded-xl border text-center transition-all cursor-pointer",
                                  typographyBodyLineHeight === l.lh
                                    ? "bg-indigo-600 text-white border-indigo-500 shadow-xs font-bold"
                                    : isLight
                                      ? "bg-white hover:bg-indigo-50 text-slate-700 border-slate-200 text-xs"
                                      : "bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800 text-xs"
                                )}
                              >
                                <div className="text-2xs font-bold">{l.label}</div>
                                <div className="text-3xs opacity-80">{l.desc}</div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* 4. Quick Action Presets chèn vào Prompt hướng dẫn */}
                        <div className="space-y-1.5 pt-1">
                          <span className="text-2xs font-bold text-indigo-900 dark:text-indigo-200">
                            Chỉ dẫn nhanh chèn vào Prompt:
                          </span>
                          <div className="grid grid-cols-2 gap-1.5">
                            {[
                              {
                                label: "Đồng bộ CSS :root",
                                text: "Đồng bộ toàn bộ biến CSS :root typography trong src/index.css theo đúng 11 token Design System."
                              },
                              {
                                label: "Xóa Hardcoded Font",
                                text: "Rà soát và loại bỏ toàn bộ inline style fontSize và các class text-[..px] trên toàn bộ 14 trang."
                              },
                              {
                                label: "Chuẩn hóa Font 'Play'",
                                text: "Đảm bảo 100% website sử dụng font-family: 'Play', sans-serif, không fallback sai lệch."
                              },
                              {
                                label: "Nhịp điệu dòng (Rhythm)",
                                text: "Chuẩn hóa khoảng cách theo nhịp điệu Typography: Heading -> Subtitle 8-12px, Subtitle -> Body 8-16px, Body -> Button 16-24px."
                              }
                            ].map((preset, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => {
                                  playUiSound("click");
                                  setUserInstruction(prev => prev ? `${prev}\n- ${preset.text}` : `- ${preset.text}`);
                                }}
                                className={cn(
                                  "p-1.5 rounded-lg border text-left text-3xs font-semibold transition-all cursor-pointer active:scale-95 flex items-center gap-1",
                                  isLight 
                                    ? "bg-white hover:bg-indigo-100/70 border-indigo-200 text-indigo-950" 
                                    : "bg-slate-900 hover:bg-indigo-950 border-indigo-800 text-indigo-200"
                                )}
                              >
                                <PlusCircle className="w-3 h-3 text-indigo-500 shrink-0" />
                                <span className="truncate">{preset.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ================= TAB 3: FULL WEBSITE MODE ================= */}
              {mode === "full_website" && (
                <div className={cn(
                  "p-4 rounded-2xl border space-y-3.5 animate-in fade-in duration-200 shadow-sm",
                  isLight ? "bg-slate-50/80 border-indigo-200/80" : "bg-slate-950/90 border-indigo-500/30"
                )}>
                  {/* Top Bar: Title, Live Stats & Action Buttons */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800/80 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                          <Globe className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                            <span>Toàn bộ trang & phân hệ website</span>
                            <span className="px-2 py-0.5 rounded-full text-3xs font-bold bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-300/40">
                              {selectedSections.length}/{discoveredPagesList.length} Trang được chọn
                            </span>
                          </h4>
                          <p className="text-2xs text-slate-500 dark:text-slate-400">
                            Hiển thị toàn bộ các trang đang có trong website. Nhấp chọn trang để tạo prompt đồng bộ hoặc xuất yêu cầu tùy biến.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Bar: Refresh Button & Fast Filters */}
                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={handleRefreshAllPages}
                        disabled={isScanningFullWebsite}
                        className={cn(
                          "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer",
                          "bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-500/20",
                          isScanningFullWebsite && "opacity-80 cursor-not-allowed"
                        )}
                        title="Quét lại DOM và cập nhật danh sách toàn bộ trang đang có trên website"
                      >
                        <RefreshCw className={cn("w-3.5 h-3.5", isScanningFullWebsite && "animate-spin")} />
                        <span>{isScanningFullWebsite ? "Đang quét toàn bộ trang..." : "Cập nhật danh sách trang"}</span>
                      </button>

                      {/* View Mode Switcher */}
                      <div className="flex items-center p-0.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                        <button
                          type="button"
                          onClick={() => {
                            playUiSound("click");
                            setWebsiteViewMode("bento");
                          }}
                          className={cn(
                            "px-2 py-1 rounded-md text-2xs font-bold transition-all flex items-center gap-1 cursor-pointer",
                            websiteViewMode === "bento"
                              ? "bg-indigo-600 text-white shadow-xs"
                              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                          )}
                          title="Hiển thị dạng thẻ Bento trực quan"
                        >
                          <LayoutGrid className="w-3 h-3" />
                          <span className="hidden sm:inline">Lưới Bento</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            playUiSound("click");
                            setWebsiteViewMode("compact");
                          }}
                          className={cn(
                            "px-2 py-1 rounded-md text-2xs font-bold transition-all flex items-center gap-1 cursor-pointer",
                            websiteViewMode === "compact"
                              ? "bg-indigo-600 text-white shadow-xs"
                              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                          )}
                          title="Hiển thị dạng danh sách chọn nhanh"
                        >
                          <List className="w-3 h-3" />
                          <span className="hidden sm:inline">Thu gọn</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Filter & Search Toolbar */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-1">
                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                      {[
                        { id: "all", label: "Tất cả", count: discoveredPagesList.length },
                        { id: "main", label: "Trang chính", count: discoveredPagesList.filter(p => p.category === "main").length },
                        { id: "specialty", label: "Chuyên môn", count: discoveredPagesList.filter(p => p.category === "specialty").length },
                        { id: "media", label: "Đa phương tiện", count: discoveredPagesList.filter(p => p.category === "media").length },
                        { id: "systems", label: "Hệ sinh thái", count: discoveredPagesList.filter(p => p.category === "systems").length },
                        { id: "frame", label: "Khung điều hướng", count: discoveredPagesList.filter(p => p.category === "frame").length }
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            playUiSound("click");
                            setWebsiteCategoryFilter(cat.id);
                          }}
                          className={cn(
                            "px-2.5 py-1 rounded-lg text-3xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1",
                            websiteCategoryFilter === cat.id
                              ? "bg-indigo-600 text-white shadow-xs"
                              : isLight
                                ? "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                                : "bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800"
                          )}
                        >
                          <span>{cat.label}</span>
                          <span className={cn(
                            "px-1 py-0.2 rounded text-3xs",
                            websiteCategoryFilter === cat.id ? "bg-white/20 text-white" : "text-slate-400"
                          )}>
                            {cat.count}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Quick Select & Search Input */}
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1 sm:w-44">
                        <Search className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          value={websiteSearchQuery}
                          onChange={(e) => setWebsiteSearchQuery(e.target.value)}
                          placeholder="Tìm trang, selector..."
                          className={cn(
                            "w-full pl-7 pr-2.5 py-1 rounded-lg text-2xs font-medium border focus:outline-none focus:ring-1 focus:ring-indigo-500",
                            isLight ? "bg-white border-slate-200 text-slate-900" : "bg-slate-900 border-slate-800 text-slate-100"
                          )}
                        />
                        {websiteSearchQuery && (
                          <button
                            type="button"
                            onClick={() => setWebsiteSearchQuery("")}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-3xs"
                          >
                            ×
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            playUiSound("click");
                            setSelectedSections(discoveredPagesList.map(s => s.sectionId));
                          }}
                          className="px-2 py-1 rounded-lg text-3xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
                        >
                          Chọn hết
                        </button>
                        <span className="text-slate-300 dark:text-slate-700">|</span>
                        <button
                          type="button"
                          onClick={() => {
                            playUiSound("click");
                            setSelectedSections([]);
                          }}
                          className="px-2 py-1 rounded-lg text-3xs font-bold text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                        >
                          Bỏ chọn
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* PAGES LIST CONTAINER */}
                  {(() => {
                    const filteredPages = discoveredPagesList.filter(page => {
                      const matchCat = websiteCategoryFilter === "all" || page.category === websiteCategoryFilter;
                      const q = websiteSearchQuery.trim().toLowerCase();
                      const matchSearch = !q || 
                        page.sectionName.toLowerCase().includes(q) ||
                        page.title.toLowerCase().includes(q) ||
                        page.selector.toLowerCase().includes(q) ||
                        page.descriptionVi.toLowerCase().includes(q);
                      return matchCat && matchSearch;
                    });

                    if (filteredPages.length === 0) {
                      return (
                        <div className="p-6 text-center border border-dashed rounded-xl text-slate-400 text-xs">
                          Không tìm thấy trang nào khớp với từ khóa "{websiteSearchQuery}".
                        </div>
                      );
                    }

                    if (websiteViewMode === "compact") {
                      return (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 max-h-72 overflow-y-auto pr-1">
                          {filteredPages.map((page) => {
                            const isChecked = selectedSections.includes(page.sectionId);
                            const IconComp = page.icon;
                            return (
                              <label
                                key={page.id}
                                className={cn(
                                  "p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-all duration-200 select-none group",
                                  isChecked
                                    ? isLight 
                                      ? "bg-indigo-50/80 border-indigo-300 text-indigo-950 font-bold shadow-xs scale-[1.01]" 
                                      : "bg-indigo-950/50 border-indigo-500/50 text-indigo-100 font-bold shadow-xs scale-[1.01]"
                                    : isLight 
                                      ? "bg-white border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900" 
                                      : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
                                )}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => {
                                    playUiSound("click");
                                    if (isChecked) {
                                      setSelectedSections(prev => prev.filter(id => id !== page.sectionId));
                                    } else {
                                      setSelectedSections(prev => [...prev, page.sectionId]);
                                    }
                                  }}
                                  className="rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5 cursor-pointer accent-indigo-600 shrink-0"
                                />
                                <IconComp className={cn("w-3.5 h-3.5 shrink-0", isChecked ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400")} />
                                <div className="min-w-0 flex-1">
                                  <div className="truncate text-xs">{page.sectionName}</div>
                                  <div className="text-3xs text-slate-400 font-mono truncate">{page.selector}</div>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      );
                    }

                    // Bento Grid View
                    return (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1 max-h-[420px] overflow-y-auto pr-1">
                        {filteredPages.map((page) => {
                          const isChecked = selectedSections.includes(page.sectionId);
                          const IconComp = page.icon;

                          return (
                            <div
                              key={page.id}
                              className={cn(
                                "p-3 rounded-2xl border transition-all duration-200 flex flex-col justify-between group relative",
                                isChecked
                                  ? isLight
                                    ? "bg-white border-indigo-300 ring-1 ring-indigo-400/30 shadow-sm"
                                    : "bg-slate-900/95 border-indigo-500/40 ring-1 ring-indigo-500/20 shadow-sm"
                                  : isLight
                                    ? "bg-white/60 border-slate-200 opacity-80 hover:opacity-100 hover:bg-white"
                                    : "bg-slate-900/40 border-slate-800/80 opacity-70 hover:opacity-100 hover:bg-slate-900"
                              )}
                            >
                              {/* Card Header: Checkbox + Icon + Title + Category Badge */}
                              <div className="space-y-1.5">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex items-center gap-2 min-w-0">
                                    <input
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => {
                                        playUiSound("click");
                                        if (isChecked) {
                                          setSelectedSections(prev => prev.filter(id => id !== page.sectionId));
                                        } else {
                                          setSelectedSections(prev => [...prev, page.sectionId]);
                                        }
                                      }}
                                      className="rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer accent-indigo-600 shrink-0"
                                      id={`page-check-${page.id}`}
                                    />
                                    <div className={cn("p-1.5 rounded-lg border shrink-0", page.categoryColor)}>
                                      <IconComp className="w-3.5 h-3.5" />
                                    </div>
                                    <div className="min-w-0">
                                      <label htmlFor={`page-check-${page.id}`} className="font-bold text-xs cursor-pointer truncate text-slate-900 dark:text-slate-100 hover:text-indigo-600 block">
                                        {page.sectionName}
                                      </label>
                                      <div className="text-3xs font-mono text-slate-400 truncate">
                                        {page.selector}
                                      </div>
                                    </div>
                                  </div>

                                  <span className="px-1.5 py-0.5 rounded-md text-3xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0 border border-slate-200 dark:border-slate-700">
                                    {page.categoryVi}
                                  </span>
                                </div>

                                {/* Description */}
                                <p className="text-2xs leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-2 pt-0.5">
                                  {page.descriptionVi}
                                </p>
                              </div>

                              {/* Card Footer: Metadata & Jump Link */}
                              <div className="flex items-center justify-between gap-2 pt-2 mt-2 border-t border-slate-100 dark:border-slate-800/80">
                                <div className="flex items-center gap-2 text-3xs text-slate-500 dark:text-slate-400">
                                  <span className="flex items-center gap-1 font-medium">
                                    <Boxes className="w-3 h-3 text-indigo-500" />
                                    <span>{page.childCount} thành phần</span>
                                  </span>
                                  {page.isActive && (
                                    <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-3xs">
                                      ● Đang xem
                                    </span>
                                  )}
                                </div>

                                <button
                                  type="button"
                                  onClick={() => handleNavigateToPage(page.sectionId, page.sectionName)}
                                  className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-950/60 text-slate-700 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-300 text-3xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                                  title="Chuyển màn hình xem trang này"
                                >
                                  <Eye className="w-3 h-3" />
                                  <span>Xem trang</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Instruction Prompt Textarea with Sample Prompts Buttons & Dropdown */}
              <div className="space-y-2 relative">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="text-xs font-bold flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                    <Terminal className="w-4 h-4 text-emerald-500" />
                    <span>4. Nhập yêu cầu thực thi hoặc ghi chú bổ sung:</span>
                  </label>

                  <div className="flex items-center gap-1.5">
                    {/* Nút Xóa Nhanh Instruction */}
                    {userInstruction && (
                      <button
                        type="button"
                        onClick={() => {
                          playUiSound("click");
                          setUserInstruction("");
                        }}
                        className="px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 transition-all cursor-pointer"
                        title="Xóa nhanh nội dung yêu cầu"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Xóa</span>
                      </button>
                    )}

                    {/* Nút Prompt Mẫu (Mở danh sách prompt mẫu) */}
                    <button
                      type="button"
                      onClick={() => {
                        playUiSound("click");
                        setShowSamplePromptsList(prev => !prev);
                      }}
                      className={cn(
                        "px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border transition-all cursor-pointer active:scale-95",
                        showSamplePromptsList
                          ? "bg-indigo-600 text-white border-indigo-500 shadow-xs"
                          : isLight
                            ? "bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200"
                            : "bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 border-indigo-500/30"
                      )}
                      title="Hiển thị danh sách câu prompt mẫu"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                      <span>Prompt Mẫu ({samplePromptTemplates.length})</span>
                      <ChevronDown className={cn("w-3 h-3 transition-transform", showSamplePromptsList && "rotate-180")} />
                    </button>

                    {/* Nút Lưu (Lưu nội dung đang nhập thành Prompt Mẫu) */}
                    <button
                      type="button"
                      onClick={handleSaveSamplePrompt}
                      disabled={!userInstruction.trim()}
                      className={cn(
                        "px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border transition-all cursor-pointer active:scale-95",
                        userInstruction.trim()
                          ? "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500 shadow-xs"
                          : "bg-slate-200 dark:bg-slate-800 text-slate-400 border-slate-300 dark:border-slate-700 cursor-not-allowed opacity-60"
                      )}
                      title="Lưu câu lệnh hiện tại vào danh sách Prompt Mẫu"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Lưu Mẫu</span>
                    </button>
                  </div>
                </div>

                {/* Popup Menu / Dropdown Danh sách Prompt Mẫu */}
                {showSamplePromptsList && (
                  <div className={cn(
                    "p-3 rounded-2xl border shadow-2xl space-y-2 animate-in fade-in zoom-in-95 duration-150 relative z-30",
                    isLight ? "bg-white border-indigo-200 text-slate-900" : "bg-slate-900 border-indigo-500/40 text-white"
                  )}>
                    <div className="flex items-center justify-between border-b border-indigo-500/20 pb-2">
                      <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        Danh Sách Prompt Mẫu (Nhấp để chọn & hiển thị vào khung nhập):
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowSamplePromptsList(false)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="max-h-52 overflow-y-auto custom-scrollbar space-y-1.5 pr-1">
                      {samplePromptTemplates.map((tmpl) => (
                        <div
                          key={tmpl.id}
                          onClick={() => handleSelectSamplePrompt(tmpl.content)}
                          className={cn(
                            "p-2.5 rounded-xl border flex items-start justify-between gap-2 cursor-pointer transition-all hover:scale-[1.01] group",
                            isLight
                              ? "bg-slate-50 hover:bg-indigo-50/80 border-slate-200 hover:border-indigo-300 text-slate-800"
                              : "bg-slate-950 hover:bg-indigo-950/60 border-slate-800 hover:border-indigo-500/40 text-slate-200"
                          )}
                        >
                          <div className="space-y-0.5 flex-1">
                            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-300 group-hover:text-indigo-500 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                              <span>{tmpl.title}</span>
                            </div>
                            <p className="text-2xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                              {tmpl.content}
                            </p>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <span className="text-3xs font-bold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                              Chọn
                            </span>
                            {tmpl.isCustom && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteSamplePrompt(tmpl.id);
                                }}
                                className="p-1 rounded text-rose-400 hover:text-rose-600 hover:bg-rose-500/10"
                                title="Xóa mẫu này"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <textarea
                  value={userInstruction}
                  onChange={(e) => setUserInstruction(e.target.value)}
                  placeholder={
                    mode === "tree"
                      ? "Ví dụ: Áp dụng các thay đổi trong danh sách trên, đồng thời làm nổi bật các thẻ tiêu đề và tối ưu khoảng cách..."
                      : mode === "full_website"
                        ? "Ví dụ: Đồng bộ lại tông màu xanh navy cao cấp, thêm hiệu ứng chuyển trang mượt mà..."
                        : "Ví dụ: Đổi màu nút thành xanh ngọc gradient, làm đậm chữ và thêm hiệu ứng hover..."
                  }
                  rows={2}
                  className={cn(
                    "w-full border rounded-xl p-3 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all resize-none",
                    isLight
                      ? "bg-slate-50 border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-200"
                      : "bg-slate-950 border-slate-700 text-white focus:border-emerald-500 focus:ring-emerald-900/40"
                  )}
                />
              </div>

              {/* ACTION: GENERATE OR COPY PROMPT BUTTON & PROMPT LƯU TRỮ */}
              <div className="space-y-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                <label className="text-xs font-black text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-purple-500" />
                  <span>5. Thực hiện:</span>
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-2.5">
                  {!generatedPrompt ? (
                    <button
                      onClick={handleGeneratePrompt}
                      className="flex-1 w-full py-3 px-4 rounded-xl text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.01] active:scale-95 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-indigo-500/25 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                      <span>Tạo prompt</span>
                    </button>
                  ) : copied ? (
                    <button
                      onClick={handleCloseAllXRay}
                      className="flex-1 w-full py-3 px-4 rounded-xl text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.01] active:scale-95 bg-rose-600 hover:bg-rose-500 cursor-pointer border border-rose-500 shadow-rose-500/20"
                      title="Đóng toàn bộ X-Ray ngay"
                    >
                      <X className="w-4 h-4 animate-spin-slow" />
                      <span>Đóng X-Ray</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleCopyPrompt}
                      className={cn(
                        "flex-1 w-full py-3 px-4 rounded-xl text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.01] active:scale-95 cursor-pointer",
                        "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/25"
                      )}
                    >
                      <Copy className="w-4 h-4 animate-bounce" />
                      <span>Sao chép prompt đã lưu</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      playUiSound("click");
                      setShowSavedListModal(true);
                    }}
                    className={cn(
                      "py-3 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer shrink-0 w-full sm:w-auto",
                      isLight ? "bg-purple-100 hover:bg-purple-200 text-purple-800 border-purple-300" : "bg-purple-950/80 hover:bg-purple-900 text-purple-200 border-purple-500/40"
                    )}
                    title="Xem danh sách prompt đã lưu"
                  >
                    <ListPlus className="w-4 h-4 text-purple-500" />
                    <span>Prompt lưu trữ ({savedPrompts.length})</span>
                  </button>
                </div>
              </div>

              {/* GENERATED PROMPT OUTPUT */}
              {generatedPrompt && (
                <div className={cn(
                  "p-3.5 rounded-xl border space-y-2.5 animate-in fade-in slide-in-from-bottom-2",
                  isLight ? "bg-slate-50 border-indigo-300 shadow-sm" : "bg-slate-950 border-emerald-500/40"
                )}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      Câu Lệnh Prompt AI Đã Tạo & Lưu:
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleSavePromptToList}
                        className={cn(
                          "flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer",
                          "bg-purple-600 hover:bg-purple-500 text-white"
                        )}
                        title="Lưu prompt này vào danh sách"
                      >
                        <ListPlus className="w-3.5 h-3.5" />
                        <span>Lưu thêm bản ghi</span>
                      </button>

                      {copied ? (
                        <button
                          onClick={handleCloseAllXRay}
                          className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-black bg-rose-600 hover:bg-rose-500 text-white transition-all shadow-xs active:scale-95 cursor-pointer border border-rose-500 animate-pulse"
                          title="Đóng toàn bộ X-Ray ngay"
                        >
                          <X className="w-3.5 h-3.5 animate-spin-slow" />
                          <span>Đóng X-Ray</span>
                        </button>
                      ) : (
                        <button
                          onClick={handleCopyPrompt}
                          className={cn(
                            "flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer",
                            "bg-indigo-600 hover:bg-indigo-500 text-white"
                          )}
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Sao chép Prompt</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <pre className={cn(
                    "p-3 rounded-lg text-xs font-mono whitespace-pre-wrap leading-relaxed border select-all max-h-56 overflow-y-auto custom-scrollbar",
                    isLight ? "bg-white text-slate-800 border-slate-200" : "bg-slate-900/90 text-slate-200 border-slate-800"
                  )}>
                    {generatedPrompt}
                  </pre>
                  
                  <p className="text-2xs text-slate-500 dark:text-slate-400 italic flex items-center gap-1">
                    <Info className="w-3 h-3 text-indigo-500 shrink-0" />
                    Prompt đã tự động lưu vào danh sách. Nhấn "Sao chép Prompt" và dán trực tiếp vào khung chat để AI cập nhật trang web cho bạn ngay lập tức!
                  </p>
                </div>
              )}

            </div>

            {/* Footer buttons */}
            <div className={cn(
              "p-3 px-5 border-t flex items-center justify-between text-xs",
              isLight ? "bg-slate-50 border-slate-200 text-slate-500" : "bg-slate-950 border-slate-800 text-slate-400"
            )}>
              <span>Nhấn <kbd className={cn("px-1.5 py-0.5 rounded font-mono", isLight ? "bg-slate-200 text-slate-700" : "bg-slate-800 text-slate-300")}>ESC</kbd> hoặc nút Đóng để tắt toàn bộ X-Ray</span>
              <button
                onClick={handleCloseAllXRay}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg font-bold transition-colors cursor-pointer",
                  isLight ? "bg-slate-200 hover:bg-slate-300 text-slate-800" : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                )}
              >
                Đóng X-Ray
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. ACTION MODAL FOR TREE & INSPECTOR (CHỈNH / XÓA / THÊM MỚI / CHUYỂN / ĐỊNH DẠNG GIỐNG) */}
      {modalActionType && selectedTreeItem && (
        <div className="fixed inset-0 z-[10005] bg-white/80 dark:bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
          <div className={cn(
            "w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden p-5 border space-y-4",
            isLight ? "bg-white text-slate-900 border-slate-300" : "bg-slate-900 text-white border-indigo-500/50"
          )}>
            <div className={cn(
              "flex items-center justify-between border-b pb-3",
              isLight ? "border-slate-200" : "border-slate-800"
            )}>
              <div className="flex items-center gap-2">
                <span className={cn(
                  "p-2 rounded-xl text-white font-bold shadow-sm",
                  modalActionType === "edit" ? "bg-amber-500" :
                  modalActionType === "delete" ? "bg-rose-500" :
                  modalActionType === "add" ? "bg-emerald-500" :
                  modalActionType === "clone_format" ? "bg-pink-500" : "bg-purple-500"
                )}>
                  {modalActionType === "edit" ? <Edit3 className="w-4 h-4" /> :
                   modalActionType === "delete" ? <Trash2 className="w-4 h-4" /> :
                   modalActionType === "add" ? <PlusCircle className="w-4 h-4" /> :
                   modalActionType === "clone_format" ? <Palette className="w-4 h-4" /> : <ArrowRightLeft className="w-4 h-4" />}
                </span>
                <div>
                  <h4 className={cn(
                    "font-black text-sm uppercase tracking-tight",
                    isLight ? "text-slate-900" : "text-white"
                  )}>
                    {modalActionType === "edit" ? "Chỉnh Sửa Đối Tượng" :
                     modalActionType === "delete" ? "Xác Nhận Xóa Đối Tượng" :
                     modalActionType === "add" ? "Thêm Đối Tượng Mới" :
                     modalActionType === "clone_format" ? "Áp Dụng Định Dạng Giống Mẫu" : "Chuyển Đối Tượng Sang Trang Khác"}
                  </h4>
                  <p className={cn(
                    "text-2xs truncate max-w-[280px]",
                    isLight ? "text-slate-500" : "text-slate-400"
                  )}>
                    {selectedTreeItem.title} ({selectedTreeItem.sectionName})
                  </p>
                </div>
              </div>

              <button
                onClick={() => setModalActionType(null)}
                className="text-slate-500 dark:text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            {/* If Edit Action, show Prompt Preset selector dropdown */}
            {modalActionType === "edit" && (
              <div className="space-y-2 bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Chọn Mẫu Áp Dụng Chuyên Dụng (Prompt Preset):</span>
                </label>
                <select
                  value={editPreset}
                  onChange={(e) => {
                    const val = e.target.value;
                    setEditPreset(val);
                    const tmpl = PRESET_TEMPLATES.find(p => p.id === val);
                    if (tmpl) {
                      setActionDescription(`Chỉnh sửa [${selectedTreeItem.title}] áp dụng mẫu [${tmpl.titleVi}]: ${tmpl.promptSnippet}`);
                    }
                  }}
                  className={cn(
                    "w-full px-3 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 cursor-pointer",
                    isLight ? "bg-white border-slate-300 text-slate-900" : "bg-slate-900 border-slate-700 text-white"
                  )}
                >
                  <option value="">-- Chọn Mẫu Áp Dụng Chuyên Dụng (Prompt Preset) --</option>
                  {PRESET_TEMPLATES.map((tmpl) => (
                    <option key={tmpl.id} value={tmpl.id}>
                      {tmpl.label} ({tmpl.shortDesc})
                    </option>
                  ))}
                </select>
                {editPreset && (
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-2xs text-amber-700 dark:text-amber-300">
                    ✨ <strong>{PRESET_TEMPLATES.find(p => p.id === editPreset)?.label}:</strong> {PRESET_TEMPLATES.find(p => p.id === editPreset)?.shortDesc}
                  </div>
                )}
              </div>
            )}

            {/* If Delete Action, show options: Chỉ đối tượng này (giữ nguyên nội dung) vs Xóa toàn bộ */}
            {modalActionType === "delete" && (
              <div className="space-y-2 bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                  <span>Chọn Tùy Chọn Thao Tác Xóa:</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      playUiSound("click");
                      setDeleteMode("wrapper_only");
                    }}
                    className={cn(
                      "p-3 rounded-xl border text-xs font-bold flex flex-col gap-1 text-left transition-all cursor-pointer",
                      deleteMode === "wrapper_only"
                        ? isLight ? "bg-indigo-50 border-indigo-500 text-indigo-950 ring-2 ring-indigo-300" : "bg-indigo-950/60 border-indigo-500 text-indigo-200 ring-2 ring-indigo-500/50"
                        : isLight ? "bg-white border-slate-200 text-slate-600 hover:bg-slate-100" : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800"
                    )}
                  >
                    <div className="flex items-center gap-1.5 font-black text-xs">
                      <span className={cn("w-2 h-2 rounded-full", deleteMode === "wrapper_only" ? "bg-indigo-500" : "bg-slate-400")} />
                      <span>Chỉ đối tượng này (Nội dung giữ nguyên)</span>
                    </div>
                    <p className="text-3xs opacity-80 font-normal">
                      Chỉ xóa bỏ khung bọc ngoài, giữ nguyên toàn bộ đối tượng và nội dung bên trong.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playUiSound("click");
                      setDeleteMode("full");
                    }}
                    className={cn(
                      "p-3 rounded-xl border text-xs font-bold flex flex-col gap-1 text-left transition-all cursor-pointer",
                      deleteMode === "full"
                        ? isLight ? "bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-300" : "bg-rose-950/60 border-rose-500 text-rose-200 ring-2 ring-rose-500/50"
                        : isLight ? "bg-white border-slate-200 text-slate-600 hover:bg-slate-100" : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800"
                    )}
                  >
                    <div className="flex items-center gap-1.5 font-black text-xs">
                      <span className={cn("w-2 h-2 rounded-full", deleteMode === "full" ? "bg-rose-500" : "bg-slate-400")} />
                      <span>Xóa toàn bộ</span>
                    </div>
                    <p className="text-3xs opacity-80 font-normal">
                      Xóa sạch đối tượng này cùng tất cả các phần tử con bên trong.
                    </p>
                  </button>
                </div>
              </div>
            )}

            {/* If Add New Action, show title, tag, type controls, and preset select dropdown */}
            {modalActionType === "add" && (
              <div className="space-y-3 bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Tên/Nhãn của đối tượng mới:
                  </label>
                  <input
                    type="text"
                    value={newItemTitle}
                    onChange={(e) => setNewItemTitle(e.target.value)}
                    placeholder="Ví dụ: Thẻ chỉ số kpi, Nút bấm gọi ngay..."
                    className={cn(
                      "w-full px-3 py-2 rounded-xl text-xs font-semibold border focus:outline-none focus:ring-2",
                      isLight ? "bg-white border-slate-300 text-slate-900" : "bg-slate-900 border-slate-700 text-white"
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Thẻ HTML (&lt;tag&gt;):
                    </label>
                    <select
                      value={newItemTag}
                      onChange={(e) => setNewItemTag(e.target.value)}
                      className={cn(
                        "w-full px-3 py-2 rounded-xl border text-xs font-mono font-bold focus:outline-none cursor-pointer",
                        isLight ? "bg-white border-slate-300 text-slate-900" : "bg-slate-900 border-slate-700 text-white"
                      )}
                    >
                      <option value="div">&lt;div&gt; - Khối chứa (Box/Card)</option>
                      <option value="button">&lt;button&gt; - Nút bấm (Button)</option>
                      <option value="h1">&lt;h1&gt; - Tiêu đề chính (Heading H1)</option>
                      <option value="h2">&lt;h2&gt; - Tiêu đề lớn (Heading H2)</option>
                      <option value="h3">&lt;h3&gt; - Tiêu đề (Heading H3)</option>
                      <option value="h4">&lt;h4&gt; - Tiêu đề phụ (Heading H4)</option>
                      <option value="p">&lt;p&gt; - Đoạn văn (Paragraph)</option>
                      <option value="img">&lt;img&gt; - Hình ảnh (Image Media)</option>
                      <option value="a">&lt;a&gt; - Thẻ liên kết (Anchor Link)</option>
                      <option value="span">&lt;span&gt; - Văn bản inline (Inline)</option>
                      <option value="section">&lt;section&gt; - Phân mục (Section)</option>
                      <option value="form">&lt;form&gt; - Biểu mẫu (Form Input)</option>
                      <option value="ul">&lt;ul&gt; - Danh sách (Unordered List)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Loại thành phần:
                    </label>
                    <select
                      value={newItemType}
                      onChange={(e) => setNewItemType(e.target.value)}
                      className={cn(
                        "w-full px-3 py-2 rounded-xl border text-xs font-bold focus:outline-none cursor-pointer",
                        isLight ? "bg-white border-slate-300 text-slate-900" : "bg-slate-900 border-slate-700 text-white"
                      )}
                    >
                      <option value="Thẻ chứa (Card / Box)">Thẻ chứa (Card / Box)</option>
                      <option value="Nút bấm (Button)">Nút bấm (Button)</option>
                      <option value="Tiêu đề (Heading)">Tiêu đề (Heading)</option>
                      <option value="Văn bản (Text)">Văn bản (Text)</option>
                      <option value="Hình ảnh / Icon">Hình ảnh / Icon</option>
                      <option value="Lưới Grid / Flex">Lưới Grid / Flex</option>
                      <option value="Form nhập liệu (Input)">Form nhập liệu (Input)</option>
                      <option value="Badge / Huy hiệu">Badge / Huy hiệu</option>
                      <option value="Trình phát Video">Trình phát Video</option>
                      <option value="Gallery / Bộ sưu tập">Gallery / Bộ sưu tập</option>
                      <option value="Tab Menu điều hướng">Tab Menu điều hướng</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Chọn Mẫu Áp Dụng (Preset) Cho Phần Tử Mới:</span>
                  </label>
                  <select
                    value={addPreset}
                    onChange={(e) => {
                      const val = e.target.value;
                      setAddPreset(val);
                      const tmpl = PRESET_TEMPLATES.find(p => p.id === val);
                      if (tmpl) {
                        setActionDescription(`Bổ sung đối tượng mới [${newItemTitle}] áp dụng mẫu [${tmpl.titleVi}]: ${tmpl.promptSnippet}`);
                      }
                    }}
                    className={cn(
                      "w-full px-3 py-2 rounded-xl border text-xs font-semibold focus:outline-none cursor-pointer",
                      isLight ? "bg-white border-slate-300 text-slate-900" : "bg-slate-900 border-slate-700 text-white"
                    )}
                  >
                    <option value="">-- Chọn Mẫu Áp Dụng (Prompt Preset) --</option>
                    {PRESET_TEMPLATES.map((tmpl) => (
                      <option key={tmpl.id} value={tmpl.id}>
                        {tmpl.label} ({tmpl.shortDesc})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* If Clone Format Action, show style template source selector */}
            {modalActionType === "clone_format" && (
              <div className="space-y-1.5 bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-pink-500" />
                  <span>Mẫu định dạng tham chiếu (Style Reference):</span>
                </label>
                <select
                  value={styleSource}
                  onChange={(e) => setStyleSource(e.target.value)}
                  className={cn(
                    "w-full p-2.5 rounded-xl border text-xs font-bold focus:outline-none",
                    isLight ? "bg-white border-slate-300 text-slate-900" : "bg-slate-900 border-slate-700 text-white"
                  )}
                >
                  <option value="Thẻ Main card dự án">Thẻ Main card dự án (Flat design, bo cong 20px, tiêu đề chữ thường viết hoa đầu, tối giản)</option>
                  <option value="Card 3D Glassmorphism (#education)">Card 3D Glassmorphism (Bo góc 2xl, Nền mờ Kính, Border & Shadow đồng bộ)</option>
                  <option value="Button Gradient Cyberpunk (#home)">Button Gradient Cyberpunk (Hover hiệu ứng Neon, Active Scale 95)</option>
                  <option value="Neumorphism Soft Glow (#systems)">Neumorphism Soft Shadow (Bóng chìm nổi tinh tế, Tương phản cao)</option>
                  <option value="Claymorphic Soft Pill (#projects)">Claymorphic Soft Pill (Bo góc tròn dạng pill 3D ấn tượng)</option>
                  <option value="Minimalist Clean Card (#about)">Minimalist Clean Card (Thiết kế tối giản, đệm thoáng, typography sang trọng)</option>
                  <option value="Bố cục Lưới Flex/Grid Responsive">Bố cục Lưới Flex/Grid Responsive (Căn lề tự động, đệm Rhythm chuẩn)</option>
                  <option value="Bố cục Thẻ Lưới Tối ưu (Optimal Grid Cards)">Bố cục Thẻ Lưới Tối ưu (Optimal Grid Cards: Cột responsive, hover nổi khối)</option>
                  <option value="Bố cục Masonry Linh hoạt (Optimized Masonry Layout)">Bố cục Masonry Linh hoạt (Masonry Grid Layout: Đa chiều tự nhiên, nghệ thuật)</option>
                </select>
              </div>
            )}

            {/* If Move Action, show Target Destination Selector */}
            {modalActionType === "move" && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  Chọn trang/phân mục muốn chuyển tới:
                </label>
                <select
                  value={actionDestination}
                  onChange={(e) => setActionDestination(e.target.value)}
                  className={cn(
                    "w-full p-2.5 rounded-xl border text-xs font-bold focus:outline-none",
                    isLight ? "bg-slate-50 border-slate-300 text-slate-900" : "bg-slate-950 border-slate-700 text-white"
                  )}
                >
                  {DEFAULT_PAGE_STRUCTURE.map((s) => (
                    <option key={s.sectionId} value={s.sectionId}>
                      {s.sectionName} (#{s.sectionId})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Instruction Description Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className={cn(
                  "text-xs font-bold",
                  isLight ? "text-slate-600" : "text-slate-300"
                )}>
                  Mô tả chi tiết yêu cầu:
                </label>
                {actionDescription && (
                  <button
                    type="button"
                    onClick={() => setActionDescription("")}
                    className="text-2xs font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer px-2 py-0.5 rounded bg-rose-500/10"
                  >
                    <X className="w-3 h-3" />
                    <span>Xóa</span>
                  </button>
                )}
              </div>
              <textarea
                value={actionDescription}
                onChange={(e) => setActionDescription(e.target.value)}
                rows={3}
                className={cn(
                  "w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-2 resize-none",
                  isLight
                    ? "bg-slate-50 border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-200"
                    : "bg-slate-950 border-slate-700 text-white focus:border-indigo-500 focus:ring-indigo-900/40"
                )}
                placeholder={
                  modalActionType === "delete" ? "Nhập lý do hoặc yêu cầu tối ưu lại khoảng cách khi xóa..." :
                  modalActionType === "add" ? "Nhập chi tiết về nội dung, màu sắc, icon của đối tượng mới..." :
                  modalActionType === "clone_format" ? "Nhập các thuộc tính muốn áp dụng giống (màu sắc, viền, bóng đổ, font chữ)..." :
                  "Nhập yêu cầu chỉnh sửa, xóa, thêm mới hoặc di chuyển..."
                }
              />
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setModalActionType(null)}
                className={cn(
                  "flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-colors cursor-pointer",
                  isLight ? "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300" : "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700"
                )}
              >
                Hủy
              </button>

              <button
                onClick={handleConfirmAction}
                className={cn(
                  "flex-1 py-2 px-3 rounded-xl text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer",
                  modalActionType === "edit" ? "bg-amber-600 hover:bg-amber-500" :
                  modalActionType === "delete" ? "bg-rose-600 hover:bg-rose-500" :
                  modalActionType === "add" ? "bg-emerald-600 hover:bg-emerald-500" :
                  modalActionType === "clone_format" ? "bg-pink-600 hover:bg-pink-500" : "bg-purple-600 hover:bg-purple-500"
                )}
              >
                Xác nhận & Thêm vào danh sách
              </button>
            </div>
          </div>
        </div>
      )}



      {/* SAVED PROMPTS & CHAT HISTORY LIST MODAL */}
      {showSavedListModal && (
        <div className="fixed inset-0 z-[10010] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className={cn(
            "w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[85vh]",
            isLight ? "bg-white border-slate-200 text-slate-900" : "bg-slate-900 border-slate-700 text-white"
          )}>
            <div className={cn(
              "p-4 px-6 border-b flex flex-wrap items-center justify-between gap-2",
              isLight ? "bg-slate-50 border-slate-200" : "bg-slate-950 border-slate-800"
            )}>
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-500 border border-purple-500/30">
                  <ListPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black tracking-tight flex items-center gap-2">
                    <span>Prompt & Lịch Sử Chat</span>
                  </h3>
                  {/* Tab Switcher Pills */}
                  <div className="flex items-center gap-1.5 mt-1">
                    <button
                      type="button"
                      onClick={() => { playUiSound("click"); setSavedModalTab("saved"); }}
                      className={cn(
                        "px-2.5 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                        savedModalTab === "saved"
                          ? "bg-purple-600 text-white shadow-xs"
                          : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                      )}
                    >
                      Prompt Đã Lưu ({savedPrompts.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => { playUiSound("click"); setSavedModalTab("history"); }}
                      className={cn(
                        "px-2.5 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1",
                        savedModalTab === "history"
                          ? "bg-purple-600 text-white shadow-xs"
                          : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                      )}
                    >
                      <Terminal className="w-3 h-3 text-amber-400" />
                      <span>Lịch Sử Chat ({chatHistory.length})</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {savedModalTab === "saved" && savedPrompts.length > 0 && (
                  <>
                    <button
                      onClick={handleCopyAllSavedPrompts}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
                      title="Sao chép toàn bộ danh sách prompt vào clipboard"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Sao Chép Tất Cả</span>
                    </button>
                    <button
                      onClick={handleClearAllSavedPrompts}
                      className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                      title="Xóa tất cả các prompt trong danh sách"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Xóa Tất Cả</span>
                    </button>
                  </>
                )}
                {savedModalTab === "history" && chatHistory.length > 0 && (
                  <button
                    onClick={() => {
                      playUiSound("click");
                      setChatHistory([]);
                      try { localStorage.removeItem("xray_chat_history"); } catch {}
                      showToast("Đã xóa lịch sử chat!");
                    }}
                    className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Xóa Lịch Sử</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    setShowSavedListModal(false);
                    setConfirmClearAll(false);
                  }}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Đóng cửa sổ"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Notification Toast */}
            {toastMessage && (
              <div className="px-6 py-2.5 bg-emerald-500/15 border-b border-emerald-500/30 text-emerald-600 dark:text-emerald-300 text-xs font-bold flex items-center justify-between animate-fadeIn">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{toastMessage}</span>
                </div>
                <button
                  onClick={() => setToastMessage(null)}
                  className="text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-200 p-0.5 rounded cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Inline Confirmation for Clear All */}
            {confirmClearAll && (
              <div className={cn(
                "px-6 py-3 border-b flex flex-wrap items-center justify-between gap-3 animate-fadeIn",
                isLight ? "bg-rose-50 border-rose-200" : "bg-rose-950/20 border-rose-500/30"
              )}>
                <div className={cn(
                  "flex items-center gap-2 text-xs font-bold",
                  isLight ? "text-rose-700" : "text-rose-300"
                )}>
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Bạn có chắc chắn muốn xóa toàn bộ {savedPrompts.length} prompt đã lưu không?</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExecuteClearAll}
                    className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                  >
                    Xác Nhận Xóa Hết
                  </button>
                  <button
                    onClick={() => setConfirmClearAll(false)}
                    className={cn(
                      "px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer border",
                      isLight ? "bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300" : "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700"
                    )}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            )}

            <div className="p-4 space-y-3 overflow-y-auto max-h-[60vh] custom-scrollbar">
              {savedModalTab === "saved" ? (
                savedPrompts.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                      <ListPlus className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold text-slate-600 dark:text-slate-400">Chưa có prompt nào được lưu.</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                      Hãy tạo prompt trong X-Ray và nhấn "Lưu vào danh sách" để lưu lại tại đây!
                    </p>
                  </div>
                ) : (
                  savedPrompts.map((item) => (
                    <div
                      key={item.id}
                      className={cn(
                        "p-3.5 rounded-2xl border space-y-2 transition-all",
                        isLight ? "bg-slate-50 border-slate-200" : "bg-slate-950 border-slate-800"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-purple-600 dark:text-purple-400">
                            {item.title}
                          </span>
                          {item.presetName && (
                            <span className="px-2 py-0.5 rounded-full text-3xs font-bold bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30">
                              {item.presetName}
                            </span>
                          )}
                        </div>
                        <span className="text-3xs text-slate-500 font-mono">{item.time}</span>
                      </div>

                      <pre className={cn(
                        "p-2.5 rounded-xl text-2xs font-mono max-h-28 overflow-y-auto custom-scrollbar border",
                        isLight ? "bg-white text-slate-800 border-slate-200" : "bg-slate-900 text-slate-200 border-slate-800"
                      )}>
                        {item.prompt}
                      </pre>

                      <div className="flex items-center justify-end gap-2 pt-1">
                        <button
                          onClick={() => {
                            playUiSound("success");
                            navigator.clipboard.writeText(item.prompt);
                            setCopiedPromptId(item.id);
                            showToast("Đã sao chép prompt vào clipboard!");
                            setTimeout(() => setCopiedPromptId(null), 2500);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1 transition-all shadow-xs cursor-pointer"
                        >
                          {copiedPromptId === item.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedPromptId === item.id ? "Đã chép" : "Sao chép"}</span>
                        </button>

                        <button
                          onClick={() => handleDeleteSavedPrompt(item.id)}
                          className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Xóa</span>
                        </button>
                      </div>
                    </div>
                  ))
                )
              ) : (
                /* TAB 2: CHAT HISTORY */
                chatHistory.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                      <Terminal className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold text-slate-600 dark:text-slate-400">Chưa có bản ghi lịch sử chat nào.</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                      Khi bạn bấm "Sao Chép Tất Cả", các câu lệnh sẽ tự động được gom nhóm theo thời gian & trang và lưu lại tại đây!
                    </p>
                  </div>
                ) : (
                  chatHistory.map((hist) => (
                    <div
                      key={hist.id}
                      className={cn(
                        "p-3.5 rounded-2xl border space-y-2 transition-all",
                        isLight ? "bg-slate-50 border-slate-200" : "bg-slate-950 border-slate-800"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            <span>Bản ghi gom nhóm ({hist.uniqueTasksCount} tác vụ, {hist.itemCount} lệnh gốc)</span>
                          </span>
                        </div>
                        <span className="text-3xs text-slate-500 font-mono">{hist.time}</span>
                      </div>

                      {/* Grouped Tasks Tags */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {hist.groupedTasks.map((t, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-lg text-3xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
                            {t.title} ({t.promptCount} lệnh)
                          </span>
                        ))}
                      </div>

                      <pre className={cn(
                        "p-2.5 rounded-xl text-2xs font-mono max-h-36 overflow-y-auto custom-scrollbar border whitespace-pre-wrap",
                        isLight ? "bg-white text-slate-800 border-slate-200" : "bg-slate-900 text-slate-200 border-slate-800"
                      )}>
                        {hist.content}
                      </pre>

                      <div className="flex items-center justify-end gap-2 pt-1">
                        <button
                          onClick={() => {
                            playUiSound("success");
                            navigator.clipboard.writeText(hist.content);
                            showToast("Đã sao chép nội dung lịch sử chat vào clipboard!");
                          }}
                          className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1 transition-all shadow-xs cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Sao Chép Lại</span>
                        </button>
                      </div>
                    </div>
                  ))
                )
              )}
            </div>

            <div className={cn(
              "p-3 px-5 border-t flex items-center justify-between text-xs",
              isLight ? "bg-slate-50 border-slate-200" : "bg-slate-950 border-slate-800"
            )}>
              <div className="flex items-center gap-3">
                <span className="text-slate-500">
                  {savedModalTab === "saved" ? `Tổng số: ${savedPrompts.length} prompt` : `Tổng số: ${chatHistory.length} lịch sử chat`}
                </span>
                {savedModalTab === "saved" && savedPrompts.length > 0 && (
                  <button
                    onClick={handleCopyAllSavedPrompts}
                    className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Sao chép tất cả</span>
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setShowSavedListModal(false);
                    setConfirmClearAll(false);
                  }}
                  className={cn(
                    "px-4 py-1.5 rounded-xl font-bold transition-colors cursor-pointer border",
                    isLight ? "bg-slate-200 hover:bg-slate-300 text-slate-800 border-slate-300" : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
                  )}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
