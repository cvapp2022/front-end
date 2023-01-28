import Vue from 'vue'
import Vuex from 'vuex'

import User from './modules/user';
import account from './modules/account';
import order from './modules/user/order';
import mnProgram from './modules/mentorship/program';
import mnRequest from './modules/mentorship/request';
import session from './modules/mentorship/session';

import service from './modules/service';
import servRequest from './modules/service/request';

import experiance from './modules/cv/experiance';
import education from './modules/cv/education';
import contact from './modules/cv/contact';
import project from './modules/cv/project';
import reffrence from './modules/cv/reffrence';
import organization from './modules/cv/organization';
import awards from './modules/cv/award';
import skill from './modules/cv/skills';
import chat from './modules/chat'
import App from './modules/app';


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    App,
    User,
    account,
    order,
    mnProgram,
    mnRequest,
    session,
    experiance,
    education,
    contact,
    project,
    reffrence,
    organization,
    skill,
    awards,
    service,
    servRequest,
    chat
  }
})
