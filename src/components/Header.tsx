import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  Globe,
  ChevronDown,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Currency } from '../types';
import { BranifyLogo } from './BranifyLogo';
import { MegaMenuOverlay } from './MegaMenuOverlay';
import { MobileAccordionNav } from './MobileAccordionNav';
import {
  SERVICES_MEGA_MENU,
  DIGITAL_PRODUCTS_MEGA_MENU,
  FREE_TOOLS_MEGA_MENU,
  PORTFOLIO_MEGA_MENU,
  PRICING_MEGA_MENU,
  BLOG_MEGA_MENU,
  MegaMenuConfig
} from '../data/navigationData';

interface HeaderProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, navigate }) => {
  const {
    currency,
    setCurrency,
    cart,
    setIsSearchOpen,
    isAdminLoggedIn
  } = useApp();

  const [activeMegaMenu, setActiveMegaMenu] = useState<
    'services' | 'products' | 'tools' | 'portfolio' | 'pricing' | 'blog' | null
  >(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const currencies: Currency[] = ['USD', 'PKR', 'AED'];

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveMegaMenu(null);
        setIsCurrencyDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveMegaMenu(null);
        setIsCurrencyDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNavClick = (path: string) => {
    navigate(path);
    setActiveMegaMenu(null);
    setIsMobileMenuOpen(false);
  };

  const handleMouseEnterLink = (
    menuType: 'services' | 'products' | 'tools' | 'portfolio' | 'pricing' | 'blog'
  ) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActiveMegaMenu(menuType);
  };

