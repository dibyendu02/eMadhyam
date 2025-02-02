import React, { useState } from "react";
import Image from "next/image";
import { Star, Check } from "lucide-react";
import { dummyProductData } from "@/app/dummydata";

const productData = dummyProductData[0]; // Use the first product for now

const ProductPage: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [pinCode, setPinCode] = useState("");

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white">
      <div className="text-sm text-gray-600 mb-4">
        Home / {productData.category} / {productData.name}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column - Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square bg-white rounded-lg overflow-hidden border relative">
            <Image
              src={productData.imageUrls?.[0] || "/images/placeholder.jpg"}
              alt={productData.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex space-x-2 overflow-x-auto">
            {(productData.imageUrls || ["/images/placeholder.jpg"]).map(
              (thumb, idx) => (
                <div
                  key={idx}
                  className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border relative"
                >
                  <Image
                    src={thumb}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="50px"
                  />
                </div>
              )
            )}
          </div>
        </div>

        {/* Right column - Product details */}
        <div className="space-y-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            {productData.name}
          </h1>

          <p className="text-gray-600">{productData.shortDescription}</p>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, idx) => (
                <Star
                  key={idx}
                  className={`w-5 h-5 ${
                    idx < Math.floor(productData.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-700">
              ({productData.rating} | {productData.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline space-x-2">
            <span className="text-gray-500 line-through">
              ₹{productData.originalPrice}
            </span>
            <span className="text-green-600 font-semibold text-xl">
              ₹{productData.price}
            </span>
            <span className="text-red-500">
              ({productData.discountPercentage}% off)
            </span>
          </div>

          {/* Size Selector */}
          <div className="space-y-2">
            <p className="font-medium text-gray-900">Select Plant Size</p>
            <div className="flex space-x-2">
              {["Small", "Medium", "Large"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded border ${
                    selectedSize === size
                      ? "border-green-600 text-green-600 bg-green-50"
                      : "border-gray-200 text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2 text-green-600">
            <Check className="w-5 h-5" />
            <span>{productData.inStock ? "In Stock" : "Out of Stock"}</span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Qty.</span>
            <div className="flex items-center border rounded">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 border-r text-gray-600 hover:bg-gray-50"
              >
                -
              </button>
              <span className="px-4 py-1 text-gray-700">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 border-l text-gray-600 hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart and Buy Now */}
          <button className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700">
            Add to cart
          </button>
          <button className="w-full border border-gray-200 py-3 rounded text-gray-700 hover:bg-gray-50">
            Buy Now
          </button>

          {/* Highlights */}
          <div className="space-y-2">
            <p className="font-medium text-gray-900">Highlights</p>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">{productData.description}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
