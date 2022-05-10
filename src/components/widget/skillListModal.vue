<template>
  <b-modal  hide-footer id="skill-list-modal">
      <b-button v-for="(skill,index) in this.skills" v-bind:key="index" @click="AddSkillTo(skill)" variant="outline-primary" class="px-3 py-2 m-1 text-center " pill  >
        {{ skill.SkillTitle }}
        <span>+</span>
      </b-button>
      <!-- <skill v-for="(skill,index) in this.skills" v-bind:key="index" v-bind:skill="skill"  ></skill> -->
      {{ this.itemType }}
      {{ this.itemId }}
  </b-modal>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

// import skill from '../../components/items/skill.vue';

export default {

  components:{
    // skill
  },
  props:['itemId','itemType'],
  computed:{
    ...mapGetters(['skills'])
  },
  methods:{

    ...mapActions(['PushSkill']),
    AddSkillTo(skill){

      var obj={
        type:this.itemType,
        item:this.itemId,
        skill:skill._id
      };

      this.PushSkill(obj)

    }
  }
  


}
</script>

<style scoped>
.skilld{
  border-width: 1px;
  border-color: var(--primary);
  border-style: solid;
  border-radius: 25%;
}
</style>