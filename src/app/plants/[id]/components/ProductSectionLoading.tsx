import React from "react";

const ProductSectionLoading = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 bg-white mt-16 md:mt-4">
      {/* Breadcrumb loading */}
      <nav className="flex text-sm mb-4 space-x-2">
        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column - Images */}
        <div className="space-y-4">
          {/* Main Image loading */}
          <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>

          {/* Thumbnails loading */}
          <div className="flex space-x-2 overflow-x-auto">
            {[...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className="w-20 h-20 flex-shrink-0 bg-gray-200 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        </div>

        {/* Right column - Product details */}
        <div className="space-y-6">
          {/* Title loading */}
          <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse"></div>

          {/* Description loading */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Price loading */}
          <div className="flex items-baseline space-x-2">
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Size Selector loading */}
          <div className="space-y-4">
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex space-x-2">
              {["Small", "Medium", "Large"].map((_, idx) => (
                <div
                  key={idx}
                  className="h-10 w-20 bg-gray-200 rounded animate-pulse"
                ></div>
              ))}
            </div>
          </div>

          {/* Stock Status loading */}
          <div className="flex items-center space-x-2">
            <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Quantity Selector loading */}
          <div className="flex items-center space-x-4">
            <div className="h-5 w-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex items-center border rounded">
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Buttons loading */}
          <div className="h-12 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-12 w-full bg-gray-200 rounded animate-pulse"></div>

          {/* Highlights loading */}
          <div className="space-y-4">
            <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSectionLoading;
