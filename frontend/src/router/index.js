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
    beforeEnter: is_auth,
  },
  {
    path: "/kurse/:fach",
    name: "Fach",
    component: () => import("@/views/FachView"),
    beforeEnter: is_auth,
  },
  {
    path: "/kurse/:fach/:id",
    name: "Dokument",
    component: () => import("@/views/DokumentView"),
    beforeEnter: is_auth,
  },
];

const router = new VueRouter({
  routes,
});

function is_auth(to, from, next) {
  if (localStorage.getItem("userid")) {
    next();
  } else {
    next("/");
  }
}

export default router;
