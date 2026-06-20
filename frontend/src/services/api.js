import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export const TOKEN_KEY = "labx_token";

//token header meh add krta h
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    const status = err?.response?.status;
    if (status === 401 && typeof window !== "undefined") {
      // Token invalid/expired — clear it. UI will redirect on next protected nav.
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem("labx_user");
    }
    const message =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Network error";
    return Promise.reject(Object.assign(new Error(message), { status, raw: err }));
  }
);

export default api;
