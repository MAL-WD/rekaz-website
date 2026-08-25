import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, variant = 'primary', className = '', to, onClick, type = 'button', style = {} }) => {
  const baseStyle = 'inline-flex items-center justify-center font-satoshi font-medium transition-all duration-300 cursor-pointer text-center';
  
  const gradientBlueStyle = {
    background: 'linear-gradient(160deg, rgb(0, 165, 255) 0%, rgb(4, 18, 250) 100%)',
    boxShadow: '0 4px 20px rgba(0,165,255,0.30), inset 0 1px 0 rgba(255,255,255,0.15)',
    ...style
  };

  const variants = {
    primary: 'text-white rounded-[16px] hover:shadow-[0_10px_28px_rgba(4,18,250,0.38)] hover:brightness-108 hover:-translate-y-0.5 hover:scale-[1.01] px-6 py-3',
    cta: 'text-white rounded-[16px] hover:shadow-[0_12px_32px_rgba(4,18,250,0.44)] hover:brightness-108 hover:-translate-y-1 hover:scale-[1.01] px-8 py-4 text-[16px] font-semibold tracking-[-0.01em]',
    secondary: 'bg-rekaz-black text-white rounded-[16px] hover:bg-[#1a1a1a] shadow-[0_2px_12px_rgba(0,0,0,0.15)] px-6 py-3 hover:-translate-y-0.5',
    white: 'bg-white text-rekaz-dark rounded-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.10)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.14)] hover:-translate-y-0.5 px-8 py-4',
    outline: 'ring-1 ring-rekaz-border text-rekaz-dark rounded-[16px] hover:ring-rekaz-cyan hover:text-rekaz-cyan bg-white hover:bg-[rgba(0,165,255,0.03)] px-6 py-3 hover:-translate-y-0.5'
  };

  const isGradient = variant === 'primary' || variant === 'cta';
  const customStyle = isGradient ? gradientBlueStyle : style;
  const classes = `${baseStyle} ${variants[variant] || variants.primary} ${className}`;

  if (to) {
    return <Link to={to} className={classes} style={customStyle}>{children}</Link>;
  }

  return (
    <button type={type} onClick={onClick} className={classes} style={customStyle}>
      {children}
    </button>
  );
};

export default Button;
