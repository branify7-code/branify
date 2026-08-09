import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  Globe,
  LayoutGrid,
  MousePointerClick,
  Figma,
  Palette,
  Share2,
  Presentation,
  Search,
  Bot,
  TrendingUp,
  CheckCircle2,
  Wrench,
  Package,
  ShieldCheck,
  Zap,
  Lock,
  Layers,
  Star,
  MessageSquare,
  ChevronRight,
  ChevronDown,
  ArrowUpRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TiltCard } from '../components/TiltCard';

interface HomePageProps {
  navigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const { services, tools, products, testimonials, formatPrice } = useApp();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // 3D Parallax & Motion state for Hero
  const heroRef = useRef<HTMLDivElement>(null);
  const [isHoveringPanel, setIsHoveringPanel] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normX = (e.clientX - centerX) / (rect.width / 2);
    const normY = (e.clientY - centerY) / (rect.height / 2);

    const maxTilt = 12; // degrees
    const rx = -(normY * maxTilt);
    const ry = normX * maxTilt;

    setTilt({ rx, ry });
    setIsHoveringPanel(true);
  };

  const handleHeroMouseLeave = () => {
    setIsHoveringPanel(false);
    setTilt({ rx: 0, ry: 0 });
  };

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

  const faqs = [
    {
      q: 'What services does BRANIFY offer for international clients?',
      a: 'BRANIFY provides end-to-end digital solutions including custom React/Next.js Web Development, WordPress & WooCommerce, UI/UX Design, Logo & Brand Identity, Social Media Design, Pitch Decks, SEO, and custom Gemini AI Automation.'
    },
    {
      q: 'How does pricing and multi-currency billing work?',
      a: 'We offer transparent pricing with options in USD ($), Pakistani Rupee (PKR), and UAE Dirham (AED). You can switch currencies anytime using the selector in our top navigation bar.'
    },
    {
      q: 'Are the 100+ Free Online Tools completely free to use?',
      a: 'Yes, 100% free! All our browser utilities (PDF text extractors, image compressors, JSON formatters, meta title generators, invoice builders) run directly in your browser without requiring signup or credit cards.'
    },
    {
      q: 'Are the digital products and subscriptions legitimate?',
      a: 'Yes. BRANIFY only distributes 100% original, authorized digital templates, software licenses, and partner subscription products. We strictly forbid unauthorized or shared account reselling.'
    },
    {
      q: 'What is the standard delivery timeline for a custom website?',
      a: 'Standard landing pages are delivered in 3–5 days, custom WordPress/WooCommerce sites in 1–2 weeks, and full React web applications in 2–3 weeks.'
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* --- HERO SECTION WITH 3D ANIMATIONS --- */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative pt-12 lg:pt-20 overflow-hidden bg-[#0A0A0D]"
      >
        {/* Background Ambient Motion Blobs */}
        <div className="absolute -top-16 left-1/4 w-[500px] h-[350px] bg-[#F27D26]/12 rounded-full blur-[140px] pointer-events-none animate-blob-1"></div>
        <div className="absolute top-1/3 -left-20 w-[450px] h-[450px] bg-orange-600/10 rounded-full blur-[150px] pointer-events-none animate-blob-2"></div>
        <div className="absolute -bottom-10 right-10 w-[550px] h-[350px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none animate-blob-3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-[10px] font-extrabold uppercase tracking-widest text-zinc-300 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#F27D26]" />
                <span>International Digital Agency</span>
              </div>

              {/* 3D Staggered Word Entrance Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-[0.95] perspective-1200">
                <span className="inline-block mr-3 animate-word-tilt" style={{ animationDelay: '0ms' }}>BUILD</span>
                <span className="inline-block mr-3 animate-word-tilt" style={{ animationDelay: '60ms' }}>A</span>
                <span className="inline-block mr-3 animate-word-tilt" style={{ animationDelay: '120ms' }}>BRAND</span>
                <span className="inline-block animate-word-tilt" style={{ animationDelay: '180ms' }}>THAT</span>
                <br />
                <span className="inline-block mr-3 text-[#F27D26] animate-word-tilt" style={{ animationDelay: '240ms' }}>MEANS</span>
                <span className="inline-block text-[#F27D26] animate-word-tilt" style={{ animationDelay: '300ms' }}>BUSINESS.</span>
              </h1>

              <p className="text-zinc-400 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Websites, branding, AI solutions and digital products designed to help ambitious businesses look better, work smarter and grow faster.
              </p>

              {/* CTAs with 3D hover lifts & soft orange glows */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => navigate('/contact')}
                  className="w-full sm:w-auto px-8 py-4 btn-gradient-primary rounded-full flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-black group-hover:rotate-12 transition-transform duration-300" />
                  Start a Project
                </button>

                <button
                  onClick={() => navigate('/portfolio')}
                  className="w-full sm:w-auto px-8 py-4 btn-outline-secondary rounded-full flex items-center justify-center gap-2 group cursor-pointer"
                >
                  Explore Our Work
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-[#F27D26] group-hover:translate-x-1 transition-all duration-300" />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold uppercase tracking-wider text-zinc-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F27D26] shrink-0" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F27D26] shrink-0" />
                  <span>Transparent Pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F27D26] shrink-0" />
                  <span>Global Clients</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F27D26] shrink-0" />
                  <span>No Contracts</span>
                </div>
              </div>
            </div>

            {/* Hero Right Floating 3D Card Panel */}
            <div className="lg:col-span-5 relative perspective-1200 py-4">
              <div
                style={{
                  transform:
                    isHoveringPanel && !prefersReducedMotion
                      ? `rotateX(${tilt.rx.toFixed(2)}deg) rotateY(${tilt.ry.toFixed(2)}deg) translateZ(15px)`
                      : undefined,
                  transition: isHoveringPanel ? 'transform 0.15s ease-out' : 'transform 0.8s ease-out'
                }}
                className={`bg-[#080808]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/80 space-y-6 relative overflow-hidden preserve-3d ${
                  !isHoveringPanel && !prefersReducedMotion ? 'animate-hero-float' : ''
                }`}
              >
                {/* Header Bar */}
                <div
                  className="flex items-center justify-between pb-4 border-b border-white/10"
                  style={{ transform: prefersReducedMotion ? 'none' : 'translateZ(15px)' }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#F27D26] inline-block shadow-sm shadow-[#F27D26]"></span>
                    <span className="w-3 h-3 rounded-full bg-zinc-700 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-zinc-800 inline-block"></span>
                  </div>
                  <div className="text-[11px] font-mono text-zinc-500 font-semibold">branify.store/brand-os</div>
                </div>

                {/* 4 Depth Layered Mini-Cards */}
                <div className="grid grid-cols-2 gap-3.5">
                  <div
                    className="p-4 bg-zinc-950/90 border border-white/10 rounded-xl space-y-2 hover:border-[#F27D26] hover:bg-zinc-900/90 transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-xl hover:shadow-[#F27D26]/10"
                    style={{ transform: prefersReducedMotion ? 'none' : 'translateZ(26px)' }}
                  >
                    <div
                      className="p-2 rounded-lg bg-[#F27D26]/10 w-fit group-hover:scale-110 group-hover:bg-[#F27D26] transition-all duration-300 shadow-md group-hover:shadow-[#F27D26]/50"
                      style={{ transform: prefersReducedMotion ? 'none' : 'translateZ(40px)' }}
                    >
                      <Palette className="w-5 h-5 text-[#F27D26] group-hover:text-black transition-colors" />
                    </div>
                    <div className="text-xs font-black uppercase text-white group-hover:text-[#F27D26] transition-colors">01. Brand Identity</div>
                    <div className="text-[11px] text-zinc-400 group-hover:text-zinc-200">Logos, Guidelines, Typography</div>
                  </div>

                  <div
                    className="p-4 bg-zinc-950/90 border border-white/10 rounded-xl space-y-2 hover:border-[#F27D26] hover:bg-zinc-900/90 transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-xl hover:shadow-[#F27D26]/10"
                    style={{ transform: prefersReducedMotion ? 'none' : 'translateZ(38px)' }}
                  >
                    <div
                      className="p-2 rounded-lg bg-white/10 w-fit group-hover:scale-110 group-hover:bg-[#F27D26] transition-all duration-300 shadow-md group-hover:shadow-[#F27D26]/50"
                      style={{ transform: prefersReducedMotion ? 'none' : 'translateZ(40px)' }}
                    >
                      <Globe className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                    </div>
                    <div className="text-xs font-black uppercase text-white group-hover:text-[#F27D26] transition-colors">02. Modern Web</div>
                    <div className="text-[11px] text-zinc-400 group-hover:text-zinc-200">React, Next.js, WooCommerce</div>
                  </div>

                  <div
                    className="p-4 bg-zinc-950/90 border border-white/10 rounded-xl space-y-2 hover:border-[#F27D26] hover:bg-zinc-900/90 transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-xl hover:shadow-[#F27D26]/10"
                    style={{ transform: prefersReducedMotion ? 'none' : 'translateZ(20px)' }}
                  >
                    <div
                      className="p-2 rounded-lg bg-[#F27D26]/10 w-fit group-hover:scale-110 group-hover:bg-[#F27D26] transition-all duration-300 shadow-md group-hover:shadow-[#F27D26]/50"
                      style={{ transform: prefersReducedMotion ? 'none' : 'translateZ(40px)' }}
                    >
                      <Bot className="w-5 h-5 text-[#F27D26] group-hover:text-black transition-colors" />
                    </div>
                    <div className="text-xs font-black uppercase text-white group-hover:text-[#F27D26] transition-colors">03. AI Solutions</div>
                    <div className="text-[11px] text-zinc-400 group-hover:text-zinc-200">Gemini Bots, Workflow Automation</div>
                  </div>

                  <div
                    className="p-4 bg-zinc-950/90 border border-white/10 rounded-xl space-y-2 hover:border-[#F27D26] hover:bg-zinc-900/90 transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-xl hover:shadow-[#F27D26]/10"
                    style={{ transform: prefersReducedMotion ? 'none' : 'translateZ(32px)' }}
                  >
                    <div
                      className="p-2 rounded-lg bg-white/10 w-fit group-hover:scale-110 group-hover:bg-[#F27D26] transition-all duration-300 shadow-md group-hover:shadow-[#F27D26]/50"
                      style={{ transform: prefersReducedMotion ? 'none' : 'translateZ(40px)' }}
                    >
                      <TrendingUp className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                    </div>
                    <div className="text-xs font-black uppercase text-white group-hover:text-[#F27D26] transition-colors">04. Scalable Growth</div>
                    <div className="text-[11px] text-zinc-400 group-hover:text-zinc-200">100+ Free Tools & Products</div>
                  </div>
                </div>

                {/* Micro Metric Banner */}
                <div
                  className="p-3 bg-zinc-950/90 border border-white/10 rounded-xl flex items-center justify-between text-xs shadow-md hover:border-[#F27D26]/40 transition-colors"
                  style={{ transform: prefersReducedMotion ? 'none' : 'translateZ(18px)' }}
                >
                  <span className="text-zinc-400 font-medium">Google Core Web Vitals Performance:</span>
                  <span className="text-[#F27D26] font-black font-mono flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    100/100 Green
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TRUST / SOCIAL PROOF LOGOS --- */}
      <section className="border-y border-slate-800/80 py-10 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Trusted by Ambitious Businesses Worldwide
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all text-slate-400 text-xs sm:text-sm font-semibold">
            <span className="hover:text-white transition-colors">APEX GLOBAL TECH</span>
            <span className="hover:text-white transition-colors">LUMINA LIVING DUBAI</span>
            <span className="hover:text-white transition-colors">ZENITH LOGISTICS</span>
            <span className="hover:text-white transition-colors">VANGUARD CAPITAL</span>
            <span className="hover:text-white transition-colors">NOVASAASTOOLS</span>
          </div>
        </div>
      </section>

      {/* --- SERVICES SYSTEM SECTION (11 PRIMARY SERVICES) --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white text-[10px] font-extrabold uppercase tracking-widest">
            Agency Suite
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter">
            11 Specialized Digital Services
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            From high-converting web applications and WooCommerce stores to complete brand identity manuals and Gemini AI chatbots.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <TiltCard
              key={service.id}
              onClick={() => navigate(`/services/${service.slug}`)}
              className="p-6 h-full flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="icon-pop-target w-12 h-12 rounded-xl bg-zinc-950 border border-white/10 flex items-center justify-center shadow-md">
                  {iconMap[service.iconName] || <Globe className="w-6 h-6 text-[#F27D26]" />}
                </div>

                <div style={{ transform: 'translateZ(25px)' }}>
                  <h3 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-[#F27D26] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-zinc-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                <ul
                  className="space-y-1.5 pt-2 border-t border-white/10 text-[11px] text-zinc-300"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  {service.features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#F27D26] shrink-0" />
                      <span className="line-clamp-1">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="pt-4 border-t border-white/10 flex items-center justify-between text-xs"
                style={{ transform: 'translateZ(30px)' }}
              >
                <div>
                  <span className="text-zinc-500">Starting from </span>
                  <span className="font-extrabold text-[#F27D26]">{formatPrice(service.startingPriceUSD)}</span>
                </div>
                <div className="text-[#F27D26] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1 uppercase tracking-wider text-[11px]">
                  View Service
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* --- FREE TOOLS SPOTLIGHT SECTION (100+ FREE TOOLS) --- */}
      <section className="bg-[#080808] border-y border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[#F27D26] text-[10px] font-extrabold uppercase tracking-widest">
                <Wrench className="w-3.5 h-3.5 text-[#F27D26]" />
                Free Browser Utilities
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter">
                100+ Free Online Tools
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm">
                No signups, no credit cards required. High-performance browser utilities for PDF, image compression, JSON formatting, SEO tags, and invoices.
              </p>
            </div>

            <button
              onClick={() => navigate('/tools')}
              className="px-6 py-3.5 btn-gradient-primary rounded-full flex items-center gap-2 self-start md:self-auto text-xs uppercase tracking-widest"
            >
              Explore All 100+ Free Tools
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>

          {/* Popular Featured Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.slice(0, 8).map((tool) => (
              <TiltCard
                key={tool.id}
                onClick={() => navigate(`/tools/${tool.slug}`)}
                className="p-5 h-full space-y-3"
              >
                <div className="flex items-center justify-between" style={{ transform: 'translateZ(20px)' }}>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-zinc-300 text-[10px] font-bold uppercase tracking-wider border border-white/10">
                    {tool.category}
                  </span>
                  <div className="icon-pop-target p-1.5 rounded-lg bg-zinc-950 border border-white/10">
                    <Wrench className="w-4 h-4 text-zinc-400" />
                  </div>
                </div>

                <div style={{ transform: 'translateZ(25px)' }}>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#F27D26] transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-zinc-400 text-[11px] mt-1 line-clamp-2">
                    {tool.description}
                  </p>
                </div>

                <div
                  className="text-[11px] text-[#F27D26] font-bold uppercase tracking-wider flex items-center gap-1 group-hover:underline pt-1"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  Launch Tool →
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* --- DIGITAL PRODUCTS & SUBSCRIPTIONS HIGHLIGHT --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white text-[10px] font-extrabold uppercase tracking-widest">
              <Package className="w-3.5 h-3.5 text-[#F27D26]" />
              Digital Storefront
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter">
              Premium Digital Products
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Instant download AI prompt kits, Canva social templates, Notion agency workspaces, and authorized productivity subscriptions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/digital-products')}
              className="px-5 py-2.5 btn-outline-secondary text-xs rounded-xl"
            >
              View Templates
            </button>
            <button
              onClick={() => navigate('/subscriptions')}
              className="px-5 py-2.5 btn-gradient-primary rounded-xl flex items-center gap-1.5 text-xs uppercase"
            >
              Subscriptions
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Featured Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.slice(0, 3).map((prod) => (
            <TiltCard
              key={prod.id}
              onClick={() => navigate(prod.isSubscription ? '/subscriptions' : `/digital-products/${prod.slug}`)}
              className="h-full flex flex-col justify-between"
            >
              <div className="aspect-video relative overflow-hidden bg-zinc-950 rounded-t-2xl">
                <img
                  src={prod.images[0]}
                  alt={prod.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#050505]/90 backdrop-blur-md text-[#F27D26] text-[10px] font-extrabold uppercase tracking-wider border border-[#F27D26]/30">
                  {prod.category}
                </div>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div style={{ transform: 'translateZ(25px)' }}>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#F27D26] transition-colors line-clamp-2">
                    {prod.title}
                  </h3>
                  <p className="text-zinc-400 text-xs mt-1.5 line-clamp-2">
                    {prod.description}
                  </p>
                </div>

                <div
                  className="pt-3 border-t border-white/10 flex items-center justify-between text-xs"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <div>
                    <span className="text-zinc-500 line-through text-[10px] mr-1">
                      {prod.originalPriceUSD && formatPrice(prod.originalPriceUSD)}
                    </span>
                    <span className="font-extrabold text-[#F27D26] text-sm">
                      {formatPrice(prod.priceUSD)}
                    </span>
                  </div>

                  <span className="text-[#F27D26] font-bold uppercase text-[11px] tracking-wider group-hover:underline flex items-center gap-1">
                    Get Access
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* --- 5-STEP INTERACTIVE PROCESS --- */}
      <section className="bg-[#080808] border-y border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-extrabold uppercase tracking-widest border border-white/10">
              Workflow
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter">Our 5-Step Process</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              How we take your vision from initial discovery to international launch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { num: '01', title: 'Discovery', desc: 'Requirements analysis, goal mapping, and technical scope architecture.' },
              { num: '02', title: 'Strategy & Design', desc: 'Figma wireframes, interactive UI prototypes, and brand identity manuals.' },
              { num: '03', title: 'Development', desc: 'Clean, type-safe React/TypeScript or WordPress engineering.' },
              { num: '04', title: 'Testing & Launch', desc: 'Core Web Vitals audit, security testing, SSL, and domain deployment.' },
              { num: '05', title: 'Delivery & Support', desc: 'Code handoff, documentation, video training, and ongoing maintenance.' }
            ].map((step, idx) => (
              <TiltCard key={idx} className="p-5 h-full space-y-3 relative">
                <div className="text-2xl font-black text-[#F27D26] font-mono" style={{ transform: 'translateZ(30px)' }}>
                  {step.num}
                </div>
                <h3 className="text-sm font-bold text-white uppercase" style={{ transform: 'translateZ(25px)' }}>
                  {step.title}
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed" style={{ transform: 'translateZ(20px)' }}>
                  {step.desc}
                </p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY BRANIFY FEATURE CARDS --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter">Why Choose BRANIFY</h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Built for performance, aesthetics, security, and international scalability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Palette className="w-6 h-6 text-[#F27D26]" />, title: 'World-Class Design', desc: 'Bespoke typography, spacious negative space, and mathematical design systems that build immediate trust.' },
            { icon: <Zap className="w-6 h-6 text-white" />, title: 'Performance Focused', desc: 'Sub-second loading times engineered with React, Next.js, and serverless caching for maximum Core Web Vitals scores.' },
            { icon: <ShieldCheck className="w-6 h-6 text-[#F27D26]" />, title: 'Secure & Reliable', desc: 'Full SSL hardening, input validation, clean code structure, and zero vulnerability configurations.' },
            { icon: <TrendingUp className="w-6 h-6 text-white" />, title: 'Conversion Focused', desc: 'Direct-response layouts and strategic call-to-action flows that turn visitors into paying customers.' },
            { icon: <Bot className="w-6 h-6 text-[#F27D26]" />, title: 'AI-Native Capability', desc: 'Seamlessly integrate custom Gemini AI models for customer support chatbots and automated content workflows.' },
            { icon: <Layers className="w-6 h-6 text-white" />, title: 'Scalable Technology', desc: 'Built on industry-standard React and TypeScript architectures that grow as your business expands.' }
          ].map((card, idx) => (
            <TiltCard key={idx} className="p-6 h-full space-y-3">
              <div className="icon-pop-target w-12 h-12 rounded-xl bg-zinc-950 border border-white/10 flex items-center justify-center shadow-md">
                {card.icon}
              </div>
              <h3 className="text-base font-bold text-white uppercase" style={{ transform: 'translateZ(25px)' }}>
                {card.title}
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed" style={{ transform: 'translateZ(20px)' }}>
                {card.desc}
              </p>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="bg-[#080808] border-y border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter">Client Feedback</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              What international founders and business leaders say about working with BRANIFY.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((test) => (
              <TiltCard key={test.id} className="p-6 h-full space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#F27D26]" style={{ transform: 'translateZ(30px)' }}>
                    {Array(test.rating).fill(0).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-zinc-300 text-xs italic leading-relaxed" style={{ transform: 'translateZ(20px)' }}>
                    "{test.review}"
                  </p>
                </div>

                <div
                  className="flex items-center gap-3 pt-4 border-t border-white/10"
                  style={{ transform: 'translateZ(25px)' }}
                >
                  <img src={test.avatar} alt={test.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                  <div>
                    <div className="text-xs font-bold text-white">{test.name}</div>
                    <div className="text-[11px] text-zinc-400">{test.position} • {test.company}</div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">Frequently Asked Questions</h2>
          <p className="text-zinc-400 text-xs sm:text-sm">Everything you need to know before starting a project with BRANIFY.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={idx} className="bg-[#080808] border border-white/10 rounded-xl overflow-hidden transition-all">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-bold text-xs sm:text-sm text-white flex items-center justify-between gap-4"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isOpen ? 'rotate-180 text-[#F27D26]' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-zinc-400 leading-relaxed border-t border-white/10 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* --- CONVERSION CTA BANNER --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#080808] border border-white/10 rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter">
              READY TO ELEVATE YOUR BRAND?
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Let’s build a high-converting website, bespoke brand identity, or custom AI automation system tailored to your international growth goals.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 btn-gradient-primary rounded-full flex items-center gap-2 uppercase tracking-widest text-xs"
            >
              <Sparkles className="w-4 h-4 text-black" />
              Request a Free Quote
            </button>
            <button
              onClick={() => navigate('/pricing')}
              className="px-8 py-4 btn-outline-secondary rounded-full uppercase tracking-widest text-xs"
            >
              View Transparent Pricing
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
