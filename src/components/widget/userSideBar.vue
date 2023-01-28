<template>
  <div class="d-none d-sm-flex flex-column align-items-center py-3 uSideNav ">
        <router-link :to="{name:'dashboard'}" class="d-flex flex-column align-items-center my-2 p-2 w-100"  >
            <b-icon scale='1.3' icon="house"></b-icon>
            <div class="my-2">Home</div>
        </router-link>
        <router-link :to="{ name: 'resumes' }" class="d-flex flex-column align-items-center my-2 p-2 w-100" :class="{'router-link-exact-active router-link-active': subIsActive('profile')}">
            <b-icon scale='1.3' icon="person"></b-icon>
            <div class="my-2">Profile</div>
        </router-link>
        <router-link :to="{ name: 'requests' }" class="d-flex flex-column align-items-center my-2 p-2 w-100" :class="{'router-link-exact-active router-link-active': subIsActive('mentorship')}">
            <b-icon scale='1.3' icon="briefcase"></b-icon>
            <div class="my-2">Mentorship</div>
        </router-link>
        <router-link :to="{ name: 'servRequests' }" class="d-flex flex-column align-items-center my-2 p-2 w-100" :class="{'router-link-exact-active router-link-active': subIsActive('services')}">
            <b-icon scale='1.3' icon="briefcase"></b-icon>
            <div class="my-2">Services</div>
        </router-link>
        <router-link :to="{ name: 'messages' }" class="d-flex flex-column align-items-center my-2 p-2 w-100" :class="{'router-link-exact-active router-link-active': subIsActive('messages')}">
            <b-icon scale='1.3' icon="envelope"></b-icon>
            <div class="my-2">Messages</div>
        </router-link>
  </div>
</template>

<script>
export default {

    methods:{
        subIsActive(parent) {
            return this.$route.path.startsWith(`/${parent}`)
        }
    },
}
</script>

<style scoped>
.uSideNav{
    background-color: #f1f1f1 !important;
    position: sticky;
    top: 0;
    height:100vh;
}
.uSideNav a {
    color:var(--gray-dark) !important;
    text-decoration: none !important;

}

.uSideNav a.router-link-exact-active.router-link-active{
    background-color: var(--info);
    border-radius: 6px;
    color: var(--primary) !important;
}
.uSideNav a:hover{
    background-color: var(--info);
    border-radius: 6px;
}
</style>

