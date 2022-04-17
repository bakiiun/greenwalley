import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    breadcrumbs: [],
  },
  mutations: {
    setState(state, payload) {
      state[payload.key] = payload.data;
    },
  },
  actions: {
    trigger({ commit }, payload) {
      commit("setState", { key: payload.state, data: payload.data });
    },
    /* eslint-disable no-unused-vars */
    notification({ commit }, [title, text, type]) {
      Vue.notify({
        group: "error",
        title: title || "Hata",
        type: type || "error",
        position: "top right",
        duration: "3000",
        speed: "300",
        text,
      });
    },
  },
  modules: {},
});
