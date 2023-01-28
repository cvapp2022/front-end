<template>
  <b-container fluid>
    <b-row style="height: 91vh">
      <b-col sm="7">
        <div class="d-flex flex-column m-5 w-50">
          <h4 class="font-weight-bolder">
            Join Online Test mentorship Program
          </h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
            voluptas odit optio sapiente qui rerum porro magni hic, commodi sint
            iure fuga animi necessitatibus reiciendis ducimus distinctio
            excepturi blanditiis nostrum! Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Itaque maiores omnis maxime, minima
            excepturi dolore veritatis dicta quasi dolores corrupti quisquam
            accusantium quod ex illo rem consequatur officiis? Ducimus, ipsum.
          </p>
          <b-button variant="primary" v-if="orderBtn" v-b-modal.pay-modal>Order Now</b-button>
        </div>
      </b-col>
      <b-col sm="5" class="px-0">
        <img class="img-fluid h-100" src="@/assets/images/prog.jpg" />
      </b-col>
    </b-row>
    <payModal  :type="'service'" :price="this.serviceOne.ServPrice"></payModal>
  </b-container>
</template>

<script>
import payModal from '../../components/widget/payModal.vue';
import { mapGetters,mapActions } from "vuex";
export default {
    components: {
    payModal
  },
  data(){
    return {
      orderBtn:false
    }
  },
  computed: {
    ...mapGetters(["serviceOne"]),
  },
  methods:{
    ...mapActions(['getServiceOne'])
  },
  mounted(){
    var data={
      servId:this.$route.params.serviceOne,
      lang:this.$i18n.locale
    }
    this.getServiceOne(data).then(()=>{
      this.orderBtn=true;
    });
  }
};
</script>

<style>
</style>