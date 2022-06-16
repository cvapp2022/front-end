<template>
  <div class="">
    <b-card class="my-3 px-2">
      <b-row class="justify-content-between align-items-start">
        <h4 class="text-start card-title mb-4 p-1 font-weight-bold">
          Experiance
        </h4>
        <b-button
          variant="link"
          class="font-weight-bold h5 text-dark"
          v-b-toggle.collapse-exp
        >
          + Add Experiance</b-button
        >
        <b-button variant="danger" @click="removeSectionBtn('experiences')"  >rm</b-button>
      </b-row>
      <b-row>
        <b-collapse id="collapse-exp" class="mt-2" style="flex: 1">
          <experiance
            v-bind:CvId="cvOne.cvId"
            v-bind:type="'newItem'"
          ></experiance>
        </b-collapse>
      </b-row>
    </b-card>
    <div class="mx-4">
      <draggable
        v-bind="dragOptions"
        handle=".handle"
        group="Experiences"
        @start="drag = true"
        @end="DragEnd()"
        v-model="draglist"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <div v-for="exp in this.draglist" v-bind:key="exp._id">
            <b-icon icon="justify" class="h1 handle"></b-icon>
            <b-card class="my-3 p-2">
              <div class="d-flex justify-content-between">
                <h4>{{ exp.ExpTitle }}</h4>
                <div class="">
                  <b-button v-b-toggle="'collap' + exp._id"> colp </b-button>
                  <b-button @click="DeleteExpSubmit(exp._id)" variant="danger"
                    >Del</b-button
                  >
                </div>
              </div>
              <b-collapse :id="'collap' + exp._id">
                <experiance
                  v-bind:CvId="cvOne.cvId"
                  v-bind:experiance="exp"
                  v-bind:type="'item'"
                  @setModalProp="SetSkillModalProp('experiance', exp._id)"
                ></experiance>
              </b-collapse>
            </b-card>
          </div>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import experiance from "../items/experiance.vue";
import draggable from "vuedraggable";
export default {
  components: {
    experiance,
    draggable,
  },
  computed: {
    ...mapGetters(["experiances", "cvOne"]),
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
    experiances() {
      console.log(" experiances getter changes");
      this.draglist = this.experiances;
    },
  },
  data() {
    return {
      drag: false,
      draglist: [],
    };
  },
  methods: {
    ...mapActions(["deleteExp", "changeExp","removeSection"]),
    SetSkillModalProp(type, id) {
      this.SkillModalItemType = type;
      this.SkillModalItemId = id;
    },
    DeleteExpSubmit: function (expid) {
      this.deleteExp(expid);
    },
    DragEnd() {
      this.drag = false;

      this.changeExp({ list: this.draglist, CvId: this.cvOne.cvId });
      console.log("drag end");
    },
    removeSectionBtn(section) {
      var data = {
        cvId: this.cvOne.cvId,
        section,
      };
      this.removeSection(data);
    },
  },
  mounted() {
    this.draglist = this.experiances;
  },
};
</script>

<style>
.handle {
  float: left;
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>
