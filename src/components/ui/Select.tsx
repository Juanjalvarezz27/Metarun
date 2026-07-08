'use client';
import React, { useState, useRef, useEffect, useId } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label: string;
  options: SelectOption[];
  error?: string;
  value?: string;
  onChange?: (e: any) => void;
  name?: string;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ label, options, error, className = '', value, onChange, name, placeholder = "Seleccione una opción", ...props }, ref) => {
    const id = useId();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Cierra el menú si se hace click fuera de él
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find((opt) => opt.value === value);

    const handleSelect = (optionValue: string) => {
      if (onChange) {
        // Emulamos el evento Change nativo para que RegistrationForm siga funcionando intacto
        onChange({ target: { name: name || '', value: optionValue, type: 'select-one' } });
      }
      setIsOpen(false);
    };

    return (
      <div className={`flex flex-col w-full relative ${isOpen ? 'z-50' : 'z-10'} ${className}`} ref={dropdownRef}>
        <label className="text-[13px] font-semibold text-gray-800 mb-1.5 ml-2 uppercase tracking-wide opacity-80">
          {label}
        </label>
        
        <div className="relative">
          {/* El botón principal que simula el select */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`
              w-full flex items-center justify-between px-4 py-3.5 rounded-2xl bg-gray-50/80 border-2 outline-none transition-all duration-300 font-medium text-left
              ${error ? 'border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10' : 'border-transparent focus:border-[#ea4a22] focus:bg-white focus:shadow-[0_0_0_4px_rgba(234,74,34,0.1)]'}
              ${isOpen ? 'border-[#ea4a22] bg-white shadow-[0_0_0_4px_rgba(234,74,34,0.1)]' : 'hover:bg-gray-100/80'}
              ${!selectedOption ? 'text-gray-500' : 'text-gray-900'}
            `}
          >
            <span className="block truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronDown 
              className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#ea4a22]' : ''}`} 
              size={18} 
            />
          </button>

          {/* El menú desplegable totalmente customizado */}
          <div 
            className={`
              absolute z-50 w-full mt-2 bg-white rounded-2xl border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-200 transform origin-top
              ${isOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'}
            `}
          >
            <div className="max-h-60 overflow-y-auto p-1.5 space-y-0.5 custom-scrollbar">
              {options.map((option) => {
                const isSelected = value === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={`
                      w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-colors
                      ${isSelected ? 'bg-[#ea4a22]/10 text-[#ea4a22]' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}
                    `}
                  >
                    <span>{option.label}</span>
                    {isSelected && <Check size={16} strokeWidth={2.5} />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {error && (
          <span className="text-xs text-red-500 mt-1.5 ml-2 font-medium">{error}</span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
