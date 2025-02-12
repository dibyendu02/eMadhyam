// types/product.ts

import {
  ProductCategory,
  ProductSeason,
  ProductColor,
  ProductPlantType,
  ProductType,
} from "../constants";

export interface ProductCardProps {
  product: Product;

  /** Optional className for additional styling */
  className?: string;
}

export interface Product {
  id: string;
  name: string;
  shortDescription?: string;
  description?: string;
  rating: number;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  sizeRanzes?: string[];
  inStock: boolean;
  reviews?: number;
  imageUrls?: string[];
  category: ProductCategory;
  season: ProductSeason;
  color: ProductColor;
  plantType: ProductPlantType;
  productType: ProductType;
  isBestSeller: boolean;
  isTrending: boolean;
  createdAt: Date;
}


export interface CartItem extends Product {
  quantity: number;
}