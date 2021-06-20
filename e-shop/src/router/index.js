import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import Dashboard from "@/components/Dashboard";
import Login from "@/components/pages/Login";
import Products from "@/components/pages/Products";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "*",
      redirect: "login" // 不存在的路由，都導向login頁面
    },
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld,
      meta: { requiresAuth: true } // 需要被驗證的路由
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/admin",
      name: "Dashboard",
      component: Dashboard,
      children: [
        {
          path: "/products",
          name: "Products",
          component: Products,
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
});
