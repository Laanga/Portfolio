"use client";

import React from "react";

const BackgroundStars: React.FC = () => {
  const [stars, setStars] = React.useState<Array<{
    id: number;
    left: number;
    top: number;
    size: number;
    delay: number;
    opacity: number;
    orbitDuration: number;
    driftDuration: number;
    floatDuration: number;
  }>>([]);

  React.useEffect(() => {
    // Generar estrellas con movimiento fluido
    const generatedStars = Array.from({ length: 100 }, (_, i) => {
      const size = Math.random();
      return {
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: size < 0.6 ? 1 : size < 0.85 ? 2 : 3,
        delay: Math.random() * 10,
        opacity: 0.3 + Math.random() * 0.6,
        orbitDuration: 12 + Math.random() * 8, // Movimiento orbital (12-20s)
        driftDuration: 20 + Math.random() * 15, // Deriva horizontal (20-35s)
        floatDuration: 8 + Math.random() * 6, // Flotación vertical (8-14s)
      };
    });
    setStars(generatedStars);
  }, []);

  return (
    <>
      {/* Fondo completamente negro */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] overflow-hidden bg-black">
        {/* Estrellas con movimiento fluido continuo */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="star-moving absolute rounded-full bg-white"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              // Delays escalonados para cada tipo de movimiento
              animationDelay: `${star.delay}s, ${star.delay * 0.7}s, ${star.delay * 1.3}s`,
              // Duraciones diferentes para crear patrones únicos
              animationDuration: `${star.orbitDuration}s, ${star.driftDuration}s, ${star.floatDuration}s`,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default BackgroundStars;