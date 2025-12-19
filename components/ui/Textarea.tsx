import React from "react";
import { cn } from "@/lib/utils";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function Textarea({
  label,
  error,
  className,
  ...props
}: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-airbnb-black mb-2">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          "w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 resize-none",
          error
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-primary-300 focus:ring-accent-500 focus:border-accent-500",
          "text-airbnb-black placeholder-primary-400",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
