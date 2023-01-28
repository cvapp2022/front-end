
const state = {
    templateOrders:[],
    mentorshipOrders:[],
    serviceOrders:[],
}

const getters = {
    templateOrders:state=>state.templateOrders,
    mentorshipOrders:state=>state.mentorshipOrders,
    serviceOrders:state=>state.serviceOrders,

}

const actions = {

}

const mutations = {

    templateOrders:(state,templateOrders)=>(state.templateOrders = templateOrders),
    serviceOrders:(state,serviceOrders)=>(state.serviceOrders = serviceOrders),
    

}


export default {
    state,
    getters,
    actions,
    mutations
}