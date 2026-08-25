import React from 'react';

const Card = React.forwardRef(({ children, className = '', variant = 'default', style }, ref) => {
  const variants = {
    default: 'bg-white rounded-card ring-1 ring-black/[0.05] shadow-[0_2px_16px_rgba(0,0,0,0.05)] transition-shadow duration-300',
    glass: 'glass-card rounded-card',
    sm: 'bg-white rounded-card-sm ring-1 ring-black/[0.05] shadow-sm transition-shadow duration-300',
    featured: 'bg-gradient-to-br from-white to-[rgba(0,165,255,0.04)] rounded-card ring-1 ring-rekaz-blue/[0.08] shadow-[0_4px_24px_rgba(0,165,255,0.08)] transition-shadow duration-300',
  };

  return (
    <div ref={ref} style={style} className={`${variants[variant] || variants.default} ${className}`}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
