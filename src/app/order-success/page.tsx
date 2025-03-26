"use client";

import Navbar from "@/commons/components/navbar/Navbar";
import SubHeader from "@/commons/components/subheader/SubHeader";
import Footer from "@/components/footer/Footer";
import Link from "next/link";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { clearCart } from "@/store/slices/cartSlice";
import { CheckCircle } from "lucide-react";
import WhatsAppButton from "@/components/whatsappButton/WhatsappButton";
import BottomNavbar from "@/components/bottomNavbar/BottomNavbar";

const OrderSuccessPage = () => {
  const dispatch = useAppDispatch();

  // Clear the cart when the success page loads
  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
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
            <Link href="/cart" className="hover:text-gray-700">
              Shop cart
            </Link>
            <span className="mx-2">/</span>
            <Link href="/checkout" className="hover:text-gray-700">
              Checkout
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Order Confirmation</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>

          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Order Placed Successfully!
          </h1>

          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been received and is
            being processed.
          </p>

          {/* Order information can be added here if available */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-2">
              You will receive an email confirmation shortly with your order
              details.
            </p>
            <p className="text-sm text-gray-500">
              For any questions about your order, please contact our customer
              service.
            </p>
          </div>

          <div className="space-y-3">
            <Link
              href="/my-orders"
              className="block w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700"
            >
              View My Orders
            </Link>

            <Link
              href="/"
              className="block w-full bg-gray-100 text-gray-800 py-3 rounded-md hover:bg-gray-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
      <WhatsAppButton phoneNumber="919641131615" />
      <BottomNavbar />
      <Footer />
    </div>
  );
};

export default OrderSuccessPage;
