<template>
  <div class="">
    <b-card class="my-3 p-2">
      <b-row class="justify-content-between align-items-start">
        <h4 class="text-start card-title mb-4 p-1 font-weight-bold">Skills</h4>
      </b-row>
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
        + Add Skill
      </b-button>
    </b-card>
  </div>
</template>

<script>

import { mapGetters } from "vuex";
import skill from '../items/skill.vue';

export default {
  components: {
    skill,
  },
  computed: {
    ...mapGetters(["skills", "cvOne"]),
  },
  methods: {
    SetSkillModalProp(type, id) {
      this.SkillModalItemType = type;
      this.SkillModalItemId = id;
    },
  },
};
</script>

<style></style>
