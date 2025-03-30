import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/commons/types/product";
import { ProductService } from "@/services/api/productService";

// Define the state interface
interface SearchState {
  searchResults: Product[];
  recentSearches: string[];
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: SearchState = {
  searchResults: [],
  recentSearches: [],
  loading: false,
  error: null,
};

// Create the async thunk for searching products
export const searchProducts = createAsyncThunk(
  "search/searchProducts",
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await ProductService.searchProducts(query);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to search products");
    }
  }
);

// Create the search slice
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    addRecentSearch: (state, action: PayloadAction<string>) => {
      // Add to recent searches if not already present
      if (!state.recentSearches.includes(action.payload)) {
        // Keep only the last 5 searches
        state.recentSearches = [
          action.payload,
          ...state.recentSearches.slice(0, 4),
        ];
      }
    },
    clearRecentSearches: (state) => {
      state.recentSearches = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        searchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.searchResults = action.payload;
          state.loading = false;
        }
      )
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { clearSearchResults, addRecentSearch, clearRecentSearches } =
  searchSlice.actions;
export default searchSlice.reducer;
