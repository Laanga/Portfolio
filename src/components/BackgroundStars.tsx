"use client";

import React from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  alphaSpeed: number;
  vx: number;
  vy: number;
};

const createStar = (width: number, height: number, speedScale: number): Star => {
  const radius = Math.random() * 1.2 + 0.2; // 0.2 - 1.4 px
  const alpha = Math.random() * 0.35 + 0.15; // 0.15 - 0.5
  const alphaSpeed = (Math.random() * 0.6 + 0.2) * 0.005; // twinkle speed
  const direction = Math.random() * Math.PI * 2;
  const baseSpeed = (Math.random() * 0.3 + 0.1) * speedScale; // slow drift
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius,
    alpha,
    alphaSpeed,
    vx: Math.cos(direction) * baseSpeed,
    vy: Math.sin(direction) * baseSpeed,
  };
};

const resizeCanvas = (canvas: HTMLCanvasElement) => {
  const dpr = window.devicePixelRatio || 1;
  const { innerWidth, innerHeight } = window;
  canvas.width = Math.floor(innerWidth * dpr);
  canvas.height = Math.floor(innerHeight * dpr);
  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;
  const context = canvas.getContext("2d");
  if (context) context.setTransform(dpr, 0, 0, dpr, 0, 0);
};

const computeStarCount = (width: number, height: number): number => {
  const area = width * height;
  // ~1 star per 6000-9000 px^2, scale softly with area
  return Math.max(60, Math.floor(area / 8000));
};

export const BackgroundStars: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const starsRef = React.useRef<Star[]>([]);
  const animationRef = React.useRef<number | null>(null);
  const parallaxRef = React.useRef<{ px: number; py: number }>({ px: 0, py: 0 });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvas(canvas);
    const { innerWidth, innerHeight } = window;
    const starCount = computeStarCount(innerWidth, innerHeight);
    const speedScale = Math.min(1.2, Math.max(0.8, innerWidth / 1440));
    starsRef.current = Array.from({ length: starCount }, () => createStar(innerWidth, innerHeight, speedScale));

    const context = canvas.getContext("2d");
    if (!context) return;

    const renderFrame = () => {
      context.fillStyle = "#000000";
      context.fillRect(0, 0, canvas.width, canvas.height);

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      const { px, py } = parallaxRef.current;

      for (const star of starsRef.current) {
        // Update position
        star.x += star.vx;
        star.y += star.vy;
        // Wrap around edges
        if (star.x < -2) star.x = width + 2;
        if (star.x > width + 2) star.x = -2;
        if (star.y < -2) star.y = height + 2;
        if (star.y > height + 2) star.y = -2;

        // Twinkle
        star.alpha += star.alphaSpeed * (Math.random() > 0.5 ? 1 : -1);
        if (star.alpha < 0.1) star.alpha = 0.1;
        if (star.alpha > 0.6) star.alpha = 0.6;

        // Draw
        context.beginPath();
        context.globalAlpha = star.alpha;
        context.fillStyle = "#FFFFFF";
        const offsetX = px * star.radius * 0.6;
        const offsetY = py * star.radius * 0.6;
        context.arc(star.x + offsetX, star.y + offsetY, star.radius, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(renderFrame);
    };

    animationRef.current = requestAnimationFrame(renderFrame);

    const handleResize = () => {
      resizeCanvas(canvas);
      const { innerWidth, innerHeight } = window;
      const starCount = computeStarCount(innerWidth, innerHeight);
      const speedScale = Math.min(1.2, Math.max(0.8, innerWidth / 1440));
      starsRef.current = Array.from({ length: starCount }, () => createStar(innerWidth, innerHeight, speedScale));
    };

    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const nx = (event.clientX / innerWidth) * 2 - 1; // -1..1
      const ny = (event.clientY / innerHeight) * 2 - 1;
      parallaxRef.current = { px: nx * 2, py: ny * 2 };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      <canvas ref={canvasRef} className="h-full w-full block" />
    </div>
  );
};

export default BackgroundStars;


