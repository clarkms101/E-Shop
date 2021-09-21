import { postAPI_login } from "../../_helpers/api/admin";

export default {
  // 加上 namespaced: true 可以把 actions, mutations, getters 變成區域變數
  namespaced: true,
  state: {
    admin: {
      account: "",
      password: ""
    }
  },
  actions: {
    signin(context) {
      return new Promise((resolve, reject) => {
        let admin = context.state.admin;
        postAPI_login(admin).then(
          response => {
            console.log("login msg", response.data);
            resolve(response);
          },
          error => {
            reject(error);
          }
        );
      });
    },
    updateAdminAccount(context, value) {
      context.commit("ADMIN_ACCOUNT", value);
    },
    updateAdminPassword(context, value) {
      context.commit("ADMIN_PASSWORD", value);
    }
  },
  mutations: {
    ADMIN_ACCOUNT(state, payload) {
      state.admin.account = payload;
    },
    ADMIN_PASSWORD(state, payload) {
      state.admin.password = payload;
    }
  },
  getters: {
    admin_account(state) {
      return state.admin.account;
    },
    admin_password(state) {
      return state.admin.password;
    }
  }
};
