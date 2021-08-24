import axios from "axios";

export default {
  namespaced: true,
  state: {
    coupons: {},
    tempCoupon: {
      title: "",
      isEnabled: false,
      percent: 100,
      dueDateTimeStamp: 0,
      couponCode: ""
    },
    isNewCoupon: false
  },
  actions: {
    updateCoupon(context) {
      let token = localStorage.getItem("adminJWT");
      axios.defaults.headers.common.Authorization = `${token}`;
      const url = `${process.env.APIPATH}/api/coupon`;

      // create
      if (context.state.isNewCoupon) {
        let newCoupon = context.state.tempCoupon;
        axios.post(url, { Coupon: newCoupon }).then(response => {
          context.dispatch("getCoupons", { page: 1 });
        });
      }
      // update
      else {
        let oldCoupon = context.state.tempCoupon;
        axios.put(url, { Coupon: oldCoupon }).then(response => {
          context.dispatch("getCoupons", { page: 1 });
        });
      }
    },
    getCoupons(context, value) {
      const url = `${process.env.APIPATH}/api/Coupons?page=${value.page}`;
      context.commit("LOADING", true, { root: true });
      axios.get(url).then(response => {
        console.log(response);
        context.commit("COUPONS", response.data.coupons);
        context.commit("LOADING", false, { root: true });
      });
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
    }
  },
  mutations: {
    TEMPCOUPON(state, payload) {
      state.tempCoupon = payload;
    },
    TEMPCOUPON_TITLE(state, payload) {
      state.tempCoupon.title = payload;
    },
    TEMPCOUPON_IS_ENABLED(state, payload) {
      state.tempCoupon.isEnabled = payload;
    },
    TEMPCOUPON_PERCENT(state, payload) {
      state.tempCoupon.percent = parseInt(payload, 10);
    },
    TEMPCOUPON_DUE_DATE(state, payload) {
      state.tempCoupon.dueDateTimeStamp = payload;
    },
    TEMPCOUPON_CODE(state, payload) {
      state.tempCoupon.couponCode = payload;
    },
    IS_NEW_COUPON(state, payload) {
      state.isNewCoupon = payload;
    },
    COUPONS(state, payload) {
      state.coupons = payload;
    }
  },
  getters: {
    tempCoupon_title(state) {
      return state.tempCoupon.title;
    },
    tempCoupon_isEnabled(state) {
      return state.tempCoupon.isEnabled;
    },
    tempCoupon_percent(state) {
      return state.tempCoupon.percent;
    },
    tempCoupon_dueDate(state) {
      return state.tempCoupon.dueDateTimeStamp;
    },
    tempCoupon_code(state) {
      return state.tempCoupon.couponCode;
    },
    coupons(state) {
      return state.coupons;
    }
  }
};
