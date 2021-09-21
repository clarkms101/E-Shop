import req from "../axiosInterceptors";

export const postAPI_creditCardPay = data => {
  return req("post", "/api/shopping/creditCardPay", data);
};

export const postAPI_addCouponCode = data => {
  return req("post", "/api/shopping/useCoupon", data);
};
