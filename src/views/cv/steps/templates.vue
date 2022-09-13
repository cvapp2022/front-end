<template>
  <b-container>
    <b-row class="my-4">
      <div class="page_title">
        <h2 class="font-weight-bolder">Your Resume template</h2>
        <p class="text-muted">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          laudantium veritatis ab libero sint dolor ea distinctio cum eaque sit
          consequuntur illum itaque minus, a deserunt eos soluta corporis
          consequatur.
        </p>
      </div>
    </b-row>
    <b-row>
      <langList class="col-12"></langList>
    </b-row>
    <b-row>
      <TemplateList class="col-12"></TemplateList>
    </b-row>
    <b-row>
      <stepsNavigator
        class="col-12"
        v-bind:next="{
          name: 'cvPerview',
          params: { cvId: this.$route.params.cvId },
        }"
        v-bind:prev="{ name: 'cvStepEducations' }"
      ></stepsNavigator>
    </b-row>
  </b-container>
</template>

<script>
import TemplateList from "../../../components/lists/TemplateList.vue";
import langList from '../../../components/lists/LangList.vue'
import stepsNavigator from "../../../components/widget/stepsNavigator.vue";
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";
export default {
  components: {
    TemplateList,
    langList,
    stepsNavigator,
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