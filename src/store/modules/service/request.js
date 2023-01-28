import axios from "axios";
import _ from 'lodash'

const state = {
    servRequests: [],
    servReqOne: {}
}


const getters = {
    servRequests: state => state.servRequests,
    servReqOne: state => state.servReqOne
}


const actions = {

    getServRequests({ commit }) {

        //get mentor data 
        var url = process.env.VUE_APP_BASEURL + '/Service/Request/all/user';
        axios.get(url).then((resp) => {
            if (resp.data.success) {

                //push mentorship requests 
                commit('servRequests', resp.data.payload);
            }
        })

    },
    getServRequestOne({commit }, reqId) {

        var url = process.env.VUE_APP_BASEURL + '/Service/Request/'+reqId;
        return axios.get(url).then((resp) => {
            if (resp.data.success) {
                commit('servReqOne', resp.data.payload)
            }
        })
    },
    saveReqMessage(_,data){
        var url = process.env.VUE_APP_BASEURL + '/Service/Request/Message/' + data.reqId;
        axios.post(url,data.data)
    },


    socket_mentorAddedToService({ dispatch }) {
        //MENTOR_ADDED_TO_PROGRAM
        console.log('mentor addedd to service')
        dispatch('getServRequests')

    },
    socket_mentorRemovedFromService({ dispatch }) {
        console.log('mentor removed from service')
        dispatch('getServRequests')
    },
    socket_messageSent({commit},message){
        console.log('nessage',!_.isEmpty(state.servReqOne))
        if(!_.isEmpty(state.servReqOne))
            commit('servRequestMessageSent',message)
        commit('saveChatMessage',message)
    }


}

const mutations = {
    servRequestMessageSent:(state,message)=>{
        console.log('servReqMessageSEndt')
        state.servReqOne.ReqChat.ChatMessages.push(message)  
    },
    servRequests: (state, servRequests) => (state.servRequests = servRequests),
    servReqOne: (state, servReqOne) => (state.servReqOne = servReqOne),
    updateReqCv:(state,newCvList)=>(state.servReqOne.ReqCv=newCvList)
}



export default {
    state,
    getters,
    actions,
    mutations
}