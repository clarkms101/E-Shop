import axios from "axios";

export default {
  namespaced: true,
  state: {
    product: {},
    loadingProductId: "",
    qty: ""
  },
  actions: {
    getProduct(context, value) {
      const url = `${process.env.APIPATH}/api/product/${value.productId}`;
      context.commit("LOADING_PRODUCTID", value.productId);
      axios.get(url).then(response => {
        context.commit("PRODUCT", response.data.product);
        context.commit("QTY", "");
        context.commit("LOADING_PRODUCTID", "");
      });
    },
    addToCart(context, value) {
      return new Promise((resolve, reject) => {
        const url = `${process.env.APIPATH}/api/cart`;
        context.dispatch("updateLoadingProductId", {
          loadingProductId: value.productId
        });
        const cartDetail = {
          productId: value.productId,
          qty: value.productQty
        };
        axios.post(url, { CartDetail: cartDetail }).then(
          response => {
            context.dispatch("updateLoadingProductId", {
              loadingProductId: ""
            });
            context.dispatch("portalNavbarMoules/getCart", null, {
              root: true
            });
            resolve(response);
          },
          error => {
            reject(error);
          }
        );
      });
    },
    updateLoadingProductId(context, value) {
      context.commit("LOADING_PRODUCTID", value.loadingProductId);
    },
    updateQty(context, value) {
      context.commit("QTY", value);
    }
  },
  mutations: {
    LOADING_PRODUCTID(state, payload) {
      state.loadingProductId = payload;
    },
    PRODUCT(state, payload) {
      state.product = payload;
    },
    QTY(state, payload) {
      state.qty = payload;
    }
  },
  getters: {
    loadingProductId(state) {
      return state.loadingProductId;
    },
    product(state) {
      return state.product;
    },
    qty(state) {
      return state.qty;
    }
  }
};
