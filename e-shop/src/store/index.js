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
    qty: "",
    cart: {},
    coupon_code: "",
    orderForm: {
      user: {
        name: "",
        email: "",
        tel: "",
        address: ""
      },
      message: ""
    }
  },
  // 對外開放的動作
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
      context.commit("LOADING", true);
      axios.get(url).then(response => {
        context.commit("LOADING", false);
        context.commit("PRODUCTS", response.data.products);
        context.commit("PAGINATION", response.data.pagination);
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
    deleteProduct(context, value) {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      axios.defaults.headers.common.Authorization = `${token}`;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${value.productId}`;
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
    updateLoading(context, value) {
      context.commit("LOADING", value);
    },
    updateQty(context, value) {
      context.commit("QTY", value.qty);
    },
    updateLoadingProductId(context, value) {
      context.commit("LOADING_PRODUCTID", value.loadingProductId);
    },
    updateCouponCode(context, value) {
      context.commit("COUPON_CODE", value.coupon_code);
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
    },
    getCart(context) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      context.commit("LOADING", true);
      axios.get(url).then(response => {
        console.log(response.data);
        context.commit("CART", response.data.data);
        context.commit("LOADING", false);
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
        context.commit("LOADING", true);
        axios.delete(url).then(
          response => {
            context.dispatch("getCart");
            context.commit("LOADING", false);
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
        context.commit("LOADING", true);
        axios.post(url, { data: coupon }).then(
          response => {
            if (response.data.success) {
              context.dispatch("getCart");
            }
            context.commit("LOADING", false);
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
        context.commit("LOADING", true);
        axios.post(url, { data: order }).then(
          response => {
            console.log("訂單已建立", response);
            context.commit("LOADING", false);
            resolve(response);
          },
          error => {
            reject(error);
          }
        );
      });
    }
  },
  // 操作資料狀態
  mutations: {
    LOADING(state, value) {
      state.isLoading = value;
    },
    PRODUCT(state, value) {
      state.product = value;
    },
    PRODUCT_NUM(state, value) {
      state.product.num = value;
    },
    PRODUCTS(state, value) {
      state.products = value;
    },
    PAGINATION(state, value) {
      state.pagination = value;
    },
    LOADING_PRODUCTID(state, value) {
      state.loadingProductId = value;
    },
    QTY(state, value) {
      state.qty = value;
    },
    CART(state, value) {
      state.cart = value;
    },
    COUPON_CODE(state, value) {
      state.coupon_code = value;
    },
    ORDER_FORM_USER_NAME(state, value) {
      state.orderForm.user.name = value;
    },
    ORDER_FORM_USER_EMAIL(state, value) {
      state.orderForm.user.email = value;
    },
    ORDER_FORM_USER_TEL(state, value) {
      state.orderForm.user.tel = value;
    },
    ORDER_FORM_USER_ADDRESS(state, value) {
      state.orderForm.user.address = value;
    },
    ORDER_FORM_MESSAGE(state, value) {
      state.orderForm.message = value;
    }
  }
});
