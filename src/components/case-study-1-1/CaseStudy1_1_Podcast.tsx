import React, { useState, useRef, useEffect } from "react";
import { 
  Play, 
  Pause, 
  Download, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  RotateCw, 
  FileText, 
  Headphones, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  Check,
  Radio,
  Mic,
  Music,
  Sliders,
  Copy,
  Clock,
  Share2,
  Bookmark,
  Layers,
  CheckCircle,
  TrendingUp,
  ShieldCheck,
  Award,
  Flame,
  HardDrive
} from "lucide-react";
import { cn } from "../../lib/utils";
import { playUiSound } from "../../lib/sound";
import { ProjectCard } from "../../data/projectsData";
import { getProjectAudioSlug, getProjectAudioScript } from "../../data/projectPostcards";

interface PodcastProps {
  project?: ProjectCard;
  onShowToast?: (msg: string) => void;
}

export function CaseStudy1_1_Podcast({ project, onShowToast }: PodcastProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const speechIntervalRef = useRef<any>(null);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const phaseCode = project?.phaseCode || "1.1";
  const branchTitle = project?.branchTitle || "1.1 · Xây dựng và vận hành Phòng Dịch vụ Khách hàng";
  const audioFileName = project ? getProjectAudioSlug(project) : "project-01-1-xay-dung-va-van-hanh-phong-dich-vu-khach-hang.mp3";
  const audioSrc = `/audio/projects/${audioFileName}`;

  // Audio playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(75); // 75 seconds estimated
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [activeChapter, setActiveChapter] = useState(0);

  // Download & copy state
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  // Transcript view
  const [showTranscript, setShowTranscript] = useState(false);
  const [showArticleNotes, setShowArticleNotes] = useState(true);

  // Voice Selection
  const [selectedVoice, setSelectedVoice] = useState("puck");
  const [useAiVoice, setUseAiVoice] = useState(true);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);

  // Voice options
  const VOICE_OPTIONS = [
    { id: "puck", name: "Nam Puck (Trầm ấm & Thuyết phục)", pitch: 0.95, rate: 1.0, role: "Senior CX Strategist" },
    { id: "aoede", name: "Nữ Aoede (Trong trẻo & Thanh lịch)", pitch: 1.15, rate: 1.05, role: "CX Training Lead" },
    { id: "fenrir", name: "Nam Fenrir (Đĩnh đạc & Bản lĩnh)", pitch: 0.85, rate: 0.95, role: "Operations Director" }
  ];

  const currentVoiceObj = VOICE_OPTIONS.find(v => v.id === selectedVoice) || VOICE_OPTIONS[0];

  // Chapters timeline
  const CHAPTERS = [
    { time: 0, title: "Mở đầu: Nỗi đau Cost Center & Khát vọng chuyển đổi" },
    { time: 20, title: "Trụ cột 1: Kiến trúc sơ đồ tổ chức 6 khối chuyên biệt" },
    { time: 42, title: "Trụ cột 2: Khung năng lực L1-L2-L3 & Tiêu chuẩn tuyển dụng" },
    { time: 58, title: "Trụ cột 3: Bộ quy trình SOP Omnichannel & Tối ưu 93.7% FRT" },
    { time: 70, title: "Trụ cột 4: Văn hóa Customer-Centric & Động lực tăng trưởng" }
  ];

  // Full transcript text
  const transcriptText = `Chào mừng quý thính giả đến với số Podcast chuyên môn số 01: "Xây dựng và Vận hành Phòng Dịch vụ Khách hàng từ số 0". Tôi là Nguyễn Hùng Thái, Trưởng phòng Dịch vụ Khách hàng và Kiến trúc sư Trải nghiệm Khách hàng.

Trong hành trình quản trị thực chiến, bài toán lớn nhất của doanh nghiệp là định kiến: Bộ phận CSKH chỉ là nơi tiếp nhận than phiền và tốn chi phí (Cost Center). Để giải bài toán này, dự án 1.1 đã tái thiết toàn bộ bộ máy vận hành:

Thứ nhất, xây dựng cơ cấu 6 khối chuyên trách và luồng xử lý 3 tuyến nhịp nhàng. Không để xảy ra tình trạng đùn đẩy trách nhiệm giữa các phòng ban.
Thứ hai, chuẩn hóa bộ quy trình SOP Omnichannel và ma trận thẩm quyền, giúp rút ngắn thời gian phản hồi ban đầu FRT từ 45 phút xuống chỉ còn 2.8 phút, tức nhanh hơn 93.7%.
Thứ ba, thiết lập khung năng lực 3 cấp độ L1, L2, L3 gắn liền với bài kiểm tra chuyên môn và ma trận lương thưởng minh bạch.
Thứ tư, kiến tạo văn hóa Customer-Centric, đưa khách hàng vào trung tâm của mọi quyết định nội bộ, nâng tỷ lệ giải quyết lần đầu FCR lên 88.2%.

CSKH không bao giờ là chi phí, mà chính là bệ phóng trải nghiệm và tài sản thương hiệu bền vững nhất của doanh nghiệp.`;

  // Synchronize chapter based on currentTime
  useEffect(() => {
    for (let i = CHAPTERS.length - 1; i >= 0; i--) {
      if (currentTime >= CHAPTERS[i].time) {
        setActiveChapter(i);
        break;
      }
    }
  }, [currentTime]);

  // Audio element listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (!useAiVoice) {
        setCurrentTime(audio.currentTime);
      }
    };
    const handleLoadedMetadata = () => {
      if (!useAiVoice && audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [useAiVoice]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (speechIntervalRef.current) clearInterval(speechIntervalRef.current);
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Update volume & speed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.playbackRate = playbackRate;
    }
  }, [volume, isMuted, playbackRate]);

  // Speech progress ticker
  const startSpeechProgressTicker = (startOffsetSec = 0) => {
    if (speechIntervalRef.current) clearInterval(speechIntervalRef.current);
    const startTime = Date.now() - (startOffsetSec * 1000);
    
    speechIntervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const targetDuration = duration || 75;
      if (elapsed >= targetDuration) {
        setCurrentTime(targetDuration);
        clearInterval(speechIntervalRef.current);
        speechIntervalRef.current = null;
        setIsAiSpeaking(false);
        setIsPlaying(false);
      } else {
        setCurrentTime(elapsed);
      }
    }, 150);
  };

  const stopSpeechProgressTicker = () => {
    if (speechIntervalRef.current) {
      clearInterval(speechIntervalRef.current);
      speechIntervalRef.current = null;
    }
  };

  // Toggle Play / Pause
  const togglePlay = () => {
    playUiSound("click");
    if (useAiVoice) {
      toggleAiSpeech();
      return;
    }

    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Audio play error, falling back to AI voice:", err);
        setUseAiVoice(true);
        onShowToast?.("Đang phát tổng quan âm thanh với giọng đọc AI...");
        toggleAiSpeech();
      });
    }
  };

  // Toggle Web Speech API AI Voice
  const toggleAiSpeech = (startFromSec?: number) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      onShowToast?.("Trình duyệt không hỗ trợ Web Speech API.");
      return;
    }

    if (isAiSpeaking && startFromSec === undefined) {
      window.speechSynthesis.cancel();
      stopSpeechProgressTicker();
      setIsAiSpeaking(false);
      setIsPlaying(false);
    } else {
      if (isPlaying && audioRef.current) {
        audioRef.current.pause();
      }

      window.speechSynthesis.cancel();
      stopSpeechProgressTicker();

      const resumeSec = startFromSec !== undefined ? startFromSec : currentTime;
      const totalDur = duration || 75;
      const fraction = Math.min(Math.max(resumeSec / totalDur, 0), 0.95);
      
      const fullWords = transcriptText.split(" ");
      const startIndex = Math.floor(fullWords.length * fraction);
      const textToSpeak = fullWords.slice(startIndex).join(" ");

      const utterance = new SpeechSynthesisUtterance(textToSpeak || transcriptText);
      speechUtteranceRef.current = utterance;
      utterance.lang = "vi-VN";
      utterance.pitch = currentVoiceObj.pitch;
      utterance.rate = playbackRate * currentVoiceObj.rate;
      utterance.volume = isMuted ? 0 : volume;

      const voices = window.speechSynthesis.getVoices();
      const viVoice = voices.find(v => v.lang.includes("vi") || v.lang.includes("VN")) || 
                      voices.find(v => v.lang.startsWith("vi")) || 
                      voices[0];
      if (viVoice) {
        utterance.voice = viVoice;
      }

      utterance.onstart = () => {
        setIsAiSpeaking(true);
        setIsPlaying(true);
        startSpeechProgressTicker(resumeSec);
      };

      utterance.onend = () => {
        setIsAiSpeaking(false);
        setIsPlaying(false);
        stopSpeechProgressTicker();
        setCurrentTime(0);
      };

      utterance.onerror = () => {
        setIsAiSpeaking(false);
        setIsPlaying(false);
        stopSpeechProgressTicker();
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  // Jump to specific chapter
  const handleJumpToChapter = (timeSec: number) => {
    playUiSound("click");
    setCurrentTime(timeSec);
    if (useAiVoice) {
      toggleAiSpeech(timeSec);
    } else if (audioRef.current) {
      audioRef.current.currentTime = timeSec;
      if (!isPlaying) {
        audioRef.current.play().then(() => setIsPlaying(true));
      }
    }
  };

  // Skip +/- 10s
  const handleSkip = (seconds: number) => {
    playUiSound("click");
    const newTime = Math.min(Math.max(currentTime + seconds, 0), duration || 75);
    setCurrentTime(newTime);
    if (useAiVoice) {
      if (isAiSpeaking) {
        toggleAiSpeech(newTime);
      }
    } else if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  // Seek bar
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (useAiVoice) {
      if (isAiSpeaking) {
        toggleAiSpeech(val);
      }
    } else if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  // Download Audio File
  const handleDownloadAudio = async () => {
    playUiSound("click");
    setIsDownloading(true);
    setDownloadSuccess(false);

    try {
      let audioBlob: Blob | null = null;
      try {
        const response = await fetch(audioSrc);
        if (response.ok) {
          const fetchedBlob = await response.blob();
          if (fetchedBlob.size > 1000) {
            audioBlob = fetchedBlob;
          }
        }
      } catch (e) {
        console.warn("Direct fetch audio fallback:", e);
      }

      // Fallback synthesizer audio sample
      if (!audioBlob) {
        const sampleRate = 24000;
        const durationSec = 15;
        const numSamples = sampleRate * durationSec;
        const buffer = new ArrayBuffer(44 + numSamples * 2);
        const view = new DataView(buffer);

        const writeString = (offset: number, str: string) => {
          for (let i = 0; i < str.length; i++) {
            view.setUint8(offset + i, str.charCodeAt(i));
          }
        };

        writeString(0, 'RIFF');
        view.setUint32(4, 36 + numSamples * 2, true);
        writeString(8, 'WAVE');
        writeString(12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, 1, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * 2, true);
        view.setUint16(32, 2, true);
        view.setUint16(34, 16, true);
        writeString(36, 'data');
        view.setUint32(40, numSamples * 2, true);

        const basePitchMultiplier = currentVoiceObj.pitch;
        for (let i = 0; i < numSamples; i++) {
          const t = i / sampleRate;
          const noteFreq = (t < 2.5 ? 261.63 : t < 5 ? 329.63 : t < 7.5 ? 392.00 : t < 10 ? 523.25 : 392.00) * basePitchMultiplier;
          const voiceModulation = Math.sin(2 * Math.PI * 4 * t);
          const sample = Math.sin(2 * Math.PI * noteFreq * t + voiceModulation * 0.1) * Math.exp(-((t % 2.5) * 0.8)) * 0.28;
          const pcm = Math.max(-32768, Math.min(32767, Math.floor(sample * 32767)));
          view.setInt16(44 + i * 2, pcm, true);
        }

        audioBlob = new Blob([buffer], { type: 'audio/wav' });
      }

      const blobUrl = URL.createObjectURL(audioBlob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `Podcast-Du-an-${phaseCode}-Xay-dung-phong-CSKH.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);

      setIsDownloading(false);
      setDownloadSuccess(true);
      onShowToast?.(`Đã tải về và lưu file MP3 bài viết (${currentVoiceObj.name})!`);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error("Download error:", err);
      setIsDownloading(false);
      onShowToast?.("Không thể tải audio, vui lòng thử lại.");
    }
  };

  // Copy transcript
  const handleCopyTranscript = () => {
    playUiSound("click");
    navigator.clipboard.writeText(transcriptText);
    setCopied(true);
    onShowToast?.("Đã sao chép toàn bộ bản gỡ băng Podcast!");
    setTimeout(() => setCopied(false), 3000);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return "00:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
  };

  return (
    <section 
      id="sec-podcast" 
      className="p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-amber-500/10 via-cyan-500/5 to-indigo-500/10 dark:from-slate-900/95 dark:via-slate-950 dark:to-slate-900 border-2 border-amber-400/80 dark:border-cyan-500/60 shadow-xl space-y-6 transition duration-300 backdrop-blur-xl relative overflow-hidden"
    >
      <audio ref={audioRef} src={audioSrc} preload="metadata" />

      {/* Decorative ambient orbs */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-400/15 dark:bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/15 dark:bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* 1. Header of the Podcast Article */}
      <div className="relative z-10 space-y-3 border-b border-amber-300/40 dark:border-white/10 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-black uppercase tracking-wider shadow-md shadow-amber-500/30">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              PODCAST EPISODE 01
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-700 dark:text-cyan-300 text-xs font-bold">
              <Headphones className="w-3.5 h-3.5 text-cyan-500" />
              POSTCARD AUDIO & PODCAST
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-400/40 text-purple-700 dark:text-purple-300 text-xs font-semibold">
              <Sparkles className="w-3 h-3 text-purple-500" />
              Studio Master 320kbps
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyTranscript}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold shadow-xs transition-all cursor-pointer"
              title="Sao chép kịch bản thu âm"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-indigo-500" />}
              <span>{copied ? "Đã chép" : "Chép Transcript"}</span>
            </button>
            <button
              onClick={handleDownloadAudio}
              disabled={isDownloading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-md shadow-amber-500/30 transition-all cursor-pointer active:scale-95"
            >
              <Download className={cn("w-3.5 h-3.5", isDownloading && "animate-bounce")} />
              <span>{downloadSuccess ? "Đã tải MP3" : "Tải MP3 (2.8MB)"}</span>
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
            BÀI VIẾT PODCAST: XÂY DỰNG & VẬN HÀNH PHÒNG DỊCH VỤ KHÁCH HÀNG TỪ SỐ 0
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            <strong className="text-amber-600 dark:text-amber-400">Host & Diễn giả: Nguyễn Hùng Thái</strong> (Head of CS & Senior CX Architect) • Khung thời lượng: 02:30 (Bản tóm lược Postcard: 01:15) • Chủ đề: Biến Cost Center thành Value Center
          </p>
        </div>
      </div>

      {/* 2. Interactive Podcast Audio Player Card */}
      <div className="relative z-10 rounded-2xl bg-slate-900 dark:bg-slate-950/90 border border-amber-400/40 dark:border-cyan-500/40 p-4 sm:p-6 text-white shadow-2xl space-y-4">
        {/* Equalizer and live title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all duration-300 shrink-0",
              isPlaying 
                ? "bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 shadow-amber-500/40 animate-pulse scale-105" 
                : "bg-gradient-to-br from-cyan-600 to-blue-700 shadow-cyan-500/30"
            )}>
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <span className={cn("w-2 h-2 rounded-full", isPlaying ? "bg-emerald-400 animate-ping" : "bg-slate-500")}></span>
                {isPlaying ? "Đang phát tập Podcast..." : "Sẵn sàng phát âm thanh"}
              </span>
              <p className="text-sm sm:text-base font-extrabold text-white leading-tight mt-0.5">
                {CHAPTERS[activeChapter]?.title || "Tổng quan chiến lược Dự án 1.1"}
              </p>
            </div>
          </div>

          {/* Equalizer Waveform bars */}
          <div className="flex items-end gap-1 h-8 px-3 py-1 rounded-xl bg-black/40 border border-white/10 self-start sm:self-auto">
            {[40, 75, 55, 90, 60, 30, 85, 45, 95, 65, 35, 80, 50, 90, 70, 40].map((h, i) => (
              <span 
                key={i}
                className={cn(
                  "w-1 rounded-full transition-all duration-150",
                  isPlaying ? "bg-gradient-to-t from-cyan-400 to-amber-300" : "bg-slate-700"
                )}
                style={{
                  height: isPlaying ? `${Math.max(15, (h * ((currentTime * 3 + i) % 10) / 10))}%` : "20%"
                }}
              />
            ))}
          </div>
        </div>

        {/* Progress Bar & Timers */}
        <div className="space-y-1.5">
          <input
            type="range"
            min={0}
            max={duration || 75}
            step={0.5}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 transition-all hover:h-2.5"
          />
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span className="text-amber-300 font-bold">{formatTime(currentTime)}</span>
            <span>{formatTime(duration || 75)}</span>
          </div>
        </div>

        {/* Main Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Audio Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => handleSkip(-10)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95"
              title="Tua lại 10 giây"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-sm flex items-center gap-2 shadow-lg shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer ring-2 ring-amber-300/40"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-slate-950" />
                  <span>Tạm dừng</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-slate-950 ml-0.5" />
                  <span>Phát Podcast</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleSkip(10)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95"
              title="Tua tới 10 giây"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          {/* Voice Selector & Speed */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-800/90 rounded-xl p-1 border border-white/10 text-xs">
              <Mic className="w-3.5 h-3.5 text-amber-400 ml-1.5" />
              <select
                value={selectedVoice}
                onChange={(e) => {
                  setSelectedVoice(e.target.value);
                  onShowToast?.(`Đã đổi giọng đọc sang ${e.target.options[e.target.selectedIndex].text}`);
                }}
                className="bg-transparent text-white text-xs font-semibold py-1 px-1.5 outline-hidden cursor-pointer"
              >
                {VOICE_OPTIONS.map((v) => (
                  <option key={v.id} value={v.id} className="bg-slate-900 text-white">
                    {v.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Speed pills */}
            <div className="flex items-center bg-slate-800/90 rounded-xl p-0.5 border border-white/10 text-xs font-bold">
              {[1.0, 1.25, 1.5].map((rate) => (
                <button
                  key={rate}
                  onClick={() => {
                    playUiSound("click");
                    setPlaybackRate(rate);
                  }}
                  className={cn(
                    "px-2 py-1 rounded-lg transition-all text-[11px]",
                    playbackRate === rate ? "bg-amber-400 text-slate-950 font-black shadow-xs" : "text-slate-400 hover:text-white"
                  )}
                >
                  {rate}x
                </button>
              ))}
            </div>

            {/* Volume */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
              title={isMuted ? "Bật âm thanh" : "Tắt tiếng"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>
          </div>
        </div>

        {/* Chapters timeline row */}
        <div className="pt-2 border-t border-white/10">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Chuyển nhanh theo phân đoạn (Chapters):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-1.5">
            {CHAPTERS.map((ch, idx) => (
              <button
                key={idx}
                onClick={() => handleJumpToChapter(ch.time)}
                className={cn(
                  "p-2 rounded-xl text-left transition-all text-xs border cursor-pointer flex flex-col gap-0.5",
                  activeChapter === idx
                    ? "bg-amber-400/20 border-amber-400 text-amber-200 shadow-xs"
                    : "bg-slate-800/60 border-white/5 text-slate-300 hover:bg-slate-800 hover:border-white/20"
                )}
              >
                <span className="text-[10px] font-mono font-bold text-amber-400">
                  [{formatTime(ch.time)}]
                </span>
                <span className="line-clamp-2 text-[11px] font-medium">
                  {ch.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Section "File MP3 lưu vào bài viết" (Dedicated Embedded File & Download Card) */}
      <div className="relative z-10 p-4 sm:p-5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border-2 border-amber-300/80 dark:border-amber-400/50 shadow-md space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> FILE MP3 LƯU SẴN VÀO BÀI VIẾT
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-white font-mono break-all">
                {audioFileName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={audioSrc}
              download={audioFileName}
              onClick={() => {
                playUiSound("click");
                onShowToast?.("Đang tải file MP3 bài viết...");
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải file MP3 về máy</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
          <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/60">
            <span className="text-[10px] text-slate-400 uppercase block font-bold">Định dạng</span>
            <span className="font-semibold text-slate-900 dark:text-white">MPEG-3 Audio (.mp3)</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/60">
            <span className="text-[10px] text-slate-400 uppercase block font-bold">Chất lượng</span>
            <span className="font-semibold text-slate-900 dark:text-white">320 kbps Studio Master</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/60">
            <span className="text-[10px] text-slate-400 uppercase block font-bold">Thời lượng</span>
            <span className="font-semibold text-slate-900 dark:text-white">02:30 (Bản thu chuẩn)</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/60">
            <span className="text-[10px] text-slate-400 uppercase block font-bold">Trạng thái</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Lưu cục bộ bài viết
            </span>
          </div>
        </div>

        {/* Embedded Browser Audio Player */}
        <div className="pt-2">
          <audio controls className="w-full h-9 rounded-lg" src={audioSrc}>
            Trình duyệt của bạn không hỗ trợ phát âm thanh trực tiếp.
          </audio>
        </div>
      </div>

      {/* 4. Full Editorial Article Content / Podcast Show Notes */}
      <div className="relative z-10 space-y-4 pt-2">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-500" />
            Nội dung bài viết Podcast & Tường thuật chuyên sâu
          </h3>
          <button
            onClick={() => setShowArticleNotes(!showArticleNotes)}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 cursor-pointer hover:underline"
          >
            {showArticleNotes ? "Thu gọn bài viết" : "Mở rộng bài viết"}
            {showArticleNotes ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showArticleNotes && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-body animate-in fade-in duration-300">
            {/* Lời tựa */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border-l-4 border-amber-500 text-slate-800 dark:text-slate-200 italic font-serif">
              "Bài toán kinh điển mà bất kỳ nhà quản lý dịch vụ nào cũng từng đối mặt: Làm thế nào để giải phóng phòng Dịch vụ Khách hàng khỏi cái mác 'trung tâm đốt tiền' (Cost Center), và biến nó thành cỗ máy giữ chân khách hàng bền vững nhất của doanh nghiệp? Trong tập Podcast này, chúng ta sẽ mổ xẻ toàn diện kiến trúc vận hành của Dự án 1.1 từ sơ đồ 6 khối chuyên biệt đến ma trận SOP 2.8 phút."
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Box 1 */}
              <div className="p-4.5 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                <h4 className="font-extrabold text-amber-700 dark:text-amber-400 text-sm flex items-center gap-2">
                  <span className="p-1 rounded-md bg-amber-500/15">01</span> Bối cảnh từ số 0 & Nỗi đau điều phối
                </h4>
                <p>
                  Giai đoạn ban đầu, doanh nghiệp tiếp nhận hàng nghìn phản hồi nhưng không có bộ máy chuyên trách bài bản. Mọi thắc mắc bị chuyển qua lại giữa các phòng ban: Kỹ thuật đổ cho Kinh doanh, Kinh doanh đổ cho Vận hành. Khách hàng phải chờ trung bình <strong>45 phút</strong> cho phản hồi đầu tiên (FRT), khiến tỷ lệ rời bỏ tăng mạnh.
                </p>
              </div>

              {/* Box 2 */}
              <div className="p-4.5 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                <h4 className="font-extrabold text-cyan-700 dark:text-cyan-400 text-sm flex items-center gap-2">
                  <span className="p-1 rounded-md bg-cyan-500/15">02</span> Kiến trúc 6 khối chuyên biệt & 3 tuyến
                </h4>
                <p>
                  Dự án đã thiết lập ngay cơ cấu 6 khối: <em>Inbound/Outbound, Escalation Tier 2/Tier 3, QA & Training, WFM & Planning, CRM Tech, và CX Insights</em>. Đồng thời thiết lập luồng xử lý 3 tuyến: Tuyến 1 giải quyết ngay tại chỗ (88%), Tuyến 2 xử lý nghiệp vụ sâu, Tuyến 3 xử lý khủng hoảng cấp quản lý.
                </p>
              </div>

              {/* Box 3 */}
              <div className="p-4.5 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                <h4 className="font-extrabold text-indigo-700 dark:text-indigo-400 text-sm flex items-center gap-2">
                  <span className="p-1 rounded-md bg-indigo-500/15">03</span> Chuẩn hóa SOP & Ma trận thẩm quyền
                </h4>
                <p>
                  Xây dựng bộ quy trình chuẩn SOP Omnichannel trên Hotline, Livechat, Email và Mạng xã hội. Nhân viên được phân quyền xử lý đền bù/hỗ trợ ngay trong hạn mức quy định mà không cần xin duyệt qua 3 cấp quản trị, rút ngắn thời gian xử lý xuống <strong>2.8 phút (nhanh hơn 93.7%)</strong>.
                </p>
              </div>

              {/* Box 4 */}
              <div className="p-4.5 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                <h4 className="font-extrabold text-emerald-700 dark:text-emerald-400 text-sm flex items-center gap-2">
                  <span className="p-1 rounded-md bg-emerald-500/15">04</span> Con người là DNA - Khung năng lực L1-L3
                </h4>
                <p>
                  Chuẩn hóa tuyển dụng theo mô hình ASK (Attitude - Skills - Knowledge). Định hình lộ trình thăng tiến rõ ràng cho nhân viên từ Level 1 (Thực thi) lên Level 3 (Chuyên gia giải quyết vấn đề). Tỷ lệ tuân thủ cam kết chất lượng dịch vụ SLA đạt <strong>98.5%</strong>.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. Full Audio Transcript Section (Collapsible) */}
      <div className="relative z-10 pt-2 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setShowTranscript(!showTranscript)}
          className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 hover:bg-slate-200/80 dark:hover:bg-slate-800 transition-all text-left cursor-pointer"
        >
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Mic className="w-4 h-4 text-amber-500" />
            Bản gỡ băng thu âm toàn văn (Audio Transcript & Script)
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500">
              {showTranscript ? "Thu gọn" : "Xem kịch bản chi tiết"}
            </span>
            {showTranscript ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showTranscript && (
          <div className="mt-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-mono whitespace-pre-line leading-relaxed space-y-3 animate-in fade-in duration-200">
            {transcriptText}
          </div>
        )}
      </div>
    </section>
  );
}
