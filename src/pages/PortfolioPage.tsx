import React from 'react';
import { useApp } from '../context/AppContext';
import { TiltCard } from '../components/TiltCard';
import { Sparkles, ArrowRight, ExternalLink, Globe, Layers, Award } from 'lucide-react';

interface PortfolioPageProps {
  navigate: (path: string) => void;
  selectedSlug?: string;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ navigate, selectedSlug }) => {
  const { portfolio } = useApp();

  const selectedItem = selectedSlug ? portfolio.find((p) => p.slug === selectedSlug) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {selectedItem ? (
        <div className="space-y-8">
          <button
            onClick={() => navigate('/portfolio')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
          >
            ← Back to All Case Studies
          </button>

          <div className="bg-[#080808] border border-white/10 rounded-3xl p-8 sm:p-12 space-y-8 shadow-2xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-[#F27D26] text-[10px] font-extrabold uppercase tracking-widest">
              <Layers className="w-3.5 h-3.5" />
              CASE STUDY • {selectedItem.category.toUpperCase()}
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                {selectedItem.title}
              </h1>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-3xl">
                Client: <span className="text-white font-bold">{selectedItem.client}</span> ({selectedItem.year})
              </p>
            </div>

            <img
              src={selectedItem.coverImage}
              alt={selectedItem.title}
              className="w-full h-80 sm:h-96 object-cover rounded-2xl border border-white/10 shadow-xl"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3 bg-zinc-950 p-6 rounded-2xl border border-white/10">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">The Challenge</h3>
                <p className="text-xs text-zinc-300 leading-relaxed">{selectedItem.challenge}</p>
              </div>

              <div className="space-y-3 bg-zinc-950 p-6 rounded-2xl border border-white/10">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">Our Solution</h3>
                <p className="text-xs text-zinc-300 leading-relaxed">{selectedItem.solution}</p>
              </div>
            </div>

            <div className="space-y-4 bg-zinc-950 p-6 rounded-2xl border border-white/10">
              <h3 className="text-sm font-black text-[#F27D26] uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4" />
                Key Results & Impact Achieved
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {selectedItem.results.map((res, idx) => (
                  <div key={idx} className="p-4 bg-[#080808] border border-white/10 rounded-xl text-center">
                    <div className="text-xs font-bold text-white uppercase tracking-wider">{res}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {selectedItem.technologies.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1 bg-zinc-900 border border-white/10 text-xs font-bold text-zinc-300 rounded-md uppercase">
                    {tech}
                  </span>
                ))}
              </div>

              <button
                onClick={() => navigate('/contact')}
                className="px-6 py-3 bg-[#F27D26] hover:bg-orange-500 text-black text-xs font-extrabold uppercase tracking-widest rounded-full transition-colors flex items-center gap-2"
              >
                Request Similar Solution
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-[#F27D26] text-[10px] font-extrabold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#F27D26]" />
              Proven Enterprise Track Record
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
              Featured Case Studies & Client Work
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Explore how BRANIFY engineers high-converting web applications, brand systems, and automated workflows for fast-growing global startups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/portfolio/${item.slug}`)}
                className="bg-[#080808] hover:bg-zinc-900 border border-white/10 hover:border-[#F27D26] rounded-2xl overflow-hidden transition-all duration-300 group cursor-pointer shadow-xl flex flex-col justify-between"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-[#050505]/90 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-extrabold text-[#F27D26] uppercase tracking-wider">
                    {item.category}
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="text-xs text-zinc-500 font-bold uppercase">{item.client}</div>
                    <h3 className="text-lg font-black text-white group-hover:text-[#F27D26] transition-colors uppercase tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-white group-hover:text-[#F27D26]">
                    <span className="uppercase tracking-wider">Read Full Case Study</span>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-[#F27D26] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
