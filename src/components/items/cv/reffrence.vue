<template>
  <validation-observer ref="observer" v-slot="{ handleSubmit }">
    <b-form @submit.prevent="handleSubmit(SaveReffSubmit)" class="row">
      <!-- Reffrence name -->
      <b-col cols="12" sm="6">
        <validation-provider
          name="Reffrence full name "
          :rules="{ required: true }"
          v-slot="validationContext"
        >
          <b-form-group
            id="reff-name"
            label="Reffrence full name"
            label-for="reff-name-input"
          >
            <b-form-input
              id="reff-name-input"
              name="reff-name-input"
              v-model="ReffForm.RefNameI"
              :state="getValidationState(validationContext)"
              aria-describedby="reff-name-live-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="reff-name-live-feedback">{{
              validationContext.errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
      </b-col>
      <!-- Reffrence name -->

      <!-- RefJobI Job  -->
      <b-col cols="12" sm="6">
        <validation-provider
          name="RefJobI Job"
          :rules="{ required: true, min: 3 }"
          v-slot="validationContext"
        >
          <b-form-group
            id="exp-job"
            label="Reffrence Job"
            label-for="reff-job-input"
          >
            <b-form-input
              id="reff-job-input"
              name="reff-job-input"
              v-model="ReffForm.RefJobI"
              :state="getValidationState(validationContext)"
              aria-describedby="input-1-live-feedback"
            >
            </b-form-input>
          </b-form-group>
        </validation-provider>
      </b-col>
      <!-- End Reffrence Job -->

      <!--Refrence Mail Start -->
      <b-col cols="12" sm="6">
        <validation-provider
          name="Refrence Mail"
          :rules="{ required: true, min: 3 }"
          v-slot="validationContext"
        >
          <b-form-group
            id="exp-date-start"
            label="Refrence Mail"
            label-for="reff-mail-input"
          >
            <b-form-input
              id="reff-mail-input"
              name="reff-mail-input"
              type="email"
              v-model="ReffForm.RefMailI"
              :state="getValidationState(validationContext)"
              aria-describedby="input-1-live-feedback"
            >
            </b-form-input>
          </b-form-group>
        </validation-provider>
      </b-col>
      <!-- Reffrence Mail End  -->

      <!-- Reffrence Phone Start -->
      <b-col cols="12" sm="6">
        <validation-provider
          name="Reffrence Phone"
          :rules="{ required: true, min: 3 }"
          v-slot="validationContext"
        >
          <b-form-group
            id="reff-phone-input"
            label="Reffrence Phone"
            label-for="reff-phone-input"
          >
            <b-form-input
              id="reff-phone-input"
              name="reff-phone-input"
              type="text"
              v-model="ReffForm.RefPhoneI"
              :state="getValidationState(validationContext)"
              aria-describedby="input-1-live-feedback"
            >
            </b-form-input>
          </b-form-group>
        </validation-provider>
      </b-col>
      <!-- Reffrence At Start -->
      <b-col cols="12" sm="6">
        <validation-provider
          name="Reffrence at"
          :rules="{ required: true, min: 3 }"
          v-slot="validationContext"
        >
          <b-form-group
            id="reff-at-input"
            label="Reffrence At"
            label-for="reff-at-input"
          >
            <b-form-input
              id="reff-at-input"
              name="reff-at-input"
              type="text"
              v-model="ReffForm.RefAtI"
              :state="getValidationState(validationContext)"
              aria-describedby="input-1-live-feedback"
            >
            </b-form-input>
          </b-form-group>
        </validation-provider>
      </b-col>
      <!-- Education Form Buttons  -->
      <b-col
        sm="12"
        v-if="type === 'newItem'"
        class="d-flex justify-content-start"
      >
        <b-button type="submit" variant="primary">{{$t('Save')}}</b-button>
        <b-button variant="danger" class="mx-2">{{$t('Cancel')}}</b-button>
      </b-col>
    </b-form>
  </validation-observer>
</template>

<script>
import { mapActions } from "vuex";
import _ from "lodash";

export default {
  props: ["reffrence", "type", "CvId"],
  data() {
    let ReffFormVal;

    if (this.type === "item") {
      ReffFormVal = {
        RefNameI: this.reffrence.RefName,
        RefJobI: this.reffrence.RefJob,
        RefMailI: this.reffrence.RefMail,
        RefPhoneI: this.reffrence.RefPhone,
        RefAtI: this.reffrence.RefAt,
        RefCvI: this.CvId,
      };
    } else if (this.type === "newItem") {
      ReffFormVal = {
        RefNameI: "",
        RefJobI: "",
        RefMailI: "",
        RefPhoneI: "",
        RefAtI: "",
        RefCvI: this.CvId,
      };
    }

    return {
      ReffForm: ReffFormVal,
    };
  },
  watch: {
    ReffForm: {
      handler() {
        if (this.type === "item" && this.updateable) {
          this.updateProjWatch();
        }
        this.updateable = true;
      },
      deep: true,
    },
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    ...mapActions(["saveReff", "updateReff"]),
    SaveReffSubmit: function () {
      this.saveReff(this.ReffForm).then(() => {
        this.$emit("reffSaved");
        this.ReffForm = {
          RefNameI: "",
          RefJobI: "",
          RefMailI: "",
          RefPhoneI: "",
          RefAtI: "",
          RefCvI: this.CvId,
        };
      });
      console.log("Reff Saved");
    },
    updateProjWatch: _.debounce(function () {
      var data = {
        RefId: this.reffrence._id,
        data: this.ReffForm,
      };

      this.updateReff(data);
    }, 6000),
  },
};
</script>

<style></style>
