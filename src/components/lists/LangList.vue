<template>
  <div class="mb-3">
    <b-card>
      <h4 class="text-start card-title mb-4 p-1 font-weight-bold">Languages</h4>
      <b-select :options="langList" v-model="langVal"></b-select>
    </b-card>
  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["cvOne"]),
  },
  methods:{
    ...mapActions(['setCvLang'])
  },
  watch:{
    langVal(Val){
        console.log(Val)
        if(Val){
            //update cv lang
            var data = {
            cvId: this.cvOne.cvId,
            lang:Val,
            }
            this.setCvLang(data).then(()=>{
                this.$emit('langChanged')
            })
        }
    }
  },
  data() {
    return {
      langVal: "ar",
      langList: [
        {
          text: "العربية",
          value: "ar",
        },
        {
          text: "English",
          value: "en",
        },
      ],
    };
  },
  mounted() {
    this.langVal = this.cvOne.cvLang;
  },
};
</script>

<style>
</style>