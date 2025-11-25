import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-airbnb-black mb-2">
          {label}
          {props.required && <span className="text-airbnb-red ml-1">*</span>}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-airbnb-red focus:border-airbnb-red
          ${error ? 'border-airbnb-red' : 'border-airbnb-border'}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-airbnb-red">{error}</p>
      )}
    </div>
  );
}

