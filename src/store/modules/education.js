import axios from "axios"; 



const state = {
    educations:[]
}

const getters = {

    educations:state=>state.educations
}

const actions = {

    SaveEdu({commit},data){

        var url = process.env.VUE_APP_BASEURL + '/Edu/';
        axios.post(url,data).then(resp=>{
            if(resp.data.status){
                console.log('Education Saved')
                commit('educations',resp.data.items.list)
            }
        })

        

    }


}

const mutations = {

    educations:(state,educations)=>(state.educations=educations)

}


export default {
    state,
    getters,
    actions,
    mutations
}