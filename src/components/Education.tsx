import React, { useState, useEffect, useRef } from "react";
import * as Icons from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { DEFAULT_EDUCATION_CARDS, EducationCard } from "../data/educationData";
import { cn } from "../lib/utils";
import { PageCardHeader } from "./PageCardHeader";

// Subtle Reveal-on-Scroll Entrance Motion Variants for Education Cards (Fade-in + slight slide-up)
const educationCardRevealVariants: any = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      delay: (index % 4) * 0.06,
    },
  }),
};

// Dynamic Icon Helper Function mapping strings to Lucide components
function DynamicIcon({ name, className, style }: { name: string; className?: string; style?: React.CSSProperties }) {
  const nameLower = (name || "").toLowerCase().trim();
  switch (nameLower) {
    case "code": return <Icons.Code className={className} style={style} />;
    case "code-2": return <Icons.Code2 className={className} style={style} />;
    case "database": return <Icons.Database className={className} style={style} />;
    case "shield-alert": return <Icons.ShieldAlert className={className} style={style} />;
    case "shield-check": return <Icons.ShieldCheck className={className} style={style} />;
    case "briefcase": return <Icons.Briefcase className={className} style={style} />;
    case "award": return <Icons.Award className={className} style={style} />;
    case "users": return <Icons.Users className={className} style={style} />;
    case "presentation": return <Icons.Presentation className={className} style={style} />;
    case "user-check": return <Icons.UserCheck className={className} style={style} />;
    case "phone-call": return <Icons.PhoneCall className={className} style={style} />;
    case "network": return <Icons.Network className={className} style={style} />;
    case "server": return <Icons.Server className={className} style={style} />;
    case "calculator": return <Icons.Calculator className={className} style={style} />;
    case "target": return <Icons.Target className={className} style={style} />;
    case "mic": return <Icons.Mic className={className} style={style} />;
    case "workflow": return <Icons.Workflow className={className} style={style} />;
    case "sparkles": return <Icons.Sparkles className={className} style={style} />;
    case "compass": return <Icons.Compass className={className} style={style} />;
    case "flame": return <Icons.Flame className={className} style={style} />;
    case "trending-up": return <Icons.TrendingUp className={className} style={style} />;
    case "list-checks": return <Icons.ListChecks className={className} style={style} />;
    case "help-circle": return <Icons.HelpCircle className={className} style={style} />;
    case "handshake": return <Icons.Handshake className={className} style={style} />;
    case "radio": return <Icons.Radio className={className} style={style} />;
    case "alert-octagon": return <Icons.AlertOctagon className={className} style={style} />;
    case "layers": return <Icons.Layers className={className} style={style} />;
    case "git-commit": return <Icons.GitCommit className={className} style={style} />;
    case "navigation": return <Icons.Navigation className={className} style={style} />;
    case "hard-drive": return <Icons.HardDrive className={className} style={style} />;
    case "globe": return <Icons.Globe className={className} style={style} />;
    case "folder-tree": return <Icons.FolderTree className={className} style={style} />;
    case "laptop": return <Icons.Laptop className={className} style={style} />;
    case "cpu": return <Icons.Cpu className={className} style={style} />;
    case "activity": return <Icons.Activity className={className} style={style} />;
    case "calendar": return <Icons.Calendar className={className} style={style} />;
    case "check-circle-2": return <Icons.CheckCircle2 className={className} style={style} />;
    case "user-plus": return <Icons.UserPlus className={className} style={style} />;
    case "message-square": return <Icons.MessageSquare className={className} style={style} />;
    case "smile": return <Icons.Smile className={className} style={style} />;
    default: return <Icons.GraduationCap className={className} style={style} />;
  }
}

