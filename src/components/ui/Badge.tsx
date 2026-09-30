import React from 'react';
import { AnimalStatus } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'status' | 'category' | 'species' | 'tag' | 'urgent';
  status?: AnimalStatus;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'tag',
  status,
  className = ''
}) => {
  if (variant === 'status' && status) {
    const statusStyles: Record<AnimalStatus, string> = {
      'Available for Adoption': 'bg-[#EDF8F3] text-[#1D4336] border-[#B0DECB]',
      'Sanctuary Resident': 'bg-[#FDF5F2] text-[#893720] border-[#FACFC2]',
      'Under Care': 'bg-[#FBE6AA]/30 text-[#89570B] border-[#F2B73B]/50',
      'Recently Rescued': 'bg-[#FDF5F2] text-[#C65332] border-[#F2AA93]',
      'Adopted': 'bg-[#EAE4D7] text-[#59655E] border-[#D8CEBE]'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${statusStyles[status]} ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-70 animate-pulse"></span>
        {children}
      </span>
    );
  }

  if (variant === 'urgent') {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FACFC2] text-[#893720] border border-[#F2AA93] ${className}`}>
        {children}
      </span>
    );
  }

  if (variant === 'category') {
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium tracking-wide uppercase bg-[#FAF8F5] text-[#1A382B] border border-[#D8CEBE] ${className}`}>
        {children}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-normal bg-[#F3EFE8] text-[#3E4742] ${className}`}>
      {children}
    </span>
  );
};
