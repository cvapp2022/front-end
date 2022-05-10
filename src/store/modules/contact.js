const state = {
    contacts:[]
}

const getters = {
    contacts:state=>state.contacts

}

const actions = {


}

const mutations = {

    contacts:(state,contacts)=>(state.contacts = contacts)

}


export default {
    state,
    getters,
    actions,
    mutations
}