<template>
  <b-container>
    <b-row class="my-4">
      <div class="page_title">
        <h2 class="font-weight-bolder">Your Dashboard</h2>
        <p class="text-muted">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
          sapiente inventore autem, suscipit obcaecati ex laboriosam et
        </p>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  computed:{
    ...mapGetters(['User'])
  },
  mounted(){
    //this.$socket.client.emit("USER_JOIN",this.User)
  }
};
</script>

<style>
</style>