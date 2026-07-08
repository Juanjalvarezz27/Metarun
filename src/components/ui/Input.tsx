import React, { useId } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    const id = useId();
    
    return (
      <div className={`flex flex-col w-full ${className}`}>
        <label htmlFor={id} className="text-[13px] font-semibold text-gray-800 mb-1.5 ml-2 uppercase tracking-wide opacity-80">
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          className={`
            w-full px-4 py-3.5 rounded-2xl bg-gray-50/80 border-2 outline-none transition-all duration-300 font-medium text-gray-900 placeholder:text-gray-400
            ${error ? 'border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10' : 'border-transparent focus:border-[#ea4a22] focus:bg-white focus:shadow-[0_0_0_4px_rgba(234,74,34,0.1)]'}
            hover:bg-gray-100/80
            disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
          `}
          {...props}
        />
        {error && (
          <span className="text-xs text-red-500 mt-1.5 ml-2 font-medium">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
