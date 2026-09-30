import React from 'react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { DonationSelector } from '../components/common/DonationSelector';
import { ShieldCheck, Heart, Sparkles, CheckCircle2, Award } from 'lucide-react';
import { campaignsData } from '../data/campaigns';

export const Donate: React.FC = () => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Hero Header */}
      <section className="bg-[#FAF8F5] border-b border-[#EAE4D7] pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Donate' }]} className="mb-6" />

          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest font-bold text-[#C65332] mb-2 block">
              Every Taka Saves a Life
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-[#1E2421] leading-tight mb-4">
              Your Support Changes a Life.
            </h1>
            <p className="text-base sm:text-lg text-[#59655E] leading-relaxed">
              AniRBan Trust relies 100% on compassionate citizens to fund emergency surgical operations, medical rehabilitation, and sanctuary shelter at Biraal Bari.
            </p>
          </div>
        </div>
      </section>

      {/* Main Donation Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Donation Selector Form */}
          <div className="lg:col-span-7">
            <DonationSelector initialPurpose="General Care" />
          </div>

          {/* Right Column: Trust & Impact Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            {/* Allocation statement */}
            <div className="bg-[#FAF8F5] rounded-3xl border border-[#D8CEBE] p-6 sm:p-8 space-y-6 shadow-sm">
              <h3 className="font-serif text-2xl font-bold text-[#1E2421] pb-2 border-b border-[#EAE4D7]">
                How Your Donation is Spent
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#3E4742]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#EDF8F3] text-[#1A382B] flex items-center justify-center shrink-0">
                    <Heart className="w-4 h-4 text-[#2C6A53]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1E2421]">Veterinary Surgery & Medicine (60%)</h4>
                    <p className="text-[#75837B] mt-0.5">X-rays, anesthesia, orthopedic pinning, rabies and core viral immunizations.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FDF5F2] text-[#C65332] flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-[#C65332]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1E2421]">Biraal Bari Sanctuary Shelter (25%)</h4>
                    <p className="text-[#75837B] mt-0.5">Nutritious high-protein diets, heating pads, and hygiene care for 40+ permanent residents.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#F3EFE8] text-[#1E2421] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-[#1A382B]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1E2421]">Rescue Ambulance & Fuel (15%)</h4>
                    <p className="text-[#75837B] mt-0.5">24/7 emergency dispatch response across Greater Dhaka.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Offline / Bank Details in Bangladesh */}
            <div className="bg-[#1A382B] text-white rounded-3xl p-6 sm:p-8 space-y-4">
              <span className="text-xs uppercase font-bold tracking-widest text-[#F2B73B] block">
                Direct Bangladesh Banking
              </span>
              <h4 className="font-serif text-xl font-bold">
                Official Trust Account Details
              </h4>
              <div className="text-xs space-y-2 text-[#D6F0E4] font-mono">
                <p><strong>Account Name:</strong> AniRBan Trust</p>
                <p><strong>Bank:</strong> Dutch-Bangla Bank PLC / BRAC Bank PLC</p>
                <p><strong>bKash / Nagad Merchant:</strong> 01700-000000</p>
              </div>
              <p className="text-[11px] text-[#B0DECB]">
                Please email your bank deposit slip or transaction ID to <a href="mailto:care@anirbantrust.org" className="underline font-bold">care@anirbantrust.org</a> to receive your formal tax receipt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Urgent Campaigns */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C65332] block mb-1">
            Specialized Appeals
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#1E2421]">
            Active Community Campaigns
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {campaignsData.map((camp) => {
            const percentage = Math.round((camp.raisedBDT / camp.goalBDT) * 100);
            return (
              <div key={camp.id} className="bg-[#FAF8F5] rounded-3xl border border-[#D8CEBE] overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/9] overflow-hidden bg-[#EAE4D7]">
                    <img src={camp.image} alt={camp.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#893720] bg-[#FDF5F2] px-2.5 py-0.5 rounded-full border border-[#FACFC2]">
                      {camp.urgency}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#1E2421]">{camp.title}</h3>
                    <p className="text-xs text-[#59655E] leading-relaxed">{camp.tagline}</p>

                    {/* Progress bar */}
                    <div className="pt-2">
                      <div className="w-full h-2 rounded-full bg-[#EAE4D7] overflow-hidden">
                        <div
                          className="h-full bg-[#C65332] rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs font-semibold text-[#1E2421] mt-2">
                        <span>৳{camp.raisedBDT.toLocaleString()} raised</span>
                        <span className="text-[#75837B]">{percentage}% of ৳{camp.goalBDT.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <a href="#top" onClick={() => window.scrollTo({ top: 350, behavior: 'smooth' })}>
                    <button className="w-full py-2.5 rounded-full text-xs font-bold bg-[#1A382B] text-white hover:bg-[#132E22] transition-colors">
                      Contribute to Campaign
                    </button>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
