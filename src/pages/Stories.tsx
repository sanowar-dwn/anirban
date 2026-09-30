import React, { useEffect, useState } from 'react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { StoryCard } from '../components/common/StoryCard';
import { storiesService } from '../services/stories';
import { Story } from '../types';
import { StoryCardSkeleton } from '../components/ui/LoadingSkeleton';

export const Stories: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'Rescue Stories',
    'Sanctuary',
    'Adoption Stories',
    'Education'
  ];

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await storiesService.getStories(selectedCategory);
        setStories(data);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [selectedCategory]);

  const featuredStory = stories.find(s => s.isFeatured) || stories[0];
  const regularStories = stories.filter(s => s.id !== featuredStory?.id);

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      {/* Header */}
      <section className="bg-[#FAF8F5] border-b border-[#EAE4D7] pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Stories & Insights' }]} className="mb-6" />

          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest font-bold text-[#C65332] mb-1.5 block">
              Editorial & Journals
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-[#1E2421]">
              Rescue Stories & Sanctuary Insights
            </h1>
            <p className="text-sm sm:text-base text-[#59655E] mt-2">
              Deep dives into individual rescues, sanctuary milestones at Biraal Bari, and responsible urban animal welfare science in Bangladesh.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-8 pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#1A382B] text-white shadow-xs'
                    : 'bg-[#FAF8F5] text-[#59655E] border border-[#D8CEBE] hover:bg-[#F3EFE8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Listing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {loading ? (
          <div className="space-y-8">
            <div className="h-96 bg-[#EAE4D7] rounded-3xl animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(n => <StoryCardSkeleton key={n} />)}
            </div>
          </div>
        ) : (
          <>
            {/* Dominant Featured Story */}
            {featuredStory && selectedCategory === 'All' && (
              <div>
                <StoryCard story={featuredStory} featured />
              </div>
            )}

            {/* Remaining Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(selectedCategory === 'All' ? regularStories : stories).map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};
