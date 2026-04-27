import axios from "axios";

// 🔥 YOUR REAL BACKEND URL
const API = axios.create({
  baseURL: "https://habitflow-new-production.up.railway.app",
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