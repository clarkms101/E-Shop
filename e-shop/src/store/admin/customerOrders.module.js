import axios from "axios";

export default {
  namespaced: true,
  state: {
    orderForm: {
      userName: "",
      email: "",
      tel: "",
      address: "",
      message: ""
    },
    coupon_code: "",
    cart: {},
    qty: "",
    loadingProductId: "",
    product: {}
  },
  actions: {
    async getProduct(context, value) {
      const url = `${process.env.APIPATH}/api/product/${value.productId}`;
      context.commit("LOADING_PRODUCTID", value.productId);
      await axios.get(url).then(response => {
        context.commit("PRODUCT", response.data.product);
        context.commit("QTY", "");
        context.commit("LOADING_PRODUCTID", "");
      });
    },
    getCart(context) {
      const url = `${process.env.APIPATH}/api/cart`;
      context.commit("LOADING", true, { root: true });
      axios.get(url).then(response => {
        console.log(`getCart: ${response.data}`);
        context.commit("CART", response.data);
        context.commit("LOADING", false, { root: true });
      });
    },
    async addToCart(context, value) {
      const url = `${process.env.APIPATH}/api/cart`;
      context.dispatch("updateLoadingProductId", {
        loadingProductId: value.productId
      });
      const cartDetail = {
        productId: value.productId,
        qty: value.productQty
      };
      await axios.post(url, { CartDetail: cartDetail }).then(response => {
        context.dispatch("updateLoadingProductId", {
          loadingProductId: ""
        });
        context.dispatch("getCart");
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
    },
    createOrder(context) {
      return new Promise((resolve, reject) => {
        const url = `${process.env.APIPATH}/api/order`;
        const order = context.state.orderForm;
        context.commit("LOADING", true, { root: true });
        axios.post(url, { orderForm: order }).then(
          response => {
            console.log("訂單已建立", response);
            context.commit("LOADING", false, { root: true });
            // 清空訂單表單上的資料
            context.commit("ORDER_FORM_USER_NAME", "");
            context.commit("ORDER_FORM_USER_EMAIL", "");
            context.commit("ORDER_FORM_USER_TEL", "");
            context.commit("ORDER_FORM_USER_ADDRESS", "");
            context.commit("ORDER_FORM_MESSAGE", "");
            context.commit("COUPON_CODE", "");

            resolve(response);
          },
          error => {
            reject(error);
          }
        );
      });
    },
    updateQty(context, value) {
      context.commit("QTY", value);
    },
    updateLoadingProductId(context, value) {
      context.commit("LOADING_PRODUCTID", value.loadingProductId);
    },
    updateCouponCode(context, value) {
      context.commit("COUPON_CODE", value);
    },
    updateOrderFormUserName(context, value) {
      context.commit("ORDER_FORM_USER_NAME", value);
    },
    updateOrderFormUserEmail(context, value) {
      context.commit("ORDER_FORM_USER_EMAIL", value);
    },
    updateOrderFormUserTel(context, value) {
      context.commit("ORDER_FORM_USER_TEL", value);
    },
    updateOrderFormUserAddress(context, value) {
      context.commit("ORDER_FORM_USER_ADDRESS", value);
    },
    updateOrderFormMessage(context, value) {
      context.commit("ORDER_FORM_MESSAGE", value);
    }
  },
  mutations: {
    LOADING_PRODUCTID(state, payload) {
      state.loadingProductId = payload;
    },
    QTY(state, payload) {
      state.qty = payload;
    },
    CART(state, payload) {
      state.cart = payload;
    },
    COUPON_CODE(state, payload) {
      state.coupon_code = payload;
    },
    ORDER_FORM_USER_NAME(state, payload) {
      state.orderForm.userName = payload;
    },
    ORDER_FORM_USER_EMAIL(state, payload) {
      state.orderForm.email = payload;
    },
    ORDER_FORM_USER_TEL(state, payload) {
      state.orderForm.tel = payload;
    },
    ORDER_FORM_USER_ADDRESS(state, payload) {
      state.orderForm.address = payload;
    },
    ORDER_FORM_MESSAGE(state, payload) {
      state.orderForm.message = payload;
    },
    PRODUCT(state, payload) {
      state.product = payload;
    }
  },
  getters: {
    totalPrice(state) {
      return state.qty * state.product.price;
    },
    loadingProductId(state) {
      return state.loadingProductId;
    },
    product(state) {
      return state.product;
    },
    qty(state) {
      return state.qty;
    },
    cart(state) {
      return state.cart;
    },
    coupon_code(state) {
      return state.coupon_code;
    },
    orderForm_user_name(state) {
      return state.orderForm.userName;
    },
    orderForm_user_email(state) {
      return state.orderForm.email;
    },
    orderForm_user_tel(state) {
      return state.orderForm.tel;
    },
    orderForm_user_address(state) {
      return state.orderForm.address;
    },
    orderForm_message(state) {
      return state.orderForm.message;
    }
  }
};
