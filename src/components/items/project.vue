<template>
    <validation-observer ref="observer" v-slot="{ handleSubmit }">
    <b-form @submit.prevent="handleSubmit(ProjSubmit)" class="row">
        
        <!-- Project name -->
        <b-col cols="12" sm="6">
            <validation-provider
            name="Project name "
            :rules="{ required: true}"
            v-slot="validationContext"
            >
            <b-form-group id="proj-name" label="Project name" label-for="proj-name-input">
                <b-form-input
                id="proj-name-input"
                name="proj-name-input"
                v-model="ProjForm.ProjNameI"
                :state="getValidationState(validationContext)"
                aria-describedby="proj-name-live-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="proj-name-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </b-form-group>
            </validation-provider>
        </b-col>
        <!-- Project name -->

        <!-- Project Date  -->
        <b-col cols="12" sm="6">
            <validation-provider
            name="Proj Date"
            :rules="{ required: true, min: 3 }"
            v-slot="validationContext">
            <b-form-group id="proj-date" label="Project Date" label-for="proj-date-input" >
                <b-form-input
                id="proj-date-input"
                name='proj-date-input'
                type='date'
                v-model="ProjForm.ProjDateI"
                :state="getValidationState(validationContext)"
                aria-describedby="proj-date-live-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="proj-date-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </b-form-group>
            </validation-provider>
        </b-col>
        <!-- End Project Date -->


        <!-- Start project Desc -->
        <b-col cols="12" sm="12">
            <!-- <validation-provider
            name="Project Description"
            :rules="{ required: true, min: 3 }"
            v-slot="validationContext">
            <b-form-group id="proj-desc" label="Project Description" label-for="proj-desc-input" >
                <b-textarea
                id="proj-desc"
                name='proj-desc'
                v-model="ProjForm.ProjDescI"
                :state="getValidationState(validationContext)"
                aria-describedby="proj-desc-live-feedback"
                rows="6"
                >
                </b-textarea>
                <b-form-invalid-feedback id="proj-desc-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </b-form-group>
            </validation-provider> -->
            <vue-editor v-model="ProjForm.ProjDescI" :editorToolbar="customToolbar"></vue-editor>
        </b-col>
        <!-- End Project Desc -->

        <!-- Project Form Buttons  -->
        <b-col v-if="type === 'newItem'" class="d-flex justify-content-start" >
            <b-button type="submit" variant="primary" >Save</b-button>
            <b-button variant="danger" class="mx-2">Cancel</b-button>
        </b-col>

    </b-form>
  </validation-observer>
</template>

<script>

import { mapActions } from 'vuex';
import { VueEditor } from "vue2-editor";
import _ from 'lodash';


export default {

    props:['type','project','CvId'],
    components:{
        VueEditor
    },

    data(){

        let ProjFormVal;

        if(this.type === 'item'){

            ProjFormVal={
                ProjNameI:this.project.ProjName,
                ProjDateI:new Date(this.project.ProjDate).toISOString().substring(0, 10),
                ProjDescI:this.project.ProjDesc,
            }

        }
        else if(this.type === 'newItem'){

            ProjFormVal={
                ProjNameI:"",
                ProjDateI:"",
                ProjDescI:"",
                ProjCvI:this.CvId
            }
            
        }

        return{
            ProjForm:ProjFormVal,
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
      updateable:false
        }
    },
      watch: {
    ProjForm: {
      handler() {
        if (this.type === "item" && this.updateable) {
          this.updateProjWatch();
        }
        this.updateable = true;
      },
      deep: true,
    },
  },
    methods:{
        getValidationState({ dirty, validated, valid = null }) {
        return dirty || validated ? valid : null;
        },
        ...mapActions(['saveProj','updateProj']),
        ProjSubmit:function(){

            if(this.type === 'newItem'){
                this.saveProj(this.ProjForm)
            }
        },
        updateProjWatch:_.debounce(function(){

            var data={
                data:this.ProjForm,
                ProjId:this.project._id
            }
            this.updateProj(data)

        },6000)
    },



}
</script>

<style>

</style>