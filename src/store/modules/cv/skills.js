import axios from "axios"; 

const state = {
    skills:{}
}

const getters = {
    skills:state=>state.skills,

}

const actions = {

    async SaveSkill({commit},data){

        var url = process.env.VUE_APP_BASEURL + '/Cv/Skill/';
        return axios.post(url,data).then(resp=>{

            if(resp.data.success){
                commit('skills',resp.data.payload.list)
                return resp.data.payload
            }

        })
    },
    DeleteSkill({commit},skId){

        var url = process.env.VUE_APP_BASEURL + '/Cv/skill/'+skId;
        axios.delete(url).then(resp=>{

            if(resp.data.status){


                commit('skills',resp.data.items.list)
            }
            
        })

    },
    PushSkill({dispatch},obj){

        console.log(obj)
        if(obj){

            var url = process.env.VUE_APP_BASEURL + '/Cv/skill/push';
            axios.post(url,obj).then((resp)=>{

                if(resp.data.status){

                    //display success message 

                    //update cv
                    dispatch('GetCv')
                }
            })

        }
    },
    PullSkill({dispatch},obj){
        
        var url = process.env.VUE_APP_BASEURL + '/Cv/skill/pull';
        axios.post(url,obj).then((resp)=>{

            if(resp.data.status){

                //display success message 

                //update cv
                dispatch('GetCv')
            }
        })

    }
    

}

const mutations = {

    skills:(state,skills)=>(state.skills = skills),

}


export default {
    state,
    getters,
    actions,
    mutations
}