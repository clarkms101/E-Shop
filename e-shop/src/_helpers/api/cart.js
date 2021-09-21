import req from "../axiosInterceptors";

export const postAPI_addToCart = data => {
  return req("post", "/api/cart", data);
};

export const getAPI_getCart = () => {
  return req("get", "/api/cart");
};

export const deleteAPI_removeFromCart = cartDetailId => {
  return req("delete", `/api/cart/${cartDetailId}`);
};
