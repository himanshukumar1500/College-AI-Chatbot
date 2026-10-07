import axios from "axios";

export const TOKEN_KEY = "college_chatbot_token";

// One axios instance for the whole app.
// In development "/api" is proxied to the backend (see vite.config.js).
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  timeout: 45000, // AI answers can take a few seconds
});

// Attach the JWT to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// If the server says the token is invalid/expired, log the user out.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthForm = /\/auth\/(login|register)/.test(error.config?.url || "");
    if (error.response?.status === 401 && !isAuthForm) {
      localStorage.removeItem(TOKEN_KEY);
      window.dispatchEvent(new Event("auth:logout"));
    }
    return Promise.reject(error);
  }
);

// Turns any axios error into a message that is safe to show to a student.
export function getErrorMessage(error) {
  if (error.response?.data?.message) return error.response.data.message;
  if (error.code === "ECONNABORTED") return "The request took too long. Please try again.";
  if (error.request) return "Cannot reach the server. Check that the backend is running.";
  return "Something went wrong. Please try again.";
}

export default api;
