import Vue from "vue";
import Vuex from "vuex";
import loginModules from "./login";
import ordersModules from "./orders";
import customerOrderCheckoutModules from "./customerOrderCheckout";
import couponsModules from "./coupons";
import customerOrdersModules from "./customerOrders";
import productsModules from "./products";

Vue.use(Vuex);

export default new Vuex.Store({
  // 嚴格模式(state不允許外部直接修改) (正式環境不啟用嚴格模式，避免效能耗損)
  strict: process.env.NODE_ENV !== "production",
  // 資料狀態
  state: {
    isLoading: false,
    pagination: {}
  },
  // 對外開放的動作
  actions: {
    updateLoading(context, value) {
      context.commit("LOADING", value);
    }
  },
  // 操作資料狀態
  mutations: {
    LOADING(state, payload) {
      state.isLoading = payload;
    },
    PAGINATION(state, payload) {
      state.pagination = payload;
    }
  },
  // 載入Vuex獨立模組
  modules: {
    loginModules,
    ordersModules,
    customerOrderCheckoutModules,
    couponsModules,
    customerOrdersModules,
    productsModules
  }
});
