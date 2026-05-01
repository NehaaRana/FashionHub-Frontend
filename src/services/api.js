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
export const getCategories = () => API.get("/categories");

export const createCategory = (data) => API.post("/categories", data);

export const deleteCategory = (id) => API.delete(`/categories/${id}`);
export default API;