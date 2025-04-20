import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productReducer from '../features/products/productSlice';
import uiReducer from './slices/uiSlice';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'wishlist']
};

const store = configureStore({
  reducer: {
    products: productReducer,
    ui: uiReducer,
    cart: cartReducer,
    wishlist: wishlistReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
});

export const persistor = persistStore(store);
export default store;