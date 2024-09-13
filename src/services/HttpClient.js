import axios from "axios";
import Cookies from "js-cookie";
axios.defaults.baseURL = "http://localhost:5116/api";

axios.interceptors.request.use(
  (config) => {
    const tokenAccess = Cookies.get("token_access");

    if (tokenAccess) {
      config.headers.Authorization = `Bearer ${tokenAccess}`;
    }
    return config; // Asegúrate de devolver siempre la configuración
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axios.interceptors.response.use(
//   (config) => {
//     const token = localStorage.getItem("token_access");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//       return config;
//     }
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

const requestGeneric = {
  get: (url) => axios.get(url),
  post: (url, body) => axios.post(url, body),
  put: (url, body) => axios.put(url, body),
  delete: (url) => axios.delete(url),
};

export default requestGeneric;