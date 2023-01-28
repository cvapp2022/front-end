<template>
  <b-container class="hfull">
      <b-row>
          <b-col cols='12' sm='7' >
              <h4>image</h4>
          </b-col>
          <b-col cols='12' sm='5'>
            

              <b-card class="my-5 ">
                <b-form @submit.prevent="UserLogin()" >
                    <b-form-group
                        id="input-group-email"
                        label="Email address:"
                        label-for="email-input"
                        description="We'll never share your email with anyone else."
                    >
                        <b-form-input
                        id="email-input"
                        size="large"
                        type="email"
                        placeholder="Enter email or Phone number"
                        v-model="form.UserI"
                        required
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group 
                        id="input-group-password"
                        label="Password:"
                        label-for="password-input"
                    >
                        <b-form-input
                        id="input-group-password"
                        size="large"
                        type="password"
                        placeholder="Enter Password"
                        v-model="form.PassI"
                        required
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group>
                        <b-button type="submit" variant="primary" block class="mt-3">Submit</b-button>
                    </b-form-group>
                </b-form>
                <router-link to="register" >  Register</router-link>
              </b-card>
                <div class="d-flex flex-column mb-1">
          <a class="btn btn-primary my-1" :href="this.socialLogin.google">Register With Google</a>
          <a class="btn btn-primary my-1" :href="this.socialLogin.linkedin">Register With Linked-in</a>
          <a class="btn btn-primary my-1" :href="this.socialLogin.github">Register With Github</a>
        </div>
          </b-col>
      </b-row>
  </b-container>
</template>

<script>

import { mapActions,mapGetters } from 'vuex';

export default {

    data(){

        return {
            form:{
                UserI:'blaxk@blaxk.ww',
                PassI:'a123456'
            }
        }

    },
    methods:{
        ...mapActions(['Login']),
        UserLogin:function(){

            this.Login(this.form).then((user)=>{

                //redirect to profile view 
                this.$router.push({ name: 'dashboard' })
                
                this.$socket.client.emit("USER_JOIN",user._id);
            })
        }
    },
    computed:{
        ...mapGetters(['socialLogin'])
    }

}
</script>

<style>

</style>