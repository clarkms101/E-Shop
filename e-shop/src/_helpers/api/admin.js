import req from "../axiosInterceptors";

export const postAPI_login = data => {
  return req("post", "/api/admin/login", data);
};

export const postAPI_logout = data => {
  return req("post", "/api/admin/logout", data);
};

export const postAPI_loginCheck = data => {
  return req("post", "/api/admin/loginCheck", data);
};
