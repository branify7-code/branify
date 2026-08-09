import React, { useState, useRef, useEffect } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  maxTilt?: number;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  onClick,
  maxTilt = 8,
  disabled = false,
  style = {}
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, isHovered: false });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || prefersReducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within card
    const y = e.clientY - rect.top;  // y position within card

    // Set CSS custom properties for cursor light positioning
    cardRef.current.style.setProperty('--x', `${x}px`);
    cardRef.current.style.setProperty('--y', `${y}px`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const normX = (x - centerX) / centerX;
    const normY = (y - centerY) / centerY;

    const rx = -(normY * maxTilt);
    const ry = normX * maxTilt;

    setTilt({ rx, ry, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, isHovered: false });
  };

  const transformStyle =
    tilt.isHovered && !prefersReducedMotion && !disabled
      ? `rotateX(${tilt.rx.toFixed(2)}deg) rotateY(${tilt.ry.toFixed(2)}deg) scale(1.02)`
      : 'rotateX(0deg) rotateY(0deg) scale(1)';

  return (
    <div className="perspective-1200 w-full">
      <div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: transformStyle,
          transition: tilt.isHovered ? 'transform 0.15s ease-out' : 'transform 0.5s ease-out',
          ...style
        }}
        className={`tilt-card-wrapper preserve-3d relative rounded-2xl bg-[#0B0C10] border border-white/10 overflow-hidden transition-all duration-300 ${
          onClick ? 'cursor-pointer' : ''
        } ${className}`}
      >
        {/* Cursor Following Radial Glow */}
        <div className="tilt-card-glow" />

        {/* Animated Gradient Border Highlight */}
        <div className="tilt-card-border-glow" />

        {/* Card Content with 3D Preservation */}
        <div className="relative z-10 h-full preserve-3d">
          {children}
        </div>
      </div>
    </div>
  );
};
