import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

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

export default new Vuex.Store({
  state: {
    course: [],
    kurs: {},
    mitschriften: [],
    mitschrift: {},
  },
  mutations: {
    set(state, payload) {
      state[payload.state] = payload.data.data;
    },
  },
  actions: {
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
    // C(R)UD Methods
    async insert(state, payload) {
      await axios.post(url + payload.route, payload.data);
    },
  },
  getters: {
    get: (state) => (variable) => {
      return state[variable];
    },
  },
});
