import React, { useState, useEffect } from 'react';
import { Search, X, Globe, Wrench, Package, BookOpen, Layers, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SearchModalProps {
  navigate: (path: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ navigate }) => {
  const { isSearchOpen, setIsSearchOpen, services, products, tools, portfolio, blogs } = useApp();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'services' | 'products' | 'tools' | 'portfolio' | 'blog'>('all');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      } else if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredServices = services.filter(s =>
    !q || s.name.toLowerCase().includes(q) || s.shortDescription.toLowerCase().includes(q)
  );

  const filteredProducts = products.filter(p =>
    !q || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  );

  const filteredTools = tools.filter(t =>
    !q || t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
  );

  const filteredPortfolio = portfolio.filter(p =>
    !q || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  );

  const filteredBlogs = blogs.filter(b =>
    !q || b.title.toLowerCase().includes(q) || b.category.toLowerCase().includes(q)
  );

  const handleSelect = (path: string) => {
    navigate(path);
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050505]/90 backdrop-blur-md flex items-start justify-center pt-16 px-4 pb-12 overflow-y-auto">
      <div className="bg-[#080808] border border-white/10 rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden">
        {/* Search Header */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#F27D26] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Services, Digital Products, Free Tools, Blog..."
            autoFocus
            className="w-full bg-transparent text-sm font-semibold text-white placeholder-zinc-500 focus:outline-none uppercase tracking-wider"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-zinc-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-2.5 py-1 text-xs font-bold uppercase tracking-widest bg-zinc-900 text-zinc-400 hover:text-white rounded-lg border border-white/10"
          >
            Esc
          </button>
        </div>

        {/* Category Tabs */}
        <div className="px-4 py-2 bg-zinc-950 border-b border-white/10 flex items-center gap-2 overflow-x-auto text-xs">
          {[
            { id: 'all', label: 'All Results' },
            { id: 'services', label: `Services (${filteredServices.length})` },
            { id: 'products', label: `Products (${filteredProducts.length})` },
            { id: 'tools', label: `Free Tools (${filteredTools.length})` },
            { id: 'portfolio', label: `Portfolio (${filteredPortfolio.length})` },
            { id: 'blog', label: `Blog (${filteredBlogs.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-full whitespace-nowrap text-[11px] uppercase tracking-wider font-extrabold transition-all ${
                activeCategory === tab.id
                  ? 'bg-[#F27D26] text-black shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Results Area */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-6">
          {/* Services */}
          {(activeCategory === 'all' || activeCategory === 'services') && filteredServices.length > 0 && (
            <div className="space-y-2">
              <div className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#F27D26]" />
                Services
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredServices.slice(0, 6).map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleSelect(`/services/${service.slug}`)}
                    className="p-3 bg-zinc-950 hover:bg-zinc-900 border border-white/10 hover:border-[#F27D26] rounded-xl text-left transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-[#F27D26] transition-colors uppercase tracking-tight">
                        {service.name}
                      </div>
                      <div className="text-[11px] text-zinc-400 line-clamp-1">
                        {service.shortDescription}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-[#F27D26] transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Digital Products */}
          {(activeCategory === 'all' || activeCategory === 'products') && filteredProducts.length > 0 && (
            <div className="space-y-2">
              <div className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-[#F27D26]" />
                Digital Products & Subscriptions
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredProducts.slice(0, 6).map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSelect(product.isSubscription ? '/subscriptions' : `/digital-products/${product.slug}`)}
                    className="p-3 bg-zinc-950 hover:bg-zinc-900 border border-white/10 hover:border-[#F27D26] rounded-xl text-left transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-[#F27D26] transition-colors line-clamp-1 uppercase tracking-tight">
                        {product.title}
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        {product.category} • ${product.priceUSD}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-[#F27D26] transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Free Tools */}
          {(activeCategory === 'all' || activeCategory === 'tools') && filteredTools.length > 0 && (
            <div className="space-y-2">
              <div className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-[#F27D26]" />
                100+ Free Online Tools
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredTools.slice(0, 8).map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => handleSelect(`/tools/${tool.slug}`)}
                    className="p-3 bg-zinc-950 hover:bg-zinc-900 border border-white/10 hover:border-[#F27D26] rounded-xl text-left transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-[#F27D26] transition-colors line-clamp-1">
                        {tool.name}
                      </div>
                      <div className="text-[11px] text-zinc-400 line-clamp-1">
                        {tool.category} — {tool.description}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-[#F27D26] transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Portfolio Case Studies */}
          {(activeCategory === 'all' || activeCategory === 'portfolio') && filteredPortfolio.length > 0 && (
            <div className="space-y-2">
              <div className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-white" />
                Case Studies
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredPortfolio.slice(0, 4).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelect(`/portfolio/${p.slug}`)}
                    className="p-3 bg-zinc-950 hover:bg-zinc-900 border border-white/10 rounded-xl text-left transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-bold text-white line-clamp-1 uppercase">{p.title}</div>
                      <div className="text-[11px] text-zinc-400">{p.client}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-white shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Blog Articles */}
          {(activeCategory === 'all' || activeCategory === 'blog') && filteredBlogs.length > 0 && (
            <div className="space-y-2">
              <div className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-white" />
                Blog Articles
              </div>
              <div className="grid grid-cols-1 gap-2">
                {filteredBlogs.slice(0, 3).map((b) => (
                  <button
                    key={b.id}
                    onClick={() => handleSelect(`/blog/${b.slug}`)}
                    className="p-3 bg-zinc-950 hover:bg-zinc-900 border border-white/10 rounded-xl text-left transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-bold text-white line-clamp-1 uppercase">{b.title}</div>
                      <div className="text-[11px] text-zinc-400">{b.category} • {b.readTime}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-[#F27D26] shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredServices.length === 0 &&
            filteredProducts.length === 0 &&
            filteredTools.length === 0 &&
            filteredPortfolio.length === 0 &&
            filteredBlogs.length === 0 && (
              <div className="py-12 text-center space-y-2">
                <Search className="w-8 h-8 text-zinc-600 mx-auto" />
                <div className="text-sm font-bold text-white uppercase tracking-wider">No results found for "{query}"</div>
                <div className="text-xs text-zinc-500">Try searching for "website", "logo", "pdf", "invoice", "canva", or "pricing"</div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
