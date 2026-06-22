"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const PremiumBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animaciones idle de los orbes
      gsap.to(".blob-1", {
        x: 100,
        y: -50,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".blob-2", {
        x: -80,
        y: 60,
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".blob-3", {
        x: 60,
        y: 40,
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Movimiento parallax reactivo al ratón
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduceMotion) {
        const handleMouseMove = (e: MouseEvent) => {
          const { clientX, clientY } = e;
          const { innerWidth, innerHeight } = window;
          
          const pctX = (clientX - innerWidth / 2) / (innerWidth / 2);
          const pctY = (clientY - innerHeight / 2) / (innerHeight / 2);

          gsap.to(".blob-1-wrap", {
            x: pctX * -75,
            y: pctY * -75,
            duration: 1.6,
            ease: "power2.out",
            overwrite: "auto",
          });

          gsap.to(".blob-2-wrap", {
            x: pctX * 55,
            y: pctY * 55,
            duration: 1.8,
            ease: "power2.out",
            overwrite: "auto",
          });

          gsap.to(".blob-3-wrap", {
            x: pctX * -45,
            y: pctY * 45,
            duration: 1.7,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => {
          window.removeEventListener("mousemove", handleMouseMove);
        };
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(17,17,17,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(17,17,17,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Wrappers para interactividad del ratón con animaciones idle dentro */}
      <div className="blob-1-wrap absolute inset-0 pointer-events-none">
        <div 
          className="blob-1 absolute w-[800px] h-[800px] rounded-full"
          style={{
            top: '-20%',
            left: '-10%',
            background: 'radial-gradient(circle, rgba(17,17,17,0.08) 0%, transparent 72%)',
            filter: 'blur(80px)',
          }}
        />
      </div>
      
      <div className="blob-2-wrap absolute inset-0 pointer-events-none">
        <div 
          className="blob-2 absolute w-[600px] h-[600px] rounded-full"
          style={{
            top: '40%',
            right: '-5%',
            background: 'radial-gradient(circle, rgba(17,17,17,0.065) 0%, transparent 72%)',
            filter: 'blur(80px)',
          }}
        />
      </div>
      
      <div className="blob-3-wrap absolute inset-0 pointer-events-none">
        <div 
          className="blob-3 absolute w-[700px] h-[700px] rounded-full"
          style={{
            bottom: '-10%',
            left: '30%',
            background: 'radial-gradient(circle, rgba(17,17,17,0.05) 0%, transparent 75%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default PremiumBackground;
