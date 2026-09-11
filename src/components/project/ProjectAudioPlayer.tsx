import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Volume2, Sparkles, AlertCircle, Headphones, Mic } from "lucide-react";
import { cn } from "../../lib/utils";
import { playUiSound } from "../../lib/sound";
import { voiceEngine } from "../../services/voiceEngine";

interface ProjectAudioPlayerProps {
  audioSrc: string;
  title: string;
  voice?: string;
  scriptText?: string;
  className?: string;
  onToast?: (msg: string) => void;
}

export function ProjectAudioPlayer({
  audioSrc,
  title,
  voice = "Nam Puck",
  scriptText = "",
  className,
  onToast,
}: ProjectAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playerState, setPlayerState] = useState<"initial" | "playing" | "paused" | "ended" | "error">("initial");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [usingSpeechFallback, setUsingSpeechFallback] = useState(false);
  const [speakMode, setSpeakMode] = useState<"mp3" | "browser">("mp3");

  useEffect(() => {
    // Reset state when audioSrc or speakMode changes
    setPlayerState("initial");
    setCurrentTime(0);
    setUsingSpeechFallback(false);

    // Cancel ongoing SpeechSynthesis or voiceEngine to prevent overlapping
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    voiceEngine.cancel();
  }, [audioSrc, speakMode]);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      voiceEngine.cancel();
    };
  }, []);

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return "00:00";
    const mins = Math.floor(secs / 60);
    const rem = Math.floor(secs % 60);
    return `${String(mins).padStart(2, "0")}:${String(rem).padStart(2, "0")}`;
  };

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speakBrowserSpeech = (text: string, onStart: () => void, onEnd: () => void) => {
    if (!('speechSynthesis' in window)) {
      onToast?.("Trình duyệt không hỗ trợ giọng đọc TTS");
      onEnd();
      return;
    }
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      console.warn("speechSynthesis cancel warning:", e);
    }
    
    // Clean markdown or symbol characters
    const cleanText = text
      .replace(/[*#_~`[\]()]/g, '')
      .replace(/https?:\/\/\S+/g, 'liên kết')
      .trim();
      
    if (!cleanText) {
      onEnd();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utteranceRef.current = utterance;
    utterance.lang = 'vi-VN';
    utterance.rate = 0.95;
    
    // Select Vietnamese voice safely if available
    try {
      const voices = window.speechSynthesis.getVoices();
      const viVoice = voices.find(v => v.lang && v.lang.toLowerCase().includes('vi'));
      if (viVoice) {
        utterance.voice = viVoice;
      }
    } catch (e) {
      // Ignore voice selection errors and use default
    }
    
    utterance.onstart = () => {
      onStart();
    };
    
    utterance.onend = () => {
      utteranceRef.current = null;
      onEnd();
    };
    
    utterance.onerror = (err) => {
      // Suppress minor browser speech interruptions (e.g. cancellation)
      utteranceRef.current = null;
      console.warn("Browser speech notice:", err);
      onEnd();
    };
    
    // Small timeout to allow cancel queue to clear
    setTimeout(() => {
      try {
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn("speechSynthesis speak error:", err);
        onEnd();
      }
    }, 50);
  };

  const handleTogglePlay = () => {
    playUiSound("click");

    if (speakMode === "browser") {
      if (playerState === "playing") {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.pause();
        }
        setPlayerState("paused");
      } else if (playerState === "paused" && 'speechSynthesis' in window && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setPlayerState("playing");
      } else {
        onToast?.("Đang phát bằng giọng đọc của Trình duyệt (TTS)...");
        speakBrowserSpeech(
          scriptText || title,
          () => setPlayerState("playing"),
          () => setPlayerState("ended")
        );
      }
      return;
    }

    if (usingSpeechFallback) {
      if (playerState === "playing") {
        voiceEngine.cancel();
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
        setPlayerState("paused");
      } else {
        voiceEngine.setGeminiVoice("Puck");
        setPlayerState("playing");
        onToast?.("Đang phát Audio Postcard với giọng đọc Nam Puck...");
        voiceEngine.speak(scriptText || title, () => {
          setPlayerState("ended");
        });
      }
      return;
    }

    if (!audioRef.current) return;

    if (playerState === "playing") {
      audioRef.current.pause();
      setPlayerState("paused");
    } else {
      audioRef.current
        .play()
        .then(() => {
          setPlayerState("playing");
          onToast?.("Đang phát Audio Postcard (Giọng đọc: Nam Puck)");
        })
        .catch((err) => {
          console.warn("Static MP3 not available or blocked, switching to speech fallback:", err);
          // Fallback to VoiceEngine TTS (Nam Puck)
          setUsingSpeechFallback(true);
          voiceEngine.setGeminiVoice("Puck");
          setPlayerState("playing");
          onToast?.("Đang phát Audio Postcard (Giọng đọc: Nam Puck)...");
          voiceEngine.speak(scriptText || title, () => {
            setPlayerState("ended");
          });
        });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  const handleReplay = () => {
    playUiSound("click");
    if (speakMode === "browser") {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      onToast?.("Đang phát bằng giọng đọc của Trình duyệt (TTS)...");
      speakBrowserSpeech(
        scriptText || title,
        () => setPlayerState("playing"),
        () => setPlayerState("ended")
      );
    } else if (usingSpeechFallback) {
      voiceEngine.cancel();
      voiceEngine.setGeminiVoice("Puck");
      setPlayerState("playing");
      voiceEngine.speak(scriptText || title, () => {
        setPlayerState("ended");
      });
    } else if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => setPlayerState("playing"));
    }
  };

  return (
    <div className={cn("relative z-20 inline-flex flex-col gap-2 w-full max-w-xl", className)}>
      {/* Hidden HTML Audio Element */}
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="metadata"
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
          }
        }}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        onEnded={() => setPlayerState("ended")}
        onError={() => {
          // If error loading static MP3 asset, allow fallback
          console.warn("Audio file missing or failed to load:", audioSrc);
        }}
      />

      {/* Glass Player Bar */}
      <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50/95 hover:bg-slate-100/95 border border-sky-200 dark:bg-slate-900/85 dark:hover:bg-slate-900/95 dark:border-sky-400/40 shadow-xl backdrop-blur-md text-slate-800 dark:text-white flex flex-col gap-2 transition-all duration-300">
        
        {/* Source Selector Tab Row */}
        <div className="flex items-center justify-between gap-2 bg-slate-200/50 dark:bg-slate-950/40 p-1 rounded-xl border border-slate-300/30 dark:border-slate-800/60 mb-1">
          <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 px-1.5">Nguồn đọc:</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSpeakMode("mp3")}
              className={cn(
                "px-2 py-1 rounded-lg text-[10px] font-extrabold uppercase transition-all duration-200 cursor-pointer flex items-center gap-1",
                speakMode === "mp3"
                  ? "bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm border border-slate-200 dark:border-slate-700/60"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 border border-transparent"
              )}
            >
              <Headphones className="w-3 h-3" />
              <span>Bản Thu MP3</span>
            </button>
            <button
              type="button"
              onClick={() => setSpeakMode("browser")}
              className={cn(
                "px-2 py-1 rounded-lg text-[10px] font-extrabold uppercase transition-all duration-200 cursor-pointer flex items-center gap-1",
                speakMode === "browser"
                  ? "bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm border border-slate-200 dark:border-slate-700/60"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 border border-transparent"
              )}
            >
              <Volume2 className="w-3 h-3" />
              <span>Trình Duyệt (TTS)</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          {/* Main Action Button */}
          <button
            onClick={handleTogglePlay}
            aria-label={playerState === "playing" ? "Đang phát Audio Postcard" : "Phát Audio Postcard"}
            className={cn(
              "inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl font-black text-xs sm:text-sm tracking-wide shadow-lg transition-all duration-300 cursor-pointer shrink-0 active:scale-95",
              playerState === "playing"
                ? "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/25 animate-pulse"
                : "bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-sky-500/20"
            )}
          >
            {playerState === "playing" ? (
              <>
                <Pause className="w-4 h-4 fill-current shrink-0" />
                <span>Dừng phát</span>
              </>
            ) : playerState === "paused" ? (
              <>
                <Play className="w-4 h-4 fill-current shrink-0 ml-0.5" />
                <span>Tiếp tục</span>
              </>
            ) : playerState === "ended" ? (
              <>
                <RotateCcw className="w-4 h-4 shrink-0" />
                <span>Nghe lại</span>
              </>
            ) : playerState === "error" ? (
              <>
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Thử lại Audio</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current shrink-0 ml-0.5" />
                <span>NGHE POSTCARD</span>
              </>
            )}
          </button>

          {/* Voice Badge & Title */}
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-md bg-sky-100 dark:bg-sky-500/20 border border-sky-200 dark:border-sky-400/30 text-sky-600 dark:text-sky-300 font-mono text-[10px] font-bold flex items-center gap-1 shrink-0">
                <Mic className="w-3 h-3 text-sky-500 dark:text-sky-400" />
                {speakMode === "browser" ? "TTS" : voice}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate hidden xs:inline">
                • {speakMode === "browser" ? "Browser TTS" : "60-90s Narrative"}
              </span>
            </div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate mt-0.5">
              {title}
            </span>
          </div>

          {/* Replay button if paused or ended */}
          {(playerState === "playing" || playerState === "paused" || playerState === "ended") && (
            <button
              onClick={handleReplay}
              title="Phát lại từ đầu"
              aria-label="Phát lại Audio Postcard"
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Progress Timeline Bar */}
        {speakMode === "mp3" && !usingSpeechFallback && duration > 0 && (
          <div className="flex items-center gap-2 pt-1 border-t border-slate-200 dark:border-slate-800/80">
            <span className="text-[10px] font-mono font-bold text-sky-600 dark:text-sky-300 shrink-0 w-9 text-right">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
            />
            <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 shrink-0 w-9">
              {formatTime(duration)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
