import React, { useState } from 'react';
import { X, Check, ShoppingCart, ShieldCheck, Zap, Gauge, BatteryCharging, ChevronRight, Award, Compass } from 'lucide-react';
import { Product, VehicleColor } from '../types';
import { formatVND, calculateMonthlyInstallment, simulateVehiclePerformance, SimulationParams } from '../utils/format';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedColor: VehicleColor, quantity: number) => void;
  onBookTestRide: (vehicleId: string) => void;
  onToggleCompare: (product: Product) => void;
  isCompared: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBookTestRide,
  onToggleCompare,
  isCompared
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<VehicleColor>(
    product.colors[0] || { name: 'Mặc định', code: 'default', hex: '#18181b' }
  );
  const [quantity, setQuantity] = useState(1);
  const [installmentMonths, setInstallmentMonths] = useState<6 | 12 | 24>(12);

  // Range Simulator State
  const [simParams, setSimParams] = useState<SimulationParams>({
    riderWeightKg: 70,
    mode: 'drive',
    temperatureC: 25,
    terrain: 'flat'
  });

  const simResult = simulateVehiclePerformance(
    product.specs.range,
    product.specs.topSpeed,
    simParams
  );

  const installmentAmount = calculateMonthlyInstallment(product.price, installmentMonths);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-neutral-950/80 backdrop-blur-md">
      <div className="relative my-8 w-full max-w-5xl rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl text-neutral-100 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Đóng cửa sổ"
          className="absolute right-4 top-4 z-20 rounded-full bg-neutral-800/80 p-2 text-neutral-400 hover:bg-neutral-700 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Visual & Specs */}
          <div className="lg:col-span-6 border-b lg:border-b-0 lg:border-r border-neutral-800 p-6 flex flex-col justify-between bg-neutral-950/50">
            <div>
              {/* Product Category & Brand */}
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                <span className="font-semibold uppercase tracking-wider text-amber-400">{product.series}</span>
                <span>Bảo hành {product.warrantyMonths} tháng</span>
              </div>

              <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                {product.name}
              </h2>
              <p className="mt-1 text-xs text-neutral-300">
                {product.tagline}
              </p>

              {/* Main Image Showcase */}
              <div className="mt-4 aspect-[4/3] w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center"
                />
              </div>

              {/* Technical Specifications Grid */}
              <div className="mt-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                  Thông Số Kỹ Thuật Chi Tiết
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-lg border border-neutral-800 bg-neutral-900/60 p-3">
                    <span className="text-neutral-400 block mb-1">Vận tốc tối đa:</span>
                    <span className="font-mono text-sm font-bold text-white tabular-nums">
                      {product.specs.topSpeed > 0 ? `${product.specs.topSpeed} km/h` : 'N/A'}
                    </span>
                  </div>
                  <div className="rounded-lg border border-neutral-800 bg-neutral-900/60 p-3">
                    <span className="text-neutral-400 block mb-1">Quãng đường chuẩn:</span>
                    <span className="font-mono text-sm font-bold text-white tabular-nums">
                      {product.specs.range > 0 ? `${product.specs.range} km` : 'N/A'}
                    </span>
                  </div>
                  <div className="rounded-lg border border-neutral-800 bg-neutral-900/60 p-3">
                    <span className="text-neutral-400 block mb-1">Dung lượng Pin:</span>
                    <span className="font-medium text-white break-words">
                      {product.specs.batteryCapacity}
                    </span>
                  </div>
                  <div className="rounded-lg border border-neutral-800 bg-neutral-900/60 p-3">
                    <span className="text-neutral-400 block mb-1">Hệ thống phanh:</span>
                    <span className="font-medium text-white break-words">
                      {product.specs.brakeSystem}
                    </span>
                  </div>
                  <div className="rounded-lg border border-neutral-800 bg-neutral-900/60 p-3">
                    <span className="text-neutral-400 block mb-1">Chuẩn kháng nước:</span>
                    <span className="font-medium text-white">
                      {product.specs.waterResistance}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Smart Feature Bullets */}
            <div className="mt-6 pt-4 border-t border-neutral-800">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                Công Nghệ Độc Quyền Segway
              </h4>
              <ul className="space-y-1.5 text-xs text-neutral-300">
                {product.specs.smartFeatures.slice(0, 3).map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module & Simulator */}
          <div className="lg:col-span-6 p-6 flex flex-col justify-between">
            <div>
              {/* Pricing Header */}
              <div className="pb-4 border-b border-neutral-800">
                <div className="text-xs text-neutral-400">Giá niêm yết chính hãng (VAT):</div>
                <div className="mt-1 flex items-baseline gap-3">
                  <span className="font-mono text-3xl font-extrabold text-amber-400 tabular-nums">
                    {formatVND(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="font-mono text-sm text-neutral-500 line-through tabular-nums">
                      {formatVND(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* 0% Installment summary */}
                <div className="mt-2 flex items-center justify-between rounded-lg bg-neutral-950 p-2.5 text-xs border border-neutral-800">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-400" />
                    <span>Trả góp 0% lãi suất:</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-white tabular-nums">
                      {formatVND(installmentAmount)}
                    </span>
                    <span className="text-neutral-400">/tháng</span>
                    <span className="text-neutral-500">({installmentMonths}T)</span>
                  </div>
                </div>

                <div className="mt-2 flex gap-2">
                  {([6, 12, 24] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setInstallmentMonths(m)}
                      className={`flex-1 rounded py-1 text-[11px] font-medium border transition-colors ${
                        installmentMonths === m
                          ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                      }`}
                    >
                      Kỳ hạn {m} tháng
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="py-4 border-b border-neutral-800">
                  <div className="text-xs font-semibold text-neutral-300 mb-2">
                    Màu sắc phiên bản: <span className="text-amber-400">{selectedColor.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.code}
                        onClick={() => setSelectedColor(color)}
                        className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs transition-all ${
                          selectedColor.code === color.code
                            ? 'border-amber-500 bg-amber-500/10 text-white font-medium'
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

              {/* Interactive Performance & Range Simulator (Only for vehicles with motor/range) */}
              {product.specs.range > 0 && (
                <div className="py-4 border-b border-neutral-800">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-200">
                      <Compass className="h-4 w-4 text-amber-400" />
                      <span>Mô Phỏng Quãng Đường Thực Tế</span>
                    </div>
                    <span className="text-[11px] text-neutral-400">Segway Smart Algorithm</span>
                  </div>

                  {/* Simulator Controls */}
                  <div className="space-y-3 rounded-xl border border-neutral-800 bg-neutral-950/80 p-3">
                    {/* Weight slider */}
                    <div>
                      <div className="flex justify-between text-[11px] text-neutral-400 mb-1">
                        <span>Trọng lượng người lái:</span>
                        <span className="font-mono text-white tabular-nums font-bold">{simParams.riderWeightKg} kg</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="110"
                        step="5"
                        value={simParams.riderWeightKg}
                        onChange={(e) =>
                          setSimParams({ ...simParams, riderWeightKg: Number(e.target.value) })
                        }
                        className="w-full accent-amber-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Mode buttons */}
                    <div>
                      <div className="text-[11px] text-neutral-400 mb-1.5">Chế độ vận hành:</div>
                      <div className="grid grid-cols-4 gap-1 text-[11px]">
                        {(['eco', 'drive', 'sport', 'race'] as const).map((mode) => (
                          <button
                            key={mode}
                            onClick={() => setSimParams({ ...simParams, mode })}
                            className={`rounded py-1 font-medium capitalize transition-colors ${
                              simParams.mode === mode
                                ? 'bg-amber-500 text-neutral-950 font-bold'
                                : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                            }`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Terrain button */}
                    <div>
                      <div className="text-[11px] text-neutral-400 mb-1.5">Địa hình di chuyển:</div>
                      <div className="grid grid-cols-3 gap-1 text-[11px]">
                        {[
                          { id: 'flat', label: 'Bằng phẳng' },
                          { id: 'slight_hill', label: 'Dốc vừa (10%)' },
                          { id: 'steep', label: 'Dốc cao (20%)' }
                        ].map((t) => (
                          <button
                            key={t.id}
                            onClick={() => setSimParams({ ...simParams, terrain: t.id as any })}
                            className={`rounded py-1 transition-colors ${
                              simParams.terrain === t.id
                                ? 'bg-neutral-200 text-neutral-950 font-semibold'
                                : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Simulation Live Output HUD */}
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-800 text-center">
                      <div>
                        <div className="text-[10px] text-neutral-400">Quãng đường dự tính</div>
                        <div className="font-mono text-base font-bold text-amber-400 tabular-nums">
                          ~{simResult.estimatedRange} km
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-neutral-400">Tốc độ max đạt được</div>
                        <div className="font-mono text-base font-bold text-white tabular-nums">
                          ~{simResult.estimatedTopSpeed} km/h
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-neutral-400">Hiệu suất pin</div>
                        <div className="font-mono text-base font-bold text-emerald-400 tabular-nums">
                          {simResult.batteryEfficiency}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="pt-4 flex items-center gap-4">
                <span className="text-xs text-neutral-300">Số lượng:</span>
                <div className="flex items-center rounded-lg border border-neutral-800 bg-neutral-950">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-sm text-neutral-300 hover:text-white"
                  >
                    -
                  </button>
                  <span className="font-mono px-3 py-1 text-xs font-bold text-white tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-sm text-neutral-300 hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Primary Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-neutral-800 space-y-2.5">
              <button
                onClick={() => {
                  onAddToCart(product, selectedColor, quantity);
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-3.5 text-sm font-bold text-neutral-950 transition-colors hover:bg-amber-400"
              >
                <ShoppingCart className="h-4 w-4" />
                Thêm Vào Giỏ Hàng - {formatVND(product.price * quantity)}
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onBookTestRide(product.id);
                  }}
                  className="rounded-xl border border-neutral-700 bg-neutral-800/80 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-neutral-700"
                >
                  Đăng Ký Lái Thử Xe
                </button>

                <button
                  onClick={() => onToggleCompare(product)}
                  className={`rounded-xl border py-2.5 text-xs font-semibold transition-colors ${
                    isCompared
                      ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                      : 'border-neutral-800 bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  {isCompared ? '✓ Đang trong mục so sánh' : '+ Thêm vào so sánh'}
                </button>
              </div>

              <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-neutral-400">
                <span>✓ Miễn phí giao hàng toàn quốc</span>
                <span>✓ Kiểm tra hàng trước khi thanh toán</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
