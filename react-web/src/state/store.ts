import { configureStore } from '@reduxjs/toolkit';
import persistedReducer from './reducers/reducers';
import { persistStore } from 'redux-persist';

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor }; 