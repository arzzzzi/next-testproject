import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import cartActions from '../redux/cart/cart.slice';
import favoriteActions from '../redux/favorites/favorite.slice';

const allActions = {
  ...cartActions,
  ...favoriteActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(allActions, dispatch);
};
