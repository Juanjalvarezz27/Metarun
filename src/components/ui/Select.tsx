import React, { useId } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, className = '', ...props }, ref) => {
    const id = useId();
    
    return (
      <div className={`flex flex-col w-full ${className}`}>
        <label htmlFor={id} className="text-[13px] font-semibold text-gray-800 mb-1.5 ml-2 uppercase tracking-wide opacity-80">
          {label}
        </label>
        <div className="relative">
          <select
            id={id}
            ref={ref}
            className={`
              w-full px-4 py-3.5 rounded-2xl bg-gray-50/80 border-2 outline-none transition-all duration-300 appearance-none font-medium text-gray-900
              ${error ? 'border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10' : 'border-transparent focus:border-[#ea4a22] focus:bg-white focus:shadow-[0_0_0_4px_rgba(234,74,34,0.1)]'}
              hover:bg-gray-100/80
              disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
            `}
            {...props}
          >
            <option value="" disabled>Seleccione una opción</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
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
