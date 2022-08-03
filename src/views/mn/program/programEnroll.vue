<template>
  <b-container>
    <b-row>
      <calander
        class="w-100"
        :at="'programEnroll'"
        :dates="[]"
        @dates-updated="updateDate"
      ></calander>
    </b-row>
    <b-row>
      <b-button @click="enroll()" variant="primary">enroll</b-button>
    </b-row>
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
      meeting: [],
    };
  },
  methods: {
    ...mapActions(["getProgramOne", "saveRequest"]),
    enroll: function () {
      if (this.meeting.length > this.programOne.ProgMeetsNum) {
        var data = {
          requestProgramIdI: this.programOne._id,
          requestDatesI: this.meeting,
          requestTypeI: "paid",
        };
        this.saveRequest(data).then(() => {
          this.$router.push({ name: "requests" });
          
        });
      }
    },
    updateDate(dates) {
      this.meeting = dates;
    },
  },

  computed: {
    ...mapGetters(["programOne", "requests"]),
  },
  mounted() {
    //get used dates
    this.getProgramOne(this.$route.params.progOne);
  },
};
</script>