import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Product } from "@/commons/types/product";
import { ProfileService } from "@/services/api/profileService";

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
  totalMRP: number;
  totalDiscount: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  totalMRP: 0,
  totalDiscount: 0,
  isLoading: false,
  error: null,
};

// Helper function to calculate cart totals
const calculateCartTotals = (items: CartItem[]) => {
  return items.reduce(
    (acc, item) => {
      const itemTotalMRP = (item.originalPrice || item.price) * item.quantity;
      const itemDiscount = item.discountPercentage
        ? Math.round((itemTotalMRP * item.discountPercentage) / 100)
        : 0;
      const itemFinalPrice = item.price * item.quantity;

      return {
        totalQuantity: acc.totalQuantity + item.quantity,
        totalMRP: acc.totalMRP + itemTotalMRP,
        totalDiscount: acc.totalDiscount + itemDiscount,
        totalAmount: acc.totalAmount + itemFinalPrice,
      };
    },
    { totalQuantity: 0, totalMRP: 0, totalDiscount: 0, totalAmount: 0 }
  );
};

// Async thunk for adding to cart
export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async (
    { product, userId }: { product: Product; userId?: string },
    { getState, rejectWithValue, dispatch }
  ) => {
    if (!userId) {
      return rejectWithValue("Please login to add items to cart");
    }

    try {
      // First update local state
      dispatch(cartSlice.actions.addToCartLocal(product));

      // Then sync with backend
      const { cart } = getState() as { cart: CartState };
      const formData = new FormData();
      formData.append("cart", JSON.stringify(cart.items));

      const response = await ProfileService.updateProfile(userId, formData);
      return response;
    } catch (error) {
      // Revert local state if API fails
      dispatch(cartSlice.actions.removeFromCartLocal(product._id));
      throw error;
    }
  }
);

// Async thunk for removing from cart
export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCartAsync",
  async (
    { productId, userId }: { productId: string; userId?: string },
    { getState, rejectWithValue, dispatch }
  ) => {
    if (!userId) {
      return rejectWithValue("Please login to remove items from cart");
    }

    try {
      // Save the original state before modification
      // const { cart } = getState() as { cart: CartState };
      // const originalItems = [...cart.items];
      
      // First update local state
      dispatch(cartSlice.actions.removeFromCartLocal(productId));

      // Then sync with backend
      const updatedCart = getState() as { cart: CartState };
      const formData = new FormData();
      formData.append("cart", JSON.stringify(updatedCart.cart.items));

      const response = await ProfileService.updateProfile(userId, formData);
      return response;
    } catch (error) {
      // Revert the state if API fails
      console.error("Error removing item from cart:", error);
      return rejectWithValue("Failed to remove item from cart");
    }
  }
);

export const updateQuantityAsync = createAsyncThunk(
  "cart/updateQuantityAsync",
  async (
    {
      id,
      quantity,
      userId,
    }: {
      id: string;
      quantity: number;
      userId?: string;
    },
    { getState, rejectWithValue, dispatch }
  ) => {
    if (!userId) {
      return rejectWithValue("Please login to update cart");
    }

    // Save the original item quantity before modification
    const { cart } = getState() as { cart: CartState };
    const originalItem = cart.items.find(item => item._id === id);
    const originalQuantity = originalItem ? originalItem.quantity : 0;

    try {
      // First update local state
      dispatch(cartSlice.actions.updateQuantityLocal({ id, quantity }));

      // Then sync with backend
      const updatedCart = getState() as { cart: CartState };
      const formData = new FormData();
      formData.append("cart", JSON.stringify(updatedCart.cart.items));

      const response = await ProfileService.updateProfile(userId, formData);
      return response;
    } catch (error) {
      // Revert to original quantity if API fails
      console.error("Error updating quantity:", error);
      // If we have the original quantity, revert to it
      if (originalQuantity) {
        dispatch(cartSlice.actions.updateQuantityLocal({ id, quantity: originalQuantity }));
      }
      return rejectWithValue("Failed to update item quantity");
    }
  }
);


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Local state updates
    addToCartLocal: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      const totals = calculateCartTotals(state.items);
      Object.assign(state, totals);
    },
    removeFromCartLocal: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      const totals = calculateCartTotals(state.items);
      Object.assign(state, totals);
    },
    updateQuantityLocal: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item._id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      const totals = calculateCartTotals(state.items);
      Object.assign(state, totals);
    },
    clearCart: (state) => {
      Object.assign(state, initialState);
    },
    setCartFromProfile: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload.map((item) => ({ ...item, quantity: 1 }));
      const totals = calculateCartTotals(state.items);
      Object.assign(state, totals);
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to cart async
      .addCase(addToCartAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCartAsync.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Remove from cart async
      .addCase(removeFromCartAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromCartAsync.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(removeFromCartAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update quantity async
      .addCase(updateQuantityAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateQuantityAsync.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateQuantityAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  addToCartLocal,
  removeFromCartLocal,
  updateQuantityLocal,
  clearCart,
  setCartFromProfile,
} = cartSlice.actions;

export default cartSlice.reducer;
