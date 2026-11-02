import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { CartItem } from '../types';
import { formatVND } from '../utils/format';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, colorCode: string, quantity: number) => void;
  onRemoveItem: (productId: string, colorCode: string) => void;
  onProceedToCheckout: (appliedDiscount: number, promoCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Promo code calculation
  let discount = 0;
  if (appliedPromo === 'GOFOLD2026' || appliedPromo === 'SEGWAY2026') {
    discount = Math.min(2000000, subtotal * 0.1);
  }

  const finalTotal = Math.max(0, subtotal - discount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoInput.trim().toUpperCase();
    if (cleanCode === 'GOFOLD2026' || cleanCode === 'SEGWAY2026') {
      setAppliedPromo('GOFOLD2026');
      setPromoError('');
    } else {
      setPromoError('Mã ưu đãi không hợp lệ. Hãy thử: GOFOLD2026');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-neutral-950/70 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md border-l border-neutral-800 bg-neutral-900 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-800 p-5">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-[#00a3ff]" />
              <h2 className="text-base font-bold text-white">
                Giỏ Hàng Của Bạn ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-20 text-center">
                <ShoppingBag className="mx-auto h-12 w-12 text-neutral-600 mb-3" />
                <p className="text-sm text-neutral-300 font-medium">Giỏ hàng của bạn đang trống</p>
                <p className="text-xs text-neutral-500 mt-1">
                  Khám phá các mẫu xe điện gấp thông minh của GOFOLD và thêm vào giỏ.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 rounded-lg bg-[#00a3ff] px-5 py-2 text-xs font-bold text-neutral-950 hover:bg-cyan-400"
                >
                  Xem dòng xe ngay
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor.code}`}
                  className="flex gap-3.5 rounded-xl border border-neutral-800 bg-neutral-950/60 p-3.5"
                >
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-white line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.selectedColor?.code || 'standard')}
                          className="text-neutral-500 hover:text-rose-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {item.selectedColor && (
                        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-neutral-400">
                          <span
                            className="h-2.5 w-2.5 rounded-full border border-neutral-700 inline-block"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span>{item.selectedColor.name}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#00a3ff] tabular-nums">
                        {formatVND(item.product.price)}
                      </span>

                      {/* Quantity Stepper */}
                      <div className="flex items-center rounded-md border border-neutral-800 bg-neutral-900">
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              item.selectedColor?.code || 'standard',
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="px-2 py-0.5 text-xs text-neutral-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 font-mono text-xs font-bold text-white tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              item.selectedColor?.code || 'standard',
                              item.quantity + 1
                            )
                          }
                          className="px-2 py-0.5 text-xs text-neutral-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Module */}
          {items.length > 0 && (
            <div className="border-t border-neutral-800 bg-neutral-950 p-5 space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
                    <input
                      type="text"
                      placeholder="Mã voucher ưu đãi"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-900 py-1.5 pl-8 pr-2 text-xs text-white uppercase placeholder-neutral-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-lg bg-neutral-800 px-3 py-1.5 text-xs font-medium text-neutral-200 hover:bg-neutral-700"
                  >
                    Áp dụng
                  </button>
                </div>
                {promoError && (
                  <p className="text-[11px] text-rose-400">{promoError}</p>
                )}
                {appliedPromo && (
                  <p className="text-[11px] text-emerald-400">
                    ✓ Đã áp dụng mã {appliedPromo}: Giảm {formatVND(discount)}
                  </p>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Tạm tính:</span>
                  <span className="font-mono text-white tabular-nums">{formatVND(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Ưu đãi voucher:</span>
                    <span className="font-mono tabular-nums">-{formatVND(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-400">
                  <span>Vận chuyển toàn quốc:</span>
                  <span className="text-emerald-400 font-medium">Miễn Phí 100%</span>
                </div>
                <div className="pt-2 border-t border-neutral-800 flex justify-between text-sm font-bold text-white">
                  <span>Tổng thanh toán:</span>
                  <span className="font-mono text-lg text-[#00a3ff] tabular-nums">
                    {formatVND(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout(discount, appliedPromo || '');
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#00a3ff] py-3.5 text-xs font-extrabold text-black hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
              >
                Tiến Hành Đặt Hàng & Thanh Toán
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500">
                <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
                <span>Bảo mật đơn hàng theo chuẩn GOFOLD Vietnam Official</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
