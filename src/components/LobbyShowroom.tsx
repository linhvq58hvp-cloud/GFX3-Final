import React, { useState } from 'react';
import { Product } from '../types';
import { ArrowRight, Eye, ShoppingCart, Calendar, Zap, ShieldCheck } from 'lucide-react';
import { formatVND } from '../utils/format';

interface LobbyShowroomProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenTestRide: (vehicleId?: string) => void;
}

export const LobbyShowroom: React.FC<LobbyShowroomProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onOpenTestRide
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'x3' | 'max' | 'f' | 'e' | 'c-zing'>('all');

  const filteredProducts = activeFilter === 'all'
    ? products
    : products.filter((p) => p.scooterSeries === activeFilter);

  return (
    <section id="lobby-showroom" className="relative w-full bg-black text-white pt-8 sm:pt-10 pb-16 sm:pb-20">
      <div className="mx-auto max-w-[1440px] px-3 sm:px-8 lg:px-12">
        {/* Sảnh chính Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10 px-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-neutral-900/80 px-3.5 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold text-[#00a3ff] mb-2 sm:mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00a3ff] animate-pulse" />
            <span>Sảnh Trưng Bày GOFOLD Chính Hãng 2026</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-sans uppercase leading-tight">
            4 Dòng Xe Điện Gấp Thông Minh
          </h2>

          <p className="mt-2 sm:mt-3 text-xs sm:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed pb-4 sm:pb-0">
            Phân phối chính hãng 100% · Trải nghiệm trực tiếp & giao xe tận nhà. Nhấn vào xe để xem chi tiết thông số kỹ thuật.
          </p>
        </div>

        {/* 5-Category Quick Filter Pills (Smooth swipe on mobile) */}
        <div className="mb-8 sm:mb-12 flex justify-start sm:justify-center overflow-x-auto pb-2 scrollbar-none px-1">
          <div className="inline-flex items-center rounded-full bg-[#141416] p-1 sm:p-1.5 border border-neutral-800/80 shrink-0">
            <button
              onClick={() => setActiveFilter('all')}
              className={`rounded-full px-3.5 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap active:scale-95 touch-manipulation ${
                activeFilter === 'all'
                  ? 'bg-[#00a3ff] text-black font-extrabold shadow-md shadow-cyan-500/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Tất Cả (4 Xe)
            </button>

            <button
              onClick={() => setActiveFilter('x3')}
              className={`rounded-full px-3.5 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap active:scale-95 touch-manipulation ${
                activeFilter === 'x3'
                  ? 'bg-[#00a3ff] text-black font-extrabold shadow-md shadow-cyan-500/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              GoFold X3
            </button>

            <button
              onClick={() => setActiveFilter('max')}
              className={`rounded-full px-3.5 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap active:scale-95 touch-manipulation ${
                activeFilter === 'max'
                  ? 'bg-[#00a3ff] text-black font-extrabold shadow-md shadow-cyan-500/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All-Road (MAX G2)
            </button>

            <button
              onClick={() => setActiveFilter('f')}
              className={`rounded-full px-3.5 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap active:scale-95 touch-manipulation ${
                activeFilter === 'f'
                  ? 'bg-[#00a3ff] text-black font-extrabold shadow-md shadow-cyan-500/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Urban Daily (F2)
            </button>

            <button
              onClick={() => setActiveFilter('e')}
              className={`rounded-full px-3.5 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap active:scale-95 touch-manipulation ${
                activeFilter === 'e'
                  ? 'bg-[#00a3ff] text-black font-extrabold shadow-md shadow-cyan-500/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Casual (E2)
            </button>

            <button
              onClick={() => setActiveFilter('c-zing')}
              className={`rounded-full px-3.5 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap active:scale-95 touch-manipulation ${
                activeFilter === 'c-zing'
                  ? 'bg-[#00a3ff] text-black font-extrabold shadow-md shadow-cyan-500/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Kids (C2)
            </button>
          </div>
        </div>

        {/* 5 Xe Showcase Cards Grid (Mobile 1 column with generous touch areas) */}
        <div className={`grid gap-5 sm:gap-8 ${
          filteredProducts.length === 1
            ? 'grid-cols-1 max-w-md mx-auto'
            : filteredProducts.length <= 3
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
        }`}>
          {filteredProducts.map((product) => {
            return (
              <div
                key={product.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-neutral-900 bg-neutral-950 p-4 sm:p-5 transition-all duration-300 hover:border-cyan-500/40 hover:bg-neutral-900/60 shadow-xl"
              >
                <div>
                  {/* Top Badge Strip */}
                  <div className="flex items-center justify-between text-xs mb-2 sm:mb-3">
                    <span className="font-bold uppercase tracking-wider text-[#00a3ff] text-[10px] sm:text-[11px]">
                      {product.series}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-cyan-400 font-semibold">
                      Chính Hãng
                    </span>
                  </div>

                  {/* Vehicle Studio Cutout Image on Pitch Black */}
                  <div
                    onClick={() => onSelectProduct(product)}
                    className="cursor-pointer aspect-square w-full overflow-hidden rounded-xl bg-black flex items-center justify-center p-3 mb-3 sm:mb-4 group-hover:bg-neutral-900/40 transition-colors active:scale-98 touch-manipulation"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Vehicle Name */}
                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="cursor-pointer text-base sm:text-xl font-extrabold text-white transition-colors group-hover:text-[#00a3ff] line-clamp-1 active:text-[#00a3ff] touch-manipulation"
                  >
                    {product.name}
                  </h3>

                  {/* Clean Short Tagline */}
                  <p className="mt-1 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {product.tagline}
                  </p>

                  {/* Quick Spec Ribbon */}
                  <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 border-y border-neutral-850 py-2 sm:py-2.5 text-xs">
                    <div>
                      <span className="text-neutral-500 text-[9px] sm:text-[10px] block">Tốc độ tối đa</span>
                      <span className="font-mono text-white font-bold text-sm sm:text-base tabular-nums">
                        {product.specs.topSpeed} km/h
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-500 text-[9px] sm:text-[10px] block">Quãng đường</span>
                      <span className="font-mono text-white font-bold text-sm sm:text-base tabular-nums">
                        {product.specs.range} km
                      </span>
                    </div>
                  </div>

                  {/* Pricing (Direct full purchase only) */}
                  <div className="mt-3 sm:mt-4">
                    <span className="text-[10px] sm:text-xs text-neutral-400 block">Giá niêm yết:</span>
                    <div className="font-mono text-xl sm:text-2xl font-extrabold text-white tabular-nums">
                      {formatVND(product.price)}
                    </div>
                    {product.originalPrice && (
                      <span className="font-mono text-xs text-neutral-500 line-through tabular-nums">
                        {formatVND(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Primary Action Buttons (Thumb friendly min 44px on mobile) */}
                <div className="mt-4 sm:mt-5 space-y-2 pt-3 border-t border-neutral-900">
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-[#00a3ff] hover:text-black active:bg-[#00a3ff] active:text-black text-black py-2.5 px-3 text-xs sm:text-sm font-extrabold transition-all shadow-md touch-manipulation"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Xem Chi Tiết Xe</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>

                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-full min-h-[44px] flex items-center justify-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 hover:border-cyan-500/40 hover:text-white active:bg-neutral-800 py-2.5 text-xs font-semibold text-neutral-200 transition-colors touch-manipulation"
                  >
                    <ShoppingCart className="h-4 w-4 text-[#00a3ff]" />
                    <span>Đặt Mua Ngay</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Sảnh Action: Lái thử tại showroom */}
        <div className="mt-10 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-neutral-900">
          <button
            onClick={() => onOpenTestRide()}
            className="w-full sm:w-auto min-h-[48px] flex items-center justify-center gap-2 rounded-xl sm:rounded-full bg-[#00a3ff] hover:bg-cyan-400 active:scale-95 px-7 py-3 text-xs sm:text-sm font-extrabold text-black transition-all shadow-lg shadow-cyan-500/20 touch-manipulation"
          >
            <Calendar className="h-4 w-4" />
            <span>Đặt Lịch Lái Thử Miễn Phí Tại Showroom</span>
          </button>
        </div>

        {/* Brand Commitments */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center max-w-3xl mx-auto text-xs text-neutral-400 border-t border-neutral-900/80 pt-5 sm:pt-6">
          <div className="flex items-center justify-center gap-2 py-1">
            <ShieldCheck className="h-4 w-4 text-cyan-400 shrink-0" />
            <span>Chính hãng GOFOLD 100%</span>
          </div>
          <div className="flex items-center justify-center gap-2 py-1">
            <Zap className="h-4 w-4 text-[#00a3ff] shrink-0" />
            <span>Cơ chế gập gọn thông minh</span>
          </div>
          <div className="flex items-center justify-center gap-2 py-1">
            <Eye className="h-4 w-4 text-blue-400 shrink-0" />
            <span>Giao xe & hướng dẫn tận nhà</span>
          </div>
        </div>
      </div>
    </section>
  );
};
