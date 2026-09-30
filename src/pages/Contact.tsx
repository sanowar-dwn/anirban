import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertTriangle,
  Building,
  Heart
} from 'lucide-react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { useToast } from '../context/ToastContext';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('Please fill in your name, email, and message', 'error');
      return;
    }

    setIsSubmitting(true);
    // Simulate inquiry dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      showToast('Message sent! Our team will get back to you shortly.', 'success');
    }, 500);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Header */}
      <section className="bg-[#FAF8F5] border-b border-[#EAE4D7] pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Contact & Visiting' }]} className="mb-6" />

          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest font-bold text-[#C65332] mb-2 block">
              Reach Out
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-[#1E2421] leading-tight mb-4">
              We’d Love to Hear From You.
            </h1>
            <p className="text-base sm:text-lg text-[#59655E] leading-relaxed">
              Have questions about adopting, visiting Biraal Bari, organizing an educational workshop, or partnering with AniRBan Trust?
            </p>
          </div>
        </div>
      </section>

      {/* Split Layout: Contact Info & Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Office & Sanctuary Details */}
          <div className="lg:col-span-5 space-y-8">
            {/* Quick emergency box */}
            <div className="p-6 rounded-3xl bg-[#FDF5F2] border border-[#FACFC2] space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#893720] flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-[#C65332]" />
                <span>Emergency Animal Rescue</span>
              </span>
              <p className="text-xs text-[#893720]">
                For immediate life-threatening injuries or trapped animals in Dhaka, please call directly rather than submitting this contact form:
              </p>
              <a
                href="tel:+8801700000000"
                className="inline-flex items-center gap-2 font-serif font-bold text-lg text-[#C65332] hover:underline"
              >
                <Phone className="w-5 h-5" /> +880 1700-000000
              </a>
            </div>

            {/* Address & visiting details */}
            <div className="space-y-6 text-xs sm:text-sm text-[#3E4742]">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#EDF8F3] text-[#1A382B] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#2C6A53]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#1E2421]">Sanctuary & Clinical Office</h4>
                  <p className="text-[#59655E] mt-1 leading-relaxed">
                    AniRBan Trust / Biraal Bari<br />
                    Mirpur, Greater Dhaka Division<br />
                    Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#F3EFE8] text-[#1E2421] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#1A382B]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#1E2421]">Email Inquiries</h4>
                  <p className="text-[#59655E] mt-1">General: <a href="mailto:care@anirbantrust.org" className="text-[#1A382B] underline">care@anirbantrust.org</a></p>
                  <p className="text-[#59655E]">Adoptions: <a href="mailto:adopt@anirbantrust.org" className="text-[#1A382B] underline">adopt@anirbantrust.org</a></p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#EDF8F3] text-[#1A382B] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#2C6A53]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#1E2421]">Sanctuary Visiting Policy</h4>
                  <p className="text-[#59655E] mt-1 leading-relaxed">
                    To maintain strict biosecurity and protect our immune-compromised residents, Biraal Bari visits are by prior appointment only during designated weekend hours (Fridays & Saturdays: 3:00 PM – 6:00 PM).
                  </p>
                </div>
              </div>
            </div>

            {/* Stylized Dhaka Map Graphic */}
            <div className="rounded-3xl overflow-hidden border border-[#D8CEBE] p-6 bg-[#FDFCF9] space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#1E2421]">
                <span>Dhaka Division Coverage Area</span>
                <span className="text-[#2C6A53]">Active Service</span>
              </div>
              <p className="text-xs text-[#59655E] leading-relaxed">
                Our rescue ambulances operate across Mirpur, Dhanmondi, Uttara, Gulshan, Mohammadpur, Old Dhaka, Savar, and adjacent sectors.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            {isSuccess ? (
              <div className="bg-[#EDF8F3] border border-[#B0DECB] rounded-3xl p-8 sm:p-12 text-center space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-[#1A382B] text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-[#7DC0A4]" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-[#1D4336]">
                  Message Dispatched!
                </h3>
                <p className="text-sm text-[#2C6A53] max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to AniRBan Trust. Our team reviews all inquiries promptly and will reply to <strong className="font-bold">{email}</strong> within 24 to 48 hours.
                </p>
                <div className="pt-4">
                  <Button variant="primary" size="md" onClick={() => setIsSuccess(false)}>
                    Send Another Message
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-[#FAF8F5] rounded-3xl border border-[#D8CEBE] p-6 sm:p-10 shadow-sm space-y-6">
                <h3 className="font-serif text-2xl font-bold text-[#1E2421]">
                  Send Us a Direct Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1E2421] mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Shakib Ahmed"
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
                      placeholder="shakib@example.com"
                      className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2.5 text-sm text-[#1E2421] outline-none focus:border-[#1A382B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1E2421] mb-1">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+880 17XXXXXXXX"
                      className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2.5 text-sm text-[#1E2421] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E2421] mb-1">Nature of Inquiry</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2.5 text-sm text-[#1E2421] outline-none"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Adoption Questions">Adoption Consultation</option>
                      <option value="Biraal Bari Visit">Sanctuary Weekend Visit</option>
                      <option value="Corporate CSR">Corporate / CSR Partnership</option>
                      <option value="Donation Receipt">Donation Receipt / Tax Queries</option>
                      <option value="Volunteering">Volunteer Coordination</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E2421] mb-1">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can AniRBan assist you today?"
                    className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3.5 py-2.5 text-sm text-[#1E2421] outline-none focus:border-[#1A382B]"
                  />
                </div>

                <Button
                  type="submit"
                  variant="terracotta"
                  size="lg"
                  className="w-full"
                  isLoading={isSubmitting}
                  icon={<Send className="w-4 h-4" />}
                >
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
