'use client';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, ExternalLink, Filter, MapPin, Map, Navigation, CreditCard, ChevronRight, ChevronLeft } from 'lucide-react';

interface Inscrito {
  id: string;
  nombreCompleto: string;
  cedula: string;
  correo: string;
  genero: string;
  fechaNacimiento: string;
  telefono: string;
  modalidad: string;
  club?: string;
  bancoEmisor: string;
  referenciaPago: string;
  telefonoPago: string;
  captureUrl: string;
  fechaRegistro: Date;
}

export const InscritosTable = ({ data }: { data: Inscrito[] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [mountedId, setMountedId] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleExpand = (id: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    if (expandedId === id) {
      setExpandedId(null);
      timeoutRef.current = setTimeout(() => setMountedId(null), 300);
    } else {
      if (expandedId) setExpandedId(null);
      setMountedId(id);
      timeoutRef.current = setTimeout(() => setExpandedId(id), 10);
    }
  };

  // Filtrado de datos en tiempo real
  const filteredData = useMemo(() => {
    return data.filter(inscrito => {
      return inscrito.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase()) || 
             inscrito.cedula.includes(searchTerm);
    });
  }, [data, searchTerm]);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  useEffect(() => {
    setCurrentPage(1); // Reiniciar a página 1 cuando se busca
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  const toTitleCase = (str: string) => {
    if (!str) return '';
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden mt-8" translate="no">
      
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

      {/* --- VISTA MÓVIL: LISTA NATIVA ACORDEÓN (Oculto en Desktop) --- */}
      <div className="block md:hidden bg-gray-50/50 p-4">
        <div className="flex flex-col gap-4">
          {paginatedData.length > 0 ? (
            paginatedData.map((inscrito, idx) => {
              const isExpanded = expandedId === inscrito.id;
              const isMounted = mountedId === inscrito.id;
              
              return (
              <div 
                key={inscrito.id} 
                className={`flex flex-col rounded-2xl border transition-colors overflow-hidden ${
                  idx % 2 === 0 
                    ? 'bg-white border-gray-100 shadow-[0_2px_12px_rgb(0,0,0,0.03)]' 
                    : 'bg-[#ea4a22]/[0.04] border-[#ea4a22]/10 shadow-none'
                }`}
              >
                
                {/* Cabecera de Tarjeta (Clickable) */}
                <button 
                  onClick={() => toggleExpand(inscrito.id)}
                  className="w-full text-left p-5 flex items-center justify-between outline-none"
                >
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
                  <ChevronRight size={20} className={`text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                </button>

                {/* Panel Interno de Datos (Renderizado Condicional + Animación CSS Grid) */}
                {isMounted && (
                  <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 pt-0 flex flex-col gap-3">
                        
                        {/* Bloque: Contacto */}
                        <div className={`p-4 rounded-2xl border ${
                          idx % 2 === 0 ? 'bg-gray-50/80 border-gray-100/50' : 'bg-white/60 border-white/40'
                        }`}>
                          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> Contacto
                          </h4>
                          <div className="flex flex-col gap-2.5">
                            <div className="flex justify-between items-center border-b border-gray-200/40 pb-2.5">
                              <span className="text-[12px] text-gray-500 font-medium">Correo</span>
                              <span className="text-[13px] font-bold text-gray-800 truncate max-w-[60%]">{inscrito.correo}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-200/40 pb-2.5">
                              <span className="text-[12px] text-gray-500 font-medium">Teléfono</span>
                              <span className="text-[13px] font-bold text-gray-800">{inscrito.telefono}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-[12px] text-gray-500 font-medium">F. Nacimiento</span>
                              <span className="text-[13px] font-bold text-gray-800">{inscrito.fechaNacimiento || '-'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Bloque: Perfil del Corredor */}
                        <div className={`p-4 rounded-2xl border ${
                          idx % 2 === 0 ? 'bg-gray-50/80 border-gray-100/50' : 'bg-white/60 border-white/40'
                        }`}>
                          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span> Perfil
                          </h4>
                          <div className="flex flex-col gap-2.5">
                            <div className="flex justify-between items-center border-b border-gray-200/40 pb-2.5">
                              <span className="text-[12px] text-gray-500 font-medium">Género</span>
                              <span className="text-[13px] font-bold text-gray-800">{toTitleCase(inscrito.genero)}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-200/40 pb-2.5">
                              <span className="text-[12px] text-gray-500 font-medium">Club</span>
                              <span className="text-[13px] font-bold text-gray-800">{inscrito.club ? toTitleCase(inscrito.club) : 'Ninguno'}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-[12px] text-gray-500 font-medium">Fecha Reg.</span>
                              <span className="text-[13px] font-bold text-gray-800">{new Date(inscrito.fechaRegistro).toLocaleDateString('es-VE')}</span>
                            </div>
                          </div>
                        </div>

                        {/* Bloque: Pago */}
                        <div className={`p-4 rounded-2xl border ${
                          idx % 2 === 0 ? 'bg-orange-50/50 border-orange-100/50' : 'bg-orange-50/30 border-orange-100/30'
                        }`}>
                          <h4 className="text-[10px] font-black text-[#ea4a22] uppercase tracking-widest mb-3 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ea4a22]"></span> Datos de Pago
                          </h4>
                          <div className="flex flex-col gap-2.5">
                            <div className="flex justify-between items-center border-b border-orange-200/30 pb-2.5">
                              <span className="text-[12px] text-gray-500 font-medium">Banco</span>
                              <span className="text-[13px] font-bold text-gray-800">{toTitleCase(inscrito.bancoEmisor)}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-orange-200/30 pb-2.5">
                              <span className="text-[12px] text-gray-500 font-medium">Referencia</span>
                              <span className="text-[13px] font-mono font-bold text-gray-800">{inscrito.referenciaPago}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-[12px] text-gray-500 font-medium">Tlf Pago</span>
                              <span className="text-[13px] font-bold text-gray-800">{inscrito.telefonoPago || '-'}</span>
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Acción */}
                      <a 
                        href={inscrito.captureUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-[13px] transition-colors border shadow-sm ${
                          idx % 2 === 0 
                            ? 'bg-white border-gray-200 text-gray-700 hover:border-[#ea4a22] hover:text-[#ea4a22]'
                            : 'bg-white/80 border-[#ea4a22]/20 text-[#ea4a22] hover:bg-[#ea4a22] hover:text-white'
                        }`}
                      >
                        <ExternalLink size={16} />
                        Ver Comprobante de Pago
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )})
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
            {paginatedData.length > 0 ? (
              paginatedData.map((inscrito, idx) => {
                const isExpanded = expandedId === inscrito.id;
                const isMounted = mountedId === inscrito.id;
                
                return (
                  <React.Fragment key={inscrito.id}>
                    {/* Fila Principal (Clickable) */}
                    <tr 
                      onClick={() => toggleExpand(inscrito.id)}
                      className={`hover:bg-gray-50/80 transition-colors relative z-10 group cursor-pointer ${
                        isExpanded ? 'bg-gray-50/80 shadow-inner' : 'bg-transparent'
                      }`}
                    >
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
                          inscrito.modalidad.toLowerCase().includes('carrera') || inscrito.modalidad.toLowerCase().includes('corriendo') 
                            ? 'bg-orange-100 text-[#ea4a22]' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {inscrito.modalidad.toLowerCase().includes('carrera') || inscrito.modalidad.toLowerCase().includes('corriendo') ? <Navigation size={12} strokeWidth={3} /> : <Map size={12} strokeWidth={3} />}
                          {inscrito.modalidad}
                        </span>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col">
                            <span className="text-[13px] font-black text-gray-900">{toTitleCase(inscrito.bancoEmisor)}</span>
                            <span className="text-[10px] text-gray-500 font-mono font-bold uppercase tracking-wider">Ref: {inscrito.referenciaPago}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap text-sm text-gray-500 font-semibold relative">
                        <div className="flex items-center justify-between">
                          <span>
                            {new Date(inscrito.fechaRegistro).toLocaleDateString('es-VE', { 
                              day: '2-digit', month: 'short', year: 'numeric' 
                            })}
                          </span>
                          <ChevronRight size={20} className={`text-gray-400 transition-transform duration-300 ml-4 ${isExpanded ? 'rotate-90' : ''}`} />
                        </div>
                      </td>
                    </tr>

                    {/* Fila Expandida (Detalles Desktop) */}
                    {isMounted && (
                      <tr className="bg-gray-50/40">
                        <td colSpan={5} className="p-0 border-none">
                          <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                              <div className="px-8 py-6 flex flex-col md:flex-row gap-6 border-b border-gray-100/50 shadow-inner">
                            
                            {/* Bloque: Contacto */}
                              <div className="flex-1 p-5 rounded-2xl border bg-white/60 border-white/40 shadow-sm">
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> Contacto
                                </h4>
                                <div className="flex flex-col gap-3">
                                  <div className="flex justify-between items-center border-b border-gray-200/40 pb-3">
                                    <span className="text-[12px] text-gray-500 font-medium">Correo</span>
                                    <span className="text-[13px] font-bold text-gray-800 truncate max-w-[60%]">{inscrito.correo}</span>
                                  </div>
                                  <div className="flex justify-between items-center border-b border-gray-200/40 pb-3">
                                    <span className="text-[12px] text-gray-500 font-medium">Teléfono</span>
                                    <span className="text-[13px] font-bold text-gray-800">{inscrito.telefono}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-[12px] text-gray-500 font-medium">F. Nacimiento</span>
                                    <span className="text-[13px] font-bold text-gray-800">{inscrito.fechaNacimiento || '-'}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Bloque: Perfil del Corredor */}
                              <div className="flex-1 p-5 rounded-2xl border bg-white/60 border-white/40 shadow-sm">
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span> Perfil
                                </h4>
                                <div className="flex flex-col gap-3">
                                  <div className="flex justify-between items-center border-b border-gray-200/40 pb-3">
                                    <span className="text-[12px] text-gray-500 font-medium">Género</span>
                                    <span className="text-[13px] font-bold text-gray-800">{toTitleCase(inscrito.genero)}</span>
                                  </div>
                                  <div className="flex justify-between items-center border-b border-gray-200/40 pb-3">
                                    <span className="text-[12px] text-gray-500 font-medium">Club</span>
                                    <span className="text-[13px] font-bold text-gray-800">{inscrito.club ? toTitleCase(inscrito.club) : 'Ninguno'}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-[12px] text-gray-500 font-medium">Fecha Reg.</span>
                                    <span className="text-[13px] font-bold text-gray-800">{new Date(inscrito.fechaRegistro).toLocaleDateString('es-VE')}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Bloque: Pago */}
                              <div className="flex-1 p-5 rounded-2xl border bg-orange-50/30 border-orange-100/30 shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                  <h4 className="text-[10px] font-black text-[#ea4a22] uppercase tracking-widest flex items-center gap-1.5 mt-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#ea4a22]"></span> Datos de Pago
                                  </h4>
                                  <a 
                                    href={inscrito.captureUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:border-[#ea4a22] text-gray-600 hover:text-[#ea4a22] transition-colors shadow-sm text-[11px] font-black uppercase tracking-wide"
                                    title="Ver Comprobante de Pago"
                                  >
                                    <ExternalLink size={14} strokeWidth={2.5} />
                                    <span>Ver Pago</span>
                                  </a>
                                </div>
                                <div className="flex flex-col gap-3">
                                  <div className="flex justify-between items-center border-b border-orange-200/30 pb-3">
                                    <span className="text-[12px] text-gray-500 font-medium">Banco</span>
                                    <span className="text-[13px] font-bold text-gray-800">{toTitleCase(inscrito.bancoEmisor)}</span>
                                  </div>
                                  <div className="flex justify-between items-center border-b border-orange-200/30 pb-3">
                                    <span className="text-[12px] text-gray-500 font-medium">Referencia</span>
                                    <span className="text-[13px] font-mono font-bold text-gray-800">{inscrito.referenciaPago}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-[12px] text-gray-500 font-medium">Tlf Pago</span>
                                    <span className="text-[13px] font-bold text-gray-800">{inscrito.telefonoPago || '-'}</span>
                                  </div>
                                </div>
                              </div>

                            </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
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
      
      {/* Pie de tabla general y paginación */}
      {totalPages > 1 ? (
        <div className="bg-white px-4 md:px-8 py-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
            Mostrando <span className="font-black text-gray-900 mx-1">{(currentPage - 1) * itemsPerPage + 1}</span> a <span className="font-black text-gray-900 mx-1">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> de <span className="font-black text-gray-900 mx-1">{filteredData.length}</span> resultados
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:hover:bg-white transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-1">
              <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#ea4a22]/10 text-[#ea4a22] font-black text-sm border border-[#ea4a22]/20">
                {currentPage}
              </span>
              <span className="text-gray-400 font-medium px-2 text-sm">de {totalPages}</span>
            </div>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:hover:bg-white transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white px-8 py-5 border-t border-gray-100">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
            Mostrando <span className="font-black text-gray-900 mx-1">{filteredData.length}</span> de {data.length} registros totales
          </p>
        </div>
      )}

    </div>
  );
};
