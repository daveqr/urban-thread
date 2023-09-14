import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import cartReducer from './cartReducer';
import persistConfig from '../persistConfig';

const rootReducer = combineReducers({
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
