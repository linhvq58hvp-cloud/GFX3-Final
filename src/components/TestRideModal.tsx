import React, { useState, useMemo } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  Car,
  Sparkles,
  User,
  Phone,
  FileText,
  Send,
  AlertCircle,
  Zap,
  Check
} from 'lucide-react';
import { Product } from '../types';
import {
  sendTestRideToTelegram,
  TestRidePayload,
  TelegramPushResult
} from '../services/telegramService';

interface TestRideModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  initialVehicleId?: string;
  initialShowroomId?: string;
}

export const TestRideModal: React.FC<TestRideModalProps> = ({
  isOpen,
  onClose,
  products,
  initialVehicleId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initialShowroomId
}) => {
  if (!isOpen) return null;

  const vehicleProducts = products.filter((p) => p.category !== 'accessories');

  // Selected vehicle (defaults to GoFold X3 if found)
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(() => {
    if (initialVehicleId) return initialVehicleId;
    const x3 = vehicleProducts.find((p) => p.name.toLowerCase().includes('x3'));
    return x3?.id || vehicleProducts[0]?.id || '';
  });

  // Date options: ONLY "Hôm nay", "Ngày mai", "Ngày kia"
  const dateOptions = useMemo(() => {
    const list = [
      { label: 'Hôm nay', offset: 0 },
      { label: 'Ngày mai', offset: 1 },
      { label: 'Ngày kia', offset: 2 }
    ];
    const daysOfWeek = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

    return list.map((item) => {
      const d = new Date();
      d.setDate(d.getDate() + item.offset);
      const dayNum = String(d.getDate()).padStart(2, '0');
      const monthNum = String(d.getMonth() + 1).padStart(2, '0');
      const dayOfWeek = daysOfWeek[d.getDay()];
      const displayDate = `${dayNum}/${monthNum}`;
      return {
        label: item.label,
        subLabel: `${dayOfWeek}, ${displayDate}`,
        fullDateStr: `${item.label} (${dayOfWeek}, ${displayDate})`,
        value: `${item.label} - ${displayDate} (${dayOfWeek})`
      };
    });
  }, []);

  const [selectedDate, setSelectedDate] = useState<string>(() => dateOptions[0]?.value || '');
  const [timeSlot, setTimeSlot] = useState<string>('09:30 - 10:30');

  // Customer contact info
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  // Phone validation status
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingCode, setBookingCode] = useState('');
  const [telegramResult, setTelegramResult] = useState<TelegramPushResult | null>(null);

  const selectedVehicle = products.find((p) => p.id === selectedVehicleId);

  const timeSlots = [
    '08:30 - 09:30',
    '09:30 - 10:30',
    '10:30 - 11:30',
    '14:00 - 15:00',
    '15:30 - 16:30',
    '17:00 - 18:00',
    '18:30 - 19:30',
    '19:30 - 20:30'
  ];

  // Validate Vietnamese phone number: 10 digits starting with 0, or 11 with 84
  const validatePhone = (val: string): boolean => {
    const pure = val.replace(/\D/g, '');
    if (!pure) return false;
    return (pure.length === 10 && pure.startsWith('0')) ||
           (pure.length === 11 && pure.startsWith('84'));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    // Allow digits and standard delimiters (space, dash, dot)
    const cleaned = raw.replace(/[^\d\s.-]/g, '');
    setPhoneNumber(cleaned);

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

  // Quick fill sample button for testing
  const handleQuickFill = () => {
    setFullName('Vũ Quang Linh');
    setPhoneNumber('0942223434');
    setAddress('27A Trần Hưng Đạo, Hoàn Kiếm, Hà Nội');
    setPhoneError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) return;

    if (!validatePhone(phoneNumber)) {
      setPhoneError('Vui lòng nhập đúng và đủ 10 số điện thoại di động (ví dụ: 0942223434)');
      return;
    }

    if (!address.trim()) return;

    const code = 'GF-TR' + Math.floor(10000 + Math.random() * 90000);
    setBookingCode(code);
    setIsSubmitting(true);

    const payload: TestRidePayload = {
      bookingCode: code,
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.replace(/\D/g, ''),
      address: address.trim(),
      vehicleName: selectedVehicle?.name || 'GoFold X3',
      date: selectedDate,
      timeSlot,
      notes: notes.trim() || undefined
    };

    // Đẩy thẳng về Telegram Bot
    const res = await sendTestRideToTelegram(payload);
    setTelegramResult(res);

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setTelegramResult(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-[490px] my-auto rounded-2xl border border-neutral-800 bg-[#0d0f12] text-neutral-100 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800/80 px-4 py-3.5 sm:px-5 sm:py-4 bg-neutral-950/70 shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#00a3ff]">
              <Sparkles className="h-3.5 w-3.5" />
              Trải Nghiệm Xe Điện Gấp
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-white leading-tight mt-0.5">
              Đăng Ký Lái Thử GOFOLD
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="rounded-lg p-2 text-neutral-400 hover:text-white hover:bg-neutral-800/60 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        {isSubmitted ? (
          <div className="p-5 sm:p-6 text-center overflow-y-auto space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/10 text-[#00a3ff]">
              <CheckCircle className="h-8 w-8" />
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Đăng Ký Lái Thử Thành Công!
              </h3>
              <p className="mt-1 text-xs text-neutral-300 max-w-sm mx-auto leading-relaxed">
                Chuyên viên GOFOLD sẽ liên hệ qua SĐT{' '}
                <strong className="text-[#00a3ff] font-mono">{phoneNumber}</strong> để xác nhận thời gian mang xe tới trải nghiệm.
              </p>
            </div>

            {/* Ticket details */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-left text-xs space-y-2.5 max-w-md mx-auto">
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">Mã lịch hẹn:</span>
                <span className="font-mono font-bold text-[#00a3ff]">#{bookingCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Mẫu xe:</span>
                <span className="font-semibold text-white">{selectedVehicle?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Thời gian hẹn:</span>
                <span className="font-medium text-cyan-300">{selectedDate} ({timeSlot})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Khách hàng:</span>
                <span className="text-white font-medium">{fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Số điện thoại:</span>
                <span className="font-mono text-neutral-200">{phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Địa chỉ:</span>
                <span className="text-neutral-200 text-right max-w-[220px] truncate">{address}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="w-full rounded-xl bg-[#00a3ff] px-6 py-2.5 text-xs font-extrabold text-black hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20 active:scale-95"
            >
              Hoàn Tất & Đóng
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            autoComplete="on"
            className="p-4 sm:p-5 space-y-3.5 overflow-y-auto"
          >
            {/* Informational Policy Box - No selection buttons */}
            <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-3 text-xs leading-relaxed">
              <div className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-[#00a3ff] shrink-0 mt-0.5" />
                <div className="text-[11px] text-neutral-300">
                  <div className="font-bold text-cyan-300 mb-0.5">
                    Cơ chế Lái Thử Tận Nơi GOFOLD:
                  </div>
                  <p>
                    • <strong className="text-white">Miễn phí trong bán kính 2km</strong> từ cửa hàng hoặc đại lý của Gofold tại Hà Đông, Tây Hồ, Nam Từ Liêm.
                  </p>
                  <p className="mt-0.5">
                    • Khách hàng ở xa (từ 2 km trở lên trong nội thành Hà Nội) áp dụng phí trải nghiệm <strong className="text-amber-300 font-semibold">50.000đ</strong> — khoản phí này sẽ được <strong className="text-emerald-400 font-bold">hoàn 100%</strong> ngay khi quý khách chốt mua xe.
                  </p>
                </div>
              </div>
            </div>

            {/* 1. Mẫu xe */}
            <div>
              <label htmlFor="test-ride-vehicle" className="block text-xs font-semibold text-neutral-300 mb-1">
                Mẫu xe trải nghiệm *
              </label>
              <select
                id="test-ride-vehicle"
                name="vehicle"
                value={selectedVehicleId}
                onChange={(e) => setSelectedVehicleId(e.target.value)}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
              >
                {vehicleProducts.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.series}) — Vận tốc {v.specs.topSpeed} km/h
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Ngày lái thử - CHỈ 3 NÚT: Hôm nay, Ngày mai, Ngày kia */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-[#00a3ff]" />
                Chọn ngày lái thử *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {dateOptions.map((item) => {
                  const isSelected = selectedDate === item.value;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setSelectedDate(item.value)}
                      className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'border-[#00a3ff] bg-[#00a3ff] text-black font-extrabold shadow-[0_0_12px_rgba(0,163,255,0.35)]'
                          : 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-900'
                      }`}
                    >
                      <span className={`text-xs font-extrabold ${isSelected ? 'text-black' : 'text-white'}`}>
                        {item.label}
                      </span>
                      <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-black/80 font-bold' : 'text-neutral-400'}`}>
                        {item.subLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Khung giờ */}
            <div>
              <label htmlFor="test-ride-time" className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-[#00a3ff]" />
                Khung giờ hẹn *
              </label>
              <select
                id="test-ride-time"
                name="timeSlot"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
              >
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Thông tin khách hàng với AUTOCOMPLETE chuẩn trình duyệt */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  Thông tin người nhận xe
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

              {/* Họ và tên - Hỗ trợ Autocomplete "name" */}
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-neutral-400" />
                  Họ và tên *
                </label>
                <input
                  id="name"
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

              {/* Số điện thoại - Hỗ trợ Autocomplete "tel" & Kiểm tra đúng đủ 10 số */}
              <div>
                <label htmlFor="tel" className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-neutral-400" />
                    Số điện thoại (đúng & đủ 10 số) *
                  </span>
                  {phoneNumber && !phoneError && (
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5">
                      <Check className="h-3 w-3" /> Chuẩn 10 số
                    </span>
                  )}
                </label>
                <input
                  id="tel"
                  name="tel"
                  autoComplete="tel"
                  type="tel"
                  inputMode="tel"
                  required
                  maxLength={12}
                  placeholder="Ví dụ: 094 222 3434"
                  value={phoneNumber}
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

              {/* Địa chỉ - Hỗ trợ Autocomplete "street-address" */}
              <div>
                <label htmlFor="street-address" className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-neutral-400" />
                  Địa chỉ nhận xe / địa chỉ lái thử *
                </label>
                <input
                  id="street-address"
                  name="street-address"
                  autoComplete="street-address"
                  type="text"
                  required
                  placeholder="Địa chỉ (Số nhà, ngõ/ngách, phường, quận...)"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              {/* Ghi chú */}
              <div>
                <label htmlFor="test-ride-notes" className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-neutral-400" />
                  Ghi chú thêm (tùy chọn)
                </label>
                <input
                  id="test-ride-notes"
                  name="notes"
                  type="text"
                  placeholder="Ví dụ: Gọi trước khi đến 15 phút, mang thêm phụ kiện..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting || !!phoneError}
                className="w-full rounded-xl bg-[#00a3ff] py-3 text-xs sm:text-sm font-extrabold text-black hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? 'Đang gửi đăng ký...' : 'Xác Nhận Đăng Ký Lái Thử'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
