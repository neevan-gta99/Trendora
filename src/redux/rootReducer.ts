// rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import sellerAuthReducer from './features/seller/sellerAuthSlice';
import adminAuthReducer from './features/admin/adminAuthSlice';
import customerAuthSlice from './features/customer/customerAuthSlice'
import viewDetailsSlice from './features/customer/viewDetailsSlice'

const rootReducer = combineReducers({
  sellerAuth: sellerAuthReducer,
  adminAuth: adminAuthReducer,
  customerAuth: customerAuthSlice,
  viewDetails: viewDetailsSlice
});

export default rootReducer;
