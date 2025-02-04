// src/hooks/useStorePersist.ts
"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginSuccess } from "@/store/slices/userSlice";
import { addToCart } from "@/store/slices/cartSlice";
import { addToWishlist } from "@/store/slices/wishlistSlice";

export const useStorePersist = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const wishlist = useAppSelector((state) => state.wishlist);
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

    // Load cart state
    const cartData = localStorage.getItem("eMadhyam-cart");
    if (cartData) {
      try {
        const cart = JSON.parse(cartData);
        dispatch(addToCart(cart));
      } catch (error) {
        console.log("Error parsing cart data:", error);
        localStorage.removeItem("eMadhyam-cart");
      }
    }

    // Load wishlist state
    const wishlistData = localStorage.getItem("eMadhyam-wishlist");
    if (wishlistData) {
      try {
        const wishlist = JSON.parse(wishlistData);
        dispatch(addToWishlist(wishlist));
      } catch (error) {
        console.log("Error parsing wishlist data:", error);
        localStorage.removeItem("eMadhyam-wishlist");
      }
    }
  }, [dispatch]);

  // Save state changes
  useEffect(() => {
    localStorage.setItem("eMadhyam-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("eMadhyam-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user.isAuthenticated) {
      localStorage.setItem("eMadhyam-userData", JSON.stringify(user.user));
      localStorage.setItem("eMadhyam-token", user.token);
    }
  }, [user]);
};
