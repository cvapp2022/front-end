function lazyLoad(view) {
    return () => import(`@/views/${view}.vue`)
}


export const resumeStepsRoutes = [
    {
        path: '/resumes/:cvId/steps/info',
        name: 'cvStepInfo',
        component: lazyLoad('cv/steps/info'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/resumes/:cvId/steps/skills',
        name: 'cvStepSkills',
        component: lazyLoad('cv/steps/skills'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/resumes/:cvId/steps/experiences',
        name: 'cvStepExperiences',
        component: lazyLoad('cv/steps/experiences'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/resumes/:cvId/steps/educations',
        name: 'cvStepEducations',
        component: lazyLoad('cv/steps/educations'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/resumes/:cvId/steps/templates',
        name: 'cvStepTemplates',
        component: lazyLoad('cv/steps/templates'),
        meta: {
            requireAuth: true
        }
    },
]