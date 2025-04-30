const Cart = require('../models/Cart');
const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');

// Get cart
exports.getCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id })
    .populate('items.product', 'name price image');

  if (!cart) {
    cart = await Cart.create({ user: req.user._id, items: [] });
  }

  res.json({
    items: cart.items,
    totalItems: cart.items.reduce((total, item) => total + item.quantity, 0),
    totalAmount: cart.totalAmount
  });
});

// Add to cart
exports.addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = await Cart.create({ user: req.user._id, items: [] });
  }

  const existingItem = cart.items.find(item => 
    item.product.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      product: productId,
      quantity,
      price: product.price
    });
  }

  await cart.save();
  await cart.populate('items.product', 'name price image');

  res.json({
    items: cart.items,
    totalItems: cart.items.reduce((total, item) => total + item.quantity, 0),
    totalAmount: cart.totalAmount
  });
});

// Update cart item quantity
exports.updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const productId = req.params.productId;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  const cartItem = cart.items.find(item => 
    item.product.toString() === productId
  );

  if (!cartItem) {
    res.status(404);
    throw new Error('Item not found in cart');
  }

  cartItem.quantity = quantity;
  await cart.save();
  await cart.populate('items.product', 'name price image');

  res.json({
    items: cart.items,
    totalItems: cart.items.reduce((total, item) => total + item.quantity, 0),
    totalAmount: cart.totalAmount
  });
});

// Remove from cart
exports.removeFromCart = asyncHandler(async (req, res) => {
  const productId = req.params.productId;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  cart.items = cart.items.filter(item => 
    item.product.toString() !== productId
  );

  await cart.save();
  await cart.populate('items.product', 'name price image');

  // Return consistent response format
  res.json({
    items: cart.items,
    totalItems: cart.items.reduce((total, item) => total + item.quantity, 0),
    totalAmount: cart.items.reduce((total, item) => total + (item.quantity * item.product.price), 0)
  });
});