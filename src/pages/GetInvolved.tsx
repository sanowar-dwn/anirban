import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Home, 
  Users, 
  Sparkles, 
  AlertTriangle, 
  Building2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Button } from '../components/ui/Button';

export const GetInvolved: React.FC = () => {
  const avenues = [
    {
      title: 'Adopt an Animal',
      category: 'Lifelong Family',
      desc: 'Give a rescued cat or dog the warm, indoor home they have waited their whole lives for.',
      link: '/adopt',
      cta: 'View Adoptable Animals',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
      badge: 'High Impact'
    },
    {
      title: 'Donate Funds',
      category: 'Medical & Sustenance',
      desc: 'Directly finance life-saving surgeries, medicine, emergency ambulance fuel, and food.',
      link: '/donate',
      cta: 'Make a Contribution',
      image: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80',
      badge: 'Immediate Need'
    },
    {
      title: 'Sponsor a Resident',
      category: 'Biraal Bari Guardian',
      desc: 'Commit to a monthly contribution that covers specialized food and hospice care for a disabled cat.',
      link: '/sponsor',
      cta: 'Choose an Animal to Sponsor',
      image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80',
      badge: 'Monthly Care'
    },
    {
      title: 'Volunteer in Dhaka',
      category: 'Hands-On Action',
      desc: 'Help at the sanctuary, foster vulnerable neonates, or assist in photography and digital advocacy.',
      link: '/volunteer',
      cta: 'Apply to Volunteer',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
      badge: 'Community'
    },
    {
      title: 'Report an Injured Animal',
      category: 'Emergency Response',
      desc: 'Use our 24/7 rescue portal to dispatch veterinary assistance to animals in severe distress.',
      link: '/report-rescue',
      cta: 'File Emergency Report',
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80',
      badge: 'Emergency'
    },
    {
      title: 'Corporate & Institutional Partnerships',
      category: 'CSR & Sponsorship',
      desc: 'Partner with AniRBan to sponsor sanctuary wings, hospital equipment, or citywide rabies drives.',
      link: '/contact?type=corporate',
      cta: 'Inquire About Partnerships',
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
      badge: 'CSR'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Header */}
      <section className="bg-[#FAF8F5] border-b border-[#EAE4D7] pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Get Involved' }]} className="mb-6" />

          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest font-bold text-[#C65332] mb-2 block">
              Join Our Movement
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-[#1E2421] leading-tight mb-4">
              Every Helping Hand Creates a Safer Dhaka.
            </h1>
            <p className="text-base sm:text-lg text-[#59655E] leading-relaxed">
              You don’t have to be a veterinarian to save a life. Discover how your compassion, skills, or resources can transform the future of vulnerable animals in Bangladesh.
            </p>
          </div>
        </div>
      </section>

      {/* Large Visual Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {avenues.map((item, idx) => (
            <div
              key={idx}
              className="group bg-[#FAF8F5] rounded-3xl border border-[#D8CEBE] overflow-hidden hover:border-[#1A382B]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#EAE4D7]">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover img-zoom" />
                  <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs text-[#1E2421] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {item.badge}
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C65332] block">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#1E2421] group-hover:text-[#1A382B] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#59655E] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link to={item.link} className="block">
                  <Button variant="outline" size="md" className="w-full group-hover:bg-[#1A382B] group-hover:text-white group-hover:border-[#1A382B] transition-colors">
                    <span>{item.cta}</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
