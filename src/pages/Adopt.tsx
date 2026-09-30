import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Heart, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Home, 
  User, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  ArrowLeft,
  Sparkles,
  PawPrint
} from 'lucide-react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { animalsService } from '../services/animals';
import { adoptionsService } from '../services/adoptions';
import { Animal } from '../types';
import { useToast } from '../context/ToastContext';

export const Adopt: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedSlug = searchParams.get('animal');
  const [animals, setAnimals] = useState<Animal[]>([]);
  const { showToast } = useToast();

  // Multi-step Application Form State
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApplicationId, setSubmittedApplicationId] = useState<string | null>(null);

  // Form Fields
  const [selectedAnimalSlug, setSelectedAnimalSlug] = useState<string>(preselectedSlug || 'milo');
  
  // Step 1: About You
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [occupation, setOccupation] = useState('');
  const [nidOrPassport, setNidOrPassport] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Dhaka');

  // Step 2: Your Home
  const [housingType, setHousingType] = useState<'Apartment' | 'Independent House' | 'Other'>('Apartment');
  const [ownOrRent, setOwnOrRent] = useState<'Own' | 'Rent'>('Own');
  const [landlordAllowsPets, setLandlordAllowsPets] = useState(true);
  const [hasBalconyNetting, setHasBalconyNetting] = useState(true);
  const [familyMembersCount, setFamilyMembersCount] = useState(3);
  const [familyAllAgree, setFamilyAllAgree] = useState(true);

  // Step 3: Experience With Animals
  const [hasPetsCurrently, setHasPetsCurrently] = useState(false);
  const [hadPetsPast, setHadPetsPast] = useState(true);
  const [veterinarianContact, setVeterinarianContact] = useState('');
  const [dailyHoursAlone, setDailyHoursAlone] = useState('2-4 hours');
  const [emergencyPlan, setEmergencyPlan] = useState('');

  // Step 4: Notes
  const [notes, setNotes] = useState('');

  // Form Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const fetch = async () => {
      const all = await animalsService.getAnimals({ status: 'Available for Adoption' });
      setAnimals(all);
      if (preselectedSlug) {
        setSelectedAnimalSlug(preselectedSlug);
      }
    };
    fetch();
  }, [preselectedSlug]);

  const validateStep = (step: number) => {
    const errs: Record<string, string> = {};

    if (step === 1) {
      if (!fullName.trim()) errs.fullName = 'Full name is required';
      if (!email.trim() || !email.includes('@')) errs.email = 'Valid email is required';
      if (!phone.trim()) errs.phone = 'Valid phone number is required';
      if (!address.trim()) errs.address = 'Current living address is required';
    } else if (step === 2) {
      if (!familyAllAgree) {
        errs.familyAllAgree = 'All household members must be in agreement to adopt';
      }
    } else if (step === 3) {
      if (!dailyHoursAlone) errs.dailyHoursAlone = 'Please indicate daily routine';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
      window.scrollTo({ top: document.getElementById('application-form')?.offsetTop || 0, behavior: 'smooth' });
    } else {
      showToast('Please complete the required fields in this step', 'error');
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmitApplication = async () => {
    setIsSubmitting(true);
    const selectedAnimal = animals.find(a => a.slug === selectedAnimalSlug);
    const animalName = selectedAnimal ? selectedAnimal.name : 'Selected Companion';

    try {
      const application = await adoptionsService.submitAdoptionApplication({
        animalSlug: selectedAnimalSlug,
        animalName,
        applicant: {
          fullName,
          email,
          phone,
          occupation,
          nidOrPassport,
          address,
          city
        },
        home: {
          housingType,
          ownOrRent,
          landlordAllowsPets,
          hasBalconyNetting,
          familyMembersCount,
          familyAllAgree
        },
        experience: {
          hasPetsCurrently,
          hadPetsPast,
          veterinarianContact,
          dailyHoursAlone,
          emergencyPlan
        },
        notes
      });

      setIsSubmitting(false);
      setSubmittedApplicationId(application.id);
      showToast('Your adoption application has been submitted successfully!', 'success');
    } catch {
      setIsSubmitting(false);
      showToast('Submission error, please try again.', 'error');
    }
  };

  const faqs = [
    {
      q: 'Why does AniRBan require balcony safety netting for cat adoptions?',
      a: 'In high-rise Dhaka apartment buildings, "High-Rise Syndrome" is one of the leading causes of preventable fatal feline injuries. Cats reflexively leap at flying birds or insects, causing catastrophic falls from open balconies or unscreened windows. Netting costs very little and provides lifelong safety.'
    },
    {
      q: 'What is included with every adoption?',
      a: 'Every adopted animal from AniRBan comes fully spayed or neutered, up to date on Rabies and core viral vaccines, treated for internal and external parasites, and microchipped. You also receive post-adoption veterinary guidance.'
    },
    {
      q: 'Is there an adoption fee?',
      a: 'We do not charge an arbitrary purchase fee for our rescues. However, we ask adopters for a nominal donation (৳1,000 - ৳2,000) that directly helps reimburse the spay/neuter and vaccination expenses of the next rescued street animal.'
    },
    {
      q: 'What happens if the adoption does not work out?',
      a: 'AniRBan provides a lifelong safety net. If life circumstances prevent you from keeping your adopted pet, you are contractually required to return the animal to AniRBan Trust. We guarantee they will never end up back on the street.'
    },
    {
      q: 'How long does the application review take?',
      a: 'Our adoptions team usually reviews applications and contacts prospective parents within 48 to 72 hours for an informal phone discussion and apartment safety review.'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Hero Header */}
      <section className="bg-[#FAF8F5] border-b border-[#EAE4D7] pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Adoption Experience' }]} className="mb-6" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs uppercase tracking-widest font-bold text-[#C65332] block">
                Adopt With Purpose
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-[#1E2421] leading-tight">
                Bring Compassion Home.
              </h1>
              <p className="text-base sm:text-lg text-[#59655E] max-w-2xl leading-relaxed">
                Adopting from AniRBan transforms two lives: the animal you welcome into your family, and the next injured street animal who takes their place in our care.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <a href="#application-form">
                  <Button variant="terracotta" size="lg">
                    Start Adoption Application
                  </Button>
                </a>
                <Link to="/animals?status=Available+for+Adoption">
                  <Button variant="outline" size="lg">
                    Browse Adoptable Animals
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 hidden lg:block">
              <div className="rounded-3xl overflow-hidden shadow-xl aspect-square bg-[#EAE4D7] border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80"
                  alt="Adopted companion"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Adopt & Process Steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-[#D8CEBE]">
            <div className="w-12 h-12 rounded-2xl bg-[#EDF8F3] text-[#1A382B] flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-[#2C6A53]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1E2421] mb-2">Medically Cleared</h3>
            <p className="text-xs sm:text-sm text-[#59655E] leading-relaxed">
              Every animal is vaccinated, dewormed, neutered/spayed, and behaviorally assessed before adoption.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-[#D8CEBE]">
            <div className="w-12 h-12 rounded-2xl bg-[#FDF5F2] text-[#C65332] flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-[#C65332]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1E2421] mb-2">Lifelong Support</h3>
            <p className="text-xs sm:text-sm text-[#59655E] leading-relaxed">
              Our veterinary coordinators remain available for dietary questions, behavioral advice, and vet recommendations.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-[#D8CEBE]">
            <div className="w-12 h-12 rounded-2xl bg-[#F3EFE8] text-[#1E2421] flex items-center justify-center mb-4">
              <Home className="w-6 h-6 text-[#1A382B]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1E2421] mb-2">No-Kill Safety Net</h3>
            <p className="text-xs sm:text-sm text-[#59655E] leading-relaxed">
              Should severe life crises ever arise, AniRBan promises to take the animal back into care without hesitation.
            </p>
          </div>
        </div>

        {/* 4-Step Process Bar */}
        <div className="bg-[#FAF8F5] p-8 sm:p-12 rounded-3xl border border-[#D8CEBE]">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2421] text-center mb-8">
            Our 4-Step Adoption Journey
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <span className="text-2xl font-serif font-bold text-[#C65332]">01</span>
              <h4 className="font-serif text-base font-bold text-[#1E2421]">Submit Application</h4>
              <p className="text-xs text-[#59655E] leading-relaxed">Complete our questionnaire detailing your living environment and experience.</p>
            </div>
            <div className="space-y-2">
              <span className="text-2xl font-serif font-bold text-[#C65332]">02</span>
              <h4 className="font-serif text-base font-bold text-[#1E2421]">Phone Discussion</h4>
              <p className="text-xs text-[#59655E] leading-relaxed">A gentle conversation with our adoption lead to align on personality and daily habits.</p>
            </div>
            <div className="space-y-2">
              <span className="text-2xl font-serif font-bold text-[#C65332]">03</span>
              <h4 className="font-serif text-base font-bold text-[#1E2421]">Meet & Home Safety</h4>
              <p className="text-xs text-[#59655E] leading-relaxed">Meet your chosen companion in person and verify balcony netting and safety measures.</p>
            </div>
            <div className="space-y-2">
              <span className="text-2xl font-serif font-bold text-[#C65332]">04</span>
              <h4 className="font-serif text-base font-bold text-[#1E2421]">Welcome Home</h4>
              <p className="text-xs text-[#59655E] leading-relaxed">Sign the adoption charter and welcome your new family member into your heart and home.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MULTI-STEP ADOPTION APPLICATION FORM */}
      <section id="application-form" className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="bg-[#FAF8F5] rounded-3xl border border-[#D8CEBE] p-4 sm:p-10 shadow-lg">
          <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
            <span className="text-xs uppercase tracking-widest font-bold text-[#C65332] block mb-1">
              Official Application
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2421]">
              Adoption Application Form
            </h2>
            <p className="text-xs sm:text-sm text-[#59655E] mt-1">
              Please take 5 minutes to complete these questions honestly.
            </p>
          </div>

          {/* Stepper Progress Indicator */}
          <div className="mb-6 sm:mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-between relative">
              {[
                { num: 1, label: 'About You' },
                { num: 2, label: 'Your Home' },
                { num: 3, label: 'Experience' },
                { num: 4, label: 'Animal' },
                { num: 5, label: 'Confirm' }
              ].map((s) => (
                <div key={s.num} className="flex flex-col items-center flex-1 relative z-10">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    currentStep === s.num
                      ? 'bg-[#C65332] text-white shadow-xs scale-110'
                      : currentStep > s.num
                      ? 'bg-[#1A382B] text-white'
                      : 'bg-[#EAE4D7] text-[#75837B]'
                  }`}>
                    {currentStep > s.num ? <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : s.num}
                  </div>
                  <span className="text-[10px] sm:text-xs font-medium text-[#75837B] mt-1 text-center hidden sm:block">
                    {s.label}
                  </span>
                </div>
              ))}
              {/* Connecting background progress line */}
              <div className="absolute top-3.5 sm:top-4 left-6 right-6 h-0.5 bg-[#EAE4D7] z-0" />
            </div>
            {/* Mobile-only current step label */}
            <p className="sm:hidden text-center text-xs font-bold text-[#1A382B] mt-3">
              Step {currentStep} of 5: {[
                'About You',
                'Your Home',
                'Experience',
                'Animal Selection',
                'Confirmation'
              ][currentStep - 1]}
            </p>
          </div>

          {/* Success Screen after submission */}
          {submittedApplicationId ? (
            <div className="p-8 sm:p-10 text-center space-y-4 bg-[#EDF8F3] border border-[#B0DECB] rounded-2xl animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-[#1A382B] text-white flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-8 h-8 text-[#7DC0A4]" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1D4336]">
                Application Received!
              </h3>
              <p className="text-sm text-[#2C6A53] max-w-md mx-auto leading-relaxed">
                Thank you for applying to give an animal a loving home. Your application has been logged with Reference ID: <strong className="font-mono">{submittedApplicationId}</strong>.
              </p>
              <p className="text-xs text-[#3C7D63]">
                Our adoption coordinators will review your responses and contact you via phone or email within 48 hours.
              </p>
              <div className="pt-4 flex justify-center gap-4">
                <Link to="/animals">
                  <Button variant="primary" size="md">
                    Explore Other Animals
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => {
                    setSubmittedApplicationId(null);
                    setCurrentStep(1);
                  }}
                >
                  Submit Another Application
                </Button>
              </div>
            </div>
          ) : (
            <div>
              {/* STEP 1: ABOUT YOU */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h3 className="font-serif text-xl font-bold text-[#1E2421] pb-2 border-b border-[#EAE4D7]">
                    Step 1: About You
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1E2421] mb-1">Full Legal Name *</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Farzana Chowdhury"
                        className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2.5 text-sm text-[#1E2421] outline-none focus:border-[#1A382B]"
                      />
                      {errors.fullName && <p className="text-xs text-[#C65332] mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1E2421] mb-1">Email Address *</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="farzana@example.com"
                        className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2.5 text-sm text-[#1E2421] outline-none focus:border-[#1A382B]"
                      />
                      {errors.email && <p className="text-xs text-[#C65332] mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1E2421] mb-1">Phone Number (WhatsApp) *</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+880 17XXXXXXXX"
                        className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2.5 text-sm text-[#1E2421] outline-none focus:border-[#1A382B]"
                      />
                      {errors.phone && <p className="text-xs text-[#C65332] mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1E2421] mb-1">Occupation / Profession</label>
                      <input
                        type="text"
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                        placeholder="Software Engineer, Teacher, Student, etc."
                        className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2.5 text-sm text-[#1E2421] outline-none focus:border-[#1A382B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1E2421] mb-1">NID or Passport Number</label>
                      <input
                        type="text"
                        value={nidOrPassport}
                        onChange={(e) => setNidOrPassport(e.target.value)}
                        placeholder="For verification upon agreement"
                        className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2.5 text-sm text-[#1E2421] outline-none focus:border-[#1A382B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1E2421] mb-1">City / Region *</label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2.5 text-sm text-[#1E2421] outline-none"
                      >
                        <option value="Dhaka">Dhaka (Metro)</option>
                        <option value="Chittagong">Chittagong</option>
                        <option value="Sylhet">Sylhet</option>
                        <option value="Other">Other City in Bangladesh</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E2421] mb-1">Residential Address *</label>
                    <textarea
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House/Apartment #, Road #, Sector/Area, Dhaka"
                      className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2 text-sm text-[#1E2421] outline-none focus:border-[#1A382B]"
                    />
                    {errors.address && <p className="text-xs text-[#C65332] mt-1">{errors.address}</p>}
                  </div>
                </div>
              )}

              {/* STEP 2: YOUR HOME */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h3 className="font-serif text-xl font-bold text-[#1E2421] pb-2 border-b border-[#EAE4D7]">
                    Step 2: Your Home Environment
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1E2421] mb-1">Housing Type</label>
                      <select
                        value={housingType}
                        onChange={(e) => setHousingType(e.target.value as any)}
                        className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2.5 text-sm text-[#1E2421] outline-none"
                      >
                        <option value="Apartment">Apartment / Flat</option>
                        <option value="Independent House">Independent House / Duplex</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1E2421] mb-1">Ownership</label>
                      <select
                        value={ownOrRent}
                        onChange={(e) => setOwnOrRent(e.target.value as any)}
                        className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2.5 text-sm text-[#1E2421] outline-none"
                      >
                        <option value="Own">Owned by Self/Family</option>
                        <option value="Rent">Rented</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F3EFE8] space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasBalconyNetting}
                        onChange={(e) => setHasBalconyNetting(e.target.checked)}
                        className="mt-0.5 rounded border-[#D8CEBE] text-[#1A382B] focus:ring-[#1A382B]"
                      />
                      <div className="text-xs">
                        <span className="font-semibold text-[#1E2421]">Do you currently have or agree to install balcony safety netting?</span>
                        <p className="text-[#75837B]">Required for all cat adoptions in multi-story apartments to prevent falls.</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={landlordAllowsPets}
                        onChange={(e) => setLandlordAllowsPets(e.target.checked)}
                        className="mt-0.5 rounded border-[#D8CEBE] text-[#1A382B] focus:ring-[#1A382B]"
                      />
                      <div className="text-xs">
                        <span className="font-semibold text-[#1E2421]">Does your building/landlord permit pets on the premises?</span>
                        <p className="text-[#75837B]">Please confirm before applying to avoid landlord conflicts.</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={familyAllAgree}
                        onChange={(e) => setFamilyAllAgree(e.target.checked)}
                        className="mt-0.5 rounded border-[#D8CEBE] text-[#1A382B] focus:ring-[#1A382B]"
                      />
                      <div className="text-xs">
                        <span className="font-semibold text-[#1E2421]">Do all members of your household agree with adopting this animal? *</span>
                        <p className="text-[#75837B]">Crucial for the animal's safety and emotional well-being.</p>
                      </div>
                    </label>
                    {errors.familyAllAgree && <p className="text-xs text-[#C65332]">{errors.familyAllAgree}</p>}
                  </div>
                </div>
              )}

              {/* STEP 3: EXPERIENCE WITH ANIMALS */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h3 className="font-serif text-xl font-bold text-[#1E2421] pb-2 border-b border-[#EAE4D7]">
                    Step 3: Animal Experience & Routine
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-[#FDFCF9] border border-[#D8CEBE]">
                      <label className="block text-xs font-semibold text-[#1E2421] mb-2">Do you currently have pets?</label>
                      <div className="flex gap-4 text-xs font-medium">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="hasPets"
                            checked={hasPetsCurrently}
                            onChange={() => setHasPetsCurrently(true)}
                          />
                          Yes
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="hasPets"
                            checked={!hasPetsCurrently}
                            onChange={() => setHasPetsCurrently(false)}
                          />
                          No
                        </label>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FDFCF9] border border-[#D8CEBE]">
                      <label className="block text-xs font-semibold text-[#1E2421] mb-2">Estimated daily hours pet will be alone?</label>
                      <select
                        value={dailyHoursAlone}
                        onChange={(e) => setDailyHoursAlone(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg p-1.5 text-xs"
                      >
                        <option value="0-2 hours">0 - 2 hours (Someone is always home)</option>
                        <option value="2-4 hours">2 - 4 hours</option>
                        <option value="4-8 hours">4 - 8 hours (Standard work day)</option>
                        <option value="8+ hours">8+ hours</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E2421] mb-1">
                      Who will care for the pet if you travel out of Dhaka or face an emergency?
                    </label>
                    <input
                      type="text"
                      value={emergencyPlan}
                      onChange={(e) => setEmergencyPlan(e.target.value)}
                      placeholder="e.g. Family member staying home, trusted neighbor, pet boarding"
                      className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2.5 text-sm text-[#1E2421] outline-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: ANIMAL PREFERENCE */}
              {currentStep === 4 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h3 className="font-serif text-xl font-bold text-[#1E2421] pb-2 border-b border-[#EAE4D7]">
                    Step 4: Animal Selection
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E2421] mb-2">
                      Which animal are you applying for?
                    </label>
                    <select
                      value={selectedAnimalSlug}
                      onChange={(e) => setSelectedAnimalSlug(e.target.value)}
                      className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-4 py-3 text-sm text-[#1E2421] font-serif font-bold outline-none"
                    >
                      {animals.map((a) => (
                        <option key={a.slug} value={a.slug}>
                          {a.name} — ({a.species} · {a.gender} · {a.age})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E2421] mb-1">
                      Anything else you'd like our adoptions team to know?
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Describe your family routine, what drew you to this animal, or any special questions."
                      className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2 text-sm text-[#1E2421] outline-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 5: CONFIRMATION & REVIEW */}
              {currentStep === 5 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h3 className="font-serif text-xl font-bold text-[#1E2421] pb-2 border-b border-[#EAE4D7]">
                    Step 5: Review & Submit
                  </h3>

                  <div className="p-4 rounded-2xl bg-[#F3EFE8] space-y-2 text-xs">
                    <p><strong>Applying For:</strong> {animals.find(a => a.slug === selectedAnimalSlug)?.name || selectedAnimalSlug}</p>
                    <p><strong>Applicant:</strong> {fullName} ({phone})</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Address:</strong> {address}, {city}</p>
                    <p><strong>Housing:</strong> {housingType} ({ownOrRent})</p>
                    <p><strong>Balcony Netting:</strong> {hasBalconyNetting ? 'Confirmed / Will Install' : 'Needs Discussion'}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#EDF8F3] border border-[#B0DECB] text-xs text-[#1D4336] flex items-start gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#2C6A53] shrink-0 mt-0.5" />
                    <span>
                      By submitting, you pledge to provide lifelong veterinary care, humane affection, and an indoor-safe environment.
                    </span>
                  </div>
                </div>
              )}

              {/* Stepper Navigation Buttons */}
              <div className="pt-6 border-t border-[#EAE4D7] flex items-center justify-between">
                {currentStep > 1 ? (
                  <Button
                    variant="outline"
                    size="md"
                    onClick={handlePrevStep}
                    icon={<ArrowLeft className="w-4 h-4" />}
                  >
                    Previous
                  </Button>
                ) : <div />}

                {currentStep < 5 ? (
                  <Button
                    variant="terracotta"
                    size="md"
                    onClick={handleNextStep}
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    variant="terracotta"
                    size="lg"
                    isLoading={isSubmitting}
                    onClick={handleSubmitApplication}
                    icon={<Heart className="w-4 h-4 fill-white" />}
                  >
                    Submit Adoption Application
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-widest font-bold text-[#C65332] mb-1 block">
            Common Questions
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#1E2421]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-[#FAF8F5] border border-[#D8CEBE] rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-base font-bold text-[#1E2421]"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-[#C65332] shrink-0" /> : <ChevronDown className="w-5 h-5 text-[#75837B] shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#59655E] leading-relaxed border-t border-[#EAE4D7]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
