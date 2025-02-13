import { isAxiosError } from "axios";
import axiosInstance from "../config/axiosConfig";

import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
} from "../types/auth";
import { ApiError } from "../types/error";

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.post<AuthResponse>(
        "/api/user/login",
        credentials
      );

      // Set the token in cookies as well as localStorage
      document.cookie = `eMadhyam-token=${response.data.token}; path=/; max-age=604800`; // 7 days

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

  static async register(
    credentials: RegisterCredentials
  ): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.post(
        "/api/user/register",
        credentials
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

  static logout() {
    // Clear both localStorage and cookies
    localStorage.removeItem("eMadhyam-token");
    localStorage.removeItem("eMadhyam-userData");
    document.cookie =
      "eMadhyam-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }
}
