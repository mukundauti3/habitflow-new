import axios from "axios";

// ✅ use env variable (VERY IMPORTANT)
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// ✅ attach token properly
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`; // 🔥 FIXED
  }

  return req;
});

export default API;