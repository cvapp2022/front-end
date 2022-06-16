import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ValidationProvider, ValidationObserver, extend, localize } from 'vee-validate';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueCookie from 'vue-cookies';
import VueSocketIO from 'vue-socket.io-extended'
import SocketIO from 'socket.io-client'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import en from "vee-validate/dist/locale/en.json";
import * as rules from "vee-validate/dist/rules";




// Install VeeValidate rules and localization
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize("en", en);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueCookie)

/* Establish Connection */
const ioInstance = SocketIO('http://127.0.0.1:5000', {
        reconnection: true,
        reconnectionDelay: 500,
        maxReconnectionAttempts: Infinity
});
Vue.use(VueSocketIO,ioInstance,{ store })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
