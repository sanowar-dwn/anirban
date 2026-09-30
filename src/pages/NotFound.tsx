import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, ArrowLeft, Home } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-[#FAF8F5] border border-[#D8CEBE] flex items-center justify-center text-[#C65332] mx-auto shadow-md">
          <PawPrint className="w-10 h-10 text-[#C65332]" />
        </div>

        <span className="text-xs uppercase tracking-widest font-bold text-[#75837B] block">
          404 Error · Lost Track
        </span>

        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1E2421]">
          Even Rescuers Sometimes Get Lost.
        </h1>

        <p className="text-sm text-[#59655E] leading-relaxed">
          The page or animal profile you were looking for doesn't exist or has moved. Let's get you back to safety.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="primary" size="md" className="w-full sm:w-auto" icon={<Home className="w-4 h-4" />}>
              Back to Homepage
            </Button>
          </Link>
          <Link to="/animals" className="w-full sm:w-auto">
            <Button variant="outline" size="md" className="w-full sm:w-auto">
              Browse Animals
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
