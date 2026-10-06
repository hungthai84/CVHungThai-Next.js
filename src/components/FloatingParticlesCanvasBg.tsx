import React, { useEffect, useRef } from "react";

interface FloatingParticlesCanvasBgProps {
  container?: boolean;
  className?: string;
}

export function FloatingParticlesCanvasBg({ container = false, className = "" }: FloatingParticlesCanvasBgProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const palette = [
      "20, 255, 214",  // Neon Mint / Cyan
      "35, 173, 255",  // Sky Blue
      "162, 95, 255",  // Electric Purple
      "255, 63, 167",  // Neon Pink / Magenta
      "255, 186, 53",  // Luminous Gold / Amber
    ];

    const random = (min: number, max: number) => min + Math.random() * (max - min);

    let width = 0;
    let height = 0;
    let particles: {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      phase: number;
      opacity: number;
      color: string;
    }[] = [];
    let frame = 0;
    let previous = 0;
    let elapsed = 0;
    let paused = false;

    function resize() {
      if (!canvas || !ctx) return;
      width = container && canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
      height = container && canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;

      if (width <= 0) width = 300;
      if (height <= 0) height = 180;

      const ratio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);

      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const scale = Math.max(0.65, Math.min(width, height) / 850);

      const count = Math.min(
        75,
        Math.max(container ? 18 : 24, Math.round((width * height) / 24000))
      );

      particles = Array.from({ length: count }, () => {
        const depth = Math.floor(random(0, 3));
        const x = random(0, width);

        const color = Math.max(
          0,
          Math.min(
            palette.length - 1,
            Math.floor((x / width) * 5 + random(-1, 1))
          )
        );

        return {
          x,
          y: random(0, height),
          radius: random(container ? 6 : 12, depth === 0 ? (container ? 35 : 75) : (container ? 24 : 48)) * scale,
          vx: random(-3, 3),
          vy: random(-6, -1.5),
          phase: random(0, Math.PI * 2),
          opacity: random(0.65, 0.95),
          color: palette[color],
        };
      }).sort((a, b) => b.radius - a.radius);

      draw(0);
    }

    function draw(delta: number) {
      if (!ctx) return;
      elapsed += delta;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      for (const particle of particles) {
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;

        if (particle.y < -particle.radius) {
          particle.y = height + particle.radius;
        }

        if (particle.x < -particle.radius) {
          particle.x = width + particle.radius;
        }

        if (particle.x > width + particle.radius) {
          particle.x = -particle.radius;
        }

        const sway = Math.sin(elapsed * 0.12 + particle.phase) * 12;

        ctx.globalAlpha =
          particle.opacity *
          (0.95 + 0.05 * Math.sin(elapsed * 0.3 + particle.phase));

        ctx.beginPath();
        ctx.arc(
          particle.x + sway,
          particle.y,
          particle.radius,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = `rgb(${particle.color})`;
        ctx.fill();

        ctx.strokeStyle = `rgba(${particle.color}, 1)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
    }

    function animate(now: number) {
      const delta = previous ? Math.min((now - previous) / 1000, 0.05) : 0;
      previous = now;

      draw(delta);
      frame = requestAnimationFrame(animate);
    }

    function syncAnimation() {
      cancelAnimationFrame(frame);
      previous = 0;

      if (!document.hidden && !motion.matches && !paused) {
        frame = requestAnimationFrame(animate);
      } else {
        draw(0);
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" && !event.repeat) {
        // Only pause background if user is not typing in an input/textarea
        const tag = (event.target as HTMLElement)?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || (event.target as HTMLElement)?.isContentEditable) {
          return;
        }
        event.preventDefault();
        paused = !paused;
        syncAnimation();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("visibilitychange", syncAnimation);
    motion.addEventListener("change", syncAnimation);

    const observeTarget = (container && canvas.parentElement) ? canvas.parentElement : document.documentElement;
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(observeTarget);

    resize();
    syncAnimation();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("visibilitychange", syncAnimation);
      motion.removeEventListener("change", syncAnimation);
      resizeObserver.disconnect();
    };
  }, [container]);

  return (
    <div 
      className={`${container ? "absolute inset-0 w-full h-full" : "fixed inset-0 w-full h-full"} pointer-events-none z-0 overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(ellipse at 12% 75%, #08222d 0%, transparent 55%), radial-gradient(ellipse at 85% 20%, #24102e 0%, transparent 55%), radial-gradient(ellipse at 60% 90%, #131332 0%, transparent 60%), #040812`
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`${container ? "absolute inset-0 w-full h-full" : "fixed inset-0 w-full h-full"} pointer-events-none z-0`}
      />
    </div>
  );
}

export default FloatingParticlesCanvasBg;
