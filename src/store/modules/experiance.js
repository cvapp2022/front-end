import axios from "axios"; 



const state = {
   experiances:[]
}

const getters = {
    experiances:state=>state.experiances,

}

const actions = {


    SaveExp({commit},data){

        //console.log('form',data)
        var url = process.env.VUE_APP_BASEURL + '/Exp/';
        axios.post(url,data).then(resp=>{
            if(resp.data.status){
                console.log('Experiance Saved')
                commit('experiances',resp.data.items.list)
            }
        })

    }


}


const mutations = {
    experiances:(state,experiances)=>(state.experiances = experiances),

}


export default {
    state,
    getters,
    actions,
    mutations
  }
