import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Wand2, 
  Sparkles, 
  Image as ImageIcon, 
  Upload, 
  Download, 
  Check, 
  Copy, 
  RefreshCw, 
  X, 
  Sliders, 
  Eye, 
  Layers, 
  Monitor, 
  Maximize2, 
  RotateCcw, 
  AlertCircle,
  Zap,
  ArrowRight,
  Plus
} from "lucide-react";
import { useBackground } from "../../context/BackgroundContext";
import { useLanguage } from "../../i18n";
import { playUiSound } from "../../lib/sound";

interface ImageStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "create" | "edit";
  initialImage?: string;
}

const SAMPLE_PROMPTS = [
  {
    title: "Portfolio Cyberpunk Banners",
    prompt: "A high-tech digital workspace banner with futuristic neon purple and electric cyan lighting, glassmorphism UI elements, sleek servers, photorealistic 8K render",
    style: "Cyberpunk",
    aspectRatio: "16:9",
  },
  {
    title: "AI Contact Center Hologram",
    prompt: "An isometric 3D glowing hologram representation of a smart AI customer support center, floating nodes, blue and teal glass gradient background, ultra detailed",
    style: "Cinematic 3D",
    aspectRatio: "16:9",
  },
  {
    title: "Executive CX Leader Avatar",
    prompt: "A professional portrait of a confident technology leader, elegant dark background with subtle ambient iris illumination, studio lighting, photorealistic",
    style: "Photorealistic",
    aspectRatio: "1:1",
  },
  {
    title: "Abstract Gradient Glass Mesh",
    prompt: "A smooth liquid glass abstract wallpaper with pastel mint, peach, and soft violet glowing waves, 3D caustic blur reflections, minimal aesthetic",
    style: "Minimalist",
    aspectRatio: "16:9",
  },
];

const STYLE_PRESETS = [
  { label: "Tự nhiên / Photorealistic", value: "photorealistic, studio lighting, highly detailed 8K" },
  { label: "Cinematic 3D", value: "3D render, octane render, volumetric lighting, unreal engine 5" },
  { label: "Cyberpunk Tech", value: "cyberpunk, neon glow, dark tech background, electric blue and purple" },
  { label: "Minimalist Glass", value: "minimalist glassmorphism, soft gradient blur, caustics, clean layout" },
  { label: "Digital Art", value: "digital illustration, vibrant colors, artistic concept art" },
];

