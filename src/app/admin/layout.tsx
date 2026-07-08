import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Ticket, Award, LayoutDashboard, ExternalLink } from 'lucide-react';
import { AdminNavbar } from '../../components/admin/AdminNavbar';
import { AmbientBackground } from '../../components/AmbientBackground';
import { Footer } from '../../components/Footer';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-animated-mesh-v3 bg-[#fbecdc] text-gray-900 font-poppins selection:bg-[#ea4a22] selection:text-white flex flex-col relative">
      
      {/* Fondos Atenuados para Legibilidad Administrativa */}
      <div className="absolute inset-0 z-0 opacity-50">
        <AmbientBackground />
      </div>
      <div className="pattern-mesh-v3 opacity-40"></div>
      
      {/* Capa extra cálida para recuperar el tono naranja corporativo y mantener el contraste */}
      <div className="absolute inset-0 z-0 bg-[#fbecdc]/60 pointer-events-none"></div>

      <AdminNavbar />

      {/* Contenido Principal de la Ruta */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 relative z-20">
        {children}
      </main>

      {/* Footer del Desarrollador */}
      <Footer />
    </div>
  );
}
