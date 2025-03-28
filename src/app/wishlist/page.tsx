"use client";

import Navbar from "@/commons/components/navbar/Navbar";
import ProductCard from "@/commons/components/productcard/ProductCard";
import SubHeader from "@/commons/components/subheader/SubHeader";
import BottomNavbar from "@/components/bottomNavbar/BottomNavbar";
import Footer from "@/components/footer/Footer";
import WhatsAppButton from "@/components/whatsappButton/WhatsappButton";
import { useAppSelector } from "@/store/hooks";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const WishlistPage = () => {
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const [currentSort, setCurrentSort] = useState("name-asc");

  const sortedProducts = useMemo(() => {
    return [...wishlistItems].sort((a, b) => {
      switch (currentSort) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return 0;
      }
    });
  }, [wishlistItems, currentSort]);

  return (
    <div className=" flex flex-col bg-white ">
      <Navbar />
      <SubHeader />
      <div className="bg-white border-b border-gray-200 mt-16 md:mt-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          {/* Breadcrumb */}
          <nav className="flex text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-gray-700">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Wishlist</span>
          </nav>

          {/* Header Content */}
          <div className="flex items-center justify-end md:justify-between">
            <div className="flex flex-1 md:flex-none justify-between md:justify-start items-center gap-4 ">
              <div className="relative inline-block text-left">
                <select
                  value={currentSort}
                  onChange={(e) => setCurrentSort(e.target.value)}
                  className="w-full min-w-[200px] appearance-none bg-white text-gray-700 border border-gray-200 rounded-lg pl-4 pr-10 py-2.5 text-sm hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 cursor-pointer shadow-sm transition-colors duration-200"
                >
                  <option value="name-asc">Name, A-Z</option>
                  <option value="name-desc">Name, Z-A</option>
                  <option value="price-asc">Price, Low to High</option>
                  <option value="price-desc">Price, High to Low</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none transition-colors duration-200 group-hover:text-green-500" />
              </div>

              <span className="text-md text-gray-500">
                {sortedProducts.length} products
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        {sortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900">
              No items in Wishlist
            </h2>
            <p className="mt-2 text-gray-500">
              Add some items to your wishlist
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
            {sortedProducts.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        )}
      </div>
      <WhatsAppButton phoneNumber="919564259220" />
      <BottomNavbar />
      <Footer />
    </div>
  );
};

export default WishlistPage;
