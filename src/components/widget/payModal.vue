<template>
  <b-modal id="pay-modal" hide-header hide-footer>
    <div class="accordion" role="tablist">
      <b-button 
        block 
        v-b-toggle.accordion-1 
        variant="info"
        v-if="configs.find(item=>item.ConfigName==='PayWithPayPal')['ConfigValue'] > 0"
        >Pay with paypal</b-button
      >
      <b-button 
        block 
        v-b-toggle.accordion-2 
        variant="info"
        v-if="configs.find(item=>item.ConfigName==='PayWithStripe')['ConfigValue'] > 0"
        >Pay with Credit Card</b-button
      >
      <b-button 
        block 
        v-b-toggle.accordion-3 
        variant="info"
        v-if="configs.find(item=>item.ConfigName==='PayWithSyriatel')['ConfigValue'] > 0"
        >Pay with syriatel cash</b-button
      >
      <b-button 
        block 
        v-b-toggle.accordion-4 
        variant="info"
        v-if="configs.find(item=>item.ConfigName==='PayWithMtn')['ConfigValue'] > 0"
        >Pay with mtn cash</b-button
      >

      <b-collapse
        id="accordion-1"
        accordion="my-accordion"
        v-model="paypalCollapse"
        role="tabpanel"
        v-if="configs.find(item=>item.ConfigName==='PayWithPayPal')['ConfigValue'] > 0"
      >
        <h4>pay with paypal collapse</h4>
        <a :href="paypalLink">pay</a>
      </b-collapse>
      <b-collapse
        id="accordion-2"
        accordion="my-accordion"
        v-model="ccCollapse"
        role="tabpanel"
        v-if="configs.find(item=>item.ConfigName==='PayWithStripe')['ConfigValue'] > 0"
      >
        <div class="payment-simple">
          <StripeElements
            :stripe-key="stripeAPIToken"
            :instance-options="instanceOptions"
            :elements-options="elementsOptions"
            #default="{ elements }"
            ref="elms"
          >
            <StripeElement
              type="card"
              :elements="elements"
              :options="cardOptions"
              ref="card"
            />
          </StripeElements>
          <button @click="payWithStripe" type="button">Pay</button>
        </div>
      </b-collapse>
      <b-collapse
        id="accordion-3"
        accordion="my-accordion"
        v-model="syrCollapse"
        role="tabpanel"
        v-if="configs.find(item=>item.ConfigName==='PayWithSyriatel')['ConfigValue'] > 0"
      >
        <validation-observer ref="observer" v-slot="{ handleSubmit }">
          <b-form @submit.prevent="handleSubmit(SaveSyrcRequestSubmit)">
            <validation-provider
              :name="$t('PhoneNumber')"
              :rules="{ required: true, min: 10 }"
              v-slot="validationContext"
            >
            <b-form-group
              id="input-group-phone-number"
              label="Phone Number:"
              label-for="phone-number-input"
            >
              <b-form-input
                id="phone-number-input"
                size="large"
                type="text"
                placeholder="ex : 0933123456"
                v-model="syrForm.PhoneNumberI"
                :state="getValidationState(validationContext)"
                required
              ></b-form-input>
              <b-form-invalid-feedback id="aw-title-live-feedback">{{
              validationContext.errors[0]
            }}</b-form-invalid-feedback>
            </b-form-group>
            </validation-provider>
            <validation-provider
              :name="$t('OpNumber')"
              :rules="{ required: true, min: 10 }"
              v-slot="validationContext"
            >
              <b-form-group
                id="input-group-op-number"
                label="Transaction Number:"
                label-for="op-number-input"
              >
                <b-form-input
                  id="input-group-op-number"
                  size="large"
                  type="text"
                  placeholder="Enter Transaction Number"
                  v-model="syrForm.OpNumberI"
                  :state="getValidationState(validationContext)"
                  required
                ></b-form-input>
              </b-form-group>
            </validation-provider>

            <b-form-group>
              <b-button type="submit" variant="primary" block class="mt-3"
                >Submit</b-button
              >
            </b-form-group>
          </b-form>
        </validation-observer>
      </b-collapse>
      <b-collapse
        id="accordion-4"
        accordion="my-accordion"
        v-model="mtnCollapse"
        role="tabpanel"
        v-if="configs.find(item=>item.ConfigName==='PayWithMtn')['ConfigValue'] > 0"
      >
        <validation-observer ref="observer" v-slot="{ handleSubmit }">
          <b-form @submit.prevent="handleSubmit(SaveMtncRequestSubmit)">
            <validation-provider
              :name="$t('PhoneNumber')"
              :rules="{ required: true, min: 10 }"
              v-slot="validationContext"
            >
            <b-form-group
              id="input-group-phone-number"
              label="Phone Number:"
              label-for="phone-number-input"
            >
              <b-form-input
                id="phone-number-input"
                size="large"
                type="text"
                placeholder="ex : 0933123456"
                v-model="mtnForm.PhoneNumberI"
                :state="getValidationState(validationContext)"
                required
              ></b-form-input>
              <b-form-invalid-feedback id="aw-title-live-feedback">{{
              validationContext.errors[0]
            }}</b-form-invalid-feedback>
            </b-form-group>
            </validation-provider>
            <validation-provider
              :name="$t('OpNumber')"
              :rules="{ required: true, min: 10 }"
              v-slot="validationContext"
            >
              <b-form-group
                id="input-group-op-number"
                label="Transaction Number:"
                label-for="op-number-input"
              >
                <b-form-input
                  id="input-group-op-number"
                  size="large"
                  type="text"
                  placeholder="Enter Transaction Number"
                  v-model="mtnForm.OpNumberI"
                  :state="getValidationState(validationContext)"
                  required
                ></b-form-input>
              </b-form-group>
            </validation-provider>

            <b-form-group>
              <b-button type="submit" variant="primary" block class="mt-3"
                >Submit</b-button
              >
            </b-form-group>
          </b-form>
        </validation-observer>
      </b-collapse>
    </div>
  </b-modal>
