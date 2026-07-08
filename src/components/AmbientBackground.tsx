'use client';

import React, { useState, useEffect } from 'react';

interface Light {
  size: number;
  top: number;
  left: number;
  duration: number;
  delay: number;
  tx: number;
  ty: number;
  color: string;
}

export const AmbientBackground = () => {
  const [lights, setLights] = useState<Light[]>([]);

  useEffect(() => {
    // Generamos las luces en el cliente para evitar problemas de hidratación en Next.js
    const isMobile = window.innerWidth < 768;
    
    const generatedLights = Array.from({ length: 30 }).map(() => {
      // En móviles (pantallas angostas), el valor "vw" (viewport width) es muy pequeño en píxeles.
      // Por lo tanto, si es móvil usamos valores vw mucho más altos (40 a 80vw)
      // Si es desktop usamos valores normales (8 a 28vw)
      const baseSize = isMobile ? 40 : 8;
      const rangeSize = isMobile ? 40 : 20;
      const size = Math.random() * rangeSize + baseSize; 
      
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const duration = Math.random() * 20 + 10; // Entre 10s y 30s
      const delay = Math.random() * -30;
      
      // En móviles hacemos que se muevan distancias más largas para compensar la pantalla vertical
      const moveRange = isMobile ? 60 : 30;
      const tx = (Math.random() - 0.5) * moveRange; 
      const ty = (Math.random() - 0.5) * moveRange;
      
      const opacities = [0.15, 0.2, 0.25, 0.3];
      const opacity = opacities[Math.floor(Math.random() * opacities.length)];
      const colors = [
        `rgba(234, 74, 34, ${opacity})`,
        `rgba(255, 150, 80, ${opacity})`,
        `rgba(255, 100, 40, ${opacity})`,
        `rgba(255, 130, 60, ${opacity})`
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];

      return { size, top, left, duration, delay, tx, ty, color };
    });
    setLights(generatedLights);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {lights.map((light, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${light.size}vw`,
            height: `${light.size}vw`,
            top: `${light.top}%`,
            left: `${light.left}%`,
            background: `radial-gradient(circle, ${light.color} 0%, rgba(255,255,255,0) 70%)`,
            animation: `float-particle ${light.duration}s infinite ease-in-out alternate`,
            animationDelay: `${light.delay}s`,
            willChange: 'transform',
            /* Pasamos variables CSS personalizadas a la animación de cada partícula */
            '--tx': `${light.tx}vw`,
            '--ty': `${light.ty}vh`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};
