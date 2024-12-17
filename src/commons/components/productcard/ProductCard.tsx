// ProductCard.tsx
import React, { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { ProductCardProps } from "@/commons/types/product";

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  originalPrice,
  discountPercentage,
  rating,
  reviews,
  imageUrl,
  onAddToCart,
  className = "",
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative w-full bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4">
        {/* Discount Badge */}
        {discountPercentage && (
          <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            {discountPercentage}% off
          </div>
        )}

        {/* Product Image Container */}
        <div className="relative w-full h-64 mb-4 overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt={name}
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
          <h3 className="text-gray-800 font-medium text-lg mb-2">{name}</h3>

          {/* Price Section */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-900 font-bold text-xl">₹{price}</span>
            {originalPrice && (
              <span className="text-gray-400 line-through text-sm">
                ₹{originalPrice}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`text-lg ${
                  index < rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
            {reviews && (
              <span className="text-gray-500 text-sm ml-2">
                ({reviews} reviews)
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onAddToCart}
              className="flex-grow bg-green-500 hover:bg-green-600 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors"
            >
              Add to cart
            </button>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2.5 rounded-lg transition-all duration-300 ${
                isLiked ? "bg-red-50 hover:bg-red-100" : "hover:bg-gray-100"
              }`}
              aria-label="Add to wishlist"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isLiked
                    ? "text-red-500 fill-red-500"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Hover Overlay */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 rounded-xl ${
          isHovered ? "opacity-5" : "opacity-0"
        }`}
      />
    </div>
  );
};

export default ProductCard;
