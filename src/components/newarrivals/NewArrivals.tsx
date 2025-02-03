// NewArrivals.tsx
import React from "react";
import { Product } from "@/commons/types/product";
import ProductCard from "@/commons/components/productcard/ProductCard";

interface NewArrivalsProps {
  products: Product[];
  className?: string;
}

const NewArrivals: React.FC<NewArrivalsProps> = ({
  products,
  className = "",
}) => {
  const handleAddToCart = (productId: string) => {
    console.log("Adding to cart:", productId);
  };

  return (
    <section className={`w-full max-w-7xl mx-auto px-4 py-12 ${className}`}>
      {/* Section Header */}
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">New Arrivals</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our latest collection of beautiful indoor plants, perfect for
          any space
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            product={product}
            key={product.id}
            onAddToCart={() => handleAddToCart(product.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