  const handleMouseLeaveHeader = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 200);
  };

  const getMegaMenuConfig = (): MegaMenuConfig | null => {
    switch (activeMegaMenu) {
      case 'services': return SERVICES_MEGA_MENU;
      case 'products': return DIGITAL_PRODUCTS_MEGA_MENU;
      case 'tools': return FREE_TOOLS_MEGA_MENU;
      case 'portfolio': return PORTFOLIO_MEGA_MENU;
      case 'pricing': return PRICING_MEGA_MENU;
      case 'blog': return BLOG_MEGA_MENU;
      default: return null;
    }
  };

  const activeConfig = getMegaMenuConfig();

  return (
    <header
      ref={headerRef}
      onMouseLeave={handleMouseLeaveHeader}
      className="sticky top-0 z-40 bg-[#0B0C10]/90 backdrop-blur-md border-b border-white/10 transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('/')}
          className="focus:outline-none"
          aria-label="BRANIFY Home"
        >
          <BranifyLogo size="md" />
        </button>

        {/* Desktop Navigation */}
        <nav
          className="hidden xl:flex items-center gap-1 lg:gap-2 text-[13px] font-medium text-zinc-300"
          aria-label="Main Navigation"
        >
          {/* Home */}
          <button
            onClick={() => handleNavClick('/')}
            className={`px-3 py-1.5 rounded-lg transition-colors relative ${
              currentPath === '/'
                ? 'text-white font-bold bg-zinc-900 border border-white/10'
                : 'hover:text-white hover:bg-zinc-900/50'
            }`}
          >
            Home
            {currentPath === '/' && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#F27D26] rounded-full"></span>
            )}
          </button>

          {/* Services Dropdown */}
          <button
            onMouseEnter={() => handleMouseEnterLink('services')}
            onClick={() => handleNavClick('/services')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 relative ${
              currentPath.startsWith('/services') || activeMegaMenu === 'services'
                ? 'text-white font-bold bg-zinc-900 border border-white/10'
                : 'hover:text-white hover:bg-zinc-900/50'
            }`}
            aria-expanded={activeMegaMenu === 'services'}
          >
            <span>Services</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                activeMegaMenu === 'services' ? 'rotate-180 text-[#F27D26]' : 'text-zinc-500'
              }`}
            />
            {currentPath.startsWith('/services') && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#F27D26] rounded-full"></span>
            )}
          </button>

          {/* Digital Products Dropdown */}
          <button
            onMouseEnter={() => handleMouseEnterLink('products')}
            onClick={() => handleNavClick('/digital-products')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 relative ${
              currentPath.startsWith('/digital-products') || activeMegaMenu === 'products'
                ? 'text-white font-bold bg-zinc-900 border border-white/10'
                : 'hover:text-white hover:bg-zinc-900/50'
            }`}
            aria-expanded={activeMegaMenu === 'products'}
          >
            <span>Digital Products</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                activeMegaMenu === 'products' ? 'rotate-180 text-[#F27D26]' : 'text-zinc-500'
              }`}
            />
            {currentPath.startsWith('/digital-products') && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#F27D26] rounded-full"></span>
            )}
          </button>

          {/* Free Tools Dropdown */}
          <button
            onMouseEnter={() => handleMouseEnterLink('tools')}
            onClick={() => handleNavClick('/tools')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 relative ${
              currentPath.startsWith('/tools') || activeMegaMenu === 'tools'
                ? 'text-white font-bold bg-zinc-900 border border-white/10'
                : 'hover:text-white hover:bg-zinc-900/50'
            }`}
            aria-expanded={activeMegaMenu === 'tools'}
          >
            <span>Free Tools</span>
            <span className="px-1.5 py-0.2 text-[9px] font-black uppercase bg-[#F27D26] text-black rounded ml-0.5">
              100+
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                activeMegaMenu === 'tools' ? 'rotate-180 text-[#F27D26]' : 'text-zinc-500'
              }`}
            />
            {currentPath.startsWith('/tools') && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#F27D26] rounded-full"></span>
            )}
          </button>

          {/* Portfolio Dropdown */}
          <button
            onMouseEnter={() => handleMouseEnterLink('portfolio')}
            onClick={() => handleNavClick('/portfolio')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 relative ${
              currentPath.startsWith('/portfolio') || activeMegaMenu === 'portfolio'
                ? 'text-white font-bold bg-zinc-900 border border-white/10'
                : 'hover:text-white hover:bg-zinc-900/50'
            }`}
            aria-expanded={activeMegaMenu === 'portfolio'}
          >
            <span>Portfolio</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                activeMegaMenu === 'portfolio' ? 'rotate-180 text-[#F27D26]' : 'text-zinc-500'
              }`}
            />
            {currentPath.startsWith('/portfolio') && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#F27D26] rounded-full"></span>
            )}
          </button>

          {/* Pricing Dropdown */}
          <button
            onMouseEnter={() => handleMouseEnterLink('pricing')}
            onClick={() => handleNavClick('/pricing')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 relative ${
              currentPath.startsWith('/pricing') || activeMegaMenu === 'pricing'
                ? 'text-white font-bold bg-zinc-900 border border-white/10'
                : 'hover:text-white hover:bg-zinc-900/50'
            }`}
            aria-expanded={activeMegaMenu === 'pricing'}
          >
            <span>Pricing</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                activeMegaMenu === 'pricing' ? 'rotate-180 text-[#F27D26]' : 'text-zinc-500'
              }`}
            />
            {currentPath.startsWith('/pricing') && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#F27D26] rounded-full"></span>
            )}
          </button>

          {/* Blog Dropdown */}
          <button
            onMouseEnter={() => handleMouseEnterLink('blog')}
            onClick={() => handleNavClick('/blog')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 relative ${
              currentPath.startsWith('/blog') || activeMegaMenu === 'blog'
                ? 'text-white font-bold bg-zinc-900 border border-white/10'
                : 'hover:text-white hover:bg-zinc-900/50'
            }`}
            aria-expanded={activeMegaMenu === 'blog'}
          >
            <span>Blog</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                activeMegaMenu === 'blog' ? 'rotate-180 text-[#F27D26]' : 'text-zinc-500'
              }`}
            />
            {currentPath.startsWith('/blog') && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#F27D26] rounded-full"></span>
            )}
          </button>

          {/* About */}
          <button
            onClick={() => handleNavClick('/about')}
            className={`px-3 py-1.5 rounded-lg transition-colors relative ${
              currentPath.startsWith('/about')
                ? 'text-white font-bold bg-zinc-900 border border-white/10'
                : 'hover:text-white hover:bg-zinc-900/50'
            }`}
          >
            About
            {currentPath.startsWith('/about') && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#F27D26] rounded-full"></span>
            )}
          </button>

          {/* Contact */}
          <button
            onClick={() => handleNavClick('/contact')}
            className={`px-3 py-1.5 rounded-lg transition-colors relative ${
              currentPath.startsWith('/contact')
                ? 'text-white font-bold bg-zinc-900 border border-white/10'
                : 'hover:text-white hover:bg-zinc-900/50'
            }`}
          >
            Contact
            {currentPath.startsWith('/contact') && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#F27D26] rounded-full"></span>
            )}
          </button>
        </nav>

        {/* Right Actions & CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Global Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-zinc-300 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 rounded-xl border border-white/10 transition-colors flex items-center gap-2 text-xs"
            title="Search Services, Products, Tools..."
          >
            <Search className="w-4 h-4 text-zinc-300" />
            <span className="hidden md:inline-block text-zinc-400">Search...</span>
            <kbd className="hidden md:inline-block text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Currency Selector */}
          <div className="relative">
            <button
              onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 rounded-xl text-xs font-bold text-zinc-200 transition-colors"
              aria-label="Select Currency"
            >
              <Globe className="w-3.5 h-3.5 text-[#F27D26]" />
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </button>

            {isCurrencyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-[#0B0C10] border border-white/10 rounded-xl shadow-2xl py-1 z-50">
                {currencies.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCurrency(c);
                      setIsCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-zinc-800 transition-colors ${
                      currency === c ? 'text-[#F27D26] font-extrabold bg-zinc-800/50' : 'text-zinc-300'
                    }`}
                  >
                    <span>{c}</span>
                    {currency === c && <span className="w-1.5 h-1.5 rounded-full bg-[#F27D26]"></span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <button
            onClick={() => handleNavClick('/cart')}
            className="p-2 text-zinc-300 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 rounded-xl border border-white/10 transition-colors relative"
            title="View Cart"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#F27D26] text-black font-black text-[10px] flex items-center justify-center animate-pulse">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Admin Indicator */}
          <button
            onClick={() => handleNavClick('/admin')}
            className={`p-2 rounded-xl border transition-colors ${
              isAdminLoggedIn
                ? 'bg-[#F27D26]/10 border-[#F27D26]/40 text-[#F27D26]'
                : 'bg-zinc-900/80 border-white/10 text-zinc-400 hover:text-white'
            }`}
            title="Admin Dashboard"
            aria-label="Admin Portal"
          >
            <ShieldAlert className="w-4 h-4" />
          </button>

          {/* Start a Project CTA */}
          <button
            onClick={() => handleNavClick('/contact')}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#F27D26] text-black hover:bg-orange-500 font-extrabold text-xs uppercase tracking-widest rounded-full transition-all shadow-lg shadow-[#F27D26]/20 hover:scale-105"
          >
            Start a Project
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 text-zinc-300 hover:text-white bg-zinc-900 border border-white/10 rounded-xl"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Desktop Mega Menu Overlay */}
      {activeConfig && (
        <MegaMenuOverlay
          config={activeConfig}
          onNavigate={handleNavClick}
          onClose={() => setActiveMegaMenu(null)}
        />
      )}

      {/* Mobile Accordion Drawer */}
      {isMobileMenuOpen && (
        <MobileAccordionNav
          currentPath={currentPath}
          onNavigate={handleNavClick}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};
