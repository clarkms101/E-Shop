import req from "../axiosInterceptors";

export const getProducts = data => {
  return req("post", "/api/Products", data);
};
