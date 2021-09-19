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
    cardInfo: {
      userName: "",
      number: "",
      expiration: "",
      cvc: ""
    },
    coupon_code: "",
    cart: {},
    selectCountry: "",
    selectCity: "",
    postalCode: "",
    country: [],
    city: []
  },
  actions: {
    getCountry(context) {
      const url = `${process.env.APIPATH}/api/selection/country`;
      axios.get(url).then(response => {
        context.commit("COUNTRY", response.data);
      });
    },
    getCity(context, value) {
      const url = `${process.env.APIPATH}/api/selection/city/${value.selectCountry}`;
      axios.get(url).then(response => {
        context.commit("CITY", response.data);
      });
    },
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
      const url = `${process.env.APIPATH}/api/Shopping/CreditCardPay`;
      let postData = {
        orderId: value.orderId,
        cardUserName: context.state.cardInfo.userName,
        cardNumber: context.state.cardInfo.number,
        cardExpiration: context.state.cardInfo.expiration,
        cardCvc: context.state.cardInfo.cvc
      };
      console.log(postData);
      axios.post(url, postData).then(response => {
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

          context.commit("CARD_INFO_USER_NAME", "");
          context.commit("CARD_INFO_NUMBER", "");
          context.commit("CARD_INFO_EXPIRATION", "");
          context.commit("CARD_INFO_CVC", "");
        }
      });
    },
    createOrder(context, value) {
      return new Promise((resolve, reject) => {
        const url = `${process.env.APIPATH}/api/order`;
        const order = context.state.orderForm;
        let address = `${context.getters.select_country_name} ${context.getters.select_city_name} ${context.state.postalCode} ${context.state.orderForm.address}`;
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
    updateCardInfoUserName(context, value) {
      context.commit("CARD_INFO_USER_NAME", value);
    },
    updateCardInfoNumber(context, value) {
      context.commit("CARD_INFO_NUMBER", value);
    },
    updateCardInfoExpiration(context, value) {
      context.commit("CARD_INFO_EXPIRATION", value);
    },
    updateCardInfoCVC(context, value) {
      context.commit("CARD_INFO_CVC", value);
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
    CARD_INFO_USER_NAME(state, payload) {
      state.cardInfo.userName = payload;
    },
    CARD_INFO_NUMBER(state, payload) {
      state.cardInfo.number = payload;
    },
    CARD_INFO_EXPIRATION(state, payload) {
      state.cardInfo.expiration = payload;
    },
    CARD_INFO_CVC(state, payload) {
      state.cardInfo.cvc = payload;
    },
    COUNTRY(state, payload) {
      state.country = payload;
    },
    CITY(state, payload) {
      state.city = payload;
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
    cardInfo_user_name(state) {
      return state.cardInfo.userName;
    },
    cardInfo_number(state) {
      return state.cardInfo.number;
    },
    cardInfo_expiration(state) {
      return state.cardInfo.expiration;
    },
    cardInfo_cvc(state) {
      return state.cardInfo.cvc;
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
    },
    select_country_name(state) {
      let selectCountryId = state.selectCountry;
      let country = state.country.find(item => item.value === selectCountryId);
      return country.text;
    },
    select_city_name(state) {
      let selectCityId = state.selectCity;
      let city = state.city.find(item => item.value === selectCityId);
      return city.text;
    }
  }
};
