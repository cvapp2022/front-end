<template>
  <b-container>
    <b-tabs content-class="mt-3" class="my-3">
      <b-tab title="Resume" active>
        <b-row>
          <div class="docItem">
            <div class="d-flex-column">
              <img src="@/assets/images/document.jpg" />
              <div class="">
                <b-button variant="primary" @click="createCvBtn()">
                  Create new cv
                </b-button>
              </div>
            </div>
          </div>
          <div class="docItem" v-for="item in cv" v-bind:key="item._id">
            <div class="d-flex">
              <img src="@/assets/images/document.jpg" />
              <div class="d-flex flex-column mx-2">
                <router-link
                  :to="{ name: 'cvOne', params: { cvId: item._id } }"
                >
                  <h5>item title</h5>
                </router-link>
                <b-button variant="danger" @click="deleteCvBtn(item._id)">
                  Delete
                </b-button>
              </div>
            </div>
          </div>
        </b-row>
      </b-tab>
      <b-tab title="Cover Letter">
        <b-row>
          <div class="docItem">
            <div class="d-flex-column">
              <img src="@/assets/images/document.jpg" />
              <div class="">
                <b-button variant="primary" @click="createClBtn()"
                  >Create Cl
                </b-button>
              </div>
            </div>
          </div>
          <div class="docItem" v-for="item in cl" v-bind:key="item._id">
            <div class="d-flex">
              <img src="@/assets/images/document.jpg" />
              <div class="d-flex flex-column mx-2">
                <router-link :to ="{name:'clOne',params:{clId:item._id}}">
                  <h5>item title</h5>
                </router-link>
                <b-button variant="danger" @click="deleteClBtn(item._id)">
                  Delete
                </b-button>
              </div>
            </div>
          </div>
        </b-row>
      </b-tab>
      <b-tab title="Mentorship programs">
        <div class="docItem" v-for="item in programs" v-bind:key="item._id">
          <div class="d-flex">
            <img src="@/assets/images/document.jpg" />
            <div class="d-flex flex-column mx-2">
              <h6>
                <router-link
                  :to="{ name: 'progamOne', params: { progOne: item._id } }"
                >
                  More</router-link
                >
              </h6>
            </div>
          </div>
        </div>
      </b-tab>
      <b-tab title="Mentor requests">
        <b-card v-for="item in requests" v-bind:key="item._id">
          <h4>{{ item._id }}</h4>
          {{ item.ReqState }}
          <b-button
            v-if="item.ReqState === 'payment'"
            variant="primary"
            @click="PayReq(item._id)"
          >
            Pay</b-button
          >
          <router-link
            v-if="item.ReqState === 'applied' || item.ReqState === 'active'"
            :to="{ name: 'requestOne', params: { requestOne: item._id } }"
            class="btn btn-primary"
          >
            show mentorship</router-link
          >
          <!-- <b-button v-if="item.ReqState === 'applied' || item.ReqState ==='active'" variant="primary" >show mentorship</b-button> -->
        </b-card>
      </b-tab>
    </b-tabs>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  methods: {
    ...mapActions([
      "getClOne",
      "PayRequest",
      "createCv",
      "deleteCv",
      "createCl",
      "deleteCl"
    ]),

    ClOneClick(clid) {
      this.getClOne(clid);
    },
    PayReq(reqId) {
      this.PayRequest(reqId);
    },
    createCvBtn() {
      this.createCv();
    },
    deleteCvBtn(cvId) {
      this.deleteCv(cvId);
    },
    createClBtn() {
      this.createCl();
    },
    deleteClBtn(clId){
      this.deleteCl(clId)
    }
  },
  computed: {
    ...mapGetters(["cv", "cl", "programs", "requests"]),
  },
};
</script>

<style scoped>
.docItem .d-flex img {
  border: 1px red solid;
  border-radius: 8px;
}
</style>
