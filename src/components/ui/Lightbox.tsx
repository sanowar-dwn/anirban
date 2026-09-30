import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  title?: string;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  title
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-md">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      {images.length > 1 && (
        <button
          onClick={onPrev}
          className="absolute left-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Main image */}
      <div className="relative max-w-5xl max-h-[85vh] flex flex-col items-center">
        <img
          src={images[currentIndex]}
          alt={title || `Image ${currentIndex + 1}`}
          className="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        />
        {title && (
          <p className="mt-4 text-sm font-medium text-white/90 text-center bg-black/40 px-4 py-1.5 rounded-full">
            {title} ({currentIndex + 1} of {images.length})
          </p>
        )}
      </div>

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={onNext}
          className="absolute right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};
