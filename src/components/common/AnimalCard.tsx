import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { Animal } from '../../types';
import { Badge } from '../ui/Badge';
import { useFavorites } from '../../context/FavoritesContext';
import { useToast } from '../../context/ToastContext';

interface AnimalCardProps {
  animal: Animal;
  layout?: 'grid' | 'list';
}

export const AnimalCard: React.FC<AnimalCardProps> = ({ animal, layout = 'grid' }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();
  const favorited = isFavorite(animal.slug);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(animal.slug);
    showToast(
      favorited 
        ? `Removed ${animal.name} from saved animals` 
        : `Saved ${animal.name} to your favorites!`,
      'info'
    );
  };

  if (layout === 'list') {
    return (
      <div className="group bg-[#FAF8F5] rounded-2xl border border-[#D8CEBE]/80 overflow-hidden hover:border-[#1A382B]/50 transition-all duration-300 hover:shadow-md flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative w-full md:w-72 h-56 md:h-auto shrink-0 overflow-hidden bg-[#EAE4D7]">
          <img
            src={animal.featuredImage}
            alt={animal.name}
            loading="lazy"
            className="w-full h-full object-cover img-zoom"
          />
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-[#1E2421] transition-transform active:scale-90 shadow-sm"
            aria-label={favorited ? `Unsave ${animal.name}` : `Save ${animal.name}`}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'text-[#C65332] fill-[#C65332]' : 'text-[#3E4742]'}`} />
          </button>
          {animal.isBiraalBariResident && (
            <div className="absolute bottom-3 left-3 bg-[#1A382B]/90 backdrop-blur-xs text-[#FAF8F5] text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
              Biraal Bari Sanctuary
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-2xl font-bold text-[#1E2421] group-hover:text-[#1A382B] transition-colors">
                  {animal.name}
                </h3>
                <span className="text-xs text-[#75837B]">({animal.gender} · {animal.age})</span>
              </div>
              <Badge variant="status" status={animal.status}>
                {animal.status}
              </Badge>
            </div>

            <p className="text-xs text-[#75837B] flex items-center gap-1 mb-3">
              <MapPin className="w-3.5 h-3.5 text-[#C65332]" />
              {animal.location}
            </p>

            <p className="text-sm text-[#3E4742] line-clamp-2 italic mb-4">
              "{animal.shortDescription}"
            </p>

            {/* Personality tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {animal.personality.slice(0, 4).map((tag, idx) => (
                <span key={idx} className="text-xs bg-[#F3EFE8] text-[#3E4742] px-2.5 py-0.5 rounded-full font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#EAE4D7] flex items-center justify-between">
            <span className="text-xs font-medium text-[#75837B]">
              Rescued: {new Date(animal.rescueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </span>
            <Link
              to={`/animals/${animal.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1A382B] hover:text-[#C65332] transition-colors"
            >
              <span>Meet {animal.name}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Grid layout (Default)
  return (
    <div className="group bg-[#FAF8F5] rounded-2xl border border-[#D8CEBE]/80 overflow-hidden hover:border-[#1A382B]/40 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Photo frame */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EAE4D7]">
        <img
          src={animal.featuredImage}
          alt={animal.name}
          loading="lazy"
          className="w-full h-full object-cover img-zoom"
        />

        {/* Favorite heart icon */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3.5 right-3.5 p-2 rounded-full bg-[#FAF8F5]/90 hover:bg-white text-[#1E2421] transition-all active:scale-90 shadow-sm z-10"
          aria-label={favorited ? `Unsave ${animal.name}` : `Save ${animal.name}`}
        >
          <Heart className={`w-4 h-4 ${favorited ? 'text-[#C65332] fill-[#C65332]' : 'text-[#3E4742]'}`} />
        </button>

        {/* Status Badge */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <Badge variant="status" status={animal.status}>
            {animal.status}
          </Badge>
        </div>

        {/* Biraal Bari tag */}
        {animal.isBiraalBariResident && (
          <div className="absolute bottom-3 left-3 bg-[#132E22]/90 backdrop-blur-xs text-[#FAF8F5] text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <Sparkles className="w-3 h-3 text-[#F2B73B]" />
            <span>Biraal Bari Resident</span>
          </div>
        )}
      </div>

      {/* Info Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <h3 className="font-serif text-2xl font-bold text-[#1E2421] group-hover:text-[#1A382B] transition-colors">
              {animal.name}
            </h3>
            <span className="text-xs font-medium text-[#75837B]">
              {animal.gender} · {animal.age}
            </span>
          </div>

          <p className="text-xs text-[#75837B] flex items-center gap-1 mb-3">
            <MapPin className="w-3 h-3 text-[#C65332]" />
            <span className="truncate">{animal.location}</span>
          </p>

          <p className="text-xs text-[#3E4742] line-clamp-2 italic mb-4 leading-relaxed">
            "{animal.shortDescription}"
          </p>

          {/* Personality tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {animal.personality.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="text-[11px] bg-[#F3EFE8] text-[#59655E] px-2 py-0.5 rounded-md font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="pt-4 mt-2 border-t border-[#EAE4D7] flex items-center justify-between">
          <span className="text-[11px] text-[#75837B]">
            {animal.species} · {animal.breed}
          </span>
          <Link
            to={`/animals/${animal.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#1A382B] group-hover:text-[#C65332] transition-colors"
          >
            <span>Meet {animal.name}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
