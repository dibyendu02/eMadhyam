// ProductCard.tsx
"use client";
import { ProductCardProps } from "@/commons/types/product";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCartAsync } from "@/store/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/store/slices/wishlistSlice";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);
  const { isLoading } = useAppSelector((state) => state.cart);

  const handleNavigate = () => {
    router.push(`/plants/${product._id}`);
  };

  const isInWishlist = wishlistItems.some((item) => item._id === product._id);

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!user?._id) {
      toast.error("Please login to add to cart.", {
        duration: 2000,
      });
      return;
    }

    try {
      await dispatch(
        addToCartAsync({
          product,
          userId: user._id,
        })
      ).unwrap();
      toast.success("Added to cart!", {
        duration: 2000,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to add to cart. Please try again.";
      toast.error(errorMessage, {
        duration: 2000,
      });
      console.error("Cart sync error:", error);
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("handleWishlistToggle clicked");
    e.stopPropagation();
    if (isInWishlist) {
      console.log("Removing from wishlist:", product._id);
      dispatch(removeFromWishlist(product._id));
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

  // useEffect(() => {
  //   console.log("Current cart items:", cartItems);
  // }, [cartItems]);

  return (
    <div
      className={`group relative w-full bg-white border border-gray-200 rounded-md  md:rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleNavigate}
      // role="button"
    >
      <div className="p-2 md:p-4 flex flex-col h-[300px] md:h-[360px]">
        {/* Discount Badge */}
        {product.discountPercentage && (
          <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            {product.discountPercentage}% off
          </div>
        )}

        {/* Product Image Container */}
        <div className="relative w-full h-28 md:h-48 mb-3 overflow-hidden rounded-lg">
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
          className={`relative flex flex-col flex-grow transition-opacity duration-300 ${
            isHovered ? "opacity-90" : "opacity-100"
          }`}
        >
          <h3 className="text-gray-800 font-medium text-lg mb-1 line-clamp-2 min-h-[3.5rem]">
            {product.name}
          </h3>

          {/* Price Section */}
          <div className="flex items-center gap-2 mb-1 h-7">
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
          <div className="flex items-center gap-1 mb-2 h-6">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`text-sm md:text-lg ${
                  index < 4 ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}

            {/* {product.reviews && ( */}
            <span className="text-gray-500 text-sm ml-2">
              {/* ({product.reviews}) */}2
            </span>
            {/*  )} */}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3 mt-auto">
            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className={`flex-grow ${
                isLoading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
              } text-white py-2.5 px-4 rounded-lg text-xs md:text-sm font-medium transition-colors`}
            >
              {isLoading ? "Adding..." : "Add to cart"}
            </button>
            <button
              className={`p-1.5 md:p-2.5 rounded-lg transition-all duration-300 ${
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
