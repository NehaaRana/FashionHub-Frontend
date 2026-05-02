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

//coupons
// coupons
export const getCoupons = () => API.get("/Coupons");

export const createCoupon = (data) =>
  API.post("/Coupons", data);

export const deleteCoupon = (id) =>
  API.delete(`/Coupons/${id}`);

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


export default API;