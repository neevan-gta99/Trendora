// store/homepageSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from '@/config/apiConfig';
import type { HomepageState, HomepageData, MiniProduct } from '@/DTOs/productDetails.ts';

// Initial state matching your pattern
const initialState: HomepageState = {
    data: null,
    loading: false,
    error: null,
    lastFetched: null,
    filteredProducts: [],
};

// Async thunk with proper typing
export const fetchHomepageData = createAsyncThunk(
  'homepage/fetchHomepageData',
  async (_, { rejectWithValue }) => {
    console.log("📡 Homepage thunk triggered...");
    try {
      const response = await fetch(`${BASE_URL}/api/getProduct/homepage`);
      console.log("📥 Response status:", response.status);

      if (!response.ok) {
        return rejectWithValue(`Failed to fetch homepage data: ${response.status}`);
      }

      const data: HomepageData = await response.json();
      console.log("✅ Homepage data received:", data);
      return data;
    } catch (err) {
      console.error('❌ Homepage fetch failed:', err);
      return rejectWithValue(`Network error ${err}`);
    }
  }
);


const homepageSlice = createSlice({
    name: 'homepage',
    initialState,
    reducers: {
        clearHomepageData: (state) => {
            state.data = null;
            state.lastFetched = null;
            state.error = null;
        },
        setHomepageData: (state, action: PayloadAction<HomepageData>) => {
            state.data = action.payload;
            state.lastFetched = new Date().toISOString();
            state.error = null;
        },
        // Helper to get products by schema
        getProductsBySchema: (state, action: PayloadAction<string>) => {
            if (!state.data) {
                state.filteredProducts = [];
                return;
            }

            const schema = action.payload;
            const products: MiniProduct[] = [];

            Object.values(state.data.productInfo.showcases).forEach(showcase => {
                if (showcase.sourceSchemas.includes(schema)) {
                    products.push(...showcase.data);
                }
            });

            state.filteredProducts = products; // ✅ State modify karo
        },
        clearFilteredProducts: (state) => {
            state.filteredProducts = []; // ✅ Clear karne ke liye bhi reducer
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHomepageData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHomepageData.fulfilled, (state, action) => { 
                console.log('✅ Homepage data fetched:', action.payload); 
                state.data = action.payload;
                state.lastFetched = new Date().toISOString();
                state.error = null;
            })
            .addCase(fetchHomepageData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Unknown error occurred';
            });
    },
});

export const { clearHomepageData, setHomepageData } = homepageSlice.actions;
export default homepageSlice.reducer;