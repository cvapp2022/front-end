import axios from "axios";


const state = {
    projects:[]
}

const getters = {
    projects:state=>state.projects

}

const actions = {

    saveProj({commit},data){

        var url = process.env.VUE_APP_BASEURL + '/Cv/Proj/';
        axios.post(url,data).then(resp=>{
            if(resp.data.success){
                console.log('project Saved')
                commit('projects',resp.data.payload.list)
            }
        })
    },
    updateProj(_,data){

        
        var url = process.env.VUE_APP_BASEURL + '/Cv/Proj/'+data.ProjId;
        axios.put(url,data.data).then(resp=>{
            if(resp.data.success){
                console.log('project Updated')
                
            }
        })
    },
    deleteProj({commit},projid){

        var url = process.env.VUE_APP_BASEURL + '/Cv/Proj/'+projid;

        axios.delete(url).then(resp=>{
            if(resp.data.success){
                commit('projects',resp.data.payload.list)
                console.log('project Deleted')
                
            }
        })

    },
    changeProj(_,data){

        var arr=[];
        //get new sort
        data.list.forEach((item,index) => {
            arr.push({id:item._id,sort:index})
        });

        var newData ={
            items:arr,
            CvId:data.CvId
        }

    

        var url = process.env.VUE_APP_BASEURL + '/Cv/Proj/changeSort';

        axios.post(url,newData).then(resp=>{
            if(resp.data.success){
                //commit('awards',resp.data.payload.list)
                console.log('project Sort Updated')
                
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