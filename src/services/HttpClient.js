import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";


axios.defaults.baseURL = "http://localhost:5116/api";

axios.interceptors.request.use(
  (config) => {
    const tokenAccess = Cookies.get("token_access");

    if (tokenAccess) {
      config.headers.Authorization = `Bearer ${tokenAccess}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuesta
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const newToken = await refreshToken();
      if (newToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  
  try {
    const response = await axios.post("/auth/refresh", {
      refreshToken: Cookies.get("refresh_token"),
    });
    const newToken = response.data;
    Cookies.set("token_access", newToken, {
      expires: 1,
      secure: true,
      sameSite: "Strict",
    });
    
    return newToken;
  } catch (error) {
    toast.warning(
      "Tu sesión ha expirado. Redirigiendo a la página de login..."
    );

   
    setTimeout(() => {
      window.location.href = "/login";
      Cookies.remove("token_access");
      Cookies.remove("refresh_token");
    }, 4000); // Espera 4 segundos antes de redirigir
    newToken = null;
  }
  
};

const requestGeneric = {
  get: (url) => axios.get(url),
  post: (url, body) => axios.post(url, body),
  put: (url, body) => axios.put(url, body),
  delete: (url) => axios.delete(url),
};

export default requestGeneric;
