import axios from "axios"; 

const state = {
    cvTemplates:[],
    clTemplates:[],
    socialLogin:{},
    configs:{}
}

const getters = {
    cvTemplates:state=>state.cvTemplates,
    clTemplates:state=>state.clTemplates,
    socialLogin:state=>state.socialLogin,
    configs:state=>state.configs
}

const actions = {
    getInit({commit}){
        var url = process.env.VUE_APP_BASEURL + '/init/';
        axios.get(url).then((resp)=>{
            if(resp.data.success){
                commit('cvTemplates',resp.data.payload.cvTemplates)
                commit('clTemplates',resp.data.payload.clTemplates)
                commit('socialLogin',resp.data.payload.socialLogin)
            }
        })
    },
    socket_templateCreated({dispatch}){
        dispatch('getInit')
    },
    socket_templateRemoved({dispatch}){
        dispatch('getInit')
    },
}

const mutations = {

    cvTemplates:(state,cvTemplates)=>(state.cvTemplates = cvTemplates),
    clTemplates:(state,clTemplates)=>(state.clTemplates = clTemplates),
    socialLogin:(state,socialLogin)=>(state.socialLogin = socialLogin),
    configs:(state,configs)=>(state.configs = configs),
    

}


export default {
    state,
    getters,
    actions,
    mutations
}