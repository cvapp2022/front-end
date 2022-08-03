<template>
  <div id="app">
    <!-- <navbar></navbar> -->
    <userNavbar v-if="User && !hideOn.includes(this.$route.name)"></userNavbar>

    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
    <div
      class="
        connPopup
        d-flex
        align-items-center
        justify-align-center
        m-4
        p-3
        rounded
        text-light
        bg-dark
      "
      v-if="User && isDisconnected"
    >
      <p class="text-center mx-2 my-0">you are not connected</p>
      <b-button variant="primary" @click="connectSocket()">Connect</b-button>
    </div>
  </div>
</template>


<script>
import userNavbar from "./components/widget/userNavbar.vue";
import VueCookie from "vue-cookies";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    userNavbar,
    // navbar,
    //sidenav
  },
  data() {
    return {
      isDisconnected: false,
      hideOn: ["home", "login", "register", "userMeetPrepare", "userMeetRoom","social"],
    };
  },
  watch: {
    // User(newVal, oldVal) {
    //   console.log(Object.is(newVal, oldVal));
    //   if (newVal != oldVal) {
    //     this.$socket.client.emit("USER_JOIN", newVal);
    //   }
    // },
  },
  sockets: {
    disconnect() {
      console.log("socket disconnected");
      this.isDisconnected = true;
    },
    USER_JOINED() {
      this.isDisconnected = false;
      this.getInit();
      this.getProfile();
      this.getPrograms({ lang: this.$i18n.locale });
    },
    NOTIFICATION_SENT_TO_USER(data) {
      this.$bvToast.toast(this.$t(data.NotifMessage,data.NotifValues), {
        toaster:'b-toaster-bottom-right',
        solid: true,
      });
    },
    NOTIFICATION_SENT_TO_ALL_USERS(data) {
      this.$bvToast.toast(this.$t(data.NotifMessage,data.NotifValues), {
        toaster:'b-toaster-bottom-right',
        solid: true,
      });
    },
  },
  methods: {
    ...mapActions(["LoginByCookie", "getInit", "getProfile", "getPrograms"]),
    connectSocket() {
      this.$socket.client.emit("USER_JOIN", this.User._id);
    },
  },
  mounted() {
    this.getInit();
    //Check Cookie
    var Token = VueCookie.get("token");
    var UserCookie = VueCookie.get("user");
    if (Token && UserCookie) {
      this.LoginByCookie({ Token, User: UserCookie }).then((userId) => {
        this.$socket.client.emit("USER_JOIN", userId);
      });
    }
  },
  computed: {
    ...mapGetters(["User", "Token"]),
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #ffffff;
}
.connPopup {
  width: 20%;
  position: sticky;
  bottom: 0;
}
.hfull {
  min-height: 100vh;
  height: max-content;
}

.card-body {
  padding: 0.8rem !important;
}

.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}
</style>
