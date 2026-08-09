import React from 'react';

interface BranifyLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  layout?: 'horizontal' | 'vertical';
}

export const BranifyIconMark: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      {/* Orange Gradient for top wing */}
      <linearGradient id="branify-orange-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF9100" />
        <stop offset="45%" stopColor="#F27D26" />
        <stop offset="100%" stopColor="#D14B00" />
      </linearGradient>

      {/* Metallic White/Silver Gradient for lower loop */}
      <linearGradient id="branify-white-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="60%" stopColor="#F4F4F5" />
        <stop offset="100%" stopColor="#D4D4D8" />
      </linearGradient>

      {/* Subtle Glow Filter */}
      <filter id="orange-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Top Orange Wing / Arrow Blade & Upper Loop of B */}
    <path
      d="M 18 36 L 42 14 H 80 C 98 14 110 25 110 41 C 110 54 99 63 83 67 L 40 40 L 18 36 Z"
      fill="url(#branify-orange-grad)"
      filter="url(#orange-glow)"
    />
    {/* Top Loop Inner Void */}
    <path
      d="M 48 26 H 75 C 83 26 89 30 89 37 C 89 44 83 48 73 48 L 41 28 L 48 26 Z"
      fill="#0B0C10"
    />

    {/* Diagonal Center Cut Separation Highlight */}
    <path
      d="M 38 41 L 83 67 L 76 72 L 30 46 Z"
      fill="#0B0C10"
    />

    {/* Lower White Loop of B with Sharp Parallel Tail */}
    <path
      d="M 14 78 L 52 53 H 84 C 102 53 114 64 114 80 C 114 98 98 106 74 106 H 32 C 22 106 18 98 28 98 L 72 98 C 86 98 94 91 94 80 C 94 69 86 63 70 63 L 40 81 L 14 78 Z"
      fill="url(#branify-white-grad)"
    />
  </svg>
);

export const BranifyLogo: React.FC<BranifyLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
  layout = 'horizontal'
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-lg tracking-wider',
    md: 'text-2xl tracking-wider',
    lg: 'text-3xl tracking-wider',
    xl: 'text-5xl tracking-widest'
  };

  const taglineSizes = {
    sm: 'text-[8px] gap-1',
    md: 'text-[10px] gap-1.5',
    lg: 'text-[12px] gap-2',
    xl: 'text-[14px] gap-2.5'
  };

  if (layout === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center group ${className}`}>
        {/* Monogram Icon */}
        <div className="relative p-1 transition-transform duration-300 group-hover:scale-105">
          <BranifyIconMark className={iconSizes[size]} />
        </div>

        {/* Wordmark */}
        <div className="mt-2 flex flex-col items-center">
          <div className={`font-black uppercase flex items-center leading-none ${textSizes[size]}`}>
            <span className="text-white">BRAN</span>
            <span className="text-[#F27D26]">IFY</span>
          </div>

          {showTagline && (
            <div className="mt-2 flex flex-col items-center">
              <div className={`flex items-center uppercase font-black text-zinc-400 ${taglineSizes[size]}`}>
                <span className="text-white">BUILD.</span>
                <span className="text-[#F27D26]">BRAND.</span>
                <span className="text-white">GROW.</span>
              </div>
              <div className="w-12 h-0.5 bg-[#F27D26] rounded-full mt-1.5"></div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      {/* Monogram Icon */}
      <div className="relative shrink-0 transition-transform duration-300 group-hover:scale-105">
        <BranifyIconMark className={iconSizes[size]} />
      </div>

      {/* Typography */}
      <div className="flex flex-col justify-center">
        <div className={`font-black uppercase flex items-center leading-none font-sans ${textSizes[size]}`}>
          <span className="text-white">BRAN</span>
          <span className="text-[#F27D26]">IFY</span>
        </div>

        {showTagline && (
          <div className={`flex items-center uppercase font-extrabold text-zinc-400 mt-1 ${taglineSizes[size]}`}>
            <span className="text-white">BUILD.</span>
            <span className="text-[#F27D26]">BRAND.</span>
            <span className="text-white">GROW.</span>
          </div>
        )}
      </div>
    </div>
  );
};

