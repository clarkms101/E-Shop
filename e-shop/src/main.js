// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// NPM下載的套件
import Vue from "vue";
import Vuex from "vuex";
import { sync } from "vuex-router-sync";
import axios from "axios";
import VueAxios from "vue-axios";
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
  configure
} from "vee-validate";
import vee_validate_locale from "vee-validate/dist/locale/zh_TW.json";
import * as rules from "vee-validate/dist/rules";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
import "bootstrap";

// 自行定義的
import App from "./App";
import router from "./router";
import currencyFilter from "./filters/currency";
import dateFilter from "./filters/date";
import store from "./store";
import parseJwt from "./_helpers/parseJwt";

// vee-validate 載入判斷規則(全部)
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});
localize("zh_TW", vee_validate_locale);
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
// vee-validate 判斷結果的CSS Class樣式(Bootstrap) 可以傳入validation-provider slot裡面
configure({
  classes: {
    valid: "is-valid",
    invalid: "is-invalid"
  }
});

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(Vuex);
Vue.component("Loading", Loading);
Vue.filter("currency", currencyFilter);
Vue.filter("date", dateFilter);
sync(store, router);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});

router.beforeEach((to, from, next) => {
  // console.log(to, from, next);

  // 需要驗證的頁面
  if (to.meta.requiresAuth) {
    const url = `${process.env.APIPATH}/api/Admin/LoginCheck`;
    let apiAccessKey = parseJwt().JwtKeyApiAccessKey;
    axios.post(url, { ApiAccessKey: apiAccessKey }).then(response => {
      console.log("login check", response.data);
      if (response.data.success) {
        // 驗證成功，導向指定頁面
        next();
      } else {
        // 驗證失敗，導向登入頁面
        next({
          path: "/login"
        });
      }
    });
    // 不需驗證的頁面，直接導向指定頁面
  } else {
    next();
  }
});
