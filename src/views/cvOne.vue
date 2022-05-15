<template>
  <b-container fluid="md" class="hfull">
    <div class="">
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

      <!-- Experiance Card Start -->
      <ExperianceList></ExperianceList>

      <!-- Education Card Start -->
      <EducationList></EducationList>

      <!-- Reffrence Card Start  -->
      <ReffrenceList></ReffrenceList>

      <!-- Projects Card Start -->
      <ProjectList></ProjectList>

      <!-- Organizations Card Start -->
      <OrganizationList></OrganizationList>

      <!-- Awards Card Start -->
      <AwardList></AwardList>
    </div>
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

import { mapGetters } from "vuex";
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
    };
  },
  computed: {
    ...mapGetters(["cvOne", "skills"]),
  },
  methods: {
    FindContact(item) {
      var arr = this.contacts;
      let value;
      //console.log(arr)
      arr.forEach((element) => {
        if (element.CKey === item) {
          value = element.CValue;
        }
      });
      return value;
    },
    SaveSkill() {
      console.log("Skill Saved");
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
  },

  watch: {
    // cvOne:{
    //   handler(){
    //     console.log("Cv Loaded", this.cvOneLoaded);
    //     this.cvOneLoaded = true;
    //   },
    //   deep:true
    // },

    cvimg: _.debounce(function (newVal) {
      console.log("updated", newVal);

      this.updateImgWatch(newVal);
    }, 6000),
    mounted() {
      //update contacts form
    },
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
