import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-xs text-[#75837B] py-2 overflow-x-auto ${className}`}>
      <ol className="flex items-center space-x-2 whitespace-nowrap">
        <li>
          <Link to="/" className="hover:text-[#1A382B] flex items-center transition-colors">
            <Home className="w-3.5 h-3.5 mr-1" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center space-x-2">
              <ChevronRight className="w-3 h-3 text-[#9AA7A0]" />
              {isLast || !item.href ? (
                <span className="font-medium text-[#1E2421]" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link to={item.href} className="hover:text-[#1A382B] transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
