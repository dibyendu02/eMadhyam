// src/store/slices/commonSlice.ts
import { ColorType, PlantType, ProductType } from "@/commons/types/product";
import { CommonService } from "@/services/api/commonService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Helper function to create a slug from a string
const createSlugFromName = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, "-");
};

interface CommonState {
  colors: ColorType[];
  productTypes: ProductType[];
  plantTypes: PlantType[];
  loading: boolean;
  error: string | null;
}

const initialState: CommonState = {
  colors: [],
  productTypes: [],
  plantTypes: [],
  loading: false,
  error: null,
};

export const fetchColors = createAsyncThunk(
  "colors/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const colors = await CommonService.getAllColors();
      return colors;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchProductTypes = createAsyncThunk(
  "productTypes/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const productTypes = await CommonService.getAllProductTypes();

      // Add slug property to product types if it doesn't exist
      const typesWithSlugs = productTypes.map((type) => ({
        ...type,
        slug: type.slug || createSlugFromName(type.name),
        // Ensure id exists (some APIs might return _id instead of id)
        id: type.id || type._id,
      }));

      return typesWithSlugs;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchPlantTypes = createAsyncThunk(
  "plantTypes/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const plantTypes = await CommonService.getAllPlantTypes();
      return plantTypes;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchColors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchColors.fulfilled, (state, action) => {
        state.loading = false;
        state.colors = action.payload;
      })
      .addCase(fetchColors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProductTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.productTypes = action.payload;
      })
      .addCase(fetchProductTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPlantTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlantTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.plantTypes = action.payload;
      })
      .addCase(fetchPlantTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default commonSlice.reducer;
