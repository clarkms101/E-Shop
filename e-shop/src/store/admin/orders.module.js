import axios from "axios";

export default {
  namespaced: true,
  state: {
    orders: {},
    pagination: {}
  },
  actions: {
    getOrders(context, value) {
      let token = localStorage.getItem("adminJWT");
      axios.defaults.headers.common.Authorization = `${token}`;
      const url = `${process.env.APIPATH}/api/orders?page=${value.page}`;
      // { root: true } => 表示為根節點的mutations
      context.commit("LOADING", true, { root: true });
      axios.get(url).then(response => {
        context.commit("ORDERS", response.data.orderInfos);
        context.commit("PAGINATION", response.data.pagination);
        context.commit("LOADING", false, { root: true });
        console.log(response);
      });
    }
  },
  mutations: {
    ORDERS(state, payload) {
      state.orders = payload;
    },
    PAGINATION(state, payload) {
      state.pagination = payload;
    }
  },
  getters: {
    orders(state) {
      return state.orders;
    },
    pagination(state) {
      return state.pagination;
    }
  }
};
