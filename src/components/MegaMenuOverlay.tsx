import React from 'react';
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
  FileText,
  FileImage,
  Braces,
  Receipt,
  CheckCircle2,
  BookOpen,
  DollarSign,
  Tag,
  Star
} from 'lucide-react';
import { MegaMenuConfig, NavLinkItem } from '../data/navigationData';

interface MegaMenuOverlayProps {
  config: MegaMenuConfig;
  onNavigate: (path: string) => void;
  onClose: () => void;
}

export const MegaMenuOverlay: React.FC<MegaMenuOverlayProps> = ({
  config,
  onNavigate,
  onClose
}) => {
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-4 h-4 text-[#5A8DFF]" />;
      case 'LayoutGrid': return <LayoutGrid className="w-4 h-4 text-[#5A8DFF]" />;
      case 'MousePointerClick': return <MousePointerClick className="w-4 h-4 text-[#5A8DFF]" />;
      case 'Figma': return <Figma className="w-4 h-4 text-[#5A8DFF]" />;
      case 'Palette': return <Palette className="w-4 h-4 text-[#5A8DFF]" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-[#5A8DFF]" />;
      case 'Share2': return <Share2 className="w-4 h-4 text-[#5A8DFF]" />;
      case 'Presentation': return <Presentation className="w-4 h-4 text-[#5A8DFF]" />;
      case 'Search': return <Search className="w-4 h-4 text-[#5A8DFF]" />;
      case 'Bot': return <Bot className="w-4 h-4 text-[#5A8DFF]" />;
      case 'TrendingUp': return <TrendingUp className="w-4 h-4 text-[#5A8DFF]" />;
      default: return <CheckCircle2 className="w-3.5 h-3.5 text-zinc-500" />;
    }
  };

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    onClose();
  };

  return (
    <div
      className="absolute top-full left-0 w-full bg-[#0B0C10]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/80 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
      role="menu"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Render grid depending on menu type */}
        {config.type === 'services' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5A8DFF]"></span>
                  <h3 className="text-xs font-black uppercase tracking-widest text-zinc-300">
                    {section.heading}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.path}>
                      <button
                        onClick={() => handleLinkClick(item.path)}
                        className="w-full text-left p-2.5 rounded-xl transition-all duration-200 group hover:bg-zinc-900/90 border border-transparent hover:border-white/10 flex items-start gap-3"
                      >
                        <div className="p-2 rounded-lg bg-zinc-900 group-hover:bg-[#5A8DFF]/10 border border-white/5 group-hover:border-[#5A8DFF]/30 transition-colors mt-0.5">
                          {getIcon(item.iconName)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-bold text-zinc-100 group-hover:text-[#5A8DFF] transition-colors">
                              {item.title}
                            </span>
                            {item.badge && (
                              <span className="px-1.5 py-0.5 text-[9px] font-black uppercase bg-[#5A8DFF] text-black rounded">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.desc && (
                            <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1 group-hover:text-zinc-300">
                              {item.desc}
                            </p>
                          )}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {config.type === 'products' && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {config.sections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <div className="pb-2 border-b border-white/10">
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#5A8DFF]">
                    {section.heading}
                  </h3>
                </div>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.path}>
                      <button
                        onClick={() => handleLinkClick(item.path)}
                        className="w-full text-left p-2 rounded-lg transition-colors group hover:bg-zinc-900 flex items-center justify-between text-xs"
                      >
                        <span className="font-semibold text-zinc-300 group-hover:text-white transition-colors">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="px-1 py-0.2 text-[8px] font-bold bg-[#5A8DFF]/20 text-[#5A8DFF] border border-[#5A8DFF]/40 rounded">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {config.type === 'tools' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {config.sections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <div className="pb-1.5 border-b border-white/10 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5A8DFF]"></span>
                  <h3 className="text-[11px] font-black uppercase tracking-wider text-zinc-200">
                    {section.heading}
                  </h3>
                </div>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.title}>
                      <button
                        onClick={() => handleLinkClick(item.path)}
                        className="w-full text-left py-1 px-1.5 rounded hover:bg-zinc-900 transition-colors text-xs text-zinc-400 hover:text-[#5A8DFF] flex items-center justify-between"
                      >
                        <span className="truncate">{item.title}</span>
                        {item.badge && (
                          <span className="text-[8px] px-1 bg-green-500/20 text-green-400 font-bold rounded">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {config.type === 'portfolio' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <div className="pb-2 border-b border-white/10">
                <h3 className="text-xs font-black uppercase tracking-widest text-[#5A8DFF]">
                  Filter Portfolio By Category
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {config.sections[0].items.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => handleLinkClick(item.path)}
                    className="p-3 bg-zinc-900/60 hover:bg-zinc-800/90 border border-white/5 hover:border-[#5A8DFF]/40 rounded-xl text-left transition-all group"
                  >
                    <div className="text-xs font-bold text-zinc-200 group-hover:text-[#5A8DFF] transition-colors">
                      {item.title}
                    </div>
                    {item.desc && (
                      <div className="text-[10px] text-zinc-400 mt-0.5 line-clamp-1">
                        {item.desc}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Case Study Preview */}
            <div className="bg-gradient-to-br from-zinc-900 to-[#050505] p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-[#5A8DFF] text-black text-[10px] font-black rounded-md">
                    FEATURED CASE STUDY
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono">E-COMMERCE & REBRAND</span>
                </div>
                <h4 className="text-base font-black text-white leading-snug mb-2">
                  Luxura Global: 240% Increase in Direct Checkout Conversions
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  Full custom React frontend rebuild, Next.js catalog indexing, and WooCommerce backend payment integration.
                </p>
              </div>
              <button
                onClick={() => handleLinkClick('/portfolio')}
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#5A8DFF] hover:text-white transition-colors"
              >
                <span>Read Full Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {config.type === 'pricing' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {config.sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <div className="pb-2 border-b border-white/10 flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#5A8DFF]">
                    {section.heading}
                  </h3>
                  <span className="text-[10px] text-zinc-500 font-mono">Transparent Fixed Rates</span>
                </div>
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <button
                      key={item.title}
                      onClick={() => handleLinkClick(item.path)}
                      className="w-full text-left p-3 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 border border-white/5 hover:border-white/20 transition-all flex items-center justify-between gap-4 group"
                    >
                      <div>
                        <div className="text-xs font-bold text-zinc-200 group-hover:text-white transition-colors">
                          {item.title}
                        </div>
                        {item.desc && (
                          <div className="text-[11px] text-zinc-400 mt-0.5">
                            {item.desc}
                          </div>
                        )}
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-[#5A8DFF]/10 text-[#5A8DFF] font-mono text-xs font-bold shrink-0 border border-[#5A8DFF]/30">
                        {item.price}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {config.type === 'blog' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <div className="pb-2 border-b border-white/10">
                <h3 className="text-xs font-black uppercase tracking-widest text-[#5A8DFF]">
                  Blog Topics & Categories
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {config.sections[0].items.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => handleLinkClick(item.path)}
                    className="p-2.5 bg-zinc-900/60 hover:bg-zinc-800 border border-white/5 hover:border-white/15 rounded-xl text-left transition-colors flex items-center gap-2 group"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#5A8DFF]" />
                    <span className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors">
                      {item.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Latest Highlight */}
            <div className="bg-zinc-900/80 p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-[#5A8DFF] text-black text-[9px] font-black rounded">
                    LATEST ARTICLE
                  </span>
                  <span className="text-[10px] text-zinc-400">5 min read</span>
                </div>
                <h4 className="text-sm font-bold text-white leading-snug mb-2 hover:text-[#5A8DFF] transition-colors cursor-pointer" onClick={() => handleLinkClick('/blog')}>
                  10 Essential Gemini 2.5 API Prompt Formulas for SaaS Copywriting
                </h4>
                <p className="text-xs text-zinc-400 line-clamp-3 mb-4">
                  Learn how to structure multi-turn prompts, set temperature controls, and output formatted JSON payloads directly for production.
                </p>
              </div>
              <button
                onClick={() => handleLinkClick('/blog')}
                className="text-xs font-black text-[#5A8DFF] hover:underline inline-flex items-center gap-1"
              >
                <span>Read Blog →</span>
              </button>
            </div>
          </div>
        )}

        {/* Bottom CTA Bar */}
        {config.bottomCta && (
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-900/40 p-4 rounded-xl border border-white/5">
            <div>
              <div className="text-sm font-extrabold text-white flex items-center gap-2">
                <span>{config.bottomCta.text}</span>
              </div>
              {config.bottomCta.subtext && (
                <p className="text-xs text-zinc-400 mt-0.5">
                  {config.bottomCta.subtext}
                </p>
              )}
            </div>
            <button
              onClick={() => handleLinkClick(config.bottomCta!.path)}
              className="px-5 py-2.5 btn-gradient-primary uppercase tracking-wider rounded-xl text-xs flex items-center gap-2 shrink-0"
            >
              <span>{config.bottomCta.linkText}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
