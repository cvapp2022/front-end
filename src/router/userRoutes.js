import home from '../views/Home.vue'
import login from '../views/login.vue'
import template from '../views/template.vue';



// import naron from '../components/templates/naron/naron.vue';
// import sophia from '../components/templates/sophia/sophia.vue';
// import jane from '../components/templates/jane/jane.vue';
// import doe from '../components/templates/doe/doe.vue';


export const userRoutes = [
    {
        path: '/',
        name: 'home',
        component: home
    }, {
        path: '/:template/:cvid',
        name: '/template',
        component: template
    },
    {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
            requireGuest: true
        }
    },
]