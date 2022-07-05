function lazyLoad(view){
    return() => import(`@/views/${view}.vue`)
} 
export const mainRoutes =[
    {
        path: '/',
        name: 'home',
        component: lazyLoad('home')
    },
    {
        path:'/dashboard',
        name:'dashboard',
        component:lazyLoad('dashboard'),
        meta: {
            requireAuth: true
        }
    },
    {
        path:'/resumes/',
        name:'resumes',
        component:lazyLoad('resumes'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/resumes/:cvId',
        name: 'cvOne',
        component: lazyLoad('cvOne'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/resumes/:cvId/perview',
        name: 'cvPerview',
        component: lazyLoad('cvPreview'),
        meta: {
            requireAuth: true
        }
    },
    {
        path:'/cover-letters/',
        name:'coverLetters',
        component:lazyLoad('coverLetters'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/cover-letters/:clId',
        name: 'clOne',
        component: lazyLoad('clOne'),
        meta: {
            requireAuth: true
        }
    },    
]