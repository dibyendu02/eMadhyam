

// src/services/api/paymentService.ts
import axiosInstance from "../config/axiosConfig";
import { IAddress } from "@/commons/types/profile";

interface OrderData {
  products: Array<{
    productId: string;
    quantity: number;
  }>;
  paymentMethod: string;
  addressId: string; // Changed from address object to addressId
}

interface PaymentVerificationData {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  orderId?: string; // Optional order ID from our system
}

export const paymentService = {
  createOrder: async (orderData: OrderData) => {
    try {
      const response = await axiosInstance.post('/api/order', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  verifyPayment: async (verificationData: PaymentVerificationData) => {
    try {
      const response = await axiosInstance.post('/api/order/payment/verify', verificationData);
      return response.data;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  }
};