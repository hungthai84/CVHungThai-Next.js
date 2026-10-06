import React, { useRef, useEffect } from "react";
import { useBackground } from "../context/BackgroundContext";
import { useTheme } from "../context/ThemeContext";
import MetaballsBg from "./MetaballsBg";
import FloatingParticlesCanvasBg from "./FloatingParticlesCanvasBg";

// Interactive cursor ripple and particle overlay for immersive background experience
function InteractiveCursorRippleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      color: string;
      life: number;
      maxLife: number;
    }

    interface Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
      color: string;
    }

    let particles: Particle[] = [];
    let ripples: Ripple[] = [];
    let lastMoveTime = 0;

    const colors = [
      "rgba(56, 189, 248, ",   // sky blue
      "rgba(168, 85, 247, ",  // purple
      "rgba(244, 63, 94, ",   // rose
      "rgba(16, 185, 129, ",  // emerald
      "rgba(245, 158, 11, ",  // amber
      "rgba(6, 182, 212, ",   // cyan
    ];

    let isRunning = false;

    const startAnimation = () => {
      if (!isRunning) {
        isRunning = true;
        animId = requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const now = Date.now();
      if (now - lastMoveTime < 24) return;
      lastMoveTime = now;

      const colorBase = colors[Math.floor(Math.random() * colors.length)];
      if (particles.length < 25) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.4,
          radius: Math.random() * 3 + 2,
          alpha: 0.7,
          color: colorBase,
          life: 0,
          maxLife: 30 + Math.random() * 15,
        });
        startAnimation();
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      const colorBase = colors[Math.floor(Math.random() * colors.length)];
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 4,
        maxRadius: 70 + Math.random() * 20,
        alpha: 0.85,
        color: colorBase,
      });
      startAnimation();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += (r.maxRadius - r.radius) * 0.08 + 1;
        r.alpha *= 0.93;

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${r.color}${r.alpha})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `${r.color}${r.alpha * 0.2})`;
        ctx.fill();

        if (r.alpha < 0.02 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
        }
      }

      // Render floating mouse particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha = Math.max(0, 0.7 * (1 - p.life / p.maxLife));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();

        if (p.life >= p.maxLife || p.alpha <= 0.01) {
          particles.splice(i, 1);
        }
      }

      if (ripples.length > 0 || particles.length > 0) {
        animId = requestAnimationFrame(render);
      } else {
        isRunning = false;
        ctx.clearRect(0, 0, width, height);
      }
    };

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[2] select-none"
    />
  );
}

// Helper to format scoped CSS
function formatScopedCss(cssCode: string, scopeClass: string): string {
  if (!cssCode) return "";
  let formatted = cssCode.trim();
  if (!formatted.includes("{")) {
    return `.${scopeClass} { ${formatted} }`;
  }
  formatted = formatted.replace(/\bbody::/g, `.${scopeClass}::`);
  formatted = formatted.replace(/\bbody\b/g, `.${scopeClass}`);
  formatted = formatted.replace(/&/g, `.${scopeClass}`);
  return formatted;
}

