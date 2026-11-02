import React from 'react';
import { ShoppingCart, Eye, Scale, Check, Shield } from 'lucide-react';
import { Product } from '../types';
import { formatVND, calculateMonthlyInstallment } from '../utils/format';

interface ProductCardProps {
  product: Product;
  isCompared: boolean;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isCompared,
  onSelect,
  onAddToCart,
  onToggleCompare
}) => {
  const installment12m = calculateMonthlyInstallment(product.price, 12);

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/90 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-700 hover:shadow-xl hover:shadow-amber-500/5">
      {/* Top Image Container */}
      <div
        onClick={() => onSelect(product)}
        className="relative aspect-[9/16] w-full cursor-pointer overflow-hidden bg-neutral-950"
      >
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
            if (target.parentElement) {
              target.parentElement.innerHTML = `
                <div class="h-full w-full flex flex-col items-center justify-center bg-neutral-900 p-6 text-center text-neutral-400">
                  <span class="text-xs uppercase tracking-wider text-amber-500 font-semibold mb-1">${product.series}</span>
                  <div class="font-bold text-white text-base">${product.name}</div>
                </div>
              `;
            }
          }}
        />

        {/* Quiet Top Meta */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs">
          <span className="text-amber-400 font-semibold tracking-wide uppercase">
            {product.series}
          </span>
          {product.warrantyMonths && (
            <span className="text-neutral-400 font-medium">
              BH {product.warrantyMonths}T
            </span>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-5">
        {/* Unboxed Metadata Strip */}
        {product.specs.topSpeed > 0 ? (
          <div className="mb-2 flex items-center gap-2 text-xs text-neutral-400">
            <span>Tối đa {product.specs.topSpeed} km/h</span>
            <span aria-hidden="true">·</span>
            <span>Pin {product.specs.range} km</span>
            <span aria-hidden="true">·</span>
            <span>{product.specs.motorPower}W</span>
          </div>
        ) : (
          <div className="mb-2 text-xs text-neutral-400">
            Phụ kiện chính hãng Segway
          </div>
        )}

        {/* Title */}
        <h3
          onClick={() => onSelect(product)}
          className="cursor-pointer text-base font-bold text-white transition-colors group-hover:text-amber-400 line-clamp-1"
        >
          {product.name}
        </h3>

        {/* Short Tagline */}
        <p className="mt-1 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
          {product.tagline}
        </p>

        {/* Available Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="mt-3 flex items-center gap-1.5">
            <span className="text-[11px] text-neutral-500 mr-1">Màu:</span>
            {product.colors.map((c) => (
              <span
                key={c.code}
                title={c.name}
                className="h-3 w-3 rounded-full border border-neutral-700"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        )}

        {/* Price & Installment */}
        <div className="mt-4 pt-3 border-t border-neutral-800">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-lg font-bold text-white tabular-nums">
              {formatVND(product.price)}
            </span>
            {product.originalPrice && (
              <span className="font-mono text-xs text-neutral-500 line-through tabular-nums">
                {formatVND(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="mt-0.5 text-[11px] text-neutral-400">
            Trả góp từ <span className="font-mono text-amber-400 tabular-nums">{formatVND(installment12m)}</span>/tháng
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-4 grid grid-cols-12 gap-2 pt-2">
          <button
            onClick={() => onSelect(product)}
            className="col-span-6 flex items-center justify-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800/80 px-2.5 py-2 text-xs font-medium text-neutral-200 transition-colors hover:bg-neutral-700 hover:text-white whitespace-nowrap"
          >
            <Eye className="h-3.5 w-3.5" />
            Chi tiết
          </button>

          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className={`col-span-4 flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-white transition-colors whitespace-nowrap ${
              product.inStock 
                ? 'bg-[#eb2227] hover:bg-red-700' 
                : 'bg-neutral-800 cursor-not-allowed opacity-50'
            }`}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            {product.inStock ? 'Mua' : 'Hết hàng'}
          </button>

          <button
            onClick={() => onToggleCompare(product)}
            title={isCompared ? 'Bỏ so sánh' : 'Thêm vào so sánh'}
            className={`col-span-2 flex items-center justify-center rounded-lg border transition-colors ${
              isCompared
                ? 'border-[#eb2227] bg-red-950/40 text-[#eb2227]'
                : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700 hover:text-white'
            }`}
          >
            {isCompared ? <Check className="h-3.5 w-3.5" /> : <Scale className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
    </article>
  );
};
