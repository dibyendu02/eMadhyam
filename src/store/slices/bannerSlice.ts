// store/slices/bannerSlice.ts
import { Banner, BannerService } from "@/services/api/BannerService";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface BannerState {
  banners: Banner[];
  mainBanner: Banner | null;
  offerBanner: Banner | null;
  loading: boolean;
  error: string | null;
}

const initialState: BannerState = {
  banners: [],
  mainBanner: null,
  offerBanner: null,
  loading: false,
  error: null,
};

// Async thunk for fetching all banners
export const fetchBanners = createAsyncThunk(
  "banners/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await BannerService.getAllBanners();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const bannerSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchBanners.fulfilled,
        (state, action: PayloadAction<Banner[]>) => {
          state.loading = false;
          state.banners = action.payload;

          // Set main and offer banners
          state.mainBanner =
            action.payload.find((b) => b.type === "main") || null;
          state.offerBanner =
            action.payload.find((b) => b.type === "offer") || null;
        }
      )
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bannerSlice.reducer;
