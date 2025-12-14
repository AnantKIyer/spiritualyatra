import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 uppercase tracking-wide";

  const variants = {
    primary:
      "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 material-elevation-2 hover:material-elevation-3 active:material-elevation-1",
    secondary:
      "bg-red-400 text-white hover:bg-red-500 focus:ring-red-400 material-elevation-2 hover:material-elevation-3 active:material-elevation-1",
    outline:
      "border-2 border-red-300 text-red-600 hover:bg-red-50 focus:ring-red-300 bg-white material-elevation-1 hover:material-elevation-2",
  };

  const sizes = {
    sm: "px-6 py-2.5 text-xs",
    md: "px-8 py-3 text-sm",
    lg: "px-10 py-4 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
