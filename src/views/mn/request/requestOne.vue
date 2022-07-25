<template>
  <b-container>
    <b-tabs content-class="mt-3" class="my-3">
      <b-tab title="meetings" active>
        <h4>meetings list</h4>
        <div v-for="item in requestOne.ReqMeets" v-bind:key="item._id">
          <router-link
            v-if="item.MeetDate"
            :to="{ name: 'userMeetPrepare', params: { meetId: item._id } }"
            >meet {{ item.MeetId }}</router-link
          >
          <div v-else>meet {{ item.MeetId }}</div>
        </div>
      </b-tab>
      <b-tab title="request Dates">
        <calander
          :dates="requestOne.ReqDates"
          v-if="!loading"
          :at="'requestOne'"
        ></calander>
      </b-tab>
    </b-tabs>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import calander from "../../../components/widget/calander.vue";
export default {
  components: {
    calander,
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapGetters(["requests", "requestOne"]),
    classNames() {
      return {
        tabLoading: "loading-div",
      };
    },
    requestsCount() {
      return this.requests.length;
    },
  },
  watch: {
    requestsCount(newVal) {
      if (newVal > 0) {
        this.getRequestOne(this.$route.params.requestOne).then(() => {
          this.loading = false;
        });
      }
    },
  },
  methods: {
    ...mapActions(["getRequestOne"]),
  },
  mounted() {
    if (this.requestsCount > 0) {
      this.getRequestOne(this.$route.params.requestOne).then(() => {
        this.loading = false;
      });
    }
  },
};
</script>

<style>
</style>