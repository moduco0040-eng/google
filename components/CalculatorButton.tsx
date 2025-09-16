import React from 'react';

interface CalculatorButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({ onClick, children, className = '' }) => {
  const baseClasses = "text-3xl md:text-4xl rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200 focus:ring-rose-500 transition-all duration-150 transform active:scale-95 flex items-center justify-center font-medium";
  const defaultClasses = "bg-gray-50/80 hover:bg-gray-200/80 text-gray-800 aspect-square";
  
  const combinedClasses = `${baseClasses} ${className.includes('bg-') ? '' : defaultClasses} ${className}`;

  return (
    <button
      onClick={onClick}
      className={combinedClasses}
    >
      {children}
    </button>
  );
};

export default CalculatorButton;