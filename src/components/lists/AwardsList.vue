<template>
  <div class="">
    <b-card class="my-3 px-2">
      <b-row class="justify-content-between align-items-start">
        <h4 class="text-start card-title mb-4 p-1 font-weight-bold">{{$t("Award")}}</h4>
        <b-button
          variant="link"
          class="font-weight-bold h5 text-primary"
          v-b-toggle.collapse-aw
        >
          {{$t("AddAw")}}
        </b-button>
        <!-- <b-button variant="danger" @click="removeSectionBtn('awards')"  >rm</b-button> -->
      </b-row>
      <b-row>
        <b-collapse id="collapse-aw" class="mt-2">
          <award 
            v-bind:CvId="cvOne.cvId"
            v-bind:type="'newItem'"
            @awSaved="toggleCollapse"
           ></award>
        </b-collapse>
      </b-row>
    </b-card>
    <div class="mx-4">
      <draggable
        v-bind="dragOptions"
        handle=".handle"
        group="Awards"
        @start="drag = true"
        @end="DragEnd()"
        v-model="draglist"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <div class="d-flex align-items-baseline" v-for="aw in this.draglist" v-bind:key="aw._id">
            <b-icon icon="justify" class="h1 handle"></b-icon>
            <b-card class="flex-fill my-3 p-2">
              <div class="d-flex justify-content-between">
                <h4>{{ aw.AwTitle }}</h4>
                <div class="">
                  <b-button v-b-toggle="'collap' + aw._id" variant="link">
                    <span class="when-open">
                      <b-icon icon="chevron-up"></b-icon>
                    </span>
                    <span class="when-closed">
                      <b-icon icon="chevron-down"></b-icon>
                    </span>
                  </b-button>
                </div>
              </div>
              <b-collapse :id="'collap' + aw._id">
                <award
                  v-bind:CvId="cvOne.cvId"
                  v-bind:award="aw"
                  v-bind:type="'item'"
                ></award>
              </b-collapse>
            </b-card>
            <b-button @click="DeleteAwSubmit(aw._id)" variant="link"
              ><b-icon icon="trash"></b-icon
            ></b-button>
          </div>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import award from "../items/award.vue";
import draggable from "vuedraggable";

export default {
  components: {
    award,
    draggable,
  },
  computed: {
    ...mapGetters(["awards", "cvOne"]),
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
    awards() {
      console.log(" award getter changes");
      this.draglist = this.awards;
    },
  },
  data() {
    return {
      drag: false,
      draglist: [],
    };
  },
  methods: {
    ...mapActions(["deleteAw", "changeAw", "removeSection"]),
    DeleteAwSubmit: function (awid) {
      this.$bvModal
        .msgBoxConfirm(
          "Please confirm that you want to delete everything." + awid,
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
            this.deleteAw(awid);
          }
        });
    },
    DragEnd() {
      this.drag = false;
      this.changeAw({ list: this.draglist, CvId: this.cvOne.cvId });
    },
    removeSectionBtn(section) {
      var data = {
        cvId: this.cvOne.cvId,
        section,
      };
      this.removeSection(data);
    },
    toggleCollapse() {
      console.log('toggeld ')
      this.$root.$emit("bv::toggle::collapse", "collapse-aw");
    },
  },
  mounted() {
    this.draglist = this.awards;
  },
};
</script>

<style></style>
