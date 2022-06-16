<template>
  <b-container >
      <h4>meet prepare</h4>
      <router-link v-if="Session" :to="{ name:'userMeetRoom', params:{meetId:this.$route.params.meetId} }" >join </router-link>
  </b-container>
</template>

<script>

import { mapActions, mapGetters } from "vuex";
import router from "../../../router/index";
import _ from "lodash";
export default {


  methods:{
    ...mapActions(["getSession"]),
  },
    computed: {
    ...mapGetters(["requestOne", "Session"]),
  },
  mounted() {
    if (_.isEmpty(this.requestOne)) {
      router.push({ name: "profile" });
    } else {
      this.getSession(this.$route.params.meetId);
    }
  },
}
</script>

<style>

</style>