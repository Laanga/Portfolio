import React from "react";
import { MotionH2, MotionP } from "../lib/motion";

export const About: React.FC = () => {
  return (
    <section id="sobre-mi" className="py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-pretty">
        <MotionH2
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-2xl sm:text-3xl font-semibold"
        >
          Sobre mí
        </MotionH2>
        <MotionP
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mt-4 text-foreground/80"
        >
          Soy un desarrollador Front‑End con enfoque en la experiencia de usuario, accesibilidad y
          claridad visual. Trabajo con React, Next.js, TypeScript y TailwindCSS, integrando
          componentes accesibles y buenas prácticas para construir interfaces escalables.
        </MotionP>
        <MotionP
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-3 text-foreground/70"
        >
          Me inspiran diseños minimalistas con tipografía fuerte, espacios generosos y micro‑interacciones.
          Cuando no estoy codificando, estudio nuevas tendencias de UI y optimización de rendimiento.
        </MotionP>
      </div>
    </section>
  );
};

export default About;


