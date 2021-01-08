import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import CoachList from './pages/coaches/CoachList';
// import CoachDetail from './pages/coaches/CoachDetail';
// import CoachRegistration from './pages/coaches/CoachRegistration';
import ContactCoach from './pages/requests/ContactCoach';
import RequestsReceived from './pages/requests/RequestsReceived';
import NotFound from './pages/NotFound';
import UserAuth from './pages/auth/UserAuth';
import store from './store/index';

const CoachDetail = defineAsyncComponent(() =>
  import('./pages/coaches/CoachDetail')
);

const CoachRegistration = defineAsyncComponent(() =>
  import('./pages/coaches/CoachRegistration')
);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachList },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [{ path: 'contact', component: ContactCoach }]
    },
    {
      path: '/register',
      component: CoachRegistration,
      meta: { authRequired: true }
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: { authRequired: true }
    },
    { path: '/auth', component: UserAuth, meta: { unauthRequired: true } },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

router.beforeEach((to, _, next) => {
  if (to.meta.authRequired && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.unauthRequired && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
