<template>
  <div class="container-fluid my-3">
    <div class="row">
      <div class="col-md-7" style="min-height: 96vh">
        <b-card no-body class="h-100">
          <b-tabs pills card vertical class="h-100" style="min-height: 100vh">
            <b-tab title="Slides" active>
              <vue-pdf-embed
                :source="'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'"
                :page="page"
                ref="pdfRef"
                @rendered="handleDocumentRender"
              />
              <button :disabled="page <= 1" @click="page--">❮</button>
              {{ page }} / {{ pageCount }}
              <button :disabled="page >= pageCount" @click="page++">❯</button>
            </b-tab>
            <b-tab title="Storage">
              <div class="">
                <div class="" >
                  <a href="#" v-for="item in this.Session.SessionAttachments" v-bind:key="item._id">
                    {{item}}
                  </a>
                </div>
              </div>
              <div class="test">
                <VueFileAgent
                  ref="vueFileAgent"
                  :theme="'grid'"
                  :multiple="true"
                  :deletable="false"
                  :meta="true"
                  :accept="'image/*,.zip'"
                  :maxSize="'10MB'"
                  :maxFiles="14"
                  :helpText="'Choose images or zip files'"
                  :errorText="{
                    type: 'Invalid file type. Only images or zip Allowed',
                    size: 'Files should not exceed 10MB in size',
                  }"
                  @select="filesSelected($event)"
                  @beforedelete="onBeforeDelete($event)"
                  @delete="fileDeleted($event)"
                  v-model="fileRecords"
                  class=""
                ></VueFileAgent>
                <button
                  :disabled="!fileRecordsForUpload.length"
                  @click="uploadFiles()"
                >
                  Upload {{ fileRecordsForUpload.length }} files
                </button>

              </div>
            </b-tab>
            <b-tab title="Sketch"
              ><b-card-text>Tab contents 3</b-card-text></b-tab
            >
          </b-tabs>
        </b-card>
      </div>
      <div class="col-md-5">
        <div class="mb-2 h-25">
          <WebRTC
            ref="webrtc"
            width="100%"
            :roomId="roomId"
            :socketURL="'http://127.0.0.1:5000'"
            :enableLogs="true"
            v-on:joined-room="logEvent"
            v-on:left-room="logEvent"
            v-on:opened-room="logEvent"
            v-on:share-started="logEvent"
            v-on:share-stopped="logEvent"
            @error="onError"
          />
          <!-- <button type="button" class="btn btn-primary" @click="onJoin">
            Join
          </button>
          <button type="button" class="btn btn-primary" @click="onLeave">
            Leave
          </button>
          <button type="button" class="btn btn-primary" @click="onCapture">
            Capture Photo
          </button>
          <button type="button" class="btn btn-primary" @click="onShareScreen">
            Share Screen
          </button>
          <div class="">
            <figure class="figure">
              <img :src="img" class="img-responsive" />
            </figure>
          </div> -->
        </div>
        <b-card no-body>
          <b-container fluid>
            <b-row
              class="overflow-auto flex-column flex-nowrap"
              style="height: 60vh"
            >
              <div
                class=""
                v-for="item in this.Session.SessionMessage"
                v-bind:key="item._id"
              >
                <b-card
                  v-if="item.MessageSender === 'user'"
                  bg-variant="info"
                  text-variant="white"
                  class="my-2"
                >
                  <p>{{ item.MessageValue }}</p>
                </b-card>
                <b-card
                  v-if="item.MessageSender === 'mentor'"
                  bg-variant="primary"
                  text-variant="white"
                  class="my-2"
                >
                  <p>{{ item.MessageValue }}</p>
                </b-card>
              </div>
            </b-row>
            <b-row class="">
              <div class="d-flex m-3">
                <b-input v-model="msgsend"></b-input>
                <b-button variant="primary" @click="sendMsgBtn">send</b-button>
              </div>
            </b-row>
          </b-container>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { WebRTC } from "vue-webrtc";
import VuePdfEmbed from "vue-pdf-embed/dist/vue2-pdf-embed";
import { mapGetters } from "vuex";
import _ from "lodash";
import router from "../../../router/index";

export default {
  name: "demo",
  components: {
    WebRTC,
    VuePdfEmbed,
  },
  data() {
    return {
      img: null,
      roomId: "",
      msgsend: "",
      page: 1,
      pageCount: 1,
      pdfIsLoading: true,
      fileRecords: [],
      uploadUrl:"",
      uploadHeaders: {},
      fileRecordsForUpload: [],
    };
  },
  sockets: {
    MESSAGE_SENT(data) {
      console.log("message sent", data);
    },
  },
  mounted() {
    if (_.isEmpty(this.Session)) {
      router.push({ name: "profile" });
    } else {
      this.roomId = this.Session._id;
      this.$socket.client.emit("join", { session: this.roomId });
      this.uploadUrl="http://127.0.0.1:5000/api/v1/Mn/Session/"+this.Session._id+"/upload";
      this.uploadHeaders={"authorization": "bearer "+this.Token};
      //this.onJoin()
    }
  },
  computed: {
    ...mapGetters(["Session", "User","Token"]),
  },
  watch: {},
  methods: {
    onCapture() {
      this.img = this.$refs.webrtc.capture();
    },
    onJoin() {
      console.log("joined");
      this.$refs.webrtc.join();
    },
    onLeave() {
      this.$refs.webrtc.leave();
    },
    onShareScreen() {
      this.img = this.$refs.webrtc.shareScreen();
    },
    onError(error, stream) {
      console.log("On Error Event", error, stream);
    },
    logEvent(event) {
      console.log("Event : ", event);
    },
    sendMsgBtn() {
      this.$socket.client.emit("SEND_MESSAGE", {
        from: "user",
        senderId: this.User._id,
        sessionId: this.roomId,
        value: this.msgsend,
      });
    },
    handleDocumentRender() {
      this.pdfIsLoading = false;
      this.pageCount = this.$refs.pdfRef.pageCount;
    },
    uploadFiles: function () {
      // Using the default uploader. You may use another uploader instead.
      this.$refs.vueFileAgent.upload(
        this.uploadUrl,
        this.uploadHeaders,
        this.fileRecordsForUpload
      );
      this.fileRecordsForUpload = [];
      //this.fileRecords=[];
    },
    deleteUploadedFile: function (fileRecord) {
      // Using the default uploader. You may use another uploader instead.
      this.$refs.vueFileAgent.deleteUpload(
        this.uploadUrl,
        this.uploadHeaders,
        fileRecord
      );
    },
    filesSelected: function (fileRecordsNewlySelected) {
      var validFileRecords = fileRecordsNewlySelected.filter(
        (fileRecord) => !fileRecord.error
      );
      this.fileRecordsForUpload =
        this.fileRecordsForUpload.concat(validFileRecords);
    },
    onBeforeDelete: function (fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        // queued file, not yet uploaded. Just remove from the arrays
        this.fileRecordsForUpload.splice(i, 1);
        var k = this.fileRecords.indexOf(fileRecord);
        if (k !== -1) this.fileRecords.splice(k, 1);
      } else {
        if (confirm("Are you sure you want to delete?")) {
          this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
        }
      }
    },
    fileDeleted: function (fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1);
      } else {
        this.deleteUploadedFile(fileRecord);
      }
    },
  },
};
</script>

<style scoped>
.test{
    position: absolute;
    width: 96%;
    bottom: 6%;
}
.btn {
  margin-right: 8px;
}
</style>