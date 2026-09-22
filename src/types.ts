export type CategoryType = 'all' | 'cpu' | 'gpu' | 'ram';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  nameFa: string;
  nameEn: string;
  category: 'cpu' | 'gpu' | 'ram';
  categoryFa: string;
  price: number;
  originalPrice?: number;
  brand: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  image: string;
  highlightSpec: string;
  shortDesc: string;
  fullDesc: string;
  specs: ProductSpec[];
  warranty: string;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
