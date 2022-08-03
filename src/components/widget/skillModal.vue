<template>
    <b-modal  hide-footer id="add-skill-modal">
        <validation-observer ref="observer" v-slot="{ handleSubmit }">                
        <b-form @submit.prevent="handleSubmit(SaveSkillSubmit)" class="row">

            <!-- Skill Title -->
            <b-col cols="12" sm="12">
                <validation-provider
                name="Skill Title"
                :rules="{ required: true,min:3}"
                v-slot="validationContext"
                >
                <b-form-group id="skill-title" label="Skill title" label-for="skill-title-input">
                    <b-form-input
                    id="skill-title-input"
                    name="skill-title-input"
                    v-model="SkillForm.SkillTitleI"
                    :state="getValidationState(validationContext)"
                    aria-describedby="skill-title-live-feedback"
                    ></b-form-input>
                    <b-form-invalid-feedback id="skill-title-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
                </validation-provider>
            </b-col>
            <!-- End Skill title -->


            <!-- Skill Value  -->
            <b-col cols="12" sm="12">
                <validation-provider
                name="Skill Value"
                :rules="{ required: true}"
                v-slot="validationContext">
                <b-form-group id="exp-job" label="Skill Value" label-for="skill-value-input" >
                    <b-form-input
                    id="skill-value-input"
                    name='skill-value-input'
                    type='range'
                    v-model="SkillForm.SkillValI"
                    :state="getValidationState(validationContext)"
                    aria-describedby="skill-value-live-feedback"
                    ></b-form-input>
                    <b-form-invalid-feedback id="skill-value-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
                </validation-provider>
            </b-col>
            <!-- End Skill Value End -->

            <!-- Skill Description  -->
            <b-col cols="12" sm="12" >
                <validation-provider
                name="Skill Description"
                v-slot="validationContext">
                <b-form-group id="skill-desc" label="Skill Description" label-for="skill-desc" >
                    <b-textarea
                    id="exp-desc"
                    name='exp-desc'
                    v-model="SkillForm.SkillDescI"
                    :state="getValidationState(validationContext)"
                    aria-describedby="skill-desc-live-feedback"
                    rows="6"
                    ></b-textarea>
                    <b-form-invalid-feedback id="skill-desc-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
                </validation-provider>
            </b-col>
            <!-- Skill Descriptipn End -->
            
            <!-- Skill Form Buttons  -->
            <b-col class="d-flex justify-content-start" >
                <b-button type="submit" variant="primary" >Save</b-button>
                <b-button variant="danger" class="mx-2">Cancel</b-button>
            </b-col>

        </b-form>
    </validation-observer>
</b-modal>
</template>

<script>

import { mapActions } from 'vuex';
export default {
    props:['CvId'],
    methods:{
        getValidationState({ dirty, validated, valid = null }) {
          return dirty || validated ? valid : null;
        },
        ...mapActions(['SaveSkill']),
        SaveSkillSubmit:function(){
            this.SaveSkill(this.SkillForm)
        },
    },
    data(){
        return {
            SkillForm:{
                SkillTitleI:"",
                SkillValI:"",
                SkillDescI:"",
                SkillCvI:this.CvId
            }
        }
    },

}
</script>

<style>

</style>