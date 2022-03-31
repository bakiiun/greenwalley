import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/personal-pages/Layout.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Layout",
    component: Layout,
    children: [
      {
        path: "/dashboard",
        component: () => import("../views/personal-pages/child-pages/dashboard-page/Dashboard.vue"),
      },
      {
        path: "/aparts",
        component: () => import("../views/personal-pages/child-pages/aparts-page/Apart-List.vue"),
      },
      {
        path: "/aparts/show/:id",
        component: () => import("../views/personal-pages/child-pages/aparts-page/child-pages/Show-Apart.vue"),
      },
      {
        path: "/customers",
        component: () => import("../views/personal-pages/child-pages/customers-page/Customer-List.vue"),
      },
      {
        path: "/customers/:id",
        component: () => import("../views/personal-pages/child-pages/customers-page/child-pages/Show-Customer.vue"),
      },
      {
        path: "/invoices",
        component: () => import("../views/personal-pages/child-pages/invoices-page/Invoice-List.vue"),
      },
    ],
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
