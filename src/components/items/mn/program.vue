<template>
  <router-link
    class="text-decoration-none"
    :to="{ name: 'progamOne', params: { progOne: program._id } }"
  >
    <b-card no-body class="rounded-top">
      <img
        class="img-fluid rounded-top"
        src="@/assets/images/prog.jpg"
        :alt="program.ProgName"
      />
      <div class="text-center m-2">
        <h4>{{ program.ProgName }}</h4>
        <h4 v-if="checkRequests(program._id)" >has request </h4>
        <p class="text-dark">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis,
          eaque. Voluptates dolorem iste reiciendis vero? Iusto vel distinctio
          ipsam eligendi porro provident repellat velit explicabo, sit, aut
          error temporibus sapiente!
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