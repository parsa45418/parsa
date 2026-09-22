import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { SystemScannerModal } from './components/SystemScannerModal';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product, CategoryType, CartItem } from './types';
import { ShoppingBag, AlertCircle, CheckCircle2, RotateCcw, Activity } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLightTheme, setIsLightTheme] = useState<boolean>(false);

  // تغییر کلاس تم روی تگ body
  useEffect(() => {
    if (isLightTheme) {
      document.body.classList.add('eb-light-theme');
    } else {
      document.body.classList.remove('eb-light-theme');
    }
  }, [isLightTheme]);

  // لود سبد خرید از حافظه مرورگر
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('eyebot_hardware_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // ذخیره تغییرات سبد خرید
  useEffect(() => {
    try {
      localStorage.setItem('eyebot_hardware_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  // افزودن تک کالا به سبد
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`«${product.nameFa.slice(0, 30)}...» به سبد سفارش اضافه شد.`);
  };

  // افزودن پکیج سه قطعه نسخه اسکنر
  const handleAddMultipleToCart = (productsToAdd: Product[]) => {
    setCartItems((prev) => {
      let updated = [...prev];
      for (const prod of productsToAdd) {
        const existingIdx = updated.findIndex((i) => i.product.id === prod.id);
        if (existingIdx > -1) {
          updated[existingIdx] = {
            ...updated[existingIdx],
            quantity: updated[existingIdx].quantity + 1,
          };
        } else {
          updated.push({ product: prod, quantity: 1 });
        }
      }
      return updated;
    });
    showToast('هر ۳ قطعه نسخه سخت‌افزاری کالیبره شده به سبد خرید اضافه شدند.');
    setIsCartOpen(true);
  };

  // تغییر تعداد کالا در سبد
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // لیست برندهای دسته‌بندی فعلی
  const availableBrands = useMemo(() => {
    const list = selectedCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);
    return Array.from(new Set(list.map((p) => p.brand)));
  }, [selectedCategory]);

  // فیلتر و مرتب‌سازی محصولات
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedBrand !== 'all') {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.nameFa.toLowerCase().includes(q) ||
          p.nameEn.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.highlightSpec.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [selectedCategory, selectedBrand, searchQuery, sortBy]);

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col font-sans" dir="rtl">
      {/* پیام موقت تلمتری (Toast) */}
      {toastMessage && (
        <div
          id="cart-toast"
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#080a0f] border border-[#bef264] text-white px-5 py-3 rounded-full shadow-[0_0_25px_rgba(190,242,100,0.3)] backdrop-blur-md flex items-center gap-3 text-xs sm:text-sm font-mono animate-bounce"
        >
          <CheckCircle2 className="w-4 h-4 text-[#bef264] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* هدر سایت به سبک EyeBot */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenScanner={() => setIsScannerOpen(true)}
        isLightTheme={isLightTheme}
        onToggleTheme={() => setIsLightTheme(!isLightTheme)}
      />

      {/* بنر هیرو و شوکیس کیوسک سخت‌افزاری S1+ */}
      <HeroBanner
        onSelectCategory={setSelectedCategory}
        onOpenScanner={() => setIsScannerOpen(true)}
      />

      {/* انتخاب دسته‌بندی و فیلترها */}
      <main className="flex-1">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedBrand={selectedBrand}
          onSelectBrand={setSelectedBrand}
          availableBrands={availableBrands}
          sortBy={sortBy}
          onSortChange={setSortBy}
          filteredCount={filteredProducts.length}
        />

        {/* شبکه نمایش محصولات به سبک EyeBot */}
        <section className="max-w-[1320px] mx-auto px-4" id="products-list-section">
          {filteredProducts.length === 0 ? (
            <div className="bg-[#141924] border border-white/10 rounded-2xl p-12 text-center max-w-lg mx-auto my-12">
              <div className="w-16 h-16 rounded-full bg-[#080a0f] border border-[#bef264] text-[#bef264] flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-[#bef264]" />
              </div>
              <h3 className="text-lg font-black text-white mb-2 font-mono">[ 0 HARDWARE DETECTED ]</h3>
              <p className="text-xs text-slate-400 mb-6">
                هیچ قطعه‌ای مطابق با پارامترهای جستجو یا فیلترهای انتخابی یافت نشد.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedBrand('all');
                  setSearchQuery('');
                }}
                className="eb-pill-btn eb-pill-btn-accent"
              >
                <RotateCcw className="w-4 h-4" />
                <span>بازنشانی تمام فیلترها</span>
              </button>
            </div>
          ) : (
            <div className="eb-products-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenQuickView={setQuickViewProduct}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* مودال مشخصات فنی کامل (EyeBot Spec Sheet) */}
      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* اسکنر و کیوسک ۹۰ ثانیه‌ای انتخاب قطعات (Eyebot S1+ 90-Second Diagnostic) */}
      <SystemScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        products={PRODUCTS}
        onAddMultipleToCart={handleAddMultipleToCart}
      />

      {/* پنل کشویی سبد سفارش */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* دکمه شناور سبد خرید در موبایل هنگامی که سبد پر است */}
      {totalCartCount > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 left-6 z-40 sm:hidden bg-[#bef264] text-black p-3.5 rounded-full shadow-[0_0_20px_rgba(190,242,100,0.5)] flex items-center gap-2 font-black text-sm border-2 border-black"
          aria-label="مشاهده سبد سفارش"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="bg-black text-[#bef264] text-xs px-2 py-0.5 rounded-full font-mono">
            {totalCartCount}
          </span>
        </button>
      )}

      {/* دکمه شناور اسکنر ۹۰ ثانیه‌ای در موبایل */}
      <button
        onClick={() => setIsScannerOpen(true)}
        className="fixed bottom-6 right-6 z-40 sm:hidden bg-[#141924] text-[#bef264] p-3.5 rounded-full shadow-2xl flex items-center justify-center border border-[#bef264]/50"
        title="اسکن ۹۰ ثانیه‌ای قطعات"
        aria-label="اجرای اسکنر ۹۰ ثانیه‌ای"
      >
        <Activity className="w-5 h-5 animate-pulse" />
      </button>

      {/* فوتر به سبک Milkshake Studio & Eyebot */}
      <Footer
        onSelectCategory={setSelectedCategory}
        onOpenScanner={() => setIsScannerOpen(true)}
      />
    </div>
  );
}
