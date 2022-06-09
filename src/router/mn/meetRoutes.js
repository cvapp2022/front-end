import meetPrepare from '../../views/mn/meet/meetPrepare';
import meetRoom from '../../views/mn/meet/meetRoom';

export const meetRoutes =[
    {
        path: '/mentorship/meet/:meetId/prepare',
        name: 'userMeetPrepare',
        component: meetPrepare,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/mentorship/meet/:meetId/room',
        name: 'userMeetRoom',
        component: meetRoom,
        meta: {
            requireAuth: true
        }
    },
]