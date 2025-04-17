const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');

// Get wishlist
exports.getWishlist = asyncHandler(async (req, res) => {
  let wishlist = await Wishlist.findOne({ user: req.user._id })
    .populate('products', 'name price image description');

  if (!wishlist) {
    wishlist = await Wishlist.create({ user: req.user._id, products: [] });
  }

  res.json(wishlist.products);
});

// Add to wishlist
exports.addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  let wishlist = await Wishlist.findOne({ user: req.user._id });
  if (!wishlist) {
    wishlist = await Wishlist.create({ user: req.user._id, products: [] });
  }

  if (!wishlist.products.includes(productId)) {
    wishlist.products.push(productId);
    await wishlist.save();
  }

  await wishlist.populate('products', 'name price image description');
  res.json(wishlist.products);
});

// Remove from wishlist
exports.removeFromWishlist = asyncHandler(async (req, res) => {
  const productId = req.params.productId;

  const wishlist = await Wishlist.findOne({ user: req.user._id });
  if (!wishlist) {
    res.status(404);
    throw new Error('Wishlist not found');
  }

  wishlist.products = wishlist.products.filter(
    product => product.toString() !== productId
  );

  await wishlist.save();
  res.json({ message: 'Product removed from wishlist' });
});