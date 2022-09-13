<template>
  <b-card>
    <h4 class="text-start card-title mb-4 p-1 font-weight-bold">Templates</h4>
    <b-row>
      <b-button
        variant="primary"
        v-for="item in cvTemplates"
        v-bind:key="item._id"
        @click="setTemplateBtn(item._id)"
      >
        {{ item.TemplateName }}
      </b-button>
    </b-row>
  </b-card>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(['setCvTemplate']),
    setTemplateBtn(templateId) {
      var data = {
        cvId: this.cvOne.cvId,
        templateId,
      };
      this.setCvTemplate(data).then(()=>{
        this.$emit('templateChanged')
      });
    },
  },
  computed:{
    ...mapGetters(['cvOne','cvTemplates'])
  }
};
</script>

<style>
</style>