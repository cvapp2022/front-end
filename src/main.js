import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ValidationProvider, ValidationObserver, extend, localize } from 'vee-validate';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueCookie from 'vue-cookies';
import VueSocketIO from 'vue-socket.io-extended'
import SocketIO from 'socket.io-client'
import VueI18n from 'vue-i18n'
import locals from './locals'
import VueFileAgent from "vue-file-agent";

import 'vue-file-agent/dist/vue-file-agent.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import './assets/css/bootstraprtl.min.css';
import ar from "vee-validate/dist/locale/ar.json";
import * as rules from "vee-validate/dist/rules";




// Install VeeValidate rules and localization
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize("ar", ar);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueCookie)
Vue.use(VueFileAgent);
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'ar',
  fallbackLocale: 'ar',
  messages:locals
});

/* Establish Connection */
const ioInstance = SocketIO(process.env.VUE_APP_URL, {
        reconnection: true,
        reconnectionDelay: 8000,
        maxReconnectionAttempts: 2
});
Vue.use(VueSocketIO,ioInstance,{ store })

Vue.config.productionTip = false
Vue.prototype.$mutated=[]
Vue.prototype.$baseUrl = process.env.VUE_APP_URL;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
