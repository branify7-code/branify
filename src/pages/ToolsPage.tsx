import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ToolRunner } from '../components/ToolRunner';
import { TiltCard } from '../components/TiltCard';
import { ToolItem } from '../types';
import {
  Wrench,
  Search,
  Sparkles,
  ArrowRight,
  FileText,
  Image,
  Code,
  Globe,
  Calculator,
  Lock,
  Download,
  Share2
} from 'lucide-react';

interface ToolsPageProps {
  navigate: (path: string) => void;
  selectedToolSlug?: string;
}

export const ToolsPage: React.FC<ToolsPageProps> = ({ navigate, selectedToolSlug }) => {
  const { tools } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Determine active tool if slug is present in URL
  const activeTool = selectedToolSlug ? tools.find((t) => t.slug === selectedToolSlug) : null;

  const categories = [
    'All',
    'PDF Tools',
    'Image Tools',
    'Text & Content',
    'Developer Tools',
    'SEO Tools',
    'Business & Finance'
  ];

  const filteredTools = tools.filter((t) => {
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'PDF Tools': return <FileText className="w-4 h-4 text-[#F27D26]" />;
      case 'Image Tools': return <Image className="w-4 h-4 text-white" />;
      case 'Text & Content': return <FileText className="w-4 h-4 text-[#F27D26]" />;
      case 'Developer Tools': return <Code className="w-4 h-4 text-white" />;
      case 'SEO Tools': return <Globe className="w-4 h-4 text-[#F27D26]" />;
      case 'Business & Finance': return <Calculator className="w-4 h-4 text-white" />;
      default: return <Wrench className="w-4 h-4 text-[#F27D26]" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Active Tool Runner Header/Modal if Tool is Selected */}
      {activeTool ? (
        <div className="space-y-6">
          <button
            onClick={() => navigate('/tools')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
          >
            ← Back to All 100+ Free Tools
          </button>
          <ToolRunner tool={activeTool} onClose={() => navigate('/tools')} />
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-[#F27D26] text-[10px] font-extrabold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#F27D26]" />
              100% Free Online Web Utilities
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
              100+ Free Online Developer & Marketing Tools
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Fast, privacy-first web utilities running directly inside your browser. No registration or credit card required.
            </p>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="bg-[#080808] border border-white/10 rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl">
            <div className="relative">
              <Search className="w-5 h-5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search PDF merge, background remover, password generator, UTM builder, invoice generator..."
                className="w-full pl-12 pr-4 py-3 bg-zinc-950 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#F27D26]"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-extrabold uppercase text-[11px] tracking-wider whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedCategory === cat
                      ? 'btn-gradient-primary text-black shadow-md'
                      : 'btn-outline-secondary'
                  }`}
                >
                  {getCategoryIcon(cat)}
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Tool Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <TiltCard
                key={tool.id}
                onClick={() => navigate(`/tools/${tool.slug}`)}
                className="p-6 h-full flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between" style={{ transform: 'translateZ(30px)' }}>
                    <span className="text-[10px] font-extrabold text-[#F27D26] uppercase tracking-widest px-2.5 py-1 bg-white/10 rounded-md border border-white/10">
                      {tool.category}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded uppercase">
                      Instant Free
                    </span>
                  </div>

                  <h3
                    className="text-lg font-black text-white group-hover:text-[#F27D26] transition-colors uppercase tracking-tight"
                    style={{ transform: 'translateZ(25px)' }}
                  >
                    {tool.name}
                  </h3>

                  <p
                    className="text-zinc-400 text-xs leading-relaxed line-clamp-3"
                    style={{ transform: 'translateZ(20px)' }}
                  >
                    {tool.description}
                  </p>
                </div>

                <div
                  className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-white group-hover:text-[#F27D26]"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <span className="uppercase tracking-wider">Run Tool Online</span>
                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-[#F27D26] group-hover:translate-x-1 transition-all" />
                </div>
              </TiltCard>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-16 bg-[#080808] border border-white/10 rounded-2xl space-y-3">
              <Wrench className="w-10 h-10 text-zinc-600 mx-auto" />
              <div className="text-sm font-bold text-white uppercase tracking-wider">No matching free tools found</div>
              <p className="text-xs text-zinc-500">Try adjusting your search keywords or selecting a different category.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
