import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "flex items-center justify-center px-4 py-4 rounded-2xl font-bold uppercase tracking-wider text-[13px] transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#ea4a22] text-white hover:bg-[#d43d1a] active:bg-[#bc3616] shadow-[0_8px_20px_-6px_rgba(234,74,34,0.6)] hover:shadow-[0_12px_24px_-8px_rgba(234,74,34,0.8)] active:scale-[0.98]",
    secondary: "bg-white text-gray-800 border-2 border-gray-100 hover:bg-gray-50 active:bg-gray-100 active:scale-[0.98] shadow-sm",
    outline: "bg-transparent text-[#ea4a22] border-2 border-[#ea4a22] hover:bg-[#ea4a22]/5 active:scale-[0.98]",
    danger: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-md active:scale-[0.98]",
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
