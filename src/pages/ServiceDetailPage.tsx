import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  DollarSign,
  Sparkles,
  ChevronDown,
  Globe,
  ArrowRight
} from 'lucide-react';

interface ServiceDetailPageProps {
  slug: string;
  navigate: (path: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ slug, navigate }) => {
  const { services, formatPrice, addToCart } = useApp();
  const service = services.find((s) => s.slug === slug) || services[0];

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleOrderService = () => {
    addToCart({
      id: `service-${service.id}`,
      title: service.name,
      priceUSD: service.startingPriceUSD,
      type: 'service',
      details: `${service.deliveryTimeline} delivery`
    });
    navigate('/cart');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Back Button */}
      <button
        onClick={() => navigate('/services')}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4 text-[#F27D26]" />
        Back to All Services
      </button>

      {/* Service Hero Header */}
      <div className="bg-[#080808] border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-[#F27D26] text-xs font-extrabold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-[#F27D26]" />
          {service.category.toUpperCase()} SERVICE
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter">
          {service.name}
        </h1>

        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          {service.tagline}
        </p>

        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div>
              <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Starting Price</div>
              <div className="text-2xl font-black text-[#F27D26]">{formatPrice(service.startingPriceUSD)}</div>
            </div>
            <div className="h-8 w-px bg-white/10"></div>
            <div>
              <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Estimated Timeline</div>
              <div className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#F27D26]" />
                {service.deliveryTimeline}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleOrderService}
              className="flex-1 sm:flex-none px-6 py-4 bg-[#F27D26] hover:bg-orange-500 text-black font-extrabold text-xs uppercase tracking-widest rounded-full shadow-lg transition-all flex items-center justify-center gap-2"
            >
              Order Service ({formatPrice(service.startingPriceUSD)})
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-5 py-4 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider rounded-full border border-white/10 transition-colors"
            >
              Request Custom Quote
            </button>
          </div>
        </div>
      </div>

      {/* Overview & Features */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-[#080808] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-black text-white uppercase tracking-tight">Service Overview</h2>
            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
              {service.fullDescription}
            </p>
          </div>

          {/* Features List */}
          <div className="bg-[#080808] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-black text-white uppercase tracking-tight">What's Included</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.features.map((feat, idx) => (
                <div key={idx} className="p-3 bg-zinc-950 border border-white/10 rounded-xl text-xs font-semibold text-zinc-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F27D26] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Process Steps */}
          <div className="bg-[#080808] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-black text-white uppercase tracking-tight">Our Execution Process</h2>
            <div className="space-y-3">
              {service.processSteps.map((step, idx) => (
                <div key={idx} className="p-4 bg-zinc-950 border border-white/10 rounded-xl flex items-start gap-4">
                  <span className="text-lg font-black text-[#F27D26] shrink-0">{step.step}</span>
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">{step.title}</h3>
                    <p className="text-[11px] text-zinc-400 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-[#080808] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-black text-white uppercase tracking-tight">Service FAQs</h2>
            <div className="space-y-2">
              {service.faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div key={idx} className="bg-zinc-950 border border-white/10 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full p-3.5 text-left text-xs font-bold text-white flex items-center justify-between gap-2 uppercase tracking-wide"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isOpen ? 'rotate-180 text-[#F27D26]' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-3.5 pb-3.5 text-xs text-zinc-400 border-t border-white/10 pt-2 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Deliverables */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#080808] border border-white/10 rounded-2xl p-6 space-y-4 sticky top-28">
            <h3 className="text-xs font-black text-white uppercase tracking-widest">Final Deliverables</h3>
            <ul className="space-y-2 text-xs text-zinc-300">
              {service.deliverables.map((del, idx) => (
                <li key={idx} className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#F27D26] shrink-0" />
                  <span>{del}</span>
                </li>
              ))}
            </ul>

            {service.techStack && (
              <div className="pt-4 border-t border-white/10 space-y-2">
                <div className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest">Technologies</div>
                <div className="flex flex-wrap gap-1.5">
                  {service.techStack.map((tech, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-zinc-950 border border-white/10 rounded-md text-[11px] font-bold text-zinc-300 uppercase">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => navigate('/contact')}
              className="w-full py-3.5 bg-[#F27D26] hover:bg-orange-500 text-black font-extrabold text-xs uppercase tracking-widest rounded-full transition-colors flex items-center justify-center gap-1.5"
            >
              Get Started Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
