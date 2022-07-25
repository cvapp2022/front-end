import axios from "axios";
import Vue from 'vue';
const state = {
    requests: [],
    requestOne: {}
}

const getters = {
    requests: state => state.requests,
    requestOne: state => state.requestOne
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

        var reqOne = state.requests.find(item => item._id === reqId)
        console.log(state.requests)
        commit('requestOne', reqOne)

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
    requests: (state, requests) => (state.requests = requests),
    requestOne: (state, requestOne) => (state.requestOne = requestOne),
    addRequest: (state, addedRequest) => (state.requests.push(addedRequest)),
    updateRequest(state, updatedRequest){
        var reqIndex=state.requests.findIndex(el => el._id === updatedRequest._id);
        Vue.set(state.requests, reqIndex, updatedRequest); 
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}