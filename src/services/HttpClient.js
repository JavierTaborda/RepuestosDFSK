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
  (error) => {
    if (error.response && error.response.status === 401) {
      toast.warning(
        "Tu sesión ha expirado. Redirigiendo a la página de login..."
      );
      setTimeout(() => {
        window.location.href = "/login"; 
      }, 4000); // Espera 4 segundos antes de redirigir
    }
    return Promise.reject(error);
  }
);

const requestGeneric = {
  get: (url) => axios.get(url),
  post: (url, body) => axios.post(url, body),
  put: (url, body) => axios.put(url, body),
  delete: (url) => axios.delete(url),
};

export default requestGeneric;
