import axios from "axios";
import VueCookie from 'vue-cookies';
import CryptoJS from 'crypto-js'

const state = {
    User: {},
    Notification:{},
    Token: {}
}

const getters = {
    User: state => state.User,
    Notification:state=>state.Notification,
    Token: state => state.Token
}

const actions = {

    //Login
    async Login({ commit }, user) {


        var url = process.env.VUE_APP_BASEURL + '/User/login';
        const resp = await axios.post(url, user);
        if (resp.data.success) {

            //encrypt token 
            const key = process.env.VUE_APP_ENCKEY; //
            const iv = process.env.VUE_APP_ENCIV; // 
            const txt = resp.data.payload.token;

            const cipher = CryptoJS.AES.encrypt(txt, key, {
                iv: CryptoJS.enc.Utf8.parse(iv),
                mode: CryptoJS.mode.CBC
            });
            commit('User', resp.data.payload.user);
            commit('Notification', resp.data.payload.user.UserNotif);
            commit('Token', cipher.toString());

            //console.log(VueCookie.set('user', resp.data.payload.user, { expires: "1h" }))
            VueCookie.set('user', resp.data.payload.user._id, { expires: "1h" });
            VueCookie.set('token', txt, { expires: "1h" });

            //Set Token Default
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + txt;
            // dispatch('getProfile')
            // dispatch('getPrograms')
            return resp.data.payload.user;
        }
    },

    async LoginByCookie({commit }, data) {


        //const key = process.env.VUE_APP_ENCKEY //

        //Dcrypt Token
        //var dcrypted = CryptoJS.AES.decrypt(data.Token, key).toString(CryptoJS.enc.Utf8);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.Token;
        commit('Token', data.Token)

        //this.$socket.client.emit("join", { userId:data.user });
        //dispatch('getProfile')

        return data.User;
        // dispatch('getPrograms')
    },

    LoginBySocial({commit},data){

        
        let url;
        if(data.social === 'linkedin'){
            url=process.env.VUE_APP_BASEURL + '/User/loginLinkedin?code='+data.query.code;
        }
        else if(data.social === 'google'){
            url=process.env.VUE_APP_BASEURL + '/User/loginGoogle?code='+data.query.code;
        }
        else if(data.social === 'github'){
            url=process.env.VUE_APP_BASEURL + '/User/loginGithub?code='+data.query.code;
        }
        return axios.get(url).then((resp)=>{
            if(resp.data.success){
                //encrypt token 
                const key = process.env.VUE_APP_ENCKEY; //
                const iv = process.env.VUE_APP_ENCIV; // 
                const txt = resp.data.payload.token;
        
                const cipher = CryptoJS.AES.encrypt(txt, key, {
                    iv: CryptoJS.enc.Utf8.parse(iv),
                    mode: CryptoJS.mode.CBC
                });
                commit('User', resp.data.payload.user);
                commit('Notification', resp.data.payload.user.UserNotif);
                commit('Token', cipher.toString());

                //console.log(VueCookie.set('user', resp.data.payload.user, { expires: "1h" }))
                VueCookie.set('user', resp.data.payload.user._id, { expires: "1h" });
                VueCookie.set('token', txt, { expires: "1h" });
    
                //Set Token Default
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + txt;
                return resp.data.payload.user;
            }
        })
    },
    async Register({ commit },user) {
        var url = process.env.VUE_APP_BASEURL + '/User/';
        const resp = await axios.post(url, user);
        if (resp.data.success) {

            //encrypt token 
            const key = process.env.VUE_APP_ENCKEY; //
            const iv = process.env.VUE_APP_ENCIV; // 
            const txt = resp.data.payload.token;

            const cipher = CryptoJS.AES.encrypt(txt, key, {
                iv: CryptoJS.enc.Utf8.parse(iv),
                mode: CryptoJS.mode.CBC
            });

            

            commit('User', resp.data.payload.user);
            commit('Notification', resp.data.payload.user.UserNotif);
            commit('Token', cipher.toString());

            //console.log(VueCookie.set('user', resp.data.payload.user, { expires: "1h" }))
            VueCookie.set('token', txt, { expires: "1h" });
            VueCookie.set('user', resp.data.payload.user._id, { expires: "1h" });

            //Set Token Default
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + txt;

            return resp.data.payload.user;

        }

    }


}

const mutations = {
    User: (state, User) => (state.User = User),
    Notification:(state, Notification) => (state.Notification = Notification),
    SOCKET_NOTIFICATION_SENT_TO_USER:(state,Notification)=>(state.Notification.push(Notification)),
    SOCKET_NOTIFICATION_SENT_TO_ALL_USERS:(state,Notification)=>(state.Notification.push(Notification)),
    Token: (state, Token) => (state.Token = Token)
}



export default {
    state,
    getters,
    actions,
    mutations
}