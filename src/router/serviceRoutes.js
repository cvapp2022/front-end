function lazyLoad(view) {
    return () => import(`@/views/${view}.vue`)
}


export const serviceRoutes = [
    {
        path: '/services',
        name: 'services',
        component: lazyLoad('service/services'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/services/requests/',
        name: 'servRequests',
        component: lazyLoad('service/requests'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/services/requests/:requestId',
        name: 'servRequestOne',
        component: lazyLoad('service/requestOne'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/services/:serviceOne',
        name: 'serviceOne',
        component: lazyLoad('service/serviceOne'),
        meta: {
            requireAuth: true
        }
    },

]