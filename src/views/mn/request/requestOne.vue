<template>
  <b-container>
    <b-tabs content-class="mt-3" class="my-3">
      <b-tab title="meetings" active>
        <h4>meetings list</h4>
        
        <div >
          <router-link
            :to="{ name: 'userMeetPrepare', params: { meetId: item._id } }"
            v-for="item in requestOne.ReqMeets"
            v-bind:key="item._id"
            >meet {{ item.MeetId }}</router-link
          >
        </div>
      </b-tab>
    </b-tabs>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["requests", "requestOne"]),
    classNames() {
      return {
        tabLoading: "loading-div",
      };
    },
  },

  methods: {
    ...mapActions(["getRequestOne"]),
  },

  mounted() {
    this.getRequestOne(this.$route.params.requestOne)
  },
};
</script>

<style>
</style>