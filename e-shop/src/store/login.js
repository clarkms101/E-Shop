import axios from "axios";

export default {
  // 加上 namespaced: true 可以把 actions, mutations, getters 變成區域變數
  namespaced: true,
  state: {
    user: {
      username: "",
      password: ""
    }
  },
  actions: {
    signin(context) {
      return new Promise((resolve, reject) => {
        const url = `${process.env.APIPATH}/admin/signin`;
        let user = context.state.user;
        axios.post(url, user).then(
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
    updateUserName(context, value) {
      context.commit("USER_NAME", value);
    },
    updateUserPassword(context, value) {
      context.commit("USER_PASSWORD", value);
    }
  },
  mutations: {
    USER_NAME(state, payload) {
      state.user.username = payload;
    },
    USER_PASSWORD(state, payload) {
      state.user.password = payload;
    }
  },
  getters: {
    user_name(state) {
      return state.user.username;
    },
    user_password(state) {
      return state.user.password;
    }
  }
};
