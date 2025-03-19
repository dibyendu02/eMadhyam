import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Product } from "@/commons/types/product";
import { ProfileService } from "@/services/api/profileService";
import { setCart } from "@/store/slices/userSlice";

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

// Helper function to process cart data from backend
// This converts the flattened array from backend to an array with proper quantities
const processCartItems = (cartItems: any[]): CartItem[] => {
  if (!cartItems || !Array.isArray(cartItems)) {
    return [];
  }

  // Check if we're dealing with the new structured cart (objects with product and quantity)
  if (
    cartItems.length > 0 &&
    cartItems[0].product &&
    typeof cartItems[0].quantity === "number"
  ) {
    return cartItems.map((item) => ({
      ...item.product,
      quantity: item.quantity,
    }));
  }

  // Otherwise, handle the older flattened array structure
  // Create a map to count occurrences of each product
  const productMap = new Map<string, CartItem>();

  cartItems.forEach((product) => {
    if (!product || !product._id) return;

    const id = product._id;
    if (productMap.has(id)) {
      // Increment quantity if product already exists
      const existingItem = productMap.get(id)!;
      existingItem.quantity += 1;
    } else {
      // Add new product with quantity 1
      productMap.set(id, { ...product, quantity: 1 });
    }
  });

  // Convert map values to array
  return Array.from(productMap.values());
};

// Async thunk for adding to cart
export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async (
    { product, userId }: { product: Product; userId?: string },
    { rejectWithValue, dispatch }
  ) => {
    if (!userId) {
      return rejectWithValue("Please login to add items to cart");
    }

    try {
      // First update local state to immediately reflect change in UI
      dispatch(cartSlice.actions.addToCartLocal(product));

      // Use the direct API call to the backend
      const userData = await ProfileService.addToCart(userId, product._id);

      // Update user cart state in userSlice
      if (userData && userData.cart) {
        // Process the flattened cart data from backend
        const processedCartItems = processCartItems(userData.cart);
        dispatch(cartSlice.actions.setProcessedCart(processedCartItems));
        dispatch(setCart(userData.cart));
      }

      return userData;
    } catch (error) {
      // Revert local state if API fails
      dispatch(cartSlice.actions.removeFromCartLocal(product._id));
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to add item to cart");
    }
  }
);

// Async thunk for removing from cart
export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCartAsync",
  async (
    { productId, userId }: { productId: string; userId?: string },
    { rejectWithValue, dispatch, getState }
  ) => {
    if (!userId) {
      return rejectWithValue("Please login to remove items from cart");
    }

    try {
      // Get cart state to check quantity
      const state = getState() as { cart: CartState };
      const item = state.cart.items.find((item) => item._id === productId);

      // First update local state
      if (item && item.quantity > 1) {
        // If quantity > 1, just decrement
        dispatch(
          cartSlice.actions.updateQuantityLocal({
            id: productId,
            quantity: item.quantity - 1,
          })
        );
      } else {
        // If quantity is 1, remove the item
        dispatch(cartSlice.actions.removeFromCartLocal(productId));
      }

      // Use the direct API call
      const userData = await ProfileService.removeFromCart(userId, productId);

      // Update user cart state in userSlice
      if (userData && userData.cart) {
        // Process the flattened cart data from backend
        const processedCartItems = processCartItems(userData.cart);
        dispatch(cartSlice.actions.setProcessedCart(processedCartItems));
        dispatch(setCart(userData.cart));
      }

      return userData;
    } catch (error) {
      console.error("Error removing item from cart:", error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to remove item from cart");
    }
  }
);

// Async thunk for updating quantity
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

    const { cart } = getState() as { cart: CartState };
    const originalItem = cart.items.find((item) => item._id === id);
    const originalQuantity = originalItem ? originalItem.quantity : 0;

    if (quantity < 1) {
      return rejectWithValue("Quantity must be at least 1");
    }

    try {
      // First update local state
      dispatch(cartSlice.actions.updateQuantityLocal({ id, quantity }));

      // Calculate the difference to determine needed API calls
      const quantityDiff = quantity - originalQuantity;

      // Helper function to execute repeated API calls
      const executeAPICalls = async (apiFn: Function, times: number) => {
        const promises = Array(times)
          .fill(null)
          .map(() => apiFn(userId, id));
        const results = await Promise.all(promises);
        return results[results.length - 1]; // Return last result
      };

      let userData;

      if (quantityDiff > 0) {
        // For increasing quantity, call addToCart multiple times
        userData = await executeAPICalls(
          ProfileService.addToCart,
          quantityDiff
        );
      } else if (quantityDiff < 0) {
        // For decreasing quantity, call removeFromCart multiple times
        userData = await executeAPICalls(
          ProfileService.removeFromCart,
          Math.abs(quantityDiff)
        );
      }

      // Update user cart state in userSlice if changes were made
      if (userData && userData.cart) {
        // Process the flattened cart data from backend
        const processedCartItems = processCartItems(userData.cart);
        dispatch(cartSlice.actions.setProcessedCart(processedCartItems));
        dispatch(setCart(userData.cart));
      }

      return { success: true };
    } catch (error) {
      // Revert to original quantity if API fails
      if (originalQuantity) {
        dispatch(
          cartSlice.actions.updateQuantityLocal({
            id,
            quantity: originalQuantity,
          })
        );
      }
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to update item quantity");
    }
  }
);

// Initialize cart from user profile
export const initializeCartFromProfile = createAsyncThunk(
  "cart/initializeFromProfile",
  async (cartItems: any[], { dispatch }) => {
    // Process the cart data from backend
    const processedCartItems = processCartItems(cartItems);
    dispatch(cartSlice.actions.setProcessedCart(processedCartItems));
    return cartItems;
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
    setProcessedCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      const totals = calculateCartTotals(state.items);
      Object.assign(state, totals);
    },
    clearCart: (state) => {
      Object.assign(state, initialState);
    },
    setCartFromProfile: (state, action: PayloadAction<Product[]>) => {
      // Process the flattened cart data
      const processedItems = processCartItems(action.payload);
      state.items = processedItems;

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
      })
      // Initialize cart from profile
      .addCase(initializeCartFromProfile.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  addToCartLocal,
  removeFromCartLocal,
  updateQuantityLocal,
  clearCart,
  setCartFromProfile,
  setProcessedCart,
} = cartSlice.actions;

export default cartSlice.reducer;
