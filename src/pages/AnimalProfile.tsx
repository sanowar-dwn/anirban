import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Share2, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Home, 
  Activity, 
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { animalsService } from '../services/animals';
import { Animal } from '../types';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { MedicalTimeline } from '../components/common/MedicalTimeline';
import { AnimalCard } from '../components/common/AnimalCard';
import { Lightbox } from '../components/ui/Lightbox';
import { ShareModal } from '../components/ui/ShareModal';
import { useFavorites } from '../context/FavoritesContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { useToast } from '../context/ToastContext';

export const AnimalProfile: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [relatedAnimals, setRelatedAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  // Gallery & Lightbox
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const { isFavorite, toggleFavorite } = useFavorites();
  const { addRecentlyViewed } = useRecentlyViewed();
  const { showToast } = useToast();

  useEffect(() => {
    const fetch = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const data = await animalsService.getAnimalBySlug(slug);
        if (data) {
          setAnimal(data);
          addRecentlyViewed(data.slug);
          const related = await animalsService.getRelatedAnimals(data.slug, 3);
          setRelatedAnimals(related);
        } else {
          setAnimal(null);
        }
      } catch (e) {
        console.error('Error fetching animal', e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
    setActiveImageIndex(0);
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse space-y-8">
        <div className="h-4 w-48 bg-[#EAE4D7] rounded" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 h-96 bg-[#EAE4D7] rounded-3xl" />
          <div className="lg:col-span-5 space-y-4">
            <div className="h-10 w-3/4 bg-[#EAE4D7] rounded" />
            <div className="h-6 w-1/2 bg-[#EAE4D7] rounded" />
            <div className="h-32 bg-[#EAE4D7] rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!animal) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <h2 className="font-serif text-3xl font-bold text-[#1E2421]">Animal Profile Not Found</h2>
        <p className="text-sm text-[#59655E]">
          The animal profile you're looking for may have been adopted or the link might have changed.
        </p>
        <Link to="/animals">
          <Button variant="primary" size="md">
            Return to Animal Directory
          </Button>
        </Link>
      </div>
    );
  }

  const favorited = isFavorite(animal.slug);

  const handleFavoriteClick = () => {
    toggleFavorite(animal.slug);
    showToast(
      favorited ? `Removed ${animal.name} from saved` : `Saved ${animal.name} to favorites!`,
      'info'
    );
  };

  const images = animal.images && animal.images.length > 0 ? animal.images : [animal.featuredImage];

  return (
    <div className="pb-24 lg:pb-20 space-y-16">
      {/* Top Header & Breadcrumbs */}
      <section className="bg-[#FAF8F5] border-b border-[#EAE4D7] pt-6 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Breadcrumbs
              items={[
                { label: 'Animals', href: '/animals' },
                { label: animal.name }
              ]}
            />
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShareModalOpen(true)}
                icon={<Share2 className="w-3.5 h-3.5" />}
              >
                Share
              </Button>
              <Button
                variant={favorited ? 'terracotta' : 'outline'}
                size="sm"
                onClick={handleFavoriteClick}
                icon={<Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-white' : ''}`} />}
              >
                {favorited ? 'Saved' : 'Save Animal'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Profile Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Image Gallery & Lightbox trigger */}
          <div className="lg:col-span-7 space-y-4">
            <div 
              className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#EAE4D7] border border-[#D8CEBE] shadow-md cursor-pointer group"
              onClick={() => setLightboxOpen(true)}
            >
              <img
                src={images[activeImageIndex]}
                alt={animal.name}
                className="w-full h-full object-cover img-zoom"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant="status" status={animal.status}>
                  {animal.status}
                </Badge>
                {animal.isBiraalBariResident && (
                  <span className="bg-[#132E22]/90 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-3 h-3 text-[#F2B73B]" />
                    <span>Biraal Bari Sanctuary</span>
                  </span>
                )}
              </div>
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-xs text-white text-xs px-3 py-1.5 rounded-full opacity-80 group-hover:opacity-100 transition-opacity">
                Click to view fullscreen ({activeImageIndex + 1}/{images.length})
              </div>
            </div>

            {/* Thumbnail selector */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx ? 'border-[#C65332] ring-2 ring-[#C65332]/30' : 'border-[#D8CEBE] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${animal.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Key Facts & Immediate Actions Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF8F5] rounded-3xl border border-[#D8CEBE] p-6 sm:p-8 space-y-6 shadow-sm">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#C65332] block mb-1">
                  {animal.species} · {animal.breed}
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-[#1E2421]">
                  {animal.name}
                </h1>
                <p className="text-xs text-[#75837B] flex items-center gap-1 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C65332]" />
                  <span>{animal.location}</span>
                </p>
              </div>

              {/* Quick Spec Pills */}
              <div className="grid grid-cols-3 gap-3 p-3.5 bg-[#F3EFE8] rounded-2xl text-center text-xs">
                <div>
                  <span className="text-[#75837B] block text-[11px]">Age</span>
                  <span className="font-serif font-bold text-[#1E2421] text-sm">{animal.age}</span>
                </div>
                <div>
                  <span className="text-[#75837B] block text-[11px]">Gender</span>
                  <span className="font-serif font-bold text-[#1E2421] text-sm">{animal.gender}</span>
                </div>
                <div>
                  <span className="text-[#75837B] block text-[11px]">Rescued</span>
                  <span className="font-serif font-bold text-[#1E2421] text-sm">
                    {new Date(animal.rescueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>

              {/* Personality traits */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#75837B] block mb-2">
                  Personality & Temperament
                </label>
                <div className="flex flex-wrap gap-2">
                  {animal.personality.map((tag, idx) => (
                    <span key={idx} className="bg-[#EDF8F3] text-[#1D4336] border border-[#B0DECB] text-xs font-semibold px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Special needs tag if present */}
              {animal.specialNeeds && animal.specialNeeds.length > 0 && (
                <div className="p-4 rounded-2xl bg-[#FDF5F2] border border-[#FACFC2]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#893720] block mb-1 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-[#C65332]" />
                    <span>Special Needs / Care Focus</span>
                  </span>
                  <ul className="text-xs text-[#893720] space-y-1 list-disc pl-4 mt-1">
                    {animal.specialNeeds.map((sn, idx) => (
                      <li key={idx}>{sn}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Primary Action Button */}
              <div className="space-y-3 pt-2">
                {animal.status === 'Available for Adoption' ? (
                  <Link to={`/adopt?animal=${animal.slug}`} className="block w-full">
                    <Button variant="terracotta" size="lg" className="w-full">
                      Apply to Adopt {animal.name}
                    </Button>
                  </Link>
                ) : (
                  <Link to={`/sponsor/${animal.slug}`} className="block w-full">
                    <Button variant="terracotta" size="lg" className="w-full">
                      Sponsor {animal.name}'s Sanctuary Care (৳)
                    </Button>
                  </Link>
                )}

                <Link to="/donate" className="block w-full">
                  <Button variant="outline" size="md" className="w-full">
                    Donate to Medical Care Fund
                  </Button>
                </Link>
              </div>

              {/* Trust statement */}
              <div className="text-[11px] text-[#75837B] flex items-center gap-2 pt-2 border-t border-[#EAE4D7]">
                <ShieldCheck className="w-4 h-4 text-[#2C6A53] shrink-0" />
                <span>All AniRBan rescues are vaccinated, dewormed, and spayed/neutered.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story & Care Requirements Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Story & Medical Timeline */}
          <div className="lg:col-span-7 space-y-10">
            {/* The Animal's Backstory */}
            <div className="bg-[#FAF8F5] rounded-3xl border border-[#D8CEBE] p-6 sm:p-10 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C65332]" />
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2421]">
                  {animal.name}’s Story
                </h2>
              </div>

              <div className="text-sm sm:text-base text-[#59655E] leading-relaxed space-y-4 whitespace-pre-line font-normal">
                {animal.fullStory}
              </div>
            </div>

            {/* Medical / Rescue Journey Timeline */}
            <div className="bg-[#FAF8F5] rounded-3xl border border-[#D8CEBE] p-6 sm:p-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1A382B]" />
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2421]">
                    Clinical & Recovery Journey
                  </h2>
                </div>
                <span className="text-xs text-[#75837B] font-medium hidden sm:inline">
                  Veterinary Log
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#59655E] mb-6">
                From emergency field extraction to ongoing health monitoring, here is {animal.name}’s documented timeline:
              </p>

              <MedicalTimeline events={animal.medicalHistory} animalName={animal.name} />
            </div>
          </div>

          {/* Right Column: Care Requirements & Compatibility */}
          <div className="lg:col-span-5 space-y-6">
            {/* Care Requirements Card */}
            <div className="bg-[#FAF8F5] rounded-3xl border border-[#D8CEBE] p-6 sm:p-8 space-y-6">
              <h3 className="font-serif text-2xl font-bold text-[#1E2421] pb-2 border-b border-[#EAE4D7]">
                Care & Home Compatibility
              </h3>

              {/* Compatibility Badges */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#75837B] block">
                  Household Compatibility
                </label>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className={`p-3 rounded-xl border font-medium ${
                    animal.careRequirements.catFriendly
                      ? 'bg-[#EDF8F3] border-[#B0DECB] text-[#1D4336]'
                      : 'bg-[#FDF5F2] border-[#FACFC2] text-[#893720]'
                  }`}>
                    <p className="font-bold">Cats</p>
                    <p className="text-[10px]">{animal.careRequirements.catFriendly ? 'Friendly' : 'Prefers Solo'}</p>
                  </div>

                  <div className={`p-3 rounded-xl border font-medium ${
                    animal.careRequirements.dogFriendly
                      ? 'bg-[#EDF8F3] border-[#B0DECB] text-[#1D4336]'
                      : 'bg-[#FDF5F2] border-[#FACFC2] text-[#893720]'
                  }`}>
                    <p className="font-bold">Dogs</p>
                    <p className="text-[10px]">{animal.careRequirements.dogFriendly ? 'Friendly' : 'Untested / No'}</p>
                  </div>

                  <div className={`p-3 rounded-xl border font-medium ${
                    animal.careRequirements.kidFriendly
                      ? 'bg-[#EDF8F3] border-[#B0DECB] text-[#1D4336]'
                      : 'bg-[#FDF5F2] border-[#FACFC2] text-[#893720]'
                  }`}>
                    <p className="font-bold">Children</p>
                    <p className="text-[10px]">{animal.careRequirements.kidFriendly ? 'Gentle' : 'Adults Preferred'}</p>
                  </div>
                </div>
              </div>

              {/* Specific notes */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#75837B] block">
                  Essential Requirements
                </label>
                <ul className="space-y-2 text-xs sm:text-sm text-[#3E4742]">
                  {animal.careRequirements.indoorOnly && (
                    <li className="flex items-start gap-2 bg-[#F3EFE8] p-3 rounded-xl">
                      <Home className="w-4 h-4 text-[#C65332] shrink-0 mt-0.5" />
                      <span><strong>Strictly Indoor Home:</strong> Balcony and window netting required for safety.</span>
                    </li>
                  )}
                  {animal.careRequirements.specialDiet && (
                    <li className="flex items-start gap-2 bg-[#F3EFE8] p-3 rounded-xl">
                      <Activity className="w-4 h-4 text-[#2C6A53] shrink-0 mt-0.5" />
                      <span><strong>Dietary Care:</strong> {animal.careRequirements.specialDiet}</span>
                    </li>
                  )}
                  {animal.careRequirements.dailyMedication && (
                    <li className="flex items-start gap-2 bg-[#F3EFE8] p-3 rounded-xl">
                      <Info className="w-4 h-4 text-[#1A382B] shrink-0 mt-0.5" />
                      <span><strong>Daily Medication:</strong> {animal.careRequirements.dailyMedication}</span>
                    </li>
                  )}
                  {animal.careRequirements.notes.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#59655E] pl-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2C6A53] shrink-0 mt-0.5" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sponsorship Callout (if resident) */}
            {animal.monthlySponsorshipNeededBDT && (
              <div className="bg-[#1A382B] text-white rounded-3xl p-6 sm:p-8 space-y-4">
                <span className="text-xs font-semibold text-[#F2B73B] uppercase tracking-wider block">
                  Sanctuary Guardian Fund
                </span>
                <h4 className="font-serif text-xl font-bold">
                  Sponsor {animal.name} Monthly
                </h4>
                <p className="text-xs text-[#D6F0E4] leading-relaxed">
                  Monthly care requires approximately <strong>৳{animal.monthlySponsorshipNeededBDT.toLocaleString()}</strong> for specialized nutrition, hydrotherapy, and routine diagnostics.
                </p>
                <Link to={`/sponsor/${animal.slug}`} className="block">
                  <Button variant="terracotta" size="md" className="w-full">
                    Become a Monthly Sponsor
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Animals */}
      {relatedAnimals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#C65332] block mb-1">
                More Companions
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#1E2421]">
                Other Animals You Might Love
              </h2>
            </div>
            <Link to="/animals">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedAnimals.map((rel) => (
              <AnimalCard key={rel.id} animal={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Mobile Sticky Bottom CTA (Requirement #33) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-[#FAF8F5]/98 backdrop-blur-md border-t border-[#D8CEBE] px-4 py-3 pb-safe z-40 flex items-center justify-between gap-3 shadow-xl">
        <div>
          <p className="font-serif font-bold text-base text-[#1E2421] leading-tight">{animal.name}</p>
          <p className="text-xs text-[#75837B]">{animal.status}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleFavoriteClick}
            className="p-2.5 rounded-full border border-[#D8CEBE] bg-[#FDFCF9]"
            aria-label="Save animal"
          >
            <Heart className={`w-4 h-4 ${favorited ? 'text-[#C65332] fill-[#C65332]' : 'text-[#75837B]'}`} />
          </button>

          {animal.status === 'Available for Adoption' ? (
            <Link to={`/adopt?animal=${animal.slug}`}>
              <Button variant="terracotta" size="sm">
                Apply to Adopt
              </Button>
            </Link>
          ) : (
            <Link to={`/sponsor/${animal.slug}`}>
              <Button variant="terracotta" size="sm">
                Sponsor Animal
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        images={images}
        currentIndex={activeImageIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
        onNext={() => setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
        title={animal.name}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        title={`${animal.name} (${animal.species}) at AniRBan Trust`}
        url={window.location.href}
      />
    </div>
  );
};
