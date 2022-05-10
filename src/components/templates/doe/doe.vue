<template>
  <b-container class="py-3">
    <b-row style="border-bottom: 1px #007bff solid;">
        <b-col sm="6">
            <div class="d-flex">
                <div class="block mr-3" style="background:black" ></div>
                <div class="">
                    <div class="h3 font-weight-bold">John Doe</div>
                    <div class="h5" style="color:#007bff">Full stack Web Developer</div>
                    <div class="my-2">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga ut nisi dolore cupiditate et consequatur deserunt nesciunt iure tempore! Amet necessitatibus obcaecati libero itaque culpa, magnam dolorum voluptatem. Possimus, deleniti?
                    </div>
                </div>
            </div>
        </b-col>
        <b-col sm="2">
            <b-img fluid  rounded="circle" src="http://127.0.0.1/img/avatar.png" ></b-img>
        </b-col>
        <b-col sm="4">
            <div class="d-flex flex-column">
                <div class="mb-2 d-flex justify-content-end"><div class="">0123456789</div><div class="px-3"><b-icon-telephone-fill ></b-icon-telephone-fill></div></div>
                <div class="mb-2 d-flex justify-content-end"><div class="">blaxk@blaxk.cc</div><div class="px-3"><b-icon-envelope-fill ></b-icon-envelope-fill></div></div>
                <div class="mb-2 d-flex justify-content-end"><div class="">syria latakia jableh</div><div class="px-3"><b-icon-geo-alt-fill  ></b-icon-geo-alt-fill></div></div>
            </div>
        </b-col>
    </b-row>
    <b-row>
        <b-col sm="6" >
            <div class="my-3">
             <div class=" h3 px-5 font-weight-bold">Work Experiance</div>
             <div class="">
              <exp></exp>
              <exp></exp>
             </div>
            </div>
            <div class="my-3">
                <div class=" h3 px-5 font-weight-bold">Education</div>
                <div class="">
                    <edu></edu>
                    <edu></edu>
                </div>
            </div>
        </b-col>
        <b-col sm="6" >
            <div class="my-3">
                <div class="h3 font-weight-bold">Skills</div>
                <div class="">
                 <div class="d-flex my-2"><div class="">PHP</div><div class=""><b-progress-bar></b-progress-bar></div></div>
                 <div class="d-flex my-2"><div class="">CSS5</div><div class=""><b-progress></b-progress></div></div>
                </div>
            </div>
        </b-col>
    </b-row>

  </b-container>
</template>

<script>

import exp from '../doe/items/exp.vue';
import edu from '../doe/items/edu.vue';

export default {

    components:{
        exp,
        edu
    }

}
</script>

<style scoped>

.block{
    width: 100px;
    height: 40px;
}

</style>