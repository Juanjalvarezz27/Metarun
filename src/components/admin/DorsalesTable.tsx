'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { Search, Hash, Save, AlertCircle, CheckCircle2, User, Loader2, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface DorsalInscrito {
  id: string;
  nombreCompleto: string;
  cedula: string;
  fechaNacimiento: string;
  dorsal: string | null;
}

export const DorsalesTable = ({ initialData }: { initialData: DorsalInscrito[] }) => {
  const [data, setData] = useState<DorsalInscrito[]>(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estado para la edición de dorsales
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Filtrado de datos en tiempo real
  const filteredData = useMemo(() => {
    return data.filter(inscrito => {
      return inscrito.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase()) || 
             inscrito.cedula.includes(searchTerm) ||
             (inscrito.dorsal && inscrito.dorsal.includes(searchTerm));
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

  // Iniciar edición
  const handleEditClick = (inscrito: DorsalInscrito) => {
    setEditingId(inscrito.id);
    setEditValue(inscrito.dorsal || '');
    setErrorMsg('');
  };

  // Guardar cambio en el servidor
  const handleSave = async (id: string) => {
    if (loadingId) return;
    
    // Validar si el valor no cambió
    const current = data.find(d => d.id === id);
    if (current && (current.dorsal || '') === editValue.trim()) {
      setEditingId(null);
      return;
    }

    setLoadingId(id);
    setErrorMsg('');

    try {
      const response = await fetch('/api/admin/dorsales', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, dorsal: editValue }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al asignar dorsal');
      }

      // Actualizar estado local
      setData(prev => prev.map(item => 
        item.id === id ? { ...item, dorsal: result.data.dorsal } : item
      ));
      
      setEditingId(null);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoadingId(null);
    }
  };

  // Presionar Enter para guardar
  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave(id);
    } else if (e.key === 'Escape') {
      setEditingId(null);
      setErrorMsg('');
    }
  };

  return (
    <div className="w-full relative z-20" translate="no">
      
      {/* Mensaje de Error Global */}
      {errorMsg && (
        <div className="mb-4 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-700 animate-in slide-in-from-top-2 fade-in">
          <AlertCircle size={20} className="text-red-500 shrink-0" />
          <p className="text-sm font-bold">{errorMsg}</p>
          <button onClick={() => setErrorMsg('')} className="ml-auto p-1 hover:bg-red-100 rounded-lg">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Buscador y Controles Premium */}
      <div className="bg-white p-4 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8 flex flex-col sm:flex-row gap-4 border border-gray-100 items-center justify-between">
        <div className="relative w-full sm:max-w-md group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400 group-focus-within:text-[#ea4a22] transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Buscar por nombre, cédula o dorsal..."
            className="w-full bg-gray-50 text-gray-900 placeholder:text-gray-400 rounded-2xl py-3.5 pl-12 pr-5 text-[15px] font-medium outline-none border border-transparent focus:border-[#ea4a22]/20 focus:bg-white focus:ring-4 focus:ring-[#ea4a22]/5 transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-orange-50/50 rounded-xl border border-orange-100/50 self-start sm:self-auto">
          <Hash size={16} className="text-[#ea4a22]" />
          <span className="text-xs font-black text-[#ea4a22] uppercase tracking-widest">
            {data.filter(d => d.dorsal).length} / {data.length} Asignados
          </span>
        </div>
      </div>

      {/* Tabla Premium (Desktop) & Tarjetas (Mobile) */}
      <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        
        {/* === VERSIÓN DESKTOP === */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="py-5 px-8 text-[11px] font-black text-gray-400 uppercase tracking-widest w-1/3">Corredor</th>
                <th className="py-5 px-8 text-[11px] font-black text-gray-400 uppercase tracking-widest">Cédula</th>
                <th className="py-5 px-8 text-[11px] font-black text-gray-400 uppercase tracking-widest">Nacimiento</th>
                <th className="py-5 px-8 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Dorsal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedData.length > 0 ? (
                paginatedData.map((inscrito) => {
                  const isEditing = editingId === inscrito.id;
                  const isLoading = loadingId === inscrito.id;
                  const hasDorsal = !!inscrito.dorsal;

                  return (
                    <tr key={inscrito.id} className="hover:bg-gray-50/50 transition-colors group">
                      
                      {/* Corredor */}
                      <td className="py-4 px-8">
                        <div className="flex items-center">
                          <span className="font-bold text-gray-900 text-sm truncate max-w-[200px]">
                            {inscrito.nombreCompleto}
                          </span>
                        </div>
                      </td>

                      {/* Cédula */}
                      <td className="py-4 px-8">
                        <span className="text-sm font-medium text-gray-600">{inscrito.cedula}</span>
                      </td>

                      {/* Nacimiento */}
                      <td className="py-4 px-8">
                        <span className="text-sm font-medium text-gray-600">{inscrito.fechaNacimiento || '-'}</span>
                      </td>

                      {/* Asignación de Dorsal */}
                      <td className="py-4 px-8 text-right">
                        {isEditing ? (
                          <div key="editing-desktop" className="flex items-center justify-end gap-2 animate-in fade-in zoom-in-95 duration-200">
                            <input
                              type="text"
                              autoFocus
                              placeholder="Ej. 101"
                              value={editValue}
                              onChange={e => setEditValue(e.target.value)}
                              onKeyDown={e => handleKeyDown(e, inscrito.id)}
                              disabled={isLoading}
                              className="w-24 text-center font-mono font-bold text-[#ea4a22] bg-orange-50 border-2 border-[#ea4a22]/30 rounded-lg py-1.5 outline-none focus:border-[#ea4a22] focus:bg-white transition-all disabled:opacity-50"
                            />
                            <button
                              onClick={() => handleSave(inscrito.id)}
                              disabled={isLoading}
                              className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#ea4a22] text-white hover:bg-[#d8401c] transition-colors shadow-md disabled:opacity-50"
                            >
                              {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                            </button>
                            <button
                              onClick={() => { setEditingId(null); setErrorMsg(''); }}
                              disabled={isLoading}
                              className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors disabled:opacity-50"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <div key="viewing-desktop" className="flex items-center justify-end gap-3">
                            {hasDorsal ? (
                              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-50 border border-orange-200/50">
                                <Hash size={14} className="text-[#ea4a22]" />
                                <span className="font-mono font-black text-lg text-[#ea4a22]">{inscrito.dorsal}</span>
                              </div>
                            ) : (
                              <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                SIN DORSAL
                              </span>
                            )}
                            <button
                              onClick={() => handleEditClick(inscrito)}
                              className="text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-all shadow-sm opacity-0 group-hover:opacity-100 focus:opacity-100"
                            >
                              {hasDorsal ? 'Editar' : 'Asignar'}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-16 text-center text-gray-500">
                    No hay resultados para esta búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* === VERSIÓN MOBILE === */}
        <div className="block md:hidden bg-gray-50/50 p-4">
          <div className="flex flex-col gap-4">
          {paginatedData.length > 0 ? (
            paginatedData.map((inscrito, idx) => {
              const isEditing = editingId === inscrito.id;
              const isLoading = loadingId === inscrito.id;
              const hasDorsal = !!inscrito.dorsal;

              return (
                <div 
                  key={inscrito.id} 
                  className={`p-5 flex flex-col gap-4 rounded-2xl border transition-colors overflow-hidden ${
                    idx % 2 === 0 
                      ? 'bg-white border-gray-100 shadow-[0_2px_12px_rgb(0,0,0,0.03)]' 
                      : 'bg-[#ea4a22]/[0.04] border-[#ea4a22]/10 shadow-none'
                  }`}
                >
                  {/* Info Corredor */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 text-[15px] leading-tight mb-0.5">
                          {inscrito.nombreCompleto}
                        </span>
                        <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                          <span>{inscrito.cedula}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                          <span>{inscrito.fechaNacimiento || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Asignación Mobile */}
                  <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
                    {isEditing ? (
                      <div key="editing-mobile" className="flex flex-col gap-3">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          Ingresa el Número de Dorsal
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            autoFocus
                            placeholder="Ej. 101"
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                            onKeyDown={e => handleKeyDown(e, inscrito.id)}
                            disabled={isLoading}
                            className="flex-1 w-full min-w-0 text-center font-mono font-bold text-xl text-[#ea4a22] bg-white border-2 border-[#ea4a22]/30 rounded-xl py-2 outline-none focus:border-[#ea4a22] transition-all disabled:opacity-50 shadow-sm"
                          />
                          <button
                            onClick={() => handleSave(inscrito.id)}
                            disabled={isLoading}
                            className="w-12 h-12 flex shrink-0 items-center justify-center rounded-xl bg-[#ea4a22] text-white shadow-md disabled:opacity-50"
                          >
                            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                          </button>
                          <button
                            onClick={() => { setEditingId(null); setErrorMsg(''); }}
                            disabled={isLoading}
                            className="w-12 h-12 flex shrink-0 items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-500 disabled:opacity-50"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div key="viewing-mobile" className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                            Dorsal Asignado
                          </span>
                          {hasDorsal ? (
                            <div className="flex items-center gap-1.5">
                              <Hash size={16} className="text-[#ea4a22]" />
                              <span className="font-mono font-black text-2xl text-[#ea4a22] leading-none">{inscrito.dorsal}</span>
                            </div>
                          ) : (
                            <span className="text-sm font-bold text-gray-400">Sin Asignar</span>
                          )}
                        </div>
                        <button
                          onClick={() => handleEditClick(inscrito)}
                          className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-sm ${
                            hasDorsal 
                              ? 'bg-white border border-gray-200 text-gray-700' 
                              : 'bg-[#ea4a22] text-white shadow-md shadow-[#ea4a22]/20'
                          }`}
                        >
                          {hasDorsal ? 'Editar' : 'Asignar'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-gray-500">
              No hay resultados para esta búsqueda.
            </div>
          )}
          </div>
        </div>

        {/* === CONTROLES DE PAGINACIÓN === */}
        {totalPages > 1 && (
          <div className="border-t border-gray-100 bg-white p-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm font-medium text-gray-500">
              Mostrando <span className="font-bold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> a <span className="font-bold text-gray-900">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> de <span className="font-bold text-gray-900">{filteredData.length}</span> resultados
            </span>
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
                <span className="text-gray-400 font-medium px-2">de {totalPages}</span>
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
        )}

      </div>
    </div>
  );
};
