import React, { useState } from 'react';
import { Heart, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { donationsService } from '../../services/donations';
import { useToast } from '../../context/ToastContext';

interface DonationSelectorProps {
  initialPurpose?: 'General Care' | 'Medical Care' | 'Biraal Bari' | 'Rescue Operations' | 'Animal Sponsorship';
  animalSlug?: string;
  animalName?: string;
  onSuccess?: (receiptNo: string) => void;
}

export const DonationSelector: React.FC<DonationSelectorProps> = ({
  initialPurpose = 'General Care',
  animalSlug,
  animalName,
  onSuccess
}) => {
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('monthly');
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState(false);
  const [purpose, setPurpose] = useState(initialPurpose);

  // Donor form fields
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'bKash' | 'Nagad' | 'Visa/Mastercard' | 'Bank Transfer'>('bKash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedReceipt, setCompletedReceipt] = useState<string | null>(null);

  const { showToast } = useToast();

  const presetAmounts = [500, 1000, 2500, 5000];

  const currentAmount = isCustom ? Number(customAmount) || 0 : selectedAmount;

  // Impact message based on selected amount (in BDT)
  const getImpactMessage = (amount: number) => {
    if (amount >= 5000) {
      return `Your ৳${amount.toLocaleString()} contribution funds major surgical interventions, orthopedic trauma repair, or comprehensive multi-month recovery.`;
    }
    if (amount >= 2500) {
      return `Your ৳${amount.toLocaleString()} contribution provides a month of specialized veterinary rehabilitation, wound dressings, and therapeutic diet for a Biraal Bari resident.`;
    }
    if (amount >= 1000) {
      return `Your ৳${amount.toLocaleString()} contribution can help support nutritious food, deworming, and core vaccination for animals in emergency rescue triage.`;
    }
    return `Your ৳${amount.toLocaleString()} contribution provides life-saving emergency medical first-aid fluids and sterile supplies for rescued street animals.`;
  };

  const handleDonateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAmount < 100) {
      showToast('Please enter an amount of at least ৳100', 'error');
      return;
    }
    if (!donorName.trim() || !donorEmail.trim() || !donorPhone.trim()) {
      showToast('Please complete all contact details', 'error');
      return;
    }

    setIsProcessing(true);
    try {
      const record = await donationsService.processDonation({
        amountBDT: currentAmount,
        frequency,
        purpose,
        animalSlug,
        donorName,
        donorEmail,
        donorPhone,
        paymentMethod
      });

      setIsProcessing(false);
      setCompletedReceipt(record.receiptNumber);
      showToast(`Thank you for your generous gift of ৳${record.amountBDT}!`, 'success');
      if (onSuccess) onSuccess(record.receiptNumber);
    } catch {
      setIsProcessing(false);
      showToast('Simulation failed, please try again.', 'error');
    }
  };

  if (completedReceipt) {
    return (
      <div className="bg-[#FAF8F5] rounded-3xl border border-[#B0DECB] p-8 sm:p-10 text-center shadow-lg animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-full bg-[#EDF8F3] border border-[#B0DECB] flex items-center justify-center text-[#1A382B] mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-[#2C6A53]" />
        </div>
        <h3 className="font-serif text-3xl font-bold text-[#1E2421] mb-2">
          Thank You for Changing a Life
        </h3>
        <p className="text-sm text-[#59655E] max-w-md mx-auto mb-6">
          Your simulated donation of <strong className="text-[#1A382B]">৳{currentAmount.toLocaleString()}</strong> has been recorded. Your kindness directly fuels life-saving rescues and sanctuary shelter at Biraal Bari.
        </p>

        <div className="bg-[#F3EFE8] rounded-xl p-4 max-w-sm mx-auto text-left text-xs space-y-1 mb-6 border border-[#D8CEBE]">
          <div className="flex justify-between">
            <span className="text-[#75837B]">Receipt Number:</span>
            <span className="font-mono font-bold text-[#1E2421]">{completedReceipt}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#75837B]">Donor Name:</span>
            <span className="font-medium text-[#1E2421]">{donorName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#75837B]">Purpose:</span>
            <span className="font-medium text-[#1E2421]">{purpose} {animalName ? `(${animalName})` : ''}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#75837B]">Method:</span>
            <span className="font-medium text-[#1E2421]">{paymentMethod}</span>
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
        {/* Frequency toggle */}
        <div className="flex justify-center">
          <div className="w-full sm:w-auto grid grid-cols-2 sm:flex p-1 bg-[#F3EFE8] rounded-2xl sm:rounded-full border border-[#D8CEBE] gap-1">
            <button
              type="button"
              onClick={() => setFrequency('monthly')}
              className={`px-3 sm:px-6 py-2.5 sm:py-2 rounded-xl sm:rounded-full text-xs font-semibold transition-all text-center ${
                frequency === 'monthly'
                  ? 'bg-[#1A382B] text-white shadow-xs'
                  : 'text-[#59655E] hover:text-[#1E2421]'
              }`}
            >
              Monthly Giving
            </button>
            <button
              type="button"
              onClick={() => setFrequency('one-time')}
              className={`px-3 sm:px-6 py-2.5 sm:py-2 rounded-xl sm:rounded-full text-xs font-semibold transition-all text-center ${
                frequency === 'one-time'
                  ? 'bg-[#1A382B] text-white shadow-xs'
                  : 'text-[#59655E] hover:text-[#1E2421]'
              }`}
            >
              One-Time Gift
            </button>
          </div>
        </div>

        {/* Amount Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#75837B] mb-3 text-center sm:text-left">
            Choose Amount (BDT ৳)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {presetAmounts.map((amt) => {
              const active = !isCustom && selectedAmount === amt;
              return (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    setSelectedAmount(amt);
                    setIsCustom(false);
                  }}
                  className={`py-3.5 px-4 rounded-xl text-center font-serif text-lg font-bold border-2 transition-all ${
                    active
                      ? 'border-[#C65332] bg-[#FDF5F2] text-[#893720] shadow-xs'
                      : 'border-[#D8CEBE] bg-[#FDFCF9] text-[#1E2421] hover:border-[#1A382B]'
                  }`}
                >
                  ৳{amt.toLocaleString()}
                </button>
              );
            })}
          </div>

          {/* Custom amount */}
          <div className="mt-3">
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
                className={`w-full pl-8 pr-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  isCustom
                    ? 'border-[#C65332] bg-white ring-1 ring-[#C65332]'
                    : 'border-[#D8CEBE] bg-[#FDFCF9]'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Interactive impact description */}
        <div className="p-4 rounded-xl bg-[#EDF8F3] border border-[#B0DECB] text-xs sm:text-sm text-[#1D4336] flex items-start gap-2.5">
          <Heart className="w-4 h-4 text-[#C65332] fill-[#C65332] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {getImpactMessage(currentAmount)}
          </p>
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
            <option value="General Care">General Animal Care & Operations</option>
            <option value="Medical Care">Emergency Veterinary Trauma & Surgery</option>
            <option value="Biraal Bari">Biraal Bari Sanctuary Lifelong Care</option>
            <option value="Rescue Operations">24/7 Field Rescue Ambulance</option>
            <option value="Animal Sponsorship">Direct Animal Sponsorship</option>
          </select>
        </div>

        {/* Donor information */}
        <div className="pt-2 border-t border-[#EAE4D7] space-y-4">
          <h4 className="font-serif text-base font-semibold text-[#1E2421]">
            Donor Information
          </h4>

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
              <label className="block text-xs font-medium text-[#75837B] mb-1">Email Address (For Tax Receipt)</label>
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
            <label className="block text-xs font-medium text-[#75837B] mb-1">Phone Number (Bangladesh)</label>
            <input
              type="tel"
              required
              placeholder="+880 17XXXXXXXX"
              value={donorPhone}
              onChange={(e) => setDonorPhone(e.target.value)}
              className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2 text-sm text-[#1E2421] outline-none focus:border-[#1A382B]"
            />
          </div>
        </div>

        {/* Simulated Payment Methods */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#75837B] mb-2">
            Payment Method (Simulated Test Flow)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(['bKash', 'Nagad', 'Visa/Mastercard', 'Bank Transfer'] as const).map((method) => (
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
          Confirm Contribution of ৳{currentAmount.toLocaleString()} {frequency === 'monthly' ? '/ month' : ''}
        </Button>
      </form>
    </div>
  );
};
