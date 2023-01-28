<template>
  <div class="d-flex w-100 border-bottom mt-4">
    <router-link class="mx-2 py-1" :to="{ name: 'resumes' }" >Resumes</router-link>
    <router-link class="mx-2 py-1" :to="{ name: 'coverLetters' }" >Cover letters</router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  a.mx-2{
    text-decoration: none !important;
    /* font-size: 20px !important; */
    color: black !important;
  }
  a.mx-2:hover{
    color:var(--primary) !important
  }
  .mx-2.router-link-exact-active.router-link-active{

    border-bottom:2px var(--primary) solid;
  }
</style>