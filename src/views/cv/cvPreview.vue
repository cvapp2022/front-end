<template>
  <b-container>
    <b-row class="my-4" style="height: 100vh">
      <b-col sm="7">
        <div class="d-flex flex-column">
          <langList @langChanged="reRender()"></langList>
          <div class="mb-3">
            <TemplateList @templateChanged="templateChanged"></TemplateList>
          </div>
          <div class="mb-3">
            <b-card
              :class="
                cvOne.cvTemplate.TemplateName === 'james' &&
                cvOne.cvLang === 'en'
                  ? 'flex-row'
                  : 'flex-row-reverse' ||
                    (cvOne.cvTemplate.TemplateName === 'austin' &&
                      cvOne.cvLang === 'en')
                  ? 'flex-row-reverse'
                  : 'flex-row'
              "
              class="row mx-0 p-3"
              no-body
            >
              <div class="col-6 col-sm-4 p-2">
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
                      <b-card class="my-2 py-3 px-1 flex-row align-items-center" no-body>
                        <b-icon icon="justify" class="handle" font-scale="2" ></b-icon>
                        <div class="d-flex justify-content-between align-items-center w-100">
                          <div class="">
                            {{ section.name }}
                          </div>
                          <b-button @click="removeSectionBtn(section.name)" variant="secondary" class="rounded-circle" size="sm">X</b-button>
                        </div>
                      </b-card>
                    </div>
                    <!-- <b-card class="my-2">Languages</b-card>
                      <b-card class="my-2">Skills</b-card> -->
                  </transition-group>
                </draggable>
              </div>
              <div class="col-6 col-sm-8 p-2">
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
                      <b-card class="my-2 py-3 px-1 flex-row align-items-center" no-body>
                        <b-icon icon="justify" class="handle" font-scale="2" ></b-icon>
                        <div class="d-flex justify-content-between align-items-center w-100">
                          <div class="">
                            {{ section.name }}
                          </div>
                          <b-button @click="removeSectionBtn(section.name)" variant="secondary" class="rounded-circle" size="sm" rounded>X</b-button>
                        </div>
                      </b-card>
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
        <b-card no-body dir="ltr">
          <div class="" v-if="!this.pdfIsLoading">
            <button :disabled="page <= 1" @click="page--">❮</button>
            {{ page }} / {{ pageCount }}
            <button :disabled="page >= pageCount" @click="page++">❯</button>
          </div>
          <vue-pdf-embed
            :source="
              $baseUrl + 'api/v1/Cv/' + this.$route.params.cvId + '/render'
            "
            :page="page"
            ref="pdfRef"
            @rendered="handleDocumentRender"
          />
        </b-card>
      </b-col>
    </b-row>
    <div class="" style="bottom: 20px; right: 40px; position: fixed">
      <router-link
        :to="{ name: 'cvOne', params: { cvId: cvOne.cvId } }"
        class="mx-2 p-2 btn btn-secondary rounded-pill"
      >
        Edit
      </router-link>
      <!-- <router-link
        v-if="!payBtn"
        :to="{ name: 'cvOne', params: { cvId: cvOne.cvId } }"
        class="mx-2 p-2 btn btn-secondary rounded-pill"
      >
        Download as PDF
      </router-link> -->
      <a
        target="_blank"
        v-if="!payBtn"
        :href="$baseUrl + 'api/v1/Cv/' + this.$route.params.cvId + '/render'"
        class="mx-2 p-2 btn btn-secondary rounded-pill"
      >
        Download As PDF
      </a>
      <b-button
        v-if="cvOne.cvTemplate.isPaid && payBtn"
        variant="secondary"
        v-b-modal.pay-modal
        class="mx-2 p-2"
        pill
      >
        Buy To Download
      </b-button>

      <payModal :type="'template'" :price="this.cvOne.cvTemplate.TemplatePrice"></payModal>

    </div>
  </b-container>
</template>

<script>
import draggable from "vuedraggable";
import VuePdfEmbed from "vue-pdf-embed/dist/vue2-pdf-embed";
import TemplateList from "../../components/lists/TemplateList.vue";
import langList from "../../components/lists/LangList.vue";
import payModal from '../../components/widget/payModal.vue';
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    draggable,
    VuePdfEmbed,
    TemplateList,
    langList,
    payModal
  },
  data() {
    return {
      drag: false,
      dragList: {},
      page: 1,
      payBtn: true,
      pageCount: 1,
      pdfIsLoading: true,
      //stripeAPIToken: process.env.VUE_APP_STRIPE_CLIENT,
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
    ...mapActions(["addSection","removeSection","getCvOne", "changeSectionSort"]),
    async reRender() {
      await this.$refs.pdfRef.load();
      await this.$refs.pdfRef.render();
    },
    async templateChanged() {
      await this.reRender();

      //check template Orders
      if (this.templateOrders.length > 0) {
        //check orders
        var checkOrders = this.templateOrders.filter((order) => {
          return (
            order.OrderTemplate === this.cvOne.cvTemplate._id && order.OrderPaid
          );
        });
        if (checkOrders.length > 0) {
          //display download button
          this.payBtn = false;
        } else {
          //display buy button
          this.payBtn = true;
        }
      }
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

    removeSectionBtn(section){
      var data = {
        cvId:this.cvOne.cvId,
        section
      };
      this.removeSection(data)

    }
  },
  computed: {
    ...mapGetters(["cvOne", "User", "templateOrders"]),
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
    this.getCvOne(this.$route.params.cvId).then(() => {
      //check template Orders
      if (this.templateOrders.length > 0) {
        //check orders
        var checkOrders = this.templateOrders.filter((order) => {
          return (
            order.OrderTemplate === this.cvOne.cvTemplate._id && order.OrderPaid
          );
        });
        if (checkOrders.length > 0) {
          //display download button
          this.payBtn = false;
        } else {
          //display buy button
          this.payBtn = true;
        }
      }
    });
  },
};
</script>

<style scoped>
.vue-pdf-embed canvas {
  width:auto !important
}
</style>