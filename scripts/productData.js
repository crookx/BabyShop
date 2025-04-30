const productTemplates = {
  clothing: {
    names: ['Baby Romper', 'Cotton Onesie', 'Sleep Suit', 'Baby Dress', 'Infant Sweater', 'Baby Pants', 'Bodysuit Set', 'Baby Socks Pack', 'Baby Cap Set', 'Fleece Jacket'],
    descriptions: ['Made from soft organic cotton', 'Comfortable and breathable', 'Perfect for daily wear', 'Adorable design for special occasions'],
    priceRange: { min: 500, max: 3500 },
    colors: ['White', 'Pink', 'Blue', 'Yellow', 'Green', 'Grey', 'Beige', 'Purple'],
    sizes: ['0-3M', '3-6M', '6-9M', '9-12M', '12-18M', '18-24M'],
    imagePrefix: 'clothing'
  },
  feeding: {
    names: ['Baby Bottle', 'Bottle Sterilizer', 'Bottle Warmer', 'Feeding Set', 'Sippy Cup', 'High Chair', 'Baby Bowl Set', 'Baby Spoon Set'],
    descriptions: ['BPA-free material', 'Easy to clean and sterilize', 'Perfect for feeding time', 'Microwave safe'],
    priceRange: { min: 800, max: 15000 },
    colors: ['Blue', 'Pink', 'Green', 'White'],
    imagePrefix: 'feeding'
  },
  diapering: {
    names: ['Diaper Pack', 'Changing Mat', 'Diaper Bag', 'Wipes Pack', 'Diaper Rash Cream', 'Diaper Pail', 'Baby Powder', 'Changing Station'],
    descriptions: ['Super absorbent', 'Gentle on baby skin', 'Long-lasting protection', 'Easy to use'],
    priceRange: { min: 300, max: 8000 },
    colors: ['White', 'Blue', 'Pink'],
    imagePrefix: 'diapering'
  },
  'bath-skincare': {
    names: ['Baby Shampoo', 'Baby Lotion', 'Bath Tub', 'Wash Cloth Set', 'Baby Oil', 'Bath Toys', 'Baby Soap', 'Bath Support'],
    descriptions: ['Gentle and tear-free', 'Moisturizing formula', 'Safe for sensitive skin', 'Dermatologist tested'],
    priceRange: { min: 400, max: 5000 },
    colors: ['Blue', 'Pink', 'White', 'Yellow'],
    imagePrefix: 'bath-skincare'
  },
  nursery: {
    names: ['Baby Crib', 'Changing Table', 'Nursery Storage', 'Baby Monitor', 'Night Light', 'Crib Mobile', 'Baby Dresser', 'Wall Decor'],
    descriptions: ['Safe and sturdy design', 'Modern nursery essential', 'Perfect for baby room', 'Easy assembly'],
    priceRange: { min: 5000, max: 50000 },
    colors: ['White', 'Natural Wood', 'Grey', 'Brown'],
    imagePrefix: 'nursery'
  },
  toys: {
    names: ['Rattle Set', 'Teething Toy', 'Play Mat', 'Soft Blocks', 'Musical Toy', 'Activity Gym', 'Plush Animal', 'Learning Cube'],
    descriptions: ['Educational and fun', 'Safe materials', 'Development focused', 'Age-appropriate design'],
    priceRange: { min: 500, max: 10000 },
    colors: ['Multicolor', 'Primary Colors', 'Pastel'],
    imagePrefix: 'toys'
  },
  safety: {
    names: ['Baby Gate', 'Corner Guards', 'Socket Covers', 'Safety Locks', 'Monitor Camera', 'Anti-Slip Mat', 'Door Stopper', 'Cabinet Lock'],
    descriptions: ['Child-proof design', 'Easy installation', 'Durable protection', 'Essential safety item'],
    priceRange: { min: 600, max: 12000 },
    colors: ['White', 'Clear', 'Black'],
    imagePrefix: 'safety'
  },
  travel: {
    names: ['Stroller', 'Car Seat', 'Travel Cot', 'Baby Carrier', 'Diaper Backpack', 'Travel Bottle Set', 'Portable Changing Mat', 'Travel High Chair'],
    descriptions: ['Lightweight and portable', 'Easy to fold', 'Travel-friendly design', 'Comfortable for baby'],
    priceRange: { min: 3000, max: 45000 },
    colors: ['Black', 'Grey', 'Navy', 'Red'],
    imagePrefix: 'travel'
  },
  'baby-potty': {
    names: ['Training Potty', 'Toilet Seat', 'Step Stool', 'Training Pants', 'Potty Book', 'Reward Chart', 'Travel Potty', 'Potty Guard'],
    descriptions: ['Easy to clean', 'Comfortable design', 'Perfect for training', 'Kid-friendly design'],
    priceRange: { min: 800, max: 6000 },
    colors: ['Blue', 'Pink', 'Green', 'White'],
    imagePrefix: 'baby-potty'
  },
  'baby-suits': {
    names: ['Party Suit', 'Formal Set', 'Special Occasion Dress', 'Tuxedo Set', 'Christening Gown', 'Wedding Outfit', 'Birthday Suit', 'Holiday Outfit'],
    descriptions: ['Elegant design', 'Premium fabric', 'Special occasion wear', 'Comfortable fit'],
    priceRange: { min: 2000, max: 15000 },
    colors: ['White', 'Black', 'Navy', 'Pink', 'Ivory'],
    sizes: ['0-3M', '3-6M', '6-12M', '12-18M', '18-24M'],
    imagePrefix: 'baby-suits'
  },
  'breast-pumps': {
    names: ['Electric Pump', 'Manual Pump', 'Double Pump Set', 'Pump Parts Kit', 'Pump Bottles', 'Storage Bags', 'Pump Cleaner', 'Pump Carry Bag'],
    descriptions: ['Efficient pumping', 'Quiet operation', 'Easy to clean', 'Portable design'],
    priceRange: { min: 3000, max: 35000 },
    colors: ['White', 'Pink', 'Purple'],
    imagePrefix: 'breast-pumps'
  },
  'breast-feeding': {
    names: ['Nursing Cover', 'Nursing Pillow', 'Milk Storage Bags', 'Nursing Pads', 'Nipple Cream', 'Feeding Timer', 'Nursing Bra', 'Lactation Supplements'],
    descriptions: ['Comfortable nursing', 'Easy storage solution', 'Essential for mothers', 'Premium quality'],
    priceRange: { min: 500, max: 8000 },
    colors: ['Black', 'Neutral', 'Floral Print'],
    imagePrefix: 'breast-feeding'
  },
  'carriers-beddings': {
    names: ['Baby Wrap', 'Structured Carrier', 'Crib Sheet Set', 'Baby Blanket', 'Sleep Sack', 'Swaddle Set', 'Bedding Bundle', 'Mattress Protector'],
    descriptions: ['Soft and cozy', 'Easy to use', 'Machine washable', 'Premium quality'],
    priceRange: { min: 1500, max: 20000 },
    colors: ['Grey', 'White', 'Pink', 'Blue', 'Neutral'],
    imagePrefix: 'carriers-beddings'
  },
  'feminine-care': {
    names: ['Maternity Pads', 'Postpartum Kit', 'Recovery Essentials', 'Care Package', 'Perineal Spray', 'Sitz Bath Set', 'Nursing Care Kit', 'Comfort Cushion'],
    descriptions: ['Postpartum care', 'Gentle comfort', 'Essential recovery item', 'Premium quality'],
    priceRange: { min: 800, max: 12000 },
    colors: ['White', 'Natural'],
    imagePrefix: 'feminine-care'
  },
  'nests-bassinets': {
    names: ['Baby Nest', 'Portable Bassinet', 'Co-Sleeper', 'Travel Crib', 'Bedside Sleeper', 'Moses Basket', 'Rocking Bassinet', 'Foldable Crib'],
    descriptions: ['Cozy sleeping space', 'Portable design', 'Safe co-sleeping', 'Easy assembly'],
    priceRange: { min: 4000, max: 40000 },
    colors: ['Grey', 'White', 'Beige', 'Pink', 'Blue'],
    imagePrefix: 'nests-bassinets'
  },
  pillows: {
    names: ['Nursing Pillow', 'Pregnancy Pillow', 'Baby Head Support', 'Travel Neck Pillow', 'Body Support Pillow', 'Reflux Wedge', 'Positioning Pillow', 'Memory Foam Pillow'],
    descriptions: ['Ergonomic design', 'Maximum comfort', 'Support and care', 'Premium materials'],
    priceRange: { min: 1000, max: 15000 },
    colors: ['Grey', 'White', 'Blue', 'Pink'],
    imagePrefix: 'pillows'
  },
  'swing-rockers': {
    names: ['Baby Swing', 'Bouncer Seat', 'Rocker Chair', 'Electric Cradle', 'Portable Swing', 'Musical Rocker', 'Comfort Seat', 'Auto Swing'],
    descriptions: ['Soothing motion', 'Multiple speeds', 'Comfortable seat', 'Easy to clean'],
    priceRange: { min: 5000, max: 45000 },
    colors: ['Grey', 'Beige', 'Blue', 'Pink'],
    imagePrefix: 'swing-rockers'
  },
  warmth: {
    names: ['Baby Blanket', 'Swaddle Wrap', 'Sleep Bag', 'Thermal Suit', 'Warming Pad', 'Winter Bundle', 'Fleece Set', 'Warming Bottle'],
    descriptions: ['Cozy warmth', 'Temperature control', 'Safe heating', 'Premium material'],
    priceRange: { min: 1000, max: 12000 },
    colors: ['Grey', 'White', 'Pink', 'Blue'],
    imagePrefix: 'warmth'
  }
};

const ageGroups = [
  '0-3 months', '3-6 months', '6-9 months', 
  '9-12 months', '12-18 months', '18-24 months', '2+ years'
];

export {
  productTemplates,
  ageGroups
};