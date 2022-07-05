<template>
  <b-container fluid="md" class="hfull" v-if="this.cvOneLoaded">
    <div class="my-3">
      <!-- template Card start -->
      <b-card>
        <h4 class="text-start card-title mb-4 p-1 font-weight-bold">
          Template
        </h4>
        <b-row>
          <b-button
            variant="primary"
            v-for="item in cvTemplates"
            v-bind:key="item._id"
            @click="setTemplateBtn(item._id)"
          >
            {{ item.TemplateName }}
          </b-button>
        </b-row>
      </b-card>
      <!-- Profile Card Start -->
      <b-card class="my-3">
        <h4 class="text-start card-title mb-4 p-1 font-weight-bold">Profile</h4>
        <b-row>
          <img
            v-if="cvOne.cvImg !== null"
            :src="'https://drive.google.com/thumbnail?id=' + cvOne.cvImg"
            alt=""
          />
        </b-row>
        <b-form class="row">
          <b-col cols="12" sm="6">
            <b-form-group
              id="cv-img-group"
              label="Image profile:"
              label-for="cv-img"
              description="max 8 MB"
            >
              <b-form-file
                id="cv-img"
                size="large"
                accept="image/jpeg, image/png, image/gif"
                placeholder="Choose a file or drop it here..."
                v-model="cvimg"
                drop-placeholder="Drop file here..."
              ></b-form-file>
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="6">
            <b-form-group
              id="input-group-1"
              label="Email address:"
              label-for="input-1"
              description="We'll never share your email with anyone else."
            >
              <b-form-input
                id="input-1"
                size="large"
                type="email"
                placeholder="Enter email"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col cols="12" sm="6">
            <b-form-group
              id="input-group-2"
              label="Your Name:"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                size="large"
                placeholder="Enter name"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col cols="12" sm="6">
            <b-form-group
              id="input-group-2"
              label="Your Name:"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                placeholder="Enter name"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-form>
      </b-card>

      <!-- Social media Card Start -->
      <ContactList></ContactList>
      <!-- Skills Card Start -->
      <SkillList></SkillList>
      <skillModal :CvId="cvOne.cvId"></skillModal>
      <div v-for="section in dragList" v-bind:key="section.name">
        <!-- Experiance Card Start -->
        <ExperianceList v-if="section.name === 'experiences'"></ExperianceList>

        <!-- Education Card Start -->
        <EducationList v-if="section.name === 'educations'"></EducationList>

        <!-- Reffrence Card Start  -->
        <ReffrenceList v-if="section.name === 'reffrences'"></ReffrenceList>

        <!-- Projects Card Start -->
        <ProjectList v-if="section.name === 'projects'"></ProjectList>

        <!-- Organizations Card Start -->
        <OrganizationList
          v-if="section.name === 'organizations'"
        ></OrganizationList>

        <!-- Awards Card Start -->
        <AwardList v-if="section.name === 'awards'"></AwardList>
      </div>
    </div>

    <b-button
      variant="link"
      v-if="!checkSection('experiences')"
      @click="addSectionBtn('experiences')"
      >Add experiences section</b-button
    >
    <b-button
      variant="link"
      v-if="!checkSection('educations')"
      @click="addSectionBtn('educations')"
      >Add educatations section</b-button
    >
    <b-button
      variant="link"
      v-if="!checkSection('reffrences')"
      @click="addSectionBtn('reffrences')"
      >Add reffrences section</b-button
    >
    <b-button
      variant="link"
      v-if="!checkSection('organizations')"
      @click="addSectionBtn('organizations')"
      >Add organizations section</b-button
    >
    <b-button
      variant="link"
      v-if="!checkSection('awards')"
      @click="addSectionBtn('awards')"
      >Add awards section</b-button
    >
    <b-button
      variant="link"
      v-if="!checkSection('projects')"
      @click="addSectionBtn('projects')"
      >Add projects section</b-button
    >
    <router-link
      :to="{ name: 'cvPerview', params: { cvId: cvOne.cvId } }"
      style="
        position: fixed;
        background: #5541f9;
        color: white;
        padding: 24px;
        border-radius: 60px;
        bottom: 20px;
        right: 40px;
      "
    >
      perview
    </router-link>

    <skillListModal
      v-bind:CvId="cvOne.cvId"
      v-bind:itemType="this.SkillModalItemType"
      v-bind:itemId="this.SkillModalItemId"
    ></skillListModal>
  </b-container>
