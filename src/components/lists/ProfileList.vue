<template>
  <b-card class="my-3">
    <h4 class="text-start card-title mb-4 p-1 font-weight-bold">
      {{ $t("Profile") }}
    </h4>
    <b-form class="row">
      <b-col cols="12" sm="12" class="my-2">
        <vue-editor v-model="profileForm.profileI" :editorToolbar="customToolbar">
        </vue-editor>
      </b-col>
      <b-col cols="12" sm="6">
        <b-form-group
          id="cv-img-group"
          label="Image profile:"
          label-for="cv-img"
          description="max 8 MB"
        >
          <b-form-file
            id="cv-img"
            size="large"
            accept="image/jpeg, image/png, image/gif"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
          ></b-form-file>
        </b-form-group>
      </b-col>
      <b-col cols="12" sm="6">
        <b-form-group
          id="full-name-group"
          label="Full name:"
          label-for="full-name-input"
        >
          <b-form-input
            id="full-name-input"
            size="large"
            placeholder="Enter your full name"
            v-model="profileForm.fullNameI"
            required
          ></b-form-input>
        </b-form-group>
      </b-col>

      <b-col cols="12" sm="6">
        <b-form-group
          id="position-input-group"
          label="Job:"
          label-for="position-input"
        >
          <vSelect
            id="position-input"
            :options="positionOptions"
            v-model="profileForm.positionI"
            @option:selected="positionUpdated"
          ></vSelect>
        </b-form-group>
      </b-col>

      <b-col cols="12" sm="6">
        <b-form-group
          id="address-input-group"
          label="Address:"
          label-for="address-input"
        >
          <b-form-input
            id="address-input"
            placeholder="Enter Your Address"
            v-model="profileForm.addressI"
            required
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-form>
  </b-card>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
import vSelect from "vue-select";
import axios from "axios";
import _ from 'lodash';
import "vue-select/dist/vue-select.css";
import { VueEditor } from "vue2-editor";
export default {
  computed: {
    ...mapGetters(["cvOne"]),
  },
  data() {
    return {
      profileForm: {
        addressI: "",
        positionI: "",
        fullNameI: "",
        profileI: "",
        CvNameI:""
      },
      positionRepo: [],
      positionOptions: [],
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" },
        ],
        [{ color: [] }],
      ],
      updateable: false,
    };
  },
  components: {
    vSelect,
    VueEditor,
  },
  methods: {
    ...mapActions(['updateCV']),
    positionUpdated() {
      //update user position
      console.log("position updated");
      //this.updateCV(this.form)
    },
    updateProfileWatch:_.debounce(function(){
      console.log('watch triggerd')
      this.updateCV({cvId:this.cvOne.cvId,data:this.profileForm}).then(()=>{
        this.$emit('profileUpdated')
      });
    },3000)
  },
  async mounted() {
    //get skills Repo
    var url = process.env.VUE_APP_BASEURL + "/repo/position/";
    await axios.get(url).then((resp) => {
      if (resp.data.success) {
        this.positionRepo = resp.data.payload;
      }
    });
    this.positionRepo.forEach((element) => {
      this.positionOptions.push({label:element["PositionName"],value:element["_id"]});
    });

    // //set values
    if(!_.isEmpty(this.cvOne)){
      this.profileForm.CvNameI=this.cvOne.cvName;
      this.profileForm.addressI=this.cvOne.cvAddress;
      this.profileForm.fullNameI=this.cvOne.cvFullName;
      this.profileForm.profileI=this.cvOne.cvProfile;
      if(!_.isEmpty(this.cvOne.cvPosition)){
        this.profileForm.positionI=this.cvOne.cvPosition.PositionName
      }
    }
    this.$watch('profileForm',(newValue)=>this.updateProfileWatch(newValue),{deep:true})  
  }
};
</script>

<style>
</style>