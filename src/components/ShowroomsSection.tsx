import React from 'react';
import { MapPin, Phone, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { SHOWROOMS } from '../data/showrooms';

interface ShowroomsSectionProps {
  onOpenTestRide: (vehicleId?: string, showroomId?: string) => void;
}

export const ShowroomsSection: React.FC<ShowroomsSectionProps> = ({ onOpenTestRide }) => {
  return (
    <section id="showrooms" className="scroll-mt-20 border-t border-neutral-800 bg-neutral-950 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between pb-8 border-b border-neutral-800">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#00a3ff]">
              Hệ Thống Trải Nghiệm Thực Tế & Lái Thử
            </div>
            <h2 className="mt-1 text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Hệ Thống Cửa Hàng & Showroom GOFOLD
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-neutral-400 max-w-xl leading-relaxed">
              Trải nghiệm thực tế cảm giác lái xe điện gấp thông minh GOFOLD. Mở rộng khung giờ phục vụ đến <strong className="text-white font-bold">22:00 (10h tối)</strong> tất cả các ngày trong tuần. Hotline tư vấn: <strong className="text-[#00a3ff] font-mono">094.222.3434</strong>. Hệ thống showroom: {SHOWROOMS.map(s => s.name).join(', ')}.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end gap-2">
            <button
              onClick={() => onOpenTestRide()}
              className="inline-flex items-center gap-2 rounded-xl bg-[#00a3ff] px-6 py-3 text-xs sm:text-sm font-extrabold text-black hover:bg-cyan-400 transition-colors whitespace-nowrap shadow-lg shadow-cyan-500/20 active:scale-95 touch-manipulation"
            >
              <Calendar className="h-4 w-4" />
              Đăng Ký Lái Thử Tận Nơi / Showroom
            </button>
            <span className="text-[11px] text-cyan-300">
              ⚡ Miễn phí ≤ 2km từ Hà Đông, Tây Hồ, Nam Từ Liêm · Hoàn 100% phí 50k khi mua
            </span>
          </div>
        </div>

        {/* Doorstep test ride policy highlight banner */}
        <div className="mt-6 rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-4 sm:p-5 max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <div className="text-[#00a3ff] font-bold text-xs uppercase tracking-wide">
              🚗 Dịch vụ lái thử tận nơi linh hoạt
            </div>
            <p className="mt-1 text-neutral-300 leading-relaxed text-xs">
              <strong className="text-white">Miễn phí trong bán kính 2km</strong> từ cửa hàng hoặc đại lý của Gofold tại Hà Đông, Tây Hồ, Nam Từ Liêm. Khách hàng ở xa (từ 2 km trở lên trong nội thành Hà Nội) áp dụng phí trải nghiệm <strong className="text-amber-300">50.000đ</strong> — khoản phí này sẽ được <strong className="text-emerald-400 font-bold">hoàn 100%</strong> ngay khi quý khách chốt mua xe.
            </p>
          </div>
          <button
            onClick={() => onOpenTestRide()}
            className="shrink-0 rounded-xl border border-cyan-400/50 bg-black/50 px-4 py-2 text-xs font-bold text-cyan-300 hover:bg-[#00a3ff] hover:text-black transition-colors"
          >
            Đăng Ký Ngay
          </button>
        </div>

        {/* Showroom Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {SHOWROOMS.map((showroom) => (
            <div
              key={showroom.id}
              className="flex flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 transition-all hover:border-cyan-500/40 hover:bg-neutral-900 shadow-xl"
            >
              <div>
                <div className="text-xs font-bold text-[#00a3ff] uppercase tracking-wide">
                  {showroom.city}
                </div>
                <h3 className="mt-1 text-lg font-bold text-white">
                  {showroom.name}
                </h3>

                <div className="mt-4 space-y-3 text-xs text-neutral-300">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-4 w-4 text-[#00a3ff] shrink-0 mt-0.5" />
                    <span className="font-medium text-white">{showroom.address}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 text-[#00a3ff] shrink-0" />
                    <a href={`tel:${showroom.phone.replace(/[^0-9]/g, '')}`} className="font-mono text-cyan-300 font-bold hover:underline">
                      {showroom.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Clock className="h-4 w-4 text-[#00a3ff] shrink-0" />
                    <span className="text-neutral-200">{showroom.hours}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-neutral-800/80 space-y-1.5 text-[11px] text-neutral-400">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Có xe sẵn lái thử & trải nghiệm trực tiếp</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Hỗ trợ kỹ thuật và bàn giao xe tại chỗ</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800">
                <button
                  onClick={() => onOpenTestRide(undefined, showroom.id)}
                  className="w-full min-h-[42px] rounded-xl border border-neutral-700 bg-neutral-800/80 py-2.5 text-xs font-bold text-neutral-200 transition-colors hover:border-cyan-400 hover:text-white active:scale-98 touch-manipulation"
                >
                  Đặt Lịch Lái Thử Tại Đây
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
