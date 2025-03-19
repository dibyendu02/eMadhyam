import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/commons/types/product";
import { ProfileService } from "@/services/api/profileService";
import { setWishlist } from "@/store/slices/userSlice";

interface WishlistState {
  items: Product[];
  isLoading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  isLoading: false,
  error: null,
};

// Async thunk for adding to wishlist
export const addToWishlistAsync = createAsyncThunk(
  "wishlist/addToWishlistAsync",
  async (
    { product, userId }: { product: Product; userId?: string },
    { rejectWithValue, dispatch }
  ) => {
    if (!userId) {
      return rejectWithValue("Please login to add items to wishlist");
    }

    try {
      // First update local state
      dispatch(wishlistSlice.actions.addToWishlistLocal(product));

      // Then sync with backend
      const userData = await ProfileService.addToWishlist(userId, product._id);

      // Update user wishlist state in userSlice
      if (userData && userData.wishlist) {
        dispatch(setWishlist(userData.wishlist));
      }

      return userData;
    } catch (error) {
      // Revert local state if API fails
      dispatch(wishlistSlice.actions.removeFromWishlistLocal(product._id));
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to add item to wishlist");
    }
  }
);

// Async thunk for removing from wishlist
export const removeFromWishlistAsync = createAsyncThunk(
  "wishlist/removeFromWishlistAsync",
  async (
    { productId, userId }: { productId: string; userId?: string },
    { rejectWithValue, dispatch }
  ) => {
    if (!userId) {
      return rejectWithValue("Please login to remove items from wishlist");
    }

    try {
      // First update local state
      dispatch(wishlistSlice.actions.removeFromWishlistLocal(productId));

      // Then sync with backend
      const userData = await ProfileService.removeFromWishlist(
        userId,
        productId
      );

      // Update user wishlist state in userSlice
      if (userData && userData.wishlist) {
        dispatch(setWishlist(userData.wishlist));
      }

      return userData;
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to remove item from wishlist");
    }
  }
);

// Initialize wishlist from user profile
export const initializeWishlistFromProfile = createAsyncThunk(
  "wishlist/initializeFromProfile",
  async (wishlistItems: any[], { dispatch }) => {
    dispatch(wishlistSlice.actions.setWishlistFromProfile(wishlistItems));
    return wishlistItems;
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Local state updates
    addToWishlistLocal: (state, action: PayloadAction<Product>) => {
      if (!state.items.find((item) => item._id === action.payload._id)) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlistLocal: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    clearWishlist: (state) => {
      Object.assign(state, initialState);
    },
    setWishlistFromProfile: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to wishlist async
      .addCase(addToWishlistAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToWishlistAsync.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addToWishlistAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Remove from wishlist async
      .addCase(removeFromWishlistAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromWishlistAsync.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(removeFromWishlistAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Initialize wishlist from profile
      .addCase(initializeWishlistFromProfile.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  addToWishlistLocal,
  removeFromWishlistLocal,
  clearWishlist,
  setWishlistFromProfile,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
