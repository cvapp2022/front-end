<template>
  <b-container>
    <b-tabs content-class="mt-3" class="my-3">
      <b-tab title="Resume" active>
        <div class="docItem" v-for="item in cv" v-bind:key="item._id">
          <div class="d-flex">
            <img src="@/assets/images/document.jpg" />
            <div class="d-flex flex-column mx-2">
              <a href="#" @click="CvOneClick(item._id)">
                <h5>item title</h5>
              </a>
              <h6><span></span> Delete</h6>
            </div>
          </div>
        </div>
      </b-tab>
      <b-tab title="Cover Letter">
        <div class="docItem" v-for="item in cl" v-bind:key="item._id">
          <div class="d-flex">
            <img src="@/assets/images/document.jpg" />
            <div class="d-flex flex-column mx-2">
              <a href="#" @click="ClOneClick(item._id)">
                <h5>item title</h5>
              </a>
              <h6><span></span> Delete</h6>
            </div>
          </div>
        </div>
      </b-tab>
    </b-tabs>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  methods: {
    ...mapActions(["getCvOne", "getClOne"]),
    CvOneClick(cvid) {
      this.getCvOne(cvid);
    },
    ClOneClick(clid) {
      this.getClOne(clid);
    },
  },
  computed: {
    ...mapGetters(["cv", "cl"]),
  },
};
</script>

<style scoped>
.docItem .d-flex img {
  border: 1px red solid;
  border-radius: 8px;
}
</style>
