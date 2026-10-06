import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Volume2, 
  VolumeX, 
  X, 
  Sparkles, 
  CloudRain, 
  Wind, 
  Radio, 
  RotateCcw, 
  Check, 
  Sliders 
} from "lucide-react";
import { useSound } from "../context/SoundContext";
import { useLanguage } from "../i18n";
import { SOUND_PACK_OPTIONS, AMBIENT_SOUND_OPTIONS } from "../data/soundData";
import { AmbientSoundType } from "../types/sound";
import { cn } from "../lib/utils";

export default function SoundSettingsModal() {
  const { 
    isSoundModalOpen, 
    setIsSoundModalOpen, 
    soundConfig, 
    setMasterVolume, 
    setUiVolume, 
    setAmbientVolume, 
    setSoundPack, 
    setAmbientSound, 
    toggleMute, 
    resetSoundConfig, 
    playClick, 
    playSuccess 
  } = useSound();
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  if (!isSoundModalOpen) return null;

  const getAmbientIcon = (id: AmbientSoundType) => {
    switch (id) {
      case "rain": return CloudRain;
      case "zen-breeze": return Wind;
      case "space-drone": return Radio;
      default: return VolumeX;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSoundModalOpen(false)}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col text-left"
        >
          {/* Header */}
          <div className="p-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                <Volume2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold font-play">
                  {isVi ? "Cài Đặt Âm Thanh (Audio FX)" : "Audio FX & Soundscape"}
                </h3>
                <p className="text-xs text-emerald-100">
                  {isVi ? "Âm thanh click phản hồi UI và âm thanh môi trường thư giãn" : "Tactile UI sound feedback and relaxing ambient background audio"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                playClick();
                setIsSoundModalOpen(false);
              }}
              className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-6 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {/* Master Volume & Mute Toggle */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    toggleMute();
                    playClick();
                  }}
                  className={cn(
                    "p-2 rounded-xl transition cursor-pointer",
                    soundConfig.isMuted
                      ? "bg-rose-500/15 text-rose-600 border border-rose-500/30"
                      : "bg-emerald-500/15 text-emerald-600 border border-emerald-500/30"
                  )}
                >
                  {soundConfig.isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {soundConfig.isMuted ? (isVi ? "Âm thanh đang tắt tiếng" : "Audio is muted") : (isVi ? "Âm thanh đang bật" : "Audio is active")}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {isVi ? "Bật/Tắt toàn bộ hệ thống âm thanh" : "Toggle all UI and ambient audio output"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={soundConfig.masterVolume}
                  onChange={(e) => setMasterVolume(Number(e.target.value))}
                  disabled={soundConfig.isMuted}
                  className="w-24 sm:w-32 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600 disabled:opacity-40"
                />
                <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 w-8 text-right">
                  {Math.round(soundConfig.masterVolume * 100)}%
                </span>
              </div>
            </div>

            {/* Sound Pack Options */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono block mb-2.5">
                {isVi ? "Gói Âm Thanh Phản Hồi UI" : "UI Click Sound Pack"}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SOUND_PACK_OPTIONS.map((opt) => {
                  const isSelected = soundConfig.soundPack === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setSoundPack(opt.id);
                        playClick();
                      }}
                      className={cn(
                        "p-3 rounded-xl border text-left flex items-start justify-between gap-2 transition-all cursor-pointer",
                        isSelected
                          ? "bg-emerald-500/10 border-emerald-500 ring-2 ring-emerald-400/50 shadow-sm"
                          : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-white/5"
                      )}
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          {isVi ? opt.nameVi : opt.nameEn}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                          {isVi ? opt.descVi : opt.descEn}
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ambient Sound Options */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono block mb-2.5">
                {isVi ? "Âm Thanh Môi Trường Nền (Ambient)" : "Ambient Soundscape"}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {AMBIENT_SOUND_OPTIONS.map((opt) => {
                  const isSelected = soundConfig.ambientSound === opt.id;
                  const Icon = getAmbientIcon(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setAmbientSound(opt.id);
                        playClick();
                      }}
                      className={cn(
                        "p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer",
                        isSelected
                          ? "bg-teal-500/10 border-teal-500 ring-2 ring-teal-400/50 shadow-sm"
                          : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-white/5"
                      )}
                    >
                      <Icon className={cn("w-5 h-5", isSelected ? "text-teal-600 dark:text-teal-400" : "text-slate-400")} />
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {isVi ? opt.nameVi : opt.nameEn}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                resetSoundConfig();
                playSuccess();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isVi ? "Khôi phục mặc định" : "Reset Default"}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playSuccess();
                setIsSoundModalOpen(false);
              }}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition cursor-pointer"
            >
              {isVi ? "Hoàn Tất" : "Done"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
