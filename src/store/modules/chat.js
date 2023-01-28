import axios from "axios"; 
const state = {
    chats:[],
    chatOne:{}
}

const getters = {
    chats:state=>state.chats,
    chatOne:state=>state.chatOne
}

const actions = { 
    setChatOne({commit},chat){

        commit('chatOne',chat)
    },
    saveMessage(_,data){
        var url = process.env.VUE_APP_BASEURL + '/Chat/Message/' + data.chatId;
        axios.post(url,data.data)
    }
}


const mutations = {

    chats:(state,chats)=>(state.chats = chats),
    chatOne:(state,chatOne)=>(state.chatOne=chatOne),
    saveChatMessage:(state,message)=>{
        var chatIndex=state.chats.findIndex(item=> item._id === message.ChMessageChat)
        state.chats[chatIndex].ChatMessages.push(message)
        
    }
    // addService:(state,addedService)=>(state.services.push(addedService))   
}


export default {
    state,
    getters,
    actions,
    mutations
}