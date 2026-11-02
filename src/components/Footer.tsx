import React from 'react';
import { Truck, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { GoFoldLogo } from './GoFoldLogo';
import { SHOWROOMS } from '../data/showrooms';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenTestRide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection, onOpenTestRide }) => {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 text-neutral-400 text-xs">
      {/* 2 Pillars Delivery & Showroom Service Strip */}
      <div className="border-b border-neutral-850 py-8 bg-neutral-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-neutral-800 p-2.5 text-[#00a3ff]">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Giao Xe Tận Nhà Toàn Quốc</h4>
                <p className="mt-1 text-neutral-400 text-[11px] leading-relaxed">
                  Đóng gói tiêu chuẩn, hỗ trợ mở thùng, lắp ráp và hướng dẫn vận hành trực tiếp.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-neutral-800 p-2.5 text-[#00a3ff]">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Hệ Thống Showroom Mở Cửa Đến 22:00</h4>
                <p className="mt-1 text-neutral-400 text-[11px] leading-relaxed">
                  {SHOWROOMS.map(s => s.name).join(' & ')}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <GoFoldLogo size="md" showSubtitle={true} />
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              GOFOLD - Hệ thống phân phối xe điện gấp đô thị thông minh. Tiên phong giải pháp di chuyển xanh cá nhân, cơ chế gập 1 chạm và hiệu năng vượt trội.
            </p>
            <div className="pt-2 text-xs space-y-2 text-neutral-300">
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-[#00a3ff]" />
                <span>Hotline: <strong className="text-white font-mono">094.222.3434</strong> (08:30 - 22:00 hàng ngày)</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#00a3ff] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  {SHOWROOMS.map((s) => (
                    <div key={s.id}>
                      <span className="font-semibold text-white">{s.name}:</span> <span>{s.address}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-[#00a3ff]" />
                <span>Hỗ trợ: support@gofold.vn</span>
              </div>
            </div>
          </div>

          {/* Col 1 */}
          <div>
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider mb-3">
              Dòng Xe GOFOLD
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigateSection('lobby-showroom')} className="hover:text-white transition-colors">
                  GoFold X3 (Urban Foldable)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('lobby-showroom')} className="hover:text-white transition-colors">
                  GoFold MAX G2 (All-Road)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('lobby-showroom')} className="hover:text-white transition-colors">
                  GoFold E2 Pro (Casual)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('lobby-showroom')} className="hover:text-white transition-colors">
                  GoFold C2 Pro (Kids)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider mb-3">
              Dịch Vụ & Showroom
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenTestRide} className="hover:text-cyan-400 text-[#00a3ff] transition-colors font-semibold">
                  Đăng Ký Lái Thử Miễn Phí
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('showrooms')} className="hover:text-white transition-colors">
                  Hệ Thống Cửa Hàng (Mở đến 22:00)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('cinematic-slider')} className="hover:text-white transition-colors">
                  Công Nghệ Gập Gọn
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('video-reviews')} className="hover:text-[#00a3ff] transition-colors">
                  Video Review & Trải Nghiệm Xe
                </button>
              </li>
              <li>
                <span className="text-neutral-500">Chính Sách Đặt Hàng & Giao Nhận</span>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider mb-3">
              Chứng Nhận & Tiêu Chuẩn
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Các sản phẩm GOFOLD đạt tiêu chuẩn an toàn quốc tế CE, FCC, RoHS và chứng nhận kiểm định chất lượng phương tiện xe điện theo quy chuẩn Việt Nam.
            </p>
            <div className="mt-3 flex items-center gap-2 text-[10px] text-neutral-400">
              <span className="rounded border border-neutral-800 bg-neutral-900 px-2 py-0.5">CE / FCC</span>
              <span className="rounded border border-neutral-800 bg-neutral-900 px-2 py-0.5">RoHS</span>
              <span className="rounded border border-neutral-800 bg-neutral-900 px-2 py-0.5">IPX5</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-neutral-850 pt-6 flex flex-col sm:flex-row items-center justify-between text-neutral-500 text-[11px]">
          <div>
            © 2026 GOFOLD Smart Urban Mobility Vietnam. Hotline: 094.222.3434.
            <a href="https://www.facebook.com/profile.php?id=61590910023712" target="_blank" rel="noopener noreferrer" className="ml-4 hover:text-white transition-colors font-bold text-blue-500">
              Facebook
            </a>
          </div>
          <div className="mt-2 sm:mt-0 flex gap-4">
            <span className="hover:text-neutral-400 cursor-pointer">Điều khoản dịch vụ</span>
            <span>·</span>
            <span className="hover:text-neutral-400 cursor-pointer">Bảo mật thông tin</span>
            <span>·</span>
            <span className="hover:text-neutral-400 cursor-pointer">Chính sách vận chuyển</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
