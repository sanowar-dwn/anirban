import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Sparkles, ShieldCheck, CheckCircle2, MapPin, ArrowLeft } from 'lucide-react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { DonationSelector } from '../components/common/DonationSelector';
import { animalsService } from '../services/animals';
import { Animal } from '../types';

export const SponsorDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const data = await animalsService.getAnimalBySlug(slug);
        setAnimal(data);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-[#75837B]">
        Loading sponsorship information...
      </div>
    );
  }

  if (!animal) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold">Animal Not Found</h2>
        <Link to="/sponsor">
          <Button variant="primary" size="md">
            View All Sponsorship Animals
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-20">
      <section className="bg-[#FAF8F5] border-b border-[#EAE4D7] pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Sponsor', href: '/sponsor' },
              { label: animal.name }
            ]}
            className="mb-6"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs uppercase tracking-widest font-bold text-[#C65332] block">
                Sponsor a Sanctuary Hero
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-[#1E2421]">
                Sponsor {animal.name}
              </h1>
              <p className="text-base text-[#59655E] max-w-2xl leading-relaxed">
                By becoming {animal.name}’s monthly guardian, you provide the ongoing nutrition, specialized veterinary checks, and sanctuary shelter that keeps them happy and safe.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-end">
              <Link to={`/animals/${animal.slug}`}>
                <Button variant="outline" size="sm">
                  View Full Medical Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Animal Backstory & Care Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl overflow-hidden border border-[#D8CEBE] aspect-[4/3] bg-[#EAE4D7] shadow-sm">
              <img src={animal.featuredImage} alt={animal.name} className="w-full h-full object-cover" />
            </div>

            <div className="bg-[#FAF8F5] rounded-3xl border border-[#D8CEBE] p-6 space-y-4 shadow-sm">
              <h3 className="font-serif text-2xl font-bold text-[#1E2421]">
                About {animal.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#59655E] leading-relaxed">
                {animal.shortDescription}
              </p>
              {animal.specialNeeds && (
                <div className="p-3.5 bg-[#FDF5F2] rounded-xl border border-[#FACFC2] text-xs text-[#893720] space-y-1">
                  <span className="font-bold block">Medical / Care Needs:</span>
                  <p>{animal.specialNeeds.join(', ')}</p>
                </div>
              )}
            </div>

            {/* Sponsorship Cost Breakdown Card */}
            <div className="bg-[#EDF8F3] rounded-3xl border border-[#B0DECB] p-6 text-xs text-[#1D4336] space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-2 border-b border-[#B0DECB]">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#2F624D] block">
                    Monthly Guardian Program
                  </span>
                  <h4 className="font-serif font-bold text-lg text-[#1A382B]">
                    Care Breakdown (৳2,500 / mo)
                  </h4>
                </div>
                <div className="bg-[#1A382B] text-white font-serif font-bold text-xs px-3 py-1 rounded-full">
                  ৳2,500 / mo
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-[#FAF8F5] p-3 rounded-xl border border-[#D8CEBE]">
                  <span className="text-lg">🍲</span>
                  <div>
                    <span className="font-bold text-[#1E2421] block">Daily Food & Nutrition</span>
                    <span className="text-[#C65332] font-semibold text-xs block">৳1,200 – ৳1,500 / month</span>
                    <span className="text-[11px] text-[#59655E] mt-0.5 block">
                      High-protein veterinary-approved diet, gastrointestinal wet bowls, and wholesome dry food.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#FAF8F5] p-3 rounded-xl border border-[#D8CEBE]">
                  <span className="text-lg">🏠</span>
                  <div>
                    <span className="font-bold text-[#1E2421] block">Overheads, Utility & Daily Supplies</span>
                    <span className="text-[#2C6A53] font-semibold text-xs block">৳1,000 – ৳1,300 / month</span>
                    <span className="text-[11px] text-[#59655E] mt-0.5 block">
                      Sanctuary heating/fans, facility hygiene, daily cleaning, organic cat litter & miscellaneous upkeep.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-1 text-[11px] text-[#2F624D]">
                  <CheckCircle2 className="w-4 h-4 text-[#2C6A53] shrink-0 mt-0.5" />
                  <span>Quarterly photo updates and wellness progress notes sent directly to your email.</span>
                </div>
              </div>

              {/* Note without medical costs */}
              <div className="p-3 bg-[#FDFCF9] rounded-xl border border-[#B0DECB] text-[11px] text-[#59655E] leading-relaxed">
                <strong className="text-[#1E2421]">Note:</strong> ৳2,500 is the approximate monthly upkeep without medical costs. Emergency clinical surgeries, orthopedic implants, and hospitalizations are supported separately via the Medical Care Fund.
              </div>
            </div>
          </div>

          {/* Right Column: Donation / Sponsorship Selector Form */}
          <div className="lg:col-span-7">
            <DonationSelector
              initialPurpose="Animal Sponsorship"
              animalSlug={animal.slug}
              animalName={animal.name}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
