<template>
  <div class="">
    <b-card class="my-3 px-2">
      <b-row class="justify-content-between align-items-start">
        <h4 class="text-start card-title mb-4 p-1 font-weight-bold">
          {{$t("Educations")}}
        </h4>
        <b-button
          variant="link"
          class="font-weight-bold h5 text-primary"
          v-b-toggle.collapse-edu
        >
          {{$t("AddEdu")}}
        </b-button>
        <!-- <b-button variant="danger" @click="removeSectionBtn('educations')"  >rm</b-button> -->
      </b-row>
      <b-row>
        <b-collapse id="collapse-edu" class="mt-2">
          <education
            v-bind:CvId="cvOne.cvId"
            v-bind:type="'newItem'"
            @eduSaved="toggleCollapse"
          ></education>
        </b-collapse>
      </b-row>
    </b-card>

      <draggable
        v-bind="dragOptions"
        handle=".handle"
        group="Educations"
        @start="drag = true"
        @end="DragEnd()"
        v-model="draglist"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <div
            class="d-flex align-items-baseline"
            v-for="edu in this.draglist"
            v-bind:key="edu._id"
          >
            <b-icon icon="justify" class="h1 handle"></b-icon>
            <b-card class="d-flex flex-fill my-3 p-2">
              <b-row :id="'collap'+edu._id+'header'" :ref="'collap'+edu._id+'header'">
                <b-col cols="2" sm="1" class="px-1 px-sm-3">
                  <b-card class="bg-light w-100" no-body >
                    <div class="mx-auto my-2">
                      <b-icon icon="book" class="h4 m-0"></b-icon>
                    </div>
                  </b-card>
                </b-col>
                <b-col cols="8" sm="10" class="d-flex flex-column text-start">
                  <div class="font-weight-bold h5">{{ edu.EduTitle }} </div>
                  <div class="h6 text-primary">{{ edu.EduAt }}</div>
                  <div class="p">{{edu.EduFrom}} {{edu.EduTo}}</div>
                  <div class="mt-3" style="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis tenetur porro, neque corrupti similique enim distinctio tempora fugiat velit in suscipit laboriosam dignissimos voluptatibus ipsa repellat ipsum sunt consectetur officia?</div>
                </b-col>
                <b-col cols="2" sm="1">
                  <b-button v-b-toggle="'collap' + edu._id" variant="link">
                    <span class="when-open">
                      <b-icon icon="chevron-up"></b-icon></span
                    ><span class="when-closed">
                      <b-icon icon="chevron-down"></b-icon
                    ></span>
                  </b-button>
                </b-col>
              </b-row>
              <b-collapse :id="'collap' + edu._id">
                  <b-button v-b-toggle="'collap' + edu._id" variant="link">
                    <span class="when-open">
                      <b-icon icon="chevron-up"></b-icon></span
                    ><span class="when-closed">
                      <b-icon icon="chevron-down"></b-icon
                    ></span>
                  </b-button>
                <education
                  v-bind:CvId="cvOne.cvId"
                  v-bind:education="edu"
                  v-bind:type="'item'"
                  @setModalProp="SetSkillModalProp('education', edu._id)"
                ></education>
              </b-collapse>
            </b-card>
            <b-button @click="DeleteEduSubmit(edu._id)" variant="link" class="d-none d-sm-block">
              <b-icon icon="trash"></b-icon>
            </b-button>
          </div>
        </transition-group>
      </draggable>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import education from "../items/cv/education.vue";
import draggable from "vuedraggable";

export default {
  components: {
    education,
    draggable,
  },
  computed: {
    ...mapGetters(["educations", "cvOne"]),
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
    educations() {
      console.log(" educations getter changes");
      this.draglist = this.educations;
    },
  },
  data() {
    return {
      drag: false,
      draglist: [],
    };
  },
  methods: {
    ...mapActions(["deleteEdu", "changeEdu", "removeSection"]),
    DragEnd() {
      this.drag = false;
      this.changeEdu({ list: this.draglist, CvId: this.cvOne.cvId });
    },
    SetSkillModalProp(type, id) {
      this.SkillModalItemType = type;
      this.SkillModalItemId = id;
    },
    DeleteEduSubmit: function (eduid) {
      this.$bvModal
        .msgBoxConfirm("Please confirm that you want to delete everything."+eduid, {
          title: "Please Confirm",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if(value){
            this.deleteEdu(eduid);
          }
          //this.boxTwo = value;
        });
    },
    removeSectionBtn(section) {
      var data = {
        cvId: this.cvOne.cvId,
        section,
      };
      this.removeSection(data);
    },
    toggleCollapse() {
      this.$root.$emit("bv::toggle::collapse", "collapse-edu");
    },
  },
  mounted() {
    this.draglist = this.educations;
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
