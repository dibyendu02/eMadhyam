import { IUser } from "@/commons/types/profile";
import { AuthResponse } from "@/services/types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: IUser;
  isAuthenticated: boolean;
  token: string;
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
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    logout: () => {
      return initialState;
    },
    updateUser: (state, action: PayloadAction<Partial<IUser>>) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { loginSuccess, logout, updateUser } = userSlice.actions;

export default userSlice.reducer;
