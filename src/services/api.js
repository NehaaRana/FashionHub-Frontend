import axios from "axios";

const API = axios.create({
  // baseURL :"http://localhost:5041/api"
  baseURL :"https://localhost:7106/api"
});

//  Attach JWT Token Automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

//Register User
export const registerUser = (data) => {
  return API.post("/Users", data);
};

//Vendor Register
export const registerVendor = (data) => {
  return API.post("/Vendors/register", data);
};


export const getVendorByEmail = (email) => 
  API.get(`/Vendors/by-email/${email}`);


// update vendor
export const updateVendor = (id, data) =>
  API.put(`/Vendors/${id}`, data);

export const getPendingVendors = () =>
  API.get("/Vendors").then(res =>
    res.data.filter(v => v.approvedByAdmin === "Pending")
  );

export const updateVendorStatus = (id, status) =>
  API.put(`/Vendors/${id}`, { approvedByAdmin: status });

export const approveVendor = (id) => API.put(`/Vendors/approve/${id}`);
export const rejectVendor = (id) => API.put(`/Vendors/reject/${id}`);
// ================= AUTH =================

// Login (User + Vendor + Admin)
export const loginUser = (data) => {
  return API.post("/Auth/login", data);
};


//get user
export const getCurrentUser = () => API.get("/Auth/me");

// categories
export const getCategories = () => API.get("/Categories");

export const createCategory = (data) => API.post("/Categories", data);

export const deleteCategory = (id) => API.delete(`/Categories/${id}`);

export const updateCategory = (id, data) =>
  API.put(`/Categories/${id}`, data);


// coupons
export const getCoupons = () => API.get("/Coupons");

export const createCoupon = (data) =>
  API.post("/Coupons", data);

export const deleteCoupon = (id) =>
  API.delete(`/Coupons/${id}`);

export const updateCoupon = (id, data) =>
  API.put(`/Coupons/${id}`, data);

//Users
export const getUsers = () => API.get("/Users");

export const deleteUser = (id) =>
  API.delete(`/Users/${id}`);

//update user
export const updateUser = (id, data) =>
  API.put(`/Users/${id}`, data);


// Vendors

export const getVendors = () => API.get("/Vendors");

export const deleteVendor = (id) =>
  API.delete(`/Vendors/${id}`);

//Orders
export const getOrders = () => API.get("/Orders");

export const getVendorOrders = (vid) =>
  API.get(`/Orders/vendor/${vid}`);
// get order by user
export const getUserOrders = (uid) =>
  API.get(`/Orders/user/${uid}`);


export const getWishlist = () => API.get("/Wishlists");

//get wishlist by user
export const getUserWishlist = (uid) =>
  API.get(`/Wishlists/user/${uid}`);

//delete wishlist item
export const deleteWishlist = (id) =>
  API.delete(`/Wishlists/${id}`);

// add wishlist
export const addToWishlist = (data) =>
  API.post("/Wishlists", data);

//Products
// export const getVendorProducts = () => API.get("/Products");
export const getVendorProducts = (vid) =>
  API.get(`/Products/vendor/${vid}`);


// export const createProduct = (data) => API.post("/Products", data);

// export const updateProduct = (id, data) =>
//   API.put(`/Products/${id}`, data);

export const createProduct = (data) =>
  API.post("/Products", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateProduct = (id, data) =>
  API.put(`/Products/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteProduct = (id) =>
  API.delete(`/Products/${id}`);

// Get ALL products (Admin)
export const getAllProducts = () => API.get("/Products");

//wishlist
// ================= REVIEWS =================

// Get reviews for vendor
export const getVendorReviews = (vid) =>
  API.get(`/Reviews/vendor/${vid}`);

// Get all reviews (admin use)
export const getReviews = () => API.get("/Reviews");

// GET REVIEWS OF SPECIFIC PRODUCT
export const getProductReviews = (pid) =>
  API.get(`/Reviews/product/${pid}`);

// GET AVERAGE RATING
export const getAverageRating = (pid) =>
  API.get(`/Reviews/average/${pid}`);


// Create review (customer side)
export const createReview = (data) =>
  API.post("/Reviews", data);

// Update review
export const updateReview = (id, data) =>
  API.put(`/Reviews/${id}`, data);

// Delete review
export const deleteReview = (id) =>
  API.delete(`/Reviews/${id}`);



// CARTS
export const addToCart = (data) =>
  API.post("/Carts", data);

// Get all carts
export const getCarts = () =>
  API.get("/Carts");

// Delete cart item
export const deleteCartItem = (id) =>
  API.delete(`/Carts/${id}`);

// Update cart
export const updateCart = (id, data) =>
  API.put(`/Carts/${id}`, data);

// ORDERS
export const placeOrder = (data) =>
  API.post("/Orders", data);


// PAYMENTS
export const createPayment = (data) =>
  API.post("/Payments", data);

export const getPayments = () =>
  API.get("/Payments");


//Review
export const addReview = (data) =>
    API.post("/Reviews", data);


//coupon used by user
export const getUserCoupons = (uid) =>
  API.get(`/Coupons/user/${uid}`);

export const useCoupon = (couponId, data) =>
  API.put(`/Coupons/use/${couponId}`, data);

export const markCouponUsed = (couponId, data) =>
  API.put(`/Coupons/use/${couponId}`, data);

export default API;

