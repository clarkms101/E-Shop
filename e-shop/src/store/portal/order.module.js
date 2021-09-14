import axios from "axios";

export default {
  namespaced: true,
  state: {
    orderForm: {
      userName: "",
      email: "",
      tel: "",
      address: "",
      message: "",
      paymentMethod: ""
    },
    coupon_code: "",
    cart: {},
    selectCountry: "",
    selectCity: "",
    postalCode: "",
    country: ["台灣"],
    city: [
      "臺北市",
      "新北市",
      "桃園市",
      "臺中市",
      "臺南市",
      "高雄市",
      "新竹縣",
      "苗栗縣",
      "彰化縣",
      "南投縣",
      "雲林縣",
      "嘉義縣",
      "屏東縣",
      "宜蘭縣",
      "花蓮縣",
      "臺東縣",
      "基隆市",
      "新竹市",
      "嘉義市",
      "澎湖縣",
      "金門縣",
      "連江縣"
    ]
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
      const url = `${process.env.APIPATH}/api/cart/${value.cartDetailId}`;
      context.commit("LOADING", true, { root: true });
      axios.delete(url).then(response => {
        // 刷新結帳頁面的購物車清單
        context.dispatch("getCart");
        // 刷新導覽列的購物車清單
        context.dispatch("portalNavbarMoules/getCart", null, { root: true });
        context.commit("LOADING", false, { root: true });
        if (response.data.success) {
          context.dispatch(
            "alertMoules/addMessage",
            {
              content: response.data.message,
              style: "success"
            },
            {
              root: true
            }
          );
        } else {
          context.dispatch(
            "alertMoules/addMessage",
            {
              content: "處理失敗",
              style: "danger"
            },
            {
              root: true
            }
          );
        }
      });
    },
    payOrderByCreditCard(context, value) {
      const url = `${process.env.APIPATH}/api/Shopping/CreditCardPay/${value.orderId}`;
      axios.post(url).then(response => {
        if (response.data.success) {
          context.dispatch(
            "alertMoules/addMessage",
            {
              content: response.data.message,
              style: "success"
            },
            {
              root: true
            }
          );
        }
      });
    },
    createOrder(context, value) {
      return new Promise((resolve, reject) => {
        const url = `${process.env.APIPATH}/api/order`;
        const order = context.state.orderForm;
        let address = `${context.state.selectCountry} ${context.state.selectCity} ${context.state.postalCode} ${context.state.orderForm.address}`;
        context.commit("ORDER_FORM_USER_ADDRESS", address);
        context.commit("ORDER_FORM_USER_PAYMENT_METHOD", value.paymentMethod);
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

            if (
              response.data.success &&
              value.paymentMethod === "CreditCardPayment"
            ) {
              context.dispatch("payOrderByCreditCard", {
                orderId: response.data.orderId
              });
            }

            resolve(response);
          },
          error => {
            reject(error);
          }
        );
      });
    },
    addCouponCode(context, value) {
      const url = `${process.env.APIPATH}/api/Shopping/UseCoupon`;
      const coupon = {
        CouponCode: value.coupon_code
      };
      context.commit("LOADING", true, { root: true });
      axios.post(url, { Coupon: coupon }).then(response => {
        if (response.data.success) {
          context.dispatch("getCart");
          context.dispatch("portalNavbarMoules/getCart", null, { root: true });
          context.commit("COUPON_CODE", "");
        }
        context.commit("LOADING", false, { root: true });

        if (response.data.success) {
          context.dispatch(
            "alertMoules/addMessage",
            {
              content: response.data.message,
              style: "success"
            },
            {
              root: true
            }
          );
        } else {
          context.dispatch(
            "alertMoules/addMessage",
            {
              content: response.data.message,
              style: "danger"
            },
            {
              root: true
            }
          );
        }
      });
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
    updateSelectCountry(context, value) {
      context.commit("SELECT_COUNTRY", value);
    },
    updateSelectCity(context, value) {
      context.commit("SELECT_CITY", value);
    },
    updatePostalCode(context, value) {
      context.commit("POSTALCODE", value);
    },
    updateCouponCode(context, value) {
      context.commit("COUPON_CODE", value);
    }
  },
  mutations: {
    CART(state, payload) {
      state.cart = payload;
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
    ORDER_FORM_USER_PAYMENT_METHOD(state, payload) {
      state.orderForm.paymentMethod = payload;
    },
    ORDER_FORM_MESSAGE(state, payload) {
      state.orderForm.message = payload;
    },
    SELECT_COUNTRY(state, payload) {
      state.selectCountry = payload;
    },
    SELECT_CITY(state, payload) {
      state.selectCity = payload;
    },
    POSTALCODE(state, payload) {
      state.postalCode = payload;
    },
    COUPON_CODE(state, payload) {
      state.coupon_code = payload;
    }
  },
  getters: {
    cart(state) {
      return state.cart;
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
    },
    country(state) {
      return state.country;
    },
    city(state) {
      return state.city;
    },
    selectCountry(state) {
      return state.selectCountry;
    },
    selectCity(state) {
      return state.selectCity;
    },
    postalCode(state) {
      return state.postalCode;
    },
    coupon_code(state) {
      return state.coupon_code;
    }
  }
};
