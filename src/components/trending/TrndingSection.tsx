import ProductCardLoading from "@/commons/components/productcard/components/ProductCardLoading";
import ProductCard from "@/commons/components/productcard/ProductCard";
import { useAppSelector } from "@/store/hooks";
// import { ChevronRight } from "lucide-react";
import React from "react";

// TrendingSection Component
const TrendingSection: React.FC = () => {
  const {
    items: products,
    loading,
    error,
  } = useAppSelector((state) => state.products);

  // Filter trending products
  const trendingProducts = products.filter((product) => product.isTrending);

  if (error) {
    return <div>Error loading trending products: {error}</div>;
  }

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="hidden md:block mb-10 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trending Now
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay ahead with our most popular picks that are making waves in the
            plant community this season
          </p>
        </div>

        {/* Products Grid with Animation */}
        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-8 md:grid-cols-3 lg:grid-cols-4">
            {new Array(4).fill(0).map((_, index) => (
              <div key={index} className="opacity-1">
                <ProductCardLoading />
              </div>
            ))}
          </div>
        ) : trendingProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-8 md:grid-cols-3 lg:grid-cols-4">
            {trendingProducts.slice(0, 8).map((product, index) => (
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
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No trending products available at the moment.
            </p>
          </div>
        )}

        {/* View All Button - Only show if there are products */}
        {/* {trendingProducts.length > 0 && (
          <div className="mt-12 text-center">
            <button
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 
              text-white rounded-full font-medium transition-all duration-300 hover:gap-3 hover:shadow-lg"
            >
              View All Trending Products
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};
export default TrendingSection;
