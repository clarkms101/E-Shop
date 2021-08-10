import axios from "axios";

export default {
  namespaced: true,
  state: {
    products: []
  },
  actions: {
    getProducts(context, value) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${value.page}`;
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      // 將login token放到headers再請求
      axios.defaults.headers.common.Authorization = `${token}`;
      // 處理中提示
      context.commit("LOADING", true, { root: true });
      axios.get(url).then(response => {
        context.commit("LOADING", false, { root: true });
        context.commit("PRODUCTS", response.data.products);
        context.commit("PAGINATION", response.data.pagination, { root: true });
      });
    },
    deleteProduct(context, value) {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      axios.defaults.headers.common.Authorization = `${token}`;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${value.productId}`;
      // 處理中提示
      context.commit("LOADING", true, { root: true });
      axios.delete(url).then(response => {
        if (response.data.success) {
          context.dispatch("getProducts", { page: 1 });
        } else {
          context.dispatch("getProducts", { page: 1 });
          console.log("刪除失敗");
        }
      });
    }
  },
  mutations: {
    PRODUCTS(state, payload) {
      state.products = payload;
    }
  },
  getters: {
    products(state) {
      return state.products;
    }
  }
};
