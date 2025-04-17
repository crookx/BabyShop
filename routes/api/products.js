const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');
const Category = require('../../models/Category');

// GET /api/products
router.get('/', async (req, res) => {
  try {
    let query = {};
    
    if (req.query.category) {
      const category = await Category.findOne({ slug: req.query.category });
      if (category) {
        query.category = category._id;
      }
    }

    const products = await Product.find(query)
      .populate('category')
      .sort({ createdAt: -1 });
      
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Other routes...
module.exports = router;