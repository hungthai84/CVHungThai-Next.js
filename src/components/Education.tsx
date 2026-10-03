import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { 
  BookOpen, 
  Sparkles, 
  Search, 
  Book, 
  LayoutGrid, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Eye, 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Bookmark, 
  Building2, 
  Crosshair, 
  ListOrdered, 
  Award, 
  FileText, 
  Layers, 
  SlidersHorizontal,
  FolderOpen,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  GraduationCap,
  Calendar,
  Check,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Tag,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { EDUCATION_BOOKS_DATA, EducationBook } from "../data/educationData";
import { PageCardHeader } from "./PageCardHeader";
import { cn } from "../lib/utils";

const PAGE_TITLES_VI = [
  "Bìa trước (Tổng quan)",
  "Trang 1: Trọng tâm chuyên môn",
  "Trang 2: Danh mục môn học",
  "Trang 3: Kết quả đạt được",
  "Trang 4: Văn bằng & Chứng chỉ"
];

const PAGE_TITLES_EN = [
  "Front Cover (Overview)",
  "Page 1: Specialization Focus",
  "Page 2: Course Modules",
  "Page 3: Achieved Outcomes",
  "Page 4: Diplomas & Certificates"
];

const CATEGORY_TABS = [
  { id: "all", labelVi: "Tất cả", labelEn: "All" },
  { id: "tech", labelVi: "Công nghệ & CNTT", labelEn: "Tech & IT" },
  { id: "management", labelVi: "Quản trị & Rủi ro", labelEn: "Management & Risk" },
  { id: "skills", labelVi: "Kỹ năng mềm & Đào tạo", labelEn: "Soft Skills & Training" },
  { id: "network", labelVi: "Hạ tầng Mạng CCNA/MCSA", labelEn: "Network Infrastructure" }
];

export default function Education() {
  const { lang } = useLanguage();
  const isVi = lang === "vi";
  const { theme } = useTheme();

  // Filter & Search states - Default to uniform cards grid view
  const [currentFilter, setCurrentFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "shelf">("grid");

  // Book flipping state for 3D shelf view: bookId -> currentPage (0 to 4)
  const [bookStates, setBookStates] = useState<Record<number, number>>(() => {
    const initial: Record<number, number> = {};
    EDUCATION_BOOKS_DATA.forEach(b => {
      initial[b.id] = 0;
    });
    return initial;
  });

  // Modal State for Certificate preview & Zoom level
  const [activeCertBook, setActiveCertBook] = useState<EducationBook | null>(null);
  const [certZoomScale, setCertZoomScale] = useState<number>(1);
  const [certRotation, setCertRotation] = useState<number>(0);

  // Modal State for Reader View (Flat clean multi-tab view)
  const [activeReaderBook, setActiveReaderBook] = useState<EducationBook | null>(null);
  const [readerActiveTab, setReaderActiveTab] = useState<number>(0);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Shelf horizontal scroll container ref
  const shelfRef = useRef<HTMLDivElement | null>(null);

  // Sound generator using Web Audio API
  const safePlay = useCallback((type: "click" | "flip" | "close" | "zoom") => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === "flip") {
        const bufferSize = Math.floor(ctx.sampleRate * 0.22);
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
        }
        const noiseNode = ctx.createBufferSource();
        noiseNode.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(950, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.2);
        filter.Q.setValueAtTime(1.8, ctx.currentTime);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        noiseNode.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noiseNode.start();
        noiseNode.stop(ctx.currentTime + 0.22);
      } else if (type === "click") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(750, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.06);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.06);
      } else if (type === "zoom") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === "close") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(350, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      }
    } catch {
      // Audio context silently handled
    }
  }, []);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  }, []);

  // Filter counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: EDUCATION_BOOKS_DATA.length };
    EDUCATION_BOOKS_DATA.forEach(b => {
      counts[b.category] = (counts[b.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered books
  const filteredBooks = useMemo(() => {
    return EDUCATION_BOOKS_DATA.filter(b => {
      const matchCat = currentFilter === "all" || b.category === currentFilter;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchCat;
      const matchText = 
        b.title.toLowerCase().includes(q) ||
        b.desc.toLowerCase().includes(q) ||
        b.org.toLowerCase().includes(q) ||
        b.code.toLowerCase().includes(q) ||
        b.focus.toLowerCase().includes(q) ||
        b.year.toLowerCase().includes(q) ||
        b.modules.some(m => m.toLowerCase().includes(q));
      return matchCat && matchText;
    });
  }, [currentFilter, searchQuery]);

  // Center a book in the shelf container when opened
  const centerBookInShelf = useCallback((bookId: number) => {
    if (viewMode === "grid" || !shelfRef.current) return;
    setTimeout(() => {
      const shelf = shelfRef.current;
      if (!shelf) return;
      const el = document.getElementById(`edu-book-item-${bookId}`);
      if (!el) return;
      const shelfRect = shelf.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const currentScroll = shelf.scrollLeft;
      const targetLeft = currentScroll + (elRect.left - shelfRect.left) - (shelf.clientWidth / 2) + (el.offsetWidth / 2);
      shelf.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: "smooth"
      });
    }, 80);
  }, [viewMode]);

  // Flip book forward
  const flipBookToNext = useCallback((bookId: number) => {
    safePlay("flip");
    setBookStates(prev => {
      const current = prev[bookId] || 0;
      const next = current >= 4 ? 0 : current + 1;
      
      const updated: Record<number, number> = {};
      EDUCATION_BOOKS_DATA.forEach(b => {
        if (b.id === bookId) {
          updated[b.id] = next;
        } else {
          updated[b.id] = 0;
        }
      });
      return updated;
    });

    const book = EDUCATION_BOOKS_DATA.find(b => b.id === bookId);
    if (book) {
      const current = bookStates[bookId] || 0;
      const next = current >= 4 ? 0 : current + 1;
      const pageNames = isVi ? PAGE_TITLES_VI : PAGE_TITLES_EN;
      showToast(`${book.code} ${book.title}: ${pageNames[next]}`);
    }
    centerBookInShelf(bookId);
  }, [bookStates, centerBookInShelf, isVi, safePlay, showToast]);

  // Jump book directly to specific page (0 to 4)
  const jumpBookToPage = useCallback((bookId: number, targetPage: number) => {
    safePlay("flip");
    setBookStates(prev => {
      const updated: Record<number, number> = {};
      EDUCATION_BOOKS_DATA.forEach(b => {
        if (b.id === bookId) {
          updated[b.id] = targetPage;
        } else {
          updated[b.id] = 0;
        }
      });
      return updated;
    });

    const book = EDUCATION_BOOKS_DATA.find(b => b.id === bookId);
    if (book) {
      const pageNames = isVi ? PAGE_TITLES_VI : PAGE_TITLES_EN;
      showToast(`${book.code} ${book.title}: ${pageNames[targetPage]}`);
    }
    centerBookInShelf(bookId);
  }, [centerBookInShelf, isVi, safePlay, showToast]);

  // Flip book backward
  const flipBookToPrev = useCallback((bookId: number) => {
    safePlay("flip");
    setBookStates(prev => {
      const current = prev[bookId] || 0;
      const next = current <= 1 ? 0 : current - 1;
      return {
        ...prev,
        [bookId]: next
      };
    });

    const book = EDUCATION_BOOKS_DATA.find(b => b.id === bookId);
    if (book) {
      const current = bookStates[bookId] || 0;
      const next = current <= 1 ? 0 : current - 1;
      const pageNames = isVi ? PAGE_TITLES_VI : PAGE_TITLES_EN;
      showToast(`${book.code} ${book.title}: ${pageNames[next]}`);
    }
  }, [bookStates, isVi, safePlay, showToast]);

  // Reset book back to cover
  const resetBook = useCallback((bookId: number) => {
    safePlay("close");
    setBookStates(prev => ({
      ...prev,
      [bookId]: 0
    }));
    showToast(isVi ? "Đã gấp sách lại về bìa ngoài" : "Closed book back to cover");
  }, [isVi, safePlay, showToast]);

  // Close all opened books
  const closeAllBooks = useCallback(() => {
    safePlay("close");
    setBookStates(() => {
      const reset: Record<number, number> = {};
      EDUCATION_BOOKS_DATA.forEach(b => {
        reset[b.id] = 0;
      });
      return reset;
    });
    showToast(isVi ? "Đã gấp toàn bộ sách trên kệ" : "Closed all books on shelf");
  }, [isVi, safePlay, showToast]);

  // Scroll shelf left/right
  const scrollShelf = useCallback((direction: "left" | "right") => {
    safePlay("click");
    if (!shelfRef.current) return;
    const distance = direction === "left" ? -380 : 380;
    shelfRef.current.scrollBy({ left: distance, behavior: "smooth" });
  }, [safePlay]);

  // Open cert modal
  const openCertModal = useCallback((book: EducationBook) => {
    safePlay("zoom");
    setActiveCertBook(book);
    setCertZoomScale(1);
    setCertRotation(0);
  }, [safePlay]);

  // Open full reader modal
  const openReaderModal = useCallback((book: EducationBook, startTab: number = 0) => {
    safePlay("click");
    setActiveReaderBook(book);
    setReaderActiveTab(startTab);
  }, [safePlay]);

  return (
    <section 
      id="education" 
      className="relative w-full h-auto overflow-hidden flex flex-col justify-start items-stretch p-[15px] gap-[15px] max-w-7xl mx-auto font-sans text-slate-800 dark:text-slate-100 transition-colors duration-500 select-none"
    >
      {/* 1. Header component containing Search, Close Books, and View Mode controls */}
      <PageCardHeader pageId="education">
        <div className="w-full flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Left: Real-time search */}
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isVi ? "Tìm khóa học, trường đào tạo, kỹ năng, năm..." : "Search courses, institutions, skills, year..."}
              className="w-full bg-slate-100/90 dark:bg-slate-800/90 text-xs text-slate-900 dark:text-white placeholder-slate-400 rounded-xl pl-9 pr-8 py-2 border border-slate-200/80 dark:border-white/10 focus:outline-none focus:border-orange-500 transition shadow-inner font-medium"
            />
            {searchQuery && (
              <button 
                type="button" 
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right: Quick actions (Chế độ xem & Gấp sách) */}
          <div className="flex items-center gap-2">
            {/* Toggle View button (Grid vs 3D Shelf) */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-white/10 shadow-2xs">
              <button 
                type="button"
                onClick={() => {
                  safePlay("click");
                  setViewMode("grid");
                }}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                  viewMode === "grid"
                    ? "bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
                title={isVi ? "Dạng lưới thẻ đồng nhất (Grid Layout)" : "Uniform Cards Grid View"}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>{isVi ? "Dạng lưới thẻ" : "Cards Grid"}</span>
              </button>

              <button 
                type="button"
                onClick={() => {
                  safePlay("click");
                  setViewMode("shelf");
                }}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                  viewMode === "shelf"
                    ? "bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
                title={isVi ? "Kệ sách 3D tương tác (3D Flip Book)" : "3D Flip Books Shelf"}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{isVi ? "Kệ sách 3D" : "3D Shelf"}</span>
              </button>
            </div>

            {viewMode === "shelf" && (
              <button 
                type="button"
                onClick={closeAllBooks}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/90 dark:bg-slate-800/90 hover:border-orange-500/50 text-xs text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-white/10 transition shadow-2xs font-bold cursor-pointer active:scale-95"
                title={isVi ? "Gấp toàn bộ sách lại" : "Close all open books"}
              >
                <Book className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">{isVi ? "Gấp sách" : "Fold"}</span>
              </button>
            )}
          </div>
        </div>
      </PageCardHeader>

      {/* 2. Executive Education Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-[15px]">
        <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block truncate">{isVi ? "Tổng số văn bằng" : "Total Credentials"}</span>
            <span className="text-base font-black text-slate-900 dark:text-white font-mono">14 {isVi ? "chứng chỉ" : "certs"}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block truncate">{isVi ? "Hành trình đào tạo" : "Learning Journey"}</span>
            <span className="text-base font-black text-emerald-600 dark:text-emerald-400 font-mono">2002 – 2026</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block truncate">{isVi ? "Lĩnh vực chuyên môn" : "Core Disciplines"}</span>
            <span className="text-base font-black text-amber-600 dark:text-amber-400 font-mono">4 {isVi ? "nhánh chính" : "pillars"}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block truncate">{isVi ? "Đơn vị quốc tế" : "Accredited Issuers"}</span>
            <span className="text-base font-black text-purple-600 dark:text-purple-400 font-mono">100% {isVi ? "xác thực" : "verified"}</span>
          </div>
        </div>
      </div>

      {/* 3. Filter Category Tabs */}
      <div className="w-full flex items-center justify-between gap-3 overflow-x-auto no-scrollbar pb-1">
        <div className="flex items-center gap-2 shrink-0">
          {CATEGORY_TABS.map(tab => {
            const isActive = currentFilter === tab.id;
            const count = categoryCounts[tab.id] || 0;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  safePlay("click");
                  setCurrentFilter(tab.id);
                }}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs whitespace-nowrap flex items-center gap-1.5 cursor-pointer",
                  isActive 
                    ? "bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md shadow-red-900/20" 
                    : "bg-white/70 dark:bg-slate-900/70 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <span>{isVi ? tab.labelVi : tab.labelEn}</span>
                <span className={cn(
                  "px-1.5 py-0.2 rounded-md font-mono text-[10px]",
                  isActive ? "bg-white/25 text-white" : "bg-slate-200/70 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                )}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Shelf scroll arrows (Only in Shelf View) */}
        {viewMode === "shelf" && (
          <div className="hidden sm:flex items-center gap-1.5 shrink-0 ml-auto">
            <button 
              type="button"
              onClick={() => scrollShelf("left")}
              className="w-7 h-7 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 flex items-center justify-center hover:bg-orange-500 hover:text-white transition shadow-2xs text-slate-700 dark:text-slate-200 cursor-pointer"
              title={isVi ? "Cuộn sang trái" : "Scroll left"}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              type="button"
              onClick={() => scrollShelf("right")}
              className="w-7 h-7 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 flex items-center justify-center hover:bg-orange-500 hover:text-white transition shadow-2xs text-slate-700 dark:text-slate-200 cursor-pointer"
              title={isVi ? "Cuộn sang phải" : "Scroll right"}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* 4. Main Showcase: Responsive Uniform Cards Grid (gap 15px) or 3D Shelf */}
      <div className="w-full relative min-h-[560px]">
        {filteredBooks.length === 0 ? (
          <div className="py-20 w-full text-center text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-900/50 rounded-3xl border border-slate-200/60 dark:border-white/10 backdrop-blur-md">
            <BookOpen className="w-12 h-12 mx-auto mb-3 text-amber-500/60" />
            <p className="text-sm font-semibold">
              {isVi ? "Không tìm thấy khóa học hoặc trường đào tạo phù hợp." : "No matching courses or training institutions found."}
            </p>
          </div>
        ) : viewMode === "grid" ? (
          /* ========================================================================= */
          /* UNIFORM RESPONSIVE CARDS GRID (EQUAL HEIGHT & GAP 15PX)                    */
          /* ========================================================================= */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px]">
            {filteredBooks.map((book) => {
              const themeStyle = book.theme;

              return (
                <div 
                  key={book.id}
                  className="group relative flex flex-col justify-between rounded-3xl p-5 sm:p-5.5 bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 h-full text-left overflow-hidden"
                  style={{
                    borderColor: `${themeStyle.color}35`,
                  }}
                >
                  {/* Subtle Top Gradient Accent Line */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1.5"
                    style={{ background: themeStyle.gradient }}
                  />

                  {/* TOP CARD SECTION: Header & Title & Summary */}
                  <div className="space-y-3.5">
                    {/* Badge Row */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span 
                          className="px-2.5 py-1 rounded-xl text-[11px] font-mono font-black uppercase tracking-wider flex items-center gap-1 shadow-2xs"
                          style={{ backgroundColor: themeStyle.bgSoft, color: themeStyle.color }}
                        >
                          <Bookmark className="w-3 h-3" />
                          {book.code}
                        </span>

                        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60">
                          {isVi ? `Năm ${book.year}` : `Year ${book.year}`}
                        </span>
                      </div>

                      <span className="text-[10.5px] font-semibold px-2 py-0.5 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 truncate max-w-[130px]">
                        {book.format}
                      </span>
                    </div>

                    {/* Title & Institution */}
                    <div>
                      <h3 
                        className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug font-play group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-1"
                        title={book.title}
                      >
                        {book.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 font-semibold mt-1">
                        <Building2 className="w-3.5 h-3.5 shrink-0" style={{ color: themeStyle.color }} />
                        <span className="truncate">{book.org}</span>
                      </div>
                    </div>

                    {/* Thumbnail Banner with Quick View Action */}
                    <div 
                      onClick={() => openReaderModal(book, 0)}
                      className="w-full h-36 sm:h-40 rounded-2xl overflow-hidden relative shadow-inner group/img cursor-pointer bg-slate-950 border border-slate-200/60 dark:border-white/10"
                    >
                      <img 
                        src={book.bannerImg} 
                        alt={book.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-end justify-between p-3">
                        <span className="text-[10px] font-mono font-bold text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/20">
                          {book.certCode}
                        </span>

                        <span className="text-[11px] font-bold text-white flex items-center gap-1 bg-blue-600/80 hover:bg-blue-600 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-xs transition-colors">
                          <Eye className="w-3 h-3" /> {isVi ? "Xem chi tiết" : "View"}
                        </span>
                      </div>
                    </div>

                    {/* Clear Summary Content Block (Nội dung tóm tắt rõ ràng) */}
                    <div className="p-3 rounded-2xl bg-slate-50/90 dark:bg-slate-800/60 border border-slate-200/70 dark:border-white/5 space-y-1.5">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                        <Crosshair className="w-3 h-3" style={{ color: themeStyle.color }} />
                        {isVi ? "Trọng tâm & Tóm tắt đào tạo:" : "Specialization Summary:"}
                      </span>
                      <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed line-clamp-2">
                        {book.focus || book.desc}
                      </p>
                    </div>

                    {/* Module Tags Pills (Key Modules) */}
                    <div className="space-y-1">
                      <div className="flex flex-wrap gap-1.5 max-h-[58px] overflow-hidden">
                        {book.modules.slice(0, 3).map((mod, mIdx) => (
                          <span 
                            key={mIdx}
                            className="text-[10.5px] px-2 py-0.5 rounded-lg bg-white/90 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/5 font-medium truncate max-w-full"
                          >
                            • {mod}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM ACTION SECTION: Interactive Controls */}
                  <div className="pt-3.5 mt-3.5 border-t border-slate-200/70 dark:border-white/10 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => openCertModal(book)}
                      className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 flex items-center gap-1.5 transition-colors cursor-pointer py-1"
                    >
                      <Award className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{isVi ? "Văn bằng gốc" : "Diploma"}</span>
                    </button>

                    <button 
                      type="button"
                      onClick={() => openReaderModal(book, 0)}
                      className="px-3.5 py-1.5 rounded-xl font-bold text-xs text-white flex items-center gap-1.5 transition-all duration-200 hover:brightness-110 active:scale-95 shadow-xs cursor-pointer shrink-0"
                      style={{ background: themeStyle.gradient, boxShadow: `0 2px 8px ${themeStyle.glow}` }}
                    >
                      <span>{isVi ? "Đọc học phần" : "Details"}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ========================================================================= */
          /* 3D SHELF VIEW (Overlapping 3D Flip Books)                                 */
          /* ========================================================================= */
          <div 
            ref={shelfRef}
            className="w-full flex py-8 px-4 sm:px-12 md:px-24 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory relative z-10"
            style={{ perspective: "1800px" }}
          >
            {filteredBooks.map((book, idx) => {
              const currentPage = bookStates[book.id] || 0;
              const isOpened = currentPage > 0;
              const isLeaf1Flipped = currentPage >= 1;
              const isLeaf2Flipped = currentPage >= 3;
              const themeStyle = book.theme;

              return (
                <div 
                  key={book.id}
                  id={`edu-book-item-${book.id}`}
                  className={cn(
                    "relative w-[340px] min-w-[325px] sm:w-[360px] sm:min-w-[350px] h-[525px] snap-start transition-all duration-400 ease-out cursor-pointer group/book shrink-0",
                    idx > 0 && "md:-ml-[125px]",
                    isOpened ? "z-40 -translate-y-3 scale-[1.02]" : "hover:-translate-y-2.5 hover:rotate-[-2deg] hover:z-30"
                  )}
                  style={{ perspective: "1600px" }}
                  onClick={() => flipBookToNext(book.id)}
                  title={isVi ? "Nhấp vào cuốn sách để lật trang" : "Click book to flip page"}
                >
                  <div className="relative w-full h-full rounded-2xl shadow-xl" style={{ transformStyle: "preserve-3d" }}>
                    
                    {/* Spine */}
                    <div 
                      className="absolute top-0 left-0 w-2 h-full rounded-l-md z-40 shadow-md"
                      style={{ 
                        background: themeStyle.spine,
                        boxShadow: `1px 0 8px ${themeStyle.glow}` 
                      }}
                    />

                    {/* BASE: Page 4 (Certificate) */}
                    <div 
                      className="absolute inset-[4px] rounded-r-2xl bg-white/95 dark:bg-slate-950/95 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-lg z-0 overflow-hidden"
                      style={{ borderColor: themeStyle.border }}
                    >
                      <div className="h-full flex flex-col justify-between select-none text-left p-4 sm:p-5 relative">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-white/10 text-xs font-mono">
                          <span className="font-black uppercase tracking-wider text-[11px]" style={{ color: themeStyle.color }}>
                            {book.code} • {isVi ? "Trang 4/4 (Chứng chỉ)" : "Page 4/4 (Certificate)"}
                          </span>
                          <span className="text-xs font-mono font-bold text-slate-500">{book.year}</span>
                        </div>

                        <div className="my-auto space-y-2">
                          <div 
                            onClick={(e) => {
                              e.stopPropagation();
                              openCertModal(book);
                            }}
                            className="w-full h-44 sm:h-48 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 dark:border-white/10 relative group cursor-zoom-in shadow-md"
                          >
                            <img 
                              src={book.certImg} 
                              alt={book.title} 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-xs">
                              <span className="px-3 py-1.5 rounded-xl bg-white/90 text-slate-900 text-xs font-bold flex items-center gap-1.5 shadow-lg">
                                <Eye className="w-3.5 h-3.5 text-blue-600" /> {isVi ? "Phóng to chứng chỉ" : "Enlarge Certificate"}
                              </span>
                            </div>
                          </div>

                          <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center font-medium">
                            {isVi ? `Được cấp bởi ${book.org}` : `Issued by ${book.org}`}
                          </p>
                        </div>

                        <div className="pt-2.5 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs">
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              flipBookToPrev(book.id);
                            }}
                            className="text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center gap-1 font-bold transition cursor-pointer"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                            <span>{isVi ? "Trang 3" : "Page 3"}</span>
                          </button>

                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              resetBook(book.id);
                            }}
                            className="text-rose-500 hover:text-rose-600 flex items-center gap-1 font-bold transition cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>{isVi ? "Gấp sách" : "Close"}</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* LEAF 2: Front (Page 2) & Back (Page 3) */}
                    <div 
                      className="absolute top-[4px] bottom-[4px] right-[4px] left-[6px] rounded-r-2xl transition-transform duration-700 origin-left"
                      style={{ 
                        transformStyle: "preserve-3d",
                        transform: `rotateY(${isLeaf2Flipped ? -180 : 0}deg)`,
                        zIndex: isLeaf2Flipped ? 2 : 10
                      }}
                    >
                      {/* Leaf 2 Front: Page 2 */}
                      <div 
                        className="absolute inset-0 rounded-r-2xl bg-white/95 dark:bg-slate-950/95 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-md overflow-hidden p-4 sm:p-5 flex flex-col justify-between text-left"
                        style={{ backfaceVisibility: "hidden", borderColor: themeStyle.border }}
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-white/10 text-xs font-mono">
                          <span className="font-black uppercase tracking-wider text-[11px]" style={{ color: themeStyle.color }}>
                            {book.code} • {isVi ? "Trang 2/4" : "Page 2/4"}
                          </span>
                        </div>

                        <div className="my-auto space-y-2 overflow-y-auto no-scrollbar py-1">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
                            <ListOrdered className="w-3 h-3" /> {isVi ? "Học phần & Chuyên đề đào tạo" : "Modules & Topics"}
                          </span>
                          <div className="space-y-1.5">
                            {book.modules.map((mod, mIdx) => (
                              <div 
                                key={mIdx}
                                className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-white/5 flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200"
                              >
                                <span 
                                  className="w-5 h-5 rounded-lg flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5"
                                  style={{ backgroundColor: themeStyle.bgSoft, color: themeStyle.color }}
                                >
                                  0{mIdx + 1}
                                </span>
                                <span className="font-medium leading-snug">{mod}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2.5 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs">
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              flipBookToPrev(book.id);
                            }}
                            className="text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center gap-1 font-bold transition cursor-pointer"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                            <span>{isVi ? "Trang 1" : "Page 1"}</span>
                          </button>
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              flipBookToNext(book.id);
                            }}
                            className="px-3 py-1.5 rounded-xl font-bold text-xs text-white flex items-center gap-1 transition shadow-sm cursor-pointer"
                            style={{ background: themeStyle.gradient }}
                          >
                            <span>{isVi ? "Kết quả" : "Outcomes"}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Leaf 2 Back: Page 3 */}
                      <div 
                        className="absolute inset-0 rounded-l-2xl bg-white/95 dark:bg-slate-950/95 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-md overflow-hidden p-4 sm:p-5 flex flex-col justify-between text-left"
                        style={{ 
                          backfaceVisibility: "hidden", 
                          transform: "rotateY(180deg)",
                          borderColor: themeStyle.border 
                        }}
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-white/10 text-xs font-mono">
                          <span className="font-black uppercase tracking-wider text-[11px]" style={{ color: themeStyle.color }}>
                            {book.code} • {isVi ? "Trang 3/4" : "Page 3/4"}
                          </span>
                        </div>

                        <div className="my-auto space-y-3 overflow-y-auto no-scrollbar py-1">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" /> {isVi ? "Năng lực & Kết quả thực tiễn" : "Competencies"}
                          </span>
                          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                            {book.outcome}
                          </div>
                        </div>

                        <div className="pt-2.5 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs">
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              flipBookToPrev(book.id);
                            }}
                            className="text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center gap-1 font-bold transition cursor-pointer"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                            <span>{isVi ? "Môn học" : "Modules"}</span>
                          </button>
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              flipBookToNext(book.id);
                            }}
                            className="px-3 py-1.5 rounded-xl font-bold text-xs text-white flex items-center gap-1 transition shadow-sm cursor-pointer"
                            style={{ background: themeStyle.gradient }}
                          >
                            <span>{isVi ? "Xem bằng" : "Diploma"}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* LEAF 1: Front (Page 0 Cover) & Back (Page 1 Focus) */}
                    <div 
                      className="absolute top-[4px] bottom-[4px] right-[4px] left-[6px] rounded-r-2xl transition-transform duration-700 origin-left"
                      style={{ 
                        transformStyle: "preserve-3d",
                        transform: `rotateY(${isLeaf1Flipped ? -180 : 0}deg)`,
                        zIndex: isLeaf1Flipped ? 1 : 20
                      }}
                    >
                      {/* Leaf 1 Front: Page 0 */}
                      <div 
                        className="absolute inset-0 rounded-r-2xl bg-white/95 dark:bg-slate-950/95 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xl overflow-hidden p-4 sm:p-5 flex flex-col justify-between text-left"
                        style={{ backfaceVisibility: "hidden", borderColor: themeStyle.border }}
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs mb-2">
                            <span className="text-xs font-mono font-black uppercase tracking-wider flex items-center gap-1" style={{ color: themeStyle.color }}>
                              <Bookmark className="w-3.5 h-3.5" /> {book.code}
                            </span>
                            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full font-bold shadow-2xs border backdrop-blur-md bg-white/80 dark:bg-slate-900/80">
                              {isVi ? `Năm ${book.year}` : `Year ${book.year}`}
                            </span>
                          </div>
                          
                          <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug line-clamp-1 font-play">
                            {book.title}
                          </h3>
                          
                          <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold truncate flex items-center gap-1.5 mt-0.5">
                            <Building2 className="w-3.5 h-3.5 shrink-0" style={{ color: themeStyle.color }} />
                            <span className="truncate">{book.org}</span>
                          </p>
                        </div>

                        <div className="w-full h-40 sm:h-44 rounded-2xl overflow-hidden my-2 relative shadow-md group bg-slate-950 border border-white/10">
                          <img src={book.bannerImg} alt={book.title} className="w-full h-full object-cover" />
                          <div className="absolute bottom-2 left-2 text-[11px] bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg font-mono font-bold text-white border border-white/20">
                            {book.format}
                          </div>
                        </div>

                        <p className="text-xs text-slate-700 dark:text-slate-200 line-clamp-3 leading-relaxed font-medium">
                          {book.desc}
                        </p>

                        <div className="pt-2.5 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs">
                          <span className="font-mono font-bold text-[11px]" style={{ color: themeStyle.color }}>
                            {book.certCode}
                          </span>
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              flipBookToNext(book.id);
                            }}
                            className="px-3.5 py-1.5 rounded-xl font-bold text-xs text-white flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                            style={{ background: themeStyle.gradient }}
                          >
                            <span>{isVi ? "Mở sách" : "Open"}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Leaf 1 Back: Page 1 */}
                      <div 
                        className="absolute inset-0 rounded-l-2xl bg-white/95 dark:bg-slate-950/95 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xl overflow-hidden p-4 sm:p-5 flex flex-col justify-between text-left"
                        style={{ 
                          backfaceVisibility: "hidden", 
                          transform: "rotateY(180deg)",
                          borderColor: themeStyle.border 
                        }}
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-white/10 text-xs font-mono">
                          <span className="font-black uppercase tracking-wider text-[11px]" style={{ color: themeStyle.color }}>
                            {book.code} • {isVi ? "Trang 1/4" : "Page 1/4"}
                          </span>
                        </div>

                        <div className="space-y-3.5 my-auto overflow-y-auto no-scrollbar pr-0.5">
                          <div>
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
                              <Crosshair className="w-3 h-3" /> {isVi ? "Trọng tâm đào tạo" : "Core Focus"}
                            </span>
                            <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-snug">
                              {book.focus}
                            </h4>
                          </div>

                          <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-white/5 flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center p-1 border shrink-0">
                              <Building2 className="w-6 h-6" style={{ color: themeStyle.color }} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{book.org}</p>
                              <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">{book.format}</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-2.5 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs">
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              flipBookToPrev(book.id);
                            }}
                            className="text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center gap-1 font-bold transition cursor-pointer"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                            <span>{isVi ? "Bìa" : "Cover"}</span>
                          </button>
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              flipBookToNext(book.id);
                            }}
                            className="px-3 py-1.5 rounded-xl font-bold text-xs text-white flex items-center gap-1 transition shadow-sm cursor-pointer"
                            style={{ background: themeStyle.gradient }}
                          >
                            <span>{isVi ? "Môn học" : "Modules"}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Full Reader Modal (Clean Document Mode) */}
      <AnimatePresence>
        {activeReaderBook && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setActiveReaderBook(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.22 }}
              className="bg-white/95 dark:bg-slate-900/95 border border-white/80 dark:border-white/15 w-full max-w-4xl max-h-[90vh] rounded-3xl p-5 sm:p-7 shadow-2xl relative text-left backdrop-blur-2xl flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-white/10 shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <span 
                    className="text-xs px-2.5 py-1 rounded-lg font-mono font-bold shrink-0"
                    style={{ backgroundColor: activeReaderBook.theme.bgSoft, color: activeReaderBook.theme.color }}
                  >
                    {activeReaderBook.code}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white truncate">
                      {activeReaderBook.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {activeReaderBook.org} • {isVi ? `Năm ${activeReaderBook.year}` : `Year ${activeReaderBook.year}`}
                    </p>
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={() => setActiveReaderBook(null)}
                  className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition shadow-xs shrink-0 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Reader Tabs */}
              <div className="flex items-center gap-2 py-3 border-b border-slate-200/60 dark:border-white/5 overflow-x-auto no-scrollbar shrink-0">
                {[
                  { id: 0, label: isVi ? "Tổng quan & Tóm tắt" : "Overview & Summary" },
                  { id: 1, label: isVi ? "Trọng tâm & Đơn vị" : "Focus & Issuer" },
                  { id: 2, label: isVi ? "Học phần chi tiết" : "Modules" },
                  { id: 3, label: isVi ? "Năng lực đạt được" : "Outcomes" },
                  { id: 4, label: isVi ? "Chứng chỉ & Bằng cấp" : "Certificate" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setReaderActiveTab(tab.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer",
                      readerActiveTab === tab.id
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Reader Body Content */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
                {readerActiveTab === 0 && (
                  <div className="space-y-4">
                    <div className="w-full h-56 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-md">
                      <img src={activeReaderBook.bannerImg} alt={activeReaderBook.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/10">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">{isVi ? "Giới thiệu khóa học:" : "Course Overview:"}</h4>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{activeReaderBook.desc}</p>
                    </div>
                  </div>
                )}

                {readerActiveTab === 1 && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/10 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-950 flex items-center justify-center p-2 border shadow-sm shrink-0">
                        <Building2 className="w-8 h-8" style={{ color: activeReaderBook.theme.color }} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase text-slate-400">{isVi ? "Đơn vị đào tạo & cấp chứng nhận" : "Issuing Organization"}</span>
                        <h4 className="text-base font-black text-slate-900 dark:text-white">{activeReaderBook.org}</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{activeReaderBook.format} • Mã: {activeReaderBook.certCode}</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/10">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">{isVi ? "Trọng tâm chuyên môn:" : "Specialization Focus:"}</h4>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-semibold">{activeReaderBook.focus}</p>
                    </div>
                  </div>
                )}

                {readerActiveTab === 2 && (
                  <div className="space-y-2">
                    {activeReaderBook.modules.map((m, idx) => (
                      <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/10 flex items-center gap-3">
                        <span className="w-7 h-7 rounded-xl bg-orange-500/15 text-orange-600 dark:text-orange-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">{m}</span>
                      </div>
                    ))}
                  </div>
                )}

                {readerActiveTab === 3 && (
                  <div className="space-y-3">
                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 mb-1">{isVi ? "Năng lực đạt được sau đào tạo" : "Achieved Competencies"}</h5>
                        <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">{activeReaderBook.outcome}</p>
                      </div>
                    </div>
                  </div>
                )}

                {readerActiveTab === 4 && (
                  <div className="space-y-4">
                    <div className="w-full h-72 sm:h-80 rounded-2xl overflow-hidden bg-slate-950 p-3 border border-slate-200 dark:border-white/10 flex items-center justify-center">
                      <img src={activeReaderBook.certImg} alt={activeReaderBook.title} className="max-h-full max-w-full object-contain rounded-xl" />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">{isVi ? `Được cấp bởi ${activeReaderBook.org}` : `Issued by ${activeReaderBook.org}`}</span>
                      <button
                        type="button"
                        onClick={() => openCertModal(activeReaderBook)}
                        className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                        <span>{isVi ? "Mở bộ phóng to chứng chỉ" : "Open zoom viewer"}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Reader Footer */}
              <div className="pt-3 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between shrink-0 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={readerActiveTab === 0}
                    onClick={() => setReaderActiveTab(prev => Math.max(0, prev - 1))}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 disabled:opacity-40 font-bold cursor-pointer"
                  >
                    {isVi ? "Mục trước" : "Prev"}
                  </button>
                  <button
                    type="button"
                    disabled={readerActiveTab === 4}
                    onClick={() => setReaderActiveTab(prev => Math.min(4, prev + 1))}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 disabled:opacity-40 font-bold cursor-pointer"
                  >
                    {isVi ? "Mục tiếp" : "Next"}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveReaderBook(null)}
                  className="px-4 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold cursor-pointer shadow-xs"
                >
                  {isVi ? "Đóng tài liệu" : "Close Reader"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. Certificate Interactive Zoom & Rotate Modal */}
      <AnimatePresence>
        {activeCertBook && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setActiveCertBook(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="bg-white/95 dark:bg-slate-900/95 border border-white/80 dark:border-white/20 w-full max-w-3xl rounded-3xl p-5 sm:p-7 shadow-2xl relative text-left backdrop-blur-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                type="button"
                onClick={() => setActiveCertBook(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition shadow-xs cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-2 mb-3 pr-10">
                <span 
                  className="text-xs px-2.5 py-0.5 rounded-full font-mono font-bold shadow-2xs"
                  style={{ backgroundColor: activeCertBook.theme.bgSoft, color: activeCertBook.theme.color }}
                >
                  {activeCertBook.code}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-play truncate">
                  {activeCertBook.title} ({activeCertBook.year})
                </h3>
              </div>

              {/* Interactive Zoom Controls */}
              <div className="flex items-center justify-between gap-2 mb-2 px-1">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setCertZoomScale(prev => Math.min(2.5, prev + 0.25))}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition cursor-pointer"
                    title="Zoom in"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCertZoomScale(prev => Math.max(0.75, prev - 0.25))}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition cursor-pointer"
                    title="Zoom out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCertRotation(prev => (prev + 90) % 360)}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition cursor-pointer"
                    title="Rotate 90deg"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCertZoomScale(1);
                      setCertRotation(0);
                    }}
                    className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-mono font-bold hover:bg-slate-200 transition cursor-pointer"
                  >
                    {Math.round(certZoomScale * 100)}%
                  </button>
                </div>

                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  {isVi ? "Kéo hoặc nhấp để xem chi tiết" : "Click / zoom for details"}
                </span>
              </div>

              {/* Certificate Image Frame */}
              <div className="w-full h-72 sm:h-96 rounded-2xl overflow-hidden bg-slate-950 border border-slate-200/80 dark:border-white/10 flex items-center justify-center p-3 mb-4 shadow-inner relative">
                <div 
                  className="transition-transform duration-300 flex items-center justify-center w-full h-full"
                  style={{ 
                    transform: `scale(${certZoomScale}) rotate(${certRotation}deg)`,
                  }}
                >
                  <img 
                    src={activeCertBook.certImg} 
                    alt={activeCertBook.title} 
                    className="max-w-full max-h-full object-contain rounded-xl shadow-md select-none pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Metadata & Direct Link */}
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                <span className="font-semibold truncate mr-3">
                  {isVi ? `Đơn vị cấp: ${activeCertBook.org}` : `Issued by: ${activeCertBook.org}`}
                </span>
                <a 
                  href={activeCertBook.certImg} 
                  target="_blank" 
                  rel="noreferrer"
                  className="font-bold flex items-center gap-1 hover:underline shrink-0"
                  style={{ color: activeCertBook.theme.color }}
                >
                  <span>{isVi ? "Mở ảnh gốc trong tab mới" : "Open full image"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7. Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-white/80 dark:border-white/15 backdrop-blur-xl text-xs font-bold pointer-events-none"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
