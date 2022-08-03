<template>
  <validation-observer ref="observer" v-slot="{ handleSubmit }">
    <b-form @submit.prevent="handleSubmit(SaveExpSubmit)" class="row">
      <!-- Experiance Title -->
      <b-col cols="12" sm="6">
        <validation-provider
          :name="$t('ExpName')"
          :rules="{ required: true, min: 3 }"
          v-slot="validationContext"
        >
          <b-form-group
            id="exp-title"
            :label="$t('ExpName')"
            label-for="exp-title-input"
          >
            <b-form-input
              id="exp-title-input"
              name="exp-title-input"
              v-model="ExpForm.ExpTitleI"
              :state="getValidationState(validationContext)"
              aria-describedby="exp-title-live-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="exp-title-live-feedback">{{
              validationContext.errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
      </b-col>
      <!-- End Experiance title -->

      <!-- Experiance Job  -->
      <b-col cols="12" sm="6">
        <validation-provider
          :name="$t('ExpJob')"
          :rules="{ required: true, min: 3 }"
          v-slot="validationContext"
        >
          <b-form-group
            id="exp-job"
            :label="$t('ExpJob')"
            label-for="exp-job-input"
          >
            <b-form-input
              id="exp-job-input"
              name="exp-job-input"
              v-model="ExpForm.ExpJobI"
              :state="getValidationState(validationContext)"
              aria-describedby="exp-job-live-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="exp-job-live-feedback">{{
              validationContext.errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
      </b-col>
      <!-- End Experiance Job -->

      <!-- Experiance Date Start -->
      <b-col cols="12" sm="6">
        <validation-provider
          :name="$t('DateStart')"
          :rules="{ required: true }"
          v-slot="validationContext"
        >
          <b-form-group
            id="exp-date-start"
            :label="$t('DateStart')"
            label-for="exp-date-start-input"
          >
            <b-form-input
              id="exp-date-start-input"
              name="exp-date-start-input"
              type="date"
              v-model="ExpForm.ExpFromI"
              :state="getValidationState(validationContext)"
              aria-describedby="exp-date-start-live-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="exp-date-start-live-feedback">{{
              validationContext.errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
      </b-col>
      <!-- Experiance Date End End  -->

      <!-- Experiance Date End -->
      <b-col cols="12" sm="6">
        <validation-provider
          :name="$t('DateEnd')"
          :rules="{ required: true }"
          v-slot="validationContext"
        >
          <b-form-group
            id="exp-date-end"
            :label="$t('DateEnd')"
            label-for="exp-date-end-input"
          >
            <b-form-input
              id="exp-date-end-input"
              name="exp-date-end-input"
              type="date"
              v-model="ExpForm.ExpToI"
              :state="getValidationState(validationContext)"
              aria-describedby="exp-date-end-live-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="exp-date-end-live-feedback">{{
              validationContext.errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
      </b-col>
      <!-- Experiance Date End End -->

      <!-- Experiance Description  -->
      <b-col cols="12" sm="12">
        <validation-provider
          :name="$t('ExpDesc')"
          :rules="{ required: true, min: 3 }"
          v-slot="validationContext"
        >
          <b-form-group
            id="exp-desc"
            :label="$t('ExpDesc')"
            label-for="exp-desc"
          >
            <!-- <b-textarea
              id="exp-desc"
              name='exp-desc'
              v-model="ExpForm.ExpDescI"
              :state="getValidationState(validationContext)"
              aria-describedby="exp-desc-live-feedback"
              rows="6"
              ></b-textarea> -->
            <vue-editor
              v-model="ExpForm.ExpDescI"
              :editorToolbar="customToolbar"
            >
            </vue-editor>
            <b-form-invalid-feedback id="exp-desc-live-feedback">{{
              validationContext.errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
      </b-col>
      <!-- Experiance Descriptipn End -->

      <!-- Experiance Skills Start -->
      <b-col sm="12" class="p-2" v-if="type === 'item'">
        <skill
          v-for="(skill, index) in experiance.ExpSkill"
          v-bind:key="index"
          v-bind:skill="skill"
          v-bind:type="'item'"
          v-bind:itemid="experiance._id"
          v-bind:itemtype="'experiance'"
        ></skill>
        <b-button
          pill
          v-b-modal.skill-list-modal
          @click="updateModal()"
          class="m-1 p-3 text-center skill-item"
          variant="outline-primary"
        >
          + Add Skills To Experiance
        </b-button>
      </b-col>
      <!-- Experiance Skills End -->

      <!-- Experiance Form Buttons  -->
      <b-col v-if="type === 'newItem'" class="d-flex justify-content-start">
        <b-button type="submit" variant="primary">Save</b-button>
        <b-button variant="danger" class="mx-2">Cancel</b-button>
      </b-col>
    </b-form>
  </validation-observer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import skill from "../../components/items/skill.vue";
import { VueEditor } from "vue2-editor";
import _ from "lodash";
export default {
  props: ["experiance", "type", "CvId"],
  components: {
    skill,
    VueEditor,
  },
  data() {
    let ExpFormVal;
    if (this.type === "item") {
      ExpFormVal = {
        ExpTitleI: this.experiance.ExpTitle,
        ExpJobI: this.experiance.ExpJob,
        ExpFromI: new Date(this.experiance.ExpFrom)
          .toISOString()
          .substring(0, 10),
        ExpToI: new Date(this.experiance.ExpTo).toISOString().substring(0, 10),
        ExpDescI: this.experiance.ExpDesc,
        ExpCvI: this.CvId,
      };
    } else if (this.type === "newItem") {
      ExpFormVal = {
        ExpTitleI: "",
        ExpJobI: "",
        ExpFromI: "",
        ExpToI: "",
        ExpDescI: "",
        ExpCvI: this.CvId,
      };
    }
    return {
      ExpForm: ExpFormVal,
      SkillArr: [],
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
      updateable: false,
    };
  },
  watch: {
    ExpForm: {
      handler() {
        if (this.type === "item" && this.updateable) {
          this.updateExpWatch();
        }
        this.updateable = true;
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(["saveExp", "updateExp"]),
    updateModal() {
      this.$emit("setModalProp");
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    SaveExpSubmit() {
      this.saveExp(this.ExpForm).then(() => {
        //close collapse
        this.$emit("expSaved");
        //empty form
        this.ExpForm = {
          ExpTitleI: "",
          ExpJobI: "",
          ExpFromI: "",
          ExpToI: "",
          ExpDescI: "",
          ExpCvI: this.CvId,
        };
      });
    },
    updateExpWatch: _.debounce(function () {
      var data = {
        ExpId: this.experiance._id,
        data: this.ExpForm,
      };

      this.updateExp(data);
    }, 600),
  },
  computed: {
    ...mapGetters(["skills"]),
  },
  mounted() {},
};
</script>

<style></style>
