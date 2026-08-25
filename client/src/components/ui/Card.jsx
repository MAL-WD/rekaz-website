import React from 'react';

const Card = ({ children, className = '', variant = 'default' }) => {
  const variants = {
    default: 'bg-white rounded-card shadow-[0_1px_32px_rgba(0,0,0,0.03)]',
    glass: 'bg-white/80 backdrop-blur-md rounded-card border border-white/20',
    sm: 'bg-white rounded-card-sm shadow-sm',
  };

  return (
    <div className={`${variants[variant] || variants.default} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
