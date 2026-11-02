import React, { useState, useEffect } from 'react';
import { X, CheckCircle, ShoppingBag, Phone, User, MapPin, FileText, Zap, Check, AlertCircle, Sparkles } from 'lucide-react';
import { CartItem, Product } from '../types';
import { formatVND } from '../utils/format';
import { sendOrderToTelegram, OrderPayload } from '../services/telegramService';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  directProduct?: Product | null;
  directQuantity?: number;
  allProducts: Product[];
  discount?: number;
  promoCode?: string;
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  directProduct,
  directQuantity = 1,
  allProducts,
  onOrderSuccess
}) => {
  if (!isOpen) return null;

  // Selected vehicle for direct purchase
  const [selectedProductId, setSelectedProductId] = useState<string>(() => {
    if (directProduct) return directProduct.id;
    if (items.length > 0) return items[0].product.id;
    return allProducts[0]?.id || '';
  });

  const [quantity, setQuantity] = useState<number>(() => {
    if (directProduct) return directQuantity;
    if (items.length > 0) return items.reduce((sum, it) => sum + it.quantity, 0);
    return 1;
  });

  // When directProduct changes upon opening
  useEffect(() => {
    if (directProduct) {
      setSelectedProductId(directProduct.id);
      setQuantity(directQuantity || 1);
    } else if (items.length > 0) {
      setSelectedProductId(items[0].product.id);
      setQuantity(items.reduce((sum, it) => sum + it.quantity, 0));
    }
  }, [directProduct, directQuantity, items]);

  const activeProduct = allProducts.find((p) => p.id === selectedProductId) || directProduct || items[0]?.product;

  // Form states with standard browser autocomplete
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  const unitPrice = activeProduct?.price || 4199999;
  const total = unitPrice * quantity;

  // Validate Vietnamese phone number: 10 digits starting with 0, or 11 with 84
  const validatePhone = (val: string): boolean => {
    const pure = val.replace(/\D/g, '');
    if (!pure) return false;
    return (pure.length === 10 && pure.startsWith('0')) ||
           (pure.length === 11 && pure.startsWith('84'));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const cleaned = raw.replace(/[^\d\s.-]/g, '');
    setPhone(cleaned);

    const pure = cleaned.replace(/\D/g, '');
    if (pure.length > 0) {
      if (!validatePhone(cleaned)) {
        if (pure.length < 10) {
          setPhoneError(`Đã nhập ${pure.length}/10 số (thiếu ${10 - pure.length} số)`);
        } else if (pure.length > 10 && !pure.startsWith('84')) {
          setPhoneError(`Số điện thoại quá dài (${pure.length} số, chuẩn là 10 số)`);
        } else if (!pure.startsWith('0') && !pure.startsWith('84')) {
          setPhoneError('Số điện thoại hợp lệ tại VN phải bắt đầu bằng số 0');
        } else {
          setPhoneError('Số điện thoại chưa đúng định dạng 10 số');
        }
      } else {
        setPhoneError(null);
      }
    } else {
      setPhoneError(null);
    }
  };

  // Quick fill sample data button
  const handleQuickFill = () => {
    setFullName('Vũ Quang Linh');
    setPhone('0942223434');
    setAddress('27A Trần Hưng Đạo, Hoàn Kiếm, Hà Nội');
    setPhoneError(null);
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    if (!validatePhone(phone)) {
      setPhoneError('Vui lòng nhập đúng và đủ 10 số điện thoại di động (ví dụ: 0942223434)');
      return;
    }

    if (!address.trim()) return;

    const code = 'GF-DH' + Math.floor(10000 + Math.random() * 90000);
    setOrderId(code);
    setIsSubmitting(true);

    const payload: OrderPayload = {
      orderId: code,
      fullName: fullName.trim(),
      phone: phone.replace(/\D/g, ''),
      address: address.trim(),
      vehicleName: activeProduct?.name || 'GoFold X3',
      price: unitPrice,
      quantity,
      total,
      notes: notes.trim() || undefined
    };

    // Đẩy đơn hàng trực tiếp về Telegram Bot Báo Đơn (@Gofold_bot)
    await sendOrderToTelegram(payload);

    setIsSubmitting(false);
    setOrderConfirmed(true);
    onOrderSuccess();
  };

  const handleClose = () => {
    setOrderConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/80 backdrop-blur-sm">
      <div className="relative my-auto w-full max-w-[500px] rounded-2xl border border-neutral-800 bg-[#0d0f12] shadow-2xl text-neutral-100 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800/80 px-4 py-3.5 sm:px-5 sm:py-4 bg-neutral-950/70 shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#00a3ff] font-bold">
              <ShoppingBag className="h-3.5 w-3.5" />
              Đặt Mua Xe Chính Hãng GOFOLD
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-white mt-0.5">
              {orderConfirmed ? 'Đặt Hàng Thành Công' : 'Đặt Mua Nhanh Giao Xe Tận Nơi'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="rounded-lg p-2 text-neutral-400 hover:text-white hover:bg-neutral-800/60 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {orderConfirmed ? (
          <div className="p-5 sm:p-6 text-center space-y-4 overflow-y-auto">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/10 text-[#00a3ff]">
              <CheckCircle className="h-8 w-8" />
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Đặt Hàng Thành Công!
              </h3>
              <p className="mt-1 text-xs text-neutral-300 max-w-sm mx-auto leading-relaxed">
                Cảm ơn quý khách. Chuyên viên GOFOLD sẽ gọi trực tiếp đến SĐT{' '}
                <strong className="text-[#00a3ff] font-mono">{phone}</strong> để xác nhận đơn và hẹn giờ giao xe tận nhà.
              </p>
            </div>

            {/* Receipt Summary */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-left text-xs space-y-2.5 max-w-md mx-auto">
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">Mã đơn hàng:</span>
                <span className="font-mono font-bold text-[#00a3ff]">#{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Mẫu xe:</span>
                <span className="font-semibold text-white">{activeProduct?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Số lượng:</span>
                <span className="font-mono text-neutral-200">{quantity} chiếc</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Tổng thanh toán:</span>
                <span className="font-mono font-bold text-[#00a3ff] text-sm tabular-nums">
                  {formatVND(total)}
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-neutral-800">
                <span className="text-neutral-400">Khách hàng:</span>
                <span className="text-white font-medium">{fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Số điện thoại:</span>
                <span className="font-mono text-neutral-200">{phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Địa chỉ giao:</span>
                <span className="text-neutral-200 text-right max-w-[220px] truncate">{address}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full rounded-xl bg-[#00a3ff] px-6 py-2.5 text-xs font-extrabold text-black hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20 active:scale-95"
            >
              Hoàn Tất & Đóng
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmitOrder}
            autoComplete="on"
            className="p-4 sm:p-5 space-y-3.5 overflow-y-auto"
          >
            {/* Vehicle Selection & Summary Card */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-3.5 space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="order-vehicle" className="text-xs font-semibold text-neutral-300">
                  Mẫu xe đặt mua *
                </label>
                <span className="font-mono text-sm font-extrabold text-[#00a3ff] tabular-nums">
                  {formatVND(unitPrice)}
                </span>
              </div>

              <select
                id="order-vehicle"
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full rounded-xl border border-neutral-800 bg-[#0d0f12] px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
              >
                {allProducts.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.series}) — {formatVND(p.price)}
                  </option>
                ))}
              </select>

              {/* Quantity Stepper */}
              <div className="flex items-center justify-between pt-1 border-t border-neutral-900">
                <span className="text-xs text-neutral-400">Số lượng:</span>
                <div className="flex items-center rounded-lg border border-neutral-800 bg-black">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-sm text-neutral-300 hover:text-white active:scale-90"
                  >
                    -
                  </button>
                  <span className="font-mono px-3 py-1 text-xs font-bold text-white tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-sm text-neutral-300 hover:text-white active:scale-90"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80">
                <span className="text-xs font-bold text-white">Tổng tiền tạm tính:</span>
                <span className="font-mono text-base font-extrabold text-[#00a3ff] tabular-nums">
                  {formatVND(total)}
                </span>
              </div>
            </div>

            {/* Customer Inputs with Standard Autocomplete */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  Thông tin nhận hàng
                </span>
                <button
                  type="button"
                  onClick={handleQuickFill}
                  className="inline-flex items-center gap-1 text-[11px] text-[#00a3ff] hover:underline"
                >
                  <Zap className="h-3 w-3" />
                  Tự điền nhanh mẫu
                </button>
              </div>

              {/* Name */}
              <div>
                <label htmlFor="checkout-name" className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-neutral-400" />
                  Họ và tên người nhận *
                </label>
                <input
                  id="checkout-name"
                  name="name"
                  autoComplete="name"
                  type="text"
                  required
                  placeholder="Họ và Tên"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              {/* Phone with 10-digit validation */}
              <div>
                <label htmlFor="checkout-tel" className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-neutral-400" />
                    Số điện thoại nhận xe *
                  </span>
                  {phone && !phoneError && (
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5">
                      <Check className="h-3 w-3" /> Chuẩn 10 số
                    </span>
                  )}
                </label>
                <input
                  id="checkout-tel"
                  name="tel"
                  autoComplete="tel"
                  type="tel"
                  inputMode="tel"
                  required
                  maxLength={12}
                  placeholder="Ví dụ: 094 222 3434"
                  value={phone}
                  onChange={handlePhoneChange}
                  className={`w-full rounded-xl border bg-neutral-950 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none font-mono ${
                    phoneError ? 'border-amber-500 focus:border-amber-400' : 'border-neutral-800 focus:border-cyan-400'
                  }`}
                />
                {phoneError && (
                  <p className="mt-1 text-[11px] text-amber-400 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    {phoneError}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label htmlFor="checkout-address" className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-neutral-400" />
                  Địa chỉ giao xe tận nơi *
                </label>
                <input
                  id="checkout-address"
                  name="street-address"
                  autoComplete="street-address"
                  type="text"
                  required
                  placeholder="Địa chỉ (Số nhà, tên đường, phường, quận...)"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="checkout-notes" className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-neutral-400" />
                  Ghi chú đơn hàng (tùy chọn)
                </label>
                <input
                  id="checkout-notes"
                  name="notes"
                  type="text"
                  placeholder="Ví dụ: Giao xe giờ hành chính, lắp sẵn phụ kiện..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-300">Phương thức thanh toán</label>
              <div className="rounded-xl border border-[#00a3ff] bg-cyan-950/30 p-3 text-xs text-white">
                Thanh toán khi nhận hàng (COD)
              </div>
            </div>

            {/* Friendly assurance - No complicated payment methods */}
            <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/15 p-2.5 text-[11px] text-neutral-300 leading-relaxed flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-[#00a3ff] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Quy trình đơn giản:</strong> Sau khi quý khách đặt xe, cửa hàng sẽ liên hệ lại qua SĐT để xác nhận và sắp xếp giao xe tận nhà.
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting || !!phoneError}
                className="w-full rounded-xl bg-[#00a3ff] py-3 text-xs sm:text-sm font-extrabold text-black hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? 'Đang gửi đơn hàng...' : `Xác Nhận Đặt Mua Xe • ${formatVND(total)}`}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
