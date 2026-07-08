import React from 'react';
import Image from 'next/image';

export const Footer = () => {
  return (
    <footer className="w-full relative z-20 py-4 mt-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <div className="w-16 h-16 relative rounded-[1.25rem] overflow-hidden shadow-xl shadow-gray-200 border-4 border-white flex-shrink-0">
              <Image 
                src="/me.png" 
                alt="Juan Alvarez" 
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold tracking-wider uppercase mb-0.5">Diseñado y Desarrollado por</p>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">Juan Alvarez</h3>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a 
              href="https://www.instagram.com/juanjalvarezz/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gray-50 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-orange-500 border border-gray-200 hover:border-transparent transition-all duration-300 hover:scale-[1.03] hover:shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 group-hover:text-white transition-colors">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
              <span className="text-sm font-bold text-gray-700 group-hover:text-white transition-colors">Sígueme</span>
            </a>
            
            <a 
              href="https://wa.me/584129164371?text=Hola%20Juan,%20estoy%20viendo%20tu%20proyecto%20de%20MetaRun!" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-green-50/50 hover:bg-[#25D366] border border-green-200 hover:border-transparent transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-green-500/30"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 group-hover:text-white transition-colors">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span className="text-sm font-bold text-green-700 group-hover:text-white transition-colors">Contáctame</span>
            </a>
          </div>
          
        </div>
      </div>
    </footer>
  );
};
