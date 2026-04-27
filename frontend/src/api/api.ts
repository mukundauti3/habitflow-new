import axios from "axios";

// ✅ backend URL (Railway)
const API = axios.create({
  baseURL: "https://habitflow-new-production.up.railway.app",
  timeout: 30000, // 🔥 IMPORTANT: wait for Railway wake-up
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

// ✅ handle response errors + retry logic
API.interceptors.response.use(
  (res) => res,
  async (error) => {
    console.error("API Error:", error?.response?.data || error.message);

    // 🔥 HANDLE RAILWAY SLEEP (AUTO RETRY ONCE)
    if (
      error.code === "ECONNABORTED" || // timeout
      error.message.includes("timeout") ||
      error.message.includes("Network Error")
    ) {
      console.warn("⚠️ Server sleeping... retrying request");

      try {
        // retry request once
        return await API.request(error.config);
      } catch (retryError) {
        return Promise.reject(retryError);
      }
    }

    // 🔐 auto logout if token invalid
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
    }

    return Promise.reject(error);
  }
);

export default API;