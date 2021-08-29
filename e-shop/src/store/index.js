import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
// common
import alertMoules from "./common/alert.module";
// admin
import loginModules from "./admin/login.module";
import ordersModules from "./admin/orders.module";
import customerOrderCheckoutModules from "./admin/customerOrderCheckout.module";
import couponsModules from "./admin/coupons.module";
import customerOrdersModules from "./admin/customerOrders.module";
import productsModules from "./admin/products.module";
// portal
import portalProductModules from "./portal/product.module";
import portalNavbarMoules from "./portal/navbar.module";

Vue.use(Vuex);

export default new Vuex.Store({
  // 嚴格模式(state不允許外部直接修改) (正式環境不啟用嚴格模式，避免效能耗損)
  strict: process.env.NODE_ENV !== "production",
  // 資料狀態
  state: {
    isLoading: false,
    productCategory: "",
    products: [],
    pagination: {}
  },
  // 對外開放的動作
  actions: {
    updateLoading(context, value) {
      context.commit("LOADING", value);
    },
    updateProductCategory(context, value) {
      context.commit("PRODUCT_CATEGORY", value);
    },
    getProducts(context, value) {
      let category = context.state.productCategory;
      const url = `${process.env.APIPATH}/api/Products?page=${value.page}&category=${category}`;
      // 處理中提示
      context.commit("LOADING", true);
      axios.get(url).then(response => {
        context.commit("LOADING", false);
        context.commit("PRODUCTS", response.data.products);
        context.commit("PAGINATION", response.data.pagination);
      });
    }
  },
  // 操作資料狀態
  mutations: {
    LOADING(state, payload) {
      state.isLoading = payload;
    },
    PAGINATION(state, payload) {
      state.pagination = payload;
    },
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    PRODUCT_CATEGORY(state, payload) {
      state.productCategory = payload;
    }
  },
  getters: {
    products(state) {
      return state.products;
    },
    pagination(state) {
      return state.pagination;
    },
    productCategory(state) {
      return state.productCategory;
    }
  },
  // 載入Vuex獨立模組
  modules: {
    alertMoules,
    loginModules,
    ordersModules,
    customerOrderCheckoutModules,
    couponsModules,
    customerOrdersModules,
    productsModules,
    portalProductModules,
    portalNavbarMoules
  }
});
