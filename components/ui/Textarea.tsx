import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-airbnb-black mb-2">
          {label}
          {props.required && <span className="text-airbnb-red ml-1">*</span>}
        </label>
      )}
      <textarea
        className={`
          w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-airbnb-red focus:border-airbnb-red
          ${error ? 'border-airbnb-red' : 'border-airbnb-border'}
          ${className}
        `}
        rows={4}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-airbnb-red">{error}</p>
      )}
    </div>
  );
}

