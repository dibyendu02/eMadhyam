import { isAxiosError } from "axios";
import axiosInstance from "../config/axiosConfig";

import { ApiError } from "../types/error";
import { CategoryType, Product } from "@/commons/types/product";

export class ProductService {
  static async getAllProducts(): Promise<Product[]> {
    try {
      const response = await axiosInstance.get<Product[]>("/api/product");

      return response.data;
    } catch (error) {
      if (isAxiosError<ApiError>(error)) {
        if (error.response?.data) {
          throw new Error(error.response.data.error || "Login failed");
        }
      }
      throw new Error("Network error occurred");
    }
  }

  static async getProductById(id: string): Promise<Product> {
    try {
      const response = await axiosInstance.get<Product>(`/api/product/${id}`);

      return response.data;
    } catch (error) {
      if (isAxiosError<ApiError>(error)) {
        if (error.response?.data) {
          throw new Error(error.response.data.error || "Login failed");
        }
      }
      throw new Error("Network error occurred");
    }
  }

  static async getProductByCategoryId(id: string): Promise<Product[]> {
    try {
      const response = await axiosInstance.get<Product[]>(
        `/api/product/category/${id}`
      );

      return response.data;
    } catch (error) {
      if (isAxiosError<ApiError>(error)) {
        if (error.response?.data) {
          throw new Error(error.response.data.error || "Login failed");
        }
      }
      throw new Error("Network error occurred");
    }
  }

  static async getProductByProductTypeId(id: string): Promise<Product[]> {
    try {
      const response = await axiosInstance.get<Product[]>(
        `/api/product/type/${id}`
      );

      return response.data;
    } catch (error) {
      if (isAxiosError<ApiError>(error)) {
        if (error.response?.data) {
          throw new Error(
            error.response.data.error || "Failed to fetch products by type"
          );
        }
      }
      throw new Error("Network error occurred");
    }
  }

  static async getAllCategory(): Promise<CategoryType[]> {
    try {
      const response = await axiosInstance.get<CategoryType[]>(`/api/category`);

      return response.data;
    } catch (error) {
      if (isAxiosError<ApiError>(error)) {
        if (error.response?.data) {
          throw new Error(error.response.data.error || "Login failed");
        }
      }
      throw new Error("Network error occurred");
    }
  }
}
