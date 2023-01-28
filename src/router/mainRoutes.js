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
        path:'/profile',
        name:'profile',
        component:lazyLoad('profile'),
        meta: {
            requireAuth: true
        },
        children:[
            {
                path:'resumes/',
                name:'resumes',
                component:lazyLoad('cv/resumes'),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'resumes/:cvId',
                name: 'cvOne',
                component: lazyLoad('cv/cvOne'),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'resumes/:cvId/perview',
                name: 'cvPerview',
                component: lazyLoad('cv/cvPreview'),
                meta: {
                    requireAuth: true
                }
            },
            {
                path:'cover-letters/',
                name:'coverLetters',
                component:lazyLoad('cl/coverLetters'),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'cover-letters/:clId',
                name: 'clOne',
                component: lazyLoad('cl/clOne'),
                meta: {
                    requireAuth: true
                }
            },    

        ]
    },
    {
        path:'/messages',
        name:'messages',
        component:lazyLoad('messages'),
        meta:{
            requireAuth: true
        }
    }
]