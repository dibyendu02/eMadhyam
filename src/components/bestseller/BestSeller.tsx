import ProductCardLoading from "@/commons/components/productcard/components/ProductCardLoading";
import ProductCard from "@/commons/components/productcard/ProductCard";
import { useAppSelector } from "@/store/hooks";
import { ChevronRight } from "lucide-react";

const BestsellerSection: React.FC = () => {
  const {
    items: products,
    loading,
    error,
  } = useAppSelector((state) => state.products);

  // Filter bestseller products
  const bestsellerProducts = products.filter((product) => product.isBestseller);

  if (error) {
    return <div>Error loading bestseller products: {error}</div>;
  }

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Best Sellers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our most-loved plants and accessories that have captured the hearts
            of plant enthusiasts everywhere
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
        ) : bestsellerProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-8 md:grid-cols-3 lg:grid-cols-4">
            {bestsellerProducts.slice(0, 8).map((product, index) => (
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
              No bestseller products available at the moment.
            </p>
          </div>
        )}

        {/* View All Button - Only show if there are products */}
        {/* {bestsellerProducts.length > 0 && (
          <div className="mt-12 text-center">
            <button
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 
                text-white rounded-full font-medium transition-all duration-300 hover:gap-3 hover:shadow-lg"
            >
              View All Best Selling Products
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default BestsellerSection;
