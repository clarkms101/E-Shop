import axios from "axios";

export default {
  namespaced: true,
  state: {
    product: {}
  },
  actions: {
    getProduct(context, value) {
      const url = `${process.env.APIPATH}/api/product/${value.productId}`;
      axios.get(url).then(response => {
        console.log(url);
        console.log(response.data.product);
        context.commit("PRODUCT", response.data.product);
      });
    }
  },
  mutations: {
    PRODUCT(state, payload) {
      state.product = payload;
    }
  },
  getters: {
    product(state) {
      return state.product;
    }
  }
};
