import React, { useState } from 'react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Lightbox } from '../components/ui/Lightbox';
import { galleryData } from '../data/gallery';
import { GalleryItem } from '../types';
import { Eye, Calendar, Sparkles } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Biraal Bari', 'Rescue', 'Adoption', 'Volunteers', 'Events'];

  const filteredItems = selectedCategory === 'All'
    ? galleryData
    : galleryData.filter(item => item.category === selectedCategory);

  const allImages = filteredItems.map(item => item.imageUrl);

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      {/* Header */}
      <section className="bg-[#FAF8F5] border-b border-[#EAE4D7] pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Visual Gallery' }]} className="mb-6" />

          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest font-bold text-[#C65332] mb-1.5 block">
              Life Through The Lens
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-[#1E2421]">
              Moments of Rescue & Hope
            </h1>
            <p className="text-sm sm:text-base text-[#59655E] mt-2">
              A visual archive documenting sanctuary mornings at Biraal Bari, emergency field rescues in Dhaka, volunteer days, and happy adoption celebrations.
            </p>
          </div>

          {/* Filter Pills */}
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

      {/* Modern Masonry-Style Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxIndex(idx)}
              className="group relative rounded-3xl overflow-hidden bg-[#FAF8F5] border border-[#D8CEBE] shadow-xs cursor-pointer hover:border-[#1A382B]/50 transition-all duration-300"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#EAE4D7]">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover img-zoom"
                />
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#F2B73B] mb-1">
                  {item.category} · {item.date}
                </span>
                <h3 className="font-serif text-lg font-bold leading-snug">{item.title}</h3>
                <p className="text-xs text-white/80 mt-1 line-clamp-2">{item.caption}</p>
                <div className="pt-2 flex items-center gap-1 text-[11px] text-[#7DC0A4]">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Click to expand</span>
                </div>
              </div>

              {/* Mobile permanent caption bar */}
              <div className="p-4 sm:hidden bg-[#FAF8F5]">
                <span className="text-[10px] uppercase font-bold text-[#C65332] block">{item.category}</span>
                <h4 className="font-serif text-base font-bold text-[#1E2421]">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        isOpen={activeLightboxIndex !== null}
        images={allImages}
        currentIndex={activeLightboxIndex || 0}
        onClose={() => setActiveLightboxIndex(null)}
        onPrev={() => setActiveLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : allImages.length - 1))}
        onNext={() => setActiveLightboxIndex((prev) => (prev !== null && prev < allImages.length - 1 ? prev + 1 : 0))}
        title={activeLightboxIndex !== null ? filteredItems[activeLightboxIndex]?.title : undefined}
      />
    </div>
  );
};
