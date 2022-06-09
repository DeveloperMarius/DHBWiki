import Vue from "vue";
import VueRouter from "vue-router";
import VueJwtDecode from "vue-jwt-decode";
import Home from "../views/HomeView.vue";
import store from "../store/index";

Vue.use(VueRouter);

function is_authenticated(_to, _from, next) {
  const token = localStorage.getItem("dhbwiki_jwt");
  let decoded = { exp: 0 };
  if (!token) next("/");
  try {
    decoded = VueJwtDecode.decode(token);
    store.state.user = decoded.user;
  } catch (err) {
    console.error(err);
    localStorage.removeItem("dhbwiki_jwt");
    next("/");
  }
  if (Date.now() >= decoded.exp * 1000) {
    localStorage.removeItem("dhbwiki_jwt");
    next("/");
  }
  next();
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/impressum",
    name: "Impressum",
    component: () => import("@/views/ImpressumView"),
  },
  {
    path: "/privacy",
    name: "PrivacyPolicy",
    component: () => import("@/views/PrivacyPolicyView"),
  },
  {
    path: "/kurse",
    name: "Kurse",
    component: () => import("@/views/KurseView"),
    beforeEnter: is_authenticated,
  },
  {
    path: "/kurse/:fach",
    name: "Fach",
    component: () => import("@/views/FachView"),
    beforeEnter: is_authenticated,
  },
  {
    path: "/kurse/:fach/:id",
    name: "Dokument",
    component: () => import("@/views/DokumentView"),
    beforeEnter: is_authenticated,
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  routes,
});

export default router;
