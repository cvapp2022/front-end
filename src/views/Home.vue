<template>
  <div class="home">
    <h4>Home page</h4>

    <router-link to="dashboard"> my account eedd</router-link>
    <router-link to="login">  Login</router-link>
    <router-link to="register" >  Register</router-link>
    <br />
    <br />
    <br />
    <b-container>

    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      msgsend: "",
    };
  },
  sockets: {
    connect() {
      console.log("socket connected");
    },
    MESSAGE_SENT() {
      console.log(
        'this method was fired by the socket server. eg: io.emit("MESSAGE_SENT", data)'
      );
    },
  },
  methods: {
    sendMsgBtn() {
      this.$socket.client.emit("SEND_MESSAGE", {
        from: "user",
        senderId: "",
        sessionId: "",
        value: this.msgsend,
      });
    },
  },
  created() {
    console.log(this.$socket);
    this.$socket.client.emit("join",{session:'12121'});
  },
};
</script>
<style scoped >
</style>
