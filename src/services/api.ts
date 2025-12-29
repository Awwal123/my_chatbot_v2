import axios, { AxiosError } from "axios";
import { useAuthStore } from "@/stores/auth";

const AXIOS = axios.create({
  baseURL: "https://987ffc85e7df.ngrok-free.app/api",
  headers: {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
  },
});

/**
 * Attach Sanctum Bearer token
 */
AXIOS.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();

    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Global error handling
 */
AXIOS.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    const message =
      error.response?.data?.message || "Something went wrong";

    console.error("[API ERROR]", message);
    return Promise.reject(error);
  }
);

export type SignupRequest = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};


export const authService = {
  registerUser: (request: SignupRequest) => {
    return AXIOS.post("/auth/register", request);
  },

  loginUser: (request: LoginRequest) => {
    return AXIOS.post("/auth/login", request);
  },

};

export default AXIOS;
