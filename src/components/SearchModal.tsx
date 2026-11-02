import React, { useState } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { formatVND } from '../utils/format';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.series.toLowerCase().includes(query.toLowerCase()) ||
          p.tagline.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-neutral-950/85 backdrop-blur-md">
      <div className="w-full max-w-2xl rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden">
        {/* Search Bar */}
        <div className="flex items-center gap-3 border-b border-neutral-800 px-4 py-3.5">
          <Search className="h-5 w-5 text-[#00a3ff]" />
          <input
            type="text"
            autoFocus
            placeholder="Tìm theo tên xe GOFOLD (GoFold X3, MAX G2, F2 Pro, E2 Pro, C2 Pro)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="rounded-full p-1 text-neutral-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-xs text-neutral-400">
              <p className="font-semibold text-neutral-300 mb-2">4 dòng xe GOFOLD đề xuất:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['GoFold X3', 'GoFold MAX G2', 'GoFold F2 Pro', 'GoFold E2 Pro', 'GoFold C2 Pro'].map((kw) => (
                  <button
                    key={kw}
                    onClick={() => setQuery(kw)}
                    className="rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs text-neutral-300 hover:border-cyan-400 hover:text-white"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-400">
              Không tìm thấy dòng xe GOFOLD nào khớp với từ khóa "{query}".
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onClose();
                    onSelectProduct(product);
                  }}
                  className="flex items-center justify-between rounded-xl border border-neutral-800/80 bg-neutral-950/60 p-3 hover:border-cyan-500/40 hover:bg-neutral-800/60 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-12 w-12 rounded-lg object-contain bg-black border border-neutral-800"
                    />
                    <div>
                      <div className="text-[11px] text-[#00a3ff] font-semibold uppercase">{product.series}</div>
                      <div className="text-xs font-bold text-white">{product.name}</div>
                      <div className="text-[11px] text-neutral-400">
                        {product.specs.topSpeed > 0 && `${product.specs.topSpeed} km/h · `}
                        {product.specs.range > 0 && `${product.specs.range} km · `}
                        {formatVND(product.price)}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-neutral-500" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
