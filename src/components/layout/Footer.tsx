import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Heart, Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#132E22] text-[#FAF8F5] pt-12 sm:pt-16 pb-28 sm:pb-12 border-t border-[#1D4336]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#235442]">
          {/* Column 1: Organization Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1A382B] border border-[#3C7D63] text-[#FAF8F5] flex items-center justify-center">
                <PawPrint className="w-5 h-5 text-[#F2B73B]" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                AniRBan<span className="text-[#E48B6D]">.</span> Trust
              </span>
            </Link>
            
            <p className="text-sm text-[#D6F0E4]/80 leading-relaxed max-w-sm">
              AniRBan Trust is a dedicated animal welfare organization in Bangladesh committed to ethical rescue, critical veterinary surgery, transparent adoption, and specialized sanctuary care at <strong className="text-white">Biraal Bari</strong>.
            </p>

            <div className="pt-2 text-xs text-[#B0DECB]/80 space-y-1.5">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F2B73B] shrink-0" />
                <span>Emergency Hotline: <strong className="text-white">+880 1700-000000</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F2B73B] shrink-0" />
                <span>General inquiries: <a href="mailto:care@anirbantrust.org" className="underline hover:text-white">care@anirbantrust.org</a></span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F2B73B] shrink-0 mt-0.5" />
                <span>Sanctuary & Clinic: Mirpur / Dhaka Division, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white tracking-wide mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-[#D6F0E4]/80">
              <li>
                <Link to="/about" className="hover:text-white hover:underline transition-colors">About AniRBan</Link>
              </li>
              <li>
                <Link to="/our-work" className="hover:text-white hover:underline transition-colors">Our Work & TNR</Link>
              </li>
              <li>
                <Link to="/animals" className="hover:text-white hover:underline transition-colors">Animal Directory</Link>
              </li>
              <li>
                <Link to="/biraal-bari" className="hover:text-[#F2B73B] transition-colors flex items-center gap-1.5">
                  <span>Biraal Bari Sanctuary</span>
                  <span className="text-[10px] bg-[#FACFC2] text-[#893720] px-1 rounded-sm font-semibold">Special</span>
                </Link>
              </li>
              <li>
                <Link to="/biraal-bari/residents" className="hover:text-white hover:underline transition-colors">Sanctuary Residents</Link>
              </li>
              <li>
                <Link to="/stories" className="hover:text-white hover:underline transition-colors">Rescue Stories</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-white hover:underline transition-colors">Visual Gallery</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Get Involved */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white tracking-wide mb-4">
              Get Involved
            </h4>
            <ul className="space-y-2.5 text-sm text-[#D6F0E4]/80">
              <li>
                <Link to="/adopt" className="hover:text-white hover:underline transition-colors">Adopt an Animal</Link>
              </li>
              <li>
                <Link to="/sponsor" className="hover:text-white hover:underline transition-colors">Sponsor a Resident</Link>
              </li>
              <li>
                <Link to="/volunteer" className="hover:text-white hover:underline transition-colors">Volunteer Opportunities</Link>
              </li>
              <li>
                <Link to="/report-rescue" className="hover:text-[#E88667] font-medium transition-colors">Report Injured Animal</Link>
              </li>
              <li>
                <Link to="/donate" className="hover:text-white hover:underline transition-colors">Donate (bKash/Nagad/Card)</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white hover:underline transition-colors">Contact & Visiting Policy</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white tracking-wide mb-2">
              Stay Connected
            </h4>
            <p className="text-xs text-[#D6F0E4]/70 mb-4 leading-relaxed">
              Receive monthly recovery updates, happy adoption stories, and sanctuary news from Biraal Bari.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-[#1D4336] border border-[#3C7D63] text-xs text-[#B0DECB] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7DC0A4] shrink-0" />
                <span>Thank you for joining our community of compassion!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full bg-[#1A382B] border border-[#2F624D] rounded-xl px-3.5 py-2 text-xs text-white placeholder-[#7DC0A4]/60 focus:outline-none focus:border-[#7DC0A4]"
                  />
                </div>
                <Button variant="terracotta" size="sm" type="submit" className="w-full">
                  Subscribe
                </Button>
              </form>
            )}

            <div className="mt-4 pt-3 border-t border-[#235442] flex items-center gap-3 text-xs text-[#B0DECB]">
              <Heart className="w-4 h-4 text-[#E48B6D] fill-[#E48B6D] shrink-0" />
              <span>100% voluntary, nonprofit initiative in Dhaka.</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7DC0A4]/70 gap-4">
          <p>© {new Date().getFullYear()} AniRBan Trust. All rights reserved. Registered Animal Welfare Trust in Bangladesh.</p>
          <div className="flex items-center space-x-6">
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Privacy & Terms</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Sanctuary Ethics</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
