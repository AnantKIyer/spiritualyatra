import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  className?: string;
}

export default function Card({
  children,
  hover = false,
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg border border-primary-200 overflow-hidden transition-all duration-200",
        hover && "hover:material-elevation-3 hover:-translate-y-1",
        !hover && "material-elevation-2",
        className
      )}
    >
      {children}
    </div>
  );
}
