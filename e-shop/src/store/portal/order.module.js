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
    createOrder(context) {
      // todo 送出訂單、訂單資料驗證
      console.log(context.state.selectCountry);
      console.log(context.state.selectCity);
      console.log(context.state.postalCode);
      console.log(context.state.orderForm);
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
    }
  }
};
