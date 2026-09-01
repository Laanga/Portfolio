"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ScrollProgress: React.FC = () => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!progressRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[100] bg-transparent">
      <div
        ref={progressRef}
        className="h-full origin-left"
        style={{ transform: "scaleX(0)", background: "var(--blue)" }}
      />
    </div>
  );
};

export default ScrollProgress;
