import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Globe, ShieldCheck, Zap, Users, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  navigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  const { settings } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-[#F27D26] text-[10px] font-extrabold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-[#F27D26]" />
          About BRANIFY Store & Agency
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
          We Build Digital Systems That Accelerate Business Growth
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
          BRANIFY is a technology partner and digital assets marketplace engineered for high-growth startups and global brands.
        </p>
      </div>

      {/* Core Values / Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#080808] border border-white/10 rounded-2xl p-6 space-y-3">
          <Globe className="w-8 h-8 text-[#F27D26]" />
          <h3 className="text-lg font-black text-white uppercase tracking-tight">Global Currency & Billing</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Seamless multi-currency support across USD ($), PKR (Pakistan), and AED (Dubai/UAE) with local bank & card payment options.
          </p>
        </div>

        <div className="bg-[#080808] border border-white/10 rounded-2xl p-6 space-y-3">
          <Zap className="w-8 h-8 text-white" />
          <h3 className="text-lg font-black text-white uppercase tracking-tight">Rapid Execution Sprints</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Agile development workflows delivering high-performance websites, custom UI kits, and AI automation in 3–14 business days.
          </p>
        </div>

        <div className="bg-[#080808] border border-white/10 rounded-2xl p-6 space-y-3">
          <ShieldCheck className="w-8 h-8 text-[#F27D26]" />
          <h3 className="text-lg font-black text-white uppercase tracking-tight">100% Quality & Guarantee</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Dedicated post-launch warranty, speed optimization, and 24/7 technical support for total peace of mind.
          </p>
        </div>
      </div>

      {/* Agency Mission Statement */}
      <div className="bg-[#080808] border border-white/10 rounded-3xl p-8 sm:p-12 space-y-6 text-center max-w-3xl mx-auto shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          Our Core Mission
        </h2>
        <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
          To democratize enterprise-grade software engineering, modern brand design, and AI automation for founders worldwide. Whether you need a full custom web app or instant digital assets, BRANIFY provides the tools to build, brand, and grow seamlessly.
        </p>
        <button
          onClick={() => navigate('/contact')}
          className="px-8 py-4 bg-[#F27D26] hover:bg-orange-500 text-black text-xs font-extrabold uppercase tracking-widest rounded-full transition-colors inline-flex items-center gap-2"
        >
          Start a Project with Us
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
