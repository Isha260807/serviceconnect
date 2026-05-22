import React from 'react';
import { cn } from '../../utils/cn';

const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  ...props 
}, ref) => {
  const variants = {
    primary: 'bg-[#FFE37D] text-slate-900 hover:bg-[#F5D555] shadow-lg shadow-yellow-400/25 active:bg-[#EDCB3A] font-bold',
    secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 active:bg-slate-100',
    outline: 'bg-transparent text-yellow-700 border-2 border-[#FFE37D] hover:bg-primary-50 active:bg-primary-100 font-semibold',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 active:bg-slate-200',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20 active:bg-red-700',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-6 py-2.5 text-base rounded-xl',
    lg: 'px-8 py-3.5 text-lg rounded-2xl',
    icon: 'p-2.5 rounded-xl',
  };

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none gap-2 select-none',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {leftIcon && <span className="w-5 h-5 flex items-center justify-center">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="w-5 h-5 flex items-center justify-center">{rightIcon}</span>}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
