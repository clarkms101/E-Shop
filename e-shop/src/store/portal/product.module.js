import { getAPI_getProduct } from "../../_helpers/api/product";
import { postAPI_addToCart } from "../../_helpers/api/cart";

export default {
  namespaced: true,
  state: {
    product: {},
    loadingProductId: "",
    qty: ""
  },
  actions: {
    getProduct(context, value) {
      context.commit("LOADING_PRODUCTID", value.productId);
      getAPI_getProduct(value.productId).then(response => {
        context.commit("PRODUCT", response.data.product);
        context.commit("QTY", "");
        context.commit("LOADING_PRODUCTID", "");
      });
    },
    addToCart(context, value) {
      context.dispatch("updateLoadingProductId", {
        loadingProductId: value.productId
      });
      const cartDetail = {
        productId: value.productId,
        qty: value.productQty
      };
      postAPI_addToCart({ CartDetail: cartDetail }).then(response => {
        context.dispatch("updateLoadingProductId", {
          loadingProductId: ""
        });
        context.dispatch(
          "alertMoules/addMessage",
          {
            content: response.data.message,
            style: "success"
          },
          { root: true }
        );
        context.dispatch("portalNavbarMoules/getCart", null, { root: true });
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
