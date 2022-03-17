import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        isLogin: false,
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: {
        isLogin: false,
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
      meta: {
        isLogin: false,
      },
    },
    {
      path: "/forgot",
      name: "forgot",
      component: () => import("../views/RegisterView.vue"),
      meta: {
        isLogin: false,
      },
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
      meta: {
        isLogin: false,
      },
    },
    {
      path: "/create",
      name: "createNewGame",
      component: () => import("../views/CreateView.vue"),
      meta: {
        isLogin: true,
      },
    },
    {
      path: "/app/:id",
      name: "app",
      component: () => import("../views/GameView.vue"),
      props: true,
      meta: {
        isLogin: false,
      },
    },
  ],
});

export default router;
