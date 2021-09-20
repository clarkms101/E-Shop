import req from "../axiosInterceptors";

export const postAPI_getProducts = data => {
  return req("post", "/api/products", data);
};

export const getAPI_getProduct = productId => {
  return req("get", `/api/product/${productId}`);
};

export const deleteAPI_deleteProduct = productId => {
  return req("delete", `/api/product/${productId}`);
};

export const postAPI_createProduct = data => {
  return req("post", "/api/product/", data);
};

export const putAPI_updateProduct = data => {
  return req("put", "/api/product/", data);
};
