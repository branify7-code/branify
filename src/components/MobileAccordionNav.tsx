import React, { useState } from 'react';
import { ChevronDown, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import {
  SERVICES_MEGA_MENU,
  DIGITAL_PRODUCTS_MEGA_MENU,
  FREE_TOOLS_MEGA_MENU,
  PORTFOLIO_MEGA_MENU,
  PRICING_MEGA_MENU,
  BLOG_MEGA_MENU,
  MegaMenuConfig
} from '../data/navigationData';

interface MobileAccordionNavProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onClose: () => void;
}

export const MobileAccordionNav: React.FC<MobileAccordionNavProps> = ({
  currentPath,
  onNavigate,
  onClose
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (sectionName: string) => {
    setExpandedSection(expandedSection === sectionName ? null : sectionName);
  };

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    onClose();
  };

  const navConfigs: { title: string; path: string; menuConfig?: MegaMenuConfig }[] = [
    { title: 'Home', path: '/' },
    { title: 'Services', path: '/services', menuConfig: SERVICES_MEGA_MENU },
    { title: 'Digital Products', path: '/digital-products', menuConfig: DIGITAL_PRODUCTS_MEGA_MENU },
    { title: 'Free Tools', path: '/tools', menuConfig: FREE_TOOLS_MEGA_MENU },
    { title: 'Portfolio', path: '/portfolio', menuConfig: PORTFOLIO_MEGA_MENU },
    { title: 'Pricing', path: '/pricing', menuConfig: PRICING_MEGA_MENU },
    { title: 'Blog', path: '/blog', menuConfig: BLOG_MEGA_MENU },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' }
  ];

  return (
    <div className="xl:hidden bg-[#0A0A0C] border-b border-white/10 px-4 py-6 space-y-3 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
      <div className="space-y-1">
        {navConfigs.map((nav) => {
          const isExpanded = expandedSection === nav.title;
          const isActive =
            nav.path === '/'
              ? currentPath === '/'
              : currentPath.startsWith(nav.path);

          if (!nav.menuConfig) {
            // Simple single link
            return (
              <button
                key={nav.path}
                onClick={() => handleLinkClick(nav.path)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-colors font-bold text-sm flex items-center justify-between ${
                  isActive
                    ? 'bg-[#F27D26]/10 text-[#F27D26] border border-[#F27D26]/30'
                    : 'text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                <span>{nav.title}</span>
                <ChevronRight className="w-4 h-4 text-zinc-500" />
              </button>
            );
          }

          // Accordion Item
          return (
            <div key={nav.title} className="rounded-xl overflow-hidden border border-white/5 bg-zinc-900/40">
              <div className="flex items-center justify-between p-1">
                <button
                  onClick={() => handleLinkClick(nav.path)}
                  className={`flex-1 text-left px-3 py-2.5 font-bold text-sm transition-colors ${
                    isActive ? 'text-[#F27D26]' : 'text-zinc-200'
                  }`}
                >
                  {nav.title}
                </button>
                <button
                  onClick={() => toggleSection(nav.title)}
                  className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                  aria-label={`Toggle ${nav.title} Submenu`}
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180 text-[#F27D26]' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Accordion Content */}
              {isExpanded && (
                <div className="px-3 pb-3 pt-1 space-y-4 bg-zinc-950/80 border-t border-white/5 animate-in fade-in duration-150">
                  {nav.menuConfig.sections.map((section, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="text-[10px] font-black uppercase tracking-widest text-[#F27D26] pt-1">
                        {section.heading}
                      </div>
                      <div className="grid grid-cols-1 gap-1 pl-1">
                        {section.items.map((item) => (
                          <button
                            key={item.title}
                            onClick={() => handleLinkClick(item.path)}
                            className="w-full text-left py-2 px-2 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors flex items-center justify-between"
                          >
                            <span className="truncate">{item.title}</span>
                            {item.price && (
                              <span className="text-[10px] font-mono font-bold text-[#F27D26]">
                                {item.price}
                              </span>
                            )}
                            {item.badge && (
                              <span className="text-[8px] px-1 py-0.2 bg-[#F27D26] text-black font-black rounded">
                                {item.badge}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Accordion Bottom CTA */}
                  {nav.menuConfig.bottomCta && (
                    <button
                      onClick={() => handleLinkClick(nav.menuConfig!.bottomCta!.path)}
                      className="w-full py-2.5 px-3 bg-[#F27D26]/10 border border-[#F27D26]/30 hover:bg-[#F27D26] hover:text-black text-[#F27D26] rounded-xl text-xs font-bold transition-all flex items-center justify-between"
                    >
                      <span>{nav.menuConfig.bottomCta.linkText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t border-white/10">
        <button
          onClick={() => handleLinkClick('/contact')}
          className="w-full py-3.5 bg-[#F27D26] text-black hover:bg-orange-500 font-extrabold text-xs uppercase tracking-widest rounded-xl shadow-lg flex items-center justify-center gap-2"
        >
          <span>Start a Project</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
