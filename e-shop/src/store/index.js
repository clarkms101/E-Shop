import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  // 嚴格模式(state不允許外部直接修改)
  strict: true,
  // 資料狀態
  state: {
    isLoading: false,
    product: {},
    products: [],
    pagination: {},
    loadingProductId: "",
    qty: ""
  },
  // 對外開放的動作
  actions: {
    getProducts(context, payload) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${payload.page}`;
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      // 將login token放到headers再請求
      axios.defaults.headers.common.Authorization = `${token}`;
      // 處理中提示
      context.commit("LOADING", true);
      axios.get(url).then(response => {
        context.commit("LOADING", false);
        context.commit("PRODUCTS", response.data.products);
        context.commit("PAGINATION", response.data.pagination);
      });
    },
    async getProduct(context, payload) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${payload.productId}`;
      context.commit("LOADING_PRODUCTID", payload.productId);
      await axios.get(url).then(response => {
        context.commit("PRODUCT", response.data.product);
        context.commit("QTY", "");
        context.commit("LOADING_PRODUCTID", "");
      });
    },
    deleteProduct(context, payload) {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      axios.defaults.headers.common.Authorization = `${token}`;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${payload.productId}`;
      // 處理中提示
      context.commit("LOADING", true);
      axios.delete(url).then(response => {
        if (response.data.success) {
          context.dispatch("getProducts", { page: 1 });
        } else {
          context.dispatch("getProducts", { page: 1 });
          console.log("刪除失敗");
        }
      });
    },
    updateLoading(context, status) {
      context.commit("LOADING", status);
    },
    updateQty(context, payload) {
      context.commit("QTY", payload.qty);
    },
    updateLoadingProductId(context, payload) {
      context.commit("LOADING_PRODUCTID", payload.loadingProductId);
    }
  },
  // 操作資料狀態
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
    PRODUCT(state, payload) {
      state.product = payload;
    },
    PRODUCT_NUM(state, payload) {
      state.product.num = payload;
    },
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    PAGINATION(state, payload) {
      state.pagination = payload;
    },
    LOADING_PRODUCTID(state, payload) {
      state.loadingProductId = payload;
    },
    QTY(state, payload) {
      state.qty = payload;
    }
  }
});