export default function BackgroundRenderer() {
  const { config } = useBackground();
  const { theme } = useTheme();
  const { activeType, activeUrl, activeCssCode, overlayOpacity, blurAmount, items, activeId } = config;

  // Resolve CSS code if activeType is css
  const activeCssItem = items.find(it => it.id === activeId);
  const currentCssCode = activeCssCode || activeCssItem?.cssCode || "";

  // Extract YouTube embed ID if youtube link is supplied
  const getYouTubeEmbedUrl = (url: string) => {
    let videoId = "";
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
    } else if (url.includes("youtube.com/watch")) {
      const urlParams = new URLSearchParams(new URL(url).search);
      videoId = urlParams.get("v") || "";
    } else if (url.includes("youtube.com/embed/")) {
      videoId = url.split("youtube.com/embed/")[1]?.split("?")[0] || "";
    }
    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&enablejsapi=1&disablekb=1`;
  };

  const ytEmbed = activeType === "video" && activeUrl ? getYouTubeEmbedUrl(activeUrl) : null;

  // Convert any CodePen / Pencode URL to clean fullpage iframe view
  const formatCodePenEmbedUrl = (url: string) => {
    if (!url) return "";
    const clean = url.trim();
    
    // Pattern: https://codepen.io/user/pen/penId or /full/penId or /details/penId or /embed/penId
    const cpMatch = clean.match(/(?:codepen\.io|pencode\.io|cdpn\.io)\/([^\/]+)\/(?:pen|full|details|embed(?:\/preview)?)\/([a-zA-Z0-9_-]+)/i);
    if (cpMatch) {
      const user = cpMatch[1];
      const penId = cpMatch[2];
      return `https://cdpn.io/${user}/fullpage/${penId}`;
    }

    const cdpnMatch = clean.match(/cdpn\.io\/([^\/]+)\/fullpage\/([a-zA-Z0-9_-]+)/i);
    if (cdpnMatch) {
      return clean;
    }

    return clean;
  };

  return (
    <div 
      suppressHydrationWarning
      className="fixed -inset-6 w-[calc(100vw+48px)] h-[calc(100vh+48px)] pointer-events-none z-0 overflow-hidden select-none transition-all duration-700"
      style={{
        filter: blurAmount > 0 ? `blur(${blurAmount}px)` : undefined,
        transform: blurAmount > 0 ? "scale(1.08)" : "scale(1.03)" // prevent blurred or top border artifacts
      }}
    >
      {/* 1. Default Dynamic Glass Gradient with Dark/Light Mesh & Vivid Bleeding Multi-Color Light Orbs */}
      {activeType === "gradient" && (
        <div className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none overflow-hidden scale-105">
          {theme === "soft-floating-bento" ? (
            <div className="absolute inset-0 overflow-hidden pointer-events-none transition-all duration-700">
              {/* Soft Lavender Periwinkle Sky Pastel Gradient Base */}
              <div 
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, #B9A8F2 0%, #C7B9F4 35%, #AFC8F4 70%, #B8DCF2 100%)"
                }}
              />

              {/* Ambient Abstract Blobs & Floating Pastel Shapes (Low opacity, non-distracting) */}
              <div 
                className="absolute -top-[10%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-[#7C5CDB]/20 via-[#9A63E8]/15 to-transparent blur-[90px] animate-[pulse_10s_ease-in-out_infinite]"
              />
              <div 
                className="absolute top-[20%] -right-[15%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-bl from-[#39BFC5]/20 via-[#4D8EF7]/15 to-transparent blur-[100px] animate-[pulse_12s_ease-in-out_infinite]"
              />
              <div 
                className="absolute -bottom-[15%] left-[15%] w-[65vw] h-[55vw] rounded-full bg-gradient-to-tr from-[#D778E8]/18 via-[#C7B9F4]/20 to-transparent blur-[110px] animate-[pulse_14s_ease-in-out_infinite]"
              />

              {/* Soft Translucent Floating Glass Shapes */}
              <div 
                className="absolute top-[20%] left-[12%] w-44 h-44 rounded-[28px] rotate-12 bg-white/20 border border-white/40 shadow-[0_15px_35px_rgba(70,65,150,0.08)] backdrop-blur-[16px] animate-[bounce_10s_ease-in-out_infinite]"
                style={{ animationDelay: '0s' }}
              />
              <div 
                className="absolute bottom-[20%] right-[12%] w-56 h-56 rounded-full bg-white/22 border border-white/40 shadow-[0_18px_40px_rgba(70,65,150,0.08)] backdrop-blur-[16px] animate-[bounce_12s_ease-in-out_infinite]"
                style={{ animationDelay: '-4s' }}
              />
            </div>
          ) : (
            <>
              {/* Base Mesh Gradient Canvas for Light & Dark (Light: Trắng xanh rất nhẹ #F0F4FA; Dark: Navy/Deep Blue #0B132B) */}
              <div className="absolute inset-0 transition-colors duration-500 bg-[#F0F4FA] dark:bg-[#0B132B]" />

              {/* LIGHT MODE Ambient Multi-Color Radial Light Blobs & Primary/Secondary Corner Glows */}
              <div className="dark:hidden absolute inset-0 overflow-hidden">
                {/* Lớp gradient mềm nền - Glass UI Light Multicolor Ambient Light */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `
                      radial-gradient(circle at 5% 5%, rgba(var(--color-primary-rgb, 85, 131, 238), 0.18), transparent 35%),
                      radial-gradient(circle at 95% 5%, rgba(var(--color-secondary-rgb, 65, 216, 221), 0.16), transparent 35%),
                      radial-gradient(circle at 90% 90%, rgba(var(--color-accent-rgb, 108, 172, 255), 0.15), transparent 35%),
                      radial-gradient(circle at 10% 90%, rgba(var(--color-primary-rgb, 85, 131, 238), 0.14), transparent 35%),
                      #F0F4FA
                    `
                  }}
                />

                {/* Organic Waves SVG with Soft Blur */}
                <svg className="absolute top-[5%] -left-[10%] w-[120%] h-[60%] opacity-35 blur-[45px] animate-[pulse_12s_ease-in-out_infinite]" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0,288L120,266.7C240,245,480,203,720,202.7C960,203,1200,245,1320,266.7L1440,288L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z" fill="url(#wave-gradient-1)" />
                  <defs>
                    <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#5583EE" stopOpacity="0.25" />
                      <stop offset="50%" stopColor="#41D8DD" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#6CACFF" stopOpacity="0.15" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Corner Blob 1: Top-Left Primary Blue */}
                <div 
                  className="absolute -top-[15%] -left-[10%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-br from-[#5583EE]/22 via-[#6CACFF]/18 to-[#41D8DD]/15 blur-[120px] animate-[pulse_9s_ease-in-out_infinite]"
                />
                {/* Corner Blob 2: Top-Right Secondary Cyan */}
                <div 
                  className="absolute top-[10%] -right-[15%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-bl from-[#41D8DD]/22 via-[#8DEBFF]/18 to-[#5583EE]/12 blur-[130px] animate-[pulse_11s_ease-in-out_infinite]"
                />
                {/* Corner Blob 3: Bottom-Left Purple Accent */}
                <div 
                  className="absolute -bottom-[20%] left-[10%] w-[70vw] h-[65vw] rounded-full bg-gradient-to-tr from-[#A16BFE]/18 via-[#DEB0DF]/16 to-[#ABC7FF]/14 blur-[140px] animate-[pulse_13s_ease-in-out_infinite]"
                />
                {/* Corner Blob 4: Bottom-Right Soft Highlight */}
                <div 
                  className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tl from-[#5583EE]/15 via-[#41D8DD]/15 to-transparent blur-[110px] animate-[pulse_15s_ease-in-out_infinite]"
                />

                {/* Floating Glass Spheres with 3D shadow and gradient border (Abstract Shapes) */}
                <div 
                  className="absolute top-[25%] left-[15%] w-48 h-48 rounded-full bg-white/40 border border-white/60 shadow-[inset_0_4px_12px_rgba(255,255,255,0.8),0_12px_32px_rgba(85,131,238,0.08)] backdrop-blur-[15px] animate-[bounce_8s_ease-in-out_infinite] scale-90"
                  style={{ animationDelay: '0s' }}
                />
                <div 
                  className="absolute bottom-[25%] right-[18%] w-60 h-60 rounded-full bg-white/35 border border-white/50 shadow-[inset_0_4px_16px_rgba(255,255,255,0.7),0_16px_40px_rgba(65,216,221,0.06)] backdrop-blur-[20px] animate-[bounce_10s_ease-in-out_infinite] scale-95"
                  style={{ animationDelay: '-3s' }}
                />
              </div>

              {/* DARK MODE Ambient Multi-Color Radial Light Blobs on Navy/Deep Blue (#0B132B) */}
              <div 
                className="hidden dark:block absolute -top-[15%] -left-[10%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-br from-[#6366F1]/30 via-[#3B82F6]/25 to-[#8B5CF6]/20 blur-[140px] animate-pulse"
                style={{ animationDuration: '9s' }}
              />
              <div 
                className="hidden dark:block absolute top-[10%] -right-[15%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-bl from-[#00F5FF]/25 via-[#06B6D4]/22 to-[#3B82F6]/20 blur-[150px] animate-pulse"
                style={{ animationDuration: '11s' }}
              />
              <div 
                className="hidden dark:block absolute -bottom-[20%] left-[10%] w-[70vw] h-[65vw] rounded-full bg-gradient-to-tr from-[#8B5CF6]/28 via-[#6366F1]/25 to-[#3B82F6]/20 blur-[160px] animate-pulse"
                style={{ animationDuration: '13s' }}
              />
              <div 
                className="hidden dark:block absolute bottom-[5%] right-[5%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-tl from-[#06B6D4]/20 via-[#3B82F6]/20 to-transparent blur-[130px] animate-pulse"
                style={{ animationDuration: '15s' }}
              />
              <div 
                className="hidden dark:block absolute top-[40%] left-[30%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-r from-[#00F5FF]/15 to-[#8B5CF6]/15 blur-[170px] animate-pulse"
                style={{ animationDuration: '12s' }}
              />
            </>
          )}
        </div>
      )}

      {/* 2. Video Background (Direct MP4/WebM or YouTube) */}
      {activeType === "video" && activeUrl && (
        <div className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] overflow-hidden pointer-events-none">
          {ytEmbed ? (
            <iframe
              src={ytEmbed}
              title="YouTube Background Video"
              className="w-[300vw] h-[300vh] -top-[100vh] -left-[100vw] absolute object-cover pointer-events-none scale-105 origin-center"
              allow="autoplay; encrypted-media"
            />
          ) : (
            <video
              key={activeUrl}
              src={activeUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full min-w-full min-h-full object-cover scale-105 transition-opacity duration-1000"
            />
          )}
        </div>
      )}

      {/* 3. Image Background */}
      {activeType === "image" && activeUrl && (
        <div 
          className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] bg-cover bg-center bg-no-repeat transition-all duration-700 scale-105"
          style={{ backgroundImage: `url("${activeUrl}")` }}
        />
      )}

      {/* 4. Custom CSS Code Wallpaper Background */}
      {activeType === "css" && (
        <div className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] custom-css-live-wallpaper overflow-hidden pointer-events-none transition-all duration-700 scale-105">
          <style dangerouslySetInnerHTML={{ __html: `
            .custom-css-live-wallpaper {
              width: 100%;
              height: 100%;
              position: absolute;
              inset: 0;
            }
            ${formatScopedCss(currentCssCode, 'custom-css-live-wallpaper')}
          `}} />
        </div>
      )}

      {/* 4b. CodePen / Pencode Iframe Live Wallpaper */}
      {activeType === "codepen" && activeUrl && (
        activeUrl.includes("WNNWoaO") ? (
          <MetaballsBg />
        ) : (
          <div className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] overflow-hidden pointer-events-none transition-all duration-700 bg-transparent">
            <iframe
              key={activeUrl}
              src={formatCodePenEmbedUrl(activeUrl)}
              title="CodePen Live Wallpaper"
              className="absolute -top-[100px] sm:-top-[120px] -left-[5vw] w-[110vw] h-[calc(100vh+240px)] border-0 pointer-events-none object-cover scale-[1.05] origin-top"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </div>
        )
      )}

      {/* 4c. Canvas Luminous Orbs Particles Background */}
      {(activeType === "floating-particles" || activeUrl === "canvas://floating-particles" || activeId === "canvas-luminous-orbs-particles") && (
        <div className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] overflow-hidden pointer-events-none scale-105">
          <FloatingParticlesCanvasBg />
        </div>
      )}

      {/* 5. Animated 3-Color Gradient Background (Red/Blue/Green CodePen) */}
      {activeType === "animated-gradient" && (
        <div className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] animated-gradient-bg overflow-hidden pointer-events-none scale-105">
          <style dangerouslySetInnerHTML={{ __html: `
            .animated-gradient-bg {
              width: 100%;
              height: 100%;
              background: linear-gradient(
                270deg,
                #e63b3b,
                #488cdd,
                #48dd68
              );
              background-size: 600% 600%;
              animation: animatedGradient 30s ease infinite;
            }

            @keyframes animatedGradient {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }
          `}} />
        </div>
      )}

      {/* 4. Beach Wave Animated Background (CodePen HTML/CSS) */}
      {activeType === "beach" && (
        <div className="absolute inset-0 w-full h-full beach overflow-hidden pointer-events-none">
          <style dangerouslySetInnerHTML={{ __html: `
            @property --cp {
              syntax: '<percentage>';
              inherits: false;
              initial-value: 100%;
            }

            .beach {
              width: 100%;
              height: 100%;
              background: linear-gradient(
                to right,
                #004a44 0%,
                #03615b 5.26%,
                #0a6c66 10.53%,
                #027c73 15.79%,
                #028a7f 21.05%,
                #059c8e 26.32%,
                #39a997 31.58%,
                #4aae9f 36.84%,
                #84b7a2 42.11%,
                #b5aa8c 47.37%,
                #dbb89b 52.63%,
                #edc1a8 57.89%,
                #fed0b2 63.16%,
                #fddbc2 68.42%,
                #fedfc7 73.68%,
                #fee6d3 78.95%,
                #fee1d1 94.74%,
                #fcdecd 100%
              );
              position: relative;
              overflow: hidden;
            }

            .beach .wave {
              --_wave-shape-duration: 10s;
              --_wave-shape-delay: 0s;

              --_wave-move-duration: calc(var(--_wave-shape-duration) * .75);
              --_wave-move-delay: 0s;

              --_wave-spray-duration: var(--_wave-move-duration);
              --_wave-spray-delay: var(--_wave-move-delay);

              --_cp-factor: 1.0;
              --_cp: calc(var(--cp) * var(--_cp-factor));

              --_center: 50%;
              --_width: 50%;

              --_shape-line-p-x: 96%;
              --_shape-line-p-y: 0%;
              --_shape-curve-p-x: 87%;
              --_shape-curve-p-y: 40%;
              --_shape-curve-c-x: var(--_cp);
              --_shape-curve-c-y: 22%;
              --_shape-smooth-p-x: 84%;
              --_shape-smooth-p-y: 100%;

              --_shape-clip: shape(
                from 0% 0%,
                line to var(--_shape-line-p-x) var(--_shape-line-p-y),
                curve to var(--_shape-curve-p-x) var(--_shape-curve-p-y) with var(--_shape-curve-c-x) var(--_shape-curve-c-y) from origin,
                smooth to var(--_shape-smooth-p-x) var(--_shape-smooth-p-y),
                line to 0% 100%,
                close
              );

              --_shape-offset: shape(
                from var( --_shape-line-p-x ) var( --_shape-line-p-y ),
                curve to var( --_shape-curve-p-x ) var( --_shape-curve-p-y ) with var( --_shape-curve-c-x ) var( --_shape-curve-c-y ) from origin,
                smooth to var( --_shape-smooth-p-x ) var( --_shape-smooth-p-y )
              );

              --_opacity-min: 0.45;
              --_opacity-max: 1.00;

              --_spray-scale-min: 0.25;
              --_spray-scale-max: 0.90;

              position: absolute;
              left: calc(var(--_center) - var(--_width));
              width: var(--_width);
              height: 100%;

              background: 
                linear-gradient(to right, rgba(0,0,0, 0.00) 70%, rgba(255,255,255, 0.44) 90%),
                linear-gradient(to right, rgba(0,0,0, 0.00) 0%, rgba(0,255,224, 0.15) 100%);

              clip-path: var(--_shape-clip);

              animation: 
                beach-wave-move-animation var(--_wave-move-duration) infinite ease-in-out,
                beach-wave-shape-animation var(--_wave-shape-duration) infinite ease-in-out;

              animation-delay: 
                var(--_wave-move-delay),
                var(--_wave-shape-delay);

              will-change: transform, opacity;
            }

            .beach .wave.wave--1 {
              --_wave-shape-duration: 10s;
              --_wave-shape-delay: 0s;
              --_wave-move-duration: calc(var(--_wave-shape-duration) * .75);
              --_wave-move-delay: 0s;
              --_cp-factor: 1.0;
              --_width: 50%;
              --_shape-line-p-x: 96%;
              --_shape-curve-p-x: 87%;
              --_shape-curve-p-y: 40%;
              --_shape-smooth-p-x: 84%;
              --_shape-smooth-p-y: 100%;
              --_spray-scale-min: 0.25;
              --_spray-scale-max: 0.90;
            }
            .beach .wave.wave--2 {
              --_wave-shape-duration: 11s;
              --_wave-shape-delay: -2s;
              --_wave-move-duration: calc(var(--_wave-shape-duration) * .80);
              --_wave-move-delay: -2s;
              --_cp-factor: 0.9;
              --_width: 40%;
              --_shape-line-p-x: 100%;
              --_shape-curve-p-x: 77%;
              --_shape-curve-p-y: 50%;
              --_shape-smooth-p-x: 70%;
              --_shape-smooth-p-y: 100%;
              --_spray-scale-min: 0.20;
              --_spray-scale-max: 0.95;
            }
            .beach .wave.wave--3 {
              --_wave-shape-duration: 14s;
              --_wave-shape-delay: -4s;
              --_wave-move-duration: calc(var(--_wave-shape-duration) * .88);
              --_wave-move-delay: -4s;
              --_cp-factor: 0.95;
              --_width: 30%;
              --_shape-line-p-x: 80%;
              --_shape-curve-p-x: 92%;
              --_shape-curve-p-y: 55%;
              --_shape-smooth-p-x: 44%;
              --_shape-smooth-p-y: 100%;
              --_spray-scale-min: 0.34;
              --_spray-scale-max: 0.88;
            }
            .beach .wave.wave--4 {
              --_wave-shape-duration: 13s;
              --_wave-shape-delay: -6s;
              --_wave-move-duration: calc(var(--_wave-shape-duration) * .78);
              --_wave-move-delay: -6s;
              --_cp-factor: 0.85;
              --_width: 45%;
              --_shape-line-p-x: 93%;
              --_shape-curve-p-x: 85%;
              --_shape-curve-p-y: 39%;
              --_shape-smooth-p-x: 81%;
              --_shape-smooth-p-y: 100%;
              --_spray-scale-min: 0.55;
              --_spray-scale-max: 0.98;
            }

            .beach .wave i {
              --_offset-distance-min: 0%;
              --_offset-distance-max: 100%;

              display: block;
              position: absolute;
              offset-path: var(--_shape-offset);
              width: 16rem;
              aspect-ratio: 1 / 1;
              transform-origin: center left;
              background: radial-gradient(closest-side, rgba(255,255,255, 0.65) 0%, rgba(255,255,255, 0.00) 100%);
              will-change: transform, opacity;
              animation: beach-wave-spray-animation var(--_wave-spray-duration) infinite ease-in-out;
              animation-delay: var(--_wave-spray-delay);
            }

            @keyframes beach-wave-shape-animation {
              50% {
                --cp: 70%;
              }
            }

            @keyframes beach-wave-move-animation {
              0%, 100% {
                transform: translateX(0%);
                opacity: var(--_opacity-min);
              }
              50% {
                transform: translateX(var(--_center));
                opacity: var(--_opacity-max);
              }
            }

            @keyframes beach-wave-spray-animation {
              0%, 100% {
                opacity: 0.25;
                transform: scale(var(--_spray-scale-min));
              }
              50% {
                opacity: 1.00;
                transform: scale(var(--_spray-scale-max));
              }
            }
          `}} />
          <div className="wave wave--1">
            {Array.from({ length: 10 }).map((_, i) => (
              <i key={i} style={{ animationDelay: `calc(-1s * ${i})` } as React.CSSProperties} />
            ))}
          </div>
          <div className="wave wave--2">
            {Array.from({ length: 10 }).map((_, i) => (
              <i key={i} style={{ animationDelay: `calc(-1s * ${i} - 2s)` } as React.CSSProperties} />
            ))}
          </div>
          <div className="wave wave--3">
            {Array.from({ length: 10 }).map((_, i) => (
              <i key={i} style={{ animationDelay: `calc(-1s * ${i} - 4s)` } as React.CSSProperties} />
            ))}
          </div>
          <div className="wave wave--4">
            {Array.from({ length: 10 }).map((_, i) => (
              <i key={i} style={{ animationDelay: `calc(-1s * ${i} - 6s)` } as React.CSSProperties} />
            ))}
          </div>
        </div>
      )}

      {/* Dynamic Overlay Dimmer to guarantee text readability on any wallpaper/video */}
      <div 
        className="absolute -inset-6 bg-slate-50 dark:bg-slate-950 transition-opacity duration-300 pointer-events-none"
        style={{ opacity: overlayOpacity / 100 }}
      />

      {/* Interactive Ripple and Floating Particles following mouse cursor */}
      <InteractiveCursorRippleCanvas />
    </div>
  );
}
