import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TiltCard } from '../components/TiltCard';
import {
  Globe,
  LayoutGrid,
  MousePointerClick,
  Figma,
  Palette,
  Sparkles,
  Share2,
  Presentation,
  Search,
  Bot,
  TrendingUp,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface ServicesPageProps {
  navigate: (path: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ navigate }) => {
  const { services, formatPrice } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const iconMap: Record<string, React.ReactNode> = {
    Globe: <Globe className="w-6 h-6 text-[#F27D26]" />,
    LayoutGrid: <LayoutGrid className="w-6 h-6 text-white" />,
    MousePointerClick: <MousePointerClick className="w-6 h-6 text-[#F27D26]" />,
    Figma: <Figma className="w-6 h-6 text-white" />,
    Palette: <Palette className="w-6 h-6 text-[#F27D26]" />,
    Sparkles: <Sparkles className="w-6 h-6 text-orange-400" />,
    Share2: <Share2 className="w-6 h-6 text-white" />,
    Presentation: <Presentation className="w-6 h-6 text-[#F27D26]" />,
    Search: <Search className="w-6 h-6 text-white" />,
    Bot: <Bot className="w-6 h-6 text-[#F27D26]" />,
    TrendingUp: <TrendingUp className="w-6 h-6 text-white" />
  };

  const categories = [
    { id: 'all', label: 'All 11 Services' },
    { id: 'web', label: 'Web Development' },
    { id: 'branding', label: 'Branding & Design' },
    { id: 'marketing', label: 'SEO & Marketing' },
    { id: 'ai', label: 'AI Solutions' },
    { id: 'consulting', label: 'Consultation' }
  ];

  const filteredServices = services.filter((s) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'branding') return s.category === 'branding' || s.category === 'design';
    return s.category === activeCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-white text-[10px] font-extrabold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-[#F27D26]" />
          Primary Digital Services
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter">
          DIGITAL AGENCY CAPABILITIES
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
          Explore our 11 primary services designed to give your business an international competitive advantage across web, branding, AI, and digital growth.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap text-xs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-5 py-2.5 rounded-full transition-all text-xs uppercase tracking-wider font-extrabold ${
              activeCategory === cat.id
                ? 'btn-gradient-primary shadow-lg'
                : 'btn-outline-secondary'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Services 3D Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <TiltCard
            key={service.id}
            onClick={() => navigate(`/services/${service.slug}`)}
            className="p-6 h-full flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              {/* Icon Pop Target */}
              <div className="icon-pop-target w-12 h-12 rounded-xl bg-zinc-950 border border-white/10 flex items-center justify-center shadow-md">
                {iconMap[service.iconName] || <Globe className="w-6 h-6 text-[#F27D26]" />}
              </div>

              <div style={{ transform: 'translateZ(25px)' }}>
                <h2 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-[#F27D26] transition-colors">
                  {service.name}
                </h2>
                <p className="text-zinc-400 text-xs mt-1.5 leading-relaxed line-clamp-2">
                  {service.shortDescription}
                </p>
              </div>

              <div
                className="space-y-1.5 pt-3 border-t border-white/10 text-xs text-zinc-300"
                style={{ transform: 'translateZ(20px)' }}
              >
                <div className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider mb-1">
                  Includes:
                </div>
                {service.features.slice(0, 4).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#F27D26] shrink-0" />
                    <span className="line-clamp-1">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="pt-4 border-t border-white/10 flex items-center justify-between text-xs"
              style={{ transform: 'translateZ(30px)' }}
            >
              <div>
                <span className="text-zinc-500 text-[11px]">Starting from </span>
                <span className="font-extrabold text-[#F27D26]">{formatPrice(service.startingPriceUSD)}</span>
              </div>
              <div className="text-[#F27D26] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1 uppercase tracking-wider text-[11px]">
                View Details
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
};

