import { isAxiosError } from "axios";
import axiosInstance from "../config/axiosConfig";

import { IAddress, IUser } from "@/commons/types/profile";
import { updateProfileResponse } from "../types/auth";
import { ApiError } from "../types/error";

export class ProfileService {
  static async getProfile(id: string): Promise<IUser> {
    try {
      const response = await axiosInstance.get<IUser>(
        `/api/user/profile/${id}`
      );

      return response.data;
    } catch (error) {
      if (isAxiosError<ApiError>(error)) {
        if (error.response?.data) {
          throw new Error(error.response.data.error || "get profile failed");
        }
      }
      throw new Error("Network error occurred");
    }
  }

  static async updateProfile(
    id: string,
    data: FormData
  ): Promise<updateProfileResponse> {
    try {
      const response = await axiosInstance.put(
        `/api/user/profile/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (isAxiosError<ApiError>(error)) {
        if (error.response?.data) {
          throw new Error(error.response.data.error || "update profile failed");
        }
      }
      throw new Error("Network error occurred");
    }
  }

  // Cart Operations
  static async addToCart(userId: string, productId: string): Promise<IUser> {
    try {
      const response = await axiosInstance.post(`/api/user/cart/${userId}`, {
        productId,
      });
      return response.data.user;
    } catch (error) {
      if (isAxiosError<ApiError>(error)) {
        if (error.response?.data) {
          throw new Error(error.response.data.error || "Failed to add to cart");
        }
      }
      throw new Error("Network error occurred");
    }
  }

  static async removeFromCart(
    userId: string,
    productId: string
  ): Promise<IUser> {
    try {
      const response = await axiosInstance.delete(`/api/user/cart/${userId}`, {
        data: { productId },
      });
      return response.data.user;
    } catch (error) {
      if (isAxiosError<ApiError>(error)) {
        if (error.response?.data) {
          throw new Error(
            error.response.data.error || "Failed to remove from cart"
          );
        }
      }
      throw new Error("Network error occurred");
    }
  }

  // Wishlist Operations
  static async addToWishlist(
    userId: string,
    productId: string
  ): Promise<IUser> {
    try {
      const response = await axiosInstance.post(
        `/api/user/wishlist/${userId}`,
        {
          productId,
        }
      );
      return response.data.user;
    } catch (error) {
      if (isAxiosError<ApiError>(error)) {
        if (error.response?.data) {
          throw new Error(
            error.response.data.error || "Failed to add to wishlist"
          );
        }
      }
      throw new Error("Network error occurred");
    }
  }

  static async removeFromWishlist(
    userId: string,
    productId: string
  ): Promise<IUser> {
    try {
      const response = await axiosInstance.delete(
        `/api/user/wishlist/${userId}`,
        {
          data: { productId },
        }
      );
      return response.data.user;
    } catch (error) {
      if (isAxiosError<ApiError>(error)) {
        if (error.response?.data) {
          throw new Error(
            error.response.data.error || "Failed to remove from wishlist"
          );
        }
      }
      throw new Error("Network error occurred");
    }
  }

  // Method to add a new address
  static async addAddress(
    userId: string,
    addressData: Partial<IAddress>
  ): Promise<IUser> {
    try {
      const response = await axiosInstance.post(
        `/api/user/address/${userId}`,
        addressData
      );
      return response.data.user;
    } catch (error) {
      if (isAxiosError<ApiError>(error)) {
        if (error.response?.data) {
          throw new Error(error.response.data.error || "Failed to add address");
        }
      }
      throw new Error("Network error occurred");
    }
  }

  // Method to update an existing address
  static async updateAddress(
    userId: string,
    addressId: string,
    addressData: Partial<IAddress>
  ): Promise<IUser> {
    try {
      const response = await axiosInstance.put(
        `/api/user/address/${userId}/${addressId}`,
        addressData
      );
      return response.data.user;
    } catch (error) {
      if (isAxiosError<ApiError>(error)) {
        if (error.response?.data) {
          throw new Error(
            error.response.data.error || "Failed to update address"
          );
        }
      }
      throw new Error("Network error occurred");
    }
  }

  // Method to delete an address
  static async deleteAddress(
    userId: string,
    addressId: string
  ): Promise<IUser> {
    try {
      const response = await axiosInstance.delete(
        `/api/user/address/${userId}/${addressId}`
      );
      return response.data.user;
    } catch (error) {
      if (isAxiosError<ApiError>(error)) {
        if (error.response?.data) {
          throw new Error(
            error.response.data.error || "Failed to delete address"
          );
        }
      }
      throw new Error("Network error occurred");
    }
  }
}
