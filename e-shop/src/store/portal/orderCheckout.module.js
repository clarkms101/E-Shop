import axios from "axios";

export default {
  namespaced: true,
  state: {
    orderId: "",
    order: {
      user: {}
    }
  },
  actions: {
    updateOrderId(context, value) {
      context.commit("ORDER_ID", value);
    },
    getOrder(context) {
      let orderId = context.state.orderId;
      const url = `${process.env.APIPATH}/api/order/${orderId}`;
      context.commit("LOADING", true, { root: true });
      axios.get(url).then(response => {
        context.commit("ORDER", response.data.orderInfo);
        context.commit("LOADING", false, { root: true });
      });
    }
  },
  mutations: {
    ORDER_ID(state, payload) {
      state.orderId = payload;
    },
    ORDER(state, payload) {
      state.order = payload;
    }
  },
  getters: {
    order(state) {
      return state.order;
    }
  }
};
