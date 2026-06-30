import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "outline-light";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center";

  const variantStyles = {
    primary:
      "bg-saffron-500 hover:bg-saffron-600 text-white focus:ring-saffron-500 shadow-md hover:shadow-indian-lg",
    outline:
      "border-2 border-ink-300 hover:border-saffron-500 text-ink-800 hover:text-saffron-600 bg-white hover:bg-saffron-50 focus:ring-saffron-500",
    "outline-light":
      "border-2 border-white/40 text-white bg-white/10 hover:bg-white/20 hover:border-white/60 focus:ring-white/50",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
