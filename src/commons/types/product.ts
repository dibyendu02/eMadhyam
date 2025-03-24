// types/product.ts

// import { CategoryType, ColorType } from "@/services/types/product";

export interface ProductCardProps {
  product: Product;

  /** Optional className for additional styling */
  className?: string;
}

// types/product.ts
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
  faqs: { question: string; answer: string }[];
  weight?: string;
  dimensions?: string;
  waterRequirement?: string;
  sunlightRequirement?: string;
  isBestseller?: boolean;
  isTrending?: boolean;
  isCodAvailable?: boolean; // Add this property for COD availability
  productType?: ProductType;
  plantType?: PlantType;
  reviews?: number;
  rating?: number;
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

export interface ProductType {
  _id: string;
  name: string;
  __v: number;
}

export interface PlantType {
  _id: string;
  name: string;
  __v: number;
}
