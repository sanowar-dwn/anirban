import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, MapPin, AlertCircle, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { animalsService } from '../services/animals';
import { Animal } from '../types';
import { Badge } from '../components/ui/Badge';
import { AnimalCardSkeleton } from '../components/ui/LoadingSkeleton';

export const BiraalBariResidents: React.FC = () => {
  const [residents, setResidents] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await animalsService.getSanctuaryResidents();
        setResidents(data);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="bg-[#FAF8F5] border-b border-[#EAE4D7] pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Biraal Bari', href: '/biraal-bari' },
              { label: 'Sanctuary Residents' }
            ]}
            className="mb-6"
          />

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#C65332] mb-1.5 block">
                Permanent Sanctuary Family
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-[#1E2421]">
                Biraal Bari Residents
              </h1>
              <p className="text-sm sm:text-base text-[#59655E] mt-2 max-w-2xl">
                These resilient cats have overcome traumatic road injuries, amputations, and blindness. They live in comfort and dignity at Biraal Bari, supported by monthly animal sponsors.
              </p>
            </div>

            <Link to="/sponsor">
              <Button variant="terracotta" size="md">
                Sponsorship Directory
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Residents Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4].map(n => <AnimalCardSkeleton key={n} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {residents.map((resident) => (
              <div
                key={resident.id}
                className="group bg-[#FAF8F5] rounded-3xl border border-[#D8CEBE] overflow-hidden hover:border-[#1A382B]/40 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Photo */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#EAE4D7]">
                    <img
                      src={resident.featuredImage}
                      alt={resident.name}
                      className="w-full h-full object-cover img-zoom"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="status" status={resident.status}>
                        {resident.status}
                      </Badge>
                    </div>
                    {resident.yearsInCare && (
                      <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
                        {resident.yearsInCare} at Biraal Bari
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-serif text-2xl font-bold text-[#1E2421] group-hover:text-[#1A382B] transition-colors">
                        {resident.name}
                      </h3>
                      <span className="text-xs text-[#75837B] font-medium">
                        {resident.gender} · {resident.age}
                      </span>
                    </div>

                    <p className="text-xs text-[#59655E] italic leading-relaxed line-clamp-3">
                      "{resident.shortDescription}"
                    </p>

                    {/* Special Needs highlight */}
                    {resident.specialNeeds && resident.specialNeeds.length > 0 && (
                      <div className="p-3 bg-[#FDF5F2] rounded-xl border border-[#FACFC2] text-xs text-[#893720]">
                        <span className="font-bold block mb-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 text-[#C65332]" />
                          Special Care:
                        </span>
                        <p>{resident.specialNeeds.join(', ')}</p>
                      </div>
                    )}

                    {/* Monthly Need in BDT */}
                    {resident.monthlySponsorshipNeededBDT && (
                      <div className="flex items-center justify-between text-xs pt-1 border-t border-[#EAE4D7]">
                        <span className="text-[#75837B]">Monthly Care Cost:</span>
                        <span className="font-serif font-bold text-sm text-[#1A382B]">
                          ৳{resident.monthlySponsorshipNeededBDT.toLocaleString()} / mo
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Buttons */}
                <div className="p-6 pt-0 flex items-center gap-2">
                  <Link to={`/sponsor/${resident.slug}`} className="flex-1">
                    <Button variant="terracotta" size="sm" className="w-full">
                      Sponsor {resident.name}
                    </Button>
                  </Link>
                  <Link to={`/animals/${resident.slug}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      Read Story
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
