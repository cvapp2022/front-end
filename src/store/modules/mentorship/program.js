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

    getPrograms({commit},data){

        console.log(this.app)
        var url = process.env.VUE_APP_BASEURL + '/mn/Program/'+data.lang;
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
    socket_programCreated({commit},data){
        commit('addProgram',data)
    }

}

const mutations = {

    programs:(state,programs)=>(state.programs = programs),
    programOne:(state,programOne)=>(state.programOne=programOne),
    addProgram:(state,addedProgram)=>(state.programs.push(addedProgram))
}


export default {
    state,
    getters,
    actions,
    mutations
}