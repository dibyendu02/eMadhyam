"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginSuccess, updateUser } from "@/store/slices/userSlice";
import { ProfileService } from "@/services/api/profileService";

export const useStorePersist = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("eMadhyam-token");
      const userId = localStorage.getItem("eMadhyam-userId");

      if (token && userId) {
        dispatch(
          loginSuccess({
            token,
            user: {
              _id: userId,
              email: "",
              firstName: "",
              lastName: "",
              phoneNumber: "",
              gender: "male",
              imageUrl: "",
              address: [],
              isAdmin: false,
              cart: [],
              wishlist: [],
            },
          })
        );

        try {
          const userData = await ProfileService.getProfile(userId);
          dispatch(updateUser(userData));
        } catch (error) {
          console.error("Error fetching user profile:", error);
          localStorage.removeItem("eMadhyam-token");
          localStorage.removeItem("eMadhyam-userId");
          window.location.href = "/auth/signin";
        }
      }

      setIsInitializing(false);
    };

    initializeAuth();
  }, [dispatch]);

  // Persist token and userId when auth state changes
  useEffect(() => {
    if (user.isAuthenticated) {
      localStorage.setItem("eMadhyam-token", user.token);
      localStorage.setItem("eMadhyam-userId", user.user._id);
    } else {
      localStorage.removeItem("eMadhyam-token");
      localStorage.removeItem("eMadhyam-userId");
    }
  }, [user.isAuthenticated, user.token, user.user._id]);

  return { isInitializing };
};
