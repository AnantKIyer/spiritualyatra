import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = false,
}: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-lg overflow-hidden
        border border-primary-200
        flex flex-col
        ${hover ? "material-elevation-2" : "material-elevation-1"}
        ${
          hover
            ? "transition-all duration-200 hover:material-elevation-3 hover:-translate-y-1"
            : ""
        }
        ${className}
      `}
      style={{ minHeight: "500px" }}
    >
      {children}
    </div>
  );
}
