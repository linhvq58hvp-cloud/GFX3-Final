import React from 'react';

interface GoFoldLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
}

export const GoFoldLogo: React.FC<GoFoldLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = ''
}) => {
  // Dimensions based on size
  const emblemSizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-14 w-14',
    xl: 'h-20 w-20'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* 3D Circular Emblem with Neon Cyan Ring from uploaded image */}
      <div className={`relative ${emblemSizes[size]} shrink-0 rounded-full overflow-hidden shadow-lg shadow-cyan-500/20 border border-cyan-400/40 bg-black`}>
        <img
          src="/assets/images/gofold_logo_emblem_1792121722276.jpg"
          alt="GOFOLD Smart Urban Mobility"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Brand Wordmark: GO in White, FO in Cyan, LD in White */}
      <div className="flex flex-col justify-center">
        <div className={`font-black tracking-wider leading-none ${textSizes[size]}`}>
          <span className="text-white">GO</span>
          <span className="text-[#00a3ff] drop-shadow-[0_0_12px_rgba(0,163,255,0.8)]">FO</span>
          <span className="text-white">LD</span>
        </div>
        {showSubtitle && (
          <span className="text-[9px] sm:text-[10px] tracking-[0.2em] font-bold text-neutral-400 uppercase mt-0.5 whitespace-nowrap">
            SMART URBAN MOBILITY
          </span>
        )}
      </div>
    </div>
  );
};
