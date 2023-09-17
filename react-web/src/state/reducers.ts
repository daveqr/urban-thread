import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import cartReducer from './store/cartStore';
import persistConfig from './persistConfig';

const rootReducer = combineReducers({
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
