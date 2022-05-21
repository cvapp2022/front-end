import Vue from 'vue'
import VueRouter from 'vue-router'

import _ from 'lodash';
import store from '../store/index'


import home from '../views/Home.vue'
import cvOne from '../views/cvOne.vue';
import clOne from '../views/clOne.vue';
import login from '../views/login.vue'
import profile from '../views/profile.vue';


import meet from '../views/mn/meet.vue';


import naron from '../components/templates/naron/naron.vue';
import sophia from '../components/templates/sophia/sophia.vue';
import jane from '../components/templates/jane/jane.vue';
import doe from '../components/templates/doe/doe.vue';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
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
    path:'/cv/',
    name:'cvOne',
    component:cvOne,
    meta:{
      requireAuth:true
    }
  },
  {
    path:'/cl/',
    name:'clOne',
    component:clOne,
    meta:{
      requireAuth:true
    }
  },
  {
    path:'/meet/',
    name:'meet',
    component:meet
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
  routes,
  mode: 'history',
})


router.beforeEach((to, from, next)=>{

  
  //Check User From State
  var User=store.getters.User;
  var Token=store.getters.Token;
  if(to.meta.requireGuest && !_.isEmpty(User) && !_.isEmpty(Token)){
    router.push({ name:'home' });
  }
  else if(to.meta.requireAuth && _.isEmpty(User) && _.isEmpty(Token)){
    router.push({ name:'home' });
  }

  next()

});

export default router
