import axios from "axios";
import router from "../../router";

const state = {
    cv:[],
    cl:[],
    cvOne:{},
    clOne:{}
}

const getters = {
    cv:state=>state.cv,
    cl:state=>state.cl,
    cvOne:state=>state.cvOne,
    clOne:state=>state.clOne
}

const actions = {


    getProfile({commit}){


        var url = process.env.VUE_APP_BASEURL + '/User/';
        axios.get(url).then(resp=>{


            if(resp.data.success){
                commit('cv',resp.data.payload.CVUCvId)
                commit('cl',resp.data.payload.CVUClId)
            }
        })



    },


    getCvOne({commit},cvid){
        var url = process.env.VUE_APP_BASEURL + '/Cv/'+cvid;
        axios.get(url).then(resp=>{


            if(resp.data.success){

                var data = resp.data.payload;

                var cvObj={
                    cvName:data.CVName,
                    cvId:data._id,
                    cvImg:data.CVImg
                }

                commit('cvOne',cvObj)
                commit('experiances',data.CVExp)
                commit('educations',data.CVEdu)
                commit('reffrences',data.CVReff)
                commit('contacts',data.CVContact)
                commit('projects',data.CVProj)
                commit('organizations',data.CVOrg)
                commit('awards',data.CVAw)
                commit('skills',data.CVSkill)
                
                
                router.push({name:'cvOne'})


            }
        })

    },




    getClOne({commit},clid){
        var url = process.env.VUE_APP_BASEURL + '/Cl/'+clid;
        axios.get(url).then(resp=>{
            if(resp.data.success){
                console.log('ClOne Fetched')
                commit('clOne',resp.data.payload)
                
                router.push({name:'clOne'})
            }
        })

    },

    updateCl({commit},data){
        var url = process.env.VUE_APP_BASEURL + '/Cl/'+data.clid;
        axios.put(url,data.data).then(resp=>{
            if(resp.data.success){
                console.log('ClOne Updated')
                commit('clOne',resp.data.payload)
                
                //router.push({name:'clOne'})
            }
        })

    }



}

const mutations = {

    cv:(state,cv)=>(state.cv = cv),
    cl:(state,cl)=>(state.cl = cl),
    cvOne:(state,cvOne)=>(state.cvOne = cvOne),
    clOne:(state,clOne)=>(state.clOne = clOne)

}


export default {
    state,
    getters,
    actions,
    mutations
}