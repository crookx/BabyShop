import Product from '../models/Product.js';
import asyncHandler from 'express-async-handler';

export const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  const query = {};
  if (req.query.category) query.category = req.query.category;
  if (req.query.ageGroup) query.ageGroup = req.query.ageGroup;
  if (req.query.priceRange) {
    const [min, max] = req.query.priceRange.split('-');
    query.price = { $gte: min, $lte: max };
  }

  const [products, total] = await Promise.all([
    Product.find(query).skip(skip).limit(limit),
    Product.countDocuments(query)
  ]);

  res.json({
    products,
    pagination: {
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total
    }
  });
});

// Separate handler for offers
export const getOffers = asyncHandler(async (req, res) => {
  const products = await Product.find({ isOnSale: true });
  res.json(products);
});

export const getSpecialOffers = async (req, res) => {
  try {
    const offers = await Offer.find()
      .populate('productId', 'name image price')
      .sort('-createdAt')
      .limit(4);

    const formattedOffers = offers.map(offer => {
      const product = offer.productId;
      const originalPrice = product?.price || 0;
      const discountedPrice = originalPrice * (1 - offer.discount / 100);

      return {
        _id: offer._id,
        name: offer.name,
        productName: product?.name,
        image: product?.image,
        price: originalPrice,
        discountedPrice: Math.round(discountedPrice * 100) / 100,
        discount: offer.discount,
        timeLeft: getTimeLeft(offer.endDate),
        remaining: offer.remainingQuantity,
        total: offer.totalQuantity,
        productId: product?._id,
        isActive: true
      };
    });

    console.log('Formatted offers:', formattedOffers);

    res.json({
      status: 'success',
      data: {
        offers: formattedOffers
      }
    });
  } catch (error) {
    console.error('Error fetching offers:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json(product);
});

export const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ featured: true })
    .limit(4)
    .lean();

  console.log('Found featured products:', products.length);

  res.json({
    status: 'success',
    data: {
      products
    }
  });
});

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().lean();
  
  res.json({
    status: 'success',
    data: categories
  });
});

// Add other controller methods...