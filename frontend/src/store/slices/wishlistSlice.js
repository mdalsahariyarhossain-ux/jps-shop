// src/store/slices/wishlistSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("wishlist")) || [],
  isLoggedIn: false,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setLoginState: (state, action) => {
      state.isLoggedIn = action.payload;

      // 🧹 When logging out → clear wishlist
      if (!action.payload) {
        state.items = [];
        localStorage.removeItem("wishlist");
      }
    },

    addToWishlist: (state, action) => {
      const exist = state.items.find((item) => item.id === action.payload.id);
      if (!exist) state.items.push({ ...action.payload });

      if (!state.isLoggedIn)
        localStorage.setItem("wishlist", JSON.stringify(state.items));
    },

    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },

    clearWishlist: (state) => {
      state.items = [];
      localStorage.removeItem("wishlist");
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  setLoginState,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
