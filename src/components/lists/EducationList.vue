<template>
  <div class="">
    <b-card class="my-3 px-2">
      <b-row class="justify-content-between align-items-start">
        <h4 class="text-start card-title mb-4 p-1 font-weight-bold">
          Education
        </h4>
        <b-button
          variant="link"
          class="font-weight-bold h5 text-dark"
          v-b-toggle.collapse-edu
        >
          + Add Education</b-button
        >
      </b-row>
      <b-row>
        <b-collapse id="collapse-edu" class="mt-2" style="flex: 1">
          <education
            v-bind:CvId="cvOne.cvId"
            v-bind:type="'newItem'"
          ></education>
        </b-collapse>
      </b-row>
    </b-card>
    <b-card
      class="my-3 p-2"
      v-for="edu in this.educations"
      v-bind:key="edu._id"
    >
      <div class="d-flex justify-content-between">
        <h4>{{ edu.EduTitle }}</h4>
        <div class="">
          <b-button v-b-toggle="'collap' + edu._id"> colp </b-button>
          <b-button @click="DeleteEduSubmit(edu._id)" variant="danger">Del</b-button>
        </div>
      </div>
      <b-collapse :id="'collap'+edu._id" >
        <education
          v-bind:CvId="cvOne.cvId"
          v-bind:education="edu"
          v-bind:type="'item'"
          @setModalProp="SetSkillModalProp('education', edu._id)"
        ></education>
      
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
import education from "../items/education.vue";

export default {
  components: {
    education,
  },
  computed: {
    ...mapGetters(["educations", "cvOne"]),
  },
  methods: {
    ...mapActions(['deleteEdu']),
    SetSkillModalProp(type, id) {
      this.SkillModalItemType = type;
      this.SkillModalItemId = id;
    },
        DeleteEduSubmit:function(eduid){
      this.deleteEdu(eduid)
    }
  },
};
</script>

<style></style>
