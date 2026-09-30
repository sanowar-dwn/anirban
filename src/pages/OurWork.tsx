import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle, 
  Stethoscope, 
  Home, 
  Heart, 
  BookOpen, 
  Activity, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Button } from '../components/ui/Button';

export const OurWork: React.FC = () => {
  const [activeWorkIndex, setActiveWorkIndex] = useState(0);

  const pillars = [
    {
      id: 'rescue',
      title: '24/7 Field Rescue Operations',
      icon: <AlertTriangle className="w-6 h-6 text-[#C65332]" />,
      shortDesc: 'Rapid veterinary ambulance deployment for trauma, vehicular impacts, and abuse calls across Dhaka.',
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1000&q=80',
      bullets: [
        'Dedicated rescue van equipped with stretchers, oxygen, and emergency stabilization kits',
        'Direct coordination with community tip-offs via our emergency hotline',
        'Humane trapping protocols for frightened or semi-feral injured street animals',
        'Prompt pain relief and immediate transfer to our licensed veterinary surgical clinic'
      ],
      ctaText: 'Report an Injured Animal',
      ctaLink: '/report-rescue'
    },
    {
      id: 'rehab',
      title: 'Advanced Clinical Rehabilitation',
      icon: <Stethoscope className="w-6 h-6 text-[#2C6A53]" />,
      shortDesc: 'Orthopedic stabilization, wound debridement, and physical recovery therapies.',
      image: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1000&q=80',
      bullets: [
        'Intramedullary bone pinning and pelvic reconstructive surgeries',
        'Therapeutic medicated baths for severe mange and skin infections',
        'Targeted hydrotherapy and range-of-motion routines for spinal injury recovery',
        'Rigorous post-operative infectious disease isolation and nutrition protocols'
      ],
      ctaText: 'Support Medical Care',
      ctaLink: '/donate'
    },
    {
      id: 'sanctuary',
      title: 'Biraal Bari: Lifelong Sanctuary',
      icon: <Home className="w-6 h-6 text-[#1A382B]" />,
      shortDesc: 'Permanent dignified sanctuary for disabled, blind, geriatric, and amputee felines.',
      image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1000&q=80',
      bullets: [
        'Safe, cage-free living rooms equipped with non-slip flooring and ramps for tripod cats',
        'Specially adapted quiet suites for blind felines to navigate safely by scent and touch',
        'Screened outdoor sun decks for fresh air and environmental enrichment',
        'Lifelong hospice and palliative care when adoption is not medically feasible'
      ],
      ctaText: 'Explore Biraal Bari',
      ctaLink: '/biraal-bari'
    },
    {
      id: 'adoption',
      title: 'Ethical & Transparent Adoption',
      icon: <Heart className="w-6 h-6 text-[#C65332]" />,
      shortDesc: 'Matching healthy rescues with vetted forever families who understand responsible guardianship.',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1000&q=80',
      bullets: [
        'Multi-step adoption evaluation prioritizing indoor safety and balcony netting',
        'All adoptions include microchipping, full core vaccinations, and mandatory spay/neuter',
        'Free 6-month behavioral guidance and veterinarian consultation for new adoptive parents',
        'Lifetime return guarantee: an AniRBan animal will never be abandoned to the streets again'
      ],
      ctaText: 'View Adoptable Animals',
      ctaLink: '/animals'
    },
    {
      id: 'tnr',
      title: 'Community TNR & Rabies Eradication',
      icon: <Activity className="w-6 h-6 text-[#89570B]" />,
      shortDesc: 'Scientific Trap-Neuter-Return to stabilize urban stray populations and protect human health.',
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1000&q=80',
      bullets: [
        'Over 680 street cats and dogs humanely spayed/neutered and ear-notched',
        'Free core rabies vaccinations administered during every sterilization procedure',
        'Collaborations with local community feeders and market shopkeepers',
        'Eliminates mating fights, kitten mortality, and territorial distress peacefully'
      ],
      ctaText: 'Learn About TNR',
      ctaLink: '/stories/why-community-tnr-is-dhakas-most-humane-solution'
    },
    {
      id: 'education',
      title: 'Humane Education & Legal Advocacy',
      icon: <BookOpen className="w-6 h-6 text-[#1A382B]" />,
      shortDesc: 'Workshops in schools and universities teaching empathy, animal rights, and safety.',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1000&q=80',
      bullets: [
        'School outreach workshops debunking harmful superstitions surrounding black cats and street dogs',
        'First-aid and emergency handling training for student rescue volunteers',
        'Advocacy for strict enforcement of the Bangladesh Animal Welfare Act 2019',
        'Neighborhood dialogue sessions resolving conflicts between residents and animal feeders'
      ],
      ctaText: 'Volunteer With Us',
      ctaLink: '/volunteer'
    }
  ];

  const currentPillar = pillars[activeWorkIndex];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Header */}
      <section className="bg-[#FAF8F5] border-b border-[#EAE4D7] pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Our Work' }]} className="mb-6" />

          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest font-bold text-[#C65332] mb-2 block">
              Core Program Areas
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-[#1E2421] leading-tight mb-6">
              How We Protect & Heal Animal Lives
            </h1>
            <p className="text-base sm:text-lg text-[#59655E] leading-relaxed">
              From the instant of an emergency 999/hotline rescue to lifelong sanctuary care at Biraal Bari, AniRBan operates a full continuum of compassionate care across Dhaka.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Pillar Selector Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation list */}
          <div className="lg:col-span-4 space-y-2">
            {pillars.map((pillar, idx) => (
              <button
                key={pillar.id}
                onClick={() => setActiveWorkIndex(idx)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-3.5 ${
                  activeWorkIndex === idx
                    ? 'bg-[#1A382B] text-white border-[#1A382B] shadow-md'
                    : 'bg-[#FAF8F5] text-[#1E2421] border-[#D8CEBE] hover:bg-[#F3EFE8]'
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 ${
                  activeWorkIndex === idx ? 'bg-white/10 text-white' : 'bg-[#F3EFE8]'
                }`}>
                  {pillar.icon}
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold leading-snug">{pillar.title}</h3>
                  <p className={`text-xs mt-0.5 line-clamp-1 ${activeWorkIndex === idx ? 'text-[#B0DECB]' : 'text-[#75837B]'}`}>
                    {pillar.shortDesc}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Interactive display panel */}
          <div className="lg:col-span-8 bg-[#FAF8F5] rounded-3xl border border-[#D8CEBE] p-6 sm:p-10 shadow-sm animate-in fade-in duration-200">
            <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden mb-8 bg-[#EAE4D7]">
              <img
                src={currentPillar.image}
                alt={currentPillar.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-xl bg-[#F3EFE8]">
                  {currentPillar.icon}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2421]">
                  {currentPillar.title}
                </h2>
              </div>

              <p className="text-base text-[#59655E] leading-relaxed">
                {currentPillar.shortDesc}
              </p>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#75837B]">Key Capabilities & Standards:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentPillar.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#3E4742] bg-[#FDFCF9] p-3 rounded-xl border border-[#EAE4D7]">
                      <CheckCircle2 className="w-4 h-4 text-[#2C6A53] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#EAE4D7]">
                <Link to={currentPillar.ctaLink}>
                  <Button variant="terracotta" size="md">
                    <span>{currentPillar.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TNR Callout Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#132E22] text-[#FAF8F5] rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#F2B73B]">
              Humane Population Management
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
              Why We Champion Trap-Neuter-Return (TNR)
            </h2>
            <p className="text-sm sm:text-base text-[#D6F0E4] leading-relaxed">
              Culling street dogs or cats is not only morally indefensible, it fails scientifically. Whenever animals are removed or killed, other animals rapidly reproduce to fill the territory. TNR stabilizes the population, eliminates rabies risk through mandatory vaccination, and creates harmony in residential neighborhoods.
            </p>
            <div className="pt-2">
              <Link to="/stories/why-community-tnr-is-dhakas-most-humane-solution">
                <Button variant="terracotta" size="lg">
                  Read Our Comprehensive TNR Guide
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
