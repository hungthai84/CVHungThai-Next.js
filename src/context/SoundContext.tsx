import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { SoundConfig, SoundPackType, AmbientSoundType } from "../types/sound";
import { DEFAULT_SOUND_CONFIG } from "../data/soundData";
import { audioEngine } from "../services/audioEngine";

interface SoundContextType {
  soundConfig: SoundConfig;
  toggleMute: () => void;
  setMasterVolume: (vol: number) => void;
  setUiVolume: (vol: number) => void;
  setAmbientVolume: (vol: number) => void;
  setSoundPack: (pack: SoundPackType) => void;
  setAmbientSound: (ambient: AmbientSoundType) => void;
  updateSoundConfig: (partial: Partial<SoundConfig>) => void;
  resetSoundConfig: () => void;
  playClick: () => void;
  playHover: () => void;
  playTransition: () => void;
  playSuccess: () => void;
  playToggle: (isOn: boolean) => void;
  isSoundModalOpen: boolean;
  setIsSoundModalOpen: (open: boolean) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

const STORAGE_KEY = "thai_portfolio_sound_config";

export function SoundProvider({ children }: { children: ReactNode }) {
  const [soundConfig, setSoundConfig] = useState<SoundConfig>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          return { ...DEFAULT_SOUND_CONFIG, ...JSON.parse(saved) };
        }
      } catch (e) {
        console.warn("Could not parse saved sound config", e);
      }
    }
    return DEFAULT_SOUND_CONFIG;
  });

  const [isSoundModalOpen, setIsSoundModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(soundConfig));
    } catch (e) {
      console.warn("Could not save sound config to localStorage", e);
    }
  }, [soundConfig]);

  // Handle ambient sound changes
  useEffect(() => {
    if (soundConfig.isMuted || soundConfig.masterVolume === 0) {
      audioEngine.stopAmbientSound();
    } else {
      audioEngine.setAmbientSound(
        soundConfig.ambientSound,
        soundConfig.ambientVolume * soundConfig.masterVolume
      );
    }

    return () => {
      audioEngine.stopAmbientSound();
    };
  }, [soundConfig.ambientSound, soundConfig.isMuted, soundConfig.masterVolume, soundConfig.ambientVolume]);

  const toggleMute = useCallback(() => {
    setSoundConfig((prev) => {
      const nextMuted = !prev.isMuted;
      if (!nextMuted) {
        audioEngine.unlockAudio();
        audioEngine.playToggle(true, prev.uiVolume * prev.masterVolume);
      }
      return { ...prev, isMuted: nextMuted };
    });
  }, []);

  const setMasterVolume = useCallback((masterVolume: number) => {
    setSoundConfig((prev) => ({ ...prev, masterVolume }));
  }, []);

  const setUiVolume = useCallback((uiVolume: number) => {
    setSoundConfig((prev) => ({ ...prev, uiVolume }));
  }, []);

  const setAmbientVolume = useCallback((ambientVolume: number) => {
    setSoundConfig((prev) => ({ ...prev, ambientVolume }));
  }, []);

  const setSoundPack = useCallback((soundPack: SoundPackType) => {
    setSoundConfig((prev) => ({ ...prev, soundPack }));
    // Preview click sound
    audioEngine.playClick(soundPack, soundConfig.uiVolume * soundConfig.masterVolume);
  }, [soundConfig.uiVolume, soundConfig.masterVolume]);

  const setAmbientSound = useCallback((ambientSound: AmbientSoundType) => {
    setSoundConfig((prev) => ({ ...prev, ambientSound }));
  }, []);

  const updateSoundConfig = useCallback((partial: Partial<SoundConfig>) => {
    setSoundConfig((prev) => ({ ...prev, ...partial }));
  }, []);

  const resetSoundConfig = useCallback(() => {
    setSoundConfig(DEFAULT_SOUND_CONFIG);
  }, []);

  const playClick = useCallback(() => {
    if (soundConfig.isMuted || !soundConfig.enableClickSound) return;
    audioEngine.playClick(
      soundConfig.soundPack,
      soundConfig.uiVolume * soundConfig.masterVolume
    );
  }, [soundConfig]);

  const playHover = useCallback(() => {
    if (soundConfig.isMuted || !soundConfig.enableHoverSound) return;
    audioEngine.playHover(
      soundConfig.soundPack,
      soundConfig.uiVolume * soundConfig.masterVolume
    );
  }, [soundConfig]);

  const playTransition = useCallback(() => {
    if (soundConfig.isMuted || !soundConfig.enablePageTransitionSound) return;
    audioEngine.playTransition(
      soundConfig.soundPack,
      soundConfig.uiVolume * soundConfig.masterVolume
    );
  }, [soundConfig]);

  const playSuccess = useCallback(() => {
    if (soundConfig.isMuted || !soundConfig.enableSuccessSound) return;
    audioEngine.playSuccess(
      soundConfig.soundPack,
      soundConfig.uiVolume * soundConfig.masterVolume
    );
  }, [soundConfig]);

  const playToggle = useCallback((isOn: boolean) => {
    if (soundConfig.isMuted) return;
    audioEngine.playToggle(
      isOn,
      soundConfig.uiVolume * soundConfig.masterVolume
    );
  }, [soundConfig]);

  // Global listener for interactive elements click sound
  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastClickTime = 0;
    const handleGlobalClick = (e: MouseEvent) => {
      audioEngine.unlockAudio();

      if (soundConfig.isMuted || !soundConfig.enableClickSound) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = !!target.closest(
        'button, a, input, [role="button"], select, textarea, .clickable-sound, summary'
      );

      if (isInteractive) {
        const now = Date.now();
        if (now - lastClickTime > 40) { // prevent excessive rapid triggers
          lastClickTime = now;
          audioEngine.playClick(
            soundConfig.soundPack,
            soundConfig.uiVolume * soundConfig.masterVolume
          );
        }
      }
    };

    window.addEventListener("click", handleGlobalClick, { capture: true });
    return () => {
      window.removeEventListener("click", handleGlobalClick, { capture: true });
    };
  }, [soundConfig.isMuted, soundConfig.enableClickSound, soundConfig.soundPack, soundConfig.uiVolume, soundConfig.masterVolume]);

  return (
    <SoundContext.Provider
      value={{
        soundConfig,
        toggleMute,
        setMasterVolume,
        setUiVolume,
        setAmbientVolume,
        setSoundPack,
        setAmbientSound,
        updateSoundConfig,
        resetSoundConfig,
        playClick,
        playHover,
        playTransition,
        playSuccess,
        playToggle,
        isSoundModalOpen,
        setIsSoundModalOpen
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

const fallbackSoundContext: SoundContextType = {
  soundConfig: DEFAULT_SOUND_CONFIG,
  toggleMute: () => {},
  setMasterVolume: () => {},
  setUiVolume: () => {},
  setAmbientVolume: () => {},
  setSoundPack: () => {},
  setAmbientSound: () => {},
  updateSoundConfig: () => {},
  resetSoundConfig: () => {},
  playClick: () => {},
  playHover: () => {},
  playTransition: () => {},
  playSuccess: () => {},
  playToggle: () => {},
  isSoundModalOpen: false,
  setIsSoundModalOpen: () => {},
};

export function useSound() {
  const context = useContext(SoundContext);
  return context || fallbackSoundContext;
}
