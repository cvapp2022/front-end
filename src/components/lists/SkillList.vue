<template>
  <div class="">
    <b-card class="my-3 p-2">
      <b-row class="justify-content-between align-items-start">
        <h4 class="text-start card-title mb-4 p-1 font-weight-bold">
          {{ $t("Skills") }}
        </h4>
      </b-row>
      <b-row v-if="skillsRepo.length > 0">
        <skill
          v-for="(skill, index) in this.skillsRepo"
          v-bind:key="index"
          v-bind:skill="{SkillTitle:skill.SkillName,SkillColor:'#007bff',SkillDesc:skill.SkillDesc}"
          v-bind:type="'repo'"
          @skillSavedFromRepo="skillSavedFromRepo"
        ></skill>
      </b-row>
      <b-row>
        <skill
          v-for="(skill, index) in this.skills"
          v-bind:key="index"
          v-bind:skill="skill"
          v-bind:type="'list'"
        ></skill>
        <b-button
          pill
          v-b-modal.add-skill-modal
          class="m-1 p-3 text-center skill-item"
          variant="outline-primary"
        >
          {{ $t("AddSkill") }}
        </b-button>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from "vuex";
import skill from "../items/cv/skill.vue";

export default {
  components: {
    skill,
  },
  data(){
    return {
      skillsRepo:[]
    }
  },
  computed: {
    ...mapGetters(["skills", "cvOne"])
  },
  methods: {
    SetSkillModalProp(type, id) {
      this.SkillModalItemType = type;
      this.SkillModalItemId = id;
    },
    skillSavedFromRepo(savedSkill){
      //remove save skill from repo arr
      var filteredSkill = this.skillsRepo.filter(function(el) { return el.SkillName != savedSkill.SkillTitle; });
      this.skillsRepo=filteredSkill;
    },
    async getRepoSkills(){
      //get skills Repo
      var url = process.env.VUE_APP_BASEURL + '/repo/skill/'+this.cvOne.cvId;
      return await axios.get(url).then((resp)=>{
        if(resp.data.success){
          this.skillsRepo=resp.data.payload;
        }
      })
    }
  },
  mounted(){
    this.getRepoSkills().then(()=>{
      this.$watch('skills',(newValue)=>{
        if(newValue.length == 0){
          this.getRepoSkills()
        }
      })
    });
    

  }
};
</script>

<style></style>
