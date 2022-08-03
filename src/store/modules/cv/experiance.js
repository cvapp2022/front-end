import axios from "axios"; 



const state = {
   experiances:[]
}

const getters = {
    experiances:state=>state.experiances,

}

const actions = {


    async saveExp({commit},data){

        //console.log('form',data)
        var url = process.env.VUE_APP_BASEURL + '/Cv/Exp/';
        return axios.post(url, data).then((resp)=>{
            if (resp.data.success) {
                commit('experiances', resp.data.payload.list);
                return resp.data.payload.item;
            }
        });
    },

    updateExp(_,data){

        var url = process.env.VUE_APP_BASEURL + '/Cv/Exp/'+data.ExpId;
        console.log(data.data)
        axios.put(url,data.data).then(resp=>{
            if(resp.data.success){
                console.log('Experience Updated')
                
            }
        })

    },

    deleteExp({commit},expid){

        var url = process.env.VUE_APP_BASEURL + '/Cv/Exp/'+expid;

        axios.delete(url).then(resp=>{
            if(resp.data.success){
                commit('experiances',resp.data.payload.list)
                console.log('Experience Deleted')
                
            }
        })

    },


    changeExp(_,data){

        var arr=[];
        //get new sort
        data.list.forEach((item,index) => {
            arr.push({id:item._id,sort:index})
        });

        var newData ={
            items:arr,
            CvId:data.CvId
        }

    

        var url = process.env.VUE_APP_BASEURL + '/Cv/Exp/changeSort';

        axios.post(url,newData).then(resp=>{
            if(resp.data.success){
                //commit('awards',resp.data.payload.list)
                console.log('Exp Sort Updated')
                
            }
        })

    }


}


const mutations = {
    experiances:(state,experiances)=>(state.experiances = experiances),

}


export default {
    state,
    getters,
    actions,
    mutations
  }
