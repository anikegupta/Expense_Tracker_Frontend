import axios from "axios";
import Swal from "sweetalert2";
import { serverBaseUrl } from "../config/config";
import { getAccessTokenFromLocalStorage, removeLoginData } from "../services/LocaStorageSrevice";

export const axiosInstance = axios.create({
  baseURL: serverBaseUrl,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = getAccessTokenFromLocalStorage();
    if (accessToken) {
      config.headers["Authorization"] = accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// ✅ Added response interceptor for expired token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      removeLoginData(); // clear local storage

      await Swal.fire({
        icon: "warning",
        title: "Session Expired",
        text: "Your session has expired. Please log in again.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });

      window.location.href = "/login"; // navigate to login
    }
    return Promise.reject(error);
  }
);
