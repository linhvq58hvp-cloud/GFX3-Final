import React, { useState } from 'react';
import { SCOOTER_SERIES_LIST } from '../data/scooterSeries';
import { Product, ScooterSeriesId, Hotspot } from '../types';
import { ArrowRight, Check, Sparkles, Filter, ChevronRight, Eye, ShoppingCart, Scale, Sliders, Shield } from 'lucide-react';
import { formatVND, calculateMonthlyInstallment } from '../utils/format';

interface KickScooterHubProps {
  products: Product[];
  comparedIds: string[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  onOpenTestRide: (vehicleId: string) => void;
}

export const KickScooterHub: React.FC<KickScooterHubProps> = ({
  products,
  comparedIds,
  onSelectProduct,
  onAddToCart,
  onToggleCompare,
  onOpenTestRide
}) => {
  const [selectedSeriesId, setSelectedSeriesId] = useState<ScooterSeriesId>('max');
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  // Smart Finder Filters
  const [filterSpeed, setFilterSpeed] = useState<'all' | 'entry' | 'mid' | 'high'>('all');
  const [filterRange, setFilterRange] = useState<'all' | 'short' | 'medium' | 'long'>('all');
  const [filterWeight, setFilterWeight] = useState<'all' | 'light' | 'standard'>('all');
  const [filterPrice, setFilterPrice] = useState<'all' | 'under15' | '15to30' | 'above30'>('all');

  const currentSeries = SCOOTER_SERIES_LIST.find((s) => s.id === selectedSeriesId) || SCOOTER_SERIES_LIST[0];
  const seriesModels = products.filter((p) => p.scooterSeries === selectedSeriesId);
  const featuredModel = seriesModels[0] || products[0];

  // Smart Finder Filtered Products
  const smartFinderResults = products.filter((p) => {
    if (p.category !== 'superscooter' && p.category !== 'kickscooter') return false;

    // Speed filter
    if (filterSpeed === 'entry' && p.specs.topSpeed > 25) return false;
    if (filterSpeed === 'mid' && (p.specs.topSpeed <= 25 || p.specs.topSpeed > 35)) return false;
    if (filterSpeed === 'high' && p.specs.topSpeed <= 35) return false;

    // Range filter
    if (filterRange === 'short' && p.specs.range > 25) return false;
    if (filterRange === 'medium' && (p.specs.range <= 25 || p.specs.range > 50)) return false;
    if (filterRange === 'long' && p.specs.range <= 50) return false;

    // Weight filter
    if (filterWeight === 'light' && p.specs.weight > 16) return false;
    if (filterWeight === 'standard' && p.specs.weight <= 16) return false;

    // Price filter
    if (filterPrice === 'under15' && p.price >= 15000000) return false;
    if (filterPrice === '15to30' && (p.price < 15000000 || p.price > 30000000)) return false;
    if (filterPrice === 'above30' && p.price <= 30000000) return false;

    return true;
  });

  return (
    <section id="ekickscooter-hub" className="scroll-mt-16 bg-neutral-950 py-16 border-t border-neutral-850">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section modeled after ap-en.segway.com/ekickscooter.html */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
            Segway Official KickScooter Portal
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl" style={{ textWrap: 'balance' }}>
            Hệ Thống Xe KickScooter Segway Toàn Cầu
          </h2>
          <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
            Khám phá các dòng xe trượt điện cao cấp được thiết kế chính xác cho từng nhu cầu: từ siêu phẩm thể thao GT Series, biểu tượng bền bỉ MAX Series đến các dòng đô thị gọn nhẹ F & E Series.
          </p>
        </div>

        {/* 1. Sticky-style Series Navigation Strip */}
        <div className="mt-10 border-b border-neutral-800 pb-2">
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar py-2">
            {SCOOTER_SERIES_LIST.map((series) => {
              const isSelected = selectedSeriesId === series.id;
              return (
                <button
                  key={series.id}
                  onClick={() => {
                    setSelectedSeriesId(series.id);
                    setActiveHotspot(null);
                  }}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20'
                      : 'border border-neutral-800 bg-neutral-900/80 text-neutral-300 hover:border-neutral-700 hover:text-white'
                  }`}
                >
                  <span>{series.name}</span>
                  <span className={`text-[10px] font-normal opacity-80 ${isSelected ? 'text-neutral-950' : 'text-neutral-400'}`}>
                    · {series.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Series Visual Spotlight & Interactive Hotspots */}
        <div className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-900/70 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left: Info & Key Highlights */}
            <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between h-full border-b lg:border-b-0 lg:border-r border-neutral-800">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
                  <span>{currentSeries.badge}</span>
                  <span>·</span>
                  <span>{currentSeries.speedRange}</span>
                </div>

                <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
                  {currentSeries.name}: {currentSeries.bannerHeadline}
                </h3>

                <p className="mt-3 text-xs text-neutral-300 leading-relaxed">
                  {currentSeries.description}
                </p>

                {/* Key Technology Highlights */}
                <div className="mt-6 space-y-2.5">
                  <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                    Điểm Nhấn Công Nghệ
                  </div>
                  {currentSeries.keyHighlights.map((hl, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-200">
                      <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-wrap gap-3">
                {featuredModel && (
                  <>
                    <button
                      onClick={() => onSelectProduct(featuredModel)}
                      className="flex-1 rounded-xl bg-amber-500 px-5 py-3 text-xs font-bold text-neutral-950 hover:bg-amber-400 transition-colors whitespace-nowrap text-center"
                    >
                      Khám Phá Chi Tiết {featuredModel.name}
                    </button>
                    <button
                      onClick={() => onOpenTestRide(featuredModel.id)}
                      className="rounded-xl border border-neutral-700 bg-neutral-800/80 px-4 py-3 text-xs font-semibold text-white hover:bg-neutral-700 transition-colors whitespace-nowrap"
                    >
                      Lái Thử Xe
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Right: Large Series Image with Interactive Hotspots */}
            <div className="lg:col-span-7 relative bg-neutral-950 p-6 flex flex-col items-center justify-center min-h-[380px]">
              <div className="relative w-full aspect-[16/9] max-w-2xl rounded-xl overflow-hidden border border-neutral-800/80 bg-neutral-900">
                <img
                  src={currentSeries.heroImage}
                  alt={currentSeries.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center"
                />

                {/* Hotspots for featured model if available */}
                {featuredModel?.hotspots && featuredModel.hotspots.map((hs) => (
                  <button
                    key={hs.id}
                    onClick={() => setActiveHotspot(hs)}
                    style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                    title={hs.title}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group z-20"
                  >
                    <span className="relative flex h-6 w-6 items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border-2 border-neutral-950 text-[9px] font-bold text-neutral-950 items-center justify-center">
                        +
                      </span>
                    </span>
                  </button>
                ))}

                {/* Active Hotspot Tooltip */}
                {activeHotspot && (
                  <div className="absolute bottom-4 left-4 right-4 z-30 rounded-xl border border-neutral-700 bg-neutral-900/95 p-4 shadow-2xl backdrop-blur-md text-xs">
                    <div className="flex justify-between items-start">
                      <div className="font-bold text-amber-400 text-sm">{activeHotspot.title}</div>
                      <button
                        onClick={() => setActiveHotspot(null)}
                        className="text-neutral-400 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                    <p className="mt-1 text-neutral-300">{activeHotspot.description}</p>
                  </div>
                )}
              </div>

              <div className="mt-3 text-[11px] text-neutral-400 flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>Nhấn vào các điểm (+) trên xe để xem chi tiết tính năng công nghệ</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Series Models Grid: Direct Comparison & Purchase */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-bold text-white">
              Các Mẫu Xe Thuộc Dòng {currentSeries.name} ({seriesModels.length} phiên bản)
            </h4>
            <span className="text-xs text-neutral-400">
              Chính hãng Segway-Ninebot · Bảo hành toàn diện
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {seriesModels.map((product) => {
              const isCompared = comparedIds.includes(product.id);
              const installment12m = calculateMonthlyInstallment(product.price, 12);

              return (
                <div
                  key={product.id}
                  className="rounded-xl border border-neutral-800 bg-neutral-900 p-5 flex flex-col justify-between transition-all hover:border-neutral-700 hover:shadow-xl hover:shadow-amber-500/5"
                >
                  <div>
                    {/* Top image & series */}
                    <div
                      onClick={() => onSelectProduct(product)}
                      className="cursor-pointer aspect-[4/3] rounded-lg overflow-hidden bg-neutral-950 border border-neutral-800/80 mb-4"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                      <span className="font-semibold text-amber-400 uppercase">{product.series}</span>
                      {product.targetRider && (
                        <span className="text-neutral-500 line-clamp-1">{product.targetRider}</span>
                      )}
                    </div>

                    <h5
                      onClick={() => onSelectProduct(product)}
                      className="cursor-pointer text-base font-bold text-white hover:text-amber-400 transition-colors"
                    >
                      {product.name}
                    </h5>

                    {/* Spec HUD strip */}
                    <div className="mt-3 grid grid-cols-3 gap-2 py-2 border-y border-neutral-800/80 text-center text-xs">
                      <div>
                        <div className="text-[10px] text-neutral-400">Tốc độ max</div>
                        <div className="font-mono font-bold text-white tabular-nums">{product.specs.topSpeed} km/h</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-neutral-400">Quãng đường</div>
                        <div className="font-mono font-bold text-white tabular-nums">{product.specs.range} km</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-neutral-400">Công suất</div>
                        <div className="font-mono font-bold text-amber-400 tabular-nums">{product.specs.motorPower}W</div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mt-4 flex items-baseline justify-between">
                      <div>
                        <div className="font-mono text-lg font-bold text-white tabular-nums">
                          {formatVND(product.price)}
                        </div>
                        <div className="text-[10px] text-neutral-400">
                          Trả góp từ <span className="font-mono text-amber-400">{formatVND(installment12m)}</span>/tháng
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 grid grid-cols-12 gap-2 pt-2 border-t border-neutral-800">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="col-span-6 rounded-lg border border-neutral-700 bg-neutral-800/80 py-2 text-xs font-semibold text-neutral-200 hover:bg-neutral-700 hover:text-white flex items-center justify-center gap-1"
                    >
                      <Eye className="h-3.5 w-3.5" /> Xem Chi Tiết
                    </button>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="col-span-4 rounded-lg bg-amber-500 py-2 text-xs font-bold text-neutral-950 hover:bg-amber-400 flex items-center justify-center gap-1"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" /> Mua
                    </button>

                    <button
                      onClick={() => onToggleCompare(product)}
                      title={isCompared ? 'Bỏ so sánh' : 'Thêm vào so sánh'}
                      className={`col-span-2 flex items-center justify-center rounded-lg border transition-colors ${
                        isCompared
                          ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                          : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700 hover:text-white'
                      }`}
                    >
                      <Scale className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. "Smart Scooter Finder" (Bộ lọc tìm xe KickScooter thông minh theo nhu cầu) */}
        <div className="mt-16 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-neutral-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <Sliders className="h-4 w-4" />
                <span>Smart Scooter Finder</span>
              </div>
              <h3 className="text-xl font-extrabold text-white mt-1">
                Tìm Chiếc KickScooter Phù Hợp Nhất Với Bạn
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Lọc theo vận tốc, cự ly hàng ngày, ngân sách để Segway đề xuất chiếc xe lý tưởng nhất.
              </p>
            </div>

            <div className="mt-4 md:mt-0 text-xs text-neutral-400">
              Đang tìm thấy: <strong className="font-mono text-amber-400 tabular-nums">{smartFinderResults.length}</strong> mẫu xe phù hợp
            </div>
          </div>

          {/* Interactive Filter Options */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* Speed Filter */}
            <div>
              <label className="block text-neutral-400 font-medium mb-1.5">Tốc độ mong muốn:</label>
              <select
                value={filterSpeed}
                onChange={(e) => setFilterSpeed(e.target.value as any)}
                className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
              >
                <option value="all">Tất cả tốc độ</option>
                <option value="entry">Tiêu chuẩn (≤ 25 km/h)</option>
                <option value="mid">Nhanh đô thị (25 - 35 km/h)</option>
                <option value="high">Siêu tốc độ (&gt; 35 km/h)</option>
              </select>
            </div>

            {/* Range Filter */}
            <div>
              <label className="block text-neutral-400 font-medium mb-1.5">Quãng đường cần đi/ngày:</label>
              <select
                value={filterRange}
                onChange={(e) => setFilterRange(e.target.value as any)}
                className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
              >
                <option value="all">Tất cả cự ly</option>
                <option value="short">Gần (≤ 25 km)</option>
                <option value="medium">Trung bình (25 - 50 km)</option>
                <option value="long">Đường dài (50 - 90 km)</option>
              </select>
            </div>

            {/* Weight Filter */}
            <div>
              <label className="block text-neutral-400 font-medium mb-1.5">Trọng lượng xe:</label>
              <select
                value={filterWeight}
                onChange={(e) => setFilterWeight(e.target.value as any)}
                className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
              >
                <option value="all">Tất cả trọng lượng</option>
                <option value="light">Gọn nhẹ (≤ 16 kg xách tay)</option>
                <option value="standard">Tiêu chuẩn thể thao (&gt; 16 kg)</option>
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-neutral-400 font-medium mb-1.5">Mức ngân sách:</label>
              <select
                value={filterPrice}
                onChange={(e) => setFilterPrice(e.target.value as any)}
                className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
              >
                <option value="all">Tất cả mức giá</option>
                <option value="under15">Dưới 15 triệu VNĐ</option>
                <option value="15to30">15 - 30 triệu VNĐ</option>
                <option value="above30">Trên 30 triệu VNĐ</option>
              </select>
            </div>
          </div>

          {/* Quick results preview */}
          <div className="mt-6 pt-6 border-t border-neutral-800/80">
            {smartFinderResults.length === 0 ? (
              <div className="text-center py-6 text-xs text-neutral-400">
                Không tìm thấy mẫu xe nào khớp với toàn bộ bộ lọc. Bạn vui lòng nới lỏng tiêu chí tìm kiếm.
              </div>
            ) : (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {smartFinderResults.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectProduct(item)}
                    className="flex-shrink-0 w-64 rounded-xl border border-neutral-800 bg-neutral-950 p-3 hover:border-amber-500 cursor-pointer transition-colors"
                  >
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-neutral-900 mb-2">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="text-[10px] text-amber-400 font-semibold uppercase">{item.series}</div>
                    <div className="text-xs font-bold text-white line-clamp-1">{item.name}</div>
                    <div className="mt-1 flex justify-between items-baseline text-[11px]">
                      <span className="font-mono text-white font-bold">{formatVND(item.price)}</span>
                      <span className="text-neutral-400">{item.specs.topSpeed} km/h · {item.specs.range} km</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
