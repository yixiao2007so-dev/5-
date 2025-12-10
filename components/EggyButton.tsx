import React from 'react';

interface EggyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'yellow' | 'blue' | 'pink' | 'green' | 'purple' | 'white';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const EggyButton: React.FC<EggyButtonProps> = ({ 
  color = 'yellow', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  const colorClasses = {
    yellow: 'bg-yellow-400 hover:bg-yellow-300 border-black text-black',
    blue: 'bg-cyan-400 hover:bg-cyan-300 border-black text-black',
    pink: 'bg-pink-400 hover:bg-pink-300 border-black text-white',
    green: 'bg-lime-400 hover:bg-lime-300 border-black text-black',
    purple: 'bg-purple-400 hover:bg-purple-300 border-black text-white',
    white: 'bg-white hover:bg-gray-50 border-black text-black',
  };

  const sizeClasses = {
    sm: 'py-1 px-3 text-sm border-2 shadow-[2px_2px_0px_0px_#000]',
    md: 'py-2 px-6 text-lg border-4 shadow-[4px_4px_0px_0px_#000]',
    lg: 'py-3 px-8 text-xl font-bold border-4 shadow-[6px_6px_0px_0px_#000]',
  };

  return (
    <button
      className={`
        rounded-3xl font-bold transition-all duration-150 transform
        active:translate-y-1 active:shadow-none active:scale-95
        flex items-center justify-center gap-2
        ${colorClasses[color]}
        ${sizeClasses[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};