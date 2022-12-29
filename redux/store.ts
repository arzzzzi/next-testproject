import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import cart from './cart/cart.slice';
import favorite from './favorites/favorite.slice';
import { productApi } from './products/product.api';

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    cart,
    favorite,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
