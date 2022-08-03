<template>
  <div class="">
    <b-card class="my-3 px-2">
      <b-row class="justify-content-between align-items-start">
        <h4 class="text-start card-title mb-4 p-1 font-weight-bold">{{$t("Projects")}}</h4>
        <b-button
          variant="link"
          class="font-weight-bold h5 text-primary"
          v-b-toggle.collapse-proj
        >
          {{$t("AddProj")}}</b-button
        >
        <!-- <b-button variant="danger" @click="removeSectionBtn('projects')"  >rm</b-button> -->
      </b-row>
      <b-row>
        <b-collapse id="collapse-proj" class="mt-2" style="flex: 1">
          <project v-bind:CvId="cvOne.cvId" v-bind:type="'newItem'" @projSaved="toggleCollapse"></project>
        </b-collapse>
      </b-row>
    </b-card>
    <div class="mx-4">
      <draggable
        v-bind="dragOptions"
        handle=".handle"
        group="Project"
        @start="drag = true"
        @end="DragEnd()"
        v-model="draglist"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <div class="d-flex align-items-baseline" v-for="proj in this.draglist" v-bind:key="proj._id">
            <b-icon icon="justify" class="h1 handle"></b-icon>
            <b-card class="flex-fill my-3 p-2">
              <div class="d-flex justify-content-between">
                <h4>{{ proj.ProjName }}</h4>
                <div class="">
                  <b-button v-b-toggle="'collap' + proj._id" variant="link">                     
                    <span class="when-open">
                      <b-icon icon="chevron-up"></b-icon>
                    </span>
                    <span class="when-closed">
                      <b-icon icon="chevron-down"></b-icon>
                    </span>
                  </b-button>
                </div>
              </div>
              <b-collapse :id="'collap' + proj._id">
                <project
                  v-bind:CvId="cvOne.cvId"
                  v-bind:project="proj"
                  v-bind:type="'item'"
                  @projSaved="toggleCollapse"
                ></project>
              </b-collapse>
            </b-card>
            <b-button @click="DeleteProjSubmit(proj._id)" variant="link"><b-icon icon="trash" ></b-icon></b-button>
          </div>
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
    ...mapActions(["deleteProj", "changeProj", "removeSection"]),
    SetSkillModalProp(type, id) {
      this.SkillModalItemType = type;
      this.SkillModalItemId = id;
    },
    DeleteProjSubmit: function (projid) {
      this.$bvModal
        .msgBoxConfirm("Please confirm that you want to delete everything."+projid, {
          title: "Please Confirm",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if(value){
            //this.deleteOrg(orgid);
            this.deleteProj(projid);
            //this.deleteExp(expid);
          }
      })
    },
    DragEnd() {
      this.drag = false;

      this.changeProj({ list: this.draglist, CvId: this.cvOne.cvId });
      console.log("drag end");
    },
    removeSectionBtn(section) {
      var data = {
        cvId: this.cvOne.cvId,
        section,
      };
      this.removeSection(data);
    },
    toggleCollapse() {
      this.$root.$emit("bv::toggle::collapse", "collapse-proj");
    },
  },
  mounted() {
    this.draglist = this.projects;
  },
};
</script>

<style></style>
