<template>
    <b-container>
        <b-row class="my-4">
            <div class="page_title">
                <h2 class="font-weight-bolder">Your Services Requests</h2>
                <p class="text-muted">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
                sapiente inventore autem, suscipit obcaecati ex laboriosam et
                </p>
            </div>
        </b-row>
        <b-row class="my-4">
            <b-col sm="12" v-for="item in servRequests" v-bind:key="item._id">
                <servRequest :request="item" :type="'service'"/>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>

import servRequest from '../../components/items/servRequest.vue'
import { mapGetters,mapActions } from "vuex";
export default {
  components:{
    servRequest
  },
    methods:{
    ...mapActions(['getServRequests'])
  },
  mounted() {
    //get requests
    // this.getServRequests();
  },
computed: {
    ...mapGetters(["servRequests"]),
  },
}
</script>

<style>

</style>