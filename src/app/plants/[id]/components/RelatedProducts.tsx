// RelatedProducts.tsx
import React from "react";
import { Product } from "@/commons/types/product";
import ProductCard from "@/commons/components/productcard/ProductCard";

interface RelatedProductsProps {
  products: Product[];
  className?: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  products,
  className = "",
}) => {
  return (
    <section className={`w-full max-w-7xl mx-auto px-4 py-12 ${className}`}>
      {/* Section Header */}
      <div className="mb-10 ">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Related Products
        </h2>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            originalPrice={product.originalPrice}
            discountPercentage={product.discountPercentage}
            rating={product.rating}
            reviews={product.reviews}
            imageUrl={
              product.imageUrls ? product.imageUrls[0] : "/placeholder.jpg"
            }
            onAddToCart={() => console.log(`Added ${product.name} to cart`)}
          />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
