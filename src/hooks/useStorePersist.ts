// src/hooks/useStorePersist.ts
"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginSuccess } from "@/store/slices/userSlice";
// import { addToCart } from "@/store/slices/cartSlice";
// import { addToWishlist } from "@/store/slices/wishlistSlice";

export const useStorePersist = () => {
  const dispatch = useAppDispatch();
  // const cart = useAppSelector((state) => state.cart);
  // const wishlist = useAppSelector((state) => state.wishlist);
  const user = useAppSelector((state) => state.user);

  // Load persisted state
  useEffect(() => {
    // Load auth state
    const token = localStorage.getItem("eMadhyam-token");
    if (token) {
      const userData = localStorage.getItem("eMadhyam-userData");
      if (userData) {
        try {
          const user = JSON.parse(userData);
          dispatch(loginSuccess({ token, user }));
        } catch (error) {
          console.log("Error parsing user data:", error);
          localStorage.removeItem("eMadhyam-token");
          localStorage.removeItem("eMadhyam-userData");
        }
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (user.isAuthenticated) {
      localStorage.setItem("eMadhyam-userData", JSON.stringify(user.user));
      localStorage.setItem("eMadhyam-token", user.token);
    }
  }, [user]);
};
