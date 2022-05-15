import axios from "axios";


const state = {
    projects:[]
}

const getters = {
    projects:state=>state.projects

}

const actions = {

    saveProj({commit},data){

        var url = process.env.VUE_APP_BASEURL + '/Proj/';
        axios.post(url,data).then(resp=>{
            if(resp.data.status){
                console.log('project Saved')
                commit('projects',resp.data.items.list)
            }
        })
    },
    updateProj(_,data){

        
        var url = process.env.VUE_APP_BASEURL + '/Proj/'+data.ProjId;
        axios.put(url,data.data).then(resp=>{
            if(resp.data.success){
                console.log('project Updated')
                
            }
        })
    },
    deleteProj({commit},projid){

        var url = process.env.VUE_APP_BASEURL + '/Proj/'+projid;

        axios.delete(url).then(resp=>{
            if(resp.data.success){
                commit('projects',resp.data.payload.list)
                console.log('project Deleted')
                
            }
        })

    }

}

const mutations = {

    projects:(state,projects)=>(state.projects = projects)

}


export default {
    state,
    getters,
    actions,
    mutations
}