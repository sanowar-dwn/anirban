import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, Sparkles, Award, Users, Stethoscope, ArrowRight } from 'lucide-react';
import { teamData } from '../data/team';
import { Button } from '../components/ui/Button';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';

export const About: React.FC = () => {
  const milestones = [
    {
      year: '2020',
      title: 'A Cardboard Carton in Mirpur',
      description: 'AniRBan began as an informal group of university students responding to street animals struck by vehicles during monsoon season in Dhaka.'
    },
    {
      year: '2022',
      title: 'Formal Trust Registration',
      description: 'Legally registered as AniRBan Trust to establish transparent accounting, licensed veterinary supervision, and permanent organizational accountability.'
    },
    {
      year: '2023',
      title: 'Inauguration of Biraal Bari',
      description: 'Opened Bangladesh’s dedicated haven for paralyzed, amputee, and blind cats who cannot safely survive on city streets or find conventional adoption.'
    },
    {
      year: '2024',
      title: 'Mobile Emergency Response & TNR Clinic',
      description: 'Launched our dedicated rescue transport van and conducted citywide humane sterilization rounds, surpassing 500 community animal surgeries.'
    },
    {
      year: '2026',
      title: 'Building Lifelong Sanctuary Wings',
      description: 'Expanding geriatric and medical recovery wards at Biraal Bari to guarantee lifelong care for over 70 residents in daily care.'
    }
  ];

  const values = [
    {
      icon: <Heart className="w-6 h-6 text-[#C65332]" />,
      title: 'Compassion Without Compromise',
      desc: 'We never turn our backs on an animal due to severity of injury, age, or physical disability. Every life has intrinsic dignity.'
    },
    {
      icon: <Stethoscope className="w-6 h-6 text-[#2C6A53]" />,
      title: 'Veterinary Excellence',
      desc: 'No makeshift treatments. Every rescue receives qualified surgical intervention, sterile protocols, pain relief, and post-op rehabilitation.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#1A382B]" />,
      title: 'Absolute Transparency',
      desc: 'Every taka donated is accounted for. We publish open medical updates, adoption follow-ups, and verified donor receipts.'
    },
    {
      icon: <Users className="w-6 h-6 text-[#F2B73B]" />,
      title: 'Community Empowerment',
      desc: 'We educate neighborhood caretakers, advocate for humane urban co-existence, and train youths in responsible animal rescue.'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Top Breadcrumb & Header */}
      <section className="bg-[#FAF8F5] border-b border-[#EAE4D7] pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'About AniRBan' }]} className="mb-6" />

          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest font-bold text-[#C65332] mb-2 block">
              Our Identity & Purpose
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-[#1E2421] leading-tight mb-6">
              A Voice for the Vulnerable, A Sanctuary for the Broken.
            </h1>
            <p className="text-base sm:text-lg text-[#59655E] leading-relaxed">
              AniRBan Trust is an animal welfare initiative based in Dhaka, Bangladesh. We believe that a society’s moral progress can be measured by how gently it treats its street animals.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Narrative */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest font-bold text-[#1A382B] block">
              Where It Began
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E2421]">
              Born Out of Monsoon Rain & Urgency
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#59655E] leading-relaxed">
              <p>
                In Dhaka, where millions of people share narrow alleys with hundreds of thousands of stray cats and dogs, accidents are frequent and merciless. Injured animals were routinely left to suffer in gutters without emergency veterinary intervention.
              </p>
              <p>
                In 2020, our founders pooled their own student allowances to pay for the orthopedic surgery of a three-month-old kitten hit by a rickshaw. That single life saved sparked an informal rescue network that quickly grew into AniRBan Trust.
              </p>
              <p>
                We soon realized that rescue alone wasn’t enough. Animals who lost limbs, sight, or had permanent neurological trauma could never safely return to the street. In response, we founded <strong className="text-[#1E2421]">Biraal Bari</strong> — a dedicated sanctuary home where vulnerability is met with lifelong sanctuary care.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] bg-[#EAE4D7] border-4 border-[#FAF8F5]">
              <img
                src="https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?auto=format&fit=crop&w=1000&q=80"
                alt="AniRBan sanctuary cat resting"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <p className="text-xs uppercase tracking-wider text-[#F2B73B] font-semibold">Biraal Bari Sanctuary</p>
                <p className="text-sm font-medium">Every rescue is treated as family, with individual care and endless patience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-[#FDFCF9] py-16 sm:py-20 border-y border-[#EAE4D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest font-bold text-[#C65332] mb-2 block">
              What Guides Us
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E2421]">
              Our Core Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#D8CEBE] hover:border-[#1A382B]/40 transition-all hover:shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-[#F3EFE8] flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1E2421] mb-2">{v.title}</h3>
                <p className="text-xs sm:text-sm text-[#59655E] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organizational Journey Timeline */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-[#C65332] mb-2 block">
            Our Milestones
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E2421]">
            The Journey So Far
          </h2>
        </div>

        <div className="relative border-l-2 border-[#B0DECB] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[35px] sm:-left-[51px] top-1 w-6 h-6 rounded-full bg-[#1A382B] text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
                {idx + 1}
              </div>
              <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#D8CEBE] shadow-xs">
                <span className="text-xs font-bold text-[#C65332] uppercase tracking-wider block mb-1">
                  {m.year}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#1E2421] mb-2">
                  {m.title}
                </h3>
                <p className="text-sm text-[#59655E] leading-relaxed">
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team & Veterinary Leadership */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-bold text-[#C65332] mb-2 block">
            Our People
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E2421]">
            Veterinarians, Rescuers & Caretakers
          </h2>
          <p className="text-sm text-[#59655E] mt-2">
            Meet the licensed veterinary doctors and dedicated sanctuary team caring for AniRBan’s residents 24 hours a day.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamData.map((member) => (
            <div key={member.id} className="bg-[#FAF8F5] rounded-2xl border border-[#D8CEBE] overflow-hidden hover:border-[#1A382B]/40 transition-all hover:shadow-md flex flex-col">
              <div className="aspect-[4/3] overflow-hidden bg-[#EAE4D7]">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="w-full h-full object-cover img-zoom"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] uppercase font-bold text-[#C65332] tracking-wider block mb-1">
                    {member.department}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#1E2421] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#1A382B] mb-3">
                    {member.role}
                  </p>
                  <p className="text-xs text-[#59655E] leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Action CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1A382B] text-white p-8 sm:p-12 rounded-3xl text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            Join Hands With AniRBan Trust
          </h2>
          <p className="text-sm sm:text-base text-[#D6F0E4] max-w-xl mx-auto leading-relaxed">
            Whether you adopt, donate surgical equipment, sponsor a disabled cat at Biraal Bari, or volunteer on weekends, you become part of this transformation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/get-involved">
              <Button variant="terracotta" size="lg">
                Explore Ways to Help
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Contact Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
