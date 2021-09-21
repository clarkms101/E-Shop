import req from "../axiosInterceptors";

export const getAPI_getCoupons = page => {
  return req("get", `/api/coupons?page=${page}`);
};

export const postAPI_createCoupon = data => {
  return req("post", "/api/coupon", data);
};

export const putAPI_updateCoupon = data => {
  return req("put", "/api/coupon", data);
};
