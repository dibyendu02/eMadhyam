import { isAxiosError } from "axios";
import axiosInstance from "../config/axiosConfig";

import { ColorType, PlantType, ProductType } from "@/commons/types/product";
import { ApiError } from "../types/error";

export class CommonService {
  static async getAllColors(): Promise<ColorType[]> {
    try {
      const response = await axiosInstance.get<ColorType[]>(`/api/colortype`);

      return response.data;
    } catch (error) {
      if (isAxiosError<ApiError>(error)) {
        if (error.response?.data) {
          throw new Error(error.response.data.error || "Cannot get colors");
        }
      }
      throw new Error("Network error occurred");
    }
  }

  static async getAllProductTypes(): Promise<ProductType[]> {
    try {
      const response = await axiosInstance.get<ProductType[]>(
        `/api/productType`
      );

      return response.data;
    } catch (error) {
      if (isAxiosError<ApiError>(error)) {
        if (error.response?.data) {
          throw new Error(
            error.response.data.error || "Cannot get ProductTypes"
          );
        }
      }
      throw new Error("Network error occurred");
    }
  }

  static async getAllPlantTypes(): Promise<PlantType[]> {
    try {
      const response = await axiosInstance.get<PlantType[]>(`/api/planttype`);

      return response.data;
    } catch (error) {
      if (isAxiosError<ApiError>(error)) {
        if (error.response?.data) {
          throw new Error(error.response.data.error || "Cannot get PlantTypes");
        }
      }
      throw new Error("Network error occurred");
    }
  }
}
