function lazyLoad(view){
    return() => import(`@/views/${view}.vue`)
} 
export const profileRoutes =[
    {
        path: '/cv/:cvId',
        name: 'cvOne',
        component: lazyLoad('cvOne'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/cl/:clId',
        name: 'clOne',
        component: lazyLoad('clOne'),
        meta: {
            requireAuth: true
        }
    },
]