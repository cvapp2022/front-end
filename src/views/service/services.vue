<template>
  <b-container>
    <b-row class="my-4">
      <div class="page_title">
        <h2 class="font-weight-bolder" >{{$t("programsTitle")}}</h2>
        <p class="text-muted">{{$t("programsDesc")}}</p>
      </div>
    </b-row>
    <b-row class="my-4">
      <b-col sm="4" v-for="item in services" v-bind:key="item._id" class="my-2" >
        <service :service="item" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import service from '../../components/items/service.vue';
import {mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["services"]),
  },
  components:{
    service
  }
  
}
</script>

<style>

</style>