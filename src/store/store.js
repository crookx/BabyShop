import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { productApi } from './apis/productApi';
import { reviewApi } from './apis/reviewApi';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import compareReducer from './slices/compareSlice';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';
import categoryReducer from './slices/categorySlice';
import productReducer from './slices/productSlice';
import productDetailReducer from './slices/productDetailSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart', 'wishlist']
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    compare: compareReducer,
    user: userReducer,
    auth: persistedAuthReducer,
    categories: categoryReducer,
    products: productReducer,
    productDetail: productDetailReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    }).concat([
      productApi.middleware,
      reviewApi.middleware
    ]),
  devTools: process.env.NODE_ENV !== 'production'
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
export default store;