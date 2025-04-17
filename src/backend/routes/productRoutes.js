import express from 'express';
import Product from '../models/Product.js';
import Offer from '../models/Offer.js';

const router = express.Router();

// Get featured products
router.get('/products/featured', async (req, res) => {
  try {
    const products = await Product.find({ featured: true })
      .limit(4)
      .lean();
    
    console.log('Found featured products:', products);
    res.json({
      status: 'success',
      data: products
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Get special offers
router.get('/products/offers', async (req, res) => {
  try {
    const offers = await Offer.find()
      .populate('productId')
      .lean();

    const formattedOffers = offers.map(offer => ({
      _id: offer._id,
      name: offer.name,
      productName: offer.productId?.name,
      image: offer.productId?.image,
      price: offer.productId?.price,
      discountedPrice: offer.productId?.price * (1 - offer.discount/100),
      discount: offer.discount,
      timeLeft: getTimeLeft(offer.endDate),
      remaining: offer.remainingQuantity,
      total: offer.totalQuantity,
      productId: offer.productId?._id,
      isActive: true
    }));

    console.log('Formatted offers:', formattedOffers);

    res.json({
      status: 'success',
      data: { offers: formattedOffers }
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

// Get specific product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found'
      });
    }
    res.json({
      status: 'success',
      data: { product }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Get products with pagination and filters
router.get('/products', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const sort = req.query.sort || 'newest';
    
    const query = {};
    if (req.query.category) query.category = req.query.category;
    if (req.query.ageGroup) query.ageGroup = req.query.ageGroup;
    if (req.query.priceRange) {
      const [min, max] = req.query.priceRange.split('-');
      query.price = { $gte: min, $lte: max };
    }

    const sortOptions = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      priceHigh: { price: -1 },
      priceLow: { price: 1 }
    };

    const products = await Product.find(query)
      .sort(sortOptions[sort])
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Product.countDocuments(query);

    res.json({
      status: 'success',
      data: {
        products,
        pagination: {
          page,
          totalPages: Math.ceil(total / limit),
          totalItems: total
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

function getTimeLeft(endDate) {
  if (!endDate) return '0d 0h';
  
  const now = new Date();
  const end = new Date(endDate);
  const timeLeft = end - now;
  
  if (timeLeft < 0) return '0d 0h';
  
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  return `${days}d ${hours}h`;
}

export default router;