import axios from "axios";
import VueCookie from 'vue-cookies';
import CryptoJS from 'crypto-js'
import router from '../../router/index'



const state = {
    User: {},
    Token: {}
}

const getters = {
    User: state => state.User,
    Token: state => state.Token
}

const actions = {

    //Login
    Login({ commit, dispatch }, user) {


        var url = process.env.VUE_APP_BASEURL + '/User/login';
        axios.post(url, user).then(function (resp) {

            if (resp.data.success) {

                //encrypt token 
                const key = process.env.VUE_APP_ENCKEY //
                const iv = process.env.VUE_APP_ENCIV // 
                const txt = resp.data.payload.token;

                const cipher = CryptoJS.AES.encrypt(txt, key, {
                    iv: CryptoJS.enc.Utf8.parse(iv),
                    mode: CryptoJS.mode.CBC
                })

                commit('User', resp.data.payload.user)
                commit('Token', cipher.toString())

                VueCookie.set('user', resp.data.payload.user, { expires: "1h" })
                VueCookie.set('token', cipher.toString(), { expires: "1h" })

                //Set Token Default
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + txt;
                dispatch('getProfile')
                dispatch('getPrograms')
                //redirect to profile view 
                router.push({ name: 'profile' })

            }

        })
    },

    LoginByCookie({ commit, dispatch }, data) {


        const key = process.env.VUE_APP_ENCKEY //

        //Dcrypt Token
        var dcrypted = CryptoJS.AES.decrypt(data.Token, key).toString(CryptoJS.enc.Utf8);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + dcrypted;
        commit('Token', dcrypted)
        dispatch('getProfile')
        dispatch('getPrograms')

    },


}

const mutations = {
    User: (state, User) => (state.User = User),
    Token: (state, Token) => (state.Token = Token)
}



export default {
    state,
    getters,
    actions,
    mutations
}