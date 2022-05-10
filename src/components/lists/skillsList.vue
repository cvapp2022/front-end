<template>
    <b-row class="h4 align-items-center">

        <!-- List for Skills in items & Skills list -->
        <b-row v-if="where != 'form'" >
            <b-badge v-for="(skill , index ) in this.skills" v-bind:key="index" pill class='m-1 p-3 text-center skill-item' :style="'background-color:' +skill.SkillColor">
                {{skill.SkillTitle}}
                <button class="del-btn" @click="DelteSkill(skill._id)">D</button>
            </b-badge>
        </b-row>


        <b-button pill v-b-modal.add-skill-modal v-if="type === 'skill'" class='m-1 p-3 text-center skill-item'  variant="outline-primary" > + Add Skill </b-button>
        <b-modal v-if="type === 'skill'" hide-footer id="add-skill-modal">
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
    </b-row>
</template>

<script>

import { mapActions } from 'vuex';

export default {

    props:['skills','type','where'],
    
    data(){
        return {
            SkillForm:{
                SkillTitleI:"",
                SkillValI:"",
                SkillDescI:"",
            }
        }

    },
    methods:{
        getValidationState({ dirty, validated, valid = null }) {
          return dirty || validated ? valid : null;
        },
        ...mapActions(['SaveSkill','DeleteSkill']),
        SaveSkillSubmit:function(){
            this.SaveSkill(this.SkillForm)
        },
        DelteSkill(skId){
            console.log(skId)
            this.DeleteSkill(skId)
        }
    },


}
</script>

<style scoped>
.del-btn{

    background: none;
    border: 0;
}
</style>