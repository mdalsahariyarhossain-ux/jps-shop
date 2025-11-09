import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import cartReducer from './slices/cartSlice'
import productReducer from './slices/productSlice'
import wishlistReducer from './slices/wishlistSlice'
import addressReducer from "./slices/addressSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    products: productReducer,
    address: addressReducer,
  },
});
