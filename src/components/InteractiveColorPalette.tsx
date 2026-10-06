import React, { useState } from "react";
import { useLanguage } from "../i18n";
import { 
  Palette, 
  Copy, 
  Check, 
  Sparkles, 
  CheckCircle2, 
  SlidersHorizontal,
  Code2,
  Layers,
  ArrowRight
} from "lucide-react";
import { playUiSound } from "../lib/sound";
import { USER_GRADIENTS, UserGradientItem } from "../data/userGradientsData";
import { useTheme } from "../context/ThemeContext";

export const InteractiveColorPalette: React.FC = () => {
  const { lang } = useLanguage();
  const isVi = lang === "vi";
  const { activeUserGradient, applyUserGradient } = useTheme();

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const handleCopy = (text: string, key: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      try { playUiSound("click"); } catch {}
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {}
  };

  const handleApply = (item: UserGradientItem) => {
    applyUserGradient(item.id);
    try { playUiSound("click"); } catch {}
  };

  const filteredGradients = selectedCategory === "all"
    ? USER_GRADIENTS
    : USER_GRADIENTS.filter(g => g.category === selectedCategory);

  const categories = [
    { id: "all", labelVi: "Tất cả 15 Gradients", labelEn: "All 15 Gradients", count: 15 },
    { id: "green", labelVi: "🌿 Xanh lá (0, 1, 2)", labelEn: "🌿 Green", count: 3 },
    { id: "blue", labelVi: "🌊 Xanh dương (3, 4, 5)", labelEn: "🌊 Blue", count: 3 },
    { id: "purple", labelVi: "🔮 Tím (6, 9)", labelEn: "🔮 Purple", count: 2 },
    { id: "pink", labelVi: "🍑 Hồng & Đào (7, 8, 10, 11)", labelEn: "🍑 Pink & Peach", count: 4 },
    { id: "neutral", labelVi: "🌑 Tối giản & Onyx (12, 13, 14)", labelEn: "🌑 Neutral & Onyx", count: 3 },
  ];

  return (
    <div className="w-full p-4 sm:p-6 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-white/10 backdrop-blur-xl shadow-xl flex flex-col gap-4">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/60 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-gradient-to-tr from-[#5583EE] via-[#41D8DD] to-[#6CACFF] text-white shadow-md shadow-blue-500/25 shrink-0">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white font-play">
                {isVi ? "Hệ Thống 15 Màu Sắc & Gradient Website" : "15 Gradient Color Palette System"}
              </h3>
              <span className="text-3xs font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 dark:bg-cyan-500/10 text-indigo-600 dark:text-cyan-400 border border-indigo-500/20 dark:border-cyan-500/20">
                #0 → #14
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {isVi 
                ? "Bộ phối màu chuyển sắc cao cấp kết hợp nền dịu mắt #ECEFFC. Click bất kỳ màu nào để áp dụng trực tiếp lên giao diện."
                : "Premium multi-hue gradient system paired with soft #ECEFFC base background. Click any card to apply live to the UI."}
            </p>
          </div>
        </div>

        {/* Base Background Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 w-fit shrink-0">
          <span className="w-3.5 h-3.5 rounded-full border border-slate-300 dark:border-slate-700 shadow-2xs" style={{ backgroundColor: "#ECEFFC" }} />
          <span className="text-3xs font-mono font-bold text-slate-700 dark:text-slate-300">
            Base: #ECEFFC
          </span>
        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                isSelected
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md scale-102"
                  : "bg-slate-100/80 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200/70 dark:hover:bg-white/10"
              }`}
            >
              <span>{isVi ? cat.labelVi : cat.labelEn}</span>
              <span className={`text-3xs px-1.5 py-0.2 rounded-full font-mono ${
                isSelected ? "bg-white/20 dark:bg-black/20" : "bg-slate-200 dark:bg-white/10"
              }`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* The 15 Gradients Grid (using the exact CSS specifications from user request) */}
      <ul className="gradient-showcase-gallery">
        {filteredGradients.map((item) => {
          const isActive = activeUserGradient === item.id;
          const copyCssKey = `css-${item.id}`;
          const isCssCopied = copiedKey === copyCssKey;

          return (
            <li 
              key={item.id} 
              className={`gradient-showcase-item ${item.classId} group`}
            >
              {/* Interactive Gradient Card */}
              <div 
                className={`gradient relative cursor-pointer group-hover:shadow-xl transition-all duration-300 ${
                  isActive ? "ring-4 ring-indigo-500 dark:ring-cyan-400 ring-offset-2 ring-offset-white dark:ring-offset-slate-900" : ""
                }`}
                onClick={() => handleApply(item)}
                title={isVi ? `Click để áp dụng dải màu ${item.nameVi} lên website` : `Click to apply ${item.name} to website`}
              >
                {/* Active Status Badge */}
                {isActive && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-3xs font-bold flex items-center gap-1 shadow-lg animate-in fade-in">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>{isVi ? "Đang dùng" : "Active"}</span>
                  </div>
                )}

                {/* Floating Quick Action Overlay on Hover */}
                <div className="absolute inset-0 rounded-[20px] bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 p-3 text-white backdrop-blur-[2px]">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApply(item);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-white text-slate-900 text-xs font-bold shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{isVi ? "Áp dụng ngay" : "Apply to Site"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleCopy(item.css, copyCssKey, e)}
                    className="px-3 py-1 rounded-lg bg-black/50 hover:bg-black/70 text-white text-2xs font-mono transition-all flex items-center gap-1 cursor-pointer"
                  >
                    {isCssCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{isCssCopied ? (isVi ? "Đã sao chép!" : "Copied!") : "Copy CSS"}</span>
                  </button>
                </div>
              </div>

              {/* Start & End Color Indicators with exact user specs */}
              <div 
                className="start-color cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors"
                onClick={() => handleCopy(item.end, `end-${item.id}`)}
                title={`Copy End Color: ${item.end}`}
              />
              <div 
                className="end-color cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors"
                onClick={() => handleCopy(item.start, `start-${item.id}`)}
                title={`Copy Start Color: ${item.start}`}
              />

              {/* Card Label */}
              <div className="mt-1 px-1 flex flex-col items-center text-center">
                <span className="text-2xs font-bold text-slate-700 dark:text-slate-200 truncate max-w-[90%]">
                  {isVi ? item.nameVi : item.name}
                </span>
                <span className="text-3xs text-slate-400 font-mono">
                  {item.start} → {item.end}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Footer Helper */}
      <div className="pt-3 border-t border-slate-200/60 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-indigo-500" />
          <span>
            {isVi 
              ? "Góc xoay gradient chuẩn 33deg • Tự động tính toán độ tương phản văn bản WCAG AAA"
              : "Standard 33deg angle gradients • Automatic WCAG AAA text contrast adjustment"}
          </span>
        </div>
        <span className="text-3xs font-mono text-slate-400">
          CSS: linear-gradient(33deg, var(--gradient-start), var(--gradient-end))
        </span>
      </div>
    </div>
  );
};

export default InteractiveColorPalette;
