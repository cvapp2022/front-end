<template>
  <b-container>
  <b-row class="my-4">
    <div class="page_title">
      <h2 class="font-weight-bolder" >Your Resumes</h2>
      <p class="text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore sapiente inventore autem, suscipit obcaecati ex laboriosam et</p>
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
            <h5>edit</h5>
          </router-link>
          <a class="btn btn-link" target="_blank" :href="'http://127.0.0.1:5000/api/v1/Cv/'+item._id +'/render'">Preview</a>
          <b-button variant="link" @click="deleteCvBtn(item._id)">
            Delete
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
          <h4 class="text-muted" >New Resume</h4>
          <p class="text-muted">Create a tailored resume for each job application. Double your chances of getting hired!</p>
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
        ]),
        createCvBtn() {
            this.createCv();
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