'use client';

import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { Upload, Map, Gift, Package, CheckCircle2, Lock } from 'lucide-react';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Button } from './ui/Button';

export const RegistrationForm = () => {
  // Estado para simular cerrar inscripciones (el admin podrá controlarlo después)
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);
  
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    cedula: '',
    genero: '',
    fechaNacimiento: '',
    telefono: '',
    modalidad: '',
    club: '',
    referenciaPago: '',
    bancoEmisor: '',
    telefonoPago: '',
    aceptaTerminos: false,
  });

  const [captureFile, setCaptureFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCaptureFile(e.target.files[0]);
    }
  };

  const uploadToImgBB = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve('https://i.ibb.co/placeholder/capture.png'), 1500);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.aceptaTerminos) {
      toast.error('Debes aceptar los términos y condiciones');
      return;
    }
    if (!captureFile) {
      toast.error('Debes subir el capture de tu pago');
      return;
    }

    setIsSubmitting(true);
    try {
      const captureUrl = await uploadToImgBB(captureFile);
      const finalPayload = { ...formData, captureUrl };
      
      console.log('Datos listos para la BD:', finalPayload);
      await new Promise(r => setTimeout(r, 1000));
      toast.success('¡Inscripción completada con éxito!');
      
      setFormData({
        nombreCompleto: '', cedula: '', genero: '', fechaNacimiento: '',
        telefono: '', modalidad: '', club: '', referenciaPago: '',
        bancoEmisor: '', telefonoPago: '', aceptaTerminos: false,
      });
      setCaptureFile(null);
      if(fileInputRef.current) fileInputRef.current.value = '';

    } catch (error) {
      toast.error('Hubo un error al procesar tu inscripción');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isRegistrationOpen) {
    return (
      <div className="w-full mx-auto mt-10 bg-white rounded-[2rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 text-center">
        <div className="w-20 h-20 bg-gray-50 text-gray-400 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
          <Lock size={36} strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">Inscripciones Cerradas</h2>
        <p className="text-gray-500 font-medium leading-relaxed max-w-sm mx-auto">
          Lo sentimos, por ahora no estamos aceptando más inscripciones. ¡Mantente atento a nuestras redes!
        </p>
        <Button variant="outline" className="mt-8 mx-auto" onClick={() => setIsRegistrationOpen(true)}>
          (Admin) Abrir Inscripciones
        </Button>
      </div>
    );
  }

  // Estilos compartidos para las tarjetas de sección
  const sectionCardClass = "bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden";
  const sectionNumberClass = "w-10 h-10 rounded-2xl bg-[#ea4a22]/10 flex items-center justify-center text-[#ea4a22] shadow-inner";

  return (
    <div className="w-full mx-auto pb-12 relative z-10">
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* SECCION 1: Datos Personales */}
        <section className={sectionCardClass}>
          <div className="flex items-center gap-4 mb-8">
            <div className={sectionNumberClass}>
              <span className="font-extrabold text-lg">1</span>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Datos Personales</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input 
              label="Nombre y Apellido" 
              name="nombreCompleto" 
              value={formData.nombreCompleto} 
              onChange={handleInputChange} 
              placeholder="Ej. Juan Pérez" 
              required 
              className="md:col-span-2"
            />
            <Input 
              label="Cédula de Identidad" 
              name="cedula" 
              value={formData.cedula} 
              onChange={handleInputChange} 
              placeholder="V-12345678" 
              required 
            />
            <Select 
              label="Género" 
              name="genero" 
              value={formData.genero} 
              onChange={handleInputChange} 
              options={[
                { value: 'M', label: 'Masculino' },
                { value: 'F', label: 'Femenino' }
              ]} 
              required 
            />
            <Input 
              label="Fecha de Nacimiento" 
              name="fechaNacimiento" 
              type="date" 
              value={formData.fechaNacimiento} 
              onChange={handleInputChange} 
              required 
            />
            <Input 
              label="Número de Teléfono" 
              name="telefono" 
              type="tel" 
              value={formData.telefono} 
              onChange={handleInputChange} 
              placeholder="0414-1234567" 
              required 
            />
          </div>
        </section>

        {/* SECCION 2: Detalles de la Carrera */}
        <section className={sectionCardClass}>
          <div className="flex items-center gap-4 mb-8">
            <div className={sectionNumberClass}>
              <span className="font-extrabold text-lg">2</span>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Detalles de la Carrera</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50/80 rounded-[1.5rem] p-5 text-center flex flex-col items-center justify-center gap-3 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <Gift className="text-[#ea4a22]" size={28} strokeWidth={1.5} />
              <span className="text-[13px] font-semibold text-gray-700 uppercase tracking-wide">Premios por Categoría</span>
            </div>
            <div className="bg-gray-50/80 rounded-[1.5rem] p-5 text-center flex flex-col items-center justify-center gap-3 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <Map className="text-[#ea4a22]" size={28} strokeWidth={1.5} />
              <span className="text-[13px] font-semibold text-gray-700 uppercase tracking-wide">Mapa de Ruta</span>
            </div>
            <div className="bg-gray-50/80 rounded-[1.5rem] p-5 text-center flex flex-col items-center justify-center gap-3 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <Package className="text-[#ea4a22]" size={28} strokeWidth={1.5} />
              <span className="text-[13px] font-semibold text-gray-700 uppercase tracking-wide">Kit Incluido</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Select 
              label="¿Cómo participarás?" 
              name="modalidad" 
              value={formData.modalidad} 
              onChange={handleInputChange} 
              options={[
                { value: 'corriendo', label: 'Corriendo (Carrera)' },
                { value: 'caminando', label: 'Caminando (Caminata)' }
              ]} 
              required 
            />
            <Input 
              label="Club de Corredores (Opcional)" 
              name="club" 
              value={formData.club} 
              onChange={handleInputChange} 
              placeholder="Nombre de tu club" 
            />
          </div>
        </section>

        {/* SECCION 3: Pago */}
        <section className={sectionCardClass}>
          <div className="flex items-center gap-4 mb-8">
            <div className={sectionNumberClass}>
              <span className="font-extrabold text-lg">3</span>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Verificación de Pago</h2>
          </div>

          <div className="bg-gradient-to-br from-[#ea4a22] to-[#ff6a45] rounded-[1.5rem] p-6 text-white mb-8 shadow-[0_10px_30px_-10px_rgba(234,74,34,0.5)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
            <h3 className="font-bold mb-4 opacity-90 text-[13px] uppercase tracking-wider flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Datos para Pago Móvil
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-[15px]">
              <div className="flex flex-col"><span className="opacity-70 text-xs font-semibold uppercase tracking-wider mb-1">Banco</span><span className="font-medium">Banesco (0134)</span></div>
              <div className="flex flex-col"><span className="opacity-70 text-xs font-semibold uppercase tracking-wider mb-1">Teléfono</span><span className="font-medium">0414-1234567</span></div>
              <div className="flex flex-col"><span className="opacity-70 text-xs font-semibold uppercase tracking-wider mb-1">Cédula</span><span className="font-medium">V-12345678</span></div>
              <div className="flex flex-col"><span className="opacity-70 text-xs font-semibold uppercase tracking-wider mb-1">Monto</span><span className="font-extrabold text-xl tracking-tight">$15</span></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <Input 
              label="Referencia de Pago" 
              name="referenciaPago" 
              value={formData.referenciaPago} 
              onChange={handleInputChange} 
              placeholder="Últimos 6 dígitos" 
              required 
            />
            <Select 
              label="Banco Emisor" 
              name="bancoEmisor" 
              value={formData.bancoEmisor} 
              onChange={handleInputChange} 
              options={[
                { value: 'banesco', label: 'Banesco' },
                { value: 'mercantil', label: 'Mercantil' },
                { value: 'provincial', label: 'Provincial' },
                { value: 'venezuela', label: 'Banco de Venezuela' },
                { value: 'otro', label: 'Otro' }
              ]} 
              required 
            />
            <Input 
              label="Teléfono del Pago" 
              name="telefonoPago" 
              type="tel" 
              value={formData.telefonoPago} 
              onChange={handleInputChange} 
              placeholder="Teléfono desde donde se pagó" 
              required 
              className="md:col-span-2"
            />
          </div>

          <div className="mb-8">
            <label className="text-[13px] font-semibold text-gray-800 mb-2 ml-2 uppercase tracking-wide opacity-80 block">
              Capture de Pantalla
            </label>
            <div 
              className="border-2 border-dashed border-gray-200 rounded-[1.5rem] p-8 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-[#ea4a22]/5 hover:border-[#ea4a22]/30 transition-all cursor-pointer group"
              onClick={() => fileInputRef.current?.click()}
            >
              {captureFile ? (
                <>
                  <CheckCircle2 className="text-green-500 mb-3" size={36} strokeWidth={1.5} />
                  <span className="text-sm font-semibold text-gray-900">{captureFile.name}</span>
                  <span className="text-xs text-gray-500 mt-1 font-medium">Click para cambiar</span>
                </>
              ) : (
                <>
                  <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="text-[#ea4a22]" size={24} strokeWidth={2} />
                  </div>
                  <span className="text-[15px] font-medium text-gray-800">Sube tu capture aquí</span>
                  <span className="text-xs text-gray-400 mt-1.5 font-medium uppercase tracking-wider">JPG, PNG o PDF</span>
                </>
              )}
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*,.pdf" 
              className="hidden" 
            />
          </div>

          <div className="bg-gray-50/80 p-5 rounded-2xl border border-gray-100 mb-8">
            <div className="flex items-start gap-4">
              <input 
                type="checkbox" 
                id="terminos" 
                name="aceptaTerminos"
                checked={formData.aceptaTerminos}
                onChange={handleInputChange}
                className="mt-1 w-5 h-5 text-[#ea4a22] rounded-md border-gray-300 focus:ring-[#ea4a22] transition-colors cursor-pointer" 
              />
              <label htmlFor="terminos" className="text-[13px] text-gray-600 font-medium leading-relaxed cursor-pointer">
                Acepto los <a href="#" className="text-[#ea4a22] font-bold hover:underline">términos y condiciones</a> de la carrera, asumiendo la responsabilidad de mi estado físico y liberando de culpa a los organizadores.
              </label>
            </div>
          </div>

          <Button type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Procesando Inscripción...' : 'Completar Inscripción'}
          </Button>
        </section>

      </form>
    </div>
  );
};
