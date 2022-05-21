import axios from "axios"; 



const state = {
   organizations:[]
}

const getters = {
    organizations:state=>state.organizations,

}

const actions = {


    saveOrg({commit},data){

        //console.log('form',data)
        var url = process.env.VUE_APP_BASEURL + '/Org/';
        axios.post(url,data).then(resp=>{
            if(resp.data.status){
                console.log('Organization Saved')
                commit('organizations',resp.data.items.list)
            }
        })

    },

    updateOrg(_,data){
        var url = process.env.VUE_APP_BASEURL + '/Org/'+data.OrgId;
        axios.put(url,data.data).then(resp=>{
            if(resp.data.success){
                console.log('Organization Updated')
                
            }
        })
    },
    deleteOrg({commit},orgid){

        var url = process.env.VUE_APP_BASEURL + '/Org/'+orgid;

        axios.delete(url).then(resp=>{
            if(resp.data.success){
                commit('organizations',resp.data.payload.list)
                console.log('organization Deleted')
                
            }
        })

    },
    changeOrg(_,data){
      
        var arr=[];
        //get new sort
        data.list.forEach((item,index) => {
            arr.push({id:item._id,sort:index})
        });

        var newData ={
            items:arr,
            CvId:data.CvId
        }
        console.log(newData)

     

        var url = process.env.VUE_APP_BASEURL + '/Org/changeSort';

        axios.post(url,newData).then(resp=>{
            if(resp.data.success){
                //commit('awards',resp.data.payload.list)
                console.log('Org Sort Updated')
                
            }
        })

    }


}


const mutations = {
    organizations:(state,organizations)=>(state.organizations = organizations),

}


export default {
    state,
    getters,
    actions,
    mutations
  }
