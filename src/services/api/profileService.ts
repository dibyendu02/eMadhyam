import { isAxiosError } from "axios";
import axiosInstance from "../config/axiosConfig";

import { IUser } from "@/commons/types/profile";
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
          throw new Error(
            error.response.data.error || " update profile failed"
          );
        }
      }
      throw new Error("Network error occurred");
    }
  }
}
