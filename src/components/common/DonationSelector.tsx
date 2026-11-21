import React, { useState } from 'react';
import { Heart, CheckCircle2, ShieldCheck, Sparkles, Info } from 'lucide-react';
import { Button } from '../ui/Button';
import { donationsService } from '../../services/donations';
import { useToast } from '../../context/ToastContext';

interface DonationSelectorProps {
  initialPurpose?: 'General Care' | 'Medical Care' | 'Biraal Bari' | 'Rescue Operations' | 'Animal Sponsorship' | 'Sponsor a Cat';
  animalSlug?: string;
  animalName?: string;
  onSuccess?: (receiptNo: string) => void;
}

export const DonationSelector: React.FC<DonationSelectorProps> = ({
  initialPurpose = 'Animal Sponsorship',
  animalSlug,
  animalName,
  onSuccess
}) => {
  // Mode: 'sponsor-cat' (Monthly ৳2,500) vs 'one-time' (USD presets $100, $250, $500, Custom)
  const isInitialSponsorship = initialPurpose === 'Animal Sponsorship' || initialPurpose === 'Sponsor a Cat' || !!animalName;
  const [givingType, setGivingType] = useState<'sponsor-cat' | 'one-time'>(
    isInitialSponsorship ? 'sponsor-cat' : 'one-time'
  );

  // Currency for one-time donation: USD by default as requested
  const [currency, setCurrency] = useState<'USD' | 'BDT'>('USD');

  // Amounts
  const [selectedAmount, setSelectedAmount] = useState<number>(givingType === 'sponsor-cat' ? 2500 : 100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState(false);
  const [purpose, setPurpose] = useState(initialPurpose);

  // Donor form fields
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<
    'bKash' | 'Nagad' | 'Visa/Mastercard' | 'Bank Transfer' | 'International Card / PayPal'
  >(givingType === 'sponsor-cat' ? 'bKash' : 'Visa/Mastercard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedReceipt, setCompletedReceipt] = useState<{
    receiptNumber: string;
    amount: number;
    currency: 'USD' | 'BDT';
    frequency: 'one-time' | 'monthly';
    paymentMethod: string;
    purpose: string;
  } | null>(null);

  const { showToast } = useToast();

  const usdPresetAmounts = [100, 250, 500];
  const bdtMonthlyPresets = [2500, 5000, 10000];
  const bdtOneTimePresets = [1000, 2500, 5000, 10000];

  const currentCurrency = givingType === 'sponsor-cat' ? 'BDT' : currency;
  const currentFrequency = givingType === 'sponsor-cat' ? 'monthly' : 'one-time';
  const currentAmount = isCustom ? Number(customAmount) || 0 : selectedAmount;

  const handleGivingTypeChange = (type: 'sponsor-cat' | 'one-time') => {
    setGivingType(type);
    setIsCustom(false);
    setCustomAmount('');
    if (type === 'sponsor-cat') {
      setSelectedAmount(2500);
      setPurpose('Sponsor a Cat');
      setPaymentMethod('bKash');
    } else {
      setCurrency('USD');
      setSelectedAmount(100);
      setPurpose(initialPurpose === 'Animal Sponsorship' ? 'Sponsor a Cat' : initialPurpose);
      setPaymentMethod('Visa/Mastercard');
    }
  };

  // Dynamic impact message
  const getImpactMessage = () => {
    if (givingType === 'sponsor-cat') {
      return `Your ৳2,500/month sponsorship directly provides nutritious daily meals, sanitary shelter, clean litter, and compassionate sanctuary care for a resident cat at Biraal Bari.`;
    }

    if (currentCurrency === 'USD') {
      if (currentAmount >= 500) {
        return `Your $${currentAmount} USD gift covers critical trauma stabilization, complex orthopedic surgery, and extensive sanctuary hospice care.`;
      }
      if (currentAmount >= 250) {
        return `Your $${currentAmount} USD gift finances life-saving surgical operations, spay/neuter drives, and two full months of sanctuary sustenance.`;
      }
      if (currentAmount >= 100) {
        return `Your $${currentAmount} USD gift provides essential emergency triage, core vaccinations, and high-nutrition recovery food for rescued street cats.`;
      }
      return `Your $${currentAmount} USD contribution directly saves lives and empowers front-line feline rescues at AniRBan Trust.`;
    } else {
      if (currentAmount >= 5000) {
        return `Your ৳${currentAmount.toLocaleString()} contribution funds major surgical interventions, orthopedic trauma repair, or comprehensive multi-month recovery.`;
      }
      if (currentAmount >= 2500) {
        return `Your ৳${currentAmount.toLocaleString()} contribution provides specialized veterinary rehabilitation, wound dressings, and therapeutic diet for a resident.`;
      }
      return `Your ৳${currentAmount.toLocaleString()} contribution provides life-saving emergency medical first-aid and nutrition for street animals in distress.`;
    }
  };

  const handleDonateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const minAmount = currentCurrency === 'USD' ? 10 : 100;
    if (currentAmount < minAmount) {
      showToast(
        `Please enter an amount of at least ${currentCurrency === 'USD' ? '$10 USD' : '৳100 BDT'}`,
        'error'
      );
      return;
    }
    if (!donorName.trim() || !donorEmail.trim() || !donorPhone.trim()) {
      showToast('Please complete all contact details', 'error');
      return;
    }

    setIsProcessing(true);
    try {
      const record = await donationsService.processDonation({
        amount: currentAmount,
        currency: currentCurrency,
        amountBDT: currentCurrency === 'USD' ? currentAmount * 120 : currentAmount,
        frequency: currentFrequency,
        purpose,
        animalSlug,
        donorName,
        donorEmail,
        donorPhone,
        paymentMethod
      });

      setIsProcessing(false);
      setCompletedReceipt({
        receiptNumber: record.receiptNumber,
        amount: currentAmount,
        currency: currentCurrency,
        frequency: currentFrequency,
        paymentMethod,
        purpose
      });
      const currencySymbol = currentCurrency === 'USD' ? '$' : '৳';
      showToast(
        `Thank you for your generous gift of ${currencySymbol}${currentAmount.toLocaleString()} ${currentCurrency}!`,
        'success'
      );
      if (onSuccess) onSuccess(record.receiptNumber);
    } catch {
      setIsProcessing(false);
      showToast('Payment simulation failed, please try again.', 'error');
    }
  };

  if (completedReceipt) {
    const symbol = completedReceipt.currency === 'USD' ? '$' : '৳';
    return (
      <div className="bg-[#FAF8F5] rounded-3xl border border-[#B0DECB] p-8 sm:p-10 text-center shadow-lg animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-full bg-[#EDF8F3] border border-[#B0DECB] flex items-center justify-center text-[#1A382B] mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-[#2C6A53]" />
        </div>
        <h3 className="font-serif text-3xl font-bold text-[#1E2421] mb-2">
          Thank You for Changing a Life
        </h3>
        <p className="text-sm text-[#59655E] max-w-md mx-auto mb-6">
          Your simulated contribution of{' '}
          <strong className="text-[#1A382B]">
            {symbol}{completedReceipt.amount.toLocaleString()} {completedReceipt.currency}
            {completedReceipt.frequency === 'monthly' ? ' / month' : ' (One-Time)'}
          </strong>{' '}
          has been recorded. Your kindness directly fuels life-saving rescues and sanctuary shelter at Biraal Bari.
        </p>

        <div className="bg-[#F3EFE8] rounded-xl p-4 max-w-sm mx-auto text-left text-xs space-y-1 mb-6 border border-[#D8CEBE]">
          <div className="flex justify-between">
            <span className="text-[#75837B]">Receipt Number:</span>
            <span className="font-mono font-bold text-[#1E2421]">{completedReceipt.receiptNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#75837B]">Donor Name:</span>
            <span className="font-medium text-[#1E2421]">{donorName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#75837B]">Giving Type:</span>
            <span className="font-medium text-[#1E2421]">
              {completedReceipt.frequency === 'monthly' ? 'Monthly Sponsor a Cat' : '1-Time Donation'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#75837B]">Purpose:</span>
            <span className="font-medium text-[#1E2421]">
              {completedReceipt.purpose} {animalName ? `(${animalName})` : ''}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#75837B]">Payment Method:</span>
            <span className="font-medium text-[#1E2421]">{completedReceipt.paymentMethod}</span>
          </div>
        </div>

        <Button
          variant="secondary"
          size="md"
          onClick={() => {
            setCompletedReceipt(null);
            setCustomAmount('');
            setIsCustom(false);
          }}
        >
          Make Another Contribution
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] rounded-3xl border border-[#D8CEBE] p-4 sm:p-10 shadow-sm">
      <form onSubmit={handleDonateSubmit} className="space-y-6">
        {/* Main Mode Toggle: "Sponsor a Cat" vs "1-Time Donation" */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#75837B] mb-2 text-center sm:text-left">
            Select Giving Option
          </label>
          <div className="grid grid-cols-2 p-1 bg-[#F3EFE8] rounded-2xl border border-[#D8CEBE] gap-1.5">
            <button
              type="button"
              onClick={() => handleGivingTypeChange('sponsor-cat')}
              className={`px-3 sm:px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
                givingType === 'sponsor-cat'
                  ? 'bg-[#1A382B] text-white shadow-sm'
                  : 'text-[#59655E] hover:text-[#1E2421]'
              }`}
            >
              <span>🐾 Sponsor a Cat</span>
              <span className="hidden sm:inline text-[11px] opacity-80">(Monthly)</span>
            </button>
            <button
              type="button"
              onClick={() => handleGivingTypeChange('one-time')}
              className={`px-3 sm:px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
                givingType === 'one-time'
                  ? 'bg-[#1A382B] text-white shadow-sm'
                  : 'text-[#59655E] hover:text-[#1E2421]'
              }`}
            >
              <span>💝 1-Time Donation</span>
              <span className="hidden sm:inline text-[11px] opacity-80">(USD / Single)</span>
            </button>
          </div>
        </div>

        {/* --- OPTION A: SPONSOR A CAT PROGRAM (৳2,500 / month) --- */}
        {givingType === 'sponsor-cat' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Detailed Care Breakdown Box */}
            <div className="bg-[#FDFCF9] rounded-2xl border-2 border-[#B0DECB] p-4 sm:p-5 space-y-3 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-[#D8CEBE]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#EDF8F3] text-[#1A382B] flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-[#C65332]" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base text-[#1E2421]">
                      Sponsor a Cat Care Cost Breakdown
                    </h4>
                    <p className="text-[11px] text-[#75837B]">
                      Full monthly sanctuary upkeep for one resident cat
                    </p>
                  </div>
                </div>
                <div className="self-start sm:self-center bg-[#1A382B] text-white font-serif font-bold text-sm px-3 py-1 rounded-full">
                  ৳2,500 / month
                </div>
              </div>

              {/* Itemized Breakdown Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#D8CEBE] flex items-start gap-2.5">
                  <span className="text-xl">🍲</span>
                  <div>
                    <span className="font-bold text-xs text-[#1E2421] block">Food & Nutrition</span>
                    <span className="text-[#C65332] font-semibold text-xs block">৳1,200 – ৳1,500</span>
                    <span className="text-[11px] text-[#59655E] leading-tight block mt-0.5">
                      High-protein wet and dry therapeutic feline diet
                    </span>
                  </div>
                </div>

                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#D8CEBE] flex items-start gap-2.5">
                  <span className="text-xl">🏠</span>
                  <div>
                    <span className="font-bold text-xs text-[#1E2421] block">Overheads & Daily Care</span>
                    <span className="text-[#2C6A53] font-semibold text-xs block">৳1,000 – ৳1,300</span>
                    <span className="text-[11px] text-[#59655E] leading-tight block mt-0.5">
                      Sanctuary utility, cleaning, litter & misc supplies
                    </span>
                  </div>
                </div>
              </div>

              {/* Important Medical Disclaimer Notice */}
              <div className="p-3 bg-[#EDF8F3] rounded-xl border border-[#B0DECB] text-[#1D4336] flex items-start gap-2 text-xs leading-relaxed">
                <Info className="w-4 h-4 text-[#2C6A53] shrink-0 mt-0.5" />
                <div>
                  <strong>Approximate monthly care amount without medical costs.</strong> Major orthopedic surgeries, clinical diagnostics, and emergency therapies are funded separately through our Emergency Medical Care Fund.
                </div>
              </div>
            </div>

            {/* Amount Selection for Sponsor a Cat */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#75837B] mb-2">
                Monthly Sponsorship Amount (BDT ৳)
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {bdtMonthlyPresets.map((amt) => {
                  const isStandard = amt === 2500;
                  const active = !isCustom && selectedAmount === amt;
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(amt);
                        setIsCustom(false);
                      }}
                      className={`relative py-3 px-3 rounded-xl text-center border-2 transition-all ${
                        active
                          ? 'border-[#C65332] bg-[#FDF5F2] text-[#893720] shadow-xs'
                          : 'border-[#D8CEBE] bg-[#FDFCF9] text-[#1E2421] hover:border-[#1A382B]'
                      }`}
                    >
                      {isStandard && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#C65332] text-white text-[9px] font-bold px-2 py-0.2 rounded-full uppercase tracking-wider">
                          Standard
                        </span>
                      )}
                      <div className="font-serif text-lg font-bold">৳{amt.toLocaleString()}</div>
                      <div className="text-[10px] text-[#75837B]">{isStandard ? 'Full Care' : 'Guardian Plus'}</div>
                    </button>
                  );
                })}
              </div>

              {/* Custom amount input for Sponsor a Cat */}
              <div className="mt-2.5">
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#75837B]">৳</span>
                  <input
                    type="number"
                    min="500"
                    step="100"
                    placeholder="Or enter a custom monthly amount (min ৳500)"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setIsCustom(true);
                    }}
                    className={`w-full pl-8 pr-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                      isCustom
                        ? 'border-[#C65332] bg-white ring-1 ring-[#C65332]'
                        : 'border-[#D8CEBE] bg-[#FDFCF9]'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- OPTION B: 1-TIME DONATION (USD: $100, $250, $500, Custom) --- */}
        {givingType === 'one-time' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Currency selector banner */}
            <div className="flex items-center justify-between pb-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#75837B]">
                Choose 1-Time Donation Amount ({currentCurrency})
              </label>
              <div className="flex items-center gap-1 bg-[#F3EFE8] p-0.5 rounded-lg border border-[#D8CEBE] text-[11px]">
                <button
                  type="button"
                  onClick={() => {
                    setCurrency('USD');
                    setSelectedAmount(100);
                    setIsCustom(false);
                    setPaymentMethod('Visa/Mastercard');
                  }}
                  className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                    currentCurrency === 'USD'
                      ? 'bg-[#1A382B] text-white'
                      : 'text-[#59655E] hover:text-[#1E2421]'
                  }`}
                >
                  USD ($)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrency('BDT');
                    setSelectedAmount(2500);
                    setIsCustom(false);
                    setPaymentMethod('bKash');
                  }}
                  className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                    currentCurrency === 'BDT'
                      ? 'bg-[#1A382B] text-white'
                      : 'text-[#59655E] hover:text-[#1E2421]'
                  }`}
                >
                  BDT (৳)
                </button>
              </div>
            </div>

            {/* USD Presets: 100 USD, 250 USD, 500 USD, and Custom */}
            {currentCurrency === 'USD' ? (
              <div>
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                  {usdPresetAmounts.map((amt) => {
                    const active = !isCustom && selectedAmount === amt;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(amt);
                          setIsCustom(false);
                        }}
                        className={`py-3.5 px-3 rounded-xl text-center border-2 transition-all ${
                          active
                            ? 'border-[#C65332] bg-[#FDF5F2] text-[#893720] shadow-xs'
                            : 'border-[#D8CEBE] bg-[#FDFCF9] text-[#1E2421] hover:border-[#1A382B]'
                        }`}
                      >
                        <div className="font-serif text-lg font-bold">${amt}</div>
                        <div className="text-[10px] text-[#75837B]">USD</div>
                      </button>
                    );
                  })}
                </div>

                {/* Custom USD Amount Field */}
                <div className="mt-2.5">
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#75837B]">$</span>
                    <input
                      type="number"
                      min="10"
                      step="10"
                      placeholder="Or enter a custom 1-time amount in USD (min $10)"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setIsCustom(true);
                      }}
                      className={`w-full pl-8 pr-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                        isCustom
                          ? 'border-[#C65332] bg-white ring-1 ring-[#C65332]'
                          : 'border-[#D8CEBE] bg-[#FDFCF9]'
                      }`}
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* BDT Presets for One-Time */
              <div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {bdtOneTimePresets.map((amt) => {
                    const active = !isCustom && selectedAmount === amt;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(amt);
                          setIsCustom(false);
                        }}
                        className={`py-3 px-3 rounded-xl text-center border-2 transition-all ${
                          active
                            ? 'border-[#C65332] bg-[#FDF5F2] text-[#893720] shadow-xs'
                            : 'border-[#D8CEBE] bg-[#FDFCF9] text-[#1E2421] hover:border-[#1A382B]'
                        }`}
                      >
                        <div className="font-serif text-base font-bold">৳{amt.toLocaleString()}</div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-2.5">
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#75837B]">৳</span>
                    <input
                      type="number"
                      min="100"
                      step="50"
                      placeholder="Or enter a custom amount (min ৳100)"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setIsCustom(true);
                      }}
                      className={`w-full pl-8 pr-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                        isCustom
                          ? 'border-[#C65332] bg-white ring-1 ring-[#C65332]'
                          : 'border-[#D8CEBE] bg-[#FDFCF9]'
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Interactive impact description */}
        <div className="p-4 rounded-xl bg-[#EDF8F3] border border-[#B0DECB] text-xs sm:text-sm text-[#1D4336] flex items-start gap-2.5">
          <Heart className="w-4 h-4 text-[#C65332] fill-[#C65332] shrink-0 mt-0.5" />
          <p className="leading-relaxed">{getImpactMessage()}</p>
        </div>

        {/* Purpose selection */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#75837B] mb-2">
            Designate Gift Purpose
          </label>
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value as any)}
            className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-4 py-2.5 text-sm text-[#1E2421] focus:ring-2 focus:ring-[#1A382B] outline-none"
          >
            <option value="Sponsor a Cat">Sponsor a Cat (Biraal Bari Resident Care)</option>
            <option value="Biraal Bari">Biraal Bari Sanctuary General Fund</option>
            <option value="Medical Care">Emergency Veterinary Trauma & Surgery</option>
            <option value="General Care">General Animal Care & Operations</option>
            <option value="Rescue Operations">24/7 Field Rescue Ambulance</option>
          </select>
        </div>

        {/* Donor information */}
        <div className="pt-2 border-t border-[#EAE4D7] space-y-4">
          <h4 className="font-serif text-base font-semibold text-[#1E2421]">Donor Information</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#75837B] mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Ayesha Rahman"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2 text-sm text-[#1E2421] outline-none focus:border-[#1A382B]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#75837B] mb-1">
                Email Address (For Official Receipt)
              </label>
              <input
                type="email"
                required
                placeholder="ayesha@example.com"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2 text-sm text-[#1E2421] outline-none focus:border-[#1A382B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#75837B] mb-1">
              Phone Number {currentCurrency === 'USD' ? '(with country code)' : '(Bangladesh)'}
            </label>
            <input
              type="tel"
              required
              placeholder={currentCurrency === 'USD' ? '+1 555-0199 or +880 17...' : '+880 17XXXXXXXX'}
              value={donorPhone}
              onChange={(e) => setDonorPhone(e.target.value)}
              className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2 text-sm text-[#1E2421] outline-none focus:border-[#1A382B]"
            />
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#75837B] mb-2">
            Payment Method {currentCurrency === 'USD' ? '(International & Local)' : '(Bangladesh)'}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(currentCurrency === 'USD'
              ? (['Visa/Mastercard', 'International Card / PayPal', 'Bank Transfer', 'bKash'] as const)
              : (['bKash', 'Nagad', 'Visa/Mastercard', 'Bank Transfer'] as const)
            ).map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setPaymentMethod(method)}
                className={`p-3 rounded-xl text-center text-xs font-bold border transition-all ${
                  paymentMethod === method
                    ? 'border-[#1A382B] bg-[#EDF8F3] text-[#1D4336]'
                    : 'border-[#D8CEBE] bg-[#FDFCF9] text-[#59655E] hover:border-[#75837B]'
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        {/* Trust banner */}
        <div className="flex items-center gap-2 text-xs text-[#75837B] bg-[#F3EFE8] p-3 rounded-xl border border-[#D8CEBE]">
          <ShieldCheck className="w-4 h-4 text-[#2C6A53] shrink-0" />
          <span>Transparent NGO accounting. Official donation receipt generated instantly.</span>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="terracotta"
          size="lg"
          className="w-full"
          isLoading={isProcessing}
          icon={<Heart className="w-4 h-4 fill-white" />}
        >
          {givingType === 'sponsor-cat'
            ? `Confirm Cat Sponsorship of ৳${currentAmount.toLocaleString()} / month`
            : `Confirm 1-Time Contribution of ${currentCurrency === 'USD' ? '$' : '৳'}${currentAmount.toLocaleString()} ${currentCurrency}`}
        </Button>
      </form>
    </div>
  );
};

