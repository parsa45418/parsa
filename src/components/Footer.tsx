import React from 'react';
import { Cpu, Phone, Mail, MapPin, ShieldCheck, Activity, Award, ExternalLink } from 'lucide-react';
import { CategoryType } from '../types';

interface FooterProps {
  onSelectCategory: (cat: CategoryType) => void;
  onOpenScanner: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenScanner }) => {
  return (
    <footer className="eb-footer" id="site-footer">
      <div className="eb-footer-container">
        <div className="eb-footer-grid">
          {/* ستون اول: درباره برند و متدولوژی EyeBot */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="eb-brand-symbol" style={{ width: '36px', height: '36px' }}>
                <Cpu className="w-4 h-4 text-[#bef264]" />
              </div>
              <span className="font-black text-xl text-white font-mono tracking-wider">
                EYEBOT <span className="text-[#bef264]">HARDWARE</span>
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              فروشگاه و لابراتوار تخصصی قطعات سخت‌افزاری کامپیوتر؛ طراحی و معماری شده با الهام مستقیم از زبان بصری، 
              دقت میلی‌متری و کیوسک‌های خودکار وب‌سایت 
              <span className="text-[#bef264] font-mono mx-1">eyebot.co</span>
              و آژانس Milkshake Studio. عرضه قطعات CPU ،GPU و RAM با بالاترین استاندارد بنچمارک جهانی.
            </p>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-[#bef264]">
                <Activity className="w-3.5 h-3.5" />
                <span>90s KIOSK DIAGNOSTIC</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#38bdf8]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>GENUINE HARDWARE</span>
              </div>
            </div>
          </div>

          {/* ستون دوم: دسته‌بندی‌های سخت‌افزار */}
          <div>
            <h4 className="eb-mono-tag text-[#bef264] text-xs font-bold mb-3">
              [ HARDWARE CATEGORIES ]
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onSelectCategory('cpu')}
                  className="hover:text-[#bef264] transition-colors"
                >
                  پردازنده‌های مرکزی اینتل و ای‌ام‌دی (CPU)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('gpu')}
                  className="hover:text-[#bef264] transition-colors"
                >
                  کارت‌های گرافیک گیمینگ و رندرینگ (GPU)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('ram')}
                  className="hover:text-[#bef264] transition-colors"
                >
                  ماژول‌های پرسرعت رم DDR5 و DDR4 (RAM)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('all')}
                  className="hover:text-[#bef264] transition-colors"
                >
                  مشاهده همه قطعات کاتالوگ
                </button>
              </li>
            </ul>
          </div>

          {/* ستون سوم: خدمات کیوسک و پشتیبانی */}
          <div>
            <h4 className="eb-mono-tag text-[#bef264] text-xs font-bold mb-3">
              [ KIOSK PROTOCOLS ]
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={onOpenScanner}
                  className="text-[#bef264] hover:underline flex items-center gap-1 font-mono"
                >
                  <Activity className="w-3 h-3" />
                  <span>اجرای تست ۹۰ ثانیه‌ای قطعات</span>
                </button>
              </li>
              <li><span>گارانتی طلایی تعویض در صورت خرابی</span></li>
              <li><span>پایش و رفع کامل گلوگاه (Bottleneck)</span></li>
              <li><span>استعلام اصالت بارکد و شماره سریال</span></li>
              <li><span>بسته‌بندی ایمن ضد الکتریسیته ساکن</span></li>
            </ul>
          </div>

          {/* ستون چهارم: ارتباط با لابراتوار */}
          <div>
            <h4 className="eb-mono-tag text-[#bef264] text-xs font-bold mb-3">
              [ LAB LOCATION & CONTACT ]
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#bef264] shrink-0 mt-0.5" />
                <span>تهران، مجتمع کامپیوتر پارس، طبقه دوم، واحد ۳۰۲ (لابراتوار سخت‌افزار)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#bef264] shrink-0" />
                <span className="font-mono">۰۲۱ - ۸۸۸۸ ۹۹۹۹</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#bef264] shrink-0" />
                <span className="font-mono">kiosk@eyebot-hardware.ir</span>
              </div>
            </div>
          </div>
        </div>

        {/* خط پایین فوتر به سبک آژانس Milkshake */}
        <div className="eb-footer-bottom">
          <div className="flex items-center gap-2 flex-wrap">
            <span>© ۲۰۲۶ EYEBOT HARDWARE INC. تمامی حقوق برای لابراتوار سخت‌افزار محفوظ است.</span>
            <span className="text-[#bef264] font-mono text-xs">
              // MODELED AFTER EYEBOT.CO ARCHITECTURE
            </span>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs">
            <span className="text-slate-400">LATENCY: 0.12ms</span>
            <span className="text-slate-400">STATUS: ALL SYSTEMS VERIFIED</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