</template>

<script>
import SkillList from "../components/lists/SkillList.vue";
import ContactList from "../components/lists/ContactList.vue";
import ExperianceList from "../components/lists/ExperineceList.vue";
import EducationList from "../components/lists/EducationList.vue";
import ReffrenceList from "../components/lists/ReffrenceList.vue";
import ProjectList from "../components/lists/ProjectList.vue";
import OrganizationList from "../components/lists/OrganizationList.vue";
import AwardList from "../components/lists/AwardsList.vue";

import skillModal from "../components/widget/skillModal.vue";
import skillListModal from "../components/widget/skillListModal.vue";

import { mapGetters, mapActions } from "vuex";
import _ from "lodash";

export default {
  components: {
    ContactList,
    SkillList,
    ExperianceList,
    EducationList,
    ReffrenceList,
    ProjectList,
    OrganizationList,
    skillModal,
    skillListModal,
    AwardList,
  },

  data() {
    return {
      cvimg: null,
      SkillModalItemType: "",
      SkillModalItemId: "",
      cvOneLoaded: false,
      drag: false,
      dragList: [],
    };
  },
  computed: {
    ...mapGetters(["cvOne", "skills", "cvTemplates"]),
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  methods: {
    ...mapActions([
      "getCvOne",
      "changeSectionSort",
      "addSection",
      "setCvTemplate",
    ]),
    // FindContact(item) {
    //   var arr = this.contacts;
    //   let value;
    //   //console.log(arr)
    //   arr.forEach((element) => {
    //     if (element.CKey === item) {
    //       value = element.CValue;
    //     }
    //   });
    //   return value;
    // },

    setTemplateBtn(templateId) {
      var data = {
        cvId: this.cvOne.cvId,
        templateId,
      };
      this.setCvTemplate(data);
    },
    SetSkillModalProp(type, id) {
      this.SkillModalItemType = type;
      this.SkillModalItemId = id;
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    updateImgWatch(newVal) {
      console.log(newVal);
    },
    DragEnd() {
      this.drag = false;
      var data = {
        cvId: this.cvOne.cvId,
        newSort: this.dragList,
      };
      this.changeSectionSort(data);
      console.log(this.dragList);
    },
    checkSection(section) {
      // var mainSections = this.cvOne.cvSections.main
      // var sideSections = this.cvOne.cvSections.side
      // var sections=[mainSections,sideSections].flat();
      return this.dragList.find((item) => {
        return item.name === section;
      });
    },
    addSectionBtn(section) {
      var data = {
        cvId: this.cvOne.cvId,
        section,
      };
      this.addSection(data);
    },
  },

  watch: {
    cvOne: {
      handler(newVal) {
        var mainSections = newVal.cvSections.main
        var sideSections = newVal.cvSections.side
        var sections=[mainSections,sideSections].flat();
        this.dragList =sections;
        this.cvOneLoaded = true;
      },
      deep: true,
    },

    cvimg: _.debounce(function (newVal) {
      console.log("updated", newVal);

      this.updateImgWatch(newVal);
    }, 6000),
  },
  mounted() {
    //update contacts form
    console.log("cvone mounted");
    this.getCvOne(this.$route.params.cvId);
  },
};
</script>

<style scoped>
.card-title {
  border-bottom: 2px;
  border-bottom-color: red;
  border-bottom-style: solid;
  width: max-content;
}

.skill-item {
  height: 54px !important;
  max-height: 54px !important;
}
</style>
