<template>
  <validation-observer ref="observer" v-slot="{ handleSubmit }">
    <b-form @submit.prevent="handleSubmit(SaveOrgSubmit)" class="row">
      <!-- Organization Title -->
      <b-col cols="12" sm="6">
        <validation-provider
          :name="$t('OrgTitle')"
          :rules="{ required: true, min: 3 }"
          v-slot="validationContext"
        >
          <b-form-group
            id="org-title"
            :label="$t('OrgTitle')"
            label-for="org-title-input"
          >
            <b-form-input
              id="org-title-input"
              name="org-title-input"
              v-model="OrgForm.OrgTitleI"
              :state="getValidationState(validationContext)"
              aria-describedby="org-title-live-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="org-title-live-feedback">{{
              validationContext.errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
      </b-col>
      <!-- End Organization title -->

      <!-- Organization Job  -->
      <b-col cols="12" sm="6">
        <validation-provider
          :name="$t('OrgJob')"
          :rules="{ required: true, min: 3 }"
          v-slot="validationContext"
        >
          <b-form-group
            id="org-job"
            :label="$t('OrgJob')"
            label-for="org-job-input"
          >
            <b-form-input
              id="org-job-input"
              name="org-job-input"
              v-model="OrgForm.OrgJobI"
              :state="getValidationState(validationContext)"
              aria-describedby="org-job-live-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="org-job-live-feedback">{{
              validationContext.errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
      </b-col>
      <!-- End Organization Job -->

      <!-- Organization Date Start -->
      <b-col cols="12" sm="6">
        <validation-provider
          :name="$t('DateStart')"
          :rules="{ required: true }"
          v-slot="validationContext"
        >
          <b-form-group
            id="org-date-start"
            :label="$t('DateStart')"
            label-for="org-date-start-input"
          >
            <b-form-input
              id="org-date-start-input"
              name="org-date-start-input"
              type="date"
              v-model="OrgForm.OrgFromI"
              :state="getValidationState(validationContext)"
              aria-describedby="org-date-start-live-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="org-date-start-live-feedback">{{
              validationContext.errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
      </b-col>
      <!-- Organization Date End End  -->

      <!-- Organization Date End -->
      <b-col cols="12" sm="6">
        <validation-provider
          :name="$t('DateEnd')"
          :rules="{ required: true }"
          v-slot="validationContext"
        >
          <b-form-group
            id="org-date-end"
            :label="$t('DateEnd')"
            label-for="org-date-end-input"
          >
            <b-form-input
              id="org-date-end-input"
              name="org-date-end-input"
              type="date"
              v-model="OrgForm.OrgToI"
              :state="getValidationState(validationContext)"
              aria-describedby="org-date-end-live-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="org-date-end-live-feedback">{{
              validationContext.errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
      </b-col>
      <!-- Organization Date End End -->

      <!-- Organization Description  -->
      <b-col cols="12" sm="12">
        <!-- <validation-provider
          name="Organization Description"
          :rules="{ required: true, min: 3 }"
          v-slot="validationContext"
        >
          <b-form-group
            id="org-desc"
            label="Organization Description"
            label-for="org-desc"
          >
            <b-textarea
              id="org-desc"
              name="org-desc"
              v-model="OrgForm.OrgDescI"
              :state="getValidationState(validationContext)"
              aria-describedby="org-desc-live-feedback"
              rows="6"
            ></b-textarea>
            <b-form-invalid-feedback id="org-desc-live-feedback">{{
              validationContext.errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider> -->
        <vue-editor v-model="OrgForm.OrgDescI" :editorToolbar="customToolbar">
        </vue-editor>
      </b-col>
      <!-- Organization Descriptipn End -->

      <!-- Organization Form Buttons  -->
      <b-col v-if="type === 'newItem'" class="d-flex justify-content-start">
        <b-button type="submit" variant="primary">{{$t('Save')}}</b-button>
        <b-button variant="danger" class="mx-2">{{$t('Cancel')}}</b-button>
      </b-col>
    </b-form>
  </validation-observer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { VueEditor } from "vue2-editor";
import _ from "lodash";

export default {
  props: ["organization", "type", "CvId"],
  data() {
    let OrgFormVal;
    if (this.type === "item") {
      OrgFormVal = {
        OrgTitleI: this.organization.OrgTitle,
        OrgJobI: this.organization.OrgJob,
        OrgFromI: new Date(this.organization.OrgFrom)
          .toISOString()
          .substring(0, 10),
        OrgToI: new Date(this.organization.OrgTo)
          .toISOString()
          .substring(0, 10),
        OrgDescI: this.organization.OrgDesc,
        OrgCvI: this.CvId,
      };
    } else if (this.type === "newItem") {
      OrgFormVal = {
        OrgTitleI: "",
        OrgJobI: "",
        OrgFromI: "",
        OrgToI: "",
        OrgDescI: "",
        OrgCvI: this.CvId,
      };
    }
    return {
      OrgForm: OrgFormVal,
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
      SkillArr: [],
      updateable: false,
    };
  },
  watch: {
    OrgForm: {
      handler() {
        if (this.type === "item" && this.updateable) {
          this.updateOrgWatch();
        }
        this.updateable = true;
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(["saveOrg", "updateOrg"]),
    updateModal() {
      this.$emit("setModalProp");
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    SaveOrgSubmit() {
      this.saveOrg(this.OrgForm).then(() => {
        this.$emit("orgSaved");
        this.OrgForm = {
          OrgTitleI: "",
          OrgJobI: "",
          OrgFromI: "",
          OrgToI: "",
          OrgDescI: "",
          OrgCvI: this.CvId,
        };
      });
    },
    updateOrgWatch: _.debounce(function () {
      var data = {
        data: this.OrgForm,
        OrgId: this.organization._id,
      };
      this.updateOrg(data);
    }, 6000),
  },
  computed: {
    ...mapGetters(["skills"]),
  },
  components: {
    VueEditor,
  },
  mounted() {},
};
</script>

<style></style>
