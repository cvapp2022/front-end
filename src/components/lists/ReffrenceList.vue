<template>
  <div class="">
    <b-card class="my-3 px-2">
      <b-row class="justify-content-between align-items-start">
        <h4 class="text-start card-title mb-4 p-1 font-weight-bold">
          Reffrence
        </h4>
        <b-button
          variant="link"
          class="font-weight-bold h5 text-dark"
          v-b-toggle.collapse-reff
        >
          + Add Reffrence</b-button
        >
        <b-button variant="danger" @click="removeSectionBtn('reffrences')"  >rm</b-button>
      </b-row>
      <b-row>
        <b-collapse id="collapse-reff" class="mt-2" style="flex: 1">
          <reffrence
            v-bind:CvId="cvOne.cvId"
            v-bind:type="'newItem'"
          ></reffrence>
        </b-collapse>
      </b-row>
    </b-card>
    <div class="mx-4">
      <draggable
        v-bind="dragOptions"
        handle=".handle"
        group="Reffrence"
        @start="drag = true"
        @end="DragEnd()"
        v-model="draglist"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <div class="" v-for="reff in this.draglist" v-bind:key="reff._id">
            <b-icon icon="justify" class="h1 handle"></b-icon>
            <b-card class="my-3 p-2">
              <div class="d-flex justify-content-between">
                <h4>{{ reff.RefName }}</h4>
                <div class="">
                  <b-button v-b-toggle="'collap' + reff._id"> colp </b-button>
                  <b-button @click="DeleteRefSubmit(reff._id)" variant="danger"
                    >Del</b-button
                  >
                </div>
              </div>
              <b-collapse :id="'collap' + reff._id">
                <reffrence
                  v-bind:CvId="cvOne.cvId"
                  v-bind:reffrence="reff"
                  v-bind:type="'item'"
                ></reffrence>
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
import reffrence from "../items/reffrence.vue";
import draggable from "vuedraggable";
export default {
  components: {
    reffrence,
    draggable,
  },
  computed: {
    ...mapGetters(["reffrences", "cvOne"]),
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
    reffrences() {
      console.log(" projects getter changes");
      this.draglist = this.reffrences;
    },
  },
  data() {
    return {
      drag: false,
      draglist: [],
    };
  },
  methods: {
    ...mapActions(["deleteRef", "changeReff","removeSection"]),

    SetSkillModalProp(type, id) {
      this.SkillModalItemType = type;
      this.SkillModalItemId = id;
    },
    DeleteRefSubmit: function (reffid) {
      this.deleteRef(reffid);
    },
    DragEnd() {
      this.drag = false;

      this.changeReff({ list: this.draglist, CvId: this.cvOne.cvId });
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
    this.draglist = this.reffrences;
  },
};
</script>

<style></style>
