import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Heart, 
  Sun, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Eye,
  Activity,
  Smile
} from 'lucide-react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { AnimalCard } from '../components/common/AnimalCard';
import { animalsService } from '../services/animals';
import { Animal } from '../types';

export const BiraalBari: React.FC = () => {
  const [residents, setResidents] = useState<Animal[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await animalsService.getSanctuaryResidents();
      setResidents(data);
    };
    fetch();
  }, []);

  const dailySchedule = [
    {
      time: '07:00 AM',
      title: 'Morning Wellness & Medication',
      desc: 'Oral antibiotics, eye drops for blind residents, and joint supplements administered in pill treats.'
    },
    {
      time: '08:30 AM',
      title: 'Therapeutic Breakfast',
      desc: 'Individualized nutrition: renal diet, gastrointestinal wet food, and high-calorie kitten bowls.'
    },
    {
      time: '10:00 AM',
      title: 'Sun Deck Access & Brushing',
      desc: 'Screened patio doors open to morning sunlight. Caretakers conduct gentle coat grooming and massage.'
    },
    {
      time: '02:00 PM',
      title: 'Physical Therapy & Rest',
      desc: 'Passive range-of-motion routines for spinal injury cats like Bonolata, followed by quiet naptime.'
    },
    {
      time: '06:00 PM',
      title: 'Evening Enrichment & Play',
      desc: 'Laser pointers, sensory catnip mats, and auditory stimulation for deaf and blind residents.'
    },
    {
      time: '09:00 PM',
      title: 'Night Rounds & Bedtime',
      desc: 'Heated blankets activated in geriatric suites, fresh water fountains checked, quiet lights.'
    }
  ];

  const facilities = [
    {
      icon: <Sun className="w-6 h-6 text-[#F2B73B]" />,
      title: 'Screened Sunning Terrace',
      desc: 'Cats enjoy natural Dhaka breeze, birdwatching, and sunshine completely safe from predators or infectious vectors.'
    },
    {
      icon: <Eye className="w-6 h-6 text-[#2C6A53]" />,
      title: 'Sensory Blind Cat Suite',
      desc: 'A permanent tranquil room with consistent acoustic cues, scent-marked pathways, and low padded surfaces.'
    },
    {
      icon: <Activity className="w-6 h-6 text-[#C65332]" />,
      title: 'Tripod & Mobility Ramps',
      desc: 'Custom-built wooden ramps and non-slip carpet runners allowing three-legged and paralyzed cats to climb freely.'
    },
    {
      icon: <Smile className="w-6 h-6 text-[#1A382B]" />,
      title: 'Geriatric Hospice Ward',
      desc: 'Quiet hospice suites with ceramic heating pads for elderly residents receiving comfortable palliative care.'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Sanctuary Hero */}
      <section className="relative overflow-hidden bg-[#1A382B] text-[#FAF8F5] pt-10 pb-20 sm:pb-28">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#2F624D] blur-3xl opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Breadcrumbs
            items={[{ label: 'Biraal Bari Sanctuary' }]}
            className="mb-8 text-[#B0DECB]"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#132E22] border border-[#2F624D] text-xs font-semibold text-[#F2B73B]">
                <Sparkles className="w-4 h-4" />
                <span>Bangladesh's Dedicated Feline Sanctuary</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
                A Safe Place to <span className="italic font-normal text-[#F2B73B]">Heal.</span>
              </h1>

              <p className="text-base sm:text-xl text-[#D6F0E4] leading-relaxed font-light">
                Biraal Bari (Cat House) is AniRBan’s permanent haven for injured, disabled, blind, and senior street cats who cannot safely survive the hazards of Dhaka’s streets.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/biraal-bari/residents">
                  <Button variant="terracotta" size="lg">
                    Meet Sanctuary Residents
                  </Button>
                </Link>
                <Link to="/sponsor">
                  <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                    Sponsor a Resident
                  </Button>
                </Link>
              </div>

              {/* Sanctuary quick stats */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#2C6A53] text-center">
                <div>
                  <span className="font-serif text-3xl font-bold text-white">40+</span>
                  <p className="text-xs text-[#B0DECB] mt-0.5">Permanent Residents</p>
                </div>
                <div>
                  <span className="font-serif text-3xl font-bold text-white">100%</span>
                  <p className="text-xs text-[#B0DECB] mt-0.5">Cage-Free Suites</p>
                </div>
                <div>
                  <span className="font-serif text-3xl font-bold text-white">24/7</span>
                  <p className="text-xs text-[#B0DECB] mt-0.5">Veterinary Rounds</p>
                </div>
              </div>
            </div>

            {/* Visual Hero Gallery Showcase */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl aspect-[4/5] bg-[#132E22]">
                <img
                  src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1000&q=80"
                  alt="Bonolata in Biraal Bari"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                  <p className="font-serif text-xl font-bold">Bonolata, Sanctuary Ambassador</p>
                  <p className="text-xs text-white/80 mt-1">Living peacefully at Biraal Bari since her Mirpur recovery in 2024.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Biraal Bari Exists */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest text-[#C65332] block">
              The Sanctuary Mission
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E2421]">
              Why Biraal Bari Exists
            </h2>
            <div className="text-sm sm:text-base text-[#59655E] space-y-4 leading-relaxed font-normal">
              <p>
                In an ideal world, every rescued animal finds a loving adoptive home. But the reality of urban animal rescue in Bangladesh is that many animals suffer catastrophic, irreversible physical trauma: amputations from railway accidents, complete blindness from untreated corneal infections, or paralysis from traffic hits.
              </p>
              <p>
                Returning a blind or tripod cat to the street is a slow death sentence. Furthermore, finding adopters willing to take on animals requiring lifelong medication or manual bladder expression is exceptionally difficult.
              </p>
              <p>
                <strong>Biraal Bari is their forever promise.</strong> We refuse to euthanize animals simply because they are disabled. Here, each resident has a customized living suite, endless love, and medical care for the rest of their natural life.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden aspect-square bg-[#EAE4D7] shadow-md">
              <img
                src="https://images.unsplash.com/photo-1513360309081-38f076278f1c?auto=format&fit=crop&w=600&q=80"
                alt="Neel at Biraal Bari"
                className="w-full h-full object-cover img-zoom"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-square bg-[#EAE4D7] shadow-md">
              <img
                src="https://images.unsplash.com/photo-1568607689150-17e625c1586e?auto=format&fit=crop&w=600&q=80"
                alt="Maya at Biraal Bari"
                className="w-full h-full object-cover img-zoom"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Facilities & Thoughtful Architecture */}
      <section className="bg-[#FAF8F5] py-16 sm:py-20 border-y border-[#EAE4D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-widest text-[#C65332] block mb-2">
              Designed For Feline Needs
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E2421]">
              Sanctuary Facilities & Amenities
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((f, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#FDFCF9] border border-[#D8CEBE] hover:border-[#1A382B]/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#F3EFE8] flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1E2421] mb-2">{f.title}</h3>
                <p className="text-xs sm:text-sm text-[#59655E] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Life at Biraal Bari */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C65332] block mb-2">
            A Day in the Sanctuary
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E2421]">
            Daily Rhythm & Care Protocols
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dailySchedule.map((s, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#D8CEBE] flex items-start gap-4">
              <span className="font-mono text-xs font-bold text-[#C65332] bg-[#FDF5F2] px-2.5 py-1 rounded-lg border border-[#FACFC2] shrink-0 mt-0.5">
                {s.time}
              </span>
              <div>
                <h4 className="font-serif text-base font-bold text-[#1E2421] mb-1">{s.title}</h4>
                <p className="text-xs text-[#59655E] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Residents Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#C65332] block mb-1">
              Sanctuary Family
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#1E2421]">
              Permanent Residents of Biraal Bari
            </h2>
          </div>
          <Link to="/biraal-bari/residents">
            <Button variant="outline" size="md">
              View All Residents Directory
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {residents.slice(0, 4).map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      </section>

      {/* How to Support Biraal Bari */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] border border-[#D8CEBE] rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl font-bold text-[#1E2421]">
            How You Can Keep Biraal Bari Safe
          </h2>
          <p className="text-sm text-[#59655E] leading-relaxed">
            Running a 40+ resident sanctuary requires constant food supplies, medical dressings, veterinary diagnostic tests, and dedicated caretaker salaries. You can sponsor an individual cat monthly or contribute to the general sanctuary food fund.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/sponsor">
              <Button variant="terracotta" size="lg">
                Sponsor a Resident Monthly
              </Button>
            </Link>
            <Link to="/donate">
              <Button variant="secondary" size="lg">
                Donate to Sanctuary Fund (৳)
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
