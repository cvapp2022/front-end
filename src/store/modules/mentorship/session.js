import axios from "axios";

const state = {
    Session: {},
}


const getters = {
    Session: state => state.Session
}


const actions = {

    saveSession({ commit }, data) {

        //get mentor data 
        var url = process.env.VUE_APP_BASEURL + '/Mn/session';
        axios.post(url, data).then((resp) => {

            if (resp.data.success) {
                commit('Session', resp.data.payload);
            }

        })

    },
    getSession({ getters, commit }, meetId) {

        console.log('Reqmeets is ', getters.requestOne.ReqMeets)
        var meetOne = getters.requestOne.ReqMeets.find(item => item._id === meetId)

        //get last session and check status
        var SessionCount = meetOne.MeetSession.length;
        if (SessionCount > 0) {
            var Session = meetOne.MeetSession[SessionCount - 1]
            if (Session) {
                commit('Session', Session)
            }
        }
    },
    clearSession({ commit }) {
        commit('ClearSession')
    },
    async saveRate(_, data) {
        console.log(data)
        var url = process.env.VUE_APP_BASEURL + '/Mn/Rate/';
        const resp = await axios.post(url, data);
        if (resp.data.success) {
            return resp.data.payload;
        }
    }

}

const mutations = {
    Session: (state, Session) => (state.Session = Session),
    ClearSession: (state) => { state.Session = {} },
    SOCKET_MN_SESSION_MESSAGE_SENT(state, message) {
        state.Session.SessionMessage.push(message)
    },
    SOCKET_FILE_UPLOADED(state, data) {
        console.log("file uploaded", data);
        state.Session.SessionAttachments = data
    }
}



export default {
    state,
    getters,
    actions,
    mutations
}