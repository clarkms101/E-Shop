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
import PortalProducts from "@/components/pages/Portal/Products";
import PortalProduct from "@/components/pages/Portal/Product";
import PortalOrder from "@/components/pages/Portal/Order";
import PortalOrderCheckout from "@/components/pages/Portal/OrderCheckout";

Vue.use(Router);

export default new Router({
  routes: [
    // 不存在的路由，都導向指定的頁面
    {
      path: "*",
      name: "Undefined",
      redirect: "portal_index/products/default"
    },
    // 入口頁面
    {
      path: "/",
      name: "Entrance",
      redirect: "portal_index/products/default"
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/portal_index",
      name: "PortalIndex",
      component: PortalIndex,
      children: [
        {
          path: "products/:category",
          name: "PortalProducts",
          component: PortalProducts
        }
      ]
    },
    {
      path: "/portal_product/:productId",
      name: "PortalProduct",
      component: PortalProduct
    },
    {
      path: "/portal_order",
      name: "PortalOrder",
      component: PortalOrder
    },
    {
      path: "/portal_order_checkout/:orderId",
      name: "PortalOrderCheckout",
      component: PortalOrderCheckout
    },
    {
      path: "/admin",
      name: "DashboardForAdmin",
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
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.name === "PortalProduct") {
      return { x: 0, y: 0 };
    } else {
      return savedPosition;
    }
  }
});
