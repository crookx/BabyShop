require('dotenv').config();
const mongoose = require('mongoose');
const { productTemplates, ageGroups } = require('./productData');

// Define schemas
const CategorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String
});

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  ageGroup: String,
  colors: [String],
  sizes: [String],
  stock: Number,
  rating: Number,
  featured: Boolean,
  image: String
});

// Create models
const Category = mongoose.model('Category', CategorySchema);
const Product = mongoose.model('Product', ProductSchema);

const generateProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get all categories
    const categories = await Category.find();
    console.log(`Found ${categories.length} categories`);
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    let products = [];
    
    for (const category of categories) {
      const template = productTemplates[category.slug] || {
        names: [`${category.name} Product`],
        descriptions: [category.description],
        priceRange: { min: 1000, max: 20000 },
        colors: ['Default'],
        imagePrefix: category.slug
      };
      
      // Generate 40 products for each category
      for (let i = 1; i <= 40; i++) {
        const productNumber = i.toString().padStart(2, '0');
        const name = template.names[Math.floor(Math.random() * template.names.length)] + ` ${productNumber}`;
        const description = template.descriptions[Math.floor(Math.random() * template.descriptions.length)];
        const price = Math.floor(Math.random() * (template.priceRange.max - template.priceRange.min) + template.priceRange.min);
        
        products.push({
          name,
          description,
          price,
          category: category._id,
          ageGroup: ageGroups[Math.floor(Math.random() * ageGroups.length)],
          colors: template.colors || [],
          sizes: template.sizes || [],
          stock: Math.floor(Math.random() * 190) + 10, // 10-200
          rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)), // 3.5-5.0
          featured: Math.random() < 0.2, // 20% chance to be featured
          image: `/images/products/${category.slug}/${name.toLowerCase().replace(/ /g, '-')}.jpg`
        });
      }
    }
    
    // Insert all products
    await Product.insertMany(products);
    console.log(`Successfully seeded ${products.length} products`);
    
  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

generateProducts();