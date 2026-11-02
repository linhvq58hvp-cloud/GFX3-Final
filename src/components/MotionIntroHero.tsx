import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Product } from '../types';

interface MotionIntroHeroProps {
  products: Product[];
  onScrollToExplore: () => void;
  onQuickSelectVehicle: (product: Product) => void;
}

export const MotionIntroHero: React.FC<MotionIntroHeroProps> = ({
  products,
  onScrollToExplore,
  onQuickSelectVehicle
}) => {
  return (
    <section className="relative w-full h-[90vh] min-h-[500px] max-h-[920px] bg-black text-white overflow-hidden flex flex-col justify-between select-none">
      {/* Dynamic Background Image with subtle Ken Burns zoom */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src="/assets/images/segway_monsterlab_intro_1790952481286.jpg"
          alt="GOFOLD Smart Urban Mobility in Motion"
          className="h-full w-full object-cover object-center scale-105 animate-pulse duration-[8000ms] opacity-80"
        />
        {/* Cinematic Gradient Overlays with Cyan/Blue glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,163,255,0.18)_0%,rgba(0,0,0,0.85)_75%)]" />
        
        {/* Cyberpunk Grid scanline effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      </div>

      {/* Spacer to replace deleted top bar and keep vertical centering */}
      <div className="pt-4 sm:pt-6" />

      {/* Center Cinematic Title & Tagline */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 text-center my-auto">
        <div className="inline-block">
          <span className="text-[11px] sm:text-xs md:text-sm font-extrabold tracking-[0.25em] sm:tracking-[0.35em] uppercase text-[#00a3ff] mb-2 sm:mb-3 block drop-shadow-[0_0_15px_rgba(0,163,255,0.6)]">
            GOFOLD · SMART URBAN MOBILITY
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase font-sans drop-shadow-2xl leading-none">
            TƯƠNG LAI DI CHUYỂN
          </h1>

          <p className="mt-3 sm:mt-4 text-xs sm:text-base lg:text-lg text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed drop-shadow px-2">
            Hệ sinh thái 4 dòng xe điện gấp thông minh thế hệ mới <strong className="text-white font-bold">GOFOLD</strong>: Gấp 1 chạm, chống trượt an toàn, thiết kế đô thị chuẩn quốc tế. Tiện lợi di chuyển trên mọi cung đường.
          </p>
        </div>

        {/* 5 Quick-glance vehicle pill anchors (Touch friendly & horizontal scroll on mobile) */}
        <div className="mt-5 sm:mt-8 flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 px-1 max-w-full mx-auto scrollbar-none">
          {products.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => onQuickSelectVehicle(p)}
              className="group flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-black/70 hover:bg-[#00a3ff] hover:text-black active:scale-95 backdrop-blur-md px-3 sm:px-3.5 py-1.5 text-xs text-neutral-300 transition-all shrink-0 touch-manipulation"
            >
              <span className="font-mono text-[10px] text-[#00a3ff] group-hover:text-black font-bold">
                0{idx + 1}
              </span>
              <span className="font-medium whitespace-nowrap text-[11px] sm:text-xs">
                {p.name.replace('GoFold ', '')}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Signature Monster Lab Element: "CUỘN ĐỂ KHÁM PHÁ" (Scroll to Explore) */}
      <div className="relative z-10 pb-5 sm:pb-8 flex flex-col items-center justify-center">
        <button
          onClick={onScrollToExplore}
          className="group flex flex-col items-center gap-1.5 sm:gap-2 cursor-pointer transition-transform hover:scale-105 active:scale-95 touch-manipulation"
          aria-label="Cuộn để khám phá"
        >
          {/* Animated Mouse Icon with Scrolling Wheel Dot */}
          <div className="relative h-8 sm:h-9 w-4.5 sm:w-5 rounded-full border-2 border-neutral-400 group-hover:border-[#00a3ff] transition-colors p-1 flex justify-center">
            <div className="h-1.5 w-1 rounded-full bg-[#00a3ff] animate-bounce" />
          </div>

          {/* Glowing Animated Text */}
          <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-neutral-300 group-hover:text-[#00a3ff] transition-colors">
            <span>CUỘN ĐỂ KHÁM PHÁ</span>
            <ChevronDown className="h-3 w-3 sm:h-3.5 sm:w-3.5 animate-bounce text-[#00a3ff]" />
          </div>

          <span className="text-[9px] sm:text-[10px] text-neutral-500 font-mono tracking-wider sm:tracking-widest">
            SCROLL TO EXPLORE 5 GOFOLD MODELS
          </span>
        </button>
      </div>
    </section>
  );
};
