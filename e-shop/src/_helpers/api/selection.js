import req from "../axiosInterceptors";

export const getAPI_getPaymentMethod = () => {
  return req("get", "/api/selection/paymentmethod");
};

export const getAPI_getCountry = () => {
  return req("get", "/api/selection/country");
};

export const getAPI_getCity = selectCountry => {
  return req("get", `/api/selection/city/${selectCountry}`);
};
