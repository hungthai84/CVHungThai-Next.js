/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, 
  Video, Mic, FileText, CheckCircle2, Sparkles, X, Download,
  Layers, ChevronRight, Award, Bot, RefreshCw
} from "lucide-react";
import { useLanguage } from "../i18n";
import { playUiSound } from "../lib/sound";

interface VideoCaseStudy {
  id: string;
  titleVi: string;
  titleEn: string;
  category: string;
  duration: string;
  videoUrl: string;
  poster: string;
  subtitles: {
    time: number;
    textVi: string;
    textEn: string;
  }[];
  voiceHighlights: {
    speaker: string;
    quoteVi: string;
    quoteEn: string;
    timestamp: string;
  }[];
  metrics: {
    labelVi: string;
    labelEn: string;
    value: string;
  }[];
}

const CASE_STUDIES: VideoCaseStudy[] = [
  {
    id: "cs-bpo-rpa",
    titleVi: "Tự động hóa Quy trình BPO & AI OCR Chuẩn hóa Hồ sơ Khách hàng",
    titleEn: "BPO Process Automation & AI OCR Customer Onboarding Pipeline",
    category: "Operations & Automation",
    duration: "02:45",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    poster: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
    subtitles: [
      { time: 0, textVi: "Khởi động hệ thống phân loại tài liệu đa kênh bằng AI Vision...", textEn: "Initializing multi-channel document classification with AI Vision..." },
      { time: 10, textVi: "Tự động trích xuất dữ liệu biểu mẫu với độ chính xác 99.8%...", textEn: "Automated form data extraction with 99.8% accuracy..." },
      { time: 25, textVi: "Xử lý ngoại lệ tự động bằng luồng duyệt thông minh giảm 70% SLA...", textEn: "Smart exception routing reducing SLA turnaround by 70%..." },
      { time: 45, textVi: "Đồng bộ hóa dữ liệu thời gian thực lên Core ERP/CRM bảo mật...", textEn: "Real-time secure data synchronization to Core ERP/CRM..." }
    ],
    voiceHighlights: [
      {
        speaker: "Hùng Thái - Operations Director",
        quoteVi: "Chuẩn hóa quy trình không chỉ giúp tăng năng suất 300% mà còn tối ưu hóa trải nghiệm khách hàng.",
        quoteEn: "Standardizing workflows not only boosted productivity by 300% but also transformed customer experience.",
        timestamp: "00:32"
      },
      {
        speaker: "Client CEO - Global Logistics",
        quoteVi: "Giải pháp BPO AI do anh Hùng Thái dẫn dắt giúp chúng tôi vận hành 24/7 không đứt gãy.",
        quoteEn: "The AI BPO framework led by Mr. Hung Thai ensured uninterrupted 24/7 global operations.",
        timestamp: "01:15"
      }
    ],
    metrics: [
      { labelVi: "Tăng tốc độ xử lý", labelEn: "Processing Speedup", value: "3.5x" },
      { labelVi: "Độ chính xác dữ liệu", labelEn: "Data Accuracy", value: "99.8%" },
      { labelVi: "Tiết kiệm chi phí vận hành", labelEn: "OPEX Cost Savings", value: "45%" }
    ]
  },
  {
    id: "cs-ai-contact-center",
    titleVi: "Mô hình Trung tâm Chăm sóc Khách hàng BPO AI Hybrid 2000+ FTEs",
    titleEn: "2000+ FTEs AI Hybrid BPO Contact Center Architecture",
    category: "Contact Center & CX",
    duration: "03:10",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    poster: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200",
    subtitles: [
      { time: 0, textVi: "Phân tích Voicebot & AI Speech Analytics trên quy mô lớn...", textEn: "Deploying Speech Analytics & Voicebots at enterprise scale..." },
      { time: 12, textVi: "Đo lường chỉ số FCR (First Contact Resolution) tự động...", textEn: "Automated real-time First Contact Resolution tracking..." },
      { time: 30, textVi: "Tự động phân bổ cuộc gọi theo kỹ năng & chỉ số cảm xúc...", textEn: "Skill-based and sentiment routing for optimal agent pairing..." }
    ],
    voiceHighlights: [
      {
        speaker: "Hùng Thái - Head of Operations",
        quoteVi: "Sự kết hợp giữa AI và con người là chìa khóa để vận hành trung tâm 2000 vị trí mượt mà.",
        quoteEn: "The synergy between human empathy and AI automation is key to managing 2000 seats seamlessly.",
        timestamp: "00:48"
      }
    ],
    metrics: [
      { labelVi: "Tăng chỉ số CSAT", labelEn: "CSAT Improvement", value: "+28%" },
      { labelVi: "Giảm thời gian chờ AHT", labelEn: "AHT Reduction", value: "-35%" },
      { labelVi: "Quy mô nhân sự", labelEn: "Managed Capacity", value: "2000+ Seats" }
    ]
  }
];

