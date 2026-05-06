import axios from "axios";

const API = axios.create({
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


// Vendors

export const getVendors = () => API.get("/Vendors");

export const deleteVendor = (id) =>
  API.delete(`/Vendors/${id}`);

//Orders
export const getOrders = () => API.get("/Orders");



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


// ================= REVIEWS =================

// Get reviews for vendor
export const getVendorReviews = (vid) =>
  API.get(`/Reviews/vendor/${vid}`);

// Get all reviews (admin use)
export const getReviews = () => API.get("/Reviews");

// Create review (customer side)
export const createReview = (data) =>
  API.post("/Reviews", data);

// Update review
export const updateReview = (id, data) =>
  API.put(`/Reviews/${id}`, data);

// Delete review
export const deleteReview = (id) =>
  API.delete(`/Reviews/${id}`);

export default API;