<template>
  <b-badge  pill class='m-1 p-3 text-center skill-item' :style="'background-color:' +skill.SkillColor">
    {{skill.SkillTitle}}
    <button class="del-btn mx-1" v-if="type === 'list'" @click="DelteSkill(skill._id)">X</button>
    <button class="del-btn mx-1" v-if="type === 'item'" @click.prevent="PullSkillM(skill._id)">X</button>
  </b-badge>
</template>

<script>

import { mapActions } from 'vuex';
export default {
 props:['skill','type','itemid','itemtype'],
 methods:{
    ...mapActions(['DeleteSkill','PullSkill']),
    DelteSkill(skId){
        this.DeleteSkill(skId)
    },
    PullSkillM(){
      var obj = {
        type:this.itemtype,
        item:this.itemid,
        skill:this.skill._id
      }
      
      this.PullSkill(obj)

    }

 }
}
</script>

<style scoped>
 .del-btn{
    width: 24px;
    height: 24px;
    background: #0000007a;
    border: 0;
    border-radius: 50%;
    color: white;
    font-weight: bolder;
    text-align: center;
 }
</style>