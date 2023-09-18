import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cartReducer from './store/cartStore';
import { CartItem } from '../models/CartItem';

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
});

/* store */
const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
});

/* persistor */
const persistor = persistStore(store);

export { store, persistor };
