<template>
  <b-container>
    <b-row class="my-4">
      <div class="page_title">
        <h2 class="font-weight-bolder">Your Mentorships</h2>
        <p class="text-muted">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
          sapiente inventore autem, suscipit obcaecati ex laboriosam et
        </p>
      </div>
    </b-row>
    <b-row class="my-4">
      <b-col sm="12" v-for="item in requests" v-bind:key="item._id">
        <request :request="item" />
      </b-col>
    </b-row>
    <b-row class="justify-content-center">
      <router-link :to="{ name: 'programs' }" class="btn btn-primary"
        >Enroll to another programs</router-link
      >
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import request from '../../../components/items/mn/request.vue'

export default {
  components:{
    request
  },
  computed: {
    ...mapGetters(["requests"]),
  },


};
</script>

<style>
</style>