import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Heart, ArrowRight } from 'lucide-react';
import { animalsData } from '../../data/animals';
import { storiesData } from '../../data/stories';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  const cleanQuery = query.toLowerCase().trim();

  const filteredAnimals = cleanQuery
    ? animalsData.filter(a =>
        a.name.toLowerCase().includes(cleanQuery) ||
        a.breed.toLowerCase().includes(cleanQuery) ||
        a.species.toLowerCase().includes(cleanQuery) ||
        a.personality.some(p => p.toLowerCase().includes(cleanQuery))
      ).slice(0, 4)
    : [];

  const filteredStories = cleanQuery
    ? storiesData.filter(s =>
        s.title.toLowerCase().includes(cleanQuery) ||
        s.category.toLowerCase().includes(cleanQuery) ||
        s.summary.toLowerCase().includes(cleanQuery)
      ).slice(0, 3)
    : [];

  const quickLinks = [
    { title: 'Biraal Bari Sanctuary', path: '/biraal-bari', desc: 'Our dedicated haven for special-needs cats' },
    { title: 'Adopt an Animal', path: '/adopt', desc: 'Requirements and application process' },
    { title: 'Report a Rescue', path: '/report-rescue', desc: 'Emergency response for animals in distress' },
    { title: 'Donate & Support', path: '/donate', desc: 'Help fund surgical and nutritional care' }
  ];

  const handleSelectAnimal = (slug: string) => {
    navigate(`/animals/${slug}`);
    onClose();
  };

  const handleSelectStory = (slug: string) => {
    navigate(`/stories/${slug}`);
    onClose();
  };

  const handleSelectLink = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="2xl">
      <div className="space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#75837B]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search animals, stories, sanctuary care..."
            className="w-full bg-[#F3EFE8] border border-[#D8CEBE] rounded-xl pl-11 pr-10 py-3 text-sm text-[#1E2421] placeholder-[#75837B] focus:outline-none focus:ring-2 focus:ring-[#1A382B] transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#75837B] hover:text-[#1E2421]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results area */}
        <div className="max-h-[60vh] overflow-y-auto space-y-6 pt-2 pr-1">
          {query.trim() === '' ? (
            <div>
              <p className="text-xs font-semibold text-[#75837B] uppercase tracking-wider mb-2">Quick Destinations</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {quickLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => handleSelectLink(link.path)}
                    className="flex flex-col text-left p-3 rounded-xl border border-[#EAE4D7] hover:border-[#1A382B]/40 hover:bg-[#F3EFE8] transition-all group"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-sm font-medium text-[#1E2421] group-hover:text-[#1A382B]">{link.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#75837B] group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <span className="text-xs text-[#59655E] mt-1">{link.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Animals result */}
              {filteredAnimals.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-[#75837B] uppercase tracking-wider mb-2">
                    Animals ({filteredAnimals.length})
                  </p>
                  <div className="space-y-2">
                    {filteredAnimals.map((animal) => (
                      <div
                        key={animal.id}
                        onClick={() => handleSelectAnimal(animal.slug)}
                        className="flex items-center justify-between p-2.5 rounded-xl border border-[#EAE4D7] hover:bg-[#F3EFE8] cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={animal.featuredImage}
                            alt={animal.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-[#1E2421]">{animal.name}</span>
                              <Badge variant="status" status={animal.status}>{animal.status}</Badge>
                            </div>
                            <p className="text-xs text-[#59655E]">{animal.species} · {animal.gender} · {animal.age}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#75837B]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stories result */}
              {filteredStories.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-[#75837B] uppercase tracking-wider mb-2">
                    Stories & Articles ({filteredStories.length})
                  </p>
                  <div className="space-y-2">
                    {filteredStories.map((story) => (
                      <div
                        key={story.id}
                        onClick={() => handleSelectStory(story.slug)}
                        className="flex items-center justify-between p-2.5 rounded-xl border border-[#EAE4D7] hover:bg-[#F3EFE8] cursor-pointer transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] uppercase font-semibold text-[#C65332] tracking-wider">{story.category}</span>
                            <span className="text-xs text-[#75837B]">· {story.readTime}</span>
                          </div>
                          <p className="text-sm font-medium text-[#1E2421]">{story.title}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#75837B] shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No match state */}
              {filteredAnimals.length === 0 && filteredStories.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-sm text-[#59655E]">No animals or stories matching "<span className="font-semibold text-[#1E2421]">{query}</span>"</p>
                  <button
                    onClick={() => {
                      navigate(`/animals?q=${encodeURIComponent(query)}`);
                      onClose();
                    }}
                    className="mt-3 text-xs font-medium text-[#1A382B] underline"
                  >
                    Search in full Animal Directory
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};
