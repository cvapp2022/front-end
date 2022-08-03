import axios from "axios";


const state = {
    cv: [],
    cl: [],
    cvOne: {},
    clOne: {}
}

const getters = {
    cv: state => state.cv,
    cl: state => state.cl,
    cvOne: state => state.cvOne,
    clOne: state => state.clOne
}

const actions = {


    getProfile({ commit }) {


        var url = process.env.VUE_APP_BASEURL + '/User/';
        axios.get(url).then(resp => {

            if (resp.data.success) {
                commit('cv', resp.data.payload.CVUCvId)
                commit('cl', resp.data.payload.CVUClId)
                commit('User', resp.data.payload)
                commit('Notification',resp.data.payload.UserNotif)
                commit('requests', resp.data.payload.MNRequests)
            }
        })
    },

    createCv({ commit }) {
        var url = process.env.VUE_APP_BASEURL + '/Cv/';
        return axios.post(url, { CvNameI: 'untiteld' }).then(resp => {

            if (resp.data.success) {
                commit('cv', resp.data.payload.list)
                return resp.data.payload.item._id;
            }
        })

    },

    async updateCV(_,data){


        var url = process.env.VUE_APP_BASEURL + '/Cv/'+data.cvId;

        return  axios.put(url,data.data).then(resp=>{
            if(resp.data.success){
                //commit('profile',resp.data.payload.list)
                console.log('Cv Updated')
                return resp.data.payload
            }
        })

    },

    deleteCv({ commit }, cvId) {

        var url = process.env.VUE_APP_BASEURL + '/Cv/' + cvId;
        axios.delete(url).then(resp => {

            if (resp.data.success) {

                commit('cv', resp.data.payload.list)
            }

        })

    },
    getCvOne({ commit }, cvid) {


        var url = process.env.VUE_APP_BASEURL + '/Cv/' + cvid;
        axios.get(url).then(resp => {


            if (resp.data.success) {

                var data = resp.data.payload;
                console.log(data)
                var cvObj = {
                    cvName: data.CVName,
                    cvFullName:data.CVFullName,
                    cvProfile:data.CVProfile,
                    cvAddress:data.CVAddress,
                    cvPosition:data.CVPosition,
                    cvId: data._id,
                    cvImg: data.CVImg,
                    cvSections: data.CvSections
                }

                commit('cvOne', cvObj)
                commit('experiances', data.CVExp)
                commit('educations', data.CVEdu)
                commit('reffrences', data.CVReff)
                commit('contacts', data.CVContact)
                commit('projects', data.CVProj)
                commit('organizations', data.CVOrg)
                commit('awards', data.CVAw)
                commit('skills', data.CVSkill)
                //router.push({name:'cvOne'})
            }
        })

    },

    setCvTemplate(_,data){
        console.log(data)
        var url = process.env.VUE_APP_BASEURL + '/Cv/' + data.cvId+'/setTemplate';
        axios.put(url,{TemplateIdI:data.templateId})
    },
    getClOne({ commit }, clid) {
        var url = process.env.VUE_APP_BASEURL + '/Cl/' + clid;
        axios.get(url).then(resp => {
            if (resp.data.success) {
                console.log('ClOne Fetched')
                commit('clOne', resp.data.payload)

                //router.push({ name: 'clOne' })
            }
        })

    },
    createCl({ commit }) {

        var url = process.env.VUE_APP_BASEURL + '/Cl/';
        axios.post(url, { ClNameI: 'untiteld' }).then((resp) => {
            console.log('activated')
            if (resp.data.success) {
                commit('cl', resp.data.payload.list)
            }
        })
    },
    deleteCl({ commit }, clId) {
        var url = process.env.VUE_APP_BASEURL + '/Cl/' + clId;
        axios.delete(url).then(resp => {

            if (resp.data.success) {

                commit('cl', resp.data.payload.list)
            }

        })
    },
    updateCl({ commit }, data) {
        var url = process.env.VUE_APP_BASEURL + '/Cl/' + data.clid;
        axios.put(url, data.data).then(resp => {
            if (resp.data.success) {
                console.log('ClOne Updated')
                commit('clOne', resp.data.payload)

                //router.push({name:'clOne'})
            }
        })
    },
    setClTemplate(_,data){
        var url = process.env.VUE_APP_BASEURL + '/Cl/' + data.clId+'/setTemplate';
        axios.put(url,{TemplateIdI:data.templateId})
    },
    changeSectionSort(_, data) {
        var url = process.env.VUE_APP_BASEURL + '/CV/' + data.cvId + '/changeSort';
        axios.put(url, { SortI: data.newSort })

    },
    addSection({ commit }, data) {

        var url = process.env.VUE_APP_BASEURL + '/CV/' + data.cvId + '/addSection';
        axios.put(url, { SectionNameI: data.section }).then(function (resp) {
            if (resp.data.success) {
                var cvOne = {
                    cvId: resp.data.payload._id,
                    cvImg: resp.data.payload.CVImg,
                    cvName: resp.data.payload.CVName,
                    cvSections: resp.data.payload.CvSections
                }
                commit('cvOne', cvOne)
            }
        })
    },
    removeSection({ commit }, data) {

        var url = process.env.VUE_APP_BASEURL + '/CV/' + data.cvId + '/removeSection';
        axios.put(url, { SectionNameI: data.section }).then(function (resp) {
            if (resp.data.success) {
                var cvOne = {
                    cvId: resp.data.payload._id,
                    cvImg: resp.data.payload.CVImg,
                    cvName: resp.data.payload.CVName,
                    cvSections: resp.data.payload.CvSections
                }
                commit('cvOne', cvOne)
            }
        })
    }



}

const mutations = {

    cv: (state, cv) => (state.cv = cv),
    cl: (state, cl) => (state.cl = cl),
    cvOne: (state, cvOne) => (state.cvOne = cvOne),
    clOne: (state, clOne) => (state.clOne = clOne)

}


export default {
    state,
    getters,
    actions,
    mutations
}