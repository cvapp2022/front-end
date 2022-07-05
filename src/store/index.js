import Vue from 'vue'
import Vuex from 'vuex'

import User from './modules/user';
import profile from './modules/profile';
import program from './modules/mentorship/program';
import request from './modules/mentorship/request';
import session from './modules/mentorship/session';

import experiance from './modules/cv/experiance';
import education from './modules/cv/education';
import contact from './modules/cv/contact';
import project from './modules/cv/project';
import reffrence from './modules/cv/reffrence';
import organization from './modules/cv/organization';
import awards from './modules/cv/award';
import skill from './modules/cv/skills';
import App from './modules/app';


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    App,
    User,
    profile,
    program,
    request,
    session,
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
