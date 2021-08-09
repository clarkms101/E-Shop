import axios from "axios";

export default {
  namespaced: true,
  state: {
    orders: {}
  },
  actions: {
    getOrders(context, value) {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      axios.defaults.headers.common.Authorization = `${token}`;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${value.page}`;
      // { root: true } => 表示為根節點的mutations
      context.commit("LOADING", true, { root: true });
      axios.get(url).then(response => {
        let newOrders = [];
        var oldOrders = response.data.orders;
        if (oldOrders.length) {
          newOrders = oldOrders.sort((a, b) => {
            const aIsPaid = a.is_paid ? 1 : 0;
            const bIsPaid = b.is_paid ? 1 : 0;
            return bIsPaid - aIsPaid;
          });
        }
        context.commit("ORDERS", newOrders);
        context.commit("PAGINATION", response.data.pagination, { root: true });
        context.commit("LOADING", false, { root: true });
        console.log(response);
      });
    }
  },
  mutations: {
    ORDERS(state, payload) {
      state.orders = payload;
    }
  },
  getters: {
    orders(state) {
      return state.orders;
    }
  }
};
