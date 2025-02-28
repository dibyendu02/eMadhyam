import { IUser, IAddress } from "@/commons/types/profile";
import { AuthResponse } from "@/services/types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
      state.user._id = action.payload.user._id;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.isLoading = true;
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
} = userSlice.actions;

export default userSlice.reducer;
