import axios from "axios";

const api = axios.create({
  baseURL: "https://smartstudy-ai-powered-learning-platform.onrender.com/api",
});

/* ================================
   REQUEST INTERCEPTOR
   Attach token automatically
================================= */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ================================
   RESPONSE INTERCEPTOR
   Handle token expiry
================================= */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url;

    const isLoginRoute = requestUrl?.includes("/auth/login");
    const isRegisterRoute = requestUrl?.includes("/auth/register");

    if (status === 401 && !isLoginRoute && !isRegisterRoute) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;