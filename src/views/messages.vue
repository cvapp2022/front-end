<template>
  <b-container>
    <b-row>
        <b-col sm="12">
          <b-card no-body class="my-4">
            <b-tabs pills card vertical>
              <b-tab :title="chat.ChatUser.BlFullName" v-for="chat in chats" v-bind:key="chat._id" @click="getMessagesOne(chat)">
                <b-row v-if="chat.ChatMessages" class="overflow-auto flex-column flex-nowrap p-2" style="height: 60vh">
                  <b-badge
                    class="p-3 h3 my-2 align-self-end"
                    style="width:fit-content"
                    v-for="message in chat.ChatMessages"
                    v-bind:key="message._id"
                  > 
                    {{message.ChMessageVal}}
                  </b-badge>
                </b-row>
                <b-row class="">
                  <div class="d-flex flex-fill m-3">
                    <b-input v-model="reqMessageVal"></b-input>
                    <b-button @click="saveReqMessageBtn()" variant="primary">send</b-button>
                  </div>
                </b-row>
                <!-- <b-card-text>Tab contents 2</b-card-text> -->
              </b-tab>
            </b-tabs>
          </b-card>
        </b-col>
    </b-row>
  </b-container>
</template>

<script>

import {mapGetters,mapActions} from 'vuex'
export default {
  data(){
    return {
      reqMessageVal:'',
    }
  },
  computed:{
    ...mapGetters(['chats','User','chatOne'])
  },
  methods:{
    ...mapActions(['setChatOne','saveMessage']),
    saveReqMessageBtn() {
      var data = {
        msgFromI: "user",
        msgValueI: this.reqMessageVal,
        msgSenderIdI: this.User._id,
      };
      this.saveMessage({ data, chatId: this.chatOne._id });

    },
    getMessagesOne(chat){
      this.setChatOne(chat)
    },
  }

};
</script>

<style>
</style>