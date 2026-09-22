import React from 'react';
import { X, Star, ShieldCheck, CheckCircle2, ShoppingCart, Zap, Award, Activity } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  return (
    <div className="eb-modal-backdrop" id="product-detail-modal" onClick={onClose}>
      <div
        className="eb-modal-sheet reticle-box"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="eb-modal-close"
          onClick={onClose}
          aria-label="بستن برگه مشخصات"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="eb-modal-grid">
          {/* سمت راست: تصویر با رتیکل و اطلاعات خرید */}
          <div>
            <div className="relative w-full h-64 sm:h-72 bg-black rounded-2xl overflow-hidden border border-white/10 mb-4 flex items-center justify-center p-3">
              <img
                src={product.image}
                alt={product.nameFa}
                className="w-full h-full object-contain"
              />
              <span className="eb-brand-tag">
                {product.brand.toUpperCase()} // S1+ SPEC
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#141924] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-[#bef264] text-xs font-mono font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>موجود در انبار: {product.stockCount} عدد (تست اولیه گذرانده شده)</span>
              </div>

              <div className="flex items-center gap-2 text-slate-300 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#bef264] shrink-0" />
                <span>{product.warranty}</span>
              </div>

              <div className="flex items-center gap-2 text-slate-300 text-xs font-semibold">
                <Award className="w-4 h-4 text-[#38bdf8] shrink-0" />
                <span>پلمپ کارخانه‌ای اورجینال با شماره سریال ثبت شده</span>
              </div>

              {/* قیمت و دکمه افزودن */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-400 font-mono">PRICE // قیمت قطعه:</div>
                  <div className="text-xl font-black text-white font-mono flex items-baseline gap-1">
                    <span>{product.price.toLocaleString('fa-IR')}</span>
                    <span className="text-xs text-slate-400 font-sans">تومان</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="eb-pill-btn eb-pill-btn-accent"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>افزودن به سبد</span>
                </button>
              </div>
            </div>
          </div>

          {/* سمت چپ: شیت گزارش مشخصات فنی به سبک آزمایشگاه EyeBot */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="eb-mono-tag bg-[#bef264]/10 text-[#bef264] border border-[#bef264]/30 px-2 py-0.5 rounded-full text-xs">
                EYEBOT OPTICAL SPEC SHEET
              </span>
              <span className="text-xs text-slate-400 font-mono">
                REF: {product.id.toUpperCase()}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight mb-1">
              {product.nameFa}
            </h2>
            <div className="text-xs text-slate-400 font-mono mb-4 text-left dir-ltr">
              {product.nameEn}
            </div>

            <div className="flex items-center gap-4 mb-4 text-xs">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
                <span className="font-bold text-white font-mono">{product.rating}</span>
                <span className="text-slate-400">({product.reviewsCount} ارزیابی خریداران)</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#bef264] font-mono text-[11px]">
                <Activity className="w-3.5 h-3.5" />
                <span>BENCHMARK VERIFIED</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              {product.fullDesc}
            </p>

            {/* جدول مشخصات فنی به سبک کارت بینایی‌سنجی EyeBot */}
            <div className="border border-white/10 rounded-xl p-3 bg-[#080a0f]">
              <div className="eb-mono-tag text-[#bef264] text-xs font-bold pb-2 border-b border-white/10 flex items-center justify-between">
                <span>PARAMETRIC SPECIFICATIONS</span>
                <span>[ LAB CALIBRATED ]</span>
              </div>

              <table className="eb-spec-table">
                <tbody>
                  {product.specs.map((spec, index) => (
                    <tr key={index}>
                      <td className="lbl">{spec.label}</td>
                      <td className="val">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
