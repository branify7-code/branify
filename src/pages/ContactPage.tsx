import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2 } from 'lucide-react';

interface ContactPageProps {
  navigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ navigate }) => {
  const { settings, addLead, services } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    country: 'United States',
    service: services[0]?.name || 'Website Development',
    budget: '$1,000 - $3,000',
    timeline: '2-3 Weeks',
    description: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.description) {
      return;
    }

    addLead(formData);
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-[#F27D26] text-[10px] font-extrabold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-[#F27D26]" />
          Project Inquiries & Custom Quotes
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
          Let's Build Something Exceptional
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
          Fill out the project scope form below or reach us directly via WhatsApp. Our strategy lead responds within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Contact Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#080808] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h3 className="text-lg font-black text-white uppercase tracking-tight">Direct Contact Channels</h3>

            <div className="space-y-4 text-xs text-zinc-300">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0 text-[#F27D26]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-extrabold text-zinc-500 uppercase">Official Email</div>
                  <a href={`mailto:${settings.contactEmail}`} className="font-bold text-white hover:text-[#F27D26]">
                    {settings.contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0 text-[#F27D26]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-extrabold text-zinc-500 uppercase">WhatsApp & Phone</div>
                  <a href={`https://wa.me/${settings.contactWhatsApp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="font-bold text-white hover:text-[#F27D26]">
                    {settings.contactPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0 text-[#F27D26]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-extrabold text-zinc-500 uppercase">Location & Timezone</div>
                  <div className="font-bold text-white">{settings.location}</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <a
                href={`https://wa.me/${settings.contactWhatsApp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                Instant WhatsApp Chat
              </a>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7">
          <div className="bg-[#080808] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#F27D26] mx-auto" />
                <h3 className="text-xl font-black text-white uppercase tracking-tight">
                  Project Brief Received!
                </h3>
                <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                  Thank you for submitting your project requirements. Our engineering team is reviewing your specs and will email you an official proposal shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 bg-zinc-900 border border-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-xl"
                >
                  Submit Another Brief
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2">Project Brief Form</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-4 py-3 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#F27D26]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="sarah@company.com"
                      className="w-full px-4 py-3 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#F27D26]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-1">Company / Brand Name</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Apex Tech Ltd."
                      className="w-full px-4 py-3 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#F27D26]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-1">Country / Location</label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="United States / Pakistan / UAE / UK"
                      className="w-full px-4 py-3 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#F27D26]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-1">Primary Service</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3 py-3 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#F27D26]"
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-1">Estimated Budget</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3 py-3 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#F27D26]"
                    >
                      <option value="Under $500">Under $500</option>
                      <option value="$500 - $1,000">$500 - $1,000</option>
                      <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                      <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                      <option value="$5,000+">$5,000+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-1">Timeline</label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-3 py-3 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#F27D26]"
                    >
                      <option value="Urgent (< 1 Week)">Urgent (&lt; 1 Week)</option>
                      <option value="2-3 Weeks">2-3 Weeks</option>
                      <option value="1 Month">1 Month</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-1">Project Details & Requirements *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your goals, features, competitors, or specific requirements..."
                    className="w-full px-4 py-3 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#F27D26]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#F27D26] hover:bg-orange-500 text-black font-extrabold text-xs uppercase tracking-widest rounded-full shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-black" />
                  Submit Request Brief
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
