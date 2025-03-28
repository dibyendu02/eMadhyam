// src/store/slices/productSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "@/commons/types/product";
import { ProductService } from "@/services/api/productService";

interface ProductState {
  items: Product[];
  currentProduct: Product | null;
  categoryProducts: Product[];
  typeProducts: Product[]; // Added for product type filtering
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  categoryProducts: [],
  typeProducts: [], // Initialize the new state for type products
  currentProduct: null,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const products = await ProductService.getAllProducts();
      return products;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const product = await ProductService.getProductById(id);
      return product;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchProductsByCategoryId = createAsyncThunk(
  "products/fetchByCategoryId",
  async (id: string, { rejectWithValue }) => {
    try {
      const products = await ProductService.getProductByCategoryId(id);
      return products;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// New thunk for fetching products by product type
export const fetchProductsByProductType = createAsyncThunk(
  "products/fetchByProductType",
  async (id: string, { rejectWithValue }) => {
    try {
      const products = await ProductService.getProductByProductTypeId(id);
      return products;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    // If you need to update a product manually (e.g. for testing)
    updateProductCodAvailability: (state, action) => {
      const { productId, isCodAvailable } = action.payload;
      const product = state.items.find((item) => item._id === productId);
      if (product) {
        product.isCodAvailable = isCodAvailable;
      }
      if (state.currentProduct && state.currentProduct._id === productId) {
        state.currentProduct.isCodAvailable = isCodAvailable;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle fetchProductById cases
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle fetchProductsByCategoryId cases
      .addCase(fetchProductsByCategoryId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategoryId.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryProducts = action.payload;
      })
      .addCase(fetchProductsByCategoryId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle fetchProductsByProductType cases
      .addCase(fetchProductsByProductType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByProductType.fulfilled, (state, action) => {
        state.loading = false;
        state.typeProducts = action.payload;
      })
      .addCase(fetchProductsByProductType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentProduct, updateProductCodAvailability } =
  productSlice.actions;
export default productSlice.reducer;
