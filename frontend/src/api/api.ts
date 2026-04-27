import axios from "axios";

// 🔥 directly use Railway backend URL
const API = axios.create({
  baseURL: "https://your-backend-url.up.railway.app", // 👈 replace this
});

// ✅ attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;