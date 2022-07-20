import axios from "axios"; 
const state = {
    programs:[],
    programOne:{}
}

const getters = {
    programs:state=>state.programs,
    programOne:state=>state.programOne
}

const actions = {

    getPrograms({commit}){

        var url = process.env.VUE_APP_BASEURL + '/mn/Program/';
        axios.get(url).then(resp=>{
            if(resp.data.success){
                commit('programs',resp.data.payload)                
            }
        })

    },
    getProgramOne({state,commit},progId){

        //find program in program list 
        var progOne=state.programs.find(item=> item._id === progId )
        commit('programOne',progOne);

    },
    socket_programCreated({dispatch}){
        console.log('program created sockets')
        dispatch('getPrograms')
    }

}

const mutations = {

    programs:(state,programs)=>(state.programs = programs),
    programOne:(state,programOne)=>(state.programOne=programOne)
}


export default {
    state,
    getters,
    actions,
    mutations
}