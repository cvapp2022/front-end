import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookie from 'vue-cookies';
import _ from 'lodash';
import store from '../store/index'


import { userRoutes } from './userRoutes';
import { profileRoutes } from './profileRoutes';
import { programRoutes } from './mn/programRoutes';
import { requestRoutes } from './mn/requestRoutes';
import { meetRoutes } from './mn/meetRoutes';

Vue.use(VueRouter)

const combineRoutes = [
  userRoutes,
  profileRoutes,
  programRoutes,
  requestRoutes,
  meetRoutes
]
const routes = combineRoutes.flat();

const router = new VueRouter({
  routes,
  mode: 'history',
})


router.beforeEach((to, from, next) => {


  //user guard start

  //Check User From State
  var Token = store.getters.Token;
  if (to.meta.requireGuest && !_.isEmpty(Token)) {
    router.push({ name: 'home' });
  }
  else if (to.meta.requireAuth && _.isEmpty(Token)) {

    //check if has cookie
    var TokenC = VueCookie.get('token')
    if (TokenC) {
      console.log('am in herer')
    }
    else {
      router.push({ name: 'home' });
    }
  }

  next();



});

export default router
