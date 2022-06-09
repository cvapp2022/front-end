import profile from '../views/profile.vue';
import cvOne from '../views/cvOne.vue';
import clOne from '../views/clOne.vue';


export const profileRoutes =[
    {
        path: '/profile',
        name: 'profile',
        component: profile,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/cv/:cvId',
        name: 'cvOne',
        component: cvOne,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/cl/',
        name: 'clOne',
        component: clOne,
        meta: {
            requireAuth: true
        }
    },
]