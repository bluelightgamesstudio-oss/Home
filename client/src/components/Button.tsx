import { forwardRef } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ 
  children, 
  className = "", 
  variant = 'primary', 
  size = 'md',
  isLoading = false,
  disabled,
  ...props 
}, ref) => {
  
  const baseStyles = "relative inline-flex items-center justify-center font-display font-bold uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed clip-path-polygon";
  
  const variants = {
    primary: "bg-primary text-background hover:bg-white hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]",
    outline: "border border-primary/50 text-primary hover:bg-primary/10 hover:border-primary",
    ghost: "text-foreground hover:text-primary hover:bg-white/5",
  };

  const sizes = {
    sm: "text-xs px-4 py-2",
    md: "text-sm px-6 py-3",
    lg: "text-base px-8 py-4",
  };

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      style={{ 
        clipPath: variant !== 'ghost' ? 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' : 'none' 
      }}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
});

Button.displayName = "Button";
