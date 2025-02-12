// ProductCard.tsx
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { ProductCardProps } from "@/commons/types/product";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/store/slices/wishlistSlice";

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/plants/${product.id}`);
  };

  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("handleAddToCart clicked");
    e.stopPropagation();
    console.log("Product being added:", product);
    dispatch(addToCart(product));
    console.log("Add to cart action dispatched");
  };

  const handleWishlistToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("handleWishlistToggle clicked");
    e.stopPropagation();
    if (isInWishlist) {
      console.log("Removing from wishlist:", product.id);
      dispatch(removeFromWishlist(product.id));
    } else {
      console.log("Adding to wishlist:", product);
      dispatch(addToWishlist(product));
    }
    console.log("Wishlist action dispatched");
  };

  // Add this near the top of your component
  useEffect(() => {
    console.log("Current wishlist items:", wishlistItems);
  }, [wishlistItems]);

  const cartItems = useAppSelector((state) => state.cart.items);
  useEffect(() => {
    console.log("Current cart items:", cartItems);
  }, [cartItems]);

  return (
    <div
      className={`group relative w-full bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleNavigate}
      // role="button"
    >
      <div className="p-4">
        {/* Discount Badge */}
        {product.discountPercentage && (
          <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            {product.discountPercentage}% off
          </div>
        )}

        {/* Product Image Container */}
        <div className="relative w-full h-24 md:h-64 mb-3 overflow-hidden rounded-lg">
          <Image
            src={product.imageUrls ? product.imageUrls[0] : "/placeholder.jpg"}
            alt={product.name}
            fill
            className={`object-cover transform transition-transform duration-500 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>

        {/* Content Container - applies blur effect on hover */}
        <div
          className={`relative transition-opacity duration-300 ${
            isHovered ? "opacity-90" : "opacity-100"
          }`}
        >
          <h3 className="text-gray-800 font-medium text-lg mb-1">
            {product.name}
          </h3>

          {/* Price Section */}
          <div className="flex  items-center gap-2 mb-1">
            <span className="text-gray-900 font-bold text-xl">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-sm">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`text-sm md:text-lg ${
                  index < product.rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}

            {product.reviews && (
              <span className="text-gray-500 text-sm ml-2">
                ({product.reviews})
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-grow bg-green-500 hover:bg-green-600 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors"
            >
              Add to cart
            </button>
            <button
              className={`p-2.5 rounded-lg transition-all duration-300 ${
                isInWishlist
                  ? "bg-red-50 hover:bg-red-100"
                  : "hover:bg-gray-100"
              }`}
              aria-label="Add to wishlist"
              onClick={handleWishlistToggle}
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isInWishlist
                    ? "text-red-500 fill-red-500"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
