<template>
    <div class="">
      <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item active-class="active" :to='{ name:"dashboard" }'>Dashboard</b-nav-item>
          <b-nav-item active-class="active" :to='{ name:"resumes"}'>resumes</b-nav-item>
          <b-nav-item active-class="active" :to='{ name:"coverLetters" }' >cover letters</b-nav-item>
          <b-nav-item active-class="active" :to='{ name:"requests" }' >Mentoring</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>