import React from 'react';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AnnouncementBar: React.FC = () => {
  const { settings, announcementDismissed, setAnnouncementDismissed } = useApp();

  if (!settings.announcementActive || announcementDismissed) {
    return null;
  }

  const handleDismiss = () => {
    setAnnouncementDismissed(true);
    localStorage.setItem('branify_announcement_dismissed', 'true');
  };

  return (
    <div className="bg-[#F27D26] text-black text-[11px] font-extrabold py-2 px-4 border-b border-orange-600/30 relative z-50 flex items-center justify-between tracking-wider uppercase">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center flex-1 pr-6">
        <Sparkles className="w-3.5 h-3.5 text-black shrink-0 hidden sm:inline-block" />
        <span className="font-extrabold text-black">
          {settings.announcementText}
        </span>
        <a
          href={settings.announcementLink || '/contact'}
          className="inline-flex items-center gap-1 font-black text-black hover:underline ml-1"
        >
          {settings.announcementCtaText || 'Claim Offer →'}
        </a>
      </div>

      <button
        onClick={handleDismiss}
        className="p-1 hover:bg-black/10 rounded-md text-black/80 hover:text-black transition-colors"
        title="Dismiss announcement"
        aria-label="Dismiss announcement"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
