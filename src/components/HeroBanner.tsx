import React from 'react';
import { Cpu, Zap, Layers, Sparkles, Activity, ShieldCheck, ArrowDown, Crosshair, Award } from 'lucide-react';
import { CategoryType } from '../types';

interface HeroBannerProps {
  onSelectCategory: (cat: CategoryType) => void;
  onOpenScanner: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSelectCategory,
  onOpenScanner,
}) => {
  return (
    <section className="eb-hero" id="hero-section">
      <div className="eb-grid-lines-bg"></div>

      <div className="eb-hero-container">
        {/* نشان رسمی به سبک EyeBot */}
        <div className="eb-hero-badge">
          <Activity className="w-4 h-4 animate-pulse" />
          <span>EYEBOT HARDWARE S1+ TERMINAL // نسخه ۲۰۲۶</span>
        </div>

        {/* عنوان بزرگ با تایپوگرافی پرقدرت */}
        <h1 className="eb-hero-heading">
          سخت‌افزار کامپیوتر با <span className="highlight-lime">دقت اپتیکال</span> و نهایت توان
        </h1>

        <p className="eb-hero-sub">
          الگوبرداری از استانداردهای فوق دقیق کیوسک‌های EyeBot: عرضه جدیدترین پردازنده‌ها (CPU)، 
          کارت‌های گرافیک پرچمدار (GPU) و رم‌های پرسرعت DDR5 با حذف ۱۰۰٪ گلوگاه و گارانتی طلایی تعویض.
        </p>

        {/* دکمه‌های فراخوان عمل (CTA) به سبک EyeBot */}
        <div className="flex items-center justify-center gap-3.5 flex-wrap mb-10">
          <button
            onClick={onOpenScanner}
            className="eb-pill-btn eb-pill-btn-accent text-base py-3 px-6"
          >
            <Activity className="w-5 h-5 animate-pulse" />
            <span>اسکن هوشمند ۹۰ ثانیه‌ای قطعات (System Test)</span>
          </button>

          <a
            href="#categories-section"
            className="eb-pill-btn eb-pill-btn-outline text-base py-3 px-6"
          >
            <Crosshair className="w-4 h-4 text-[#bef264]" />
            <span>مشاهده کاتالوگ قطعات</span>
          </a>
        </div>

        {/* کیوسک سخت‌افزاری نمایش زنده مشخصات (The Eyebot S1+ Hardware Terminal Showcase) */}
        <div className="eb-kiosk-banner-card reticle-box">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="eb-mono-tag bg-[#bef264]/10 text-[#bef264] border border-[#bef264]/30 px-2 py-0.5 rounded-full">
                TOUCH-FREE BENCHMARKING
              </span>
              <span className="text-slate-400 font-mono text-xs">MODEL: EB-S1+ TERMINAL</span>
            </div>

            <h3 className="text-2xl font-black text-white mb-2">
              کالیبراسیون بدون خطای قطعات سیستم شما
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              همانند سنجش بینایی ۹۰ ثانیه‌ای در کیوسک‌های EyeBot، پردازنده‌ها، رم‌ها و کارت‌های گرافیک ما پیش از ارسال
              تحت تست‌های حرارتی، پایداری فرکانس و بنچمارک دقیق ۴K قرار می‌گیرند.
            </p>

            <div className="eb-kiosk-features-grid">
              <div className="eb-kiosk-stat-pill">
                <div>
                  <div className="eb-kiosk-stat-val">6.0 GHz</div>
                  <div className="eb-kiosk-stat-lbl">ماکزیمم کلاک توربو بوست</div>
                </div>
              </div>

              <div className="eb-kiosk-stat-pill">
                <div>
                  <div className="eb-kiosk-stat-val">0.00%</div>
                  <div className="eb-kiosk-stat-lbl">گلوگاه محاسبه شده بین قطعات</div>
                </div>
              </div>

              <div className="eb-kiosk-stat-pill">
                <div>
                  <div className="eb-kiosk-stat-val">89.6 GB/s</div>
                  <div className="eb-kiosk-stat-lbl">پهنای باند فرکانس DDR5</div>
                </div>
              </div>

              <div className="eb-kiosk-stat-pill">
                <div>
                  <div className="eb-kiosk-stat-val">90 SEC</div>
                  <div className="eb-kiosk-stat-lbl">مدت زمان تست هوشمند کیوسک</div>
                </div>
              </div>
            </div>
          </div>

          {/* دستگاه کیوسک با رتیکل نوری */}
          <div className="eb-kiosk-device-display">
            <div className="eb-optic-target"></div>
            <div className="relative z-10 flex flex-col items-center justify-center py-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#080a0f] border-2 border-[#bef264] flex items-center justify-center text-[#bef264] shadow-[0_0_20px_rgba(190,242,100,0.4)] mb-3">
                <Crosshair className="w-8 h-8 animate-spin" />
              </div>
              <div className="eb-mono-tag text-[#bef264] text-xs font-bold mb-1">
                OPTICAL SENSOR ACTIVE
              </div>
              <div className="text-white font-extrabold text-sm font-mono mb-2">
                PCIe 5.0 // GDDR6X // DDR5 7200
              </div>
              <div className="text-[11px] text-slate-400 font-mono max-w-[220px]">
                پایش لحظه‌ای ولتاژ و حرارت چیپست با دقت آزمایشگاهی
              </div>
            </div>
          </div>
        </div>

        {/* دکمه‌های انتخاب سریع ۳ دسته اصلی */}
        <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={() => onSelectCategory('cpu')}
            className="eb-pill-btn eb-pill-btn-outline"
          >
            <Cpu className="w-4 h-4 text-[#bef264]" />
            <span>پردازنده‌ها (CPU)</span>
          </button>

          <button
            onClick={() => onSelectCategory('gpu')}
            className="eb-pill-btn eb-pill-btn-outline"
          >
            <Zap className="w-4 h-4 text-[#38bdf8]" />
            <span>کارت گرافیک‌ها (GPU)</span>
          </button>

          <button
            onClick={() => onSelectCategory('ram')}
            className="eb-pill-btn eb-pill-btn-outline"
          >
            <Layers className="w-4 h-4 text-[#a855f7]" />
            <span>حافظه رم DDR5 (RAM)</span>
          </button>
        </div>
      </div>
    </section>
  );
};
