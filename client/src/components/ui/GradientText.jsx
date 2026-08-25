import React from 'react';

const GradientText = ({ children, className = '', as: Tag = 'span' }) => {
  return (
    <Tag className={`gradient-text ${className}`}>
      {children}
    </Tag>
  );
};

export default GradientText;
