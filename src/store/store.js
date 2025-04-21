import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { api } from './services/api';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';  // Update import path
import uiReducer from './slices/uiSlice';
import wishlistReducer from './slices/wishlistSlice';
import categoryReducer from './slices/categorySlice';
import notificationReducer from './slices/notificationSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart', 'categories'] // Add categories to whitelist
};

// Create persisted reducers
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedCategoryReducer = persistReducer(persistConfig, categoryReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    cart: cartReducer,
    products: productReducer, // Updated product reducer import
    ui: uiReducer,
    wishlist: wishlistReducer,
    categories: persistedCategoryReducer, // Use persisted category reducer
    notification: notificationReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    }).concat(api.middleware),
  devTools: true
});

export const persistor = persistStore(store);