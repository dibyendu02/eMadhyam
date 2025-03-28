"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { IUser } from "@/commons/types/profile";
import Navbar from "@/commons/components/navbar/Navbar";
import SubHeader from "@/commons/components/subheader/SubHeader";
import Footer from "@/components/footer/Footer";
import Link from "next/link";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import { orderService } from "@/services/api/orderService";
import { Order, OrderStatus } from "@/commons/types/order";
import WhatsAppButton from "@/components/whatsappButton/WhatsappButton";
import BottomNavbar from "@/components/bottomNavbar/BottomNavbar";

const MyOrdersPage: React.FC = () => {
  const user = useAppSelector((state) => state.user.user) as IUser;
  // const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState<boolean>(false);

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      if (user._id) {
        try {
          setLoading(true);
          const data = await orderService.getUserOrders(user._id);
          setOrders(data);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user._id]);

  // View order details
  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  // Format date
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status badge color
  const getStatusBadgeColor = (status: OrderStatus): string => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <SubHeader />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 mt-16 md:mt-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-gray-700">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">My Orders</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : !user._id ? (
            // Display login prompt when no user data is available
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-gray-400 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                Please login to view your orders
              </h2>
              <p className="text-gray-600 mb-6">
                You need to be logged in to access your order history.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/auth/signin"
                  className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="inline-block border border-gray-300 bg-white text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50"
                >
                  Create an Account
                </Link>
              </div>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                No orders found
              </h2>
              <p className="text-gray-600 mb-6">
                You haven&apos;t placed any orders yet.
              </p>
              <Link
                href="/"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Order List */}
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-lg shadow overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 sm:px-6 flex flex-wrap justify-between items-center">
                    <div className="mb-2 sm:mb-0">
                      <h3 className="text-sm font-medium text-gray-500">
                        ORDER #
                        {order._id
                          .substring(order._id.length - 8)
                          .toUpperCase()}
                      </h3>
                      <p className="text-xs text-gray-500">
                        Placed on {formatDate(order.time)}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`inline-flex text-xs px-2.5 py-0.5 rounded-full ${getStatusBadgeColor(
                          order.status
                        )}`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                      <button
                        onClick={() => handleViewDetails(order)}
                        className="text-sm bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200"
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                  {/* Rest of the component remains the same */}
                  {/* ... */}
                  {/* Order Summary */}
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Shipping Address
                        </h4>
                        <p className="text-sm text-gray-600">
                          {order.deliveryAddress?.addressLine},{" "}
                          {order.deliveryAddress?.city},
                          <br />
                          {order.deliveryAddress?.state} -{" "}
                          {order.deliveryAddress?.pinCode}
                        </p>
                      </div>
                      <div className="mt-4 sm:mt-0">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Payment Information
                        </h4>
                        <p className="text-sm text-gray-600">
                          Method:{" "}
                          {order.paymentMethod === "online"
                            ? "Online Payment"
                            : "Cash on Delivery"}
                          <br />
                          Status: {order.isPaid ? "Paid" : "Pending"}
                          <br />
                          Amount: ₹{order.paymentInfo.billingAmount}
                        </p>
                      </div>
                    </div>

                    {/* Product Summary - Just showing first few items */}
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-900 mb-3">
                        Products
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {order.products.slice(0, 3).map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded-md overflow-hidden relative">
                              <Image
                                src={
                                  item.productId?.imageUrls[0] ||
                                  "/placeholder-product.png"
                                }
                                alt={item.productId?.name}
                                fill
                                sizes="64px"
                                className="object-cover object-center"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {item.productId?.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                Qty: {item.quantity} × ₹{item.productId?.price}
                              </p>
                            </div>
                          </div>
                        ))}
                        {order.products.length > 3 && (
                          <div className="flex items-center justify-center">
                            <span className="text-sm text-gray-500">
                              +{order.products.length - 3} more items
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
              <button
                onClick={() => setShowOrderDetails(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6">
              {/* Order ID and Date */}
              <div className="mb-6">
                <p className="text-sm text-gray-500">
                  Order #
                  {selectedOrder._id
                    .substring(selectedOrder._id.length - 8)
                    .toUpperCase()}
                </p>
                <p className="text-sm text-gray-500">
                  Placed on {formatDate(selectedOrder.time)}
                </p>
                <div className="mt-2">
                  <span
                    className={`inline-flex text-xs px-2.5 py-0.5 rounded-full ${getStatusBadgeColor(
                      selectedOrder.status
                    )}`}
                  >
                    {selectedOrder.status.charAt(0).toUpperCase() +
                      selectedOrder.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Shipping and Payment Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    Shipping Information
                  </h3>
                  <p className="text-sm text-gray-600">
                    {user.firstName} {user.lastName}
                    <br />
                    {selectedOrder.deliveryAddress.addressLine}
                    <br />
                    {selectedOrder.deliveryAddress.city},{" "}
                    {selectedOrder.deliveryAddress.state}
                    <br />
                    {selectedOrder.deliveryAddress.pinCode}
                  </p>

                  {selectedOrder.deliveryDate && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-900">
                        Delivery Date
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatDate(selectedOrder.deliveryDate)}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    Payment Information
                  </h3>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Method:</span>{" "}
                    {selectedOrder.paymentMethod === "online"
                      ? "Online Payment"
                      : "Cash on Delivery"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Status:</span>{" "}
                    {selectedOrder.isPaid ? (
                      <span className="text-green-600">Paid</span>
                    ) : (
                      <span className="text-yellow-600">Pending</span>
                    )}
                  </p>

                  {selectedOrder.razorpayOrder &&
                    selectedOrder.razorpayOrder.id && (
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">Transaction ID:</span>{" "}
                        <span className="text-xs">
                          {selectedOrder.razorpayOrder.id}
                        </span>
                      </p>
                    )}
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">
                  Order Items
                </h3>
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          Product
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
                        >
                          Qty
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
                        >
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedOrder.products.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md overflow-hidden relative">
                                <Image
                                  src={item.productId?.imageUrls[0]}
                                  alt={item.productId?.name}
                                  fill
                                  sizes="40px"
                                  className="object-cover object-center"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {item.productId?.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {item.productId?.category}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                            ₹{item.productId?.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                            {item.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-600">
                            ₹{item.productId?.price * item.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Order Summary */}
                <div className="mt-6 bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-500">Subtotal</span>
                    <span className="text-gray-900">
                      ₹{selectedOrder.paymentInfo.billingAmount}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="font-medium text-gray-500">Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="font-medium text-gray-500">Discount</span>
                    <span className="text-green-600">
                      -₹{selectedOrder.paymentInfo.totalSaved}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-medium mt-4 pt-4 border-t border-gray-200">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">
                      ₹{selectedOrder.paymentInfo.billingAmount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Commented out
              {selectedOrder.status !== "cancelled" &&
                selectedOrder.status !== "delivered" && (
                  <div className="mt-6 flex justify-end space-x-4">
                    <button
                      className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
                      onClick={() => setShowOrderDetails(false)}
                    >
                      Close
                    </button>
                    <button
                      className="px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to cancel this order?"
                          )
                        ) {
                          handleCancelOrder(selectedOrder._id);
                        }
                      }}
                    >
                      Cancel Order
                    </button>
                  </div>
                )} */}
            </div>
          </div>
        </div>
      )}
      <WhatsAppButton phoneNumber="919564259220" />
      <BottomNavbar />
      <Footer />
    </div>
  );
};

export default MyOrdersPage;
