import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { animalsService } from '../services/animals';
import { Animal } from '../types';
import { Badge } from '../components/ui/Badge';
import { AnimalCardSkeleton } from '../components/ui/LoadingSkeleton';

export const Sponsor: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const all = await animalsService.getAnimals();
        // Animals that need sponsorship (Sanctuary residents or under care)
        const sponsorList = all.filter(a => a.monthlySponsorshipNeededBDT || a.isBiraalBariResident || a.status === 'Sanctuary Resident');
        setAnimals(sponsorList);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Header */}
      <section className="bg-[#FAF8F5] border-b border-[#EAE4D7] pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Sponsor an Animal' }]} className="mb-6" />

          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest font-bold text-[#C65332] mb-2 block">
              Lifelong Guardian Circle
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-[#1E2421] leading-tight mb-4">
              Sponsor a Cat in Need.
            </h1>
            <p className="text-base sm:text-lg text-[#59655E] leading-relaxed">
              When a resident cannot be adopted due to permanent trauma, blindness, or chronic needs, our <strong>Sponsor a Cat program (৳2,500 / month)</strong> or <strong>1-time donation options</strong> ensure they receive continuous food, shelter, and love.
            </p>
          </div>
        </div>
      </section>

      {/* How Sponsorship Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#D8CEBE]">
            <span className="font-serif text-2xl font-bold text-[#C65332] block mb-2">01</span>
            <h3 className="font-serif text-lg font-bold text-[#1E2421] mb-1">Pick a Resident</h3>
            <p className="text-xs sm:text-sm text-[#59655E]">Choose a cat whose rescue story touches your heart.</p>
          </div>
          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#D8CEBE]">
            <span className="font-serif text-2xl font-bold text-[#C65332] block mb-2">02</span>
            <h3 className="font-serif text-lg font-bold text-[#1E2421] mb-1">Monthly Care (৳2,500) or 1-Time</h3>
            <p className="text-xs sm:text-sm text-[#59655E]">
              Sponsor monthly at <strong>৳2,500 / mo</strong> (food ৳1,200–1,500 & overheads ৳1,000–1,300) or choose a 1-time donation in USD ($100, $250, $500, Custom).
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#D8CEBE]">
            <span className="font-serif text-2xl font-bold text-[#C65332] block mb-2">03</span>
            <h3 className="font-serif text-lg font-bold text-[#1E2421] mb-1">Receive Updates</h3>
            <p className="text-xs sm:text-sm text-[#59655E]">Receive quarterly health checkup logs and photos of your sponsored animal.</p>
          </div>
        </div>

        {/* Animals Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(n => <AnimalCardSkeleton key={n} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {animals.map((animal) => (
              <div key={animal.id} className="bg-[#FAF8F5] rounded-3xl border border-[#D8CEBE] overflow-hidden hover:border-[#1A382B]/40 hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#EAE4D7]">
                    <img src={animal.featuredImage} alt={animal.name} className="w-full h-full object-cover img-zoom" />
                    <div className="absolute top-3 left-3">
                      <Badge variant="status" status={animal.status}>{animal.status}</Badge>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-serif text-2xl font-bold text-[#1E2421]">{animal.name}</h3>
                      <span className="text-xs text-[#75837B]">{animal.age} · {animal.gender}</span>
                    </div>

                    <p className="text-xs text-[#59655E] italic leading-relaxed line-clamp-2">
                      "{animal.shortDescription}"
                    </p>

                    {animal.specialNeeds && (
                      <div className="p-3 bg-[#FDF5F2] rounded-xl border border-[#FACFC2] text-xs text-[#893720]">
                        <span className="font-bold block mb-0.5">Special Need:</span>
                        <p>{animal.specialNeeds.join(', ')}</p>
                      </div>
                    )}

                    <div className="pt-2 border-t border-[#EAE4D7] flex items-center justify-between text-xs">
                      <span className="text-[#75837B]">Monthly Care Needed:</span>
                      <span className="font-serif font-bold text-sm text-[#1A382B]">
                        ৳{animal.monthlySponsorshipNeededBDT?.toLocaleString() || '2,500'} / mo
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link to={`/sponsor/${animal.slug}`} className="block">
                    <Button variant="terracotta" size="md" className="w-full">
                      Sponsor {animal.name}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
