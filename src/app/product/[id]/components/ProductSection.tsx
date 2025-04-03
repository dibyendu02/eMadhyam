import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCartAsync } from "@/store/slices/cartSlice";
import { Check, Share2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import ProductSectionLoading from "./ProductSectionLoading";
import toast from "react-hot-toast";

const ProductSection: React.FC = ({}) => {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);

  const { currentProduct, loading, error } = useAppSelector(
    (state) => state.products
  );

  const cartItems = useAppSelector((state) => state.cart.items);
  const isInCart = cartItems.some((item) => item._id === currentProduct?._id);

  // Get current URL when component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

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
    e.stopPropagation();

    if (!user?._id) {
      toast.error("Please login to continue.", {
        duration: 2000,
      });
      return;
    }

    if (!isInCart) {
      if (currentProduct != null)
        await dispatch(
          addToCartAsync({
            product: currentProduct,
            userId: user._id,
          })
        ).unwrap();
    }
    router.push(`/cart`);
  };

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const handleShareToSocial = (platform: string) => {
    let shareUrl = "";
    const text = `Check out ${currentProduct?.name} on our store!`;

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          currentUrl
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          currentUrl
        )}&text=${encodeURIComponent(text)}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          text + " " + currentUrl
        )}`;
        break;
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
          currentUrl
        )}&text=${encodeURIComponent(text)}`;
        break;
      case "copy":
        navigator.clipboard
          .writeText(currentUrl)
          .then(() => {
            toast.success("Link copied to clipboard!");
            setIsShareModalOpen(false);
          })
          .catch(() => {
            toast.error("Failed to copy link");
          });
        return;
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer");
    setIsShareModalOpen(false);
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
        <div className="space-y-6 ">
          <h1 className="text-2xl font-semibold text-gray-900">
            {currentProduct?.name}
          </h1>

          <p className="text-gray-600">{currentProduct?.shortDescription}</p>

          {/* Tags - Now includes COD availability */}
          <div className="flex flex-wrap gap-2">
            {currentProduct?.isBestseller && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                Best Seller
              </span>
            )}
            {currentProduct?.isTrending && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                Trending
              </span>
            )}
            {currentProduct?.inStock ? (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                In Stock
              </span>
            ) : (
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                Out of Stock
              </span>
            )}
            {currentProduct?.isCodAvailable ? (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                COD Available
              </span>
            ) : (
              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded">
                No COD
              </span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline space-x-2">
            <span className="text-gray-500 line-through">
              ₹{currentProduct?.originalPrice}
            </span>
            <span className="text-green-600 font-semibold text-xl">
              ₹{currentProduct?.price}
            </span>
            <span className="text-red-500">
              ({currentProduct?.discountPercentage}% off)
            </span>
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2 text-green-600">
            {currentProduct?.inStock ? (
              <>
                <Check className="w-5 h-5" />
                <span>In Stock</span>
              </>
            ) : (
              <>
                <X className="w-5 h-5 text-red-600" />
                <span className="text-red-600">Out of Stock</span>
              </>
            )}
          </div>

          {/* COD Warning Message */}
          {!currentProduct?.isCodAvailable && (
            <div className="bg-orange-50 border border-orange-200 text-orange-800 p-3 rounded-md text-sm">
              This product is not available for cash on delivery. Please use
              online payment.
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4 ">
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
          <div className="grid grid-cols-1 gap-3">
            <button
              className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
              onClick={handleAddToCart}
              disabled={!currentProduct?.inStock}
            >
              {isInCart ? "Go to Cart" : "Add to Cart"}
            </button>

            {/* Share Button */}
            <button
              className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded text-gray-700 hover:bg-gray-50"
              onClick={handleShare}
            >
              <Share2 className="w-5 h-5" />
              Share
            </button>

            <button
              className="w-full border border-gray-200 py-3 rounded text-white hover:bg-orange-500 bg-orange-400"
              onClick={handleBuyNowClick}
              disabled={!currentProduct?.inStock}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Share this product
              </h3>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleShareToSocial("facebook")}
                className="flex items-center justify-center gap-2 p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                <span>Facebook</span>
              </button>

              <button
                onClick={() => handleShareToSocial("twitter")}
                className="flex items-center justify-center gap-2 p-3 rounded-lg bg-sky-500 text-white hover:bg-sky-600"
              >
                <span>Twitter</span>
              </button>

              <button
                onClick={() => handleShareToSocial("whatsapp")}
                className="flex items-center justify-center gap-2 p-3 rounded-lg bg-green-500 text-white hover:bg-green-600"
              >
                <span>WhatsApp</span>
              </button>

              <button
                onClick={() => handleShareToSocial("telegram")}
                className="flex items-center justify-center gap-2 p-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              >
                <span>Telegram</span>
              </button>
            </div>

            <div className="mt-4">
              <div className="flex">
                <input
                  type="text"
                  value={currentUrl}
                  readOnly
                  className="flex-1 border border-r-0 rounded-l-md px-4 py-2 text-sm bg-gray-50 text-gray-900"
                />
                <button
                  onClick={() => handleShareToSocial("copy")}
                  className="bg-gray-100 border border-l-0 rounded-r-md px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSection;
