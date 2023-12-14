import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: "http://localhost:4000/",
});

export const AxiosTmbd = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
