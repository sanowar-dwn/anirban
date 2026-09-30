import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'lg'
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#0B1A13]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
        <div 
          className={`w-full ${maxWidthClasses[maxWidth]} transform overflow-hidden rounded-2xl bg-[#FAF8F5] p-6 text-left align-middle shadow-2xl transition-all border border-[#D8CEBE] animate-in fade-in zoom-in-95 duration-200`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between pb-4 border-b border-[#EAE4D7]">
            {title ? (
              <h3 className="text-xl font-serif font-semibold text-[#1E2421]">{title}</h3>
            ) : <div />}
            <button
              type="button"
              className="rounded-full p-1.5 text-[#59655E] hover:bg-[#F3EFE8] hover:text-[#1E2421] transition-colors"
              onClick={onClose}
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
