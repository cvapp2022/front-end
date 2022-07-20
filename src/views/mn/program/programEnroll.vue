<template>
  <div class="">
    <h4>ProgramOne d</h4>
    <b-button @click="enroll()" variant="primary">enroll</b-button>
    <div class="">
      <vue-meeting-selector
        class="simple-example__meeting-selector"
        v-model="meeting"
        :date="date"
        :loading="loading"
        :class-names="classNames"
        :meetings-days="meetingsDays"
        @next-date="nextDate"
        @previous-date="previousDate"
        :multi="true"
        :calendarOptions="{
          limit: '12',
          //daysLabel:['السبت ','الاحد',' الاثنين'],
        }"
      >
        <template #button-up>
          <span></span>
        </template>
        <template #button-down>
          <span></span>
        </template>
      </vue-meeting-selector>
      <p>meeting Selected: {{ meeting ? meeting : "No Meeting selected" }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import VueMeetingSelector from "vue-meeting-selector";
import slotsGenerator from "../../../helpers/slotsGenerator";

export default {
  components: {
    VueMeetingSelector,
  },
  data() {
    return {
      date: new Date(),
      meetingsDays: [],
      usedDates: [],
      meeting: [],
      loading: true,
      nbDaysToDisplay: 6,
    };
  },
  methods: {
    ...mapActions(["getProgramOne", "saveRequest"]),
    enroll: function () {
      var data = {
        requestProgramIdI: this.programOne._id,
        requestDatesI: this.meeting,
        requestTypeI: "paid",
      };
      this.saveRequest(data);
    },
    async getNewDates(date) {
      var usedDatesArr=[]
      if (this.requests.length > 0) {
        this.requests.forEach((request) => {
          if (request.ReqState === "applied" && request.ReqMeets.length > 0) {
            request.ReqMeets.forEach((meet) => {
              if (meet.MeetDate) {
                usedDatesArr.push(new Date(meet.MeetDate).getTime());
              }
            });
          }
        });
      }
      const start = {
        hours: 14,
        minutes: 0,
      };
      const end = {
        hours: 20,
        minutes: 0,
      };
      this.date = date;
      var generatedSlots = slotsGenerator(
        date,
        this.nbDaysToDisplay,
        start,
        end,
        30,
        0,
        usedDatesArr
      );

      return generatedSlots;
    },
    // @click on button-right
    async nextDate() {
      // display loading
      this.loading = true;
      const date = new Date(this.date);
      date.setDate(date.getDate() + 7);
      // get meetings with async function
      this.meetingsDays = await this.getNewDates(date);
      // hide loading
      this.loading = false;
    },
    // @click on button-left
    async previousDate() {
      // display loading
      this.loading = true;
      const date = new Date(this.date);
      date.setDate(date.getDate() - 7);
      this.meetingsDays = await this.getNewDates(date);
      // hide loading
      this.loading = false;
    },
  },
  async created() {
    // get meetings
    this.meetingsDays = await this.getNewDates(this.date);
    // hide loading
    this.loading = false;
  },
  computed: {
    ...mapGetters(["programOne", "requests"]),
    classNames() {
      return {
        tabLoading: "loading-div",
      };
    },
  },
  mounted() {
    //get used dates
    this.getProgramOne(this.$route.params.progOne);
  },
};
</script>

<style scoped lang="scss">
.simple-example {
  margin-top: 3em;
  &__meeting-selector {
    max-width: 50%;
  }
}
// since our scss is scoped we need to use ::v-deep
::v-deep .loading-div {
  top: 58px !important;
}
</style>