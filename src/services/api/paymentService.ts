import axiosInstance from "../config/axiosConfig";

export const paymentService = {
  createOrder: async (products: string[]) => {
    try {
      const response = await axiosInstance.post("/orders", {
        products,
        paymentMethod: "online",
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  verifyPayment: async (paymentData: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => {
    try {
      const response = await axiosInstance.post(
        "/orders/payment/verify",
        paymentData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
