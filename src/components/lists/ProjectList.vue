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
    <div class="">
      <draggable
        v-bind="dragOptions"
        handle=".handle"
        group="people"
        @start="drag = true"
        @end="DragEnd()"
        v-model="draglist"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <b-card
            class="my-3 p-2"
            v-for="proj in this.draglist"
            v-bind:key="proj._id"
          >
            <div class="d-flex justify-content-between">
              <b-icon icon="justify" class="h1 handle"></b-icon>
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
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import project from "../items/project.vue";
import draggable from "vuedraggable";
export default {
  components: {
    project,
    draggable,
  },
  computed: {
    ...mapGetters(["projects", "cvOne"]),
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  watch: {
    projects() {
      console.log(" projects getter changes");
      this.draglist = this.projects;
    },
  },
  data() {
    return {
      drag: false,
      draglist: [],
    };
  },
  methods: {
    ...mapActions(["deleteProj", "changeProj"]),
    SetSkillModalProp(type, id) {
      this.SkillModalItemType = type;
      this.SkillModalItemId = id;
    },
    DeleteProjSubmit: function (projid) {
      this.deleteProj(projid);
    },
    DragEnd() {
      this.drag = false;

      this.changeProj({ list: this.draglist, CvId: this.cvOne.cvId });
      console.log("drag end");
    },
  },
  mounted() {
    this.draglist = this.projects;
  },
};
</script>

<style></style>
