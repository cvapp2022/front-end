
// import naron from '../components/templates/naron/naron.vue';
// import sophia from '../components/templates/sophia/sophia.vue';
// import jane from '../components/templates/jane/jane.vue';
// import doe from '../components/templates/doe/doe.vue';
function lazyLoad(view){
    return() => import(`@/views/${view}.vue`)
} 
    
export const userRoutes = [
    {
        path: '/login',
        name: 'login',
        component: lazyLoad('user/login'),
        meta: {
            requireGuest: true
        }
    },
    // {
    //     path: '/profile',
    //     name: 'profile',
    //     component: lazyLoad('profile'),
    //     meta: {
    //         requireAuth: true
    //     }
    // },
    {
        path:'/register',
        name:'register',
        component:lazyLoad('user/register'),
        meta:{
            requireGuest:true
        }
    }
]