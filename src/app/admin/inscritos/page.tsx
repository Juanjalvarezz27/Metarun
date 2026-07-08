import React from 'react';
import prisma from '../../../lib/prisma';
import { InscritosTable } from '../../../components/admin/InscritosTable';
import { Users, User, UserCheck, DollarSign } from 'lucide-react';

export const dynamic = 'force-dynamic'; // Asegura que los datos siempre estén frescos sin caché estática

export default async function InscritosAdminPage() {
  // 1. Obtener todos los inscritos ordenados por los más recientes
  const inscritos = await prisma.inscripcion.findMany({
    orderBy: {
      fechaRegistro: 'desc'
    }
  });

  // 2.  // Métricas
  const total = inscritos.length;
  const ingresosEstimados = total * 3; // $3 por inscripción

  return (
    <div className="space-y-8">
      {/* Cabecera Premium Centrada */}
      <div className="flex flex-col items-center justify-center text-center pb-4 pt-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ea4a22]/10 text-[#ea4a22] text-xs font-black uppercase tracking-widest mb-4">
          Base de Datos
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 mb-3">
          Control de <span className="text-[#ea4a22]">Inscritos</span>
        </h1>
        <p className="text-gray-500 font-medium max-w-xl text-sm md:text-base">
          Supervisa, busca y gestiona en tiempo real a todos los participantes registrados en el sistema MetaRun.
        </p>
      </div>

      {/* Tarjetas de Métricas (KPIs) Rediseñadas */}
      <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* KPI: Total */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-lg transition-shadow relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-orange-50 rounded-full blur-2xl group-hover:bg-orange-100 transition-colors pointer-events-none"></div>
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Registros</p>
              <h3 className="text-4xl font-black text-gray-900 tracking-tighter">{total}</h3>
            </div>
            <div className="w-12 h-12 rounded-[1rem] bg-[#ea4a22]/10 flex items-center justify-center text-[#ea4a22]">
              <Users size={24} strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* KPI: Ingresos */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-lg transition-shadow relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-green-50 rounded-full blur-2xl group-hover:bg-green-100 transition-colors pointer-events-none"></div>
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Ingreso Base</p>
              <h3 className="text-4xl font-black text-gray-900 tracking-tighter text-green-600">${ingresosEstimados}</h3>
            </div>
            <div className="w-12 h-12 rounded-[1rem] bg-green-100 flex items-center justify-center text-green-600">
              <DollarSign size={24} strokeWidth={2.5} />
            </div>
          </div>
        </div>

      </div>

      {/* Renderizado de la tabla de datos (Client Component) */}
      <InscritosTable data={inscritos} />
      
    </div>
  );
}
