<template>
  <b-container>
  <b-row class="my-4">
    <div class="page_title">
      <h2 class="font-weight-bolder" >{{$t('resumesTitle')}}</h2>
      <p class="text-muted">{{$t('resumesDesc')}}</p>
    </div>
  </b-row>
  <b-row class="my-4">
    <b-col sm="4" v-for="item in cv" v-bind:key="item._id">
      <div class="d-flex">
        <div class="border rounded">
          <img src="@/assets/images/document.jpg" />
        </div>
        <div class="d-flex flex-column align-items-start mx-4 mt-2">
          <router-link
            :to="{ name: 'cvOne', params: { cvId: item._id } }"
          >
            <h5>item title</h5>
          </router-link>
          <router-link 
            class="btn btn-link"
            :to="{ name: 'cvOne', params: { cvId: item._id } }"
          >
            <h5>{{$t('Edit')}}</h5>
          </router-link>
          <a class="btn btn-link" target="_blank" :href="$baseUrl+'/Cv/'+item._id +'/render'">{{$t("DownloadPdf")}}</a>
          <router-link class="btn btn-link" :to="{name:'cvPerview',params: { cvId: item._id } }" >{{$t("Preview")}}</router-link>
          <b-button variant="link" @click="deleteCvBtn(item._id)">
            {{$t('Delete')}}
          </b-button>
        </div>
      </div>
    </b-col>
    <b-col sm="4">
      <div class="d-flex" @click="createCvBtn()" style="cursor:pointer" >
        <div class="border">
          <img src="@/assets/images/document.jpg" />
        </div>
        <div class="mx-4 mt-2">
          <h4 class="text-muted" >{{$t("newResume")}}</h4>
          <p class="text-muted">{{$t("newResumeDesc")}}</p>
        </div>
      </div>
    </b-col>
</b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    methods:{
        ...mapActions([
            "createCv",
            "deleteCv",
            "getCvOne"
        ]),
        createCvBtn() {
            this.createCv().then((cvId)=>{
              if(this.cv.length === 1){
                this.getCvOne(cvId)
                this.$router.push({name:'cvStepInfo',params:{cvId}})
              }
            });
        },
        deleteCvBtn(cvId) {
            this.deleteCv(cvId);
        },
    },
      computed: {
        ...mapGetters(["cv"]),
  },
}
</script>

<style>

</style>