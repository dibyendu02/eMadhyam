import { IUser } from "@/commons/types/profile";
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
      state.user._id = action.payload.user._id; // Only set the user ID initially
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.isLoading = true; // Set loading while we fetch full profile
    },
    updateUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isLoading = false; // Profile loaded
    },
    logout: () => {
      return initialState;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { loginSuccess, logout, updateUser, setLoading } =
  userSlice.actions;

export default userSlice.reducer;
