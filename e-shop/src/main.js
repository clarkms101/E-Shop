// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App";
import router from "./router";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});

router.beforeEach((to, from, next) => {
  // console.log(to, from, next);

  // 需要驗證的頁面
  if (to.meta.requiresAuth) {
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then(response => {
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
