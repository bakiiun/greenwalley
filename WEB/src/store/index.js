import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    breadcrumbs: [],
    aa: "asdasd",
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
  },
  modules: {},
});
