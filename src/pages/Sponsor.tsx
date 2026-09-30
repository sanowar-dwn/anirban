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
              Sponsor an Animal in Need.
            </h1>
            <p className="text-base sm:text-lg text-[#59655E] leading-relaxed">
              When an animal cannot be adopted due to permanent trauma, blindness, or chronic medical needs, your monthly sponsorship ensures they are never forgotten.
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
            <p className="text-xs sm:text-sm text-[#59655E]">Choose a cat or dog whose story touches your heart.</p>
          </div>
          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#D8CEBE]">
            <span className="font-serif text-2xl font-bold text-[#C65332] block mb-2">02</span>
            <h3 className="font-serif text-lg font-bold text-[#1E2421] mb-1">Select Monthly Support</h3>
            <p className="text-xs sm:text-sm text-[#59655E]">Support food (৳1,000), medical care (৳2,500), or full sanctuary hospice (৳5,000).</p>
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
                        ৳{animal.monthlySponsorshipNeededBDT?.toLocaleString() || '2,000'} / mo
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
