import React from 'react';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Product } from '../types';

interface HeroProps {
  flagshipProduct: Product;
  onExploreProduct: (product: Product) => void;
  onBookTestRide: (vehicleId?: string) => void;
  onScrollToLineup: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  flagshipProduct,
  onExploreProduct,
  onBookTestRide,
  onScrollToLineup
}) => {
  return (
    <section className="relative overflow-hidden bg-black pt-8 pb-16 lg:py-24 border-t border-neutral-900">
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 z-10">
            <div className="mb-3 text-xs font-bold tracking-widest text-[#eb2227] uppercase">
              Chính Hãng Segway-Ninebot Toàn Cầu
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl" style={{ textWrap: 'balance' }}>
              Kỷ Nguyên Di Chuyển Điện Thông Minh
            </h1>

            <p className="mt-4 max-w-xl text-base text-neutral-300 sm:text-lg">
              Đỉnh cao kỹ thuật cơ khí và công nghệ tự hành vi mô. Dẫn đầu hành trình đô thị với hiệu suất bứt phá, hệ thống giảm xóc thủy lực kép và kết nối thông minh Segway OS.
            </p>

            {/* Quick Spec HUD Metrics */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-y border-neutral-900 py-6 sm:grid-cols-4">
              <div>
                <div className="font-mono text-2xl font-bold text-white tabular-nums sm:text-3xl">
                  80 <span className="text-xs font-normal text-neutral-400">km/h</span>
                </div>
                <div className="mt-1 text-xs text-neutral-400">Tốc độ tối đa</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-white tabular-nums sm:text-3xl">
                  138 <span className="text-xs font-normal text-neutral-400">km</span>
                </div>
                <div className="mt-1 text-xs text-neutral-400">Quãng đường</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-white tabular-nums sm:text-3xl">
                  3.2 <span className="text-xs font-normal text-neutral-400">giây</span>
                </div>
                <div className="mt-1 text-xs text-neutral-400">0 - 50 km/h</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-[#eb2227] tabular-nums sm:text-3xl">
                  7000 <span className="text-xs font-normal text-neutral-400">W</span>
                </div>
                <div className="mt-1 text-xs text-neutral-400">Công suất kép</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                onClick={() => onExploreProduct(flagshipProduct)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#eb2227] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 whitespace-nowrap shadow-lg shadow-red-900/30"
              >
                Khám Phá {flagshipProduct.name}
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => onBookTestRide(flagshipProduct.id)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-700 bg-neutral-900 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 whitespace-nowrap"
              >
                Đăng Ký Lái Thử Tại Showroom
              </button>
            </div>

            {/* Trust Markers */}
            <div className="mt-8 flex items-center gap-6 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Bảo hành chính hãng 24 tháng</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-[#eb2227]" />
                <span>Trả góp 0% lãi suất</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-6">
            <div className="group relative overflow-hidden rounded-2xl border border-neutral-900 bg-black shadow-2xl">
              <div className="aspect-[16/9] w-full overflow-hidden bg-black">
                <img
                  src={flagshipProduct.image}
                  alt={flagshipProduct.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Bottom Scrim Badge */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-xs text-[#eb2227] font-bold uppercase tracking-wider">Flagship Model 2026</div>
                    <div className="text-xl font-bold text-white">{flagshipProduct.name}</div>
                  </div>
                  <button
                    onClick={onScrollToLineup}
                    className="text-xs text-neutral-300 hover:text-white underline underline-offset-4"
                  >
                    Xem tất cả các dòng xe ↓
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
