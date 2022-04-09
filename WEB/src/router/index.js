import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/admin-panel/Layout.vue";
import Login from "../views/login/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Layout",
    redirect: "/dashboard",
    component: Layout,
    children: [
      {
        path: "/dashboard",
        component: () => import("../views/admin-panel/child-pages/dashboard-page"),
      },
      {
        path: "/aparts",
        component: () => import("../views/admin-panel/child-pages/aparts-page"),
      },
      {
        path: "/aparts/show/:id",
        name: "showApart",
        component: () => import("../views/admin-panel/child-pages/aparts-page/show-apart-page"),
      },
      {
        path: "/customers",
        component: () => import("../views/admin-panel/child-pages/customers-page"),
      },
      {
        path: "/customers/:id",
        component: () => import("../views/admin-panel/child-pages/customers-page/show-customer-page"),
      },
      {
        path: "/invoices",
        component: () => import("../views/admin-panel/child-pages/invoices-page"),
      },
    ],
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
