import React from "react";

const ProductCardLoading: React.FC = () => {
  return (
    <div className="group relative w-full bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="p-2 md:p-4">
        {/* Discount Badge Loading */}
        <div className="absolute top-4 left-4 z-10 h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>

        {/* Product Image Loading */}
        <div className="relative w-full h-24 md:h-48 mb-3 overflow-hidden rounded-lg bg-gray-200 animate-pulse"></div>

        {/* Content Container */}
        <div className="space-y-3">
          {/* Title Loading */}
          <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>

          {/* Price Section Loading */}
          <div className="flex items-center gap-2">
            <div className="h-7 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Rating Loading */}
          <div className="flex items-center gap-1">
            <div className="flex gap-1">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="h-5 w-5 bg-gray-200 rounded animate-pulse"
                ></div>
              ))}
            </div>
            <div className="h-4 w-8 bg-gray-200 rounded animate-pulse ml-2"></div>
          </div>

          {/* Actions Loading */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="flex-grow h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardLoading;
