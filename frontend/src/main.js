import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// Moment for dates
import moment from "moment";
require("moment/locale/de");

Vue.use(require("vue-moment"), {
  moment,
});
Vue.use(require("vue-moment"));

// SweetAlert for ... you guessed it ... alerts
import VueSweetalert2 from "vue-sweetalert2";
import "@sweetalert2/theme-borderless/borderless.min.css";
Vue.use(VueSweetalert2);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
