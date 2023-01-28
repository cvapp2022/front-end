<template>
  <div class="">
    <b-card class="my-3 p-2">
      <b-row classs="justify-content-between align-items-start">
        <h4 class="text-start card-title mb-4 p-1 font-weight-bold">
          Social Media
        </h4>
      </b-row>
      <b-form>
        <b-row>
          <!-- mail input -->
          <b-col cols="12" sm="6" class="my-2">
            <b-input-group>
              <b-input-group-prepend is-text>
                <b-icon icon="mailbox2"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                id="input-mail"
                size="large"
                placeholder="Enter email"
                v-model="mail"
              ></b-form-input>
            </b-input-group>
          </b-col>

          <!-- LinkedIn input -->
          <b-col cols="12" sm="6" class="my-2">
            <b-input-group>
              <b-input-group-prepend is-text>
                <b-icon icon="linkedin"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                id="input-linkedin"
                size="large"
                placeholder="Enter linkedin"
                v-model="linkedin"
              ></b-form-input>
            </b-input-group>
          </b-col>
        </b-row>

        <b-row>
          <!-- facebook input -->
          <b-col cols="12" sm="6" class="my-2">
            <b-input-group>
              <b-input-group-prepend is-text>
                <b-icon icon="facebook"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                id="input-facebook"
                size="large"
                placeholder="Enter Facebook"
                v-model="facebook"
              ></b-form-input>
            </b-input-group>
          </b-col>

          <!-- Twitter input -->
          <b-col cols="12" sm="6" class="my-2">
            <b-input-group>
              <b-input-group-prepend is-text>
                <b-icon icon="twitter"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                id="input-twitter"
                size="large"
                placeholder="Enter Twitter"
                v-model="twitter"
              ></b-form-input>
            </b-input-group>
          </b-col>
        </b-row>

        <b-row>
          <!-- Google input -->
          <b-col cols="12" sm="6" class="my-2">
            <b-input-group>
              <b-input-group-prepend is-text>
                <b-icon icon="google"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                id="input-google"
                size="large"
                placeholder="Enter Google"
                v-model="google"
              ></b-form-input>
            </b-input-group>
          </b-col>
          <!-- Github Input -->
          <b-col cols="12" sm="6" class="my-2">
            <b-input-group>
              <b-input-group-prepend is-text>
                <b-icon icon="github"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                id="input-github"
                size="large"
                placeholder="Enter Github"
                v-model="github"
              ></b-form-input>
            </b-input-group>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";

export default {
  data() {
    return {
      mail: "",
      facebook: "",
      twitter: "",
      linkedin: "",
      google: "",
      github: "",

      updateable: false,
    };
  },
  computed: {
    ...mapGetters(["cvOne", "contacts"]),
  },
  methods: {
    ...mapActions(["updateSocial"]),
    getVal(field) {
      if(!_.isEmpty(this.contacts) && this.contacts.length > 0){
        var contactKey = this.contacts.findIndex((obj) => {
          return obj.CKey === field;
        });
        return this.contacts[contactKey]
      }
    },
    handleWatch: _.debounce(function (name) {
      if(this.updateable){
        var data = {
          ContactNameI:name,
          ContactValI:this.$data[name],
          CvIdI:this.cvOne.cvId
        }
        this.updateSocial(data)
      }

      this.updateable=true;

      
    },650),
  },
  watch: {
    mail: {
      handler() {
        this.handleWatch("mail");
      },
      deep: true,
    },
    facebook: {
      handler() {
        this.handleWatch("facebook");
      },
      deep: true,
    },
    twitter: {
      handler() {
        this.handleWatch("twitter");
      },
      deep: true,
    },
    linkedin: {
      handler() {
        this.handleWatch("linkedin");
      },
      deep: true,
    },
    google: {
      handler() {
        this.handleWatch("google");
      },
      deep: true,
    },
    github: {
      handler() {
        this.handleWatch("github");
      },
      deep: true,
    },
  },
  mounted() {
    //fil inputs
    this.facebook = this.getVal("facebook").CValue;
    this.twitter = this.getVal("twitter").CValue;
    this.github = this.getVal("github").CValue;
    this.linkedin = this.getVal("linkedin").CValue;
    this.mail=this.getVal("mail").CValue
    this.google=this.getVal("google").CValue
  },
};
</script>

<style></style>
