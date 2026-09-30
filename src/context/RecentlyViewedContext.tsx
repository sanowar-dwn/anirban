import React, { createContext, useContext, useEffect, useState } from 'react';

interface RecentlyViewedContextType {
  recentlyViewedSlugs: string[];
  addRecentlyViewed: (slug: string) => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

const STORAGE_KEY = 'anirban_recently_viewed_animals';

export const RecentlyViewedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recentlyViewedSlugs, setRecentlyViewedSlugs] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recentlyViewedSlugs));
    } catch (e) {
      console.warn('Failed to save recently viewed to localStorage', e);
    }
  }, [recentlyViewedSlugs]);

  const addRecentlyViewed = (slug: string) => {
    setRecentlyViewedSlugs(prev => {
      const filtered = prev.filter(s => s !== slug);
      return [slug, ...filtered].slice(0, 6);
    });
  };

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewedSlugs, addRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
};
