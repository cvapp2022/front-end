<template>
  <b-container fluid="md" class="hfull">
    <div class="">
      <!-- Personal Details Card Start -->
      <b-card class="my-3">
        <h4 class="text-start card-title mb-4 p-1 font-weight-bold">
          Personal Details
        </h4>

        <b-form class="row">
          <b-col cols="12" sm="6">
            <b-form-group
              id="cl-fullname-group"
              label="Full Name:"
              label-for="cl-fullname"
            >
              <b-form-input
                id="cl-fullname"
                size="large"
                type="text"
                v-model="clForm.CLFullNameI"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col cols="12" sm="6">
            <b-form-group
              id="cl-job-group"
              label="Job position:"
              label-for="cl-job"
            >
              <b-form-input
                id="cl-job"
                size="large"
                type="text"
                v-model="clForm.CLJobI"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col cols="12" sm="6">
            <b-form-group
              id="cl-address-group"
              label="Address:"
              label-for="cl-address"
            >
              <b-form-input
                id="cl-address"
                size="large"
                type="text"
                v-model="clForm.CLAddressI"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="6">
            <b-form-group
              id="cl-phone-group"
              label="Phone:"
              label-for="cl-phone"
            >
              <b-form-input
                id="cl-phone"
                size="large"
                type="text"
                v-model="clForm.CLPhoneI"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="6">
            <b-form-group id="cl-mail-group" label="Mail:" label-for="cl-mail">
              <b-form-input
                id="cl-mail"
                size="large"
                type="email"
                v-model="clForm.CLMailI"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-form>
      </b-card>

      <!-- Employer Details Card Start  -->
      <b-card class="my-3">
        <h4 class="text-start card-title mb-4 p-1 font-weight-bold">
          Employer Details
        </h4>

        <b-form class="row">
          <b-col cols="12" sm="6">
            <b-form-group
              id="cl-hr-group"
              label="Hiring staf:"
              label-for="cl-hr"
            >
              <b-form-input
                id="cl-hr"
                size="large"
                type="text"
                v-model="clForm.CLCmpHrNameI"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col cols="12" sm="6">
            <b-form-group
              id="cl-cmp-group"
              label="Company :"
              label-for="cl-cmp"
            >
              <b-form-input
                id="cl-cmp"
                size="large"
                type="text"
                v-model="clForm.CLCmpNameI"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-form>
      </b-card>

      <!-- Cover Lettter Details Start card -->
      <b-card class="my-3">
        <h4 class="text-start card-title mb-4 p-1 font-weight-bold">
          Cover Letter Body
        </h4>

        <b-form class="row">
          <b-col cols="12" sm="12">
            <b-form-group
              id="cl-body"
              label="Cover Letter Content"
              label-for="cl-body"
            >
              <b-textarea
                id="cl-body"
                v-model="clForm.CLBodyI"
                type="date"
                aria-describedby="cl-body-live-feedback"
                rows="6"
              >
              </b-textarea>
            </b-form-group>
          </b-col>
        </b-form>
      </b-card>
    </div>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";

export default {
  data() {
    let clFormVal = {
      ClNameI: "",
      CLFullNameI: "",
      CLJobI: "",
      CLCmpHrNameI: "",
      CLCmpNameI: "",
      CLMailI: "",
      CLPhoneI: "",
      CLAddressI: "",
      CLBodyI: "",
    };

    return {
      clForm: clFormVal,
      updateable: false,
    };
  },

  computed: {
    ...mapGetters(["clOne"]),
  },

  watch: {
    clForm: {
      handler(newVal) {
        console.log("changed");
        //debounce
        if (this.updateable) {
          this.updateClWatch(newVal);
        }
        this.updateable = true;
      },
      deep: true,
    },
    clOne:{
      handler(newVal){
      //clear form
      this.clForm={};

      //update form
      this.clForm.ClNameI = newVal.CLName;
      this.clForm.CLFullNameI = newVal.CLFullName;
      this.clForm.CLJobI = newVal.CLJob;
      this.clForm.CLCmpHrNameI = newVal.CLCmpHrName;
      this.clForm.CLCmpNameI = newVal.CLCmpName;
      this.clForm.CLMailI = newVal.CLMail;
      this.clForm.CLPhoneI = newVal.CLPhone;
      this.clForm.CLAddressI = newVal.CLAddress;
      this.clForm.CLBodyI = newVal.CLBody;

      }
    }

  },
  mounted() {
    this.clForm={};
    this.getClOne(this.$route.params.clId);
      // this.clForm.ClNameI = this.clOne.CLName;
      // this.clForm.CLFullNameI = this.clOne.CLFullName;
      // this.clForm.CLJobI = this.clOne.CLJob;
      // this.clForm.CLCmpHrNameI = this.clOne.CLCmpHrName;
      // this.clForm.CLCmpNameI = this.clOne.CLCmpName;
      // this.clForm.CLMailI = this.clOne.CLMail;
      // this.clForm.CLPhoneI = this.clOne.CLPhone;
      // this.clForm.CLAddressI = this.clOne.CLAddress;
      // this.clForm.CLBodyI = this.clOne.CLBody;
  },

  methods: {
    ...mapActions(["updateCl", "getClOne"]),
    updateClWatch: _.debounce(function (newVal) {
      console.log("updated", newVal);
      var data = {
        clid: this.clOne._id,
        data: newVal,
      };
      this.updateCl(data);
    }, 6000),
  },
};
</script>

<style></style>
