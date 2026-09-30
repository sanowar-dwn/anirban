import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle, 
  PawPrint,
  Clock,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ImpactCounter } from '../components/common/ImpactCounter';
import { AnimalCard } from '../components/common/AnimalCard';
import { StoryCard } from '../components/common/StoryCard';
import { animalsService } from '../services/animals';
import { storiesService } from '../services/stories';
import { impactService } from '../services/impact';
import { Animal, Story, ImpactStats, AnimalStatus } from '../types';
import { AnimalCardSkeleton, StoryCardSkeleton } from '../components/ui/LoadingSkeleton';

export const Home: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [impact, setImpact] = useState<ImpactStats | null>(null);
  const [activeTab, setActiveTab] = useState<AnimalStatus>('Available for Adoption');
  const [loadingAnimals, setLoadingAnimals] = useState(true);
  const [loadingStories, setLoadingStories] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [animalsRes, storiesRes, impactRes] = await Promise.all([
          animalsService.getAnimals(),
          storiesService.getStories(),
          impactService.getImpactStats()
        ]);
        setAnimals(animalsRes);
        setStories(storiesRes);
        setImpact(impactRes);
      } catch (err) {
        console.error('Failed to load home data', err);
      } finally {
        setLoadingAnimals(false);
        setLoadingStories(false);
      }
    };

    fetchData();
  }, []);

  const tabOptions: AnimalStatus[] = [
    'Available for Adoption',
    'Under Care',
    'Sanctuary Resident',
    'Recently Rescued'
  ];

  const filteredAnimals = animals.filter(a => a.status === activeTab).slice(0, 4);

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:py-20 lg:py-24 border-b border-[#EAE4D7] bg-[#FDFCF9]">
        {/* Soft background glow decoration */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#EDF8F3] blur-3xl pointer-events-none opacity-60" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#FDF5F2] blur-3xl pointer-events-none opacity-60" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDF8F3] border border-[#B0DECB] text-xs font-semibold text-[#1A382B]">
                <span className="w-2 h-2 rounded-full bg-[#C65332] animate-pulse" />
                <span>70+ Vulnerable Animals Currently in Care</span>
              </div>

              {/* Main Editorial Headline */}
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#1E2421] tracking-tight leading-[1.08]">
                Every Rescue Deserves a <span className="italic font-normal text-[#1A382B]">Second Chance.</span>
              </h1>

              {/* Supporting narrative copy */}
              <p className="text-base sm:text-xl text-[#59655E] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                AniRBan Trust works on the frontlines to rescue injured street animals, perform life-saving veterinary surgeries, and create safer futures through transparent adoptions and our sanctuary haven, <strong className="text-[#1E2421] font-semibold">Biraal Bari</strong>.
              </p>

              {/* Primary & Secondary Action CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link to="/report-rescue" className="w-full sm:w-auto">
                  <Button variant="terracotta" size="lg" className="w-full sm:w-auto">
                    Help an Animal in Need
                  </Button>
                </Link>

                <Link to="/animals" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Meet Our Animals
                  </Button>
                </Link>

                <Link to="/donate" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Donate (৳)
                  </Button>
                </Link>
              </div>

              {/* Micro-trust indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#75837B]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2C6A53]" />
                  <span>Dhaka Emergency Ambulance</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2C6A53]" />
                  <span>Licensed Veterinary Care</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2C6A53]" />
                  <span>Lifelong Sanctuary Promise</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Photo */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FAF8F5] aspect-[4/5] bg-[#EAE4D7]">
                  <img
                    src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=80"
                    alt="Bonolata resting peacefully at Biraal Bari Sanctuary"
                    className="w-full h-full object-cover img-zoom"
                  />
                  
                  {/* Subtle editorial photo caption overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
                    <p className="text-xs uppercase tracking-widest text-[#F2B73B] font-semibold mb-1">
                      Sanctuary Resident · Biraal Bari
                    </p>
                    <h3 className="font-serif text-2xl font-bold">Bonolata</h3>
                    <p className="text-xs text-white/80 mt-1">
                      Surviving pelvic trauma to become our sanctuary matriarch.
                    </p>
                  </div>
                </div>

                {/* Floating emotional badge card */}
                <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-[#FAF8F5] border border-[#D8CEBE] p-4 rounded-2xl shadow-xl flex items-center gap-3.5 max-w-xs">
                  <div className="w-11 h-11 rounded-full bg-[#FDF5F2] border border-[#FACFC2] flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5 text-[#C65332] fill-[#C65332]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1E2421]">100% No-Kill Philosophy</p>
                    <p className="text-[11px] text-[#59655E]">Every injured life receives comprehensive palliative and surgical support.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. IMPACT STATS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-[#C65332] mb-2 block">
            Real Lives Transformed
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E2421]">
            Our Measurable Impact in Bangladesh
          </h2>
          <p className="text-sm sm:text-base text-[#59655E] mt-3">
            Since our founding, AniRBan Trust has prioritized ethical interventions, street medical care, and lifelong sanctuary protection.
          </p>
        </div>

        {/* Animated Counters Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <ImpactCounter
            end={impact?.animalsInCare || 78}
            label="Animals In Daily Care"
            sublabel="Receiving nutrition, housing & clinical therapy"
          />
          <ImpactCounter
            end={impact?.totalRescues || 412}
            label="Emergency Rescues"
            sublabel="From road trauma, distress, and cruelty"
          />
          <ImpactCounter
            end={impact?.successfulAdoptions || 247}
            label="Successful Adoptions"
            sublabel="Vetted forever homes across Bangladesh"
          />
          <ImpactCounter
            end={impact?.sterilizationsTNR || 680}
            label="TNR & Vaccinations"
            sublabel="Stabilizing urban street animal populations"
          />
        </div>
      </section>

      {/* 3. RESCUE STORY SECTION — "Meet Bonolata" */}
      <section className="bg-[#1A382B] text-[#FAF8F5] py-14 sm:py-20 lg:py-24 rounded-3xl mx-3 sm:mx-6 lg:mx-8 px-4 sm:px-12 relative overflow-hidden">
        {/* Subtle patterned background */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#2F624D] blur-3xl opacity-30 pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-12 pb-8 border-b border-[#2C6A53]">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#F2B73B] mb-2 block">
                Featured Rescue Journey
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
                Meet Bonolata
              </h2>
            </div>
            <Link to="/stories/bonolata-the-calico-who-relearned-to-walk">
              <Button variant="terracotta" size="md">
                Read Her Full Story
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Story timeline (Horizontal / Magazine Style) */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-base sm:text-lg text-[#D6F0E4] leading-relaxed font-light">
                Found on a monsoon night in Mirpur with bilateral pelvic fractures, veterinarians doubted she would walk again. Over six months of orthopedic surgery, hydrotherapy, and tender love at Biraal Bari, Bonolata proved that trust heals.
              </p>

              {/* Step cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#132E22] border border-[#2F624D]">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#F2B73B] block mb-1">
                    Phase 1: Rescue
                  </span>
                  <h4 className="font-serif text-base font-semibold text-white mb-1">Midnight Mirpur Call</h4>
                  <p className="text-xs text-[#B0DECB]">Extracted from rainstorm with acute hypothermia and pelvic trauma.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#132E22] border border-[#2F624D]">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#F2B73B] block mb-1">
                    Phase 2: Treatment
                  </span>
                  <h4 className="font-serif text-base font-semibold text-white mb-1">Surgical Stabilization</h4>
                  <p className="text-xs text-[#B0DECB]">Two months of gentle cage-rest, anti-inflammatories, and joint therapy.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#132E22] border border-[#2F624D]">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#F2B73B] block mb-1">
                    Phase 3: Recovery
                  </span>
                  <h4 className="font-serif text-base font-semibold text-white mb-1">Taking Her First Steps</h4>
                  <p className="text-xs text-[#B0DECB]">Regained mobility through patient daily physical therapy sessions.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#132E22] border border-[#2F624D]">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#E48B6D] block mb-1">
                    Phase 4: New Beginning
                  </span>
                  <h4 className="font-serif text-base font-semibold text-white mb-1">Biraal Bari Matriarch</h4>
                  <p className="text-xs text-[#B0DECB]">Now permanently protected and welcoming incoming kittens with open purrs.</p>
                </div>
              </div>
            </div>

            {/* Visual Photo Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#2F624D] shadow-2xl aspect-[4/3] sm:aspect-[16/10]">
                <img
                  src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1000&q=80"
                  alt="Bonolata close-up"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-xs px-3 py-1 rounded-full text-white/90">
                  Mirpur Rescue · 2024
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ANIMAL DISCOVERY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-[#C65332] mb-1.5 block">
              Meet The Residents
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E2421]">
              Animals in Our Care
            </h2>
            <p className="text-sm text-[#59655E] mt-2">
              Every resident has an individual care plan, medical history, and unique spirit.
            </p>
          </div>

          <Link to="/animals">
            <Button variant="outline" size="md">
              View All Animals Directory
            </Button>
          </Link>
        </div>

        {/* Status Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#EAE4D7] no-scrollbar">
          {tabOptions.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-[#1A382B] text-white shadow-xs'
                  : 'bg-[#FAF8F5] text-[#59655E] hover:bg-[#F3EFE8] border border-[#D8CEBE]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Animal Cards Grid */}
        {loadingAnimals ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(n => <AnimalCardSkeleton key={n} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAnimals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        )}
      </section>

      {/* 5. BIRAAL BARI DESTINATION HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] rounded-3xl border border-[#D8CEBE] p-5 sm:p-10 lg:p-16 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#893720] bg-[#FDF5F2] px-3.5 py-1 rounded-full border border-[#FACFC2]">
                <Sparkles className="w-3.5 h-3.5 text-[#C65332]" />
                <span>AniRBan's Signature Sanctuary</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E2421] leading-tight">
                Biraal Bari: <br />
                <span className="italic font-normal text-[#1A382B]">A Safe Place to Heal.</span>
              </h2>

              <p className="text-sm sm:text-base text-[#59655E] leading-relaxed">
                Not every animal can be adopted. For cats with permanent physical trauma, amputations, blindness, or advanced age, the street offers no mercy. Biraal Bari is our specialized sanctuary home where over 40 permanent residents live in dignity, warmth, and lifelong love.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-medium text-[#1E2421]">
                  <CheckCircle2 className="w-4 h-4 text-[#2C6A53]" />
                  <span>Cage-Free Living Suites</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#1E2421]">
                  <CheckCircle2 className="w-4 h-4 text-[#2C6A53]" />
                  <span>Daily Vet Rounds</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#1E2421]">
                  <CheckCircle2 className="w-4 h-4 text-[#2C6A53]" />
                  <span>Screened Sunning Patios</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#1E2421]">
                  <CheckCircle2 className="w-4 h-4 text-[#2C6A53]" />
                  <span>Tripod & Blind Special Ramps</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link to="/biraal-bari">
                  <Button variant="primary" size="lg">
                    Discover Biraal Bari
                  </Button>
                </Link>
                <Link to="/biraal-bari/residents">
                  <Button variant="outline" size="lg">
                    Meet Sanctuary Residents
                  </Button>
                </Link>
              </div>
            </div>

            {/* Overlapping visual sanctuary gallery */}
            <div className="lg:col-span-6 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-[#EAE4D7] shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80"
                      alt="Biraal Bari resident relaxing"
                      className="w-full h-full object-cover img-zoom"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden aspect-square bg-[#EAE4D7] shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1513360309081-38f076278f1c?auto=format&fit=crop&w=600&q=80"
                      alt="Three-legged cat Neel"
                      className="w-full h-full object-cover img-zoom"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-8">
                  <div className="rounded-2xl overflow-hidden aspect-square bg-[#EAE4D7] shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1568607689150-17e625c1586e?auto=format&fit=crop&w=600&q=80"
                      alt="Blind cat Maya"
                      className="w-full h-full object-cover img-zoom"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-[#EAE4D7] shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=600&q=80"
                      alt="White cat in sun"
                      className="w-full h-full object-cover img-zoom"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. EMERGENCY REPORTING BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FDF5F2] border-2 border-[#FACFC2] rounded-3xl p-5 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[#FACFC2] flex items-center justify-center text-[#893720] shrink-0">
              <AlertTriangle className="w-8 h-8 text-[#C65332]" />
            </div>
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2421] mb-2">
                Witnessed an Injured or Trapped Animal?
              </h3>
              <p className="text-sm text-[#59655E] max-w-xl leading-relaxed">
                Submit an instant emergency report with photos and location, or contact our 24/7 rescue dispatch line directly. Our veterinary ambulances serve Dhaka Division.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <Link to="/report-rescue" className="w-full sm:w-auto">
              <Button variant="terracotta" size="lg" className="w-full sm:w-auto">
                File Emergency Report
              </Button>
            </Link>
            <a href="tel:+8801700000000" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Call Helpline
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* 7. EDITORIAL STORIES / MAGAZINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-[#C65332] mb-1.5 block">
              Voices & Insights
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E2421]">
              Stories from the Sanctuary
            </h2>
          </div>

          <Link to="/stories">
            <Button variant="outline" size="md">
              Read All Stories
            </Button>
          </Link>
        </div>

        {loadingStories ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(n => <StoryCardSkeleton key={n} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.slice(1, 4).map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
