import React from "react";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  fullWidth = false,
  children,
  className = "",
  disabled,
  ...rest
}) => {
  const base =
    "inline-flex items-center justify-center font-body font-semibold uppercase tracking-widest transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-[#F5A623] text-[#0B1F3A] hover:bg-[#e09510] active:bg-[#c8840e] focus:ring-[#F5A623] border-2 border-transparent",
    secondary:
      "bg-[#0B1F3A] text-white hover:bg-[#122b52] active:bg-[#0a1a2f] focus:ring-[#0B1F3A] border-2 border-transparent",
    outline:
      "bg-transparent text-[#0B1F3A] border-2 border-[#0B1F3A] hover:bg-[#0B1F3A] hover:text-white active:bg-[#122b52] focus:ring-[#0B1F3A]",
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "text-xs px-4 py-2 gap-1.5",
    md: "text-sm px-6 py-3 gap-2",
    lg: "text-base px-8 py-4 gap-2.5",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      disabled={disabled}
      {...rest}
    >
      {icon && iconPosition === "left" && (
        <span className="flex-shrink-0 flex items-center">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="flex-shrink-0 flex items-center">{icon}</span>
      )}
    </button>
  );
};

export default Button;