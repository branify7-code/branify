import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TiltCard } from '../components/TiltCard';
import { Check, Sparkles, ArrowRight, HelpCircle } from 'lucide-react';

interface PricingPageProps {
  navigate: (path: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ navigate }) => {
  const { formatPrice, addToast } = useApp();
  const [billingCycle, setBillingCycle] = useState<'one-time' | 'monthly'>('one-time');

  const packages = [
    {
      name: 'Starter Brand & Web',
      priceUSD: 499,
      tagline: 'Ideal for early-stage startups and small businesses needing a clean online launch.',
      features: [
        '5-Page Custom React or WordPress Website',
        'Mobile-Responsive & Speed Optimized',
        'Primary Logo Design & Brand Color System',
        'Contact Form with Email Notifications',
        'Basic SEO Meta Tag Setup',
        '10 Days Free Support & Revision Period'
      ],
      popular: false,
      cta: 'Get Started with Starter'
    },
    {
      name: 'Growth & Business Pro',
      priceUSD: 1299,
      tagline: 'Our flagship service package designed for scaling businesses demanding market dominance.',
      features: [
        '10+ Page High-Converting Custom Web App',
        'Complete Logo & Brand Identity Guidelines',
        'WooCommerce / Stripe E-Commerce Integration',
        'AI Customer Chatbot Setup (Gemini API)',
        'Full Technical SEO & Speed Optimization',
        'Custom Social Media Graphic Templates',
        '30 Days Dedicated Support & Maintenance'
      ],
      popular: true,
      cta: 'Choose Growth Pro'
    },
    {
      name: 'Enterprise Custom Suite',
      priceUSD: 2999,
      tagline: 'Dedicated engineering squad for custom SaaS development, mobile app & AI automation.',
      features: [
        'Custom React / Node.js Full-Stack Web App',
        'Custom Database Architecture & Secure APIs',
        'Tailored Gemini AI Automation Pipelines',
        'Dedicated Project Lead & Senior Engineers',
        'Weekly Sprint Reviews & Staging Environment',
        '60 Days Priority Warranty & Maintenance'
      ],
      popular: false,
      cta: 'Request Custom Enterprise Quote'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-[#F27D26] text-[10px] font-extrabold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-[#F27D26]" />
          Transparent Global Pricing
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
          Simple, Predictable Flat-Fee Pricing
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
          No hidden hourly surcharges or surprise billing. Transparent quotes in USD, PKR, and AED with milestone deliverables.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {packages.map((pkg, idx) => (
          <TiltCard
            key={idx}
            className={`p-8 h-full flex flex-col justify-between space-y-8 relative overflow-hidden ${
              pkg.popular ? 'border-[#F27D26] shadow-2xl shadow-orange-500/10' : ''
            }`}
          >
            {pkg.popular && (
              <div
                className="absolute top-0 right-0 bg-[#F27D26] text-black text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-bl-xl z-20"
                style={{ transform: 'translateZ(35px)' }}
              >
                Most Popular
              </div>
            )}

            <div className="space-y-6">
              <div style={{ transform: 'translateZ(25px)' }}>
                <h3 className="text-xl font-black text-white uppercase tracking-tight">{pkg.name}</h3>
                <p className="text-zinc-400 text-xs mt-2 leading-relaxed">{pkg.tagline}</p>
              </div>

              <div style={{ transform: 'translateZ(30px)' }}>
                <span className="text-4xl font-black text-white">{formatPrice(pkg.priceUSD)}</span>
                <span className="text-xs text-zinc-500 font-bold uppercase ml-2">/ Flat Project Fee</span>
              </div>

              <div className="space-y-3 pt-6 border-t border-white/10" style={{ transform: 'translateZ(20px)' }}>
                <div className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest">
                  What's Included
                </div>
                <ul className="space-y-2.5 text-xs text-zinc-300">
                  {pkg.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#F27D26] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => navigate('/contact')}
              style={{ transform: 'translateZ(35px)' }}
              className={`w-full py-4 text-xs rounded-full uppercase tracking-widest flex items-center justify-center gap-2 ${
                pkg.popular ? 'btn-gradient-primary' : 'btn-outline-secondary'
              }`}
            >
              {pkg.cta}
              <ArrowRight className="w-4 h-4" />
            </button>
          </TiltCard>
        ))}
      </div>
    </div>
  );
};

