import axios from "axios"; 
const state = {
    contacts:[]
}

const getters = {
    contacts:state=>state.contacts

}

const actions = {

    updateSocial({commit},data){

        var url = process.env.VUE_APP_BASEURL + '/Cv/Contact/';
        console.log(data)
        axios.put(url,data).then(resp=>{
            if(resp.data.success){
               commit('updateContact',resp.data.payload)
                
            }
        })

    }

}

const mutations = {

    contacts:(state,contacts)=>(state.contacts = contacts),
    updateContact:(state,contact)=>{

        var contactIndex=state.contacts.findIndex(item=> item.CKey===contact.CKey )
        if(contactIndex >= 0){
            state.contacts[contactIndex]=contact;
        }
        else{
            state.contacts.push(contact)
        }

    }

}


export default {
    state,
    getters,
    actions,
    mutations
}