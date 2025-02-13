import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Product } from "@/commons/types/product";

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
  totalMRP: number;
  totalDiscount: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  totalMRP: 0,
  totalDiscount: 0,
};

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

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      console.log("Adding to cart:", action.payload);
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      const totals = calculateCartTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
      state.totalMRP = totals.totalMRP;
      state.totalDiscount = totals.totalDiscount;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);

      const totals = calculateCartTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
      state.totalMRP = totals.totalMRP;
      state.totalDiscount = totals.totalDiscount;
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item._id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }

      const totals = calculateCartTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
      state.totalMRP = totals.totalMRP;
      state.totalDiscount = totals.totalDiscount;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.totalMRP = 0;
      state.totalDiscount = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
