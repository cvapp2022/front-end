<template>
  <b-container>
    <b-row class="my-4">
      <div class="page_title">
        <h2 class="font-weight-bolder">Your Skills</h2>
        <p class="text-muted">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          laudantium veritatis ab libero sint dolor ea distinctio cum eaque sit
          consequuntur illum itaque minus, a deserunt eos soluta corporis
          consequatur.
        </p>
      </div>
    </b-row>
    <b-row>
      <SkillList class="col-12"></SkillList>
    </b-row>
    <b-row>
      <stepsNavigator
        class="col-12"
        v-bind:next="{ name: 'cvStepExperiences' }"
        v-bind:prev="{ name: 'cvStepInfo' }"
      ></stepsNavigator>
    </b-row>
    <SkillModal :CvId="this.cvOne.cvId"></SkillModal>
  </b-container>
</template>

<script>
import SkillList from "../../../components/lists/SkillList.vue";
import SkillModal from "../../../components/widget/skillModal.vue";
import stepsNavigator from "../../../components/widget/stepsNavigator.vue";
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";
export default {
  components: {
    SkillList,
    stepsNavigator,
    SkillModal,
  },
  computed: {
    ...mapGetters(["cvOne"]),
  },
  methods: {
    ...mapActions(["getCvOne"]),
  },
  mounted() {
    if (_.isEmpty(this.cvOne)) {
      this.getCvOne(this.$route.params.cvId);
    }
  },
};
</script>

<style>
</style>