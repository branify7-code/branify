import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TiltCard } from '../components/TiltCard';
import {
  Package,
  Search,
  Filter,
  Star,
  ShoppingBag,
  Heart,
  ArrowRight,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface DigitalProductsPageProps {
  navigate: (path: string) => void;
}

export const DigitalProductsPage: React.FC<DigitalProductsPageProps> = ({ navigate }) => {
  const { products, formatPrice, addToCart, wishlist, toggleWishlist } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'AI Prompts',
    'Canva Templates',
    'Notion Templates',
    'Presentation Templates',
    'Website Templates',
    'Spreadsheet Templates',
    'Subscription Products'
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
          <Package className="w-3.5 h-3.5" />
          Digital Assets Marketplace
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          Digital Products & Templates
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
          Instant download AI prompt kits, agency Canva templates, Notion workspaces, and startup financial models designed for rapid execution.
        </p>
      </div>

      {/* Subscriptions Callout Banner */}
      <div className="bg-gradient-to-r from-orange-950/40 via-zinc-900 to-orange-950/40 border border-[#F27D26]/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-xs font-bold text-[#F27D26] flex items-center justify-center sm:justify-start gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Looking for Authorized Software Subscriptions?
          </div>
          <div className="text-xs text-zinc-300">
            Get 1-year commercial access keys for AI productivity, design suites, and cloud storage.
          </div>
        </div>

        <button
          onClick={() => navigate('/subscriptions')}
          className="px-5 py-2.5 btn-gradient-primary rounded-xl flex items-center gap-1.5 shrink-0 text-xs"
        >
          View Subscriptions Catalog
          <ArrowUpRight className="w-4 h-4 text-black" />
        </button>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter products..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto text-xs py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all font-bold ${
                  selectedCategory === cat
                    ? 'btn-gradient-primary shadow-md'
                    : 'btn-outline-secondary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((prod) => {
          const isWishlisted = wishlist.includes(prod.id);

          return (
            <TiltCard
              key={prod.id}
              className="h-full flex flex-col justify-between"
            >
              <div className="relative aspect-video bg-zinc-950 overflow-hidden rounded-t-2xl">
                <img
                  src={prod.images[0]}
                  alt={prod.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(prod.id);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-full border backdrop-blur-md transition-colors z-20 ${
                    isWishlisted
                      ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                  title="Save to Wishlist"
                  style={{ transform: 'translateZ(40px)' }}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>

                <div
                  className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-zinc-950/80 backdrop-blur-md text-[#F27D26] text-[10px] font-bold border border-[#F27D26]/30"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  {prod.category}
                </div>
              </div>

              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2" style={{ transform: 'translateZ(25px)' }}>
                  <div className="flex items-center gap-1.5 text-xs text-[#F27D26]">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-bold">{prod.rating}</span>
                    <span className="text-zinc-500">({prod.reviewsCount} reviews)</span>
                  </div>

                  <h3
                    onClick={() => navigate(`/digital-products/${prod.slug}`)}
                    className="text-base font-bold text-white hover:text-[#F27D26] transition-colors line-clamp-2 cursor-pointer"
                  >
                    {prod.title}
                  </h3>

                  <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>
                </div>

                <div
                  className="pt-4 border-t border-zinc-800/80 flex items-center justify-between"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <div>
                    {prod.originalPriceUSD && (
                      <span className="text-zinc-500 line-through text-[11px] block">
                        {formatPrice(prod.originalPriceUSD)}
                      </span>
                    )}
                    <span className="font-extrabold text-[#F27D26] text-base">
                      {formatPrice(prod.priceUSD)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/digital-products/${prod.slug}`)}
                      className="px-3.5 py-2 btn-outline-secondary text-xs rounded-xl"
                    >
                      Details
                    </button>
                    <button
                      onClick={() =>
                        addToCart({
                          id: prod.id,
                          title: prod.title,
                          priceUSD: prod.priceUSD,
                          type: prod.isSubscription ? 'subscription' : 'product',
                          image: prod.images[0]
                        })
                      }
                      className="px-3.5 py-2 btn-gradient-primary rounded-xl text-xs flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-black" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </TiltCard>
          );
        })}
      </div>
    </div>
  );
};
