import axios from "axios";

const API = axios.create({
  baseURL :"https://localhost:7106/api"
});

// Optional: Add token automatically (future use)
API.interceptors.request.use((req) => {
  const user = localStorage.getItem("user");

  if (user) {
    const parsedUser = JSON.parse(user);
    req.headers.Authorization = `Bearer ${parsedUser?.token}`;
  }

  return req;
});

//Register User
export const registerUser = (data) => {
  return API.post("/Users", data);
};


//Login User
export const loginUser = (data) => {
  return API.post("/Users/login", data);
};

export default API;