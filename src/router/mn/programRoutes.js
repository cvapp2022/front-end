//import programOne from '../../views/mn/program/programOne';

function lazyLoad(view){
    return() => import(`@/views/${view}.vue`)
} 

export const programRoutes =[
    {
        path: '/mentorship/programs/',
        name: 'programs',
        component: lazyLoad('mn/program/programs'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/mentorship/programs/:progOne',
        name: 'progamOne',
        component: lazyLoad('mn/program/programOne'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/mentorship/programs/:progOne/enroll',
        name: 'progamEnroll',
        component: lazyLoad('mn/program/programEnroll'),
        meta: {
            requireAuth: true
        }
    }
]