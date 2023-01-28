<template>
  <router-link
    class="text-decoration-none"
    :to="{ name: 'serviceOne', params: { serviceOne: service._id } }"
  >
    
    <b-card no-body class="rounded-top">
      <img
        class="img-fluid rounded-top"
        :src="' https://drive.google.com/thumbnail?authuser=0&sz=w320&id='+service.ServImg"
        :alt="service.ServChilds[0].ChildName"
      />
      <div class="text-center m-2 mb-4">
        <h4>{{ service.ServChilds[0].ChildName }}</h4>
        <!-- <h4 v-if="checkRequests(service._id)" >has request </h4> -->
        <p class="text-dark">
          {{service.ServChilds[0].ChildDesc}}
        </p>
        <b-button variant="primary">Order Now</b-button>
      </div>
    </b-card>
  </router-link>
</template>

<script>

// import { mapGetters } from 'vuex';
export default {
    props:['service'],
    computed:{
      // ...mapGetters(['requests'])
    },
    methods:{
      // checkRequests(servId){        
      //   // return this.requests.find((item)=>{ return item.ReqProg._id ===servId})
      // }
    }
};
</script>

<style>
</style>