// API Configuration
// Toggle between local development and production

const IS_PRODUCTION = false; // Set to true when deploying to production

export const API_BASE_URL = IS_PRODUCTION
    ? "https://my-ecommm.vercel.app"
    : "http://localhost:5000";

export const API_ENDPOINTS = {
    // Wishlist
    wishlist: `${API_BASE_URL}/api/wishlist`,
    wishlistById: (id) => `${API_BASE_URL}/api/wishlist/${id}`,

    // Products
    products: `${API_BASE_URL}/api/products`,
    productsById: (id) => `${API_BASE_URL}/api/products/${id}`,

    // Categories
    bags: `${API_BASE_URL}/api/Bags`,
    bagsById: (id) => `${API_BASE_URL}/api/Bags/${id}`,
    electronics: `${API_BASE_URL}/api/electronics`,
    electronicsById: (id) => `${API_BASE_URL}/api/electronics/${id}`,
    fashions: `${API_BASE_URL}/api/Fashions`,
    fashionsById: (id) => `${API_BASE_URL}/api/Fashions/${id}`,
    footwears: `${API_BASE_URL}/api/footwears`,
    footwearsById: (id) => `${API_BASE_URL}/api/footwears/${id}`,
    groceries: `${API_BASE_URL}/api/Groceries`,
    groceriesById: (id) => `${API_BASE_URL}/api/Groceries/${id}`,
    beauty: `${API_BASE_URL}/api/Beauty`,
    beautyById: (id) => `${API_BASE_URL}/api/Beauty/${id}`,

    // Cart
    cart: `${API_BASE_URL}/api/cart`,
    cartById: (id) => `${API_BASE_URL}/api/cart/${id}`,
    carts: `${API_BASE_URL}/api/carts`,
    cartsById: (id) => `${API_BASE_URL}/api/carts/${id}`,

    // Recommendations
    recommendations: `${API_BASE_URL}/api/recommendations`,
    recommendationsById: (id) => `${API_BASE_URL}/api/recommendations/${id}`,
};

export default API_ENDPOINTS;
