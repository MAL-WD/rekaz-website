import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, variant = 'primary', className = '', to, onClick, type = 'button', style = {} }) => {
  const baseStyle = 'inline-flex items-center justify-center font-satoshi font-medium transition-all duration-300 cursor-pointer text-center';
  
  const gradientBlueStyle = {
    background: 'linear-gradient(180deg, rgb(0, 165, 255) 0%, rgb(4, 18, 250) 100%)',
    ...style
  };

  const variants = {
    primary: 'text-white rounded-[14px] shadow-[0_4px_16px_rgba(0,165,255,0.32)] hover:shadow-[0_8px_24px_rgba(4,18,250,0.42)] hover:brightness-105 hover:-translate-y-0.5 px-6 py-3',
    cta: 'text-white rounded-[14px] shadow-[0_6px_20px_rgba(0,165,255,0.38)] hover:shadow-[0_10px_28px_rgba(4,18,250,0.48)] hover:brightness-105 hover:-translate-y-0.5 px-8 py-3.5 text-[16px] font-semibold tracking-[-0.01em]',
    secondary: 'bg-rekaz-black text-white rounded-[14px] hover:bg-rekaz-dark px-6 py-3 hover:-translate-y-0.5',
    white: 'bg-white text-rekaz-dark rounded-[14px] shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 px-8 py-4',
    outline: 'border border-rekaz-border text-rekaz-dark rounded-[14px] hover:border-rekaz-cyan hover:text-rekaz-cyan px-6 py-3 hover:-translate-y-0.5'
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
