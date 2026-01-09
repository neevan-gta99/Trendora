// rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import sellerAuthReducer from './features/seller/sellerAuthSlice';
import adminAuthReducer from './features/admin/adminAuthSlice';
import customerAuthReducer from './features/customer/customerAuthSlice'
import viewDetailsReducer from './features/customer/viewDetailsSlice'
import homepageReducer from './features/customer/homepageSlice'


const rootReducer = combineReducers({
  sellerAuth: sellerAuthReducer,
  adminAuth: adminAuthReducer,
  customerAuth: customerAuthReducer,
  viewDetails: viewDetailsReducer,
  homepage: homepageReducer
});

export default rootReducer;
