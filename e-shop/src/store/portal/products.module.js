import axios from "axios";

export default {
  namespaced: true,
  state: {
    category: "",
    products: []
  },
  actions: {
    updateCategory(context, value) {
      console.log(`update category ${value}`);
      context.commit("CATEGORY", value);
    },
    getProducts(context, value) {
      let category = context.state.category;
      console.log(`query products category ${category}`);
      const url = `${process.env.APIPATH}/api/Products?page=${value.page}&category=${category}`;
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
    },
    CATEGORY(state, payload) {
      state.category = payload;
    }
  },
  getters: {
    products(state) {
      return state.products;
    }
  }
};
