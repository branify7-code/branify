import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AnnouncementMessage {
  text: string;
  path: string;
}

const ANNOUNCEMENT_MESSAGES: AnnouncementMessage[] = [
  {
    text: '✨ SUMMER LAUNCH OFFER — GET 30% OFF ON WEBSITES & BRANDING · CLAIM OFFER',
    path: '/contact'
  },
  {
    text: '🚀 100+ FREE BROWSER UTILITIES RELEASED — NO SIGNUP REQUIRED · EXPLORE TOOLS',
    path: '/tools'
  },
  {
    text: '💎 NEW CANVA & NOTION TEMPLATES ADDED TO DIGITAL STORE · SHOP NOW',
    path: '/digital-products'
  }
];

export const AnnouncementBar: React.FC<{ navigate?: (path: string) => void }> = ({ navigate }) => {
  const { settings, announcementDismissed, setAnnouncementDismissed } = useApp();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIdx((prev) => (prev + 1) % ANNOUNCEMENT_MESSAGES.length);
        setIsTransitioning(false);
      }, 250);
    }, 3000);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  if (!settings.announcementActive || announcementDismissed) {
    return null;
  }

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAnnouncementDismissed(true);
    localStorage.setItem('branify_announcement_dismissed', 'true');
  };

  const currentMessage = ANNOUNCEMENT_MESSAGES[activeIdx];

  const handleClick = () => {
    if (navigate) {
      navigate(currentMessage.path);
    } else {
      window.location.href = currentMessage.path;
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`w-full text-[#0a0a0d] py-2 px-4 border-b border-[#9AA0AC]/40 relative z-50 flex items-center justify-between tracking-wide font-bold cursor-pointer transition-colors ${
        prefersReducedMotion
          ? 'bg-gradient-to-r from-[#9AA0AC] via-[#EDEFF3] to-[#C7CBD4]'
          : 'animate-shimmer-sweep'
      }`}
      style={{ fontSize: '12.5px' }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center flex-1 px-6">
        <span
          className={`transition-all duration-300 font-extrabold hover:underline uppercase ${
            isTransitioning ? 'opacity-0 transform -translate-y-1' : 'opacity-100 transform translate-y-0'
          }`}
        >
          {currentMessage.text}
        </span>
      </div>

      <button
        onClick={handleDismiss}
        className="p-1 hover:bg-black/10 rounded-md text-[#0a0a0d] hover:text-black transition-colors shrink-0"
        title="Dismiss announcement"
        aria-label="Dismiss announcement"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

