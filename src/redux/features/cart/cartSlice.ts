import { TProduct } from "@/types/product";
import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  cartItems: TProduct[];
};

const initialState: TInitialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.cartQuantity += action.payload.cartQuantity;
      } else {
        state.cartItems.push(action.payload);
      }
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
    },

    updateQuantity: (state, action) => {
      const item = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.cartQuantity = action.payload.cartQuantity;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
