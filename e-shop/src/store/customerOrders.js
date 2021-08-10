import axios from "axios";

export default {
  namespaced: true,
  state: {
    orderForm: {
      user: {
        name: "",
        email: "",
        tel: "",
        address: ""
      },
      message: ""
    },
    coupon_code: "",
    cart: {},
    qty: "",
    loadingProductId: "",
    products: [],
    product: {}
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
    async getProduct(context, value) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${value.productId}`;
      context.commit("LOADING_PRODUCTID", value.productId);
      await axios.get(url).then(response => {
        context.commit("PRODUCT", response.data.product);
        context.commit("QTY", "");
        context.commit("LOADING_PRODUCTID", "");
      });
    },
    getCart(context) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      context.commit("LOADING", true, { root: true });
      axios.get(url).then(response => {
        console.log(response.data);
        context.commit("CART", response.data.data);
        context.commit("LOADING", false, { root: true });
      });
    },
    async addToCart(context, value) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      context.dispatch("updateLoadingProductId", {
        loadingProductId: value.productId
      });
      const cart = {
        product_id: value.productId,
        qty: value.productQty
      };
      await axios.post(url, { data: cart }).then(response => {
        context.dispatch("updateLoadingProductId", {
          loadingProductId: ""
        });
        context.dispatch("getCart");
      });
    },
    removeFromCart(context, value) {
      return new Promise((resolve, reject) => {
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${value.itemId}`;
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
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
        const coupon = {
          code: value.coupon_code
        };
        context.commit("LOADING", true, { root: true });
        axios.post(url, { data: coupon }).then(
          response => {
            if (response.data.success) {
              context.dispatch("getCart");
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
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
        const order = context.state.orderForm;
        context.commit("LOADING", true, { root: true });
        axios.post(url, { data: order }).then(
          response => {
            console.log("訂單已建立", response);
            context.commit("LOADING", false, { root: true });
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
      state.orderForm.user.name = payload;
    },
    ORDER_FORM_USER_EMAIL(state, payload) {
      state.orderForm.user.email = payload;
    },
    ORDER_FORM_USER_TEL(state, payload) {
      state.orderForm.user.tel = payload;
    },
    ORDER_FORM_USER_ADDRESS(state, payload) {
      state.orderForm.user.address = payload;
    },
    ORDER_FORM_MESSAGE(state, payload) {
      state.orderForm.message = payload;
    },
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    PRODUCT(state, payload) {
      state.product = payload;
    }
  },
  getters: {
    totalPrice(state) {
      return state.qty * state.product.price;
    },
    products(state) {
      return state.products;
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
      return state.orderForm.user.name;
    },
    orderForm_user_email(state) {
      return state.orderForm.user.email;
    },
    orderForm_user_tel(state) {
      return state.orderForm.user.tel;
    },
    orderForm_user_address(state) {
      return state.orderForm.user.address;
    },
    orderForm_message(state) {
      return state.orderForm.message;
    }
  }
};
