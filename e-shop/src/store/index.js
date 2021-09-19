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
import portalOrderMoules from "./portal/order.module";
import portalOrderCheckout from "./portal/orderCheckout.module";

Vue.use(Vuex);

export default new Vuex.Store({
  // 嚴格模式(state不允許外部直接修改) (正式環境不啟用嚴格模式，避免效能耗損)
  strict: process.env.NODE_ENV !== "production",
  // 資料狀態
  state: {
    isLoading: false,
    searchProductName: "",
    products: [],
    pagination: {}
    // route: {path, params, query} ps: vuex-router-sync 追加的路由狀態資訊,可以直接使用
  },
  // 對外開放的動作
  actions: {
    updateLoading(context, value) {
      context.commit("LOADING", value);
    },
    updateSearchProductName(context, value) {
      context.commit("SEARCH_PRODUCT_NAME", value);
    },
    getProducts(context, value) {
      let routeParams = context.state.route.params;
      let category = "";
      if (routeParams.category) {
        category = routeParams.category;
      }
      let productName = context.state.searchProductName;
      const url = `${process.env.APIPATH}/api/Products`;
      // 處理中提示
      context.commit("LOADING", true);
      axios
        .post(url, {
          page: value.page,
          category: category,
          productName: productName
        })
        .then(response => {
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
    SEARCH_PRODUCT_NAME(state, payload) {
      state.searchProductName = payload;
    }
  },
  getters: {
    products(state) {
      return state.products;
    },
    search_product_name(state) {
      return state.searchProductName;
    },
    pagination(state) {
      return state.pagination;
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
    portalNavbarMoules,
    portalOrderMoules,
    portalOrderCheckout
  }
});
