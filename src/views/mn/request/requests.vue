<template>
  <b-container>
    <b-row class="my-4">
      <div class="page_title">
        <h2 class="font-weight-bolder">{{$t("mentoringTitle")}}</h2>
        <p class="text-muted">{{$t('mentoringDesc')}}</p>
      </div>
    </b-row>
    <b-row class="my-4">
      <b-col sm="12" v-for="item in mnRequests" v-bind:key="item._id">
        <request :request="item" />
      </b-col>
    </b-row>
    <b-row class="justify-content-center">
      <router-link :to="{ name: 'programs' }" class="btn btn-primary">{{$t('enrollToAnotherProgram')}}</router-link>
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
    ...mapGetters(["mnRequests"]),
  },


};
</script>

<style>
</style>