import React, { useState, useMemo } from 'react';
import { Product, CategoryId } from '../types';
import { ProductCard } from './ProductCard';
import { ArrowUpDown, SlidersHorizontal } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  comparedIds: string[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
}

const CATEGORIES: { id: string; label: string }[] = [
  { id: 'all', label: 'Tất Cả (5 Sản Phẩm)' },
  { id: 'gt', label: 'Power Sport (GT3 Pro)' },
  { id: 'max', label: 'All-Road (MAX G2)' },
  { id: 'f', label: 'Urban Daily (F2 Pro)' },
  { id: 'e', label: 'Casual (E2 Pro)' },
  { id: 'c-zing', label: 'Kids (C2 Pro)' },
];

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  comparedIds,
  onSelectProduct,
  onAddToCart,
  onToggleCompare
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'speed-desc'>('featured');

  const filteredProducts = useMemo(() => {
    let result = products;

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.scooterSeries === activeCategory);
    }

    const sorted = [...result];
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'speed-desc':
        sorted.sort((a, b) => b.specs.topSpeed - a.specs.topSpeed);
        break;
      default:
        sorted.sort((a, b) => (b.isFlagship ? 1 : 0) - (a.isFlagship ? 1 : 0));
        break;
    }

    return sorted;
  }, [products, activeCategory, sortBy]);

  return (
    <section id="lineup" className="scroll-mt-20 bg-neutral-950 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between pb-8 border-b border-neutral-800">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#eb2227]">
              Bộ Sưu Tập 5 Dòng Xe Điện Segway Chính Hãng
            </div>
            <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Hệ Thống 5 Dòng Xe KickScooter Tiêu Biểu
            </h2>
            <p className="mt-2 text-sm text-neutral-400 max-w-xl">
              5 mẫu xe điện cao cấp nhất đại diện cho 5 phong cách: Power Sport, All-Road, Urban Daily, Casual và Kids.
            </p>
          </div>

          {/* Sort Selector */}
          <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs">
            <span className="text-neutral-400">Sắp xếp:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1.5 pr-8 text-neutral-200 focus:border-[#eb2227] focus:outline-none"
              >
                <option value="featured">Nổi bật nhất</option>
                <option value="speed-desc">Tốc độ cao nhất</option>
                <option value="price-asc">Giá: Thấp đến cao</option>
                <option value="price-desc">Giá: Cao đến thấp</option>
              </select>
              <ArrowUpDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
            </div>
          </div>
        </div>

        {/* Interactive Category Filter Tabs */}
        <div className="mt-6 flex flex-wrap items-center gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-5 py-2 text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#eb2227] text-white shadow-md'
                    : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white border border-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Products Grid: 3-column desktop baseline */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isCompared={comparedIds.includes(product.id)}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="my-16 rounded-xl border border-neutral-800 bg-neutral-900/50 p-12 text-center">
            <p className="text-neutral-400 text-sm">Chưa có sản phẩm nào trong danh mục này.</p>
            <button
              onClick={() => setActiveCategory('all')}
              className="mt-4 rounded-lg bg-neutral-800 px-4 py-2 text-xs text-white hover:bg-neutral-700"
            >
              Xem tất cả sản phẩm
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
