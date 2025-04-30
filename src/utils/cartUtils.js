import { addToCart, removeFromCart, fetchCartItems } from '../store/slices/cartSlice';
import { toast } from 'react-toastify';

export const handleCartAction = async (dispatch, { product, quantity = 1, isInCart }) => {
  try {
    if (isInCart) {
      const result = await dispatch(removeFromCart(product._id)).unwrap();
      if (result?.status === 'success') {
        toast.success('Removed from cart');
        await dispatch(fetchCartItems()).unwrap();
      }
    } else {
      const result = await dispatch(addToCart({ 
        productId: product._id, 
        quantity 
      })).unwrap();
      
      if (result?.status === 'success') {
        toast.success('Added to cart');
        await dispatch(fetchCartItems()).unwrap();
      }
    }
    return true;
  } catch (error) {
    toast.error(error?.message || 'Failed to update cart');
    console.error('Cart operation failed:', error);
    return false;
  }
};

export const isProductInCart = (cartItems, productId) => {
  return Array.isArray(cartItems) && cartItems.some(item => 
    item?.product?._id === productId
  );
};