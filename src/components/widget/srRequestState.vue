<template>
  <b-card class="flex-row p-4 align-items-center" no-body>
    <div class="w-75">
      
    </div>
    <div class="w-25">
      {{ state }}
      <b-button
        v-if="state === 'payment'"
        variant="primary"
        @click="payReqBtn(requestId)"
      >
        Pay</b-button
      >
      <router-link
        v-if="state === 'applied' || state==='searching' || state === 'active'"
        :to="{ name: 'servRequestOne', params: { requestId: requestId } }"
        class="btn btn-primary"
      >
        show service
      </router-link>
    </div>
  </b-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["state", "requestId"],
  methods: {
    ...mapActions(["PayRequest"]),
    payReqBtn(reqId) {
      this.PayRequest(reqId);
    },
  },
};
</script>

<style>
</style>