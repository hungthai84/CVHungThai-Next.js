/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mic, MicOff, Sparkles, Volume2, X, Command, Search, CheckCircle2, ChevronDown } from "lucide-react";
import { useLanguage } from "../i18n";
import { playUiSound } from "../lib/sound";
import { cn } from "../lib/utils";

export default function VoiceCommandAssistantWidget({ 
  onNavigateTab,
  onOpenSalaryCalc,
  onOpenVideoHighlights,
  onOpenAutoTour,
  onOpenBadges
}: { 
  onNavigateTab: (tabId: string) => void;
  onOpenSalaryCalc: () => void;
  onOpenVideoHighlights: () => void;
  onOpenAutoTour?: () => void;
  onOpenBadges: () => void;
}) {
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");
  const [lastActionMessage, setLastActionMessage] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = isVi ? "vi-VN" : "en-US";

        recognition.onresult = (event: any) => {
          const current = event.resultIndex;
          const text = event.results[current][0].transcript;
          setTranscript(text);
          if (event.results[current].isFinal) {
            handleVoiceCommand(text);
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.onerror = (err: any) => {
          console.warn("Speech recognition error:", err);
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, [isVi]);

  const speakFeedback = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = isVi ? "vi-VN" : "en-US";
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleVoiceCommand = (cmdText: string) => {
    const text = cmdText.toLowerCase().trim();

    if (text.includes("kinh nghiệm") || text.includes("làm việc") || text.includes("experience")) {
      onNavigateTab("experience");
      const msg = isVi ? "Đang mở trang Kinh nghiệm làm việc." : "Opening Work Experience tab.";
      setLastActionMessage(msg);
      speakFeedback(msg);
      return;
    }

    if (text.includes("dự án") || text.includes("bpo") || text.includes("projects")) {
      onNavigateTab("projects");
      const msg = isVi ? "Đang chuyển đến danh sách Dự án BPO." : "Navigating to BPO Projects.";
      setLastActionMessage(msg);
      speakFeedback(msg);
      return;
    }

    if (text.includes("kỹ năng") || text.includes("skills") || text.includes("swot")) {
      onNavigateTab("skills");
      const msg = isVi ? "Đang mở Ma trận Kỹ năng & SWOT." : "Opening Skills Matrix.";
      setLastActionMessage(msg);
      speakFeedback(msg);
      return;
    }

    if (text.includes("phỏng vấn") || text.includes("interview")) {
      onNavigateTab("interview");
      const msg = isVi ? "Đang mở Chế độ Phỏng vấn AI." : "Opening AI Interview mode.";
      setLastActionMessage(msg);
      speakFeedback(msg);
      return;
    }

    if (text.includes("tính lương") || text.includes("salary") || text.includes("calculator")) {
      onOpenSalaryCalc();
      const msg = isVi ? "Đang mở Công cụ Tính Lương & Đãi ngộ AI." : "Opening AI Salary Calculator.";
      setLastActionMessage(msg);
      speakFeedback(msg);
      return;
    }

    if (text.includes("video") || text.includes("case study") || text.includes("demo")) {
      onOpenVideoHighlights();
      const msg = isVi ? "Đang mở Bộ sưu tập Video Case Study." : "Opening Video Case Study highlights.";
      setLastActionMessage(msg);
      speakFeedback(msg);
      return;
    }

    if (text.includes("trình chiếu") || text.includes("tour") || text.includes("slide")) {
      onOpenAutoTour();
      const msg = isVi ? "Bắt đầu Chế độ Trình chiếu Tự động." : "Starting Auto Tour presentation.";
      setLastActionMessage(msg);
      speakFeedback(msg);
      return;
    }

    if (text.includes("chứng chỉ") || text.includes("badge") || text.includes("blockchain")) {
      onOpenBadges();
      const msg = isVi ? "Mở Chứng nhận Digital Badge Blockchain." : "Opening Digital Badges.";
      setLastActionMessage(msg);
      speakFeedback(msg);
      return;
    }

    if (text.includes("báo cáo lỗi") || text.includes("error") || text.includes("bug")) {
      onNavigateTab("errors");
      const msg = isVi ? "Mở Giám sát & Báo cáo Lỗi Tab." : "Opening Tab Error Monitoring.";
      setLastActionMessage(msg);
      speakFeedback(msg);
      return;
    }

    const fallbackMsg = isVi ? `Đã nhận câu lệnh: "${cmdText}"` : `Command received: "${cmdText}"`;
    setLastActionMessage(fallbackMsg);
  };

  const toggleListen = () => {
    try { playUiSound("click"); } catch {}
    if (!recognitionRef.current) {
      alert(isVi ? "Trình duyệt của bạn không hỗ trợ nhận diện giọng nói (Speech Recognition)." : "Speech recognition is not supported in this browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript("");
      setLastActionMessage("");
      recognitionRef.current.start();
      setIsListening(true);
      setIsOpen(true);
    }
  };

  return (
    <div className="relative inline-block select-none font-play">
      <div className="relative group/voicebtn">
        {/* Ambient Glowing Border Aura */}
        <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-purple-500/50 via-indigo-500/50 to-pink-500/50 opacity-60 blur-[3px] group-hover/voicebtn:opacity-100 transition-opacity duration-300 pointer-events-none animate-pulse" />

        {/* Mic Command Button - Styled matching Layout Switcher */}
        <button
          type="button"
          onClick={toggleListen}
          aria-label={isVi ? "Trợ lý Tìm kiếm Giọng nói" : "Voice Command Assistant"}
          aria-expanded={isOpen}
          className={cn(
            "relative z-10 flex items-center h-10 pl-3 pr-2 rounded-l-full rounded-r-none border-r-0",
            "bg-slate-900/85 dark:bg-slate-950/90 text-white border border-white/25 shadow-[0_8px_25px_rgba(0,0,0,0.35)] backdrop-blur-2xl",
            "transition-all duration-300 ease-out hover:pl-3.5 hover:brightness-110 active:scale-95 cursor-pointer overflow-hidden group/voicebtn",
            isListening 
              ? "ring-2 ring-rose-400/80 border-rose-400/60 shadow-[0_0_20px_rgba(244,63,94,0.4)]" 
              : isOpen && "ring-2 ring-purple-400/80 border-purple-400/60 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
          )}
          title={isVi ? "Trợ lý Tìm kiếm Giọng nói Voice Command" : "Voice Command Search Assistant"}
        >
          {/* Active Voice Icon Badge */}
          <div className={cn(
            "relative flex items-center justify-center w-6 h-6 rounded-full text-white shrink-0 shadow-sm transition-all duration-300",
            isListening ? "bg-rose-500 animate-pulse" : "bg-gradient-to-br from-purple-500 to-indigo-600"
          )}>
            {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-slate-900 animate-ping" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-slate-900" />
          </div>

          {/* Expandable 2-Word Title on Hover */}
          <div className="max-w-0 opacity-0 group-hover/voicebtn:max-w-36 group-hover/voicebtn:opacity-100 group-hover/voicebtn:ml-2 transition-all duration-300 ease-out flex items-center overflow-hidden whitespace-nowrap">
            <span className="text-xs font-bold text-purple-200 tracking-wide drop-shadow-xs">
              {isListening ? (isVi ? "Đang Nghe..." : "Listening...") : (isVi ? "Giọng Nói" : "Voice AI")}
            </span>
          </div>

          {/* Chevron Arrow */}
          <ChevronDown
            className={cn(
              "w-3.5 h-3.5 text-purple-300 transition-transform duration-300 ml-1 shrink-0 opacity-60 group-hover/voicebtn:opacity-100",
              isOpen && "rotate-180 text-white"
            )}
          />
        </button>
      </div>

      {/* Voice Command Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute right-0 top-full mt-2 w-72 sm:w-80 p-4 rounded-2xl bg-slate-900/95 border border-slate-700 text-white shadow-2xl backdrop-blur-xl z-50 space-y-3"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-400">
                <Sparkles className="w-4 h-4" />
                <span>{isVi ? "Trợ lý AI Tìm kiếm Giọng nói" : "Voice Search AI Assistant"}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Live Transcript Display */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs min-h-[50px] flex flex-col justify-center">
              {transcript ? (
                <p className="font-bold text-amber-400">"{transcript}"</p>
              ) : (
                <p className="text-3xs text-slate-500 italic">
                  {isVi ? "Nói vào micro (Ví dụ: 'Mở kinh nghiệm', 'Xem dự án BPO', 'Tính lương AI')..." : "Speak now (e.g., 'Open experience', 'Calculate salary')..."}
                </p>
              )}
            </div>

            {/* Action Feedback Message */}
            {lastActionMessage && (
              <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-3xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{lastActionMessage}</span>
              </div>
            )}

            {/* Quick Sample Voice Prompts */}
            <div className="text-3xs text-slate-400 space-y-1">
              <span className="block font-bold uppercase">{isVi ? "Gợi ý câu lệnh mẫu:" : "Sample Voice Commands:"}</span>
              <div className="flex flex-wrap gap-1">
                {["Mở kinh nghiệm", "Xem dự án BPO", "Tính lương AI", "Trình chiếu tự động", "Báo cáo lỗi"].map((sample, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setTranscript(sample);
                      handleVoiceCommand(sample);
                    }}
                    className="px-2 py-0.5 rounded-md bg-slate-800 hover:bg-purple-600 text-slate-300 hover:text-white transition cursor-pointer"
                  >
                    "{sample}"
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
