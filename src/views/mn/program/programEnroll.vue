<template>
  <div class="">
    <h4>ProgramOne d</h4>
    <b-button @click="enroll()" variant="primary">enroll</b-button>
    <div class="">
      <calander
        :at="'programEnroll'"
        :dates="[]"
        @dates-updated="updateDate"
      ></calander>
      <p>meeting Selected: {{ meeting ? meeting : "No Meeting selected" }}</p>
    </div>
  </div>
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
        this.saveRequest(data);
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