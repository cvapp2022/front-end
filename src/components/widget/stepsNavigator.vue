<template>
  <div class="d-flex justify-content-around my-4 ">
    <router-link :to="prev" class="btn btn-link">Pervious</router-link>
    <router-link :to="next" class="btn btn-primary">Next</router-link>
  </div>
</template>

<script>
export default {
    props:['prev','next']
}
</script>

<style>

</style>