<template>
  <b-container class="mt-2">
      <b-row>
          <b-col sm="3">
              <b-img fluid width="220" height="220" rounded="circle" src="http://127.0.0.1/img/avatar.png" ></b-img>
          </b-col>
          <b-col sm="9">
              <div class="p-3" style="background: #00dee9;color:white;">
                  <div class="h1">Jane Roe</div>
                  <div class="h4" style="width:fit-content;border-bottom:2px white solid;">Full-stack web Developer</div>
                  <div class="mt-3">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil velit omnis molestiae et dolorem unde consequuntur rem tempore quibusdam distinctio vitae vero maxime doloremque, nulla, obcaecati, cum voluptatem iste eaque!
                  </div>
              </div>
          </b-col>

      </b-row>
      <b-row>
          <b-col sm="3" >
              <div class="">
                    <div class="d-flex flex-column">
                        <div class="mb-2"><div><b-icon-telephone-fill style="color: #00dee9;"></b-icon-telephone-fill></div><div class="">0123456789</div></div>
                        <div class="mb-2"><div><b-icon-envelope-fill style="color: #00dee9;"></b-icon-envelope-fill></div><div class="">blaxk@blaxk.cc</div></div>
                        <div class="mb-2"><div><b-icon-geo-alt-fill  style="color: #00dee9;"></b-icon-geo-alt-fill></div><div class="">syria latakia jableh</div></div>
                    </div>
              </div>
              <div class="">
                  <div class="h3 section-title font-weight-bold" >Skills</div>
                  <div class="">
                      <div class="skill p-2 my-3">Html</div>
                      <div class="skill p-2 my-3">Css</div>
                      <div class="skill p-2 my-3">php</div>
                      <div class="skill p-2 my-3">Laravel</div>
                  </div>
              </div>
          </b-col>

          <b-col sm="9" >
            <div class="mt-3">
                <div class="h3 section-title px-3 font-weight-bold" >Work Experiance</div>
                <div class="">
                    <exp></exp>
                    <exp></exp>
                </div>
            </div>
            <div class="mt-3">
            <div class="h3 section-title px-3 font-weight-bold" >Education</div>
            <div class="">
                <edu></edu>
                <edu></edu>
            </div>
            </div>

          </b-col>
      </b-row>
  </b-container>
</template>

<script>

import exp from './items/exp.vue';
import edu from './items/edu.vue';


export default {
    components:{
        exp,
        edu
    }

}
</script>

<style scoped>

.section-title{
    border-bottom:2px #00dee9 solid;
    color: #00dee9;
}

.skill{
    background:#00dee9;
    border-radius: 8px;
    color:white;
    text-align: center;
    width: fit-content;
}

</style>