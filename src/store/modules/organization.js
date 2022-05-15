import axios from "axios"; 



const state = {
   organizations:[]
}

const getters = {
    organizations:state=>state.organizations,

}

const actions = {


    saveOrg({commit},data){

        //console.log('form',data)
        var url = process.env.VUE_APP_BASEURL + '/Org/';
        axios.post(url,data).then(resp=>{
            if(resp.data.status){
                console.log('Organization Saved')
                commit('organizations',resp.data.items.list)
            }
        })

    },

    updateOrg(_,data){
        var url = process.env.VUE_APP_BASEURL + '/Org/'+data.OrgId;
        axios.put(url,data.data).then(resp=>{
            if(resp.data.success){
                console.log('Organization Updated')
                
            }
        })
    },
    deleteOrg({commit},orgid){

        var url = process.env.VUE_APP_BASEURL + '/Org/'+orgid;

        axios.delete(url).then(resp=>{
            if(resp.data.success){
                commit('organizations',resp.data.payload.list)
                console.log('organization Deleted')
                
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
