import axios from 'axios';

const state = {
    reffrences:[]
}

const getters = {

    reffrences:state=>state.reffrences

}

const actions = {

    saveReff({commit},data){

        var url = process.env.VUE_APP_BASEURL + '/Reff/';
        axios.post(url,data).then(resp=>{
            if(resp.data.status){
                console.log('Reffrence Saved')
                commit('reffrences',resp.data.items.list)
            }
        })

    },
    
    updateReff(_,data){

        var url = process.env.VUE_APP_BASEURL + '/Reff/'+data.RefId;
        axios.put(url,data.data).then(resp=>{
            if(resp.data.success){
                console.log('Reffrence Updated')
                
            }
        })

    },
    deleteRef({commit},refid){

        var url = process.env.VUE_APP_BASEURL + '/Reff/'+refid;

        axios.delete(url).then(resp=>{
            if(resp.data.success){
                commit('reffrences',resp.data.payload.list)
                console.log('reffrence Deleted')
                
            }
        })

    },
    changeReff(_,data){

        var arr=[];
        //get new sort
        data.list.forEach((item,index) => {
            arr.push({id:item._id,sort:index})
        });

        var newData ={
            items:arr,
            CvId:data.CvId
        }

    

        var url = process.env.VUE_APP_BASEURL + '/Reff/changeSort';

        axios.post(url,newData).then(resp=>{
            if(resp.data.success){
                //commit('awards',resp.data.payload.list)
                console.log('project Sort Updated')
                
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