import axios from "axios"; 
const state = {
    contacts:[]
}

const getters = {
    contacts:state=>state.contacts

}

const actions = {

    updateSocial(_,data){

        var url = process.env.VUE_APP_BASEURL + '/Contact/';
        console.log(data)
        axios.put(url,data).then(resp=>{
            if(resp.data.success){
                console.log('Contact Updated')
                
            }
        })

    }

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