import axios from "axios";

// ✅ backend URL (Railway)
const API = axios.create({
  baseURL: "https://habitflow-new-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ attach token properly
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// ✅ handle response errors (VERY IMPORTANT)
API.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error("API Error:", error?.response?.data || error.message);

    // optional: auto logout if token invalid
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
    }

    return Promise.reject(error);
  }
);

export default API;