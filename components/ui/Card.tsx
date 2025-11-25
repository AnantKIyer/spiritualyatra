import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-xl overflow-hidden
        ${hover ? 'transition-all duration-200 hover:shadow-lg' : 'shadow-sm'}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

