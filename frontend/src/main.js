import Vue from "vue";
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/en";
import "./assets/theme/index.css";
import { clickOutside } from "./directives/click-outside.js";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.use(ElementUI, { locale });
Vue.directive("clickOutside", clickOutside);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
