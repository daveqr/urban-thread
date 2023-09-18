import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cartReducer from './cartSlice';
import { CartItem } from '../models/CartItem';
import { apiSlice } from '../apiSlice';
import { useDispatch } from 'react-redux';

/* state */
export interface RootState {
  cart: {
    cartItems: Array<CartItem>;
  };
  // TODO implement this
  // user: {
  //   currentUser: User | null;
  // };
}

const persistConfig = {
  // TODO make this unique per user
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  cart: cartReducer,
  [apiSlice.reducerPath]: apiSlice.reducer
});

/* store */
const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});

/* persistor */
const persistor = persistStore(store);

export { store, persistor };

export type AppDispatch = typeof store.dispatch
