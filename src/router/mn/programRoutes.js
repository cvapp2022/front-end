import programOne from '../../views/mn/program/programOne';


export const programRoutes =[
    {
        path: '/mentorship/program/:progOne',
        name: 'progamOne',
        component: programOne,
        meta: {
            requireAuth: true
        }
    },

]