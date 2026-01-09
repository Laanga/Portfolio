"use client";

import { createContext, useEffect, useState, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar el plugin de GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Context para acceder a Lenis desde cualquier componente
export const LenisContext = createContext<any>(null);

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const [lenis, setLenis] = useState<any>(null);

  useEffect(() => {
    // Intentar cargar Lenis dinámicamente
    const initLenis = async () => {
      try {
        const Lenis = (await import("lenis")).default;
        
        const lenisInstance = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          touchMultiplier: 2,
        });

        setLenis(lenisInstance);

        // Integración con GSAP ScrollTrigger
        lenisInstance.on("scroll", ScrollTrigger.update);

        // Añadir Lenis al ticker de GSAP
        const rafCallback = (time: number) => {
          lenisInstance.raf(time * 1000);
        };
        gsap.ticker.add(rafCallback);
        gsap.ticker.lagSmoothing(0);

        // Cleanup en el return del useEffect no funciona aquí,
        // así que guardamos referencia para limpiar
        return () => {
          lenisInstance.destroy();
          gsap.ticker.remove(rafCallback);
        };
      } catch (error) {
        // Lenis no está instalado, continuar sin smooth scroll
        console.log("Lenis not installed, using native scroll");
        return undefined;
      }
    };

    let cleanup: (() => void) | undefined;
    
    initLenis().then((cleanupFn) => {
      cleanup = cleanupFn;
    });

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
};

export default SmoothScroll;
