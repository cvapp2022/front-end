import axios from "axios"; 



const state = {
    educations:[]
}

const getters = {

    educations:state=>state.educations
}

const actions = {

    saveEdu({commit},data){

        var url = process.env.VUE_APP_BASEURL + '/Edu/';
        axios.post(url,data).then(resp=>{
            if(resp.data.status){
                console.log('Education Saved')
                commit('educations',resp.data.items.list)
            }
        })

    },
    updateEdu(_,data){

        var url = process.env.VUE_APP_BASEURL + '/Edu/'+data.EduId;
        console.log(data.data)
        axios.put(url,data.data).then(resp=>{
            if(resp.data.success){
                console.log('Education Updated')
                
            }
        })
    },
    deleteEdu({commit},eduid){

        var url = process.env.VUE_APP_BASEURL + '/Edu/'+eduid;

        axios.delete(url).then(resp=>{
            if(resp.data.success){
                commit('educations',resp.data.payload.list)
                console.log('Eduerience Deleted')
                
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