</template>

<script>
//import "https://js.stripe.com/v3/";
import { StripeElements, StripeElement } from "vue-stripe-elements-plus";
import { mapGetters,mapActions } from "vuex";
import axios from "axios";
import _ from "lodash";
export default {
  props:['type','price'],
  components: {
    StripeElements,
    StripeElement,
  },
  data() {
    return {
      stripeAPIToken:
        "pk_test_51KmOpKK1KBDoE0PiPulwQ4IkYzmDDxhOYKxDN4bIAf6JFp17oBBpmbFJ6WxA6qhUkhlUqmH3EuFCFLAaOSNwHACX009jVLnVoi",
      instanceOptions: {
        // https://stripe.com/docs/js/initializing#init_stripe_js-options
      },
      elementsOptions: {
        // https://stripe.com/docs/js/elements_object/create#stripe_elements-options
      },
      cardOptions: {
        // reactive
        // remember about Vue 2 reactivity limitations when dealing with options
        // value: {
        // postalCode: ''
        // }
        // https://stripe.com/docs/stripe.js#element-options
      },
      paypalCollapse: false,
      ccCollapse: false,
      syrCollapse: false,
      mtnCollapse:false,
      paypalLink: "",
      syrForm: {
        OpNumberI: "",
        PhoneNumberI: "",
      },
      mtnForm: {
        OpNumberI: "",
        PhoneNumberI: "",
      },
      stripeReqUrl:'',
      sripeExecUrl:'',
      payPalReqUrl:'',
      syrcReqUrl:'',
      syrcExecUrl:'',
      mtncReqUrl:'',
      mtncExec:'',
      //payPalExecUrl:'',
    };
  },
  watch: {
    paypalCollapse(val) {
      if (val) {
        
        axios.get(this.payPalReqUrl).then((resp) => {
          console.log(resp);
          this.paypalLink = resp.data;
        });
      }
    },
  },
  computed: {
    ...mapGetters(["User","configs","cvOne","serviceOne"]),
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    payWithStripe() {
      // ref in template
      const groupComponent = this.$refs.elms;
      const cardComponent = this.$refs.card;

      // Get stripe element
      const cardElement = cardComponent.stripeElement;

      // Access instance methods, e.g. createToken()
      groupComponent.instance.createToken(cardElement).then((result) => {
        if (result.token.id) {
          // token to create a charge on our server
          var token_from_stripe = result.token.id;
          var request = {
            name: this.User.CVFullName,
            email: this.User.CVUserMail,
            card: "rw",
            price: this.price,
            token_from_stripe: token_from_stripe,
          };
            console.log('price is',this.price)
          axios.post(this.stripeReqUrl, request).then((resp) => {
            console.log(resp.data);
            axios.get(this.sripeExecUrl+resp.data.charge.id);
          });
        }

        // Handle result.error or result.token
      });
    },
    SaveSyrcRequestSubmit(){

      axios.post(this.syrcExecUrl,this.syrForm).then((resp)=>{
        console.log('successfully requested',resp.data)
      })
    },
    SaveMtncRequestSubmit(){

      axios.post(this.mtncExecUrl,this.mtnForm).then((resp)=>{
        console.log('successfully requested',resp.data)
      })
    },
    ...mapActions(['getConfig'])
  },
  mounted() {
    //generate urls
    if(this.type ==='template'){
        this.$watch(vm => [vm.User, vm.cvOne], val => { 
          if(!_.isEmpty(val[0]) && !_.isEmpty(val[1])){
            this.stripeReqUrl=process.env.VUE_APP_BASEURL +"/Template/" +val[1].cvTemplate._id+'/orderStripeReq';
            this.sripeExecUrl=process.env.VUE_APP_BASEURL +"/Template/" +val[1].cvTemplate._id+'/orderStripeExec/';
            this.payPalReqUrl=process.env.VUE_APP_BASEURL+"/Template/"+val[1].cvTemplate._id +"/orderPayPalReq/"+val[0]._id;
            this.syrcExecUrl=process.env.VUE_APP_BASEURL + '/Template/'+val[1].cvTemplate._id+'/orderCashExec/syriatel';
            this.mtncExecUrl=process.env.VUE_APP_BASEURL + '/Template/'+val[1].cvTemplate._id+'/orderCashExec/mtn';
          }
        },
        {
          immediate: true, // run immediately
          deep: true 
        })
    }
    else if(this.type==='service'){ 
      this.$watch(vm => [vm.User, vm.serviceOne],function(val){ 
        if(!_.isEmpty(val[0]) && !_.isEmpty(val[1])){
          this.stripeReqUrl=process.env.VUE_APP_BASEURL +"/Service/" +val[1]._id+'/orderStripeReq';
          this.sripeExecUrl=process.env.VUE_APP_BASEURL +"/Service/" +val[1]._id+'/orderStripeExec/';
          this.payPalReqUrl=process.env.VUE_APP_BASEURL+"/Service/"+val[1]._id +"/orderPayPalReq/"+val[0]._id;
          this.syrcExecUrl=process.env.VUE_APP_BASEURL + '/Service/'+val[1]._id+'/orderCashExec/syriatel';
          this.mtncExecUrl=process.env.VUE_APP_BASEURL + '/Service/'+val[1]._id+'/orderCashExec/mtn';
   
        }
      },
      {
        immediate: true, // run immediately
        deep: true 
      })
    }

    // this.stripeReqUrl=
    // this.sripeExecUrl=
    // this.payPalReqUrl=
    // this.syrcExecUrl=
    // this.mtncExecUrl=

  },
};
</script>

<style>
</style>