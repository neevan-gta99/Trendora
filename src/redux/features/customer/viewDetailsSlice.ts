// productSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { WholeProduct } from "@/DTOs/productDetails.ts";

interface ProductState {
  selectedProduct: WholeProduct | null;
}

const initialState: ProductState = {
  selectedProduct: null,
};

const viewDetailSlice = createSlice({
  name: "viewDetailSlice",
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<WholeProduct>) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
});

export const { setSelectedProduct, clearSelectedProduct } = viewDetailSlice.actions;
export default viewDetailSlice.reducer;
