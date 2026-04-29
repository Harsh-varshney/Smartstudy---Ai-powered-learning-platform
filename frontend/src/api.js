import axios from "axios";

const api = axios.create({
  baseURL: "https://smartstudy-ai-powered-learning-platform.onrender.com/api",
  // baseURL : "http://localhost:5000/api",
});

/* ================================
   🔥 REQUEST INTERCEPTOR
   Automatically attach token
================================= */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ================================
   🔥 RESPONSE INTERCEPTOR
   Handle 401 (Token Expired)
================================= */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url;

    const isLoginRoute = requestUrl?.includes("/users/login");
    const isRegisterRoute = requestUrl?.includes("/users/register");

    // 🚀 Only logout if NOT login/register route
    if (status === 401 && !isLoginRoute && !isRegisterRoute) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;