<template>
  <b-container fluid="md" class="hfull">
    <div class="">
      <!-- Cover-Letter Template Card Start -->
      <b-card class="my-3" >
        <h4 class="text-start card-title mb-4 p-1 font-weight-bold">
         Templates
        </h4>
        <b-row>
          <b-button 
            variant="primary"
            v-for="item in clTemplates"
            v-bind:key="item._id"
            @click="setTemplateBtn(item._id)"
          >
            {{item.TemplateName}}
          </b-button>
        </b-row>
      </b-card>

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

  data(){
    return {
      clForm: {
        ClNameI: "",
        CLFullNameI: "",
        CLJobI: "",
        CLCmpHrNameI: "",
        CLCmpNameI: "",
        CLMailI: "",
        CLPhoneI: "",
        CLAddressI: "",
        CLBodyI: "",
      },
      updateable:false
    }
  },
  computed:{
    ...mapGetters(['clTemplates','clOne']),
  },
  methods:{
    ...mapActions(['getClOne','updateCl','setClTemplate']),
    setTemplateBtn(templateId){
      var data = {
        clId:this.clOne._id,
        templateId
      }
      this.setClTemplate(data)
    },
    updateClWatch: _.debounce(function (newVal) {
      var data = {
        clid: this.clOne._id,
        data: newVal,
      };
      this.updateCl(data);
    },6000),
  
  },
  async mounted(){
    console.log(this.$route.params.clId)
      await this.getClOne(this.$route.params.clId)
      this.$store.subscribe((mutation) => {
        if(mutation.type === 'clOne'){
          if(!this.updateable){
            this.clForm.ClNameI =mutation.payload.CLName;
            this.clForm.CLFullNameI =mutation.payload.CLFullName;
            this.clForm.CLJobI =mutation.payload.CLJob;
            this.clForm.CLCmpHrNameI =mutation.payload.CLCmpHrName;
            this.clForm.CLCmpNameI = mutation.payload.CLCmpName;
            this.clForm.CLMailI =mutation.payload.CLMail;
            this.clForm.CLPhoneI =mutation.payload.CLPhone;
            this.clForm.CLAddressI =mutation.payload.CLAddress;
            this.clForm.CLBodyI =mutation.payload.CLBody;
            this.updateable=true;
          }
        }
      })
  },

  watch:{
    clForm:{
      handler(newVal){
        if(this.updateable){
          this.updateClWatch(newVal)
        }
      },
      deep:true
    }
  }
}
</script>

<style></style>
