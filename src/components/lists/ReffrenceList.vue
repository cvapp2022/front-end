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
    <b-card
      class="my-3 p-2"
      v-for="(reff, index) in this.reffrences"
      v-bind:key="index"
    >
      <div class="d-flex justify-content-between">
        <h4>{{ reff.RefName }}</h4>
        <div class="">
          <b-button v-b-toggle="'collap' + reff._id"> colp </b-button>
          <b-button @click="DeleteRefSubmit(reff._id)" variant="danger"
            >Del</b-button
          >
        </div>
      </div>
      <b-collapse :id="'collap'+reff._id" >
      <reffrence
        v-bind:CvId="cvOne.cvId"
        v-bind:reffrence="reff"
        v-bind:type="'item'"
      ></reffrence>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions} from "vuex";
import reffrence from "../items/reffrence.vue";
export default {
  components: {
    reffrence,
  },
  computed: {
    ...mapGetters(["reffrences", "cvOne"]),
  },
  methods: {
    ...mapActions(["deleteRef"]),
    SetSkillModalProp(type, id) {
      this.SkillModalItemType = type;
      this.SkillModalItemId = id;
    },
    DeleteRefSubmit: function (reffid) {
      this.deleteRef(reffid);
    },
  },
};
</script>

<style></style>
