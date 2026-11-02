import React from 'react';
import { Search, ShoppingBag } from 'lucide-react';
import { GoFoldLogo } from './GoFoldLogo';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenTestRide: () => void;
  onNavigateSection: (sectionId: string) => void;
  activeNavTab?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenTestRide,
  onNavigateSection,
  activeNavTab = 'ekickscooter'
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-900 bg-black/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 sm:h-16 max-w-[1440px] items-center justify-between px-3 sm:px-6 lg:px-10">
        {/* Left: Official GOFOLD 3D Emblem Logo & Wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center transition-opacity hover:opacity-90 active:scale-95 touch-manipulation"
        >
          <GoFoldLogo size="sm" showSubtitle={false} className="sm:hidden" />
          <GoFoldLogo size="md" showSubtitle={true} className="hidden sm:flex" />
        </a>

        {/* Center: Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:gap-8 text-[13px] font-medium text-neutral-300 md:flex">
          <button
            onClick={() => onNavigateSection('cinematic-slider')}
            className={`whitespace-nowrap transition-colors ${
              activeNavTab === 'ekickscooter'
                ? 'text-[#00a3ff] font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            5 Dòng Xe Gấp
          </button>

          <button
            onClick={() => onNavigateSection('lobby-showroom')}
            className="whitespace-nowrap text-neutral-400 hover:text-white transition-colors"
          >
            Sảnh Trưng Bày
          </button>

          <button
            onClick={() => onNavigateSection('showrooms')}
            className="whitespace-nowrap text-neutral-400 hover:text-white transition-colors"
          >
            Showroom & Lái Thử
          </button>

          <button
            onClick={() => onNavigateSection('video-reviews')}
            className="whitespace-nowrap text-neutral-400 hover:text-[#00a3ff] transition-colors"
          >
            Video Review
          </button>
        </nav>

        {/* Right Actions: Search & Cart (Mobile optimized touch targets) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenSearch}
            aria-label="Tìm kiếm xe"
            className="p-2.5 sm:p-2 text-neutral-300 transition-colors hover:text-white rounded-full hover:bg-neutral-900 active:bg-neutral-800 touch-manipulation"
          >
            <Search className="h-5 w-5" />
          </button>

          <button
            onClick={onOpenCart}
            aria-label="Giỏ hàng"
            className="relative flex items-center gap-1.5 sm:gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-3 py-1.5 sm:px-3.5 sm:py-1.5 text-xs font-semibold text-white transition-colors hover:border-cyan-500/50 active:scale-95 touch-manipulation"
          >
            <ShoppingBag className="h-4 w-4 text-[#00a3ff]" />
            <span className="font-mono tabular-nums font-bold text-white text-xs sm:text-sm">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
