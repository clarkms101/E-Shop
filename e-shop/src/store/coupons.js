import axios from "axios";

export default {
  namespaced: true,
  state: {
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
  actions: {
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
  },
  getters: {
    tempCoupon_title(state) {
      return state.tempCoupon.title;
    },
    tempCoupon_isEnabled(state) {
      return state.tempCoupon.is_enabled;
    },
    tempCoupon_percent(state) {
      return state.tempCoupon.percent;
    },
    tempCoupon_dueDate(state) {
      return state.tempCoupon.due_date;
    },
    tempCoupon_code(state) {
      return state.tempCoupon.title;
    },
    coupons(state) {
      return state.coupons;
    }
  }
};