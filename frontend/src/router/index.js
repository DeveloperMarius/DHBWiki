import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/kurse",
    name: "Kurse",
    component: () => import("@/views/KurseView"),
    beforeEnter(to, from, next) {
      if (localStorage.getItem("userid")) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/kurse/:fach",
    name: "Fach",
    component: () => import("@/views/FachView"),
    beforeEnter(to, from, next) {
      if (localStorage.getItem("userid")) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/kurse/:fach/:id",
    name: "Dokument",
    component: () => import("@/views/DokumentView"),
    beforeEnter(to, from, next) {
      if (localStorage.getItem("userid")) {
        next();
      } else {
        next("/");
      }
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
