import Vue from "vue";
import Vuex from "vuex";
// admin
import loginModules from "./admin/login.module";
import ordersModules from "./admin/orders.module";
import customerOrderCheckoutModules from "./admin/customerOrderCheckout.module";
import couponsModules from "./admin/coupons.module";
import customerOrdersModules from "./admin/customerOrders.module";
import productsModules from "./admin/products.module";
// portal
import portalProductsModules from "./portal/products.module";
import portalProductModules from "./portal/product.module";

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
    productsModules,
    portalProductsModules,
    portalProductModules
  }
});
