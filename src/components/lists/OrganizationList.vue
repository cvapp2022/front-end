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
    <b-card
      class="my-3 p-2"
      v-for="org in this.organizations"
      v-bind:key="org._id"
    >
      <div class="d-flex justify-content-between">
        <h4>{{ org.OrgTitle }}</h4>
        <div class="">
          <b-button v-b-toggle="'collap' + org._id"> colp </b-button>
          <b-button @click="DeleteOrgSubmit(org._id)" variant="danger"
            >Del</b-button
          >
        </div>
      </div>
      <b-collapse :id="'collap'+org._id" > 
      <organization
        v-bind:CvId="cvOne.cvId"
        v-bind:organization="org"
        v-bind:type="'item'"
      ></organization>

      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
import organization from "../items/organization.vue";
export default {
  components: {
    organization,
  },
  computed: {
    ...mapGetters(["organizations", "cvOne"]),
  },
  methods: {
    ...mapActions(["deleteOrg"]),
    SetSkillModalProp(type, id) {
      this.SkillModalItemType = type;
      this.SkillModalItemId = id;
    },
        DeleteOrgSubmit:function(orgid){
      this.deleteOrg(orgid)
    }
  },
};
</script>

<style></style>
