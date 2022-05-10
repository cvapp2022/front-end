<template>
    <validation-observer ref="observer" v-slot="{ handleSubmit }">
    <b-form @submit.prevent="handleSubmit(SaveEduSubmit)" class="row">
        
        <!-- Edueriance Title -->
        <b-col cols="12" sm="6">
            <validation-provider
            name="Edueriance Title"
            :rules="{ required: true}"
            v-slot="validationContext"
            >
            <b-form-group id="edu-title" label="Education title" label-for="edu-title-input">
                <b-form-input
                id="edu-title-input"
                name="edu-title-input"
                v-model="EduForm.EduTitleI"
                :state="getValidationState(validationContext)"
                aria-describedby="edu-title-live-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="edu-title-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </b-form-group>
            </validation-provider>
        </b-col>
        <!-- End Education title -->

        <!-- Education type  -->
        <b-col cols="12" sm="6">
            <validation-provider
            name="Education type"
            :rules="{ required: true, min: 3 }"
            v-slot="validationContext">
            <b-form-group id="edu-type" label="Education type" label-for="edu-type-input" >
                <b-form-select
                id="edu-type-input"
                v-model="EduForm.EduTypeI"
                :options="EduTypeOptions" 
                :state="getValidationState(validationContext)"
                aria-describedby="edu-type-live-feedback"
                ></b-form-select>
                <b-form-invalid-feedback id="edu-type-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </b-form-group>
            </validation-provider>
        </b-col>
        <!-- End Education type -->


        <!-- Education Date Start -->
        <b-col cols="12" sm="6" >
            <validation-provider
            name="Education Date Start"
            :rules="{ required: true, min: 3 }"
            v-slot="validationContext">
            <b-form-group id="edu-date-start" label="Education Date Start" label-for="edu-date-start-input" >
                <b-form-input
                id="edu-date-start-input"
                name='edu-date-start-input'
                type='date'
                v-model="EduForm.EduFromI"
                :state="getValidationState(validationContext)"
                aria-describedby="edu-date-start-live-feedback"
                >
                </b-form-input>
                <b-form-invalid-feedback id="edu-date-start-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </b-form-group>
            </validation-provider>
        </b-col>
        <!-- Education Date End End  -->

        <!-- Education Date End -->
        <b-col cols="12" sm="6" >
            <validation-provider
            name="Education Date end"
            :rules="{ required: true, min: 3 }"
            v-slot="validationContext">
            <b-form-group id="edu-date-end" label="Education Date end" label-for="edu-date-end-input" >
                <b-form-input
                id="edu-date-end-input"
                name='edu-date-end-input'
                type='date'
                v-model="EduForm.EduToI"
                :state="getValidationState(validationContext)"
                aria-describedby="edu-date-end-live-feedback"
                >
                </b-form-input>
                <b-form-invalid-feedback id="edu-date-end-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </b-form-group>
            </validation-provider>
        </b-col>
        <!-- Education Date End End -->

        <!-- Education Description  -->
        <b-col cols="12" sm="12" >
            <validation-provider
            name="Education Description"
            :rules="{ required: true, min: 3 }"
            v-slot="validationContext">
            <b-form-group id="edu-desc" label="Education Description" label-for="edu-desc" >
                <b-textarea
                id="edu-desc"
                name='edu-desc'
                type='date'
                v-model="EduForm.EduDescI"
                :state="getValidationState(validationContext)"
                aria-describedby="edu-desc-live-feedback"
                rows="6"
                >
                </b-textarea>
                <b-form-invalid-feedback id="edu-desc-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </b-form-group>
            </validation-provider>
        </b-col>
        <!-- Education Descriptipn End -->


        <!-- Education Skills Start -->        
        <b-col sm="12" class="p-4" v-if="type === 'item'" >
          <skill v-for="(skill,index) in education.EduSkill" v-bind:key="index" v-bind:skill="skill" v-bind:type="'item'" v-bind:itemid="education._id" v-bind:itemtype="'education'" ></skill>
          <b-button pill v-b-modal.skill-list-modal @click="updateModal()" class='m-1 p-3 text-center skill-item'  variant="outline-primary" > + Add Skills To Education </b-button>
        </b-col>
        <!-- Education Skills End -->


        <!-- Education Form Buttons  -->
        <b-col v-if="type === 'newItem'" class="d-flex justify-content-start" >
            <b-button type="submit" variant="primary" >Save</b-button>
            <b-button variant="danger" class="mx-2">Cancel</b-button>
        </b-col>

    </b-form>
  </validation-observer>
</template>

<script>

import {mapActions} from 'vuex';
import skill from '../../components/items/skill.vue';


export default {
    props:['education','type'],
    data(){

        let EduFormVal;

        if(this.type === 'item'){
            EduFormVal={
                EduTitleI:this.education.EduTitle,
                EduTypeI:this.education.EduType,
                EduFromI:new Date(this.education.EduFrom).toISOString().substring(0, 10),
                EduToI:new Date(this.education.EduTo).toISOString().substring(0, 10),
                EduDescI:this.education.EduDesc
            }
        }
        else if(this.type === 'newItem'){
            EduFormVal={
                EduTitleI:"",
                EduTypeI:null,
                EduFromI:"",
                EduToI:"",
                EduDescI:""
            }
        }

        return{
            EduForm:EduFormVal,
            EduTypeOptions:[
                {text:"please select",value:null},
                {text:'Colleage', value:'Colleage'},
                {text:'Self Learned',value:'Self Learn'}
            ]
        }
    },
    methods:{
        ...mapActions(['SaveEdu']),
        updateModal(){
            this.$emit('setModalProp')
        },
        getValidationState({ dirty, validated, valid = null }) {
        return dirty || validated ? valid : null;
        },
        SaveEduSubmit:function(){

            this.SaveEdu(this.EduForm)
            console.log('Education Saved')

        }
    },
    components:{
        skill
    },
    mounted(){
       
    },

}
</script>

<style>

</style>