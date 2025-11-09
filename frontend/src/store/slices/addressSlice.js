import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // addresses stored as { [userId]: [ { id, name, ... , isDefault? } ] }
  addresses: JSON.parse(localStorage.getItem("addresses")) || {},
  // defaultAddress stored as { [userId]: addressObject }
  defaultAddress: JSON.parse(localStorage.getItem("defaultAddress")) || {},
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    addAddress: (state, action) => {
      const { userId, address } = action.payload;
      if (!state.addresses[userId]) state.addresses[userId] = [];
      state.addresses[userId].push(address);
      localStorage.setItem("addresses", JSON.stringify(state.addresses));
    },

    removeAddress: (state, action) => {
      const { userId, index } = action.payload;
      if (state.addresses[userId]) {
        state.addresses[userId].splice(index, 1);
        // if removed address was default, clear default
        const def = state.defaultAddress[userId];
        if (def && def.id && !state.addresses[userId].some(a => a.id === def.id)) {
          delete state.defaultAddress[userId];
        }
        localStorage.setItem("addresses", JSON.stringify(state.addresses));
        localStorage.setItem("defaultAddress", JSON.stringify(state.defaultAddress));
      }
    },

    updateAddress: (state, action) => {
      const { userId, index, newAddress } = action.payload;
      if (state.addresses[userId] && state.addresses[userId][index]) {
        state.addresses[userId][index] = newAddress;
        // if this was default, update defaultAddress too
        const def = state.defaultAddress[userId];
        if (def && def.id === newAddress.id) {
          state.defaultAddress[userId] = newAddress;
        }
        localStorage.setItem("addresses", JSON.stringify(state.addresses));
        localStorage.setItem("defaultAddress", JSON.stringify(state.defaultAddress));
      }
    },

    // Set default by addressId (preferred) — ensures only one isDefault per user
    setDefaultAddress: (state, action) => {
      const { userId, addressId } = action.payload;
      const userAddresses = state.addresses[userId] || [];

      // mark isDefault only for chosen address
      userAddresses.forEach((addr) => {
        addr.isDefault = addr.id === addressId;
      });

      // set defaultAddress entry
      const chosen = userAddresses.find((a) => a.id === addressId) || null;
      if (chosen) {
        state.defaultAddress[userId] = chosen;
      } else {
        delete state.defaultAddress[userId];
      }

      // persist
      localStorage.setItem("addresses", JSON.stringify(state.addresses));
      localStorage.setItem("defaultAddress", JSON.stringify(state.defaultAddress));
    },

    loadAddresses: (state) => {
      state.addresses = JSON.parse(localStorage.getItem("addresses")) || {};
      state.defaultAddress = JSON.parse(localStorage.getItem("defaultAddress")) || {};
    },
  },
});

export const {
  addAddress,
  removeAddress,
  updateAddress,
  setDefaultAddress,
  loadAddresses,
} = addressSlice.actions;

export default addressSlice.reducer;
