<template>
  <b-container>
    <b-row class="my-4">
      <div class="page_title">
        <h2 class="font-weight-bolder">Your Educations</h2>
        <p class="text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid laudantium veritatis ab libero sint dolor ea distinctio cum eaque sit consequuntur illum itaque minus, a deserunt eos soluta corporis consequatur.</p>
      </div>
    </b-row>
    <b-row>
      <EducationList  class="col-12"></EducationList>
    </b-row>
    <b-row>
      <stepsNavigator  class="col-12" v-bind:next="{name:'cvStepTemplates'}" v-bind:prev="{name:'cvStepExperiences'}" ></stepsNavigator>
    </b-row>
  </b-container>
</template>

<script>
import EducationList from '../../../components/lists/EducationList.vue';
import stepsNavigator from '../../../components/widget/stepsNavigator.vue';
import {mapGetters,mapActions} from 'vuex';
import _ from 'lodash';
export default {
  components:{
    EducationList,
    stepsNavigator
  },
  computed:{
    ...mapGetters(['cvOne'])
  },
  methods:{
    ...mapActions(['getCvOne'])
  },
  mounted(){
    if(_.isEmpty(this.cvOne)){
      this.getCvOne(this.$route.params.cvId)
    }
  }
}
</script>

<style>

</style>