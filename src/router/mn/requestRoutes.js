//import requestOne from '../../views/mn/request/requestOne';

function lazyLoad(view){
    return() => import(`@/views/${view}.vue`)
} 
export const requestRoutes =[
    {
        path:'/mentorship/requests',
        name: 'requests',
        component: lazyLoad('mn/request/requests'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/mentorship/requests/:requestOne',
        name: 'requestOne',
        component: lazyLoad('mn/request/requestOne'),
        meta: {
            requireAuth: true
        }
    },

]