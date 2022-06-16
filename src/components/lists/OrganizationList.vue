<template>
  <div class="">
    <b-card class="my-3 px-2">
      <b-row class="justify-content-between align-items-start">
        <h4 class="text-start card-title mb-4 p-1 font-weight-bold">
          Organization
        </h4>
        <b-button
          variant="link"
          class="font-weight-bold h5 text-dark"
          v-b-toggle.collapse-org
        >
          + Add Organization</b-button
        >
        <b-button variant="danger" @click="removeSectionBtn('organizations')"  >rm</b-button>
      </b-row>
      <b-row>
        <b-collapse id="collapse-org" class="mt-2" style="flex: 1">
          <organization
            v-bind:CvId="cvOne.cvId"
            v-bind:type="'newItem'"
          ></organization>
        </b-collapse>
      </b-row>
    </b-card>
    <div class="mx-4">
      <draggable
        v-bind="dragOptions"
        handle=".handle"
        group="Organization"
        @start="drag = true"
        @end="DragEnd()"
        v-model="draglist"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <div class="" v-for="org in this.draglist" v-bind:key="org._id">
            <b-icon icon="justify" class="h1 handle"></b-icon>
            <b-card class="my-3 p-2">
              <div class="d-flex justify-content-between">
                <h4>{{ org.OrgTitle }}</h4>
                <div class="">
                  <b-button v-b-toggle="'collap' + org._id"> colp </b-button>
                  <b-button @click="DeleteOrgSubmit(org._id)" variant="danger"
                    >Del</b-button
                  >
                </div>
              </div>
              <b-collapse :id="'collap' + org._id">
                <organization
                  v-bind:CvId="cvOne.cvId"
                  v-bind:organization="org"
                  v-bind:type="'item'"
                ></organization>
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
import organization from "../items/organization.vue";
import draggable from "vuedraggable";
export default {
  components: {
    organization,
    draggable,
  },
  computed: {
    ...mapGetters(["organizations", "cvOne"]),
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
    organizations() {
      console.log(" organizations getter changes");
      this.draglist = this.organizations;
    },
  },
  data() {
    return {
      drag: false,
      draglist: [],
    };
  },
  methods: {
    ...mapActions(["deleteOrg", "changeOrg","removeSection"]),
    SetSkillModalProp(type, id) {
      this.SkillModalItemType = type;
      this.SkillModalItemId = id;
    },
    DeleteOrgSubmit: function (orgid) {
      this.deleteOrg(orgid);
    },
    DragEnd() {
      this.drag = false;
      this.changeOrg({ list: this.draglist, CvId: this.cvOne.cvId });
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
    this.draglist = this.organizations;
  },
};
</script>

<style></style>
