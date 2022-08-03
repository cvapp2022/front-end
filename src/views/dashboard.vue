<template>
  <b-container>
    <b-row class="my-4">
      <div class="page_title">
        <h2 class="font-weight-bolder">{{ $t("dashboardTitle") }}</h2>
        <p class="text-muted">{{$t('dashboardDesc')}}</p>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["User"]),
  },
  mounted() {

    //notification

    var messages = this.$i18n.messages["ar"];
    //push messages
    var newMessages = [
      {
        messageKey: "notif3123124234",
        messageValue: "Its Working Very well",
      },
      {
        messageKey: "notiasdasdf3123124234",
        messageValue: "Its Working Very wel5l",
      },
      {
        messageKey: "notif3dfgdfg123124234",
        messageValue: "Its Working Very well2",
      },
      {
        messageKey: "notif312asdawa3124234",
        messageValue: "Its Working Very we1ll",
      },
    ];
    newMessages.forEach((el) => {
      messages[el.messageKey] = el.messageValue;
    });
    this.$i18n.setLocaleMessage('ar',messages)


  },
};
</script>

<style>
</style>