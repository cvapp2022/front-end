import axios from "axios"; 
const state = {
    services:[],
    serviceOne:{}
}

const getters = {
    services:state=>state.services,
    serviceOne:state=>state.serviceOne
}

const actions = {

    async getServices({commit},data){
        var url = process.env.VUE_APP_BASEURL + '/Service/'+data.lang;
        return axios.get(url).then(resp=>{
            if(resp.data.success){
                commit('services',resp.data.payload)                
            }
        })

    },
    getServiceOne({commit},data){

        //find services
        var url = process.env.VUE_APP_BASEURL + '/Service/'+data.servId+'/'+data.lang; 
        return axios.get(url).then(resp=>{
            if(resp.data.success){
                commit('serviceOne',resp.data.payload);                
            }
        })
        //var servOne=state.services.find(item=> item._id === servId )       

    },
    socket_serviceCreated({commit},data){
        commit('addService',data)
    }

}

const mutations = {

    services:(state,services)=>(state.services = services),
    serviceOne:(state,serviceOne)=>(state.serviceOne=serviceOne),
    addService:(state,addedService)=>(state.services.push(addedService))
}


export default {
    state,
    getters,
    actions,
    mutations
}