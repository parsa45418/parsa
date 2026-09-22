import React, { useState } from 'react';
import { Star, Eye, ShoppingCart, Check, Zap, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onOpenQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenQuickView,
  onAddToCart,
}) => {
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'cpu':
        return 'CPU // پردازنده';
      case 'gpu':
        return 'GPU // گرافیک';
      case 'ram':
        return 'RAM // رم DDR5';
      default:
        return 'HARDWARE';
    }
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <article
      className="eb-product-card reticle-box"
      id={`product-card-${product.id}`}
      onClick={() => onOpenQuickView(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onOpenQuickView(product);
      }}
    >
      {/* تصویر کالا با برچسب‌های اپتیکال */}
      <div className="eb-img-wrapper">
        <img
          src={product.image}
          alt={product.nameFa}
          className="eb-product-img"
          loading="lazy"
        />

        {/* برچسب‌های شناور بالا */}
        <div className="eb-img-badge-overlay">
          <span className="eb-chip">
            {getCategoryLabel(product.category)}
          </span>
          {discountPercent > 0 && (
            <span className="eb-chip-discount">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* برچسب برند */}
        <span className="eb-brand-tag">
          {product.brand.toUpperCase()}
        </span>
      </div>

      {/* بدنه و اطلاعات کارت به سبک EyeBot */}
      <div className="eb-card-body">
        <h3 className="eb-card-title" title={product.nameFa}>
          {product.nameFa}
        </h3>
        <div className="eb-card-title-en">
          {product.nameEn}
        </div>

        {/* ویژگی فنی کالیبره شده */}
        <div className="eb-spec-box">
          <Zap className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{product.highlightSpec}</span>
        </div>

        {/* امتیاز و وضعیت موجودی آزمایشگاه */}
        <div className="eb-rating-row">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-[#fbbf24] text-[#fbbf24]" />
            <span className="font-bold text-white text-xs font-mono">{product.rating}</span>
            <span className="text-slate-400 text-xs">({product.reviewsCount})</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-[#bef264] font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>موجود در انبار ({product.stockCount})</span>
          </div>
        </div>

        {/* فوتر قیمت و دکمه خرید */}
        <div className="eb-card-footer">
          <div className="eb-price-block">
            {product.originalPrice && (
              <span className="eb-old-price">
                {product.originalPrice.toLocaleString('fa-IR')}
              </span>
            )}
            <div className="eb-current-price">
              <span>{product.price.toLocaleString('fa-IR')}</span>
              <span className="eb-toman">تومان</span>
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="eb-add-btn"
            title="افزودن به سبد سفارش"
            aria-label={`افزودن ${product.nameFa} به سبد`}
          >
            {added ? (
              <Check className="w-5 h-5 text-black stroke-[3]" />
            ) : (
              <ShoppingCart className="w-5 h-5 text-black" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
