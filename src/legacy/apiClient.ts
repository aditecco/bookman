import axios from "axios";
import { TOKEN_KEY } from "../constants";

const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  error => {
    return Promise.reject(error);
  }
);

export default apiClient;
