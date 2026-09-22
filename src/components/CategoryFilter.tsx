import React from 'react';
import { Cpu, CircuitBoard, Layers, SlidersHorizontal, ArrowUpDown, Filter } from 'lucide-react';
import { CategoryType } from '../types';
import { CATEGORIES } from '../data/products';

interface CategoryFilterProps {
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  selectedBrand: string;
  onSelectBrand: (brand: string) => void;
  availableBrands: string[];
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating';
  onSortChange: (sort: 'featured' | 'price-asc' | 'price-desc' | 'rating') => void;
  filteredCount: number;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedBrand,
  onSelectBrand,
  availableBrands,
  sortBy,
  onSortChange,
  filteredCount,
}) => {
  const getCategoryIcon = (catId: string) => {
    switch (catId) {
      case 'cpu':
        return <Cpu className="w-4 h-4" />;
      case 'gpu':
        return <CircuitBoard className="w-4 h-4" />;
      case 'ram':
        return <Layers className="w-4 h-4" />;
      default:
        return <SlidersHorizontal className="w-4 h-4" />;
    }
  };

  return (
    <section className="eb-categories-section" id="categories-section">
      <div className="eb-cat-nav-header">
        <div>
          <h2 className="eb-section-title">
            <span>کاتالوگ قطعات سخت‌افزار</span>
            <span className="eb-mono-tag bg-[#141924] border border-white/10 text-[#bef264] px-2.5 py-1 rounded-full text-xs">
              [{filteredCount} قطعه آماده تحویل]
            </span>
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            SELECT HARDWARE CATEGORY // CPU, GPU & DDR5 MEMORY
          </p>
        </div>

        {/* مرتب‌سازی کالاها */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-[#bef264]" />
          <span className="eb-mono-tag text-slate-400 text-xs hidden sm:inline">SORT BY:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="bg-[#141924] border border-white/15 text-white text-xs rounded-xl px-3 py-2 outline-none focus:border-[#bef264] font-mono cursor-pointer transition-all"
          >
            <option value="featured">پیشنهاد کارشناسی (FEATURED)</option>
            <option value="price-asc">ارزان‌ترین قیمت (PRICE: LOW TO HIGH)</option>
            <option value="price-desc">گران‌ترین قیمت (PRICE: HIGH TO LOW)</option>
            <option value="rating">بالاترین امتیاز (TOP RATED)</option>
          </select>
        </div>
      </div>

      {/* تب‌های دسته‌بندی با استایل EyeBot */}
      <div className="eb-category-pills">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              id={`category-btn-${cat.id}`}
              onClick={() => {
                onSelectCategory(cat.id as CategoryType);
                onSelectBrand('all');
              }}
              className={`eb-cat-btn ${isActive ? 'active' : ''}`}
            >
              {getCategoryIcon(cat.id)}
              <span>{cat.label}</span>
              <span className="eb-cat-counter">{cat.count}</span>
            </button>
          );
        })}
      </div>

      {/* فیلتر برندهای قطعات با استایل تگ‌های آزمایشگاهی */}
      {availableBrands.length > 1 && (
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10 flex-wrap text-xs">
          <div className="flex items-center gap-1.5 text-slate-400 font-mono">
            <Filter className="w-3.5 h-3.5 text-[#bef264]" />
            <span>FILTER BRAND:</span>
          </div>

          <button
            onClick={() => onSelectBrand('all')}
            className={`px-3 py-1 rounded-full font-mono text-xs transition-all ${
              selectedBrand === 'all'
                ? 'bg-white text-black font-bold'
                : 'bg-[#141924] text-slate-300 hover:text-white border border-white/10'
            }`}
          >
            ALL BRANDS
          </button>

          {availableBrands.map((brand) => (
            <button
              key={brand}
              onClick={() => onSelectBrand(brand)}
              className={`px-3 py-1 rounded-full font-mono text-xs transition-all ${
                selectedBrand === brand
                  ? 'bg-[#bef264] text-black font-bold shadow-[0_0_10px_rgba(190,242,100,0.3)]'
                  : 'bg-[#141924] text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              {brand.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};
