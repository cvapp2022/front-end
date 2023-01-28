<template>
  <b-container class="my-4" fluid>
    <b-row>
      <b-col sm="12">
        <b-card class="px-6">
          <b-row v-if="requestLoaded" class="overflow-auto flex-column flex-nowrap p-2" style="height: 60vh">
            <b-badge
              class="p-3 h3 my-2 align-self-end"
              style="width:fit-content"
              v-for="message in servReqOne.ReqChat.ChatMessages"
              v-bind:key="message._id"
            > 
              {{message.ChMessageVal}}
            </b-badge>
          </b-row>
          <b-row class="">
            <div class="d-flex flex-fill m-3">
              <b-input v-model="reqMessageVal"></b-input>
              <b-button @click="saveReqMessageBtn()" variant="primary">sendx</b-button>
            </div>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    
  </b-container>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
// import _ from 'lodash';
export default {
  data(){
    return {
      reqMessageVal:'',
      requestLoaded:false
    }
  },
  computed:{
    ...mapGetters(['servRequests','servReqOne','User'])
  },
  methods:{
    ...mapActions(['getServRequests','getServRequestOne','saveMessage']),
    saveReqMessageBtn() {
      var data = {
        msgFromI: "user",
        msgValueI: this.reqMessageVal,
        msgSenderIdI: this.User._id,
      };
      this.saveMessage({ data, chatId: this.servReqOne.ReqChat._id });

    },
  },
  watch:{
    servReqOne(oldVal,newVal){
    if (oldVal != newVal) {
      this.requestLoaded = true;
    }
    }
  },
  async mounted(){
    if (this.servRequests.length > 0) {
      await this.getServRequestOne(this.$route.params.requestId);
    }
    else{
      await this.getServRequests().then(()=>this.getServRequestOne(this.$route.params.requestId))
    }
  // let unwatchUser = this.$watch('servReqOne', (oldVal, newVal) => {
  //   console.log('watcher working')
  //   if (oldVal != newVal) {
  //     this.requestLoaded = true;
  //     unwatchUser();
  //   }
  // })

    //join 
    // this.$socket.client.emit("join", { session:this.$route.params.requestId});

  }

}
</script>

<style>

</style>