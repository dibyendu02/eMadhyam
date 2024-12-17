// types/product.ts

export interface ProductCardProps {
  /** Name of the product */
  name: string;
  /** Current selling price */
  price: number;
  /** Original price before discount */
  originalPrice?: number;
  /** Discount percentage (if applicable) */
  discountPercentage?: number;
  /** Rating out of 5 */
  rating: number;
  /** Number of reviews */
  reviews?: number;
  /** URL of the product image */
  imageUrl: string;
  /** Callback function when add to cart is clicked */
  onAddToCart: () => void;
  /** Optional className for additional styling */
  className?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviews?: number;
  imageUrl: string;
  inStock: boolean;
  category: string;
  description?: string;
}
