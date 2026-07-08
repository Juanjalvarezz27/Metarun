'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Ticket, Award, ExternalLink, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // Para resaltar la ruta actual

  const navLinks = [
    { href: '/admin/inscritos', label: 'Inscritos', icon: Users, active: pathname === '/admin/inscritos' || pathname === '/admin' },
    { href: '#', label: 'Dorsales (Pronto)', icon: Ticket, active: false, disabled: true },
    { href: '#', label: 'Resultados (Pronto)', icon: Award, active: false, disabled: true },
  ];

  return (
    <>
      {/* Navbar Administrativo Premium (Naranja) */}
      <nav className="bg-[#ea4a22] border-b border-black/10 sticky top-0 z-50 shadow-xl shadow-[#ea4a22]/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[4.5rem] sm:h-20">
            {/* IZQUIERDA: LOGO Y TÍTULO */}
            <Link href="/admin" className="flex-shrink-0 flex items-center gap-3 group z-50">
              <div className="w-10 h-10 relative rounded-xl overflow-hidden shadow-md border-2 border-white/20 group-hover:border-white transition-colors bg-white">
                <Image src="/logo.jpg" alt="MetaRun Admin" fill sizes="40px" className="object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl text-white tracking-tight leading-none">MetaAdmin</span>
                <span className="text-[10px] text-white/70 font-bold uppercase tracking-widest mt-0.5">Centro de Mando</span>
              </div>
            </Link>

            {/* DERECHA: ENLACES DESKTOP */}
            <div className="hidden sm:flex items-center gap-4">
              <div className="flex items-center gap-2">
                {navLinks.map((link, idx) => {
                  const Icon = link.icon;
                  return link.disabled ? (
                    <span key={idx} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white/60 cursor-not-allowed">
                      <Icon size={18} /> {link.label}
                    </span>
                  ) : (
                    <Link key={idx} href={link.href} className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${link.active ? 'bg-white text-[#ea4a22] shadow-sm' : 'text-white hover:bg-white/10'}`}>
                      <Icon size={18} /> {link.label}
                    </Link>
                  );
                })}
              </div>

              {/* Botón Volver Web Pública */}
              <Link href="/" target="_blank" className="inline-flex items-center gap-2 text-xs font-bold text-white/80 hover:text-white uppercase tracking-wider bg-black/15 hover:bg-black/25 px-4 py-2.5 rounded-xl transition-colors ml-4">
                Web Pública <ExternalLink size={14} />
              </Link>
            </div>

            {/* BOTÓN HAMBURGUESA MOBILE */}
            <div className="sm:hidden flex items-center gap-3 z-50">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center text-white hover:bg-black/20 transition-colors focus:outline-none"
              >
                {isMenuOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
              </button>
            </div>
          </div>
        </div>

        {/* MENÚ DESPLEGABLE MÓVIL (Toda la pantalla) */}
        {isMenuOpen && (
          <div className="sm:hidden absolute top-[4.5rem] left-0 w-full h-[calc(100vh-4.5rem)] bg-[#ea4a22] z-40 border-t border-white/10 shadow-2xl flex flex-col">
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link, idx) => {
                const Icon = link.icon;
                return link.disabled ? (
                  <div key={idx} className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-black/5 text-white/50 opacity-70 cursor-not-allowed">
                    <Icon size={24} />
                    <span className="text-lg font-bold">{link.label}</span>
                  </div>
                ) : (
                  <Link 
                    key={idx} 
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-colors ${link.active ? 'bg-white text-[#ea4a22] shadow-lg' : 'text-white hover:bg-white/10'}`}
                  >
                    <Icon size={24} strokeWidth={2.5} />
                    <span className="text-lg font-bold">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Acciones extra menú móvil */}
            <div className="mt-auto p-6 pb-12 border-t border-white/10">
              <Link 
                href="/" 
                target="_blank"
                className="flex items-center justify-center w-full gap-3 px-6 py-4 rounded-2xl bg-black/20 text-white font-bold tracking-wider hover:bg-black/30 transition-colors"
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
