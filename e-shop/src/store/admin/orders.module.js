import { postAPI_getOrders } from "../../_helpers/api/order";
import { getAPI_getPaymentMethod } from "../../_helpers/api/selection";

export default {
  namespaced: true,
  state: {
    orders: {},
    paymentMethod: [],
    selectPaymentMethod: 0,
    startDate: "",
    endDate: "",
    pagination: {}
  },
  actions: {
    getPaymentMethod(context) {
      getAPI_getPaymentMethod().then(response => {
        context.commit("PAYMENTMETHOD", response.data);
      });
    },
    getOrders(context, value) {
      let selectPaymentMethod = context.state.selectPaymentMethod;
      let startDate = context.state.startDate;
      let endDate = context.state.endDate;
      context.commit("LOADING", true, { root: true });
      postAPI_getOrders({
        page: value.page,
        startDate: startDate,
        endDate: endDate,
        paymentMethod: selectPaymentMethod
      }).then(response => {
        context.commit("ORDERS", response.data.orderInfos);
        context.commit("PAGINATION", response.data.pagination);
        context.commit("LOADING", false, { root: true });
      });
    },
    updateStartDate(context, value) {
      context.commit("START_DATE", value);
    },
    updateEndDate(context, value) {
      context.commit("END_DATE", value);
    },
    updateSelectPaymentMethod(context, value) {
      context.commit("SELECT_PAYMENTMETHOD", value);
    }
  },
  mutations: {
    ORDERS(state, payload) {
      state.orders = payload;
    },
    PAGINATION(state, payload) {
      state.pagination = payload;
    },
    START_DATE(state, payload) {
      state.startDate = payload;
    },
    END_DATE(state, payload) {
      state.endDate = payload;
    },
    PAYMENTMETHOD(state, payload) {
      state.paymentMethod = payload;
    },
    SELECT_PAYMENTMETHOD(state, payload) {
      state.selectPaymentMethod = payload;
    }
  },
  getters: {
    orders(state) {
      return state.orders;
    },
    pagination(state) {
      return state.pagination;
    },
    startDate(state) {
      return state.startDate;
    },
    endDate(state) {
      return state.endDate;
    },
    paymentMethod(state) {
      return state.paymentMethod;
    },
    selectPaymentMethod(state) {
      return state.selectPaymentMethod;
    }
  }
};
