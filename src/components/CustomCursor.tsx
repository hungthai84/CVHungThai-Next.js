/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { useCursor } from "../context/CursorContext";
import { CURSOR_COLOR_OPTIONS } from "../data/cursorData";

export default function CustomCursor() {
  const { cursorConfig } = useCursor();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPosition, setTrailingPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const requestRef = useRef<number>(0);

  // Trail dots for trailing-comet style
  const [trailDots, setTrailDots] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const trailIdCounter = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if touch device
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch || !cursorConfig.enabled) {
      setIsVisible(false);
      return;
    }
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Check hover state on interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          "a, button, input, textarea, select, [role='button'], [tabindex='0']"
        );
        setIsHovered(!!interactive);
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorConfig.enabled]);

  // Animation loop for smooth trailing and liquid physics
  useEffect(() => {
    if (!cursorConfig.enabled || cursorConfig.style === "system") return;

    let lastX = position.x;
    let lastY = position.y;

    const animate = () => {
      setTrailingPosition((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.25,
          y: prev.y + dy * 0.25,
        };
      });

      // Trail dots generator if trailing or neon-ring trail enabled
      if (
        cursorConfig.enableTrail &&
        (cursorConfig.style === "trailing-comet" || cursorConfig.style === "neon-ring") &&
        (Math.abs(position.x - lastX) > 5 || Math.abs(position.y - lastY) > 5)
      ) {
        lastX = position.x;
        lastY = position.y;
        setTrailDots((prev) => [
          ...prev.slice(-15),
          { id: trailIdCounter.current++, x: position.x, y: position.y },
        ]);
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [position, cursorConfig]);

  if (!cursorConfig.enabled || cursorConfig.style === "system" || !isVisible) {
    return null;
  }

  // Resolve color
  const colorObj = CURSOR_COLOR_OPTIONS.find((c) => c.id === cursorConfig.color);
  const colorHex = colorObj ? colorObj.hex : "#06B6D4";
  const glowHex = colorObj ? colorObj.glow : "rgba(6, 182, 212, 0.45)";

  // Size multiplier
  const sizeMultiplier =
    cursorConfig.size === "small" ? 0.75 : cursorConfig.size === "large" ? 1.35 : 1;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Trail Dots */}
      {cursorConfig.enableTrail &&
        (cursorConfig.style === "trailing-comet" || cursorConfig.style === "neon-ring") && (
          <div className="absolute inset-0">
            {trailDots.map((dot, index) => {
              const opacity = ((index + 1) / trailDots.length) * 0.4;
              return (
                <div
                  key={dot.id}
                  className="absolute rounded-full pointer-events-none transition-transform"
                  style={{
                    left: `${dot.x}px`,
                    top: `${dot.y}px`,
                    width: `${8 * sizeMultiplier}px`,
                    height: `${8 * sizeMultiplier}px`,
                    backgroundColor: colorHex,
                    transform: `translate(-50%, -50%) scale(${opacity})`,
                    opacity: opacity,
                    boxShadow: `0 0 10px ${glowHex}`,
                  }}
                />
              );
            })}
          </div>
        )}

      {/* Style 1: Neon Ring */}
      {cursorConfig.style === "neon-ring" && (
        <>
          {/* Outer glowing ring following smoothly */}
          <div
            className="absolute rounded-full pointer-events-none transition-transform duration-75 ease-out"
            style={{
              left: `${trailingPosition.x}px`,
              top: `${trailingPosition.y}px`,
              width: `${36 * sizeMultiplier}px`,
              height: `${36 * sizeMultiplier}px`,
              transform: `translate(-50%, -50%) scale(${isHovered ? 1.5 : isMouseDown ? 0.85 : 1})`,
              border: `1.5px solid ${colorHex}`,
              boxShadow: `0 0 15px ${glowHex}, inset 0 0 10px ${glowHex}`,
              backgroundColor: `${colorHex}15`,
            }}
          />
          {/* Inner solid dot */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              width: `${8 * sizeMultiplier}px`,
              height: `${8 * sizeMultiplier}px`,
              transform: `translate(-50%, -50%) scale(${isMouseDown ? 0.6 : 1})`,
              backgroundColor: colorHex,
              boxShadow: `0 0 10px ${colorHex}`,
            }}
          />
        </>
      )}

      {/* Style 2: Minimal Dot */}
      {cursorConfig.style === "minimal-dot" && (
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            width: `${10 * sizeMultiplier}px`,
            height: `${10 * sizeMultiplier}px`,
            transform: `translate(-50%, -50%) scale(${isHovered ? 2 : isMouseDown ? 0.7 : 1})`,
            backgroundColor: colorHex,
            boxShadow: `0 0 8px ${glowHex}`,
          }}
        />
      )}

      {/* Style 3: Crosshair */}
      {cursorConfig.style === "crosshair" && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            width: `${28 * sizeMultiplier}px`,
            height: `${28 * sizeMultiplier}px`,
            transform: `translate(-50%, -50%) rotate(${isHovered ? "45deg" : "0deg"})`,
            transition: "transform 0.2s ease",
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: `1px dashed ${colorHex}`,
              boxShadow: `0 0 10px ${glowHex}`,
            }}
          />
          <div
            className="absolute top-1/2 left-0 w-full h-[1px]"
            style={{ backgroundColor: colorHex }}
          />
          <div
            className="absolute top-0 left-1/2 w-[1px] h-full"
            style={{ backgroundColor: colorHex }}
          />
        </div>
      )}

      {/* Style 4: Liquid Bubble */}
      {cursorConfig.style === "liquid-bubble" && (
        <div
          className="absolute rounded-full pointer-events-none transition-all duration-100 ease-out"
          style={{
            left: `${trailingPosition.x}px`,
            top: `${trailingPosition.y}px`,
            width: `${40 * sizeMultiplier}px`,
            height: `${40 * sizeMultiplier}px`,
            transform: `translate(-50%, -50%) scale(${isHovered ? 1.4 : isMouseDown ? 0.75 : 1})`,
            backgroundColor: `${colorHex}33`,
            border: `1.5px solid ${colorHex}`,
            boxShadow: `0 0 25px ${glowHex}`,
          }}
        >
          <div
            className="absolute rounded-full"
            style={{
              top: "20%",
              left: "20%",
              width: "30%",
              height: "30%",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              filter: "blur(1px)",
            }}
          />
        </div>
      )}

      {/* Style 5: Trailing Comet */}
      {cursorConfig.style === "trailing-comet" && (
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            width: `${16 * sizeMultiplier}px`,
            height: `${16 * sizeMultiplier}px`,
            transform: `translate(-50%, -50%) scale(${isHovered ? 1.6 : 1})`,
            backgroundColor: colorHex,
            boxShadow: `0 0 20px ${colorHex}, 0 0 40px ${glowHex}`,
          }}
        />
      )}
    </div>
  );
}
