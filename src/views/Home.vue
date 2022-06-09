<template>
  <div class="home">
    <h4>Home page</h4>

    <router-link to="profile"> my account eedd</router-link>
    <router-link to="login"> Login</router-link>
    <router-link :to="{ name: 'mentorLogin' }">Login as mentor</router-link>

    <br />

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {
  },
}



</script>
<style scoped >
</style>
