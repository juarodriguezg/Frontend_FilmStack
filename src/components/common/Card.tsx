import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  return (
    <div
      className={`rounded-xl shadow-lg ${
        hover ? 'hover:shadow-2xl hover:scale-105 transition-all duration-300' : ''
      } ${className}`}
      style={{
        backgroundColor: 'var(--color-primary-1)'
      }}
    >
      {children}
    </div>
  );
};