import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'terracotta' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] select-none';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5 shadow-sm'
  };

  const variantStyles = {
    primary: 'bg-[#1A382B] text-[#FAF8F5] hover:bg-[#132E22] focus:ring-[#1A382B]',
    terracotta: 'bg-[#C65332] text-[#FAF8F5] hover:bg-[#A74327] focus:ring-[#C65332] shadow-sm hover:shadow',
    secondary: 'bg-[#EAE4D7] text-[#1E2421] hover:bg-[#D8CEBE] focus:ring-[#75837B]',
    outline: 'border border-[#D8CEBE] bg-transparent text-[#1E2421] hover:bg-[#F3EFE8] focus:ring-[#1A382B]',
    ghost: 'bg-transparent text-[#1E2421] hover:bg-[#F3EFE8]/70 focus:ring-[#1A382B]',
    danger: 'bg-[#A74327] text-white hover:bg-[#893720] focus:ring-[#A74327]'
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        icon && <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
    </button>
  );
};
