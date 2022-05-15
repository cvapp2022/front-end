<template>
  <validation-observer ref="observer" v-slot="{ handleSubmit }">
    <b-form @submit.prevent="handleSubmit(SaveAwSubmit)" class="row">
      <!-- Award Title -->
      <b-col cols="12" sm="6">
        <validation-provider
          name="Award Title"
          :rules="{ required: true, min: 3 }"
          v-slot="validationContext"
        >
          <b-form-group
            id="aw-title"
            label="Award title"
            label-for="aw-title-input"
          >
            <b-form-input
              id="aw-title-input"
              name="aw-title-input"
              v-model="AwForm.AwTitleI"
              :state="getValidationState(validationContext)"
              aria-describedby="aw-title-live-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="aw-title-live-feedback">{{
              validationContext.errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
      </b-col>
      <!-- End Award title -->

      <!-- Award Job  -->
      <b-col cols="12" sm="6">
        <validation-provider
          name="Award Job"
          :rules="{ required: true, min: 3 }"
          v-slot="validationContext"
        >
          <b-form-group id="aw-job" label="Award Job" label-for="aw-job-input">
            <b-form-input
              id="aw-job-input"
              name="aw-job-input"
              v-model="AwForm.AwJobI"
              :state="getValidationState(validationContext)"
              aria-describedby="aw-job-live-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="aw-job-live-feedback">{{
              validationContext.errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
      </b-col>
      <!-- End Award Job -->

      <!-- Award Date Start -->
      <b-col cols="12" sm="6">
        <validation-provider
          name="Award Date"
          :rules="{ required: true }"
          v-slot="validationContext"
        >
          <b-form-group
            id="aw-date"
            label="Award Date"
            label-for="aw-date-input"
          >
            <b-form-input
              id="aw-date-input"
              name="aw-date-input"
              type="date"
              v-model="AwForm.AwDateI"
              :state="getValidationState(validationContext)"
              aria-describedby="aw-date-live-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="aw-date-live-feedback">{{
              validationContext.errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
      </b-col>
      <!-- Award Date End End  -->

      <!-- Award Description  -->
      <b-col cols="12" sm="12">
        <!-- <validation-provider
          name="Award Description"
          :rules="{ required: true, min: 3 }"
          v-slot="validationContext"
        >
          <b-form-group
            id="aw-desc"
            label="Award Description"
            label-for="aw-desc"
          >
            <b-textarea
              id="aw-desc"
              name="aw-desc"
              v-model="AwForm.AwDescI"
              :state="getValidationState(validationContext)"
              aria-describedby="aw-desc-live-feedback"
              rows="6"
            ></b-textarea>
            <b-form-invalid-feedback id="aw-desc-live-feedback">{{
              validationContext.errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider> -->
<vue-editor v-model="AwForm.AwDescI" :editorToolbar="customToolbar">
        </vue-editor>
      </b-col>
      <!-- Award Descriptipn End -->

      <!-- Award Form Buttons  -->
      <b-col v-if="type === 'newItem'" class="d-flex justify-content-start">
        <b-button type="submit" variant="primary">Save</b-button>
        <b-button variant="danger" class="mx-2">Cancel</b-button>
      </b-col>
    </b-form>
  </validation-observer>
</template>

<script>
import { mapActions } from "vuex";
import { VueEditor } from "vue2-editor";
import _ from 'lodash';



export default {
  props: ["award", "type", "CvId"],
  components:{
    VueEditor
  },
  data() {
    let AwFormVal;
    if (this.type === "item") {
      AwFormVal = {
        AwTitleI: this.award.AwTitle,
        AwJobI: this.award.AwJob,
        AwDateI: new Date(this.award.AwDate).toISOString().substring(0, 10),
        AwDescI: this.award.AwDesc,
      };
    } else if (this.type === "newItem") {
      AwFormVal = {
        AwTitleI: "",
        AwJobI: "",
        AwDateI: "",
        AwDescI: "",
        AwCvI: this.CvId,
      };
    }

    return {
      AwForm: AwFormVal,
            customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" },
        ],
        [{ color: [] }],
      ],
      updateable:false
    };
  },
    watch: {
    AwForm: {
      handler() {
        if(this.type === 'item' && this.updateable ){
         this.updateAwWatch()
        }
        this.updateable=true;
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(["saveAw","updateAw"]),
    updateModal() {
      this.$emit("setModalProp");
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    SaveAwSubmit() {
      this.saveAw(this.AwForm);
    },
    updateAwWatch:_.debounce(function(){
      var data ={
        AwId:this.award._id,
        data:this.AwForm
      };

      this.updateAw(data);

    },6000)

  },
};
</script>

<style></style>
