import Vue from 'vue'
import Vuex from 'vuex'

import User from './modules/user';
import profile from './modules/profile';
import experiance from './modules/experiance';
import education from './modules/education';
import contact from './modules/contact';
import project from './modules/project';
import reffrence from './modules/reffrence';
import organization from './modules/organization';
import awards from './modules/award';
import skill from './modules/skills';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    User,
    profile,
    experiance,
    education,
    contact,
    project,
    reffrence,
    organization,
    skill,
    awards
  }
})
