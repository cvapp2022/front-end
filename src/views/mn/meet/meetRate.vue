<template>
  <b-container>
    <b-row>
      <b-card class="mx-auto my-4">
        <b-form>
          <b-form-group
            label="Radios using options"
            v-slot="{ ariaDescribedby }"
          >
            <b-form-radio-group
              id="radio-group-1"
              v-model="form.RateSelectionI"
              :options="options"
              :aria-describedby="ariaDescribedby"
              name="radio-options1"
            ></b-form-radio-group>
          </b-form-group>
          <b-form-group
            label="Radios using options"
            v-slot="{ ariaDescribedby }"
          >
            <b-form-radio-group
              id="radio-group-2"
              v-model="form.RateSelection2I"
              :options="options"
              :aria-describedby="ariaDescribedby"
              name="radio-options2"
            ></b-form-radio-group>
          </b-form-group>
          <b-form-group>
            <b-textarea v-model="form.RateDescI"> </b-textarea>
          </b-form-group>
          <b-form-group>
            <b-button variant="primary" @click="saveRateBtn()">Submit</b-button>
          </b-form-group>
        </b-form>
      </b-card>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        RateSelectionI: null,
        RateSelection2I: null,
        RateDescI: "",
        RateMeetIdI: this.$route.params.meetId,
      },
      options: [
        { text: "Toggle this custom radio", value: 1 },
        { text: "Or toggle this other custom radio", value: 2 },
        { text: "This one is Disabled", value: 3 },
        { text: "This is the 4th radio", value: 4 },
      ],
    };
  },
  methods: {
    ...mapActions(["saveRate"]),
    saveRateBtn() {
      this.saveRate(this.form).then(()=>{
        this.$router.push({name:'requests'})
      });
    },
  },
};
</script>

<style>
</style>