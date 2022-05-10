import axios from "axios";


const state = {
    projects:[]
}

const getters = {
    projects:state=>state.projects

}

const actions = {

    SaveProj({commit},data){

        var url = process.env.VUE_APP_BASEURL + '/Proj/';
        axios.post(url,data).then(resp=>{
            if(resp.data.status){
                console.log('project Saved')
                commit('projects',resp.data.items.list)
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