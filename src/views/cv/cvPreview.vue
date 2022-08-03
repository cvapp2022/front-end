<template>
  <b-container>
    <b-row class="my-4" style="height: 100vh">
      <b-col sm="6">
        <div class="d-flex flex-column">
          <div class="mb-4">
            <TemplateList @templateChanged="reRender" ></TemplateList>
          </div>
          <div>
            <b-card class="d-flex flex-row p-3" no-body>
              <div class="w-25 p-2">
                <draggable
                  v-bind="dragOptions"
                  handle=".handle"
                  group="Awards"
                  @start="drag = true"
                  @end="DragEnd()"
                  v-model="dragList.side"
                >
                  <transition-group
                    type="transition"
                    :name="!drag ? 'flip-list' : null"
                  >
                    <div v-for="section in dragList.side" v-bind:key="section.name">
                      <b-card class="my-2 text-center justify-content-center">
                        <b-icon icon="justify" class="h5 handle"></b-icon>
                        {{ section.name }}</b-card
                      >
                    </div>
                    <!-- <b-card class="my-2">Languages</b-card>
                      <b-card class="my-2">Skills</b-card> -->
                  </transition-group>
                </draggable>
              </div>
              <div class="w-75 p-2">
                <draggable
                  v-bind="dragOptions"
                  handle=".handle"
                  group="Awards"
                  @start="drag = true"
                  @end="DragEnd()"
                  v-model="dragList.main"
                >
                  <transition-group
                    type="transition"
                    :name="!drag ? 'flip-list' : null"
                  >
                    <div v-for="section in dragList.main" v-bind:key="section.name">
                      <b-card class="my-2 text-center justify-content-center">
                        <b-icon icon="justify" class="h5 handle"></b-icon>
                        {{ section.name }}</b-card
                      >
                    </div>
                    <!-- <b-card class="my-2">Languages</b-card>
                      <b-card class="my-2">Skills</b-card> -->
                  </transition-group>
                </draggable>
              </div>
            </b-card>
            <b-button
              variant="link"
              v-if="!checkSection('experiences')"
              @click="addSectionBtn('experiences')"
              >Add experiences section</b-button
            >
            <b-button
              variant="link"
              v-if="!checkSection('educations')"
              @click="addSectionBtn('educations')"
              >Add educatations section</b-button
            >
            <b-button
              variant="link"
              v-if="!checkSection('reffrences')"
              @click="addSectionBtn('reffrences')"
              >Add reffrences section</b-button
            >
            <b-button
              variant="link"
              v-if="!checkSection('organizations')"
              @click="addSectionBtn('organizations')"
              >Add organizations section</b-button
            >
            <b-button
              variant="link"
              v-if="!checkSection('awards')"
              @click="addSectionBtn('awards')"
              >Add awards section</b-button
            >
            <b-button
              variant="link"
              v-if="!checkSection('projects')"
              @click="addSectionBtn('projects')"
              >Add projects section</b-button
            >
          </div>
        </div>
      </b-col>
      <b-col sm="6">
        <b-card>
          <vue-pdf-embed
            :source="
              process.env.VUE_APP_BASEURL+'/Cv/' +
              this.$route.params.cvId +
              '/render'
            "
            :page="page"
            ref="pdfRef"
            @rendered="handleDocumentRender"
          />
          <div class="" v-if="!this.pdfIsLoading">
            <button :disabled="page <= 1" @click="page--">❮</button>
            {{ page }} / {{ pageCount }}
            <button :disabled="page >= pageCount" @click="page++">❯</button>
          </div>
        </b-card>
        <!-- :src="
            
          " -->
      </b-col>
    </b-row>
    <router-link
      :to="{ name: 'cvOne', params: { cvId: cvOne.cvId } }"
      style="
        position: fixed;
        background: #5541f9;
        color: white;
        padding: 24px;
        border-radius: 60px;
        bottom: 20px;
        right: 40px;
      "
    >
      Edit
    </router-link>
  </b-container>
</template>

<script>
import draggable from "vuedraggable";
import VuePdfEmbed from "vue-pdf-embed/dist/vue2-pdf-embed";
import TemplateList from '../../components/lists/TemplateList.vue'
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    draggable,
    VuePdfEmbed,
    TemplateList
  },
  data() {
    return {
      drag: false,
      dragList: {},
      page: 1,
      pageCount: 1,
      pdfIsLoading: true,
    };
  },
  watch: {
    cvOne: {
      handler(newVal) {
        this.dragList = newVal.cvSections;
      },
      deep: true,
    },
  },
  sockets: {
    async SECTION_UPDATED() {
      console.log("SocketUpdated");
      this.reRender();
    },
  },
  methods: {
    ...mapActions(["addSection", "getCvOne", "changeSectionSort"]),
    async reRender(){
      await this.$refs.pdfRef.load();
      this.$refs.pdfRef.render();
    },
    handleDocumentRender() {
      this.pdfIsLoading = false;
      console.log("doc re renderd");
      this.pageCount = this.$refs.pdfRef.pageCount;
    },
    DragEnd() {
      this.drag = false;
      var data = {
        cvId: this.cvOne.cvId,
        newSort: this.dragList,
      };
      this.changeSectionSort(data);
    },
    checkSection(section) {
      var mainSections = this.cvOne.cvSections.main;
      var sideSections = this.cvOne.cvSections.side;
      var sections = [mainSections, sideSections].flat();
      return sections.find((item) => {
        return item.name === section;
      });
    },
    addSectionBtn(section) {
      var data = {
        cvId: this.cvOne.cvId,
        section,
      };
      this.addSection(data);
    },
  },
  computed: {
    ...mapGetters(["cvOne"]),
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  mounted() {
    this.getCvOne(this.$route.params.cvId);
  },
};
</script>

<style>
</style>