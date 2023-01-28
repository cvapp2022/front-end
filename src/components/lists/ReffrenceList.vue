<template>
  <div class="">
    <b-card class="my-3 px-2">
      <b-row class="justify-content-between align-items-start">
        <h4 class="text-start card-title mb-4 p-1 font-weight-bold">
          {{ $t("Reffrences") }}
        </h4>
        <b-button
          variant="link"
          class="font-weight-bold h5 text-primary"
          v-b-toggle.collapse-reff
        >
          {{ $t("AddReff") }}
        </b-button>
        <!-- <b-button variant="danger" @click="removeSectionBtn('reffrences')"  >rm</b-button> -->
      </b-row>
      <b-row>
        <b-collapse id="collapse-reff" class="mt-2" style="flex: 1">
          <reffrence
            v-bind:CvId="cvOne.cvId"
            v-bind:type="'newItem'"
            @reffSaved="toggleCollapse"
          ></reffrence>
        </b-collapse>
      </b-row>
    </b-card>
      <draggable
        v-bind="dragOptions"
        handle=".handle"
        group="Reffrence"
        @start="drag = true"
        @end="DragEnd()"
        v-model="draglist"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <div
            class="d-flex align-items-baseline"
            v-for="reff in this.draglist"
            v-bind:key="reff._id"
          >
            <b-icon icon="justify" class="h1 handle"></b-icon>
            <b-card class="flex-fill my-3 p-2">
              <b-row
                :id="'collap' + reff._id + 'header'"
                :ref="'collap' + reff._id + 'header'"
              >
                <b-col cols="2" sm="1" class="px-1 px-sm-3">
                  <b-card class="bg-light w-100" no-body>
                    <div class="mx-auto my-2">
                      <b-icon icon="person" class="h4 m-0"></b-icon>
                    </div>
                  </b-card>
                </b-col>
                <b-col cols="8" sm="10" class="d-flex flex-column text-start">
                  <div class="font-weight-bold h5">{{ reff.RefName }}</div>
                  <div class="h6 text-primary">{{ reff.RefAt }}</div>
                  <!-- <div class="h6 text-primary">{{ reff }}</div> -->
                </b-col>
                <b-col cols="2" sm="1">
                  <b-button v-b-toggle="'collap' + reff._id" variant="link">
                    <span class="when-open">
                      <b-icon icon="chevron-up"></b-icon></span
                    ><span class="when-closed">
                      <b-icon icon="chevron-down"></b-icon
                    ></span>
                  </b-button>
                </b-col>
              </b-row>
              <b-collapse :id="'collap' + reff._id">
                <b-button v-b-toggle="'collap' + reff._id" variant="link">
                  <span class="when-open">
                    <b-icon icon="chevron-up"></b-icon></span
                  ><span class="when-closed">
                    <b-icon icon="chevron-down"></b-icon
                  ></span>
                </b-button>
                <reffrence
                  v-bind:CvId="cvOne.cvId"
                  v-bind:reffrence="reff"
                  v-bind:type="'item'"
                ></reffrence>
              </b-collapse>
            </b-card>
            <b-button @click="DeleteRefSubmit(reff._id)" variant="link" class="d-none d-sm-block"
              ><b-icon icon="trash"></b-icon
            ></b-button>
          </div>
        </transition-group>
      </draggable>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import reffrence from "../items/cv/reffrence.vue";
import draggable from "vuedraggable";
export default {
  components: {
    reffrence,
    draggable,
  },
  computed: {
    ...mapGetters(["reffrences", "cvOne"]),
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
    reffrences() {
      console.log(" projects getter changes");
      this.draglist = this.reffrences;
    },
  },
  data() {
    return {
      drag: false,
      draglist: [],
    };
  },
  methods: {
    ...mapActions(["deleteRef", "changeReff", "removeSection"]),

    SetSkillModalProp(type, id) {
      this.SkillModalItemType = type;
      this.SkillModalItemId = id;
    },
    DeleteRefSubmit: function (reffid) {
      this.$bvModal
        .msgBoxConfirm(
          "Please confirm that you want to delete everything." + reffid,
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
            this.deleteRef(reffid);
          }
        });
    },
    DragEnd() {
      this.drag = false;

      this.changeReff({ list: this.draglist, CvId: this.cvOne.cvId });
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
      this.$root.$emit("bv::toggle::collapse", "collapse-reff");
    },
  },
  mounted() {
    this.draglist = this.reffrences;
    this.$root.$on('bv::collapse::state', (collapseId,state) => {
      var itemId=collapseId+'header';
      var items=this.$refs[itemId];
      if(items){
        if(state){
          items[0].classList.add('d-none')
        }
        else{
          items[0].classList.remove('d-none')
        }
      }
    })
  },
};
</script>

<style></style>
