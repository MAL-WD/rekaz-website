import { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-dark/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full ${sizes[size]} bg-surface rounded-2xl shadow-2xl border border-border max-h-[90vh] flex flex-col`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h3 className="text-lg font-semibold text-dark">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-border/50 transition-colors text-muted"
          >
            <X size={18} />
          </button>
        </div>
        {/* Body */}
        <div className="overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
