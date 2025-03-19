import { isAxiosError } from "axios";
import axiosInstance from "../config/axiosConfig";
import {
  AuthResponse,
  LoginCredentials,
  PasswordChangeResponse,
} from "../types/auth";
import { ApiError } from "../types/error";
import store from "@/store/store";
import { clearCart } from "@/store/slices/cartSlice";
import { clearWishlist } from "@/store/slices/wishlistSlice";
import { resetUser } from "@/store/slices/userSlice";

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.post<AuthResponse>(
        "/api/user/login",
        credentials
      );

      // Only store token and userId in localStorage
      localStorage.setItem("eMadhyam-token", response.data.token);
      localStorage.setItem("eMadhyam-userId", response.data.user._id);

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

  static async register(formData: FormData): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.post(
        "/api/user/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Only store token and userId in localStorage
      localStorage.setItem("eMadhyam-token", response.data.token);
      localStorage.setItem("eMadhyam-userId", response.data.user._id);

      return response.data;
    } catch (error) {
      if (isAxiosError<ApiError>(error)) {
        if (error.response?.data) {
          throw new Error(error.response.data.error || "Registration failed");
        }
      }
      throw new Error("Network error occurred");
    }
  }

  static logout() {
    // Only clear token and userId from localStorage
    localStorage.removeItem("eMadhyam-token");
    localStorage.removeItem("eMadhyam-userId");

    // Clear data from Redux store
    store.dispatch(clearCart());
    store.dispatch(clearWishlist());

    // Reset user state if you have a reset action
    if (typeof resetUser === "function") {
      store.dispatch(resetUser());
    }
  }

  static async changePassword(
    oldPassword: string,
    newPassword: string,
    userId: string
  ): Promise<PasswordChangeResponse> {
    try {
      const response = await axiosInstance.put<PasswordChangeResponse>(
        `/api/user/change-password/${userId}`,
        {
          currentPassword: oldPassword,
          newPassword: newPassword,
        }
      );

      return response.data;
    } catch (error) {
      if (isAxiosError<ApiError>(error)) {
        if (error.response?.data) {
          throw new Error(
            error.response.data.error || "Password change failed"
          );
        }
      }
      throw new Error("Network error occurred");
    }
  }
}
