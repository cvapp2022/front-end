<template>
  <div id="app">
    
    <!-- <navbar></navbar> -->
    <userNavbar v-if="!hideOn.includes(this.$route.name)" ></userNavbar>
  
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
   
    </div>

  
  
  
</template>


<script>
import userNavbar from './components/widget/userNavbar.vue'
import VueCookie from 'vue-cookies';
import { mapActions, mapGetters } from 'vuex';

export default {
  components:{
    userNavbar
    // navbar,
    //sidenav
  },
  data(){

    return {
      hideOn:['home','login','register','userMeetPrepare','userMeetRoom'],
    }
  },
  watch:{
    User(newVal){
      if(newVal){
        this.$socket.client.emit("USER_JOIN",newVal)
      }
    }
  },
  methods:{
    ...mapActions(['LoginByCookie','getInit'])
  },
  mounted(){
    this.getInit()
    //Check Cookie
    var Token=VueCookie.get('token')
    if(Token){
      this.LoginByCookie({Token});
    }
  },
  computed:{
    ...mapGetters(['User','Token'])
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background:#ffffff ;
}

.hfull{

  min-height: 100vh;
  height: max-content;
}

.card-body{

  padding: 0.8rem !important;
}


</style>
