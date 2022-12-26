import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../models';

const initialState: IProduct[] = [];

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    likeItem: (state, action: PayloadAction<IProduct>) => {
      state.push(action.payload);
    },
    dislikeItem: (state, action: PayloadAction<{ id: number }>) => {
      return state.filter((p) => p.id !== action.payload.id);
    },
  },
});

export const favoriteReducer = favoriteSlice.reducer;
export const favoriteActions = favoriteSlice.actions;
