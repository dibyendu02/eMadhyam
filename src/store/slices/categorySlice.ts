// src/store/slices/productSlice.ts
import { Collection } from "@/commons/types/collection";
import { CategoryType } from "@/commons/types/product";
import { ProductService } from "@/services/api/productService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppImages } from "../../../public/images/images";

interface CategoryState {
  items: Collection[];
  currentCategory: Collection | null;
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  items: [],
  currentCategory: null,
  loading: false,
  error: null,
};

const transformCategoryToCollection = (category: CategoryType): Collection => {
  return {
    id: category._id,
    title: category.name,
    slug: category.name.toLowerCase().replace(/\s+/g, "-"),
    imageUrl: AppImages.catgoeryIcon,
    featured: true,
  };
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const categories = await ProductService.getAllCategory();
      return categories.map(transformCategoryToCollection);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {} = categorySlice.actions;
export default categorySlice.reducer;