export default function BpoVideoVoiceHighlightsModal({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
}) {
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  const [activeStudy, setActiveStudy] = useState<VideoCaseStudy>(CASE_STUDIES[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setCurrentTime(0);
    setIsPlaying(false);
  }, [activeStudy]);

  const togglePlay = () => {
    try { playUiSound("click"); } catch {}
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    try { playUiSound("click"); } catch {}
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Active subtitle
  const activeSubtitle = activeStudy.subtitles.slice().reverse().find(s => currentTime >= s.time) || activeStudy.subtitles[0];

  if (!isOpen) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 animate-fadeIn font-play"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto no-scrollbar"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 text-cyan-500 border border-cyan-500/30">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
                <span>{isVi ? "Bộ sưu tập Case Study Interactive Video & Voice Highlights" : "Interactive BPO Case Study Video & Voice Highlights"}</span>
              </h2>
              <p className="text-caption text-slate-500 dark:text-slate-400">
                {isVi ? "Phân tích quy trình tự động hóa BPO với phụ đề động theo thời gian thực" : "Automated BPO workflow video demo with synced subtitles"}
              </p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Case Study Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {CASE_STUDIES.map(cs => {
            const isSelected = activeStudy.id === cs.id;
            return (
              <button
                key={cs.id}
                type="button"
                onClick={() => setActiveStudy(cs)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-2 cursor-pointer border ${
                  isSelected
                    ? "bg-cyan-500 text-white border-cyan-400 shadow-md shadow-cyan-500/20"
                    : "bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200"
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>{isVi ? cs.titleVi.split("&")[0] : cs.titleEn.split("&")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Video Player & Dynamic Timeline Subtitles */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-black aspect-video border border-slate-800 shadow-2xl flex flex-col justify-end">
          <video
            ref={videoRef}
            src={activeStudy.videoUrl}
            poster={activeStudy.poster}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            className="w-full h-full object-cover"
            playsInline
          />

          {/* Dynamic Subtitle Overlay Banner */}
          <div className="absolute bottom-16 inset-x-4 bg-black/80 backdrop-blur-md border border-cyan-500/30 p-3 rounded-2xl text-center shadow-2xl transition-all">
            <span className="text-3xs font-mono font-bold text-cyan-400 block mb-0.5 uppercase tracking-wider">
              {isVi ? "Phụ đề động (Real-time Caption):" : "Dynamic Subtitle Caption:"}
            </span>
            <p className="text-xs sm:text-sm font-bold text-white drop-shadow">
              "{isVi ? activeSubtitle?.textVi : activeSubtitle?.textEn}"
            </p>
          </div>

          {/* Custom Video Controls */}
          <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlay}
                className="p-2 rounded-xl bg-cyan-500 text-white hover:bg-cyan-600 transition cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={toggleMute}
                className="p-2 rounded-xl bg-white/20 text-white hover:bg-white/30 transition cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <span className="text-3xs font-mono text-slate-300">
                {Math.floor(currentTime)}s / {Math.floor(duration || 0)}s
              </span>
            </div>

            {/* Metrics pills overlay */}
            <div className="hidden sm:flex items-center gap-2">
              {activeStudy.metrics.map((m, idx) => (
                <div key={idx} className="px-2.5 py-1 rounded-xl bg-black/60 border border-white/20 text-white text-3xs font-mono">
                  <span className="text-cyan-400 font-bold mr-1">{m.value}</span>
                  <span className="opacity-80">{isVi ? m.labelVi : m.labelEn}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Voice Highlights & Impact Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Voice Highlights */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-white uppercase">
              <Mic className="w-4 h-4 text-purple-500" />
              <span>{isVi ? "Trích dẫn Voice Highlights" : "Key Voice Highlights"}</span>
            </div>
            <div className="space-y-2">
              {activeStudy.voiceHighlights.map((vh, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between text-3xs font-bold text-cyan-500">
                    <span>{vh.speaker}</span>
                    <span className="font-mono text-slate-400">{vh.timestamp}</span>
                  </div>
                  <p className="italic text-slate-700 dark:text-slate-300">
                    "{isVi ? vh.quoteVi : vh.quoteEn}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Performance Impact */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-white uppercase">
              <Award className="w-4 h-4 text-emerald-500" />
              <span>{isVi ? "Chỉ số tác động chính (Key Metrics)" : "Key Impact Metrics"}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {activeStudy.metrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-1">
                  <span className="text-xl font-black text-emerald-500 font-mono block">
                    {m.value}
                  </span>
                  <span className="text-3xs font-bold text-slate-500 leading-tight block">
                    {isVi ? m.labelVi : m.labelEn}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
