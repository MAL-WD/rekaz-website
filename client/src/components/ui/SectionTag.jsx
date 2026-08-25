import React from 'react';

const SectionTag = ({ text, icon, className = '' }) => {
  return (
    <div className={`inline-flex items-center w-fit gap-2 px-4 py-1.5 rounded-pill border border-rekaz-blue/15 bg-white shadow-[0_1px_8px_rgba(4,18,250,0.07)] ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-rekaz-gradient-r flex-shrink-0" style={{ background: 'linear-gradient(135deg,#00a5ff,#0412fa)' }} />
      {icon && <span className="flex-shrink-0 gradient-text">{icon}</span>}
      <span className="font-inter uppercase text-[10px] font-bold tracking-[0.1em] gradient-text">{text}</span>
    </div>
  );
};

export default SectionTag;

