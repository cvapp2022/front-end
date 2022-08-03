<template>
  <b-container>
    <b-row class="my-4">
      <div class="page_title">
        <h2 class="font-weight-bolder" >{{$t("programsTitle")}}</h2>
        <p class="text-muted">{{$t("programsDesc")}}</p>
      </div>
    </b-row>
    <b-row class="my-4">
      <b-col sm="3" v-for="item in programs" v-bind:key="item._id" class="my-2" >
        <program :program="item" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import program from '../../../components/items/mn/program.vue'
import {mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["programs"]),
  },
  components:{
    program
  }
  
}
</script>

<style>

</style>