export default function ImageStudioModal({
  isOpen,
  onClose,
  initialMode = "create",
  initialImage = "",
}: ImageStudioModalProps) {
  const { lang } = useLanguage();
  const { config, addBackgroundLink, setActiveBackground } = useBackground();
  const isVi = lang === "vi";

  const [mode, setMode] = useState<"create" | "edit">(initialMode);
  const [prompt, setPrompt] = useState("");
  const [sourceImage, setSourceImage] = useState<string>(initialImage);
  const [aspectRatio, setAspectRatio] = useState<string>("16:9");
  const [imageSize, setImageSize] = useState<string>("1K");
  const [selectedStyle, setSelectedStyle] = useState<string>("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [showComparison, setShowComparison] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialImage) {
      setSourceImage(initialImage);
      setMode("edit");
    }
  }, [initialImage]);

  const showToast = (text: string) => {
    setToastMsg(text);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMsg(isVi ? "Vui lòng chọn file hình ảnh hợp lệ (PNG, JPG, WEBP)." : "Please select a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setSourceImage(reader.result);
        setErrorMsg(null);
        playUiSound("click");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUseCurrentBackground = () => {
    const activeItem = config.items.find((item) => item.id === config.activeId);
    if (activeItem && activeItem.url && activeItem.type === "image") {
      setSourceImage(activeItem.url);
      setMode("edit");
      showToast(isVi ? "Đã nạp hình nền trang web hiện tại!" : "Loaded active website wallpaper!");
      playUiSound("click");
    } else {
      setErrorMsg(isVi ? "Hình nền hiện tại không phải là ảnh tĩnh." : "Active wallpaper is not a static image.");
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setErrorMsg(isVi ? "Vui lòng nhập mô tả ý tưởng hình ảnh (prompt)." : "Please enter a prompt description.");
      return;
    }

    setIsGenerating(true);
    setErrorMsg(null);
    setExplanation(null);
    setGenerationStep(1);
    playUiSound("open");

    const timer1 = setTimeout(() => setGenerationStep(2), 1500);
    const timer2 = setTimeout(() => setGenerationStep(3), 3500);

    try {
      const fullPrompt = selectedStyle 
        ? `${prompt.trim()}, ${selectedStyle}`
        : prompt.trim();

      const payload: any = {
        prompt: fullPrompt,
        aspectRatio,
        imageSize,
        model: "gemini-3.1-flash-image-preview",
      };

      if (mode === "edit" && sourceImage) {
        payload.image = sourceImage;
      }

      const res = await fetch("/api/gemini/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to process image generation request.");
      }

      setGeneratedImage(data.imageUrl);
      if (data.text) setExplanation(data.text);
      showToast(isVi ? "Đã tạo/chỉnh sửa ảnh thành công!" : "Image created/edited successfully!");
      playUiSound("success");
    } catch (err: any) {
      console.error("Error generating image:", err);
      setErrorMsg(err.message || (isVi ? "Lỗi trong quá trình kết nối AI. Vui lòng thử lại." : "Error during AI generation. Please try again."));
      playUiSound("error");
    } finally {
      clearTimeout(timer1);
      clearTimeout(timer2);
      setIsGenerating(false);
      setGenerationStep(0);
    }
  };

  const handleApplyAsWallpaper = () => {
    if (!generatedImage) return;

    const newTitle = `AI Gemini ${mode === "edit" ? "Edited" : "Generated"} - ${new Date().toLocaleTimeString()}`;
    addBackgroundLink(generatedImage, "image", newTitle);
    
    // Find item or set active directly
    const foundItem = config.items.find((item) => item.url === generatedImage);
    if (foundItem) {
      setActiveBackground(foundItem.id, "image", generatedImage);
    } else if (config.items.length > 0) {
      const lastItem = config.items[config.items.length - 1];
      setActiveBackground(lastItem.id, "image", generatedImage);
    }
    showToast(isVi ? "Đã áp dụng hình ảnh AI làm nền website!" : "Applied AI image as website wallpaper!");
    playUiSound("success");
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const a = document.createElement("a");
    a.href = generatedImage;
    a.download = `gemini-ai-studio-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast(isVi ? "Đã tải ảnh về máy!" : "Downloaded image!");
    playUiSound("click");
  };

  const handleCopyBase64 = () => {
    if (!generatedImage) return;
    navigator.clipboard.writeText(generatedImage);
    showToast(isVi ? "Đã sao chép Data URL của ảnh!" : "Copied image Data URL!");
    playUiSound("click");
  };

  const handleEditFurther = () => {
    if (!generatedImage) return;
    setSourceImage(generatedImage);
    setMode("edit");
    setPrompt("");
    showToast(isVi ? "Đã chuyển ảnh vừa tạo thành ảnh nguồn để tiếp tục chỉnh sửa!" : "Set generated image as input for further editing!");
    playUiSound("click");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-5xl my-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-[24px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/60 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 text-white shadow-md shadow-indigo-500/20">
                <Wand2 className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {isVi ? "Gemini AI Image Studio" : "Gemini AI Image Studio"}
                  </h2>
                  <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 border border-purple-200 dark:border-purple-700">
                    gemini-3.1-flash-image-preview
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isVi 
                    ? "Tạo hình ảnh mới từ mô tả hoặc tải ảnh lên để biến đổi bằng AI Gemini" 
                    : "Create new images from text prompts or transform existing images using Gemini AI"}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode Switch Tabs */}
          <div className="flex border-b border-slate-200/60 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-950/40 px-6 pt-3 gap-2">
            <button
              onClick={() => { setMode("create"); playUiSound("click"); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-sm font-semibold transition-all border-b-2 ${
                mode === "create"
                  ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              {isVi ? "Tạo Ảnh Mới (Text to Image)" : "Create New Image"}
            </button>

            <button
              onClick={() => { setMode("edit"); playUiSound("click"); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-sm font-semibold transition-all border-b-2 ${
                mode === "edit"
                  ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Sliders className="w-4 h-4" />
              {isVi ? "Chỉnh Sửa & Biến Đổi Ảnh (Image Edit)" : "Edit & Transform Image"}
            </button>
          </div>

          {/* Main Body Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 overflow-y-auto flex-1">
            {/* Left Column: Form & Controls (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              {/* Image Upload Zone if Mode === "edit" */}
              {mode === "edit" && (
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
                    <span>{isVi ? "1. Ảnh Nguồn Cần Chỉnh Sửa" : "1. Source Image to Edit"}</span>
                    <button
                      type="button"
                      onClick={handleUseCurrentBackground}
                      className="text-[11px] font-medium text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
                    >
                      <Monitor className="w-3 h-3" />
                      {isVi ? "Dùng Nền Website" : "Use Site Background"}
                    </button>
                  </label>

                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="group relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-4 text-center cursor-pointer hover:border-purple-500 dark:hover:border-purple-400 transition-all bg-slate-50/50 dark:bg-slate-900/50 hover:bg-purple-50/30 dark:hover:bg-purple-900/10 overflow-hidden min-h-[120px] flex flex-col items-center justify-center"
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="hidden"
                    />

                    {sourceImage ? (
                      <div className="relative w-full h-32 rounded-lg overflow-hidden group">
                        <img 
                          src={sourceImage} 
                          alt="Source" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold">
                          <Upload className="w-4 h-4" />
                          {isVi ? "Thay đổi ảnh khác" : "Change Image"}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400 py-2">
                        <Upload className="w-6 h-6 text-purple-500 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-medium">
                          {isVi ? "Kéo thả hoặc nhấp để chọn ảnh PNG/JPG" : "Drag & drop or click to upload PNG/JPG"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Prompt Input Area */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {mode === "create"
                    ? (isVi ? "1. Nhập Ý Tưởng Mô Tả (Prompt)" : "1. Enter Prompt Description")
                    : (isVi ? "2. Yêu Cầu Chỉnh Sửa AI" : "2. AI Edit Instructions")}
                </label>
                <div className="relative">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={
                      mode === "create"
                        ? (isVi 
                            ? "Ví dụ: Một thành phố tương lai rực rỡ đèn neon, phong cách cyberpunk, chất lượng 8K..." 
                            : "E.g., A futuristic cyberpunk city banner with glowing purple lights, 8K render...")
                        : (isVi 
                            ? "Ví dụ: Thêm ánh sáng aurora huyền ảo lên bầu trời, biến phông nền thành thành phố tương lai..." 
                            : "E.g., Add glowing aurora lights to the sky, make background a futuristic city...")
                    }
                    rows={3}
                    className="w-full p-3.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all resize-none shadow-inner"
                  />
                  {prompt && (
                    <button
                      onClick={() => setPrompt("")}
                      className="absolute top-2.5 right-2.5 p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Preset Prompts Buttons */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  {isVi ? "Gợi Ý Mẫu Prompt Nhanh:" : "Quick Sample Prompts:"}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {SAMPLE_PROMPTS.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setPrompt(p.prompt);
                        setAspectRatio(p.aspectRatio);
                        playUiSound("click");
                      }}
                      className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-purple-100 hover:text-purple-700 dark:hover:bg-purple-950/60 dark:hover:text-purple-300 border border-slate-200/80 dark:border-slate-700/80 transition-colors"
                    >
                      ✨ {p.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Aspect Ratio & Resolution Grid */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                {/* Aspect Ratio */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    {isVi ? "Tỷ Lệ Khung Hình" : "Aspect Ratio"}
                  </label>
                  <select
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value)}
                    className="h-10 px-3 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500/50 outline-none"
                  >
                    <option value="16:9">16:9 (Hình Bìa / Landscape)</option>
                    <option value="1:1">1:1 (Hình Vuông / Square)</option>
                    <option value="4:3">4:3 (Tiêu Chuẩn / Standard)</option>
                    <option value="9:16">9:16 (Màn Hình Dọc / Story)</option>
                    <option value="3:4">3:4 (Chân Dung / Portrait)</option>
                  </select>
                </div>

                {/* Resolution */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    {isVi ? "Độ Phân Giải" : "Resolution"}
                  </label>
                  <select
                    value={imageSize}
                    onChange={(e) => setImageSize(e.target.value)}
                    className="h-10 px-3 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500/50 outline-none"
                  >
                    <option value="1K">1K (1024 px - Chuẩn)</option>
                    <option value="2K">2K (High Resolution)</option>
                    <option value="512px">512 px (Nhanh)</option>
                    <option value="4K">4K (Ultra HD)</option>
                  </select>
                </div>
              </div>

              {/* Style Presets */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {isVi ? "Phong Cách Nghệ Thuật (Tùy Chọn)" : "Artistic Style (Optional)"}
                </label>
                <div className="grid grid-cols-1 gap-1">
                  {STYLE_PRESETS.map((st, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setSelectedStyle(selectedStyle === st.value ? "" : st.value);
                        playUiSound("click");
                      }}
                      className={`px-3 py-1.5 text-xs rounded-lg text-left font-medium transition-all flex items-center justify-between border ${
                        selectedStyle === st.value
                          ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                          : "bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <span>{st.label}</span>
                      {selectedStyle === st.value && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="w-full h-11 mt-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:via-indigo-500 hover:to-cyan-500 text-white font-bold text-sm shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{isVi ? "Đang Khởi Tạo Với AI Gemini..." : "Generating with Gemini AI..."}</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    <span>
                      {mode === "create" 
                        ? (isVi ? "Tạo Ảnh Ngay Với Gemini 3.1" : "Generate Image with Gemini 3.1")
                        : (isVi ? "Biến Đổi & Chỉnh Sửa Ảnh" : "Transform Image with AI")}
                    </span>
                  </>
                )}
              </button>

              {/* Error Alert */}
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            {/* Right Column: Output & Interactive Preview Canvas (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950/20 dark:bg-slate-950/50 rounded-2xl p-4 border border-slate-200/50 dark:border-slate-800/80 min-h-[400px]">
              {/* Toast Notification */}
              {toastMsg && (
                <div className="mb-3 p-2.5 rounded-xl bg-emerald-500 text-white text-xs font-semibold flex items-center justify-between shadow-lg animate-fade-in">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>{toastMsg}</span>
                  </div>
                </div>
              )}

              {/* Canvas Preview Area */}
              <div className="relative flex-1 flex flex-col items-center justify-center rounded-xl overflow-hidden bg-slate-900/40 border border-white/5 p-2">
                {isGenerating ? (
                  <div className="flex flex-col items-center gap-4 text-center p-8">
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
                      <Wand2 className="w-7 h-7 text-purple-400 animate-bounce" />
                    </div>
                    <div className="flex flex-col gap-1 max-w-sm">
                      <h4 className="text-sm font-bold text-white">
                        {generationStep === 1 && (isVi ? "1/3. Đang gửi dữ liệu đến Gemini 3.1 Flash..." : "1/3. Dispatching to Gemini 3.1...")}
                        {generationStep === 2 && (isVi ? "2/3. Phân tích prompt & tổng hợp điểm ảnh..." : "2/3. Synthesizing pixels & lighting...")}
                        {generationStep === 3 && (isVi ? "3/3. Tối ưu độ phân giải & hoàn thiện bức ảnh..." : "3/3. Finalizing resolution & rendering...")}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {isVi ? "Mô hình Gemini AI đang xử lý hiệu ứng hình ảnh phức tạp..." : "Gemini AI is processing complex visual transformations..."}
                      </p>
                    </div>
                  </div>
                ) : generatedImage ? (
                  <div className="relative w-full h-full flex items-center justify-center group overflow-hidden rounded-lg">
                    {/* Toggle Comparison if mode === edit and source exists */}
                    {mode === "edit" && sourceImage && showComparison ? (
                      <div className="grid grid-cols-2 gap-2 w-full h-full">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">
                            {isVi ? "Ảnh Gốc" : "Original"}
                          </span>
                          <img 
                            src={sourceImage} 
                            alt="Original" 
                            className="max-h-[300px] w-full object-contain rounded-lg border border-slate-700" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-[10px] font-bold text-purple-400 uppercase">
                            {isVi ? "Ảnh AI Biến Đổi" : "AI Transformed"}
                          </span>
                          <img 
                            src={generatedImage} 
                            alt="AI Result" 
                            className="max-h-[300px] w-full object-contain rounded-lg border border-purple-500" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                    ) : (
                      <img
                        src={generatedImage}
                        alt="Gemini AI Generated Result"
                        className="max-h-[360px] w-full object-contain rounded-xl shadow-2xl transition-transform duration-300 group-hover:scale-[1.01]"
                        referrerPolicy="no-referrer"
                      />
                    )}

                    {/* Comparison Button Toggle */}
                    {mode === "edit" && sourceImage && (
                      <button
                        onClick={() => setShowComparison(!showComparison)}
                        className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-black/70 hover:bg-black/90 text-white text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-purple-400" />
                        {showComparison ? (isVi ? "Xem Ảnh AI" : "Show AI Result") : (isVi ? "So Sánh Gốc vs AI" : "Compare Original")}
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 text-slate-500 dark:text-slate-400 text-center p-8">
                    <div className="p-4 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      <ImageIcon className="w-8 h-8" />
                    </div>
                    <div className="flex flex-col gap-1 max-w-xs">
                      <span className="text-sm font-semibold text-slate-300">
                        {isVi ? "Kết quả hình ảnh sẽ hiển thị tại đây" : "Image output will appear here"}
                      </span>
                      <span className="text-xs text-slate-500">
                        {isVi 
                          ? "Hãy nhập prompt và bấm nút Tạo Ảnh để Gemini AI khởi tạo tác phẩm ngay." 
                          : "Enter a prompt and click Generate to create AI artwork."}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Toolbar on Result */}
              {generatedImage && !isGenerating && (
                <div className="mt-4 flex flex-col gap-3">
                  {explanation && (
                    <p className="text-xs text-slate-400 italic bg-slate-900/50 p-2.5 rounded-xl border border-slate-800">
                      💡 {explanation}
                    </p>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      onClick={handleApplyAsWallpaper}
                      className="h-10 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md"
                    >
                      <Monitor className="w-4 h-4" />
                      <span>{isVi ? "Đặt Làm Nền" : "Set Background"}</span>
                    </button>

                    <button
                      onClick={handleEditFurther}
                      className="h-10 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                    >
                      <Sliders className="w-4 h-4 text-purple-400" />
                      <span>{isVi ? "Sửa Tiếp AI" : "Edit Further"}</span>
                    </button>

                    <button
                      onClick={handleDownload}
                      className="h-10 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                    >
                      <Download className="w-4 h-4 text-cyan-400" />
                      <span>{isVi ? "Tải Về" : "Download"}</span>
                    </button>

                    <button
                      onClick={handleCopyBase64}
                      className="h-10 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                    >
                      <Copy className="w-4 h-4 text-emerald-400" />
                      <span>{isVi ? "Sao Chép" : "Copy Data"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
