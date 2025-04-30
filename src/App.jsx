import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import MainLayout from './layouts/MainLayout';
import NewAuthPage from './pages/NewAuthPage';
import LoadingScreen from './components/common/LoadingScreen';
import 'react-toastify/dist/ReactToastify.css';

const Home = React.lazy(() => import('./pages/Home'));
const Products = React.lazy(() => import('./pages/Products'));
const ProductDetail = React.lazy(() => import('./pages/ProductDetail'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Wishlist = React.lazy(() => import('./pages/Wishlist'));

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/auth" element={<NewAuthPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={
            <Suspense fallback={<LoadingScreen />}>
              <Home />
            </Suspense>
          } />
          <Route path="products" element={
            <Suspense fallback={<LoadingScreen />}>
              <Products />
            </Suspense>
          } />
          <Route path="product/:id" element={
            <Suspense fallback={<LoadingScreen />}>
              <ProductDetail />
            </Suspense>
          } />
          <Route path="cart" element={
            <Suspense fallback={<LoadingScreen />}>
              <Cart />
            </Suspense>
          } />
          <Route path="wishlist" element={
            <Suspense fallback={<LoadingScreen />}>
              <Wishlist />
            </Suspense>
          } />
        </Route>
      </Routes>
    </>
  );
}

export default App;