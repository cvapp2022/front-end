<template>
    <b-container>

        <b-row style="height:100px">
            <b-col sm="9">
                <!-- user information upper section -->
                <div class="d-flex align-items-baseline h-100">
                    <div class="h-divider-colored mx-1 mr-3"></div>
                    <div><b-icon-globe2></b-icon-globe2></div>
                    <div class="h-divider-black mx-2 ml-3 mr-3 h-100"></div>
                    <div class=""><a href="http://www.google.com">www.gooogle.com</a></div>
                </div>
            </b-col>
            <b-col sm='3'>
                <div class="h-divider-colored mx-1 h-100" style="width:60px;" ></div>
            </b-col>
        </b-row>

        <b-row>
            <b-col sm="9" class="d-flex flex-column">


                <!-- user main informations -->
                <div class="d-flex align-items-baseline mb-5">
                    <h2 class="full-name">NARTON SMITH</h2>
                    <div class="h-divider-black mx-2 ml-3"></div>
                    <h5>full-stach web developer</h5>
                </div>

                <!-- employee informations section -->
                <div class="d-flex my-5">
                    <div class="h-divider-colored mx-1 mr-3"></div>
                    <div class="d-flex flex-column">
                        <div class="d-flex "><div><b-icon-telephone-fill></b-icon-telephone-fill></div><div class="h-divider-black mx-2 ml-3 mr-3 py-3"></div><div class="mx-1 mr-4">0123456789</div></div>
                        <div class="d-flex "><div><b-icon-envelope-fill></b-icon-envelope-fill></div><div class="h-divider-black mx-2 ml-3 mr-3 py-3"></div><div class="mx-1 mr-4">blaxk@blaxk.cc</div></div>
                        <div class="d-flex "><div><b-icon-geo-alt-fill></b-icon-geo-alt-fill></div><div class="h-divider-black mx-2 ml-3 mr-3 py-3"></div><div class="mx-1 mr-4">syria latakia jableh</div></div>
                    </div>
                </div>


            </b-col>
            <b-col sm="3">
                <div class="d-flex flex-column">
                    
                    <!-- profile section -->
                    <div class="my-4">
                        <div class="h3 font-weight-bold ">Profile</div>
                        <div class="">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim quasi sit nihil rerum numquam sapiente itaque necessitatibus aspernatur! Ad dolore consequatur ipsam. Tempore cumque ducimus tempora nihil architecto et mollitia!
                        </div>
                    </div>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col sm="9">
                <!-- experiance section -->
                <div class="">
                    <div class="h3 font-weight-bold">Expreince</div>
                    <div class="d-flex flex-column">
                        <exp></exp>
                        <exp></exp>
                    </div>
                </div>
            </b-col>
            <b-col sm="3">
                <!-- education section -->
                <div class="">
                    <div class="h3 font-weight-bold ">Education</div>
                    <div class="d-flex">
                        <div class="h-divider-black mx-2 ml-3 mr-3" style="height:unset"></div>
                        <div class="">
                            <edu></edu>
                            <edu></edu>
                        </div>
                    </div>
                </div>

                <!-- skill section -->
                <div class="">
                    <div class="h3 font-weight-bold">Skills</div>
                    <div class="">
                        <ul class="">
                            <li class="my-1">php</li>
                            <li class="my-1">html</li>
                            <li class="my-1">css</li>
                        </ul>
                    </div>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>

import exp from '../naron/items/exp.vue';
import edu from '../naron/items/edu.vue';

export default {

    components:{
        exp,
        edu
    }

}
</script>

<style scoped>

.h-divider-colored{
    width: 12px;
    height: auto;
    background:rgb(234, 238, 0);
    height: 100%;
}

.h-divider-black{
    width: 1px;
    height: auto;
    background:black;
    height: 100%;
}
.full-name{
    font-weight: bolder;
    font-size: 64px;
    margin-bottom: 0;
}


</style>