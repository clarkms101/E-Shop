import axios from "axios";
import router from "../router";

const instance = axios.create({
  baseURL: process.env.APIPATH,
  headers: { "Content-Type": "application/json" },
  timeout: 1000
});

instance.interceptors.request.use(
  function(config) {
    let token = localStorage.getItem("adminJWT");
    // todo: check token value
    config.headers.Authorization = token;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          router.push("/login");
          break;
        case 404:
          // todo 頁面不存在訊息提示
          break;
        case 500:
          router.push("/error");
          break;
        default:
          console.log(error.message);
      }
    }
    if (!window.navigator.onLine) {
      alert("網路異常，請重新連線並重整網頁");
      return;
    }
    return Promise.reject(error);
  }
);

export default function(method, url, data = null, config) {
  method = method.toLowerCase();
  switch (method) {
    case "post":
      return instance.post(url, data, config);
    case "get":
      return instance.get(url, { params: data });
    case "delete":
      return instance.delete(url, { params: data });
    case "put":
      return instance.put(url, data);
    case "patch":
      return instance.patch(url, data);
    default:
      console.log(`未知的 method: ${method}`);
      return false;
  }
}
