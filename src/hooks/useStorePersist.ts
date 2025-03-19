"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginSuccess, updateUser } from "@/store/slices/userSlice";
import { ProfileService } from "@/services/api/profileService";
import { initializeCartFromProfile } from "@/store/slices/cartSlice";
import { initializeWishlistFromProfile } from "@/store/slices/wishlistSlice";

export const useStorePersist = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("eMadhyam-token");
      const userId = localStorage.getItem("eMadhyam-userId");

      if (token && userId) {
        // Initialize basic user data
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
          // Fetch complete user profile
          const userData = await ProfileService.getProfile(userId);
          dispatch(updateUser(userData));

          // Initialize cart from user profile
          if (userData.cart && userData.cart.length > 0) {
            dispatch(initializeCartFromProfile(userData.cart));
          }

          // Initialize wishlist from user profile
          if (userData.wishlist && userData.wishlist.length > 0) {
            dispatch(initializeWishlistFromProfile(userData.wishlist));
          }
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
