import Vue from "vue";
import App from "./App.vue";

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueCroppie from 'vue-croppie';
import 'croppie/croppie.css' // import the croppie css manually
 
Vue.use(VueCroppie);

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
