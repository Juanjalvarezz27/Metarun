'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Ticket, Award, ExternalLink, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // controla la animación de entrada/salida
  const [isMounted, setIsMounted] = useState(false); // controla si el DOM existe
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const navLinks = [
    { href: '/admin/inscritos', label: 'Inscritos', icon: Users, active: pathname === '/admin/inscritos' || pathname === '/admin' },
    { href: '/admin/dorsales', label: 'Dorsales', icon: Ticket, active: pathname === '/admin/dorsales' },
    { href: '#', label: 'Resultados (Pronto)', icon: Award, active: false, disabled: true },
  ];

  const openMenu = () => {
    setIsMounted(true);
    // Pequeño delay para que el DOM exista antes de aplicar la clase visible
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsVisible(true));
    });
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsVisible(false); // dispara animación de salida
    setIsMenuOpen(false);
    // Desmonta del DOM cuando termina la transición
    timeoutRef.current = setTimeout(() => setIsMounted(false), 300);
  };

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  // Limpiar timeout al desmontar el componente
  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  return (
    <>
      <style>{`
        @keyframes menuSlideIn {
          from { opacity: 0; transform: translateY(-12px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes menuSlideOut {
          from { opacity: 1; transform: translateY(0)    scale(1);    }
          to   { opacity: 0; transform: translateY(-12px) scale(0.98); }
        }
        .menu-enter  { animation: menuSlideIn  0.25s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .menu-exit   { animation: menuSlideOut 0.25s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .menu-link-item { opacity: 0; animation: menuSlideIn 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
      `}</style>

      {/* Overlay oscuro detrás del menú */}
      {isMounted && (
        <div
          onClick={closeMenu}
          className="sm:hidden fixed inset-0 z-30 transition-all duration-300"
          style={{
            backgroundColor: isVisible ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0)',
            pointerEvents: isVisible ? 'auto' : 'none',
          }}
        />
      )}

      {/* Navbar */}
      <nav className="bg-[#ea4a22] border-b border-black/10 sticky top-0 z-50 shadow-xl shadow-[#ea4a22]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[4.5rem] sm:h-20">

            {/* Logo */}
            <Link href="/admin" className="flex-shrink-0 flex items-center gap-3 group z-50">
              <div className="w-10 h-10 relative rounded-xl overflow-hidden shadow-md border-2 border-white/20 group-hover:border-white transition-colors bg-white">
                <Image src="/logo.jpg" alt="MetaRun Admin" fill sizes="40px" className="object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl text-white tracking-tight leading-none">MetaAdmin</span>
                <span className="text-[10px] text-white/70 font-bold uppercase tracking-widest mt-0.5">Centro de Mando</span>
              </div>
            </Link>

            {/* Links Desktop */}
            <div className="hidden sm:flex items-center gap-4">
              <div className="flex items-center gap-2">
                {navLinks.map((link, idx) => {
                  const Icon = link.icon;
                  return link.disabled ? (
                    <span key={idx} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white/60 cursor-not-allowed">
                      <Icon size={18} /> {link.label}
                    </span>
                  ) : (
                    <Link key={idx} href={link.href} className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${link.active ? 'bg-white text-[#ea4a22] shadow-sm' : 'text-white hover:bg-white/10'}`}>
                      <Icon size={18} /> {link.label}
                    </Link>
                  );
                })}
              </div>
              <Link href="/" target="_blank" className="inline-flex items-center gap-2 text-xs font-bold text-white/80 hover:text-white uppercase tracking-wider bg-black/15 hover:bg-black/25 px-4 py-2.5 rounded-xl transition-colors ml-4">
                Web Pública <ExternalLink size={14} />
              </Link>
            </div>

            {/* Botón Hamburguesa Mobile */}
            <div className="sm:hidden flex items-center gap-3 z-50">
              <button
                onClick={isMenuOpen ? closeMenu : openMenu}
                className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center text-white hover:bg-black/20 transition-all duration-300 focus:outline-none"
                aria-label="Abrir menú"
              >
                <div style={{ transition: 'transform 0.3s ease, opacity 0.2s ease', transform: isMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                  {isMenuOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Menú Móvil con Animación */}
        {isMounted && (
          <div
            className={`sm:hidden absolute top-[4.5rem] left-0 w-full bg-[#ea4a22] z-40 border-t border-white/10 shadow-2xl ${isVisible ? 'menu-enter' : 'menu-exit'}`}
          >
            <div className="flex flex-col p-6 gap-3">
              {navLinks.map((link, idx) => {
                const Icon = link.icon;
                return link.disabled ? (
                  <div
                    key={idx}
                    className="menu-link-item flex items-center gap-4 px-6 py-4 rounded-2xl bg-black/5 text-white/50 cursor-not-allowed"
                    style={{ animationDelay: `${idx * 40}ms` }}
                  >
                    <Icon size={24} />
                    <span className="text-lg font-bold">{link.label}</span>
                  </div>
                ) : (
                  <Link
                    key={idx}
                    href={link.href}
                    onClick={closeMenu}
                    className={`menu-link-item flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-200 ${link.active ? 'bg-white text-[#ea4a22] shadow-lg' : 'text-white hover:bg-white/10 active:scale-[0.98]'}`}
                    style={{ animationDelay: `${idx * 40}ms` }}
                  >
                    <Icon size={24} strokeWidth={2.5} />
                    <span className="text-lg font-bold">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Footer del Menú */}
            <div className="p-6 pb-10 border-t border-white/10">
              <Link
                href="/"
                target="_blank"
                onClick={closeMenu}
                className="menu-link-item flex items-center justify-center w-full gap-3 px-6 py-4 rounded-2xl bg-black/20 text-white font-bold tracking-wider hover:bg-black/30 active:scale-[0.99] transition-all duration-200"
                style={{ animationDelay: `${navLinks.length * 40}ms` }}
              >
                <ExternalLink size={20} />
                Ir a la Web Pública
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
