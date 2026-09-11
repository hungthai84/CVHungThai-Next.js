export type SoundPackType = "modern" | "cyber" | "mechanical" | "zen";

export type AmbientSoundType = "none" | "rain" | "space-drone" | "zen-breeze";

export interface SoundConfig {
  isMuted: boolean;
  masterVolume: number; // 0.0 - 1.0
  uiVolume: number;     // 0.0 - 1.0
  ambientVolume: number;// 0.0 - 1.0
  soundPack: SoundPackType;
  enableClickSound: boolean;
  enableHoverSound: boolean;
  enablePageTransitionSound: boolean;
  enableSuccessSound: boolean;
  ambientSound: AmbientSoundType;
}
