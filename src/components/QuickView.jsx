const handleAddToCart = async () => {
  if (!product || !product.price) {
    console.error('Invalid product data');
    return;
  }
  
  try {
    const result = await dispatch(addToCart({ 
      productId: product._id, 
      quantity: 1 
    })).unwrap();
    
    if (result?.status === 'success') {
      toast.success('Added to cart');
    }
  } catch (error) {
    toast.error(error?.message || 'Failed to add to cart');
  }
};