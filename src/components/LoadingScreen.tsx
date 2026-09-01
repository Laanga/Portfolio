"use client";

import { memo, useEffect, useRef } from "react";
import gsap from "gsap";

interface LoadingScreenProps {
  onReveal: () => void;
  onComplete: () => void;
}

function LoadingScreen({ onReveal, onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onReveal();
      onComplete();
      document.body.style.overflow = previousOverflow;
      return;
    }

    gsap.set(containerRef.current, { yPercent: 0 });
    gsap.set(numberRef.current, { y: 0, opacity: 1 });
    gsap.set(progressRef.current, { scaleX: 0 });

    const duration = 2150;
    const startedAt = performance.now();
    let intervalId = 0;
    let exitFallback = 0;
    let exitTimeline: gsap.core.Timeline | null = null;
    let hasRevealed = false;
    let hasCompleted = false;

    const renderProgress = (progress: number) => {
      const value = Math.round(progress * 100);
      if (numberRef.current) numberRef.current.textContent = String(value).padStart(3, "0");
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      containerRef.current?.setAttribute("aria-valuenow", String(value));
    };

    const completeOnce = () => {
      if (hasCompleted) return;
      hasCompleted = true;
      window.clearTimeout(exitFallback);
      onComplete();
    };

    const revealAndExit = () => {
      if (hasRevealed) return;
      hasRevealed = true;
      window.clearInterval(intervalId);
      renderProgress(1);
      onReveal();

      exitTimeline = gsap.timeline({ onComplete: completeOnce })
        .to(numberRef.current, { y: -36, opacity: 0, duration: 0.32, ease: "power3.in" }, "+=.06")
        .to(containerRef.current, { yPercent: -100, duration: 0.95, ease: "expo.inOut" }, "-=.08");

      exitFallback = window.setTimeout(completeOnce, 1500);
    };

    const tick = () => {
      const linear = Math.min(1, (performance.now() - startedAt) / duration);
      const eased = linear * linear * (3 - 2 * linear);
      renderProgress(eased);
      if (linear >= 1) revealAndExit();
    };

    tick();
    intervalId = window.setInterval(tick, 32);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(exitFallback);
      exitTimeline?.kill();
      document.body.style.overflow = previousOverflow;
    };
  }, [onComplete, onReveal]);

  return (
    <div
      ref={containerRef}
      className="loading-screen"
      role="progressbar"
      aria-label="Cargando portfolio"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
    >
      <div className="loading-top mono">
        <span>ÁLVARO LANGA</span>
        <span>PORTFOLIO / 2026</span>
      </div>
      <div className="loading-counter" aria-hidden="true">
        <span ref={numberRef}>000</span>
        <small>%</small>
      </div>
      <div className="loading-progress" aria-hidden="true">
        <div ref={progressRef} className="loading-progress-fill" />
      </div>
    </div>
  );
}

export default memo(LoadingScreen);
