import { Product } from "@/commons/types/product";
import { AppImages } from "../../public/images/images";
import { Collection } from "@/commons/types/collection";

export const dummyProductData: Product[] = [
  {
    id: "1",
    name: "Plant 1",
    price: 29.99,
    originalPrice: 39.99,
    discountPercentage: 25,
    rating: 4.5,
    reviews: 128,
    imageUrl: AppImages.plantImg1,
    inStock: true,
    category: "Plant",
    description: "This is a plant",
  },
  {
    id: "2",
    name: "Plant 2",
    price: 34.99,
    rating: 4.2,
    reviews: 89,
    imageUrl: AppImages.plantImg2,
    inStock: true,
    category: "Plant",
    description: "This is another plant",
  },
  {
    id: "3",
    name: "Plant 3",
    price: 24.99,
    originalPrice: 29.99,
    discountPercentage: 16,
    rating: 4.8,
    reviews: 256,
    imageUrl: AppImages.plantImg1,
    inStock: false,
    category: "Plant",
    description: "This is a third plant",
  },
  {
    id: "4",
    name: "Plant 4",
    price: 39.99,
    rating: 4.6,
    reviews: 167,
    imageUrl: AppImages.plantImg2,
    inStock: true,
    category: "Plant",
    description: "This is a fourth plant",
  },
];

export const trendingProducts: Product[] = [
  {
    id: "t1",
    name: "Monstera Deliciosa",
    price: 49.99,
    originalPrice: 69.99,
    discountPercentage: 28,
    rating: 4.8,
    reviews: 245,
    imageUrl: AppImages.plantImg1,
    inStock: true,
    category: "Indoor Plants",
    description:
      "Popular tropical plant known for its distinctive split leaves",
  },
  {
    id: "t2",
    name: "Snake Plant",
    price: 34.99,
    originalPrice: 44.99,
    discountPercentage: 22,
    rating: 4.7,
    reviews: 189,
    imageUrl: AppImages.plantImg2,
    inStock: true,
    category: "Air Purifying Plants",
    description: "Low-maintenance plant perfect for air purification",
  },
  {
    id: "t3",
    name: "Peace Lily",
    price: 29.99,
    rating: 4.9,
    reviews: 312,
    imageUrl: AppImages.plantImg3,
    inStock: true,
    category: "Flowering Plants",
    description: "Elegant flowering plant that thrives in low light",
  },
  {
    id: "t4",
    name: "Fiddle Leaf Fig",
    price: 59.99,
    originalPrice: 79.99,
    discountPercentage: 25,
    rating: 4.6,
    reviews: 167,
    imageUrl: AppImages.plantImg4,
    inStock: false,
    category: "Premium Plants",
    description: "Popular indoor tree with large, violin-shaped leaves",
  },
];

export const bestsellerProducts: Product[] = [
  {
    id: "b1",
    name: "Golden Pothos",
    price: 24.99,
    originalPrice: 34.99,
    discountPercentage: 29,
    rating: 4.9,
    reviews: 423,
    imageUrl: AppImages.plantImg5,
    inStock: true,
    category: "Hanging Plants",
    description: "Easy-care trailing plant with heart-shaped leaves",
  },
  {
    id: "b2",
    name: "Chinese Evergreen",
    price: 39.99,
    rating: 4.7,
    reviews: 289,
    imageUrl: AppImages.plantImg6,
    inStock: true,
    category: "Low Light Plants",
    description: "Beautiful foliage plant that tolerates low light conditions",
  },
  {
    id: "b3",
    name: "ZZ Plant",
    price: 44.99,
    originalPrice: 54.99,
    discountPercentage: 18,
    rating: 4.8,
    reviews: 356,
    imageUrl: AppImages.plantImg7,
    inStock: true,
    category: "Drought Resistant",
    description: "Nearly indestructible plant with glossy leaves",
  },
  {
    id: "b4",
    name: "Spider Plant",
    price: 19.99,
    originalPrice: 29.99,
    discountPercentage: 33,
    rating: 4.6,
    reviews: 278,
    imageUrl: AppImages.plantImg1, // Reusing first image as placeholder
    inStock: true,
    category: "Air Purifying Plants",
    description: "Classic hanging plant that produces many babies",
  },
];

export const collections: Collection[] = [
  {
    id: "1",
    title: "Indoor Plants",
    slug: "indoor-plants",
    imageUrl: AppImages.plantImg1,
    productCount: 48,
    featured: true,
  },
  {
    id: "2",
    title: "Pots & Planters",
    slug: "pots-planters",
    imageUrl: AppImages.plantImg1,
    productCount: 36,
    featured: true,
  },
  {
    id: "3",
    title: "Outdoor Plants",
    slug: "outdoor-plants",
    imageUrl: AppImages.plantImg1,
    productCount: 42,
    featured: true,
  },
  {
    id: "4",
    title: "Indoor Plants",
    slug: "indoor-plants",
    imageUrl: AppImages.plantImg1,
    productCount: 48,
    featured: true,
  },
];