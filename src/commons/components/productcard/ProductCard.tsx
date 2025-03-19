"use client";
import { ProductCardProps } from "@/commons/types/product";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCartAsync } from "@/store/slices/cartSlice";
import {
  addToWishlistAsync,
  removeFromWishlistAsync,
} from "@/store/slices/wishlistSlice";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);
  const { items: wishlistItems, isLoading: wishlistLoading } = useAppSelector(
    (state) => state.wishlist
  );
  const { items: cartItems } = useAppSelector((state) => state.cart);

  const handleNavigate = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest("button")) {
      router.push(`/plants/${product._id}`);
    }
  };

  const isInWishlist = wishlistItems.some((item) => item._id === product._id);

  // Find product in cart and get its quantity
  const productInCart = cartItems.find((item) => item._id === product._id);
  const quantityInCart = productInCart ? productInCart.quantity : 0;

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!user?._id) {
      toast.error("Please login to add to cart.", { duration: 2000 });
      return;
    }

    try {
      setIsAddingToCart(true);

      await dispatch(
        addToCartAsync({
          product,
          userId: user._id,
        })
      ).unwrap();
      toast.success("Added to cart!", { duration: 2000 });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to add to cart.",
        { duration: 2000 }
      );
      console.error("Cart sync error:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlistToggle = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();

    if (!user?._id) {
      toast.error("Please login to manage your wishlist.", { duration: 2000 });
      return;
    }

    try {
      if (isInWishlist) {
        await dispatch(
          removeFromWishlistAsync({ productId: product._id, userId: user._id })
        ).unwrap();
        toast.success("Removed from wishlist!", { duration: 2000 });
      } else {
        await dispatch(
          addToWishlistAsync({ product, userId: user._id })
        ).unwrap();
        toast.success("Added to wishlist!", { duration: 2000 });
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update wishlist.",
        { duration: 2000 }
      );
      console.error("Wishlist sync error:", error);
    }
  };

  return (
    <div
      className={`group relative w-full bg-white border border-gray-200 rounded-md md:rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleNavigate}
    >
      <div className="p-2 md:p-4 flex flex-col h-[300px] md:h-[360px]">
        {product.discountPercentage && (
          <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            {product.discountPercentage}% off
          </div>
        )}

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

        <div className="relative flex flex-col flex-grow transition-opacity duration-300">
          <h3 className="text-gray-800 font-medium text-lg mb-1 line-clamp-2 min-h-[3.5rem]">
            {product.name}
          </h3>

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

          <div className="flex items-center gap-1 mb-2 h-6">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={index < 4 ? "text-yellow-400" : "text-gray-300"}
              >
                ★
              </span>
            ))}
            <span className="text-gray-500 text-sm ml-2">2</span>
          </div>

          <div className="flex items-center gap-2 md:gap-3 mt-auto">
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className={`flex-grow ${
                isAddingToCart
                  ? "bg-gray-400"
                  : "bg-green-500 hover:bg-green-600"
              } text-white py-2.5 px-4 rounded-lg text-xs md:text-sm font-medium transition-colors flex items-center justify-center gap-1`}
            >
              {isAddingToCart ? (
                "Adding..."
              ) : (
                <>
                  <ShoppingCart size={16} />
                  {quantityInCart > 0
                    ? `Add (${quantityInCart} in cart)`
                    : "Add to cart"}
                </>
              )}
            </button>
            <button
              className={`p-1.5 md:p-2.5 rounded-lg transition-all duration-300 ${
                isInWishlist
                  ? "bg-red-50 hover:bg-red-100"
                  : "hover:bg-gray-100"
              }`}
              aria-label={
                isInWishlist ? "Remove from wishlist" : "Add to wishlist"
              }
              onClick={handleWishlistToggle}
              disabled={wishlistLoading}
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  wishlistLoading
                    ? "text-gray-400"
                    : isInWishlist
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
