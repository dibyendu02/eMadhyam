"use client";

import Navbar from "@/commons/components/navbar/Navbar";
import SubHeader from "@/commons/components/subheader/SubHeader";
import Footer from "@/components/footer/Footer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  removeFromCartAsync,
  updateQuantityAsync,
} from "@/store/slices/cartSlice";
import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const totalAmount = useAppSelector((state) => state.cart.totalAmount);
  const totalMRP = useAppSelector((state) => state.cart.totalMRP);
  const totalDiscount = useAppSelector((state) => state.cart.totalDiscount);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantityAsync({ id, quantity: newQuantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCartAsync({ productId: id }));
  };

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
            <span className="text-gray-900">Shop cart</span>
          </nav>
        </div>
      </div>

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-900">
                Your cart is empty
              </h2>
              <p className="mt-2 text-gray-500">
                Add some items to your cart to get started
              </p>
              <Link
                href="/"
                className="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items Section */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow">
                  <div className="md:p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6 ">
                      Shopping Cart ({totalQuantity} items)
                    </h2>
                    <div className="space-y-6">
                      {cartItems.map((item) => (
                        <div
                          key={item._id}
                          className="flex gap-6 pb-6 border-b border-gray-200 last:border-0"
                        >
                          <div className="relative w-24 h-24 overflow-hidden rounded-lg">
                            <Image
                              src={
                                item.imageUrls
                                  ? item.imageUrls[0]
                                  : "/placeholder.jpg"
                              }
                              alt={item.name}
                              fill
                              className={`object-cover transform transition-transform duration-500 `}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              priority={false}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="text-sm font-medium text-gray-900">
                                  {item.name}
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                  {item.shortDescription}
                                </p>
                              </div>
                              <button
                                onClick={() => handleRemoveItem(item._id)}
                                className="text-gray-400 hover:text-red-700 "
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      item._id,
                                      item.quantity - 1
                                    )
                                  }
                                  className="p-1 rounded-md border border-gray-300 hover:bg-gray-50"
                                >
                                  <Minus className="w-4 h-4 text-gray-900" />
                                </button>
                                <span className="w-8 text-center text-gray-900">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      item._id,
                                      item.quantity + 1
                                    )
                                  }
                                  className="p-1 rounded-md border border-gray-300 hover:bg-gray-50 "
                                >
                                  <Plus className="w-4 h-4 text-gray-900" />
                                </button>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">
                                  ₹{item.price * item.quantity}
                                </p>
                                <p className="text-sm text-gray-500 line-through">
                                  ₹{item.originalPrice ?? 0 * item.quantity}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Details Section */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow md:p-6 sticky top-4">
                  <h2 className="text-lg font-medium text-gray-900 mb-6">
                    Price Details
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-gray-500 ">
                      <span>MRP ({totalQuantity} items)</span>
                      <span>₹{totalMRP}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Total Discount</span>
                      <span className="text-green-600">- ₹{totalDiscount}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Delivery Fee</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex justify-between font-medium text-gray-500">
                        <span>Total Amount</span>
                        <span>₹{totalAmount}</span>
                      </div>
                      <p className=" text-sm text-gray-500 mt-2">
                        You will save ₹{totalDiscount} on this order
                      </p>
                    </div>
                    <button className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 mt-6 ">
                      Proceed to checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
