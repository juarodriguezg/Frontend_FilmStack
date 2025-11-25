import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:outline-none focus:ring-2 text-white placeholder-gray-500 transition-all text-sm sm:text-base ${
            error ? 'border-2' : 'border'
          } ${className}`}
          style={{
            backgroundColor: 'var(--color-primary-2)',
            borderColor: error ? '#ef4444' : 'var(--color-primary-3)',
            ...(error ? {} : { '--tw-ring-color': 'var(--color-primary-4)' } as any)
          }}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs sm:text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';