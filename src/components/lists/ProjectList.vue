<template>
  <div class="">
    <b-card class="my-3 px-2">
      <b-row class="justify-content-between align-items-start">
        <h4 class="text-start card-title mb-4 p-1 font-weight-bold">Project</h4>
        <b-button
          variant="link"
          class="font-weight-bold h5 text-dark"
          v-b-toggle.collapse-proj
        >
          + Add Project</b-button
        >
      </b-row>
      <b-row>
        <b-collapse id="collapse-proj" class="mt-2" style="flex: 1">
          <project v-bind:CvId="cvOne.cvId" v-bind:type="'newItem'"></project>
        </b-collapse>
      </b-row>
    </b-card>
    <b-card
      class="my-3 p-2"
      v-for="proj in this.projects"
      v-bind:key="proj._id"
    >
      <div class="d-flex justify-content-between">
        <h4>{{ proj.ProjName }}</h4>
        <div class="">
          <b-button v-b-toggle="'collap' + proj._id"> colp </b-button>
          <b-button @click="DeleteProjSubmit(proj._id)" variant="danger"
            >Del</b-button
          >
        </div>
      </div>
      <b-collapse :id="'collap' + proj._id">
        <project
          v-bind:CvId="cvOne.cvId"
          v-bind:project="proj"
          v-bind:type="'item'"
        ></project>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import project from "../items/project.vue";
export default {
  components: {
    project,
  },
  computed: {
    ...mapGetters(["projects", "cvOne"]),
  },
  methods: {
    ...mapActions(["deleteProj"]),
    SetSkillModalProp(type, id) {
      this.SkillModalItemType = type;
      this.SkillModalItemId = id;
    },
    DeleteProjSubmit: function (projid) {
      this.deleteProj(projid);
    },
  },
};
</script>

<style></style>
