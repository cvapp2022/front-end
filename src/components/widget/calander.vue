<template>
  <div>
    <vue-meeting-selector
      class="simple-example__meeting-selector"
      v-model="meeting"
      :date="date"
      :loading="loading"
      :class-names="classNames"
      :meetings-days="meetingsDays"
      @next-date="nextDate"
      @meeting-slot-selected="slotSelected"
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
</template>

<script>
import VueMeetingSelector from "vue-meeting-selector";
import slotsGenerator from "../../helpers/slotsGenerator";
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";
export default {
  props: ["dates", "at"],
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
      updateable: false,
    };
  },
  methods: {
    ...mapActions(["updateRequestDate"]),
    slotSelected(){
      this.$emit('dates-updated',this.meeting)
    },
    async getNewDates(date) {
      var usedDatesArr = [];
      if (this.mnRequests.length > 0) {
        this.mnRequests.forEach((request) => {
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
    if(this.at === "requestOne"){
      this.meeting = this.dates;
    }
  },
  computed: {
    ...mapGetters(["mnRequests"]),
    classNames() {
      return {
        tabLoading: "loading-div",
      };
    },
  },
  watch: {
    meeting: _.debounce(function (newVal) {
      if (this.at === "requestOne" && !_.isEmpty( this.dates) && newVal.length !== this.dates.length) {
        var body = {
          data: {
            DatesI: this.meeting,
          },
          reqId: this.$route.params.requestOne,
        };
        console.log("debounce triggerd");
        this.updateRequestDate(body);
      }
    }, 3000),
  },
};
</script>
<style scoped lang="scss">
.simple-example {
  margin-top: 3em;
  // &__meeting-selector {
  //   max-width: 50%;
  // }
}
// since our scss is scoped we need to use ::v-deep
::v-deep .loading-div {
  top: 58px !important;
}
</style>