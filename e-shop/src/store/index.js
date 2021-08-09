import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  // 嚴格模式(state不允許外部直接修改) (正式環境不啟用嚴格模式，避免效能耗損)
  strict: process.env.NODE_ENV !== "production",
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
    },
    orders: {},
    orderId: "",
    order: {
      user: {}
    },
    user: {
      username: "",
      password: ""
    },
    coupons: {},
    tempCoupon: {
      title: "",
      is_enabled: 0,
      percent: 100,
      due_date: 0,
      code: ""
    },
    isNewCoupon: false
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
    },
    updateOrderId(context, value) {
      context.commit("ORDER_ID", value);
    },
    updateUserName(context, value) {
      context.commit("USER_NAME", value);
    },
    updateUserPassword(context, value) {
      context.commit("USER_PASSWORD", value);
    },
    updateTempCouponTitle(context, value) {
      context.commit("TEMPCOUPON_TITLE", value);
    },
    updateTempCouponIsEnabled(context, value) {
      context.commit("TEMPCOUPON_IS_ENABLED", value);
    },
    updateTempCouponPercent(context, value) {
      context.commit("TEMPCOUPON_PERCENT", value);
    },
    updateTempCouponDueDate(context, value) {
      context.commit("TEMPCOUPON_DUE_DATE", value);
    },
    updateTempCouponCode(context, value) {
      context.commit("TEMPCOUPON_CODE", value);
    },
    updateTempCoupon(context, value) {
      context.commit("TEMPCOUPON", value);
    },
    updateIsNewCoupon(context, value) {
      context.commit("IS_NEW_COUPON", value);
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
    },
    getOrders(context, value) {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      axios.defaults.headers.common.Authorization = `${token}`;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${value.page}`;
      context.commit("LOADING", true);
      axios.get(url).then(response => {
        let newOrders = [];
        var oldOrders = response.data.orders;
        if (oldOrders.length) {
          newOrders = oldOrders.sort((a, b) => {
            const aIsPaid = a.is_paid ? 1 : 0;
            const bIsPaid = b.is_paid ? 1 : 0;
            return bIsPaid - aIsPaid;
          });
        }
        context.commit("ORDERS", newOrders);
        context.commit("PAGINATION", response.data.pagination);
        context.commit("LOADING", false);
        console.log(response);
      });
    },
    getOrder(context) {
      let orderId = context.state.orderId;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${orderId}`;
      context.commit("LOADING", true);
      axios.get(url).then(response => {
        context.commit("ORDER", response.data.order);
        context.commit("LOADING", false);
      });
    },
    payOrder(context) {
      let orderId = context.state.orderId;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${orderId}`;
      context.commit("LOADING", true);
      axios.post(url).then(response => {
        if (response.data.success) {
          context.dispatch("getOrder");
        }
        context.commit("LOADING", false);
      });
    },
    signin(context) {
      return new Promise((resolve, reject) => {
        const url = `${process.env.APIPATH}/admin/signin`;
        let user = context.state.user;
        axios.post(url, user).then(
          response => {
            console.log("login msg", response.data);
            resolve(response);
          },
          error => {
            reject(error);
          }
        );
      });
    },
    updateCoupon(context) {
      // create
      if (context.state.isNewCoupon) {
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
        let newCoupon = context.state.tempCoupon;
        axios.post(url, { data: newCoupon }).then(response => {
          context.dispatch("getCoupons");
        });
      }
      // update
      else {
        let oldCoupon = context.state.tempCoupon;
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${oldCoupon.id}`;
        axios.put(url, { data: oldCoupon }).then(response => {
          context.dispatch("getCoupons");
        });
      }
    },
    getCoupons(context) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons`;
      context.commit("LOADING", true);
      axios.get(url).then(response => {
        console.log(response);
        context.commit("COUPONS", response.data.coupons);
        context.commit("LOADING", false);
      });
    }
  },
  // 操作資料狀態
  mutations: {
    LOADING(state, payload) {
      state.isLoading = payload;
    },
    PRODUCT(state, payload) {
      state.product = payload;
    },
    PRODUCT_NUM(state, payload) {
      state.product.num = payload;
    },
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    PAGINATION(state, payload) {
      state.pagination = payload;
    },
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
    ORDERS(state, payload) {
      state.orders = payload;
    },
    ORDER(state, payload) {
      state.order = payload;
    },
    ORDER_ID(state, payload) {
      state.orderId = payload;
    },
    USER_NAME(state, payload) {
      state.user.username = payload;
    },
    USER_PASSWORD(state, payload) {
      state.user.password = payload;
    },
    TEMPCOUPON(state, payload) {
      state.tempCoupon = payload;
    },
    TEMPCOUPON_TITLE(state, payload) {
      state.tempCoupon.title = payload;
    },
    TEMPCOUPON_IS_ENABLED(state, payload) {
      state.tempCoupon.is_enabled = payload;
    },
    TEMPCOUPON_PERCENT(state, payload) {
      state.tempCoupon.percent = payload;
    },
    TEMPCOUPON_DUE_DATE(state, payload) {
      state.tempCoupon.due_date = payload;
    },
    TEMPCOUPON_CODE(state, payload) {
      state.tempCoupon.code = payload;
    },
    IS_NEW_COUPON(state, payload) {
      state.isNewCoupon = payload;
    },
    COUPONS(state, payload) {
      state.coupons = payload;
    }
  }
});
