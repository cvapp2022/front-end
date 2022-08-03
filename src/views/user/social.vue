<template>
  <div></div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["LoginBySocial"]),
  },
  async mounted()  {
    var data = { social: this.$route.params.social, query: this.$route.query };
    await this.LoginBySocial(data).then((user)=>{

      //redirect to profile view 
      this.$router.push({ name: 'dashboard' })
      
      this.$socket.client.emit("USER_JOIN",user._id);
    });
  },
};
</script>

<style>
</style>