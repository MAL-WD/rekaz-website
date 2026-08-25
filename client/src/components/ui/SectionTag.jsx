import React from 'react';

const SectionTag = ({ text, icon, className = '' }) => {
  return (
    <div className={`inline-flex items-center w-fit gap-2 px-4 py-1.5 rounded-pill bg-rekaz-gradient-r shadow-sm ${className}`}>
      {icon && <span className="flex-shrink-0 text-white">{icon}</span>}
      <span className="font-inter uppercase text-xs font-semibold tracking-wider text-white">{text}</span>
    </div>
  );
};

export default SectionTag;

