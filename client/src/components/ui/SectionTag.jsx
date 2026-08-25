import React from 'react';

const SectionTag = ({ text, icon }) => {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill border border-rekaz-border bg-white shadow-sm">
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="font-inter uppercase text-xs font-semibold tracking-wider text-rekaz-cyan">{text}</span>
    </div>
  );
};

export default SectionTag;
