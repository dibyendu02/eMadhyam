import axiosInstance from "../config/axiosConfig";

export const paymentService = {
  createOrder: async (orderData: { 
    products: { productId: string; quantity: number; }[]; 
    paymentMethod: string; 
  }) => {
    try {
      const response = await axiosInstance.post("/api/order", orderData);
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
        "/api/order/payment/verify",
        paymentData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
