import Vue from "vue";
import Router from "vue-router";
// Admin
import Dashboard from "@/components/pages/Dashboard";
import Login from "@/components/pages/Login";
import Products from "@/components/pages/Products";
import Coupons from "@/components/pages/Coupons";
import CustomerOrders from "@/components/pages/CustomerOrders";
import Orders from "@/components/pages/Orders";
import CustomerOrderCheckout from "@/components/pages/CustomerOrderCheckout";
// Portal
import PortalIndex from "@/components/pages/Portal/Index";

Vue.use(Router);

export default new Router({
  routes: [
    // 不存在的路由，都導向指定的頁面
    {
      path: "*",
      redirect: "portal_index"
    },
    // 入口頁面
    {
      path: "/",
      redirect: "portal_index"
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/portal_index",
      name: "PortalIndex",
      component: PortalIndex
    },
    {
      path: "/admin",
      name: "Dashboard",
      component: Dashboard,
      meta: { requiresAuth: true },
      children: [
        {
          path: "products",
          name: "Products",
          component: Products,
          meta: { requiresAuth: true }
        },
        {
          path: "coupons",
          name: "Coupons",
          component: Coupons,
          meta: { requiresAuth: true }
        },
        {
          path: "orders",
          name: "Orders",
          component: Orders,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: "/",
      name: "Dashboard",
      component: Dashboard,
      children: [
        {
          path: "customer_orders",
          name: "CustomerOrders",
          component: CustomerOrders
        },
        {
          path: "customer_order_checkout/:orderId",
          name: "CustomerOrderCheckout",
          component: CustomerOrderCheckout
        }
      ]
    }
  ]
});
