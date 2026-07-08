import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Ticket, Award, ArrowRight } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="w-full py-8 md:py-16">
      <div className="w-full max-w-4xl mx-auto space-y-12">
        
        {/* Cabecera / Bienvenida */}
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto relative rounded-[1.25rem] overflow-hidden shadow-xl shadow-[#ea4a22]/20 border-4 border-white mb-6">
            <Image 
              src="/logo.jpg" 
              alt="Meta Run Logo" 
              fill
              sizes="96px"
              className="object-cover"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900">
            Centro de Gestión <span className="text-[#ea4a22]">Meta Run</span>
          </h1>
          <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto">
            Bienvenido al panel de control interno. Selecciona el módulo al que deseas acceder para gestionar la carrera.
          </p>
        </div>

        {/* Tarjetas de Acceso a las 3 Rutas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Tarjeta 1: Inscritos (Activa) */}
          <Link href="/admin/inscritos" className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(234,74,34,0.1)] hover:border-[#ea4a22]/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-orange-50 text-[#ea4a22] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#ea4a22] group-hover:text-white transition-all duration-300">
              <Users size={32} strokeWidth={2.5} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Inscritos</h3>
            <p className="text-sm text-gray-500 font-medium mb-6">Ver la lista completa, filtrar por modalidad, verificar pagos y métricas.</p>
            <div className="mt-auto flex items-center gap-2 text-[#ea4a22] font-semibold text-sm uppercase tracking-wider group-hover:gap-3 transition-all">
              Acceder <ArrowRight size={16} />
            </div>
          </Link>

          {/* Tarjeta 2: Dorsales (Pendiente) */}
          <div className="relative bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] opacity-70 grayscale-[50%] flex flex-col items-center text-center cursor-not-allowed">
            <div className="absolute top-4 right-4 bg-gray-100 text-gray-500 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">
              Pronto
            </div>
            <div className="w-16 h-16 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center mb-6">
              <Ticket size={32} strokeWidth={2.5} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Entrega de Dorsales</h3>
            <p className="text-sm text-gray-500 font-medium">Asignar números de participación y marcar a los competidores que ya retiraron su kit.</p>
          </div>

          {/* Tarjeta 3: Resultados (Pendiente) */}
          <div className="relative bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] opacity-70 grayscale-[50%] flex flex-col items-center text-center cursor-not-allowed">
            <div className="absolute top-4 right-4 bg-gray-100 text-gray-500 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">
              Pronto
            </div>
            <div className="w-16 h-16 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center mb-6">
              <Award size={32} strokeWidth={2.5} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Resultados Finales</h3>
            <p className="text-sm text-gray-500 font-medium">Ingresar los tiempos oficiales, podios y generar las clasificaciones al terminar el evento.</p>
          </div>

        </div>
      </div>
    </div>
  );
}
