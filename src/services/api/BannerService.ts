// services/BannerService.ts
import { isAxiosError } from "axios";
import axiosInstance from "../config/axiosConfig";
import { ApiError } from "../types/error";

export interface Banner {
  _id: string;
  type: "main" | "offer";
  description: string;
  imageUrl: string;
}

export class BannerService {
  static async getAllBanners(): Promise<Banner[]> {
    try {
      const response = await axiosInstance.get<Banner[]>("/api/banner");
      return response.data;
    } catch (error) {
      if (isAxiosError<ApiError>(error)) {
        if (error.response?.data) {
          throw new Error(
            error.response.data.error || "Failed to fetch banners"
          );
        }
      }
      throw new Error("Network error occurred");
    }
  }

  static async getBannerByType(type: "main" | "offer"): Promise<Banner> {
    try {
      const banners = await this.getAllBanners();
      const banner = banners.find((b) => b.type === type);

      if (!banner) {
        throw new Error(`Banner with type ${type} not found`);
      }

      return banner;
    } catch (error) {
      if (isAxiosError<ApiError>(error)) {
        if (error.response?.data) {
          throw new Error(
            error.response.data.error || "Failed to fetch banner"
          );
        }
      }
      throw new Error("Network error occurred");
    }
  }
}
