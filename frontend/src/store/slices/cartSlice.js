// src/store/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
  isLoggedIn: false, // track login state
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setLoginState: (state, action) => {
      state.isLoggedIn = action.payload;

      // 🧹 When logging out → clear localStorage and cart
      if (!action.payload) {
        state.items = [];
        localStorage.removeItem("cartItems");
      }
    },

    addToCart: (state, action) => {
      const exist = state.items.find((i) => i.id === action.payload.id);
      if (exist) exist.qty += 1;
      else state.items.push({ ...action.payload, qty: 1 });

      // 🧠 Only store locally if not logged in
      if (!state.isLoggedIn)
        localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    changeQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) item.qty = action.payload.qty;
      if (!state.isLoggedIn)
        localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  changeQty,
  clearCart,
  setLoginState,
} = cartSlice.actions;
export default cartSlice.reducer;
