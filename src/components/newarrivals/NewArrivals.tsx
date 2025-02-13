// NewArrivals.tsx
import ProductCardLoading from "@/commons/components/productcard/components/ProductCardLoading";
import ProductCard from "@/commons/components/productcard/ProductCard";
import { useAppSelector } from "@/store/hooks";
import React from "react";

interface NewArrivalsProps {
  className?: string;
}

const NewArrivals: React.FC<NewArrivalsProps> = ({ className = "" }) => {
  const {
    items: products,
    loading,
    error,
  } = useAppSelector((state) => state.products);

  const newArrivals = [...products]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 8);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className={`w-full max-w-7xl mx-auto px-4 py-12 ${className}`}>
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">New Arrivals</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our latest collection of beautiful indoor plants, perfect for
          any space
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:gap-8 md:grid-cols-3 lg:grid-cols-4">
          {new Array(8).fill(0).map((_, index) => (
            <div key={index} className="opacity-1">
              <ProductCardLoading />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-8 md:grid-cols-3 lg:grid-cols-4">
          {newArrivals.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      )}
    </section>
  );
};

export default NewArrivals;
