import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCartAsync } from "@/store/slices/cartSlice";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ProductSectionLoading from "./ProductSectionLoading";
import toast from "react-hot-toast";

const ProductSection: React.FC = ({}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);

  const { currentProduct, loading, error } = useAppSelector(
    (state) => state.products
  );

  const cartItems = useAppSelector((state) => state.cart.items);
  const isInCart = cartItems.some((item) => item._id === currentProduct?._id);

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!user?._id) {
      toast.error("Please login to add to cart.", {
        duration: 2000,
      });
      return;
    }

    try {
      if (currentProduct == null) return;
      await dispatch(
        addToCartAsync({
          product: currentProduct,
          userId: user._id,
        })
      ).unwrap();
      toast.success("Added to cart!", {
        duration: 2000,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to add to cart. Please try again.";
      toast.error(errorMessage, {
        duration: 2000,
      });
      console.error("Cart sync error:", error);
    }
  };

  const handleBuyNowClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("handleBuyNowClick clicked");
    e.stopPropagation();
    console.log("Buy now clicked");
    if (!isInCart) {
      if (currentProduct != null)
        await dispatch(
          addToCartAsync({
            product: currentProduct,
            userId: user._id,
          })
        ).unwrap();
    }
    console.log("Add to cart action dispatched");
    router.push(`/cart`);
  };

  // Show loading state during initial load or when loading flag is true
  if (!currentProduct && !error) {
    return <ProductSectionLoading />;
  }

  // Then check for error state
  if (error || (!currentProduct && !loading)) {
    return (
      <div className="text-center p-12 mt-16 md:mt-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Product not found
        </h2>
        <p className="mt-2 text-gray-500">
          The product you are looking for may have been removed or is no longer
          available.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
        >
          Go back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white mt-16 md:mt-4">
      <nav className="flex text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-gray-700">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{currentProduct?.category.name} </span>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{currentProduct?.name} </span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column - Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square bg-white rounded-lg overflow-hidden border relative">
            <Image
              src={
                currentProduct?.imageUrls?.[currentImageIndex] ||
                "/images/placeholder.jpg"
              }
              alt={`${currentProduct?.name} - View ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex space-x-2 overflow-x-auto">
            {(currentProduct?.imageUrls || ["/images/placeholder.jpg"]).map(
              (thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border relative ${
                    currentImageIndex === idx
                      ? "border-2 border-green-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={thumb}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="50px"
                  />
                </button>
              )
            )}
          </div>
        </div>

        {/* Right column - Product details */}
        <div className="space-y-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            {currentProduct?.name}
          </h1>

          <p className="text-gray-600">{currentProduct?.shortDescription}</p>

          {/* Rating */}
          {/* <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, idx) => (
                <Star
                  key={idx}
                  className={`w-5 h-5 ${
                    idx < Math.floor(currentProduct?.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-700">
              ({currentProduct?.rating} | {currentProduct?.reviews} reviews)
            </span>
          </div> */}

          {/* Price */}
          <div className="flex items-baseline space-x-2">
            <span className="text-gray-500 line-through">
              ₹{currentProduct?.originalPrice}
            </span>
            <span className="text-green-600 font-semibold text-xl">
              ₹{currentProduct?.originalPrice}
            </span>
            <span className="text-red-500">
              ({currentProduct?.discountPercentage}% off)
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
            <span>{currentProduct?.inStock ? "In Stock" : "Out of Stock"}</span>
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
          <button
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
            onClick={handleAddToCart}
          >
            {isInCart ? "Go to Cart" : "Add to Cart"}
          </button>
          <button
            className="w-full border border-gray-200 py-3 rounded text-gray-700 hover:bg-gray-50"
            onClick={handleBuyNowClick}
          >
            Buy Now
          </button>

          {/* Highlights */}
          {/* <div className="space-y-2">
            <p className="font-medium text-gray-900">Highlights</p>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">
                  {currentProduct?.description}
                </span>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