export default function Education() {
  const { lang } = useLanguage();
  const isVi = lang === "vi";
  const { theme, setTheme } = useTheme();

  const safePlay = (type?: string) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      if (type === "click") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === "success") {
        const now = ctx.currentTime;
        [523.25, 659.25, 783.99].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now + idx * 0.06);
          gain.gain.setValueAtTime(0.06, now + idx * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.15);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.06);
          osc.stop(now + idx * 0.06 + 0.15);
        });
      } else if (type === "toggle") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } else if (type === "hover") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(1000, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(850, ctx.currentTime + 0.03);
        gain.gain.setValueAtTime(0.012, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.03);
      } else if (type === "paperFlip" || type === "bookOpen") {
        const bufferSize = ctx.sampleRate * 0.35;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        
        const noiseNode = ctx.createBufferSource();
        noiseNode.buffer = buffer;
        
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.Q.setValueAtTime(2.0, ctx.currentTime);
        filter.frequency.setValueAtTime(700, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(2200, ctx.currentTime + 0.12);
        filter.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.35);
        
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        
        noiseNode.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        
        noiseNode.start();
        noiseNode.stop(ctx.currentTime + 0.35);

        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.type = "sine";
        subOsc.frequency.setValueAtTime(120, ctx.currentTime);
        subOsc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.25);
        subGain.gain.setValueAtTime(0.12, ctx.currentTime);
        subGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        subOsc.connect(subGain);
        subGain.connect(ctx.destination);
        subOsc.start();
        subOsc.stop(ctx.currentTime + 0.25);
      }
    } catch (e) {
      console.warn("Lỗi phát âm thanh hiệu ứng:", e);
    }
  };

  // State Management
  const [cards, setCards] = useState<EducationCard[]>(() => DEFAULT_EDUCATION_CARDS);
  const [selectedCardId, setSelectedCardId] = useState<number>(7);
  const [searchQuery, _setSearchQuery] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "tech" | "management">("all");

  // Lấy Code JSON Modal & Sound
  const [activeCodeJson, _setActiveCodeJson] = useState<string | null>(null);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState<boolean>(false);
  const [copiedState, setCopiedState] = useState<boolean>(false);

  const [viewMode, setViewMode] = useState<"grid" | "stack" | "book">("grid");
  const [lastViewMode, setLastViewMode] = useState<"grid" | "stack">("grid");

  // 3D Flip Book Leaf State
  const [isBookOpen, setIsBookOpen] = useState<boolean>(false);
  const [isCoverFlipped, setIsCoverFlipped] = useState<boolean>(false);
  const [isPage1Flipped, setIsPage1Flipped] = useState<boolean>(false);
  const [isPage2Flipped, setIsPage2Flipped] = useState<boolean>(false);
  const [isPage3Flipped, setIsPage3Flipped] = useState<boolean>(false);
  const [certIndex, setCertIndex] = useState<number>(0);

  // Dynamic 3D Book Auto-Fit Scale Ref & State
  const bookContainerRef = useRef<HTMLDivElement>(null);
  const [bookScale, setBookScale] = useState<number>(1);

  useEffect(() => {
    if (!bookContainerRef.current) return;
    const calculateScale = () => {
      if (!bookContainerRef.current) return;
      const containerWidth = bookContainerRef.current.clientWidth;
      const containerHeight = bookContainerRef.current.clientHeight || 420;
      // When book is open, it spreads across 720px (left + right page). With padding = 760px.
      // When book is closed, it takes 360px. With padding = 400px.
      const targetWidth = isBookOpen ? 760 : 400;
      const targetHeight = 490;
      const scaleX = (containerWidth - 16) / targetWidth;
      const scaleY = (containerHeight - 12) / targetHeight;
      // Zoom and fill the main card comfortably, stably and without vertical overflow
      const scale = Math.min(1.45, Math.max(0.3, Math.min(scaleX, scaleY)));
      setBookScale(Number(scale.toFixed(3)));
    };

    calculateScale();
    const observer = new ResizeObserver(calculateScale);
    observer.observe(bookContainerRef.current);
    window.addEventListener("resize", calculateScale);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", calculateScale);
    };
  }, [isBookOpen, viewMode]);

  useEffect(() => {
    setCertIndex(0);
  }, [selectedCardId]);

  // Profile Banner Customization
  const [profileName, setProfileName] = useState<string>("Nguyễn Hùng Thái");
  const [profileTitle, setProfileTitle] = useState<string>("TRƯỞNG PHÒNG CSKH • 22+ NĂM KINH NGHIỆM");
  const [isBannerModalOpen, setIsBannerModalOpen] = useState<boolean>(false);
  const [inputProfileName, setInputProfileName] = useState<string>("");
  const [inputProfileTitle, setInputProfileTitle] = useState<string>("");

  // AI Assistant Modal (Gemini 2.5 Flash)
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [aiPromptInput, setAiPromptInput] = useState<string>("");
  const [aiResponseText, setAiResponseText] = useState<string>("");
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [showAiResponse, setShowAiResponse] = useState<boolean>(false);

  // Lightbox Image Preview Modal
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);
  const [previewModalImg, setPreviewModalImg] = useState<string>("");
  const [previewModalTitle, setPreviewModalTitle] = useState<string>("Xem Trước Bằng Cấp");

  // Image Crop & Banner Selection State
  const [isCropModalOpen, setIsCropModalOpen] = useState<boolean>(false);
  const [cropTargetCardId, setCropTargetCardId] = useState<number | null>(null);
  const [cropImgUrl, setCropImgUrl] = useState<string>("");
  const [cropZoom, setCropZoom] = useState<number>(1);
  const [cropAspectRatio, setCropAspectRatio] = useState<string>("16/9");
  const [cropTitle, setCropTitle] = useState<string>("");

  const _openCropModal = (cardId: number, imgUrl: string, title: string) => {
    safePlay("click");
    setCropTargetCardId(cardId);
    setCropImgUrl(imgUrl);
    setCropTitle(title);
    setCropZoom(1);
    setCropAspectRatio("16/9");
    setIsCropModalOpen(true);
  };

  const handleSaveCrop = () => {
    if (!cropTargetCardId) return;
    safePlay("success");
    setCards((prev) =>
      prev.map((c) => {
        if (c.id === cropTargetCardId) {
          return {
            ...c,
            courseImg: cropImgUrl,
            image: cropImgUrl,
          };
        }
        return c;
      })
    );
    setIsCropModalOpen(false);
    triggerToast(`Đã cắt hình và cập nhật banner cho thẻ "${cropTitle}" thành công!`);
  };

  const _handleSetAsBanner = (cardId: number, imgUrl: string, title: string) => {
    safePlay("success");
    setCards((prev) =>
      prev.map((c) => {
        if (c.id === cardId) {
          return {
            ...c,
            courseImg: imgUrl,
            image: imgUrl,
          };
        }
        return c;
      })
    );
    triggerToast(`Đã chọn hình ảnh làm banner chính cho "${title}"!`);
  };

  // Interactive Mouse 3D Tilt & Glow Effects
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = Number(((y - centerY) / centerY) * -12).toFixed(2);
    const rotateY = Number(((x - centerX) / centerX) * 12).toFixed(2);
    card.style.setProperty("--rotate-x", `${rotateX}deg`);
    card.style.setProperty("--rotate-y", `${rotateY}deg`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
  };

  // Toast Notification
  const [toastMsg, setToastMsg] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);

  const triggerToast = (msg: string) => {
    safePlay("toggle");
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2800);
  };

  // Filtered Cards
  const filteredCards = cards.filter((c) => {
    const matchCat = categoryFilter === "all" || c.type === categoryFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      c.title.toLowerCase().includes(q) ||
      c.subtitle.toLowerCase().includes(q) ||
      c.desc.toLowerCase().includes(q) ||
      c.year.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const activeCard = cards.find((c) => c.id === selectedCardId) || cards[0];

  const getBookCoverTheme = (id: number) => {
    const isDark = theme === "glass-dark-neon";
    const index = (id - 1) % 12;
    
    if (!isDark) {
      const lightThemes = [
        {
          // 1. Indigo
          frontBg: "linear-gradient(145deg, #f5f7ff 0%, #e0e7ff 50%, #c7d2fe 100%)",
          backBg: "linear-gradient(145deg, #c7d2fe 0%, #e0e7ff 50%, #f5f7ff 100%)",
          backCoverBg: "linear-gradient(135deg, #c7d2fe 0%, #f5f7ff 100%)",
          borderColor: "rgba(79, 70, 229, 0.4)",
          badgeBg: "rgba(224, 231, 255, 0.65)",
          badgeBorder: "rgba(79, 70, 229, 0.3)",
          textAccent: "#4f46e5"
        },
        {
          // 2. Blue
          frontBg: "linear-gradient(145deg, #f0f7ff 0%, #e0f2fe 50%, #bae6fd 100%)",
          backBg: "linear-gradient(145deg, #bae6fd 0%, #e0f2fe 50%, #f0f7ff 100%)",
          backCoverBg: "linear-gradient(135deg, #bae6fd 0%, #f0f7ff 100%)",
          borderColor: "rgba(37, 99, 235, 0.4)",
          badgeBg: "rgba(224, 242, 254, 0.65)",
          badgeBorder: "rgba(37, 99, 235, 0.3)",
          textAccent: "#1d4ed8"
        },
        {
          // 3. Emerald
          frontBg: "linear-gradient(145deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)",
          backBg: "linear-gradient(145deg, #bbf7d0 0%, #dcfce7 50%, #f0fdf4 100%)",
          backCoverBg: "linear-gradient(135deg, #bbf7d0 0%, #f0fdf4 100%)",
          borderColor: "rgba(5, 150, 105, 0.4)",
          badgeBg: "rgba(220, 252, 231, 0.65)",
          badgeBorder: "rgba(5, 150, 105, 0.3)",
          textAccent: "#047857"
        },
        {
          // 4. Rose
          frontBg: "linear-gradient(145deg, #fff1f2 0%, #ffe4e6 50%, #fecdd3 100%)",
          backBg: "linear-gradient(145deg, #fecdd3 0%, #ffe4e6 50%, #fff1f2 100%)",
          backCoverBg: "linear-gradient(135deg, #fecdd3 0%, #fff1f2 100%)",
          borderColor: "rgba(225, 29, 72, 0.4)",
          badgeBg: "rgba(254, 228, 230, 0.65)",
          badgeBorder: "rgba(225, 29, 72, 0.3)",
          textAccent: "#be123c"
        },
        {
          // 5. Amber
          frontBg: "linear-gradient(145deg, #fffbeb 0%, #fef3c7 50%, #fde68a 100%)",
          backBg: "linear-gradient(145deg, #fde68a 0%, #fef3c7 50%, #fffbeb 100%)",
          backCoverBg: "linear-gradient(135deg, #fde68a 0%, #fffbeb 100%)",
          borderColor: "rgba(217, 119, 6, 0.4)",
          badgeBg: "rgba(254, 243, 199, 0.65)",
          badgeBorder: "rgba(217, 119, 6, 0.3)",
          textAccent: "#b45309"
        },
        {
          // 6. Purple
          frontBg: "linear-gradient(145deg, #faf5ff 0%, #f3e8ff 50%, #e9d5ff 100%)",
          backBg: "linear-gradient(145deg, #e9d5ff 0%, #f3e8ff 50%, #faf5ff 100%)",
          backCoverBg: "linear-gradient(135deg, #e9d5ff 0%, #faf5ff 100%)",
          borderColor: "rgba(147, 51, 234, 0.4)",
          badgeBg: "rgba(243, 232, 255, 0.65)",
          badgeBorder: "rgba(147, 51, 234, 0.3)",
          textAccent: "#7e22ce"
        },
        {
          // 7. Cyan
          frontBg: "linear-gradient(145deg, #ecfeff 0%, #cffafe 50%, #a5f3fc 100%)",
          backBg: "linear-gradient(145deg, #a5f3fc 0%, #cffafe 50%, #ecfeff 100%)",
          backCoverBg: "linear-gradient(135deg, #a5f3fc 0%, #ecfeff 100%)",
          borderColor: "rgba(8, 145, 178, 0.4)",
          badgeBg: "rgba(207, 250, 254, 0.65)",
          badgeBorder: "rgba(8, 145, 178, 0.3)",
          textAccent: "#0e7490"
        },
        {
          // 8. Fuchsia
          frontBg: "linear-gradient(145deg, #fdf4ff 0%, #fae8ff 50%, #f5d0fe 100%)",
          backBg: "linear-gradient(145deg, #f5d0fe 0%, #fae8ff 50%, #fdf4ff 100%)",
          backCoverBg: "linear-gradient(135deg, #f5d0fe 0%, #fdf4ff 100%)",
          borderColor: "rgba(192, 38, 211, 0.4)",
          badgeBg: "rgba(250, 232, 255, 0.65)",
          badgeBorder: "rgba(192, 38, 211, 0.3)",
          textAccent: "#a21caf"
        },
        {
          // 9. Slate
          frontBg: "linear-gradient(145deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)",
          backBg: "linear-gradient(145deg, #e2e8f0 0%, #f1f5f9 50%, #f8fafc 100%)",
          backCoverBg: "linear-gradient(135deg, #e2e8f0 0%, #f8fafc 100%)",
          borderColor: "rgba(71, 85, 105, 0.4)",
          badgeBg: "rgba(241, 245, 249, 0.65)",
          badgeBorder: "rgba(71, 85, 105, 0.3)",
          textAccent: "#334155"
        },
        {
          // 10. Red
          frontBg: "linear-gradient(145deg, #fef2f2 0%, #fee2e2 50%, #fca5a5 100%)",
          backBg: "linear-gradient(145deg, #fca5a5 0%, #fee2e2 50%, #fef2f2 100%)",
          backCoverBg: "linear-gradient(135deg, #fca5a5 0%, #fef2f2 100%)",
          borderColor: "rgba(220, 38, 38, 0.4)",
          badgeBg: "rgba(254, 226, 226, 0.65)",
          badgeBorder: "rgba(220, 38, 38, 0.3)",
          textAccent: "#b91c1c"
        },
        {
          // 11. Teal
          frontBg: "linear-gradient(145deg, #f0fdfa 0%, #ccfbf1 50%, #99f6e4 100%)",
          backBg: "linear-gradient(145deg, #99f6e4 0%, #ccfbf1 50%, #f0fdfa 100%)",
          backCoverBg: "linear-gradient(135deg, #99f6e4 0%, #f0fdfa 100%)",
          borderColor: "rgba(13, 148, 136, 0.4)",
          badgeBg: "rgba(204, 251, 241, 0.65)",
          badgeBorder: "rgba(13, 148, 136, 0.3)",
          textAccent: "#0f766e"
        },
        {
          // 12. Violet
          frontBg: "linear-gradient(145deg, #f5f3ff 0%, #ede9fe 50%, #ddd6fe 100%)",
          backBg: "linear-gradient(145deg, #ddd6fe 0%, #ede9fe 50%, #f5f3ff 100%)",
          backCoverBg: "linear-gradient(135deg, #ddd6fe 0%, #f5f3ff 100%)",
          borderColor: "rgba(124, 58, 237, 0.4)",
          badgeBg: "rgba(237, 233, 254, 0.65)",
          badgeBorder: "rgba(124, 58, 237, 0.3)",
          textAccent: "#6d28d9"
        }
      ];
      return lightThemes[index];
    }

    const themes = [
      {
        // 1. Indigo
        frontBg: "linear-gradient(145deg, #4f46e5 0%, #312e81 50%, #1e1b4b 100%)",
        backBg: "linear-gradient(145deg, #1e1b4b 0%, #312e81 50%, #4f46e5 100%)",
        backCoverBg: "linear-gradient(135deg, #1e1b4b 0%, #4f46e5 100%)",
        borderColor: "rgba(99, 102, 241, 0.45)",
        badgeBg: "rgba(30, 27, 75, 0.45)",
        badgeBorder: "rgba(99, 102, 241, 0.35)",
        textAccent: "#818cf8"
      },
      {
        // 2. Blue
        frontBg: "linear-gradient(145deg, #2563eb 0%, #1e3a8a 50%, #172554 100%)",
        backBg: "linear-gradient(145deg, #172554 0%, #1e3a8a 50%, #2563eb 100%)",
        backCoverBg: "linear-gradient(135deg, #172554 0%, #2563eb 100%)",
        borderColor: "rgba(59, 130, 246, 0.45)",
        badgeBg: "rgba(23, 37, 84, 0.45)",
        badgeBorder: "rgba(59, 130, 246, 0.35)",
        textAccent: "#60a5fa"
      },
      {
        // 3. Emerald
        frontBg: "linear-gradient(145deg, #059669 0%, #064e3b 50%, #022c22 100%)",
        backBg: "linear-gradient(145deg, #022c22 0%, #064e3b 50%, #059669 100%)",
        backCoverBg: "linear-gradient(135deg, #022c22 0%, #059669 100%)",
        borderColor: "rgba(16, 185, 129, 0.45)",
        badgeBg: "rgba(2, 44, 34, 0.45)",
        badgeBorder: "rgba(16, 185, 129, 0.35)",
        textAccent: "#34d399"
      },
      {
        // 4. Rose
        frontBg: "linear-gradient(145deg, #e11d48 0%, #881337 50%, #4c0519 100%)",
        backBg: "linear-gradient(145deg, #4c0519 0%, #881337 50%, #e11d48 100%)",
        backCoverBg: "linear-gradient(135deg, #4c0519 0%, #e11d48 100%)",
        borderColor: "rgba(244, 63, 94, 0.45)",
        badgeBg: "rgba(76, 5, 25, 0.45)",
        badgeBorder: "rgba(244, 63, 94, 0.35)",
        textAccent: "#f43f5e"
      },
      {
        // 5. Amber
        frontBg: "linear-gradient(145deg, #d97706 0%, #78350f 50%, #451a03 100%)",
        backBg: "linear-gradient(145deg, #451a03 0%, #78350f 50%, #d97706 100%)",
        backCoverBg: "linear-gradient(135deg, #451a03 0%, #d97706 100%)",
        borderColor: "rgba(245, 158, 11, 0.45)",
        badgeBg: "rgba(69, 26, 3, 0.45)",
        badgeBorder: "rgba(245, 158, 11, 0.35)",
        textAccent: "#fbbf24"
      },
      {
        // 6. Purple
        frontBg: "linear-gradient(145deg, #9333ea 0%, #581c87 50%, #3b0764 100%)",
        backBg: "linear-gradient(145deg, #3b0764 0%, #581c87 50%, #9333ea 100%)",
        backCoverBg: "linear-gradient(135deg, #3b0764 0%, #9333ea 100%)",
        borderColor: "rgba(168, 85, 247, 0.45)",
        badgeBg: "rgba(59, 7, 100, 0.45)",
        badgeBorder: "rgba(168, 85, 247, 0.35)",
        textAccent: "#c084fc"
      },
      {
        // 7. Cyan
        frontBg: "linear-gradient(145deg, #0891b2 0%, #164e63 50%, #083344 100%)",
        backBg: "linear-gradient(145deg, #083344 0%, #164e63 50%, #0891b2 100%)",
        backCoverBg: "linear-gradient(135deg, #083344 0%, #0891b2 100%)",
        borderColor: "rgba(6, 182, 212, 0.45)",
        badgeBg: "rgba(8, 51, 68, 0.45)",
        badgeBorder: "rgba(6, 182, 212, 0.35)",
        textAccent: "#22d3ee"
      },
      {
        // 8. Fuchsia
        frontBg: "linear-gradient(145deg, #c026d1 0%, #701a75 50%, #4a044e 100%)",
        backBg: "linear-gradient(145deg, #4a044e 0%, #701a75 50%, #c026d1 100%)",
        backCoverBg: "linear-gradient(135deg, #4a044e 0%, #c026d1 100%)",
        borderColor: "rgba(217, 70, 239, 0.45)",
        badgeBg: "rgba(74, 4, 78, 0.45)",
        badgeBorder: "rgba(217, 70, 239, 0.35)",
        textAccent: "#e879f9"
      },
      {
        // 9. Sky
        frontBg: "linear-gradient(145deg, #0369a1 0%, #0f766e 50%, #0c4a6e 100%)",
        backBg: "linear-gradient(145deg, #0c4a6e 0%, #0f766e 50%, #0369a1 100%)",
        backCoverBg: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)",
        borderColor: "rgba(14, 165, 233, 0.45)",
        badgeBg: "rgba(12, 74, 110, 0.45)",
        badgeBorder: "rgba(14, 165, 233, 0.35)",
        textAccent: "#38bdf8"
      },
      {
        // 10. Red
        frontBg: "linear-gradient(145deg, #dc2626 0%, #7f1d1d 50%, #450a0a 100%)",
        backBg: "linear-gradient(145deg, #450a0a 0%, #7f1d1d 50%, #dc2626 100%)",
        backCoverBg: "linear-gradient(135deg, #450a0a 0%, #dc2626 100%)",
        borderColor: "rgba(239, 68, 68, 0.45)",
        badgeBg: "rgba(69, 10, 10, 0.45)",
        badgeBorder: "rgba(239, 68, 68, 0.35)",
        textAccent: "#f87171"
      },
      {
        // 11. Teal
        frontBg: "linear-gradient(145deg, #0d9488 0%, #134e4a 50%, #115e59 100%)",
        backBg: "linear-gradient(145deg, #115e59 0%, #134e4a 50%, #0d9488 100%)",
        backCoverBg: "linear-gradient(135deg, #115e59 0%, #0d9488 100%)",
        borderColor: "rgba(20, 184, 166, 0.45)",
        badgeBg: "rgba(17, 94, 89, 0.45)",
        badgeBorder: "rgba(20, 184, 166, 0.35)",
        textAccent: "#2dd4bf"
      },
      {
        // 12. Violet
        frontBg: "linear-gradient(145deg, #7c3aed 0%, #4c1d95 50%, #2e1065 100%)",
        backBg: "linear-gradient(145deg, #2e1065 0%, #4c1d95 50%, #7c3aed 100%)",
        backCoverBg: "linear-gradient(135deg, #2e1065 0%, #7c3aed 100%)",
        borderColor: "rgba(139, 92, 246, 0.45)",
        badgeBg: "rgba(46, 16, 101, 0.45)",
        badgeBorder: "rgba(139, 92, 246, 0.35)",
        textAccent: "#a78bfa"
      }
    ];
    return themes[index];
  };

  const getThemeCardStyles = (themeName: string, cardId: number) => {
    const coverTheme = getBookCoverTheme(cardId);
    
    switch (themeName) {
      case "flat-light":
        return {
          containerClass: "font-play text-slate-900 relative flex flex-col justify-between p-6 overflow-hidden transition-all duration-300 rounded-lg bg-white border border-slate-200 shadow-none hover:border-blue-600",
          containerStyle: { background: "#ffffff", borderColor: "#e2e8f0" },
          badgeYearClass: "text-2xs font-mono font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded border border-amber-300",
          badgeProfileStyle: { background: "#f1f5f9", borderColor: "#cbd5e1", color: "#2563eb" },
          stackedBg1: "bg-slate-50 border border-slate-200",
          stackedBg2: "bg-slate-100 border border-slate-300",
          imageCardBorder: "border border-slate-300",
          titleColor: "text-slate-900",
          iconColor: "text-blue-600",
          metadataLabel: "text-slate-600",
          metadataVal: "text-slate-900",
          descColor: "text-slate-700",
          footerBorder: "border-t border-slate-200",
          footerOwner: "text-slate-600",
          actionColor: "#2563eb",
          badgeText: "STU Digitized Profile"
        };
      case "flat-dark":
        return {
          containerClass: "font-play text-slate-100 relative flex flex-col justify-between p-6 overflow-hidden transition-all duration-300 rounded-lg bg-[#1e293b] border border-slate-700 shadow-none hover:border-sky-400",
          containerStyle: { background: "#1e293b", borderColor: "#334155" },
          badgeYearClass: "text-2xs font-mono font-bold text-amber-200 bg-amber-950 px-2.5 py-0.5 rounded border border-amber-700",
          badgeProfileStyle: { background: "#334155", borderColor: "#475569", color: "#38bdf8" },
          stackedBg1: "bg-slate-800/80 border border-slate-700",
          stackedBg2: "bg-slate-900/90 border border-slate-700",
          imageCardBorder: "border border-slate-700",
          titleColor: "text-slate-100",
          iconColor: "text-sky-400",
          metadataLabel: "text-slate-400",
          metadataVal: "text-slate-100",
          descColor: "text-slate-300",
          footerBorder: "border-t border-slate-700",
          footerOwner: "text-slate-400",
          actionColor: "#38bdf8",
          badgeText: "STU Digitized Profile"
        };
      case "glass-dark-neon":
        return {
          containerClass: "font-play text-white relative flex flex-col justify-between p-6 overflow-hidden transition-all duration-300 rounded-[10px] border backdrop-blur-xl shadow-lg hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] bg-slate-950/70 border-indigo-500/20 hover:border-indigo-400/40",
          containerStyle: {
            background: `linear-gradient(145deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 27, 75, 0.6) 100%)`,
            borderColor: coverTheme.borderColor
          },
          badgeYearClass: "text-2xs font-mono font-black text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-400/40 shadow-xs",
          badgeProfileStyle: {
            background: coverTheme.badgeBg,
            borderColor: coverTheme.badgeBorder,
            color: coverTheme.textAccent
          },
          stackedBg1: "bg-indigo-950/70 border border-indigo-500/30",
          stackedBg2: "bg-purple-950/80 border border-purple-500/40",
          imageCardBorder: "border border-white/20",
          titleColor: "text-white",
          iconColor: "text-indigo-300",
          metadataLabel: "text-slate-300",
          metadataVal: "text-white",
          descColor: "text-slate-200",
          footerBorder: "border-t border-white/10",
          footerOwner: "text-slate-300",
          actionColor: coverTheme.textAccent,
          badgeText: "STU Digitized Profile"
        };
      case "modern-light-glass":
      case "light":
      default:
        // Modern colorful light glassmorphism
        return {
          containerClass: "font-play text-slate-800 relative flex flex-col justify-between p-6 overflow-hidden transition-all duration-300 rounded-[10px] border backdrop-blur-md shadow-md hover:shadow-xl bg-white/75 dark:bg-slate-900/75 border-white/40 dark:border-white/10 hover:border-indigo-200/50 dark:hover:border-indigo-800/50",
          containerStyle: {
            boxShadow: `0 8px 32px 0 rgba(31, 38, 135, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.4)`
          },
          badgeYearClass: "text-2xs font-mono font-black text-amber-600 dark:text-amber-300 bg-amber-100 dark:bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-300 dark:border-amber-400/40 shadow-2xs",
          badgeProfileStyle: {
            background: "rgba(99, 102, 241, 0.08)",
            borderColor: "rgba(99, 102, 241, 0.15)",
            color: "#4f46e5"
          },
          stackedBg1: "bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/40 dark:border-slate-700/40",
          stackedBg2: "bg-slate-200/50 dark:bg-slate-900/50 border border-slate-300/40 dark:border-slate-800/40",
          imageCardBorder: "border border-slate-350 dark:border-white/10",
          titleColor: "text-slate-800 dark:text-white",
          iconColor: "text-indigo-600 dark:text-indigo-400",
          metadataLabel: "text-slate-500 dark:text-slate-400",
          metadataVal: "text-slate-700 dark:text-slate-200",
          descColor: "text-slate-600 dark:text-slate-300",
          footerBorder: "border-t border-slate-200/60 dark:border-white/10",
          footerOwner: "text-slate-500 dark:text-slate-300",
          actionColor: coverTheme.textAccent,
          badgeText: "STU Digitized Profile"
        };
    }
  };

  // 3D Book Step Navigation & Current Active Page Step
  const jumpToBookPage = (step: number) => {
    safePlay(step === 0 ? "bookOpen" : "paperFlip");
    if (step === 0) {
      setIsBookOpen(false);
      setIsCoverFlipped(false);
      setIsPage1Flipped(false);
      setIsPage2Flipped(false);
      setIsPage3Flipped(false);
    } else if (step === 1) {
      setIsBookOpen(true);
      setIsCoverFlipped(true);
      setIsPage1Flipped(false);
      setIsPage2Flipped(false);
      setIsPage3Flipped(false);
    } else if (step === 2) {
      setIsBookOpen(true);
      setIsCoverFlipped(true);
      setIsPage1Flipped(true);
      setIsPage2Flipped(false);
      setIsPage3Flipped(false);
    } else if (step === 3) {
      setIsBookOpen(true);
      setIsCoverFlipped(true);
      setIsPage1Flipped(true);
      setIsPage2Flipped(true);
      setIsPage3Flipped(false);
    } else if (step >= 4) {
      setIsBookOpen(true);
      setIsCoverFlipped(true);
      setIsPage1Flipped(true);
      setIsPage2Flipped(true);
      setIsPage3Flipped(true);
    }
  };

  const currentBookStep = !isBookOpen 
    ? 0 
    : !isPage1Flipped 
    ? 1 
    : !isPage2Flipped 
    ? 2 
    : !isPage3Flipped 
    ? 3 
    : 4;

  const currentBookStepRef = useRef<number>(0);
  useEffect(() => {
    currentBookStepRef.current = currentBookStep;
  }, [currentBookStep]);

  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const el = bookContainerRef.current;
    if (!el || viewMode !== "book") return;

    const handleWheelNative = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 20) return;
      e.preventDefault();
      e.stopPropagation();

      if (wheelTimeoutRef.current) return;

      const step = currentBookStepRef.current;
      if (e.deltaY > 0) {
        if (step < 4) jumpToBookPage(step + 1);
      } else {
        if (step > 0) jumpToBookPage(step - 1);
      }

      wheelTimeoutRef.current = setTimeout(() => {
        wheelTimeoutRef.current = null;
      }, 500);
    };

    el.addEventListener("wheel", handleWheelNative, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheelNative);
    };
  }, [viewMode]);

  const openBookMode = (id: number) => {
    safePlay("bookOpen");
    setSelectedCardId(id);
    if (viewMode !== "book") {
      setLastViewMode(viewMode === "stack" ? "stack" : "grid");
    }
    setViewMode("book");
    jumpToBookPage(0); // Show cover first
  };

  // Lightbox Image Preview
  const openImagePreview = (url: string, title: string = "Xem Trước Bằng Cấp") => {
    safePlay("click");
    setPreviewModalImg(url);
    setPreviewModalTitle(title);
    setIsPreviewModalOpen(true);
  };

  const downloadPreviewImg = (url?: string) => {
    const targetUrl = url || previewModalImg;
    if (!targetUrl) return;
    safePlay("success");
    const a = document.createElement("a");
    a.href = targetUrl;
    a.download = "Chung-Chi-Nguyen-Hung-Thai.png";
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    triggerToast("Đang chuẩn bị tải hình ảnh bằng cấp...");
  };

  // Add New Card
  const _handleAddCard = () => {
    safePlay("click");
    const newId = cards.length > 0 ? Math.max(...cards.map((c) => c.id)) + 1 : 1;
    const newCard: EducationCard = {
      id: newId,
      title: `Chứng Nhận Chuyên Môn Mới ${newId}`,
      subtitle: `Học viện Quản trị & Công nghệ`,
      major: "Phát triển kỹ năng & Năng lực chuyên môn",
      year: `2025 – 2026`,
      type: "management",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
      courseImg: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80",
      certImg: "https://images.unsplash.com/photo-1589330694653-aded6fac0243?auto=format&fit=crop&w=600&q=80",
      speakerImg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      desc: "Chương trình nâng cao năng lực hoạch định chiến lược và chuẩn hóa quy trình dịch vụ khách hàng chất lượng cao đa kênh.",
      modules: [
        { code: "MOD-01", title: "Khung lý thuyết Quản trị Hiện đại", focus: "Nguyên lý vận hành tiên tiến & Chuẩn mực SLA quốc tế", icon: "book-open" },
        { code: "MOD-02", title: "Ứng dụng Thực hành Tình huống", focus: "Kịch bản thực chiến điều hành Contact Center đa kênh", icon: "workflow" },
        { code: "MOD-03", title: "Đo lường Hiệu suất & Giám sát", focus: "Thiết lập hệ thống chỉ số KPI, CSAT & Quản trị rủi ro", icon: "target" },
        { code: "MOD-04", title: "Kiểm tra Đánh giá & Cấp Chứng chỉ", focus: "Bài tập tình huống thực tế và thẩm định năng lực", icon: "award" }
      ],
      results: [
        "Hoàn thành xuất sắc toàn bộ tiêu chí sát hạch.",
        "Ứng dụng trực tiếp vào quy trình thực tế Contact Center.",
        "Nâng cao năng lực cạnh tranh và hiệu suất đội ngũ.",
        "Đóng gói tài liệu đào tạo thực chiến cho tổ chức."
      ],
      gallery: [
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80"
      ],
      icon: "award",
      gradientBadge: "from-purple-500 to-indigo-600 text-white"
    };

    setCards((prev) => [newCard, ...prev]);
    setSelectedCardId(newId);
    triggerToast("Đã thêm một chứng chỉ mới thành công!");
  };

  // Banner Modal Actions
  const _openBannerModal = () => {
    safePlay("click");
    setInputProfileName(profileName);
    setInputProfileTitle(profileTitle);
    setIsBannerModalOpen(true);
  };

  const saveProfileBanner = () => {
    safePlay("success");
    const name = inputProfileName.trim();
    const title = inputProfileTitle.trim();
    if (name) setProfileName(name);
    if (title) setProfileTitle(title);
    setIsBannerModalOpen(false);
    triggerToast("Đã cập nhật thông tin hồ sơ Banner!");
  };

  // AI Assistant Call (Gemini API with fallback)
  const handleAiAnalyze = async () => {
    const promptText = aiPromptInput.trim() || "Phân tích ma trận năng lực toàn diện của Nguyễn Hùng Thái kết hợp giữa nền tảng CNTT và Năng lực Đào tạo & Thuyết trình chuyên nghiệp.";
    safePlay("click");
    setAiLoading(true);
    setShowAiResponse(true);
    setAiResponseText("Đang tổng hợp dữ liệu học vấn và phân tích thông minh...");

    try {
      const response = await fetch("/api/ai-analyze-education", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promptText })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.text) {
          safePlay("success");
          setAiResponseText(data.text);
          return;
        }
      }
      throw new Error("Server analysis unavailable");
    } catch {
      // Intelligently formatted structured response
      setAiResponseText(
        `[TỔNG HỢP NĂNG LỰC ĐỘT PHÁ - NGUYỄN HÙNG THÁI]\n\n1. LỢI THẾ CẠNH TRANH KÉP (DUAL-CORE ADVANTAGE):\n• Năng lực Sư phạm & Thuyết trình (VietnamWorks & Dale Carnegie): Đóng gói và chuyển giao quy trình chuẩn hóa CSKH cho hàng trăm nhân sự.\n• Nền tảng Kỹ thuật Số (STU Bachelor, Big Data, CCNA, Web UI/UX): Làm chủ tuyệt đối kiến trúc hạ tầng Omnichannel Contact Center & Chuyển đổi số.\n\n2. ĐỊNH HƯỚNG TẦM NHÌN 2026+:\n• Tiên phong mô hình 'AI-First Customer Experience' kết hợp huấn luyện nhân sự thực chiến.`
      );
      safePlay("success");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <section 
      id="education" 
      className={cn(
        "relative w-full font-sans text-slate-800 dark:text-slate-100 transition-all duration-300",
        viewMode === "book"
          ? "h-full min-h-0 flex flex-col justify-between overflow-hidden p-2 sm:p-3 lg:p-4"
          : "min-h-full flex flex-col justify-start items-center p-2 sm:p-4 lg:p-6"
      )}
    >
      {/* Scoped Custom CSS Animations & Mechanics */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .glass-canvas-main {
          background: linear-gradient(135deg, rgba(255, 241, 242, 0.88) 0%, rgba(238, 242, 255, 0.94) 50%, rgba(224, 242, 254, 0.88) 100%);
          border: 1px solid rgba(255, 255, 255, 0.95);
          box-shadow: 0 25px 60px -15px rgba(15, 23, 42, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.7);
        }
        .dark .glass-canvas-main {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.92) 50%, rgba(15, 23, 42, 0.95) 100%);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .glass-card-bright {
          background: rgba(255, 255, 255, 0.86);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(255, 255, 255, 0.95);
          box-shadow: 0 16px 36px -10px rgba(100, 116, 139, 0.16), 0 0 0 1px rgba(255, 255, 255, 0.6);
        }
        .dark .glass-card-bright {
          background: rgba(15, 23, 42, 0.88);
          border-color: rgba(255, 255, 255, 0.12);
          box-shadow: 0 16px 36px -10px rgba(0, 0, 0, 0.5);
        }

        .glass-inner-item {
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.9);
        }
        .dark .glass-inner-item {
          background: rgba(30, 41, 59, 0.75);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .card-banner-zoom {
          object-fit: cover;
          object-position: center center;
          transform: scale(1.28);
          transform-origin: center center;
          transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .group:hover .card-banner-zoom,
        .stack-card:hover .card-banner-zoom {
          transform: scale(1.38);
        }

        @keyframes slideRightToLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .cards-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          padding: 24px 30px;
          min-height: 380px;
          width: max-content;
          margin: 0 auto;
          perspective: 1200px;
          animation: none;
        }
        .cards-container:hover {
          animation-play-state: running;
        }

        .edu-card-container {
          position: relative;
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 0;
          border-radius: 1rem;
          overflow: hidden;
          background-color: transparent;
        }

        .blob {
          position: absolute;
          width: 380px;
          height: 380px;
          background: linear-gradient(
            180deg,
            rgba(47, 184, 255, 0.42) 31.77%,
            #5c9df1 100%
          );
          mix-blend-mode: color-dodge;
          -webkit-animation: move 25s infinite alternate;
          animation: move 25s infinite alternate;
          transition: 1s cubic-bezier(0.07, 0.8, 0.16, 1);
          pointer-events: auto;
          z-index: 1;
        }

        .blob:hover {
          width: 420px;
          height: 420px;
          -webkit-filter: blur(30px);
          filter: blur(30px);
          box-shadow:
            inset 0 0 0 5px rgba(255,255,255, 0.6),
            inset 100px 100px 0 0px #fa709a,
            inset 200px 200px 0 0px #784ba8,
            inset 300px 300px 0 0px #2b86c5;
        }

        @-webkit-keyframes move {
          from {
            transform: translate(-100px, -50px) rotate(-90deg);
            border-radius: 24% 76% 35% 65% / 27% 36% 64% 73%;
          }
          to {
            transform: translate(150px, 80px) rotate(-10deg);
            border-radius: 76% 24% 33% 67% / 68% 55% 45% 32%;
          }
        }

        @keyframes move {
          from {
            transform: translate(-100px, -50px) rotate(-90deg);
            border-radius: 24% 76% 35% 65% / 27% 36% 64% 73%;
          }
          to {
            transform: translate(150px, 80px) rotate(-10deg);
            border-radius: 76% 24% 33% 67% / 68% 55% 45% 32%;
          }
        }

        .edu-glass-card {
          width: 100%;
          min-height: 250px;
          background: rgba(255, 255, 255, 0.75);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15), inset 0 1.5px 2px rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(24px) saturate(140%);
          -webkit-backdrop-filter: blur(24px) saturate(140%);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 1.5rem;
          position: relative;
          z-index: 10;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dark .edu-glass-card {
          background: rgba(15, 23, 42, 0.80);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1.5px 2px rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .edu-glass-card::after {
          z-index: -1;
          content: " ";
          position: absolute;
          width: 150%;
          top: 0;
          left: 0;
          height: 10px;
          background: #ffffff;
          transform: rotateZ(50deg);
          filter: blur(30px);
          animation: shine 10s ease infinite;
          pointer-events: none;
        }

        .innerText {
          color: transparent;
          -webkit-background-clip: text;
          background-image: linear-gradient(90deg, rgb(15, 23, 42), rgb(100, 116, 139));
          font-weight: 800;
        }

        .dark .innerText {
          background-image: linear-gradient(90deg, rgb(255, 255, 255), rgb(203, 213, 225));
        }

        @keyframes shine {
          0% {
            top: 100%;
            left: -100%;
          }
          50%,
          100% {
            top: 0%;
            left: 70%;
          }
        }

        /* ================= CODEPEN STACKED EXPANDING CARDS MECHANISM ================= */
        .cards-container, .card-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          padding: 24px 30px;
          min-height: 380px;
          width: max-content;
          margin: 0 auto;
          perspective: 1200px;
          transition: all 0.3s ease-in-out;
        }

        .stack-card, .card-container .card {
          display: flex;
          flex-direction: column;
          height: 380px;
          width: 265px;
          background: rgba(255, 255, 255, 0.75) !important;
          backdrop-filter: blur(20px) saturate(160%) !important;
          -webkit-backdrop-filter: blur(20px) saturate(160%) !important;
          border-radius: 18px;
          box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.8) !important;
          transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1);
          position: relative;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.6) !important;
          padding: 10px !important;
          user-select: none;
          flex-shrink: 0;
          outline: none;
        }

        .dark .stack-card, .dark .card-container .card {
          background: rgba(15, 23, 42, 0.65) !important;
          border-color: rgba(255, 255, 255, 0.15) !important;
          box-shadow: 0 12px 35px -5px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.1) !important;
        }

        /* Overlapping negative margin on desktop */
        .stack-card:not(:first-child), .card-container .card:not(:first-child) {
          margin-left: -100px;
        }

        /* Lift hovered / focused card upwards */
        .stack-card:hover, .stack-card:focus, .stack-card:focus-visible,
        .card-container .card:hover, .card-container .card:focus {
          z-index: 60 !important;
          transform: translateY(-20px) scale(1.05);
          box-shadow: 0 24px 50px -10px rgba(37, 99, 235, 0.3), 0 0 0 2px rgba(99, 102, 241, 0.6) !important;
          border-color: rgba(129, 140, 248, 0.8) !important;
          background: rgba(255, 255, 255, 0.95) !important;
        }

        .dark .stack-card:hover, .dark .stack-card:focus, .dark .stack-card:focus-visible,
        .dark .card-container .card:hover, .dark .card-container .card:focus {
          box-shadow: 0 24px 50px -10px rgba(0, 0, 0, 0.7), 0 0 0 2px rgba(129, 140, 248, 0.6) !important;
          border-color: rgba(129, 140, 248, 0.6) !important;
          background: rgba(15, 23, 42, 0.9) !important;
        }

        /* Push all following sibling cards to the right (CodePen effect) */
        .stack-card:hover ~ .stack-card, .stack-card:focus ~ .stack-card,
        .card-container .card:hover ~ .card, .card-container .card:focus ~ .card {
          transform: translateX(110px);
          transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1);
        }

        /* Responsive Mobile Behavior: Stacked vertically with vertical push */
        @media (max-width: 767px) {
          .cards-container, .card-container {
            flex-direction: column;
            width: 100%;
            padding: 20px 8px;
            align-items: center;
            min-height: auto;
          }

          .stack-card, .card-container .card {
            width: 100%;
            max-width: 320px;
            height: auto;
            min-height: 240px;
          }

          .stack-card:not(:first-child), .card-container .card:not(:first-child) {
            margin-left: 0;
            margin-top: -85px;
          }

          .stack-card:hover, .stack-card:focus,
          .card-container .card:hover, .card-container .card:focus {
            transform: translateY(-10px) scale(1.03);
          }

          .stack-card:hover ~ .stack-card, .stack-card:focus ~ .stack-card,
          .card-container .card:hover ~ .card, .card-container .card:focus ~ .card {
            transform: translateY(85px);
          }
        }

        .book-stage-outer {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          perspective: 2400px;
          filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.28)) drop-shadow(0 8px 16px rgba(0, 0, 0, 0.18));
        }

        .book {
          width: 360px;
          height: 480px;
          position: relative;
          transition: transform 1.2s cubic-bezier(0.25, 1, 0.5, 1);
          transform-style: preserve-3d;
        }

        .book.is-open {
          transform: translateX(180px);
        }

        .cover {
          width: 100%;
          height: 100%;
          border-radius: 0 16px 16px 0 !important;
          box-shadow: 0 22px 50px rgba(0, 0, 0, 0.42), 0 8px 20px rgba(0, 0, 0, 0.22);
          position: absolute;
          top: 0;
          left: 0;
          transform-origin: center left;
          transform-style: preserve-3d;
          z-index: 50;
          transition: transform 1.2s cubic-bezier(0.645, 0.045, 0.355, 1);
          cursor: pointer;
          background: transparent !important;
        }

        .cover.flipped {
          transform: rotateY(-180deg);
        }

        .back-cover {
          width: 100%;
          height: 100%;
          border-radius: 0 16px 16px 0 !important;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.45) !important;
          position: absolute;
          top: 0;
          left: 0;
          transform-origin: center left;
          transform-style: preserve-3d;
          z-index: -1;
          background: linear-gradient(135deg, #090e17 0%, #171d2b 100%);
          border: 2px solid rgba(255, 255, 255, 0.15);
          padding: 15px !important;
          transition: none !important;
        }

        .cover .cover-spine-effect {
          position: absolute;
          width: 10px;
          height: 100%;
          left: 0;
          top: 0;
          border-left: 1.5px solid rgba(0, 0, 0, 0.3);
          background-image: linear-gradient(90deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0) 100%);
          z-index: 30;
          pointer-events: none;
        }

        .book .page {
          position: absolute;
          background: transparent !important;
          width: 356px;
          height: 468px;
          top: 6px;
          left: 0;
          transform-origin: left center;
          transform-style: preserve-3d;
          transform: rotateY(0deg);
          transition: transform 1.2s cubic-bezier(0.645, 0.045, 0.355, 1);
          cursor: pointer;
        }

        .book .page.flipped {
          transform: rotateY(-180deg);
        }

        .front-page, .back-page {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          padding: 25px !important;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          background: #ffffff;
        }
        .dark .front-page, .dark .back-page {
          background: #0f172a;
          color: #f8fafc;
        }

        .front-page {
          transform: rotateY(0deg);
          border-radius: 0 16px 16px 0 !important;
          border: 1px solid rgba(203, 213, 225, 0.85);
          border-left: none;
          background-image: linear-gradient(to right, rgba(0, 0, 0, 0.14) 0%, rgba(0, 0, 0, 0.04) 2%, rgba(0, 0, 0, 0) 8%);
          box-shadow: 12px 14px 35px rgba(0, 0, 0, 0.18), 3px 3px 12px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.95);
        }
        .dark .front-page {
          border-color: rgba(255, 255, 255, 0.12);
          background-image: linear-gradient(to right, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.1) 2%, rgba(0, 0, 0, 0) 8%);
          box-shadow: 14px 16px 40px rgba(0, 0, 0, 0.65), 4px 4px 15px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        .back-page {
          transform: rotateY(180deg);
          border-radius: 16px 0 0 16px !important;
          border: 1px solid rgba(203, 213, 225, 0.85);
          border-right: none;
          background-image: linear-gradient(to left, rgba(0,0,0,0.035) 0%, rgba(0,0,0,0) 3%);
          box-shadow: -6px 6px 20px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }
        .dark .back-page {
          border-color: rgba(255, 255, 255, 0.12);
          box-shadow: -6px 6px 22px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .cover-front, .cover-back {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          padding: 15px !important;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
        }

        .cover-front {
          transform: rotateY(0deg);
          border-radius: 0 16px 16px 0 !important;
          background: linear-gradient(145deg, #111827 0%, #0f172a 50%, #1e293b 100%);
          border: 2px solid rgba(255, 255, 255, 0.2);
          box-shadow: 8px 10px 25px rgba(0, 0, 0, 0.3);
        }

        .cover-back {
          transform: rotateY(180deg);
          border-radius: 16px 0 0 16px !important;
          background: linear-gradient(145deg, #090d16 0%, #111827 100%);
          border: 2px solid rgba(255, 255, 255, 0.12);
          box-shadow: -8px 10px 25px rgba(0, 0, 0, 0.3);
        }

        .btn-page-nav {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: var(--font-size-3xs);
          font-weight: 700;
          cursor: pointer;
          padding: 3px 8px;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .btn-page-nav.next {
          background: rgba(99, 102, 241, 0.1);
          color: #4f46e5;
        }

        .btn-page-nav.next:hover {
          background: #4f46e5;
          color: #ffffff;
        }

        .btn-page-nav.prev {
          background: rgba(100, 116, 139, 0.1);
          color: #475569;
        }

        .btn-page-nav.prev:hover {
          background: #475569;
          color: #ffffff;
        }

        .spine-center-shadow {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 8px;
          transform: translateX(-4px);
          background: linear-gradient(90deg, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0.01) 50%, rgba(0,0,0,0.14) 100%);
          z-index: 40;
          pointer-events: none;
          display: none;
        }

        .book.is-open .spine-center-shadow {
          display: block;
        }

        .book-scaler-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          transform-style: preserve-3d;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: center center;
        }

        /* 3D Visibility Fixes: Prevent bleed-through/mirroring of backfaces when scaled/in iframe */
        .book .page.flipped .front-page {
          opacity: 0 !important;
          pointer-events: none !important;
          visibility: hidden !important;
          transition: visibility 0s linear 0.6s, opacity 0.6s ease-out !important;
        }
        .book .page:not(.flipped) .front-page {
          opacity: 1 !important;
          pointer-events: auto !important;
          visibility: visible !important;
          transition: visibility 0s linear 0s, opacity 0.6s ease-out !important;
        }
        .book .page:not(.flipped) .back-page {
          opacity: 0 !important;
          pointer-events: none !important;
          visibility: hidden !important;
          transition: visibility 0s linear 0.6s, opacity 0.6s ease-out !important;
        }
        .book .page.flipped .back-page {
          opacity: 1 !important;
          pointer-events: auto !important;
          visibility: visible !important;
          transition: visibility 0s linear 0s, opacity 0.6s ease-out !important;
        }

        .book .cover.flipped .cover-front {
          opacity: 0 !important;
          pointer-events: none !important;
          visibility: hidden !important;
          transition: visibility 0s linear 0.6s, opacity 0.6s ease-out !important;
        }
        .book .cover:not(.flipped) .cover-front {
          opacity: 1 !important;
          pointer-events: auto !important;
          visibility: visible !important;
          transition: visibility 0s linear 0s, opacity 0.6s ease-out !important;
        }
        .book .cover:not(.flipped) .cover-back {
          opacity: 0 !important;
          pointer-events: none !important;
          visibility: hidden !important;
          transition: visibility 0s linear 0.6s, opacity 0.6s ease-out !important;
        }
        .book .cover.flipped .cover-back {
          opacity: 1 !important;
          pointer-events: auto !important;
          visibility: visible !important;
          transition: visibility 0s linear 0s, opacity 0.6s ease-out !important;
        }
      `
      }} />

      {/* Page Header Card Học vấn (Consistent across all view modes) */}
      <PageCardHeader pageId="education" className="w-full mb-4.5">
        {/* Cụm trái: Số lượng học phần */}
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-5 bg-emerald-600 dark:bg-emerald-400 rounded-full shrink-0" />
          <span className="text-caption text-label font-semibold font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30 shadow-2xs">
            {isVi ? `Hiển thị ${filteredCards.length} học phần` : `Showing ${filteredCards.length} courses`}
          </span>
        </div>

        {/* Cụm phải: Bộ lọc chuyên đề + Chuyển đổi dạng xem */}
        <div className="flex items-center gap-2 ml-auto flex-wrap text-caption text-label font-semibold">
          {/* Nút lọc danh mục */}
          <div className="flex flex-wrap items-center gap-1 bg-slate-100/90 dark:bg-slate-900/90 p-1 rounded-xl border border-slate-200/60 dark:border-slate-800/80 shadow-2xs">
            {(["all", "tech", "management"] as const).map((cat) => {
              const isActive = categoryFilter === cat;
              const label = cat === "all" ? (isVi ? "Tất cả" : "All") : cat === "tech" ? (isVi ? "Công nghệ" : "Tech") : (isVi ? "Quản lý" : "Management");
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    safePlay("toggle");
                    setCategoryFilter(cat);
                  }}
                  className={`px-3 sm:px-3.5 py-1 rounded-lg text-caption text-label font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs border border-slate-200/50 dark:border-slate-700/50 font-bold"
                      : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-normal"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Nút chuyển đổi chế độ xem */}
          <div className="flex items-center gap-1 bg-slate-100/90 dark:bg-slate-900/90 p-1 rounded-xl border border-slate-200/60 dark:border-slate-800/80 shadow-2xs">
            <button
              type="button"
              onClick={() => {
                safePlay("toggle");
                setViewMode("grid");
              }}
              className={`px-3 py-1 rounded-lg text-caption text-label font-semibold flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                viewMode === "grid"
                  ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs border border-slate-200/50 dark:border-slate-700/50 font-bold"
                  : "text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-slate-200 font-normal"
              }`}
            >
              <Icons.Grid className="w-3.5 h-3.5 text-emerald-500" />
              <span>{isVi ? "Dạng lưới" : "Grid view"}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                safePlay("bookOpen");
                setViewMode("book");
                setIsBookOpen(true);
              }}
              className={`px-3 py-1 rounded-lg text-caption text-label font-semibold flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                (viewMode as any) === "book"
                  ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs border border-slate-200/50 dark:border-slate-700/50 font-bold"
                  : "text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-slate-200 font-normal"
              }`}
            >
              <Icons.BookOpen className="w-3.5 h-3.5 text-emerald-500" />
              <span>{isVi ? "Sách 3D" : "3D Book"}</span>
            </button>
          </div>
        </div>
      </PageCardHeader>

      {/* Content Area Học Vấn */}
      {/* DẠNG VIEW THẺ NHƯ CARD (DESKTOP: 4 CỘT, DƯỚI DESKTOP: 3 CỘT - FLUID GRID) */}
      {viewMode === "grid" && (
        <div className="w-full flex flex-col gap-4">

          <div
            key={`bento-grid-${categoryFilter}`}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 py-2"
          >
            {filteredCards.map((card, cardIndex) => {
              const themeCard = getThemeCardStyles(theme || "light", card.id);
              const coverTheme = getBookCoverTheme(card.id);
              return (
                <motion.div
                  key={card.id}
                  custom={cardIndex}
                  variants={educationCardRevealVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.12, margin: "0px 0px -30px 0px" }}
                  className="w-full min-w-0 flex flex-col h-auto"
                >
                  <div
                    tabIndex={0}
                    role="button"
                    aria-label={card.title}
                    onClick={() => openBookMode(card.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openBookMode(card.id);
                      }
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={() => safePlay("hover")}
                    className={cn(
                      "grid-profile-card group relative flex flex-col justify-between p-3.5 rounded-[10px] border transition-all duration-300 select-none cursor-pointer shadow-sm hover:shadow-xl bg-white/95 dark:bg-slate-900/80 backdrop-blur-2xl border-slate-200/80 dark:border-cyan-400/35 hover:border-indigo-300 dark:hover:border-cyan-400/60 dark:shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(0,240,255,0.18),inset_0_1.5px_2px_rgba(255,255,255,0.18)] text-slate-800 dark:text-slate-100 h-full"
                    )}
                    style={{
                      transform: 'perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg)) scale(var(--scale, 1))',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Banner Image - Clear Clean Banner Image Style without border */}
                    <div 
                      className="relative w-full aspect-[16/10] overflow-hidden rounded-[10px] border-0 mb-3 pointer-events-none flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900 transition-colors duration-300 shadow-xs"
                    >
                      {/* Course Thumbnail Image */}
                      {card.image && (
                        <img 
                          src={card.image} 
                          alt={card.title} 
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 rounded-[10px]"
                        />
                      )}

                      {/* Subtle Shine Sweep on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1000ms] ease-out pointer-events-none z-10 rounded-[10px]" />
                    </div>

                    {/* Title Block - Icon without frame, title color matching icon */}
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <DynamicIcon 
                        name={card.icon || "graduation-cap"} 
                        className="w-5 h-5 shrink-0" 
                        style={{ color: coverTheme.textAccent }}
                      />
                      <h3 
                        className="font-play font-bold leading-tight tracking-tight text-card-title truncate line-clamp-1"
                        style={{ color: coverTheme.textAccent }}
                      >
                        {card.title}
                      </h3>
                    </div>

                    {/* Metadata List - Flat Direct Rows with Caption / Label: 12px – 13px - WCAG AA Compliant Text */}
                    <div className="space-y-1.5 text-body-sm text-left mb-3">
                      {/* 1. Học tại / Institution */}
                      <div className="flex items-start gap-1.5 text-left">
                        <span className="w-[76px] shrink-0 font-bold text-caption text-slate-700 dark:text-slate-200 secondary-text flex items-center gap-1 whitespace-nowrap">
                          <Icons.School className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400 shrink-0" />
                          <span className="whitespace-nowrap">{isVi ? "Học tại:" : "School:"}</span>
                        </span>
                        <span className="font-semibold text-caption truncate flex-1 text-slate-800 dark:text-slate-100">
                          {card.subtitle}
                        </span>
                      </div>

                      {/* 3. Mô tả / Key Summary */}
                      <div className="text-left text-caption leading-snug text-slate-700 dark:text-slate-200 secondary-text">
                        <span className="font-bold text-slate-800 dark:text-slate-100 inline-flex items-center gap-1 mr-1.5">
                          <Icons.FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400 shrink-0 inline-block align-middle" />
                          <span>{isVi ? "Mô tả:" : "Desc:"}</span>
                        </span>
                        <span className="font-normal line-clamp-2 inline">{card.desc}</span>
                      </div>
                    </div>

                    {/* Bottom Year Badge */}
                    <div className="flex items-center justify-between pt-2.5 mt-auto border-t border-slate-200/80 dark:border-slate-800/80 w-full">
                      <span className="inline-flex items-center gap-1 text-2xs font-mono font-bold text-amber-900 dark:text-amber-200 bg-amber-100 dark:bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-300 dark:border-amber-700/80">
                        <Icons.Calendar className="w-3 h-3 opacity-90" />
                        <span>{card.year}</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {viewMode === "book" && (
        <div className="w-full max-w-6xl mx-auto flex-1 min-h-0 flex flex-col items-center justify-between relative gap-2 sm:gap-3 z-10 transition-colors duration-300 overflow-hidden">
          
          {/* ================= TOP CONTROL BAR ================= */}
          {/* Bộ chọn Hồ sơ chuyển qua Trái, Nút Quay lại chuyển qua Phải */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-slate-200/50 dark:border-slate-800/50 pb-2 shrink-0">
            
            {/* Bộ chọn Hồ sơ - Chuyển qua Trái */}
            <div className="flex items-center gap-2 bg-slate-100/80 dark:bg-slate-900/80 p-1.5 rounded-xl border border-slate-200 dark:border-slate-850 shadow-xs shrink-0 w-full sm:w-auto justify-between sm:justify-start">
              <span className="text-2xs sm:text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase px-1 whitespace-nowrap shrink-0">
                {isVi ? "Chọn hồ sơ:" : "Profile:"}
              </span>
              <select
                value={selectedCardId}
                onChange={(e) => {
                  const id = Number(e.target.value);
                  setSelectedCardId(id);
                  jumpToBookPage(0);
                }}
                className="px-3 py-1 rounded-lg bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-xs font-black border border-slate-200 dark:border-slate-800 cursor-pointer outline-none shadow-xs transition-all duration-300"
              >
                {cards.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} ({c.year})
                  </option>
                ))}
              </select>
            </div>

            {/* Nhãn hướng dẫn tương tác */}
            <div className="hidden md:flex items-center gap-1.5 text-2xs font-bold text-slate-500 dark:text-slate-400 italic">
              <Icons.Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>{isVi ? "Click bìa hoặc Cuộn chuột (Scroll) để lật trang sách" : "Click cover or scroll mouse to flip book"}</span>
            </div>

            {/* Nút Quay lại - Chuyển qua Phải */}
            <button
              onClick={() => { safePlay("click"); setViewMode(lastViewMode || "grid"); }}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-extrabold border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-2 cursor-pointer transition-all duration-300 transform hover:translate-x-1 shrink-0"
            >
              <Icons.ArrowLeft className="w-4 h-4 text-rose-500 stroke-[2.5]" />
              <span>{isVi ? "Quay lại thẻ học vấn" : "Back to education cards"}</span>
            </button>
          </div>

          {/* ================= MIDDLE SECTION: PURE 3D LEAF-FLIP BOOK ================= */}
          <div 
            ref={bookContainerRef}
            className="w-full flex-1 min-h-0 flex justify-center items-center py-1 sm:py-2 rounded-[10px] overflow-hidden relative" 
          >
            <div className="book-stage-outer relative w-full h-full flex items-center justify-center">
              <div 
                className="book-scaler-wrapper"
                style={{ 
                  transform: `scale(${bookScale})`, 
                  transformOrigin: "center center",
                  transformStyle: "preserve-3d"
                }}
              >
                <div className={cn("book relative z-10", isBookOpen && "is-open")}>
                  <div className="spine-center-shadow"></div>

                  {/* 1. COVER (FLIPS -180DEG) */}
                  <div
                    className={cn("cover", isCoverFlipped && "flipped")}
                    style={{
                      zIndex: isCoverFlipped ? 1 : 40,
                      background: "transparent"
                    }}
                    onClick={() => {
                      if (!isBookOpen) {
                        jumpToBookPage(1);
                      }
                    }}
                  >
                    <div className="cover-spine-effect"></div>

                    {/* FRONT COVER FACE (Font 'Play') */}
                    <div 
                      className="cover-front font-play text-slate-900 dark:text-white relative flex flex-col justify-between h-full p-4 sm:p-5 overflow-hidden transition-all duration-500 rounded-[10px] shadow-xl cursor-pointer"
                      style={{
                        background: getBookCoverTheme(activeCard.id).frontBg,
                        border: `2px solid ${getBookCoverTheme(activeCard.id).borderColor}`
                      }}
                      onClick={() => jumpToBookPage(1)}
                    >
                      <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                          {/* Header year badge & indicator (Top of cover) */}
                          <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-300/40 dark:border-white/20">
                            <span className="text-2xs font-mono font-black text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-300 dark:border-amber-400/40 shadow-xs">
                              {activeCard.year}
                            </span>
                          </div>

                          {/* Single Banner Image matching Education Card */}
                          <div className="relative w-full aspect-[16/10] mx-auto my-2 group/img pointer-events-none">
                            {/* Top Card */}
                            <div className="relative w-full h-full overflow-hidden bg-slate-950 rounded-[10px] border border-white/30 shadow-2xl">
                              <img
                                src={activeCard.courseImg || activeCard.image}
                                alt={activeCard.title}
                                onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/600x400/indigo/white?text=Training+Cover"; }}
                                className={cn(
                                  "w-full h-full object-cover origin-center transition-transform duration-500 rounded-[10px]",
                                  activeCard.title.includes("Cử nhân CNTT") || activeCard.id === 9
                                    ? "scale-50 group-hover:scale-[0.55]"
                                    : "scale-100 group-hover:scale-[1.05]"
                                )}
                                loading="lazy"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                            </div>
                          </div>

                          {/* Title Block with Play font */}
                          <div className="my-1">
                            <h2 
                              className="font-play font-bold text-slate-900 dark:text-white leading-tight tracking-tight text-base sm:text-lg flex items-center gap-2 truncate line-clamp-1"
                            >
                              <DynamicIcon name={activeCard.icon || "graduation-cap"} className="w-5 h-5 text-indigo-600 dark:text-indigo-300 shrink-0 inline-block" />
                              <span>{activeCard.title}</span>
                            </h2>
                          </div>

                          {/* Unified Metadata Grid matching Education Card - Bằng nhau chiều ngang, bỏ khung icon */}
                          <div className="space-y-2 text-xs mt-2 font-play">
                            <div className="flex items-start gap-2">
                              <span className="text-slate-600 dark:text-slate-300 w-[94px] shrink-0 font-medium flex items-center gap-1">
                                <Icons.School className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-300 shrink-0" />
                                <span>Học tại:</span>
                              </span>
                              <span className="font-bold text-slate-900 dark:text-white truncate flex-1">{activeCard.subtitle}</span>
                            </div>

                            <div className="flex items-start gap-2">
                              <span className="text-slate-600 dark:text-slate-300 w-[94px] shrink-0 font-medium flex items-center gap-1">
                                <Icons.GraduationCap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-300 shrink-0" />
                                <span>Ngành:</span>
                              </span>
                              <span className="font-semibold text-slate-800 dark:text-white line-clamp-1 flex-1">{activeCard.major || "Phát triển kỹ năng & Năng lực chuyên môn"}</span>
                            </div>

                            <div className="text-left text-xs leading-normal text-slate-700 dark:text-slate-200">
                              <span className="text-slate-600 dark:text-slate-300 font-medium inline-flex items-center gap-1 mr-1.5">
                                <Icons.FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-300 shrink-0 inline-block align-middle" />
                                <span>{isVi ? "Mô tả:" : "Desc:"}</span>
                              </span>
                              <span className="font-normal line-clamp-2 inline">{activeCard.desc}</span>
                            </div>
                          </div>

                        </div>

                        {/* Footer */}
                        <div className="pt-2 border-t border-slate-300/40 dark:border-white/10 flex items-center justify-between text-3xs mt-2 font-play">
                          <span className="text-slate-600 dark:text-slate-300 font-semibold">Chủ sở hữu: Nguyễn Hùng Thái</span>
                          <span className="font-bold flex items-center gap-1 animate-pulse" style={{ color: getBookCoverTheme(activeCard.id).textAccent }}>
                            <span>Nhấp mở sách</span>
                            <Icons.ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* BACK COVER FACE (Font 'Play') */}
                    <div 
                      className="cover-back font-play text-slate-900 dark:text-white flex flex-col justify-between items-center text-center transition-all duration-500 cursor-pointer rounded-[10px]"
                      style={{
                        background: getBookCoverTheme(activeCard.id).backBg,
                        border: `2px solid ${getBookCoverTheme(activeCard.id).borderColor}`
                      }}
                      onClick={() => jumpToBookPage(1)}
                    >
                      <div className="w-full flex justify-between items-center text-3xs text-slate-500 dark:text-slate-300 font-play">
                        <span>❖ {activeCard.title}</span>
                        <span>BÌA TRONG</span>
                      </div>

                      <div className="space-y-3">
                        <div 
                          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto border shadow-lg transition-all"
                          style={{
                            background: getBookCoverTheme(activeCard.id).badgeBg,
                            borderColor: getBookCoverTheme(activeCard.id).badgeBorder,
                            color: getBookCoverTheme(activeCard.id).textAccent
                          }}
                        >
                          <Icons.Sparkles className="w-7 h-7" />
                        </div>
                        <div>
                          <h3 className="text-h6 text-slate-900 dark:text-white tracking-wide font-play">{activeCard.subtitle}</h3>
                          <p className="text-3xs mt-1 max-w-[200px] mx-auto italic font-play" style={{ color: getBookCoverTheme(activeCard.id).textAccent }}>"Tri thức thực chiến • Dẫn dắt tương lai"</p>
                        </div>
                      </div>

                      <div className="w-full pt-2 border-t border-slate-300/40 dark:border-white/10 flex items-center justify-between text-3xs text-slate-600 dark:text-slate-300 font-bold font-play">
                        <span 
                          className="btn-page-nav prev cursor-pointer flex items-center gap-1" 
                          style={{ color: getBookCoverTheme(activeCard.id).textAccent }} 
                          onClick={(e) => { e.stopPropagation(); jumpToBookPage(0); }}
                        >
                          <Icons.ChevronLeft className="w-3 h-3" /> Đóng Bìa
                        </span>
                        <span>STU • 2026</span>
                      </div>
                    </div>
                  </div>

                  {/* 2. LEAF 1: TRANG 01 (FRONT) & TRANG 02 (BACK) */}
                  <div
                    className={cn("page", isPage1Flipped && "flipped")}
                    style={{ zIndex: isPage1Flipped ? 10 : 30 }}
                    onClick={() => {
                      safePlay("paperFlip");
                      setIsPage1Flipped(!isPage1Flipped);
                    }}
                  >
                    {/* TRANG 01 • NỘI DUNG CỐT LÕI */}
                    <div className="front-page">
                      <div className="flex-1 overflow-y-auto no-scrollbar pr-0.5 w-full flex flex-col justify-between">
                        <div className="flex items-center justify-between text-2xs sm:text-xs text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800 pb-1.5 mb-2">
                          <span 
                            className="cursor-pointer hover:text-indigo-600 transition-colors"
                            onClick={(e) => { e.stopPropagation(); jumpToBookPage(1); }}
                          >
                            ❖ {activeCard.title}
                          </span>
                          <span 
                            className="cursor-pointer font-bold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-colors"
                            onClick={(e) => { e.stopPropagation(); jumpToBookPage(1); }}
                          >
                            Trang 01
                          </span>
                        </div>

                        <div className="mb-3">
                          <span className="text-xs sm:text-sm font-black text-indigo-600 font-mono leading-none block">01</span>
                          <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100 leading-tight mt-0.5">Nội dung cốt lõi</h3>
                          <p className="text-2xs sm:text-xs text-slate-500 dark:text-slate-400 leading-snug mt-1 font-medium">
                            Khám phá 4 mô-đun trọng tâm giúp bạn làm chủ kỹ năng chuyên sâu & truyền cảm hứng.
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          {activeCard.modules.map((mod, idx) => (
                            <div key={idx} className="p-2.5 rounded-[12px] bg-slate-50/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between items-center text-center shadow-xs">
                              <div className="w-7 h-7 rounded-lg bg-indigo-100/70 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-1.5">
                                <DynamicIcon name={mod.icon || "book-open"} className="w-4 h-4" />
                              </div>
                              <h4 className="text-2xs sm:text-xs font-bold text-slate-800 dark:text-slate-200 leading-snug line-clamp-2 min-h-[30px]">
                                {mod.title}
                              </h4>
                              <p className="text-body font-normal text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight mt-1">
                                {mod.focus}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-2xs sm:text-xs font-bold text-slate-400">
                        <span>CHỦ HỒ SƠ: NGUYỄN HÙNG THÁI</span>
                        <span 
                          className="btn-page-nav next cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            jumpToBookPage(2);
                          }}
                        >
                          Trang 02 (Ứng dụng) <Icons.ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>

                    {/* TRANG 02 • KẾT QUẢ & ỨNG DỤNG */}
                    <div className="back-page">
                      <div className="flex-1 overflow-y-auto no-scrollbar pr-0.5 w-full flex flex-col justify-between">
                        <div className="flex items-center justify-between text-2xs sm:text-xs text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800 pb-1.5 mb-2">
                          <span 
                            className="cursor-pointer hover:text-indigo-600 transition-colors"
                            onClick={(e) => { e.stopPropagation(); jumpToBookPage(2); }}
                          >
                            ❖ {activeCard.title}
                          </span>
                          <span 
                            className="cursor-pointer font-bold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-colors"
                            onClick={(e) => { e.stopPropagation(); jumpToBookPage(2); }}
                          >
                            Trang 02
                          </span>
                        </div>

                        <div className="mb-2.5">
                          <span className="text-xs sm:text-sm font-black text-indigo-600 font-mono leading-none block">02</span>
                          <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100 leading-tight mt-0.5">Kết quả & Ứng dụng</h3>
                          <p className="text-2xs sm:text-xs text-slate-500 dark:text-slate-400 leading-snug mt-1 font-medium">
                            Áp dụng kiến thức vào thực tiễn, tạo ra giá trị cho tổ chức và phát triển sự nghiệp.
                          </p>
                        </div>

                        <div className="space-y-1.5 mt-2">
                          {activeCard.results.map((res, i) => (
                            <div key={i} className="flex items-start gap-1.5 py-1 border-b border-dashed border-slate-100 dark:border-slate-800/60 last:border-0">
                              <span className="text-indigo-500 dark:text-indigo-400 font-extrabold text-xs leading-none select-none">•</span>
                              <p className="text-2xs sm:text-xs font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">
                                {res}
                              </p>
                            </div>
                          ))}
                        </div>


                      </div>

                      <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-2xs sm:text-xs font-bold text-slate-400">
                        <span 
                          className="btn-page-nav prev cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            jumpToBookPage(1);
                          }}
                        >
                          <Icons.ChevronLeft className="w-3 h-3" /> Trang 01
                        </span>
                        <span 
                          className="btn-page-nav next cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            jumpToBookPage(2);
                          }}
                        >
                          Trang 03 (Ảnh) <Icons.ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 3. LEAF 2: TRANG 03 (FRONT) & TRANG XÁC THỰC (BACK) */}
                  <div
                    className={cn("page", isPage2Flipped && "flipped")}
                    style={{ zIndex: isPage2Flipped ? 20 : 20 }}
                    onClick={() => {
                      safePlay("paperFlip");
                      setIsPage2Flipped(!isPage2Flipped);
                    }}
                  >
                    {/* TRANG 03 • HÌNH ẢNH KHÓA HỌC */}
                    <div className="front-page">
                      <div className="flex-1 overflow-y-auto no-scrollbar pr-0.5 w-full flex flex-col justify-between">
                        <div className="flex items-center justify-between text-2xs sm:text-xs text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800 pb-1.5 mb-2">
                          <span 
                            className="cursor-pointer hover:text-indigo-600 transition-colors"
                            onClick={(e) => { e.stopPropagation(); jumpToBookPage(2); }}
                          >
                            ❖ {activeCard.title}
                          </span>
                          <span 
                            className="cursor-pointer font-bold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-colors"
                            onClick={(e) => { e.stopPropagation(); jumpToBookPage(2); }}
                          >
                            Trang 03
                          </span>
                        </div>

                        <div className="mb-2.5">
                          <span className="text-xs sm:text-sm font-black text-indigo-600 font-mono leading-none block">03</span>
                          <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100 leading-tight mt-0.5">Hình ảnh khóa học</h3>
                          <p className="text-2xs sm:text-xs text-slate-500 dark:text-slate-400 leading-snug mt-1 font-medium">
                            Hình ảnh chứng nhận hoàn thành khóa học chính thức.
                          </p>
                        </div>

                        {/* Single Featured Course Image Frame */}
                        <div 
                          className="relative w-full h-52 rounded-[14px] overflow-hidden bg-slate-950 border-2 border-indigo-200/90 dark:border-indigo-800/80 shadow-md group/courseSingle flex items-center justify-center p-2 cursor-pointer"
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            openImagePreview(activeCard.courseImg || activeCard.image, `${activeCard.title} - Hình ảnh khóa học`); 
                          }}
                        >
                          <img 
                            src={activeCard.courseImg || activeCard.image} 
                            alt={activeCard.title} 
                            className="max-w-full max-h-full object-contain group-hover/courseSingle:scale-105 transition-transform duration-300 rounded-md" 
                            referrerPolicy="no-referrer" 
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = activeCard.image;
                            }}
                          />
                          <div className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2 py-1 rounded-lg border border-white/20">
                            <span className="text-2xs sm:text-xs text-white font-medium">Hình khóa học</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openImagePreview(activeCard.courseImg || activeCard.image, `${activeCard.title} - Hình ảnh khóa học`);
                              }}
                              className="w-5.5 h-5.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center transition shadow-md cursor-pointer ml-1"
                              title="Xem ảnh phóng to"
                            >
                              <Icons.Maximize2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-2xs sm:text-xs font-bold text-slate-400">
                        <span 
                          className="btn-page-nav prev cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            jumpToBookPage(2);
                          }}
                        >
                          <Icons.ChevronLeft className="w-3 h-3" /> Trang 02
                        </span>
                        <span 
                          className="btn-page-nav next cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            jumpToBookPage(3);
                          }}
                        >
                          Trang 04 (Bằng cấp) <Icons.ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>

                    {/* TRANG XÁC THỰC SỐ */}
                    <div className="back-page">
                      <div className="flex-1 overflow-y-auto no-scrollbar pr-0.5 w-full flex flex-col justify-between">
                        <div className="flex items-center justify-between text-2xs sm:text-xs text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800 pb-1.5 mb-2">
                          <span 
                            className="cursor-pointer hover:text-indigo-600 transition-colors"
                            onClick={(e) => { e.stopPropagation(); jumpToBookPage(3); }}
                          >
                            ❖ {activeCard.title}
                          </span>
                          <span 
                            className="cursor-pointer font-bold px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white transition-colors"
                            onClick={(e) => { e.stopPropagation(); jumpToBookPage(3); }}
                          >
                            Xác thực số
                          </span>
                        </div>

                        <div className="p-3 rounded-[12px] bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 space-y-2.5 my-1 text-center">
                          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800 shadow-xs">
                            <Icons.ShieldCheck className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">Xác thực bằng cấp chính thức</h4>
                            <p className="text-2xs sm:text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Chứng nhận đã được thẩm định tính xác thực và công nhận trên toàn hệ thống hồ sơ số hóa.</p>
                          </div>

                          <div className="p-2.5 rounded-[10px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-2xs sm:text-xs text-slate-600 dark:text-slate-300 space-y-1.5 text-left">
                            <div className="flex justify-between"><span className="text-slate-400 font-semibold">Đơn vị đào tạo:</span><span className="font-bold text-indigo-700 dark:text-indigo-400">{activeCard.subtitle}</span></div>
                            <div className="flex justify-between"><span className="text-slate-400 font-semibold">Chủ sở hữu:</span><span className="font-bold text-slate-800 dark:text-slate-100">Nguyễn Hùng Thái</span></div>
                            <div className="flex justify-between"><span className="text-slate-400 font-semibold">Mã định danh:</span><span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">STU-VERIFIED-X{activeCard.id}89</span></div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-2xs sm:text-xs font-bold text-slate-400">
                        <span 
                          className="btn-page-nav prev cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            jumpToBookPage(2);
                          }}
                        >
                          <Icons.ChevronLeft className="w-3 h-3" /> Trang 03
                        </span>
                        <span>STU • VERIFIED</span>
                      </div>
                    </div>
                  </div>

                  {/* 4. LEAF 3: TRANG 04 BẰNG CẤP (FRONT) & BÌA SAU (BACK) */}
                  <div
                    className={cn("page", isPage3Flipped && "flipped")}
                    style={{ zIndex: isPage3Flipped ? 30 : 10 }}
                    onClick={() => {
                      safePlay("paperFlip");
                      setIsPage3Flipped(!isPage3Flipped);
                    }}
                  >
                    {/* TRANG 04 • BẰNG CẤP */}
                    <div className="front-page">
                      <div className="flex-1 overflow-y-auto no-scrollbar pr-0.5 w-full flex flex-col justify-between">
                        <div className="flex items-center justify-between text-2xs sm:text-xs text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800 pb-1.5 mb-2">
                          <span 
                            className="cursor-pointer hover:text-indigo-600 transition-colors"
                            onClick={(e) => { e.stopPropagation(); jumpToBookPage(3); }}
                          >
                            ❖ {activeCard.title}
                          </span>
                          <span 
                            className="cursor-pointer font-bold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-colors"
                            onClick={(e) => { e.stopPropagation(); jumpToBookPage(3); }}
                          >
                            Trang 04
                          </span>
                        </div>

                        <div className="mb-2.5">
                          <span className="text-xs sm:text-sm font-black text-indigo-600 font-mono leading-none block">04</span>
                          <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100 leading-tight mt-0.5">Bằng cấp & Chứng nhận</h3>
                          <p className="text-2xs sm:text-xs text-slate-500 dark:text-slate-400 leading-snug mt-1 font-medium">
                            Chứng nhận hoàn thành khóa học {activeCard.title} tại {activeCard.subtitle}.
                          </p>
                        </div>

                        {/* Certificate Selection if multiple exist */}
                        {activeCard.certImg2 && (
                          <div className="flex gap-1 mb-1.5 justify-center">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setCertIndex(0);
                              }}
                              className={cn(
                                "px-2 py-0.5 rounded text-2xs sm:text-xs font-bold cursor-pointer transition-colors",
                                certIndex === 0
                                  ? "bg-indigo-600 text-white shadow-xs"
                                  : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200"
                              )}
                            >
                              Thuyết trình
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setCertIndex(1);
                              }}
                              className={cn(
                                "px-2 py-0.5 rounded text-3xs font-bold cursor-pointer transition-colors",
                                certIndex === 1
                                  ? "bg-indigo-600 text-white shadow-xs"
                                  : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200"
                              )}
                            >
                              Đào tạo
                            </button>
                          </div>
                        )}

                        {/* Certificate Frame displaying the actual certificate image directly without heavy borders */}
                        <div className="relative w-full h-50 flex items-center justify-center">
                          <img
                            src={certIndex === 1 && activeCard.certImg2 ? activeCard.certImg2 : (activeCard.certImg || activeCard.image)}
                            alt="Bằng cấp"
                            className="max-w-full max-h-full object-contain rounded-xl shadow-md cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                            onClick={(e) => {
                              e.stopPropagation();
                              openImagePreview(
                                certIndex === 1 && activeCard.certImg2 ? activeCard.certImg2 : (activeCard.certImg || activeCard.image),
                                `${activeCard.title} - ${certIndex === 1 ? "Đào tạo" : "Thuyết trình"}`
                              );
                            }}
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute bottom-2 right-2 flex gap-1 bg-black/70 p-1.5 rounded-lg backdrop-blur-md border border-white/10 shadow-lg">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                downloadPreviewImg(certIndex === 1 && activeCard.certImg2 ? activeCard.certImg2 : (activeCard.certImg || activeCard.image));
                              }}
                              className="w-6 h-6 rounded bg-slate-900 hover:bg-slate-850 text-white flex items-center justify-center transition cursor-pointer"
                              title="Tải về"
                            >
                              <Icons.Download className="w-3 h-3" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openImagePreview(
                                  certIndex === 1 && activeCard.certImg2 ? activeCard.certImg2 : (activeCard.certImg || activeCard.image),
                                  activeCard.title
                                );
                              }}
                              className="w-6 h-6 rounded bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center transition cursor-pointer"
                              title="Xem đầy đủ"
                            >
                              <Icons.Maximize2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-3xs font-bold text-slate-400">
                        <span 
                          className="btn-page-nav prev cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            jumpToBookPage(2);
                          }}
                        >
                          <Icons.ChevronLeft className="w-3 h-3" /> Trang 03
                        </span>
                        <span 
                          className="btn-page-nav next cursor-pointer" 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            jumpToBookPage(4); 
                          }}
                        >
                          Bìa Sau <Icons.ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>

                    {/* LÓT BÌA SAU TRONG */}
                    <div 
                      className="back-page bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950 text-slate-900 dark:text-white flex flex-col justify-between font-play cursor-pointer shadow-2xl border border-slate-200 dark:border-none rounded-[10px]"
                      onClick={(e) => {
                        e.stopPropagation();
                        jumpToBookPage(0);
                      }}
                    >
                      <div className="text-center py-6">
                        <Icons.Bookmark className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 font-play">HỒ SƠ NĂNG LỰC SỐ HÓA</h4>
                        <p className="text-3xs text-slate-600 dark:text-slate-400 mt-1 max-w-[200px] mx-auto font-play">"Học tập suốt đời • Làm chủ công nghệ • Lãnh đạo bằng sự thấu cảm"</p>
                      </div>
                      <div className="text-3xs text-slate-500 dark:text-slate-400 text-center font-play">BẢN QUYỀN THUỘC VỀ NGUYỄN HÙNG THÁI</div>
                    </div>
                  </div>

                  {/* 5. BACK COVER (Font 'Play') */}
                  <div 
                    className="back-cover font-play flex flex-col justify-between items-center text-center text-slate-900 dark:text-white cursor-pointer p-5 rounded-[10px]"
                    style={{
                      background: getBookCoverTheme(activeCard.id).backCoverBg,
                      border: `2px solid ${getBookCoverTheme(activeCard.id).borderColor}`
                    }}
                    onClick={() => jumpToBookPage(0)}
                  >
                    <div className="w-full flex justify-end">
                      <span className="text-2xs font-mono font-bold" style={{ color: getBookCoverTheme(activeCard.id).textAccent }}>STU • 2026</span>
                    </div>
                    <div className="space-y-2">
                      <div 
                        className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto border shadow-md transition-all"
                        style={{
                          background: getBookCoverTheme(activeCard.id).badgeBg,
                          borderColor: getBookCoverTheme(activeCard.id).badgeBorder,
                          color: getBookCoverTheme(activeCard.id).textAccent
                        }}
                      >
                        <Icons.GraduationCap className="w-6 h-6" />
                      </div>
                      <h3 className="text-sm sm:text-base text-slate-900 dark:text-white font-play font-bold">Hồ sơ học vấn 3D</h3>
                      <p className="text-2xs font-play font-bold" style={{ color: getBookCoverTheme(activeCard.id).textAccent }}>Nguyễn Hùng Thái • STU Alumni</p>
                    </div>
                    <div className="w-full pt-2 border-t border-slate-300/40 dark:border-white/10 text-2xs text-slate-500 dark:text-slate-300 font-play font-bold">
                      <span>BÌA SAU</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
              
              {/* ================= BOTTOM CONTROL BAR ================= */}
              {/* Nhóm nút chuyển trang được đặt độc lập, đẹp đẽ và dễ bấm ở Bottom */}
              <div className="w-full border-t border-slate-200/50 dark:border-slate-800/50 pt-2.5 flex flex-col items-center gap-2">
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 text-xs font-bold overflow-x-auto max-w-full no-scrollbar shadow-inner">
                  <button
                    onClick={() => jumpToBookPage(0)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg transition-all duration-300 whitespace-nowrap flex items-center gap-1.5 cursor-pointer border text-xs font-extrabold",
                      currentBookStep === 0
                        ? "bg-amber-500 text-slate-950 shadow-md border-amber-300 ring-1 ring-amber-300 scale-105 font-black"
                        : "bg-transparent text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border-transparent"
                    )}
                  >
                    <Icons.BookOpen className="w-3.5 h-3.5" />
                    <span>{isVi ? "Bìa Sách" : "Cover"}</span>
                  </button>
                  <button
                    onClick={() => jumpToBookPage(1)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg transition-all duration-300 whitespace-nowrap flex items-center gap-1.5 cursor-pointer border text-xs font-extrabold",
                      currentBookStep === 1
                        ? "bg-indigo-600 text-white shadow-md border-indigo-400 ring-1 ring-indigo-400 scale-105 font-black"
                        : "bg-transparent text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border-transparent"
                    )}
                  >
                    <Icons.FileText className="w-3.5 h-3.5" />
                    <span>{isVi ? "Trang 01 (Nội dung)" : "Page 1 (Content)"}</span>
                  </button>
                  <button
                    onClick={() => jumpToBookPage(2)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg transition-all duration-300 whitespace-nowrap flex items-center gap-1.5 cursor-pointer border text-xs font-extrabold",
                      currentBookStep === 2
                        ? "bg-indigo-600 text-white shadow-md border-indigo-400 ring-1 ring-indigo-400 scale-105 font-black"
                        : "bg-transparent text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border-transparent"
                    )}
                  >
                    <Icons.Layers className="w-3.5 h-3.5" />
                    <span>{isVi ? "Trang 02 – 03 (Ứng dụng)" : "Page 2-3 (Applications)"}</span>
                  </button>
                  <button
                    onClick={() => jumpToBookPage(3)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg transition-all duration-300 whitespace-nowrap flex items-center gap-1.5 cursor-pointer border text-xs font-extrabold",
                      currentBookStep === 3
                        ? "bg-indigo-600 text-white shadow-md border-indigo-400 ring-1 ring-indigo-400 scale-105 font-black"
                        : "bg-transparent text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border-transparent"
                    )}
                  >
                    <Icons.Award className="w-3.5 h-3.5" />
                    <span>{isVi ? "Trang 04 (Bằng cấp)" : "Page 4 (Diploma)"}</span>
                  </button>
                  <button
                    onClick={() => jumpToBookPage(4)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg transition-all duration-300 whitespace-nowrap flex items-center gap-1.5 cursor-pointer border text-xs font-extrabold",
                      currentBookStep === 4
                        ? "bg-amber-500 text-slate-950 shadow-md border-amber-300 ring-1 ring-amber-300 scale-105 font-black"
                        : "bg-transparent text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border-transparent"
                    )}
                  >
                    <Icons.Bookmark className="w-3.5 h-3.5 text-amber-500" />
                    <span>{isVi ? "Bìa Sau" : "Back Cover"}</span>
                  </button>
                </div>
              </div>

            </div>
          )}

      {/* ================= EDIT PROFILE BANNER MODAL ================= */}
      {isBannerModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-[10px] glass-card-bright p-5 shadow-2xl space-y-3 bg-white dark:bg-slate-900 border border-white dark:border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2.5">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2">
                <Icons.UserCog className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Chỉnh Sửa Thông Tin Chủ Hồ Sơ</span>
              </h3>
              <button onClick={() => setIsBannerModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <Icons.X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Họ và Tên:</label>
                <input
                  type="text"
                  value={inputProfileName}
                  onChange={(e) => setInputProfileName(e.target.value)}
                  className="w-full p-2.5 rounded-[10px] glass-inner-item text-slate-800 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Chức Danh & Kinh Nghiệm:</label>
                <input
                  type="text"
                  value={inputProfileTitle}
                  onChange={(e) => setInputProfileTitle(e.target.value)}
                  className="w-full p-2.5 rounded-[10px] glass-inner-item text-slate-800 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setIsBannerModalOpen(false)}
                className="px-3.5 py-1.5 rounded-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={saveProfileBanner}
                className="px-4 py-1.5 rounded-[10px] bg-indigo-600 text-white text-xs font-bold shadow-md hover:bg-indigo-500 transition cursor-pointer"
              >
                Lưu Thay Đổi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= AI ASSISTANT MODAL (GEMINI 2.5 FLASH) ================= */}
      {isAiModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-[10px] glass-card-bright p-5 shadow-2xl space-y-3.5 bg-white dark:bg-slate-900 border border-white dark:border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-pink-500 to-indigo-600 flex items-center justify-center text-white">
                  <Icons.Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Trợ Lý Phân Tích Năng Lực AI (Gemini 2.5)</h3>
                  <p className="text-3xs text-indigo-600 dark:text-indigo-400 font-semibold">Tự động tổng hợp ma trận năng lực & lộ trình phát triển</p>
                </div>
              </div>
              <button onClick={() => setIsAiModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <Icons.X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Yêu cầu phân tích chuyên sâu:</label>
              <textarea
                rows={3}
                value={aiPromptInput}
                onChange={(e) => setAiPromptInput(e.target.value)}
                placeholder="Ví dụ: Phân tích sự kết hợp giữa kỹ năng Đào tạo & Thuyết trình và năng lực Lãnh đạo CSKH..."
                className="w-full p-2.5 rounded-[12px] glass-inner-item text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 resize-none leading-relaxed"
              ></textarea>
            </div>

            {/* Quick Prompt Suggestions */}
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => { safePlay("click"); setAiPromptInput("Đánh giá ma trận Kỹ thuật & Quản trị"); }}
                className="text-3xs px-2 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 font-medium transition border border-indigo-100 dark:border-indigo-900 cursor-pointer"
              >
                Đánh giá ma trận Kỹ thuật & Quản trị
              </button>
              <button
                onClick={() => { safePlay("click"); setAiPromptInput("Năng lực Đào tạo & Truyền cảm hứng đội ngũ"); }}
                className="text-3xs px-2 py-1 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 hover:bg-purple-100 font-medium transition border border-purple-100 dark:border-purple-900 cursor-pointer"
              >
                Năng lực Đào tạo & Truyền cảm hứng đội ngũ
              </button>
              <button
                onClick={() => { safePlay("click"); setAiPromptInput("Tóm tắt năng lực nổi bật cho hồ sơ Lãnh đạo"); }}
                className="text-3xs px-2 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 font-medium transition border border-emerald-100 dark:border-emerald-900 cursor-pointer"
              >
                Tóm tắt năng lực nổi bật cho hồ sơ Lãnh đạo
              </button>
            </div>

            {/* AI Response Container */}
            {showAiResponse && (
              <div className="max-h-48 overflow-y-auto thin-scrollbar p-3 rounded-[12px] bg-slate-900 text-slate-100 text-xs leading-relaxed space-y-2 font-mono">
                <div className="flex items-center gap-2 text-indigo-400 font-bold border-b border-slate-700 pb-1">
                  <Icons.Cpu className="w-3.5 h-3.5" />
                  <span>KẾT QUẢ PHÂN TÍCH TỪ AI:</span>
                </div>
                <div className="text-2xs whitespace-pre-wrap">{aiResponseText}</div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setIsAiModalOpen(false)}
                className="px-3.5 py-1.5 rounded-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 cursor-pointer"
              >
                Đóng
              </button>
              <button
                disabled={aiLoading}
                onClick={handleAiAnalyze}
                className={cn(
                  "px-4 py-1.5 rounded-[10px] bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white text-xs font-bold shadow-md hover:opacity-90 transition flex items-center gap-1.5 cursor-pointer",
                  aiLoading && "opacity-50 cursor-not-allowed"
                )}
              >
                <Icons.Zap className="w-3.5 h-3.5" />
                <span>Phân Tích Ngay</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= CROP & BANNER SELECTION MODAL ================= */}
      {isCropModalOpen && (
        <div
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setIsCropModalOpen(false)}
        >
          <div
            className="relative max-w-xl w-full bg-white dark:bg-slate-900 rounded-[10px] p-5 shadow-2xl border border-white/80 dark:border-slate-800 flex flex-col space-y-4 glass-card-bright"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-600 flex items-center justify-center font-bold">
                  <Icons.Crop className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Cắt Hình & Chọn Làm Banner Thẻ</h4>
                  <p className="text-3xs text-slate-500 truncate max-w-[320px]">{cropTitle}</p>
                </div>
              </div>
              <button
                onClick={() => setIsCropModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 transition cursor-pointer"
              >
                <Icons.X className="w-5 h-5" />
              </button>
            </div>

            {/* Crop Preview Area with aspect ratio & zoom */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Chọn tỷ lệ khung hình (Aspect Ratio):</span>
                <div className="flex gap-1.5">
                  {(["16/9", "4/3", "1/1", "21/9"] as const).map((ratio) => (
                    <button
                      key={ratio}
                      onClick={() => { safePlay("click"); setCropAspectRatio(ratio); }}
                      className={cn(
                        "px-2.5 py-1 rounded-lg text-3xs font-bold transition cursor-pointer border",
                        cropAspectRatio === ratio
                          ? "bg-amber-500 text-slate-950 border-amber-300 shadow-xs"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                      )}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>

              {/* Crop Frame Box */}
              <div 
                className={cn(
                  "relative w-full mx-auto overflow-hidden bg-slate-950 rounded-[14px] border-2 border-amber-400/80 shadow-inner flex items-center justify-center p-2",
                  cropAspectRatio === "16/9" && "aspect-video",
                  cropAspectRatio === "4/3" && "aspect-[4/3]",
                  cropAspectRatio === "1/1" && "aspect-square",
                  cropAspectRatio === "21/9" && "aspect-[21/9]"
                )}
              >
                <img
                  src={cropImgUrl}
                  alt="Crop Preview"
                  className="max-w-full max-h-full object-contain transition-transform duration-200 rounded"
                  style={{ transform: `scale(${cropZoom})` }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 border-2 border-dashed border-amber-400/60 pointer-events-none rounded-[14px] m-2"></div>
                <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-3xs font-mono font-bold text-amber-300 border border-white/20">
                  Tỷ lệ: {cropAspectRatio} | Zoom: {cropZoom.toFixed(1)}x
                </div>
              </div>

              {/* Zoom Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
                  <span>Thu phóng (Zoom):</span>
                  <span className="font-mono">{cropZoom.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="2.5"
                  step="0.1"
                  value={cropZoom}
                  onChange={(e) => setCropZoom(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setIsCropModalOpen(false)}
                className="px-4 py-2 rounded-[12px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 transition cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveCrop}
                className="px-4 py-2 rounded-[12px] bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs font-black shadow-md hover:opacity-95 transition flex items-center gap-1.5 cursor-pointer"
              >
                <Icons.Check className="w-4 h-4" />
                <span>Cắt & Lưu Làm Banner</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= IMAGE LIGHTBOX PREVIEW MODAL ================= */}
      {isPreviewModalOpen && (
        <div
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setIsPreviewModalOpen(false)}
        >
          <div
            className="relative max-w-3xl w-full max-h-[90vh] bg-white/95 dark:bg-slate-900/95 rounded-[10px] p-4 shadow-2xl border border-white/80 dark:border-slate-800 flex flex-col items-center glass-card-bright"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <Icons.ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h4 className="font-bold text-slate-800 dark:text-slate-100 text-xs sm:text-sm truncate max-w-[400px]">{previewModalTitle}</h4>
              </div>
              <button
                onClick={() => setIsPreviewModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 transition cursor-pointer"
              >
                <Icons.X className="w-5 h-5" />
              </button>
            </div>

            <div className="w-full flex-1 overflow-hidden flex items-center justify-center rounded-[16px] bg-slate-950/5 p-2 border border-slate-200/60 dark:border-slate-800">
              <img
                src={previewModalImg}
                alt="Certificate Preview"
                className="max-h-[58vh] max-w-full object-contain rounded-[12px] shadow-md transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="w-full flex items-center justify-between pt-3 mt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-bold">
              <span className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                <Icons.CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Bản số hóa gốc đã kiểm định</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => downloadPreviewImg()}
                  className="px-3.5 py-1.5 rounded-[10px] bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center gap-1.5 shadow hover:opacity-95 transition cursor-pointer"
                >
                  <Icons.Download className="w-3.5 h-3.5" />
                  <span>Tải Hình Ảnh</span>
                </button>
                <button
                  onClick={() => setIsPreviewModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-[10px] bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 transition cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= API SETTINGS MODAL: CODE JSON POPUP ================= */}
      {isCodeModalOpen && activeCodeJson && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsCodeModalOpen(false)}
        >
          <div
            className="relative max-w-md w-full bg-[#0D0D0D] rounded-2xl p-5 shadow-2xl border border-white/10 flex flex-col space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex flex-row items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Icons.Code className="w-4 h-4 text-indigo-400" />
                <h4 className="font-bold text-white text-sm tracking-wide">
                  {isVi ? "Mã nguồn học phần" : "Course Source Code"}
                </h4>
              </div>
              <button
                onClick={() => {
                  safePlay("click");
                  setIsCodeModalOpen(false);
                }}
                className="p-1 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <Icons.X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex flex-col space-y-3">
              <label className="text-3xs font-mono uppercase tracking-wider text-slate-500 block">
                {isVi ? "Cấu trúc JSON học phần" : "JSON course data structure"}
              </label>
              <div className="relative w-full rounded-xl bg-black/50 border border-white/5 p-4 overflow-auto max-h-[300px] text-left">
                <pre className="text-xs font-mono text-indigo-300 leading-relaxed whitespace-pre-wrap select-all">
                  {activeCodeJson}
                </pre>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
              <button
                onClick={() => {
                  safePlay("click");
                  setIsCodeModalOpen(false);
                }}
                className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-slate-300 text-xs font-bold transition cursor-pointer"
              >
                {isVi ? "Đóng" : "Close"}
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(activeCodeJson);
                  safePlay("success");
                  setCopiedState(true);
                  triggerToast(isVi ? "Đã sao chép mã JSON thành công!" : "Copied JSON code successfully!");
                  setTimeout(() => setCopiedState(false), 2000);
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/20 transition flex items-center gap-1.5 cursor-pointer"
              >
                {copiedState ? (
                  <>
                    <Icons.Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{isVi ? "Đã sao chép" : "Copied"}</span>
                  </>
                ) : (
                  <>
                    <Icons.Copy className="w-3.5 h-3.5" />
                    <span>{isVi ? "Sao chép code" : "Copy code"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2.5 rounded-[14px] shadow-2xl flex items-center gap-2 z-50 text-xs font-bold animate-bounce">
          <Icons.CheckCircle className="w-4 h-4 text-emerald-300" />
          <span>{toastMsg}</span>
        </div>
      )}
    </section>
  );
}
