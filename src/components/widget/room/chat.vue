<template>
  <b-container fluid>
    <b-row class="overflow-auto flex-column flex-nowrap p-2" style="height: 60vh">
      <b-badge
        v-for="item in this.Session.SessionMessage"
        v-bind:key="item._id"
        class="p-3 h3 my-2"
        :class="{'align-self-end': item.MessageSender === 'mentor','align-self-start':item.MessageSender === 'user'}"
        :variant="setMsgVariant(item.MessageSender)"
        style="width:fit-content"
      >
        {{ item.MessageValue }}
      </b-badge>
    </b-row>
    <b-row class="">
      <div class="d-flex flex-fill m-3">
        <b-input v-model="msgsend"></b-input>
        <b-button variant="primary" @click="sendMsgBtn">send</b-button>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios';
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      roomId: "",
      msgsend:""
    };
  },
  computed: {
    ...mapGetters(["Session", "User"]),
  },
  sockets: {
    MESSAGE_SENT(data) {
      console.log("message sent", data);
    },
  },
  methods: {
    setMsgVariant(source){
      if(source==='mentor') return 'info';
      else return 'primary';
    },
    sendMsgBtn() {
        var form={
          msgFromI: "user",
          msgSenderIdI: this.User._id,
          msgSessionIdI: this.roomId,
          msgValueI: this.msgsend,
        }
        var url= process.env.VUE_APP_BASEURL + '/Mn/session/'+this.roomId+'/message';
        axios.post(url,form)
        // this.$socket.client.emit("SEND_MESSAGE", {
        // })
        this.msgsend="";

    },
  },
  mounted() {
    this.roomId = this.Session._id;
    // this.$socket.client.emit("join", { session: this.roomId });
  },
};
</script>

<style>
</style>