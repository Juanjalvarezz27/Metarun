'use client';
import React, { useState, useMemo } from 'react';
import { Search, ExternalLink, Filter, MapPin, Map, Navigation, CreditCard, ChevronRight } from 'lucide-react';

interface Inscrito {
  id: string;
  nombreCompleto: string;
  cedula: string;
  correo: string;
  genero: string;
  telefono: string;
  modalidad: string;
  bancoEmisor: string;
  referenciaPago: string;
  captureUrl: string;
  fechaRegistro: Date;
}

export const InscritosTable = ({ data }: { data: Inscrito[] }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrado de datos en tiempo real
  const filteredData = useMemo(() => {
    return data.filter(inscrito => {
      return inscrito.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase()) || 
             inscrito.cedula.includes(searchTerm);
    });
  }, [data, searchTerm]);

  const toTitleCase = (str: string) => {
    if (!str) return '';
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden mt-8">
      
      {/* Buscador de Datos */}
      <div className="p-4 sm:p-5 border-b border-gray-100 bg-white flex justify-start">
        <div className="relative w-full max-w-md group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400 group-focus-within:text-[#ea4a22] transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-2.5 border-2 border-gray-100 rounded-xl leading-5 bg-gray-50/50 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#ea4a22] focus:bg-white text-sm font-semibold shadow-inner transition-all"
            placeholder="Buscar por nombre o cédula..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* --- VISTA MÓVIL: LISTA NATIVA (Oculto en Desktop) --- */}
      <div className="block md:hidden bg-gray-50/50 p-4">
        <div className="flex flex-col gap-4">
          {filteredData.length > 0 ? (
            filteredData.map((inscrito, idx) => (
              <div 
                key={inscrito.id} 
                className={`p-5 flex flex-col gap-4 rounded-2xl border transition-colors ${
                  idx % 2 === 0 
                    ? 'bg-white border-gray-100 shadow-[0_2px_12px_rgb(0,0,0,0.03)]' 
                    : 'bg-[#ea4a22]/[0.04] border-[#ea4a22]/10 shadow-none'
                }`}
              >
                
                {/* Cabecera de Tarjeta */}
                <div className="flex flex-col">
                  <span className="text-[17px] font-black text-gray-900 leading-tight">
                    {toTitleCase(inscrito.nombreCompleto)}
                  </span>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[12px] font-bold text-gray-500 tracking-wide">V-{inscrito.cedula}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                      inscrito.modalidad.toLowerCase().includes('carrera') || inscrito.modalidad.toLowerCase().includes('corriendo') 
                        ? 'bg-orange-100 text-[#ea4a22]' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {inscrito.modalidad}
                    </span>
                  </div>
                </div>

                {/* Panel Interno de Datos */}
                <div className={`grid grid-cols-2 gap-3 p-3.5 rounded-[1rem] border ${
                  idx % 2 === 0 ? 'bg-gray-50/80 border-gray-100/50' : 'bg-white/60 border-white/40'
                }`}>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Contacto</span>
                    <span className="text-[13px] font-semibold text-gray-700">{inscrito.telefono}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Entidad</span>
                    <span className="text-[13px] font-semibold text-gray-700">{toTitleCase(inscrito.bancoEmisor)}</span>
                  </div>
                </div>

                {/* Acción */}
                <a 
                  href={inscrito.captureUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-[13px] transition-colors border shadow-sm mt-1 ${
                    idx % 2 === 0 
                      ? 'bg-white border-gray-200 text-gray-700 hover:border-[#ea4a22] hover:text-[#ea4a22]'
                      : 'bg-white/80 border-[#ea4a22]/20 text-[#ea4a22] hover:bg-[#ea4a22] hover:text-white'
                  }`}
                >
                  <ExternalLink size={16} />
                  Ver Comprobante de Pago
                </a>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-gray-500 bg-white rounded-2xl">
              <p className="text-sm font-medium">No hay resultados para esta búsqueda.</p>
            </div>
          )}
        </div>
      </div>

      {/* --- VISTA DESKTOP: TABLA (Oculto en Móvil) --- */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white">
            <tr>
              <th scope="col" className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Corredor</th>
              <th scope="col" className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Contacto</th>
              <th scope="col" className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Modalidad</th>
              <th scope="col" className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Validación</th>
              <th scope="col" className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Registro</th>
            </tr>
          </thead>
          <tbody className="bg-gray-50/30 divide-y divide-gray-100">
            {filteredData.length > 0 ? (
              filteredData.map((inscrito) => (
                <tr key={inscrito.id} className="hover:bg-white hover:shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all relative z-10 group cursor-default">
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-[15px] font-black text-gray-900 group-hover:text-[#ea4a22] transition-colors">{inscrito.nombreCompleto}</span>
                      <span className="text-xs font-semibold text-gray-500">V-{inscrito.cedula}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-800">{inscrito.telefono}</span>
                      <span className="text-xs font-medium text-gray-500">{inscrito.correo}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider ${
                      inscrito.modalidad.toLowerCase() === 'carrera' 
                        ? 'bg-orange-100 text-[#ea4a22]' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {inscrito.modalidad.toLowerCase() === 'carrera' ? <Navigation size={12} strokeWidth={3} /> : <Map size={12} strokeWidth={3} />}
                      {inscrito.modalidad}
                    </span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <span className="text-[13px] font-black text-gray-900">{inscrito.bancoEmisor}</span>
                        <span className="text-[10px] text-gray-500 font-mono font-bold uppercase tracking-wider">Ref: {inscrito.referenciaPago}</span>
                      </div>
                      <a 
                        href={inscrito.captureUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-white border border-gray-200 hover:border-[#ea4a22] text-gray-400 hover:bg-[#ea4a22] hover:text-white flex items-center justify-center transition-all shadow-sm"
                        title="Ver Comprobante de Pago"
                      >
                        <ExternalLink size={16} strokeWidth={2.5} />
                      </a>
                    </div>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap text-sm text-gray-500 font-semibold">
                    {new Date(inscrito.fechaRegistro).toLocaleDateString('es-VE', { 
                      day: '2-digit', month: 'short', year: 'numeric' 
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-8 py-16 text-center text-gray-500 bg-white">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <MapPin size={32} className="text-gray-300" />
                    <p className="text-sm font-bold">No encontramos a nadie con esos datos.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pie de tabla general */}
      <div className="bg-white px-8 py-5 border-t border-gray-100">
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
          Mostrando <span className="font-black text-gray-900 mx-1">{filteredData.length}</span> de {data.length} registros totales
        </p>
      </div>

    </div>
  );
};
