"use client";

import React, { useEffect, useState, useMemo } from "react";

// 🌟 TIPOS DE ESTRELLAS REALISTAS
type StarType = 'dwarf' | 'giant' | 'supergiant' | 'variable' | 'binary';

interface Star {
  id: number;
  x: number;
  y: number;
  type: StarType;
  brightness: number;
  color: string;
  twinkleSpeed: number;
  size: number;
}

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
  delay: number;
}

// 🌌 CONSTELACIONES SIMPLIFICADAS (posiciones aproximadas)
const CONSTELLATIONS = {
  ursa_major: [ // Osa Mayor
    { x: 20, y: 15 }, { x: 22, y: 18 }, { x: 25, y: 19 },
    { x: 28, y: 17 }, { x: 30, y: 14 }, { x: 27, y: 12 }, { x: 24, y: 13 }
  ],
  orion: [ // Orión (cinturón)
    { x: 70, y: 40 }, { x: 72, y: 42 }, { x: 74, y: 44 }
  ],
  cassiopeia: [ // Casiopea
    { x: 15, y: 25 }, { x: 18, y: 22 }, { x: 21, y: 24 }, { x: 24, y: 21 }, { x: 27, y: 23 }
  ],
  big_dipper: [ // Estrella Polar area
    { x: 85, y: 20 }, { x: 87, y: 18 }, { x: 89, y: 22 }
  ]
};

const BackgroundStars: React.FC = () => {
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

  // 🎯 GENERACIÓN DE ESTRELLAS OPTIMIZADA
  const stars = useMemo(() => {
    const generatedStars: Star[] = [];
    let id = 0;

    // 🌟 Agregar constelaciones primero
    Object.entries(CONSTELLATIONS).forEach(([constellation, positions]) => {
      positions.forEach((pos) => {
        generatedStars.push({
          id: id++,
          x: pos.x,
          y: pos.y,
          type: 'giant',
          brightness: 0.8 + Math.random() * 0.2,
          color: '#E6F3FF', // Azul-blanco para estrellas principales
          twinkleSpeed: 2 + Math.random() * 2,
          size: 2 + Math.random() * 1,
        });
      });
    });

    // ⭐ Agregar estrellas aleatorias (más realistas)
    for (let i = 0; i < 120; i++) {
      const random = Math.random();
      let starType: StarType;
      let color: string;
      let size: number;
      let brightness: number;

      // Distribución realista de tipos de estrellas
      if (random < 0.7) {
        starType = 'dwarf';
        color = '#FFFFFF';
        size = 0.5 + Math.random() * 0.5;
        brightness = 0.3 + Math.random() * 0.4;
      } else if (random < 0.85) {
        starType = 'giant';
        color = '#FFE4B5';
        size = 1 + Math.random() * 1;
        brightness = 0.6 + Math.random() * 0.3;
      } else if (random < 0.93) {
        starType = 'variable';
        color = '#FFB6C1';
        size = 1.5 + Math.random() * 1;
        brightness = 0.4 + Math.random() * 0.5;
      } else if (random < 0.98) {
        starType = 'binary';
        color = '#B0E0E6';
        size = 1.2 + Math.random() * 0.8;
        brightness = 0.5 + Math.random() * 0.4;
      } else {
        starType = 'supergiant';
        color = '#FFB347';
        size = 2 + Math.random() * 1.5;
        brightness = 0.8 + Math.random() * 0.2;
      }

      generatedStars.push({
        id: id++,
        x: Math.random() * 100,
        y: Math.random() * 100,
        type: starType,
        brightness,
        color,
        twinkleSpeed: 1 + Math.random() * 4,
        size,
      });
    }

    return generatedStars;
  }, []);

  // 🌠 SISTEMA DE ESTRELLAS FUGACES
  useEffect(() => {
    const createShootingStar = () => {
      const newStar: ShootingStar = {
        id: Date.now(),
        startX: -5,
        startY: Math.random() * 30 + 10, // Parte superior de la pantalla
        endX: Math.random() * 50 + 70,
        endY: Math.random() * 40 + 50,
        duration: 1.5 + Math.random() * 1.5,
        delay: 0,
      };

      setShootingStars(prev => [...prev, newStar]);

      // Remover después de la animación
      setTimeout(() => {
        setShootingStars(prev => prev.filter(s => s.id !== newStar.id));
      }, (newStar.duration + newStar.delay) * 1000 + 500);
    };

    // Estrella fugaz cada 8-15 segundos
    const interval = setInterval(createShootingStar, 8000 + Math.random() * 7000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* 🌌 FONDO CON GRADIENTE NOCTURNO REALISTA */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        {/* Gradiente de cielo nocturno */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at top, #0B1426 0%, #000000 70%),
              radial-gradient(ellipse at bottom left, #1a0b2e 0%, transparent 50%),
              radial-gradient(ellipse at bottom right, #0f0820 0%, transparent 50%)
            `
          }}
        />

        {/* ⭐ ESTRELLAS PRINCIPALES */}
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute rounded-full ${
              star.type === 'variable' ? 'animate-pulse' : ''
            }`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              opacity: star.brightness,
              boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
              animation: star.type === 'variable' 
                ? `twinkle ${star.twinkleSpeed}s infinite alternate`
                : `gentleTwinkle ${star.twinkleSpeed * 2}s infinite alternate`,
            }}
          />
        ))}

        {/* 🌠 ESTRELLAS FUGACES */}
        {shootingStars.map((shootingStar) => (
          <div
            key={shootingStar.id}
            className="absolute"
            style={{
              left: `${shootingStar.startX}%`,
              top: `${shootingStar.startY}%`,
              width: '2px',
              height: '2px',
              background: 'linear-gradient(45deg, #FFFFFF, transparent)',
              borderRadius: '50%',
              animation: `shootingstar-${shootingStar.id} ${shootingStar.duration}s linear forwards`,
              animationDelay: `${shootingStar.delay}s`,
            }}
          >
            {/* Cola de la estrella fugaz */}
            <div
              className="absolute"
              style={{
                width: '40px',
                height: '1px',
                background: 'linear-gradient(90deg, rgba(255,255,255,0.8), transparent)',
                transform: 'translateX(-40px) rotate(45deg)',
                transformOrigin: 'right center',
              }}
            />
          </div>
        ))}

        {/* 🌟 NEBULOSA SUTIL DE FONDO */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, rgba(138, 43, 226, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 60%, rgba(75, 0, 130, 0.08) 0%, transparent 40%),
              radial-gradient(circle at 60% 80%, rgba(25, 25, 112, 0.06) 0%, transparent 45%)
            `
          }}
        />
      </div>

      {/* 🎭 ESTILOS CSS DINÁMICOS PARA ESTRELLAS FUGACES */}
      <style jsx>{`
        ${shootingStars.map(star => `
          @keyframes shootingstar-${star.id} {
            0% {
              transform: translate(0, 0) scale(0);
              opacity: 1;
            }
            10% {
              transform: translate(0, 0) scale(1);
              opacity: 1;
            }
            90% {
              transform: translate(${star.endX - star.startX}vw, ${star.endY - star.startY}vh) scale(1);
              opacity: 1;
            }
            100% {
              transform: translate(${star.endX - star.startX}vw, ${star.endY - star.startY}vh) scale(0);
              opacity: 0;
            }
          }
        `).join('')}
        
        @keyframes twinkle {
          0% { opacity: 0.3; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes gentleTwinkle {
          0% { opacity: 0.6; }
          100% { opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default BackgroundStars;