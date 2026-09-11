import React, { useEffect, useRef } from "react";

interface Metaball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  r: number; // Color Red (0-1)
  g: number; // Color Green (0-1)
  b: number; // Color Blue (0-1)
}

export default function MetaballsBg() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    // Enable blending for transparency
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);

    // Vertex Shader Source
    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment Shader Source
    const fsSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      
      #define NUM_METABALLS 8
      uniform vec3 u_metaballs[NUM_METABALLS]; // x, y, radius
      uniform vec3 u_colors[NUM_METABALLS];    // r, g, b
      
      void main() {
        vec2 st = gl_FragCoord.xy;
        float sum = 0.0;
        vec3 mixedColor = vec3(0.0);
        
        for (int i = 0; i < NUM_METABALLS; i++) {
          vec2 pos = u_metaballs[i].xy;
          float r = u_metaballs[i].z;
          float distSq = dot(st - pos, st - pos);
          if (distSq > 0.0) {
            float val = (r * r) / distSq;
            sum += val;
            mixedColor += u_colors[i] * val;
          }
        }
        
        if (sum >= 0.99) {
          vec3 finalColor = mixedColor / max(sum, 0.001);
          // Soft anti-aliasing near the threshold
          float alpha = smoothstep(0.99, 1.01, sum);
          gl_FragColor = vec4(finalColor, alpha);
        } else {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      }
    `;

    // Helper to create and compile shaders
    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    // Create and link program
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Screen-space Quad geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform Locations
    const resolutionLoc = gl.getUniformLocation(program, "u_resolution");
    const metaballsLoc = gl.getUniformLocation(program, "u_metaballs");
    const colorsLoc = gl.getUniformLocation(program, "u_colors");

    // Initialize 8 Metaballs with beautiful neon color combinations
    const metaballs: Metaball[] = [
      { x: 100, y: 100, vx: 2.2, vy: 1.8, radius: 140, r: 0.55, g: 0.15, b: 0.95 }, // Indigo/Purple
      { x: 300, y: 200, vx: -1.7, vy: 2.3, radius: 110, r: 0.1, g: 0.75, b: 0.95 },  // Cyan/Sky Blue
      { x: 500, y: 400, vx: 2.0, vy: -1.4, radius: 150, r: 0.95, g: 0.2, b: 0.55 },  // Hot Pink
      { x: 200, y: 500, vx: -2.1, vy: -1.6, radius: 120, r: 0.15, g: 0.85, b: 0.55 }, // Mint/Emerald
      { x: 400, y: 300, vx: 1.5, vy: -2.0, radius: 130, r: 0.95, g: 0.6, b: 0.1 },   // Neon Amber
      { x: 600, y: 150, vx: -1.9, vy: 1.5, radius: 95, r: 0.45, g: 0.25, b: 0.95 },  // Soft Purple
      { x: 700, y: 600, vx: 1.6, vy: 1.9, radius: 160, r: 0.1, g: 0.45, b: 0.95 },   // Deep Royal Blue
      { x: 150, y: 350, vx: -1.4, vy: 2.1, radius: 105, r: 0.95, g: 0.15, b: 0.35 }   // Coral Red
    ];

    let animationFrameId: number;
    let isTabVisible = true;

    const resizeCanvas = () => {
      // Use efficient 0.75 DPR scale for blurry background orbs to dramatically reduce GPU fillrate
      const dpr = Math.min(window.devicePixelRatio || 1, 1) * 0.75;
      const width = Math.max(320, Math.floor(window.innerWidth * dpr));
      const height = Math.max(240, Math.floor(window.innerHeight * dpr));

      canvas.width = width;
      canvas.height = height;
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";

      gl.viewport(0, 0, width, height);
      gl.useProgram(program);
      gl.uniform2f(resolutionLoc, width, height);

      // Scale positions to fit screen bounds on first resize or adapt dynamically
      metaballs.forEach((ball) => {
        if (ball.x > width) ball.x = Math.random() * width;
        if (ball.y > height) ball.y = Math.random() * height;
      });
    };

    const handleVisibilityChange = () => {
      isTabVisible = document.visibilityState === "visible";
      if (isTabVisible && !animationFrameId) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    window.addEventListener("resize", resizeCanvas, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    resizeCanvas();

    // Render loop
    const render = () => {
      if (!isTabVisible) {
        animationFrameId = 0;
        return;
      }

      const width = canvas.width;
      const height = canvas.height;

      // Update positions of metaballs and bound off container edges
      metaballs.forEach((ball) => {
        ball.x += ball.vx;
        ball.y += ball.vy;

        const pad = ball.radius * 0.1;

        if (ball.x < -pad) {
          ball.x = -pad;
          ball.vx = Math.abs(ball.vx);
        } else if (ball.x > width + pad) {
          ball.x = width + pad;
          ball.vx = -Math.abs(ball.vx);
        }

        if (ball.y < -pad) {
          ball.y = -pad;
          ball.vy = Math.abs(ball.vy);
        } else if (ball.y > height + pad) {
          ball.y = height + pad;
          ball.vy = -Math.abs(ball.vy);
        }
      });

      gl.clear(gl.COLOR_BUFFER_BIT);

      // Prepare uniforms arrays
      const metaballsArray = new Float32Array(8 * 3);
      const colorsArray = new Float32Array(8 * 3);

      for (let i = 0; i < 8; i++) {
        const idx = i * 3;
        metaballsArray[idx] = metaballs[i].x;
        metaballsArray[idx + 1] = metaballs[i].y;
        metaballsArray[idx + 2] = metaballs[i].radius;

        colorsArray[idx] = metaballs[i].r;
        colorsArray[idx + 1] = metaballs[i].g;
        colorsArray[idx + 2] = metaballs[i].b;
      }

      gl.useProgram(program);
      gl.uniform3fv(metaballsLoc, metaballsArray);
      gl.uniform3fv(colorsLoc, colorsArray);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Cleanup logic
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);

      // Release resources
      try {
        gl.deleteBuffer(positionBuffer);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteProgram(program);
      } catch (err) {
        console.error("Error releasing WebGL resources:", err);
      }
    };
  }, []);

  return (
    <div id="metaballs-background" className="pointer-events-none" aria-hidden="true" style={{
      position: "fixed",
      inset: 0,
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      pointerEvents: "none",
      zIndex: 0
    }}>
      <canvas id="metaballs-bg" ref={canvasRef} style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        display: "block",
        margin: 0,
        padding: 0,
        border: 0,
        outline: 0,
        pointerEvents: "none",
        zIndex: -10
      }} />
    </div>
  );
}
