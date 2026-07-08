'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Calendar, MapPin, Flame } from 'lucide-react';

export const Header = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateParallax = () => {
      const scrollY = window.scrollY;
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
      }
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${scrollY * -0.15}px)`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Inicializar posición sin causar un re-render de React
    updateParallax();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="relative w-full overflow-hidden shadow-md bg-[#ea4a22]">
      
      {/* Contenedor Naranja Físico - Parallax (Se mueve más lento que el scroll) */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-gradient-to-br from-[#ea4a22] via-[#ff552b] to-[#ff7b5c] z-0"
      >
        {/* Patrón de puntos */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
      </div>

      <div 
        ref={contentRef}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-24 flex flex-col items-center justify-center text-center"
      >
        
        {/* Logo Container con animación de flotación y entrada */}
        <div className="animate-slide-up-1 animate-float-logo">
          <div className="w-24 h-24 md:w-28 md:h-28 relative mb-5 rounded-full overflow-hidden shadow-[0_0_0_6px_rgba(255,255,255,0.2)] bg-white flex items-center justify-center">
            <Image 
              src="/logo.jpg" 
              alt="Meta Run Logo" 
              fill
              sizes="(max-width: 768px) 96px, 112px"
              className="object-cover"
              priority
            />
          </div>
        </div>
        
        {/* Title con animación escalonada */}
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white drop-shadow-md mb-2 uppercase animate-slide-up-2">
          META RUN <span className="text-[#ffe0d6] font-light">2026</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-white/90 text-[15px] md:text-lg font-medium max-w-lg mx-auto mb-8 drop-shadow-sm animate-slide-up-3">
          La experiencia deportiva más esperada del estado. ¡Únete al reto y cruza la meta con nosotros!
        </p>

        {/* Visual Elements (Badges Glassmorphism) */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5 animate-slide-up-3" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 text-white shadow-sm hover:bg-white/20 transition-all hover:scale-105 cursor-default">
            <Calendar size={18} className="text-[#ffe0d6]" />
            <span className="text-[13px] font-bold tracking-wide uppercase">Pronto</span>
          </div>
          <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 text-white shadow-sm hover:bg-white/20 transition-all hover:scale-105 cursor-default">
            <MapPin size={18} className="text-[#ffe0d6]" />
            <span className="text-[13px] font-bold tracking-wide uppercase">Trujillo, Trujillo</span>
          </div>
          <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 text-white shadow-sm hover:bg-white/20 transition-all hover:scale-105 cursor-default">
            <Flame size={18} className="text-[#ffe0d6]" />
            <span className="text-[13px] font-bold tracking-wide uppercase">Carrera y Caminata</span>
          </div>
        </div>
      </div>

      {/* Ola Animada en la base del contenedor (Liquid Wave Divider) */}
      <div className="absolute bottom-0 left-0 w-full h-[85px] md:h-[100px] overflow-hidden leading-[0] z-20">
        
        {/* Ola Trasera (Naranja Claro) - Más lenta, empieza hacia abajo */}
        <svg 
          className="absolute bottom-0 left-0 block w-[200%] h-full" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          style={{ animation: 'wave-move 15s linear infinite' }}
        >
          <path 
            d="M0,60 Q150,90 300,60 T600,60 T900,60 T1200,60 V120 H0 Z" 
            fill="#ff7b5c"
            className="opacity-80"
          ></path>
        </svg>

        {/* Ola Frontal (Naranja Fuerte) - Más rápida, empieza hacia arriba */}
        <svg 
          className="absolute bottom-0 left-0 block w-[200%] h-full" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          style={{ animation: 'wave-move 10s linear infinite' }}
        >
          <path 
            d="M0,60 Q150,30 300,60 T600,60 T900,60 T1200,60 V120 H0 Z" 
            fill="#e23f18"
          ></path>
        </svg>

      </div>

    </header>
  );
};
