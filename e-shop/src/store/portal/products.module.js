import axios from "axios";

export default {
  namespaced: true,
  state: {
    products: []
  },
  actions: {
    getProducts(context, value) {
      // todo 加上 category過濾
      const url = `${process.env.APIPATH}/api/Products?page=${value.page}`;
      context.commit("LOADING", true, { root: true });
      axios.get(url).then(response => {
        context.commit("LOADING", false, { root: true });
        context.commit("PRODUCTS", response.data.products);
        context.commit("PAGINATION", response.data.pagination, { root: true });
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
