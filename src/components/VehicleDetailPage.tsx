import React, { useState } from 'react';
import { ArrowLeft, Check, ShoppingCart, Calendar, Play } from 'lucide-react';
import { Product, VehicleColor } from '../types';
import { formatVND } from '../utils/format';

interface VehicleDetailPageProps {
  product: Product;
  allProducts: Product[];
  onBackToLobby: () => void;
  onSelectOtherProduct: (product: Product) => void;
  onAddToCart: (product: Product, selectedColor: VehicleColor, quantity: number) => void;
  onBookTestRide: (vehicleId: string) => void;
}

export const VehicleDetailPage: React.FC<VehicleDetailPageProps> = ({
  product,
  allProducts,
  onBackToLobby,
  onSelectOtherProduct,
  onAddToCart,
  onBookTestRide
}) => {
  const [selectedColor, setSelectedColor] = useState<VehicleColor>(
    product.colors[0] || { name: 'Tiêu chuẩn', code: 'standard', hex: '#18181b' }
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selectedBattery, setSelectedBattery] = useState<string>(product.batteryOptions?.[0]?.id || '');
  const batteryAdjustment = product.batteryOptions?.find(b => b.id === selectedBattery)?.priceAdjustment || 0;
  const totalPrice = (product.price * quantity) + batteryAdjustment;

  // Sync active image when switching products
  React.useEffect(() => {
    setActiveImage(product.image);
    setSelectedBattery(product.batteryOptions?.[0]?.id || '');
  }, [product]);

  return (
    <div className="w-full bg-black text-white min-h-screen pb-28 sm:pb-20">
      {/* Top Breadcrumb & Switcher Strip (Mobile optimized) */}
      {allProducts.length > 1 && (
        <div className="border-b border-neutral-900 bg-neutral-950/90 backdrop-blur sticky top-14 sm:top-16 z-30">
          <div className="mx-auto max-w-[1440px] px-3 sm:px-8 lg:px-12 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
            {/* Back Button */}
            <button
              onClick={onBackToLobby}
              className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-neutral-300 hover:text-white transition-colors group active:scale-95 touch-manipulation py-1"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 text-[#00a3ff]" />
              <span>Sảnh 5 Dòng Xe</span>
            </button>

            {/* Quick Switcher across all 5 models */}
            <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto text-xs py-1 scrollbar-none max-w-full">
              {allProducts.map((p) => {
                const isCurrent = p.id === product.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => onSelectOtherProduct(p)}
                    className={`rounded-full px-2.5 sm:px-3 py-1 font-medium transition-all whitespace-nowrap active:scale-95 touch-manipulation text-[11px] sm:text-xs ${
                      isCurrent
                        ? 'bg-[#00a3ff] text-black font-extrabold shadow-sm shadow-cyan-500/20'
                        : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                    }`}
                  >
                    {p.name.replace('GoFold ', '')}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Vehicle Showcase Body */}
      <div className="mx-auto max-w-[1440px] px-3 sm:px-8 lg:px-12 pt-5 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">
          {/* Left Column: Visual, Colors & Full Spec Sheet */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-[#00a3ff] uppercase tracking-wider mb-1.5 sm:mb-2">
                <span>{product.series}</span>
                <span>·</span>
                <span>BH Pin & ĐC: {product.warrantyMonths}T</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-sans leading-tight">
                {product.name}
              </h1>

              <p className="mt-2 text-xs sm:text-sm lg:text-base text-neutral-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Vehicle Main Showcase Image on Black */}
            <div className="space-y-1">
            {/* Vehicle Main Showcase Image on Black */}
            <div 
              className="w-full rounded-2xl border border-neutral-900 bg-black relative group touch-pan-y aspect-[4/3] sm:aspect-[16/9]"
              onTouchStart={(e) => {
                const touch = e.touches[0];
                (e.currentTarget as any)._startX = touch.clientX;
              }}
              onTouchEnd={(e) => {
                const startX = (e.currentTarget as any)._startX;
                const endX = e.changedTouches[0].clientX;
                const diff = startX - endX;
                
                if (Math.abs(diff) > 50) { // Threshold
                  const currentIndex = product.galleryImages.indexOf(activeImage);
                  if (diff > 0 && currentIndex < product.galleryImages.length - 1) {
                    setActiveImage(product.galleryImages[currentIndex + 1]);
                  } else if (diff < 0 && currentIndex > 0) {
                    setActiveImage(product.galleryImages[currentIndex - 1]);
                  }
                }
              }}
            >
              <img
                src={activeImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain p-2 transition-all duration-300"
              />
            </div>

            {/* Gallery Thumbnail Selector Strip */}
            {product.galleryImages && product.galleryImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scroll-smooth px-1">
                {product.galleryImages.map((imgUrl, idx) => {
                  const isSelected = activeImage === imgUrl;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImage(imgUrl)}
                      className={`relative h-14 w-14 sm:h-20 sm:w-20 rounded-lg border-2 p-0.5 bg-neutral-900 overflow-hidden shrink-0 transition-all active:scale-95 touch-manipulation ${
                        isSelected
                          ? 'border-[#00a3ff]'
                          : 'border-neutral-800 opacity-70 hover:opacity-100 hover:border-neutral-700'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`Góc ${idx + 1}`}
                        className="h-full w-full object-cover pointer-events-none"
                      />
                    </button>
                  );
                })}
              </div>
            )}


            {/* Color Swatches (Hidden for GoFold X3 or products without color choices) */}
            {product.colors && product.colors.length > 0 && (
              <div className="rounded-xl border border-neutral-900 bg-neutral-950 p-3.5 sm:p-4">
                <div className="text-xs font-semibold text-neutral-300 mb-2">
                  Tùy chọn phối màu xe: <span className="text-[#00a3ff] font-bold">{selectedColor.name}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.code}
                      onClick={() => setSelectedColor(color)}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs transition-all active:scale-95 touch-manipulation ${
                        selectedColor.code === color.code
                          ? 'border-[#00a3ff] bg-cyan-950/30 text-white font-semibold'
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <span
                        className="h-3 w-3 rounded-full border border-neutral-700"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Battery Selector */}
            {product.batteryOptions && (
              <div className="rounded-xl border border-neutral-900 bg-neutral-950 p-3.5 sm:p-4">
                <div className="text-xs font-semibold text-neutral-300 mb-2">Chọn Pin:</div>
                <div className="flex flex-col gap-2">
                  {product.batteryOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedBattery(opt.id)}
                      className={`flex items-center justify-between rounded-xl border p-3 text-xs transition-all ${
                        selectedBattery === opt.id
                          ? 'border-[#00a3ff] bg-cyan-950/30 text-white'
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400'
                      }`}
                    >
                      <span>{opt.name}</span>
                      {opt.priceAdjustment > 0 && <span className="font-mono">+{opt.priceAdjustment.toLocaleString()}đ</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Complete Technical Specifications Grid (2 columns on mobile) */}
            <div className="rounded-2xl border border-neutral-900 bg-neutral-950 p-4 sm:p-6 space-y-3 sm:space-y-4">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                <span>Bảng Thông Số Kỹ Thuật Đầy Đủ</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs">
                <div className="rounded-xl border border-neutral-900 bg-black p-3 flex flex-col justify-between">
                  <span className="text-neutral-500 text-[10px] sm:text-xs block mb-1">Vận tốc tối đa</span>
                  <span className="font-mono text-sm sm:text-base font-bold text-white tabular-nums">
                    {product.specs.topSpeed} km/h
                  </span>
                </div>

                <div className="rounded-xl border border-neutral-900 bg-black p-3 flex flex-col justify-between">
                  <span className="text-neutral-500 text-[10px] sm:text-xs block mb-1">Quãng đường chuẩn</span>
                  <span className="font-mono text-sm sm:text-base font-bold text-white tabular-nums">
                    {product.id === 'gofold-x3' ? '25 - 30 km' : `${product.specs.range} km`}
                  </span>
                </div>

                <div className="rounded-xl border border-neutral-900 bg-black p-3 flex flex-col justify-between">
                  <span className="text-neutral-500 text-[10px] sm:text-xs block mb-1">Công suất cực đại</span>
                  <span className="font-mono text-sm sm:text-base font-bold text-[#00a3ff] tabular-nums">
                    {product.specs.motorPower} W
                  </span>
                </div>

                {/* Dung lượng Pin - chỉ hiển thị nếu không có option pin riêng */}
                {!product.batteryOptions && (
                  <div className="rounded-xl border border-neutral-900 bg-black p-3 flex flex-col justify-between">
                    <span className="text-neutral-500 text-[10px] sm:text-xs block mb-1">Dung lượng Pin</span>
                    <span className="font-medium text-neutral-100 text-xs sm:text-sm break-words whitespace-normal leading-snug">
                      {product.specs.batteryCapacity}
                    </span>
                  </div>
                )}

                <div className="rounded-xl border border-neutral-900 bg-black p-3 flex flex-col justify-between">
                  <span className="text-neutral-500 text-[10px] sm:text-xs block mb-1">Thời gian sạc</span>
                  <span className="font-medium text-neutral-200 text-xs sm:text-sm break-words whitespace-normal leading-snug">
                    {product.specs.chargingTime}
                  </span>
                </div>

                <div className="rounded-xl border border-neutral-900 bg-black p-3 flex flex-col justify-between">
                  <span className="text-neutral-500 text-[10px] sm:text-xs block mb-1">Hệ thống phanh</span>
                  <span className="font-medium text-neutral-200 text-xs sm:text-sm break-words whitespace-normal leading-snug">
                    {product.specs.brakeSystem}
                  </span>
                </div>

                <div className="rounded-xl border border-neutral-900 bg-black p-3 flex flex-col justify-between">
                  <span className="text-neutral-500 text-[10px] sm:text-xs block mb-1">Kích cỡ lốp</span>
                  <span className="font-medium text-neutral-200 text-xs sm:text-sm break-words whitespace-normal leading-snug">
                    {product.specs.tireSize}
                  </span>
                </div>

                <div className="rounded-xl border border-neutral-900 bg-black p-3 flex flex-col justify-between">
                  <span className="text-neutral-500 text-[10px] sm:text-xs block mb-1">Chuẩn kháng nước</span>
                  <span className="font-medium text-neutral-200 text-xs sm:text-sm break-words whitespace-normal leading-snug">
                    {product.specs.waterResistance}
                  </span>
                </div>

                <div className="rounded-xl border border-neutral-900 bg-black p-3 flex flex-col justify-between">
                  <span className="text-neutral-500 text-[10px] sm:text-xs block mb-1">Khả năng leo dốc</span>
                  <span className="font-mono text-sm sm:text-base font-bold text-white tabular-nums">
                    {product.specs.climbingAngle}%
                  </span>
                </div>

                <div className="rounded-xl border border-neutral-900 bg-black p-3 flex flex-col justify-between">
                  <span className="text-neutral-500 text-[10px] sm:text-xs block mb-1">Trọng lượng xe</span>
                  <span className="font-mono text-sm sm:text-base font-bold text-white tabular-nums">
                    {product.specs.weight} kg
                  </span>
                </div>

                <div className="rounded-xl border border-neutral-900 bg-black p-3 flex flex-col justify-between">
                  <span className="text-neutral-500 text-[10px] sm:text-xs block mb-1">Tải trọng tối đa</span>
                  <span className="font-mono text-sm sm:text-base font-bold text-white tabular-nums">
                    {product.specs.maxPayload} kg
                  </span>
                </div>
              </div>
            </div>

            {/* Smart Technologies List (Bỏ phần công nghệ độc quyền Gofold chỉ ghi công nghệ độc quyền) */}
            <div className="rounded-2xl border border-neutral-900 bg-neutral-950 p-4 sm:p-6">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-300 mb-2.5 sm:mb-3">
                Công Nghệ Độc Quyền
              </h3>
              <ul className="space-y-2 text-xs text-neutral-300">
                {product.specs.smartFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#00a3ff] shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            </div>
          </div>

          {/* Right Column: Pricing & Order Module (No simulator) */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            {/* Purchase Header Card */}
            <div className="rounded-2xl border border-neutral-900 bg-neutral-950 p-4 sm:p-6 space-y-4 sm:space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] sm:text-xs text-neutral-400">Giá bán chính hãng (VAT):</span>
                  <span className="text-[10px] font-bold text-[#00a3ff] bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-500/30">
                    Chính Hãng
                  </span>
                </div>
                <div className="flex items-baseline gap-2.5 sm:gap-3">
                  <span className="font-mono text-2xl sm:text-4xl font-black text-white tabular-nums">
                    {formatVND(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="font-mono text-xs sm:text-sm text-neutral-500 line-through tabular-nums">
                      {formatVND(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity Stepper (Mobile Touch Friendly) */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-neutral-300 font-medium">Số lượng xe:</span>
                <div className="flex items-center rounded-xl border border-neutral-800 bg-black">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="min-h-[40px] px-4 py-2 text-base text-neutral-300 hover:text-white active:scale-90 touch-manipulation"
                  >
                    -
                  </button>
                  <span className="font-mono px-3 py-1 text-sm font-bold text-white tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="min-h-[40px] px-4 py-2 text-base text-neutral-300 hover:text-white active:scale-90 touch-manipulation"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Primary Actions (No comparison, no installment) */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => onAddToCart(product, selectedColor, quantity)}
                  disabled={!product.inStock}
                  className={`w-full min-h-[48px] flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-black transition-all shadow-lg touch-manipulation ${
                    product.inStock
                      ? 'bg-[#00a3ff] hover:bg-cyan-400 text-black shadow-cyan-500/25'
                      : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>{product.inStock ? `Mua Ngay - ${formatVND(totalPrice)}` : 'Sản phẩm hết hàng'}</span>
                </button>

                <button
                  onClick={() => onBookTestRide(product.id)}
                  className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 active:scale-98 py-2.5 text-xs font-semibold text-white transition-colors touch-manipulation"
                >
                  <Calendar className="h-4 w-4 text-[#00a3ff]" />
                  <span>Đăng Ký Lái Thử Xe Này Tại Showroom</span>
                </button>
              </div>

              <div className="pt-2 text-center text-[11px] text-neutral-400 space-y-1">
                <div>✓ Hàng chính hãng GOFOLD 100% · Nhận xe liền tay</div>
                <div>✓ Miễn phí giao hàng & hướng dẫn gấp gọn tận nhà</div>
                <div>✓ Hotline tư vấn & kỹ thuật: 094.222.3434 (Đến 22:00)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Sticky Bar on Mobile (Thumb Reach for 100% Mobile Optimization) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 border-t border-neutral-800 p-3 backdrop-blur-md flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <span className="text-[9px] text-neutral-400 uppercase tracking-wider block">Giá bán</span>
          <span className="font-mono text-base font-extrabold text-[#00a3ff] tabular-nums">
            {formatVND(totalPrice)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onBookTestRide(product.id)}
            className="rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2.5 text-xs font-semibold text-neutral-200 active:scale-95 touch-manipulation"
          >
            Lái Thử
          </button>
          <button
            onClick={() => onAddToCart(product, selectedColor, 1)}
            disabled={!product.inStock}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-black active:scale-95 touch-manipulation shadow-md ${
              product.inStock
                ? 'bg-[#00a3ff] text-black shadow-cyan-500/20'
                : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>{product.inStock ? `Mua Ngay - ${formatVND(totalPrice)}` : 'Hết hàng'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
