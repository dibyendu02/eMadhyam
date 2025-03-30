// src/app/search/components/ProductGrid.tsx
import React from "react";
import ProductCard from "@/commons/components/productcard/ProductCard";
import { Product } from "@/commons/types/product";
import { useAppSelector } from "@/store/hooks";
import ProductCardLoading from "@/commons/components/productcard/components/ProductCardLoading";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const { loading, error } = useAppSelector((state) => state.products);

  if (loading) {
    return (
      <div className="w-full ">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {new Array(6).fill(0).map((_, index) => (
            <div key={index} className="opacity-1">
              <ProductCardLoading />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {products.length === 0 || error ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900">
            No products found
          </h2>
          <p className="mt-2 text-gray-500">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
