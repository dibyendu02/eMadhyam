// types/product.ts

// import { CategoryType, ColorType } from "@/services/types/product";

export interface ProductCardProps {
  product: Product;

  /** Optional className for additional styling */
  className?: string;
}

export interface Product {
  _id: string;
  name: string;
  imageUrls: string[];
  category: CategoryType;
  season: string;
  color: ColorType;
  shortDescription?: string;
  description?: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  sizeRanges?: string[];
  inStock: boolean;
  faqs: { key: string; value: string }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CategoryType {
  _id: string;
  name: string;
  __v: number;
}

export interface ColorType {
  _id: string;
  name: string;
  __v: number;
}
