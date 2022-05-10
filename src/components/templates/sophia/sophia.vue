<template>
  <b-container>

      <b-row class="py-4" style="border-bottom: 6px black solid">
          <b-col sm="6" >
              <b-img fluid class="ml-5" width="220" height="220" rounded="circle"  src="http://127.0.0.1/img/avatar.png"></b-img>
          </b-col>
          <b-col sm="6">
              <div class="my-3">
                  <div class="my-1" style="font-size:52px">SOPHIA <span class="font-weight-bold">THOMAS</span></div>
                  <div class="my-1" style="font-size:20px">Web Developer</div>

              </div>
          </b-col>
      </b-row>
      <b-container>
        <b-row class="py-4">
            <b-col sm="4" class="px-4">
                <div class="pb-4" style="border-bottom:1px black solid">
                    <div class="h3 py-2 font-weight-bold">Contact</div>
                    <div class="">
                        <div class="d-flex align-items-center pb-2">
                          <b-iconstack font-scale="2">
                            <b-icon stacked icon="circle-fill" variant="dark"></b-icon>
                            <b-icon stacked icon="telephone-fill" scale="0.5" variant="white"></b-icon>
                         </b-iconstack>
                         <div class="mx-2">01234556789</div>
                        </div>
                        <div class="d-flex align-items-center pb-2">
                          <b-iconstack font-scale="2">
                            <b-icon stacked icon="circle-fill" variant="dark"></b-icon>
                            <b-icon stacked icon="envelope-fill" scale="0.5" variant="white"></b-icon>
                         </b-iconstack>
                         <div class="mx-2">sophia@sophia.cc</div>
                        </div>
                        <div class="d-flex align-items-center pb-2">
                          <b-iconstack font-scale="2">
                            <b-icon stacked icon="circle-fill" variant="dark"></b-icon>
                            <b-icon stacked icon="geo-alt-fill" scale="0.5" variant="white"></b-icon>
                         </b-iconstack>
                         <div class="mx-2">Israel Tal-aviv</div>
                        </div>
                        <div class="d-flex align-items-center pb-2">
                          <b-iconstack font-scale="2">
                            <b-icon stacked icon="circle-fill" variant="dark"></b-icon>
                            <b-icon stacked icon="globe" scale="0.5" variant="white"></b-icon>
                         </b-iconstack>
                         <div class="mx-2">Israel Tal-aviv</div>
                        </div>
                    </div>
                </div>
                <div class="pb-4 mt-3" style="border-bottom:1px black solid">
                    <div class="h3 py-2 font-weight-bold">Education</div>
                    <div class="">
                        <edu></edu>
                        <edu></edu>
                    </div>
                </div>
                <div class="pb-4 mt-3">
                    <div class="h3 py-2 font-weight-bold">Skills</div>
                    <div class="">
                        <ul class="pl-3">
                            <li>PHP</li>
                            <li>HTML</li>
                            <li>css</li>
                        </ul>
                    </div>
                </div>
            </b-col>
            
            <b-col sm="8" class="px-4" style="border-left: 1px black solid;">
                <div class="pb-4" style="border-bottom:1px black solid">
                    <div class="h3 py-2 font-weight-bold">Profile</div>
                    <div class="">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque earum molestias unde? Cumque quaerat quod vero dolorum sequi libero porro eveniet, corporis quasi neque, in, blanditiis voluptatem labore. Iste, cumque!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium facere beatae voluptatum debitis est ipsum tempore commodi adipisci repellendus? Sunt earum adipisci incidunt deleniti architecto consequatur deserunt! Officia, molestias modi.
                    </div>
                    </div>
                    <div class="pb-4 mt-3">
                        <div class="h3 py-2 font-weight-bold">Professional Experiance</div>
                        <div class="">
                            <exp></exp>
                            <exp></exp>
                        </div>
                    </div>
            </b-col>
        </b-row>
      </b-container>


  </b-container>
</template>

<script>

import exp from '../sophia/items/exp.vue';
import edu from '../sophia/items/edu.vue';

export default {
    components:{
        exp,
        edu
    }

}
</script>

<style scoped>

</style>