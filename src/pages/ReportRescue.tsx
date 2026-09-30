import React, { useState } from 'react';
import { 
  AlertTriangle, 
  PhoneCall, 
  MapPin, 
  Camera, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  ArrowRight,
  Info
} from 'lucide-react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { rescueReportsService } from '../services/rescueReports';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';

export const ReportRescue: React.FC = () => {
  const [priority, setPriority] = useState<'Critical' | 'Urgent' | 'Non-emergency'>('Critical');
  const [animalType, setAnimalType] = useState('Cat');
  const [locationArea, setLocationArea] = useState('Mirpur');
  const [exactAddress, setExactAddress] = useState('');
  const [city, setCity] = useState('Dhaka');
  const [condition, setCondition] = useState('Road accident / trauma');
  const [injuryDetails, setInjuryDetails] = useState('');
  const [numberOfAnimals, setNumberOfAnimals] = useState(1);
  const [reporterName, setReporterName] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [simulatedPhotos, setSimulatedPhotos] = useState<string[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);

  const { showToast } = useToast();

  const handlePhotoUploadSim = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Create local object URLs for simulation
      const newUrls = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setSimulatedPhotos(prev => [...prev, ...newUrls].slice(0, 3));
      showToast(`${e.target.files.length} photo(s) attached for veterinary triage`, 'info');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!exactAddress.trim()) {
      showToast('Please provide an exact landmark or street location', 'error');
      return;
    }
    if (!reporterPhone.trim()) {
      showToast('A contact phone number is essential for field responders to locate the animal', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const report = await rescueReportsService.submitRescueReport({
        animalType,
        locationArea,
        exactAddress,
        city,
        condition,
        injuryDetails,
        numberOfAnimals,
        priority,
        reporterName: reporterName || 'Anonymous Compassionate Citizen',
        reporterPhone,
        reporterEmail,
        notes,
        photoSimulationUrls: simulatedPhotos
      });

      setIsSubmitting(false);
      setTicketId(report.ticketId);
      showToast('Emergency rescue report logged successfully!', 'success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setIsSubmitting(false);
      showToast('Failed to log report, please try again or call the hotline directly.', 'error');
    }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="bg-[#FAF8F5] border-b border-[#EAE4D7] pt-8 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Report Injured Animal' }]} className="mb-6" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF5F2] border border-[#FACFC2] text-xs font-bold text-[#893720] mb-3">
                <span className="w-2 h-2 rounded-full bg-[#C65332] animate-ping" />
                <span>Dhaka Emergency Dispatch Hotline Active</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#1E2421]">
                Report an Animal in Need
              </h1>
              <p className="text-xs sm:text-sm text-[#59655E] mt-2">
                If the animal is in immediate life-threatening danger, call our hotline directly in addition to filing this form.
              </p>
            </div>

            <a
              href="tel:+8801700000000"
              className="inline-flex items-center gap-2 bg-[#1A382B] text-white px-5 py-3 rounded-2xl font-serif font-bold text-sm shadow-md hover:bg-[#132E22] transition-colors shrink-0"
            >
              <PhoneCall className="w-4 h-4 text-[#F2B73B]" />
              <span>+880 1700-000000</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Form Container */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {ticketId ? (
          <div className="bg-[#FAF8F5] rounded-3xl border border-[#B0DECB] p-8 sm:p-12 text-center space-y-6 shadow-xl animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 rounded-full bg-[#EDF8F3] border-2 border-[#B0DECB] flex items-center justify-center text-[#1A382B] mx-auto">
              <CheckCircle2 className="w-10 h-10 text-[#2C6A53]" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#2C6A53] block mb-1">
                Dispatch Notification Confirmed
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E2421]">
                Thank you for helping an animal.
              </h2>
              <p className="text-sm text-[#59655E] max-w-md mx-auto mt-2 leading-relaxed">
                Your rescue report has been received by our triage coordinator. Our team will verify and dispatch our nearest available responder or ambulance.
              </p>
            </div>

            <div className="bg-[#F3EFE8] rounded-2xl p-5 max-w-md mx-auto text-left text-xs space-y-2 border border-[#D8CEBE]">
              <div className="flex justify-between">
                <span className="text-[#75837B]">Emergency Ticket ID:</span>
                <span className="font-mono font-bold text-sm text-[#1A382B]">{ticketId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#75837B]">Location:</span>
                <span className="font-medium text-[#1E2421]">{locationArea} ({city})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#75837B]">Priority Level:</span>
                <span className="font-bold text-[#C65332]">{priority}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#75837B]">Reporter Contact:</span>
                <span className="font-medium text-[#1E2421]">{reporterPhone}</span>
              </div>
            </div>

            <div className="p-4 bg-[#EDF8F3] rounded-2xl text-xs text-[#1D4336] max-w-md mx-auto text-left flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#2C6A53] shrink-0 mt-0.5" />
              <span>
                Please keep your phone nearby. If you can stay with the animal or place a safe cardboard box over them with ventilation, it greatly prevents them from wandering into moving traffic.
              </span>
            </div>

            <div className="pt-4 flex justify-center gap-4">
              <Link to="/">
                <Button variant="primary" size="md">
                  Return to Home
                </Button>
              </Link>
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  setTicketId(null);
                  setExactAddress('');
                  setInjuryDetails('');
                  setSimulatedPhotos([]);
                }}
              >
                Report Another Rescue
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-[#FAF8F5] rounded-3xl border border-[#D8CEBE] p-6 sm:p-10 shadow-sm space-y-8">
            {/* Priority Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#75837B] mb-2">
                Emergency Priority Level *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'Critical', label: 'Critical Emergency', sub: 'Severe bleeding, unconscious, vehicle impact' },
                  { id: 'Urgent', label: 'Urgent', sub: 'Limping fracture, eye ulcer, trapped in drain' },
                  { id: 'Non-emergency', label: 'Non-Emergency', sub: 'Skin disease, stray litter, abandoned kitten' }
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPriority(p.id as any)}
                    className={`p-4 rounded-2xl text-left border-2 transition-all ${
                      priority === p.id
                        ? p.id === 'Critical'
                          ? 'border-[#C65332] bg-[#FDF5F2] ring-1 ring-[#C65332]'
                          : 'border-[#1A382B] bg-[#EDF8F3] ring-1 ring-[#1A382B]'
                        : 'border-[#D8CEBE] bg-[#FDFCF9] hover:border-[#75837B]'
                    }`}
                  >
                    <span className={`text-xs font-bold block ${
                      priority === p.id && p.id === 'Critical' ? 'text-[#893720]' : 'text-[#1E2421]'
                    }`}>
                      {p.label}
                    </span>
                    <span className="text-[11px] text-[#75837B] mt-0.5 block leading-snug">
                      {p.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Animal Type & Quantity */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1E2421] mb-1">Animal Species *</label>
                <select
                  value={animalType}
                  onChange={(e) => setAnimalType(e.target.value)}
                  className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2.5 text-sm text-[#1E2421] outline-none"
                >
                  <option value="Cat">Cat / Kitten</option>
                  <option value="Dog">Dog / Puppy</option>
                  <option value="Bird">Injured Bird</option>
                  <option value="Other">Other Wildlife / Animal</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E2421] mb-1">Estimated Condition</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2.5 text-sm text-[#1E2421] outline-none"
                >
                  <option value="Road accident / trauma">Road Accident / Hit & Run</option>
                  <option value="Fracture / unable to walk">Suspected Bone Fracture</option>
                  <option value="Trapped / inaccessible">Trapped in Drain / Construction</option>
                  <option value="Severe skin infection">Severe Mange / Open Wounds</option>
                  <option value="Orphan neonates">Abandoned Neonatal Kittens</option>
                  <option value="Cruelty / human abuse">Suspected Human Cruelty</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E2421] mb-1">Number of Animals</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={numberOfAnimals}
                  onChange={(e) => setNumberOfAnimals(Number(e.target.value))}
                  className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2.5 text-sm text-[#1E2421] outline-none"
                />
              </div>
            </div>

            {/* Location Details */}
            <div className="space-y-4 pt-2 border-t border-[#EAE4D7]">
              <h3 className="font-serif text-lg font-bold text-[#1E2421] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#C65332]" />
                <span>Location in Bangladesh</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1E2421] mb-1">Dhaka Area / Thana *</label>
                  <select
                    value={locationArea}
                    onChange={(e) => setLocationArea(e.target.value)}
                    className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2.5 text-sm text-[#1E2421] outline-none"
                  >
                    <option value="Mirpur">Mirpur (1 to 14)</option>
                    <option value="Dhanmondi">Dhanmondi / Kalabagan</option>
                    <option value="Uttara">Uttara (All Sectors)</option>
                    <option value="Gulshan">Gulshan / Banani / Baridhara</option>
                    <option value="Mohammadpur">Mohammadpur / Adabor</option>
                    <option value="Old Dhaka">Old Dhaka (Lalbagh, Chawkbazar, Kotwali)</option>
                    <option value="Tejgaon">Tejgaon / Farmgate / Mohakhali</option>
                    <option value="Badda">Badda / Rampura / Khilgaon</option>
                    <option value="Savar">Savar / Ashulia</option>
                    <option value="Other">Outside Greater Dhaka</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E2421] mb-1">City / Division</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2.5 text-sm text-[#1E2421] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E2421] mb-1">
                  Specific Street Address & Prominent Landmark *
                </label>
                <textarea
                  required
                  rows={2}
                  value={exactAddress}
                  onChange={(e) => setExactAddress(e.target.value)}
                  placeholder="e.g. Opposite City Hospital gate, beside the tea stall under the banyan tree, Road 4, Sector 7"
                  className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2 text-sm text-[#1E2421] outline-none focus:border-[#1A382B]"
                />
              </div>
            </div>

            {/* Injury Description & Photos */}
            <div className="space-y-4 pt-2 border-t border-[#EAE4D7]">
              <h3 className="font-serif text-lg font-bold text-[#1E2421]">
                Injury Description & Condition
              </h3>

              <div>
                <label className="block text-xs font-semibold text-[#1E2421] mb-1">
                  Detailed Observations
                </label>
                <textarea
                  rows={3}
                  value={injuryDetails}
                  onChange={(e) => setInjuryDetails(e.target.value)}
                  placeholder="Can the animal bear weight? Is there active bleeding? Are they responsive to sounds or human approach?"
                  className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2 text-sm text-[#1E2421] outline-none focus:border-[#1A382B]"
                />
              </div>

              {/* Photo Upload Simulation */}
              <div>
                <label className="block text-xs font-semibold text-[#1E2421] mb-1">
                  Attach Photos / Short Video (Crucial for Triage)
                </label>
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer border-2 border-dashed border-[#D8CEBE] hover:border-[#1A382B] rounded-2xl p-4 flex items-center gap-2 bg-[#FDFCF9] transition-colors">
                    <Camera className="w-5 h-5 text-[#75837B]" />
                    <span className="text-xs font-medium text-[#1E2421]">Upload from Camera or Gallery</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUploadSim}
                      className="hidden"
                    />
                  </label>
                </div>

                {simulatedPhotos.length > 0 && (
                  <div className="flex gap-3 mt-3">
                    {simulatedPhotos.map((url, idx) => (
                      <div key={idx} className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#D8CEBE]">
                        <img src={url} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Reporter Contact Info */}
            <div className="space-y-4 pt-2 border-t border-[#EAE4D7]">
              <h3 className="font-serif text-lg font-bold text-[#1E2421]">
                Your Contact Information
              </h3>
              <p className="text-xs text-[#59655E]">
                Our rescue ambulance driver may call you directly to guide them to the exact alley or landmark.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1E2421] mb-1">Your Name</label>
                  <input
                    type="text"
                    value={reporterName}
                    onChange={(e) => setReporterName(e.target.value)}
                    placeholder="e.g. Asif Mahmud"
                    className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2 text-sm text-[#1E2421] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E2421] mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={reporterPhone}
                    onChange={(e) => setReporterPhone(e.target.value)}
                    placeholder="+880 17XXXXXXXX"
                    className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2 text-sm text-[#1E2421] outline-none focus:border-[#1A382B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E2421] mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    value={reporterEmail}
                    onChange={(e) => setReporterEmail(e.target.value)}
                    placeholder="asif@example.com"
                    className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2 text-sm text-[#1E2421] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="terracotta"
              size="lg"
              className="w-full"
              isLoading={isSubmitting}
              icon={<AlertTriangle className="w-5 h-5 text-white" />}
            >
              Dispatch Rescue Report to AniRBan Triage
            </Button>
          </form>
        )}
      </section>
    </div>
  );
};
