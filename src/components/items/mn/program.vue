<template>
  <router-link
    class="text-decoration-none"
    :to="{ name: 'progamOne', params: { progOne: program._id } }"
  >
    <b-card no-body class="rounded-top">
      <img
        class="img-fluid rounded-top"
        src="@/assets/images/prog.jpg"
        :alt="program.ProgChilds[0].ChildName"
      />
      <div class="text-center m-2">
        <h4>{{ program.ProgChilds[0].ChildName }}</h4>
        <h4 v-if="checkRequests(program._id)" >has request </h4>
        <p class="text-dark">
          {{program.ProgChilds[0].ChildDesc}}
        </p>
      </div>
    </b-card>
  </router-link>
</template>

<script>

import { mapGetters } from 'vuex';
export default {
    props:['program'],
    computed:{
      ...mapGetters(['requests'])
    },
    methods:{
      checkRequests(progId){        
        return this.requests.find((item)=>{ return item.ReqProg._id ===progId})
      }
    }
};
</script>

<style>
</style>