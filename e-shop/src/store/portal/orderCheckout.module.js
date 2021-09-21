import { getAPI_getOrder } from "../../_helpers/api/order";

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
      context.commit("LOADING", true, { root: true });
      getAPI_getOrder(context.state.orderId).then(response => {
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
