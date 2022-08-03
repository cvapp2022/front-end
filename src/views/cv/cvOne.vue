<template>
  <b-container fluid="md" class="hfull" v-if="this.cvOneLoaded">
    <div class="my-3">
      <!-- template Card start -->
      <TemplateList></TemplateList>

      <!-- Profile Card Start -->
      <ProfileList @profileUpdated="profileUpdated" ></ProfileList>

      <!-- Social media Card Start -->
      <ContactList></ContactList>

      <!-- Skills Card Start -->
      <SkillList ref="skillList"></SkillList>
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
import TemplateList from '../../components/lists/TemplateList.vue';
import ProfileList from '../../components/lists/ProfileList.vue';
import SkillList from "../../components/lists/SkillList.vue";
import ContactList from "../../components/lists/ContactList.vue";
import ExperianceList from "../../components/lists/ExperineceList.vue";
import EducationList from "../../components/lists/EducationList.vue";
import ReffrenceList from "../../components/lists/ReffrenceList.vue";
import ProjectList from "../../components/lists/ProjectList.vue";
import OrganizationList from "../../components/lists/OrganizationList.vue";
import AwardList from "../../components/lists/AwardsList.vue";

import skillModal from "../../components/widget/skillModal.vue";
import skillListModal from "../../components/widget/skillListModal.vue";

import { mapGetters, mapActions } from "vuex";
import _ from "lodash";

export default {
  components: {
    TemplateList,
    ProfileList,
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
    ...mapGetters(["cvOne", "skills",]),
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
    profileUpdated(){
      this.$refs.skillList.getRepoSkills()
    }
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
