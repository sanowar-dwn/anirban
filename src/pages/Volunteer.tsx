import React, { useState } from 'react';
import { 
  Users, 
  Heart, 
  Camera, 
  Car, 
  Home, 
  Calendar, 
  PenTool, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { volunteersService } from '../services/volunteers';
import { useToast } from '../context/ToastContext';

export const Volunteer: React.FC = () => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Dhaka');
  const [occupation, setOccupation] = useState('');
  const [availableDays, setAvailableDays] = useState<string[]>(['Fridays', 'Saturdays']);
  const [hoursPerWeek, setHoursPerWeek] = useState('4-6 hours');
  const [priorAnimalExperience, setPriorAnimalExperience] = useState('');
  const [motivation, setMotivation] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { showToast } = useToast();

  const volunteerRoles = [
    {
      id: 'Sanctuary Support',
      title: 'Sanctuary Caretaker (Biraal Bari)',
      desc: 'Assisting caretakers with feeding, grooming, and socialization of recovering cats.',
      icon: <Home className="w-5 h-5 text-[#2C6A53]" />
    },
    {
      id: 'Foster Care',
      title: 'Foster Parent',
      desc: 'Providing temporary safe indoor haven for neonatal kittens or surgical convalescents.',
      icon: <Heart className="w-5 h-5 text-[#C65332]" />
    },
    {
      id: 'Rescue Support',
      title: 'Emergency Rescue Responder',
      desc: 'Assisting dispatch drivers with animal handling, crate transport, and field safety.',
      icon: <Users className="w-5 h-5 text-[#1A382B]" />
    },
    {
      id: 'Transport',
      title: 'Transport Volunteer',
      desc: 'Using personal vehicles to transport rescues to vet clinics or adoption appointments.',
      icon: <Car className="w-5 h-5 text-[#89570B]" />
    },
    {
      id: 'Photography',
      title: 'Photography & Media',
      desc: 'Capturing high-quality photos and videos of adoptable animals for social campaigns.',
      icon: <Camera className="w-5 h-5 text-[#C65332]" />
    },
    {
      id: 'Events',
      title: 'Adoption Events & Outreach',
      desc: 'Organizing community adoption fairs and humane education booths in Dhaka.',
      icon: <Calendar className="w-5 h-5 text-[#2C6A53]" />
    },
    {
      id: 'Content',
      title: 'Content & Editorial Writing',
      desc: 'Writing rescue stories, educational guides, and newsletter articles.',
      icon: <PenTool className="w-5 h-5 text-[#1A382B]" />
    },
    {
      id: 'Administrative Support',
      title: 'Administrative & Donor Support',
      desc: 'Assisting with receipt generation, adoption database updates, and follow-up calls.',
      icon: <Sparkles className="w-5 h-5 text-[#F2B73B]" />
    }
  ];

  const toggleRole = (roleId: string) => {
    setSelectedRoles(prev =>
      prev.includes(roleId) ? prev.filter(r => r !== roleId) : [...prev, roleId]
    );
  };

  const toggleDay = (day: string) => {
    setAvailableDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRoles.length === 0) {
      showToast('Please select at least one volunteer role', 'error');
      return;
    }
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      showToast('Please fill in your name, email, and phone', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await volunteersService.submitVolunteerApplication({
        fullName,
        email,
        phone,
        city,
        occupation,
        selectedRoles,
        availableDays,
        hoursPerWeek,
        priorAnimalExperience,
        motivation
      });
      setIsSubmitting(false);
      setIsSuccess(true);
      showToast('Volunteer application submitted! Welcome to the team.', 'success');
      window.scrollTo({ top: 300, behavior: 'smooth' });
    } catch {
      setIsSubmitting(false);
      showToast('Failed to submit, please try again.', 'error');
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Header */}
      <section className="bg-[#FAF8F5] border-b border-[#EAE4D7] pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Volunteer' }]} className="mb-6" />

          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest font-bold text-[#C65332] mb-2 block">
              Be the Change in Dhaka
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-[#1E2421] leading-tight mb-4">
              Give Your Time. Save a Life.
            </h1>
            <p className="text-base sm:text-lg text-[#59655E] leading-relaxed">
              AniRBan is built on the passion of selfless volunteers. From comforting recovering cats at Biraal Bari to emergency field response, your hands make rescue possible.
            </p>
          </div>
        </div>
      </section>

      {/* Roles & Application */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {isSuccess ? (
          <div className="bg-[#EDF8F3] border border-[#B0DECB] rounded-3xl p-8 sm:p-12 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#1A382B] text-white flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-[#7DC0A4]" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#1D4336]">
              Thank You for Stepping Up!
            </h2>
            <p className="text-sm text-[#2C6A53] max-w-md mx-auto leading-relaxed">
              We have received your volunteer application. Our volunteer coordinator will invite you to our upcoming weekend orientation and sanctuary tour.
            </p>
            <div className="pt-4">
              <Button variant="primary" size="md" onClick={() => setIsSuccess(false)}>
                Submit Additional Details
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-[#FAF8F5] rounded-3xl border border-[#D8CEBE] p-6 sm:p-10 shadow-sm space-y-8">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#C65332] block mb-1">
                Step 1: Choose Roles
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2421] mb-2">
                Where Would You Like to Help?
              </h2>
              <p className="text-xs text-[#59655E]">Select all areas that match your interests and talents.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {volunteerRoles.map((role) => {
                  const selected = selectedRoles.includes(role.id);
                  return (
                    <div
                      key={role.id}
                      onClick={() => toggleRole(role.id)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                        selected
                          ? 'border-[#1A382B] bg-[#EDF8F3]'
                          : 'border-[#D8CEBE] bg-[#FDFCF9] hover:border-[#75837B]'
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-white shadow-xs shrink-0 mt-0.5">
                        {role.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif text-sm font-bold text-[#1E2421]">{role.title}</h4>
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => {}}
                            className="rounded border-[#D8CEBE] text-[#1A382B]"
                          />
                        </div>
                        <p className="text-xs text-[#59655E] mt-1 leading-snug">{role.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contact details */}
            <div className="space-y-4 pt-4 border-t border-[#EAE4D7]">
              <span className="text-xs uppercase tracking-widest font-bold text-[#C65332] block mb-1">
                Step 2: Contact Information
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1E2421] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Nabila Hasan"
                    className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2.5 text-sm text-[#1E2421] outline-none focus:border-[#1A382B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1E2421] mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nabila@example.com"
                    className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2.5 text-sm text-[#1E2421] outline-none focus:border-[#1A382B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1E2421] mb-1">Phone (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880 17XXXXXXXX"
                    className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2.5 text-sm text-[#1E2421] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1E2421] mb-1">City / Thana</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Dhanmondi, Dhaka"
                    className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2.5 text-sm text-[#1E2421] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1E2421] mb-1">Occupation</label>
                  <input
                    type="text"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    placeholder="Student, Designer, Doctor"
                    className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2.5 text-sm text-[#1E2421] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Availability & Motivation */}
            <div className="space-y-4 pt-4 border-t border-[#EAE4D7]">
              <span className="text-xs uppercase tracking-widest font-bold text-[#C65332] block mb-1">
                Step 3: Availability & Experience
              </span>

              <div>
                <label className="block text-xs font-semibold text-[#1E2421] mb-2">Available Days</label>
                <div className="flex flex-wrap gap-2">
                  {['Fridays', 'Saturdays', 'Weekdays (Morning)', 'Weekdays (Evening)'].map((day) => {
                    const active = availableDays.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                          active
                            ? 'bg-[#1A382B] text-white border-[#1A382B]'
                            : 'bg-white border-[#D8CEBE] text-[#59655E]'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E2421] mb-1">
                  Prior Experience with Animals or Street Rescue (Optional)
                </label>
                <textarea
                  rows={2}
                  value={priorAnimalExperience}
                  onChange={(e) => setPriorAnimalExperience(e.target.value)}
                  placeholder="Tell us if you own pets, have fostered before, or have experience administering oral medications."
                  className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2 text-sm text-[#1E2421] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E2421] mb-1">
                  Why would you like to volunteer with AniRBan Trust?
                </label>
                <textarea
                  rows={2}
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  placeholder="What motivates you to advocate for street animals?"
                  className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2 text-sm text-[#1E2421] outline-none"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="terracotta"
              size="lg"
              className="w-full"
              isLoading={isSubmitting}
            >
              Submit Volunteer Application
            </Button>
          </form>
        )}
      </section>
    </div>
  );
};
