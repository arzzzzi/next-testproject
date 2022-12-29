import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem } from '../../models';
import { Cart } from '../../models';
import { RootState } from '../store';

const initialState: Cart = {
  items: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItems: (state, action: PayloadAction<ICartItem>) => {
      state.items.push({
        ...action.payload,
      });
      const tempItem = state.items.find((item) => item.id === action.payload.id);
      if (tempItem) {
        const tempCart = state.items.map((item) => {
          if (item.id === action.payload.id) {
            let newCount = item.count + action.payload.count;
            let newTotalPrice = newCount * item.price * 70;
            return { ...item, count: newCount, totalPrice: newTotalPrice };
          } else {
            return item;
          }
        });
      }
    },
    removeItems: (state, action: PayloadAction<number>) => {
      const tempCart = state.items.filter((item) => item.id !== action.payload);
      state.items = tempCart;
    },
  },
});

export const { addItems, removeItems } = cartSlice.actions;

export default cartSlice.reducer;

export const selectCart = (state: RootState) => state.cart;

export const selectCartItemByID = (id: number) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);
