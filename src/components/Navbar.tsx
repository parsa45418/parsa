import React from 'react';
import { ShoppingBag, Search, Sparkles, Activity, Sun, Moon, Cpu } from 'lucide-react';
import { CategoryType } from '../types';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenScanner: () => void;
  isLightTheme: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  cartCount,
  onOpenCart,
  onOpenScanner,
  isLightTheme,
  onToggleTheme,
}) => {
  return (
    <header className="eb-header" id="site-header">
      <div className="eb-header-inner">
        {/* لوگو به سبک EyeBot */}
        <a
          href="#"
          className="eb-brand"
          id="brand-logo-btn"
          onClick={(e) => {
            e.preventDefault();
            onSelectCategory('all');
          }}
        >
          <div className="eb-brand-symbol">
            <Cpu className="w-5 h-5 text-[#bef264]" />
          </div>
          <div>
            <div className="eb-brand-title">
              <span>EYEBOT</span>
              <span className="text-[#bef264]">HARDWARE</span>
            </div>
            <div className="eb-brand-sub">S1+ OPTICAL PC LAB // سخت‌افزار دقیق</div>
          </div>
        </a>

        {/* فیلد جستجوی کالبریزه */}
        <div className="eb-search-box">
          <input
            id="search-products-input"
            type="text"
            className="eb-search-input"
            placeholder="جستجوی دقیق مدل پردازنده، کارت گرافیک، رم..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <Search className="w-4 h-4 eb-search-icon" />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white eb-mono-tag"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* دکمه‌های اکشن به سبک EyeBot */}
        <div className="eb-header-actions">
          {/* دکمه اسکن ۹۰ ثانیه‌ای */}
          <button
            onClick={onOpenScanner}
            className="eb-pill-btn eb-pill-btn-outline hidden md:inline-flex"
            title="تست و عیب‌یابی خودکار ۹۰ ثانیه‌ای"
          >
            <Activity className="w-4 h-4 text-[#bef264] animate-pulse" />
            <span className="font-mono text-xs">اسکن ۹۰ ثانیه‌ای قطعات</span>
          </button>

          {/* تغییر تم کنتراست (Studio Light / Terminal Dark) */}
          <button
            onClick={onToggleTheme}
            className="w-10 h-10 rounded-full border border-white/10 bg-[#141924] flex items-center justify-center text-slate-300 hover:text-[#bef264] hover:border-[#bef264] transition-all"
            title={isLightTheme ? 'سوییچ به حالت تاریک ترمینال' : 'سوییچ به حالت استودیو کلین'}
            aria-label="تغییر تم رنگی"
          >
            {isLightTheme ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* دکمه سبد خرید */}
          <button
            id="header-cart-button"
            className="eb-pill-btn eb-pill-btn-accent"
            onClick={onOpenCart}
            aria-label="مشاهده سبد خرید"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline font-bold">سبد سفارش</span>
            {cartCount > 0 && (
              <span className="font-mono bg-black text-[#bef264] text-xs px-2 py-0.5 rounded-full font-black">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* نوار وضعیت زنده و دسته‌بندی سریع */}
      <div className="border-t border-white/10 bg-[#080a0f]/90 py-1.5 px-4">
        <div className="max-w-[1320px] mx-auto flex items-center justify-between text-xs overflow-x-auto gap-4 scrollbar-none">
          <div className="flex items-center gap-3 shrink-0">
            <div className="eb-system-status">
              <span className="eb-pulse-dot"></span>
              <span>TERMINAL STATUS: READY</span>
            </div>
            <span className="text-slate-400 font-mono text-[11px] hidden lg:inline">
              [ REFRACTION: 0.00 // LATENCY: 0.12ms // 100% HARDWARE GENUINE ]
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0 font-mono">
            <span className="text-slate-400 text-[11px] ml-1">NAVIGATE:</span>
            {[
              { id: 'all', label: 'ALL COMPONENTS' },
              { id: 'cpu', label: 'CPU // PROCESSORS' },
              { id: 'gpu', label: 'GPU // GRAPHICS' },
              { id: 'ram', label: 'RAM // DDR5' },
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => onSelectCategory(nav.id as CategoryType)}
                className={`px-2.5 py-0.5 rounded-md text-xs transition-colors ${
                  selectedCategory === nav.id
                    ? 'bg-[#bef264] text-black font-bold shadow-[0_0_10px_rgba(190,242,100,0.3)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {nav.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
