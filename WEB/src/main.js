import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import notifications from "vue-notification";

Vue.config.productionTip = false;
Vue.use(notifications);

axios.defaults.baseURL = "http://localhost:3000/api";

const vueApp = new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

export default vueApp;
