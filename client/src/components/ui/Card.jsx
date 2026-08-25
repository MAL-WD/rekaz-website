import React from 'react';

const Card = React.forwardRef(({ children, className = '', variant = 'default', style }, ref) => {
  const variants = {
    default: 'bg-white rounded-card shadow-[0_1px_32px_rgba(0,0,0,0.03)]',
    glass: 'bg-white/80 backdrop-blur-md rounded-card border border-white/20',
    sm: 'bg-white rounded-card-sm shadow-sm',
  };

  return (
    <div ref={ref} style={style} className={`${variants[variant] || variants.default} ${className}`}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
