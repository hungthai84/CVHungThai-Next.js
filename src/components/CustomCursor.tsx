import { useEffect, useState, useRef } from "react";
import { useCursor } from "../context/CursorContext";
import { useTheme } from "../context/ThemeContext";
import { CURSOR_COLOR_OPTIONS } from "../data/cursorData";

export default function CustomCursor() {
  const { cursorConfig } = useCursor();
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Position references
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });

  // Trails for trailing-comet style
  const trailPositions = useRef<Array<{ x: number; y: number }>>([
    { x: -100, y: -100 },
    { x: -100, y: -100 },
    { x: -100, y: -100 },
    { x: -100, y: -100 },
    { x: -100, y: -100 }
  ]);

  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<Array<HTMLDivElement | null>>([]);
  const animFrameId = useRef<number | null>(null);

  // Resolve active cursor color based on preset or theme
  const activeColor = (() => {
    if (cursorConfig.colorPreset === "auto") {
      if (theme === "glass-dark-neon") return { normal: "#00f0ff", hover: "#ff007f" };
      if (theme === "mritech-digital-growth") return { normal: "#6366f1", hover: "#a855f7" };
      return { normal: "#6366f1", hover: "#a855f7" };
    }
    const found = CURSOR_COLOR_OPTIONS.find((c) => c.id === cursorConfig.colorPreset);
    if (found) {
      return { normal: found.hex, hover: found.hoverHex };
    }
    return { normal: "#00d9ff", hover: "#ff00ff" };
  })();

  // Scale factor based on cursorConfig.size
  const sizeMultiplier = cursorConfig.size === "small" ? 0.75 : cursorConfig.size === "large" ? 1.35 : 1.0;

  useEffect(() => {
    if (cursorConfig.style === "system") return;
    if (typeof window === "undefined") return;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return;

    let isAnimating = false;
    let lastTarget: EventTarget | null = null;

    const startAnimation = () => {
      if (!isAnimating) {
        isAnimating = true;
        animFrameId.current = requestAnimationFrame(animate);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      if (e.target !== lastTarget && cursorConfig.enableHoverEffect) {
        lastTarget = e.target;
        const target = e.target as HTMLElement | null;
        if (target) {
          const interactive = !!target.closest(
            'a, button, input, textarea, select, [role="button"], .cursor-pointer, [onclick], summary, label'
          );
          setIsHovering(interactive);
        }
      }
      startAnimation();
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const ringLerp = 0.22;
    const dotLerp = 0.12;

    const animate = () => {
      // Linear interpolation for Ring
      const dxRing = mousePos.current.x - ringPos.current.x;
      const dyRing = mousePos.current.y - ringPos.current.y;
      ringPos.current.x += dxRing * ringLerp;
      ringPos.current.y += dyRing * ringLerp;

      // Linear interpolation for Dot
      const dxDot = mousePos.current.x - dotPos.current.x;
      const dyDot = mousePos.current.y - dotPos.current.y;
      dotPos.current.x += dxDot * dotLerp;
      dotPos.current.y += dyDot * dotLerp;

      // Update trail positions
      let trailSettled = true;
      if (cursorConfig.style === "trailing-comet" && cursorConfig.enableTrail) {
        let prevX = dotPos.current.x;
        let prevY = dotPos.current.y;
        for (let i = 0; i < trailPositions.current.length; i++) {
          const tdx = prevX - trailPositions.current[i].x;
          const tdy = prevY - trailPositions.current[i].y;
          trailPositions.current[i].x += tdx * (0.35 - i * 0.05);
          trailPositions.current[i].y += tdy * (0.35 - i * 0.05);
          if (Math.abs(tdx) > 0.1 || Math.abs(tdy) > 0.1) {
            trailSettled = false;
          }
          prevX = trailPositions.current[i].x;
          prevY = trailPositions.current[i].y;

          const ref = trailRefs.current[i];
          if (ref) {
            ref.style.transform = `translate3d(${trailPositions.current[i].x}px, ${trailPositions.current[i].y}px, 0) translate(-50%, -50%)`;
          }
        }
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      const isRingSettled = Math.abs(dxRing) < 0.1 && Math.abs(dyRing) < 0.1;
      const isDotSettled = Math.abs(dxDot) < 0.1 && Math.abs(dyDot) < 0.1;

      if (!isRingSettled || !isDotSettled || !trailSettled) {
        animFrameId.current = requestAnimationFrame(animate);
      } else {
        isAnimating = false;
        animFrameId.current = null;
      }
    };

    startAnimation();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [isVisible, cursorConfig.style, cursorConfig.enableHoverEffect, cursorConfig.enableTrail]);

  // Don't render on touch devices or if set to system cursor
  if (cursorConfig.style === "system") return null;
  if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) {
    return null;
  }

  const currentColor = isHovering ? activeColor.hover : activeColor.normal;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[99999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* STYLE 1: NEON RING & DOT (Signature default) */}
      {cursorConfig.style === "neon-ring" && (
        <>
          <div
            ref={ringRef}
            className="fixed top-0 left-0 rounded-full pointer-events-none will-change-transform"
            style={{
              width: `${(isHovering ? 50 : 22) * sizeMultiplier}px`,
              height: `${(isHovering ? 50 : 22) * sizeMultiplier}px`,
              border: `2px solid ${currentColor}`,
              boxShadow: isHovering
                ? `0 0 18px ${currentColor}, inset 0 0 10px ${currentColor}`
                : `0 0 10px ${currentColor}`,
              mixBlendMode: cursorConfig.blendMode,
              transform: isClicking ? "scale(0.85)" : "scale(1)",
              transition:
                "width 0.25s cubic-bezier(0.2, 0, 0.2, 1), height 0.25s cubic-bezier(0.2, 0, 0.2, 1), border-color 0.25s ease, box-shadow 0.25s ease, transform 0.15s ease",
            }}
          />
          <div
            ref={dotRef}
            className="fixed top-0 left-0 rounded-full pointer-events-none will-change-transform"
            style={{
              width: `${(isClicking ? 4 : isHovering ? 8 : 6) * sizeMultiplier}px`,
              height: `${(isClicking ? 4 : isHovering ? 8 : 6) * sizeMultiplier}px`,
              backgroundColor: currentColor,
              boxShadow: `0 0 8px ${currentColor}`,
              transition: "background-color 0.25s ease, width 0.15s ease, height 0.15s ease",
            }}
          />
        </>
      )}

      {/* STYLE 2: MINIMAL SMOOTH DOT */}
      {cursorConfig.style === "minimal-dot" && (
        <div
          ref={dotRef}
          className="fixed top-0 left-0 rounded-full pointer-events-none will-change-transform"
          style={{
            width: `${(isHovering ? 36 : 10) * sizeMultiplier}px`,
            height: `${(isHovering ? 36 : 10) * sizeMultiplier}px`,
            backgroundColor: isHovering ? `${currentColor}25` : currentColor,
            border: isHovering ? `1.5px solid ${currentColor}` : "none",
            boxShadow: `0 0 12px ${currentColor}60`,
            backdropFilter: isHovering ? "blur(2px)" : "none",
            transition: "width 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s ease, border 0.2s ease",
          }}
        />
      )}

      {/* STYLE 3: PRECISION RETICLE CROSSHAIR */}
      {cursorConfig.style === "crosshair" && (
        <div
          ref={ringRef}
          className="fixed top-0 left-0 pointer-events-none will-change-transform flex items-center justify-center"
          style={{
            width: `${(isHovering ? 42 : 32) * sizeMultiplier}px`,
            height: `${(isHovering ? 42 : 32) * sizeMultiplier}px`,
            transition: "width 0.2s ease, height 0.2s ease, transform 0.2s ease",
          }}
        >
          {/* Outer circle */}
          <div
            className="w-full h-full rounded-full border border-dashed"
            style={{
              borderColor: `${currentColor}80`,
              boxShadow: `0 0 10px ${currentColor}40`,
              transform: isHovering ? "rotate(45deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          />
          {/* Horizontal crosshair */}
          <div
            className="absolute h-[1.5px] rounded-full"
            style={{
              width: `${(isHovering ? 48 : 38) * sizeMultiplier}px`,
              backgroundColor: currentColor,
              boxShadow: `0 0 6px ${currentColor}`,
            }}
          />
          {/* Vertical crosshair */}
          <div
            className="absolute w-[1.5px] rounded-full"
            style={{
              height: `${(isHovering ? 48 : 38) * sizeMultiplier}px`,
              backgroundColor: currentColor,
              boxShadow: `0 0 6px ${currentColor}`,
            }}
          />
          {/* Center target dot */}
          <div
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: currentColor }}
          />
        </div>
      )}

      {/* STYLE 4: FLUID AURA BUBBLE */}
      {cursorConfig.style === "liquid-bubble" && (
        <div
          ref={ringRef}
          className="fixed top-0 left-0 rounded-full pointer-events-none will-change-transform"
          style={{
            width: `${(isHovering ? 56 : 28) * sizeMultiplier}px`,
            height: `${(isHovering ? 56 : 28) * sizeMultiplier}px`,
            background: `radial-gradient(circle, ${currentColor}45 0%, ${currentColor}15 70%, transparent 100%)`,
            border: `1.5px solid ${currentColor}80`,
            boxShadow: `0 0 25px ${currentColor}50`,
            backdropFilter: "blur(4px)",
            transition: "width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
      )}

      {/* STYLE 5: TRAILING COMET */}
      {cursorConfig.style === "trailing-comet" && (
        <>
          {/* Stardust trails */}
          {cursorConfig.enableTrail &&
            [0, 1, 2, 3, 4].map((idx) => (
              <div
                key={idx}
                ref={(el) => { trailRefs.current[idx] = el; }}
                className="fixed top-0 left-0 rounded-full pointer-events-none will-change-transform"
                style={{
                  width: `${(8 - idx * 1.2) * sizeMultiplier}px`,
                  height: `${(8 - idx * 1.2) * sizeMultiplier}px`,
                  backgroundColor: currentColor,
                  opacity: 0.7 - idx * 0.13,
                  boxShadow: `0 0 ${8 - idx}px ${currentColor}`,
                }}
              />
            ))}
          {/* Main comet head */}
          <div
            ref={dotRef}
            className="fixed top-0 left-0 rounded-full pointer-events-none will-change-transform"
            style={{
              width: `${(isHovering ? 18 : 10) * sizeMultiplier}px`,
              height: `${(isHovering ? 18 : 10) * sizeMultiplier}px`,
              backgroundColor: currentColor,
              boxShadow: `0 0 16px ${currentColor}, 0 0 6px #fff`,
              transition: "width 0.2s ease, height 0.2s ease",
            }}
          />
        </>
      )}
    </div>
  );
}
