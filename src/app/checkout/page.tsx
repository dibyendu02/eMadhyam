"use client";

import Navbar from "@/commons/components/navbar/Navbar";
import SubHeader from "@/commons/components/subheader/SubHeader";
import Footer from "@/components/footer/Footer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useState } from "react";
import { paymentService } from "@/services/api/paymentService";
import { loadRazorpay } from "@/services/config/razorpayUtils";
import { addAddress } from "@/store/slices/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Based on the error messages, it seems IAddress has different structure than what we were using
// Let's define a compatible address structure
interface AddressInput {
  addressLine: string;
  city: string;
  state: string;
  pinCode: number;
}

const CheckoutPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const totalAmount = useAppSelector((state) => state.cart.totalAmount);
  const totalMRP = useAppSelector((state) => state.cart.totalMRP);
  const totalDiscount = useAppSelector((state) => state.cart.totalDiscount);

  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [newAddress, setNewAddress] = useState({
    addressLine: "",
    city: "",
    state: "",
    pinCode: "", // Keep as string for input, convert to number when submitting
  });
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [loading, setLoading] = useState(false);

  const handleOrderPlacement = async () => {
    if (selectedAddressIndex === -1 && !newAddress.addressLine) {
      alert("Please enter a valid address.");
      return;
    }

    setLoading(true);

    const selectedAddress =
      selectedAddressIndex === -1
        ? {
            ...newAddress,
            pinCode: Number(newAddress.pinCode), // Convert to number before sending
          }
        : user.address[selectedAddressIndex];

    const orderData = {
      products: cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      paymentMethod,
      address: selectedAddress,
    };

    try {
      const orderResponse = await paymentService.createOrder(orderData);

      if (paymentMethod === "online") {
        const razorpayLoaded = await loadRazorpay();
        if (!razorpayLoaded) {
          alert("Razorpay SDK failed to load.");
          setLoading(false);
          return;
        }

        const { razorpayOrder } = orderResponse;
        const options = {
          key: "rzp_test_X7LgvyRx65km1S",
          amount: razorpayOrder.amount,
          currency: "INR",
          name: "Your Store",
          description: "Order Payment",
          order_id: razorpayOrder.id,
          handler: async function (response) {
            try {
              const verifyResponse = await paymentService.verifyPayment(
                response
              );
              alert("Payment successful!");
              router.push("/order-success");
            } catch (error) {
              console.error("Payment verification failed", error);
              alert("Payment verification failed");
            }
          },
          prefill: {
            name:
              `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
              "Customer",
            email: user?.email || "no-email@example.com",
            contact: user?.phoneNumber || "",
          },
          theme: {
            color: "#28a745",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert("Order placed successfully! (COD selected)");
        router.push("/order-success");
      }
    } catch (error) {
      console.error("Order placement failed", error);
      alert("Order placement failed. Please try again.");
    }

    setLoading(false);
  };

  const handleSaveAddress = () => {
    if (
      newAddress.addressLine &&
      newAddress.city &&
      newAddress.state &&
      newAddress.pinCode
    ) {
      // Convert to the format expected by addAddress action
      const addressToSave = {
        addressLine: newAddress.addressLine,
        city: newAddress.city,
        state: newAddress.state,
        pinCode: Number(newAddress.pinCode), // Convert string to number
      };

      dispatch(addAddress(addressToSave));
      setSelectedAddressIndex(user.address.length); // Select the newly added address
    } else {
      alert("Please fill in all required address fields");
    }
  };

  return (
    <div className="flex flex-col bg-white">
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
            <span className="text-gray-900">Checkout</span>
          </nav>
        </div>
      </div>

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <div className="md:p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Checkout
                  </h2>

                  {/* Shipping Address */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Shipping Address
                    </h3>

                    {user?.address && user.address.length > 0 ? (
                      <div className="space-y-4 mb-6">
                        {user.address.map((addr, index) => (
                          <div key={index} className="flex items-start">
                            <input
                              type="radio"
                              id={`saved-address-${index}`}
                              name="address"
                              checked={selectedAddressIndex === index}
                              onChange={() => setSelectedAddressIndex(index)}
                              className="mt-1 mr-3"
                            />
                            <label
                              htmlFor={`saved-address-${index}`}
                              className="text-sm text-gray-700"
                            >
                              <div className="font-medium">
                                {user.firstName} {user.lastName}
                              </div>
                              <div>
                                {addr.addressLine}, {addr.city},
                              </div>
                              <div>
                                {addr.state} - {addr.pinCode}
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600 mb-4">
                        No saved addresses found. Please enter a new one.
                      </p>
                    )}

                    <div className="mb-4">
                      <div className="flex items-start mb-4">
                        <input
                          type="radio"
                          id="new-address"
                          name="address"
                          checked={selectedAddressIndex === -1}
                          onChange={() => setSelectedAddressIndex(-1)}
                          className="mt-1 mr-3"
                        />
                        <label
                          htmlFor="new-address"
                          className="text-sm font-medium text-gray-700"
                        >
                          Add new address
                        </label>
                      </div>

                      {selectedAddressIndex === -1 && (
                        <div className="pl-6 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Address Line *
                              </label>
                              <input
                                type="text"
                                value={newAddress.addressLine}
                                onChange={(e) =>
                                  setNewAddress({
                                    ...newAddress,
                                    addressLine: e.target.value,
                                  })
                                }
                                className="w-full border border-gray-300 rounded-md p-2"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                City *
                              </label>
                              <input
                                type="text"
                                value={newAddress.city}
                                onChange={(e) =>
                                  setNewAddress({
                                    ...newAddress,
                                    city: e.target.value,
                                  })
                                }
                                className="w-full border border-gray-300 rounded-md p-2"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                State *
                              </label>
                              <input
                                type="text"
                                value={newAddress.state}
                                onChange={(e) =>
                                  setNewAddress({
                                    ...newAddress,
                                    state: e.target.value,
                                  })
                                }
                                className="w-full border border-gray-300 rounded-md p-2"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                PIN Code *
                              </label>
                              <input
                                type="text"
                                value={newAddress.pinCode}
                                onChange={(e) => {
                                  // Only allow numeric input
                                  const numericValue = e.target.value.replace(
                                    /\D/g,
                                    ""
                                  );
                                  setNewAddress({
                                    ...newAddress,
                                    pinCode: numericValue,
                                  });
                                }}
                                className="w-full border border-gray-300 rounded-md p-2"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <button
                              onClick={handleSaveAddress}
                              className="text-sm bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200"
                            >
                              Save this address
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Payment Method
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <input
                          type="radio"
                          id="online-payment"
                          name="payment"
                          value="online"
                          checked={paymentMethod === "online"}
                          onChange={() => setPaymentMethod("online")}
                          className="mt-1 mr-3"
                        />
                        <label
                          htmlFor="online-payment"
                          className="text-sm text-gray-700"
                        >
                          <div className="font-medium">
                            Pay Online (Razorpay)
                          </div>
                          <div className="text-gray-500">
                            Credit/Debit Card, UPI, Net Banking, Wallet
                          </div>
                        </label>
                      </div>
                      <div className="flex items-start">
                        <input
                          type="radio"
                          id="cod-payment"
                          name="payment"
                          value="cod"
                          checked={paymentMethod === "cod"}
                          onChange={() => setPaymentMethod("cod")}
                          className="mt-1 mr-3"
                        />
                        <label
                          htmlFor="cod-payment"
                          className="text-sm text-gray-700"
                        >
                          <div className="font-medium">Cash on Delivery</div>
                          <div className="text-gray-500">
                            Pay when you receive your order
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow md:p-6 sticky top-4">
                <h2 className="text-lg font-medium text-gray-900 mb-6">
                  Order Summary
                </h2>
                <div className="space-y-4">
                  <div className="space-y-2 mb-4">
                    {cartItems.map((item) => (
                      <div
                        key={item._id}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-gray-600">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="font-medium">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
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
                    <div className="flex justify-between font-medium text-gray-900">
                      <span>Total Amount</span>
                      <span>₹{totalAmount}</span>
                    </div>
                    <p className="text-sm text-green-600 mt-2">
                      You will save ₹{totalDiscount} on this order
                    </p>
                  </div>
                  <button
                    onClick={handleOrderPlacement}
                    disabled={loading || cartItems.length === 0}
                    className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 mt-6 disabled:bg-green-400 disabled:cursor-not-allowed"
                  >
                    {loading ? "Processing..." : "Place Order"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
