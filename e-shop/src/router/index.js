import Vue from "vue";
import Router from "vue-router";
// Admin
import Dashboard from "@/components/pages/Admin/Dashboard";
import Login from "@/components/pages/Admin/Login";
import Products from "@/components/pages/Admin/Products";
import Coupons from "@/components/pages/Admin/Coupons";
import CustomerOrders from "@/components/pages/Admin/CustomerOrders";
import Orders from "@/components/pages/Admin/Orders";
import CustomerOrderCheckout from "@/components/pages/Admin/CustomerOrderCheckout";
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
