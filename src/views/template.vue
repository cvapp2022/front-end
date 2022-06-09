<template>
<div class="">
    <naron v-if="!loading && templateName==='naron' " ></naron>
    <sophia v-if="!loading && templateName==='sophia' "></sophia>
    <jane v-if="!loading && templateName==='jane' "></jane>
    <doe v-if="!loading && templateName==='doe' "></doe>
</div>
</template>

<script>

import { mapGetters, mapActions } from "vuex";

import naron from "../components/templates/naron/naron.vue";
import sophia from "../components/templates/sophia/sophia.vue";
import jane from "../components/templates/jane/jane.vue";
import doe from "../components/templates/doe/doe.vue";

export default {
  components: {
    naron,
    sophia,
    jane,
    doe,
  },
  data() {
    return {
      loading: true,
      templateName:null,
    };
  },
  computed: {
    ...mapGetters(["cvOne"]),
  },
  methods: {
    ...mapActions(["getCvOne"]),
  },
  mounted() {
    var templateArr = ["naron", "sophia", "jane", "doe"];
    if ( templateArr.some(item => item === this.$route.params.template)) {
        console.log('templte in arr')
        //get cvOne
        this.getCvOne(this.$route.params.cvid);
        this.loading=false;
        this.templateName=this.$route.params.template;
    } else {
      //redirect to 4040
       console.log('templte not in arr')
    }
  },
};
</script>

<style>
</style>