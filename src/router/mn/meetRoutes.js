//import meetPrepare from '../../views/mn/meet/meetPrepare';
//import meetRoom from '../../views/mn/meet/meetRoom';

function lazyLoad(view){
    return() => import(`@/views/${view}.vue`)
} 
export const meetRoutes =[
    {
        path: '/mentorship/meet/:meetId/prepare',
        name: 'userMeetPrepare',
        component: lazyLoad('mn/meet/meetPrepare'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/mentorship/meet/:meetId/room',
        name: 'userMeetRoom',
        component: lazyLoad('mn/meet/meetRoom'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/mentorship/meet/:meetId/rate',
        name: 'userMeetRate',
        component: lazyLoad('mn/meet/meetRate'),
        meta: {
            requireAuth: true
        }
    },
]