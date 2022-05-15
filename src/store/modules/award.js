import axios from "axios";


const state = {
    awards:[]
}

const getters = {
    awards:state=>state.awards

}

const actions = {

    saveAw({commit},data){

        var url = process.env.VUE_APP_BASEURL + '/Aw/';
        axios.post(url,data).then(resp=>{
            if(resp.data.status){
                console.log('award Saved')
                commit('awards',resp.data.items.list)
            }
        })
    },
    updateAw(_,data){
        var url = process.env.VUE_APP_BASEURL + '/Aw/'+data.AwId ;
        axios.put(url,data.data).then(resp=>{
            if(resp.data.success){
                console.log('award Updated')
                //commit('awards',resp.data.items.list)
            }
        })
    },
    deleteAw({commit},awid){

        var url = process.env.VUE_APP_BASEURL + '/Aw/'+awid;

        axios.delete(url).then(resp=>{
            if(resp.data.success){
                commit('awards',resp.data.payload.list)
                console.log('Award Deleted')
                
            }
        })

    },

    changeAw(_,data){

        var arr=[];
        //get new sort
        data.list.forEach((item,index) => {
            arr.push({id:item._id,sort:index})
        });

        var newData ={
            items:arr,
            CvId:data.CvId
        }

        var url = process.env.VUE_APP_BASEURL + '/Aw/changeSort';

        axios.post(url,newData).then(resp=>{
            if(resp.data.success){
                //commit('awards',resp.data.payload.list)
                console.log('Award Sort Updated')
                
            }
        })

    }
    

}



const mutations = {

    awards:(state,awards)=>(state.awards = awards)

}


export default {
    state,
    getters,
    actions,
    mutations
}