import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies';
import _ from 'lodash';
import store from '../store/index'
import Home from '../views/Home.vue'
import profile from '../views/profile.vue'
import login from '../views/login.vue'

import naron from '../components/templates/naron/naron.vue';
import sophia from '../components/templates/sophia/sophia.vue';
import jane from '../components/templates/jane/jane.vue';
import doe from '../components/templates/doe/doe.vue';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path:'/naron',
    name:'naron',
    component:naron
  },
  {
    path:'/sophia',
    name:'sophia',
    component:sophia
  },
  {
    path:'/jane',
    name:'jane',
    component:jane
  },
  {
    path:'/doe',
    name:'doe',
    component:doe
  },
  {
    path:'/profile',
    name:'profile',
    component:profile,
    meta:{
      requireAuth:true
    }
  },
  {
    path:'/login',
    name:'login',
    component:login,
    meta:{
      requireGuest:true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next)=>{

  //Check User From Cookies
  var UserCookie=VueCookies.get('user');
  var TokenCookie=VueCookies.get('token');

  if(to.meta.requireGuest && !_.isEmpty(UserCookie) && !_.isEmpty(TokenCookie)){
    router.push({ name:'home' });
  }
  
  //Check User From State
  var User=store.getters.User;
  var Token=store.getters.Token;
  if(to.meta.requireGuest && !_.isEmpty(User) && !_.isEmpty(Token)){
    router.push({ name:'home' });
  }
  else if(to.meta.requireAuth && _.isEmpty(User) && _.isEmpty(Token)){
    router.push({ name:'login' });
  }

  next()

});

export default router
