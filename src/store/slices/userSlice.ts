import { IUser, IAddress } from "@/commons/types/profile";
import { AuthResponse } from "@/services/types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/commons/types/product";

interface UserState {
  user: IUser;
  isAuthenticated: boolean;
  token: string;
  isLoading: boolean;
}

const initialState: UserState = {
  user: {
    _id: "",
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
  isAuthenticated: false,
  token: "",
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<AuthResponse>) => {
      // Set all user properties from the response
      state.user = {
        _id: action.payload.user._id,
        email: action.payload.user.email,
        firstName: action.payload.user.firstName,
        lastName: action.payload.user.lastName,
        phoneNumber: action.payload.user.phoneNumber || "",
        gender: action.payload.user.gender || "male",
        imageUrl: action.payload.user.imageUrl || "",
        address: action.payload.user.address || [],
        isAdmin: action.payload.user.isAdmin || false,
        cart: action.payload.user.cart || [],
        wishlist: action.payload.user.wishlist || [],
      };
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.isLoading = false; // Set loading to false since login is complete
    },
    updateUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: () => {
      return initialState;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addAddress: (state, action: PayloadAction<IAddress>) => {
      state.user.address.push(action.payload);
    },
    removeAddress: (state, action: PayloadAction<number>) => {
      state.user.address.splice(action.payload, 1);
    },
    // Add these reducers to handle cart and wishlist updates from profile
    setCart: (state, action: PayloadAction<Product[]>) => {
      state.user.cart = action.payload;
    },
    setWishlist: (state, action: PayloadAction<Product[]>) => {
      state.user.wishlist = action.payload;
    },
    resetUser: () => {
      return initialState;
    },
  },
});

export const {
  loginSuccess,
  logout,
  updateUser,
  setLoading,
  updateToken,
  addAddress,
  removeAddress,
  setCart,
  setWishlist,
  resetUser,
} = userSlice.actions;

export default userSlice.reducer;
