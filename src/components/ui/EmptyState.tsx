import React from 'react';
import { SearchX } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-[#D8CEBE] bg-[#FDFCF9] ${className}`}>
      <div className="w-16 h-16 rounded-full bg-[#F3EFE8] flex items-center justify-center text-[#59655E] mb-4">
        {icon || <SearchX className="w-8 h-8 text-[#A74327]" />}
      </div>
      <h3 className="text-xl font-serif font-medium text-[#1E2421] mb-2">{title}</h3>
      <p className="text-sm text-[#59655E] max-w-md mb-6">{description}</p>
      {actionText && onAction && (
        <Button variant="secondary" size="md" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
