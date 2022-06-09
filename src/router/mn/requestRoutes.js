import requestOne from '../../views/mn/request/requestOne';

export const requestRoutes =[
    {
        path: '/mentorship/request/:requestOne',
        name: 'requestOne',
        component: requestOne,
        meta: {
            requireAuth: true
        }
    },

]