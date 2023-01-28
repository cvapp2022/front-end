import axios from "axios";
import Vue from 'vue';
const state = {
    mnRequests: [],
    mnRequestOne: {}
}

const getters = {
    mnRequests: state => state.mnRequests,
    mnRequestOne: state => state.mnRequestOne
}

const actions = {

    saveRequest({ commit }, data) {

        var url = process.env.VUE_APP_BASEURL + '/Mn/Request/';
        console.log(data)
        axios.post(url, data).then(resp => {
            if (resp.data.success) {
                commit('addRequest', resp.data.payload)
            }
        })
    },
    PayRequest({ commit }, reqId) {
        var url = process.env.VUE_APP_BASEURL + '/Mn/Request/' + reqId + '/pay';
        axios.put(url).then((resp) => {
            if (resp.data.success) {
                console.log('Request State Updated to Paid')
                commit('updateRequest', resp.data.payload)
            }
        })
    },
    updateRequestDate(_, data) {
        var url = process.env.VUE_APP_BASEURL + '/Mn/Request/' + data.reqId;
        axios.put(url, data.data)
    },
    getRequestOne({ state, commit }, reqId) {

        var reqOne = state.mnRequests.find(item => item._id === reqId)
        commit('mnRequestOne', reqOne)

    },
    socket_requestApplied({ commit },data) {
        console.log('request applied')
        commit('updateRequest',data)
    },
    socket_sessionCreated({ commit },data) {
        console.log('Session Created')
        commit('updateRequest',data)
    },
    socket_meetScheduled({ commit },data) {
        console.log('meet scheduled')
        commit('updateRequest',data)
    }



}

const mutations = {
    mnRequests: (state, mnRequests) => (state.mnRequests = mnRequests),
    mnRequestOne: (state, mnRequestOne) => (state.mnRequestOne = mnRequestOne),
    addRequest: (state, addedRequest) => (state.mnRequests.push(addedRequest)),
    updateRequest(state, updatedRequest){
        var reqIndex=state.mnRequests.findIndex(el => el._id === updatedRequest._id);
        Vue.set(state.mnRequests, reqIndex, updatedRequest); 
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}