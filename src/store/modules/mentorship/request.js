import axios from "axios"; 
const state = {
    requests:[],
    requestOne:{}
}

const getters = {
    requests:state=>state.requests,
    requestOne:state=>state.requestOne
}

const actions = {

    saveRequest({dispatch},data){

        var url = process.env.VUE_APP_BASEURL + '/Mn/Request/';
        console.log(data)
        axios.post(url,data).then(resp=>{
            if(resp.data.success){
                console.log('Request Saved')
                dispatch('getProfile')
                
            }
        })
    },
    PayRequest({dispatch},reqId){
        var url=process.env.VUE_APP_BASEURL + '/Mn/Request/'+reqId+'/pay';
        axios.put(url).then((resp)=>{

            if(resp.data.success){
                console.log('Request State Updated to Paid')
                dispatch('getProfile')
            }

        })
    },
    getRequestOne({ state, commit }, reqId) {

        var reqOne = state.requests.find(item => item._id === reqId)
        console.log(state.requests)
        commit('requestOne', reqOne)
        
    },
    socket_requestApplied({dispatch}){
        console.log('request applied')
        dispatch('getProfile')
    },
    socket_sessionCreated({dispatch}){
        console.log('Session Created')
        dispatch('getProfile')
    },
    socket_meetScheduled({dispatch}){
        console.log('meet scheduled')
        dispatch('getProfile')
    }
    


}

const mutations = {

    requests:(state,requests)=>(state.requests = requests),
    requestOne:(state,requestOne)=>(state.requestOne=requestOne)

}


export default {
    state,
    getters,
    actions,
    mutations
}