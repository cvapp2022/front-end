import axios from 'axios';

const state = {
    reffrences:[]
}

const getters = {

    reffrences:state=>state.reffrences

}

const actions = {

    SaveReff({commit},data){

        var url = process.env.VUE_APP_BASEURL + '/Reff/';
        axios.post(url,data).then(resp=>{
            if(resp.data.status){
                console.log('Reffrence Saved')
                commit('reffrences',resp.data.items.list)
            }
        })

    }


}

const mutations = {

    reffrences:(state,reffrences)=>(state.reffrences=reffrences)

}


export default {
    state,
    getters,
    actions,
    mutations
}