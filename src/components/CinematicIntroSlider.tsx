import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Calendar, Pause, Play } from 'lucide-react';
import { Product } from '../types';
import { formatVND } from '../utils/format';

interface CinematicIntroSliderProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onBookTestRide: (vehicleId: string) => void;
}

const SLIDE_DURATION = 5000; // 5 seconds per vehicle

export const CinematicIntroSlider: React.FC<CinematicIntroSliderProps> = ({
  products,
  onSelectProduct,
  onBookTestRide
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentVehicle = products[currentIndex] || products[0];

  // Advance to next slide
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
    setProgress(0);
  };

  // Back to previous slide
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    setProgress(0);
  };

  // Jump to specific slide
  const handleGoTo = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  // Autoplay timer with smooth progress bar
  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 50; // update progress every 50ms
    const step = (intervalTime / SLIDE_DURATION) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentIndex, isPaused, products.length]);

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full bg-black text-white overflow-hidden border-b border-neutral-900 select-none"
      aria-label="Cinematic Intro Slider"
    >
      {/* Background Ambient Cyan Radial Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_65%_40%,rgba(0,163,255,0.14),rgba(0,0,0,0.85)_70%)]" />

      {/* Main Slide Stage Container */}
      <div className="relative mx-auto max-w-[1440px] px-3 sm:px-8 lg:px-12 pt-6 sm:pt-8 pb-14 sm:pb-20 lg:py-20 flex flex-col justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center flex-1">
          {/* Left Column: Vehicle Typography & Action */}
          <div className="lg:col-span-6 z-10 space-y-4 sm:space-y-6">
            {/* Top Eyebrow Category */}
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="font-mono text-[11px] sm:text-xs font-bold text-[#00a3ff] tracking-wider uppercase">
                0{currentIndex + 1} / 0{products.length} · {currentVehicle.series}
              </span>
            </div>

            {/* Main Vehicle Heading */}
            <div className="space-y-1.5 sm:space-y-2">
              <h2
                key={`title-${currentVehicle.id}`}
                className="text-2xl sm:text-4xl lg:text-6xl font-black tracking-tight text-white font-sans transition-all duration-500 animate-fadeIn leading-tight"
              >
                {currentVehicle.name}
              </h2>
              <p
                key={`tagline-${currentVehicle.id}`}
                className="text-xs sm:text-sm lg:text-base text-neutral-300 max-w-lg leading-relaxed line-clamp-2"
              >
                {currentVehicle.tagline}
              </p>
            </div>

            {/* Spec HUD Matrix (Compact & Mobile Optimized) */}
            <div
              key={`specs-${currentVehicle.id}`}
              className="grid grid-cols-3 gap-2 sm:gap-4 border-y border-neutral-850 py-3 sm:py-4 max-w-md animate-fadeIn"
            >
              <div>
                <span className="text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-wider block">
                  Tốc độ tối đa
                </span>
                <span className="font-mono text-xl sm:text-3xl font-extrabold text-white tabular-nums">
                  {currentVehicle.specs.topSpeed} <span className="text-[10px] sm:text-xs font-normal text-neutral-500">km/h</span>
                </span>
              </div>

              <div>
                <span className="text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-wider block">
                  Quãng đường
                </span>
                <span className="font-mono text-xl sm:text-3xl font-extrabold text-white tabular-nums">
                  {currentVehicle.specs.range} <span className="text-[10px] sm:text-xs font-normal text-neutral-500">km</span>
                </span>
              </div>

              <div>
                <span className="text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-wider block">
                  Công suất đỉnh
                </span>
                <span className="font-mono text-xl sm:text-3xl font-extrabold text-[#00a3ff] tabular-nums">
                  {currentVehicle.specs.motorPower} <span className="text-[10px] sm:text-xs font-normal text-neutral-500">W</span>
                </span>
              </div>
            </div>

            {/* Price & Primary CTAs */}
            <div className="space-y-3 sm:space-y-4 pt-1 sm:pt-2">
              <div className="flex items-baseline gap-2 sm:gap-3">
                <span className="text-xs text-neutral-400">Giá niêm yết:</span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-white tabular-nums">
                  {formatVND(currentVehicle.price)}
                </span>
                {currentVehicle.originalPrice && (
                  <span className="font-mono text-xs text-neutral-500 line-through tabular-nums">
                    {formatVND(currentVehicle.originalPrice)}
                  </span>
                )}
              </div>

              {/* Mobile-friendly touch buttons (Stacked on mobile, row on tablet/desktop) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                <button
                  onClick={() => onSelectProduct(currentVehicle)}
                  className="flex items-center justify-center gap-2 rounded-xl sm:rounded-full bg-[#00a3ff] hover:bg-cyan-400 active:scale-98 px-6 py-3.5 sm:py-3.5 text-xs sm:text-sm font-extrabold text-black transition-all shadow-lg shadow-cyan-500/20 touch-manipulation"
                >
                  <span>Khám Phá Chi Tiết Xe</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => onBookTestRide(currentVehicle.id)}
                  className="flex items-center justify-center gap-2 rounded-xl sm:rounded-full border border-neutral-700 bg-neutral-900/90 hover:bg-neutral-800 active:scale-98 px-5 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-neutral-200 transition-all hover:text-white touch-manipulation"
                >
                  <Calendar className="h-4 w-4 text-[#00a3ff]" />
                  <span>Đăng Ký Lái Thử</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Cinematic Vehicle Imagery */}
          <div className="lg:col-span-6 relative flex items-center justify-center mt-2 sm:mt-0">
            {/* Visual stage backplate */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center overflow-hidden rounded-2xl bg-black">
              {products.map((vehicle, idx) => {
                const isActive = idx === currentIndex;
                const displayImg = vehicle.heroImage || vehicle.image;

                return (
                  <div
                    key={vehicle.id}
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${
                      isActive
                        ? 'opacity-100 scale-100 translate-x-0 z-10'
                        : 'opacity-0 scale-95 pointer-events-none translate-x-8 z-0'
                    }`}
                  >
                    <img
                      src={displayImg}
                      alt={vehicle.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-contain p-2 transition-transform duration-700"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Interactive Navigation & Progress Bar */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-neutral-900/80 flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
          {/* 5 Segmented Model Tabs with Active Progress Filling Line */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 max-w-full scrollbar-none">
            {products.map((v, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={v.id}
                  onClick={() => handleGoTo(idx)}
                  className={`relative flex flex-col text-left px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all shrink-0 touch-manipulation ${
                    isActive
                      ? 'bg-neutral-900 text-white font-bold'
                      : 'bg-neutral-950 text-neutral-500 hover:text-neutral-300 hover:bg-neutral-900/60'
                  }`}
                >
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-[#00a3ff]">
                    0{idx + 1}
                  </span>
                  <span className="text-[11px] sm:text-xs whitespace-nowrap font-sans">
                    {v.name.replace('GoFold ', '')}
                  </span>

                  {/* Active Slide Progress Fill Line */}
                  <div className="mt-1 sm:mt-1.5 h-0.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                    {isActive ? (
                      <div
                        className="h-full bg-[#00a3ff] transition-all duration-75 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    ) : (
                      <div className="h-full w-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Slider Prev / Next Controls & Pause Button */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <button
              onClick={() => setIsPaused(!isPaused)}
              title={isPaused ? 'Tiếp tục tự động lướt' : 'Tạm dừng lướt'}
              className="p-2 rounded-full border border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white transition-colors active:scale-95 touch-manipulation"
            >
              {isPaused ? <Play className="h-3.5 w-3.5 text-white" /> : <Pause className="h-3.5 w-3.5 text-neutral-400" />}
            </button>

            <button
              onClick={handlePrev}
              aria-label="Previous Vehicle"
              className="p-2 rounded-full border border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors active:scale-95 touch-manipulation"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next Vehicle"
              className="p-2 rounded-full border border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors active:scale-95 touch-manipulation"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
