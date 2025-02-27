import ProductCardLoading from "@/commons/components/productcard/components/ProductCardLoading";
import ProductCard from "@/commons/components/productcard/ProductCard";
import { useAppSelector } from "@/store/hooks";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

const TrendingAndBestSellers: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"trending" | "bestsellers">(
    "trending"
  );
  const [isAnimating, setIsAnimating] = useState(false);

  const {
    items: products,
    loading,
    error,
  } = useAppSelector((state) => state.products);

  const trendingProducts = products;
  const bestsellerProducts = products;

  // const trendingProducts = products.filter((product) => product.isTrending);
  // const bestsellerProducts = products.filter((product) => product.isBestSeller);

  const currentProducts =
    activeTab === "trending" ? trendingProducts : bestsellerProducts;

  const handleTabChange = (tab: "trending" | "bestsellers") => {
    if (tab !== activeTab && !isAnimating) {
      setIsAnimating(true);
      setActiveTab(tab);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Tab Navigation */}
        <div className="flex items-center justify-center mb-12">
          <div className="inline-flex bg-gray-100 rounded-full p-1 relative">
            {/* Sliding Background */}
            <div
              className="absolute h-[calc(100%-8px)] top-1 rounded-full bg-green-500 transition-all duration-300 ease-in-out"
              style={{
                width: "calc(50% - 4px)",
                left: activeTab === "trending" ? "4px" : "calc(50% + 4px)",
              }}
            />

            {/* Buttons */}
            <button
              onClick={() => handleTabChange("trending")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 relative z-10
                ${
                  activeTab === "trending"
                    ? "text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              disabled={isAnimating}
            >
              Trending
            </button>
            <button
              onClick={() => handleTabChange("bestsellers")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 relative z-10
                ${
                  activeTab === "bestsellers"
                    ? "text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              disabled={isAnimating}
            >
              Best Sellers
            </button>
          </div>
        </div>

        {/* Products Section */}
        <div className="relative overflow-hidden">
          {/* Navigation Arrows */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 lg:-translate-x-16 
              bg-white/80 hover:bg-white p-2 rounded-full shadow-lg backdrop-blur-sm
              transition-all duration-300 hover:scale-110 z-10"
            aria-label="Previous products"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 lg:translate-x-16 
              bg-white/80 hover:bg-white p-2 rounded-full shadow-lg backdrop-blur-sm
              transition-all duration-300 hover:scale-110 z-10"
            aria-label="Next products"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>

          {/* Products Grid with Animation */}
          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-8 md:grid-cols-3 lg:grid-cols-4">
              {new Array(4).fill(0).map((_, index) => (
                <div key={index} className="opacity-1">
                  <ProductCardLoading />
                </div>
              ))}
            </div>
          ) : (
            <div
              key={activeTab}
              className="grid grid-cols-2 gap-4 sm:gap-8 md:grid-cols-3 lg:grid-cols-4"
            >
              {currentProducts.map((product, index) => (
                <div
                  key={product._id}
                  className="opacity-0"
                  style={{
                    animation: `fadeSlideIn 0.6s ease-out ${
                      index * 100
                    }ms forwards`,
                  }}
                >
                  <ProductCard key={product._id} product={product} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 
            text-white rounded-full font-medium transition-all duration-300 hover:gap-3 hover:shadow-lg"
          >
            View All {activeTab === "trending" ? "Trending" : "Best Selling"}{" "}
            Products
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendingAndBestSellers;
