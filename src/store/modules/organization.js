import axios from "axios"; 



const state = {
   organizations:[]
}

const getters = {
    organizations:state=>state.organizations,

}

const actions = {


    SaveOrg({commit},data){

        //console.log('form',data)
        var url = process.env.VUE_APP_BASEURL + '/Org/';
        axios.post(url,data).then(resp=>{
            if(resp.data.status){
                console.log('Organization Saved')
                commit('organizations',resp.data.items.list)
            }
        })

    }


}


const mutations = {
    organizations:(state,organizations)=>(state.organizations = organizations),

}


export default {
    state,
    getters,
    actions,
    mutations
  }
