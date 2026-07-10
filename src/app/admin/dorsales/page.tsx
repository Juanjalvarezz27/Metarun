import React from 'react';
import prisma from '@/lib/prisma';
import { DorsalesTable } from '@/components/admin/DorsalesTable';
import { Ticket, Users } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DorsalesAdminPage() {
  // Obtener inscritos ordenados alfabéticamente por nombre
  const inscritos = await prisma.inscripcion.findMany({
    select: {
      id: true,
      nombreCompleto: true,
      cedula: true,
      fechaNacimiento: true,
      dorsal: true
    },
    orderBy: {
      nombreCompleto: 'asc'
    }
  });

  const total = inscritos.length;
  const asignados = inscritos.filter(i => i.dorsal !== null).length;

  return (
    <div className="space-y-8">
      {/* Cabecera Premium Centrada */}
      <div className="flex flex-col items-center justify-center text-center pb-4 pt-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ea4a22]/10 text-[#ea4a22] text-xs font-black uppercase tracking-widest mb-4">
          Logística de Carrera
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 mb-3">
          Asignación de <span className="text-[#ea4a22]">Dorsales</span>
        </h1>
        <p className="text-gray-500 font-medium max-w-xl text-sm md:text-base">
          Busca a los corredores y asígnales su número de dorsal de forma rápida y segura.
        </p>
      </div>

      {/* Tarjetas de Métricas (KPIs) */}
      <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* KPI: Total Registros */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-lg transition-shadow relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-orange-50 rounded-full blur-2xl group-hover:bg-orange-100 transition-colors pointer-events-none"></div>
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Corredores</p>
              <h3 className="text-4xl font-black text-gray-900 tracking-tighter">{total}</h3>
            </div>
            <div className="w-12 h-12 rounded-[1rem] bg-gray-50 flex items-center justify-center text-gray-400">
              <Users size={24} strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* KPI: Dorsales Asignados */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-lg transition-shadow relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-orange-50 rounded-full blur-2xl group-hover:bg-[#ea4a22]/10 transition-colors pointer-events-none"></div>
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Dorsales Entregados</p>
              <h3 className="text-4xl font-black text-gray-900 tracking-tighter text-[#ea4a22]">{asignados}</h3>
            </div>
            <div className="w-12 h-12 rounded-[1rem] bg-[#ea4a22]/10 flex items-center justify-center text-[#ea4a22]">
              <Ticket size={24} strokeWidth={2.5} />
            </div>
          </div>
        </div>

      </div>

      {/* Renderizado de la tabla de dorsales */}
      <DorsalesTable initialData={inscritos} />
      
    </div>
  );
}
