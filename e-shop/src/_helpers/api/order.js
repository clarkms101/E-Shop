import req from "../axiosInterceptors";

export const postAPI_createOrder = data => {
  return req("post", "/api/order", data);
};

export const postAPI_getOrders = data => {
  return req("post", "/api/orders", data);
};

export const getAPI_getOrder = orderId => {
  return req("get", `/api/order/${orderId}`);
};
