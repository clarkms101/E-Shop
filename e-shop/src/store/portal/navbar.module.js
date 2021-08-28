import axios from "axios";

export default {
  namespaced: true,
  state: {
    cart: {},
    coupon_code: ""
  },
  actions: {
    getCart(context) {
      const url = `${process.env.APIPATH}/api/cart`;
      context.commit("LOADING", true, { root: true });
      axios.get(url).then(response => {
        context.commit("CART", response.data);
        context.commit("LOADING", false, { root: true });
      });
    },
    removeFromCart(context, value) {
      return new Promise((resolve, reject) => {
        const url = `${process.env.APIPATH}/api/cart/${value.cartDetailId}`;
        context.commit("LOADING", true, { root: true });
        axios.delete(url).then(
          response => {
            context.dispatch("getCart");
            context.commit("LOADING", false, { root: true });
            resolve(response);
          },
          error => {
            reject(error);
          }
        );
      });
    },
    updateCouponCode(context, value) {
      context.commit("COUPON_CODE", value);
    },
    addCouponCode(context, value) {
      return new Promise((resolve, reject) => {
        const url = `${process.env.APIPATH}/api/Shopping/UseCoupon`;
        const coupon = {
          CouponCode: value.coupon_code
        };
        context.commit("LOADING", true, { root: true });
        axios.post(url, { Coupon: coupon }).then(
          response => {
            if (response.data.success) {
              context.dispatch("getCart");
              context.commit("COUPON_CODE", "");
            }
            context.commit("LOADING", false, { root: true });
            resolve(response);
          },
          error => {
            reject(error);
          }
        );
      });
    }
  },
  mutations: {
    CART(state, payload) {
      state.cart = payload;
    },
    COUPON_CODE(state, payload) {
      state.coupon_code = payload;
    }
  },
  getters: {
    cart(state) {
      return state.cart;
    },
    coupon_code(state) {
      return state.coupon_code;
    }
  }
};
