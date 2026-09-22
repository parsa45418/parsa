import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CheckCircle, ShieldCheck, Activity } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [checkoutDone, setCheckoutDone] = useState(false);

  if (!isOpen) return null;

  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    setCheckoutDone(true);
    setTimeout(() => {
      onClearCart();
      setCheckoutDone(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="eb-drawer-backdrop" id="cart-drawer-backdrop" onClick={onClose}>
      <div
        className="eb-drawer-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* هدر سبد خرید */}
        <div className="eb-drawer-header">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#bef264]" />
            <span className="font-extrabold text-white text-base">
              سبد سفارش قطعات ({totalCount})
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#141924] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white"
            aria-label="بستن سبد"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {checkoutDone ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#bef264]/20 border border-[#bef264] text-[#bef264] flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(190,242,100,0.3)]">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-black text-white mb-2">نسخه سخت‌افزاری شما با موفقیت ثبت شد!</h3>
            <p className="text-xs text-slate-300 max-w-xs mb-4 leading-relaxed">
              سفارش شما در پایگاه داده متمرکز Eyebot ثبت گردید و قطعات برای کالیبراسیون و ارسال پلمپ به انبار ارسال شد.
            </p>
            <div className="eb-mono-tag text-xs text-[#bef264] bg-black px-4 py-2 rounded-xl border border-[#bef264]/50">
              PRESCRIPTION ID: EB-RX-{Math.floor(100000 + Math.random() * 900000)}
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#141924] border border-white/10 text-slate-500 flex items-center justify-center mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">سبد خرید شما خالی است</h3>
            <p className="text-xs text-slate-400 max-w-xs mb-6 font-mono">
              NO HARDWARE SELECTED // لطفاً قطعات مد نظر را از کاتالوگ یا اسکنر ۹۰ ثانیه‌ای انتخاب کنید.
            </p>
            <button
              onClick={onClose}
              className="eb-pill-btn eb-pill-btn-outline"
            >
              <span>مشاهده و انتخاب قطعات</span>
            </button>
          </div>
        ) : (
          <>
            {/* نوار تضمین کالیبراسیون */}
            <div className="px-5 py-2.5 bg-[#bef264]/10 border-b border-[#bef264]/20 flex items-center gap-2 text-xs text-[#bef264] font-mono">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>ارسال امن اکسپرس و بیمه فیزیکی قطعات فعال شد</span>
            </div>

            {/* لیست آیتم‌های سبد */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3 bg-[#141924] border border-white/10 rounded-xl flex items-center gap-3 relative"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.nameFa}
                    className="w-16 h-16 object-contain bg-black rounded-lg border border-white/10 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="eb-mono-tag text-[10px] text-[#bef264]">
                      {item.product.brand.toUpperCase()} // {item.product.category.toUpperCase()}
                    </div>
                    <div className="font-bold text-xs text-white truncate" title={item.product.nameFa}>
                      {item.product.nameFa}
                    </div>
                    <div className="font-mono text-xs text-white mt-1">
                      {item.product.price.toLocaleString('fa-IR')} <span className="text-[10px] text-slate-400">تومان</span>
                    </div>
                  </div>

                  {/* کنترل تعداد */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-slate-500 hover:text-red-400 transition-colors p-1"
                      title="حذف قطعه"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1.5 bg-[#080a0f] border border-white/10 rounded-lg p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs font-bold text-white px-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* فوتر تسویه حساب */}
            <div className="p-4 border-t border-white/10 bg-[#080a0f] space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>تعداد کل قطعات:</span>
                <span className="text-white font-bold">{totalCount} عدد</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-300">مبلغ قابل پرداخت:</span>
                <div className="font-black text-xl text-white font-mono flex items-baseline gap-1">
                  <span>{totalPrice.toLocaleString('fa-IR')}</span>
                  <span className="text-xs text-slate-400 font-sans">تومان</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="eb-checkout-btn"
              >
                <span>تایید نهایی و صدور فاکتور رسمی</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={onClearCart}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-300 py-1 font-mono"
              >
                [ خالی کردن سبد سفارش ]
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
