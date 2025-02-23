import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

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
     !originalRequest._retry &&
     originalRequest._retryCount < 3
   ) {
     originalRequest._retry = true;
     originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
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
    const response = await axios.post("auth/refresh", {
      refreshToken: Cookies.get("refresh_token"),
    });
    const newToken = response.data;
    Cookies.set("token_access", newToken, {
      expires: 1,
      secure: true,
      sameSite: "None",
    });
    return newToken;
  } catch (error) {
    toast.warning(
      "Tu sesión ha expirado. Redirigiendo a la página de login..."
    );

    // Limpia el estado de autenticación
    Cookies.remove("token_access");
    Cookies.remove("refresh_token");
    setUser(null);
    setUserAdmin(null);

    setTimeout(() => {
      window.location.href = "/login";
    }, 4000);
    return null;
  }
};

const requestGeneric = {
  get: (url) => axios.get(url),
  post: (url, body) => axios.post(url, body),
  put: (url, body) => axios.put(url, body),
  delete: (url) => axios.delete(url),
};

export default requestGeneric;
