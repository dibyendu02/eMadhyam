"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { loginSuccess } from "@/store/slices/userSlice";

export const useAuthInit = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check auth state on client-side only
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
};
