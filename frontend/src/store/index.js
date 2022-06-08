import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router/index";

Vue.use(Vuex);

const url = "https://dhbwiki.th1nk.media/api/";
// Register POST: /user {email | password} => res.data {user objekt} id im cookie speichern
// Login POST: /user/auth {email | password} => res.data {user objekt}
// Kurse GET: /api/course => res.data [{_id, name, teacher}] Alle Kurse
// Kurse GET: /api/course/user/:_id => res.data [{_id, name, teacher}]
// Mitschriften /api/file/course/:_id
// Mitschrift /api/file/:_id {}
// Datei /api/file/:_id/asset
// Upload POST: /api/file/upload {}
// Feedback POST: /api/feedback {}
// User PATCH: /api/user/:_id {}
// Kalender GET: /api/calendar/tomorrow {}

export default new Vuex.Store({
  state: {
    course: [],
    kurs: {},
    mitschriften: [],
    mitschrift: {},
    user: {},
  },
  mutations: {
    set(state, payload) {
      state[payload.state] = payload.data.data;
    },
  },
  actions: {
    // Get methods
    async set(state, payload) {
      await axios.get(url + payload).then((res) => {
        res.state = payload;
        state.commit("set", res);
      });
    },
    async setMitschriften(state, payload) {
      await axios.get(url + "file/course/" + payload).then((res) => {
        res.state = "mitschriften";
        state.commit("set", res);
      });
    },
    async setMitschrift(state, payload) {
      await axios.get(url + "file/" + payload).then((res) => {
        res.state = "mitschrift";
        state.commit("set", res);
      });
    },
    async setKurs(state, payload) {
      await axios.get(url + "course/" + payload).then((res) => {
        res.state = "kurs";
        state.commit("set", res);
      });
    },
    // Post methods
    async login(state, payload) {
      payload.email = payload.email.toLowerCase();
      await axios
        .post(url + "user/auth", payload)
        .then((res) => {
          localStorage.setItem("dhbwiki_jwt", res.data.data.jwt);
          router.push("/kurse");
        })
        .catch((err) => {
          console.error(err);
          alert("Login fehlgeschlagen");
        });
    },
    async register(state, payload) {
      await axios
        .post("https://dhbwiki.th1nk.media/api/user/exists", {
          email: payload.email,
        })
        .then(() => {
          alert("Nutzer existiert bereits");
        })
        .catch(() => {
          axios
            .post(url + "user", payload)
            .then(() => {
              state.dispatch("login", payload);
            })
            .catch((err) => console.error(err));
        });
    },
    async send_feedback(state, payload) {
      await axios
        .post(url + "feedback", payload)
        .catch((err) => console.error(err));
    },
    async update_user(state, payload) {
      await axios
        .patch(url + "user/" + payload._id, payload)
        .then(() => {
          alert("Daten aktualisiert, bitte melde dich neu an!");
        })
        .catch((err) => console.error(err));
    },
    async delete_user(state, payload) {
      await axios
        .delete(url + "user/" + payload._id)
        .then(() => {
          alert("Account gelöscht!");
          localStorage.removeItem("dhbwiki_jwt");
          router.push("/");
        })
        .catch((err) => console.error(err));
    },
  },
  getters: {
    get: (state) => (variable) => {
      return state[variable];
    },
  },
});
