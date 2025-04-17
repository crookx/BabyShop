export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  SHOP: '/shop',
  PRODUCTS: '/products',
  CATEGORIES: '/categories',
  CART: '/cart',
  WISHLIST: '/wishlist',
  PROFILE: '/profile',
  PRODUCT_DETAILS: '/product/:id'
};

export const getBannerActions = () => [
  {
    title: "Welcome to Qaran Baby Shop",
    subtitle: "The Best for Your Little Ones",
    image: "/images/baby-clothing.jpg",
    cta: {
      text: "Shop Now",
      link: ROUTES.PRODUCTS,
      variant: "contained",
      color: "primary"
    }
  },
  {
    title: "Explore Our Categories",
    subtitle: "Find Perfect Products for Every Age",
    image: "/images/bath-care.jpg",
    cta: {
      text: "Explore",
      link: ROUTES.CATEGORIES,
      variant: "contained",
      color: "secondary"
    }
  },
  {
    title: "New Arrivals",
    subtitle: "Latest Baby Collection",
    image: "/images/baby-toys.jpg",
    cta: {
      text: "View Collection",
      link: ROUTES.PRODUCTS,
      variant: "outlined",
      color: "primary"
    }
  }
];