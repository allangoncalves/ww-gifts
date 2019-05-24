import Vue from "nativescript-vue";
import store from "./store";
import router from "./router";

Vue.prototype.$store = store;

Vue.prototype.$goto = function(to, options) {
  this.$navigateTo(router[to], options);
};

Vue.filter('formatPrice', (value) => `$${value.toFixed(2)}`)

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = TNS_ENV === "production";

new Vue({
  store,
  render: h => h("frame", [h(router["splash"])])
}).$start();
