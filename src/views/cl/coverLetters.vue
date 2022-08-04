<template>
  <b-container>
    <b-row class="my-4">
      <div class="page_title">
        <h2 class="font-weight-bolder" >{{$t('coverLettersTitle')}}</h2>
        <p class="text-muted">{{$t('coverLettersDesc')}}</p>
      </div>
    </b-row>
    <b-row class="my-4">
      <b-col sm="4" v-for="item in cl" v-bind:key="item._id">
        <div class="d-flex">
          <div class="border rounded">
            <img src="@/assets/images/document.jpg" />
          </div>
          <div class="d-flex flex-column align-items-start mx-4 mt-2">
            <router-link :to ="{name:'clOne',params:{clId:item._id}}">
              <h5>item title</h5>
            </router-link>
            <router-link class="btn btn-link" :to ="{name:'clOne',params:{clId:item._id}}">
              <h5>{{$t("Edit")}}</h5>
            </router-link>
            <a class="btn btn-link" target="_blank" :href="$baseUrl+'/Cl/'+item._id +'/render'">{{$t("Preview")}}</a>
            <b-button variant="link" @click="deleteClBtn(item._id)">
              {{$t("Delete")}}
            </b-button>
          </div>
        </div>
      </b-col>
      <b-col sm="4">
        <div class="d-flex" @click="createClBtn()" style="cursor:pointer" >
          <div class="border">
            <img src="@/assets/images/document.jpg" />
          </div>
          <div class="mx-2 mt-2">
            <h4 class="text-muted" >{{$t("newCoverLettter")}}</h4>
            <p class="text-muted">{{$t("newCoverLetterDesc")}}</p>
          </div>
        </div>
      </b-col>
      <!-- <div class="docItem">
        <div class="d-flex-column">
          <img src="@/assets/images/document.jpg" />
          <div class="">
            <b-button variant="primary" @click="createClBtn()"
              >Create Cl
            </b-button>
          </div>
        </div>
      </div> -->
      <!-- <div class="docItem" >
        <div class="d-flex">
          <img src="@/assets/images/document.jpg" />
          <div class="d-flex flex-column mx-2">
            <b-button variant="danger" @click="deleteClBtn(item._id)">
              Delete
            </b-button>
          </div>
        </div>
      </div> -->
    </b-row>
  </b-container>
</template>

<script>

import { mapActions, mapGetters } from "vuex";
export default {
  methods:{
    ...mapActions([
      "createCl",
      "deleteCl"
    ]),
    createClBtn() {
      this.createCl();
    },
    deleteClBtn(clId){
      this.deleteCl(clId)
    }
  },
  computed: {
    ...mapGetters(["cl"]),
  },
}
</script>

<style>

</style>