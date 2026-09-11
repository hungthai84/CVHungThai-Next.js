import { SoundConfig, SoundPackType, AmbientSoundType } from "../types/sound";

export const DEFAULT_SOUND_CONFIG: SoundConfig = {
  isMuted: false,
  masterVolume: 0.7,
  uiVolume: 0.8,
  ambientVolume: 0.4,
  soundPack: "modern",
  enableClickSound: true,
  enableHoverSound: false, // subtle by default so not overwhelming
  enablePageTransitionSound: true,
  enableSuccessSound: true,
  ambientSound: "none"
};

export interface SoundPackOption {
  id: SoundPackType;
  nameVi: string;
  nameEn: string;
  descVi: string;
  descEn: string;
}

export const SOUND_PACK_OPTIONS: SoundPackOption[] = [
  {
    id: "modern",
    nameVi: "Hiện đại & Tinh tế",
    nameEn: "Modern Crisp",
    descVi: "Âm click đanh gọn, tần số cao tinh gọn lấy cảm hứng từ giao diện kính",
    descEn: "Clean, refined micro-haptics with high clarity and balanced decay"
  },
  {
    id: "cyber",
    nameVi: "Sci-Fi Cyberpunk",
    nameEn: "Cyber Digital",
    descVi: "Âm thanh kỹ thuật số tương lai, tần số biến điệu gợi cảm giác công nghệ cao",
    descEn: "Futuristic synthesized bleeps, harmonic sweeps, and holographic tone"
  },
  {
    id: "mechanical",
    nameVi: "Bàn phím cơ khí",
    nameEn: "Mechanical Switch",
    descVi: "Mô phỏng tiếng gõ phím cơ blue switch và click chuột công thái học",
    descEn: "Tactile acoustic switch click with punchy mechanical response"
  },
  {
    id: "zen",
    nameVi: "Thiền định êm dịu",
    nameEn: "Soft Zen Chime",
    descVi: "Âm thanh sóng hình sin êm dịu, ấm áp, thư thái và giảm căng thẳng",
    descEn: "Gentle harmonic sine chimes designed for peaceful, relaxed browsing"
  }
];

export interface AmbientSoundOption {
  id: AmbientSoundType;
  nameVi: string;
  nameEn: string;
  descVi: string;
  descEn: string;
}

export const AMBIENT_SOUND_OPTIONS: AmbientSoundOption[] = [
  {
    id: "none",
    nameVi: "Tắt âm nền",
    nameEn: "No Ambient",
    descVi: "Chỉ phát âm thanh hiệu ứng khi thao tác",
    descEn: "Silent ambient background, only UI action sounds"
  },
  {
    id: "rain",
    nameVi: "Tiếng mưa nhẹ",
    nameEn: "Gentle Rain",
    descVi: "Mô phỏng tiếng mưa rơi đều êm ả giúp tập trung làm việc",
    descEn: "Soothing synthesized white-noise raindrops for deep focus"
  },
  {
    id: "space-drone",
    nameVi: "Giai điệu không gian",
    nameEn: "Space Synth Drone",
    descVi: "Hợp âm vũ trụ ngân vang nhẹ nhàng 432Hz tạo cảm giác hiện đại",
    descEn: "Deep atmospheric spatial synth pad with slow evolving harmonics"
  },
  {
    id: "zen-breeze",
    nameVi: "Gió thoảng thư giãn",
    nameEn: "Zen Breeze",
    descVi: "Âm thanh gió nhẹ thoảng qua đồng cỏ mang lại sự bình yên",
    descEn: "Organic resonant pink noise filter simulating a gentle mountain breeze"
  }
];
