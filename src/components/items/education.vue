<template>
  <validation-observer ref="observer" v-slot="{ handleSubmit }">
    <b-form @submit.prevent="handleSubmit(SaveEduSubmit)" class="row">
      <!-- Edueriance Title -->
      <b-col cols="12" sm="6">
        <validation-provider
          :name="$t('EduName')"
          :rules="{ required: true }"
          v-slot="validationContext"
        >
          <b-form-group
            id="edu-title"
            :label="$t('EduName')"
            label-for="edu-title-input"
          >
            <b-form-input
              id="edu-title-input"
              name="edu-title-input"
              v-model="EduForm.EduTitleI"
              :state="getValidationState(validationContext)"
              aria-describedby="edu-title-live-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="edu-title-live-feedback">{{
              validationContext.errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
      </b-col>
      <!-- End Education title -->

      <!-- Education type  -->
      <b-col cols="12" sm="6">
        <validation-provider
          :name="$t('EduAt')"
          :rules="{ required: true, min: 3 }"
          v-slot="validationContext"
        >
          <b-form-group
            id="edu-at"
            :label="$t('EduAt')"
            label-for="edu-at-input"
          >
            <b-form-input
              id="edu-at-input"
              name="edu-at-input"
              v-model="EduForm.EduAtI"
              :state="getValidationState(validationContext)"
              aria-describedby="edu-at-live-feedback"
            >
            </b-form-input>
            <b-form-invalid-feedback id="edu-at-live-feedback">{{
              validationContext.errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
      </b-col>
      <!-- End Education type -->

      <!-- Education Date Start -->
      <b-col cols="12" sm="6">
        <validation-provider
          name="Education Date Start"
          :rules="{ required: true, min: 3 }"
          v-slot="validationContext"
        >
          <b-form-group
            id="edu-date-start"
            :label="$t('DateStart')"
            label-for="edu-date-start-input"
          >
            <b-form-input
              id="edu-date-start-input"
              name="edu-date-start-input"
              type="date"
              v-model="EduForm.EduFromI"
              :state="getValidationState(validationContext)"
              aria-describedby="edu-date-start-live-feedback"
            >
            </b-form-input>
            <b-form-invalid-feedback id="edu-date-start-live-feedback">{{
              validationContext.errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
      </b-col>
      <!-- Education Date End End  -->

      <!-- Education Date End -->
      <b-col cols="12" sm="6">
        <validation-provider
          name="Education Date end"
          :rules="{ required: true, min: 3 }"
          v-slot="validationContext"
        >
          <b-form-group
            id="edu-date-end"
            :label="$t('DateEnd')"
            label-for="edu-date-end-input"
          >
            <b-form-input
              id="edu-date-end-input"
              name="edu-date-end-input"
              type="date"
              v-model="EduForm.EduToI"
              :state="getValidationState(validationContext)"
              aria-describedby="edu-date-end-live-feedback"
            >
            </b-form-input>
            <b-form-invalid-feedback id="edu-date-end-live-feedback">{{
              validationContext.errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
      </b-col>
      <!-- Education Date End End -->

      <!-- Education Description  -->
      <b-col cols="12" sm="12">
        <vue-editor v-model="EduForm.EduDescI" :editorToolbar="customToolbar">
        </vue-editor>
      </b-col>
      <!-- Education Descriptipn End -->

      <!-- Education Skills Start -->
      <b-col sm="12" class="p-2" v-if="type === 'item'">
        <skill
          v-for="(skill, index) in education.EduSkill"
          v-bind:key="index"
          v-bind:skill="skill"
          v-bind:type="'item'"
          v-bind:itemid="education._id"
          v-bind:itemtype="'education'"
        ></skill>
        <b-button
          pill
          v-b-modal.skill-list-modal
          @click="updateModal()"
          class="m-1 p-3 text-center skill-item"
          variant="outline-primary"
        >
          + Add Skills To Education
        </b-button>
      </b-col>
      <!-- Education Skills End -->

      <!-- Education Form Buttons  -->
      <b-col v-if="type === 'newItem'" class="d-flex justify-content-start">
        <b-button type="submit" variant="primary">Save</b-button>
        <b-button variant="danger" class="mx-2">Cancel</b-button>
      </b-col>
    </b-form>
  </validation-observer>
</template>

<script>
import { mapActions } from "vuex";
import skill from "../../components/items/skill.vue";
import { VueEditor } from "vue2-editor";
import _ from "lodash";
export default {
  props: ["education", "type", "CvId"],
  data() {
    let EduFormVal;

    if (this.type === "item") {
      EduFormVal = {
        EduTitleI: this.education.EduTitle,
        EduAtI: this.education.EduAt,
        EduFromI: new Date(this.education.EduFrom)
          .toISOString()
          .substring(0, 10),
        EduToI: new Date(this.education.EduTo).toISOString().substring(0, 10),
        EduDescI: this.education.EduDesc,
        EduCvI: this.CvId,
      };
    } else if (this.type === "newItem") {
      EduFormVal = {
        EduTitleI: "",
        EduAtI: "",
        EduFromI: "",
        EduToI: "",
        EduDescI: "",
        EduCvI: this.CvId,
      };
    }

    return {
      EduForm: EduFormVal,
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
      EduTypeOptions: [
        { text: "please select", value: null },
        { text: "Colleage", value: "Colleage" },
        { text: "Self Learned", value: "Self Learn" },
      ],
      updateable: false,
    };
  },
  methods: {
    ...mapActions(["saveEdu", "updateEdu"]),
    updateModal() {
      this.$emit("setModalProp");
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    SaveEduSubmit: function () {
      this.saveEdu(this.EduForm).then(() => {
        this.$emit("eduSaved");
        this.EduForm = {
          EduTitleI: "",
          EduAtI: "",
          EduFromI: "",
          EduToI: "",
          EduDescI: "",
          EduCvI: this.CvId,
        };
      });
      console.log("Education Saved");
    },
    updateEduWatch: _.debounce(function () {
      var data = {
        EduId: this.education._id,
        data: this.EduForm,
      };
      this.updateEdu(data);
    }, 6000),
  },
  components: {
    skill,
    VueEditor,
  },
  watch: {
    EduForm: {
      handler() {
        if (this.type === "item" && this.updateable) {
          this.updateEduWatch();
        }
        this.updateable = true;
      },
      deep: true,
    },
  },
};
</script>

<style></style>
