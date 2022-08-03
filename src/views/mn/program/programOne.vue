<template>
  <b-container fluid>
    <b-row style="height: 91vh">
      <b-col sm="7">
        <div class="d-flex flex-column m-5 w-50">
          <h4 class="font-weight-bolder">
            Join Online Test mentorship Program
          </h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
            voluptas odit optio sapiente qui rerum porro magni hic, commodi sint
            iure fuga animi necessitatibus reiciendis ducimus distinctio
            excepturi blanditiis nostrum! Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Itaque maiores omnis maxime, minima
            excepturi dolore veritatis dicta quasi dolores corrupti quisquam
            accusantium quod ex illo rem consequatur officiis? Ducimus, ipsum.
          </p>
          <router-link
            :to="{
              name: 'progamEnroll',
              params: { progOne: this.$route.params.progOne },
            }"
            class="btn btn-primary"
          >
            {{ $t("enrollToProgram") }}
          </router-link>
        </div>
      </b-col>
      <b-col sm="5" class="px-0">
        <img class="img-fluid h-100" src="@/assets/images/prog.jpg" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {};
</script>

<style>
</style>