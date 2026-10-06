export type FooterPlacement = 
  | "fixed-bottom"   // Bo góc trên, áp đáy màn hình (Mặc định sang trọng)
  | "floating-pill"   // Thanh nổi như Dynamic Island, lơ lửng cách mép đáy
  | "full-width"      // Trải dài toàn chiều rộng màn hình
  | "auto-hide";      // Tự động ẩn khi cuộn/đọc, hiện lên khi di chuột/chạm gần đáy

export type FooterStyleVariant = "glass" | "solid" | "minimal";

export interface FooterConfig {
  placement: FooterPlacement;
  styleVariant: FooterStyleVariant;
  isPinned: boolean;
  showWeather: boolean;
  showClock: boolean;
  showQuickNav: boolean;
  showCursorControl: boolean;
  showSoundControl: boolean;
  showAIAssistant: boolean;
  showNextPageButton: boolean;
  showCopyright: boolean;
  blurIntensity: "low" | "medium" | "high";
}
