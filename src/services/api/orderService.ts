import axiosInstance from "../config/axiosConfig";
import { 
  Order, 
  CreateOrderPayload, 
  UpdateOrderStatusPayload 
} from "@/commons/types/order";

// Define RazorpayOrder interface to replace 'any'
interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt?: string;
  status?: string;
}

export const orderService = {
  // Create a new order
  createOrder: async (orderData: CreateOrderPayload) => {
    try {
      const response = await axiosInstance.post<{ 
        message: string; 
        order: Order; 
        razorpayOrder?: RazorpayOrder 
      }>('/api/order', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Get all orders for a user
  getUserOrders: async (userId: string): Promise<Order[]> => {
    try {
      const response = await axiosInstance.get<Order[]>(`/api/order/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
  },

  // Get a single order by ID
  getOrderById: async (orderId: string): Promise<Order> => {
    try {
      const response = await axiosInstance.get<Order>(`/api/order/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order details:', error);
      throw error;
    }
  },

  // Cancel an order
  cancelOrder: async (orderId: string) => {
    try {
      // This will depend on your API implementation
      // You might need to update the order status to 'cancelled'
      const response = await axiosInstance.put<{ message: string; order: Order }>(`/api/order/${orderId}`, {
        status: 'cancelled'
      } as UpdateOrderStatusPayload);
      return response.data;
    } catch (error) {
      console.error('Error cancelling order:', error);
      throw error;
    }
  },

  // Track an order's status
  trackOrder: async (orderId: string): Promise<Order> => {
    try {
      // This may need to be a dedicated endpoint in your API
      // For now, we'll just fetch the order details
      const response = await axiosInstance.get<Order>(`/api/order/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error tracking order:', error);
      throw error;
    }
  },
  
  // Verify payment (for Razorpay)
  verifyPayment: async (verificationData: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    orderId?: string;
  }) => {
    try {
      const response = await axiosInstance.post<{ message: string; order: Order }>('/api/order/payment/verify', verificationData);
      return response.data;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  }
};