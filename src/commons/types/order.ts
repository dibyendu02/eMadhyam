// src/commons/types/order.ts

export interface ProductDetails {
    _id: string;
    name: string;
    price: number;
    discountPrice?: number;
    originalPrice?: number;
    category: string;
    imageUrls: string[];
    description?: string;
    stock?: number;
  }
  
  export interface OrderProduct {
    productId: ProductDetails;
    quantity: number;
  }
  
  export interface OrderAddress {
    addressLine: string;
    city: string;
    state: string;
    pinCode: string;
    alternativeAddress?: string;
    alternativeContact?: string;
  }
  
  export interface PaymentInfo {
    billingAmount: number;
    totalSaved: number;
  }
  
  export interface RazorpayOrderInfo {
    id: string;
    amount: number;
    currency: string;
  }
  
  export type OrderStatus = "pending" | "processing" | "delivered" | "cancelled";
  
  export interface Order {
    _id: string;
    userId: string;
    products: OrderProduct[];
    time: string;
    isPaid: boolean;
    paymentMethod: string;
    paymentInfo: PaymentInfo;
    status: OrderStatus;
    deliveryDate?: string;
    deliveryAddress: OrderAddress;
    addressId?: string;
    razorpayOrder?: RazorpayOrderInfo;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
  }
  
  // For order creation payload
  export interface CreateOrderPayload {
    products: Array<{
      productId: string;
      quantity: number;
    }>;
    paymentMethod: string;
    addressId: string;
  }
  
  // For order status update payload
  export interface UpdateOrderStatusPayload {
    status: OrderStatus;
    deliveryDate?: string;
  }