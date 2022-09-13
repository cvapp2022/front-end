<template>
  <b-container>
    <b-row class="my-4" style="height: 100vh">
      <b-col sm="7">
        <div class="d-flex flex-column">
          <langList @langChanged="reRender()"></langList>
          <div class="mb-3">
            <TemplateList @templateChanged="reRender"></TemplateList>
          </div>
          <div class="mb-3">
            <b-card
              :class="
                cvOne.cvTemplate.TemplateName === 'james' && cvOne.cvLang ==='en'
                  ? 'flex-row-reverse'
                  : 'flex-row'
              "
              class="d-flex p-3"
              no-body
            >
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
                    <div
                      v-for="section in dragList.side"
                      v-bind:key="section.name"
                    >
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
                    <div
                      v-for="section in dragList.main"
                      v-bind:key="section.name"
                    >
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
      <b-col sm="5">
        <b-card no-body>
          <div class="" v-if="!this.pdfIsLoading">
            <button :disabled="page <= 1" @click="page--">❮</button>
            {{ page }} / {{ pageCount }}
            <button :disabled="page >= pageCount" @click="page++">❯</button>
          </div>
          <vue-pdf-embed
            :source="$baseUrl + 'api/v1/Cv/' + this.$route.params.cvId + '/render'"
            :page="page"
            ref="pdfRef"
            @rendered="handleDocumentRender"
          />
        </b-card>
      </b-col>
    </b-row>
    <div class="" style="bottom: 20px;right: 40px;position: fixed;">
      <router-link
        :to="{ name: 'cvOne', params: { cvId: cvOne.cvId } }"
        class="mx-2 p-2 btn-secondary border-rounded"
      >
        Edit
      </router-link>
      <b-button
        v-if="cvOne.cvTemplate.isPaid"
        variant="secondary"
        v-b-modal.my-modal
        class="mx-2 p-2"
        pill
      >
        Buy To Download
      </b-button>
      <a
        target="_blank"
        v-if="!cvOne.cvTemplate.isPaid"
        :href="$baseUrl + 'api/v1/Cv/' + this.$route.params.cvId + '/render'"
        class="mx-2 p-2 btn-secondary border-rounded"
      >
        Download As PDF
      </a>
    </div>
    <b-modal id="my-modal" hide-header hide-footer>
      <div class="accordion" role="tablist">
          <b-button block v-b-toggle.accordion-1 variant="info">Pay with paypal</b-button>
          <b-button block v-b-toggle.accordion-2 variant="info">Pay with Credit Card</b-button>
          <b-button block v-b-toggle.accordion-3 variant="info">Pay with syriatel cash</b-button>

          <b-collapse id="accordion-1" accordion="my-accordion"  v-model="paypalCollapse" role="tabpanel">
            <h4>pay with paypal collapse</h4>
            <a :href="paypalLink">pay</a>
          </b-collapse>
          <b-collapse id="accordion-2" accordion="my-accordion"  v-model="ccCollapse" role="tabpanel">
            <h4>pay with CC collapse</h4>
          </b-collapse>
          <b-collapse id="accordion-3" accordion="my-accordion"  v-model="syrCollapse" role="tabpanel">
            <h4>pay with syr collapse</h4>
          </b-collapse>
      </div>
    </b-modal>

  </b-container>
</template>

<script>
import draggable from "vuedraggable";
import VuePdfEmbed from "vue-pdf-embed/dist/vue2-pdf-embed";
import TemplateList from "../../components/lists/TemplateList.vue";
import langList from '../../components/lists/LangList.vue'
import { mapActions, mapGetters } from "vuex";
import axios from 'axios';
export default {
  components: {
    draggable,
    VuePdfEmbed,
    TemplateList,
    langList,
  },
  data() {
    return {
      drag: false,
      dragList: {},
      page: 1,
      pageCount: 1,
      pdfIsLoading: true,
      paypalCollapse:false,
      ccCollapse:false,
      syrCollapse:false,
      paypalLink:''
    };
  },
  watch: {
    cvOne: {
      handler(newVal) {
        this.dragList = newVal.cvSections;
      },
      deep: true,
    },
    paypalCollapse(val){
      if(val){
        var url = process.env.VUE_APP_BASEURL +'/Order/Template/'+this.cvOne.cvTemplate._id+'/orderPayPalReq';
        axios.get(url).then((resp)=>{
          console.log(resp)
          this.paypalLink=resp.data
        })
      }
    }
  },
  sockets: {
    async SECTION_UPDATED() {
      console.log("SocketUpdated");
      this.reRender();
    },
  },
  methods: {
    ...mapActions(["addSection", "getCvOne", "changeSectionSort"]),
    async reRender() {
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