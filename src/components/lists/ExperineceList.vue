<template>
  <div class="">
    <b-card class="my-3 px-2">
      <b-row class="justify-content-between align-items-start">
        <h4 class="text-start card-title mb-4 p-1 font-weight-bold">
          {{ $t("Experiences") }}
        </h4>
        <b-button
          variant="link"
          class="font-weight-bold h5 text-primary"
          v-b-toggle.collapse-exp
        >
          {{ $t("AddExp") }}</b-button
        >
        <!-- <b-button variant="danger" @click="removeSectionBtn('experiences')"  >rm</b-button> -->
      </b-row>
      <b-row>
        <b-collapse id="collapse-exp" class="mt-2">
          <experiance
            v-bind:CvId="cvOne.cvId"
            v-bind:type="'newItem'"
            @expSaved="toggleCollapse"
          ></experiance>
        </b-collapse>
      </b-row>
    </b-card>
    <draggable
      v-bind="dragOptions"
      handle=".handle"
      group="Experiences"
      @start="drag = true"
      @end="DragEnd()"
      v-model="draglist"
    >
      <transition-group type="transition" :name="!drag ? 'flip-list' : null">
        <div
          v-for="exp in this.draglist"
          v-bind:key="exp._id"
          class="d-flex align-items-baseline"
        >
          <b-icon icon="justify" class="h1 handle"></b-icon>
          <b-card class="flex-fill my-3 p-2">
            <b-row
              :id="'collap' + exp._id + 'header'"
              :ref="'collap' + exp._id + 'header'"
            >
              <b-col cols="2" sm="1" class="px-1 px-sm-3">
                <b-card class="bg-light w-100" no-body>
                  <div class="mx-auto my-2">
                    <b-icon icon="briefcase" class="h4 m-0"></b-icon>
                  </div>
                </b-card>
              </b-col>
              <b-col cols="8" sm="10" class="d-flex flex-column text-start">
                <div class="font-weight-bold h5">{{ exp.ExpTitle }}</div>
                <div class="h6 text-primary">{{ exp.ExpJob }}</div>
                <div class="p">{{ exp.ExpFrom }} {{ exp.ExpTo }}</div>
                <div class="mt-3" style="">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Debitis tenetur porro, neque corrupti similique enim
                  distinctio tempora fugiat velit in suscipit laboriosam
                  dignissimos voluptatibus ipsa repellat ipsum sunt consectetur
                  officia?
                </div>
              </b-col>
              <b-col cols="2" sm="1">
                <b-button v-b-toggle="'collap' + exp._id" variant="link">
                  <span class="when-open">
                    <b-icon icon="chevron-up"></b-icon></span
                  ><span class="when-closed">
                    <b-icon icon="chevron-down"></b-icon
                  ></span>
                </b-button>
              </b-col>
            </b-row>
            <b-collapse :id="'collap' + exp._id">
              <b-button v-b-toggle="'collap' + exp._id" variant="link">
                <span class="when-open">
                  <b-icon icon="chevron-up"></b-icon></span
                ><span class="when-closed">
                  <b-icon icon="chevron-down"></b-icon
                ></span>
              </b-button>
              <experiance
                v-bind:CvId="cvOne.cvId"
                v-bind:experiance="exp"
                v-bind:type="'item'"
                @setModalProp="SetSkillModalProp('experiance', exp._id)"
              ></experiance>
            </b-collapse>
          </b-card>
          <b-button @click="DeleteExpSubmit(exp._id)" variant="link" class="d-none d-sm-block">
            <b-icon icon="trash"></b-icon>
          </b-button>
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import experiance from "../items/cv/experiance.vue";
import draggable from "vuedraggable";
export default {
  components: {
    experiance,
    draggable,
  },
  computed: {
    ...mapGetters(["experiances", "cvOne"]),
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  watch: {
    experiances() {
      console.log(" experiances getter changes");
      this.draglist = this.experiances;
    },
  },
  data() {
    return {
      drag: false,
      draglist: [],
    };
  },
  methods: {
    ...mapActions(["deleteExp", "changeExp", "removeSection"]),
    SetSkillModalProp(type, id) {
      this.SkillModalItemType = type;
      this.SkillModalItemId = id;
    },
    DeleteExpSubmit: function (expid) {
      this.$bvModal
        .msgBoxConfirm(
          "Please confirm that you want to delete everything." + expid,
          {
            title: "Please Confirm",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "YES",
            cancelTitle: "NO",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          }
        )
        .then((value) => {
          if (value) {
            this.deleteExp(expid);
          }
          //this.boxTwo = value;
        });
    },
    DragEnd() {
      this.drag = false;

      this.changeExp({ list: this.draglist, CvId: this.cvOne.cvId });
      console.log("drag end");
    },
    removeSectionBtn(section) {
      var data = {
        cvId: this.cvOne.cvId,
        section,
      };
      this.removeSection(data);
    },
    toggleCollapse() {
      this.$root.$emit("bv::toggle::collapse", "collapse-exp");
    },
  },
  mounted() {
    this.draglist = this.experiances;
    this.$root.$on("bv::collapse::state", (collapseId, state) => {
      var itemId = collapseId + "header";
      var items = this.$refs[itemId];
      if (items) {
        if (state) {
          items[0].classList.add("d-none");
        } else {
          items[0].classList.remove("d-none");
        }
      }
    });
  },
};
</script>

<style>
.handle {
  float: left;
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>
