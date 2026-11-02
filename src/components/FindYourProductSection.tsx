import React, { useState } from 'react';
import { ChevronRight, Cpu } from 'lucide-react';
import { Product } from '../types';

export type CategoryPill = 'all' | 'powersport' | 'allroad' | 'urbandaily' | 'casual' | 'kids';

interface FindYourProductSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onOpenCompare: () => void;
  onViewAllScooters: () => void;
}

export const FindYourProductSection: React.FC<FindYourProductSectionProps> = ({
  products,
  onSelectProduct,
  onOpenCompare,
  onViewAllScooters
}) => {
  const [activePill, setActivePill] = useState<CategoryPill>('powersport');

  // Filter products by selected pill (exactly 5 products on the website)
  const displayedProducts = products.filter((p) => {
    if (activePill === 'all') return true;
    if (activePill === 'powersport') return p.id === 'segway-gt3-pro';
    if (activePill === 'allroad') return p.id === 'ninebot-max-g2';
    if (activePill === 'urbandaily') return p.id === 'segway-f2-pro';
    if (activePill === 'casual') return p.id === 'ninebot-e2-pro';
    if (activePill === 'kids') return p.id === 'ninebot-c2-pro';
    return true;
  });

  return (
    <section id="find-your-product" className="relative w-full bg-black text-white pt-10 pb-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        {/* Top Header Row: "Find Your Product" & "View All eKickScooters >" */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6">
          <div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-sans">
              Find Your Product
            </h2>
            <p className="mt-1.5 text-xs text-neutral-400">
              5 Dòng xe điện Segway-Ninebot tinh hoa đại diện cho từng phong cách di chuyển
            </p>
          </div>

          <button
            onClick={() => setActivePill('all')}
            className="flex items-center gap-1.5 text-base font-semibold text-[#eb2227] hover:text-red-400 transition-colors self-start sm:self-auto group"
          >
            <span>View All 5 eKickScooters</span>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Category Pill Navigation Bar (Identical to user's screenshot with 5 core categories + All) */}
        <div className="mt-2 mb-12 flex items-center justify-between flex-wrap gap-4">
          <div className="inline-flex items-center rounded-full bg-[#1c1c1e] p-1.5 border border-neutral-800/80 overflow-x-auto max-w-full">
            <button
              onClick={() => setActivePill('all')}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all whitespace-nowrap ${
                activePill === 'all'
                  ? 'bg-[#eb2227] text-white shadow-md'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              All 5 Models
            </button>

            <button
              onClick={() => setActivePill('powersport')}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all whitespace-nowrap ${
                activePill === 'powersport'
                  ? 'bg-[#eb2227] text-white shadow-md'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              Power Sport
            </button>

            <button
              onClick={() => setActivePill('allroad')}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all whitespace-nowrap ${
                activePill === 'allroad'
                  ? 'bg-[#eb2227] text-white shadow-md'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              All-Road
            </button>

            <button
              onClick={() => setActivePill('urbandaily')}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all whitespace-nowrap ${
                activePill === 'urbandaily'
                  ? 'bg-[#eb2227] text-white shadow-md'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              Urban Daily
            </button>

            <button
              onClick={() => setActivePill('casual')}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all whitespace-nowrap ${
                activePill === 'casual'
                  ? 'bg-[#eb2227] text-white shadow-md'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              Casual
            </button>

            <button
              onClick={() => setActivePill('kids')}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all whitespace-nowrap ${
                activePill === 'kids'
                  ? 'bg-[#eb2227] text-white shadow-md'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              Kids
            </button>
          </div>

          <div className="text-xs text-neutral-400">
            Hiển thị <span className="font-mono text-white font-bold">{displayedProducts.length}</span> / 5 sản phẩm chính hãng
          </div>
        </div>

        {/* Product Cards Grid on Pure Black (Matches the screenshot layout) */}
        <div className={`grid gap-8 lg:gap-12 ${
          displayedProducts.length === 1
            ? 'grid-cols-1 max-w-md mx-auto'
            : displayedProducts.length === 2
            ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
        }`}>
          {displayedProducts.map((product) => {
            const isGt3Pro = product.id === 'segway-gt3-pro';

            return (
              <div
                key={product.id}
                className="flex flex-col items-center text-center bg-black group p-2"
              >
                {/* Product Visual Container with top-left micro-icon */}
                <div className="relative w-full aspect-square max-w-[380px] flex items-center justify-center bg-black overflow-hidden mb-4">
                  {/* Micro feature badge (top-left) */}
                  <div className="absolute top-3 left-3 z-10 flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-900/90 border border-neutral-800 text-neutral-400">
                    <Cpu className="h-4 w-4 text-blue-400" />
                  </div>

                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Series / Category Label */}
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#eb2227] mb-1">
                  {product.series}
                </span>

                {/* Product Name */}
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mb-3 line-clamp-1">
                  {product.name}
                </h3>

                {/* View More Pill Button */}
                <button
                  onClick={() => onSelectProduct(product)}
                  className="rounded-full border border-neutral-600 px-6 py-1.5 text-xs font-semibold text-white transition-all hover:border-white hover:bg-white/10 mb-5"
                >
                  View More
                </button>

                {/* Hairline Divider */}
                <div className="w-full max-w-[320px] border-t border-neutral-850/80 mb-5" />

                {/* Vertically Stacked Key Specs (Identical to screenshot layout) */}
                <div className="w-full max-w-[320px] space-y-4 text-center">
                  {/* 1. Max Speed */}
                  <div>
                    <div className="text-sm font-bold text-white tracking-wide">
                      {isGt3Pro
                        ? 'Approx. 80 km/h (49.7 mph)'
                        : `Approx. ${product.specs.topSpeed} km/h (${Math.round(product.specs.topSpeed * 0.621)} mph)`}
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5">
                      Max. Speed
                    </div>
                  </div>

                  {/* 2. Max Power */}
                  <div>
                    <div className="text-sm font-bold text-white tracking-wide">
                      {isGt3Pro
                        ? '3500 W*2'
                        : `${product.specs.motorPower} W`}
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5">
                      Max. power
                    </div>
                  </div>

                  {/* 3. Range */}
                  <div>
                    <div className="text-sm font-bold text-white tracking-wide">
                      {isGt3Pro
                        ? 'Approx. 138 km (85.7 miles) at 25 km/h'
                        : `Approx. ${product.specs.range} km (${Math.round(product.specs.range * 0.621)} miles)`}
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5">
                      Range
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating "Compare More Specs" Pill Button at Bottom Center (Exact match to screenshot) */}
        <div className="mt-14 flex justify-center">
          <button
            onClick={onOpenCompare}
            className="flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/90 hover:bg-neutral-800 px-8 py-3 text-xs font-semibold text-white shadow-xl backdrop-blur-md transition-all hover:scale-105"
          >
            <span>Compare More Specs (5 Models)</span>
          </button>
        </div>
      </div>
    </section>
  );
};
