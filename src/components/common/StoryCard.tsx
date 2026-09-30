import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { Story } from '../../types';

interface StoryCardProps {
  story: Story;
  featured?: boolean;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, featured = false }) => {
  if (featured) {
    return (
      <div className="group relative bg-[#FAF8F5] rounded-3xl border border-[#D8CEBE] overflow-hidden hover:border-[#1A382B]/40 hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0">
        <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-full overflow-hidden bg-[#EAE4D7]">
          <img
            src={story.heroImage}
            alt={story.title}
            className="w-full h-full object-cover img-zoom"
          />
          <div className="absolute top-4 left-4 bg-[#132E22]/90 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            Featured Story
          </div>
        </div>

        <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 text-xs text-[#75837B] mb-3">
              <span className="font-semibold text-[#C65332] uppercase tracking-wider">
                {story.category}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {story.readTime}
              </span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E2421] leading-tight group-hover:text-[#1A382B] transition-colors mb-4">
              {story.title}
            </h3>

            <p className="text-sm text-[#59655E] leading-relaxed mb-6">
              {story.summary}
            </p>
          </div>

          <div className="pt-6 border-t border-[#EAE4D7] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={story.author.avatar}
                alt={story.author.name}
                className="w-10 h-10 rounded-full object-cover border border-[#D8CEBE]"
              />
              <div>
                <p className="text-xs font-bold text-[#1E2421]">{story.author.name}</p>
                <p className="text-[11px] text-[#75837B]">{story.publishedDate}</p>
              </div>
            </div>

            <Link
              to={`/stories/${story.slug}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#1A382B] group-hover:text-[#C65332] transition-colors"
            >
              <span>Read Story</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Standard card
  return (
    <div className="group bg-[#FAF8F5] rounded-2xl border border-[#D8CEBE]/80 overflow-hidden hover:border-[#1A382B]/40 hover:shadow-md transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#EAE4D7]">
        <img
          src={story.heroImage}
          alt={story.title}
          loading="lazy"
          className="w-full h-full object-cover img-zoom"
        />
        <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs text-[#1E2421] text-[11px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          {story.category}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11px] text-[#75837B] mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {story.publishedDate}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {story.readTime}
            </span>
          </div>

          <h3 className="font-serif text-xl font-bold text-[#1E2421] group-hover:text-[#1A382B] transition-colors mb-2 line-clamp-2">
            {story.title}
          </h3>

          <p className="text-xs text-[#59655E] line-clamp-3 leading-relaxed mb-4">
            {story.summary}
          </p>
        </div>

        <div className="pt-4 border-t border-[#EAE4D7] flex items-center justify-between">
          <span className="text-xs text-[#75837B] font-medium truncate max-w-[150px]">
            {story.author.name}
          </span>
          <Link
            to={`/stories/${story.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#1A382B] group-hover:text-[#C65332] transition-colors"
          >
            <span>Read Story</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
