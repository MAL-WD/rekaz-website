import React from 'react';

const Container = ({ children, className = '' }) => {
  return (
    <div className={`max-w-[1150px] mx-auto px-5 lg:px-8 w-full ${className}`}>
      {children}
    </div>
  );
};

export default Container;
